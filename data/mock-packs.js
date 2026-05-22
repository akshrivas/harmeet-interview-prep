(function (global) {
  'use strict';

  var IWR = global.InterviewWarRoom = global.InterviewWarRoom || {};
  IWR.DATA = IWR.DATA || {};
  IWR.DATA.mockPacks = {
    week1_full: {
      id: 'week1_full',
      title: 'Week 1 — Full Mock Round',
      description: 'JavaScript + React fundamentals mixed round (~35 min)',
      durationMinutes: 35,
      defaultQuestionMinutes: 5,
      questionIds: [
        'd1-q1',
        'd1-q2',
        'd2-q1',
        'd3-q1',
        'd4-q2',
        'd5-q2',
        'd6-q1',
        'd7-q1',
      ],
    },
    week1_js: {
      id: 'week1_js',
      title: 'Week 1 — JavaScript Deep',
      description: 'Closures, event loop, async, ES6',
      durationMinutes: 20,
      defaultQuestionMinutes: 5,
      questionIds: ['d1-q1', 'd1-q2', 'd1-q3', 'd2-q1', 'd2-q2', 'd3-q2'],
    },
    week1_react: {
      id: 'week1_react',
      title: 'Week 1 — React Round',
      description: 'Hooks, lifecycle, state, architecture',
      durationMinutes: 25,
      defaultQuestionMinutes: 5,
      questionIds: ['d4-q2', 'd4-q3', 'd5-q1', 'd5-q3', 'd6-q1', 'd7-q1'],
    },
  };

  IWR.DATA.getMockPack = function (packId) {
    return IWR.DATA.mockPacks[packId] || null;
  };

  IWR.DATA.getDefaultMockPackId = function () {
    return 'week1_full';
  };
})(window);
