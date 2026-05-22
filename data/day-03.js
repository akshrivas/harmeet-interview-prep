(function () {
  'use strict';
  var DATA = window.InterviewWarRoom.DATA;
  DATA.registerDay(3, {
    id: 3,
    week: 1,
    title: 'ES6+ Deep Dive',
    topics: [
      { id: 'd3-t1', title: 'Destructuring', summary: 'Object/array patterns, defaults, and nested extraction in API mappers.' },
      { id: 'd3-t2', title: 'Spread / rest', summary: 'Immutable updates, variadic functions, and shallow copy caveats.' },
      { id: 'd3-t3', title: 'Modules', summary: 'ESM vs CJS, static analysis, tree-shaking, and dynamic import for code splitting.' },
      { id: 'd3-t4', title: 'Arrow functions', summary: 'Lexical this, no arguments object, and when not to use in object methods.' },
      { id: 'd3-t5', title: 'Optional chaining & nullish coalescing', summary: 'Safe deep access and ?? vs || semantic differences.' },
    ],
    exercises: [
      'Build a small utility library: pick, omit, groupBy, deepGet with optional chaining.',
      'Refactor a config loader to ESM with explicit exports.',
      'Demonstrate spread for immutable state update vs accidental mutation.',
    ],
    architecture: {
      title: 'Modern JS in large codebases',
      insights: [
        'Module boundaries replace global namespace pollution; enforce public API via export lists.',
        'Destructuring at API boundaries documents expected shapes and fails fast in tests.',
      ],
      tradeoffs: [
        'Barrel files (index re-exports) vs deep imports for bundle size.',
        '?? vs || for default values changes behavior with 0 and empty string.',
      ],
      scalability: [
        'Dynamic import() for route-level splitting in enterprise SPAs.',
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
        expectedAnswerDirection: 'Concise syntax → lexical this → pitfalls (methods, constructors) → when regular functions still required.',
        seniorTalkingPoints: [
          'React class components historically needed bind; hooks reduce but do not eliminate this topic.',
          'Callbacks passed to non-JS libraries may require explicit this.',
        ],
        commonMistakes: [
          'Using arrows as object literal methods expecting dynamic this.',
          'Claiming arrows are always preferable.',
        ],
        followUpQuestions: [
          'Show a bug from arrow as Vue Options API method (if hybrid stack).',
        ],
      },
      {
        id: 'd3-q2',
        question: 'Spread vs rest operator?',
        tags: ['javascript', 'es6'],
        expectedAnswerDirection: 'Same syntax, opposite direction → spread expands → rest collects → immutability patterns.',
        seniorTalkingPoints: [
          'Shallow copy—nested objects still shared reference.',
          'Rest params replace arguments object for variadic APIs.',
        ],
        commonMistakes: [
          'Deep cloning assumption from spread.',
        ],
        followUpQuestions: [
          'How do you immutably update nested state in Redux Toolkit?',
        ],
      },
      {
        id: 'd3-q3',
        question: 'Common ES6 improvements you use daily?',
        tags: ['javascript', 'es6'],
        expectedAnswerDirection: 'modules, destructuring, template literals, Promises, classes (lightly), Map/Set when needed.',
        seniorTalkingPoints: [
          'Template literals for i18n-safe composition with clear escaping strategy.',
          'Map for stable key types vs object dictionary misuse.',
        ],
        commonMistakes: [
          'Listing features without tying to team standards or lint rules.',
        ],
        followUpQuestions: [
          'How do you enforce module boundaries in CI?',
        ],
      },
    ],
    revision: ['Create a one-page ES6 cheatsheet from memory.', 'Revise spread/rest immutability traps.'],
  });
})();
