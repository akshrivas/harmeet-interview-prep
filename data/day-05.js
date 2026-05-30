(function () {
  'use strict';
  var DATA = window.InterviewWarRoom.DATA;
  DATA.registerDay(5, {
    id: 5,
    week: 1,
    title: 'React Hooks Advanced',
    goal: 'Use hooks with performance discipline — effects, memoization, refs, and custom hook design.',

    topics: [
      {
        id: 'd5-t1',
        title: 'useEffect',
        summary: 'Dependencies, stale closures, and separating concerns into multiple effects.',
        resources: [
          { type: 'mdn', label: 'React docs — useEffect', url: 'https://react.dev/reference/react/useEffect' },
          { type: 'youtube', label: 'YouTube — useEffect (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=0ZJgIjIuY7U' },
        ],
      },
      {
        id: 'd5-t2',
        title: 'useMemo & useCallback',
        summary: 'Referential stability vs unnecessary optimization.',
        resources: [
          { type: 'mdn', label: 'React docs — useMemo', url: 'https://react.dev/reference/react/useMemo' },
          { type: 'youtube', label: 'YouTube — useMemo (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=THL1OPn72vo' },
          { type: 'youtube', label: 'YouTube — useCallback (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=TNvRy_OMJP4' },
        ],
      },
      {
        id: 'd5-t3',
        title: 'useRef',
        summary: 'DOM refs, mutable instance values, and avoiding re-renders.',
        resources: [
          { type: 'mdn', label: 'React docs — useRef', url: 'https://react.dev/reference/react/useRef' },
          { type: 'youtube', label: 'YouTube — useRef (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=t2ypzz6gJm0' },
        ],
      },
      {
        id: 'd5-t4',
        title: 'Custom hooks',
        summary: 'Extracting domain logic: useFetch, useDebounce, useLocalStorage.',
        resources: [
          { type: 'mdn', label: 'React docs — Reusing logic with custom Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks' },
          { type: 'youtube', label: 'YouTube — useEffect patterns (Tapas Adhikary)', url: 'https://www.youtube.com/watch?v=p6xX2oFJpAM' },
        ],
      },
    ],

    exercises: [
      'Optimize a list component: memo, useCallback, measure with React DevTools Profiler.',
      'Build custom hooks: useDebounce, usePrevious, useIntersectionObserver stub.',
      'Fix a buggy useEffect with incorrect dependencies.',
    ],

    architecture: {
      title: 'Performance discipline with hooks',
      insights: [
        'Premature memoization adds complexity — profile first, optimize hot paths.',
        'Custom hooks are shared vocabulary — document contracts and error states.',
      ],
      tradeoffs: [
        'useMemo for expensive compute vs refactor to move work outside render.',
        'Many useEffects vs one god effect — readability and testability.',
      ],
      scalability: [
        'Stable callback identities matter for memoized children in virtualized lists.',
        'Effect orchestration may need shared query layer (TanStack Query).',
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
        seniorTalkingPoints: ['Virtualized tables: memoize row models', '10k row filter dataset'],
        commonMistakes: ['useMemo on every primitive', 'Wrong deps causing stale UI'],
        followUpQuestions: ['React Compiler change this advice?'],
        architectureAngle: 'Performance budget per route — memo only after Profiler proof.',
        enterpriseTradeoffs: ['Readability vs micro-optimizations in shared components'],
        scalabilityDiscussion: ['Memo cache unbounded — memory risk in long sessions'],
        verbalPracticeMinutes: 4,
        mockEligible: true,
      },
      {
        id: 'd5-q2',
        question: 'Difference between useMemo and useCallback?',
        tags: ['react', 'performance'],
        expectedAnswerDirection: 'useMemo caches values → useCallback caches functions → referential identity → different child prop issues.',
        seniorTalkingPoints: ['useCallback useless if child not memoized', 'Inline objects break memo child'],
        commonMistakes: ['useCallback on every handler without memo children'],
        followUpQuestions: ['Optimize parent passing { onClick, style } to memo child?'],
        architectureAngle: 'Design-system Button memo + stable handlers — documented pattern.',
        enterpriseTradeoffs: ['Team-wide memo discipline vs eslint exhaustive-deps only'],
        scalabilityDiscussion: ['Virtualized list 500 rows — callback identity per row mistake'],
        verbalPracticeMinutes: 4,
        mockEligible: true,
      },
      {
        id: 'd5-q3',
        question: 'Common useEffect mistakes?',
        tags: ['react'],
        expectedAnswerDirection: 'Wrong deps → no cleanup → fetch race → effect for events → unstable object deps.',
        seniorTalkingPoints: ['AbortController in fetch effects', 'Split useLayoutEffect for DOM measure'],
        commonMistakes: ['Empty deps on changing values', 'setState on unmounted component'],
        followUpQuestions: ['useEffect fetch vs React Query today?'],
        architectureAngle: 'Platform hook useQuery replaces raw fetch effects — still explain effect semantics.',
        enterpriseTradeoffs: ['Adopt TanStack Query squad-by-squad vs mandate'],
        scalabilityDiscussion: ['50 components fetching on mount — waterfall problem'],
        verbalPracticeMinutes: 5,
        mockEligible: true,
      },
      {
        id: 'd5-q4',
        question: 'Design a custom useFetch hook — API contract and edge cases.',
        tags: ['react', 'architecture'],
        expectedAnswerDirection: 'loading/error/data states → abort on unmount → refetch → stale response guard → generic types.',
        seniorTalkingPoints: ['Return { data, error, isLoading, refetch, abort }', 'Do not fetch in render'],
        commonMistakes: ['No abort', 'Missing dependency causes infinite loop'],
        followUpQuestions: ['When retire custom hook for React Query?'],
        architectureAngle: 'Internal SDK hook versioned — breaking changes need migration guide.',
        enterpriseTradeoffs: ['Build vs buy for data fetching layer'],
        scalabilityDiscussion: ['Cache deduplication across components'],
        verbalPracticeMinutes: 5,
        mockEligible: false,
      },
      {
        id: 'd5-q5',
        question: 'useRef vs useState — when is ref the right tool?',
        tags: ['react'],
        expectedAnswerDirection: 'Ref: mutable value without re-render → DOM access → previous value → timer ids → not for UI display.',
        seniorTalkingPoints: ['requestId in ref for race guard', 'Do not read ref.current during render for UI'],
        commonMistakes: ['Storing display data in ref', 'Ref instead of state to avoid re-render when UI must update'],
        followUpQuestions: ['useRef for form uncontrolled bridge?'],
        architectureAngle: 'Refs for imperative widget integrations (maps, charts).',
        enterpriseTradeoffs: ['Imperative API vs fully React-controlled wrapper'],
        scalabilityDiscussion: ['Thousands of refs in virtualized grid — pattern alternatives'],
        verbalPracticeMinutes: 4,
        mockEligible: false,
      },
      {
        id: 'd5-q6',
        question: 'React Strict Mode double invoke — what breaks and why?',
        tags: ['react'],
        expectedAnswerDirection: 'Dev-only double mount/effect → exposes missing cleanup → subscriptions fire twice → fix cleanup not disable StrictMode.',
        seniorTalkingPoints: ['WebSocket double connect without cleanup', 'Duplicate analytics in dev if not guarded'],
        commonMistakes: ['Disabling StrictMode instead of fixing effects', 'Production-only bugs from missing cleanup'],
        followUpQuestions: ['How test effect cleanup?'],
        architectureAngle: 'CI runs with StrictMode — treat double invoke as quality gate.',
        enterpriseTradeoffs: ['Dev noise vs long-term leak prevention'],
        scalabilityDiscussion: ['Shared effects in design-system hooks must be StrictMode-safe'],
        verbalPracticeMinutes: 4,
        mockEligible: false,
      },
      {
        id: 'd5-q7',
        question: 'When would you remove useMemo/useCallback you added earlier?',
        tags: ['react', 'performance'],
        expectedAnswerDirection: 'Profiler shows no gain → child not memoized → deps churn → simpler refactor → React Compiler auto-memo.',
        seniorTalkingPoints: ['Removed 40 useCallbacks after React Compiler pilot', 'Measure before and after INP/LCP'],
        commonMistakes: ['Never revisiting optimizations', 'Keeping memo with broken deps'],
        followUpQuestions: ['Performance regression test in CI?'],
        architectureAngle: 'Tech debt sprint to remove cargo-cult memo from legacy PRs.',
        enterpriseTradeoffs: ['Compiler adoption vs manual memo maintenance'],
        scalabilityDiscussion: ['Org-wide lint rule against useCallback without memo child'],
        verbalPracticeMinutes: 4,
        mockEligible: false,
      },
    ],

    revision: [
      'Profile one component before and after optimization.',
      'List three custom hooks your admin dashboard would need.',
      'Re-rate Day 5 questions after verbal reps.',
    ],

    deliverable: {
      title: 'Hooks Optimization Drill',
      rapidFireConcepts: [
        'useCallback without React.memo — useful?',
        'useEffect cleanup runs when?',
        'useRef update triggers re-render?',
      ],
      implementationTasks: [
        '60 min: useDebounce + useFetch custom hooks.',
        '30 min: fix effect with wrong deps + add AbortController.',
      ],
      verbalExplanationChallenge: 'Record 4-min audio: useMemo vs useCallback with one Profiler screenshot story.',
    },
  });
})();
