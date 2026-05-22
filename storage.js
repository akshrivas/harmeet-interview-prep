(function (global) {
  'use strict';

  var IWR = global.InterviewWarRoom = global.InterviewWarRoom || {};
  var META = IWR.META;
  var KEYS = META.storageKeys;

  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function load(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  function defaultProgress() {
    return { version: 1, days: {} };
  }

  function defaultNotes() {
    return { version: 1, byDay: {} };
  }

  function defaultMockSessions() {
    return { version: 1, sessions: [] };
  }

  function defaultSettings() {
    return {
      version: 1,
      streakCount: 0,
      lastActivityDate: null,
      lastOpenedDay: 1,
      readinessSnapshot: null,
    };
  }

  IWR.Storage = {
    load: load,
    save: save,

    getProgress: function () {
      return load(KEYS.progress, defaultProgress());
    },

    setProgress: function (data) {
      return save(KEYS.progress, data);
    },

    getDayProgress: function (dayId) {
      var p = this.getProgress();
      var key = String(dayId);
      if (!p.days[key]) {
        p.days[key] = {
          status: 'not_started',
          updatedAt: null,
          questions: {},
          verbal: {},
        };
      }
      return p.days[key];
    },

    updateDayProgress: function (dayId, patch) {
      var p = this.getProgress();
      var key = String(dayId);
      var current = p.days[key] || {
        status: 'not_started',
        updatedAt: null,
        questions: {},
        verbal: {},
      };
      p.days[key] = Object.assign({}, current, patch, { updatedAt: new Date().toISOString() });
      this.setProgress(p);
      this.touchActivity(dayId);
      return p.days[key];
    },

    setDayStatus: function (dayId, status) {
      return this.updateDayProgress(dayId, { status: status });
    },

    setQuestionRating: function (dayId, questionId, ratings) {
      var p = this.getProgress();
      var key = String(dayId);
      var day = this.getDayProgress(dayId);
      day.questions[questionId] = Object.assign({}, day.questions[questionId] || {}, ratings, {
        updatedAt: new Date().toISOString(),
      });
      p.days[key] = day;
      if (day.status === 'not_started') day.status = 'in_progress';
      this.setProgress(p);
      this.touchActivity(dayId);
    },

    setVerbalDone: function (dayId, verbalId, ratings) {
      var p = this.getProgress();
      var key = String(dayId);
      var day = this.getDayProgress(dayId);
      day.verbal[verbalId] = Object.assign({}, ratings, { completedAt: new Date().toISOString() });
      p.days[key] = day;
      this.setProgress(p);
      this.touchActivity(dayId);
    },

    getNotes: function () {
      return load(KEYS.notes, defaultNotes());
    },

    setDayNote: function (dayId, text) {
      var n = this.getNotes();
      n.byDay[String(dayId)] = text;
      save(KEYS.notes, n);
      this.touchActivity(dayId);
    },

    getDayNote: function (dayId) {
      var n = this.getNotes();
      return n.byDay[String(dayId)] || '';
    },

    getMockSessions: function () {
      return load(KEYS.mockSessions, defaultMockSessions());
    },

    addMockSession: function (session) {
      var m = this.getMockSessions();
      m.sessions.unshift(session);
      if (m.sessions.length > 30) m.sessions = m.sessions.slice(0, 30);
      save(KEYS.mockSessions, m);
      this.touchActivity();
      return session;
    },

    getActiveMockSession: function () {
      var m = this.getMockSessions();
      for (var i = 0; i < m.sessions.length; i++) {
        if (m.sessions[i].status === 'active') return m.sessions[i];
      }
      return null;
    },

    saveMockSession: function (session) {
      var m = this.getMockSessions();
      var found = false;
      for (var i = 0; i < m.sessions.length; i++) {
        if (m.sessions[i].id === session.id) {
          m.sessions[i] = session;
          found = true;
          break;
        }
      }
      if (!found) m.sessions.unshift(session);
      save(KEYS.mockSessions, m);
      return session;
    },

    getSettings: function () {
      return load(KEYS.settings, defaultSettings());
    },

    updateSettings: function (patch) {
      var s = Object.assign({}, this.getSettings(), patch);
      save(KEYS.settings, s);
      return s;
    },

    touchActivity: function (dayId) {
      var s = this.getSettings();
      var today = todayStr();
      if (s.lastActivityDate === today) {
        if (dayId) s.lastOpenedDay = dayId;
        this.updateSettings(s);
        return s;
      }
      if (s.lastActivityDate) {
        var prev = new Date(s.lastActivityDate);
        var curr = new Date(today);
        var diff = Math.round((curr - prev) / 86400000);
        s.streakCount = diff === 1 ? (s.streakCount || 0) + 1 : 1;
      } else {
        s.streakCount = 1;
      }
      s.lastActivityDate = today;
      if (dayId) s.lastOpenedDay = dayId;
      return this.updateSettings(s);
    },

    setReadinessSnapshot: function (snapshot) {
      return this.updateSettings({ readinessSnapshot: snapshot });
    },
  };
})(window);
