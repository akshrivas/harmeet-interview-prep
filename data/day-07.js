(function () {
  'use strict';
  var DATA = window.InterviewWarRoom.DATA;
  DATA.registerDay(7, {
    id: 7,
    week: 1,
    title: 'Week 1 Revision + Mock Interview',
    topics: [
      { id: 'd7-t1', title: 'Week 1 concept synthesis', summary: 'Connect JS fundamentals → async → ES6 → React core → hooks → state.' },
      { id: 'd7-t2', title: 'Architecture narrative', summary: 'Tell the story of a scalable admin dashboard frontend.' },
      { id: 'd7-t3', title: 'Weak area targeting', summary: 'Use War Room weakness board to prioritize final reps.' },
    ],
    exercises: [
      'Complete Mini Admin Dashboard deliverable: login flow UI, API integration, dashboard cards, reusable layout.',
      'Run 2 mock interview sessions from the Week 1 pack.',
      'Verbal architecture explanation: 10-minute frontend structure walkthrough recorded or live to peer.',
    ],
    architecture: {
      title: 'Week 1 capstone — Mini Admin Dashboard',
      insights: [
        'Deliverable proves integration: auth boundary, data layer, component library, and state boundaries working together.',
        'Interviewers care about tradeoff narration, not pixel-perfect UI.',
      ],
      tradeoffs: [
        'Monolith SPA vs micro-frontend for internal admin—justify based on team topology.',
        'Client-side auth guard vs server-enforced routes—never rely on UI-only security.',
      ],
      scalability: [
        'Lazy routes for infrequently used admin modules.',
        'Role-based feature flags at route and component level.',
      ],
    },
    verbalPractice: [
      {
        id: 'd7-v1',
        topic: 'Full Week 1 verbal recap',
        instruction: 'Explain your Mini Admin Dashboard architecture verbally for 10 minutes as in a senior loop.',
        durationMinutes: 10,
        structure: ['Problem & users', 'Folder structure', 'State & data', 'Auth', 'Performance', 'Testing approach'],
      },
    ],
    interviewQuestions: [
      {
        id: 'd7-q1',
        question: 'Walk me through the architecture of your Week 1 admin dashboard.',
        tags: ['react', 'architecture'],
        expectedAnswerDirection: 'User goals → folder/module layout → component library → state categories → API layer → auth → error/loading → how you would scale team ownership.',
        seniorTalkingPoints: [
          'Explicit boundaries: features/, shared/, entities/, app/.',
          'API client with interceptors; error boundary at route level.',
          'Observable metrics: LCP on dashboard, failed API rate.',
        ],
        commonMistakes: [
          'Only describing folder names without data flow.',
          'No mention of auth token refresh or RBAC.',
        ],
        followUpQuestions: [
          'How would 3 teams contribute without merge conflicts daily?',
          'What breaks first at 10x data volume?',
        ],
      },
      {
        id: 'd7-q2',
        question: 'Explain React architecture verbally — hooks, state, and rendering.',
        tags: ['react'],
        expectedAnswerDirection: 'Synthesize week: render model → hooks rules → effect discipline → state split → performance tools.',
        seniorTalkingPoints: [
          'Connect to real bugs fixed during the week exercises.',
          'Mention DevTools Profiler and React Query where appropriate.',
        ],
        commonMistakes: [
          'Disconnected definitions without a cohesive system story.',
        ],
        followUpQuestions: [
          'If you joined a class-component codebase Monday, what is your 30-day plan?',
        ],
      },
    ],
    revision: [
      'Revise all Week 1 weak areas from dashboard threat board.',
      'Re-run lowest-scoring mock questions.',
      'Finalize dashboard deliverable README with architecture diagram (paper or ASCII).',
    ],
  });
})();
