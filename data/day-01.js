(function () {
  'use strict';
  var DATA = window.InterviewWarRoom.DATA;
  DATA.registerDay(1, {
    id: 1,
    week: 1,
    title: 'JavaScript Foundations',
    topics: [
      { id: 'd1-t1', title: 'var / let / const', summary: 'Block vs function scope, TDZ, and why const does not mean immutable objects.' },
      { id: 'd1-t2', title: 'Scope & lexical scope', summary: 'Nested environments, scope chain lookup, and how closures capture bindings.' },
      { id: 'd1-t3', title: 'Closures', summary: 'Functions retaining access to outer variables after the outer function returns.' },
      { id: 'd1-t4', title: 'Hoisting', summary: 'var/function declarations vs let/const temporal dead zone behavior.' },
      { id: 'd1-t5', title: 'this keyword', summary: 'Binding rules: default, implicit, explicit, new, and lexical this in arrows.' },
      { id: 'd1-t6', title: 'call / apply / bind', summary: 'Explicit this binding and partial application patterns in utilities.' },
    ],
    exercises: [
      'Build three closure examples: counter, private cache, and event handler factory.',
      'Implement debounce (trailing edge) with cancel support.',
      'Implement throttle (leading edge) for scroll handlers.',
      'Refactor a legacy var-based module to let/const with clear block scope.',
    ],
    architecture: {
      title: 'JavaScript foundations in enterprise frontends',
      insights: [
        'Closure-heavy patterns power module boundaries before ES modules were standard in all build pipelines.',
        'Explicit this binding still appears in class-based services, DOM plugins, and legacy jQuery-era integrations.',
        'Hoisting surprises often surface in minified bundles combined with conditional polyfills—senior engineers debug binding, not syntax.',
      ],
      tradeoffs: [
        'Arrow functions for callbacks vs regular functions when consumers pass dynamic this.',
        'Debouncing UX responsiveness vs server load on autosuggest endpoints.',
      ],
      scalability: [
        'Debounce/throttle at the network edge (API gateway) vs client—duplicate protection strategy.',
        'Memory leaks from closures holding DOM references in long-lived SPAs.',
      ],
    },
    verbalPractice: [
      {
        id: 'd1-v1',
        topic: 'Closures and the event loop together',
        instruction: 'Explain closures and how they interact with async scheduling for 5 minutes out loud.',
        durationMinutes: 5,
        structure: ['30s definition', '2m production example', '1m pitfalls', '1.5m event loop tie-in'],
      },
    ],
    interviewQuestions: [
      {
        id: 'd1-q1',
        question: 'Explain closures with real examples.',
        tags: ['javascript', 'closures'],
        expectedAnswerDirection: 'Define closure → lexical scope → practical use cases (data privacy, factories) → memory/stale closure pitfalls → tie to React hooks if relevant.',
        seniorTalkingPoints: [
          'Module pattern before ES modules: IIFE + closure for encapsulation.',
          'Stale closures in useEffect when dependencies are wrong—symptom of misunderstanding capture.',
          'Debounced search holding last query id to ignore out-of-order responses.',
        ],
        commonMistakes: [
          'Reciting MDN definition without a production story.',
          'Claiming closures always cause memory leaks.',
          'Confusing closure with hoisting or scope chain.',
        ],
        followUpQuestions: [
          'How would you debug a stale closure in a React effect?',
          'When would you avoid closures in a hot code path?',
        ],
      },
      {
        id: 'd1-q2',
        question: 'Explain the JavaScript event loop.',
        tags: ['javascript', 'async'],
        expectedAnswerDirection: 'Single thread → call stack → task queues (macrotasks) → microtasks → render steps → example with setTimeout vs Promise.',
        seniorTalkingPoints: [
          'Microtasks drain before next macrotask—why Promise.then runs before setTimeout(0).',
          'Long tasks block paint; chunk work or use scheduler.postTask where available.',
          'async/await is syntactic sugar over Promises, still microtask scheduled.',
        ],
        commonMistakes: [
          'Drawing multi-threaded parallel JS execution.',
          'Ignoring microtask queue priority.',
          'Cannot explain starvation from infinite Promise chains.',
        ],
        followUpQuestions: [
          'Why does await fetch then setState still batch oddly in some React versions?',
          'How do you detect long tasks in production?',
        ],
      },
      {
        id: 'd1-q3',
        question: 'Difference between let and var?',
        tags: ['javascript', 'scope'],
        expectedAnswerDirection: 'Scope (block vs function) → hoisting/TDZ → loop closure behavior → global object binding in browsers.',
        seniorTalkingPoints: [
          'Classic interview trap: for-loop var closures printing same index.',
          'TDZ prevents accessing let before declaration—real bug class in refactors.',
          'const prevents rebinding, not deep immutability—Object.freeze is separate concern.',
        ],
        commonMistakes: [
          'Saying let is "faster" than var.',
          'Believing const makes arrays immutable.',
        ],
        followUpQuestions: [
          'How would you migrate a 50k-line legacy file from var safely?',
        ],
      },
      {
        id: 'd1-q4',
        question: 'What is lexical scope?',
        tags: ['javascript', 'scope'],
        expectedAnswerDirection: 'Scope determined by source structure → nested functions see outer bindings → contrast with dynamic scope (not in JS).',
        seniorTalkingPoints: [
          'Enables predictable refactoring—tools and humans trace bindings statically.',
          'Arrow functions inherit this lexically, not dynamically.',
        ],
        commonMistakes: [
          'Confusing lexical scope with execution context object.',
        ],
        followUpQuestions: [
          'How does lexical scope enable tree-shaking hints?',
        ],
      },
    ],
    revision: [
      'Re-read your closure and debounce implementations without looking at code.',
      'Whiteboard event loop with one macrotask and two microtasks.',
      'Record a 3-minute verbal answer for closures.',
    ],
  });
})();
