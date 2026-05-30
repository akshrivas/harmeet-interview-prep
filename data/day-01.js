(function () {
  'use strict';
  var DATA = window.InterviewWarRoom.DATA;
  DATA.registerDay(1, {
    id: 1,
    week: 1,
    title: 'JavaScript Foundations',
    audience: ['Senior Frontend Engineers', 'Tech Leads', 'Frontend Architects', 'Engineering Managers'],
    goal: 'Rebuild deep JavaScript interview confidence for senior-level frontend loops—not syntax trivia, but production reasoning.',

    topics: [
      {
        id: 'd1-t1',
        title: 'var vs let vs const',
        summary: 'Block vs function scope, TDZ, and const as immutability of binding—not deep object freeze.',
        explanation:
          'var is function-scoped and hoisted with undefined initialization; let/const are block-scoped with TDZ until declaration. const prevents rebinding; object contents can still mutate unless you enforce immutability patterns.',
        productionRelevance:
          'Legacy bundles, third-party snippets, and gradual migrations still expose var—senior interviews test whether you can lead safe refactors without breaking globals.',
        enterpriseInsights:
          'Teams standardize on let/const via ESLint (no-var) and code review rules; const-by-default signals intent and reduces accidental reassignment in large modules.',
        commonPitfalls: [
          'Treating const as deep freeze.',
          'Mixing var in blocks and expecting loop indices to bind per iteration.',
          'Shadowing outer let in inner blocks and confusing which binding hooks close over.',
        ],
        resources: [
          { type: 'mdn', label: 'MDN — let', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let' },
          { type: 'mdn', label: 'MDN — const', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const' },
          { type: 'article', label: 'javascript.info — let & const', url: 'https://javascript.info/let-const' },
          { type: 'youtube', label: 'YouTube — var, let & const (Mosh)', url: 'https://www.youtube.com/watch?v=s9WiQabmzoU' },
        ],
      },
      {
        id: 'd1-t2',
        title: 'Scope',
        summary: 'Lexical scope chain determines visibility; execution context is separate from how scope is authored.',
        explanation:
          'Scope is the set of accessible bindings at a position in source code. Nested functions create nested scopes; lookup walks outward until a match or ReferenceError.',
        productionRelevance:
          'Feature modules, hooks, and test doubles all depend on predictable scope—bugs show up as “works in dev, fails minified” when bundlers rename bindings.',
        enterpriseInsights:
          'Large apps use module boundaries and dependency injection to avoid global scope pollution; scope discipline is how you keep micro-frontend shells from leaking internals.',
        commonPitfalls: [
          'Confusing scope with the execution context object.',
          'Assuming block scope fixes all closure bugs in loops without understanding capture.',
          'Creating accidental globals by omitting strict mode and declarations.',
        ],
        resources: [
          { type: 'mdn', label: 'MDN — Scope', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Scope' },
          { type: 'article', label: 'javascript.info — Closures & scope', url: 'https://javascript.info/closure' },
          { type: 'youtube', label: 'YouTube — Scope chain (Fireship)', url: 'https://www.youtube.com/watch?v=WoBjlusvTBw' },
        ],
      },
      {
        id: 'd1-t3',
        title: 'Closures',
        summary: 'A function plus its lexical environment—used for encapsulation, factories, and async coordination guards.',
        explanation:
          'When a function is created, it retains access to variables from enclosing scopes even after the outer function returns. That capture enables private state and configurable behavior.',
        productionRelevance:
          'Debounced search, retry tokens, React effect cleanups, and plugin APIs all hinge on what closures capture and when.',
        enterpriseInsights:
          'Closure-heavy utilities are shared across squads—document capture semantics in hook/library APIs so consumers do not ship stale state to production.',
        commonPitfalls: [
          'Stale closures in async UI (wrong dependency arrays).',
          'Retaining DOM nodes or large arrays in closures attached to window-level listeners.',
          'Explaining closures without a concrete bug you fixed.',
        ],
        resources: [
          { type: 'mdn', label: 'MDN — Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures' },
          { type: 'youtube', label: 'YouTube — Closures (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=3a0I8ICR1Vg' },
          { type: 'youtube', label: 'YouTube — Closures (Namaste JavaScript, Hindi)', url: 'https://www.youtube.com/watch?v=QCRpVw2KXf8' },
        ],
      },
      {
        id: 'd1-t4',
        title: 'Hoisting',
        summary: 'Declarations move in compilation phase; var initializes undefined, let/const enter TDZ until their line runs.',
        explanation:
          'Hoisting is the compile-time processing of declarations. function declarations hoist fully; var hoists binding with undefined; let/const hoist binding but stay in TDZ until declaration executes.',
        productionRelevance:
          'Interview traps mirror real refactor bugs: using a const API before its import line, or conditional function declarations in legacy scripts.',
        enterpriseInsights:
          'Bundlers and TypeScript reorder modules—senior engineers reason about evaluation order and side effects at module top-level, not just function hoisting trivia.',
        commonPitfalls: [
          'Claiming let is not hoisted.',
          'Relying on typeof x === "undefined" to detect TDZ violations.',
          'Conditional function declarations in blocks in sloppy mode legacy code.',
        ],
        resources: [
          { type: 'mdn', label: 'MDN — Hoisting', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting' },
          { type: 'article', label: 'javascript.info — Variable hoisting', url: 'https://javascript.info/var' },
          { type: 'youtube', label: 'YouTube — Hoisting explained (Akshay Saini)', url: 'https://www.youtube.com/watch?v=FnlnGwa5Y4Y' },
        ],
      },
      {
        id: 'd1-t5',
        title: 'this keyword',
        summary: 'Dynamic binding (except arrows): site of call matters—default, implicit, explicit, new.',
        explanation:
          'this is determined by call site: strict undefined default; method call owns object; call/apply/bind set explicitly; new binds fresh object. Arrow functions lexically inherit this from enclosing scope.',
        productionRelevance:
          'Class services, DOM handlers, and third-party callbacks still break when passed unbound methods—common in enterprise React class remnants and chart libraries.',
        enterpriseInsights:
          'Frameworks hide this (React hooks, Vue auto-bind) but integrations do not—architects define patterns for passing callbacks into non-React widgets.',
        commonPitfalls: [
          'Arrow as object method when consumers expect dynamic this.',
          'Losing this by extracting methods: onClick={obj.handle} without bind.',
          'Using this in callbacks without understanding strict mode default.',
        ],
        resources: [
          { type: 'mdn', label: 'MDN — this', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this' },
          { type: 'youtube', label: 'YouTube — this keyword (Namaste JavaScript)', url: 'https://www.youtube.com/watch?v=9ZlhgOcrKlQ' },
          { type: 'youtube', label: 'YouTube — Arrow functions & this (Fireship)', url: 'https://www.youtube.com/watch?v=Yo_AWqAetNU' },
        ],
      },
      {
        id: 'd1-t6',
        title: 'call / apply / bind',
        summary: 'Explicit this + partial application; prefer bind for stable listener identity when profiling demands it.',
        explanation:
          'call invokes with thisArg and args list; apply uses arg array; bind returns a new function with fixed this and optional prepended args.',
        productionRelevance:
          'Polyfills, logging wrappers, and test spies use these patterns; debounce/throttle factories often bind handlers for removeEventListener symmetry.',
        enterpriseInsights:
          'Overuse of bind in hot paths allocates functions—senior tradeoff: bind once in constructor vs inline lambdas breaking memoization in React.',
        commonPitfalls: [
          'Binding inside render causing child memo bust.',
          'Forgetting bound functions cannot be used with new (bound constructors).',
          'apply on arrow functions expecting dynamic this change.',
        ],
        resources: [
          { type: 'mdn', label: 'MDN — Function.prototype.call()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call' },
          { type: 'mdn', label: 'MDN — Function.prototype.bind()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind' },
          { type: 'youtube', label: 'YouTube — call, apply, bind (Programming with Mosh)', url: 'https://www.youtube.com/watch?v=75W8AYCEih8' },
        ],
      },
    ],

    exercises: [
      'Debounce (senior): Implement trailing-edge debounce with .cancel() and .flush(); write tests for rapid keystrokes and abandoned in-flight fetch.',
      'Throttle (senior): Implement leading-edge throttle for scroll telemetry; prove handler fires at most once per interval under sustained scroll.',
      'Closure cache: Build memoize(fn) with Map cache and maxEntries LRU eviction; explain memory bound for long-lived admin sessions.',
      'this debugging lab: Given a class with unbound handlers passed to addEventListener, fix three bugs using bind, arrow, or field handlers—document tradeoffs.',
      'Scope migration: Take a 40-line var + function declaration snippet; refactor to let/const modules without changing public API surface.',
    ],

    architecture: {
      title: 'Enterprise JavaScript foundations',
      insights: [
        'Debugging mindset: reproduce → minimize → observe bindings (not just values) → check listeners and timers still alive.',
        'Memory: closures + DOM listeners + detached nodes are the top SPA leak triangle; WeakMap for metadata attached to DOM keys.',
        'Event handlers: prefer passive listeners for scroll; always pair add/remove; name handlers for stable removal when not using AbortSignal.',
        'Production pitfalls: stale closure state shipped to prod via missing effect deps; global pollution from legacy script tags; double subscription on StrictMode dev remount.',
      ],
      tradeoffs: [
        'Debounce at client vs API gateway—duplicate protection vs perceived latency on typeahead.',
        'bind-once vs arrow in class components—memory/identity vs ergonomics.',
        'eslint no-var enforcement vs velocity on hotfix branches touching legacy files.',
      ],
      scalability: [
        'Centralize timers/listeners in feature teardown hooks; audit with PerformanceObserver long tasks after deploy.',
        'Shared utility packages versioned SemVer—breaking closure semantics in debounce affects every squad consumer.',
        'Instrument handler count and heap snapshots on route changes in staging before enterprise pilot rollouts.',
      ],
      debuggingMindset: [
        'Ask: what binding did this closure capture at creation time?',
        'Ask: is this still mounted? (React) / is node still in document?',
        'Use breakpoint on DOM removal + retained size in heap snapshot.',
      ],
      memoryManagement: [
        'Clear intervals/timeouts in teardown; store id on instance.',
        'Avoid closing over full API responses when only ids needed.',
        'Break cycles: listener → component → listener via weak refs or explicit destroy().',
      ],
      eventHandlerPatterns: [
        'AbortController to cancel fetch + listeners in one teardown.',
        'Delegate events on stable parent for dynamic lists (one listener, many rows).',
        'Document which handlers must be stable references for memoized children.',
      ],
    },

    verbalPractice: [
      {
        id: 'd1-v1',
        topic: 'Closures under load',
        instruction: 'Explain closures, stale closure bugs, and one production fix—in 5 minutes, no slides.',
        durationMinutes: 5,
        structure: [
          '0:30 — Definition tied to lexical scope',
          '1:30 — Real bug story (search, effect, or listener)',
          '1:00 — Memory/leak angle',
          '1:00 — Tradeoff: when not to close over large state',
          '1:00 — Follow-up you would ask as interviewer',
        ],
        communicationCheckpoints: [
          'Named a specific app feature (dashboard, auth, typeahead).',
          'Quantified impact (stale data %, duplicate calls, incident).',
          'Explained fix without only saying “added deps array”.',
          'Closed with tradeoff, not “closures are powerful”.',
        ],
      },
      {
        id: 'd1-v2',
        topic: 'this + bind in integrations',
        instruction: 'Explain this binding rules and how you integrate third-party widgets in React—4 minutes.',
        durationMinutes: 4,
        structure: ['Rules table verbal', 'Widget callback example', 'bind vs arrow decision', 'Testing strategy'],
        communicationCheckpoints: [
          'Contrasted arrow vs method clearly.',
          'Mentioned strict mode default binding.',
          'Gave test approach (simulate call site).',
        ],
      },
    ],

    interviewQuestions: [
      {
        id: 'd1-q1',
        question: 'Explain closures with examples a Staff engineer would accept.',
        tags: ['javascript', 'closures'],
        expectedAnswerDirection:
          'Definition → lexical capture → encapsulation/factory/debounce → stale closure + memory → React effect example → close with tradeoffs.',
        seniorTalkingPoints: [
          'Out-of-order fetch guard with monotonic requestId in closure.',
          'IIFE module pattern before ESM adoption in enterprise monoliths.',
          'useEffect cleanup as subscription lifecycle, not “optional”.',
        ],
        commonMistakes: [
          'Textbook-only answer; no shipped bug narrative.',
          'Claims all closures leak memory.',
          'Cannot explain why loop with var logs same index.',
        ],
        followUpQuestions: [
          'How do you prove a closure leak in Chrome DevTools?',
          'When would you extract state to ref instead of closing over props?',
        ],
        architectureAngle:
          'Shared debounce in design-system hooks becomes org-wide contract—wrong capture semantics becomes multi-team incident.',
        enterpriseTradeoffs: [
          'Hidden state in closures vs explicit state machines for auditability in regulated domains.',
        ],
        scalabilityDiscussion: [
          'Bounded memo caches vs unbounded Maps in session-long admin consoles.',
        ],
        verbalPracticeMinutes: 5,
        mockEligible: true,
      },
      {
        id: 'd1-q2',
        question: 'How does the event loop schedule microtasks vs macrotasks—and why does it matter in UI code?',
        tags: ['javascript', 'async'],
        expectedAnswerDirection:
          'Single thread → stack → queues → microtasks drain before next macrotask → example Promise vs setTimeout → impact on paint and INP.',
        seniorTalkingPoints: [
          'await chains schedule microtasks—starvation if infinite resolve loop.',
          'Long tasks block interaction; chunking and scheduler.postTask where supported.',
          'React 18 batching interacts with microtask timing—describe behavior, not myths.',
        ],
        commonMistakes: [
          'Draws parallel threads for each Promise.',
          'Says setTimeout(0) runs before Promise.then.',
          'No link to user-visible jank metrics.',
        ],
        followUpQuestions: [
          'How would you profile long tasks on a dashboard with 12 widgets?',
          'Where would you move work off the main thread?',
        ],
        architectureAngle:
          'Platform teams set RUM thresholds on INP—event loop literacy is how frontend leads defend architecture reviews.',
        enterpriseTradeoffs: [
          'Heavy microtask chains in shared analytics SDK vs deferred batch flush to server.',
        ],
        scalabilityDiscussion: [
          'Coalesced updates vs per-event microtask storms from global state subscribers.',
        ],
        verbalPracticeMinutes: 5,
        mockEligible: true,
      },
      {
        id: 'd1-q3',
        question: 'var vs let vs const—what breaks in real migrations?',
        tags: ['javascript', 'scope'],
        expectedAnswerDirection:
          'Scope + hoisting/TDZ + loop capture + global binding + eslint/strategy for incremental migration.',
        seniorTalkingPoints: [
          'for (var i) classic bug; for (let i) binds per iteration.',
          'const for config objects still allows mutation—team convention documents freeze policy.',
          'Script scope vs module scope—var does not become window property in modules.',
        ],
        commonMistakes: [
          'const deep immutability myth.',
          'let is faster than var.',
          'Cannot plan safe codemod on legacy file.',
        ],
        followUpQuestions: [
          'How do you roll no-var across 400 packages without stopping feature work?',
        ],
        architectureAngle:
          'Lint rules encoded in CI are governance—breaking them blocks release trains.',
        enterpriseTradeoffs: [
          'Big-bang rewrite vs incremental file ownership per squad.',
        ],
        scalabilityDiscussion: [
          'Bundler scope hoisting still respects TDZ—build failures catch illegal access early.',
        ],
        verbalPracticeMinutes: 3,
        mockEligible: true,
      },
      {
        id: 'd1-q4',
        question: 'What is lexical scope and how do engines use it beyond interviews?',
        tags: ['javascript', 'scope'],
        expectedAnswerDirection:
          'Static structure determines lookup → contrast dynamic scope (not JS) → tooling/tree-shake implications → arrow lexical this tie-in.',
        seniorTalkingPoints: [
          'Predictable refactor safety for large IDE codebases.',
          'Closure creation cost negligible; wrong mental model cost is high.',
        ],
        commonMistakes: [
          'Equates scope chain with prototype chain.',
          'Cannot explain arrow this behavior vs function.',
        ],
        followUpQuestions: [
          'How does scope interact with block-scoped catch bindings?',
        ],
        architectureAngle:
          'Module federation shared scope hazards—duplicate React if boundaries wrong.',
        enterpriseTradeoffs: [
          'Barrel files vs direct imports—scope of side effects at module top-level.',
        ],
        scalabilityDiscussion: [
          'Dead code elimination relies on static module graph—dynamic eval defeats optimization.',
        ],
        verbalPracticeMinutes: 4,
        mockEligible: true,
      },
      {
        id: 'd1-q5',
        question: 'Explain this binding with call, apply, and bind in production code.',
        tags: ['javascript', 'this'],
        expectedAnswerDirection:
          'Four rules + arrow exception → demonstrate lost this → fix patterns → bind cost and React memo interaction.',
        seniorTalkingPoints: [
          'Logging wrapper: fn.call(ctx, ...args) preserving return value.',
          'Partial application for configurable API clients.',
          'Field handlers vs bind in class components for stable reference.',
        ],
        commonMistakes: [
          'bind inside render on memoized children.',
          'apply on arrow expecting this change.',
          'Cannot explain new binding precedence.',
        ],
        followUpQuestions: [
          'How do you test a method that depends on this without the class instance?',
        ],
        architectureAngle:
          'Third-party charting libs expect this-bound callbacks—adapter layer is integration architecture.',
        enterpriseTradeoffs: [
          'Polyfill bind in IE-era vs modern only—bundle size vs support matrix.',
        ],
        scalabilityDiscussion: [
          'Thousands of bind() calls in virtualized list if done per row—measure allocation rate.',
        ],
        verbalPracticeMinutes: 5,
        mockEligible: true,
      },
      {
        id: 'd1-q6',
        question: 'Design a debounce utility for enterprise typeahead—API contract and edge cases.',
        tags: ['javascript', 'architecture'],
        expectedAnswerDirection:
          'Trailing vs leading → cancel/flush → maxWait → abort in-flight fetch → telemetry on dropped vs fired requests.',
        seniorTalkingPoints: [
          'Race: response for query A arrives after query B—ignore via id.',
          'Accessibility: announce loading state without keyboard trap.',
          'Server debounce duplicate vs client—defense in depth.',
        ],
        commonMistakes: [
          'No cancel on unmount.',
          'Debounce on every key including navigation keys.',
          'No flush on blur/submit.',
        ],
        followUpQuestions: [
          'How does debounce interact with React 18 concurrent rendering?',
        ],
        architectureAngle:
          'Publish hook in internal SDK—versioning and changelog are platform responsibilities.',
        enterpriseTradeoffs: [
          '300ms UX sweet spot vs backend cost on 10k concurrent users.',
        ],
        scalabilityDiscussion: [
          'Per-field debounce timers vs global scheduler queue for form with 20 fields.',
        ],
        verbalPracticeMinutes: 6,
        mockEligible: true,
      },
      {
        id: 'd1-q7',
        question: 'How would you debug a memory leak suspected from closures in a long-lived SPA?',
        tags: ['javascript', 'performance'],
        expectedAnswerDirection:
          'Reproduce → heap snapshot diff → detached nodes → listener list → retainers path → fix teardown → verify in staging.',
        seniorTalkingPoints: [
          'Chrome Performance monitor + heap allocation timeline.',
          'WeakMap for metadata when you must associate data with DOM element.',
          'Incident postmortem: what metric moved (heap, listener count).',
        ],
        commonMistakes: [
          'Only suggests “use React DevTools” without heap methodology.',
          'Removes listeners but keeps closure over large cached JSON.',
        ],
        followUpQuestions: [
          'What is your definition of done after a leak fix?',
        ],
        architectureAngle:
          'SRE partnership on RUM + heap sampling in canary—frontend lead owns listener registry standards.',
        enterpriseTradeoffs: [
          'Full page reload workaround vs proper destroy on route change.',
        ],
        scalabilityDiscussion: [
          'Session duration 8h admin tools vs consumer tabs—different leak tolerance.',
        ],
        verbalPracticeMinutes: 5,
        mockEligible: true,
      },
      {
        id: 'd1-q8',
        question: 'Hoisting caused a production bug—walk me through how you would diagnose it.',
        tags: ['javascript', 'hoisting'],
        expectedAnswerDirection:
          'Temporal dead zone ReferenceError → module evaluation order → typeof trap → fix ordering or merge init → add lint rule.',
        seniorTalkingPoints: [
          'const fn = () => {} not hoisted like function declaration—import cycles worsen.',
          'TypeScript may reorder emit—still respect runtime TDZ.',
        ],
        commonMistakes: [
          'Blames “JavaScript weird” without root cause.',
          'Uses var to “fix” TDZ.',
        ],
        followUpQuestions: [
          'How do import cycles manifest in circular dependency graphs?',
        ],
        architectureAngle:
          'CI blocks circular deps via madge—architectural guardrail not personal vigilance.',
        enterpriseTradeoffs: [
          'Lazy init vs top-level side effect modules.',
        ],
        scalabilityDiscussion: [
          'Barrel re-export cycles scale O(n) teams—enforce dependency rules per package.',
        ],
        verbalPracticeMinutes: 4,
        mockEligible: true,
      },
      {
        id: 'd1-q9',
        question: 'As Tech Lead, how do you set JavaScript standards for 5 squads on one SPA?',
        tags: ['javascript', 'leadership'],
        expectedAnswerDirection:
          'eslint/tsconfig shared → CODEOWNERS → RFC for exceptions → education not police → measure violations and incident rate.',
        seniorTalkingPoints: [
          'no-var, prefer-const, hooks rules, import/no-cycle.',
          'Office hours for closure/this bugs from code review themes.',
          'Align with platform on shared debounce/fetch utilities.',
        ],
        commonMistakes: [
          'Mandates rules without migration budget.',
          'No metrics—only opinion wars in PR comments.',
        ],
        followUpQuestions: [
          'What do you do when one squad needs an exception for a vendor lib?',
        ],
        architectureAngle:
          'Governance is enabling speed with guardrails—shared packages and lint presets are the product.',
        enterpriseTradeoffs: [
          'Central platform team vs federated eslint configs.',
        ],
        scalabilityDiscussion: [
          'Versioned design-system + utility major bumps coordinated release train.',
        ],
        verbalPracticeMinutes: 5,
        mockEligible: true,
      },
      {
        id: 'd1-q10',
        question: 'Throttle vs debounce—when do you choose which for analytics and scroll?',
        tags: ['javascript', 'performance'],
        expectedAnswerDirection:
          'Debounce waits for quiet period; throttle guarantees periodic samples → scroll: throttle leading/trailing choice → analytics batching → test under load.',
        seniorTalkingPoints: [
          'requestAnimationFrame alternative for paint-aligned work.',
          'passive: true on scroll listeners for main-thread budget.',
        ],
        commonMistakes: [
          'Debounce on scroll causing missed bottom detection.',
          'Same delay for search and resize without tuning.',
        ],
        followUpQuestions: [
          'How do you validate handler rate in production telemetry?',
        ],
        architectureAngle:
          'Observability pipeline expects max 1 event/200ms—contract between FE and data platform.',
        enterpriseTradeoffs: [
          'Client sample rate vs server cost for high-cardinality scroll heatmaps.',
        ],
        scalabilityDiscussion: [
          'Global single scheduler vs per-component timers—central reduces timer churn on low-end devices.',
        ],
        verbalPracticeMinutes: 4,
        mockEligible: true,
      },
    ],

    revision: [
      'Implement debounce + throttle from blank file in <25 min; no copy-paste.',
      'Whiteboard: one macrotask, two microtasks, order of console output.',
      'Re-rate every Day 1 question honestly after verbal reps.',
      'Heap snapshot exercise: find one detached node in a sample SPA (DevTools).',
      'Write 5-bullet “closure bug I fixed” story for behavioral round.',
    ],

    deliverable: {
      title: 'Mini JavaScript Interview Drill',
      rapidFireConcepts: [
        'TDZ in one sentence—what throws and when?',
        'Difference: scope chain lookup vs this binding.',
        'Microtasks drain when?',
        'const reassign vs object property assign—legal/illegal?',
        'Why arrow in object literal method breaks consumers?',
        'bind() cost concern in one line.',
      ],
      implementationTasks: [
        '90 min: debounce + throttle utilities with tests (jest or console asserts).',
        '45 min: memoize with LRU cap—prove eviction works.',
        '30 min: fix provided this-binding bug snippet (3 call sites).',
      ],
      verbalExplanationChallenge:
        'Record 5-min audio: “Closures + event loop + one production bug”—must include tradeoff and metric; replay and score yourself clarity 1–5.',
    },
  });
})();
