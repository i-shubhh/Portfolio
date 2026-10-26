import React, { useState } from "react";
import { ProfileData } from "../data/profile";
import { GraduationCap, MapPin, BookOpen, Sparkles, ArrowRight } from "lucide-react";

interface AboutSectionProps {
  profile: ProfileData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const [activeSubsectionId, setActiveSubsectionId] = useState<string>("background");

  const activeSubsection =
    profile.subsections.find((s) => s.id === activeSubsectionId) ||
    profile.subsections[0];

  return (
    <section id="about" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-white/5">
      {/* Editorial Kicker */}
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
        <span>CURATOR PROFILE</span>
        <span aria-hidden="true">·</span>
        <span>THE PERSON BEHIND THE CODE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Portrait, Identity Details & Education */}
        <div className="lg:col-span-5 space-y-8">
          <div className="relative group">
            {/* High-Contrast Editorial Portrait */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
              <img
                src={profile.avatarImage}
                alt="Shubham Jha — Computer Science and AI/ML Student at SRM University–AP"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-95 group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 text-left">
                <span className="text-xs font-mono text-[var(--accent)] block mb-1">
                  STUDENT RESEARCHER & ENGINEER
                </span>
                <h3 className="text-2xl font-black text-white font-display">
                  {profile.name}
                </h3>
                <p className="text-xs text-zinc-300 font-mono mt-0.5">
                  {profile.educationLabel}
                </p>
              </div>
            </div>

            {/* Subtle hairline frame accent */}
            <div 
              aria-hidden="true"
              className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-white/15 pointer-events-none hidden sm:block" 
            />
          </div>

          {/* Education & Academic Spec Sheet - Clean unboxed text with typographic separators */}
          <div className="p-6 rounded-xl border border-white/10 bg-zinc-950/60 space-y-4">
            <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold">
              Academic Affiliation
            </h4>

            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-start justify-between gap-4">
                <span className="text-zinc-400">Institution</span>
                <span className="text-white font-medium text-right">{profile.university}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-zinc-400">Degree</span>
                <span className="text-white font-medium text-right">{profile.degree}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-zinc-400">Specialization</span>
                <span className="text-[var(--accent)] font-medium text-right">{profile.specialization}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-zinc-400">Graduation</span>
                <span className="text-zinc-300 font-mono text-right">{profile.expectedGraduation}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-zinc-400">Location</span>
                <span className="text-zinc-300 text-right">{profile.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Biography & Deep Reflections */}
        <div className="lg:col-span-7 space-y-10">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
              Bridging engineering rigor with creative possibilities.
            </h2>

            {/* Core Editable Biography Prose */}
            <div className="mt-8 space-y-5 text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
              {profile.bioParagraphs.map((para, i) => (
                <p key={i} className="text-zinc-300">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Interactive Thematic Subsections (Tabs) */}
          <div className="pt-6 border-t border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold">
                Curiosity & Philosophy Subsections
              </span>
              <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                Select topic to explore
              </span>
            </div>

            {/* Subsection Tab Buttons */}
            <div className="flex flex-wrap gap-2">
              {profile.subsections.map((sub) => {
                const isActive = sub.id === activeSubsectionId;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubsectionId(sub.id)}
                    className={`px-3.5 py-2 text-xs font-medium rounded transition-colors ${
                      isActive
                        ? "bg-white text-zinc-950 font-semibold shadow-sm"
                        : "bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5 hover:border-white/15"
                    }`}
                  >
                    {sub.title}
                  </button>
                );
              })}
            </div>

            {/* Active Subsection Display Box */}
            {activeSubsection && (
              <div className="p-6 rounded-xl border border-white/10 bg-zinc-950/60 space-y-2">
                <h4 className="text-base font-bold text-white font-display">
                  {activeSubsection.title}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {activeSubsection.content}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
