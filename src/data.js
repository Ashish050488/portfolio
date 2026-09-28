export const PROFILE = {
  name: 'Ashish Ranjan',
  role: 'Software Development Engineer',
  company: 'Livo Assistant',
  location: 'Bengaluru, India',
  email: 'ashishar050488@gmail.com',
  links: {
    github: 'https://github.com/Ashish050488',
    linkedin: 'https://linkedin.com/in/dev-ashishranjan',
    leetcode: 'https://leetcode.com/ashish050488',
  },
  education: 'B.Tech, AI & Machine Learning · LNCT Bhopal · 2026',
}

export const METRICS = [
  { value: 6, prefix: '45m → ', suffix: 'm', label: 'Scraper runtime', note: 'From a 45-minute timeout to ~6 minutes across 9 ATS platforms.', viz: 'shrink' },
  { value: 2853, suffix: '', label: 'Job boards ingested', note: 'Change-detected with SHA-256, deduped, bulk-written to MongoDB.', viz: 'grid' },
  { value: 97.5, suffix: '%', decimals: 1, label: 'AI cache shrunk', note: '87 MB down to 2.2 MB without losing a single classification.', viz: 'bar' },
  { value: 25, suffix: '×', label: 'Ledger sync ceiling', note: 'Zoho Books account fetch raised from 200 to 5,000, no silent loss.', viz: 'rise' },
  { value: 60, suffix: '', label: 'Security tests', note: 'Guarding IDOR, formula & header injection, XSS and auth abuse.', viz: 'shield' },
  { value: 39, prefix: '', suffix: '/39', label: 'Scheduled runs green', note: 'Every production cron run succeeded after the re-architecture.', viz: 'dots' },
]

export const EXPERIENCE = [
  {
    period: 'Jun 2026 — Now',
    role: 'Software Development Engineer',
    org: 'Livo Assistant',
    meta: 'Chillspace Labs Pvt. Ltd. · Bengaluru',
    current: true,
    summary: 'Compliance & payroll SaaS for CA firms. I own the parts where a wrong number is a legal problem.',
    points: [
      ['Built a GST reconciliation engine from zero', ' — 2B matching, ITC carry-forward, versioned reconciliation history and the full return lifecycle.'],
      ['Re-engineered Zoho Books ledger sync', ' with paginated ingestion, watermark-based incremental sync, retry/backoff and per-account failure isolation. 200 → 5,000 accounts, zero silent data loss.'],
      ['Re-architected payroll', ' into a versioned, non-destructive accept / reject / cancel lifecycle with validation, safe spreadsheet exports and automated PDF + email outputs.'],
      ['Led security hardening', ' across cross-tenant IDOR, XLSX formula injection, email-header injection, XSS and auth abuse. Redesigned login throttling, backed by 60 automated tests.'],
    ],
    tags: ['Node.js', 'React', 'MongoDB', 'Zoho API', 'AppSec'],
  },
  {
    period: 'Jul 2025 — May 2026',
    role: 'Software Engineer, Full Stack',
    org: 'englishjobsgermany.com',
    meta: 'Freelance · Remote · German market',
    summary: 'Solo-owned the data pipeline and AI layer behind a production job board.',
    points: [
      ['Re-architected the scraping pipeline', ' across 9 ATS platforms and 2,853 boards — SHA-256 change detection, dedup, safe expiry, bulk writes. 45 min → ~6 min, 39/39 runs green.'],
      ['Shipped production AI workflows', ' with Gemini and Gemma: German-requirement classification, structured extraction and resume matching, with pre-LLM filtering and multi-model fallback.'],
      ['Automated WhatsApp distribution', ' with scheduled, deduplicated workflows that deliver fresh jobs to subscribers.'],
      ['Reliability work', ' — change-stream cache sync, indexed in-memory search, async resume parsing, and a 97.5% smaller AI cache.'],
    ],
    tags: ['TypeScript', 'MongoDB', 'Gemini', 'Gemma', 'node-cron'],
  },
  {
    period: 'Apr 2025 — Jun 2025',
    role: 'Software Engineer Intern',
    org: 'SniperThink',
    meta: 'Remote · India',
    summary: 'First production codebase. Fixed the data layer everything else stood on.',
    points: [
      ['Rebuilt the PostgreSQL data layer', ' and designed a Node.js / Express REST API with role-based access, resolving critical consistency failures and isolating Admin, Owner and User access.'],
    ],
    tags: ['PostgreSQL', 'Express', 'RBAC'],
  },
]

