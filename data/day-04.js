(function () {
  'use strict';
  var DATA = window.InterviewWarRoom.DATA;
  DATA.registerDay(4, {
    id: 4,
    week: 1,
    title: 'React Fundamentals',
    goal: 'Explain React rendering, composition, and hooks basics at senior interview depth.',

    topics: [
      {
        id: 'd4-t1',
        title: 'Functional components',
        summary: 'Pure render functions, composition, and colocation of UI logic.',
        resources: [
          { type: 'mdn', label: 'React docs — Components', url: 'https://react.dev/learn/your-first-component' },
          { type: 'youtube', label: 'YouTube — React tutorial (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=SqcY0GlETPk' },
        ],
      },
      {
        id: 'd4-t2',
        title: 'Props & state',
        summary: 'Unidirectional data flow, lifting state, and controlled vs uncontrolled inputs.',
        resources: [
          { type: 'mdn', label: 'React docs — State', url: 'https://react.dev/learn/state-a-components-memory' },
          { type: 'youtube', label: 'YouTube — useState (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=O6P86uwfdR0' },
        ],
      },
      {
        id: 'd4-t3',
        title: 'Rendering model',
        summary: 'Reconciliation, keys, and what triggers re-renders.',
        resources: [
          { type: 'mdn', label: 'React docs — Rendering', url: 'https://react.dev/learn/render-and-commit' },
          { type: 'youtube', label: 'YouTube — React state (Net Ninja)', url: 'https://www.youtube.com/watch?v=4pO-HcG2igk' },
        ],
      },
      {
        id: 'd4-t4',
        title: 'Hooks intro',
        summary: 'Rules of hooks, useState basics, and mental model vs class lifecycle.',
        resources: [
          { type: 'mdn', label: 'React docs — Hooks', url: 'https://react.dev/reference/react/hooks' },
          { type: 'youtube', label: 'YouTube — Hooks intro (Dan Abramov, React Conf)', url: 'https://www.youtube.com/watch?v=dpw9EHDh2bM' },
        ],
      },
      {
        id: 'd4-t5',
        title: 'Component lifecycle (modern view)',
        summary: 'Mount/update/unmount mapped to useEffect phases.',
        resources: [
          { type: 'mdn', label: 'React docs — Synchronizing with Effects', url: 'https://react.dev/learn/synchronizing-with-effects' },
          { type: 'youtube', label: 'YouTube — useEffect (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=0ZJgIjIuY7U' },
        ],
      },
    ],

    exercises: [
      'Build dashboard layout shell: sidebar, header, content, responsive grid.',
      'Extract reusable Card, Table, and EmptyState components.',
      'Demonstrate controlled form with validation states.',
    ],

    architecture: {
      title: 'React UI layer in enterprise apps',
      insights: [
        'Container/presentational split still useful — separate data hooks from pure UI.',
        'Keys must be stable — index keys cause subtle list bugs under reorder/filter.',
      ],
      tradeoffs: [
        'Colocating state vs lifting too early — prop drilling signals composition or context need.',
        'Server Components vs classic SPA — know your stack for the interview.',
      ],
      scalability: [
        'Component API design (props surface) impacts refactor cost across design system consumers.',
        'Composition over inheritance for extension.',
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
        expectedAnswerDirection: 'Historical context → hooks standard → testing/simplicity → legacy maintenance → error boundaries.',
        seniorTalkingPoints: ['Functions + hooks for new code', 'Custom hooks replace many HOC patterns'],
        commonMistakes: ['Claims classes fully deprecated', 'Cannot explain error boundaries'],
        followUpQuestions: ['Migrate large class component safely?'],
        architectureAngle: 'Incremental migration strategy per feature folder — strangler pattern.',
        enterpriseTradeoffs: ['Big-bang rewrite vs coexistence period'],
        scalabilityDiscussion: ['Class remnants in vendor libs — adapter layer'],
        verbalPracticeMinutes: 4,
        mockEligible: false,
      },
      {
        id: 'd4-q2',
        question: 'Why hooks?',
        tags: ['react'],
        expectedAnswerDirection: 'Reuse stateful logic → avoid wrapper hell → colocate effects → rules enforce valid usage.',
        seniorTalkingPoints: ['useReducer for local state machines', 'Shared hooks in design system'],
        commonMistakes: ['Calling hooks conditionally', 'Context for everything'],
        followUpQuestions: ['Design useAuth API for multi-tenant app?'],
        architectureAngle: 'Custom hooks are team vocabulary — document contracts and error states.',
        enterpriseTradeoffs: ['Shared hooks package vs colocated feature hooks'],
        scalabilityDiscussion: ['Hook composition depth and testability at scale'],
        verbalPracticeMinutes: 5,
        mockEligible: true,
      },
      {
        id: 'd4-q3',
        question: 'Explain component lifecycle in modern React.',
        tags: ['react'],
        expectedAnswerDirection: 'Mount/update/unmount → useEffect → cleanup → deps → Strict Mode double invoke.',
        seniorTalkingPoints: ['useLayoutEffect for DOM measure before paint', 'Separate render vs effects vs handlers'],
        commonMistakes: ['useEffect as componentDidMount only', 'Missing subscription cleanup'],
        followUpQuestions: ['useLayoutEffect vs useEffect?'],
        architectureAngle: 'Effect boundaries: data fetching moving to query libraries — lifecycle mental model still required.',
        enterpriseTradeoffs: ['Raw useEffect fetch vs React Query adoption curve'],
        scalabilityDiscussion: ['Effect orchestration across 50+ feature modules'],
        verbalPracticeMinutes: 5,
        mockEligible: true,
      },
      {
        id: 'd4-q4',
        question: 'How does reconciliation work and why do keys matter?',
        tags: ['react'],
        expectedAnswerDirection: 'Render → diff virtual tree → commit DOM updates → keys identify identity → index key bugs on reorder.',
        seniorTalkingPoints: ['Keyed list preserves component state correctly', 'Same component type + different key = remount'],
        commonMistakes: ['Index keys in sortable/filterable lists', 'Random keys each render'],
        followUpQuestions: ['Bug when using Date.now() as key?'],
        architectureAngle: 'Data table row identity — stable id from server required.',
        enterpriseTradeoffs: ['Remount vs update — when to force remount with key change'],
        scalabilityDiscussion: ['Virtualized lists need stable keys for scroll position'],
        verbalPracticeMinutes: 4,
        mockEligible: false,
      },
      {
        id: 'd4-q5',
        question: 'Controlled vs uncontrolled inputs — when do you choose which?',
        tags: ['react'],
        expectedAnswerDirection: 'Controlled: React owns value → validation/sync → uncontrolled: ref/DOM for simple/file → hybrid patterns.',
        seniorTalkingPoints: ['File inputs often uncontrolled', 'React Hook Form uses refs internally'],
        commonMistakes: ['Mixing value and defaultValue', 'Controlled without onChange'],
        followUpQuestions: ['Large form performance — controlled overhead?'],
        architectureAngle: 'Form library choice affects entire admin module architecture.',
        enterpriseTradeoffs: ['Full controlled for a11y vs library abstraction'],
        scalabilityDiscussion: ['100-field form — uncontrolled + validation on submit'],
        verbalPracticeMinutes: 4,
        mockEligible: false,
      },
      {
        id: 'd4-q6',
        question: 'What triggers a re-render and how do you avoid unnecessary ones?',
        tags: ['react'],
        expectedAnswerDirection: 'State/props/context change → parent re-render → memo boundaries → stable props → profile first.',
        seniorTalkingPoints: ['Context value object recreated each render', 'Children as prop causes re-render'],
        commonMistakes: ['Memo everything without profiling', 'Inline object props to memo child'],
        followUpQuestions: ['React Compiler change this advice?'],
        architectureAngle: 'Profiler-driven optimization in CI smoke tests for critical routes.',
        enterpriseTradeoffs: ['Premature memo vs readable code'],
        scalabilityDiscussion: ['Dashboard with 20 widgets — composition to isolate renders'],
        verbalPracticeMinutes: 5,
        mockEligible: false,
      },
      {
        id: 'd4-q7',
        question: 'Error boundaries — what do they catch and what do they not?',
        tags: ['react'],
        expectedAnswerDirection: 'Catch render/lifecycle errors in children → not event handlers/async → fallback UI → logging → reset strategy.',
        seniorTalkingPoints: ['react-error-boundary library', 'Route-level boundary for admin sections'],
        commonMistakes: ['Expecting boundary to catch fetch errors', 'No recovery UX'],
        followUpQuestions: ['Where place boundaries in large SPA?'],
        architectureAngle: 'Error boundary + monitoring integration — Sentry component stack.',
        enterpriseTradeoffs: ['Granular boundaries vs single app-level fallback'],
        scalabilityDiscussion: ['Micro-frontend isolation — boundary per remote module'],
        verbalPracticeMinutes: 4,
        mockEligible: false,
      },
    ],

    revision: [
      'Rebuild dashboard layout from scratch in 45 minutes.',
      'Recite hooks rules without notes.',
      'Re-rate Day 4 questions after verbal reps.',
    ],

    deliverable: {
      title: 'Dashboard Shell Drill',
      rapidFireConcepts: [
        'What triggers a React re-render?',
        'Why index keys break on filter?',
        'Controlled input requires which two props?',
      ],
      implementationTasks: [
        '90 min: dashboard layout + 3 reusable components.',
        '30 min: controlled form with validation states.',
      ],
      verbalExplanationChallenge: 'Record 5-min audio: React render pipeline from setState to DOM paint.',
    },
  });
})();
