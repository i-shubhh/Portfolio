import React from "react";
import { ArrowRight, CheckCircle2, MapPin, Calendar, Sparkles } from "lucide-react";

export const WhatIAmDoingAndOpenTo: React.FC = () => {
  const currentActivities = [
    {
      period: "Present Focus",
      title: "Self-Hosted Multimodal AI Workbench (MRPL)",
      description: "Architecting an air-gap-compatible AI workbench that combines quantized local inference with layout-aware document chunking and deterministic policy enforcement for confidential industrial facilities."
    },
    {
      period: "Academic Horizon",
      title: "B.Tech in CSE (Specialization in AI & ML)",
      description: "Undergraduate student at SRM University–AP (Class of 2027). Deepening algorithmic foundations, discrete mathematics, database management, and object-oriented systems in Java."
    },
    {
      period: "Systems Study",
      title: "Strengthening Concurrency & Low-Latency Runtimes",
      description: "Investigating thread pool architectures, asynchronous ASGI request dispatchers, and memory bandwidth bottlenecks in local autoregressive LLM decoding."
    }
  ];

  const openOpportunities = [
    {
      title: "Summer 2026 Engineering Internships",
      type: "Primary Goal",
      details: "Seeking Software Engineering or AI/ML Engineering internship roles starting Summer 2026 where I can contribute to production systems, backend infrastructure, or applied AI pipelines."
    },
    {
      title: "Applied AI Systems Research Collaborations",
      type: "Academic & Labs",
      details: "Interested in collaborating with research groups and labs working on local model quantization, speculative decoding, agentic verification guardrails, or dense retrieval."
    },
    {
      title: "Open Source Systems & High-Velocity Building",
      type: "Community",
      details: "Always open to collaborating on well-engineered open-source developer tools, AST parsers, and creative web experiments."
    }
  ];

  return (
    <>
      {/* 04. WHAT I AM DOING */}
      <section id="what-i-am-doing" className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-12">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-[0.25em]">
            ACT IV · CURRENT VECTOR
          </span>
          <span className="font-mono text-xs text-zinc-400">
            ACTIVE PURSUITS
          </span>
        </div>

        <div className="mb-14">
          <h2 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight">
            What I Am Doing
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-2xl font-light leading-relaxed">
            The ongoing research initiatives, coursework, and engineering experiments occupying my days at SRM University–AP.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentActivities.map((act) => (
            <div
              key={act.title}
              className="p-6 sm:p-8 rounded-xl border border-white/10 bg-zinc-950/50 hover:border-white/20 transition-all flex flex-col justify-between space-y-6"
            >
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-2">
                  {act.period}
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  {act.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-3 leading-relaxed font-light">
                  {act.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Active Engagement</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05. WHERE AM I OPEN TO */}
      <section id="open-to" className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-12">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-[0.25em]">
            ACT V · FORWARD HORIZONS
          </span>
          <span className="font-mono text-xs text-zinc-400">
            AVAILABILITY MATRIX
          </span>
        </div>

        <div className="mb-14">
          <h2 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight">
            Where Am I Open To
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-2xl font-light leading-relaxed">
            Roles, collaborations, and geographical boundaries where I am ready to build and deliver impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Opportunities Cards */}
          <div className="lg:col-span-8 space-y-4">
            {openOpportunities.map((opp) => (
              <div
                key={opp.title}
                className="p-6 rounded-xl border border-white/10 bg-zinc-950/60 hover:border-white/20 transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="text-white font-semibold uppercase tracking-wider">{opp.type}</span>
                  <span>Summer 2026</span>
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  {opp.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  {opp.details}
                </p>
              </div>
            ))}
          </div>

          {/* Location & Contact Summary Spec Card */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-xl border border-white/10 bg-zinc-950/90 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
              Deployment Parameters
            </h3>

            <div className="space-y-4 text-xs text-zinc-300">
              <div>
                <span className="font-mono text-zinc-400 block text-[11px] mb-0.5">Locations</span>
                <span className="text-white font-medium text-sm">Bengaluru · Hyderabad · Remote · Global</span>
              </div>

              <div>
                <span className="font-mono text-zinc-400 block text-[11px] mb-0.5">Availability Window</span>
                <span className="text-white font-medium text-sm">Summer 2026 (May – August)</span>
              </div>

              <div>
                <span className="font-mono text-zinc-400 block text-[11px] mb-0.5">Preferred Domains</span>
                <span className="text-white font-medium text-sm">Systems, AI Infrastructure, Local Models, Full-Stack</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <a
                href="#contact"
                className="w-full py-3 bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs rounded transition-colors font-display text-center block"
              >
                Start a Conversation
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
