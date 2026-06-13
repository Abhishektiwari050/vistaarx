"use client";

import React from "react";
import { motion } from "framer-motion";
import { SplitText } from "@/components/split-text";
import { MagneticButton } from "@/components/magnetic-button";

export function VistarHero() {
  return (
    <section className="relative min-h-screen bg-[#faf9f5] flex flex-col justify-between overflow-hidden pt-32 pb-16 px-6 sm:px-12">
      {/* Editorial Dot Grid Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(circle,_#d3d1cb_1.5px,_transparent_1.5px)] [background-size:24px_24px]" />

      {/* Decorative Editorial Lines */}
      <div className="absolute top-12 right-12 pointer-events-none opacity-20 hidden md:block">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="text-zinc-400">
          <path d="M10,10 L90,10 M90,10 L90,90 M90,90 L10,90 M10,90 L10,10" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-[1100px] w-full mx-auto my-auto relative z-10 flex flex-col gap-12 sm:gap-16">
        
        {/* Row 1: Left Description + Giant Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-[290px] space-y-3"
          >
            <div className="inline-flex items-center gap-2 border border-black/10 bg-white/70 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-[9px] font-bold tracking-[2px] uppercase text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e90] animate-pulse" />
              Open for Projects · 2026
            </div>
            <p className="text-[12px] text-zinc-500 leading-relaxed font-light">
              We engineer fully bespoke digital platforms and workflow systems. Zero templates. Just clean, optimized code.
            </p>
          </motion.div>
          
          <div className="overflow-hidden">
            <SplitText
              text="Bespoke"
              className="font-display font-bold uppercase text-5xl sm:text-7xl lg:text-[8rem] leading-none tracking-tighter text-[#0a0a0a]"
            />
          </div>
        </div>

        {/* Row 2: Giant Typography with Vector Star SVG */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h1
            className="font-display font-bold uppercase text-5xl sm:text-7xl lg:text-[8rem] leading-none tracking-tighter text-[#0a0a0a] flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <SplitText text="Web" delay={0.1} />
            <span className="inline-flex items-center justify-center relative w-12 h-12 sm:w-20 sm:h-20 select-none">
              {/* Star Vector - High contrast black with a small glowing neon pink center */}
              <svg
                viewBox="0 0 24 24"
                className="absolute w-full h-full text-black fill-current animate-spin-slow"
              >
                <path d="M12,2 L14.5,9.5 L22,12 L14.5,14.5 L12,22 L9.5,14.5 L2,12 L9.5,9.5 Z" />
              </svg>
              <span className="absolute w-2.5 h-2.5 rounded-full bg-[#ff1e90] animate-pulse" />
            </span>
            <SplitText text="Platforms" delay={0.15} />
          </h1>
        </div>

        {/* Row 3: Giant Typography with Vector Arrow SVG + Right Description */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <h1
            className="font-display font-bold uppercase text-5xl sm:text-7xl lg:text-[8rem] leading-none tracking-tighter text-[#0a0a0a] flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <span className="font-serif italic font-light text-zinc-400">&amp;</span>
            <span className="inline-block">
              {/* Vectorized Right Arrow SVG Path */}
              <svg
                viewBox="0 0 24 24"
                className="w-14 h-14 sm:w-24 sm:h-24 text-[#ff1e90] stroke-current"
              >
                <path
                  d="M5,12 H19 M19,12 L13,6 M19,12 L13,18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </span>
            <SplitText text="Code" delay={0.2} />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-[320px] flex flex-col gap-5"
          >
            <p className="text-[12px] text-zinc-500 leading-relaxed font-light">
              We compile light-speed pages, custom backend integrations, and search sitemaps. Complete source code handover from day one.
            </p>
            <div className="flex gap-3">
              <MagneticButton>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-[#0a0a0a] text-[#d8ff42] text-[10px] font-bold tracking-widest uppercase px-6 py-4 rounded-full hover:bg-black/90 transition-all cursor-pointer shadow-[0_4px_20px_rgba(216,255,66,0.15)] active:scale-95"
                >
                  Start Project ⚡
                </button>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#services"
                  className="border border-black/10 bg-white/60 backdrop-blur-sm text-zinc-600 text-[10px] font-bold tracking-widest uppercase px-5 py-4 rounded-full hover:bg-white hover:text-black transition-all cursor-pointer active:scale-95 inline-block"
                >
                  Services →
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Metric/Quotation Reference Footer Row */}
      <div className="max-w-[1100px] w-full mx-auto border-t border-black/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-mono tracking-widest uppercase text-zinc-400 relative z-10">
        <span>REF: VSTR-Q2-2026</span>
        <span className="hidden sm:inline">●</span>
        <span>CORE PLATFORM ENGINEERING</span>
        <span className="hidden sm:inline">●</span>
        <span>NO LOCK-IN · 100% OWNERSHIP</span>
      </div>
    </section>
  );
}
