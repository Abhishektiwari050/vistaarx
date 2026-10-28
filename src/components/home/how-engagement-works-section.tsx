"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  FileCheck,
  Hammer,
  ShieldAlert,
  GitBranch,
  RefreshCw,
  ArrowRight,
  Clock,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  KeyRound,
  ExternalLink,
  Laptop,
} from "lucide-react";

interface Stage {
  id: string;
  num: string;
  tabLabel: string;
  title: string;
  tagline: string;
  summary: string;
  deliverables: string[];
  visualType: "flow" | "scope" | "build" | "verify" | "handover" | "scale";
}

const STAGES: Stage[] = [
  {
    id: "understand",
    num: "01",
    tabLabel: "Understand",
    title: "Uncover the real operational bottleneck",
    tagline: "Focused discovery directly with our lead engineer",
    summary:
      "A 30-minute discovery conversation directly with our lead engineer. We audit your existing tools, data touchpoints, and manual bottlenecks to determine if software will genuinely save your business time.",
    deliverables: [
      "Process map of current vs. automated workflow",
      "Identification of tool integrations needed (WhatsApp, Sheets, DB)",
      "Honest assessment of whether software is even required",
    ],
    visualType: "flow",
  },
  {
    id: "scope",
    num: "02",
    tabLabel: "Scope",
    title: "Fixed boundaries and zero billing surprises",
    tagline: "Explicit statement of work and signed bilateral NDA",
    summary:
      "Before writing any code, we define a comprehensive technical specification with clear boundaries, deliverable checklists, system architecture, and an upfront fixed dual-currency price.",
    deliverables: [
      "Bilateral Mutual NDA executed",
      "Explicit statement of work with deliverable checklists",
      "Upfront fixed cost with zero hourly meter or billable surprises",
    ],
    visualType: "scope",
  },
  {
    id: "build",
    num: "03",
    tabLabel: "Build",
    title: "Visible sprints with live staging access",
    tagline: "Direct founder access and private staging URLs",
    summary:
      "We engineer your system in transparent, rapid two-week sprints. You test working staging environments as features are built, paired with direct WhatsApp access to your dedicated engineer.",
    deliverables: [
      "Private GitHub repository commits from day one",
      "Live interactive staging environment for real-world testing",
      "Direct WhatsApp and email channel with your lead engineer",
    ],
    visualType: "build",
  },
  {
    id: "verify",
    num: "04",
    tabLabel: "Verify",
    title: "Stress testing, rate limiting, and security hygiene",
    tagline: "Automated regression suites and edge-case validation",
    summary:
      "We test against real-world chaos: malformed customer inputs, network dropouts, rate-limiting, and role-based permissions to guarantee reliable production uptime.",
    deliverables: [
      "Automated unit and integration test suite passing",
      "Anti-spam honeypot and rate-limiting validation",
      "Cross-device mobile, tablet, and desktop verification",
    ],
    visualType: "verify",
  },
  {
    id: "handover",
    num: "05",
    tabLabel: "Hand Over",
    title: "100% repository transfer and team walkthrough",
    tagline: "Total administrative ownership transferred on deployment day",
    summary:
      "Full administrative rights to the private GitHub repository transfer to your organization. We deploy directly to your cloud infrastructure and provide complete runbooks plus a 30-day bug warranty.",
    deliverables: [
      "100% private GitHub repository rights transferred",
      "Environment runbook and administrative walkthrough",
      "30-day post-launch warranty covering any defects",
    ],
    visualType: "handover",
  },
  {
    id: "scale",
    num: "06",
    tabLabel: "Scale",
    title: "Autonomous operation with zero hostage retainers",
    tagline: "Run independently or expand with on-demand milestones",
    summary:
      "You have zero obligation to retain us. Many clients run their deployed systems autonomously for years. If you want ongoing feature additions, we offer flexible month-to-month retainers.",
    deliverables: [
      "Zero retainer lock-in (you own 100% of all code)",
      "Optional monthly SLA support and maintenance",
      "Priority roadmap scheduling for subsequent features",
    ],
    visualType: "scale",
  },
];

