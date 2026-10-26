import { FilmFrameItem } from "../components/A24SpatialFilmFlow";

export const A24_FILM_FRAMES: FilmFrameItem[] = [
  {
    id: "mrpl-sovereign-workbench",
    number: "01",
    title: "MRPL Sovereign AI Workbench",
    subtitle: "Self-Hosted Industrial Multimodal AI",
    category: "Artificial Intelligence / Agents",
    year: "2025",
    imagePath: "/src/assets/images/mrpl_sovereign_workbench_1793023996555.jpg",
    description: "Self-hosted multimodal AI system for confidential industrial workflows, local model inference, document understanding, and deterministic policy guardrails.",
    tagline: "Air-gapped intelligence for confidential industrial environments.",
    tech: ["Python 3.11", "FastAPI", "Ollama", "Llama-3-8B AWQ", "Qdrant", "React 19"]
  },
  {
    id: "neuraldoc-semantic-rag",
    number: "02",
    title: "NeuralDoc Semantic RAG",
    subtitle: "Layout-Aware Document Intelligence",
    category: "Information Retrieval / AI",
    year: "2024–2025",
    imagePath: "/src/assets/images/project_neuraldoc_rag_1793023996788.jpg",
    description: "High-precision retrieval engine respecting document geometry, nested tables, and hierarchical semantic divisions using hybrid BM25 + dense vector ranking.",
    tagline: "Bridging the gap between messy technical PDFs and LLM context windows.",
    tech: ["Python", "FastAPI", "Hugging Face", "ChromaDB", "TypeScript"]
  },
  {
    id: "agentic-ast-reviewer",
    number: "03",
    title: "Agentic AST Code Auditor",
    subtitle: "Multi-Agent Security Traversal",
    category: "Systems / Security Tools",
    year: "2024",
    imagePath: "/src/assets/images/project_agentic_code_1793023997701.jpg",
    description: "Multi-agent static analysis combining Python AST syntax tree scanning with targeted LLM policy auditors to isolate injection vectors deterministically.",
    tagline: "Deterministic syntax gates meeting contextual reasoning.",
    tech: ["Python 3.11", "AST Module", "LangChain", "Docker", "Git Hooks"]
  },
  {
    id: "srm-campus-compass",
    number: "04",
    title: "SRM Campus Compass",
    subtitle: "Spatial Graph Navigator & PWA",
    category: "Systems / Full-Stack",
    year: "2024",
    imagePath: "/src/assets/images/lab_creative_experiment_1793023996801.jpg",
    description: "Offline-first campus navigation companion solving multi-floor routing and timetable alerts across university blocks for SRM University–AP students.",
    tagline: "Lightweight client-side Dijkstra graph routing with zero cellular lag.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "PWA"]
  },
  {
    id: "researcher-portrait",
    number: "05",
    title: "Shubham Jha · In the Lab",
    subtitle: "Student Researcher & Builder",
    category: "Editorial / Identity",
    year: "SRM–AP '27",
    imagePath: "/src/assets/images/shubham_portrait_editorial_1793023997644.jpg",
    description: "CSE + AI/ML student at SRM University–AP exploring the intersection of systems engineering, local open-weight inference, and creative interaction.",
    tagline: "Curious by nature. Building through code.",
    tech: ["SRM University–AP", "AI/ML Specialization", "Class of 2027", "Amaravati, India"]
  }
];
