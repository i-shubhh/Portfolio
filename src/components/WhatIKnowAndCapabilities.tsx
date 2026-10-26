import React from "react";

export const WhatIKnowAndCapabilities: React.FC = () => {
  const capabilities = [
    {
      number: "01",
      title: "Self-Hosted & Offline Model Topologies",
      summary: "Deploying quantized open-weight LLMs (Llama 3, Mistral, Qwen) on local workstation hardware via AWQ and GGUF runtimes with zero external cloud egress.",
      techFocus: "Ollama · vLLM · AWQ / GGUF · Memory Bandwidth Optimization"
    },
    {
      number: "02",
      title: "Deterministic Security & Policy Guardrails",
      summary: "Gating agentic tool calls behind compiled code, AST visitors, and regex rule engines rather than trusting probabilistic model self-moderation.",
      techFocus: "Python AST · PII Scrubbers · Deterministic RBAC · Execution Sandboxes"
    },
    {
      number: "03",
      title: "Layout-Aware Document Intelligence & RAG",
      summary: "Moving beyond naive character chunking to preserve table geometry and technical manual structure, using hybrid BM25 + dense vector ranking.",
      techFocus: "Reciprocal Rank Fusion · Vector DBs · Semantic Chunking · Cross-Encoders"
    },
    {
      number: "04",
      title: "Full-Stack Reactive Systems Architecture",
      summary: "Connecting reactive client architectures in React and TypeScript with high-performance async backends in FastAPI, Node.js, and PostgreSQL.",
      techFocus: "React 19 · FastAPI · PostgreSQL · WebSockets · PWA Architecture"
    }
  ];

  const knowledgeAreas = [
    {
      category: "PROGRAMMING LANGUAGES",
      items: [
        { name: "Python", notes: "Primary language for local AI pipelines, FastAPI backends, AST parsers, and automation scripts" },
        { name: "Java", notes: "Core OOP architecture, concurrency primitives, thread pooling, and academic foundations" },
        { name: "JavaScript / TypeScript", notes: "Modern ESNext, strict static contracts, reactive UI lifecycles, and client state" }
      ]
    },
    {
      category: "SYSTEMS, TOOLS & INFRASTRUCTURE",
      items: [
        { name: "Docker & Linux", notes: "Containerized reproducible execution environments, shell scripting, and server operations" },
        { name: "Ollama & Local Runtimes", notes: "Quantized foundation model execution and local OpenAI-compatible endpoint hosting" },
        { name: "Git & Version Control", notes: "Branching workflows, interactive rebase, and collaborative repository hygiene" },
        { name: "PostgreSQL & Vector DBs", notes: "Relational data modeling, ACID transactions, and dense vector similarity indexing" }
      ]
    },
    {
      category: "COMPUTER SCIENCE FUNDAMENTALS",
      items: [
        { name: "Data Structures & Algorithms", notes: "Graph traversals, asymptotic complexity analysis, and efficient search indexes" },
        { name: "Concurrency & Memory Models", notes: "Executor service pools, synchronized shared memory boundaries, and race condition prevention" }
      ]
    }
  ];

  return (
    <>
      {/* 02. WHAT I KNOW */}
      <section id="what-i-know" className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-12">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-[0.25em]">
            ACT II · KNOWLEDGE MATRIX
          </span>
          <span className="font-mono text-xs text-zinc-400">
            TECHNICAL FOUNDATION
          </span>
        </div>

        <div className="mb-14">
          <h2 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight">
            What I Know
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-2xl font-light leading-relaxed">
            Core technologies, programming languages, and computational fundamentals verified through working software and academic coursework.
          </p>
        </div>

        <div className="space-y-12">
          {knowledgeAreas.map((area, idx) => (
            <div
              key={area.category}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 pb-10 border-b border-white/5 last:border-b-0"
            >
              <div className="lg:col-span-4">
                <span className="text-xs font-mono text-zinc-400 block mb-1">
                  0{idx + 1}
                </span>
                <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-300 font-semibold">
                  {area.category}
                </h3>
              </div>

              <div className="lg:col-span-8 space-y-4">
                {area.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-5 rounded-lg border border-white/5 bg-zinc-950/40 hover:border-white/15 transition-colors"
                  >
                    <h4 className="text-base font-bold text-white font-display">
                      {item.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed font-light">
                      {item.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03. WHAT ARE MY CAPABILITIES */}
      <section id="capabilities" className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-12">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-[0.25em]">
            ACT III · ARCHITECTURAL PROFILE
          </span>
          <span className="font-mono text-xs text-zinc-400">
            ENGINEERING STRENGTHS
          </span>
        </div>

        <div className="mb-14">
          <h2 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight">
            What Are My Capabilities
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-2xl font-light leading-relaxed">
            Specific engineering competencies I bring to production codebases, research labs, and technical collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.number}
              className="p-8 rounded-xl border border-white/10 bg-zinc-950/50 hover:border-white/20 transition-all flex flex-col justify-between space-y-6"
            >
              <div>
                <span className="text-xs font-mono text-zinc-400 block mb-2">
                  CAPABILITY {cap.number}
                </span>
                <h3 className="text-2xl font-bold text-white font-display">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-3 leading-relaxed font-light">
                  {cap.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 text-xs font-mono text-zinc-400">
                <span className="text-zinc-300 block mb-1">Key Disciplines:</span>
                <span>{cap.techFocus}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
