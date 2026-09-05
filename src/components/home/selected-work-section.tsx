"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SpotlightCard } from "@/components/spotlight-card";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

const FEATURED_PROJECTS = [
  {
    id: "01",
    title: "Project VAYU // Aviation Intelligence",
    domain: "Aviation Safety & Flight Dispatch",
    status: "PRODUCTION DEPLOYED",
    image: "/projects/vayu-briefing.png",
    liveUrl: "https://ai-vayu.vercel.app",
    githubUrl: "https://github.com/Abhishektiwari050/AI-VAYU",
    problem: "Pilots and dispatchers sift through hundreds of cryptic uppercase NOTAM text strings, risking safety-critical airspace oversights.",
    system: "AI-driven NOTAM parser, NLP hazard threat classification, interactive GIS airspace HUD, and instant executive pre-flight briefing reports.",
    build: ["Next.js 15", "TypeScript", "GIS Leaflet HUD", "NLP AI", "Tailwind CSS"],
    result: "<45ms query response, 99.8% hazard classification accuracy, -85% briefing prep time.",
  },
  {
    id: "02",
    title: "AURA // Multi-Agent Telemetry Engine",
    domain: "Healthcare Telemetry & Critical Monitoring",
    status: "PRODUCTION DEPLOYED",
    image: "/projects/aura-results.png",
    liveUrl: "https://multi-agent-anomaly-system.onrender.com",
    githubUrl: "https://github.com/Abhishektiwari050/multi-agent-anomaly-system",
    problem: "Clinical vital signs monitoring suffers from telemetry alert fatigue, high false positives, and coupled architectures that choke under burst loads.",
    system: "Decoupled multi-agent stream architecture over a distributed message broker with unsupervised Isolation Forest ML models.",
    build: ["Python 3.11+", "Multi-Agent System", "Isolation Forest ML", "Telemetry Stream", "Render"],
    result: "<15ms telemetry processing latency, 98.4% anomaly precision, zero false-alarm fatigue.",
  },
  {
    id: "03",
    title: "3axis Arc // Architectural Real Estate",
    domain: "PropTech & Luxury Architecture",
    status: "PRODUCTION DEPLOYED",
    image: "/projects/3axisarc.png",
    liveUrl: "https://3axisarc.vercel.app",
    githubUrl: "https://github.com/Abhishektiwari050/3axisarc",
    problem: "High-end luxury architectural projects fail to convert discerning investors when showcased on generic real estate listing templates.",
    system: "Interactive 3D parallax with mouse-tracking perspective shifts, structural typography, clip-path hover transitions, and instant inquiry flows.",
    build: ["Next.js", "TypeScript", "3D Parallax", "Tailwind CSS", "Vercel"],
    result: "60 FPS fluid rendering, +180% average session duration, 99/100 Lighthouse performance.",
  },
  {
    id: "04",
    title: "Competence CRM // Enterprise Operations",
    domain: "B2B Consulting & Pipeline Operations",
    status: "PRODUCTION DEPLOYED",
    image: "/projects/competence-crm.png",
    liveUrl: "https://competenceconsultingcrm.onrender.com",
    githubUrl: "https://github.com/Abhishektiwari050/CRM",
    problem: "Consulting operations were stalled by fragmented spreadsheets, untracked client deliverables, and manual status reporting.",
    system: "Unified customer relationship and project management platform with Python backend, real-time client status automation, and activity telemetry.",
    build: ["Python", "FastAPI / Django", "Reactive UI", "PostgreSQL", "Render"],
    result: "100% automated deal flow tracking, +45% team delivery velocity, zero lost deliverables.",
  },
];

import { ProjectSimulator } from "./project-simulators";

