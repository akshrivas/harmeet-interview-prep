(function (global) {
  'use strict';

  var IWR = global.InterviewWarRoom = global.InterviewWarRoom || {};
  IWR.DATA = IWR.DATA || { days: {}, summaries: [] };

  IWR.DATA.summaries = [
    { id: 1, week: 1, title: 'JavaScript Foundations', theme: 'javascript' },
    { id: 2, week: 1, title: 'Async JavaScript', theme: 'javascript' },
    { id: 3, week: 1, title: 'ES6+ Deep Dive', theme: 'javascript' },
    { id: 4, week: 1, title: 'React Fundamentals', theme: 'react' },
    { id: 5, week: 1, title: 'React Hooks Advanced', theme: 'react' },
    { id: 6, week: 1, title: 'State Management', theme: 'react' },
    { id: 7, week: 1, title: 'Week 1 Revision + Mock Interview', theme: 'revision' },
  ];

  IWR.DATA.registerDay = function (id, payload) {
    IWR.DATA.days[id] = payload;
  };

  IWR.DATA.getDay = function (id) {
    return IWR.DATA.days[id] || null;
  };

  IWR.DATA.getSummaries = function () {
    return IWR.DATA.summaries.slice();
  };

  IWR.DATA.getAllQuestionIds = function () {
    var ids = [];
    Object.keys(IWR.DATA.days).forEach(function (dayId) {
      var day = IWR.DATA.days[dayId];
      if (day.interviewQuestions) {
        day.interviewQuestions.forEach(function (q) {
          ids.push(q.id);
        });
      }
    });
    return ids;
  };

  IWR.DATA.getQuestion = function (questionId) {
    var days = IWR.DATA.days;
    for (var d in days) {
      if (!Object.prototype.hasOwnProperty.call(days, d)) continue;
      var questions = days[d].interviewQuestions || [];
      for (var i = 0; i < questions.length; i++) {
        if (questions[i].id === questionId) return questions[i];
      }
    }
    return null;
  };
})(window);
