"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollStore } from "@/lib/stores/scroll-store";
import { ThemeOverlay } from "@/components/theme-overlay";

export default function VectorsPage() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    const updateStyles = (progress: number) => {
      // 1. Calculate and update inline style variables via refs
      // Card 1
      const op1 = progress <= 0.15 ? 1 : progress > 0.22 ? 0 : 1 - (progress - 0.15) / 0.07;
      const tr1 = progress > 0.22 ? -30 : 0;
      if (ref1.current) {
        ref1.current.style.setProperty("--card-opacity", String(op1));
        ref1.current.style.setProperty("--card-transform", `translate3d(0, ${tr1}px, 0)`);
      }

      // Card 2
      const op2 = (progress < 0.22 || progress > 0.48) ? 0 : (progress >= 0.29 && progress <= 0.41) ? 1 : progress < 0.29 ? (progress - 0.22) / 0.07 : 1 - (progress - 0.41) / 0.07;
      const tr2 = progress < 0.22 ? 30 : progress > 0.48 ? -30 : 0;
      if (ref2.current) {
        ref2.current.style.setProperty("--card-opacity", String(op2));
        ref2.current.style.setProperty("--card-transform", `translate3d(0, ${tr2}px, 0)`);
      }

      // Card 3
      const op3 = (progress < 0.48 || progress > 0.74) ? 0 : (progress >= 0.55 && progress <= 0.67) ? 1 : progress < 0.55 ? (progress - 0.48) / 0.07 : 1 - (progress - 0.67) / 0.07;
      const tr3 = progress < 0.48 ? 30 : progress > 0.74 ? -30 : 0;
      if (ref3.current) {
        ref3.current.style.setProperty("--card-opacity", String(op3));
        ref3.current.style.setProperty("--card-transform", `translate3d(0, ${tr3}px, 0)`);
      }

      // Card 4
      const op4 = progress < 0.74 ? 0 : (progress >= 0.81 && progress <= 0.95) ? 1 : progress < 0.81 ? (progress - 0.74) / 0.07 : 1 - (progress - 0.95) / 0.05;
      const tr4 = progress < 0.74 ? 30 : progress > 0.95 ? -30 : 0;
      if (ref4.current) {
        ref4.current.style.setProperty("--card-opacity", String(op4));
        ref4.current.style.setProperty("--card-transform", `translate3d(0, ${tr4}px, 0)`);
      }

      // 2. Set active phase index for display toggle
      let activeIdx = 0;
      if (progress <= 0.22) activeIdx = 0;
      else if (progress <= 0.48) activeIdx = 1;
      else if (progress <= 0.74) activeIdx = 2;
      else activeIdx = 3;
      setActiveIndex(activeIdx);

      // 3. Set visibility for scroll indicator
      setShowIndicator(progress <= 0.95);
    };

    // Initialize values immediately on mount
    updateStyles(useScrollStore.getState().scrollProgress);

    // Subscribe to global scroll changes
    const unsubscribe = useScrollStore.subscribe((state) => {
      updateStyles(state.scrollProgress);
    });

    return unsubscribe;
  }, []);

  const cardClass = "bg-white border border-zinc-200 shadow-[3px_3px_0px_rgba(12,12,14,0.06)] rounded";

  return (
    <div className="w-full h-[400vh] relative z-20">
      <ThemeOverlay />

      {/* Background Grid */}
      <div className="fixed inset-0 z-[-1] opacity-5 pointer-events-none system-grid" />

      <div className="sticky top-0 h-screen w-full flex items-center px-6 md:px-12 pointer-events-none">
        <div className="w-full max-w-6xl mx-auto relative h-auto min-h-[440px] md:h-[460px] flex items-center justify-center">
          
          {/* Step 1: 01 / SYSTEMIC DISCOVERY (0.0 – 0.22) */}
          <div 
            ref={ref1}
            className={`space-y-4 p-8 md:p-10 border w-full relative md:absolute left-0 top-0 md:top-1/2 md:-translate-y-1/2 md:w-[42%] md:left-0 md:right-auto md:translate-x-0 vectors-card-dynamic ${
              activeIndex === 0 ? "pointer-events-auto" : "pointer-events-none"
            } ${cardClass} ${activeIndex === 0 ? "block" : "hidden md:block"}`}
          >
            <div className="flex justify-between items-center text-left">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#ff1e90]">
                Phase 01
              </span>
              <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Discovery</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl uppercase font-semibold text-left text-black">
              Systemic Discovery
            </h3>
            <p className="font-sans text-xs md:text-sm text-left text-zinc-650 leading-relaxed">
              We map your commercial targets to visual conversion strategies. We outline the precise parameter variables, user session flows, and data architecture scopes needed to capture high-ticket clients.
            </p>
            <div className="flex gap-3 font-mono text-[8px] font-bold text-zinc-400 pt-2 justify-start uppercase">
              <span>OUTPUT: STRATEGY MATRIX</span>
              <span>/</span>
              <span>TIME: WEEK 1</span>
            </div>
          </div>

          {/* Step 2: 02 / CINEMATIC PROTOTYPING (0.22 – 0.48) */}
          <div 
            ref={ref2}
            className={`space-y-4 p-8 md:p-10 border w-full relative md:absolute left-0 md:left-auto md:right-0 top-0 md:top-1/2 md:-translate-y-1/2 md:w-[42%] vectors-card-dynamic ${
              activeIndex === 1 ? "pointer-events-auto" : "pointer-events-none"
            } ${cardClass} ${activeIndex === 1 ? "block" : "hidden md:block"}`}
          >
            <div className="flex justify-between items-center text-left">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#ff1e90]">
                Phase 02
              </span>
              <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Design</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl uppercase font-semibold text-left text-black">
              Cinematic Prototyping
            </h3>
            <p className="font-sans text-xs md:text-sm text-left text-zinc-650 leading-relaxed">
              We construct high-fidelity interactive 3D concepts and web layouts. By rendering responsive wireframes and custom WebGL models early on, you interact with the actual user interface experience before development starts.
            </p>
            <div className="flex gap-3 font-mono text-[8px] font-bold text-zinc-400 pt-2 justify-start uppercase">
              <span>OUTPUT: 3D WIREFRAMES</span>
              <span>/</span>
              <span>TIME: WEEKS 2-3</span>
            </div>
          </div>

          {/* Step 3: 03 / HIGH-FIDELITY DEPLOYMENT (0.48 – 0.74) */}
          <div 
            ref={ref3}
            className={`space-y-4 p-8 md:p-10 border w-full relative md:absolute left-0 top-0 md:top-1/2 md:-translate-y-1/2 md:w-[42%] md:left-0 md:right-auto md:translate-x-0 vectors-card-dynamic ${
              activeIndex === 2 ? "pointer-events-auto" : "pointer-events-none"
            } ${cardClass} ${activeIndex === 2 ? "block" : "hidden md:block"}`}
          >
            <div className="flex justify-between items-center text-left">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#ff1e90]">
                Phase 03
              </span>
              <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Build</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl uppercase font-semibold text-left text-black">
              High-Fidelity Build
            </h3>
            <p className="font-sans text-xs md:text-sm text-left text-zinc-650 leading-relaxed">
              Our engineering team builds modular, production-ready React structures. All styles and assets are compiled straight to the edge for rapid loading, locked animations, and flawless keyboard accessibility.
            </p>
            <div className="flex gap-3 font-mono text-[8px] font-bold text-zinc-400 pt-2 justify-start uppercase">
              <span>COMPILER: NEXT.js EDGE</span>
              <span>/</span>
              <span>TIME: WEEKS 4-6</span>
            </div>
          </div>

          {/* Step 4: 04 / LATENCY OPTIMIZATION (0.74 – 1.0) */}
          <div 
            ref={ref4}
            className={`space-y-4 p-8 md:p-10 border w-full relative md:absolute left-0 md:left-auto md:right-0 top-0 md:top-1/2 md:-translate-y-1/2 md:w-[42%] vectors-card-dynamic ${
              activeIndex === 3 ? "pointer-events-auto" : "pointer-events-none"
            } ${cardClass} ${activeIndex === 3 ? "block" : "hidden md:block"}`}
          >
            <div className="flex justify-between items-center text-left">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#ff1e90]">
                Phase 04
              </span>
              <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Optimize</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl uppercase font-semibold text-left text-black">
              Latency Optimization
            </h3>
            <p className="font-sans text-xs md:text-sm text-left text-zinc-650 leading-relaxed">
              We run speed audits and security testing. We fine-tune CDN caching and code execution threads, ensuring a highly performant application that delivers flawless conversions.
            </p>
            <div className="flex gap-3 font-mono text-[8px] font-bold text-zinc-400 pt-2 justify-start uppercase">
              <span>SLA: 24HR RESPONSE</span>
              <span>/</span>
              <span>TIME: WEEK 7</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Scroll indicator prompt */}
      <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 transition-opacity duration-300 ${showIndicator ? "opacity-100" : "opacity-0"}`}>
        <div className="font-display text-xs font-semibold uppercase tracking-widest text-zinc-400 animate-bounce select-none">
          Scroll to explore our workflow
        </div>
        <div className="w-[1px] h-6 bg-zinc-300 mx-auto mt-2" />
      </div>
    </div>
  );
}
