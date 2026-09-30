import React from "react";
import { Button } from "@/components/vistar-button";

export function FinalCTASection() {
  return (
    <section className="vistar-section border-t border-[rgba(14,165,233,0.12)] bg-gradient-to-b from-[#FFFFFF] via-[#F4F9FD] to-[#EBF5FB] text-[#0B1320] relative overflow-hidden py-24 md:py-36">
      {/* Radiant Cyan & Azure Ambient Gradient Accent */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-25 -z-10"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(2, 132, 199, 0.16), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="vistar-container text-center space-y-8 max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[rgba(14,165,233,0.18)] text-xs font-mono tracking-wider shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
          <span className="text-[#0B1320] font-bold">08 // DIRECT COMMISSION</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[#050A14] tracking-[-0.035em] leading-[1.05]">
          Ready to engineer your next sovereign system?
        </h2>

        <p className="text-[#475569] max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed font-serif">
          Tell us what you need to build, automate, or scale. We review architectural specifications and return a concrete 14-day sprint roadmap within 24 hours.
        </p>

        {/* Risk Reducer Highlight Banner */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-[8px] bg-white border border-[rgba(14,165,233,0.15)] shadow-xs font-mono text-xs text-[#64748B]">
          <span className="flex items-center gap-1.5 text-[#0B1320] font-medium">
            <span className="text-[#0284C7] font-bold">✓</span> Free 30-min architecture review
          </span>
          <span className="text-[#0B1320]/20">•</span>
          <span className="flex items-center gap-1.5 text-[#0B1320] font-medium">
            <span className="text-[#0284C7] font-bold">✓</span> Zero upfront commitment
          </span>
          <span className="text-[#0B1320]/20">•</span>
          <span className="flex items-center gap-1.5 text-[#0B1320] font-medium">
            <span className="text-[#0284C7] font-bold">✓</span> 24-hour milestone roadmap
          </span>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" href="/start">
            Start a 14-Day Sprint →
          </Button>
          <Button variant="secondary" href="mailto:services.vistaar@gmail.com" external>
            Contact Engineering ↗
          </Button>
        </div>

        <div className="pt-10 flex flex-wrap justify-center items-center gap-4 sm:gap-8 font-mono text-xs text-[#64748B] uppercase tracking-wider border-t border-[rgba(14,165,233,0.12)]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
            24-HOUR TECHNICAL REVIEW
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]" />
            ZERO VENDOR LOCK-IN
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B1320]" />
            100% GITHUB HANDOVER
          </span>
        </div>
      </div>
    </section>
  );
}

export default FinalCTASection;
