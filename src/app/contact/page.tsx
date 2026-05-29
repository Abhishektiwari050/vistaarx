"use client";

import { useState } from "react";
import { useScrollStore } from "@/lib/stores/scroll-store";

function BookingCalendar() {
  const [activeDate, setActiveDate] = useState<number | null>(null);
  const [statusText, setStatusText] = useState("SELECT TELEMETRY SLOT FOR ARCHITECT AUDIT");
  const theme = useScrollStore((s) => s.theme);

  const dates = [
    { day: 28, label: "MAY 28 (AP-SOUTH edge check)", status: "OPEN" },
    { day: 29, label: "MAY 29 (US-EAST node audit)", status: "OPEN" },
    { day: 30, label: "MAY 30 (EU-WEST cluster compile)", status: "OPEN" },
    { day: 31, label: "MAY 31 (System maintenance)", status: "LOCKED" },
    { day: 1, label: "JUN 01 (Direct director sync)", status: "OPEN" },
  ];

  let cardBg = "bg-white text-neutral-900 border-2 border-black";
  let borderClass = "shadow-[6px_6px_0px_rgba(255,0,128,1)]";
  let slotLocked = "border-neutral-200 bg-neutral-100/50 text-neutral-400 cursor-not-allowed";
  let slotActive = "border-black bg-[#ccff00] text-black shadow-[2px_2px_0px_rgba(255,0,128,1)]";
  let slotHover = "border-neutral-300 bg-white hover:border-black hover:bg-neutral-50 text-neutral-800 shadow-sm";
  let submitBtn = "bg-black text-white hover:bg-[#ff0080]";
  let headerColor = "text-black font-black";
  let labelColor = "text-[#ff0080] font-bold";

  if (theme === "cyber-dark") {
    cardBg = "bg-neutral-950 text-white border border-neutral-800";
    borderClass = "border-black shadow-[6px_6px_0px_rgba(255,0,128,0.25)]";
    slotLocked = "border-zinc-800 bg-neutral-900/40 text-zinc-600 cursor-not-allowed";
    slotActive = "border-[#ccff00] bg-neutral-900 text-[#ccff00] shadow-[2px_2px_0px_rgba(204,255,0,1)]";
    slotHover = "border-zinc-700 bg-neutral-900 hover:border-white hover:bg-neutral-800 text-white";
    submitBtn = "bg-white text-black hover:border-[#ccff00] hover:bg-[#ccff00]";
    headerColor = "text-[#ccff00]";
    labelColor = "text-[#ff0080]";
  } else if (theme === "mono") {
    cardBg = "bg-white text-neutral-900 border border-neutral-200";
    borderClass = "border-neutral-200 shadow-[6px_6px_0px_rgba(0,0,0,0.15)]";
    slotLocked = "border-neutral-200 bg-neutral-50 text-neutral-300 cursor-not-allowed";
    slotActive = "border-black bg-neutral-900 text-white shadow-[2px_2px_0px_rgba(0,0,0,1)]";
    slotHover = "border-neutral-300 bg-white hover:border-black hover:bg-neutral-50 text-neutral-800";
    submitBtn = "bg-black text-white hover:bg-neutral-800";
    headerColor = "text-black";
    labelColor = "text-neutral-500 font-bold";
  } else if (theme === "solar") {
    cardBg = "bg-[#140b04] text-orange-50 border border-[#ff5500]/20";
    borderClass = "border-[#ff5500]/20 shadow-[6px_6px_0px_rgba(255,85,0,0.25)]";
    slotLocked = "border-neutral-800 bg-neutral-900/20 text-orange-900 cursor-not-allowed";
    slotActive = "border-[#ffcc00] bg-black text-[#ffcc00] shadow-[2px_2px_0px_rgba(255,204,0,1)]";
    slotHover = "border-[#ff5500]/30 bg-[#1f1207] hover:border-white hover:bg-neutral-900 text-orange-100";
    submitBtn = "bg-white text-black hover:border-[#ffcc00] hover:bg-[#ffcc00]";
    headerColor = "text-[#ffcc00]";
    labelColor = "text-[#ff5500]";
  }

  return (
    <div className={`w-full border-2 p-6 transition-all ${cardBg} ${borderClass}`}>
      <div className="flex justify-between items-center border-b border-neutral-800/10 pb-3 mb-4 font-mono text-xs">
        <span className={`${headerColor}`}>DECK://QUALIFY_HUD</span>
        <span className="text-zinc-500">RESILIENT CALENDAR</span>
      </div>
      <p className={`font-mono text-[9px] ${labelColor} font-black uppercase tracking-wider mb-4`}>
        {statusText}
      </p>
      <div className="grid grid-cols-5 gap-2.5 mb-6">
        {dates.map((d, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (d.status === "LOCKED") return;
              setActiveDate(d.day);
              setStatusText(`✔ REQUEST SLOT: ${d.label} INITIALIZED.`);
            }}
            className={`py-3.5 border-2 font-mono text-xs font-bold transition-all cursor-pointer interactive text-center ${
              d.status === "LOCKED"
                ? slotLocked
                : activeDate === d.day
                ? slotActive
                : slotHover
            }`}
          >
            {d.day}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          if (!activeDate) return;
          setStatusText("🚀 DISPATCH SENT. Speccing latency targets, we connect in 10 mins.");
        }}
        disabled={!activeDate}
        className={`w-full py-3.5 font-mono text-xs font-black uppercase tracking-widest border-2 border-transparent transition-colors cursor-pointer interactive disabled:opacity-30 disabled:cursor-not-allowed ${submitBtn}`}
      >
        Lock Session
      </button>
    </div>
  );
}

