import React, { useState, useEffect, useRef } from "react";
import { EXPERIMENTS_DATA, ExperimentItem } from "../data/experiments";
import { Play, RotateCcw, Sliders, Terminal, Cpu, Activity, ShieldAlert, CheckCircle2 } from "lucide-react";

export const ExperimentsLab: React.FC = () => {
  const [activeExperimentId, setActiveExperimentId] = useState<string>("harmonic-wave-canvas");

  // State for Wave Simulation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [freqX, setFreqX] = useState<number>(3);
  const [freqY, setFreqY] = useState<number>(4);
  const [damping, setDamping] = useState<number>(0.02);

  // State for LLM Latency Simulator
  const [modelSize, setModelSize] = useState<"7B" | "8B" | "14B">("8B");
  const [contextTokens, setContextTokens] = useState<number>(2048);
  const [quantization, setQuantization] = useState<"4bit" | "8bit" | "16bit">("4bit");

  // State for AST Inspector
  const [codeSnippet, setCodeSnippet] = useState<string>(
    "def process_user_query(raw_input):\n    # Unsanitized call\n    result = eval(raw_input)\n    return result"
  );
  const [astFlagged, setAstFlagged] = useState<boolean>(true);

  // Run Wave Canvas Animation
  useEffect(() => {
    if (activeExperimentId !== "harmonic-wave-canvas") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const render = () => {
      ctx.fillStyle = "rgba(10, 10, 12, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.78;

      ctx.beginPath();
      ctx.strokeStyle = "rgba(229, 169, 59, 0.75)";
      ctx.lineWidth = 1.5;

      for (let i = 0; i < 600; i++) {
        const theta = (i / 600) * Math.PI * 4;
        const decay = Math.exp(-damping * theta);
        const x = centerX + radius * decay * Math.sin(freqX * theta + t);
        const y = centerY + radius * decay * Math.cos(freqY * theta);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      t += 0.025;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeExperimentId, freqX, freqY, damping]);

  // Handle AST Code evaluation
  useEffect(() => {
    const dangerousPatterns = [/eval\s*\(/i, /exec\s*\(/i, /__import__\s*\(/i, /os\.system\s*\(/i];
    const hasDanger = dangerousPatterns.some((pattern) => pattern.test(codeSnippet));
    setAstFlagged(hasDanger);
  }, [codeSnippet]);

  // Calculate simulated LLM metrics
  const getSimulatedMetrics = () => {
    const bytesPerParam = quantization === "4bit" ? 0.5 : quantization === "8bit" ? 1.0 : 2.0;
    const modelWeightsGB = (modelSize === "7B" ? 7 : modelSize === "8B" ? 8 : 14) * bytesPerParam;
    const kvCacheGB = (contextTokens * 128 * 32 * 2 * 2) / (1024 * 1024 * 1024); // approx KV cache
    const totalVRAM = (modelWeightsGB + kvCacheGB + 0.6).toFixed(2);
    const estTokensPerSec = quantization === "4bit" ? (modelSize === "14B" ? 28 : 46) : (modelSize === "14B" ? 18 : 31);
    const ttftMs = (contextTokens * 0.08).toFixed(1);

    return { totalVRAM, estTokensPerSec, ttftMs };
  };

  const metrics = getSimulatedMetrics();

  return (
    <section id="lab" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-white/5">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
          <span>THE EXPERIMENTS LAB</span>
          <span aria-hidden="true">·</span>
          <span>CREATIVE CODE & PROTOTYPES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Interactive Prototypes
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl font-light">
          A dedicated sandbox for smaller experiments, mathematical animations, compiler helpers, and local AI benchmarks.
        </p>
      </div>

      {/* Experiment Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8 border-b border-white/10">
        {EXPERIMENTS_DATA.map((exp) => (
          <button
            key={exp.id}
            onClick={() => setActiveExperimentId(exp.id)}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeExperimentId === exp.id
                ? "bg-white text-zinc-950 font-semibold"
                : "bg-zinc-950/60 text-zinc-400 hover:text-white border border-white/5"
            }`}
          >
            <span>{exp.title}</span>
            <span className="text-[10px] font-mono opacity-70">[{exp.badgeLabel}]</span>
          </button>
        ))}
      </div>

      {/* Active Interactive Experiment Viewport */}
      <div className="bg-zinc-950/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8">
        {/* Experiment 1: Wave Interference Canvas */}
        {activeExperimentId === "harmonic-wave-canvas" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#08080a] shadow-inner w-full max-w-[480px] aspect-square flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={480}
                  height={480}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono text-[var(--accent)] uppercase font-semibold">
                  PARAMETRIC HARMONIC SIMULATOR
                </span>
                <h3 className="text-2xl font-bold text-white font-display mt-1">
                  Lissajous Resonance Canvas
                </h3>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  Real-time HTML5 2D canvas trigonometric equation testing parametric frequency modulation and harmonic oscillation curves.
                </p>
              </div>

              {/* Sliders Controls */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div>
                  <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1">
                    <span>Frequency X Ratio</span>
                    <span className="text-[var(--accent)]">{freqX}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={freqX}
                    onChange={(e) => setFreqX(Number(e.target.value))}
                    className="w-full accent-[var(--accent)] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1">
                    <span>Frequency Y Ratio</span>
                    <span className="text-[var(--accent)]">{freqY}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={freqY}
                    onChange={(e) => setFreqY(Number(e.target.value))}
                    className="w-full accent-[var(--accent)] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1">
                    <span>Damping Ratio (Decay)</span>
                    <span className="text-[var(--accent)]">{damping}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.08"
                    step="0.005"
                    value={damping}
                    onChange={(e) => setDamping(Number(e.target.value))}
                    className="w-full accent-[var(--accent)] cursor-pointer"
                  />
                </div>

                <button
                  onClick={() => {
                    setFreqX(3);
                    setFreqY(4);
                    setDamping(0.02);
                  }}
                  className="text-xs text-zinc-400 hover:text-white font-mono flex items-center gap-1.5 pt-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default Harmonics</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Experiment 2: Local LLM Latency & VRAM Simulator */}
        {activeExperimentId === "token-latency-simulator" && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono text-[var(--accent)] uppercase font-semibold">
                SYSTEM CALCULATOR & BENCHMARK
              </span>
              <h3 className="text-2xl font-bold text-white font-display mt-1">
                Local LLM VRAM & Generation Latency Estimator
              </h3>
              <p className="text-xs text-zinc-300 mt-1 max-w-xl">
                Simulates memory footprint and inference velocity based on parameter count, context window size, and quantization schemes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              {/* Controls */}
              <div className="space-y-4 md:col-span-2">
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-2">
                    Foundation Model Architecture
                  </label>
                  <div className="flex gap-2">
                    {(["7B", "8B", "14B"] as const).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setModelSize(sz)}
                        className={`px-4 py-2 text-xs font-mono rounded transition-colors ${
                          modelSize === sz
                            ? "bg-white text-zinc-950 font-bold"
                            : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/5"
                        }`}
                      >
                        {sz} Parameters
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-2">
                    Quantization Scheme
                  </label>
                  <div className="flex gap-2">
                    {(["4bit", "8bit", "16bit"] as const).map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuantization(q)}
                        className={`px-4 py-2 text-xs font-mono rounded transition-colors ${
                          quantization === q
                            ? "bg-white text-zinc-950 font-bold"
                            : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/5"
                        }`}
                      >
                        {q === "4bit" ? "4-Bit AWQ / GGUF" : q === "8bit" ? "8-Bit Int" : "16-Bit FP16"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1">
                    <span>Active Context Window Tokens</span>
                    <span className="text-[var(--accent)] font-bold">{contextTokens} Tokens</span>
                  </div>
                  <input
                    type="range"
                    min="512"
                    max="16384"
                    step="512"
                    value={contextTokens}
                    onChange={(e) => setContextTokens(Number(e.target.value))}
                    className="w-full accent-[var(--accent)] cursor-pointer"
                  />
                </div>
              </div>

              {/* Output Cards */}
              <div className="bg-zinc-900/60 p-5 rounded-xl border border-white/10 space-y-4">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  Simulated Hardware Metrics
                </span>

                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 block">Required GPU VRAM</span>
                    <span className="text-2xl font-black text-white font-display tabular-nums">
                      {metrics.totalVRAM} GB
                    </span>
                    <span className="text-[10px] text-zinc-400 block">
                      {Number(metrics.totalVRAM) <= 8 ? "Fits on consumer 8GB GPU" : "Requires 12GB+ VRAM"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 block">Estimated Throughput</span>
                    <span className="text-2xl font-black text-[var(--accent)] font-display tabular-nums">
                      ~{metrics.estTokensPerSec} tok/s
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 block">Time to First Token (TTFT)</span>
                    <span className="text-lg font-bold text-zinc-200 font-display tabular-nums">
                      {metrics.ttftMs} ms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Experiment 3: AST Syntax Policy Inspector */}
        {activeExperimentId === "ast-syntax-inspector" && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono text-[var(--accent)] uppercase font-semibold">
                SECURITY & STATIC ANALYSIS
              </span>
              <h3 className="text-2xl font-bold text-white font-display mt-1">
                Deterministic Code AST Policy Inspector
              </h3>
              <p className="text-xs text-zinc-300 mt-1">
                Simulates pre-commit AST visitor checks designed to catch dangerous execution patterns before triggering LLM reviews.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 block">
                  Python Code Input (Editable)
                </label>
                <textarea
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  rows={6}
                  className="w-full bg-[#08080a] border border-white/10 rounded-lg p-3 font-mono text-xs text-zinc-200 focus:outline-none focus:border-[var(--accent)]"
                />
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() =>
                      setCodeSnippet("def safe_add(a, b):\n    # Deterministic safe function\n    return a + b")
                    }
                    className="text-[11px] font-mono text-zinc-400 hover:text-white underline"
                  >
                    Load Safe Snippet
                  </button>
                  <button
                    onClick={() =>
                      setCodeSnippet("def execute_cmd(query):\n    import os\n    os.system(query)")
                    }
                    className="text-[11px] font-mono text-amber-400 hover:underline"
                  >
                    Load Dangerous Snippet
                  </button>
                </div>
              </div>

              {/* AST Policy Result */}
              <div className="p-5 rounded-xl border border-white/10 bg-zinc-900/60 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-3">
                    AST Static Analysis Policy Verdict
                  </span>

                  {astFlagged ? (
                    <div className="flex items-start gap-3 p-3 bg-red-950/30 border border-red-500/30 rounded-lg text-xs text-red-200">
                      <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold font-mono block">POLICY VIOLATION DETECTED</span>
                        <p className="text-red-300/80 mt-1">
                          Dynamic arbitrary code execution call (eval/exec/os.system) flagged by AST visitor. Gated from agent execution loop.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-xs text-emerald-200">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold font-mono block">AST POLICY PASSED</span>
                        <p className="text-emerald-300/80 mt-1">
                          No unauthorized execution primitives detected. Clean syntax tree verified.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-zinc-400">
                  AST Node Evaluation: Deterministic Python Visitor Pattern
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Experiment 4: Java Concurrency Worker Pool */}
        {activeExperimentId === "java-concurrency-worker-pool" && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono text-[var(--accent)] uppercase font-semibold">
                SYSTEM CONCURRENCY SIMULATOR
              </span>
              <h3 className="text-2xl font-bold text-white font-display mt-1">
                Java ThreadPoolExecutor Simulation
              </h3>
              <p className="text-xs text-zinc-300 mt-1">
                Visualizing how worker threads dequeue and execute concurrent tasks under bounded queue constraints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 bg-zinc-900/60 rounded-xl border border-white/10 text-center">
                <span className="text-xs font-mono text-zinc-400 block">Core Pool Size</span>
                <span className="text-2xl font-bold text-white font-display">4 Threads</span>
                <span className="text-[10px] text-zinc-400 mt-1 block">Always active</span>
              </div>
              <div className="p-4 bg-zinc-900/60 rounded-xl border border-white/10 text-center">
                <span className="text-xs font-mono text-zinc-400 block">Task BlockingQueue</span>
                <span className="text-2xl font-bold text-[var(--accent)] font-display">ArrayBlockingQueue(100)</span>
                <span className="text-[10px] text-zinc-400 mt-1 block">Bounded memory safety</span>
              </div>
              <div className="p-4 bg-zinc-900/60 rounded-xl border border-white/10 text-center">
                <span className="text-xs font-mono text-zinc-400 block">Rejection Policy</span>
                <span className="text-2xl font-bold text-zinc-200 font-display">CallerRunsPolicy</span>
                <span className="text-[10px] text-zinc-400 mt-1 block">Backpressure preservation</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