export function SelectedWorkSection() {
  // State for toggling individual project view modes: "UI" vs "BLUEPRINT"
  const [activeModes, setActiveModes] = useState<Record<string, "UI" | "BLUEPRINT">>({
    "01": "UI",
    "02": "UI",
    "03": "UI",
    "04": "UI",
  });

  const toggleMode = (id: string, mode: "UI" | "BLUEPRINT") => {
    playTickSound();
    setActiveModes((prev) => ({ ...prev, [id]: mode }));
  };

  return (
    <section id="work" className="py-24 px-6 sm:px-12 md:px-16 bg-white border-t-2 border-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-black/10 pb-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 border-2 border-black bg-[#faf9f5] px-3.5 py-1.5 rounded-lg text-[9px] font-mono font-black tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#ff1e90]">
              <span className="w-2 h-2 rounded-full bg-[#ff1e90] inline-block" />
              06 // SELECTED WORK &amp; CASE STUDIES
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-[#0a0a0a] leading-[0.95]">
              Real systems. <br />
              <span className="font-serif italic font-normal text-zinc-400 lowercase">
                editorial stories of impact.
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-zinc-600 leading-relaxed">
              Every project is an editorial breakdown: The Problem → The System → The Build → The Result. Toggle between Live Interface and Architecture Telemetry HUD to inspect internal pipelines.
            </p>
          </div>

          <Link
            href="/work"
            onClick={() => playTickSound()}
            className="shrink-0 bg-[#d8ff42] text-black font-mono font-black text-xs uppercase tracking-widest px-6 py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-black hover:text-[#d8ff42] transition-colors"
          >
            All 8 Shipped Projects →
          </Link>
        </div>

        {/* 4 Deep Editorial Case Studies */}
        <div className="space-y-14">
          {FEATURED_PROJECTS.map((project) => {
            const currentMode = activeModes[project.id] || "UI";

            return (
              <SpotlightCard
                key={project.id}
                className="bg-[#faf9f5] border-[2.5px] border-black rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#d8ff42] transition-all duration-300 space-y-8"
              >
                {/* Project Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] font-black px-2.5 py-1 rounded bg-black text-[#d8ff42]">
                      PROJECT {project.id}
                    </span>
                    <span className="font-mono text-xs font-bold text-zinc-500 uppercase">
                      {project.domain}
                    </span>
                  </div>

                  {/* Mode Switcher & Status */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1 bg-white p-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                      <button
                        onClick={() => toggleMode(project.id, "UI")}
                        className={`font-mono text-[9px] font-black uppercase px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          currentMode === "UI"
                            ? "bg-black text-[#d8ff42]"
                            : "text-zinc-600 hover:text-black"
                        }`}
                      >
                        🖼️ INTERFACE
                      </button>
                      <button
                        onClick={() => toggleMode(project.id, "BLUEPRINT")}
                        className={`font-mono text-[9px] font-black uppercase px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          currentMode === "BLUEPRINT"
                            ? "bg-[#ff1e90] text-white"
                            : "text-zinc-600 hover:text-black"
                        }`}
                      >
                        ⚡ TELEMETRY HUD
                      </button>
                    </div>

                    <span className="font-mono text-[9px] font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase shrink-0">
                      ● {project.status}
                    </span>
                  </div>
                </div>

                {/* Title & Preview Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Visual Preview / Telemetry Stage (7 Columns) */}
                  <div className="lg:col-span-7 space-y-4">
                    {currentMode === "UI" ? (
                      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border-2 border-black bg-zinc-950 group/img shadow-[4px_4px_0px_#000]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                        
                        {/* Floating Action Links */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 z-10">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#d8ff42] text-black font-mono font-black text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-white transition-colors"
                            >
                              Visit Live Platform ↗
                            </a>
                          )}
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black/90 text-white font-mono font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg border border-white/20 hover:bg-white hover:text-black transition-colors ml-auto"
                          >
                            Inspect GitHub Source ↗
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <ProjectSimulator projectId={project.id} />
                        <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 px-1">
                          <span>INTERACTIVE TELEMETRY LAB</span>
                          <button
                            onClick={() => toggleMode(project.id, "UI")}
                            className="text-[#ff1e90] font-black uppercase hover:underline"
                          >
                            Back to UI View ↗
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Editorial Breakdown: Problem -> System -> Build -> Result (5 Columns) */}
                  <div className="lg:col-span-5 space-y-4">
                    <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-black leading-tight">
                      {project.title}
                    </h3>

                    <div className="space-y-3 font-sans text-xs">
                      {/* The Problem */}
                      <div className="bg-white border border-black/10 p-3.5 rounded-xl space-y-1">
                        <span className="font-mono text-[8px] font-black uppercase tracking-widest text-[#ff1e90] block">
                          THE PROBLEM
                        </span>
                        <p className="text-zinc-600 leading-relaxed font-medium">
                          {project.problem}
                        </p>
                      </div>

                      {/* The System */}
                      <div className="bg-white border border-black/10 p-3.5 rounded-xl space-y-1">
                        <span className="font-mono text-[8px] font-black uppercase tracking-widest text-black block">
                          THE SYSTEM ARCHITECTURE
                        </span>
                        <p className="text-zinc-700 leading-relaxed font-medium">
                          {project.system}
                        </p>
                      </div>

                      {/* The Result */}
                      <div className="bg-[#d8ff42]/20 border-2 border-black p-3.5 rounded-xl space-y-1 shadow-[2px_2px_0px_#000]">
                        <span className="font-mono text-[8px] font-black uppercase tracking-widest text-black block">
                          VERIFIED BUSINESS RESULT
                        </span>
                        <p className="text-black font-bold leading-relaxed">
                          {project.result}
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {project.build.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[8px] font-bold uppercase px-2 py-0.5 rounded bg-black/5 border border-black/10 text-zinc-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </SpotlightCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