export default function ContactPage() {
  const theme = useScrollStore((s) => s.theme);
  
  let cardClass = "bg-white/40 border-white/40 text-neutral-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl ring-1 ring-black/5";
  let textPrimary = "text-neutral-900";
  let textSecondary = "text-neutral-500";
  let subBorderColor = "border-black/5";
  let strokeText = "opacity-40";

  if (theme === "cyber-dark") {
    cardClass = "bg-black/40 border-white/10 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-2xl ring-1 ring-white/10";
    textPrimary = "text-white";
    textSecondary = "text-neutral-400";
    subBorderColor = "border-white/10";
    strokeText = "opacity-20 text-white";
  } else if (theme === "mono") {
    cardClass = "bg-white/60 border-neutral-200 text-neutral-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl rounded-2xl";
    textPrimary = "text-neutral-900";
    textSecondary = "text-neutral-500";
    subBorderColor = "border-neutral-100";
    strokeText = "opacity-20 text-black";
  } else if (theme === "solar") {
    cardClass = "bg-[#1a0f0a]/60 border-[#ff5500]/20 text-[#fff5eb] shadow-[0_8px_30px_rgba(255,85,0,0.1)] backdrop-blur-2xl ring-1 ring-[#ff5500]/20 rounded-2xl";
    textPrimary = "text-[#fff5eb]";
    textSecondary = "text-[#ff8844]";
    subBorderColor = "border-[#ff5500]/20";
    strokeText = "opacity-30 text-[#ff5500]";
  }

  return (
    <div className={`min-h-[calc(100vh-80px)] w-full relative flex flex-col justify-between px-6 md:px-12 pt-12 pb-8 z-20`}>
      
      <div className="hidden md:block" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full my-auto">
        <div className="md:col-span-6 space-y-6">
          <div className={`p-10 border ${cardClass} backdrop-blur-3xl rounded-2xl`}>
            <span className={`font-sans text-[10px] font-semibold uppercase tracking-widest mb-4 inline-block ${theme === 'mono' ? 'text-black' : theme === 'solar' ? 'text-[#ff5500]' : 'text-current opacity-60'}`}>
              05 // Project Initialization
            </span>
            <h2 className={`text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-6 ${textPrimary}`}>
              Launch <br/>
              <span className={`text-5xl md:text-6xl ${strokeText}`}>Project</span>
            </h2>
            
            <p className={`font-sans text-sm ${textSecondary} leading-relaxed mb-8 font-light`}>
              Ready to initialize dynamic software scaling? Connect with our engineering directors or qualify your session directly below.
            </p>

            <div className="space-y-4 font-sans text-sm mb-10">
              <div className={`flex justify-between items-center pb-2 border-b ${subBorderColor}`}>
                <span className={textSecondary}>Deck Direct</span>
                <a href="mailto:architect@vistar.studio" className={`font-medium transition-colors interactive hover:opacity-70 ${theme === 'mono' ? 'text-black' : theme === 'solar' ? 'text-[#ffcc00]' : 'text-white'}`}>architect@vistar.studio</a>
              </div>
              <div className={`flex justify-between items-center pb-2 border-b ${subBorderColor}`}>
                <span className={textSecondary}>Dispatch Nodes</span>
                <span className="font-medium flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Synced & Ready</span>
              </div>
            </div>

            <BookingCalendar />
          </div>
        </div>

        <div className="hidden md:block md:col-span-6" />

      </div>

      {/* Footer information */}
      <div className={`flex flex-col md:flex-row justify-between items-center border-t ${subBorderColor} pt-8 mt-12 font-sans text-[10px] uppercase tracking-wider text-neutral-500 gap-4 select-none`}>
        <p>© 2026 Vistar Studio. All rights reserved.</p>
        <p>Design: System V3 // Matte Carbon // Theme: {theme.toUpperCase()}</p>
      </div>

    </div>
  );
}
