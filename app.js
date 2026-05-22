(function (global) {
  'use strict';

  var IWR = global.InterviewWarRoom = global.InterviewWarRoom || {};
  var META = IWR.META;
  var Storage = IWR.Storage;

  /* ---------- Utils ---------- */
  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function avg(nums) {
    if (!nums.length) return null;
    var s = 0;
    for (var i = 0; i < nums.length; i++) s += nums[i];
    return s / nums.length;
  }

  function getReadinessBand(score) {
    var bands = META.readinessBands;
    for (var i = 0; i < bands.length; i++) {
      if (score <= bands[i].max) return bands[i].label;
    }
    return bands[bands.length - 1].label;
  }

  /* ---------- Analytics ---------- */
  IWR.Analytics = {
    getCompletedCount: function (progress) {
      var n = 0;
      META.week1Days.forEach(function (d) {
        var day = progress.days[String(d)];
        if (day && day.status === 'completed') n++;
      });
      return n;
    },

    getDayConfidence: function (dayId, progress, dayData) {
      if (!dayData || !dayData.interviewQuestions) return null;
      var dp = progress.days[String(dayId)] || {};
      var qs = dayData.interviewQuestions;
      var vals = [];
      qs.forEach(function (q) {
        var r = dp.questions && dp.questions[q.id];
        if (r && r.confidence) vals.push(Number(r.confidence));
      });
      return avg(vals);
    },

    getDayProgressPct: function (dayId, progress, dayData) {
      if (!dayData || !dayData.interviewQuestions) return 0;
      var dp = progress.days[String(dayId)] || {};
      var qs = dayData.interviewQuestions;
      var rated = 0;
      qs.forEach(function (q) {
        var r = dp.questions && dp.questions[q.id];
        if (r && r.confidence && r.clarity && r.handsOn) rated++;
      });
      return Math.round((rated / qs.length) * 100);
    },

    getConfidenceScore: function (progress) {
      var all = [];
      META.week1Days.forEach(function (d) {
        var day = IWR.DATA.getDay(d);
        var dp = progress.days[String(d)] || {};
        if (!day) return;
        (day.interviewQuestions || []).forEach(function (q) {
          var r = dp.questions && dp.questions[q.id];
          if (r && r.confidence) all.push(Number(r.confidence));
        });
      });
      if (!all.length) return 50;
      return Math.round((avg(all) / 5) * 100);
    },

    getMockScore: function (mockData) {
      var sessions = mockData.sessions || [];
      var completed = sessions.filter(function (s) {
        return s.status === 'completed' && s.aggregateScore != null;
      });
      if (!completed.length) return 50;
      var last = completed.slice(0, 5);
      var sum = 0;
      last.forEach(function (s) {
        sum += s.aggregateScore;
      });
      return Math.round((sum / last.length / 10) * 100);
    },

    getStreakScore: function (settings) {
      var streak = settings.streakCount || 0;
      return Math.min(Math.round((streak / 7) * 100), 100);
    },

    computeReadiness: function () {
      var progress = Storage.getProgress();
      var settings = Storage.getSettings();
      var mockData = Storage.getMockSessions();
      var w = META.readinessWeights;
      var completed = this.getCompletedCount(progress);
      var completionPct = Math.round((completed / META.totalDays) * 100);
      var confidencePct = this.getConfidenceScore(progress);
      var mockPct = this.getMockScore(mockData);
      var streakPct = this.getStreakScore(settings);
      var score = Math.round(
        w.completion * completionPct +
          w.confidence * confidencePct +
          w.mock * mockPct +
          w.streak * streakPct
      );
      score = Math.max(0, Math.min(100, score));
      var snapshot = {
        score: score,
        label: getReadinessBand(score),
        computedAt: new Date().toISOString(),
        breakdown: {
          completion: completionPct,
          confidence: confidencePct,
          mock: mockPct,
          streak: streakPct,
        },
        completedDays: completed,
      };
      Storage.setReadinessSnapshot(snapshot);
      return snapshot;
    },

    getWeaknesses: function () {
      var progress = Storage.getProgress();
      var mockData = Storage.getMockSessions();
      var items = [];

      META.week1Days.forEach(function (d) {
        var dp = progress.days[String(d)];
        var day = IWR.DATA.getDay(d);
        if (!dp || !day) {
          if (!dp || dp.status === 'not_started') {
            items.push({
              severity: 2,
              message: 'Day ' + d + ' not started: ' + (day ? day.title : ''),
              dayId: d,
              type: 'incomplete',
            });
          }
          return;
        }
        if (dp.status === 'not_started' || dp.status === 'in_progress') {
          items.push({
            severity: dp.status === 'not_started' ? 2 : 1,
            message: 'Day ' + d + ' ' + dp.status.replace('_', ' ') + ': ' + day.title,
            dayId: d,
            type: 'incomplete',
          });
        }
        (day.interviewQuestions || []).forEach(function (q) {
          var r = dp.questions && dp.questions[q.id];
          if (r && Number(r.confidence) <= 2) {
            items.push({
              severity: 4,
              message: 'Low confidence on: ' + q.question.slice(0, 60) + '…',
              dayId: d,
              questionId: q.id,
              type: 'low_confidence',
            });
          }
        });
      });

      (mockData.sessions || []).forEach(function (session) {
        if (session.status !== 'completed') return;
        if (session.aggregateScore != null && session.aggregateScore < 5) {
          items.push({
            severity: 4,
            message: 'Weak mock session (' + session.aggregateScore.toFixed(1) + '/10): ' + session.packTitle,
            type: 'mock',
          });
        }
        (session.answers || []).forEach(function (a) {
          if (a.score != null && a.score < 5) {
            var q = IWR.DATA.getQuestion(a.questionId);
            items.push({
              severity: 3,
              message: 'Mock score ' + a.score.toFixed(1) + '/10: ' + (q ? q.question.slice(0, 50) : a.questionId) + '…',
              questionId: a.questionId,
              type: 'mock_question',
            });
          }
        });
      });

      items.sort(function (a, b) {
        return b.severity - a.severity;
      });
      return items.slice(0, 8);
    },

    getSuggestedDay: function () {
      var progress = Storage.getProgress();
      for (var i = 0; i < META.week1Days.length; i++) {
        var d = META.week1Days[i];
        var dp = progress.days[String(d)];
        if (!dp || dp.status === 'not_started' || dp.status === 'in_progress') return d;
      }
      return 7;
    },

    getTodaysMission: function () {
      var dayNum = this.getSuggestedDay();
      var day = IWR.DATA.getDay(dayNum);
      var weaknesses = this.getWeaknesses();
      var mission = { dayNum: dayNum, items: [] };

      if (!day) return mission;

      (day.topics || []).slice(0, 3).forEach(function (t) {
        mission.items.push({ type: 'Topic', label: t.title, href: 'day.html?day=' + dayNum });
      });

      var questions = day.interviewQuestions || [];
      var weakQ = null;
      for (var w = 0; w < weaknesses.length; w++) {
        if (weaknesses[w].questionId) {
          weakQ = weaknesses[w].questionId;
          break;
        }
      }
      var qPick = [];
      if (weakQ) {
        var found = questions.filter(function (q) {
          return q.id === weakQ;
        });
        if (found.length) qPick.push(found[0]);
      }
      questions.forEach(function (q) {
        if (qPick.length >= 2) return;
        if (qPick.indexOf(q) === -1) qPick.push(q);
      });
      qPick.slice(0, 2).forEach(function (q) {
        mission.items.push({ type: 'Interview Q', label: q.question, href: 'day.html?day=' + dayNum + '#q-' + q.id });
      });

      if (day.verbalPractice && day.verbalPractice[0]) {
        mission.items.push({
          type: 'Verbal',
          label: day.verbalPractice[0].topic,
          href: 'day.html?day=' + dayNum + '#verbal-' + day.verbalPractice[0].id,
        });
      }

      if (day.exercises && day.exercises[0]) {
        mission.items.push({ type: 'Exercise', label: day.exercises[0], href: 'day.html?day=' + dayNum });
      }

      return mission;
    },
  };

  /* ---------- Render ---------- */
  IWR.Render = {
    header: function (active) {
      return (
        '<header class="war-header">' +
        '<div class="war-brand">' +
        '<p class="war-brand__title">Interview War Room</p>' +
        '<p class="war-brand__sub">Week 1 · Senior Frontend Command Center</p>' +
        '</div>' +
        '<nav class="war-nav">' +
        '<a href="index.html"' +
        (active === 'index' ? ' class="is-active"' : '') +
        '>Home</a>' +
        '<a href="dashboard.html"' +
        (active === 'dashboard' ? ' class="is-active"' : '') +
        '>Command Center</a>' +
        '<a href="mock.html"' +
        (active === 'mock' ? ' class="is-active"' : '') +
        '>Mock Round</a>' +
        '</nav></header>'
      );
    },

    readinessBlock: function (snap) {
      return (
        '<section class="readiness-block">' +
        '<p class="card__label">Interview Readiness Score</p>' +
        '<p class="readiness-block__score">' +
        snap.score +
        '%</p>' +
        '<p class="card__meta">' +
        escapeHtml(snap.label) +
        ' · ' +
        snap.completedDays +
        '/7 days complete</p>' +
        '<div class="readiness-bar"><div class="readiness-bar__fill" style="width:' +
        snap.score +
        '%"></div></div>' +
        '<div class="grid-3" style="margin-top:1rem">' +
        '<div><span class="card__label">Completion</span><strong>' +
        snap.breakdown.completion +
        '%</strong></div>' +
        '<div><span class="card__label">Confidence</span><strong>' +
        snap.breakdown.confidence +
        '%</strong></div>' +
        '<div><span class="card__label">Mock</span><strong>' +
        snap.breakdown.mock +
        '%</strong></div>' +
        '</div></section>'
      );
    },

    statCards: function (snap, settings) {
      return (
        '<div class="grid-3">' +
        '<div class="card"><p class="card__label">Completed Days</p><p class="card__value">' +
        snap.completedDays +
        '</p><p class="card__meta">of 7</p></div>' +
        '<div class="card"><p class="card__label">Current Streak</p><p class="card__value">' +
        (settings.streakCount || 0) +
        '</p><p class="card__meta">days active</p></div>' +
        '<div class="card"><p class="card__label">Remaining</p><p class="card__value">' +
        (7 - snap.completedDays) +
        '</p><p class="card__meta">days in Week 1</p></div>' +
        '</div>'
      );
    },

    threatBoard: function (items) {
      if (!items.length) {
        return '<p class="empty-state">No critical weak areas detected. Stay sharp.</p>';
      }
      var html = '<ul class="threat-list">';
      items.forEach(function (it) {
        var cls = it.severity >= 4 ? '' : it.severity >= 2 ? ' threat-item--medium' : ' threat-item--low';
        html +=
          '<li class="threat-item' +
          cls +
          '">' +
          escapeHtml(it.message) +
          (it.dayId
            ? ' <a href="day.html?day=' + it.dayId + '">Open day</a>'
            : '') +
          '</li>';
      });
      html += '</ul>';
      return html;
    },

    mission: function (mission) {
      var html = '<ul class="mission-list">';
      mission.items.forEach(function (it) {
        html +=
          '<li><span class="mission-list__type">' +
          escapeHtml(it.type) +
          '</span>' +
          (it.href ? '<a href="' + it.href + '">' + escapeHtml(it.label) + '</a>' : escapeHtml(it.label)) +
          '</li>';
      });
      html += '</ul>';
      return html;
    },

    dayCard: function (summary, stats) {
      var status = stats.status || 'not_started';
      var conf = stats.confidence != null ? stats.confidence.toFixed(1) + '/5' : '—';
      return (
        '<article class="day-card" data-day="' +
        summary.id +
        '">' +
        '<div class="day-card__head">' +
        '<div><span class="day-card__num">Day ' +
        summary.id +
        '</span>' +
        '<h3 class="day-card__title">' +
        escapeHtml(summary.title) +
        '</h3></div>' +
        '<span class="badge badge--' +
        status +
        '">' +
        escapeHtml(META.statusLabels[status] || status) +
        '</span></div>' +
        '<div class="day-card__stats">' +
        '<span>Confidence <strong>' +
        conf +
        '</strong></span>' +
        '<span>Rated <strong>' +
        stats.progressPct +
        '%</strong></span></div>' +
        '<div class="day-card__actions">' +
        '<a class="btn btn--sm btn--primary" href="day.html?day=' +
        summary.id +
        '">Open</a>' +
        '<button type="button" class="btn btn--sm" data-action="cycle-status" data-day="' +
        summary.id +
        '">Status</button>' +
        '</div></article>'
      );
    },

    coachingQuestion: function (q, dayId, ratings) {
      ratings = ratings || {};
      var body =
        '<div class="coaching-block"><h4>Expected direction</h4><p>' +
        escapeHtml(q.expectedAnswerDirection) +
        '</p></div>' +
        '<div class="coaching-block"><h4>Senior talking points</h4><ul>' +
        q.seniorTalkingPoints.map(function (p) {
          return '<li>' + escapeHtml(p) + '</li>';
        }).join('') +
        '</ul></div>' +
        '<div class="coaching-block"><h4>Common mistakes</h4><ul>' +
        q.commonMistakes.map(function (p) {
          return '<li>' + escapeHtml(p) + '</li>';
        }).join('') +
        '</ul></div>' +
        '<div class="coaching-block"><h4>Follow-ups</h4><ul>' +
        q.followUpQuestions.map(function (p) {
          return '<li>' + escapeHtml(p) + '</li>';
        }).join('') +
        '</ul></div>' +
        '<div class="rating-row" data-question-id="' +
        q.id +
        '" data-day="' +
        dayId +
        '">' +
        this.ratingSelect('confidence', 'Confidence', ratings.confidence) +
        this.ratingSelect('clarity', 'Clarity', ratings.clarity) +
        this.ratingSelect('handsOn', 'Hands-on', ratings.handsOn) +
        '</div>';

      return (
        '<article class="q-card" id="q-' +
        q.id +
        '">' +
        '<div class="q-card__header" data-action="toggle-q" aria-expanded="false">' +
        '<h3 class="q-card__title">' +
        escapeHtml(q.question) +
        '</h3><span class="badge">Coach</span></div>' +
        '<div class="q-card__body" hidden>' +
        body +
        '</div></article>'
      );
    },

    ratingSelect: function (name, label, value) {
      var opts = '<option value="">—</option>';
      for (var i = 1; i <= 5; i++) {
        opts +=
          '<option value="' +
          i +
          '"' +
          (String(value) === String(i) ? ' selected' : '') +
          '>' +
          i +
          '</option>';
      }
      return (
        '<div class="rating-field"><label>' +
        label +
        '</label><select name="' +
        name +
        '" data-rating="' +
        name +
        '">' +
        opts +
        '</select></div>'
      );
    },
  };

  /* ---------- App controllers ---------- */
  IWR.App = {
    init: function (page) {
      if (page === 'index') this.initIndex();
      else if (page === 'dashboard') this.initDashboard();
      else if (page === 'day') this.initDay();
      else if (page === 'mock') this.initMock();
    },

    bindGlobalClicks: function (handler) {
      document.body.addEventListener('click', handler);
      document.body.addEventListener('change', handler);
    },

    initIndex: function () {
      var snap = IWR.Analytics.computeReadiness();
      var settings = Storage.getSettings();
      var el = document.getElementById('index-stats');
      if (el) {
        el.innerHTML =
          '<p class="card__value" style="font-size:2rem">' +
          snap.score +
          '%</p><p class="card__meta">' +
          escapeHtml(snap.label) +
          ' · Streak ' +
          (settings.streakCount || 0) +
          '</p>';
      }
    },

    initDashboard: function () {
      var header = document.getElementById('header');
      if (header) header.innerHTML = IWR.Render.header('dashboard');

      var snap = IWR.Analytics.computeReadiness();
      var settings = Storage.getSettings();
      var progress = Storage.getProgress();
      var weaknesses = IWR.Analytics.getWeaknesses();
      var mission = IWR.Analytics.getTodaysMission();

      document.getElementById('readiness').innerHTML = IWR.Render.readinessBlock(snap);
      document.getElementById('stats').innerHTML = IWR.Render.statCards(snap, settings);
      document.getElementById('weaknesses').innerHTML = IWR.Render.threatBoard(weaknesses);
      document.getElementById('mission').innerHTML = IWR.Render.mission(mission);

      var grid = document.getElementById('day-grid');
      var html = '';
      IWR.DATA.getSummaries().forEach(function (summary) {
        var dayData = IWR.DATA.getDay(summary.id);
        var dp = progress.days[String(summary.id)] || { status: 'not_started' };
        html += IWR.Render.dayCard(summary, {
          status: dp.status,
          confidence: IWR.Analytics.getDayConfidence(summary.id, progress, dayData),
          progressPct: IWR.Analytics.getDayProgressPct(summary.id, progress, dayData),
        });
      });
      grid.innerHTML = html;

      if (!this._dashboardBound) {
        this._dashboardBound = true;
        var self = this;
        this.bindGlobalClicks(function (e) {
          var btn = e.target.closest('[data-action="cycle-status"]');
          if (!btn) return;
          var dayId = Number(btn.dataset.day);
          var order = ['not_started', 'in_progress', 'completed', 'skipped'];
          var cur = Storage.getDayProgress(dayId).status;
          var idx = order.indexOf(cur);
          var next = order[(idx + 1) % order.length];
          Storage.setDayStatus(dayId, next);
          self.initDashboard();
        });
      }
    },

    initDay: function () {
      var header = document.getElementById('header');
      if (header) header.innerHTML = IWR.Render.header('dashboard');

      var params = new URLSearchParams(location.search);
      var dayNum = Number(params.get('day')) || 1;
      if (dayNum < 1 || dayNum > 7) dayNum = 1;

      var day = IWR.DATA.getDay(dayNum);
      if (!day) {
        document.getElementById('day-content').innerHTML =
          '<p class="empty-state">Day not found.</p>';
        return;
      }

      Storage.touchActivity(dayNum);
      var progress = Storage.getDayProgress(dayNum);

      document.getElementById('day-title').textContent = 'Day ' + dayNum + ' — ' + day.title;
      document.getElementById('day-meta').textContent = 'Week ' + day.week + ' · War Room drill';

      var statusHtml = '';
      ['not_started', 'in_progress', 'completed', 'skipped'].forEach(function (st) {
        statusHtml +=
          '<button type="button" class="btn btn--sm' +
          (progress.status === st ? ' btn--primary' : '') +
          '" data-action="set-status" data-status="' +
          st +
          '">' +
          escapeHtml(META.statusLabels[st]) +
          '</button>';
      });
      document.getElementById('status-bar').innerHTML = statusHtml;

      var content = '';

      content += '<h2 class="section-title">Topics</h2><ul class="topic-list">';
      day.topics.forEach(function (t) {
        content +=
          '<li><strong>' +
          escapeHtml(t.title) +
          '</strong><br><span style="color:var(--muted);font-size:0.875rem">' +
          escapeHtml(t.summary) +
          '</span></li>';
      });
      content += '</ul>';

      content += '<h2 class="section-title">Exercises</h2><ul class="exercise-list">';
      day.exercises.forEach(function (ex) {
        content += '<li>' + escapeHtml(ex) + '</li>';
      });
      content += '</ul>';

      if (day.architecture) {
        content += '<h2 class="section-title">Architecture Insights</h2>';
        content += '<div class="arch-block"><strong>' + escapeHtml(day.architecture.title) + '</strong><ul>';
        day.architecture.insights.forEach(function (i) {
          content += '<li>' + escapeHtml(i) + '</li>';
        });
        content += '</ul>';
        if (day.architecture.tradeoffs && day.architecture.tradeoffs.length) {
          content += '<p style="margin-top:0.75rem;font-size:0.8rem;color:var(--muted)">Tradeoffs</p><ul>';
          day.architecture.tradeoffs.forEach(function (t) {
            content += '<li>' + escapeHtml(t) + '</li>';
          });
          content += '</ul>';
        }
        if (day.architecture.scalability && day.architecture.scalability.length) {
          content += '<p style="margin-top:0.75rem;font-size:0.8rem;color:var(--muted)">Scalability</p><ul>';
          day.architecture.scalability.forEach(function (s) {
            content += '<li>' + escapeHtml(s) + '</li>';
          });
          content += '</ul>';
        }
        content += '</div>';
      }

      content += '<h2 class="section-title">Interview Questions</h2>';
      var self = this;
      day.interviewQuestions.forEach(function (q) {
        var r = (progress.questions && progress.questions[q.id]) || {};
        content += IWR.Render.coachingQuestion(q, dayNum, r);
      });

      content += '<h2 class="section-title">Verbal Practice</h2>';
      (day.verbalPractice || []).forEach(function (v) {
        var done = progress.verbal && progress.verbal[v.id];
        content +=
          '<div class="verbal-card" id="verbal-' +
          v.id +
          '"><h3>' +
          escapeHtml(v.topic) +
          '</h3><p>' +
          escapeHtml(v.instruction) +
          '</p><p class="card__meta">' +
          v.durationMinutes +
          ' min · ' +
          escapeHtml(v.structure.join(' → ')) +
          '</p>' +
          '<button type="button" class="btn btn--sm btn--primary" data-action="verbal-done" data-verbal="' +
          v.id +
          '">' +
          (done ? 'Completed ✓' : 'Mark verbal complete') +
          '</button></div>';
      });

      content += '<h2 class="section-title">Revision</h2><ul class="exercise-list">';
      day.revision.forEach(function (r) {
        content += '<li>' + escapeHtml(r) + '</li>';
      });
      content += '</ul>';

      document.getElementById('day-content').innerHTML = content;

      var notes = Storage.getDayNote(dayNum);
      document.getElementById('day-notes').value = notes;

      if (!this._dayNotesBound) {
        this._dayNotesBound = true;
        var noteTimer;
        document.getElementById('day-notes').addEventListener('input', function (ev) {
          clearTimeout(noteTimer);
          var hint = document.getElementById('save-hint');
          var num = Number(new URLSearchParams(location.search).get('day')) || 1;
          noteTimer = setTimeout(function () {
            Storage.setDayNote(num, ev.target.value);
            if (hint) hint.textContent = 'Saved';
          }, 400);
        });
      }

      if (!this._dayClickBound) {
        this._dayClickBound = true;
        document.body.addEventListener('click', function (e) {
          if (!document.getElementById('day-content')) return;
          var dayNum = Number(new URLSearchParams(location.search).get('day')) || 1;
          var toggle = e.target.closest('[data-action="toggle-q"]');
          if (toggle) {
            var body = toggle.parentElement.querySelector('.q-card__body');
            var open = body.hidden;
            body.hidden = !open;
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            return;
          }
          var statusBtn = e.target.closest('[data-action="set-status"]');
          if (statusBtn) {
            Storage.setDayStatus(dayNum, statusBtn.dataset.status);
            IWR.App.initDay();
            return;
          }
          var verbalBtn = e.target.closest('[data-action="verbal-done"]');
          if (verbalBtn) {
            Storage.setVerbalDone(dayNum, verbalBtn.dataset.verbal, { completed: true });
            IWR.App.initDay();
          }
        });
        document.body.addEventListener('change', function (e) {
          if (!document.getElementById('day-content')) return;
          var sel = e.target.closest('select[data-rating]');
          if (!sel) return;
          var row = sel.closest('[data-question-id]');
          if (!row) return;
          var dayNum = Number(row.dataset.day);
          var qid = row.dataset.questionId;
          var ratings = {};
          row.querySelectorAll('select[data-rating]').forEach(function (s) {
            if (s.value) ratings[s.dataset.rating] = Number(s.value);
          });
          Storage.setQuestionRating(dayNum, qid, ratings);
          var hint = document.getElementById('save-hint');
          if (hint) hint.textContent = 'Ratings saved';
        });
      }

      if (location.hash) {
        var target = document.querySelector(location.hash);
        if (target) {
          if (target.classList.contains('q-card')) {
            var body = target.querySelector('.q-card__body');
            var hdr = target.querySelector('[data-action="toggle-q"]');
            if (body) body.hidden = false;
            if (hdr) hdr.setAttribute('aria-expanded', 'true');
          }
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },

    initMock: function () {
      var header = document.getElementById('header');
      if (header) header.innerHTML = IWR.Render.header('mock');

      var params = new URLSearchParams(location.search);
      var packId = params.get('pack') || IWR.DATA.getDefaultMockPackId();
      var root = document.getElementById('mock-root');

      var active = Storage.getActiveMockSession();
      if (params.get('new') === '1') {
        active = this.startMockSession(packId);
      } else if (!active) {
        this.renderMockLobby(root, packId);
        return;
      }

      if (active.status === 'completed') {
        this.renderMockDebrief(root, active);
        return;
      }

      this.renderMockActive(root, active);
    },

    renderMockLobby: function (root, packId) {
      var packs = IWR.DATA.mockPacks;
      var html =
        '<div class="mock-screen"><h1>Mock Interview Round</h1><p style="color:var(--muted)">One question at a time. Reveal coaching after your verbal attempt.</p>';
      Object.keys(packs).forEach(function (id) {
        var p = packs[id];
        html +=
          '<div class="card" style="margin:1rem 0"><h3 style="margin:0 0 0.5rem">' +
          escapeHtml(p.title) +
          '</h3><p class="card__meta">' +
          escapeHtml(p.description) +
          ' · ' +
          p.questionIds.length +
          ' questions</p>' +
          '<a class="btn btn--primary" href="mock.html?pack=' +
          id +
          '&new=1">Start round</a></div>';
      });
      html += '</div>';
      root.innerHTML = html;
    },

    startMockSession: function (packId) {
      var m = Storage.getMockSessions();
      m.sessions.forEach(function (s) {
        if (s.status === 'active') s.status = 'abandoned';
      });
      Storage.save(IWR.META.storageKeys.mockSessions, m);

      var pack = IWR.DATA.getMockPack(packId);
      if (!pack) pack = IWR.DATA.getMockPack(IWR.DATA.getDefaultMockPackId());
      var session = {
        id: 'mock-' + Date.now(),
        packId: pack.id,
        packTitle: pack.title,
        status: 'active',
        startedAt: new Date().toISOString(),
        questionIds: pack.questionIds.slice(),
        currentIndex: 0,
        defaultMinutes: pack.defaultQuestionMinutes || 5,
        answers: [],
      };
      Storage.saveMockSession(session);
      return session;
    },

    renderMockActive: function (root, session) {
      var self = this;
      var idx = session.currentIndex;
      var qid = session.questionIds[idx];
      var q = IWR.DATA.getQuestion(qid);
      if (!q) {
        this.finishMockSession(session);
        this.renderMockDebrief(root, session);
        return;
      }

      var dayId = this.findDayForQuestion(qid);
      var timerKey = 'iwr-mock-timer';
      var seconds = session._timerSeconds;
      if (seconds == null) {
        var saved = sessionStorage.getItem(timerKey + session.id);
        seconds = saved != null ? Number(saved) : session.defaultMinutes * 60;
      }

      root.innerHTML =
        '<div class="mock-screen" data-session="' +
        session.id +
        '">' +
        '<p class="mock-progress">Question ' +
        (idx + 1) +
        ' of ' +
        session.questionIds.length +
        ' · ' +
        escapeHtml(session.packTitle) +
        '</p>' +
        '<div class="mock-timer" id="mock-timer">' +
        this.formatTime(seconds) +
        '</div>' +
        '<p class="mock-question">' +
        escapeHtml(q.question) +
        '</p>' +
        '<div class="mock-actions">' +
        '<button type="button" class="btn" data-action="mock-pause">Pause</button>' +
        '<button type="button" class="btn btn--primary" data-action="mock-reveal">Reveal answer guide</button>' +
        '</div>' +
        '<div class="mock-reveal" id="mock-reveal" hidden>' +
        this.mockRevealHtml(q) +
        '<div class="rating-row" id="mock-eval">' +
        IWR.Render.ratingSelect('structure', 'Structure', '') +
        IWR.Render.ratingSelect('depth', 'Depth', '') +
        IWR.Render.ratingSelect('tradeoffs', 'Tradeoffs', '') +
        IWR.Render.ratingSelect('communication', 'Communication', '') +
        IWR.Render.ratingSelect('confidence', 'Confidence', '') +
        '</div></div>' +
        '<div class="mock-actions">' +
        '<button type="button" class="btn btn--primary" data-action="mock-next" disabled id="mock-next">Next question</button>' +
        '</div></div>';

      var timerEl = document.getElementById('mock-timer');
      var interval = setInterval(function () {
        if (session._paused) return;
        seconds--;
        session._timerSeconds = seconds;
        sessionStorage.setItem(timerKey + session.id, String(seconds));
        timerEl.textContent = IWR.App.formatTime(seconds);
        if (seconds <= 60) timerEl.classList.add('is-warning');
        if (seconds <= 0) clearInterval(interval);
      }, 1000);

      root.addEventListener('click', function handler(e) {
        var reveal = e.target.closest('[data-action="mock-reveal"]');
        if (reveal) {
          document.getElementById('mock-reveal').hidden = false;
          document.getElementById('mock-next').disabled = false;
          return;
        }
        if (e.target.closest('[data-action="mock-pause"]')) {
          session._paused = !session._paused;
          return;
        }
        var next = e.target.closest('[data-action="mock-next"]');
        if (!next) return;
        clearInterval(interval);
        sessionStorage.removeItem(timerKey + session.id);

        var evalRoot = document.getElementById('mock-eval');
        var evalScores = {};
        evalRoot.querySelectorAll('select').forEach(function (s) {
          if (s.value) evalScores[s.dataset.rating] = Number(s.value);
        });
        var qScore = IWR.App.calcMockQuestionScore(evalScores);
        session.answers.push({
          questionId: qid,
          dayId: dayId,
          score: qScore,
          eval: evalScores,
          timeSpentSec: session.defaultMinutes * 60 - Math.max(0, seconds),
        });
        if (evalScores.confidence && dayId) {
          Storage.setQuestionRating(dayId, qid, {
            confidence: evalScores.confidence,
            clarity: evalScores.communication || evalScores.structure,
            handsOn: evalScores.depth,
          });
        }
        session.currentIndex++;
        Storage.saveMockSession(session);
        root.removeEventListener('click', handler);
        if (session.currentIndex >= session.questionIds.length) {
          IWR.App.finishMockSession(session);
          IWR.App.renderMockDebrief(root, session);
        } else {
          session._timerSeconds = session.defaultMinutes * 60;
          IWR.App.renderMockActive(root, session);
        }
      });
    },

    calcMockQuestionScore: function (evalScores) {
      var dims = ['structure', 'depth', 'tradeoffs', 'communication'];
      var vals = [];
      dims.forEach(function (d) {
        if (evalScores[d]) vals.push(evalScores[d]);
      });
      if (!vals.length) return 5;
      return (avg(vals) / 5) * 10;
    },

    findDayForQuestion: function (qid) {
      for (var d = 1; d <= 7; d++) {
        var day = IWR.DATA.getDay(d);
        if (!day) continue;
        for (var i = 0; i < (day.interviewQuestions || []).length; i++) {
          if (day.interviewQuestions[i].id === qid) return d;
        }
      }
      return null;
    },

    finishMockSession: function (session) {
      var scores = session.answers.map(function (a) {
        return a.score;
      });
      session.aggregateScore = scores.length ? Math.round(avg(scores) * 10) / 10 : 0;
      session.status = 'completed';
      session.completedAt = new Date().toISOString();
      var tags = {};
      session.answers.forEach(function (a) {
        if (a.score < 5) tags[a.questionId] = true;
      });
      session.weakQuestionIds = Object.keys(tags);
      Storage.saveMockSession(session);
      IWR.Analytics.computeReadiness();
    },

    mockRevealHtml: function (q) {
      return (
        '<div class="coaching-block"><h4>Direction</h4><p>' +
        escapeHtml(q.expectedAnswerDirection) +
        '</p></div>' +
        '<div class="coaching-block"><h4>Senior points</h4><ul>' +
        q.seniorTalkingPoints
          .map(function (p) {
            return '<li>' + escapeHtml(p) + '</li>';
          })
          .join('') +
        '</ul></div>' +
        '<div class="coaching-block"><h4>Mistakes</h4><ul>' +
        q.commonMistakes
          .map(function (p) {
            return '<li>' + escapeHtml(p) + '</li>';
          })
          .join('') +
        '</ul></div>'
      );
    },

    renderMockDebrief: function (root, session) {
      var weak = (session.weakQuestionIds || []).map(function (id) {
        var q = IWR.DATA.getQuestion(id);
        return q ? q.question.slice(0, 70) + '…' : id;
      });
      var snap = IWR.Analytics.computeReadiness();
      root.innerHTML =
        '<div class="mock-screen debrief">' +
        '<h1>Round complete</h1>' +
        '<p class="debrief__score">' +
        (session.aggregateScore != null ? session.aggregateScore.toFixed(1) : '—') +
        '/10</p>' +
        '<p class="card__meta">Aggregate mock score</p>' +
        '<p style="margin-top:1.5rem">Readiness now <strong>' +
        snap.score +
        '%</strong> (' +
        escapeHtml(snap.label) +
        ')</p>' +
        (weak.length
          ? '<h2 class="section-title">Weak topics</h2><ul class="exercise-list">' +
            weak
              .map(function (w) {
                return '<li>' + escapeHtml(w) + '</li>';
              })
              .join('') +
            '</ul>'
          : '<p class="empty-state">Strong round. No weak tags below threshold.</p>') +
        '<div class="mock-actions" style="margin-top:2rem">' +
        '<a class="btn btn--primary" href="dashboard.html">Command Center</a>' +
        '<a class="btn" href="mock.html?new=1&pack=' +
        session.packId +
        '">New round</a>' +
        '</div></div>';
    },

    formatTime: function (sec) {
      var m = Math.floor(sec / 60);
      var s = sec % 60;
      return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    },
  };
})(window);
