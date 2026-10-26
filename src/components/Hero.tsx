import React from "react";
import { ArrowDown, Sparkles, Terminal, BookOpen, Layers } from "lucide-react";
import { ProfileData } from "../data/profile";

interface HeroProps {
  profile: ProfileData;
  onExploreClick: () => void;
  onOpenSettings: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  onExploreClick,
  onOpenSettings
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-8 max-w-7xl mx-auto border-b border-white/5"
    >
      {/* Subtle background glow effect */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent)] opacity-[0.035] blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      {/* Top Editorial Metadata Kicker */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400 uppercase tracking-widest pt-4">
        <div className="flex items-center gap-2">
          <span>{profile.educationLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{profile.degree}</span>
        </div>

        {/* Editable Status Indicator - Clean unboxed text with subtle separator */}
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span className="text-zinc-300 normal-case font-sans text-xs">
            {profile.status}
          </span>
          <button
            onClick={onOpenSettings}
            title="Edit Status"
            className="text-[10px] text-zinc-400 hover:text-[var(--accent)] underline ml-1"
          >
            [edit]
          </button>
        </div>
      </div>

      {/* Main Split: Monumental Typography & Visual Anchor */}
      <div className="my-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Monolithic Editorial Name & Statement */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-mono font-medium">
              Digital Archive & Engineering Log
            </span>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white font-display leading-[0.95]">
              {profile.name}
            </h1>
          </div>

          <p className="text-xl sm:text-2xl lg:text-3xl font-light text-zinc-200 font-display leading-snug">
            “{profile.headline}”
          </p>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl font-normal">
            {profile.subIntro}
          </p>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="group inline-flex items-center gap-3 px-6 py-3.5 bg-white text-zinc-950 hover:bg-[var(--accent)] rounded font-semibold text-sm transition-all duration-200 font-display shadow-md"
            >
              <span>Explore Selected Works</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <a
              href="#featured"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 rounded transition-colors font-display"
            >
              <span>Featured: Sovereign AI</span>
            </a>
          </div>
        </div>

        {/* Right Column: Editorial Artwork Composition */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-lg overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl group">
            {/* Artwork Image with Fallback */}
            <img
              src="/src/assets/images/mrpl_sovereign_workbench_1793023996555.jpg"
              alt="MRPL Sovereign AI Workbench Interface"
              referrerPolicy="no-referrer"
              className="w-full h-[320px] sm:h-[380px] object-cover object-center filter contrast-[1.05] brightness-[0.95] group-hover:scale-[1.02] transition-transform duration-700"
            />
            {/* Measured contrast scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

            {/* Overlay metadata card */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] mb-1">
                <span>ARCHIVE ARTIFACT 01</span>
                <span aria-hidden="true">/</span>
                <span>SYSTEM ARCHITECTURE</span>
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                MRPL Sovereign AI Workbench
              </h3>
              <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                Self-hosted multimodal AI system for confidential industrial workflows, local inference & deterministic policy guardrails.
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/10">
                <span>SRM University–AP</span>
                <span className="text-zinc-300">Class of 2027</span>
              </div>
            </div>
          </div>

          {/* Subtle architectural annotation lines */}
          <div 
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-white/15 pointer-events-none hidden sm:block" 
          />
        </div>
      </div>

      {/* Hero Bottom Strip: Technical Disciplines & Quick Access */}
      <div className="pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-zinc-400">
        <div>
          <span className="block font-mono text-zinc-400 text-[11px] uppercase">Specialization</span>
          <span className="text-zinc-200 font-medium">Artificial Intelligence & ML</span>
        </div>
        <div>
          <span className="block font-mono text-zinc-400 text-[11px] uppercase">Institution</span>
          <span className="text-zinc-200 font-medium">SRM University–AP</span>
        </div>
        <div>
          <span className="block font-mono text-zinc-400 text-[11px] uppercase">Core Tech</span>
          <span className="text-zinc-200 font-medium">Python · Java · React · Ollama</span>
        </div>
        <div>
          <span className="block font-mono text-zinc-400 text-[11px] uppercase">Curator Focus</span>
          <span className="text-zinc-200 font-medium">Agentic Systems & Local RAG</span>
        </div>
      </div>
    </section>
  );
};
