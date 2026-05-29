"use client";

import { useState } from "react";
import { useScrollStore } from "@/lib/stores/scroll-store";
import { TiltCard } from "@/components/3d/tilt-card";

export default function ContactPage() {
  const theme = useScrollStore((s) => s.theme);
  
  // Console inputs state
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [missionSpecs, setMissionSpecs] = useState("");
  const [targetBudget, setTargetBudget] = useState("$15,000 – $25,000 (Creative WebGL Landing)");
  const [activeDate, setActiveDate] = useState<number | null>(null);
  const [statusText, setStatusText] = useState("AWAITING OPERATOR INPUT...");
  const [isLocked, setIsLocked] = useState(false);

  const dates = [
    { day: 28, label: "MAY 28 (AP-SOUTH edge check)", status: "OPEN" },
    { day: 29, label: "MAY 29 (US-EAST node audit)", status: "OPEN" },
    { day: 30, label: "MAY 30 (EU-WEST cluster compile)", status: "OPEN" },
    { day: 31, label: "MAY 31 (System maintenance)", status: "LOCKED" },
    { day: 1, label: "JUN 01 (Direct director sync)", status: "OPEN" },
  ];

  let cardClass = "bg-white/40 border-black/10 text-neutral-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl ring-1 ring-black/5";
  let textPrimary = "text-neutral-900";
  let textSecondary = "text-neutral-600";
  let subBorderColor = "border-black/10";
  let strokeText = "opacity-40 text-black";
  let inputClass = "w-full p-3 font-mono text-xs border-2 border-black bg-white text-black focus:outline-none focus:bg-neutral-50 focus:shadow-[2px_2px_0px_0px_#ff0080] transition-all";
  let activeSlotClass = "border-black bg-[#ccff00] text-black shadow-[2px_2px_0px_rgba(255,0,128,1)]";
  let hoverSlotClass = "border-neutral-300 bg-white hover:border-black hover:bg-neutral-50 text-neutral-800";
  let lockedSlotClass = "border-neutral-200 bg-neutral-100/50 text-neutral-400 cursor-not-allowed";
  let lockBtnClass = "bg-black text-white hover:bg-[#ff0080] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer";

  if (theme === "cyber-dark") {
    cardClass = "bg-black/40 border-white/10 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-2xl ring-1 ring-white/10";
    textPrimary = "text-white";
    textSecondary = "text-neutral-300";
    subBorderColor = "border-white/10";
    strokeText = "opacity-20 text-white";
    inputClass = "w-full p-3 font-mono text-xs border-2 border-[#ccff00] bg-black text-white focus:outline-none focus:bg-neutral-900 focus:shadow-[2px_2px_0px_0px_#ff0080] transition-all";
    activeSlotClass = "border-[#ccff00] bg-neutral-900 text-[#ccff00] shadow-[2px_2px_0px_rgba(204,255,0,1)]";
    hoverSlotClass = "border-zinc-700 bg-neutral-900 hover:border-white hover:bg-neutral-800 text-white";
    lockedSlotClass = "border-zinc-800 bg-neutral-900/40 text-zinc-600 cursor-not-allowed";
    lockBtnClass = "bg-[#ccff00] text-black hover:border-white hover:bg-white shadow-[4px_4px_0px_0px_#ff0080] hover:shadow-none hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer";
  } else if (theme === "mono") {
    cardClass = "bg-white/60 border-neutral-200 text-neutral-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl rounded-2xl";
    textPrimary = "text-neutral-900";
    textSecondary = "text-neutral-600";
    subBorderColor = "border-neutral-100";
    strokeText = "opacity-20 text-black";
    inputClass = "w-full p-3 font-mono text-xs border-2 border-black bg-white text-black focus:outline-none focus:bg-neutral-50 transition-all";
    activeSlotClass = "border-black bg-neutral-900 text-white shadow-[2px_2px_0px_rgba(0,0,0,1)]";
    hoverSlotClass = "border-neutral-300 bg-white hover:border-black hover:bg-neutral-50 text-neutral-800";
    lockedSlotClass = "border-neutral-200 bg-neutral-50 text-neutral-300 cursor-not-allowed";
    lockBtnClass = "bg-black text-white hover:bg-neutral-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer";
  } else if (theme === "solar") {
    cardClass = "bg-[#1a0f0a]/60 border-[#ff5500]/20 text-[#fff5eb] shadow-[0_8px_30px_rgba(255,85,0,0.1)] backdrop-blur-2xl ring-1 ring-[#ff5500]/20 rounded-2xl";
    textPrimary = "text-[#fff5eb]";
    textSecondary = "text-[#ffaa77]";
    subBorderColor = "border-[#ff5500]/20";
    strokeText = "opacity-30 text-[#ff5500]";
    inputClass = "w-full p-3 font-mono text-xs border-2 border-[#ff5500] bg-black text-[#fff5eb] focus:outline-none focus:bg-[#1f1207] focus:shadow-[2px_2px_0px_0px_#ffcc00] transition-all";
    activeSlotClass = "border-[#ffcc00] bg-black text-[#ffcc00] shadow-[2px_2px_0px_rgba(255,204,0,1)]";
    hoverSlotClass = "border-[#ff5500]/30 bg-[#1f1207] hover:border-white hover:bg-neutral-900 text-orange-100";
    lockedSlotClass = "border-neutral-800 bg-neutral-900/20 text-orange-900 cursor-not-allowed";
    lockBtnClass = "bg-white text-black hover:border-[#ffcc00] hover:bg-[#ffcc00] shadow-[4px_4px_0px_0px_#ff5500] hover:shadow-none hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer";
  }

  const handleLockSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !activeDate) return;
    setIsLocked(true);
    setStatusText("TRANSMITTING COORDINATES TO VISTAR_HQ...");
    
    // Simulate high-end compiler log transitions
    setTimeout(() => {
      setStatusText("✔ STAGE 1: PACKET COMPILING COMPLETE.");
    }, 850);
    setTimeout(() => {
      setStatusText("✔ STAGE 2: EDGE CLUSTERS ROUTED.");
    }, 1700);
    setTimeout(() => {
      setStatusText("🚀 SECURE DISPATCH COMPLETED. HELLO@VISTAR.TECH NOTIFIED.");
    }, 2500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full relative flex flex-col justify-between px-6 md:px-12 pt-12 pb-8 z-20 max-w-7xl mx-auto">
      {/* Native dynamic React 19 document title */}
      <title>Connect // Vistar Studio</title>
      <meta name="description" content="Inquire about custom high-performance WebGL design and backend architecture project coordinates at Vistar Studio." />

      <div className="hidden md:block" />

      <form 
        onSubmit={handleLockSession} 
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full my-auto z-10 pt-8"
      >
        
        {/* COL 1: DECK COORDINATES (Inputs) - 6 Columns */}
        <div className="lg:col-span-6 flex">
          <TiltCard intensity={5} className={`p-8 md:p-10 border ${cardClass} flex flex-col justify-between w-full h-full`}>
            <div className="space-y-6 w-full">
              <span className={`font-mono text-[9px] font-black uppercase tracking-widest ${theme === 'mono' ? 'text-black' : theme === 'solar' ? 'text-[#ff5500]' : 'text-current opacity-70'}`}>
                05 // PROJECT INITIALIZATION
              </span>
              <h2 className={`text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] uppercase ${textPrimary}`}>
                DECK <br/>
                <span className={strokeText}>COORDINATES</span>
              </h2>
              
              <div className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] font-black uppercase text-neutral-400">CLIENT_NAME_ID</label>
                  <input 
                    type="text" 
                    required
                    disabled={isLocked}
                    value={clientName} 
                    onChange={(e) => setClientName(e.target.value)} 
                    placeholder="E.G. MARCUS VANCE..." 
                    className={inputClass}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] font-black uppercase text-neutral-400">CLIENT_SECURE_COORDINATES</label>
                  <input 
                    type="email" 
                    required
                    disabled={isLocked}
                    value={clientEmail} 
                    onChange={(e) => setClientEmail(e.target.value)} 
                    placeholder="E.G. MARCUS@QUANTUM.COM..." 
                    className={inputClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] font-black uppercase text-neutral-400">MISSION_SPECS_BRIEF</label>
                  <textarea 
                    rows={3}
                    disabled={isLocked}
                    value={missionSpecs} 
                    onChange={(e) => setMissionSpecs(e.target.value)} 
                    placeholder="DESCRIBE YOUR PROJECT GOALS..." 
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] font-black uppercase text-neutral-400">TARGET BUDGET RANGE</label>
                  <select 
                    disabled={isLocked}
                    value={targetBudget}
                    onChange={(e) => setTargetBudget(e.target.value)}
                    className={inputClass}
                  >
                    <option>$15,000 – $25,000 (Creative WebGL Landing)</option>
                    <option>$25,000 – $50,000 (Cinematic App + Core Stack)</option>
                    <option>$50,000+ (Full-Scale Custom Systems)</option>
                  </select>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* COL 2: AUDIT SCHEDULER & TELEMETRY LOG - 6 Columns */}
        <div className="lg:col-span-6 flex">
          <TiltCard intensity={5} className={`p-8 md:p-10 border ${cardClass} flex flex-col justify-between w-full h-full`}>
            <div className="space-y-6 w-full flex-grow">
              <div className="flex justify-between items-center border-b border-neutral-800/10 dark:border-white/10 pb-3 font-mono text-xs">
                <span className={`font-black ${theme === 'cyber-dark' ? 'text-[#ccff00]' : 'text-black'}`}>DECK://QUALIFY_HUD</span>
                <span className="text-zinc-500">24HR response SLA</span>
              </div>
              
              <div className="font-mono text-[10px] uppercase font-bold text-center border-2 border-dashed border-neutral-300 dark:border-zinc-700 py-3 bg-white/5 relative crt-effect">
                <span className={theme === 'solar' ? 'text-[#ff5500]' : theme === 'cyber-dark' ? 'text-[#ff0080]' : 'text-black font-black'}>
                  {statusText}
                </span>
              </div>

              <div className="space-y-4">
                <label className="font-mono text-[9px] font-black uppercase text-neutral-400">SELECT STRATEGY SLOT</label>
                <div className="grid grid-cols-5 gap-2">
                  {dates.map((d, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={d.status === "LOCKED" || isLocked}
                      onClick={() => {
                        setActiveDate(d.day);
                        setStatusText(`✔ REQUEST SLOT: ${d.label} CHOSEN.`);
                      }}
                      className={`py-3.5 border-2 font-mono text-xs font-black transition-all cursor-pointer interactive text-center ${
                        d.status === "LOCKED"
                          ? lockedSlotClass
                          : activeDate === d.day
                          ? activeSlotClass
                          : hoverSlotClass
                      }`}
                    >
                      {d.day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct human communication trust details */}
              <div className="pt-6 space-y-2 font-sans text-xs">
                <p className="font-mono text-[9px] font-black uppercase text-neutral-400">DIRECT HQ DETAILS:</p>
                <p className={textSecondary}>
                  Prefer a direct email? Shoot our architects your project coordinates at: <a href="mailto:hello@vistar.tech" className="font-mono font-bold underline text-black dark:text-white interactive">hello@vistar.tech</a>.
                </p>
                <p className={`${textSecondary} text-[11px]`}>
                  Location: Remote / Worldwide. All operations compiled globally.
                </p>
              </div>
            </div>

            <div className="pt-8 w-full">
              <button
                type="submit"
                disabled={!activeDate || !clientName || !clientEmail || isLocked}
                className={`w-full py-4 font-mono text-xs font-black uppercase tracking-widest border-2 border-transparent disabled:opacity-30 disabled:cursor-not-allowed ${lockBtnClass}`}
              >
                Lock Session & Inquire Now
              </button>
            </div>
          </TiltCard>
        </div>

      </form>

      {/* Footer information */}
      <div className={`flex flex-col md:flex-row justify-between items-center border-t ${subBorderColor} pt-6 mt-8 font-sans text-[9px] uppercase tracking-wider text-neutral-500 gap-4 select-none`}>
        <p>© 2026 Vistar Studio. All rights reserved.</p>
        <p>Design: System V3 // Matte Carbon // Theme: {theme.toUpperCase()}</p>
      </div>

    </div>
  );
}
