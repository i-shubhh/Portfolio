/**
 * The Learning Archive
 * Real-time research notebook documenting active explorations and technical studies.
 */

export type LearningStatus = 
  | "EXPLORING"
  | "LEARNING"
  | "BUILDING"
  | "EXPERIMENTING"
  | "COMPLETED"
  | "PAUSED";

export interface LearningEntry {
  id: string;
  topic: string;
  description: string;
  date: string;
  status: LearningStatus;
  relatedProject?: string;
  category: "Systems" | "AI & ML" | "Programming" | "Architecture" | "Frontend";
  resourceNote?: string;
  keyTakeaway?: string;
}

export const LEARNING_DATA: LearningEntry[] = [
  {
    id: "learn-vllm",
    topic: "Quantized Local Inference & vLLM Optimization",
    description: "Benchmarking PagedAttention, continuous batching, and AWQ 4-bit quantization latency on consumer GPUs.",
    date: "Spring 2026",
    status: "EXPERIMENTING",
    relatedProject: "MRPL Sovereign AI Workbench",
    category: "AI & ML",
    resourceNote: "Studying vLLM paper & huggingface/optimum kernels",
    keyTakeaway: "Memory bandwidth rather than compute is the primary bottleneck during single-batch autoregressive generation."
  },
  {
    id: "learn-java-concurrency",
    topic: "Strengthening Java Concurrency & Memory Model",
    description: "Deepening understanding of ExecutorService, synchronized blocks, volatile keywords, and thread pool design patterns.",
    date: "Winter 2025 – Present",
    status: "LEARNING",
    category: "Programming",
    resourceNote: "Java Concurrency in Practice & academic assignments",
    keyTakeaway: "Clear boundaries around shared mutable state eliminate entire classes of race conditions."
  },
  {
    id: "learn-rag-chunking",
    topic: "Layout-Aware Document Chunking & Hybrid Search",
    description: "Moving past character-count chunking by testing bounding-box document parsers that keep table cells and section headings intact.",
    date: "Fall 2025",
    status: "BUILDING",
    relatedProject: "NeuralDoc RAG Engine",
    category: "Architecture",
    resourceNote: "Researching Reciprocal Rank Fusion (RRF) scoring math",
    keyTakeaway: "Retrieval quality gains come overwhelmingly from ingestion preprocessing rather than tweaking LLM prompt words."
  },
  {
    id: "learn-agent-guardrails",
    topic: "Deterministic Guardrails for Agentic Tool Execution",
    description: "Investigating how AST parsing and regex rule matrices prevent prompt injection payloads from triggering unauthorized file operations.",
    date: "Late 2025",
    status: "EXPLORING",
    relatedProject: "Agentic AST Reviewer",
    category: "Systems",
    resourceNote: "OWASP Top 10 for LLM Applications",
    keyTakeaway: "Never trust an LLM to evaluate its own permissions; gate tool calls behind compiled code."
  },
  {
    id: "learn-fastapi-services",
    topic: "Asynchronous Microservice Architecture with FastAPI",
    description: "Building production-grade ASGI services with Pydantic validation, connection pools, and streaming endpoints.",
    date: "Fall 2024",
    status: "COMPLETED",
    category: "Architecture",
    resourceNote: "FastAPI official architecture patterns & async Python docs",
    keyTakeaway: "Async Python shines for I/O bound workloads like proxying LLM tokens and database queries."
  },
  {
    id: "learn-web-motion",
    topic: "Experimental Web Interaction & Canvas 2D Physics",
    description: "Testing frame-rate-independent physics loops and mathematical harmonic curves for tactile web interactions.",
    date: "Spring 2026",
    status: "EXPLORING",
    category: "Frontend",
    resourceNote: "Studying interactive computational graphics",
    keyTakeaway: "Subtle, physics-governed deceleration feels organic, while linear easing feels robotic."
  }
];
