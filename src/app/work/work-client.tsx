"use client";

import React from "react";
import { ThemeOverlay } from "@/components/theme-overlay";
import { WebGLHoverImage } from "@/components/3d/webgl-hover-image";
import { SpotlightCard } from "@/components/spotlight-card";
import { motion } from "framer-motion";

export default function WorkPage() {
  const projects = [
    {
      id: "01",
      title: "Apex Algorithmic Ledger",
      client: "FinTech Trade Labs",
      metric: "+38% Signups // 140% Session Lift",
      desc: "A high-performance algorithmic trading interface for digital asset dealers. We built a custom WebGL shader pipeline displaying sub-millisecond real-time ledger metrics. This high-fidelity interface eliminated transaction lag, increased average user session times by 140%, and generated a 38% boost in signup conversions.",
      tags: ["WebGL", "Framer Motion", "Real-Time Telemetry", "Next.js"],
      status: "NDA Protected // Active"
    },
    {
      id: "02",
      title: "Router Scaling Compiler",
      client: "Enterprise Media Cloud",
      metric: "2.4x Speedup // +62% Search CTR",
      desc: "Complete architectural overhaul and edge routing deployment for a global media distribution network. By implementing Next.js native server-side rendering pipelines and eliminating code bottlenecks, we boosted load speeds by 240% and improved search engine visibility click-throughs by 62% under heavy traffic load.",
      tags: ["Next.js SSR", "Edge Functions", "API Routing", "PostgreSQL"],
      status: "NDA Protected // Deployed"
    },
    {
      id: "03",
      title: "Spatial Bio-Modeling Engine",
      client: "Helix Research Corp",
      metric: "1.2M Sessions // Zero Latency",
      desc: "Immersive spatial computed bio-modeling environment built directly inside the web browser. We designed and coded custom GLSL fluid simulation matrices, handling over 1.2M daily active user sessions without a single drop in render frame rate, bringing absolute clarity to heavy genetic datasets.",
      tags: ["Three.js", "GLSL Shaders", "Bio-Computing UI", "React"],
      status: "NDA Protected // Active"
    }
  ];

  return (
    <div className="w-full relative pt-8 pb-24 px-6 md:px-12 z-20 max-w-6xl mx-auto min-h-screen">
      <ThemeOverlay />
      
      {/* Noise texture for premium print feel */}
      <div className="noise-overlay" aria-hidden="true" />
      
      {/* Background Grid */}
      <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none system-grid" />

      {/* Main Grid: Sticky Left Title / Scrollable Right Case Studies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 relative z-10">
        
        {/* Sticky Left Column (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:h-[fit-content] space-y-8 select-none">
          <div className="bg-white border-[2.5px] border-black p-8 rounded-2xl shadow-[6px_6px_0px_#ff1e90] space-y-5">
            <span className="font-mono text-[9px] font-extrabold tracking-widest text-[#ff1e90] uppercase border-2 border-black px-3 py-1 bg-[#ff1e90]/10 rounded inline-block shadow-[2px_2px_0px_#000]">
              Proven Deliverables
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tighter text-black leading-none">
              Featured<br />
              <span className="font-serif italic font-normal text-zinc-400 lowercase">case</span> studies
            </h1>
            <p className="font-sans text-xs sm:text-sm text-zinc-650 leading-relaxed">
              Explore our project portfolio. We build custom software solutions engineered to eliminate operational bottlenecks, optimize search engines, and maximize conversion rates.
            </p>
          </div>

          {/* Symmetrical verified statistics panel - Dark contrasted brutalist style */}
          <div className="bg-[#0a0a0a] text-white border-[2.5px] border-black rounded-2xl p-8 space-y-5 shadow-[6px_6px_0px_#d8ff42]">
            <div className="font-display text-[10px] font-black tracking-widest uppercase text-[#d8ff42] border-b border-white/10 pb-3 flex justify-between items-center">
              <span>Verified Studio Telemetry</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#d8ff42] animate-pulse" />
            </div>
            
            <div className="space-y-3.5 font-sans text-xs">
              <div className="flex justify-between items-center border-b border-white/5 pb-2 text-white/70">
                <span>Average Signup Surge</span>
                <span className="font-display font-bold text-white text-sm bg-white/10 px-2 py-0.5 rounded border border-white/10">+38%</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2 text-white/70">
                <span>Load Velocity Increase</span>
                <span className="font-display font-bold text-white text-sm bg-white/10 px-2 py-0.5 rounded border border-white/10">2.4x Faster</span>
              </div>
              <div className="flex justify-between items-center text-white/70">
                <span>Uptime SLA Guarantee</span>
                <span className="font-display font-bold text-white text-sm bg-white/10 px-2 py-0.5 rounded border border-white/10">99.99%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Right Column (7 cols) */}
        <div className="lg:col-span-7 space-y-12">
          {projects.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
            >
              <SpotlightCard
                glowColor="rgba(255, 30, 144, 0.04)"
                borderColor="rgba(0, 0, 0, 0.15)"
                className="bg-white border-[2.5px] border-black p-8 shadow-[6px_6px_0px_rgba(0,0,0,0.05)] hover:shadow-[6px_6px_0px_#ff1e90] transition-all duration-400 rounded-2xl space-y-6 flex flex-col justify-between relative group overflow-hidden"
              >
                {/* Header Row */}
                <div className="flex justify-between items-start flex-wrap gap-4 border-b border-zinc-100 pb-5 relative z-10">
                  <div className="space-y-1.5">
                    <span className="font-mono text-[9px] text-[#ff1e90] font-extrabold uppercase tracking-widest bg-[#ff1e90]/5 border border-[#ff1e90]/20 px-2.5 py-0.5 rounded">
                      {p.id} {"//"} CASE_STUDY
                    </span>
                    <h2 className="font-display text-2xl font-black tracking-tight text-black uppercase">{p.title}</h2>
                    <p className="font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Client: {p.client}</p>
                  </div>
                  <span className="font-display text-[10px] font-black tracking-widest uppercase text-black bg-[#d8ff42] border-[2px] border-black px-3.5 py-1 rounded shadow-[2px_2px_0px_#000]">
                    {p.metric.split(" // ")[0]}
                  </span>
                </div>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {p.desc}
                </p>

                {/* WebGL Hover Image container */}
                <div 
                  className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-50 border-[2.5px] border-black relative cursor-pointer group-hover:scale-[1.01] transition-transform duration-300 shadow-[3px_3px_0px_rgba(0,0,0,0.1)]"
                >
                  <WebGLHoverImage imgUrl={p.id === "01" ? "/trading_ledger.png" : p.id === "02" ? "/hero_cover.png" : "/architect_char.png"} />
                </div>

                {/* Tags and Status Footer */}
                <div className="pt-5 border-t border-zinc-150 flex flex-wrap justify-between items-center gap-4 select-none">
                  <div className="flex flex-wrap gap-2 text-zinc-600">
                    {p.tags.map((t, i) => (
                      <span key={i} className="font-mono text-[8px] font-bold uppercase tracking-wider bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-md">{t}</span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="font-mono text-[9px] font-black uppercase tracking-wider text-zinc-400">
                      {p.status}
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
