// SkillProof Mock Data Repository

export const INITIAL_CANDIDATES = [
  {
    id: "cand-1",
    name: "Alex Vance",
    role: "Senior Full-Stack Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    location: "San Francisco, CA",
    bio: "Product-minded software architect specializing in ultra-fast Web apps, TypeScript, and micro-frontend design systems.",
    email: "alex.vance@skillproof.io",
    verifiedScoreAvg: 94,
    percentileRank: "Top 2%",
    skills: [
      { name: "React / Next.js", score: 96, verified: true, date: "2026-08-15" },
      { name: "Node.js & APIs", score: 92, verified: true, date: "2026-08-10" },
      { name: "UI/UX Systems", score: 94, verified: true, date: "2026-07-28" },
      { name: "Cloud & DevOps", score: 88, verified: true, date: "2026-06-12" }
    ],
    proofOfWork: [
      {
        id: "pow-1",
        title: "High-Frequency Crypto Analytics Dashboard",
        description: "Real-time canvas-rendered charting engine processing 50k events/sec with WebSockets and WebAssembly.",
        techStack: ["React 19", "TypeScript", "WebSockets", "Tailwind CSS", "Canvas API"],
        githubUrl: "https://github.com/alexvance/crypto-stream-ui",
        liveUrl: "https://crypto-stream-demo.skillproof.dev",
        metrics: "Sub-16ms frame render times, 4.9/5 client rating",
        verifiedHash: "0x8f2a91b4c3e7829d1045f67a21b3e8c9d4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9",
        verifiedDate: "2026-08-18",
        peerReviews: 4
      },
      {
        id: "pow-2",
        title: "Distributed Task Queue & Workflow Engine",
        description: "Zero-dependency Rust-backed Node.js worker pool handling async job scheduling with Redis fallback.",
        techStack: ["Node.js", "Redis", "TypeScript", "Docker", "Prometheus"],
        githubUrl: "https://github.com/alexvance/flow-queue",
        liveUrl: "https://flowqueue.io",
        metrics: "Zero memory leaks over 30 days continuous benchmark",
        verifiedHash: "0x3e7194ab82910c4f56781290abcdef1234567890abcdef1234567890abcdef12",
        verifiedDate: "2026-07-30",
        peerReviews: 7
      }
    ],
    badges: [
      {
        id: "badge-react-96",
        title: "Master React & Frontend Systems",
        score: 96,
        tier: "Diamond Level",
        issuedDate: "2026-08-15",
        verificationHash: "0xa1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0",
        proctorVerified: true
      },
      {
        id: "badge-node-92",
        title: "Expert Node.js & Microservices",
        score: 92,
        tier: "Gold Level",
        issuedDate: "2026-08-10",
        verificationHash: "0xf9e8d7c6b5a43210987654321fedcba0987654321fedcba0987654321fedcba0",
        proctorVerified: true
      }
    ]
  },
  {
    id: "cand-2",
    name: "Priya Sharma",
    role: "AI & Machine Learning Lead",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    location: "Seattle, WA",
    bio: "Specialist in Retrieval-Augmented Generation (RAG), LLM fine-tuning, and scalable PyTorch backend deployment.",
    email: "priya.sharma@skillproof.io",
    verifiedScoreAvg: 96,
    percentileRank: "Top 1%",
    skills: [
      { name: "Python & ML Pipelines", score: 98, verified: true, date: "2026-08-20" },
      { name: "Cloud & DevOps", score: 93, verified: true, date: "2026-08-01" },
      { name: "Node.js & APIs", score: 86, verified: true, date: "2026-06-20" }
    ],
    proofOfWork: [
      {
        id: "pow-3",
        title: "Enterprise Multi-Agent RAG Search Engine",
        description: "Vector database indexing pipeline with hybrid dense/sparse retrieval reducing response latency by 45%.",
        techStack: ["Python", "PyTorch", "Qdrant", "FastAPI", "LangChain"],
        githubUrl: "https://github.com/priyasharma/rag-enterprise",
        liveUrl: "https://rag-demo.skillproof.dev",
        metrics: "Tested on 1M+ PDF documents with 98.4% retrieval accuracy",
        verifiedHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        verifiedDate: "2026-08-22",
        peerReviews: 9
      }
    ],
    badges: [
      {
        id: "badge-py-98",
        title: "Master AI & Machine Learning",
        score: 98,
        tier: "Diamond Level",
        issuedDate: "2026-08-20",
        verificationHash: "0x554433221100aabbccddeeff99887766554433221100aabbccddeeff99887766",
        proctorVerified: true
      }
    ]
  },
  {
    id: "cand-3",
    name: "Marcus Chen",
    role: "UI/UX & Design Systems Architect",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    location: "Austin, TX",
    bio: "Crafting modern glassmorphic interface systems with pixel-perfect accessibility, animation design, and Tailwind mastery.",
    email: "marcus.chen@skillproof.io",
    verifiedScoreAvg: 91,
    percentileRank: "Top 5%",
    skills: [
      { name: "UI/UX Systems", score: 97, verified: true, date: "2026-08-12" },
      { name: "React / Next.js", score: 89, verified: true, date: "2026-07-15" }
    ],
    proofOfWork: [
      {
        id: "pow-4",
        title: "Lumina Accessible Design System",
        description: "Open-source React component library with built-in dark/light mode engine, WCAG AAA compliance, and zero runtime layout shifts.",
        techStack: ["React", "Tailwind CSS", "Framer Motion", "Storybook", "Radix UI"],
        githubUrl: "https://github.com/marcuschen/lumina-ui",
        liveUrl: "https://lumina-ui.dev",
        metrics: "Used by 12k+ developers, 100% lighthouse accessibility score",
        verifiedHash: "0xbbccddeeff99887766554433221100aabbccddeeff99887766554433221100aa",
        verifiedDate: "2026-08-14",
        peerReviews: 12
      }
    ],
    badges: [
      {
        id: "badge-ux-97",
        title: "Master UI/UX & Design Systems",
        score: 97,
        tier: "Diamond Level",
        issuedDate: "2026-08-12",
        verificationHash: "0x99887766554433221100aabbccddeeff99887766554433221100aabbccddeeff",
        proctorVerified: true
      }
    ]
  }
];

