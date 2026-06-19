"use client";

import React from "react";
import Link from "next/link";
import { ThemeOverlay } from "@/components/theme-overlay";
import { motion } from "framer-motion";

export default function PhilosophyPage() {
  const manifesto = [
    {
      num: "01",
      title: "Elegance is Refusal",
      desc: "We refuse bloated plug-ins, pre-fabricated template setups, and unnecessary code clutter. Symmetrical, customized engineering conveys maximum brand signal and ensures absolute clarity.",
    },
    {
      num: "02",
      title: "Performance is SEO",
      desc: "Page load speeds are not a vanity metric. Search engines and conversational AI crawlers read, index, and prioritize high-speed, edge-rendered platforms first.",
    },
    {
      num: "03",
      title: "Core Codebase Ownership",
      desc: "We hand over 100% of the repository from day one. Zero subscription lock-ins, zero hidden dependencies, and complete commercial independence for your business.",
    },
  ];

  return (
    <div className="w-full relative pt-8 pb-24 px-6 md:px-12 z-20 max-w-6xl mx-auto min-h-screen">
      <ThemeOverlay />
      
      {/* Noise texture for premium print feel */}
      <div className="noise-overlay" aria-hidden="true" />
      
      {/* Background System Grid */}
      <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none system-grid" />

      {/* Main Grid: Left Column Manifesto / Right Column Editorial Portraits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 items-start relative z-10">
        
        {/* Left Column: Studio Manifesto (5 cols) */}
        <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-28">
          <div className="space-y-4">
            <span className="font-mono text-[9px] font-extrabold tracking-widest text-[#ff1e90] uppercase border-2 border-black px-3 py-1 bg-[#ff1e90]/10 rounded inline-block shadow-[2px_2px_0px_#000]">
              Studio Philosophy
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tighter text-black leading-none">
              The Vistar<br />
              <span className="font-serif italic font-normal text-zinc-400 lowercase">studio</span> manifesto
            </h1>
            <p className="font-sans text-xs sm:text-sm text-zinc-650 leading-relaxed">
              We design the negative space where your brand truly lives. Our core principles drive every line of code we compile and every interface we architect.
            </p>
          </div>

          <div className="space-y-8">
            {manifesto.map((m, idx) => (
              <motion.div
                key={m.num}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                className="space-y-2 border-l-2 border-black pl-5"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] font-extrabold text-[#ff1e90] uppercase bg-[#ff1e90]/5 border border-[#ff1e90]/20 px-2 py-0.5 rounded">
                    Principle {m.num}
                  </span>
                  <h3 className="font-display text-base font-bold uppercase text-black">
                    {m.title}
                  </h3>
                </div>
                <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                  {m.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Action button linking to portfolio */}
          <div className="pt-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 border-[2.5px] border-black bg-[#d8ff42] text-black font-sans font-black text-[10px] tracking-widest uppercase px-6 py-4 rounded-xl shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#ff1e90] active:translate-y-0.5 transition-all cursor-pointer"
            >
              Explore Our Deliverables ⚡
            </Link>
          </div>
        </div>

        {/* Right Column: Editorial Team Portraits (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          
          {/* Portrait 1: Lead Architect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="bg-white border-[2.5px] border-black p-4 pb-6 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,0.05)] hover:shadow-[6px_6px_0px_#ff1e90] transition-all duration-400 group relative overflow-hidden"
          >
            <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-zinc-100 border-[2px] border-black mb-4 relative">
              <img 
                src="/images/headshot_primary.png" 
                alt="Abhishek Tiwari - Lead Systems Architect"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-display font-black text-xs text-black uppercase block">Abhishek Tiwari</span>
                <span className="font-mono text-[7px] font-bold text-[#ff1e90] uppercase border border-[#ff1e90]/20 bg-[#ff1e90]/5 px-1.5 py-0.5 rounded">HQ OPERATOR</span>
              </div>
              <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block font-bold">Lead Systems Architect</span>
              <p className="font-sans text-[11px] text-zinc-500 leading-relaxed pt-1.5 border-t border-zinc-100">
                Direct studio operator. Compiles Next.js edge routers, type-safe API routing, and deploys scalable systems architectures.
              </p>
            </div>
          </motion.div>

          {/* Portrait 2: Creative Director */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="bg-white border-[2.5px] border-black p-4 pb-6 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,0.05)] hover:shadow-[6px_6px_0px_#d8ff42] transition-all duration-400 group relative overflow-hidden sm:mt-10"
          >
            <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-zinc-100 border-[2px] border-black mb-4 relative">
              <img 
                src="/images/headshot_creative.png" 
                alt="Creative Director - Visual & 3D Engineering"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-display font-black text-xs text-black uppercase block">Creative Director</span>
                <span className="font-mono text-[7px] font-bold text-green-700 uppercase border border-green-200 bg-green-50 px-1.5 py-0.5 rounded">VISUAL CORE</span>
              </div>
              <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block font-bold">Visual &amp; 3D Engineering</span>
              <p className="font-sans text-[11px] text-zinc-500 leading-relaxed pt-1.5 border-t border-zinc-100">
                Architects surrealist 3D layouts, GLSL shader choreography, responsive typography grids, and creates custom user experience.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
