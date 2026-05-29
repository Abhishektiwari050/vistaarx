"use client";

import { useScrollStore } from "@/lib/stores/scroll-store";
import { TiltCard } from "@/components/3d/tilt-card";
import Link from "next/link";

export default function AboutPage() {
  const theme = useScrollStore((s) => s.theme);
  
  let cardClass = "bg-white border-4 border-black text-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
  let textPrimary = "text-black";
  let textSecondary = "text-neutral-700 font-medium";
  let accentTag = "bg-[#ff0080] text-white border-2 border-black";
  let borderClass = "border-black";
  
  if (theme === "cyber-dark") {
    cardClass = "bg-[#ccff00] border-4 border-black text-black shadow-[12px_12px_0px_0px_#ff0080] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
    textPrimary = "text-black";
    textSecondary = "text-neutral-900 font-medium";
    accentTag = "bg-black text-[#ccff00] border-2 border-black";
    borderClass = "border-black";
  } else if (theme === "mono") {
    cardClass = "bg-black border-4 border-white text-white shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
    textPrimary = "text-white";
    textSecondary = "text-neutral-300 font-medium";
    accentTag = "bg-white text-black border-2 border-white";
    borderClass = "border-white";
  } else if (theme === "solar") {
    cardClass = "bg-[#ff5500] border-4 border-black text-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
    textPrimary = "text-black";
    textSecondary = "text-neutral-900 font-medium";
    accentTag = "bg-black text-[#ffcc00] border-2 border-black";
    borderClass = "border-black";
  }

  return (
    <div className="w-full min-h-[180vh] flex flex-col px-6 md:px-12 py-20 z-20 relative pointer-events-auto max-w-7xl mx-auto space-y-32">
      {/* Native dynamic React 19 document title */}
      <title>About Us // Vistar Studio</title>
      <meta name="description" content="Meet the expert software engineers and designers behind Vistar Studio, building high-performance 3D visual architectures." />

      {/* Dynamic Background Sticker */}
      <div className="fixed top-[30%] right-[10%] rotate-12 z-0 opacity-15 pointer-events-none select-none">
        <h2 className="text-[12rem] md:text-[18rem] font-black text-transparent" style={{ WebkitTextStroke: theme === 'cyber-dark' ? '4px #ccff00' : '4px black' }}>
          CORE
        </h2>
      </div>

      {/* Section 1: Team Story (Left Aligned, Logo on Right) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full min-h-[80vh] items-center relative z-10 pt-16">
        <TiltCard intensity={10} className={`md:col-span-6 space-y-8 p-10 md:p-14 border-4 ${cardClass}`}>
          <span className={`font-mono text-[9px] font-black uppercase tracking-widest px-3 py-1 ${accentTag} inline-block`}>
            01 // WHO WE ARE
          </span>
          <h3 className={`text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] uppercase ${textPrimary}`}>
            MEET THE <br/>ARCHITECTS
          </h3>
          <p className={`font-sans text-xs md:text-sm ${textSecondary} leading-relaxed`}>
            Vistar Studio is an elite boutique digital engineering laboratory. We are not a bloated generalist agency. We are a tightly knit team of senior developers and visual artists who believe in engineering excellence, mathematical precision, and commercial impact.
          </p>
          <p className={`font-sans text-xs md:text-sm ${textSecondary} leading-relaxed`}>
            Founded by industry veterans with over 10,000+ hours of experience designing enterprise software, high-speed graphics interfaces, and global database pipelines. We build systems that perform, convert, and scale.
          </p>
        </TiltCard>
        
        {/* Empty column where the 3D logo tumbles in the background */}
        <div className="hidden md:block md:col-span-6 h-full" />
      </section>

      {/* Section 2: Founder Profiles & Legitimacy (Right Aligned, Logo shifts LEFT on scroll) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full min-h-[80vh] items-center relative z-10">
        <div className="hidden md:block md:col-span-6 h-full" />

        <TiltCard intensity={10} className={`md:col-span-6 space-y-8 p-10 md:p-14 border-4 ${cardClass} flex flex-col justify-between`}>
          <div>
            <span className={`font-mono text-[9px] font-black uppercase tracking-widest px-3 py-1 ${accentTag} inline-block mb-6`}>
              02 // FOUNDING PRINCIPLE
            </span>
            <h3 className={`text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] uppercase ${textPrimary} mb-6`}>
              HUMAN-CENTRIC <br/>ENGINEERING
            </h3>
            
            {/* Symmetrical Brutalist Frame for Founder Bio details */}
            <div className={`p-5 border-2 ${borderClass} bg-black/5 dark:bg-white/5 space-y-4 font-sans text-xs mb-6`}>
              <div className="flex gap-4 items-start">
                {/* Visual Placeholder container representing founder */}
                <div className={`w-14 h-14 border-2 ${borderClass} bg-neutral-200 dark:bg-zinc-800 flex items-center justify-center font-mono font-black text-lg select-none shrink-0`}>
                  AT
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-tight text-sm">Abhishek Tiwari</h4>
                  <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Chief Software Architect</p>
                  <p className={`mt-2 ${textSecondary} leading-relaxed text-[11px]`}>
                    Over 8 years of enterprise full-stack experience. Dedicated to bridging dynamic WebGL interactive layers with low-latency backend engines to achieve flawless commercial runtimes.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <p className={`font-sans text-xs md:text-sm ${textSecondary} leading-relaxed`}>
            We pride ourselves on direct transparency: the engineers who write the architectures are the ones you deal with directly. No account managers, no jargon buffers. Just direct results.
          </p>
        </TiltCard>
      </section>

      {/* Section 3: Core Methodology */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full min-h-[80vh] items-center relative z-10 pb-16">
        <TiltCard intensity={10} className={`md:col-span-6 space-y-8 p-10 md:p-14 border-4 ${cardClass}`}>
          <span className={`font-mono text-[9px] font-black uppercase tracking-widest px-3 py-1 ${accentTag} inline-block`}>
            03 // METHODOLOGY
          </span>
          <h3 className={`text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] uppercase ${textPrimary}`}>
            OUR SYSTEMIC <br/>METHOD
          </h3>
          <p className={`font-sans text-xs md:text-sm ${textSecondary} leading-relaxed`}>
            We treat digital architecture as physical infrastructure. Layout structures are locked to mathematically clean proportions. Visual calculations bypass legacy browser layouts, processing straight to GPU.
          </p>
          <p className={`font-sans text-xs md:text-sm ${textSecondary} leading-relaxed`}>
            This rigorous methodology guarantees that your website will load instantly, react to fluid gestures at 144Hz, and operate with zero downtime.
          </p>
          <div className="pt-4 flex items-center gap-4">
            <Link 
              href="/contact"
              className={`px-5 py-3 font-mono text-xs font-black uppercase tracking-wider border-2 hover:-translate-y-0.5 transition-all ${
                theme === 'mono' 
                  ? 'bg-white text-black border-white' 
                  : theme === 'cyber-dark'
                  ? 'bg-[#ccff00] text-black border-[#ccff00]'
                  : 'bg-black text-white border-black'
              }`}
            >
              Collaborate With Us →
            </Link>
          </div>
        </TiltCard>
        
        <div className="hidden md:block md:col-span-6 h-full" />
      </section>
      
    </div>
  );
}
