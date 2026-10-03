"use client";

import React from "react";
import TigerTearReveal from "@/components/ui/tiger-tear-reveal";

export function CourageRevealSection() {
  return (
    <section className="relative w-full pt-16 sm:pt-20 pb-12 bg-[#FAF9F5] border-t border-black/[0.08] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
        
        {/* Subtle section kicker */}
        <div className="max-w-2xl mx-auto text-center mb-6 space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#FF3823] font-semibold">
            FOUNDER CONVICTION
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#141413] font-serif">
            We build with speed, conviction, and zero hesitation.
          </h2>
        </div>

        {/* High-Performance 60fps Scroll Reveal Canvas */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-black/[0.08] shadow-sm bg-[#FAFAF9]">
          <TigerTearReveal
            word="COURAGE"
            tagline="HAVE NO FEAR // 14-DAY PRODUCTION SPRINTS"
            ink="#FF3823"
            paper="#FAFAF9"
            taglineColor="#5E605D"
            fontFamily='"Anton", Impact, "Bebas Neue", "Arial Black", sans-serif'
            height="520px"
            mode="scroll-reveal"
          />
        </div>

        {/* Grounded Founder Signature */}
        <div className="mt-6 text-center text-xs font-mono text-neutral-500">
          Direct engineering by Abhishek Tiwari &bull; Lucknow, Uttar Pradesh, India &bull; 100% Repository Sovereignty
        </div>

      </div>
    </section>
  );
}

export default CourageRevealSection;
