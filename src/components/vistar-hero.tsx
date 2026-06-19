"use client";

import React, { useRef, useState, useEffect } from "react";

function LocalClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return <span>00:00 AM</span>;
  return <span>{time}</span>;
}
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "@/components/split-text";
import { MagneticButton } from "@/components/magnetic-button";
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

      {/* Background Atmosphere overlay from Superdesign */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-20 mix-blend-overlay">
        <img 
          src="https://framerusercontent.com/images/9zvwRJAavKKacVyhFCwHyXW1U.png?width=1536&height=1024" 
          alt="Atmosphere Texture" 
          className="w-full h-full object-cover object-center" 
        />
      </div>

      {/* Surrealist floating hand left */}
      <motion.div
        animate={{ 
          y: [-12, 12, -12], 
          rotate: [0, 1.5, -1.5, 0] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 12, 
          ease: "easeInOut" 
        }}
        className="absolute -left-[12%] top-[-8%] md:left-[-5%] md:top-[-10%] w-[42vw] md:w-[28vw] max-w-[550px] z-10 pointer-events-none opacity-25 md:opacity-40 mix-blend-darken select-none"
      >
        <img 
          src="https://framerusercontent.com/images/KNhiA5A2ykNYqNkj04Hk6BVg5A.png?width=1540&height=1320" 
          alt="Vistar Reaching Hand" 
          className="w-full h-auto object-contain filter drop-shadow-[0_0_25px_rgba(216,255,66,0.25)]" 
        />
      </motion.div>

      {/* Surrealist floating hand right */}
      <motion.div
        animate={{ 
          y: [12, -12, 12], 
          rotate: [0, -1.5, 1.5, 0] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 14, 
          ease: "easeInOut" 
        }}
        className="absolute -right-[12%] bottom-[-5%] md:right-[-4%] md:bottom-[-2%] w-[38vw] md:w-[25vw] max-w-[480px] z-10 pointer-events-none opacity-25 md:opacity-40 mix-blend-darken select-none"
      >
        <img 
          src="https://framerusercontent.com/images/X89VFCABCEjjZ4oLGa3PjbOmsA.png?width=1542&height=1002" 
          alt="Vistar Receiving Hand" 
          className="w-full h-auto object-contain filter drop-shadow-[0_0_25px_rgba(255,30,144,0.2)]" 
        />
      </motion.div>

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
            className="max-w-[340px] space-y-4 bg-white border-[2.5px] border-black p-6 rounded-xl shadow-[4px_4px_0px_#d8ff42] transition-transform hover:-translate-y-1"
          >
            <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3.5 py-1.5 rounded-md text-[9px] font-mono font-black tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#000000]">
              <span className="w-2 h-2 rounded-full bg-[#d8ff42] border border-black animate-pulse" />
              STATUS: OPERATIONAL // 2026
            </div>
            <p className="text-[13px] text-black leading-relaxed font-medium font-sans">
              We engineer high-fidelity digital platforms and core workflow systems. Zero templates. Zero overhead. Pure, performance-first code.
            </p>
          </motion.div>
          
          <div className="overflow-hidden select-none">
            <SplitText
              text="Bespoke"
              direction="down"
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
            <SplitText text="Web" direction="down" delay={0.1} />
            <SplitText text="Platforms" direction="down" delay={0.15} />
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
            <SplitText text="Code" direction="down" delay={0.2} />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-[360px] flex flex-col gap-5 bg-white border-[2.5px] border-black p-6 rounded-xl shadow-[4px_4px_0px_#ff1e90] transition-transform hover:-translate-y-1"
          >
            <p className="text-[13px] text-black leading-relaxed font-medium font-sans">
              Compiling sub-second edge pages, custom API integrations, and AI-discovery architectures. Complete source handover from day one.
            </p>
            <div className="flex gap-3">
              <MagneticButton>
                <a
                  href="/contact"
                  className="bg-[#d8ff42] text-black font-sans font-black text-[10px] tracking-widest uppercase px-6 py-4 border-2 border-black rounded-xl shadow-[3px_3px_0px_#000000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0px_#ff1e90] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer inline-block text-center"
                >
                  Start Project ⚡
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#services"
                  className="bg-white text-black font-sans font-black text-[10px] tracking-widest uppercase px-6 py-4 border-2 border-black rounded-xl shadow-[3px_3px_0px_#000000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0px_#ff1e90] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer inline-block"
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
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e90] animate-pulse" />
          <LocalClock />
          <span>· NEW DELHI, INDIA</span>
        </span>
        <span className="hidden sm:inline">●</span>
        <span>NO LOCK-IN · 100% OWNERSHIP</span>
      </div>
    </section>
  );
}

export default VistarHero;