export function HowEngagementWorksSection() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const current = STAGES[activeStage];

  return (
    <section className="w-full py-16 sm:py-24 bg-white text-[#121316]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/8 text-neutral-700 text-xs font-mono font-semibold uppercase tracking-wider">
            Clear Engagement Model
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#121316] leading-[1.12] text-balance">
            How we work together, step by step.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal text-pretty">
            No agency telephone games, no unvetted junior handoffs, and zero runaway hourly meters. Every project follows a disciplined six-stage engineering lifecycle.
          </p>
        </div>

        {/* ── INTERACTIVE LIFECYCLE CONSOLE (TASTE-SKILL COMPLIANT) ── */}
        <div className="w-full bg-[#FAF9F6] border border-black/10 rounded-2xl p-4 sm:p-7 shadow-[0_2px_14px_rgba(0,0,0,0.02)]">
          
          {/* Stage Selector Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 sm:pb-4 border-b border-black/8 scrollbar-none">
            {STAGES.map((s, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStage(idx)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-[#121316] text-white shadow-xs"
                      : "bg-white text-neutral-600 hover:text-neutral-900 border border-black/6 hover:bg-neutral-100/60"
                  }`}
                  aria-selected={isActive}
                >
                  <span className={`font-mono text-[11px] font-semibold ${isActive ? "text-[#FF8A7A]" : "text-neutral-400"}`}>
                    {s.num}
                  </span>
                  <span>{s.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Body: 2-Column Responsive Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-6 sm:mt-8 items-start">
            
            {/* Left Column: Stage Details (Concise, High-Signal Copy) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#FF3823] uppercase tracking-wider">
                  <span>Stage {current.num} / 06</span>
                  <span>&bull;</span>
                  <span className="text-neutral-500">{current.tagline}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#121316] leading-snug text-balance">
                  {current.title}
                </h3>

                <p className="text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-normal text-pretty">
                  {current.summary}
                </p>

                {/* Verified Deliverables */}
                <div className="pt-2 space-y-2.5">
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400">
                    Verified Deliverables:
                  </div>
                  <ul className="space-y-2">
                    {current.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Progress Indicator & Quick Link */}
              <div className="pt-4 border-t border-black/6 flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span>Phase {activeStage + 1} of 6</span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-neutral-900 font-semibold hover:text-[#FF3823] transition-colors"
                >
                  <span>Start with Phase 01</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Live Working Product Fragment */}
            <div className="lg:col-span-7 bg-[#121316] text-white rounded-xl p-5 sm:p-6 border border-black/10 shadow-lg min-h-[340px] flex flex-col justify-between overflow-hidden">
              
              {/* Console Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="ml-2 text-neutral-300">vistar-engine // stage-{current.num}</span>
                </div>
                <span className="text-emerald-400 font-medium">LIVE VERIFIED</span>
              </div>

              {/* Interactive Artifact Content Depending on Active Stage */}
              <div className="py-6 flex-1 flex flex-col justify-center">
                
                {/* 01: Understand Diagram */}
                {current.visualType === "flow" && (
                  <div className="space-y-4">
                    <div className="text-xs font-mono text-neutral-400 uppercase">
                      Target Architecture Mapping
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-[11px] font-mono text-amber-400 font-semibold">01 INTAKE</div>
                        <div className="text-sm font-semibold text-white mt-1">Multi-Channel Inquiries</div>
                        <div className="text-xs text-neutral-400 mt-1">WhatsApp Webhooks &amp; Web Forms</div>
                      </div>
                      <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-[11px] font-mono text-sky-400 font-semibold">02 PARSE &amp; SYNC</div>
                        <div className="text-sm font-semibold text-white mt-1">Python Worker Engine</div>
                        <div className="text-xs text-neutral-400 mt-1">Sheets &amp; Postgres Storage</div>
                      </div>
                      <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-[11px] font-mono text-emerald-400 font-semibold">03 DISPATCH</div>
                        <div className="text-sm font-semibold text-white mt-1">Instant Rep Routing</div>
                        <div className="text-xs text-neutral-400 mt-1">&lt;10s WhatsApp Notification</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 02: Scope Document */}
                {current.visualType === "scope" && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-neutral-400 border-b border-white/10 pb-2">
                        <span>LEGAL &amp; SCOPE BOUNDARIES</span>
                        <span className="text-emerald-400">EXECUTED</span>
                      </div>
                      <div className="text-neutral-300 flex items-center justify-between pt-1">
                        <span>Bilateral Mutual NDA:</span>
                        <span className="text-white font-semibold">Signed &amp; Enforced</span>
                      </div>
                      <div className="text-neutral-300 flex items-center justify-between">
                        <span>Milestone Specification:</span>
                        <span className="text-white font-semibold">Explicit Written Inclusions</span>
                      </div>
                      <div className="text-neutral-300 flex items-center justify-between">
                        <span>Pricing Structure:</span>
                        <span className="text-white font-semibold">100% Fixed (No Hourly Surprise)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 03: Build Git & Staging */}
                {current.visualType === "build" && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-neutral-400">
                      <span>GITHUB REPO STREAM</span>
                      <span className="text-sky-400">main &bull; HEAD</span>
                    </div>
                    <div className="p-3 rounded-lg bg-black/60 border border-white/10 space-y-1.5 text-neutral-300">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <span>commit 48a2f1c</span>
                        <span className="text-neutral-400">feat(intake): WhatsApp webhook handler verified</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <span>commit e2019ba</span>
                        <span className="text-neutral-400">feat(db): schema migrations and postgres connection pool</span>
                      </div>
                      <div className="flex items-center gap-2 text-sky-400">
                        <span>deploy success</span>
                        <span className="text-neutral-300">Staging: https://staging.vistar.internal (v1.2)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 04: Verify Test Suite */}
                {current.visualType === "verify" && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-neutral-400">AUTOMATED TEST SUITE</span>
                        <span className="text-emerald-400 font-bold">48 / 48 PASSED</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                        <div className="flex items-center gap-1.5 text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Honeypot Spam Defense</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Edge TTFB: 82ms</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Mobile Viewport Check</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Rate-Limiting Safeguard</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 05: Handover Ownership Certificate */}
                {current.visualType === "handover" && (
                  <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/30 space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-emerald-400 font-semibold border-b border-emerald-500/20 pb-2">
                      <span>ADMINISTRATIVE TRANSFER</span>
                      <span>100% SOVEREIGN</span>
                    </div>
                    <div className="text-neutral-200 space-y-1 pt-1">
                      <div>Repository: Private GitHub Admin Rights Handed Over</div>
                      <div>Infrastructure: Deployed to Client-Owned Cloud</div>
                      <div className="text-emerald-300">Warranty: 30-Day Zero-Cost Defect Coverage Included</div>
                    </div>
                  </div>
                )}

                {/* 06: Scale Autonomy */}
                {current.visualType === "scale" && (
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2.5 text-xs font-mono">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-neutral-400">MAINTENANCE &amp; EVOLUTION</span>
                      <span className="text-emerald-400 font-bold">ZERO LOCK-IN</span>
                    </div>
                    <div className="text-neutral-300">
                      Clean documentation allows your internal developers to maintain every line.
                    </div>
                    <div className="text-neutral-400 text-[11px]">
                      Optional month-to-month SLA retainers available strictly on demand.
                    </div>
                  </div>
                )}

              </div>

              {/* Console Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>VISTAR Digital Systems</span>
                <span className="text-neutral-300 font-medium">Sprint Time: 5–14 Business Days</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HowEngagementWorksSection;
