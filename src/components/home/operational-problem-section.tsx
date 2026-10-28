"use client";

import React, { useState } from "react";
import {
  MessageSquareWarning,
  BrainCircuit,
  FileSpreadsheet,
  Clock,
  Split,
  TrendingDown,
  ArrowRight,
  AlertCircle,
  Zap,
  CheckCircle2,
  XCircle,
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
  const [activeMode, setActiveMode] = useState<"before" | "after">("before");
  const marqueeItems = [...PROBLEMS, ...PROBLEMS];

  return (
    <section className="w-full py-16 sm:py-24 bg-[#FAF9F6] border-y border-black/8 text-[#121316] overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/8 text-neutral-700 text-xs font-mono font-semibold uppercase tracking-wider">
              Operational Reality
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#121316] leading-[1.15] text-balance">
              Where businesses lose time, margin, and momentum.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal text-pretty">
              Most operational friction is not caused by team members. It is caused by disconnected tools, manual spreadsheets, and workflows that rely on memory instead of automated systems.
            </p>
          </div>

          {/* ── TACTILE BEFORE VS. AFTER TOGGLE ── */}
          <div className="flex items-center p-1.5 bg-white border border-black/10 rounded-xl shadow-xs shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveMode("before")}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeMode === "before"
                  ? "bg-[#181818] text-white shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <XCircle className="w-3.5 h-3.5 text-red-400" />
              <span>Manual Friction</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMode("after")}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeMode === "after"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>With VISTAR Engine</span>
            </button>
          </div>
        </div>

        {/* ── INTERACTIVE WORKFLOW COMPARISON CONSOLE ── */}
        <div className="mb-10 sm:mb-12">
          {activeMode === "before" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 animate-in fade-in duration-200">
              <div className="p-5 sm:p-6 bg-white border border-red-200/80 rounded-xl shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-red-600 uppercase tracking-wider">INTAKE BOTTLENECK</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-red-50 text-red-700 border border-red-100">LAG &gt; 24H</span>
                </div>
                <h3 className="text-base font-bold text-[#181818]">Scattered Enquiries</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  Inquiries land across personal WhatsApp chats, JustDial, and Gmail. Reps forget follow-ups or double-contact the same customer.
                </p>
                <div className="pt-2 border-t border-black/6 text-xs font-mono text-red-600 font-medium">
                  Result: 20% to 30% enquiries lost silently
                </div>
              </div>

              <div className="p-5 sm:p-6 bg-white border border-red-200/80 rounded-xl shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-red-600 uppercase tracking-wider">DATA ENTRY CHURN</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-red-50 text-red-700 border border-red-100">15+ HRS/WK</span>
                </div>
                <h3 className="text-base font-bold text-[#181818]">Copy-Paste Busywork</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  Staff manually re-typing customer names, addresses, and order items between WhatsApp, Excel spreadsheets, and billing software.
                </p>
                <div className="pt-2 border-t border-black/6 text-xs font-mono text-red-600 font-medium">
                  Result: Costly clerical errors &amp; billing friction
                </div>
              </div>

              <div className="p-5 sm:p-6 bg-white border border-red-200/80 rounded-xl shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-red-600 uppercase tracking-wider">REPORTING BLINDNESS</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-red-50 text-red-700 border border-red-100">3-DAY DELAY</span>
                </div>
                <h3 className="text-base font-bold text-[#181818]">Midnight Spreadsheets</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  Leadership waits days for pending quotes or order status reports, with managers stitching disjointed CSV files late at night.
                </p>
                <div className="pt-2 border-t border-black/6 text-xs font-mono text-red-600 font-medium">
                  Result: Decisions made on outdated numbers
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 animate-in fade-in duration-200">
              <div className="p-5 sm:p-6 bg-white border border-emerald-200 rounded-xl shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider">AUTOMATED INTAKE</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">&lt;10S RESPONSE</span>
                </div>
                <h3 className="text-base font-bold text-[#181818]">Instant Lead Routing</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  Webhooks capture customer inquiries from WhatsApp, IndiaMART, and website forms in real time, routing them directly to the right rep.
                </p>
                <div className="pt-2 border-t border-black/6 text-xs font-mono text-emerald-700 font-medium">
                  Outcome: Zero missed leads, instant closing speed
                </div>
              </div>

              <div className="p-5 sm:p-6 bg-white border border-emerald-200 rounded-xl shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider">BIDIRECTIONAL SYNC</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">100% AUTOMATED</span>
                </div>
                <h3 className="text-base font-bold text-[#181818]">Single Source of Truth</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  WhatsApp, Google Sheets, PostgreSQL, and internal databases sync continuously. Staff spend their day talking to clients, not typing data.
                </p>
                <div className="pt-2 border-t border-black/6 text-xs font-mono text-emerald-700 font-medium">
                  Outcome: 15+ hours recaptured per manager each week
                </div>
              </div>

              <div className="p-5 sm:p-6 bg-white border border-emerald-200 rounded-xl shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider">LIVE TELEMETRY</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">REAL-TIME</span>
                </div>
                <h3 className="text-base font-bold text-[#181818]">Instant Dashboard View</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  Real-time visibility into active quotes, margins, pending orders, and team response speed from your phone or browser.
                </p>
                <div className="pt-2 border-t border-black/6 text-xs font-mono text-emerald-700 font-medium">
                  Outcome: Decisions made on live, verified data
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Continuous Smooth Horizontal Friction Marquee */}
      <div className="relative w-full mt-2 group overflow-hidden">
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

                {/* High-Contrast Impact Badge with Tabular Numbers */}
                <div className="mt-4 pt-3 border-t border-black/6 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[#FF3823] shrink-0" />
                  <span className="text-[11px] font-mono font-medium text-neutral-700 tabular-nums">
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
            <h4 className="text-sm sm:text-base font-semibold text-[#121316] text-balance">
              Recognize any of these bottlenecks in your current operations?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 text-pretty">
              You do not need to rebuild your entire business overnight. A single focused automation or intake system unlocks immediate time savings.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-[#121316] hover:bg-[#282A2E] text-white text-xs sm:text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 gap-2 shadow-xs active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3823] focus-visible:ring-offset-2"
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