export const ASSESSMENT_SUITES = [
  {
    id: "ass-react",
    title: "React 19 & Modern Web Architecture",
    category: "React / Next.js",
    level: "Advanced",
    durationMinutes: 15,
    totalQuestions: 5,
    passingScore: 80,
    icon: "Code2",
    description: "Evaluates state batching, server vs client components, hook optimization, memory leak prevention, and concurrent rendering.",
    skillsTested: ["React 19", "State Management", "Performance Profiling", "Custom Hooks", "Clean Architecture"],
    questions: [
      {
        id: "q1",
        question: "In React 19, how does automatic state batching handle async operations inside custom hooks?",
        options: [
          "State updates inside async promises are automatically batched into a single render cycle.",
          "Async state updates trigger synchronous renders for every resolved promise step.",
          "You must manually wrap async state updates in ReactDOM.flushSync() to enable batching.",
          "Batching only applies to click event handlers, not async fetch callbacks."
        ],
        correctIndex: 0,
        explanation: "React 19 automatically batches state updates regardless of whether they originate inside event handlers, promises, setTimeouts, or native events."
      },
      {
        id: "q2",
        question: "Which pattern correctly prevents unnecessary recalculations of high-overhead data when props change?",
        codeSnippet: `const memoizedValue = useMemo(() => {\n  return expensiveComputation(data);\n}, [data]);`,
        options: [
          "Using useMemo with proper dependency arrays.",
          "Wrapping the function inside useEffect with no dependency array.",
          "Defining the computation directly inside the component body.",
          "Assigning the function call to a global window variable."
        ],
        correctIndex: 0,
        explanation: "useMemo caches the result of a calculation between re-renders when dependencies remain unchanged."
      },
      {
        id: "q3",
        question: "What is the primary benefit of React Server Components (RSC) over traditional Client Components?",
        options: [
          "Zero client bundle impact for server dependencies like heavy markdown parsers and DB clients.",
          "RSC allows running browser DOM manipulation directly on the Node server.",
          "RSC replaces CSS stylesheets with server-side inline HTML styles.",
          "RSC disables client-side routing completely."
        ],
        correctIndex: 0,
        explanation: "RSC executes solely on the server, allowing large dependencies to remain on the server without bloating the client JavaScript bundle."
      },
      {
        id: "q4",
        question: "Consider this custom hook code snippet. What potential bug exists?",
        codeSnippet: `function useDataFetcher(url) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch(url).then(res => res.json()).then(setData);\n  }, []);\n  return data;\n}`,
        options: [
          "Missing 'url' in useEffect dependency array causes stale fetch if url prop changes.",
          "fetch() cannot be called inside useEffect without async/await keywords.",
          "useState cannot accept 'null' as initial value in React.",
          "The hook must return a tuple [data, setData] instead of plain data."
        ],
        correctIndex: 0,
        explanation: "Omitting 'url' from the dependency array means changing the url parameter will not trigger a new fetch call."
      },
      {
        id: "q5",
        question: "When should you use useTransition instead of standard useState?",
        options: [
          "When performing non-urgent UI state transitions (e.g., filtering large list) without blocking key user input typing.",
          "When fetching data over WebSockets.",
          "To force a component to re-render synchronously 60 times per second.",
          "To store persistent state across browser reloads."
        ],
        correctIndex: 0,
        explanation: "useTransition allows state updates to be marked as non-urgent transitions, keeping the user input responsive."
      }
    ]
  },
  {
    id: "ass-python",
    title: "Python AI & Machine Learning Engineering",
    category: "Python & ML Pipelines",
    level: "Expert",
    durationMinutes: 20,
    totalQuestions: 5,
    passingScore: 85,
    icon: "BrainCircuit",
    description: "Assesses vector embeddings, PyTorch memory management, LLM RAG pipelines, and model API throughput optimization.",
    skillsTested: ["Python 3.12", "Vector Databases", "PyTorch", "RAG Pipelines", "FastAPI"],
    questions: [
      {
        id: "q1",
        question: "Which vector index type yields the fastest nearest-neighbor query speed with minimal memory overhead for 10M+ vectors?",
        options: [
          "HNSW (Hierarchical Navigable Small World) with Quantization (PQ)",
          "Flat L2 exact search",
          "B-Tree index on normalized floats",
          "Inverted File Index (IVF) without compression"
        ],
        correctIndex: 0,
        explanation: "HNSW with Product Quantization provides an optimal trade-off of high recall speed and low memory footprint for large scale embedding search."
      },
      {
        id: "q2",
        question: "How do you avoid GPU Out-of-Memory (OOM) errors during PyTorch batch inference?",
        options: [
          "Use torch.no_grad() and torch.cuda.empty_cache() while adjusting batch size with gradient accumulation.",
          "Set torch.autograd.set_detect_anomaly(True).",
          "Convert all tensors to Python native lists before passing to GPU.",
          "Increase CPU thread count in PyTorch Dataloader."
        ],
        correctIndex: 0,
        explanation: "Disabling autograd tracking via torch.no_grad() prevents memory accumulation during inference passes."
      },
      {
        id: "q3",
        question: "What is the function of Chunk Overlap in text chunking for Retrieval-Augmented Generation (RAG)?",
        options: [
          "Preserves semantic context across document splitting boundaries so key terms aren't severed.",
          "Doubles the embedding generation speed by skipping duplicate tokens.",
          "Compresses text files into binary zip streams.",
          "Prevents vector database index corruption."
        ],
        correctIndex: 0,
        explanation: "Chunk overlap ensures that sentences or context straddling a chunk boundary remain intact across neighboring text windows."
      },
      {
        id: "q4",
        question: "In FastAPI, how should long-running CPU-bound ML model inference calls be handled without blocking the event loop?",
        options: [
          "Delegate the CPU task to a background process pool using run_in_executor or Celery worker.",
          "Call time.sleep() before running the model.",
          "Declare the endpoint as async def without any await calls inside.",
          "Store the model inside an in-memory HTTP cookie."
        ],
        correctIndex: 0,
        explanation: "CPU-heavy ML computations block the single-threaded asyncio event loop unless offloaded to separate executor worker threads/processes."
      },
      {
        id: "q5",
        question: "What does temperature parameter = 0.0 accomplish when sampling from a large language model?",
        options: [
          "Produces deterministic output by always selecting the highest-probability token (greedy decoding).",
          "Generates maximum random creative responses.",
          "Doubles the token output speed.",
          "Disables safety guardrails on model outputs."
        ],
        correctIndex: 0,
        explanation: "A temperature of 0 results in greedy decoding, returning reproducible deterministic completions."
      }
    ]
  },
  {
    id: "ass-node",
    title: "Node.js Microservices & API Architecture",
    category: "Node.js & APIs",
    level: "Advanced",
    durationMinutes: 15,
    totalQuestions: 5,
    passingScore: 80,
    icon: "Server",
    description: "Covers event loop non-blocking IO, JWT token rotation, Redis caching strategies, and resilient microservice circuit breakers.",
    skillsTested: ["Node.js", "Express/Fastify", "Redis", "Security & Auth", "Microservices"],
    questions: [
      {
        id: "q1",
        question: "What happens if a synchronous intensive loop (e.g. JSON.parse of a 500MB payload) runs in Node.js main thread?",
        options: [
          "It blocks the Event Loop, causing incoming HTTP requests to freeze until parsing completes.",
          "Node.js automatically spawns a background thread to handle large JSON parses.",
          "The event loop terminates and throws a unhandledRejection error.",
          "Only non-GET requests are paused while GET requests continue processing."
        ],
        correctIndex: 0,
        explanation: "Node.js operates on a single event loop thread for JS execution; synchronous CPU tasks block all concurrent request processing."
      },
      {
        id: "q2",
        question: "Which Redis caching strategy prevents 'Cache Stampede' when popular keys expire simultaneously?",
        options: [
          "Probabilistic early expiration (XFetch algorithm) or Mutex lock around cache re-population.",
          "Setting key TTL to infinity.",
          "Running Redis in cluster mode without persistence.",
          "Purging all Redis keys every hour automatically."
        ],
        correctIndex: 0,
        explanation: "Probabilistic early expiration or locking ensures only one process recomputes the expired cache item while others receive serving grace data."
      },
      {
        id: "q3",
        question: "In OAuth2 / JWT authentication, what is the best security practice for storing Refresh Tokens?",
        options: [
          "HttpOnly, Secure, SameSite=Strict cookies rather than client-side localStorage.",
          "Plaintext string inside localStorage.",
          "Public URL query parameter.",
          "Base64 encoded string inside a global window object."
        ],
        correctIndex: 0,
        explanation: "HttpOnly cookies prevent JavaScript XSS attacks from reading sensitive refresh tokens."
      },
      {
        id: "q4",
        question: "What is the purpose of the Circuit Breaker pattern in microservice communications?",
        options: [
          "Prevents cascading service failure by failing fast when a downstream dependency is failing.",
          "Increases network bandwidth between servers.",
          "Automatically re-encrypts database passwords every 24 hours.",
          "Converts REST APIs into GraphQL schemas."
        ],
        correctIndex: 0,
        explanation: "Circuit breakers isolate failing services, halting requests temporarily to give downstream systems time to recover."
      },
      {
        id: "q5",
        question: "Which database transaction isolation level prevents 'Phantom Reads'?",
        options: [
          "Serializable isolation level.",
          "Read Uncommitted.",
          "Read Committed.",
          "Repeatable Read in basic MySQL without locking."
        ],
        correctIndex: 0,
        explanation: "Serializable isolation prevents phantom reads by fully locking range queries against concurrent insertions."
      }
    ]
  },
  {
    id: "ass-ux",
    title: "UI/UX & Modern Design Systems",
    category: "UI/UX Systems",
    level: "Intermediate",
    durationMinutes: 15,
    totalQuestions: 5,
    passingScore: 75,
    icon: "Palette",
    description: "Evaluates WCAG 2.1 AAA accessibility standards, atomic component design tokens, micro-interactions, and visual hierarchy.",
    skillsTested: ["UI/UX Design", "Design Tokens", "Accessibility (WCAG)", "Figma/Tailwind", "Responsive Layouts"],
    questions: [
      {
        id: "q1",
        question: "What is the minimum required color contrast ratio for normal text under WCAG 2.1 AA guidelines?",
        options: [
          "4.5:1 ratio",
          "3.0:1 ratio",
          "7.0:1 ratio",
          "2.0:1 ratio"
        ],
        correctIndex: 0,
        explanation: "WCAG 2.1 AA mandates a minimum contrast ratio of 4.5:1 for regular text and 3:1 for large text."
      },
      {
        id: "q2",
        question: "In Design System architecture, what is a 'Design Token'?",
        options: [
          "Agnostic design value variables (colors, typography, spacing) stored as JSON to maintain consistency across platforms.",
          "A cryptographic token used for user login.",
          "A vector icon file format.",
          "A payment coupon code for design tools."
        ],
        correctIndex: 0,
        explanation: "Design tokens encapsulate raw visual values into reusable variables shared across Web, iOS, and Android applications."
      },
      {
        id: "q3",
        question: "Why should interactive buttons always include explicit focus-visible ring styles?",
        options: [
          "Enables keyboard-only navigation users to visually track current focus location.",
          "Increases button click animation speed.",
          "Required by web search engines for SEO indexing.",
          "Prevents buttons from moving on window resize."
        ],
        correctIndex: 0,
        explanation: "Focus indicators are essential accessibility requirements for screen reader and keyboard navigation users."
      },
      {
        id: "q4",
        question: "What is the primary visual goal of using 'Glassmorphism' in web application UIs?",
        options: [
          "Creates depth and visual hierarchy using backdrop blur, translucent layers, and subtle borders.",
          "Reduces total CSS file size by 50%.",
          "Replaces HTML text with transparent image canvases.",
          "Forces screen brightness to maximum on mobile devices."
        ],
        correctIndex: 0,
        explanation: "Glassmorphism leverages frosted-glass translucency and blur filters to organize UI layers with sleek modern depth."
      },
      {
        id: "q5",
        question: "Which layout principle ensures interface elements scale gracefully without horizontal scrollbars across all screen widths?",
        options: [
          "Fluid responsive design using CSS Grid / Flexbox with relative units (rem, %, ch, vh).",
          "Setting fixed width: 1440px on all container divs.",
          "Using pixel-based absolute position values.",
          "Disabling viewport meta tags."
        ],
        correctIndex: 0,
        explanation: "Fluid layouts rely on modern CSS containers and flexible units to adjust content dynamically across screens."
      }
    ]
  }
];

