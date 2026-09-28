"use client";

import React, { useState } from "react";
import { playClick } from "@/lib/sound";

interface ComparisonRow {
  dimension: string;
  traditional: string;
  vistar: string;
  badge: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: "Delivery Velocity",
    traditional: "4 to 6 months of discovery meetings, mood boards, and slide decks before code is written.",
    vistar: "14-day production milestones. Working software and live staging deployments at every checkpoint.",
    badge: "10x Velocity",
  },
  {
    dimension: "Codebase Sovereignty",
    traditional: "Proprietary CMS locks, obfuscated codebases, and vendor dependencies for simple updates.",
    vistar: "100% sovereign code ownership transferred directly to your private GitHub repository on day one.",
    badge: "100% Sovereign",
  },
  {
    dimension: "AI Architecture",
    traditional: "Generic chatbot iframe embeds with high latency and zero security isolation.",
    vistar: "Custom agent harnesses, strict schema validation, vector pipelines, and live telemetry streaming.",
    badge: "Production AI",
  },
  {
    dimension: "Engineering Access",
    traditional: "Layered account reps brokering communications to junior external contractors.",
    vistar: "Direct pairing with staff-level design engineers who architect, write, and deploy your code.",
    badge: "Senior Squads",
  },
  {
    dimension: "Web Performance",
    traditional: "Heavy legacy bundles with 4+ second load times and neglected Core Web Vitals.",
    vistar: "Sub-2.5s Largest Contentful Paint, 99+ Lighthouse performance, and 60fps interaction models.",
    badge: "Sub-100ms LCP",
  },
];

export function AgencyComparisonSection() {
  const [activeHoverIdx, setActiveHoverIdx] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-gradient-to-b from-[#F1F6FB] via-[#F8FBFE] to-[#FFFFFF] border-b border-[rgba(14,165,233,0.12)] py-18 sm:py-24 font-serif">
      <div className="vistar-container space-y-12">
        {/* Section Header with Sequential Numbering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[rgba(14,165,233,0.12)] pb-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[rgba(14,165,233,0.15)] text-xs font-mono text-[#64748B] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span className="font-semibold text-[#0B1320]">05 // Architectural Advantage</span>
              <span className="text-[#0B1320]/25">•</span>
              <span>The Studio Difference</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#050A14] tracking-[-0.03em] leading-tight">
              Why fast-moving teams choose Vistar.
            </h2>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-serif">
              We eliminated bureaucratic agency overhead to give venture-backed founders and engineering leaders pure production velocity.
            </p>
          </div>

          <div className="hidden lg:block text-right font-mono text-xs text-[#64748B]">
            <span className="text-[#0284C7] font-semibold">14-Day Delivery Model</span>
            <br />
            <span>Deterministic Milestones</span>
          </div>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="space-y-3">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-12 gap-6 px-6 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B] border-b border-[rgba(14,165,233,0.10)]">
            <div className="col-span-3">Vector</div>
            <div className="col-span-4 text-[#64748B]/70">Traditional Agencies</div>
            <div className="col-span-5 text-[#0284C7]">The Vistar Standard</div>
          </div>

          {/* Data Rows */}
          {COMPARISON_ROWS.map((row, idx) => (
            <div
              key={idx}
              onMouseEnter={() => {
                setActiveHoverIdx(idx);
                playClick(2800, 0.01);
              }}
              onMouseLeave={() => setActiveHoverIdx(null)}
              className={`p-5 sm:p-6 rounded-[10px] border transition-all duration-200 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center ${
                activeHoverIdx === idx
                  ? "bg-white border-[rgba(2,132,199,0.35)] shadow-[0_6px_20px_rgba(2,132,199,0.08)]"
                  : "bg-white/80 border-[rgba(14,165,233,0.10)] hover:bg-white"
              }`}
            >
              {/* Vector Label & Mobile Badge */}
              <div className="md:col-span-3 space-y-1">
                <span className="inline-block px-2 py-0.5 rounded-[4px] bg-[#F0F7FC] border border-[rgba(14,165,233,0.15)] font-mono text-[10.5px] font-bold text-[#0284C7] tracking-wider uppercase mb-1">
                  {row.badge}
                </span>
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#0B1320] tracking-tight">
                  {row.dimension}
                </h3>
              </div>

              {/* Traditional Agency Flaw */}
              <div className="md:col-span-4 text-xs sm:text-[13.5px] text-[#64748B] leading-relaxed font-serif">
                <span className="md:hidden font-mono text-[10.5px] uppercase font-semibold text-[#64748B] block mb-1">
                  Traditional:
                </span>
                {row.traditional}
              </div>

              {/* Vistar Advantage */}
              <div className="md:col-span-5 text-xs sm:text-[13.5px] text-[#0B1320] font-medium leading-relaxed bg-[#F0F7FC] p-3.5 rounded-[6px] border border-[rgba(14,165,233,0.12)] font-serif">
                <span className="md:hidden font-mono text-[10.5px] uppercase font-bold text-[#0284C7] block mb-1">
                  Vistar:
                </span>
                <div className="flex items-start gap-2">
                  <span className="text-[#0284C7] font-bold">✓</span>
                  <span>{row.vistar}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AgencyComparisonSection;
