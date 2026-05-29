"use client";

import { useScrollStore } from "@/lib/stores/scroll-store";

export default function VectorsPage() {
  const scrollProgress = useScrollStore((s) => s.scrollProgress);
  const theme = useScrollStore((s) => s.theme);
  
  const deepDiveProgress = scrollProgress; // Maps 0 to 1 over this whole page

  const isUpActive = deepDiveProgress <= 0.22;
  const isRightActive = deepDiveProgress > 0.22 && deepDiveProgress <= 0.48;
  const isDownActive = deepDiveProgress > 0.48 && deepDiveProgress <= 0.74;
  const isLeftActive = deepDiveProgress > 0.74;

  let cardClass = "bg-white/40 border-white/40 text-neutral-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl ring-1 ring-black/5";
  let textPrimary = "text-neutral-900";
  let textSecondary = "text-neutral-500";
  let highlightBg = "bg-black text-white rounded-full px-3 py-1 text-xs font-medium";
  let borderAccentPrimary = "border-black/10";
  let borderAccentSecondary = "border-black/5";

  if (theme === "cyber-dark") {
    cardClass = "bg-black/40 border-white/10 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-2xl ring-1 ring-white/10";
    textPrimary = "text-white";
    textSecondary = "text-neutral-400";
    highlightBg = "bg-white/10 text-white rounded-full px-3 py-1 text-xs font-medium border border-white/20";
    borderAccentPrimary = "border-white/20";
    borderAccentSecondary = "border-white/10";
  } else if (theme === "mono") {
    cardClass = "bg-white/60 border-neutral-200 text-neutral-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl rounded-2xl";
    textPrimary = "text-neutral-900";
    textSecondary = "text-neutral-500";
    highlightBg = "bg-neutral-100 text-neutral-800 rounded-full px-3 py-1 text-xs font-medium border border-neutral-200";
    borderAccentPrimary = "border-neutral-200";
    borderAccentSecondary = "border-neutral-100";
  } else if (theme === "solar") {
    cardClass = "bg-[#1a0f0a]/60 border-[#ff5500]/20 text-[#fff5eb] shadow-[0_8px_30px_rgba(255,85,0,0.1)] backdrop-blur-2xl ring-1 ring-[#ff5500]/20 rounded-2xl";
    textPrimary = "text-[#fff5eb]";
    textSecondary = "text-[#ff8844]";
    highlightBg = "bg-[#ff5500]/20 text-[#ffcc00] rounded-full px-3 py-1 text-xs font-medium border border-[#ff5500]/30";
    borderAccentPrimary = "border-[#ff5500]/30";
    borderAccentSecondary = "border-[#ff5500]/10";
  }

  return (
    <div className="w-full h-[400vh] relative z-20">
      <div className="sticky top-0 h-screen w-full flex items-center px-6 md:px-12 pointer-events-none">
        <div className="w-full max-w-6xl mx-auto relative h-[420px] md:h-[460px] flex items-center justify-center">
          
          {/* Step 1: VECTOR UP — CORE (0.0 – 0.22) */}
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
              <span className={`font-sans text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-widest ${highlightBg}`}>
                Active: Up
              </span>
              <span className="font-mono text-[10px] text-zinc-500 font-medium">VECTOR 01</span>
            </div>
            <h3 className={`text-4xl font-semibold tracking-tight leading-[1.1] ${textPrimary}`}>
              Core Digital<br/>Engine
            </h3>
            <p className={`font-sans text-sm ${textSecondary} leading-relaxed font-light`}>
              Represents our architectural core: high-fidelity code bases, secure backend compilers, and zero-friction execution trees. We lay down software foundations built for absolute high transaction speeds.
            </p>
            <div className="flex gap-3 font-mono text-[9px] font-medium opacity-60 text-current pt-2">
              <span>TYPE: ENGINE</span>
              <span>/</span>
              <span>STAGE: FRONT LINE</span>
            </div>
          </div>

          {/* Step 2: VECTOR RIGHT — SCALE (0.22 – 0.48) */}
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
              <span className={`font-sans text-[10px] font-semibold uppercase tracking-widest ${theme === 'mono' ? 'text-black' : 'text-current opacity-80'}`}>
                Active: Right
              </span>
              <span className="font-mono text-[10px] text-zinc-500 font-medium">VECTOR 02</span>
            </div>
            <h3 className={`text-4xl font-semibold tracking-tight leading-[1.1] ${textPrimary}`}>
              Atomic Scale<br/>Paradigm
            </h3>
            <p className={`font-sans text-sm ${textSecondary} leading-relaxed font-light`}>
              Denotes massive international scaling structures. Automated cloud routers, edge cluster distributions, and dynamic database read-replicas that automatically adapt to high-traffic demands.
            </p>
            <div className="flex gap-3 font-mono text-[9px] font-medium opacity-60 text-current pt-2">
              <span>LATENCY: ~0.1MS</span>
              <span>/</span>
              <span>HOST: DEPLOY_NODES</span>
            </div>
          </div>

          {/* Step 3: VECTOR DOWN — FLOW (0.48 – 0.74) */}
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
              <span className={`font-sans text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-widest ${highlightBg}`}>
                Active: Down
              </span>
              <span className="font-mono text-[10px] text-zinc-500 font-medium">VECTOR 03</span>
            </div>
            <h3 className={`text-4xl font-semibold tracking-tight leading-[1.1] ${textPrimary}`}>
              Dynamic Flow<br/>Network
            </h3>
            <p className={`font-sans text-sm ${textSecondary} leading-relaxed font-light`}>
              Represents systemic routing optimization. Direct memory caching, specialized packet transport protocols, and real-time analytical compilation to avoid bottlenecks at every architectural layer.
            </p>
            <div className="flex gap-3 font-mono text-[9px] font-medium opacity-60 text-current pt-2">
              <span>ROUTE: AWS_EDGE</span>
              <span>/</span>
              <span>SPEED: METRIC_SYNC</span>
            </div>
          </div>

          {/* Step 4: VECTOR LEFT — SECURE (0.74 – 1.0) */}
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
              <span className={`font-sans text-[10px] font-semibold uppercase tracking-widest ${theme === 'mono' ? 'text-black' : 'text-current opacity-80'}`}>
                Active: Left
              </span>
              <span className="font-mono text-[10px] text-zinc-500 font-medium">VECTOR 04</span>
            </div>
            <h3 className={`text-4xl font-semibold tracking-tight leading-[1.1] ${textPrimary}`}>
              Cryptographic<br/>Security
            </h3>
            <p className={`font-sans text-sm ${textSecondary} leading-relaxed font-light`}>
              Stands for absolute security assurance. Sandboxed runtime nodes, strict compliance parameters, continuous security audits, and multi-signature authorization pathways preventing any potential vulnerability.
            </p>
            <div className="flex gap-3 font-mono text-[9px] font-medium opacity-60 text-current pt-2">
              <span>TYPE: SECURE_SANDBOX</span>
              <span>/</span>
              <span>AUDIT: 100% SECURE</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Scroll indicator prompt */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 transition-opacity duration-300" style={{ opacity: deepDiveProgress > 0.95 ? 0 : 1 }}>
        <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-500 animate-bounce">
          Scroll to explore vectors
        </div>
        <div className="w-[1.5px] h-6 bg-neutral-500/50 mx-auto mt-1" />
      </div>
    </div>
  );
}
