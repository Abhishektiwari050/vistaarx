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
} from "lucide-react";
import Link from "next/link";

const PROBLEMS = [
  {
    icon: MessageSquareWarning,
    tag: "01 / SCATTERED ENQUIRIES",
    title: "Leads scattered across WhatsApp, phone, and inboxes",
    description:
      "A customer asks for pricing on WhatsApp, another fills a website form, and three call your sales reps. Without a unified intake system, messages sit unseen, reps double-contact the same lead, or lucrative enquiries slip away unnoticed.",
    example: "Example: 20–30% of incoming B2B quotation requests go unanswered for more than 24 hours.",
  },
  {
    icon: BrainCircuit,
    tag: "02 / MEMORY-BASED FOLLOW-UPS",
    title: "Follow-ups dependent on human memory and sticky notes",
    description:
      "Quotes get prepared, sent via email or PDF, and then forgotten. When closing a deal depends on whether a busy sales rep remembers to check in three days later, revenue leaks through the cracks every single week.",
    example: "Example: High-margin commercial deals lost simply because nobody sent the follow-up reminder.",
  },
  {
    icon: FileSpreadsheet,
    tag: "03 / REPETITIVE DATA ENTRY",
    title: "Copy-pasting the same numbers across four spreadsheets",
    description:
      "Customer details copied from WhatsApp into a lead sheet, re-typed into an invoice generator, and manually pasted into an inventory ledger. Skilled employees spend hours on clerical busywork instead of closing deals.",
    example: "Example: Over 15 hours per week wasted per manager on manual copy-paste reconciliation.",
  },
  {
    icon: Clock,
    tag: "04 / MIDNIGHT REPORTING",
    title: "Operational reporting assembled manually late at night",
    description:
      "When business owners want to know 'how many orders are pending' or 'what was our margin on this batch,' someone has to download three CSVs, fix broken formulas, and stitch them together by hand.",
    example: "Example: Leadership makes strategic inventory decisions using numbers that are three days old.",
  },
  {
    icon: Split,
    tag: "05 / DISCONNECTED TOOLS",
    title: "Tools that don't speak to each other",
    description:
      "You might use Tally or Zoho for accounts, WhatsApp for customer chats, Google Sheets for tracking, and Gmail for quotes. None of them share data automatically, creating blind spots across your business.",
    example: "Example: Operations, accounts, and sales teams operating on three conflicting sets of numbers.",
  },
  {
    icon: TrendingDown,
    tag: "06 / PROCESSES BREAK AT SCALE",
    title: "Workflows that crumble as order volume increases",
    description:
      "Informal systems that worked when you handled 20 orders a month start buckling when volume hits 100. Disorganization causes delivery delays, customer frustration, and staff burnout.",
    example: "Example: Increasing sales volume leads to more errors and complaints instead of healthy profit.",
  },
];

export function OperationalProblemSection() {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#FAF9F6] border-y border-black/8 text-[#121316]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/8 text-neutral-700 text-xs font-mono font-semibold uppercase tracking-wider">
            Operational Reality
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#121316] leading-[1.12]">
            Where businesses lose time, margin, and momentum.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Most operational friction isn’t caused by bad employees—it’s caused by disconnected tools, manual spreadsheets, and workflows that rely on memory instead of automated systems.
          </p>
        </div>

        {/* 6 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-12">
          {PROBLEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.tag}
                className="bg-white border border-black/8 rounded-2xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-black/20 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold tracking-wider text-neutral-400 group-hover:text-[#E1341E] transition-colors">
                      {item.tag}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-neutral-50 border border-black/6 flex items-center justify-center text-neutral-600 group-hover:bg-[#E1341E]/10 group-hover:text-[#E1341E] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-[19px] font-semibold text-[#121316] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-black/6">
                  <p className="text-xs font-mono text-neutral-500 bg-neutral-50 p-2.5 rounded-lg border border-black/4">
                    {item.example}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bridge Statement */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 max-w-2xl">
            <h4 className="text-lg font-semibold text-[#121316]">
              Recognize any of these bottlenecks in your current operations?
            </h4>
            <p className="text-sm text-neutral-600">
              You don&rsquo;t need to rebuild your entire business overnight. A single focused automation or intake system can unlock immediate time savings.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#121316] hover:bg-[#282A2E] text-white text-sm font-medium transition-all shrink-0 gap-2 shadow-xs"
          >
            <span>Audit a bottleneck with us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default OperationalProblemSection;
