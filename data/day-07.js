(function () {
  'use strict';
  var DATA = window.InterviewWarRoom.DATA;
  DATA.registerDay(7, {
    id: 7,
    week: 1,
    title: 'Week 1 Revision + Mock Interview',
    goal: 'Synthesize Week 1 into verbal architecture narrative and capstone deliverable.',

    topics: [
      {
        id: 'd7-t1',
        title: 'Week 1 concept synthesis',
        summary: 'Connect JS fundamentals → async → ES6 → React core → hooks → state.',
        resources: [
          { type: 'article', label: 'React docs — Thinking in React', url: 'https://react.dev/learn/thinking-in-react' },
          { type: 'youtube', label: 'YouTube — 100+ JS concepts (Fireship)', url: 'https://www.youtube.com/watch?v=lkIFF4maKMU' },
        ],
      },
      {
        id: 'd7-t2',
        title: 'Architecture narrative',
        summary: 'Tell the story of a scalable admin dashboard frontend.',
        resources: [
          { type: 'youtube', label: 'YouTube — React documentary', url: 'https://www.youtube.com/watch?v=8pDqJVdNa44' },
          { type: 'youtube', label: 'YouTube — Hooks revolution (Dan Abramov)', url: 'https://www.youtube.com/watch?v=dpw9EHDh2bM' },
        ],
      },
      {
        id: 'd7-t3',
        title: 'Weak area targeting',
        summary: 'Use War Room weakness board to prioritize final reps before mock rounds.',
        resources: [
          { type: 'article', label: 'Interview War Room — Command Center', url: 'https://harmeet-interview-prep.vercel.app/dashboard.html' },
        ],
      },
    ],

    exercises: [
      'Complete Mini Admin Dashboard deliverable: login UI, API integration, dashboard cards, reusable layout.',
      'Run 2 mock interview sessions from the Week 1 pack.',
      'Verbal architecture explanation: 10-minute frontend structure walkthrough.',
    ],

    architecture: {
      title: 'Week 1 capstone — Mini Admin Dashboard',
      insights: [
        'Deliverable proves integration: auth boundary, data layer, components, and state boundaries together.',
        'Interviewers care about tradeoff narration, not pixel-perfect UI.',
      ],
      tradeoffs: [
        'Monolith SPA vs micro-frontend for internal admin — justify by team topology.',
        'Client-side auth guard vs server-enforced routes — never rely on UI-only security.',
      ],
      scalability: [
        'Lazy routes for infrequently used admin modules.',
        'Role-based feature flags at route and component level.',
      ],
    },

    verbalPractice: [
      {
        id: 'd7-v1',
        topic: 'Full Week 1 verbal recap',
        instruction: 'Explain your Mini Admin Dashboard architecture verbally for 10 minutes as in a senior loop.',
        durationMinutes: 10,
        structure: ['Problem & users', 'Folder structure', 'State & data', 'Auth', 'Performance', 'Testing approach'],
      },
      {
        id: 'd7-v2',
        topic: 'Week 1 weak areas drill',
        instruction: 'Pick top 3 items from War Room threat board — explain each aloud with fix plan (5 min each).',
        durationMinutes: 15,
        structure: ['Read threat board', 'Root cause per item', 'One-week improvement plan'],
      },
    ],

    interviewQuestions: [
      {
        id: 'd7-q1',
        question: 'Walk me through the architecture of your Week 1 admin dashboard.',
        tags: ['react', 'architecture'],
        expectedAnswerDirection: 'User goals → folder layout → component library → state categories → API layer → auth → error/loading → team ownership.',
        seniorTalkingPoints: ['features/, shared/, entities/ boundaries', 'API client with interceptors', 'Route-level error boundary'],
        commonMistakes: ['Folder names without data flow', 'No auth refresh or RBAC mention'],
        followUpQuestions: ['3 teams contribute without daily merge conflicts?', 'What breaks at 10x data volume?'],
        architectureAngle: 'Capstone proves you can narrate a system, not just code widgets.',
        enterpriseTradeoffs: ['Monorepo vs polyrepo for admin SPA'],
        scalabilityDiscussion: ['Lazy routes + code splitting for admin modules'],
        verbalPracticeMinutes: 10,
        mockEligible: true,
      },
      {
        id: 'd7-q2',
        question: 'Explain React architecture verbally — hooks, state, and rendering.',
        tags: ['react'],
        expectedAnswerDirection: 'Synthesize week: render model → hooks rules → effect discipline → state split → performance tools.',
        seniorTalkingPoints: ['Connect to bugs fixed in week exercises', 'React Query for server state'],
        commonMistakes: ['Disconnected definitions without system story'],
        followUpQuestions: ['30-day plan joining class-component codebase?'],
        architectureAngle: 'Senior answer ties patterns to shipped outcomes and metrics.',
        enterpriseTradeoffs: ['Incremental hooks adoption vs freeze on classes'],
        scalabilityDiscussion: ['Design system as shared render boundary'],
        verbalPracticeMinutes: 8,
        mockEligible: false,
      },
      {
        id: 'd7-q3',
        question: 'Summarize your Week 1 JavaScript comeback — what would you still drill?',
        tags: ['javascript', 'revision'],
        expectedAnswerDirection: 'Honest gap assessment → closures/async/event loop → ES6 modules → tie to mock scores → next week plan.',
        seniorTalkingPoints: ['Use War Room readiness breakdown data', 'Name specific questions rated ≤2'],
        commonMistakes: ['Generic "need more practice" without specifics'],
        followUpQuestions: ['How prioritize gaps with 5 hrs/day?'],
        architectureAngle: 'Self-assessment maturity signals senior readiness.',
        enterpriseTradeoffs: ['Depth vs breadth before interview date'],
        scalabilityDiscussion: ['Spaced repetition schedule for weak topics'],
        verbalPracticeMinutes: 5,
        mockEligible: false,
      },
      {
        id: 'd7-q4',
        question: 'Design auth + RBAC for the admin dashboard — frontend responsibilities.',
        tags: ['react', 'security'],
        expectedAnswerDirection: 'Login flow → token storage → refresh → route guards → role-based UI → server validates always.',
        seniorTalkingPoints: ['Hide nav items vs enforce on API', '403 vs 401 handling'],
        commonMistakes: ['RBAC only in UI', 'Token in localStorage'],
        followUpQuestions: ['Permission change mid-session — how refresh UI?'],
        architectureAngle: 'Auth hook + PermissionGate component pattern.',
        enterpriseTradeoffs: ['Fine-grained RBAC vs coarse roles'],
        scalabilityDiscussion: ['100 roles × 50 routes — config-driven access matrix'],
        verbalPracticeMinutes: 6,
        mockEligible: false,
      },
      {
        id: 'd7-q5',
        question: 'How would you test the Week 1 dashboard — unit, integration, E2E split?',
        tags: ['react', 'testing'],
        expectedAnswerDirection: 'Unit: utils/hooks → integration: forms + API mock → E2E: critical login path → Testing Library principles.',
        seniorTalkingPoints: ['MSW for API layer tests', 'Avoid testing implementation details'],
        commonMistakes: ['Only snapshot tests', 'E2E everything — slow CI'],
        followUpQuestions: ['Test custom hook with renderHook?'],
        architectureAngle: 'Testing pyramid aligned with CI budget — 80/15/5 rule of thumb.',
        enterpriseTradeoffs: ['Visual regression vs functional E2E cost'],
        scalabilityDiscussion: ['Parallel E2E shards in monorepo CI'],
        verbalPracticeMinutes: 5,
        mockEligible: false,
      },
      {
        id: 'd7-q6',
        question: 'Mock interview debrief — what did you learn from Week 1 mock rounds?',
        tags: ['interview', 'meta'],
        expectedAnswerDirection: 'Specific scores → patterns in weak answers → structure improvement → next mock goals → readiness score interpretation.',
        seniorTalkingPoints: ['Structure/depth/tradeoffs/communication dimensions', 'Re-run lowest mock questions'],
        commonMistakes: ['Vague "went okay" without data'],
        followUpQuestions: ['What one habit changes before Week 2?'],
        architectureAngle: 'Meta-cognition — senior engineers iterate on communication, not just code.',
        enterpriseTradeoffs: ['Mock frequency vs burnout'],
        scalabilityDiscussion: ['Peer mock rotation in team prep'],
        verbalPracticeMinutes: 5,
        mockEligible: false,
      },
      {
        id: 'd7-q7',
        question: 'If you joined a legacy React codebase Monday — Week 1 knowledge applied how?',
        tags: ['react', 'leadership'],
        expectedAnswerDirection: 'Assess: React version, state libs, test coverage → quick wins → strangler migration → hooks adoption plan → team alignment.',
        seniorTalkingPoints: ['Readiness to lead vs individual contributor mode', 'Document findings week 1'],
        commonMistakes: ['Immediate rewrite pitch', 'No discovery phase'],
        followUpQuestions: ['First PR you would submit?'],
        architectureAngle: 'Tech lead interview tests migration judgment, not greenfield only.',
        enterpriseTradeoffs: ['Big refactor vs incremental value delivery'],
        scalabilityDiscussion: ['Codemod + eslint rules for incremental standards'],
        verbalPracticeMinutes: 6,
        mockEligible: false,
      },
    ],

    revision: [
      'Revise all Week 1 weak areas from dashboard threat board.',
      'Re-run lowest-scoring mock questions.',
      'Finalize dashboard deliverable README with architecture diagram.',
    ],

    deliverable: {
      title: 'Mini Admin Dashboard — Week 1 Capstone',
      rapidFireConcepts: [
        'One-sentence React render pipeline?',
        'Three state categories in your dashboard?',
        'Auth token storage — your choice and why?',
      ],
      implementationTasks: [
        'Half day: login + API dashboard cards + reusable layout.',
        'Run 2 full mock rounds from Week 1 pack and log scores in app.',
      ],
      verbalExplanationChallenge: 'Record 10-min architecture walkthrough of your dashboard — must include tradeoffs and one metric you would monitor.',
    },
  });
})();