export const PROJECTS = [
  {
    id: 'jobmesh',
    name: 'JobMesh',
    kind: 'Job aggregation platform',
    year: '2026',
    live: 'https://jobmesh.in',
    hue: '#FF6B2C',
    blurb: '2,000+ openings from 100+ companies, pulled off scattered ATS portals into one clean, searchable feed.',
    stack: ['Node.js', 'MongoDB', 'React', 'LLM classification', 'node-cron'],
    study: {
      problem: 'Job seekers in India check dozens of career pages and ATS portals one by one.',
      approach: 'Multi-ATS ingestion with upsert-based dedup, plus LLM classification and keyword filtering to keep listings relevant.',
      impact: 'Live at jobmesh.in with 2,000+ listings from 100+ companies and organic traffic.',
    },
  },
  {
    id: 'ejg',
    name: 'English Jobs Germany',
    kind: 'AI-powered job board',
    year: '2025',
    live: 'https://englishjobsgermany.com',
    hue: '#7CF7D4',
    blurb: 'Finds roles in Germany that genuinely don’t require German. 2,853 boards, classified by AI, delivered to WhatsApp.',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Gemini / Gemma', 'WhatsApp'],
    study: {
      problem: 'English speakers in Germany hit listings that quietly require German, and boards go stale fast.',
      approach: 'Hash-based change detection and bulk writes, Gemini/Gemma classification with fallback, change-stream cache sync.',
      impact: '45 min → 6 min runtime, 39/39 green runs, 97.5% smaller AI cache.',
    },
  },
  {
    id: 'proxyclaw',
    name: 'ProxyClaw',
    kind: 'AI agent deployment SaaS',
    year: '2026',
    live: 'https://proxyclaw.xyz',
    hue: '#B69CFF',
    blurb: 'Deploy AI agents without touching infrastructure. I co-engineered the Docker orchestration backend.',
    stack: ['React 19', 'Node.js', 'Docker', 'WebSockets', 'TanStack Query', 'Zustand'],
    study: {
      problem: 'Shipping an AI agent took real infrastructure knowledge most teams don’t have.',
      approach: 'Docker-based orchestration for deployments and billing, hardened API (rate limits, Helmet, CORS), real-time WebSocket UI.',
      impact: 'Live SaaS at proxyclaw.xyz serving real users.',
    },
  },
  {
    id: 'crunch',
    name: 'CrunchGuardian',
    kind: 'Crypto wallet risk analytics',
    year: '2025',
    live: 'https://my-wallet-app-theta.vercel.app/',
    code: 'https://github.com/Ashish050488/CrunchGuardian-AI',
    hue: '#FFD23F',
    blurb: 'Check a wallet’s risk profile in seconds, before you send it money.',
    stack: ['React', 'Node.js', 'BitCrunch API', 'Tailwind'],
    study: {
      problem: 'No quick way to judge whether a wallet is safe before a transfer.',
      approach: 'BitCrunch analytics surfaced as a risk score, history and behavioural patterns.',
      impact: 'Wallet risk visible in seconds, pre-transaction.',
    },
  },
  {
    id: 'devsync',
    name: 'DevSync',
    kind: 'Developer networking',
    year: '2025',
    live: 'http://16.171.132.28',
    code: 'https://github.com/Ashish050488/DevSync',
    hue: '#5AA9FF',
    blurb: 'Find developers by stack, connect, and chat in real time. MERN on AWS EC2.',
    stack: ['React', 'Node.js', 'WebSockets', 'AWS EC2', 'Tailwind'],
    study: {
      problem: 'Developers had no dedicated place to find peers by stack.',
      approach: 'MERN platform with WebSocket chat, connection management and developer profiles.',
      impact: 'Discovery plus real-time messaging in one place.',
    },
  },
]

export const STACK = [
  { layer: 'Interface', items: ['React 19', 'TypeScript', 'Tailwind', 'Framer Motion', 'Zustand', 'TanStack Query'] },
  { layer: 'Services', items: ['Node.js', 'Express', 'REST', 'WebSockets', 'node-cron', 'RBAC'] },
  { layer: 'Data', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Change streams', 'Bulk writes'] },
  { layer: 'Intelligence', items: ['Gemini', 'Gemma', 'Structured extraction', 'Model fallback', 'Python'] },
  { layer: 'Infrastructure', items: ['Docker', 'AWS EC2', 'Vercel', 'Git', 'CI'] },
  { layer: 'Security', items: ['IDOR defence', 'Injection hardening', 'Rate limiting', 'Helmet / CORS', 'Auth throttling'] },
]
