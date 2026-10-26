import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

interface A24HeaderProps {
  onContactClick: () => void;
}

export const A24Header: React.FC<A24HeaderProps> = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050507]/90 backdrop-blur-md border-b border-white/10 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (A24 Style Minimalist Typography) */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-base sm:text-lg font-bold tracking-[0.2em] text-white hover:text-zinc-300 transition-colors whitespace-nowrap shrink-0 text-left" style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          SHUBHAM JHA
        </button>

        {/* Zone 2: Single-line Clean Nav Links */}
        <nav
          aria-label="Portfolio Sections"
          className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-zinc-400"
        >
          <button
            onClick={() => scrollTo("what-i-have-made")}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            01. WHAT I HAVE MADE
          </button>
          <button
            onClick={() => scrollTo("what-i-know")}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            02. WHAT I KNOW
          </button>
          <button
            onClick={() => scrollTo("capabilities")}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            03. CAPABILITIES
          </button>
          <button
            onClick={() => scrollTo("what-i-am-doing")}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            04. WHAT I AM DOING
          </button>
          <button
            onClick={() => scrollTo("open-to")}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            05. WHERE OPEN TO
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onContactClick}
            className="px-3.5 py-1.5 text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 rounded font-display transition-colors whitespace-nowrap shrink-0"
          >
            Connect
          </button>
        </div>
      </div>
    </header>
  );
};
