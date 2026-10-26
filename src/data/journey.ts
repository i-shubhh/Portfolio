/**
 * Chronological Journey and Milestones
 * Authentic, verified milestones reflecting Shubham's academic and engineering timeline.
 */

export interface JourneyMilestone {
  id: string;
  year: string;
  period: string;
  title: string;
  category: "Education" | "Project" | "Hackathon" | "Research" | "Milestone";
  description: string;
  keySkills: string[];
  relatedProjectId?: string;
  impact?: string;
}

export const JOURNEY_DATA: JourneyMilestone[] = [
  {
    id: "journey-srm-admission",
    year: "2023",
    period: "August 2023",
    title: "Enrolled at SRM University–AP",
    category: "Education",
    description: "Began Bachelor of Technology in Computer Science and Engineering with a focused specialization in Artificial Intelligence and Machine Learning. Immersed in foundational mathematics, calculus, and programming.",
    keySkills: ["C Programming", "Discrete Mathematics", "Problem Solving"],
    impact: "Formed the theoretical foundation for computational thinking and algorithmic problem solving."
  },
  {
    id: "journey-systems-core",
    year: "2024",
    period: "Spring – Summer 2024",
    title: "Mastering Core OOP & Systems Architecture",
    category: "Education",
    description: "Deepened expertise in Object-Oriented Programming with Java, Data Structures, and Database Management Systems. Began building independent software projects beyond coursework.",
    keySkills: ["Java", "Data Structures", "PostgreSQL", "OOP Design"],
    impact: "Built foundational comprehension of concurrency, relational schema design, and memory models."
  },
  {
    id: "journey-campus-compass",
    year: "2024",
    period: "Autumn 2024",
    title: "Architected SRM Campus Compass",
    category: "Project",
    description: "Engineered a high-performance interactive campus navigation and schedule companion for university students, solving indoor routing across multi-floor academic blocks with offline PWA support.",
    keySkills: ["React", "TypeScript", "PWA", "Graph Routing Algorithms"],
    relatedProjectId: "srm-campus-compass",
    impact: "Delivered an offline-first tool tested by fellow university peers across academic blocks."
  },
  {
    id: "journey-ai-local",
    year: "2025",
    period: "Early 2025",
    title: "Exploration of Local Inference & RAG Topologies",
    category: "Research",
    description: "Pivoted focus toward self-hosted open-weight language models. Set up local inference runtimes with Ollama and vLLM, researching why standard naive RAG pipelines fail on complex technical manuals.",
    keySkills: ["Python", "FastAPI", "Ollama", "Vector Embeddings", "RAG"],
    relatedProjectId: "neuraldoc-semantic-rag",
    impact: "Demonstrated 28% retrieval precision improvement through hybrid BM25 + dense vector ranking."
  },
  {
    id: "journey-mrpl-workbench",
    year: "2025",
    period: "Mid – Late 2025",
    title: "Initiated MRPL Sovereign AI Workbench",
    category: "Project",
    description: "Conceived and architected an industrial-grade self-hosted multimodal AI workbench tailored for confidential documentation, deterministic security policy guardrails, and air-gapped deployments.",
    keySkills: ["LangGraph", "Policy Guardrails", "Multi-Modal AI", "Docker"],
    relatedProjectId: "mrpl-sovereign-workbench",
    impact: "Designed an air-gap-ready system architecture preventing data leakage in high-stakes operations."
  },
  {
    id: "journey-future-2026",
    year: "2026",
    period: "Summer 2026 & Beyond",
    title: "Next Horizon: Industry Engineering & Systems Research",
    category: "Milestone",
    description: "Actively seeking summer 2026 software engineering and AI/ML internships to collaborate on frontier systems, scalable backend infrastructure, and intelligent developer tooling.",
    keySkills: ["System Design", "Distributed Systems", "Production ML"],
    impact: "Aiming to contribute rigorous engineering to production codebases and high-impact teams."
  }
];
