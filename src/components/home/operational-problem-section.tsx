"use client";

import React from "react";
import {
  MessageSquareWarning,
  BrainCircuit,
  FileSpreadsheet,
  Clock,
  Split,
  TrendingDown,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const PROBLEMS = [
  {
    icon: MessageSquareWarning,
    tag: "01 / SCATTERED LEADS",
    title: "Leads scattered across WhatsApp & inboxes",
    description:
      "Without a unified intake pipeline, enquiries sit unseen, reps double-contact leads, and high-value requests slip away unnoticed.",
    impact: "20–30% Leads Unanswered >24h",
  },
  {
    icon: BrainCircuit,
    tag: "02 / MEMORY FOLLOW-UPS",
    title: "Follow-ups dependent on memory & sticky notes",
    description:
      "Quotes get prepared, emailed, and forgotten. When closing relies on human memory rather than scheduled automation, revenue leaks weekly.",
    impact: "High-Margin Quotes Abandoned",
  },
  {
    icon: FileSpreadsheet,
    tag: "03 / REPETITIVE DATA ENTRY",
    title: "Copy-pasting across four spreadsheets",
    description:
      "Customer details copied from WhatsApp into a lead sheet, re-typed into invoices, and pasted into inventory. Skilled managers waste hours on clerical busywork.",
    impact: "15+ Hrs/Week Clerical Waste",
  },
  {
    icon: Clock,
    tag: "04 / MIDNIGHT REPORTING",
    title: "Operational reports stitched by hand",
    description:
      "When leadership asks for batch margins or pending orders, staff spend hours downloading disjointed CSVs and fixing broken formulas late at night.",
    impact: "Decisions on 3-Day Old Numbers",
  },
  {
    icon: Split,
    tag: "05 / DISCONNECTED TOOLS",
    title: "Tools that refuse to speak to each other",
    description:
      "Tally, WhatsApp, Google Sheets, and Gmail running in complete isolation with zero synchronization, creating conflicting operational records.",
    impact: "Conflicting Operational Silos",
  },
  {
    icon: TrendingDown,
    tag: "06 / PROCESSES BREAK AT SCALE",
    title: "Workflows crumbling as order volume scales",
    description:
      "Informal systems that worked for 20 orders/month buckle when volume hits 100. Disorganization causes fulfillment delays and customer churn.",
    impact: "Margin Loss Under Volume",
  },
];

export function OperationalProblemSection() {
  // Duplicated for gapless continuous infinite marquee loop (-50% translation)
  const marqueeItems = [...PROBLEMS, ...PROBLEMS];

  return (
    <section className="w-full py-14 sm:py-18 bg-[#FAF9F6] border-y border-black/8 text-[#121316] overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header - Compact and Direct */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/8 text-neutral-700 text-xs font-mono font-semibold uppercase tracking-wider">
            Operational Reality
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#121316] leading-[1.15]">
            Where businesses lose time, margin, and momentum.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Most operational friction isn’t caused by bad employees—it’s caused by disconnected tools, manual spreadsheets, and workflows that rely on memory instead of automated systems.
          </p>
        </div>

      </div>

      {/* Continuous Smooth Horizontal Friction Marquee */}
      <div className="relative w-full mt-8 sm:mt-10 group overflow-hidden">
        {/* Subtle Edge Fade Masks */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 bg-gradient-to-r from-[#FAF9F6] to-transparent" 
        />
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 bg-gradient-to-l from-[#FAF9F6] to-transparent" 
        />

        {/* Marquee Track with Pause-on-Hover */}
        <div className="flex w-max gap-4 sm:gap-5 [animation:marquee-scroll_36s_linear_infinite] group-hover:[animation-play-state:paused] py-2 px-4 will-change-transform">
          {marqueeItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.tag}-${index}`}
                className="w-[310px] sm:w-[350px] shrink-0 bg-white border border-black/8 rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-black/20 hover:shadow-md transition-all group/card select-none"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] font-mono font-semibold tracking-wider text-neutral-400 group-hover/card:text-[#FF3823] transition-colors">
                      {item.tag}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-neutral-50 border border-black/6 flex items-center justify-center text-neutral-500 group-hover/card:bg-[#FF3823]/10 group-hover/card:text-[#FF3823] transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-[#121316] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* High-Contrast Impact Badge */}
                <div className="mt-4 pt-3 border-t border-black/6 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[#FF3823] shrink-0" />
                  <span className="text-[11px] font-mono font-medium text-neutral-700">
                    {item.impact}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bridge Statement Banner */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 mt-8 sm:mt-10">
        <div className="p-5 sm:p-6 rounded-xl bg-white border border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1 max-w-2xl">
            <h4 className="text-sm sm:text-base font-semibold text-[#121316]">
              Recognize any of these bottlenecks in your current operations?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600">
              You don&rsquo;t need to rebuild your entire business overnight. A single focused automation or intake system unlocks immediate time savings.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-[#121316] hover:bg-[#282A2E] text-white text-xs sm:text-sm font-medium transition-all shrink-0 gap-2 shadow-xs"
          >
            <span>Audit a bottleneck with us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </section>
  );
}

export default OperationalProblemSection;
