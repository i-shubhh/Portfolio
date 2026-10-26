/**
 * The Experiments Lab
 * Smaller prototypes, interactive demonstrations, and creative coding explorations.
 */

export interface ExperimentItem {
  id: string;
  title: string;
  type: "interactive-canvas" | "ai-prototype" | "algorithm" | "ui-micro";
  badgeLabel: string;
  date: string;
  description: string;
  status: "Live Demo" | "Prototype" | "Work in Progress";
  technologies: string[];
  interactiveDemoId?: string; // used for embedded interactive preview
  githubUrl?: string;
  notes?: string;
}

export const EXPERIMENTS_DATA: ExperimentItem[] = [
  {
    id: "harmonic-wave-canvas",
    title: "Algorithmic Lissajous & Wave Interference",
    type: "interactive-canvas",
    badgeLabel: "Creative Canvas",
    date: "2025",
    description: "Real-time HTML5 2D canvas simulation exploring mathematical harmonic resonance, parametric Lissajous curves, and frequency modulation with customizable decay and velocity.",
    status: "Live Demo",
    technologies: ["Canvas API", "Trigonometric Physics", "RequestAnimationFrame", "JavaScript"],
    interactiveDemoId: "wave-canvas",
    notes: "Direct manipulation of wave frequency and damping ratios."
  },
  {
    id: "token-latency-simulator",
    title: "Local LLM Token Throughput & KV-Cache Simulator",
    type: "ai-prototype",
    badgeLabel: "AI Systems",
    date: "2025",
    description: "An interactive educational model explaining how batch size, context window length, and KV-cache allocation affect tokens-per-second latency on local workstation GPUs.",
    status: "Live Demo",
    technologies: ["TypeScript", "Computational Math", "Interactive UI"],
    interactiveDemoId: "token-simulator",
    notes: "Visualizes TTFT (Time to First Token) vs inter-token generation time."
  },
  {
    id: "ast-syntax-inspector",
    title: "Deterministic AST Parser & Risk Flag Visualizer",
    type: "algorithm",
    badgeLabel: "Developer Tools",
    date: "2024",
    description: "A lightweight browser demonstration showing how code snippets are tokenized into Abstract Syntax Tree nodes, highlighting high-risk function calls (e.g., eval, unsanitized exec) in real time.",
    status: "Live Demo",
    technologies: ["JavaScript Tokenizer", "Syntax Trees", "Heuristic Rules"],
    interactiveDemoId: "ast-inspector",
    notes: "Deterministic analysis without requiring remote compiler services."
  },
  {
    id: "java-concurrency-worker-pool",
    title: "Task Queue & Worker Thread Visualizer",
    type: "algorithm",
    badgeLabel: "Java Systems",
    date: "2024",
    description: "A visual simulation of Java's ThreadPoolExecutor: task submission queue, core thread pool, maximum thread overflow, and rejected execution policies.",
    status: "Live Demo",
    technologies: ["Concurrency Math", "State Machine", "Canvas/SVG"],
    interactiveDemoId: "worker-pool",
    notes: "Simulates fixed, cached, and scheduled thread pool behaviors."
  }
];
