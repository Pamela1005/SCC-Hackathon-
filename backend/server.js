import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Database (seeded with realistic platform data)
let candidates = [
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

let projects = [
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
  }
];

// Helper: Calculate Match Rating
function calculateMatch(candidate, project) {
  if (!candidate || !project || !project.requiredSkills) return { score: 70, details: [] };
  let totalWeight = 0;
  let accumulated = 0;
  const details = [];

  project.requiredSkills.forEach(req => {
    const candSkill = candidate.skills.find(s =>
      s.name.toLowerCase().includes(req.name.toLowerCase()) || req.name.toLowerCase().includes(s.name.toLowerCase())
    );
    const score = candSkill ? candSkill.score : 0;
    const verified = candSkill ? candSkill.verified : false;
    let scoreVal = score;
    if (!verified) scoreVal *= 0.7;

    accumulated += scoreVal;
    totalWeight += 100;

    details.push({
      skill: req.name,
      minScore: req.minScore,
      candidateScore: score,
      verified,
      meetsThreshold: score >= req.minScore
    });
  });

  let matchPct = Math.round((accumulated / totalWeight) * 100);
  return { score: Math.max(30, Math.min(99, matchPct)), details };
}

// REST Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SkillProof API Server', timestamp: new Date().toISOString() });
});

// Candidates API
app.get('/api/candidates', (req, res) => {
  res.json({ success: true, count: candidates.length, data: candidates });
});

app.get('/api/candidates/:id', (req, res) => {
  const cand = candidates.find(c => c.id === req.params.id);
  if (!cand) return res.status(404).json({ success: false, error: 'Candidate not found' });
  res.json({ success: true, data: cand });
});

// Evaluate Assessment & Issue SHA-256 Badge
app.post('/api/assessments/evaluate', (req, res) => {
  const { candidateId, category, correctCount, totalCount } = req.body;
  if (!candidateId || correctCount === undefined || !totalCount) {
    return res.status(400).json({ success: false, error: 'Missing required parameters' });
  }

  const cand = candidates.find(c => c.id === candidateId);
  if (!cand) return res.status(404).json({ success: false, error: 'Candidate not found' });

  const scorePct = Math.round((correctCount / totalCount) * 100);
  
  // Real Node.js Crypto SHA-256 Signature Generation
  const signatureInput = `${candidateId}:${category}:${scorePct}:${Date.now()}:SKILLPROOF_SECRET_KEY`;
  const verificationHash = '0x' + crypto.createHash('sha256').update(signatureInput).digest('hex');
  const dateStr = new Date().toISOString().split('T')[0];

  let tier = "Silver Level";
  if (scorePct >= 95) tier = "Diamond Level";
  else if (scorePct >= 85) tier = "Gold Level";

  const newBadge = {
    id: `badge-${Date.now()}`,
    title: `${category} Assessment`,
    score: scorePct,
    tier,
    issuedDate: dateStr,
    verificationHash,
    proctorVerified: true
  };

  // Update candidate record
  const skillIdx = cand.skills.findIndex(s => s.name === category);
  if (skillIdx >= 0) {
    cand.skills[skillIdx] = {
      name: category,
      score: Math.max(cand.skills[skillIdx].score, scorePct),
      verified: true,
      date: dateStr
    };
  } else {
    cand.skills.push({ name: category, score: scorePct, verified: true, date: dateStr });
  }

  cand.verifiedScoreAvg = Math.round(cand.skills.reduce((acc, s) => acc + s.score, 0) / cand.skills.length);
  cand.badges.unshift(newBadge);

  res.json({
    success: true,
    scorePct,
    tier,
    verificationHash,
    candidate: cand
  });
});

// Auto-Matching API
app.post('/api/match', (req, res) => {
  const { candidateId, projectId } = req.body;
  if (candidateId && projectId) {
    const cand = candidates.find(c => c.id === candidateId);
    const proj = projects.find(p => p.id === projectId);
    if (!cand || !proj) return res.status(404).json({ success: false, error: 'Candidate or Project not found' });
    const match = calculateMatch(cand, proj);
    return res.json({ success: true, candidateId, projectId, match });
  }

  // If only project ID, return ranked matches across all candidates
  if (projectId) {
    const proj = projects.find(p => p.id === projectId);
    if (!proj) return res.status(404).json({ success: false, error: 'Project not found' });

    const rankings = candidates.map(cand => ({
      candidate: { id: cand.id, name: cand.name, role: cand.role, avatar: cand.avatar, verifiedScoreAvg: cand.verifiedScoreAvg },
      match: calculateMatch(cand, proj)
    })).sort((a, b) => b.match.score - a.match.score);

    return res.json({ success: true, projectId, rankings });
  }

  res.status(400).json({ success: false, error: 'Provide candidateId or projectId' });
});

// Verify Cryptographic Signature Hash API
app.get('/api/verify-hash/:hash', (req, res) => {
  const cleaned = req.params.hash.trim().toLowerCase();

  for (const cand of candidates) {
    const badge = cand.badges.find(b => b.verificationHash.toLowerCase() === cleaned);
    if (badge) {
      return res.json({
        success: true,
        verified: true,
        type: 'Assessment Badge',
        item: badge,
        candidate: { id: cand.id, name: cand.name, role: cand.role, avatar: cand.avatar }
      });
    }

    const pow = cand.proofOfWork.find(p => p.verifiedHash.toLowerCase() === cleaned);
    if (pow) {
      return res.json({
        success: true,
        verified: true,
        type: 'Proof of Work',
        item: pow,
        candidate: { id: cand.id, name: cand.name, role: cand.role, avatar: cand.avatar }
      });
    }
  }

  res.json({ success: true, verified: false, error: 'Hash signature not found in registry' });
});

// Projects API
app.get('/api/projects', (req, res) => {
  res.json({ success: true, count: projects.length, data: projects });
});

app.post('/api/projects', (req, res) => {
  const newProj = req.body;
  const created = {
    ...newProj,
    id: `proj-${Date.now()}`,
    status: "Open",
    postedDate: new Date().toISOString().split('T')[0]
  };
  projects.unshift(created);
  res.json({ success: true, data: created });
});

app.listen(PORT, () => {
  console.log(`⚡ SkillProof Backend API server running on http://localhost:${PORT}`);
});
