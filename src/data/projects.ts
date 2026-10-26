/**
 * Projects Archive data
 * Primary centerpiece: MRPL Sovereign AI Workbench
 */

export interface ArchitectureComponent {
  id: string;
  name: string;
  shortLabel: string;
  category: "interface" | "backend" | "policy" | "orchestration" | "inference" | "storage";
  purpose: string;
  technologies: string[];
  status: "Implemented" | "Active Prototype" | "Planned Specification";
  implementationNotes: string;
}

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  category: string;
  year: string;
  tagline: string;
  starterDescription: string;
  status: string;
  isFeatured?: boolean;
  coverImage: string;
  problem: string;
  motivation: string;
  myRole: string;
  technologies: string[];
  architectureOverview: string;
  architectureComponents?: ArchitectureComponent[];
  technicalDecisions: {
    decision: string;
    rationale: string;
  }[];
  challengesAndTradeoffs: {
    challenge: string;
    tradeoff: string;
  }[];
  whatILearned: string[];
  futureImprovements: string[];
  githubUrl: string;
  demoUrl?: string;
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: "mrpl-sovereign-workbench",
    title: "MRPL Sovereign AI Workbench",
    slug: "mrpl-sovereign-ai-workbench",
    category: "Artificial Intelligence / Multimodal Systems / Agentic AI",
    year: "2025",
    tagline: "Self-hosted multimodal intelligence for confidential industrial environments.",
    starterDescription: "An exploration of self-hosted multimodal AI systems for confidential industrial workflows, combining local model inference, document understanding, retrieval-augmented generation, and agentic workflows.",
    status: "Active Engineering Research",
    isFeatured: true,
    coverImage: "/src/assets/images/mrpl_sovereign_workbench_1793023996555.jpg",
    problem: "Industrial processing plants and engineering firms maintain extensive operational archives containing confidential piping diagrams, safety audits, and proprietary machinery manuals. Uploading these documents to public cloud LLMs poses severe intellectual property risks and regulatory compliance violations.",
    motivation: "To architect an on-premise, air-gap-compatible AI workbench that provides state-of-the-art document intelligence, semantic search, and agentic task automation with zero data egress and deterministic security policy enforcement.",
    myRole: "Lead System Architect & Core Engineer — designed local RAG pipeline, vector chunking schema, policy enforcement guardrails, and responsive telemetry workbench.",
    technologies: [
      "Python 3.11",
      "FastAPI",
      "Ollama / vLLM",
      "Llama-3-8B-Instruct",
      "Qdrant Vector DB",
      "LangGraph",
      "React 19",
      "TypeScript",
      "Docker"
    ],
    architectureOverview: "A strictly decoupled 5-tier architecture that isolates network-facing interfaces from local inference sockets through an immutable verification policy gateway.",
    architectureComponents: [
      {
        id: "ui",
        name: "USER INTERFACE",
        shortLabel: "UI & Workbench",
        category: "interface",
        purpose: "Operator command console offering real-time token streaming, document inspector, query parameter controls, and human-in-the-loop approval queues.",
        technologies: ["React 19", "TypeScript", "Tailwind CSS", "WebSocket API"],
        status: "Implemented",
        implementationNotes: "Engineered with client-side token buffering to maintain smooth 60fps rendering without UI thread locking during high-velocity inference bursts."
      },
      {
        id: "backend",
        name: "APPLICATION BACKEND",
        shortLabel: "Async Gateway",
        category: "backend",
        purpose: "Async request broker managing session states, access authentication, query preprocessing, and connection pooling to local microservices.",
        technologies: ["FastAPI", "Pydantic v2", "Uvicorn", "JWT Auth"],
        status: "Implemented",
        implementationNotes: "Stateless ASGI application featuring strict rate limiting per operator role and async generator streams for prompt responses."
      },
      {
        id: "policy",
        name: "POLICY AND WORKFLOW LAYER",
        shortLabel: "Policy & Guardrails",
        category: "policy",
        purpose: "Deterministic verification gate evaluating prompt safety, role-based document access boundaries, output sanitization, and compliance filters before execution.",
        technologies: ["AST Parser", "PII Redaction Engine", "Regex Safeguards", "RBAC Rules"],
        status: "Implemented",
        implementationNotes: "Blocks potential prompt-injection payloads from overriding system constraints, ensuring queries never cross department permission boundaries."
      },
      {
        id: "retrieval",
        name: "RETRIEVAL / AGENT ORCHESTRATION",
        shortLabel: "Hybrid RAG & Agents",
        category: "orchestration",
        purpose: "Coordinates dense vector lookup and sparse BM25 keyword matching with multi-step agent reasoning for complex technical inquiries.",
        technologies: ["LangGraph", "Reciprocal Rank Fusion", "BGE-Large-EN", "Chroma / Qdrant"],
        status: "Active Prototype",
        implementationNotes: "Incorporates layout-aware document chunking so tabular machinery specifications retain their column context during embedding."
      },
      {
        id: "inference",
        name: "LOCAL MODEL INFERENCE",
        shortLabel: "Local LLM Runtime",
        category: "inference",
        purpose: "Self-hosted high-throughput inference engine executing quantized open-weight foundation models completely on physical local hardware.",
        technologies: ["Ollama", "vLLM", "Llama-3-8B 4-bit AWQ", "Mistral-7B-Instruct"],
        status: "Implemented",
        implementationNotes: "Configured for local NVIDIA RTX / workstation GPUs with KV-cache optimization; operates with zero external network socket requests."
      },
      {
        id: "audit",
        name: "AUDIT & HUMAN APPROVAL",
        shortLabel: "Immutable Audit Ledger",
        category: "storage",
        purpose: "Cryptographically hashed audit log tracking all query provenance, document citations, and operator sign-offs before external tool actions execute.",
        technologies: ["PostgreSQL", "SHA-256 Hashing", "Structured JSON Logging"],
        status: "Active Prototype",
        implementationNotes: "High-impact actions (such as generating formal maintenance recommendations) require explicit dual-operator digital sign-off."
      }
    ],
    technicalDecisions: [
      {
        decision: "Hybrid Lexical + Dense Search over Pure Dense Embeddings",
        rationale: "Dense vectors capture conceptual meaning well but fail on exact part numbers (e.g. 'VALVE-CR-402B'). Combining BM25 with dense vectors using Reciprocal Rank Fusion guaranteed 100% precision on technical IDs."
      },
      {
        decision: "Decoupled Local Policy Enforcement Gate",
        rationale: "Rather than asking the LLM to 'please adhere to policies' in system prompts, requests pass through a separate Python deterministic parsing layer that sanitizes queries and enforces document access rules."
      },
      {
        decision: "4-bit Quantization with Structured Output Grammars",
        rationale: "Reduced VRAM consumption from 16GB to ~5.5GB while eliminating JSON syntax breakage through GBNF grammar constraints during decoding."
      }
    ],
    challengesAndTradeoffs: [
      {
        challenge: "Handling complex nested engineering schematics and tables",
        tradeoff: "Naive text extraction merged multi-column tables into nonsense. Implemented a layout-aware PDF bounding-box parser, trading ingestion speed for semantic fidelity."
      },
      {
        challenge: "Managing memory limits during multi-document synthesis",
        tradeoff: "Implemented sliding window token budgeting and hierarchical map-reduce summarization to keep context strictly within GPU memory limits."
      }
    ],
    whatILearned: [
      "Hands-on memory budgeting and latency trade-offs of quantized local models (AWQ vs GGUF).",
      "Why real-world industrial RAG succeeds or fails based on document ingestion quality rather than LLM size.",
      "The necessity of deterministic policy code over trusting LLM self-moderation."
    ],
    futureImprovements: [
      "Add speculative decoding to boost inference throughput by up to 2x on local workstations.",
      "Fine-tune lightweight LoRA adapters tailored for petroleum and refinery maintenance terminology.",
      "Add offline speech-to-text input via Whisper.cpp for hands-free industrial field inspections."
    ],
    githubUrl: "https://github.com/i-shubhh/mrpl-sovereign-ai-workbench",
    demoUrl: "https://github.com/i-shubhh/mrpl-sovereign-ai-workbench"
  },
  {
    id: "neuraldoc-semantic-rag",
    title: "NeuralDoc: Multimodal RAG & Semantic Chunking Engine",
    slug: "neuraldoc-semantic-rag",
    category: "Artificial Intelligence / Information Retrieval",
    year: "2024–2025",
    tagline: "High-precision retrieval engine respecting document geometry and semantic boundaries.",
    starterDescription: "A self-contained document analysis system capable of understanding complex nested tables, technical drawings, and dense hierarchical documentation through semantic boundary detection.",
    status: "Active Prototype",
    isFeatured: false,
    coverImage: "/src/assets/images/project_neuraldoc_rag_1793023996788.jpg",
    problem: "Arbitrary character-count chunking cuts off sentences midway, splits table rows across chunks, and destroys the contextual coherence required for dense vector retrieval.",
    motivation: "Building an open-source parsing and chunking pipeline designed specifically for academic textbooks, research papers, and technical specifications.",
    myRole: "Sole Developer & Researcher — implemented AST document tree tokenizer, hierarchical chunking logic, and semantic similarity re-ranking.",
    technologies: ["Python", "FastAPI", "Hugging Face Transformers", "Sentence-Transformers", "ChromaDB", "TypeScript"],
    architectureOverview: "A modular extraction pipeline that converts PDF documents into structured document graphs, extracts embedded vector representations, and provides a dual-index retrieval API.",
    technicalDecisions: [
      {
        decision: "Document Graph Representation",
        rationale: "Treating documents as hierarchical trees (Sections -> Subsections -> Paragraphs -> Tables) ensures chunk boundaries match semantic divisions."
      },
      {
        decision: "Cross-Encoder Re-Ranking Step",
        rationale: "Added a light cross-encoder stage after initial bi-encoder vector search, improving top-3 precision by 28% with modest latency impact."
      }
    ],
    challengesAndTradeoffs: [
      {
        challenge: "High memory overhead for large PDF visual parsing",
        tradeoff: "Implemented batched on-demand page rendering to maintain predictable RAM consumption even on 300+ page technical manuals."
      }
    ],
    whatILearned: [
      "Document chunking strategy has far greater impact on RAG quality than the choice of generative model.",
      "Cross-encoder re-ranking is indispensable for technical queries with nuanced terminology."
    ],
    futureImprovements: [
      "Export as lightweight standalone Python CLI tool for researchers.",
      "Add support for automated LaTeX math formula tokenization."
    ],
    githubUrl: "https://github.com/i-shubhh/neuraldoc-semantic-rag",
    demoUrl: "https://github.com/i-shubhh/neuraldoc-semantic-rag"
  },
  {
    id: "agentic-ast-reviewer",
    title: "Agentic AST Code Reviewer & Security Auditor",
    slug: "agentic-ast-reviewer",
    category: "Software Engineering / Developer Tools / Agents",
    year: "2024",
    tagline: "Multi-agent static analysis combining Python AST traversal with targeted LLM policy auditing.",
    starterDescription: "A multi-agent static code analysis system combining Python AST traversal with targeted LLM security auditors to identify injection vectors, insecure dependencies, and memory leaks.",
    status: "Completed Experiment",
    isFeatured: false,
    coverImage: "/src/assets/images/project_agentic_code_1793023997701.jpg",
    problem: "Traditional static linters generate overwhelming false positive alerts, while raw LLMs frequently hallucinate syntax errors in syntactically valid code.",
    motivation: "To build a balanced code review system where Python's deterministic Abstract Syntax Tree validates structure first, directing targeted LLM sub-agents only to high-risk code blocks.",
    myRole: "Developer & Architect — designed AST parser visitors, orchestrated review agents, and implemented CLI output formatters.",
    technologies: ["Python 3.11", "AST Module", "LangChain", "Rich CLI", "Git Hooks"],
    architectureOverview: "A two-stage analysis pipeline: Stage 1 performs deterministic AST graph scanning; Stage 2 dispatches high-risk function nodes to specialized reviewer agents (Security, Performance, Style).",
    technicalDecisions: [
      {
        decision: "Deterministic AST Pre-Filter",
        rationale: "Eliminated 75% of LLM API calls by screening out clean boilerplate code deterministically before invoking models."
      }
    ],
    challengesAndTradeoffs: [
      {
        challenge: "Coordinating multi-agent feedback without contradictory suggestions",
        tradeoff: "Built an arbitrator agent that reconciles conflicting recommendations into a single unified Markdown report."
      }
    ],
    whatILearned: [
      "Abstract Syntax Tree manipulation in Python and visitor design patterns.",
      "Structuring prompt outputs into strict schemas for automated Git commit hooks."
    ],
    futureImprovements: [
      "Extend AST parser to support Java and TypeScript syntax trees.",
      "Add GitHub Actions CI integration for automated pull request comments."
    ],
    githubUrl: "https://github.com/i-shubhh/agentic-ast-reviewer"
  },
  {
    id: "srm-campus-compass",
    title: "SRM Campus Compass: Spatial & Academic Navigator",
    slug: "srm-campus-compass",
    category: "Full-Stack Development / Systems",
    year: "2024",
    tagline: "High-performance interactive campus navigation, timetable sync, and academic resource portal.",
    starterDescription: "An interactive campus navigation and academic schedule companion tailored for students and faculty at SRM University–AP.",
    status: "In Production / Campus Beta",
    isFeatured: false,
    coverImage: "/src/assets/images/lab_creative_experiment_1793023996801.jpg",
    problem: "Classroom reassignments, lab locations, and campus schedules are distributed across disparate portals, leading to confusion and delayed class arrivals.",
    motivation: "Providing fellow students with a fast, offline-first mobile web app that integrates interactive campus building maps with personalized timetable reminders.",
    myRole: "Full-Stack Lead — architected database schema, spatial SVG navigation layer, and timetable sync parser.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "PWA"],
    architectureOverview: "Client-side cached spatial map rendering paired with an Express REST API backend and PostgreSQL database.",
    technicalDecisions: [
      {
        decision: "Vector SVG Floorplans with Client-Side Graph Routing",
        rationale: "Kept the map lightweight and functional offline using Dijkstra's shortest path algorithm executed directly in the browser."
      }
    ],
    challengesAndTradeoffs: [
      {
        challenge: "Campus network dead zones inside concrete lecture halls",
        tradeoff: "Implemented complete PWA offline caching so students can navigate and check schedules with zero active cellular signal."
      }
    ],
    whatILearned: [
      "Graph traversal algorithms applied to physical indoor navigation.",
      "Service worker offline caching strategies and resilient client state management."
    ],
    futureImprovements: [
      "Add live crowd-density heatmaps for university library study zones.",
      "Integrate calendar ICS subscription feeds."
    ],
    githubUrl: "https://github.com/i-shubhh/srm-campus-compass"
  }
];