export const REAL_WORLD_PROJECTS = [
  {
    id: "proj-1",
    title: "Real-Time Institutional Trading & Analytics Platform",
    client: "Apex Capital Systems",
    logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=120&q=80",
    budget: "$14,500",
    duration: "4 Weeks",
    domain: "Fintech & Web Architecture",
    description: "Looking for an expert React & Node engineer to build a high-performance order book UI with WebSockets, WebGL candlestick charts, and sub-second latency.",
    requiredSkills: [
      { name: "React / Next.js", minScore: 85 },
      { name: "Node.js & APIs", minScore: 80 }
    ],
    deliverables: [
      "WebSocket streaming order book with zero UI stuttering",
      "Interactive technical indicators (RSI, MACD, Bollinger Bands)",
      "Tested code with verified assessment proof"
    ],
    status: "Open",
    postedDate: "2026-08-25"
  },
  {
    id: "proj-2",
    title: "Enterprise Document Summarization & RAG Engine",
    client: "OmniCorp AI Labs",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    budget: "$18,000",
    duration: "6 Weeks",
    domain: "AI & Machine Learning",
    description: "Seeking a Python ML lead to construct a multi-agent RAG pipeline for processing 500k corporate PDFs with vector search and citations.",
    requiredSkills: [
      { name: "Python & ML Pipelines", minScore: 90 },
      { name: "Cloud & DevOps", minScore: 80 }
    ],
    deliverables: [
      "FastAPI endpoint with sub-800ms semantic search",
      "Vector indexing pipeline using Qdrant/Pinecone",
      "Cryptographically verified evaluation metrics"
    ],
    status: "Open",
    postedDate: "2026-08-26"
  },
  {
    id: "proj-3",
    title: "Next-Gen Glassmorphic Design System & Component Hub",
    client: "SaaSify Studio",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80",
    budget: "$9,500",
    duration: "3 Weeks",
    domain: "UI/UX & Design Systems",
    description: "Building an enterprise UI library with 40+ accessible React components, full dark-mode token support, and Storybook documentation.",
    requiredSkills: [
      { name: "UI/UX Systems", minScore: 85 },
      { name: "React / Next.js", minScore: 80 }
    ],
    deliverables: [
      "40+ WCAG AAA accessible React components",
      "Interactive token manager & theme builder",
      "Storybook deployed documentation site"
    ],
    status: "Open",
    postedDate: "2026-08-27"
  },
  {
    id: "proj-4",
    title: "Scalable Microservices Gateway & Auth Infrastructure",
    client: "HealthSync Cloud",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=120&q=80",
    budget: "$12,000",
    duration: "4 Weeks",
    domain: "Backend Infrastructure",
    description: "Migrating legacy REST auth into zero-trust Node.js API gateway with OAuth2 PKCE, rate limiting, and Redis cluster integration.",
    requiredSkills: [
      { name: "Node.js & APIs", minScore: 88 },
      { name: "Cloud & DevOps", minScore: 85 }
    ],
    deliverables: [
      "API gateway handling 10,000 req/sec",
      "Automated load test suite & benchmark report",
      "Verified microservices assessment badge"
    ],
    status: "Open",
    postedDate: "2026-08-24"
  }
];
