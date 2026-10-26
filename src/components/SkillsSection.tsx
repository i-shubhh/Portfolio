import React from "react";
import { SKILLS_DATA, SkillCategory } from "../data/skills";

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-white/5">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
          <span>TECHNICAL CAPABILITIES</span>
          <span aria-hidden="true">·</span>
          <span>SYSTEMS & TOOLING</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Skills and Technologies
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-xl font-light">
          Organized by domain application. Real tools deployed in engineering experiments, systems programming, and academic coursework.
        </p>
      </div>

      {/* Categorized Skills Matrix */}
      <div className="space-y-12">
        {SKILLS_DATA.map((cat, idx) => (
          <div
            key={cat.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10 border-b border-white/5 last:border-b-0"
          >
            {/* Category Column */}
            <div className="lg:col-span-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span>0{idx + 1}</span>
                <span aria-hidden="true">/</span>
                <span className="text-[var(--accent)] font-semibold">{cat.categoryName}</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                {cat.categoryName}
              </h3>
              <p className="text-xs text-zinc-400 max-w-xs font-light">
                {cat.summary}
              </p>
            </div>

            {/* Skills List Column - Clean unboxed text with descriptive notes */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-4 rounded-lg bg-zinc-950/60 border border-white/5 hover:border-white/15 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-zinc-100 font-display">
                      {skill.name}
                    </span>
                    {skill.highlight && (
                      <span className="text-[10px] font-mono text-[var(--accent)]">
                        Core
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-light">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
