"use client";

import React from "react";
import { ThemeOverlay } from "@/components/theme-overlay";
import { WebGLHoverImage } from "@/components/3d/webgl-hover-image";
import { SpotlightCard } from "@/components/spotlight-card";

export default function WorkPage() {
  const projects = [
    {
      id: "01",
      title: "Apex Algorithmic Ledger",
      client: "FinTech Trade Labs",
      metric: "+38% Signups // 140% Session Lift",
      desc: "A high-performance algorithmic trading interface for digital asset dealers. We built a custom WebGL shader pipeline displaying sub-millisecond real-time ledger metrics. This high-fidelity interface eliminated transaction lag, increased average user session times by 140%, and generated a 38% boost in signup conversions.",
      tags: ["WebGL", "Framer Motion", "Real-Time Telemetry", "Next.js"],
      status: "NDA Protected / Active"
    },
    {
      id: "02",
      title: "Router Scaling Compiler",
      client: "Enterprise Media Cloud",
      metric: "2.4x Speedup // +62% Search CTR",
      desc: "Complete architectural overhaul and edge routing deployment for a global media distribution network. By implementing Next.js native server-side rendering pipelines and eliminating code bottlenecks, we boosted load speeds by 240% and improved search engine visibility click-throughs by 62% under heavy traffic load.",
      tags: ["Next.js SSR", "Edge Functions", "API Routing", "PostgreSQL"],
      status: "NDA Protected / Deployed"
    },
    {
      id: "03",
      title: "Spatial Bio-Modeling Engine",
      client: "Helix Research Corp",
      metric: "1.2M Sessions // Zero Latency",
      desc: "Immersive spatial computed bio-modeling environment built directly inside the web browser. We designed and coded custom GLSL fluid simulation matrices, handling over 1.2M daily active user sessions without a single drop in render frame rate, bringing absolute clarity to heavy genetic datasets.",
      tags: ["Three.js", "GLSL Shaders", "Bio-Computing UI", "React"],
      status: "NDA Protected / Active"
    }
  ];

  return (
    <div className="w-full relative py-20 px-6 md:px-12 z-20 max-w-7xl mx-auto min-h-screen">
      <ThemeOverlay />
      
      {/* Background Grid */}
      <div className="fixed inset-0 z-[-1] opacity-5 pointer-events-none system-grid" />

      {/* Main Grid: Sticky Left Title / Scrollable Right Case Studies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10 relative z-10">
        
        {/* Sticky Left Column (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:h-[fit-content] space-y-8 select-none">
          <div className="space-y-4">
            <span className="font-display text-[9px] font-bold tracking-widest text-[#ff1e90] uppercase border border-[#ff1e90]/20 px-3 py-1 bg-[#ff1e90]/5 rounded inline-block">
              Proven Deliverables
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold uppercase tracking-tight text-black leading-none">
              Featured<br />
              <span className="text-[#ff1e90]">Case Studies</span>
            </h1>
            <p className="font-sans text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-sm">
              Explore our project portfolio. We build custom software solutions engineered to eliminate operational bottlenecks.
            </p>
          </div>

          {/* Symmetrical verified statistics panel */}
          <div className="bg-white border border-zinc-200 rounded p-6 space-y-4 max-w-sm shadow-sm font-sans text-xs">
            <div className="font-display text-[10px] font-bold tracking-widest uppercase text-zinc-400 border-b border-zinc-100 pb-2.5">
              Verified Studio Telemetry
            </div>
            <div className="flex justify-between items-center border-b border-zinc-100 pb-2 text-zinc-600">
              <span>Average Signup Surge</span>
              <span className="font-display font-semibold text-black">+38%</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-100 pb-2 text-zinc-600">
              <span>Average Load Velocity Gain</span>
              <span className="font-display font-semibold text-black">2.4x Speedup</span>
            </div>
            <div className="flex justify-between items-center text-zinc-600">
              <span>Platform Uptime Target</span>
              <span className="font-display font-semibold text-black">99.99%</span>
            </div>
          </div>
        </div>

        {/* Scrollable Right Column (7 cols) */}
        <div className="lg:col-span-7 space-y-16">
          {projects.map((p) => (
            <SpotlightCard
              key={p.id}
              glowColor="rgba(255, 30, 144, 0.05)"
              borderColor="rgba(255, 30, 144, 0.2)"
              className="bg-white border border-zinc-200 p-8 shadow-sm space-y-6 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start flex-wrap gap-4 border-b border-zinc-100 pb-4">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#ff1e90] font-semibold">{p.id} {"//"} CASE STUDY</span>
                  <h2 className="font-display text-xl font-semibold tracking-wide text-black uppercase">{p.title}</h2>
                  <p className="font-sans text-[10px] text-zinc-400 font-medium">Client: {p.client}</p>
                </div>
                <span className="font-display text-[9px] font-bold tracking-widest uppercase text-[#ff1e90] bg-[#ff1e90]/5 border border-[#ff1e90]/20 px-2.5 py-0.5 rounded">
                  {p.metric}
                </span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {p.desc}
              </p>

              {/* WebGL Hover Image container */}
              <div 
                data-cursor-text="VIEW"
                className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-zinc-50 border border-zinc-100 relative cursor-pointer"
              >
                <WebGLHoverImage imgUrl={p.id === "01" ? "/trading_ledger.png" : p.id === "02" ? "/hero_cover.png" : "/architect_char.png"} />
              </div>

              {/* Tags and Status Footer */}
              <div className="pt-4 border-t border-zinc-100 flex flex-wrap justify-between items-center gap-4 select-none font-mono text-[9px] text-zinc-400">
                <div className="flex flex-wrap gap-2 text-zinc-500">
                  {p.tags.map((t, i) => (
                    <span key={i} className="bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200/50">{t}</span>
                  ))}
                </div>
                <span className="bg-zinc-800 text-white font-sans px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                  {p.status}
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </div>
  );
}
