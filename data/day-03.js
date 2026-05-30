(function () {
  'use strict';
  var DATA = window.InterviewWarRoom.DATA;
  DATA.registerDay(3, {
    id: 3,
    week: 1,
    title: 'ES6+ Deep Dive',
    goal: 'Use modern JS confidently in large codebases — modules, immutability patterns, and safe deep access.',

    topics: [
      {
        id: 'd3-t1',
        title: 'Destructuring',
        summary: 'Object/array patterns, defaults, and nested extraction in API mappers.',
        resources: [
          { type: 'mdn', label: 'MDN — Destructuring', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring' },
          { type: 'youtube', label: 'YouTube — Destructuring (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=NIq3qLaHCIs' },
        ],
      },
      {
        id: 'd3-t2',
        title: 'Spread / rest',
        summary: 'Immutable updates, variadic functions, and shallow copy caveats.',
        resources: [
          { type: 'mdn', label: 'MDN — Spread syntax', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax' },
          { type: 'youtube', label: 'YouTube — Destructuring & spread (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=NIq3qLaHCIs' },
        ],
      },
      {
        id: 'd3-t3',
        title: 'Modules',
        summary: 'ESM vs CJS, static analysis, tree-shaking, and dynamic import for code splitting.',
        resources: [
          { type: 'mdn', label: 'MDN — JavaScript modules', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules' },
          { type: 'youtube', label: 'YouTube — ES6 modules (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=cRHQNNcYf6s' },
          { type: 'youtube', label: 'YouTube — Modules overview (Fireship)', url: 'https://www.youtube.com/watch?v=qgRUr-YUk1Q' },
        ],
      },
      {
        id: 'd3-t4',
        title: 'Arrow functions',
        summary: 'Lexical this, no arguments object, and when not to use in object methods.',
        resources: [
          { type: 'mdn', label: 'MDN — Arrow functions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions' },
          { type: 'youtube', label: 'YouTube — Arrow functions (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=h33Srr5J9nY' },
        ],
      },
      {
        id: 'd3-t5',
        title: 'Optional chaining & nullish coalescing',
        summary: 'Safe deep access and ?? vs || semantic differences.',
        resources: [
          { type: 'mdn', label: 'MDN — Optional chaining', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining' },
          { type: 'article', label: 'javascript.info — Optional chaining', url: 'https://javascript.info/optional-chaining' },
          { type: 'youtube', label: 'YouTube — Optional chaining & ?? (ES2020)', url: 'https://www.youtube.com/watch?v=1Vho--vDhQM' },
          { type: 'youtube', label: 'YouTube — Nullish coalescing', url: 'https://www.youtube.com/watch?v=GbHVrOObGcs' },
        ],
      },
    ],

    exercises: [
      'Build utility library: pick, omit, groupBy, deepGet with optional chaining.',
      'Refactor a config loader to ESM with explicit exports.',
      'Demonstrate spread for immutable state update vs accidental mutation.',
    ],

    architecture: {
      title: 'Modern JS in large codebases',
      insights: [
        'Module boundaries replace global pollution — enforce public API via export lists.',
        'Destructuring at API boundaries documents expected shapes and fails fast in tests.',
      ],
      tradeoffs: [
        'Barrel files vs deep imports for bundle size.',
        '?? vs || for defaults — 0 and empty string behave differently.',
      ],
      scalability: [
        'dynamic import() for route-level splitting in enterprise SPAs.',
        'Consistent module conventions across micro-frontends reduce integration friction.',
      ],
    },

    verbalPractice: [
      {
        id: 'd3-v1',
        topic: 'ES6 improvements that matter at scale',
        instruction: 'Explain 4 ES6+ features you rely on in production and why for 5 minutes.',
        durationMinutes: 5,
        structure: ['Pick 4 features', 'Enterprise example each', 'One tradeoff', 'Closing synthesis'],
      },
    ],

    interviewQuestions: [
      {
        id: 'd3-q1',
        question: 'Why arrow functions?',
        tags: ['javascript', 'es6'],
        expectedAnswerDirection: 'Concise syntax → lexical this → pitfalls (methods, constructors) → when regular functions required.',
        seniorTalkingPoints: ['Hooks reduced bind pain but integrations still need this literacy', 'Callbacks to non-JS libs may need explicit this'],
        commonMistakes: ['Arrow as object method expecting dynamic this', 'Claiming arrows always preferable'],
        followUpQuestions: ['Bug from arrow as Vue Options API method?'],
        architectureAngle: 'Lint rule: no arrow in class methods for libraries consumed by squads.',
        enterpriseTradeoffs: ['Consistency vs team preference in mixed legacy code'],
        scalabilityDiscussion: ['Codemod strategy for arrow in hot paths'],
        verbalPracticeMinutes: 4,
        mockEligible: true,
      },
      {
        id: 'd3-q2',
        question: 'Spread vs rest operator?',
        tags: ['javascript', 'es6'],
        expectedAnswerDirection: 'Same syntax opposite direction → spread expands → rest collects → immutability patterns → shallow copy caveat.',
        seniorTalkingPoints: ['Nested objects still shared reference', 'Rest params replace arguments object'],
        commonMistakes: ['Deep clone assumption from spread'],
        followUpQuestions: ['Immutably update nested state in Redux Toolkit?'],
        architectureAngle: 'Immutable update helpers in shared utils — shallow vs deep documented.',
        enterpriseTradeoffs: ['Immer vs manual spread for large nested forms'],
        scalabilityDiscussion: ['Spread on 10k-item arrays — performance cost'],
        verbalPracticeMinutes: 4,
        mockEligible: true,
      },
      {
        id: 'd3-q3',
        question: 'Common ES6 improvements you use daily?',
        tags: ['javascript', 'es6'],
        expectedAnswerDirection: 'modules, destructuring, template literals, Promises, Map/Set when needed — tie to team standards.',
        seniorTalkingPoints: ['Template literals for i18n with escaping strategy', 'Map for non-string keys'],
        commonMistakes: ['Listing features without production tie-in'],
        followUpQuestions: ['Enforce module boundaries in CI?'],
        architectureAngle: 'eslint + tsconfig paths as governance for modern syntax adoption.',
        enterpriseTradeoffs: ['Transpile target vs native ES in internal apps'],
        scalabilityDiscussion: ['Tree-shaking depends on static import graph'],
        verbalPracticeMinutes: 4,
        mockEligible: false,
      },
      {
        id: 'd3-q4',
        question: 'ESM vs CommonJS — what breaks in Node and bundlers?',
        tags: ['javascript', 'es6'],
        expectedAnswerDirection: 'import/export static vs require dynamic → default interop → .mjs / type module → extension rules in Node.',
        seniorTalkingPoints: ['Dual package hazard in shared libs', 'Dynamic import for lazy routes'],
        commonMistakes: ['Mixing require and import in same file', 'Missing .js extension in Node ESM'],
        followUpQuestions: ['How does Vite handle CJS deps?'],
        architectureAngle: 'Monorepo package.json "type":"module" decision affects all consumers.',
        enterpriseTradeoffs: ['Gradual ESM migration vs big-bang'],
        scalabilityDiscussion: ['Barrel files defeat tree-shaking at scale'],
        verbalPracticeMinutes: 5,
        mockEligible: false,
      },
      {
        id: 'd3-q5',
        question: '?? vs || — when does the difference matter in production?',
        tags: ['javascript', 'es6'],
        expectedAnswerDirection: '?? only null/undefined → || all falsy → 0, "", false cases → form defaults and API mapping.',
        seniorTalkingPoints: ['Pagination page=0 bug with ||', 'Config flags set to false'],
        commonMistakes: ['Using || for numeric defaults', 'Chaining ?? and || without parentheses confusion'],
        followUpQuestions: ['Optional chaining with ?? for API mapper?'],
        architectureAngle: 'Lint rule prefer-nullish-coalescing in TS codebases.',
        enterpriseTradeoffs: ['Explicit null vs undefined in API contracts'],
        scalabilityDiscussion: ['Consistent null handling across 20 microservices'],
        verbalPracticeMinutes: 3,
        mockEligible: false,
      },
      {
        id: 'd3-q6',
        question: 'How do you enforce immutability patterns without Immer?',
        tags: ['javascript', 'es6'],
        expectedAnswerDirection: 'Spread/rest for shallow → structuredClone or manual for nested → freeze for config → conventions + tests.',
        seniorTalkingPoints: ['Redux reducers must be pure', 'Object.freeze only shallow'],
        commonMistakes: ['Mutating state in place in reducer', 'Spread one level then mutate nested'],
        followUpQuestions: ['When is Immer worth the bundle cost?'],
        architectureAngle: 'Shared update helpers reduce mutation bugs across squads.',
        enterpriseTradeoffs: ['Immer in design-system vs plain spread in apps'],
        scalabilityDiscussion: ['Large nested form state — Immer performance profile'],
        verbalPracticeMinutes: 4,
        mockEligible: false,
      },
      {
        id: 'd3-q7',
        question: 'Design a public API for a shared utils package — exports and tree-shaking.',
        tags: ['javascript', 'architecture'],
        expectedAnswerDirection: 'Named exports → no barrel or limited barrel → side-effect free → document breaking changes → semver.',
        seniorTalkingPoints: ['package.exports field in Node', 'Deep imports vs single entry'],
        commonMistakes: ['export * re-export cycles', 'Side effects at module top level'],
        followUpQuestions: ['How do you version breaking util changes?'],
        architectureAngle: 'Internal npm package is product — changelog and migration guides required.',
        enterpriseTradeoffs: ['One fat utils package vs many small packages'],
        scalabilityDiscussion: ['Bundle analyzer gates on shared package imports'],
        verbalPracticeMinutes: 5,
        mockEligible: false,
      },
    ],

    revision: [
      'Create one-page ES6 cheatsheet from memory.',
      'Revise spread/rest immutability traps.',
      'Re-rate Day 3 questions after verbal reps.',
    ],

    deliverable: {
      title: 'ES6 Utility Library Drill',
      rapidFireConcepts: [
        'Shallow vs deep copy with spread — one sentence?',
        '?? vs || — give an example where they differ.',
        'Why barrel index.js can hurt bundle size?',
      ],
      implementationTasks: [
        '45 min: pick, omit, groupBy utilities with tests.',
        '20 min: ESM module with named exports only.',
      ],
      verbalExplanationChallenge: 'Record 4-min audio: 3 ES6 features you use daily and one production bug they prevented.',
    },
  });
})();
