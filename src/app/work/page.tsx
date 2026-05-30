"use client";

import { useScrollStore } from "@/lib/stores/scroll-store";
import { TiltCard } from "@/components/3d/tilt-card";
import { ThemeOverlay } from "@/components/theme-overlay";
import { useThemeStyles } from "@/lib/hooks/use-theme-styles";

export default function WorkPage() {
  const { theme, textPrimary, brutalistCard: cardClass, innerCore, workTag: tagClass, outlineBtn: outlineBtnClass } = useThemeStyles();
  const textSecondary = {
    "cyber-light": "text-neutral-800 font-medium",
    "cyber-dark": "text-neutral-300 font-medium",
    mono: "text-neutral-700 font-medium",
    solar: "text-neutral-900 font-medium",
  }[theme];
  
  const blockQuoteOuter = {
    "cyber-light": "bg-[#ff0080]/15 border border-[#ff0080]/20 shadow-md rounded-[2rem] p-1.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-lg transform-gpu",
    "cyber-dark": "bg-[#ff0080]/10 border border-[#ff0080]/35 shadow-[0_20px_50px_rgba(255,0,128,0.15)] rounded-[2rem] p-1.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(255,0,128,0.25)] transform-gpu",
    mono: "bg-neutral-200 border border-neutral-300 shadow-md rounded-[2.5rem] p-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 transform-gpu",
    solar: "bg-[#ff5500]/15 border border-[#ff5500]/30 shadow-[0_20px_50px_rgba(255,85,0,0.1)] rounded-[2rem] p-1.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 transform-gpu",
  }[theme];

  const blockQuoteInner = {
    "cyber-light": "h-full p-8 md:p-10 bg-[#ff0080] text-white rounded-[calc(2rem-0.375rem)] border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]",
    "cyber-dark": "h-full p-8 md:p-10 bg-black/85 text-[#ff0080] rounded-[calc(2rem-0.375rem)] border border-[#ff0080]/40 shadow-[inset_0_1px_1px_rgba(255,0,128,0.1)]",
    mono: "h-full p-8 md:p-10 bg-neutral-900 text-white rounded-[calc(2.5rem-0.5rem)] border border-neutral-800",
    solar: "h-full p-8 md:p-10 bg-[#140b04] text-[#ffcc00] rounded-[calc(2rem-0.375rem)] border border-[#ff5500]/30",
  }[theme];

  return (
    <div className="w-full min-h-[220vh] py-20 px-6 md:px-12 z-25 relative pointer-events-auto max-w-7xl mx-auto">
      {/* Native dynamic React 19 document title */}
      <title>Case Studies // Vistar Studio</title>
      <meta name="description" content="Explore verified case studies from Vistar Studio, detailing dynamic 3D WebGL interfaces, enterprise performance optimizations, and metrics-driven designs." />

      {/* Symmetrical, highly restrained theme-adaptive CSS glass backdrop overlay for readability */}
      <ThemeOverlay />

      <div className="mb-20 mt-10 relative z-10">
        <h2 className={`font-mono text-[3.5rem] md:text-[5rem] font-black uppercase tracking-tighter leading-none ${textPrimary}`}>
          FEATURED <br/> CASE STUDIES
        </h2>
        <p className="font-sans text-xs md:text-sm text-neutral-400 mt-4 max-w-md font-light">
          Explore our client results. Sincere engineering solutions solving real business conversion bottlenecks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 w-full relative z-10">
        {/* Placeholder Column - Left side is occupied by the shifted 3D logo */}
        <div className="hidden md:block md:col-span-5" />

        {/* Long scrollable card timeline on the Right Column (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-28">
          
          {/* Project 1: FinTech Algorithmic Ledger */}
          <section className="space-y-6">
            <TiltCard intensity={4} className={`${cardClass} relative overflow-hidden group transform-gpu`}>
              <div className={`${innerCore} relative overflow-hidden h-full`}>
                
                {/* Custom SVG Candlestick mock trading grid illustration */}
                <div className={`w-full h-44 border-[3px] border-black bg-[#fdfbf7] text-black p-4 font-mono text-[9px] relative overflow-hidden mb-6 rounded-xl shadow-[4px_4px_0px_#000] select-none ${theme === 'cyber-dark' ? 'bg-[#0a0a0f] text-white border-white shadow-[4px_4px_0px_#ff0080]' : ''}`}>
                  <div className="flex justify-between border-b-2 border-black pb-1.5 mb-2 font-bold uppercase tracking-wider">
                    <span>Alpha Ledger Matrix</span>
                    <span className="text-[#ff0080] font-black">● Node secure</span>
                  </div>
                  <svg className="w-full h-28 opacity-90" viewBox="0 0 300 100" aria-hidden="true">
                    <line x1="0" y1="50" x2="300" y2="50" stroke="black" strokeWidth="2" strokeDasharray="4,4" />
                    <path d="M10,65 L40,45 L70,80 L100,30 L130,55 L160,25 L190,65 L220,35 L250,75 L280,25" fill="none" stroke="black" strokeWidth="3.5" />
                    <rect x="35" y="25" width="12" height="40" fill="#ccff00" stroke="black" strokeWidth="2" />
                    <rect x="95" y="15" width="12" height="30" fill="#ff0080" stroke="black" strokeWidth="2" />
                    <rect x="155" y="10" width="12" height="45" fill="#ccff00" stroke="black" strokeWidth="2" />
                  </svg>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className={tagClass}>+38% Signups</span>
                  <span className={tagClass}>140% Session Boost</span>
                  <span className={tagClass}>Sub-ms Metrics</span>
                </div>
                <div className="space-y-4">
                  <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${textPrimary}`}>01 / FinTech Algorithmic Ledger</h3>
                  <p className={`font-sans text-xs md:text-sm font-light leading-relaxed ${textSecondary}`}>
                    A high-performance algorithmic trading interface for digital asset dealers, delivered under strict compliance. We built a custom WebGL shader pipeline displaying sub-millisecond real-time ledger metrics. This high-fidelity interface increased average user session times by 140% and generated a 38% boost in signup conversions.
                  </p>
                </div>
                
                <div className="pt-6 flex gap-4 w-full">
                  <span className={outlineBtnClass + " opacity-50 cursor-default"}>NDA Protected</span>
                </div>

                <div className={`absolute -bottom-6 -right-6 text-[8rem] font-black opacity-5 pointer-events-none transform rotate-[-15deg] group-hover:rotate-0 transition-transform duration-500 ${textPrimary}`}>
                  38%
                </div>
              </div>
            </TiltCard>
          </section>

          {/* Project 2: Scalable Media Distribution */}
          <section className="space-y-6">
            <TiltCard intensity={4} className={`${cardClass} relative overflow-hidden group transform-gpu`}>
              <div className={`${innerCore} relative overflow-hidden h-full`}>
                
                {/* Custom SVG file compilation/edge distribution node illustration */}
                <div className={`w-full h-44 border-[3px] border-black bg-[#fdfbf7] text-black p-4 font-mono text-[9px] relative overflow-hidden mb-6 rounded-xl shadow-[4px_4px_0px_#000] select-none ${theme === 'cyber-dark' ? 'bg-[#0a0a0f] text-white border-white shadow-[4px_4px_0px_#ff0080]' : ''}`}>
                  <div className="flex justify-between border-b-2 border-black pb-1.5 mb-2 font-bold uppercase tracking-wider">
                    <span>Beta Media Edge Router</span>
                    <span className="text-[#ff0080] font-black">Active</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="border-2 border-black p-2.5 rounded-lg bg-white shadow-[2px_2px_0px_#000] text-black">
                      <p className="font-black">NODE_01</p>
                      <div className="w-full bg-[#ccff00] border border-black h-2 mt-1.5 rounded" />
                      <span className="font-bold text-[7px] block mt-1">COMPLETED</span>
                    </div>
                    <div className="border-2 border-black p-2.5 rounded-lg bg-white shadow-[2px_2px_0px_#000] text-black">
                      <p className="font-black">NODE_02</p>
                      <div className="w-full bg-[#ccff00] border border-black h-2 mt-1.5 rounded" />
                      <span className="font-bold text-[7px] block mt-1">COMPLETED</span>
                    </div>
                    <div className="border-2 border-black p-2.5 rounded-lg bg-[#ff0080] text-white shadow-[2px_2px_0px_#000]">
                      <p className="font-black">EDGE_ROUTE</p>
                      <div className="w-full bg-white border border-black h-2 mt-1.5 rounded" />
                      <span className="font-black text-[7px] block mt-1">VERIFIED</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className={tagClass}>2.4x Speedup</span>
                  <span className={tagClass}>+62% Clickthroughs</span>
                  <span className={tagClass}>Next.js Core</span>
                </div>
                <div className="space-y-4">
                  <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${textPrimary}`}>02 / Scalable Media Network</h3>
                  <p className={`font-sans text-xs md:text-sm font-light leading-relaxed ${textSecondary}`}>
                    Complete platform architectural overhaul and brand systems deployment for an enterprise media distribution network under NDA. By implementing Next.js native routes and removing rendering bottlenecks, we boosted load speeds by 240% and improved search engine visibility click-throughs by 62%.
                  </p>
                </div>

                <div className="pt-6 flex gap-4 w-full">
                  <span className={outlineBtnClass + " opacity-50 cursor-default"}>NDA Protected</span>
                </div>

                <div className={`absolute -bottom-6 -right-6 text-[8rem] font-black opacity-5 pointer-events-none transform rotate-[15deg] group-hover:rotate-0 transition-transform duration-500 ${textPrimary}`}>
                  2.4x
                </div>
              </div>
            </TiltCard>
          </section>

          {/* Project 3: Verified Client Metrics Log */}
          <section className="space-y-6">
            <TiltCard intensity={4} className={`${blockQuoteOuter} relative overflow-hidden group transform-gpu`}>
              <div className={`${blockQuoteInner} relative overflow-hidden h-full`}>
                <div className="font-mono text-[8px] font-bold uppercase border-b-2 border-current pb-2.5 mb-6 tracking-[0.2em] text-current">
                  STUDIO METRIC VERIFICATION
                </div>
                <div className="space-y-4 font-mono text-xs text-current">
                  <div className="flex justify-between items-center border-b border-current/10 pb-2">
                    <span>AVERAGE CONVERSION INCREASE</span>
                    <span className="font-bold">+38%</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-current/10 pb-2">
                    <span>AVERAGE LOAD VELOCITY GAIN</span>
                    <span className="font-bold">2.4x SPEEDUP</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-current/10 pb-2">
                    <span>SYSTEM OPERATION RUNTIME</span>
                    <span className="font-bold">99.99% UPTIME</span>
                  </div>
                  <p className="pt-4 text-xs italic font-sans font-normal leading-relaxed text-current opacity-90">
                    &quot;Vistar delivered clean, premium architectures operating with perfect technical precision. Their engineering and design decisions directly impacted our bottom-line conversion goals.&quot;
                  </p>
                </div>
              </div>
            </TiltCard>
          </section>

          {/* Project 4: Spatial Bio-Modeling Platform */}
          <section className="space-y-6">
            <TiltCard intensity={4} className={`${cardClass} relative overflow-hidden group transform-gpu`}>
              <div className={`${innerCore} relative overflow-hidden h-full`}>
                
                {/* Custom SVG Spatial computed vertices rotating cube mesh illustration */}
                <div className={`w-full h-44 border-[3px] border-black bg-[#fdfbf7] text-black p-4 font-mono text-[9px] relative overflow-hidden mb-6 rounded-xl shadow-[4px_4px_0px_#000] select-none ${theme === 'cyber-dark' ? 'bg-[#0a0a0f] text-white border-white shadow-[4px_4px_0px_#ff0080]' : ''}`}>
                  <div className="flex justify-between border-b-2 border-black pb-1.5 mb-2 font-bold uppercase tracking-wider">
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

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className={tagClass}>1.2M Sessions</span>
                  <span className={tagClass}>Zero Jitter</span>
                  <span className={tagClass}>WebGL 3D Core</span>
                </div>
                <div className="space-y-4">
                  <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${textPrimary}`}>03 / Spatial Bio-Modeling Platform</h3>
                  <p className={`font-sans text-xs md:text-sm font-light leading-relaxed ${textSecondary}`}>
                    Immersive spatial computed environments built directly inside the web browser under strict NDA. We designed and coded custom GLSL fluid matrices, handling over 1.2M daily active user sessions without a single stutter in frame rate. Absolute speed matched with stunning aesthetic clarity.
                  </p>
                </div>

                <div className="pt-6 flex gap-4 w-full">
                  <span className={outlineBtnClass + " opacity-50 cursor-default"}>NDA Protected</span>
                </div>

                <div className={`absolute -bottom-6 -right-6 text-[8rem] font-black opacity-5 pointer-events-none transform rotate-[-15deg] group-hover:rotate-0 transition-transform duration-500 ${textPrimary}`}>
                  1.2M
                </div>
              </div>
            </TiltCard>
          </section>

        </div>
      </div>
    </div>
  );
}
