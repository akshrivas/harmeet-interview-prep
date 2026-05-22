(function () {
  'use strict';
  var DATA = window.InterviewWarRoom.DATA;
  DATA.registerDay(2, {
    id: 2,
    week: 1,
    title: 'Async JavaScript',
    topics: [
      { id: 'd2-t1', title: 'Promises', summary: 'States, chaining, error propagation, and Promise.all vs allSettled tradeoffs.' },
      { id: 'd2-t2', title: 'async / await', summary: 'Sequential async flow, try/catch, and parallelization with Promise.all.' },
      { id: 'd2-t3', title: 'Event loop deep dive', summary: 'Macrotasks, microtasks, and async scheduling order.' },
      { id: 'd2-t4', title: 'fetch API', summary: 'Request lifecycle, abort signals, and error vs HTTP status handling.' },
    ],
    exercises: [
      'Build a small API dashboard using fetch with loading, error, and empty states.',
      'Create retry utility with exponential backoff and max attempts.',
      'Implement async pool limiting concurrency to 3 parallel requests.',
    ],
    architecture: {
      title: 'Async boundaries in frontend platforms',
      insights: [
        'Centralized API clients wrap fetch/axios with interceptors for auth refresh and telemetry correlation ids.',
        'Unhandled promise rejections still crash Node services and pollute browser error dashboards.',
      ],
      tradeoffs: [
        'async/await readability vs explicit Promise pipelines for complex orchestration.',
        'Client-side retry on POST vs idempotent GET only policies.',
      ],
      scalability: [
        'Request deduplication and caching layers reduce thundering herd on auth refresh.',
        'Circuit breaker patterns at BFF vs duplicating in every micro-frontend.',
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
        expectedAnswerDirection: 'Same underlying mechanism → await pauses function, not thread → prefer await for linear flows → Promise.all for parallel → error handling patterns.',
        seniorTalkingPoints: [
          'await in loop is sequential—performance trap; batch with Promise.all.',
          'Top-level await in modules affects bundle initialization order.',
          'Explicit Promise chains sometimes clearer for event-style composition.',
        ],
        commonMistakes: [
          'Saying async/await is multithreaded.',
          'Swallowing errors with empty catch blocks.',
          'Not knowing Promise.all fails fast on first rejection.',
        ],
        followUpQuestions: [
          'How do you implement a cancellable fetch with AbortController?',
          'Difference between Promise.all and allSettled in a dashboard loading 6 widgets?',
        ],
      },
      {
        id: 'd2-q2',
        question: 'Explain the event loop deeply.',
        tags: ['javascript', 'async'],
        expectedAnswerDirection: 'Expand Day 1 answer with queue draining rules, Node vs browser differences at high level, and long task impact.',
        seniorTalkingPoints: [
          'requestAnimationFrame vs microtasks for paint-related work.',
          'Queue microtasks from resolved Promises before next click handler macrotask.',
        ],
        commonMistakes: [
          'Inventing parallel threads per Promise.',
        ],
        followUpQuestions: [
          'What breaks if you await inside a tight scroll handler?',
        ],
      },
      {
        id: 'd2-q3',
        question: 'How does JavaScript handle async code?',
        tags: ['javascript', 'async'],
        expectedAnswerDirection: 'Non-blocking I/O via host APIs → callbacks/Promises → scheduler queues → resume on completion.',
        seniorTalkingPoints: [
          'Browser delegates network to network stack; JS thread continues.',
          'Observability: mark long tasks, trace async boundaries in OpenTelemetry.',
        ],
        commonMistakes: [
          'Confusing concurrency with parallelism in browser JS.',
        ],
        followUpQuestions: [
          'How would you design a resilient data layer for a dashboard with 12 endpoints?',
        ],
      },
    ],
    revision: ['Revise Day 1 closures + Day 2 async ordering.', 'Diagram fetch + retry flow on paper.'],
  });
})();
