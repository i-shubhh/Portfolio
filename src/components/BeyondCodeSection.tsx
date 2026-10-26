import React from "react";
import { PERSONAL_INTERESTS_DATA } from "../data/personalInterests";
import { Film, Building, BookOpen, Compass } from "lucide-react";

export const BeyondCodeSection: React.FC = () => {
  return (
    <section id="beyond" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-white/5">
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
          <span>CREATIVE INFLUENCES & REFLECTIONS</span>
          <span aria-hidden="true">·</span>
          <span>HUMAN PERSPECTIVE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Beyond the Code
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-xl font-light">
          Cinematography, structural architecture, classic engineering literature, and analytical disciplines that shape how I build software.
        </p>
      </div>

      {/* Grid of Influences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PERSONAL_INTERESTS_DATA.map((item, idx) => (
          <div
            key={item.id}
            className="p-8 rounded-xl border border-white/10 bg-zinc-950/60 hover:border-white/20 transition-all flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span>0{idx + 1}</span>
                <span className="text-[var(--accent)] font-semibold">{item.category}</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 mt-4 leading-relaxed font-light">
                {item.reflection}
              </p>
            </div>

            {item.itemsOrFavorites && item.itemsOrFavorites.length > 0 && (
              <div className="pt-4 border-t border-white/5">
                <span className="text-xs font-mono text-zinc-400 block mb-2">
                  Noteworthy Influences & Touchstones:
                </span>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-zinc-300 font-mono">
                  {item.itemsOrFavorites.map((fav, i) => (
                    <span key={fav}>
                      {fav}
                      {i < item.itemsOrFavorites!.length - 1 && (
                        <span className="text-zinc-700 ml-2" aria-hidden="true">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
