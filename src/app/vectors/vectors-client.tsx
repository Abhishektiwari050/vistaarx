"use client";

import React from "react";
import { ThemeOverlay } from "@/components/theme-overlay";
import { SpotlightCard } from "@/components/spotlight-card";
import { motion } from "framer-motion";

export default function VectorsPage() {
  const coreStats = [
    { label: "Compile Target", val: "Next.js Edge" },
    { label: "First Byte (TTFB)", val: "<180ms" },
    { label: "Base Frame Rate", val: "60 FPS GL" },
    { label: "Core Caching SLA", val: "Stale-While-Revalidate" },
  ];

  const techStack = [
    { name: "Next.js Edge", desc: "Global edge hosting with server-rendered page assets." },
    { name: "Three.js / WebGL", desc: "Surrealist, lightweight 3D graphic systems running natively." },
    { name: "Framer Motion", desc: "60 FPS hardware-accelerated interface choreography." },
    { name: "Tailwind CSS", desc: "Streamlined styling compilation for zero bloated assets." },
  ];

  const phases = [
    {
      id: "01",
      phase: "Phase 01",
      title: "Systemic Discovery",
      desc: "We map your commercial targets to visual conversion strategies. We outline the precise parameter variables, user session flows, and data architecture scopes needed to capture high-ticket clients.",
      deliverables: ["Commercial Goal Mapping", "User Flow Topology", "Data Schema Scope"],
      timeframe: "Week 1",
      output: "Strategy Matrix",
      accent: "#ff1e90"
    },
    {
      id: "02",
      phase: "Phase 02",
      title: "Cinematic Prototyping",
      desc: "We construct high-fidelity interactive 3D concepts and web layouts. By rendering responsive wireframes and custom WebGL models early on, you interact with the actual user interface experience before development starts.",
      deliverables: ["Immersive 3D wireframes", "Framer interaction testbeds", "Typography scale audit"],
      timeframe: "Weeks 2-3",
      output: "Interactive Prototypes",
      accent: "#d8ff42"
    },
    {
      id: "03",
      phase: "Phase 03",
      title: "High-Fidelity Build",
      desc: "Our engineering team builds modular, production-ready React structures. All styles and assets are compiled straight to the edge for rapid loading, locked animations, and flawless keyboard accessibility.",
      deliverables: ["Modular React codebase", "Clean type-safe hooks", "Access boundary checks"],
      timeframe: "Weeks 4-6",
      output: "Production Codebase",
      accent: "#ff1e90"
    },
    {
      id: "04",
      phase: "Phase 04",
      title: "Latency Optimization",
      desc: "We run speed audits and security testing. We fine-tune CDN caching and code execution threads, ensuring a highly performant application that delivers flawless conversions.",
      deliverables: ["Lighthouse speed audit", "Global CDN cache tuning", "Direct SLA provisioning"],
      timeframe: "Week 7",
      output: "Deployment Ready",
      accent: "#d8ff42"
    }
  ];

  return (
    <div className="w-full relative pt-8 pb-24 px-6 md:px-12 z-20 max-w-6xl mx-auto min-h-screen">
      <ThemeOverlay />
      
      {/* Noise overlay for texture */}
      <div className="noise-overlay" aria-hidden="true" />
      
      {/* Background System Grid */}
      <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none system-grid" />

      {/* Page Header */}
      <div className="text-left select-none space-y-4 max-w-2xl mb-12">
        <span className="font-mono text-[9px] font-extrabold tracking-widest text-[#ff1e90] uppercase border-2 border-black px-3 py-1 bg-[#ff1e90]/10 rounded inline-block shadow-[2px_2px_0px_#000]">
          Vistar Blueprint // Operations
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tighter text-black leading-none">
          Technology &amp;<br />
          <span className="font-serif italic font-normal text-zinc-400 lowercase">operational</span> process
        </h1>
        <p className="font-sans text-xs sm:text-sm text-zinc-650 leading-relaxed">
          We combine bespoke WebGL choreography with highly optimized edge compilers to deliver premium digital systems. Explore our technical parameters and phase-by-phase build lifecycle.
        </p>
      </div>

      {/* Bento Grid: Core Telemetry & Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Card 1: Live Spec Sheet (7 columns) */}
        <div className="lg:col-span-7 bg-white border-[2.5px] border-black p-8 rounded-2xl shadow-[6px_6px_0px_#d8ff42] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h2 className="font-display text-lg font-black uppercase tracking-wider text-black flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d8ff42] border border-black animate-pulse" />
              Core Architecture Standards
            </h2>
            <p className="font-sans text-xs text-zinc-600 leading-relaxed">
              We compile code to run close to your client base. By building completely custom interfaces from scratch, we eliminate plug-in load bottlenecks, database connection lag, and bloated bundles.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {techStack.map((tech, i) => (
              <div key={i} className="border border-zinc-200 rounded-xl p-4 bg-[#faf9f5]/50 space-y-1">
                <span className="font-display text-xs font-bold text-black uppercase block">{tech.name}</span>
                <span className="font-sans text-[10px] text-zinc-500 leading-relaxed block">{tech.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Metrics Panel (5 columns) */}
        <div className="lg:col-span-5 bg-[#0a0a0a] text-white border-[2.5px] border-black p-8 rounded-2xl shadow-[6px_6px_0px_#ff1e90] flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-[9px] font-bold tracking-widest text-[#ff1e90] uppercase block">SYSTEM STATUS: READY</span>
            <h2 className="font-display text-lg font-black uppercase tracking-wider text-white">Telemetry Targets</h2>
          </div>

          <div className="divide-y divide-white/10">
            {coreStats.map((stat, i) => (
              <div key={i} className="flex justify-between items-center py-3 font-sans text-xs">
                <span className="text-white/60">{stat.label}</span>
                <span className="font-mono font-bold text-[#ff1e90]">{stat.val}</span>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-[10px] font-mono text-white/50 leading-relaxed select-none">
            All code repositories are packaged with isolated unit tests and handed over completely on launch day.
          </div>
        </div>
      </div>

      {/* Symmetrical 4-Phase Grid Timeline */}
      <div className="space-y-6">
        <h2 className="font-display text-xl font-black uppercase tracking-widest text-black mb-8 border-b-2 border-black pb-3 select-none flex justify-between items-center">
          <span>Delivery Pipeline Lifecycle</span>
          <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">4 Phases // 7 Weeks</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {phases.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
            >
              <SpotlightCard
                glowColor={p.accent === "#ff1e90" ? "rgba(255, 30, 144, 0.03)" : "rgba(216, 255, 66, 0.03)"}
                borderColor="rgba(0, 0, 0, 0.12)"
                className="bg-white border-[2.5px] border-black p-8 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,0.04)] hover:shadow-[6px_6px_0px_#ff1e90] transition-all duration-400 min-h-[320px] flex flex-col justify-between relative group overflow-hidden"
              >
                {/* Header info */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
                    <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-[#ff1e90]">
                      {p.phase}
                    </span>
                    <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                      {p.timeframe}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold uppercase text-black">
                    {p.title}
                  </h3>
                  <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                {/* Bullet deliverables list */}
                <div className="space-y-1.5 pt-4">
                  {p.deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-zinc-650 font-sans text-xs">
                      <span className="text-[#ff1e90] text-[9px]">✦</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Footer spec tag */}
                <div className="border-t border-zinc-100 pt-4 mt-6 flex justify-between items-center select-none font-mono text-[8px] font-bold text-zinc-400 uppercase">
                  <span>Output: {p.output}</span>
                  <span className="bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded text-zinc-600">{p.timeframe}</span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
