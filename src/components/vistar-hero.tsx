"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SplitText } from "@/components/split-text";
import { SystemAssemblyVisual } from "@/components/system-assembly-visual";
import { SystemCore3D } from "@/components/3d/system-core-3d";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

function LocalClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return <span>00:00 AM</span>;
  return <span>{time}</span>;
}

export function VistarHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-32 pb-16 px-6 sm:px-12 md:px-16 overflow-hidden">
      
      {/* Background System Grid Overlay */}
      <div className="absolute inset-0 system-grid opacity-[0.035] pointer-events-none z-0" />

      {/* 3D System Core Interactive Spatial Layer */}
      <SystemCore3D className="opacity-45 lg:opacity-65 z-0" />

      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-12 my-auto">
        
        {/* Top Operational Pill */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3.5 py-1.5 rounded-lg text-[9px] font-mono font-black tracking-[2px] uppercase text-black shadow-[3px_3px_0px_#B87333]">
            <span className="w-2 h-2 rounded-full bg-[#B87333] animate-pulse" />
            TECHNOLOGY SYSTEMS PARTNER // ARCHITECTURE &amp; ENGINEERING
          </div>
          <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
            EST. 2026 · CONTINUOUS DEPLOYMENT
          </span>
        </div>

        {/* Core Value Proposition & System Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: The Central Message (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-[5.5rem] uppercase tracking-tighter text-[#151515] leading-[0.92]">
              <SplitText text="We build the" direction="down" delay={0.05} />
              <br />
              <span className="text-[#F4F1EA] bg-[#151515] px-2 py-0.5 border-2 border-[#151515] shadow-[4px_4px_0px_#B87333] inline-block my-1">
                systems
              </span>
              <br />
              <SplitText text="your business" direction="down" delay={0.15} />
              <br />
              <span className="font-serif italic font-normal text-zinc-400 lowercase text-4xl sm:text-6xl lg:text-7xl block mt-1">
                runs on.
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-zinc-700 max-w-xl leading-relaxed">
              Websites. Applications. Workflow automations. AI systems. We engineer the connected technology infrastructure your business actually operates on. Zero generic templates. Zero bloated overhead. 100% client source code ownership.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                onClick={() => playTickSound()}
                className="bg-[#B87333] text-[#F4F1EA] font-mono font-black text-xs tracking-widest uppercase px-8 py-5 rounded-xl border-[2.5px] border-black shadow-[4px_4px_0px_#000] hover:bg-[#8C542C] hover:shadow-[6px_6px_0px_#8C542C] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all interactive"
              >
                START A BUILD →
              </Link>
              <Link
                href="/work"
                onClick={() => playTickSound()}
                className="bg-white text-black font-mono font-black text-xs tracking-widest uppercase px-8 py-5 rounded-xl border-[2.5px] border-black shadow-[4px_4px_0px_#000] hover:bg-[#F4F1EA] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all interactive"
              >
                EXPLORE OUR WORK →
              </Link>
            </div>

            {/* Credibility / Scope Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[9px] font-mono font-bold uppercase text-zinc-500">
              <span className="bg-white px-2.5 py-1 rounded border border-black/10">01 Digital Platforms</span>
              <span className="bg-white px-2.5 py-1 rounded border border-black/10">02 Web Applications</span>
              <span className="bg-white px-2.5 py-1 rounded border border-black/10">03 AI &amp; Multi-Agent</span>
              <span className="bg-white px-2.5 py-1 rounded border border-black/10">04 Workflow Automation</span>
            </div>
          </div>

          {/* Right Column: Interactive Systems Assembly Visual (5 Columns) */}
          <div className="lg:col-span-5 w-full">
            <SystemAssemblyVisual />
          </div>

        </div>

      </div>

      {/* Hero Footer Meta Strip */}
      <div className="max-w-6xl w-full mx-auto border-t-2 border-black/10 pt-6 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-mono tracking-widest uppercase text-zinc-500 relative z-10 select-none">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          SYSTEM KERNEL: ONLINE
        </span>
        <span className="hidden sm:inline">●</span>
        <span>SUB-100MS EDGE TTFB SLA</span>
        <span className="hidden sm:inline">●</span>
        <span className="flex items-center gap-1.5">
          <LocalClock />
          <span>· NEW DELHI HQ</span>
        </span>
        <span className="hidden sm:inline">●</span>
        <span>100% UNENCUMBERED IP HANDOVER</span>
      </div>
    </section>
  );
}

export default VistarHero;
