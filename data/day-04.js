(function () {
  'use strict';
  var DATA = window.InterviewWarRoom.DATA;
  DATA.registerDay(4, {
    id: 4,
    week: 1,
    title: 'React Fundamentals',
    topics: [
      { id: 'd4-t1', title: 'Functional components', summary: 'Pure render functions, composition, and colocation of UI logic.' },
      { id: 'd4-t2', title: 'Props & state', summary: 'Unidirectional data flow, lifting state, and controlled vs uncontrolled inputs.' },
      { id: 'd4-t3', title: 'Rendering model', summary: 'Reconciliation, keys, and what triggers re-renders.' },
      { id: 'd4-t4', title: 'Hooks intro', summary: 'Rules of hooks, useState basics, and mental model vs class lifecycle.' },
      { id: 'd4-t5', title: 'Component lifecycle (modern view)', summary: 'Mount/update/unmount mapped to useEffect phases.' },
    ],
    exercises: [
      'Build dashboard layout shell: sidebar, header, content, responsive grid.',
      'Extract reusable Card, Table, and EmptyState components.',
      'Demonstrate controlled form with validation states.',
    ],
    architecture: {
      title: 'React UI layer in enterprise apps',
      insights: [
        'Container/presentational split still useful conceptually even with hooks—separate data hooks from pure UI.',
        'Keys must be stable—using index keys causes subtle list bugs under reorder/filter.',
      ],
      tradeoffs: [
        'Colocating state vs lifting too early—prop drilling signals need for composition or context.',
        'Server components (if Next) vs classic SPA—know your stack for the interview.',
      ],
      scalability: [
        'Component API design (props surface) impacts refactor cost across design system consumers.',
        'Render props / composition vs inheritance for extension.',
      ],
    },
    verbalPractice: [
      {
        id: 'd4-v1',
        topic: 'React rendering and reconciliation',
        instruction: 'Explain how React decides what to update in the DOM for 5 minutes.',
        durationMinutes: 5,
        structure: ['Virtual DOM purpose', 'Diff/reconciliation', 'Keys', 'Performance hook mention'],
      },
    ],
    interviewQuestions: [
      {
        id: 'd4-q1',
        question: 'Class vs functional components?',
        tags: ['react'],
        expectedAnswerDirection: 'Historical context → hooks as standard → testing/simplicity → legacy maintenance → error boundaries still class-only (until newer APIs).',
        seniorTalkingPoints: [
          'Teams standardize on functions + hooks for new code; classes remain in older modules.',
          'Custom hooks replace HOC patterns for cross-cutting concerns.',
        ],
        commonMistakes: [
          'Claiming classes are deprecated entirely.',
          'Cannot explain when error boundaries matter.',
        ],
        followUpQuestions: [
          'How do you migrate a large class component safely?',
        ],
      },
      {
        id: 'd4-q2',
        question: 'Why hooks?',
        tags: ['react'],
        expectedAnswerDirection: 'Reuse stateful logic → avoid wrapper hell → colocate related effects → rules enforce valid usage.',
        seniorTalkingPoints: [
          'useReducer for complex local state machines.',
          'Hooks enable design system behaviors (useMediaQuery) shared across apps.',
        ],
        commonMistakes: [
          'Calling hooks conditionally.',
          'Replacing all context with hooks without architecture thought.',
        ],
        followUpQuestions: [
          'Design a useAuth hook API for a multi-tenant app.',
        ],
      },
      {
        id: 'd4-q3',
        question: 'Explain component lifecycle in modern React.',
        tags: ['react'],
        expectedAnswerDirection: 'Map mount/update/unmount to useEffect → cleanup functions → dependency array semantics → strict mode double invoke awareness.',
        seniorTalkingPoints: [
          'useLayoutEffect for DOM measurement before paint.',
          'Separation: rendering vs effects vs event handlers.',
        ],
        commonMistakes: [
          'Treating useEffect as componentDidMount only.',
          'Missing cleanup on subscriptions causing leaks.',
        ],
        followUpQuestions: [
          'When would you choose useLayoutEffect over useEffect?',
        ],
      },
    ],
    revision: ['Rebuild dashboard layout from scratch in 45 minutes.', 'Recite hooks rules without notes.'],
  });
})();
