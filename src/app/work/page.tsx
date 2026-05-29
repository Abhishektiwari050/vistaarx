"use client";

import { useScrollStore } from "@/lib/stores/scroll-store";
import { TiltCard } from "@/components/3d/tilt-card";

export default function WorkPage() {
  const theme = useScrollStore((s) => s.theme);
  
  let cardClass = "bg-white border-4 border-black text-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
  let textPrimary = "text-black";
  let textSecondary = "text-neutral-800 font-bold";
  let tagClass = "bg-[#ccff00] text-black border-2 border-black uppercase font-black px-2 py-1 text-[10px]";
  let blockQuoteClass = "bg-[#ff0080] text-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
  
  if (theme === "cyber-dark") {
    cardClass = "bg-black border-4 border-[#ccff00] text-white shadow-[12px_12px_0px_0px_#ccff00] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
    textPrimary = "text-white";
    textSecondary = "text-neutral-300 font-bold";
    tagClass = "bg-[#ff0080] text-white border-2 border-[#ccff00] uppercase font-black px-2 py-1 text-[10px]";
    blockQuoteClass = "bg-black text-[#ccff00] border-4 border-[#ff0080] shadow-[12px_12px_0px_0px_#ff0080] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
  } else if (theme === "mono") {
    cardClass = "bg-white border-4 border-black text-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
    textPrimary = "text-black";
    textSecondary = "text-neutral-700 font-bold";
    tagClass = "bg-black text-white border-2 border-black uppercase font-black px-2 py-1 text-[10px]";
    blockQuoteClass = "bg-neutral-300 text-black border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
  } else if (theme === "solar") {
    cardClass = "bg-[#ff5500] border-4 border-black text-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
    textPrimary = "text-black";
    textSecondary = "text-neutral-900 font-bold";
    tagClass = "bg-[#ffcc00] text-black border-2 border-black uppercase font-black px-2 py-1 text-[10px]";
    blockQuoteClass = "bg-[#140b04] text-[#ffcc00] border-4 border-[#ff5500] shadow-[12px_12px_0px_0px_#ff5500] hover:shadow-none hover:-translate-y-2 hover:translate-x-2 transition-all duration-150";
  }

  return (
    <div className="w-full min-h-[220vh] py-20 px-6 md:px-12 z-20 relative pointer-events-auto max-w-7xl mx-auto">
      
      {/* Dynamic Background Indicator */}
      <div className="fixed top-[20%] right-[10%] select-none z-0 opacity-15 pointer-events-none text-right">
        <h2 className="text-[10rem] md:text-[14rem] font-black text-transparent uppercase" style={{ WebkitTextStroke: theme === 'cyber-dark' ? '4px #ccff00' : '4px black' }}>
          WORK
        </h2>
      </div>

      <div className="mb-20 mt-10">
        <h2 className={`font-mono text-[4rem] md:text-[6rem] font-black uppercase tracking-tighter leading-none ${textPrimary}`}>
          FEATURED <br/> [ WORK ]
        </h2>
        <p className="font-mono text-xs text-neutral-400 mt-4 max-w-md">
          Scroll to explore projects. Watch the structural 3D module on the left expand and adapt arrowheads to represent project parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 w-full">
        {/* Placeholder Column - Left side is occupied by the shifted 3D logo */}
        <div className="hidden md:block md:col-span-5" />

        {/* Long scrollable card timeline on the Right Column (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-32">
          
          {/* Project 1: Neural Operator (Active in top scroll) */}
          <section className="space-y-6">
            <TiltCard intensity={8} className={`p-8 md:p-12 border-4 ${cardClass} relative overflow-hidden group`}>
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] font-black mix-blend-difference text-white">ID: ALPHA_01</div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={tagClass}>E-COMMERCE</span>
                <span className={tagClass}>WEBGL SHADERS</span>
              </div>
              <div className="space-y-4">
                <h3 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${textPrimary}`}>01 / Neural Operator</h3>
                <p className={`font-mono text-xs leading-relaxed ${textSecondary}`}>
                  A high-performance algorithmic trading interface leveraging custom WebGL pipelines. Dispatches rendering structures straight to GPU, allowing real-time visualization of sub-millisecond transactions.
                </p>
              </div>
              <div className={`absolute -bottom-6 -right-6 text-[8rem] font-black opacity-10 pointer-events-none transform rotate-[-15deg] group-hover:rotate-0 transition-transform duration-500 ${textPrimary}`}>
                01
              </div>
            </TiltCard>
          </section>

          {/* Project 2: Synapse Protocol */}
          <section className="space-y-6">
            <TiltCard intensity={8} className={`p-8 md:p-12 border-4 ${cardClass} relative overflow-hidden group`}>
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] font-black mix-blend-difference text-white">ID: BETA_02</div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={tagClass}>BRAND DESIGN</span>
                <span className={tagClass}>DECENTRALIZED NETWORK</span>
              </div>
              <div className="space-y-4">
                <h3 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${textPrimary}`}>02 / Synapse Protocol</h3>
                <p className={`font-mono text-xs leading-relaxed ${textSecondary}`}>
                  Radical aesthetic overhaul and heavy-duty brand deployment for a zero-friction decentralized network layer. Stripped all flat grid assumptions to establish aggressive visual supremacy.
                </p>
              </div>
              <div className={`absolute -bottom-6 -right-6 text-[8rem] font-black opacity-10 pointer-events-none transform rotate-[15deg] group-hover:rotate-0 transition-transform duration-500 ${textPrimary}`}>
                02
              </div>
            </TiltCard>
          </section>

          {/* Project 3: Telemetry HUD Log (Quote styling card) */}
          <section className="space-y-6">
            <TiltCard intensity={8} className={`p-8 md:p-12 border-4 ${blockQuoteClass} relative overflow-hidden group`}>
              <div className="font-mono text-[10px] font-black uppercase border-b-4 border-current pb-2 mb-6">
                TELEMETRY.LOG // ACTIVE ARCHIVE
              </div>
              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-current/20 pb-2">
                  <span>SYSTEM LOAD LATENCY</span>
                  <span className="font-black">0.1ms</span>
                </div>
                <div className="flex justify-between items-center border-b border-current/20 pb-2">
                  <span>AVERAGE RENDER CACHE</span>
                  <span className="font-black">144Hz LOCK</span>
                </div>
                <div className="flex justify-between items-center border-b border-current/20 pb-2">
                  <span>DISTRIBUTED EDGE STACK</span>
                  <span className="font-black">99.99% UPTIME</span>
                </div>
                <p className="pt-4 text-[11px] italic font-semibold leading-relaxed">
                  "Every visual particle is bound to direct numeric coordinates. Architecture is clean code operating with beautiful mathematical orders."
                </p>
              </div>
            </TiltCard>
          </section>

          {/* Project 4: Omni-Vision */}
          <section className="space-y-6">
            <TiltCard intensity={8} className={`p-8 md:p-12 border-4 ${cardClass} relative overflow-hidden group`}>
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] font-black mix-blend-difference text-white">ID: GAMMA_03</div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={tagClass}>SPATIAL COMPUTING</span>
                <span className={tagClass}>AR / VR FRONTEND</span>
              </div>
              <div className="space-y-4">
                <h3 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${textPrimary}`}>03 / Omni-Vision</h3>
                <p className={`font-mono text-xs leading-relaxed ${textSecondary}`}>
                  Immersive augmented reality software frames engineered for custom spatial systems. Optimizes rendering loads to deliver stutter-free, high-density geometric environments directly to modern internet interfaces.
                </p>
              </div>
              <div className={`absolute -bottom-6 -right-6 text-[8rem] font-black opacity-10 pointer-events-none transform rotate-[-15deg] group-hover:rotate-0 transition-transform duration-500 ${textPrimary}`}>
                03
              </div>
            </TiltCard>
          </section>

        </div>
      </div>
    </div>
  );
}
