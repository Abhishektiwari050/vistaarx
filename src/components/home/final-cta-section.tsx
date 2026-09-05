"use client";

import React from "react";
import Link from "next/link";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

export function FinalCTASection() {
  return (
    <section id="start-build" className="py-28 px-6 sm:px-12 md:px-16 bg-white border-t border-black/10 relative overflow-hidden select-none">
      <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
        
        <div className="inline-flex items-center gap-2 border border-black/80 bg-[#faf9f5] px-4 py-1.5 rounded text-[9px] font-mono font-bold tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#d8ff42]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d8ff42] border border-black" />
          COMMISSION // DIRECT ENGAGEMENT
        </div>

        <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-[#0a0a0a] leading-[0.9]">
          Have a system <br />
          <span className="font-serif italic font-normal text-zinc-500 lowercase">
            worth building?
          </span>
        </h2>

        <p className="font-sans text-base sm:text-lg text-zinc-600 max-w-xl mx-auto leading-relaxed">
          Tell us what you&apos;re trying to engineer, automate, or modernize. Our lead systems architect will evaluate your specifications and respond with an architectural blueprint.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            onClick={() => playTickSound()}
            className="w-full sm:w-auto bg-[#d8ff42] text-black font-mono font-bold text-xs tracking-widest uppercase px-10 py-5 rounded border border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all interactive"
          >
            START A BUILD →
          </Link>
          <a
            href="mailto:hello@vistar.tech"
            className="w-full sm:w-auto bg-white text-black font-mono font-bold text-xs tracking-wider uppercase px-8 py-5 rounded border border-black/30 hover:border-black hover:bg-[#faf9f5] transition-all"
          >
            hello@vistar.tech ↗
          </a>
        </div>

        <div className="pt-8 flex flex-wrap justify-center items-center gap-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
          <span>● 24-HOUR EVALUATION</span>
          <span>● WRITTEN ARCHITECTURAL BLUEPRINT</span>
          <span>● ZERO VENDOR LOCK-IN</span>
          <span>● 100% GITHUB HANDOVER</span>
        </div>

      </div>
    </section>
  );
}
