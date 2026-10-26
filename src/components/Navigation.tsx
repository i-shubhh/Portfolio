import React, { useState, useEffect } from "react";
import { SOCIAL_LINKS } from "../data/socialLinks";
import { Sliders, Search, Menu, X, ArrowUpRight } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onOpenSettings: () => void;
  onOpenSearch: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onOpenSettings,
  onOpenSearch
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "hero", label: "Index" },
    { id: "featured", label: "Workbench" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "interests", label: "Interests" },
    { id: "learning", label: "Learning" },
    { id: "lab", label: "Lab" },
    { id: "journey", label: "Journey" }
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Bar strictly complying with Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Single-line Nav Links) - Zone 3 (1 Action) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#08080a]/90 backdrop-blur-md border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element, no subtitle in top bar) */}
          <button
            onClick={() => scrollTo("hero")}
            className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-[var(--accent)] transition-colors whitespace-nowrap shrink-0 text-left font-display"
          >
            SHUBHAM JHA
          </button>

          {/* Zone 2: 4–8 concise single-line nav links with clean hover styling */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-zinc-400"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                    isActive ? "text-white" : ""
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--accent)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action cluster */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Command / Search trigger */}
            <button
              onClick={onOpenSearch}
              title="Search Archive (Cmd+K or /)"
              className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-900/60 border border-white/10 rounded hover:border-white/20 transition-colors whitespace-nowrap shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
              <kbd className="text-[10px] bg-zinc-800 px-1 py-0.5 rounded text-zinc-400 font-mono">
                /
              </kbd>
            </button>

            {/* Live Curator Customizer */}
            <button
              onClick={onOpenSettings}
              title="Curator & Palette Settings"
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded transition-colors"
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => scrollTo("contact")}
              className="px-3.5 py-1.5 text-xs font-semibold text-zinc-950 bg-white hover:bg-[var(--accent)] rounded transition-colors whitespace-nowrap shrink-0 font-display shadow-sm"
            >
              Contact
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-zinc-400 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#09090b]/95 backdrop-blur-xl flex flex-col p-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <span className="font-bold text-lg text-white font-display">SHUBHAM JHA</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-zinc-400 hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-4 py-8 overflow-y-auto">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-lg font-medium text-zinc-300 hover:text-[var(--accent)] py-2 border-b border-white/5 transition-colors font-display"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="mt-4 w-full py-3 text-center text-sm font-semibold text-zinc-950 bg-white rounded font-display"
            >
              Get in Touch
            </button>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
            <span>SRM University–AP</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSettings();
              }}
              className="text-[var(--accent)] hover:underline flex items-center gap-1"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Palette & Status</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
