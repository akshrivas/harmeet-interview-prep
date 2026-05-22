(function () {
  'use strict';
  var DATA = window.InterviewWarRoom.DATA;
  DATA.registerDay(6, {
    id: 6,
    week: 1,
    title: 'State Management',
    topics: [
      { id: 'd6-t1', title: 'Context API', summary: 'Provider composition, performance pitfalls, and splitting contexts.' },
      { id: 'd6-t2', title: 'Redux Toolkit', summary: 'Slices, RTK Query, and predictable updates for complex domains.' },
      { id: 'd6-t3', title: 'State architecture', summary: 'Local vs server vs URL vs form state boundaries.' },
      { id: 'd6-t4', title: 'Scalable state strategy', summary: 'Feature folders, entity normalization, and avoiding global soup.' },
    ],
    exercises: [
      'Implement auth flow: login state, token storage, protected route guard pattern (conceptual UI).',
      'Model dashboard filters in Redux slice or Context—justify choice in comments.',
      'Diagram data flow for a widget with server pagination.',
    ],
    architecture: {
      title: 'State at scale',
      insights: [
        'Not all state belongs in Redux—URL and server cache often better homes.',
        'Context re-renders all consumers on any value change unless split/selective patterns used.',
      ],
      tradeoffs: [
        'Redux ceremony vs Zustand/Jotai simplicity for mid-size apps.',
        'RTK Query vs TanStack Query for server state—team consistency matters more than holy wars.',
      ],
      scalability: [
        'Normalized entities prevent O(n²) updates in large tables.',
        'Cross-micro-frontend shared state: custom events, module federation shared store, or BFF session.',
      ],
    },
    verbalPractice: [
      {
        id: 'd6-v1',
        topic: 'Context vs Redux decision',
        instruction: 'Walk through how you would choose state tooling for a new enterprise dashboard for 5 minutes.',
        durationMinutes: 5,
        structure: ['State taxonomy', 'Decision matrix', 'Team governance', 'Migration path'],
      },
    ],
    interviewQuestions: [
      {
        id: 'd6-q1',
        question: 'Context vs Redux?',
        tags: ['react', 'state'],
        expectedAnswerDirection: 'Context for low-frequency broad config/theme/auth snapshot → Redux for complex shared domain with middleware/devtools/time-travel debugging needs → server state libraries separate.',
        seniorTalkingPoints: [
          'Split contexts: ThemeContext vs UserContext to limit re-renders.',
          'Redux for many writers/readers on same normalized entities.',
        ],
        commonMistakes: [
          'Putting entire app state in one Context.',
          'Using Redux for every piece of form UI state.',
        ],
        followUpQuestions: [
          'How do you prevent context re-render storms?',
        ],
      },
      {
        id: 'd6-q2',
        question: 'When NOT to use Redux?',
        tags: ['react', 'state'],
        expectedAnswerDirection: 'Small apps → local state enough → server cache layer handles async → Redux cost not justified → alternative lighter stores.',
        seniorTalkingPoints: [
          'Redux value rises with cross-feature invalidation and audit requirements.',
          'Regulated industries sometimes favor explicit action logs.',
        ],
        commonMistakes: [
          'Cargo-cult Redux on bootcamp apps.',
        ],
        followUpQuestions: [
          'Describe state ownership across 4 squads on one SPA.',
        ],
      },
      {
        id: 'd6-q3',
        question: 'Large-scale state strategy?',
        tags: ['react', 'architecture'],
        expectedAnswerDirection: 'Categorize state → boundaries per feature → normalize entities → colocate slices → async via query layer → document conventions.',
        seniorTalkingPoints: [
          'Feature-based slice ownership in monorepo aligns with CODEOWNERS.',
          'Optimistic updates need rollback and conflict strategy.',
        ],
        commonMistakes: [
          'Single global store object updated anywhere without patterns.',
        ],
        followUpQuestions: [
          'How would you debug a production-only state desync?',
        ],
      },
    ],
    revision: ['Draw Redux data flow from UI click to DOM update.', 'List what stays local in your dashboard exercise.'],
  });
})();
