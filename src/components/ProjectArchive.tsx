import React, { useState } from "react";
import { ProjectData } from "../data/projects";
import { ArrowUpRight, Search, LayoutGrid, ListFilter, SlidersHorizontal } from "lucide-react";
import { filterProjects } from "../utils/portfolioLogic";

interface ProjectArchiveProps {
  projects: ProjectData[];
  onSelectProject: (project: ProjectData) => void;
}

export const ProjectArchive: React.FC<ProjectArchiveProps> = ({
  projects,
  onSelectProject
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"exhibition" | "index">("exhibition");

  const categories = [
    { id: "all", label: "All Works" },
    { id: "artificial intelligence", label: "Artificial Intelligence" },
    { id: "systems", label: "Systems & Agents" },
    { id: "full-stack", label: "Full-Stack Web" }
  ];

  const filteredProjects = filterProjects(projects, selectedCategory, searchQuery);

  return (
    <section id="projects" className="py-20 px-6 sm:px-8 max-w-7xl mx-auto border-b border-white/5">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <span>CURATED INDEX</span>
            <span aria-hidden="true">·</span>
            <span>PROJECT ARCHIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            Selected Engineering Works
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-xl">
            A curated collection of software systems, AI experiments, and full-stack platforms exploring local inference and robust architecture.
          </p>
        </div>

        {/* View Mode Toggle Controls */}
        <div className="flex items-center gap-2 bg-zinc-900/60 p-1 rounded-lg border border-white/10 self-start md:self-auto">
          <button
            onClick={() => setViewMode("exhibition")}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1.5 ${
              viewMode === "exhibition"
                ? "bg-white text-zinc-950 font-semibold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Exhibition</span>
          </button>
          <button
            onClick={() => setViewMode("index")}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1.5 ${
              viewMode === "index"
                ? "bg-white text-zinc-950 font-semibold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Catalog Index</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        {/* Category Tabs (Interactive Buttons permitted by Section 1.A) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-zinc-800 text-white border border-white/10"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or tech..."
            className="w-full bg-zinc-900/80 border border-white/10 rounded pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-zinc-400 focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      </div>

      {/* Projects Exhibition View (Media-First Cinematic Presentation) */}
      {viewMode === "exhibition" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer rounded-xl border border-white/10 bg-zinc-950/60 hover:border-white/30 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Project Image Container */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />

                {/* Top overlay metadata */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                    {project.year}
                  </span>
                  <span className="text-[var(--accent)] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Info Block */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono mb-1.5">
                    <span>{project.category}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-[var(--accent)] transition-colors">
                      {project.title}
                    </h3>
                    <div className="p-1 rounded-full text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 line-clamp-2 font-normal leading-relaxed">
                    {project.starterDescription}
                  </p>
                </div>

                {/* Tech Stack - Clean unboxed text with separators */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400 font-mono">
                  {project.technologies.slice(0, 5).map((tech, i) => (
                    <span key={tech} className="whitespace-nowrap">
                      {tech}
                      {i < Math.min(project.technologies.length, 5) - 1 && (
                        <span className="text-zinc-700 ml-2" aria-hidden="true">·</span>
                      )}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="text-zinc-400">+{project.technologies.length - 5} more</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Technical Catalog Index View (Dense editorial matrix) */
        <div className="border border-white/10 rounded-xl overflow-hidden bg-zinc-950/60 divide-y divide-white/5">
          <div className="hidden sm:grid grid-cols-12 px-6 py-3 bg-zinc-900/50 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            <span className="col-span-1">No.</span>
            <span className="col-span-4">Project Title</span>
            <span className="col-span-3">Category</span>
            <span className="col-span-2">Status</span>
            <span className="col-span-2 text-right">Year</span>
          </div>

          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="grid grid-cols-1 sm:grid-cols-12 px-6 py-4 items-center gap-2 sm:gap-4 hover:bg-zinc-900/40 cursor-pointer group transition-colors"
            >
              <span className="col-span-1 font-mono text-xs text-zinc-400 hidden sm:block">
                0{idx + 1}
              </span>
              <div className="col-span-4">
                <span className="text-sm font-bold text-white group-hover:text-[var(--accent)] font-display transition-colors">
                  {project.title}
                </span>
                <span className="block sm:hidden text-xs text-zinc-400 mt-0.5">
                  {project.category} · {project.year}
                </span>
              </div>
              <span className="col-span-3 text-xs text-zinc-400 hidden sm:block">
                {project.category}
              </span>
              <span className="col-span-2 text-xs font-mono text-zinc-300 hidden sm:block">
                {project.status}
              </span>
              <div className="col-span-2 text-right hidden sm:flex items-center justify-end gap-2 text-xs font-mono text-zinc-400">
                <span>{project.year}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-white transition-colors" />
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 border border-white/5 rounded-xl bg-zinc-950/40">
          <p className="text-sm text-zinc-400 font-mono">
            No projects matched your current search filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-3 text-xs text-[var(--accent)] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
};
