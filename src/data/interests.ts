/**
 * Curated Interests Archive
 * Represents areas of technical curiosity and exploratory research
 */

export interface InterestItem {
  id: string;
  title: string;
  domain: "ai" | "engineering" | "systems" | "creative";
  domainLabel: string;
  summary: string;
  details: string;
  relatedTechnologies: string[];
  relatedProjectIds?: string[];
}

export const INTERESTS_DATA: InterestItem[] = [
  {
    id: "agentic-ai",
    title: "Agentic AI & Workflow Topologies",
    domain: "ai",
    domainLabel: "Artificial Intelligence",
    summary: "Systems that coordinate multiple tools, reasoning traces, and specialized sub-agents under deterministic policy boundaries.",
    details: "I am fascinated by moving beyond simple single-prompt chatbot exchanges toward structured agent state machines. The real challenge is not getting an LLM to generate text, but orchestrating multi-step execution graphs where sub-agents critique, verify, and ground each other before modifying state.",
    relatedTechnologies: ["LangGraph", "Tool Use APIs", "ReAct Pattern", "Deterministic Guardrails"],
    relatedProjectIds: ["mrpl-sovereign-workbench", "agentic-ast-reviewer"]
  },
  {
    id: "open-weight-llms",
    title: "Open-Weight Models & Local Inference",
    domain: "ai",
    domainLabel: "Artificial Intelligence",
    summary: "Quantization, GGUF/AWQ runtimes, edge model deployment, and self-hosted private pipelines.",
    details: "Exploring how 3B, 7B, and 8B parameter models (such as Llama 3, Mistral, and Qwen) can be deployed directly on consumer or edge hardware. Understanding the trade-offs between quantization bit-depth, perplexity degradation, and tokens-per-second throughput is crucial for building confidential industrial applications.",
    relatedTechnologies: ["Ollama", "vLLM", "llama.cpp", "AWQ / GGUF Quantization"],
    relatedProjectIds: ["mrpl-sovereign-workbench"]
  },
  {
    id: "software-engineering",
    title: "Software Engineering & Clean Architecture",
    domain: "engineering",
    domainLabel: "Software Engineering",
    summary: "Building resilient full-stack systems with clean boundaries, decoupled services, and predictable state lifecycles.",
    details: "Writing maintainable code requires discipline: separating domain logic from side effects, designing self-documenting APIs, and choosing composition over unnecessary complexity. Good software withstands requirement churn without collapsing into spaghetti.",
    relatedTechnologies: ["Design Patterns", "Clean Architecture", "Unit & Integration Testing", "API Contracts"],
    relatedProjectIds: ["srm-campus-compass", "agentic-ast-reviewer"]
  },
  {
    id: "full-stack-dev",
    title: "Full-Stack Web Development",
    domain: "engineering",
    domainLabel: "Software Engineering",
    summary: "Modern web stacks connecting reactive frontend architectures to robust async backend engines.",
    details: "From designing schema migrations and caching layers on the server to crafting responsive, accessible client interfaces in React and TypeScript. I enjoy bridging the gap so users receive seamless, instantaneous feedback.",
    relatedTechnologies: ["React", "TypeScript", "FastAPI", "Node.js", "PostgreSQL", "Tailwind CSS"],
    relatedProjectIds: ["srm-campus-compass", "mrpl-sovereign-workbench"]
  },
  {
    id: "creative-web",
    title: "Creative Web Development & Typography",
    domain: "creative",
    domainLabel: "Creative Tech",
    summary: "Pushing web interfaces beyond cookie-cutter SaaS templates into tactile, editorial, and cinematic spaces.",
    details: "The web can be an expressive medium. I study how editorial layout, deliberate typography, negative space, and physics-driven micro-interactions can make an application feel alive and memorable without sacrificing speed or accessibility.",
    relatedTechnologies: ["CSS Architecture", "Editorial Typography", "Canvas 2D", "Motion Design"],
    relatedProjectIds: ["lab_creative_experiment"]
  },
  {
    id: "cs-fundamentals",
    title: "Computer Science Fundamentals",
    domain: "systems",
    domainLabel: "Computer Science",
    summary: "Algorithms, data structures, concurrency primitives, operating systems, and memory hierarchy.",
    details: "Frameworks come and go, but algorithmic complexity, memory management, and thread synchronization remain foundational. I enjoy strengthening these foundations through coursework at SRM University–AP and independent problem solving.",
    relatedTechnologies: ["Java Collections", "Concurrency Primitives", "Graph Algorithms", "Memory Models"],
    relatedProjectIds: ["agentic-ast-reviewer"]
  },
  {
    id: "rag-systems",
    title: "Dense Retrieval & RAG Architectures",
    domain: "ai",
    domainLabel: "Artificial Intelligence",
    summary: "Hybrid lexical-dense search, semantic chunking algorithms, and verifiable source grounding.",
    details: "Bridging the gap between raw unstructured document corpuses and LLM context windows. Investigating how document layout preservation, cross-encoder re-ranking, and query decomposition dramatically improve grounding fidelity.",
    relatedTechnologies: ["BM25", "Reciprocal Rank Fusion", "Vector Embeddings", "Semantic Chunking"],
    relatedProjectIds: ["neuraldoc-semantic-rag", "mrpl-sovereign-workbench"]
  },
  {
    id: "hackathons",
    title: "Hackathons & High-Velocity Prototyping",
    domain: "engineering",
    domainLabel: "Collaborative Building",
    summary: "Rapid problem formulation, architectural triage, and shipping working prototypes within 24–48 hours.",
    details: "Hackathons teach you what truly matters in software: scoping ruthlessly, communicating clearly with teammates under pressure, and prioritizing a delightful user loop over theoretical perfection.",
    relatedTechnologies: ["Rapid Prototyping", "Team Coordination", "Git Branching", "Live Demonstrations"],
    relatedProjectIds: ["srm-campus-compass"]
  }
];
