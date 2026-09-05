"use client";

import React from "react";
import Link from "next/link";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

export function FinalCTASection() {
  return (
    <section id="start-build" className="py-28 px-6 sm:px-12 md:px-16 bg-[#faf9f5] border-t-2 border-black relative overflow-hidden select-none">
      <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
        
        <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-1.5 rounded-full text-[9px] font-mono font-black tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#ff1e90]">
          <span className="w-2 h-2 rounded-full bg-[#d8ff42] border border-black animate-pulse" />
          10 // INITIATE COLLABORATION
        </div>

        <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter text-[#0a0a0a] leading-[0.9]">
          Have a system <br />
          <span className="text-[#ff1e90] underline decoration-black decoration-wavy decoration-3">
            worth building?
          </span>
        </h2>

        <p className="font-sans text-base sm:text-xl text-zinc-600 max-w-xl mx-auto leading-relaxed">
          Tell us what you&apos;re trying to build, automate, replace, or fix. Our lead systems architect will review your parameters and respond in under 24 hours with an initial technical blueprint.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            onClick={() => playTickSound()}
            className="w-full sm:w-auto bg-[#d8ff42] text-black font-mono font-black text-sm tracking-widest uppercase px-10 py-6 rounded-2xl border-[3px] border-black shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#ff1e90] hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 transition-all interactive"
          >
            START A BUILD →
          </Link>
          <a
            href="mailto:hello@vistar.tech"
            className="w-full sm:w-auto bg-white text-black font-mono font-bold text-xs tracking-wider uppercase px-8 py-6 rounded-2xl border-2 border-black/20 hover:border-black hover:bg-[#faf9f5] transition-all"
          >
            hello@vistar.tech ↗
          </a>
        </div>

        <div className="pt-8 flex flex-wrap justify-center items-center gap-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
          <span>● 24-HOUR EVALUATION</span>
          <span>● WRITTEN CORE WEB VITALS SLA</span>
          <span>● ZERO VENDOR LOCK-IN</span>
          <span>● 100% GITHUB HANDOVER</span>
        </div>

      </div>
    </section>
  );
}
