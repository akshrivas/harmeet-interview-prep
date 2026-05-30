(function () {
  'use strict';
  var DATA = window.InterviewWarRoom.DATA;
  DATA.registerDay(6, {
    id: 6,
    week: 1,
    title: 'State Management',
    goal: 'Choose and defend state architecture — local, context, server cache, and Redux at scale.',

    topics: [
      {
        id: 'd6-t1',
        title: 'Context API',
        summary: 'Provider composition, performance pitfalls, and splitting contexts.',
        resources: [
          { type: 'mdn', label: 'React docs — useContext', url: 'https://react.dev/reference/react/useContext' },
          { type: 'youtube', label: 'YouTube — useContext (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=5LrDIWkK_Bc' },
        ],
      },
      {
        id: 'd6-t2',
        title: 'Redux Toolkit',
        summary: 'Slices, RTK Query, and predictable updates for complex domains.',
        resources: [
          { type: 'mdn', label: 'Redux docs — Redux Toolkit', url: 'https://redux-toolkit.js.org/' },
          { type: 'youtube', label: 'YouTube — Redux Toolkit (Dave Gray)', url: 'https://www.youtube.com/watch?v=u3KlatzB7GM' },
        ],
      },
      {
        id: 'd6-t3',
        title: 'State architecture',
        summary: 'Local vs server vs URL vs form state boundaries.',
        resources: [
          { type: 'article', label: 'React docs — Choosing the State Structure', url: 'https://react.dev/learn/choosing-the-state-structure' },
          { type: 'youtube', label: 'YouTube — Redux Toolkit CRUD (PedroTech)', url: 'https://www.youtube.com/watch?v=QgK_-G-hWeA' },
        ],
      },
      {
        id: 'd6-t4',
        title: 'Scalable state strategy',
        summary: 'Feature folders, entity normalization, and avoiding global soup.',
        resources: [
          { type: 'article', label: 'Redux docs — Normalizing state', url: 'https://redux.js.org/usage/structuring-reducers/normalizing-state-shape' },
          { type: 'youtube', label: 'YouTube — Redux full course (Dave Gray)', url: 'https://www.youtube.com/watch?v=NqzdVN2tyvQ' },
        ],
      },
    ],

    exercises: [
      'Implement auth flow: login state, token storage, protected route guard (conceptual UI).',
      'Model dashboard filters in Redux slice or Context — justify choice in comments.',
      'Diagram data flow for a widget with server pagination.',
    ],

    architecture: {
      title: 'State at scale',
      insights: [
        'Not all state belongs in Redux — URL and server cache often better homes.',
        'Context re-renders all consumers on any value change unless split/selective patterns used.',
      ],
      tradeoffs: [
        'Redux ceremony vs Zustand/Jotai simplicity for mid-size apps.',
        'RTK Query vs TanStack Query — team consistency matters more than holy wars.',
      ],
      scalability: [
        'Normalized entities prevent O(n²) updates in large tables.',
        'Cross-micro-frontend shared state: custom events, module federation, or BFF session.',
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
        expectedAnswerDirection: 'Context for low-frequency config/theme/auth snapshot → Redux for complex shared domain → server state libraries separate.',
        seniorTalkingPoints: ['Split ThemeContext vs UserContext', 'Redux for many writers on normalized entities'],
        commonMistakes: ['Entire app in one Context', 'Redux for every form field'],
        followUpQuestions: ['Prevent context re-render storms?'],
        architectureAngle: 'State taxonomy doc per app — required in architecture review.',
        enterpriseTradeoffs: ['Redux DevTools vs lighter stores for regulated audit logs'],
        scalabilityDiscussion: ['Context perf at 200 consumer components'],
        verbalPracticeMinutes: 5,
        mockEligible: true,
      },
      {
        id: 'd6-q2',
        question: 'When NOT to use Redux?',
        tags: ['react', 'state'],
        expectedAnswerDirection: 'Small apps → local state enough → server cache handles async → Redux cost not justified.',
        seniorTalkingPoints: ['Redux value rises with cross-feature invalidation', 'Regulated industries favor action logs'],
        commonMistakes: ['Cargo-cult Redux on simple apps'],
        followUpQuestions: ['State ownership across 4 squads on one SPA?'],
        architectureAngle: 'Default to colocated state — escalate to global with RFC.',
        enterpriseTradeoffs: ['Zustand pilot vs Redux standardization'],
        scalabilityDiscussion: ['When global store becomes bottleneck for releases'],
        verbalPracticeMinutes: 4,
        mockEligible: false,
      },
      {
        id: 'd6-q3',
        question: 'Large-scale state strategy?',
        tags: ['react', 'architecture'],
        expectedAnswerDirection: 'Categorize state → feature boundaries → normalize entities → query layer for server → document conventions.',
        seniorTalkingPoints: ['Feature slice ownership aligns with CODEOWNERS', 'Optimistic updates need rollback strategy'],
        commonMistakes: ['Single global object mutated anywhere'],
        followUpQuestions: ['Debug production-only state desync?'],
        architectureAngle: 'Normalized entities + selectors = performance at 10k rows.',
        enterpriseTradeoffs: ['Single store vs federated slices per micro-frontend'],
        scalabilityDiscussion: ['Cross-tab state sync for admin tools'],
        verbalPracticeMinutes: 5,
        mockEligible: false,
      },
      {
        id: 'd6-q4',
        question: 'RTK Query vs TanStack Query — how do you decide?',
        tags: ['react', 'state'],
        expectedAnswerDirection: 'Both solve server cache → RTK integrates with Redux store → TanStack framework-agnostic → pick one per org → cache invalidation tags.',
        seniorTalkingPoints: ['Do not duplicate server state in slice + query', 'Optimistic mutations in both'],
        commonMistakes: ['Storing API responses manually in Redux slice today', 'Two query libraries in same app'],
        followUpQuestions: ['Migrate from useEffect fetch to query layer?'],
        architectureAngle: 'Platform team owns query client defaults and error mapping.',
        enterpriseTradeoffs: ['RTK if already on Redux vs greenfield TanStack'],
        scalabilityDiscussion: ['Cache size limits and gcTime tuning at scale'],
        verbalPracticeMinutes: 5,
        mockEligible: false,
      },
      {
        id: 'd6-q5',
        question: 'What state belongs in the URL?',
        tags: ['react', 'architecture'],
        expectedAnswerDirection: 'Shareable/bookmarkable: filters, pagination, tabs, selected id → not modal open transient → sync with router.',
        seniorTalkingPoints: ['Deep link to dashboard view is UX win', 'URL as source of truth for filters'],
        commonMistakes: ['Only in React state — lost on refresh', 'Putting sensitive tokens in URL'],
        followUpQuestions: ['nuqs or searchParams with Next.js App Router?'],
        architectureAngle: 'URL state reduces need for global Redux for filters.',
        enterpriseTradeoffs: ['Long URLs vs compressed state encoding'],
        scalabilityDiscussion: ['Analytics on filter combinations from URL params'],
        verbalPracticeMinutes: 4,
        mockEligible: false,
      },
      {
        id: 'd6-q6',
        question: 'Normalized state shape — why and when?',
        tags: ['react', 'state'],
        expectedAnswerDirection: 'entities.byId + ids arrays → O(1) update → avoid duplication → relational data from API.',
        seniorTalkingPoints: ['createEntityAdapter in RTK', 'Denormalize in selectors for UI'],
        commonMistakes: ['Nested posts.comments.user duplication', 'Update one entity misses copies'],
        followUpQuestions: ['Normalize client-side or trust API shape?'],
        architectureAngle: 'Selector layer memoization — reselect pattern.',
        enterpriseTradeoffs: ['Normalization boilerplate vs update correctness'],
        scalabilityDiscussion: ['10k entity store — selector perf and indexing'],
        verbalPracticeMinutes: 4,
        mockEligible: false,
      },
      {
        id: 'd6-q7',
        question: 'Auth state architecture — where do tokens live?',
        tags: ['react', 'security'],
        expectedAnswerDirection: 'httpOnly cookie preferred → memory for access token if SPA → refresh flow → never localStorage for sensitive → RBAC in claims.',
        seniorTalkingPoints: ['XSS steals localStorage tokens', 'Silent refresh via BFF pattern'],
        commonMistakes: ['JWT in localStorage "because easy"', 'UI-only route guard without server check'],
        followUpQuestions: ['Token refresh race with parallel requests?'],
        architectureAngle: 'Auth is cross-cutting — platform auth hook + interceptors.',
        enterpriseTradeoffs: ['Cookie vs memory vs hybrid for SSO'],
        scalabilityDiscussion: ['Session revocation across 5 micro-frontends'],
        verbalPracticeMinutes: 5,
        mockEligible: false,
      },
    ],

    revision: [
      'Draw Redux data flow from UI click to DOM update.',
      'List what stays local in your dashboard exercise.',
      'Re-rate Day 6 questions after verbal reps.',
    ],

    deliverable: {
      title: 'State Architecture Drill',
      rapidFireConcepts: [
        'Three categories of state in React apps?',
        'Context performance issue — root cause?',
        'Where should server API cache live?',
      ],
      implementationTasks: [
        '60 min: auth flow + protected route pattern.',
        '30 min: filter state — justify Context vs URL vs Redux in README.',
      ],
      verbalExplanationChallenge: 'Record 5-min audio: Context vs Redux decision for a new admin dashboard.',
    },
  });
})();
