import React, { useState } from "react";
import { LEARNING_DATA, LearningEntry, LearningStatus } from "../data/learning";
import { filterLearningEntries } from "../utils/portfolioLogic";
import { BookOpen, Sparkles, Filter, CheckCircle2, Clock, Play } from "lucide-react";

export const LearningSection: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<LearningStatus | "ALL">("ALL");

  const statusOptions: (LearningStatus | "ALL")[] = [
    "ALL",
    "LEARNING",
    "EXPERIMENTING",
    "BUILDING",
    "EXPLORING",
    "COMPLETED"
  ];

  const filteredEntries = filterLearningEntries(LEARNING_DATA, selectedStatus);

  return (
    <section id="learning" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-white/5">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <span>RESEARCH NOTEBOOK</span>
            <span aria-hidden="true">·</span>
            <span>CONTINUOUS LOG</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            The Learning Archive
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-xl font-light">
            An evolving technical notebook documenting active studies, research papers, system benchmarks, and engineering fundamentals.
          </p>
        </div>

        {/* Filter by Status Buttons (Functional Segmented Tab Buttons) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none self-start md:self-auto bg-zinc-950/60 p-1 rounded-lg border border-white/10">
          {statusOptions.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                selectedStatus === st
                  ? "bg-white text-zinc-950 font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Research Notebook Entries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntries.map((entry, idx) => (
          <div
            key={entry.id}
            className="p-6 rounded-xl border border-white/10 bg-zinc-950/70 hover:border-white/20 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              {/* Entry Header: Category and Status (Clean unboxed text) */}
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span>{entry.category}</span>
                <span
                  className={`font-semibold ${
                    entry.status === "COMPLETED"
                      ? "text-emerald-400"
                      : entry.status === "EXPERIMENTING" || entry.status === "BUILDING"
                      ? "text-[var(--accent)]"
                      : "text-zinc-300"
                  }`}
                >
                  {entry.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-display group-hover:text-[var(--accent)] transition-colors leading-snug">
                {entry.topic}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed font-light">
                {entry.description}
              </p>
            </div>

            {/* Key Takeaway & Resource Notes */}
            <div className="pt-4 border-t border-white/5 space-y-2 text-xs">
              {entry.keyTakeaway && (
                <div className="bg-zinc-900/60 p-2.5 rounded border border-white/5 text-zinc-300">
                  <span className="font-mono text-[10px] uppercase text-zinc-400 block mb-0.5">
                    Core Insight
                  </span>
                  <span className="italic text-zinc-200">
                    "{entry.keyTakeaway}"
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
                <span>{entry.date}</span>
                {entry.relatedProject && (
                  <span className="text-zinc-300 line-clamp-1 max-w-[140px]">
                    Ref: {entry.relatedProject}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
