import React, { useState } from "react";
import { ProjectData, ArchitectureComponent } from "../data/projects";
import { 
  Server, 
  Cpu, 
  ShieldCheck, 
  Database, 
  Layers, 
  FileText, 
  Terminal, 
  ExternalLink, 
  GitBranch, 
  CheckCircle2, 
  AlertCircle, 
  Play,
  RotateCcw
} from "lucide-react";

interface FeaturedProjectProps {
  project: ProjectData;
  onOpenDetails: (project: ProjectData) => void;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  project,
  onOpenDetails
}) => {
  const [selectedComponentId, setSelectedComponentId] = useState<string>("policy");
  const [simState, setSimState] = useState<"idle" | "running" | "verified">("idle");
  const [simTokens, setSimTokens] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);

  const components = project.architectureComponents || [];
  const selectedComponent =
    components.find((c) => c.id === selectedComponentId) || components[0];

  const runSimulation = () => {
    if (simState === "running") return;
    setSimState("running");
    setSimTokens("");
    setActiveStep(1); // Policy check

    setTimeout(() => {
      setActiveStep(2); // Retrieval
    }, 450);

    setTimeout(() => {
      setActiveStep(3); // Local inference
      const sampleText =
        "POLICY_VERIFIED [Role: Operator | Department: Refining] -> Retrieval confirmed from confidential doc: 'VALVE-CR-402B_Specs.pdf' (Chunk #14, Hash: 8f2c3a). Local Llama-3-8B AWQ generation: 'Recommended torque setting is 145 Nm ± 5 Nm at 300°C operational limit. Dual-operator approval required before maintenance dispatch.'";
      
      let index = 0;
      const interval = setInterval(() => {
        index += 6;
        setSimTokens(sampleText.slice(0, index));
        if (index >= sampleText.length) {
          clearInterval(interval);
          setActiveStep(4); // Audit log
          setSimState("verified");
        }
      }, 25);
    }, 900);
  };

  const resetSimulation = () => {
    setSimState("idle");
    setSimTokens("");
    setActiveStep(0);
  };

  return (
    <section id="featured" className="py-20 px-6 sm:px-8 max-w-7xl mx-auto border-b border-white/5">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
          <span>PRIMARY FEATURED ARCHIVE</span>
          <span aria-hidden="true">·</span>
          <span>SYSTEM ARCHITECTURE EXPLORER</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl font-light">
              {project.starterDescription}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenDetails(project)}
              className="px-4 py-2.5 text-xs font-semibold bg-white text-zinc-950 hover:bg-[var(--accent)] rounded transition-colors font-display"
            >
              Full Engineering Dossier
            </button>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 rounded transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Repository</span>
            </a>
          </div>
        </div>
      </div>

      {/* Interactive System Architecture Viewport */}
      <div className="bg-zinc-950/80 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        {/* Architecture Navigation Header */}
        <div className="px-6 py-4 bg-zinc-900/60 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
            <span className="text-xs font-mono text-zinc-200 uppercase tracking-wider font-semibold">
              Interactive Topology Explorer
            </span>
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            Click any component node to inspect implementation notes
          </span>
        </div>

        {/* 2-Column Split: Flow Diagram on Left, Deep Inspection Panel on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
          {/* Left: Sequential Pipeline Flow */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-zinc-950/40">
            <div className="space-y-3">
              <span className="text-xs uppercase font-mono text-zinc-400 tracking-wider block mb-4">
                Architecture Flow (Isolated Execution Pipeline)
              </span>

              {components.map((comp, idx) => {
                const isSelected = comp.id === selectedComponentId;
                const isStepActive = activeStep === idx;

                return (
                  <div key={comp.id} className="relative">
                    <button
                      onClick={() => setSelectedComponentId(comp.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center justify-between gap-4 ${
                        isSelected
                          ? "bg-zinc-900 border-[var(--accent)] shadow-lg shadow-black/40"
                          : "bg-zinc-900/40 border-white/5 hover:border-white/20 hover:bg-zinc-900/70"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="font-mono text-xs text-zinc-400 w-5">
                          0{idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white font-display">
                              {comp.name}
                            </span>
                            {/* Status label as clean unboxed text */}
                            <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
                              · {comp.status}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                            {comp.purpose}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className={`text-xs font-mono px-2 py-0.5 rounded text-[11px] ${
                            isSelected
                              ? "text-[var(--accent)] bg-[var(--accent)]/10"
                              : "text-zinc-400"
                          }`}
                        >
                          {isSelected ? "Active Focus" : "Select"}
                        </span>
                      </div>
                    </button>

                    {/* Downward connector arrow between stages */}
                    {idx < components.length - 1 && (
                      <div className="w-full flex justify-center py-1">
                        <span className="text-zinc-700 font-mono text-xs">↓</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Verification & Privacy Legend */}
            <div className="mt-8 pt-4 border-t border-white/5 text-[11px] text-zinc-400 flex flex-wrap items-center justify-between gap-2">
              <span>Status: Rigorous academic research & self-hosted prototype</span>
              <span className="font-mono text-zinc-400">Zero cloud socket egress</span>
            </div>
          </div>

          {/* Right: Component Deep Inspection Panel & Live Simulator */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-zinc-900/30">
            {selectedComponent ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-[var(--accent)] font-semibold tracking-wider">
                      COMPONENT INSPECTION · {selectedComponent.category.toUpperCase()}
                    </span>
                    <span
                      className={`text-xs font-mono ${
                        selectedComponent.status === "Implemented"
                          ? "text-emerald-400"
                          : selectedComponent.status === "Active Prototype"
                          ? "text-amber-400"
                          : "text-blue-400"
                      }`}
                    >
                      {selectedComponent.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-display mt-1">
                    {selectedComponent.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    {selectedComponent.shortLabel}
                  </p>
                </div>

                <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
                  <div>
                    <h4 className="font-mono text-zinc-400 uppercase text-[11px] mb-1 font-medium">
                      Primary Responsibility
                    </h4>
                    <p className="bg-zinc-950/60 p-3 rounded border border-white/5 text-zinc-200">
                      {selectedComponent.purpose}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-zinc-400 uppercase text-[11px] mb-1 font-medium">
                      Implementation & Security Notes
                    </h4>
                    <p className="bg-zinc-950/60 p-3 rounded border border-white/5 text-zinc-300">
                      {selectedComponent.implementationNotes}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-zinc-400 uppercase text-[11px] mb-1.5 font-medium">
                      Associated Technologies
                    </h4>
                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-zinc-300 font-mono">
                      {selectedComponent.technologies.map((tech, i) => (
                        <span key={tech}>
                          {tech}
                          {i < selectedComponent.technologies.length - 1 && (
                            <span className="text-zinc-600 ml-2" aria-hidden="true">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Pipeline Query Simulator */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-zinc-300 font-semibold flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
                      Inference & Policy Simulation
                    </span>
                    {simState === "running" && (
                      <span className="text-[11px] font-mono text-amber-400 animate-pulse">
                        Evaluating pipeline...
                      </span>
                    )}
                  </div>

                  <div className="bg-zinc-950 p-3 rounded border border-white/10 font-mono text-[11px] text-zinc-300 min-h-[90px] max-h-[140px] overflow-y-auto">
                    {simState === "idle" && (
                      <span className="text-zinc-400">
                        Query: "Inspect valve maintenance specs for Unit-402."
                        <br />
                        Click "Run Pipeline" to simulate policy check and streaming tokens.
                      </span>
                    )}
                    {simState !== "idle" && (
                      <p className="text-zinc-200 whitespace-pre-wrap leading-relaxed">
                        {simTokens}
                        {simState === "running" && (
                          <span className="inline-block w-2 h-3.5 bg-[var(--accent)] ml-1 animate-pulse" />
                        )}
                      </p>
                    )}
                  </div>

                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={runSimulation}
                        disabled={simState === "running"}
                        className="px-3 py-1.5 text-xs font-semibold bg-white text-zinc-950 hover:bg-[var(--accent)] disabled:opacity-50 rounded flex items-center gap-1.5 font-display transition-colors"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Run Pipeline</span>
                      </button>
                      {simState !== "idle" && (
                        <button
                          onClick={resetSimulation}
                          className="px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white border border-white/10 rounded flex items-center gap-1 transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                      )}
                    </div>

                    <span className="text-[11px] font-mono text-zinc-400">
                      Air-Gapped Prototype
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
