(function () {
  'use strict';
  var DATA = window.InterviewWarRoom.DATA;
  DATA.registerDay(2, {
    id: 2,
    week: 1,
    title: 'Async JavaScript',
    goal: 'Master async scheduling, Promises, and fetch patterns for senior frontend data-layer interviews.',

    topics: [
      {
        id: 'd2-t1',
        title: 'Promises',
        summary: 'States, chaining, error propagation, and Promise.all vs allSettled tradeoffs.',
        resources: [
          { type: 'mdn', label: 'MDN — Promise', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise' },
          { type: 'youtube', label: 'YouTube — Promises (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=DHvZLI7Db8E' },
        ],
      },
      {
        id: 'd2-t2',
        title: 'async / await',
        summary: 'Sequential async flow, try/catch, and parallelization with Promise.all.',
        resources: [
          { type: 'mdn', label: 'MDN — async function', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function' },
          { type: 'youtube', label: 'YouTube — Async/await (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=V_Kr9OSfDeU' },
          { type: 'youtube', label: 'YouTube — Async/await (Fireship)', url: 'https://www.youtube.com/watch?v=vn3tm0quoqE' },
        ],
      },
      {
        id: 'd2-t3',
        title: 'Event loop deep dive',
        summary: 'Macrotasks, microtasks, and async scheduling order.',
        resources: [
          { type: 'article', label: 'javascript.info — Event loop', url: 'https://javascript.info/event-loop' },
          { type: 'youtube', label: 'YouTube — Event loop (Philip Roberts, JSConf)', url: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ' },
        ],
      },
      {
        id: 'd2-t4',
        title: 'fetch API',
        summary: 'Request lifecycle, abort signals, and error vs HTTP status handling.',
        resources: [
          { type: 'mdn', label: 'MDN — fetch', url: 'https://developer.mozilla.org/en-US/docs/Web/API/fetch' },
          { type: 'youtube', label: 'YouTube — Fetch API (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=cuEtnrL9-H0' },
        ],
      },
    ],

    exercises: [
      'Build a small API dashboard with fetch — loading, error, and empty states.',
      'Create retry utility with exponential backoff and max attempts.',
      'Implement async pool limiting concurrency to 3 parallel requests.',
    ],

    architecture: {
      title: 'Async boundaries in frontend platforms',
      insights: [
        'Centralized API clients wrap fetch with interceptors for auth refresh and correlation ids.',
        'Unhandled promise rejections pollute error dashboards — always attach catch at boundaries.',
      ],
      tradeoffs: [
        'async/await readability vs explicit Promise pipelines for complex orchestration.',
        'Client-side retry on POST vs idempotent GET-only policies.',
      ],
      scalability: [
        'Request deduplication and caching reduce thundering herd on auth refresh.',
        'Circuit breaker at BFF vs duplicating in every micro-frontend.',
      ],
    },

    verbalPractice: [
      {
        id: 'd2-v1',
        topic: 'Promise vs async/await and event loop',
        instruction: 'Explain how async code executes in JS for 5 minutes, including one ordering example.',
        durationMinutes: 5,
        structure: ['Event loop recap', 'Promise chain', 'async/await translation', 'Production debugging tip'],
      },
    ],

    interviewQuestions: [
      {
        id: 'd2-q1',
        question: 'Promise vs async/await — when and why?',
        tags: ['javascript', 'async'],
        expectedAnswerDirection: 'Same mechanism → await pauses function not thread → linear flows → Promise.all for parallel → error handling patterns.',
        seniorTalkingPoints: ['await in loop is sequential trap', 'Top-level await affects module init order', 'Explicit chains clearer for event-style composition'],
        commonMistakes: ['Says async/await is multithreaded', 'Empty catch blocks', 'Not knowing Promise.all fails fast'],
        followUpQuestions: ['Cancellable fetch with AbortController?', 'Promise.all vs allSettled for 6 widgets?'],
        architectureAngle: 'Shared fetch wrapper is platform contract — retry/abort semantics affect every squad.',
        enterpriseTradeoffs: ['Centralized error mapping vs per-feature handling'],
        scalabilityDiscussion: ['Batch widget loads vs waterfall on dashboard mount'],
        verbalPracticeMinutes: 5,
        mockEligible: true,
      },
      {
        id: 'd2-q2',
        question: 'Explain the event loop deeply.',
        tags: ['javascript', 'async'],
        expectedAnswerDirection: 'Stack → queues → microtasks drain before next macrotask → example → long task / INP impact.',
        seniorTalkingPoints: ['rAF vs microtasks for paint work', 'Resolved Promises queue microtasks before next click handler'],
        commonMistakes: ['Parallel threads per Promise', 'setTimeout(0) before Promise.then'],
        followUpQuestions: ['What breaks if you await inside scroll handler?'],
        architectureAngle: 'Platform RUM on INP — event loop literacy defends architecture reviews.',
        enterpriseTradeoffs: ['Microtask storms from global subscribers vs coalesced updates'],
        scalabilityDiscussion: ['Chunking work off main thread for heavy dashboards'],
        verbalPracticeMinutes: 5,
        mockEligible: true,
      },
      {
        id: 'd2-q3',
        question: 'How does JavaScript handle async code?',
        tags: ['javascript', 'async'],
        expectedAnswerDirection: 'Non-blocking I/O via host APIs → callbacks/Promises → scheduler queues → resume on completion.',
        seniorTalkingPoints: ['Browser delegates network; JS thread continues', 'Trace async boundaries in observability'],
        commonMistakes: ['Confusing concurrency with parallelism in browser'],
        followUpQuestions: ['Design resilient data layer for 12 endpoints?'],
        architectureAngle: 'BFF aggregation vs client-side fan-out — latency vs coupling tradeoff.',
        enterpriseTradeoffs: ['GraphQL vs REST orchestration at scale'],
        scalabilityDiscussion: ['Request prioritization for above-the-fold widgets'],
        verbalPracticeMinutes: 4,
        mockEligible: true,
      },
      {
        id: 'd2-q4',
        question: 'Promise.all vs Promise.allSettled — when do you pick which?',
        tags: ['javascript', 'async'],
        expectedAnswerDirection: 'all fails fast on first rejection → allSettled waits for all → dashboard partial success patterns.',
        seniorTalkingPoints: ['Widget grid: show 5/6 with error slot for failed one', 'all + catch per item alternative'],
        commonMistakes: ['Using all when partial results acceptable', 'Not handling rejected entries in allSettled'],
        followUpQuestions: ['How do you surface partial failure in UI?'],
        architectureAngle: 'Graceful degradation contract between FE and API gateway.',
        enterpriseTradeoffs: ['Fail entire page vs degrade sections'],
        scalabilityDiscussion: ['Timeout wrapper per promise in batch loads'],
        verbalPracticeMinutes: 4,
        mockEligible: false,
      },
      {
        id: 'd2-q5',
        question: 'Design fetch with AbortController for a typeahead that unmounts mid-request.',
        tags: ['javascript', 'async'],
        expectedAnswerDirection: 'AbortSignal per request → cleanup on unmount → ignore stale responses via request id.',
        seniorTalkingPoints: ['React StrictMode double mount tests this', 'Shared AbortController for route teardown'],
        commonMistakes: ['No abort on unmount', 'Race without id guard'],
        followUpQuestions: ['AbortController vs ignore flag — when both?'],
        architectureAngle: 'Standard hook useSearch returns { abort } — platform SDK pattern.',
        enterpriseTradeoffs: ['Cancel in-flight vs let complete and discard'],
        scalabilityDiscussion: ['100 concurrent typeaheads in admin console'],
        verbalPracticeMinutes: 5,
        mockEligible: false,
      },
      {
        id: 'd2-q6',
        question: 'Implement retry with exponential backoff — what edge cases matter?',
        tags: ['javascript', 'async'],
        expectedAnswerDirection: 'Max attempts → jitter → idempotent methods only → respect Retry-After header → circuit open state.',
        seniorTalkingPoints: ['POST retry needs idempotency key', '429 vs 503 different strategies'],
        commonMistakes: ['Retry on 400', 'No max cap → infinite loop'],
        followUpQuestions: ['Where does retry live — client, BFF, or both?'],
        architectureAngle: 'Shared retry policy in API client avoids squad-by-squad drift.',
        enterpriseTradeoffs: ['Aggressive retry vs backend overload'],
        scalabilityDiscussion: ['Bulkhead: separate retry budget per downstream service'],
        verbalPracticeMinutes: 5,
        mockEligible: false,
      },
      {
        id: 'd2-q7',
        question: 'How would you debug “works locally, hangs in prod” async bug?',
        tags: ['javascript', 'async'],
        expectedAnswerDirection: 'Reproduce → network tab → unhandled rejection → missing await → deadlock → CORS vs timeout → add tracing.',
        seniorTalkingPoints: ['Forgotten await in Express middleware parallel', 'Promise never resolved in error path'],
        commonMistakes: ['Only checks sync stack', 'No correlation id across async hops'],
        followUpQuestions: ['What telemetry do you add after fix?'],
        architectureAngle: 'OpenTelemetry spans on fetch wrapper — async is where observability gaps live.',
        enterpriseTradeoffs: ['Verbose client logging vs PII exposure'],
        scalabilityDiscussion: ['Synthetic monitors for critical async paths'],
        verbalPracticeMinutes: 5,
        mockEligible: false,
      },
    ],

    revision: [
      'Whiteboard: Promise.then vs async/await equivalent for 3-step flow.',
      'Diagram fetch + retry + abort lifecycle.',
      'Re-rate Day 2 questions after verbal reps.',
    ],

    deliverable: {
      title: 'Async Data Layer Drill',
      rapidFireConcepts: [
        'Microtask vs macrotask — one ordering example?',
        'When does fetch throw vs return ok:false?',
        'Promise.all fail-fast behavior in one sentence?',
      ],
      implementationTasks: [
        '60 min: fetch wrapper with retry, abort, and typed errors.',
        '30 min: async pool (max 3 concurrent) with queue.',
      ],
      verbalExplanationChallenge: 'Record 4-min audio: event loop + one async bug you fixed in production.',
    },
  });
})();
