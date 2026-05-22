(function (global) {
  'use strict';

  global.InterviewWarRoom = global.InterviewWarRoom || {};

  global.InterviewWarRoom.META = {
    version: 1,
    week1Days: [1, 2, 3, 4, 5, 6, 7],
    totalDays: 7,
    storageKeys: {
      progress: 'interviewWarRoom:progress',
      notes: 'interviewWarRoom:notes',
      mockSessions: 'interviewWarRoom:mockSessions',
      settings: 'interviewWarRoom:settings',
    },
    readinessBands: [
      { max: 39, label: 'Building Foundation' },
      { max: 59, label: 'Closing Gaps' },
      { max: 74, label: 'Interview Capable' },
      { max: 89, label: 'War Room Ready' },
      { max: 100, label: 'Senior Loop Ready' },
    ],
    readinessWeights: {
      completion: 0.3,
      confidence: 0.25,
      mock: 0.25,
      streak: 0.2,
    },
    statusLabels: {
      not_started: 'Not Started',
      in_progress: 'In Progress',
      completed: 'Completed',
      skipped: 'Skipped',
    },
  };
})(window);
