"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "@/components/split-text";
import { MagneticButton } from "@/components/magnetic-button";
import { ShimmerButton } from "@/components/shimmer-button";
import { AuroraBackground } from "@/components/aurora-background";
import { InteractiveHero3D } from "@/components/3d/interactive-hero-3d";
import { TextScramble } from "@/components/text-scramble";

export function VistarHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the hero section for scroll-to-scale
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-32 pb-16 px-6 sm:px-12"
    >
      {/* Premium Aurora & Beams Background */}
      <AuroraBackground className="absolute inset-0 z-0" />

      {/* Decorative Editorial Lines */}
      <div className="absolute top-12 right-12 pointer-events-none opacity-20 hidden md:block z-10">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="text-zinc-400">
          <path d="M10,10 L90,10 M90,10 L90,90 M90,90 L10,90 M10,90 L10,10" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
        </svg>
      </div>

      <motion.div 
        style={{ scale, opacity, y }}
        className="max-w-6xl w-full mx-auto my-auto relative z-10 flex flex-col gap-12 sm:gap-16"
      >
        
        {/* Row 1: Left Description + Giant Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-[320px] space-y-3 bg-white/40 backdrop-blur-md border border-zinc-200/50 p-6 rounded-2xl shadow-[6px_6px_20px_rgba(0,0,0,0.015)]"
          >
            <div className="inline-flex items-center gap-2 border border-black/10 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-[9px] font-bold tracking-[2px] uppercase text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e90] animate-pulse" />
              Open for Projects · 2026
            </div>
            <p className="text-[12px] text-zinc-600 leading-relaxed font-normal font-sans">
              We engineer fully bespoke digital platforms and workflow systems. Zero templates. Just clean, optimized code.
            </p>
          </motion.div>
          
          <div className="overflow-hidden select-none">
            <TextScramble
              text="Bespoke"
              delay={0.1}
              className="font-display font-bold uppercase text-5xl sm:text-7xl lg:text-[8rem] leading-none tracking-tighter text-[#0a0a0a]"
            />
          </div>
        </div>

        {/* Row 2: Giant Typography with Interactive 3D Star Component */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h1
            className="font-display font-bold uppercase text-5xl sm:text-7xl lg:text-[8rem] leading-none tracking-tighter text-[#0a0a0a] flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <SplitText text="Web" delay={0.1} />
            <span className="inline-flex items-center justify-center relative w-16 h-16 sm:w-24 sm:h-24 select-none">
              <InteractiveHero3D />
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
            className="max-w-[360px] flex flex-col gap-5 bg-white/40 backdrop-blur-md border border-zinc-200/50 p-6 rounded-2xl shadow-[6px_6px_20px_rgba(0,0,0,0.015)]"
          >
            <p className="text-[12px] text-zinc-600 leading-relaxed font-normal font-sans">
              We compile light-speed pages, custom backend integrations, and search sitemaps. Complete source code handover from day one.
            </p>
            <div className="flex gap-3">
              <MagneticButton>
                <ShimmerButton
                  type="button"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-4 text-[10px]"
                >
                  Start Project ⚡
                </ShimmerButton>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#services"
                  className="border border-black/10 bg-white/80 backdrop-blur-sm text-zinc-600 text-[10px] font-bold tracking-widest uppercase px-5 py-4 rounded-full hover:bg-white hover:text-black transition-all cursor-pointer active:scale-95 inline-block font-sans"
                >
                  Services →
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </div>

      </motion.div>

      {/* Metric/Quotation Reference Footer Row */}
      <div className="max-w-6xl w-full mx-auto border-t border-black/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-mono tracking-widest uppercase text-zinc-400 relative z-10">
        <span>REF: VSTR-Q2-2026</span>
        <span className="hidden sm:inline">●</span>
        <span>CORE PLATFORM ENGINEERING</span>
        <span className="hidden sm:inline">●</span>
        <span>NO LOCK-IN · 100% OWNERSHIP</span>
      </div>
    </section>
  );
}

export default VistarHero;

