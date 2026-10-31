"use client";

import React from "react";
import TigerTearReveal from "@/components/ui/tiger-tear-reveal";

export function CourageRevealSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#FAF8F5] border-t border-black/[0.06] overflow-hidden select-none font-sans">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Heading Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/8 pb-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF3823] font-bold block">
              FOUNDER CONVICTION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#141518] leading-[1.10] text-balance">
              Built with speed, conviction, and zero hesitation.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-sm font-normal text-pretty">
            Interactive canvas &bull; Scroll down to tear the paper and reveal the amber gaze underneath.
          </p>
        </div>

        {/* Cinematic Scroll-Driven Canvas Frame */}
        <div className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden border border-black/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] bg-[#FAFAF9]">
          <TigerTearReveal
            word="COURAGE"
            tagline="HAVE NO FEAR // 14-DAY PRODUCTION SPRINTS"
            ink="#FF3823"
            paper="#FAFAF9"
            taglineColor="#5E605D"
            fontFamily='"Anton", Impact, "Bebas Neue", "Arial Black", sans-serif'
            height="clamp(380px, 56vh, 560px)"
            mode="scroll-reveal"
          />
        </div>

        {/* Clean Studio Datum */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-500 pt-2">
          <span>Direct engineering by VISTAR Web Systems</span>
          <span className="hidden sm:inline text-neutral-300">&bull;</span>
          <span>New Delhi, India</span>
          <span className="hidden sm:inline text-neutral-300">&bull;</span>
          <span className="text-neutral-700 font-semibold">100% Repository Sovereignty Guaranteed</span>
        </div>

      </div>
    </section>
  );
}

export default CourageRevealSection;
