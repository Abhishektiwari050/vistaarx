"use client";

import { useScrollStore } from "@/lib/stores/scroll-store";
import { TiltCard } from "@/components/3d/tilt-card";

export default function WorkPage() {
  const theme = useScrollStore((s) => s.theme);
  
  let cardClass = "bg-white border-4 border-black text-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
  let textPrimary = "text-black";
  let textSecondary = "text-neutral-800 font-medium";
  let tagClass = "bg-[#ccff00] text-black border-2 border-black uppercase font-mono font-bold px-2.5 py-1 text-[9px]";
  let blockQuoteClass = "bg-[#ff0080] text-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
  
  if (theme === "cyber-dark") {
    cardClass = "bg-black border-4 border-[#ccff00] text-white shadow-[12px_12px_0px_0px_#ccff00] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
    textPrimary = "text-white";
    textSecondary = "text-neutral-300 font-medium";
    tagClass = "bg-[#ff0080] text-white border-2 border-[#ccff00] uppercase font-mono font-bold px-2.5 py-1 text-[9px]";
    blockQuoteClass = "bg-black text-[#ccff00] border-4 border-[#ff0080] shadow-[12px_12px_0px_0px_#ff0080] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
  } else if (theme === "mono") {
    cardClass = "bg-white border-4 border-black text-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
    textPrimary = "text-black";
    textSecondary = "text-neutral-700 font-medium";
    tagClass = "bg-black text-white border-2 border-black uppercase font-mono font-bold px-2.5 py-1 text-[9px]";
    blockQuoteClass = "bg-neutral-200 text-black border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
  } else if (theme === "solar") {
    cardClass = "bg-[#ff5500] border-4 border-black text-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
    textPrimary = "text-black";
    textSecondary = "text-neutral-900 font-medium";
    tagClass = "bg-[#ffcc00] text-black border-2 border-black uppercase font-mono font-bold px-2.5 py-1 text-[9px]";
    blockQuoteClass = "bg-[#140b04] text-[#ffcc00] border-4 border-[#ff5500] shadow-[12px_12px_0px_0px_#ff5500] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
  }

  return (
    <div className="w-full min-h-[220vh] py-20 px-6 md:px-12 z-20 relative pointer-events-auto max-w-7xl mx-auto">
      {/* Native dynamic React 19 document title */}
      <title>Featured Case Studies // Vistar Studio</title>
      <meta name="description" content="Explore real-world case studies from Vistar Studio, detailing dynamic 3D WebGL interfaces, enterprise performance optimizations, and metrics-driven designs." />

      {/* Dynamic Background Indicator */}
      <div className="fixed top-[20%] right-[10%] select-none z-0 opacity-15 pointer-events-none text-right">
        <h2 className="text-[10rem] md:text-[14rem] font-black text-transparent uppercase" style={{ WebkitTextStroke: theme === 'cyber-dark' ? '4px #ccff00' : '4px black' }}>
          WORK
        </h2>
      </div>

      <div className="mb-20 mt-10">
        <h2 className={`font-mono text-[3.5rem] md:text-[5.5rem] font-black uppercase tracking-tighter leading-none ${textPrimary}`}>
          FEATURED <br/> [ Case Studies ]
        </h2>
        <p className="font-sans text-xs md:text-sm text-neutral-400 mt-4 max-w-md">
          Explore our client results. Real engineering solutions solving tangible business bottlenecks. Look to the left to watch the 3D canvas coordinates highlight parameters in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 w-full">
        {/* Placeholder Column - Left side is occupied by the shifted 3D logo */}
        <div className="hidden md:block md:col-span-5" />

        {/* Long scrollable card timeline on the Right Column (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-32">
          
          {/* Project 1: Quantum Exchange */}
          <section className="space-y-6">
            <TiltCard intensity={8} className={`p-8 md:p-12 border-4 ${cardClass} relative overflow-hidden group`}>
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] font-black mix-blend-difference text-white">ID: ALPHA_01</div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={tagClass}>WebGL 3D Engine</span>
                <span className={tagClass}>Interactive Interface</span>
                <span className={tagClass}>Startups</span>
              </div>
              <div className="space-y-4">
                <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${textPrimary}`}>01 / Quantum Exchange</h3>
                <p className={`font-sans text-xs md:text-sm leading-relaxed ${textSecondary}`}>
                  A high-performance algorithmic trading interface for digital asset dealers. We built a custom WebGL shader pipeline displaying sub-millisecond real-time ledger metrics. This high-fidelity interface increased average user session times by 140% and generated a 38% boost in signup conversions.
                </p>
              </div>
              <div className={`absolute -bottom-6 -right-6 text-[8rem] font-black opacity-10 pointer-events-none transform rotate-[-15deg] group-hover:rotate-0 transition-transform duration-500 ${textPrimary}`}>
                38%
              </div>
            </TiltCard>
          </section>

          {/* Project 2: Apex Channels */}
          <section className="space-y-6">
            <TiltCard intensity={8} className={`p-8 md:p-12 border-4 ${cardClass} relative overflow-hidden group`}>
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] font-black mix-blend-difference text-white">ID: BETA_02</div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={tagClass}>Web App Development</span>
                <span className={tagClass}>Next.js Engineering</span>
                <span className={tagClass}>Enterprise</span>
              </div>
              <div className="space-y-4">
                <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${textPrimary}`}>02 / Apex Channels</h3>
                <p className={`font-sans text-xs md:text-sm leading-relaxed ${textSecondary}`}>
                  Complete platform architectural overhaul and brand systems deployment for an enterprise media distribution network. By implementing Next.js native routes and removing rendering bottlenecks, we boosted load speeds by 240% and improved search engine visibility click-throughs by 62%.
                </p>
              </div>
              <div className={`absolute -bottom-6 -right-6 text-[8rem] font-black opacity-10 pointer-events-none transform rotate-[15deg] group-hover:rotate-0 transition-transform duration-500 ${textPrimary}`}>
                240%
              </div>
            </TiltCard>
          </section>

          {/* Project 3: Telemetry HUD Log */}
          <section className="space-y-6">
            <TiltCard intensity={8} className={`p-8 md:p-12 border-4 ${blockQuoteClass} relative overflow-hidden group`}>
              <div className="font-mono text-[9px] font-black uppercase border-b-4 border-current pb-2 mb-6 tracking-widest">
                TELEMETRY.LOG // VERIFIED CLIENT METRICS
              </div>
              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-current/20 pb-2">
                  <span>AVERAGE CONVERSION INCREASE</span>
                  <span className="font-black">+38%</span>
                </div>
                <div className="flex justify-between items-center border-b border-current/20 pb-2">
                  <span>AVERAGE LOAD VELOCITY GAIN</span>
                  <span className="font-black">2.4x SPEEDUP</span>
                </div>
                <div className="flex justify-between items-center border-b border-current/20 pb-2">
                  <span>SYSTEM OPERATION RUNTIME</span>
                  <span className="font-black">99.99% UPTIME</span>
                </div>
                <p className="pt-4 text-[11px] italic font-sans font-semibold leading-relaxed">
                  &quot;Vistar delivered clean, premium architectures operating with perfect technical precision. Their engineering and design decisions directly impacted our bottom-line conversion goals.&quot;
                </p>
              </div>
            </TiltCard>
          </section>

          {/* Project 4: Omni-Vision AR */}
          <section className="space-y-6">
            <TiltCard intensity={8} className={`p-8 md:p-12 border-4 ${cardClass} relative overflow-hidden group`}>
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] font-black mix-blend-difference text-white">ID: GAMMA_03</div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={tagClass}>Spatial Computing</span>
                <span className={tagClass}>Frontend WebGL</span>
                <span className={tagClass}>Creative Tech</span>
              </div>
              <div className="space-y-4">
                <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${textPrimary}`}>03 / Omni-Vision AR</h3>
                <p className={`font-sans text-xs md:text-sm leading-relaxed ${textSecondary}`}>
                  Immersive spatial computed environments built directly inside the web browser. We designed and coded custom GLSL fluid matrices, handling over 1.2M daily active user sessions without a single stutter in frame rate. Absolute speed matched with stunning aesthetic clarity.
                </p>
              </div>
              <div className={`absolute -bottom-6 -right-6 text-[8rem] font-black opacity-10 pointer-events-none transform rotate-[-15deg] group-hover:rotate-0 transition-transform duration-500 ${textPrimary}`}>
                1.2M
              </div>
            </TiltCard>
          </section>

        </div>
      </div>
    </div>
  );
}
