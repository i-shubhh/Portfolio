import React, { useState } from "react";
import { INTERESTS_DATA, InterestItem } from "../data/interests";
import { Sparkles, ArrowRight, Code, Cpu, Terminal, Compass } from "lucide-react";

interface InterestsSectionProps {
  onSelectProjectById?: (projectId: string) => void;
}

export const InterestsSection: React.FC<InterestsSectionProps> = ({
  onSelectProjectById
}) => {
  const [selectedInterestId, setSelectedInterestId] = useState<string>("agentic-ai");

  const selectedInterest =
    INTERESTS_DATA.find((item) => item.id === selectedInterestId) ||
    INTERESTS_DATA[0];

  return (
    <section id="interests" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-white/5">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
          <span>INTELLECTUAL CURIOSITY MAP</span>
          <span aria-hidden="true">·</span>
          <span>RESEARCH & PRACTICE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Visual Map of Curiosity
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl font-light">
          An interactive index of concepts, architectures, and domains I actively explore across artificial intelligence, systems, and creative engineering.
        </p>
      </div>

      {/* Grid: Interactive Interest Selection Tiles on Left, Deep Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Tiles */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {INTERESTS_DATA.map((item, idx) => {
            const isSelected = item.id === selectedInterestId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedInterestId(item.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[130px] ${
                  isSelected
                    ? "bg-zinc-900 border-[var(--accent)] shadow-lg shadow-black/40"
                    : "bg-zinc-950/60 border-white/5 hover:border-white/20 hover:bg-zinc-900/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                    <span>0{idx + 1}</span>
                    <span className="text-[11px] text-[var(--accent)] uppercase">
                      {item.domainLabel}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white font-display leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="line-clamp-1 text-[11px] text-zinc-400">
                    {item.relatedTechnologies.slice(0, 2).join(", ")}
                  </span>
                  <span className={`text-[10px] ${isSelected ? "text-[var(--accent)] font-semibold" : "text-zinc-600"}`}>
                    {isSelected ? "Active" : "Inspect →"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Deep Dossier for Selected Interest */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="p-6 sm:p-8 rounded-xl border border-white/10 bg-zinc-950/90 shadow-2xl space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-[var(--accent)] font-semibold tracking-wider">
                  CURIOSITY DOSSIER
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {selectedInterest.domainLabel}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                {selectedInterest.title}
              </h3>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-2 font-semibold">
                Overview & Motivation
              </h4>
              <p className="text-sm text-zinc-200 leading-relaxed font-light">
                {selectedInterest.summary}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-2 font-semibold">
                Deep Dive Reflection
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light bg-zinc-900/60 p-4 rounded-lg border border-white/5">
                {selectedInterest.details}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-2 font-semibold">
                Associated Technologies & Patterns
              </h4>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-zinc-300 font-mono">
                {selectedInterest.relatedTechnologies.map((tech, i) => (
                  <span key={tech}>
                    {tech}
                    {i < selectedInterest.relatedTechnologies.length - 1 && (
                      <span className="text-zinc-700 ml-2" aria-hidden="true">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {selectedInterest.relatedProjectIds && selectedInterest.relatedProjectIds.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-mono text-zinc-400 block mb-2">
                  Connected Portfolio Projects:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedInterest.relatedProjectIds.map((pId) => (
                    <a
                      key={pId}
                      href={`#${pId === "mrpl-sovereign-workbench" ? "featured" : "projects"}`}
                      className="inline-flex items-center gap-1.5 text-xs text-white bg-zinc-900 hover:bg-[var(--accent)] hover:text-zinc-950 px-2.5 py-1 rounded transition-colors font-mono"
                    >
                      <span>{pId}</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
