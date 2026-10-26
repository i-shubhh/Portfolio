import React from "react";
import { JOURNEY_DATA, JourneyMilestone } from "../data/journey";
import { ArrowUpRight, Calendar, Compass, Milestone, GraduationCap } from "lucide-react";

export const JourneySection: React.FC = () => {
  return (
    <section id="journey" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-white/5">
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
          <span>CHRONOLOGY & MILESTONES</span>
          <span aria-hidden="true">·</span>
          <span>EVOLUTION OVER TIME</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Journey & Milestones
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-xl font-light">
          A verified timeline tracing academic foundations at SRM University–AP, exploratory software projects, and future engineering milestones.
        </p>
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l border-white/10 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12">
        {JOURNEY_DATA.map((item, idx) => (
          <div key={item.id} className="relative group">
            {/* Timeline Node Point */}
            <div 
              className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-white/30 group-hover:border-[var(--accent)] transition-colors"
              aria-hidden="true" 
            />

            <div className="p-6 rounded-xl border border-white/10 bg-zinc-950/60 hover:border-white/20 transition-all space-y-3">
              {/* Timeline Header Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-[var(--accent)]">
                  <span>{item.period}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-zinc-400 uppercase">{item.category}</span>
                </div>
                <span className="text-zinc-300 font-semibold">{item.year}</span>
              </div>

              <h3 className="text-xl font-bold text-white font-display">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                {item.description}
              </p>

              {item.impact && (
                <div className="pt-2 text-xs text-zinc-400">
                  <span className="font-mono text-zinc-400 uppercase text-[10px] block mb-0.5">
                    Impact & Takeaway
                  </span>
                  <p className="text-zinc-300 italic">{item.impact}</p>
                </div>
              )}

              {/* Associated Skills */}
              <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400 font-mono">
                {item.keySkills.map((skill, i) => (
                  <span key={skill}>
                    {skill}
                    {i < item.keySkills.length - 1 && (
                      <span className="text-zinc-700 ml-2" aria-hidden="true">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
