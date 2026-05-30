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
        resources: [
          { type: 'mdn', label: 'MDN — let', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let' },
          { type: 'mdn', label: 'MDN — const', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const' },
          { type: 'article', label: 'javascript.info — let & const', url: 'https://javascript.info/let-const' },
          { type: 'youtube', label: 'YouTube — var, let & const (Mosh)', url: 'https://www.youtube.com/watch?v=XgSjoHgy3Rk' },
        ],
      },
      {
        id: 'd1-t2',
        title: 'Scope',
        summary: 'Lexical scope chain determines visibility; execution context is separate from how scope is authored.',
        resources: [
          { type: 'mdn', label: 'MDN — Scope', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Scope' },
          { type: 'article', label: 'javascript.info — Closures & scope', url: 'https://javascript.info/closure' },
          { type: 'youtube', label: 'YouTube — JavaScript scoping (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=TkFN6e9ZDMw' },
        ],
      },
      {
        id: 'd1-t3',
        title: 'Closures',
        summary: 'A function plus its lexical environment—used for encapsulation, factories, and async coordination guards.',
        resources: [
          { type: 'mdn', label: 'MDN — Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures' },
          { type: 'youtube', label: 'YouTube — Closures (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=3a0I8ICR1Vg' },
          { type: 'youtube', label: 'YouTube — Closures (Namaste JavaScript, Hindi)', url: 'https://www.youtube.com/watch?v=qikxEIxsXco' },
        ],
      },
      {
        id: 'd1-t4',
        title: 'Hoisting',
        summary: 'Declarations move in compilation phase; var initializes undefined, let/const enter TDZ until their line runs.',
        resources: [
          { type: 'mdn', label: 'MDN — Hoisting', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting' },
          { type: 'article', label: 'javascript.info — Variable hoisting', url: 'https://javascript.info/var' },
          { type: 'youtube', label: 'YouTube — Hoisting explained (Akshay Saini)', url: 'https://www.youtube.com/watch?v=Fnlnw8uY6jo' },
        ],
      },
      {
        id: 'd1-t5',
        title: 'this keyword',
        summary: 'Dynamic binding (except arrows): site of call matters—default, implicit, explicit, new.',
        resources: [
          { type: 'mdn', label: 'MDN — this', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this' },
          { type: 'youtube', label: 'YouTube — this keyword (Namaste JavaScript)', url: 'https://www.youtube.com/watch?v=9T4z98JcHR0' },
          { type: 'youtube', label: 'YouTube — Arrow functions & this (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=h33Srr5J9nY' },
        ],
      },
      {
        id: 'd1-t6',
        title: 'call / apply / bind',
        summary: 'Explicit this + partial application; prefer bind for stable listener identity when profiling demands it.',
        resources: [
          { type: 'mdn', label: 'MDN — Function.prototype.call()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call' },
          { type: 'mdn', label: 'MDN — Function.prototype.bind()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind' },
          { type: 'youtube', label: 'YouTube — call, apply, bind (Akshay Saini)', url: 'https://www.youtube.com/watch?v=75W8UPQ5l7k' },
        ],
      },
    ],

    exercises: [
      'Debounce: trailing-edge with .cancel() and .flush(); test rapid keystrokes and abandoned in-flight fetch.',
      'Throttle: leading-edge for scroll telemetry; prove handler fires at most once per interval.',
      'this debugging lab: fix three unbound handler bugs using bind, arrow, or field handlers.',
    ],

    architecture: {
      title: 'Enterprise JavaScript foundations',
      insights: [
        'Closures + DOM listeners + detached nodes are the top SPA leak triangle.',
        'Stale closure state often ships via missing effect deps—observe bindings, not just values.',
        'Shared utility packages (debounce, fetch wrappers) are org-wide contracts—version and document capture semantics.',
      ],
      tradeoffs: [
        'Debounce at client vs API gateway—duplicate protection vs typeahead latency.',
        'bind-once vs arrow in callbacks—memory/identity vs memoization.',
      ],
      scalability: [
        'Centralize timers/listeners in feature teardown hooks.',
        'Instrument handler count and heap snapshots on route changes in staging.',
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
      },
      {
        id: 'd1-v2',
        topic: 'this + bind in integrations',
        instruction: 'Explain this binding rules and how you integrate third-party widgets in React—4 minutes.',
        durationMinutes: 4,
        structure: ['Rules table verbal', 'Widget callback example', 'bind vs arrow decision', 'Testing strategy'],
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
      'Implement debounce + throttle from blank file in <25 min.',
      'Whiteboard: one macrotask, two microtasks, order of console output.',
      'Re-rate every Day 1 question honestly after verbal reps.',
    ],

    deliverable: {
      title: 'Mini JavaScript Interview Drill',
      rapidFireConcepts: [
        'TDZ in one sentence—what throws and when?',
        'Microtasks drain when?',
        'Why arrow in object literal method breaks consumers?',
      ],
      implementationTasks: [
        '90 min: debounce + throttle utilities with tests.',
        '30 min: fix provided this-binding bug snippet (3 call sites).',
      ],
      verbalExplanationChallenge:
        'Record 5-min audio: “Closures + event loop + one production bug”—must include tradeoff and metric; replay and score yourself clarity 1–5.',
    },
  });
})();
