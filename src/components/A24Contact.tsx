import React, { useState } from "react";
import { Mail, Github, Linkedin, Copy, Check, ArrowUp, ExternalLink } from "lucide-react";
import { SOCIAL_LINKS } from "../data/socialLinks";

export const A24Contact: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const email = "ishubham0666@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-10 max-w-7xl mx-auto">
      <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-14">
        <span className="font-mono text-xs text-zinc-400 uppercase tracking-[0.25em]">
          ACT VI · DIRECT INQUIRY
        </span>
        <span className="font-mono text-xs text-zinc-400">
          CHANNELS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-white/10">
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-display tracking-tight leading-[1.02]">
            LET’S BUILD SOMETHING INTERESTING.
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light max-w-2xl leading-relaxed">
            If you’re working on an interesting problem, want to collaborate on AI systems, or simply want to exchange ideas about technology, let’s connect.
          </p>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${email}`}
              className="px-6 py-3.5 bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-sm rounded font-display transition-colors inline-flex items-center gap-2.5 shadow-lg"
            >
              <Mail className="w-4 h-4" />
              <span>{email}</span>
            </a>

            <button
              onClick={handleCopy}
              className="px-5 py-3.5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-mono rounded bg-zinc-950 transition-colors inline-flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Links Column */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-xl border border-white/10 bg-zinc-950/60 space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-semibold block">
            Public Repositories
          </span>

          <div className="space-y-3 text-xs font-mono">
            {SOCIAL_LINKS.filter((l) => l.id !== "email").map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded border border-white/5 bg-zinc-900/40 hover:bg-zinc-900 hover:border-white/20 text-zinc-300 hover:text-white transition-all group"
              >
                <span>{link.label}</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* A24 Minimalist Footer */}
      <footer className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div>
          <span className="text-zinc-300 font-semibold font-a24 tracking-widest">SHUBHAM JHA</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span>SRM University–AP · Computer Science & Engineering</span>
        </div>

        <button
          onClick={scrollToTop}
          className="hover:text-white transition-colors flex items-center gap-1.5 py-1"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </footer>
    </section>
  );
};
