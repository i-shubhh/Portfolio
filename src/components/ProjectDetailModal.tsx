import React, { useEffect } from "react";
import { ProjectData } from "../data/projects";
import { 
  X, 
  ExternalLink, 
  GitBranch, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  AlertTriangle,
  Lightbulb, 
  TrendingUp, 
  Cpu, 
  Layers
} from "lucide-react";

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onNavigateNext,
  onNavigatePrev
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigateNext();
      if (e.key === "ArrowLeft") onNavigatePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNavigateNext, onNavigatePrev]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex justify-center p-4 sm:p-6 lg:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="relative w-full max-w-5xl bg-[#0b0b0e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto">
        {/* Top Controls Bar */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-[#0b0b0e]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--accent)] uppercase font-semibold">
              ENGINEERING DOSSIER
            </span>
            <span className="text-zinc-600 hidden sm:inline" aria-hidden="true">/</span>
            <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigatePrev}
              title="Previous project (Left arrow)"
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={onNavigateNext}
              title="Next project (Right arrow)"
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="w-[1px] h-4 bg-white/10 mx-1" />
            <button
              onClick={onClose}
              title="Close (Esc)"
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-10 space-y-10">
          {/* Header Block */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
              <span>{project.year}</span>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[var(--accent)]">{project.status}</span>
            </div>

            <h1 id="project-modal-title" className="text-3xl sm:text-5xl font-black text-white font-display">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-3xl">
              {project.tagline}
            </p>

            {/* Links and Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-zinc-950 font-semibold text-xs rounded hover:bg-[var(--accent)] transition-colors font-display"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>View GitHub Repository</span>
              </a>

              {project.demoUrl && project.demoUrl !== "#" && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-zinc-300 hover:text-white text-xs border border-white/10 hover:border-white/20 rounded transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Project Link</span>
                </a>
              )}
            </div>
          </div>

          {/* Hero Visual / Demonstration */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-zinc-900 aspect-[16/9] max-h-[440px]">
            <img
              src={project.coverImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Visual Artifact & Interface Architecture</span>
              <span>SRM University–AP</span>
            </div>
          </div>

          {/* 2-Column Overview: Problem & Motivation vs My Role & Tech */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/10">
            <div className="space-y-4">
              <div>
                <h2 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-1 font-semibold">
                  01. The Problem
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div>
                <h2 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-1 font-semibold">
                  02. Motivation & Objective
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {project.motivation}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-1 font-semibold">
                  03. My Role & Engineering Contribution
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {project.myRole}
                </p>
              </div>

              <div>
                <h2 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-1.5 font-semibold">
                  04. Technologies & Tools
                </h2>
                <div className="flex flex-wrap gap-x-2 gap-y-1.5 text-xs text-zinc-300 font-mono">
                  {project.technologies.map((t, i) => (
                    <span key={t}>
                      {t}
                      {i < project.technologies.length - 1 && (
                        <span className="text-zinc-600 ml-2" aria-hidden="true">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Architecture & Engineering Decisions */}
          <div className="space-y-6 pt-4 border-t border-white/10">
            <div>
              <h2 className="text-xs font-mono uppercase text-[var(--accent)] tracking-wider mb-1 font-semibold">
                05. Architecture & System Structure
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {project.architectureOverview}
              </p>
            </div>

            {/* Technical Decisions Table */}
            {project.technicalDecisions && project.technicalDecisions.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white font-display">
                  Important Technical Decisions & Rationales
                </h3>
                <div className="divide-y divide-white/5 border border-white/10 rounded-lg overflow-hidden bg-zinc-950/40">
                  {project.technicalDecisions.map((dec, i) => (
                    <div key={i} className="p-4 space-y-1">
                      <span className="text-xs font-bold text-zinc-200 font-mono">
                        {dec.decision}
                      </span>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {dec.rationale}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges & Tradeoffs */}
            {project.challengesAndTradeoffs && project.challengesAndTradeoffs.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white font-display">
                  Challenges & Architectural Trade-offs
                </h3>
                <div className="divide-y divide-white/5 border border-white/10 rounded-lg overflow-hidden bg-zinc-950/40">
                  {project.challengesAndTradeoffs.map((item, i) => (
                    <div key={i} className="p-4 space-y-1">
                      <span className="text-xs font-bold text-amber-200/90 font-mono">
                        Challenge: {item.challenge}
                      </span>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Trade-off: {item.tradeoff}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* What I Learned & Future Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/10">
            <div>
              <h2 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-3 font-semibold flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-[var(--accent)]" />
                What I Learned
              </h2>
              <ul className="space-y-2 text-xs text-zinc-300 list-disc list-inside">
                {project.whatILearned.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-3 font-semibold flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[var(--accent)]" />
                Future Improvements
              </h2>
              <ul className="space-y-2 text-xs text-zinc-300 list-disc list-inside">
                {project.futureImprovements.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-zinc-950 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-white font-mono"
          >
            ← Return to Archive
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigatePrev}
              className="text-xs font-mono text-zinc-400 hover:text-white"
            >
              Previous
            </button>
            <span className="text-zinc-700" aria-hidden="true">·</span>
            <button
              onClick={onNavigateNext}
              className="text-xs font-mono text-[var(--accent)] hover:underline"
            >
              Next Project →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
