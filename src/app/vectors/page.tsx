"use client";

import { useScrollStore } from "@/lib/stores/scroll-store";
import { ThemeOverlay } from "@/components/theme-overlay";

export default function VectorsPage() {
  const scrollProgress = useScrollStore((s) => s.scrollProgress);
  const theme = useScrollStore((s) => s.theme);
  
  const deepDiveProgress = scrollProgress; // Maps 0 to 1 over this whole page

  const isUpActive = deepDiveProgress <= 0.22;
  const isRightActive = deepDiveProgress > 0.22 && deepDiveProgress <= 0.48;
  const isDownActive = deepDiveProgress > 0.48 && deepDiveProgress <= 0.74;
  const isLeftActive = deepDiveProgress > 0.74;

  const cardClass = {
    "cyber-light": "bg-white/40 border-white/40 text-neutral-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl ring-1 ring-black/5",
    "cyber-dark": "bg-black/40 border-white/10 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-2xl ring-1 ring-white/10",
    mono: "bg-white/60 border-neutral-200 text-neutral-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl rounded-2xl",
    solar: "bg-[#1a0f0a]/60 border-[#ff5500]/20 text-[#fff5eb] shadow-[0_8px_30px_rgba(255,85,0,0.1)] backdrop-blur-2xl ring-1 ring-[#ff5500]/20 rounded-2xl",
  }[theme];
  const textPrimary = {
    "cyber-light": "text-neutral-900",
    "cyber-dark": "text-white",
    mono: "text-neutral-900",
    solar: "text-[#fff5eb]",
  }[theme];
  const textSecondary = {
    "cyber-light": "text-neutral-600",
    "cyber-dark": "text-neutral-300",
    mono: "text-neutral-600",
    solar: "text-[#ffaa77]",
  }[theme];
  const highlightBg = {
    "cyber-light": "bg-black text-white rounded-full px-3 py-1 text-xs font-medium",
    "cyber-dark": "bg-white/10 text-white rounded-full px-3 py-1 text-xs font-medium border border-white/20",
    mono: "bg-neutral-100 text-neutral-800 rounded-full px-3 py-1 text-xs font-medium border border-neutral-200",
    solar: "bg-[#ff5500]/20 text-[#ffcc00] rounded-full px-3 py-1 text-xs font-medium border border-[#ff5500]/30",
  }[theme];
  const borderAccentPrimary = {
    "cyber-light": "border-black/10",
    "cyber-dark": "border-white/20",
    mono: "border-neutral-200",
    solar: "border-[#ff5500]/30",
  }[theme];
  const borderAccentSecondary = {
    "cyber-light": "border-black/5",
    "cyber-dark": "border-white/10",
    mono: "border-neutral-100",
    solar: "border-[#ff5500]/10",
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
            className={`space-y-6 p-10 border ${cardClass} backdrop-blur-2xl rounded-2xl w-full absolute left-0 top-1/2 -translate-y-1/2 border-t-2 ${borderAccentPrimary} md:w-[42%] md:left-0 md:right-auto md:translate-x-0 ${isUpActive ? 'block' : 'hidden md:block'}`}
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                Phase 01
              </span>
              <span className="font-mono text-[8px] text-zinc-500 font-bold uppercase tracking-wider">Discovery</span>
            </div>
            <h3 className={`text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] ${textPrimary}`}>
              Systemic<br/>Discovery
            </h3>
            <p className={`font-sans text-xs md:text-sm ${textSecondary} leading-relaxed font-light`}>
              We map your business goals to visual conversion strategies. No templates, no generic layouts. We outline the precise visual parameters, user flows, and backend capabilities needed to captivate your specific high-ticket audience.
            </p>
            <div className="flex gap-3 font-mono text-[9px] font-medium opacity-60 text-current pt-2">
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
            className={`space-y-6 p-10 border ${cardClass} backdrop-blur-2xl rounded-2xl w-full absolute left-0 md:left-auto md:right-0 top-1/2 -translate-y-1/2 border-r-2 ${borderAccentSecondary} md:w-[42%] ${isRightActive ? 'block' : 'hidden md:block'}`}
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                Phase 02
              </span>
              <span className="font-mono text-[8px] text-zinc-500 font-bold uppercase tracking-wider">Design</span>
            </div>
            <h3 className={`text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] ${textPrimary}`}>
              Cinematic<br/>Prototyping
            </h3>
            <p className={`font-sans text-xs md:text-sm ${textSecondary} leading-relaxed font-light`}>
              We craft high-fidelity, interactive 3D concepts and bespoke design proposals. By rendering wireframes and custom WebGL models early on, you see, interact with, and approve the actual premium user experience before we write a single line of backend compiler code.
            </p>
            <div className="flex gap-3 font-mono text-[9px] font-medium opacity-60 text-current pt-2">
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
            className={`space-y-6 p-10 border ${cardClass} backdrop-blur-2xl rounded-2xl w-full absolute left-0 top-1/2 -translate-y-1/2 border-b-2 ${borderAccentPrimary} md:w-[42%] md:left-0 md:right-auto md:translate-x-0 ${isDownActive ? 'block' : 'hidden md:block'}`}
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                Phase 03
              </span>
              <span className="font-mono text-[8px] text-zinc-500 font-bold uppercase tracking-wider">Build</span>
            </div>
            <h3 className={`text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] ${textPrimary}`}>
              High-Fidelity<br/>Deployment
            </h3>
            <p className={`font-sans text-xs md:text-sm ${textSecondary} leading-relaxed font-light`}>
              Our architects write production-ready, bulletproof Next.js code structures. All assets are compiled straight to the edge for lightning-fast page loading speeds, locked visual transitions, flawless keyboard accessibility, and absolute runtime stability.
            </p>
            <div className="flex gap-3 font-mono text-[9px] font-medium opacity-60 text-current pt-2">
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
            className={`space-y-6 p-10 border ${cardClass} backdrop-blur-2xl rounded-2xl w-full absolute left-0 md:left-auto md:right-0 top-1/2 -translate-y-1/2 border-l-2 ${borderAccentSecondary} md:w-[42%] ${isLeftActive ? 'block' : 'hidden md:block'}`}
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                Phase 04
              </span>
              <span className="font-mono text-[8px] text-zinc-500 font-bold uppercase tracking-wider">Optimize</span>
            </div>
            <h3 className={`text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] ${textPrimary}`}>
              Latency<br/>Optimization
            </h3>
            <p className={`font-sans text-xs md:text-sm ${textSecondary} leading-relaxed font-light`}>
              We run extensive conversion checks, speed diagnostics, and layout diagnostics. We fine-tune hardware integrations and direct memory caching, delivering a seamless experience that performs at peak speed and secures top conversions.
            </p>
            <div className="flex gap-3 font-mono text-[9px] font-medium opacity-60 text-current pt-2">
              <span>SLA: 24HR READY</span>
              <span>/</span>
              <span>TIME: WEEK 7</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Scroll indicator prompt */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 transition-opacity duration-300" style={{ opacity: deepDiveProgress > 0.95 ? 0 : 1 }}>
        <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-500 animate-bounce">
          Scroll to explore our workflow
        </div>
        <div className="w-[1.5px] h-6 bg-neutral-500/50 mx-auto mt-1" />
      </div>
    </div>
  );
}
