import React, { useState } from "react";
import { X, Check, Sliders, Palette, RefreshCw, FileCode, CheckCircle } from "lucide-react";

interface CuratorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentAccent: string;
  onSelectAccent: (accent: "amber" | "cyan" | "emerald" | "crimson") => void;
  currentStatus: string;
  onUpdateStatus: (newStatus: string) => void;
}

export const CuratorDrawer: React.FC<CuratorDrawerProps> = ({
  isOpen,
  onClose,
  currentAccent,
  onSelectAccent,
  currentStatus,
  onUpdateStatus
}) => {
  const [editedStatus, setEditedStatus] = useState<string>(currentStatus);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const accents = [
    { id: "amber", label: "Amber Gold (Default)", hex: "#e5a93b" },
    { id: "cyan", label: "Signal Cyan", hex: "#38bdf8" },
    { id: "emerald", label: "Sage Emerald", hex: "#10b981" },
    { id: "crimson", label: "Cinnabar Crimson", hex: "#f43f5e" }
  ] as const;

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStatus(editedStatus);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-[#0c0c10] border-l border-white/10 h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between shadow-2xl animate-fadeIn">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[var(--accent)]" />
              <h2 className="text-base font-bold text-white font-display">
                Archive Curator & Live Settings
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section 1: Accent Color Customizer */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider block font-semibold">
              Accent Palette Selection
            </span>
            <p className="text-xs text-zinc-400">
              Customize the focal accent color dynamically applied across headings, borders, and controls.
            </p>

            <div className="space-y-2 pt-1">
              {accents.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => onSelectAccent(acc.id)}
                  className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    currentAccent === acc.id
                      ? "bg-zinc-900 border-white/30 text-white"
                      : "bg-zinc-950/60 border-white/5 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: acc.hex }}
                    />
                    <span className="text-xs font-medium font-mono">{acc.label}</span>
                  </div>
                  {currentAccent === acc.id && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Live Status Banner Editor */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider block font-semibold">
              Availability Status Text
            </span>
            <p className="text-xs text-zinc-400">
              Update what visitors see in the top status indicator.
            </p>

            <form onSubmit={handleSaveStatus} className="space-y-3">
              <input
                type="text"
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value)}
                className="w-full bg-[#08080a] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent)] font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-zinc-950 hover:bg-[var(--accent)] font-semibold text-xs rounded transition-colors font-display"
              >
                Apply Status
              </button>
              {saveSuccess && (
                <span className="text-xs text-emerald-400 font-mono ml-2 inline-flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Updated
                </span>
              )}
            </form>
          </div>

          {/* Section 3: Data Architecture Info */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider block font-semibold flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-[var(--accent)]" />
              Editable Source Code Structure
            </span>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All portfolio content is separated into clean, modular data files located in <code className="text-zinc-200">src/data/</code>:
            </p>
            <div className="bg-zinc-950 p-3 rounded border border-white/5 font-mono text-[11px] text-zinc-400 space-y-1">
              <div>src/data/profile.ts</div>
              <div>src/data/projects.ts</div>
              <div>src/data/interests.ts</div>
              <div>src/data/skills.ts</div>
              <div>src/data/learning.ts</div>
              <div>src/data/journey.ts</div>
              <div>src/data/experiments.ts</div>
              <div>src/data/personalInterests.ts</div>
              <div>src/data/socialLinks.ts</div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs text-zinc-300 hover:text-white bg-zinc-900 rounded font-mono"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
};
