"use client";

import { useScrollStore } from "@/lib/stores/scroll-store";
import { TiltCard } from "@/components/3d/tilt-card";

export default function PhilosophyPage() {
  const theme = useScrollStore((s) => s.theme);
  
  let cardClass = "bg-white border-4 border-black text-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all";
  let textPrimary = "text-black";
  let textSecondary = "text-neutral-800 font-bold";
  let accentTag = "bg-[#ff0080] text-white border-2 border-black";
  
  if (theme === "cyber-dark") {
    cardClass = "bg-[#ccff00] border-4 border-black text-black shadow-[12px_12px_0px_0px_#ff0080] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all";
    textPrimary = "text-black";
    textSecondary = "text-neutral-900 font-bold";
    accentTag = "bg-black text-[#ccff00] border-2 border-black";
  } else if (theme === "mono") {
    cardClass = "bg-black border-4 border-white text-white shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all";
    textPrimary = "text-white";
    textSecondary = "text-neutral-300 font-bold";
    accentTag = "bg-white text-black border-2 border-white";
  } else if (theme === "solar") {
    cardClass = "bg-[#ff5500] border-4 border-black text-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all";
    textPrimary = "text-black";
    textSecondary = "text-neutral-900 font-bold";
    accentTag = "bg-black text-[#ffcc00] border-2 border-black";
  }

  return (
    <div className="w-full min-h-[180vh] flex flex-col px-6 md:px-12 py-20 z-20 relative pointer-events-auto max-w-7xl mx-auto space-y-32">
      
      {/* Dynamic Background Sticker */}
      <div className="fixed top-[30%] right-[10%] rotate-12 z-0 opacity-15 pointer-events-none">
        <h2 className="text-[12rem] md:text-[18rem] font-black text-transparent select-none" style={{ WebkitTextStroke: theme === 'cyber-dark' ? '4px #ccff00' : '4px black' }}>
          CORE
        </h2>
      </div>

      {/* Section 1: Brand Philosophy (Left Aligned, Logo on Right) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full min-h-[80vh] items-center relative z-10 pt-20">
        <TiltCard intensity={15} className={`md:col-span-6 space-y-8 p-10 md:p-14 border-4 ${cardClass}`}>
          <span className={`font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1 ${accentTag} inline-block`}>
            01 // Brand Philosophy
          </span>
          <h3 className={`text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase ${textPrimary}`}>
            Systemic <br/>Architecture
          </h3>
          <p className={`font-mono text-xs ${textSecondary} leading-relaxed`}>
            At Vistar, we reject conventional boundaries. We build software that acts as a physical metaphor: perfectly symmetric, logical, and structurally optimized.
          </p>
          <p className={`font-mono text-xs ${textSecondary} leading-relaxed`}>
            By translating dynamic 3D physics directly into full-stack compile targets, we achieve absolute latency removal. A premium aesthetic that operates with rigorous mathematical order.
          </p>
        </TiltCard>
        
        {/* Placeholder column where the 3D logo remains visible */}
        <div className="hidden md:block md:col-span-6 h-full" />
      </section>

      {/* Section 2: Mathematical Fluidity (Right Aligned, Logo shifts on scroll) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full min-h-[80vh] items-center relative z-10">
        <div className="hidden md:block md:col-span-6 h-full" />

        <TiltCard intensity={15} className={`md:col-span-6 space-y-8 p-10 md:p-14 border-4 ${cardClass}`}>
          <span className={`font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1 ${accentTag} inline-block`}>
            02 // Mathematical Fluidity
          </span>
          <h3 className={`text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase ${textPrimary}`}>
            Optimal <br/>Execution
          </h3>
          <p className={`font-mono text-xs ${textSecondary} leading-relaxed`}>
            Software is not a flat canvas. It is a live domain of interactive particles and floating vectors. We build custom mathematical algorithms and custom GLSL shaders that optimize the runtime experience.
          </p>
          <p className={`font-mono text-xs ${textSecondary} leading-relaxed`}>
            Our visual systems bypass standard CSS rendering threads entirely, dispatching calculations straight to the GPU at 144Hz. Heavy-duty engineering for radical digital acceleration.
          </p>
        </TiltCard>
      </section>

      {/* Section 3: Aggressive Simplicity */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full min-h-[80vh] items-center relative z-10 pb-20">
        <TiltCard intensity={15} className={`md:col-span-6 space-y-8 p-10 md:p-14 border-4 ${cardClass}`}>
          <span className={`font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1 ${accentTag} inline-block`}>
            03 // Aggressive Simplicity
          </span>
          <h3 className={`text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase ${textPrimary}`}>
            Defying <br/>Parameters
          </h3>
          <p className={`font-mono text-xs ${textSecondary} leading-relaxed`}>
            We believe in high-impact minimalism. Clean, highly structured layouts framed inside bold border strokes. Absolute clarity in software structure leads to zero transactional friction.
          </p>
          <div className="pt-4">
            <span className={`font-mono text-md font-black uppercase tracking-wider border-b-4 pb-1 inline-block ${theme === 'mono' ? 'border-white text-white' : 'border-black text-black'}`}>
              [ LATENCY_ZERO // PARADIGM ]
            </span>
          </div>
        </TiltCard>
        
        <div className="hidden md:block md:col-span-6 h-full" />
      </section>
      
    </div>
  );
}
