(function () {
  'use strict';
  var DATA = window.InterviewWarRoom.DATA;
  DATA.registerDay(5, {
    id: 5,
    week: 1,
    title: 'React Hooks Advanced',
    topics: [
      { id: 'd5-t1', title: 'useEffect', summary: 'Dependencies, stale closures, and separating concerns into multiple effects.' },
      { id: 'd5-t2', title: 'useMemo & useCallback', summary: 'Referential stability vs unnecessary optimization.' },
      { id: 'd5-t3', title: 'useRef', summary: 'DOM refs, mutable instance values, and avoiding re-renders.' },
      { id: 'd5-t4', title: 'Custom hooks', summary: 'Extracting domain logic: useFetch, useDebounce, useLocalStorage.' },
    ],
    exercises: [
      'Optimize a list component: memo, useCallback, measure with React DevTools Profiler.',
      'Build custom hooks: useDebounce, usePrevious, useIntersectionObserver stub.',
      'Fix a buggy useEffect with incorrect dependencies.',
    ],
    architecture: {
      title: 'Performance discipline with hooks',
      insights: [
        'Premature memoization adds complexity; profile first, optimize hot paths.',
        'Custom hooks are your team\'s shared vocabulary—document contracts and error states.',
      ],
      tradeoffs: [
        'useMemo for expensive compute vs simpler refactor to move work outside render.',
        'Colocating many useEffects vs one god effect—readability and testability.',
      ],
      scalability: [
        'Stable callback identities matter for memoized child components in virtualized lists.',
        'Effect orchestration across micro-frontends may need event bus or shared query layer (TanStack Query).',
      ],
    },
    verbalPractice: [
      {
        id: 'd5-v1',
        topic: 'useMemo vs useCallback',
        instruction: 'Explain when you would use each, and when you would remove them, for 5 minutes.',
        durationMinutes: 5,
        structure: ['Definitions', 'Concrete dashboard example', 'Profiler story', 'Anti-patterns'],
      },
    ],
    interviewQuestions: [
      {
        id: 'd5-q1',
        question: 'When to use useMemo?',
        tags: ['react', 'performance'],
        expectedAnswerDirection: 'Expensive derived data → referential equality for deps → not for cheap ops → measure first.',
        seniorTalkingPoints: [
          'Virtualized tables: memoize row models and column definitions.',
          'Deriving filtered datasets from 10k rows—memoize with correct deps.',
        ],
        commonMistakes: [
          'Wrapping every primitive derivation in useMemo.',
          'Wrong dependency arrays causing stale UI.',
        ],
        followUpQuestions: [
          'How do React Compiler / automatic memoization change this advice?',
        ],
      },
      {
        id: 'd5-q2',
        question: 'Difference between useMemo and useCallback?',
        tags: ['react', 'performance'],
        expectedAnswerDirection: 'useMemo caches values → useCallback caches functions → both preserve referential identity → solve different child prop stability issues.',
        seniorTalkingPoints: [
          'useCallback alone useless if child not memoized.',
          'Passing inline objects to memoized children breaks optimization.',
        ],
        commonMistakes: [
          'useCallback around every handler without memo children.',
        ],
        followUpQuestions: [
          'Optimize a parent passing { onClick, style } to memoized child.',
        ],
      },
      {
        id: 'd5-q3',
        question: 'Common useEffect mistakes?',
        tags: ['react'],
        expectedAnswerDirection: 'Missing/wrong deps → no cleanup → fetching without race handling → using effect for events → dependency on unstable objects.',
        seniorTalkingPoints: [
          'AbortController in fetch effects; ignore flag pattern.',
          'Split sync adjustment (useLayoutEffect) vs data fetch effect.',
        ],
        commonMistakes: [
          'Empty deps on values that change.',
          'Setting state on unmounted components.',
        ],
        followUpQuestions: [
          'How would you structure data fetching today—raw useEffect vs React Query?',
        ],
      },
    ],
    revision: ['Profile one component before and after optimization.', 'List three custom hooks your admin dashboard would need.'],
  });
})();
