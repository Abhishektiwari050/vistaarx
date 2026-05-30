"use client";

import { useScrollStore } from "@/lib/stores/scroll-store";
import { TiltCard } from "@/components/3d/tilt-card";
import Image from "next/image";
import { ThemeOverlay } from "@/components/theme-overlay";
import { useThemeStyles } from "@/lib/hooks/use-theme-styles";
import { 
  ManhwaPanel, 
  ManhwaSpeechBubble, 
  ManhwaStarburst, 
  ManhwaGutterDivider 
} from "@/components/manhwa/manhwa-panel";

export default function WorkPage() {
  const { theme, textPrimary, workTag: tagClass, outlineBtn: outlineBtnClass } = useThemeStyles();
  const textSecondary = {
    "cyber-light": "text-neutral-800 font-extrabold",
    "cyber-dark": "text-neutral-300 font-extrabold",
    mono: "text-neutral-750 font-extrabold",
    solar: "text-neutral-900 font-extrabold",
  }[theme];

  return (
    <div className="w-full min-h-[220vh] py-20 px-6 md:px-12 z-25 relative pointer-events-auto max-w-7xl mx-auto">
      {/* Native dynamic React 19 document title */}
      <title>Case Studies // Vistar Studio</title>
      <meta name="description" content="Explore verified case studies from Vistar Studio, detailing dynamic 3D WebGL interfaces, enterprise performance optimizations, and metrics-driven designs." />

      {/* Symmetrical, highly restrained theme-adaptive CSS glass backdrop overlay for readability */}
      <ThemeOverlay />

      {/* Dynamic Manga Conic Action Speed lines overlay */}
      <div className={`fixed inset-0 z-0 opacity-15 pointer-events-none transition-colors duration-500 ${theme === 'cyber-dark' ? 'manga-action-lines-white' : 'manga-action-lines'}`} />

      {/* Title block styled like a loud Manga Chapter Cover */}
      <div className="mb-20 mt-10 relative z-10 text-left">
        <h1 
          className="font-bangers text-[3.8rem] md:text-[5.5rem] uppercase leading-none select-none text-black dark:text-white"
          style={{ WebkitTextStroke: "1.8px #000" }}
        >
          FEATURED <br/> CASE STUDIES
        </h1>
        <p className="font-comic text-xs sm:text-sm text-neutral-400 mt-4 max-w-md font-bold uppercase tracking-wider">
          Explore our client results. Sincere engineering solutions solving real business conversion bottlenecks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 w-full relative z-10">
        {/* Placeholder Column - Left side is occupied by the tumbling 3D logo arrowheads */}
        <div className="hidden lg:block lg:col-span-5" />

        {/* Long scrollable card timeline on the Right Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-24 md:gap-32">
          
          {/* Project 1: FinTech Algorithmic Ledger */}
          <section className="space-y-6 relative">
            {/* Action starburst highlighting Ledger Conversions */}
            <ManhwaStarburst 
              text="+38% UP!" 
              themeType="cyan" 
              size="md" 
              tilt="right" 
              className="absolute -top-12 -right-12 z-30"
            />

            <ManhwaPanel 
              panelTheme="orange"
              tilt="left"
              narration="01 // FINTECH LEDGER ENGINE"
              sfx="CASH!"
              sfxPosition="top-right"
              className="w-full"
            >
              <div className="p-8 space-y-6">
                {/* Dynamic real-time ledger metrics comic illustration */}
                <div className="relative w-full h-48 border-[3px] border-black bg-neutral-900 overflow-hidden mb-6 rounded-2xl shadow-[4px_4px_0px_#000] select-none rotate-[0.5deg]">
                  <Image 
                    src="/trading_ledger.png"
                    alt="High-performance real-time trading metrics ledger illustration"
                    fill
                    className="object-cover"
                    sizes="(max-w-768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 font-mono text-[8px] font-black text-[#ccff00] bg-black/80 px-2 py-1 rounded border border-black select-none tracking-widest uppercase">
                    ALPHA LEDGER ACTIVE
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 font-bangers text-[11px] sm:text-xs">
                  <span className={tagClass}>+38% Signups</span>
                  <span className={tagClass}>140% Session Boost</span>
                  <span className={tagClass}>Sub-ms Metrics</span>
                </div>
                
                <div className="space-y-3 text-left">
                  <h3 
                    className="font-bangers text-2xl md:text-3xl uppercase tracking-wide text-black dark:text-white"
                    style={{ WebkitTextStroke: "1px #000" }}
                  >
                    01 // FinTech Algorithmic Ledger
                  </h3>
                  <p className={`font-comic text-xs md:text-sm font-extrabold leading-relaxed ${textSecondary}`}>
                    A high-performance algorithmic trading interface for digital asset dealers, delivered under strict compliance. We built a custom WebGL shader pipeline displaying sub-millisecond real-time ledger metrics. This high-fidelity interface increased average user session times by 140% and generated a 38% boost in signup conversions.
                  </p>
                </div>
                
                <div className="pt-4 flex gap-4 w-full select-none justify-start">
                  <span className={`${outlineBtnClass} opacity-50 cursor-default font-bangers text-sm`}>NDA Protected</span>
                </div>
              </div>
            </ManhwaPanel>
          </section>

          {/* Jagged Panel Gutter divider between case studies */}
          <ManhwaGutterDivider themeType="pink" className="my-6" />

          {/* Project 2: Scalable Media Distribution */}
          <section className="space-y-6 relative">
            {/* Action starburst highlighting speed multiplier */}
            <ManhwaStarburst 
              text="2.4x FAST!" 
              themeType="lime" 
              size="md" 
              tilt="left" 
              className="absolute -top-12 -left-12 z-30"
            />

            <ManhwaPanel 
              panelTheme="pink"
              tilt="right"
              narration="02 // ROUTER SCALING COMPILER"
              sfx="ZOOM!"
              sfxPosition="top-right"
              className="w-full"
            >
              <div className="p-8 space-y-6">
                {/* Custom vector compilation/edge distribution node illustration */}
                <div className={`w-full h-44 border-[3px] border-black bg-[#fdfbf7] text-black p-4 font-mono text-[9px] relative overflow-hidden mb-6 rounded-2xl shadow-[4px_4px_0px_#000] select-none ${theme === 'cyber-dark' ? 'bg-[#0a0a0f] text-white border-white shadow-[4px_4px_0px_#ff0080]' : ''} rotate-[-0.5deg]`}>
                  <div className="flex justify-between border-b border-black/15 pb-1.5 mb-2 font-bold uppercase tracking-wider">
                    <span>Beta Media Edge Router</span>
                    <span className="text-[#ff0080] font-black">Active</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="border-2 border-black p-2.5 rounded-xl bg-white shadow-[2px_2px_0px_#000] text-black">
                      <p className="font-black text-[9px]">NODE_01</p>
                      <div className="w-full bg-[#ccff00] border border-black h-2 mt-1.5 rounded" />
                      <span className="font-bold text-[7px] block mt-1">COMPLETED</span>
                    </div>
                    <div className="border-2 border-black p-2.5 rounded-xl bg-white shadow-[2px_2px_0px_#000] text-black">
                      <p className="font-black text-[9px]">NODE_02</p>
                      <div className="w-full bg-[#ccff00] border border-black h-2 mt-1.5 rounded" />
                      <span className="font-bold text-[7px] block mt-1">COMPLETED</span>
                    </div>
                    <div className="border-2 border-black p-2.5 rounded-xl bg-[#ff0080] text-white shadow-[2px_2px_0px_#000]">
                      <p className="font-black text-[9px]">EDGE_ROUTE</p>
                      <div className="w-full bg-white border border-black h-2 mt-1.5 rounded" />
                      <span className="font-black text-[7px] block mt-1">VERIFIED</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 font-bangers text-[11px] sm:text-xs">
                  <span className={tagClass}>2.4x Speedup</span>
                  <span className={tagClass}>+62% Clickthroughs</span>
                  <span className={tagClass}>Next.js Core</span>
                </div>
                
                <div className="space-y-3 text-left">
                  <h3 
                    className="font-bangers text-2xl md:text-3xl uppercase tracking-wide text-black dark:text-white"
                    style={{ WebkitTextStroke: "1px #000" }}
                  >
                    02 // Scalable Media Network
                  </h3>
                  <p className={`font-comic text-xs md:text-sm font-extrabold leading-relaxed ${textSecondary}`}>
                    Complete platform architectural overhaul and brand systems deployment for an enterprise media distribution network under NDA. By implementing Next.js native routes and removing rendering bottlenecks, we boosted load speeds by 240% and improved search engine visibility click-throughs by 62%.
                  </p>
                </div>

                <div className="pt-4 flex gap-4 w-full select-none justify-start">
                  <span className={`${outlineBtnClass} opacity-50 cursor-default font-bangers text-sm`}>NDA Protected</span>
                </div>
              </div>
            </ManhwaPanel>
          </section>

          {/* Jagged Panel Gutter divider between case studies */}
          <ManhwaGutterDivider themeType="lime" className="my-6" />

          {/* Project 3: Verified Client Metrics Log */}
          <section className="space-y-6">
            <ManhwaPanel 
              panelTheme="purple"
              tilt="left"
              narration="VERIFIED TELEMETRY METRIC LOG"
              className="w-full"
            >
              <div className="p-8 space-y-4 font-mono text-xs text-white">
                <div className="font-bangers text-xl uppercase border-b border-white/10 pb-2.5 mb-4 tracking-wide text-[#ff0080]" style={{ WebkitTextStroke: "0.5px #000" }}>
                  STUDIO METRIC VERIFICATION
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span>AVERAGE CONVERSION INCREASE</span>
                  <span className="font-bold text-[#ccff00] font-black">+38%</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span>AVERAGE LOAD VELOCITY GAIN</span>
                  <span className="font-bold text-[#ccff00] font-black">2.4x SPEEDUP</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span>SYSTEM OPERATION RUNTIME</span>
                  <span className="font-bold text-[#ccff00] font-black">99.99% UPTIME</span>
                </div>
                <p className="pt-4 text-xs sm:text-sm italic font-comic font-bold leading-relaxed text-neutral-300">
                  &quot;Vistar delivered clean, premium architectures operating with perfect technical precision. Their engineering and design decisions directly impacted our bottom-line conversion goals.&quot;
                </p>
              </div>
            </ManhwaPanel>
          </section>

          {/* Jagged Panel Gutter divider between case studies */}
          <ManhwaGutterDivider themeType="yellow" className="my-6" />

          {/* Project 4: Spatial Bio-Modeling Platform */}
          <section className="space-y-6 relative">
            {/* Action starburst highlighting GPU rendering */}
            <ManhwaStarburst 
              text="NO LAG!" 
              themeType="orange" 
              size="md" 
              tilt="right" 
              className="absolute -bottom-10 -left-10 z-30"
            />

            <ManhwaPanel 
              panelTheme="cyan"
              tilt="right"
              narration="03 // BIO-MODELING ENGINE"
              sfx="GLOW!"
              sfxPosition="top-right"
              className="w-full"
            >
              <div className="p-8 space-y-6">
                {/* Custom SVG Spatial computed rotating mesh illustration */}
                <div className={`w-full h-44 border-[3px] border-black bg-[#fdfbf7] text-black p-4 font-mono text-[9px] relative overflow-hidden mb-6 rounded-2xl shadow-[4px_4px_0px_#000] select-none ${theme === 'cyber-dark' ? 'bg-[#0a0a0f] text-white border-white shadow-[4px_4px_0px_#ff0080]' : ''} rotate-[0.5deg]`}>
                  <div className="flex justify-between border-b border-black/15 pb-1.5 mb-2 font-bold uppercase tracking-wider">
                    <span>Gamma Spatial Computed Node</span>
                    <span className="text-[#ff0080] font-black">GPU_ACTIVE</span>
                  </div>
                  <svg className="w-full h-28 mx-auto text-black dark:text-white opacity-90" viewBox="0 0 100 100" aria-hidden="true">
                    <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.1" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.1" />
                    <polygon points="50,22 75,34 50,46 25,34" fill="#ccff00" stroke="black" strokeWidth="2.5" />
                    <polygon points="50,46 75,58 50,70 25,58" fill="#ff0080" stroke="black" strokeWidth="2.5" />
                    <line x1="50" y1="22" x2="50" y2="46" stroke="black" strokeWidth="2.5" />
                    <line x1="75" y1="34" x2="75" y2="58" stroke="black" strokeWidth="2.5" />
                    <line x1="25" y1="34" x2="25" y2="58" stroke="black" strokeWidth="2.5" />
                  </svg>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 font-bangers text-[11px] sm:text-xs">
                  <span className={tagClass}>1.2M Sessions</span>
                  <span className={tagClass}>Zero Jitter</span>
                  <span className={tagClass}>WebGL 3D Core</span>
                </div>
                
                <div className="space-y-3 text-left">
                  <h3 
                    className="font-bangers text-2xl md:text-3xl uppercase tracking-wide text-black dark:text-white"
                    style={{ WebkitTextStroke: "1px #000" }}
                  >
                    03 // Spatial Bio-Modeling Platform
                  </h3>
                  <p className={`font-comic text-xs md:text-sm font-extrabold leading-relaxed ${textSecondary}`}>
                    Immersive spatial computed environments built directly inside the web browser under strict NDA. We designed and coded custom GLSL fluid matrices, handling over 1.2M daily active user sessions without a single stutter in frame rate. Absolute speed matched with stunning aesthetic clarity.
                  </p>
                </div>

                <div className="pt-4 flex gap-4 w-full select-none justify-start">
                  <span className={`${outlineBtnClass} opacity-50 cursor-default font-bangers text-sm`}>NDA Protected</span>
                </div>
              </div>
            </ManhwaPanel>
          </section>

        </div>
      </div>
    </div>
  );
}
