import React, { useState, useEffect } from "react";
import { Search, X, ArrowRight, CornerDownLeft } from "lucide-react";
import { PROJECTS_DATA, ProjectData } from "../data/projects";
import { INTERESTS_DATA } from "../data/interests";
import { LEARNING_DATA } from "../data/learning";
import { searchArchive, SearchResultItem } from "../utils/portfolioLogic";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectData) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject
}) => {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = searchArchive(query, PROJECTS_DATA, INTERESTS_DATA, LEARNING_DATA);

  const handleSelectResult = (item: SearchResultItem) => {
    onClose();
    if (item.type === "project") {
      const proj = PROJECTS_DATA.find((p) => p.id === item.id);
      if (proj) {
        onSelectProject(proj);
        return;
      }
    }
    const targetElement = document.getElementById(
      item.type === "project" ? "projects" : item.type === "interest" ? "interests" : "learning"
    );
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-28"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-2xl bg-[#0c0c10] border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-fadeIn">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, AI models, skills, interests (e.g. Ollama, RAG, Java)..."
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[360px] overflow-y-auto p-2">
          {query.trim().length < 2 ? (
            <div className="p-6 text-center text-xs text-zinc-500 font-mono">
              Type at least 2 characters to search across projects, research logs, and technical interests.
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center text-xs text-zinc-500 font-mono">
              No archive artifacts found matching "{query}".
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((res) => (
                <button
                  key={`${res.type}-${res.id}`}
                  onClick={() => handleSelectResult(res)}
                  className="w-full p-3 rounded-lg hover:bg-zinc-900/80 text-left flex items-center justify-between group transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white group-hover:text-[var(--accent)] font-display transition-colors">
                        {res.title}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase">
                        [{res.type}]
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1">
                      {res.subtitle} · {res.matchedField}
                    </p>
                  </div>
                  <CornerDownLeft className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white shrink-0 ml-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-zinc-950 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>[Esc] to close</span>
            <span>[Enter] to open</span>
          </div>
          <span>Archive Quick Finder</span>
        </div>
      </div>
    </div>
  );
};
