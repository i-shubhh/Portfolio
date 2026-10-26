import React from "react";
import { ProjectData } from "../data/projects";
import { ArrowUpRight, GitBranch } from "lucide-react";

interface WhatIHaveMadeSectionProps {
  projects: ProjectData[];
  onSelectProject: (project: ProjectData) => void;
}

export const WhatIHaveMadeSection: React.FC<WhatIHaveMadeSectionProps> = ({
  projects,
  onSelectProject
}) => {
  return (
    <section id="what-i-have-made" className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-b border-white/10">
      {/* Chapter Kicker */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-12">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-[0.25em]">
            ACT I · CATALOGUE OF WORKS
          </span>
        </div>
        <span className="font-mono text-xs text-zinc-400">
          04 SELECTED SYSTEMS
        </span>
      </div>

      <div className="mb-14">
        <h2 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight">
          What I Have Made
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-2xl font-light leading-relaxed">
          Self-contained software systems, local AI pipelines, and full-stack applications built from first principles.
        </p>
      </div>

      {/* Editorial Catalogue Rows (A24 Monograph Aesthetic) */}
      <div className="divide-y divide-white/10 border-y border-white/10">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="group py-10 sm:py-12 cursor-pointer transition-colors hover:bg-white/[0.015] grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start"
          >
            {/* Number & Year */}
            <div className="lg:col-span-2 flex lg:flex-col justify-between text-xs font-mono text-zinc-400">
              <span className="text-sm font-semibold text-white group-hover:text-zinc-200">
                0{idx + 1}
              </span>
              <span>{project.year}</span>
            </div>

            {/* Title & Core Overview */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-wider">
                <span>{project.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-zinc-300">{project.status}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display group-hover:translate-x-1 transition-transform duration-200">
                {project.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                {project.starterDescription}
              </p>

              {/* Technologies unboxed list */}
              <div className="pt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs text-zinc-400 font-mono">
                {project.technologies.slice(0, 5).map((tech, i) => (
                  <span key={tech}>
                    {tech}
                    {i < Math.min(project.technologies.length, 5) - 1 && (
                      <span className="text-zinc-700 ml-2" aria-hidden="true">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Thumbnail Preview & Action Button */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-between items-start lg:items-end gap-4">
              <div className="relative aspect-[16/9] w-full max-w-[280px] rounded-lg overflow-hidden border border-white/10 bg-zinc-900 shadow-md">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 group-hover:text-white transition-colors pt-2">
                <span>Read Engineering Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
