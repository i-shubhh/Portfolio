/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { A24Header } from "./components/A24Header";
import { A24SpatialFilmFlow } from "./components/A24SpatialFilmFlow";

import { WhatIHaveMadeSection } from "./components/WhatIHaveMadeSection";
import { WhatIKnowAndCapabilities } from "./components/WhatIKnowAndCapabilities";
import { WhatIAmDoingAndOpenTo } from "./components/WhatIAmDoingAndOpenTo";
import { A24Contact } from "./components/A24Contact";
import { ProjectDetailModal } from "./components/ProjectDetailModal";

import { A24_FILM_FRAMES } from "./data/a24Frames";
import { PROJECTS_DATA, ProjectData } from "./data/projects";
import { ArrowDown, Sparkles } from "lucide-react";

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleSelectFrom3D = (frame: { id: string }) => {
    const matched = PROJECTS_DATA.find((p) => p.id === frame.id);
    if (matched) {
      setSelectedProject(matched);
    } else {
      // If researcher portrait or other frame is clicked, default to first flagship
      setSelectedProject(PROJECTS_DATA[0]);
    }
  };

  const handleNavigateNext = () => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % PROJECTS_DATA.length;
    setSelectedProject(PROJECTS_DATA[nextIndex]);
  };

  const handleNavigatePrev = () => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
    setSelectedProject(PROJECTS_DATA[prevIndex]);
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWorks = () => {
    const el = document.getElementById("what-i-have-made");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#f4f4f6] relative film-grain overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* 00. Top Navigation */}
      <A24Header onContactClick={scrollToContact} />

      <main>
        {/* 01. A24 Minimalist Hero Entrance */}
        <section className="pt-32 pb-16 px-6 sm:px-10 max-w-7xl mx-auto flex flex-col justify-between min-h-[75vh]">
          {/* Top Spec Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400 uppercase tracking-widest pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">SRM UNIVERSITY–AP</span>
              <span aria-hidden="true">·</span>
              <span>COMPUTER SCIENCE & ENGINEERING</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-300">AI & ML SPECIALIZATION</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-zinc-300 normal-case font-mono">
                Open to Summer 2026 Internships
              </span>
            </div>
          </div>

          {/* Monolithic Title & Statement */}
          <div className="my-auto py-12 sm:py-16 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-zinc-400 block">
              STUDENT RESEARCHER & SYSTEMS BUILDER
            </span>

            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black font-display tracking-tight text-white leading-[0.9]">
              SHUBHAM JHA
            </h1>

            <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-zinc-300 font-display leading-tight max-w-3xl">
              “Curious by nature. Building through code.”
            </p>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl font-light">
              I’m a CSE + AI/ML student at SRM University–AP exploring self-hosted intelligent systems, 
              deterministic security guardrails, software architecture, and the creative possibilities of technology.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToWorks}
                className="group px-6 py-3.5 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold rounded font-display transition-colors inline-flex items-center gap-3 shadow-md"
              >
                <span>Explore What I Have Made</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <a
                href="#what-i-know"
                className="px-5 py-3.5 text-xs font-medium text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 rounded transition-colors font-mono"
              >
                Inspect Capabilities
              </a>
            </div>
          </div>

          {/* Editorial Footer Spec Strip */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-zinc-400">
            <div>
              <span className="block text-zinc-400 uppercase text-[10px]">What I Build</span>
              <span className="text-zinc-200">Local AI & Systems</span>
            </div>
            <div>
              <span className="block text-zinc-400 uppercase text-[10px]">Primary Tech</span>
              <span className="text-zinc-200">Python · Java · React · FastAPI</span>
            </div>
            <div>
              <span className="block text-zinc-400 uppercase text-[10px]">Active Focus</span>
              <span className="text-zinc-200">MRPL Sovereign Workbench</span>
            </div>
            <div>
              <span className="block text-zinc-400 uppercase text-[10px]">Degree Horizon</span>
              <span className="text-zinc-200">SRM–AP Class of 2027</span>
            </div>
          </div>
        </section>


        {/* 03. 3D Spatial Film Flow (Interactive Three.js Curved Film Reel) */}
        <A24SpatialFilmFlow
          frames={A24_FILM_FRAMES}
          onSelectFrame={handleSelectFrom3D}
        />

        {/* 04. WHAT I HAVE MADE */}
        <WhatIHaveMadeSection
          projects={PROJECTS_DATA}
          onSelectProject={(p) => setSelectedProject(p)}
        />

        {/* 05. WHAT I KNOW & WHAT ARE MY CAPABILITIES */}
        <WhatIKnowAndCapabilities />

        {/* 06. WHAT I AM DOING & WHERE AM I OPEN TO */}
        <WhatIAmDoingAndOpenTo />

        {/* 07. CONTACT — THE FINAL SCENE */}
        <A24Contact />
      </main>

      {/* Engineering Dossier Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigateNext={handleNavigateNext}
        onNavigatePrev={handleNavigatePrev}
      />
    </div>
  );
}
