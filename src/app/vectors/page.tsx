"use client";

import { useScrollStore } from "@/lib/stores/scroll-store";
import { ThemeOverlay } from "@/components/theme-overlay";
import { ManhwaSpeechBubble } from "@/components/manhwa/manhwa-panel";

export default function VectorsPage() {
  const scrollProgress = useScrollStore((s) => s.scrollProgress);
  const theme = useScrollStore((s) => s.theme);
  
  const deepDiveProgress = scrollProgress; // Maps 0 to 1 over this whole page

  const isUpActive = deepDiveProgress <= 0.22;
  const isRightActive = deepDiveProgress > 0.22 && deepDiveProgress <= 0.48;
  const isDownActive = deepDiveProgress > 0.48 && deepDiveProgress <= 0.74;
  const isLeftActive = deepDiveProgress > 0.74;

  const cardClass = {
    "cyber-light": "bg-white/90 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] border-[3.5px]",
    "cyber-dark": "bg-black/90 border-[#ff0080] shadow-[6px_6px_0px_#ff0080] border-[3.5px]",
    mono: "bg-white border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] border-[3.5px]",
    solar: "bg-[#fcf6e8]/90 border-[#ff5500] shadow-[6px_6px_0px_#ff5500] border-[3.5px]",
  }[theme];
  
  const textPrimary = {
    "cyber-light": "text-neutral-900",
    "cyber-dark": "text-white",
    mono: "text-neutral-900",
    solar: "text-[#100501]",
  }[theme];

  const textSecondary = {
    "cyber-light": "text-neutral-800 font-extrabold",
    "cyber-dark": "text-zinc-200 font-extrabold",
    mono: "text-neutral-700 font-extrabold",
    solar: "text-[#ff5500] font-extrabold",
  }[theme];

  return (
    <div className="w-full h-[400vh] relative z-20">
      {/* Native dynamic React 19 document title */}
      <title>Our Process // Vistar Studio</title>
      <meta name="description" content="Discover how we work at Vistar Studio: a high-precision 4-step delivery workflow bridging cinematic design with bulletproof digital architectures." />

      <ThemeOverlay />

      <div className="sticky top-0 h-screen w-full flex items-center px-6 md:px-12 pointer-events-none">
        <div className="w-full max-w-6xl mx-auto relative h-[420px] md:h-[460px] flex items-center justify-center">
          
          {/* Step 1: 01 / SYSTEMIC DISCOVERY (0.0 – 0.22) */}
          <div 
            style={{
              opacity: deepDiveProgress <= 0.15 ? 1 : deepDiveProgress > 0.22 ? 0 : 1 - (deepDiveProgress - 0.15) / 0.07,
              transform: `translate3d(0, ${deepDiveProgress > 0.22 ? -30 : 0}px, 0)`,
              transition: "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
              pointerEvents: deepDiveProgress <= 0.22 ? "auto" : "none"
            }}
            className={`space-y-4 p-8 md:p-10 border rounded-2xl w-full absolute left-0 top-1/2 -translate-y-1/2 md:w-[42%] md:left-0 md:right-auto md:translate-x-0 ${cardClass} ${isUpActive ? 'block' : 'hidden md:block'}`}
          >
            <div className="flex justify-between items-center text-left">
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                Phase 01
              </span>
              <span className="font-mono text-[8px] text-zinc-500 font-bold uppercase tracking-wider">Discovery</span>
            </div>
            <h3 
              className="font-bangers text-[2.2rem] md:text-[2.8rem] uppercase leading-none tracking-wide text-left text-black dark:text-white"
              style={{ WebkitTextStroke: "1px #000" }}
            >
              Systemic Discovery
            </h3>
            <p className={`font-comic text-xs md:text-sm text-left ${textSecondary} leading-relaxed`}>
              We map your business goals to visual conversion strategies. No templates, no generic layouts. We outline the precise visual parameters, user flows, and backend capabilities needed to captivate your specific high-ticket audience.
            </p>
            <div className="flex gap-3 font-mono text-[9px] font-medium opacity-60 text-current pt-2 justify-start">
              <span>PHASE: STRATEGY MAP</span>
              <span>/</span>
              <span>TIME: WEEK 1</span>
            </div>
          </div>

          {/* Step 2: 02 / CINEMATIC PROTOTYPING (0.22 – 0.48) */}
          <div 
            style={{
              opacity: (deepDiveProgress < 0.22 || deepDiveProgress > 0.48) ? 0 : (deepDiveProgress >= 0.29 && deepDiveProgress <= 0.41) ? 1 : deepDiveProgress < 0.29 ? (deepDiveProgress - 0.22) / 0.07 : 1 - (deepDiveProgress - 0.41) / 0.07,
              transform: `translate3d(0, ${deepDiveProgress < 0.22 ? 30 : deepDiveProgress > 0.48 ? -30 : 0}px, 0)`,
              transition: "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
              pointerEvents: (deepDiveProgress >= 0.22 && deepDiveProgress <= 0.48) ? "auto" : "none"
            }}
            className={`space-y-4 p-8 md:p-10 border rounded-2xl w-full absolute left-0 md:left-auto md:right-0 top-1/2 -translate-y-1/2 md:w-[42%] ${cardClass} ${isRightActive ? 'block' : 'hidden md:block'}`}
          >
            <div className="flex justify-between items-center text-left">
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                Phase 02
              </span>
              <span className="font-mono text-[8px] text-zinc-500 font-bold uppercase tracking-wider">Design</span>
            </div>
            <h3 
              className="font-bangers text-[2.2rem] md:text-[2.8rem] uppercase leading-none tracking-wide text-left text-black dark:text-white"
              style={{ WebkitTextStroke: "1px #000" }}
            >
              Cinematic Prototyping
            </h3>
            <p className={`font-comic text-xs md:text-sm text-left ${textSecondary} leading-relaxed`}>
              We craft high-fidelity, interactive 3D concepts and bespoke design proposals. By rendering wireframes and custom WebGL models early on, you see, interact with, and approve the actual premium user experience before we write a single line of backend compiler code.
            </p>
            <div className="flex gap-3 font-mono text-[9px] font-medium opacity-60 text-current pt-2 justify-start">
              <span>OUTPUT: 3D MODELS</span>
              <span>/</span>
              <span>TIME: WEEKS 2-3</span>
            </div>
          </div>

          {/* Step 3: 03 / HIGH-FIDELITY DEPLOYMENT (0.48 – 0.74) */}
          <div 
            style={{
              opacity: (deepDiveProgress < 0.48 || deepDiveProgress > 0.74) ? 0 : (deepDiveProgress >= 0.55 && deepDiveProgress <= 0.67) ? 1 : deepDiveProgress < 0.55 ? (deepDiveProgress - 0.48) / 0.07 : 1 - (deepDiveProgress - 0.67) / 0.07,
              transform: `translate3d(0, ${deepDiveProgress < 0.48 ? 30 : deepDiveProgress > 0.74 ? -30 : 0}px, 0)`,
              transition: "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
              pointerEvents: (deepDiveProgress >= 0.48 && deepDiveProgress <= 0.74) ? "auto" : "none"
            }}
            className={`space-y-4 p-8 md:p-10 border rounded-2xl w-full absolute left-0 top-1/2 -translate-y-1/2 md:w-[42%] md:left-0 md:right-auto md:translate-x-0 ${cardClass} ${isDownActive ? 'block' : 'hidden md:block'}`}
          >
            <div className="flex justify-between items-center text-left">
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                Phase 03
              </span>
              <span className="font-mono text-[8px] text-zinc-500 font-bold uppercase tracking-wider">Build</span>
            </div>
            <h3 
              className="font-bangers text-[2.2rem] md:text-[2.8rem] uppercase leading-none tracking-wide text-left text-black dark:text-white"
              style={{ WebkitTextStroke: "1px #000" }}
            >
              High-Fidelity Deployment
            </h3>
            <p className={`font-comic text-xs md:text-sm text-left ${textSecondary} leading-relaxed`}>
              Our architects write production-ready, bulletproof Next.js code structures. All assets are compiled straight to the edge for lightning-fast page loading speeds, locked visual transitions, flawless keyboard accessibility, and absolute runtime stability.
            </p>
            <div className="flex gap-3 font-mono text-[9px] font-medium opacity-60 text-current pt-2 justify-start">
              <span>COMPILER: NEXT.js EDGE</span>
              <span>/</span>
              <span>TIME: WEEKS 4-6</span>
            </div>
          </div>

          {/* Step 4: 04 / LATENCY OPTIMIZATION (0.74 – 1.0) */}
          <div 
            style={{
              opacity: deepDiveProgress < 0.74 ? 0 : (deepDiveProgress >= 0.81 && deepDiveProgress <= 0.95) ? 1 : deepDiveProgress < 0.81 ? (deepDiveProgress - 0.74) / 0.07 : 1 - (deepDiveProgress - 0.95) / 0.05,
              transform: `translate3d(0, ${deepDiveProgress < 0.74 ? 30 : deepDiveProgress > 0.95 ? -30 : 0}px, 0)`,
              transition: "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
              pointerEvents: deepDiveProgress >= 0.74 ? "auto" : "none"
            }}
            className={`space-y-4 p-8 md:p-10 border rounded-2xl w-full absolute left-0 md:left-auto md:right-0 top-1/2 -translate-y-1/2 md:w-[42%] ${cardClass} ${isLeftActive ? 'block' : 'hidden md:block'}`}
          >
            <div className="flex justify-between items-center text-left">
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                Phase 04
              </span>
              <span className="font-mono text-[8px] text-zinc-500 font-bold uppercase tracking-wider">Optimize</span>
            </div>
            <h3 
              className="font-bangers text-[2.2rem] md:text-[2.8rem] uppercase leading-none tracking-wide text-left text-black dark:text-white"
              style={{ WebkitTextStroke: "1px #000" }}
            >
              Latency Optimization
            </h3>
            <p className={`font-comic text-xs md:text-sm text-left ${textSecondary} leading-relaxed`}>
              We run extensive conversion checks, speed diagnostics, and layout diagnostics. We fine-tune hardware integrations and direct memory caching, delivering a seamless experience that performs at peak speed and secures top conversions.
            </p>
            <div className="flex gap-3 font-mono text-[9px] font-medium opacity-60 text-current pt-2 justify-start">
              <span>SLA: 24HR READY</span>
              <span>/</span>
              <span>TIME: WEEK 7</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Scroll indicator prompt */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 transition-opacity duration-300" style={{ opacity: deepDiveProgress > 0.95 ? 0 : 1 }}>
        <div className="font-bangers text-lg uppercase tracking-wide text-neutral-500 animate-bounce select-none">
          Scroll to explore our workflow
        </div>
        <div className="w-[1.5px] h-6 bg-neutral-500/50 mx-auto mt-1" />
      </div>
    </div>
  );
}
