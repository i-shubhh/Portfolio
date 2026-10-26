/**
 * Skills and Technologies Directory
 * Organized into understated typographic categories.
 * No arbitrary percentages or progress bars.
 */

export interface SkillCategory {
  id: string;
  categoryName: string;
  summary: string;
  skills: {
    name: string;
    description: string;
    levelNotes?: string;
    highlight?: boolean;
  }[];
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: "programming",
    categoryName: "PROGRAMMING",
    summary: "Core languages used for systems, algorithmic problem solving, and application logic.",
    skills: [
      { name: "Java", description: "Object-oriented architecture, collections framework, multi-threading, academic coursework", highlight: true },
      { name: "Python", description: "Primary language for AI/ML pipelines, FastAPI backends, AST parsing, and automation scripts", highlight: true },
      { name: "JavaScript", description: "Modern ESNext, asynchronous runtime, DOM APIs, and interactive client logic", highlight: true },
      { name: "TypeScript", description: "Strict static typing, interfaces, type-safe API contracts, and robust tooling", highlight: true }
    ]
  },
  {
    id: "frontend",
    categoryName: "FRONTEND",
    summary: "Building accessible, high-performance, and responsive user interfaces.",
    skills: [
      { name: "React", description: "Hooks, component lifecycles, state modeling, and reactive client architecture", highlight: true },
      { name: "Next.js", description: "Modern hybrid client/server patterns, SSR, routing, and asset delivery" },
      { name: "HTML5", description: "Semantic markup, accessibility semantics, and clean document outlines" },
      { name: "CSS3 / Tailwind CSS", description: "CSS variables, layout math, fluid typography, responsive design, and design systems", highlight: true },
      { name: "Framer Motion", description: "Physics-based springs, layout transitions, and fluid micro-interactions" }
    ]
  },
  {
    id: "backend",
    categoryName: "BACKEND",
    summary: "Designing scalable async APIs, middleware pipelines, and structured services.",
    skills: [
      { name: "FastAPI", description: "High-performance Python ASGI backends, Pydantic data validation, and OpenAPI documentation", highlight: true },
      { name: "REST APIs", description: "Stateless architectural contracts, query parameters, error schemas, and streaming endpoints", highlight: true },
      { name: "Node.js / Express", description: "Event-driven asynchronous servers, middleware pipelines, and microservices" },
      { name: "PostgreSQL", description: "Relational modeling, indexing, foreign key constraints, and transactional consistency" }
    ]
  },
  {
    id: "ai-ml",
    categoryName: "AI AND ML",
    summary: "Foundation models, local runtime engines, and retrieval architectures.",
    skills: [
      { name: "Large Language Models", description: "Prompt engineering, tokenization mechanics, structured JSON outputs, and evaluation", highlight: true },
      { name: "Local Inference", description: "Quantized model execution via Ollama and vLLM without external cloud egress", highlight: true },
      { name: "Retrieval-Augmented Generation", description: "Hybrid lexical-dense search, semantic chunking, and source citation grounding", highlight: true },
      { name: "Agentic Workflows", description: "Stateful agent graphs, tool execution, multi-step critique, and guardrail policies", highlight: true },
      { name: "Multimodal AI", description: "Layout-aware document understanding, visual question answering, and OCR pipelines" }
    ]
  },
  {
    id: "tools",
    categoryName: "TOOLS AND INFRASTRUCTURE",
    summary: "Developer environments, version control, and containerization.",
    skills: [
      { name: "Git", description: "Branching strategies, interactive rebasing, merge conflict resolution, and commit hygiene", highlight: true },
      { name: "GitHub", description: "Code review workflows, issue tracking, and collaborative project repositories", highlight: true },
      { name: "Docker", description: "Containerizing Python/Node environments for reproducible execution", highlight: true },
      { name: "Ollama", description: "Local model serving, model manifest management, and REST API integration", highlight: true },
      { name: "Linux / Bash", description: "Shell scripting, process management, and Unix command-line utilities" }
    ]
  }
];
