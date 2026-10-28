"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Code2, Lock, GitBranch, Clock, Zap, Check, X, ArrowRight } from "lucide-react";

const SPEC_COMPARISON = [
  {
    feature: "Codebase Ownership",
    vistar: "100% Private GitHub Transfer",
    vistarHighlight: true,
    agency: "Proprietary Platform Lock-in",
    agencyBad: true,
  },
  {
    feature: "Direct Team Access",
    vistar: "Direct Pairing with Lead Engineer",
    vistarHighlight: true,
    agency: "Unvetted Junior Handoffs",
    agencyBad: true,
  },
  {
    feature: "Delivery Cadence",
    vistar: "14-Day Production Sprints",
    vistarHighlight: true,
    agency: "3 to 6-Month Open Deadlines",
    agencyBad: true,
  },
  {
    feature: "Pricing Model",
    vistar: "Fixed-Milestone Upfront Quotes",
    vistarHighlight: true,
    agency: "Uncapped Hourly Billing Meters",
    agencyBad: true,
  },
  {
    feature: "Data Privacy & NDA",
    vistar: "Bilateral Mutual NDA + Client Cloud",
    vistarHighlight: true,
    agency: "Shared Multi-Tenant Platforms",
    agencyBad: true,
  },
  {
    feature: "Post-Launch Warranty",
    vistar: "30-Day Defect Warranty Included",
    vistarHighlight: true,
    agency: "Forced Monthly Retainer Fees",
    agencyBad: true,
  },
];

const ENGINEERING_GUARANTEES = [
  {
    icon: Code2,
    number: "01",
    tag: "SOVEREIGNTY",
    title: "100% Repository Handover",
    desc: "Complete private GitHub transfer with clean Next.js, Python, and Docker code. You own every commit.",
  },
  {
    icon: Zap,
    number: "02",
    tag: "VELOCITY",
    title: "14-Day Sprint Cadence",
    desc: "Direct pairing with founder and senior engineers. Working production software delivered in two-week cycles.",
  },
  {
    icon: Lock,
    number: "03",
    tag: "CONFIDENTIALITY",
    title: "Strict Data Privacy",
    desc: "Protected under bilateral NDA. Environment keys encrypted with zero third-party training on your data.",
  },
  {
    icon: GitBranch,
    number: "04",
    tag: "INDEPENDENCE",
    title: "Zero Hostage Retainers",
    desc: "No proprietary platform lock-in or recurring monthly maintenance fees. Full deployment documentation included.",
  },
  {
    icon: Clock,
    number: "05",
    tag: "ASSURANCE",
    title: "30-Day Bug Warranty",
    desc: "Every release is backed by a 30-day zero-cost bug fix guarantee and automated regression test suites.",
  },
];

export function CohereDeployment() {
  return (
    <>
      {/* ── 1. SOVEREIGNTY SPEC SHEET (TASTE-SKILL HIGH-DENSITY COMPARISON) ── */}
      <section className="relative w-full py-16 sm:py-20 bg-white border-t border-black/[0.08] overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider font-semibold rounded-full bg-black/5 border border-black/8 text-neutral-800">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF3823]" />
                ENGINEERING SPEC SHEET
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#181818] leading-[1.12] text-balance">
                Built for ownership. Not ongoing dependence.
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal text-pretty">
                How VISTAR studio delivery compares against traditional agencies and no-code builders.
              </p>
            </div>

            <Link
              href="/how-we-work"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#181818] hover:text-[#FF3823] transition-colors self-start md:self-auto"
            >
              <span>Explore our full lifecycle</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* High-Density Monospace Comparison Matrix */}
          <div className="w-full overflow-x-auto rounded-xl border border-black/10 bg-[#FAF9F6] shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans min-w-[620px]">
              <thead>
                <tr className="border-b border-black/10 bg-black/[0.03] text-neutral-500 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 sm:px-6 font-semibold">Standard</th>
                  <th className="py-3 px-4 sm:px-6 font-bold text-neutral-900 bg-emerald-50/60 border-x border-emerald-200/60">
                    VISTAR Studio
                  </th>
                  <th className="py-3 px-4 sm:px-6 font-semibold">Traditional Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/8 font-normal text-neutral-700">
                {SPEC_COMPARISON.map((row, i) => (
                  <tr key={i} className="hover:bg-white/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-neutral-900">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 bg-emerald-50/40 border-x border-emerald-200/50 font-semibold text-neutral-900">
                      <div className="flex items-center gap-2 text-emerald-800">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{row.vistar}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-neutral-500">
                      <div className="flex items-center gap-2 text-neutral-500">
                        <X className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{row.agency}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ── 2. ENGINEERING COMMITMENTS MARQUEE (PINE BG #152717) ── */}
      <section className="relative w-full py-16 sm:py-24 bg-[#152717] text-white overflow-hidden select-none">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-10 mb-10 sm:mb-14">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF8A7A] font-semibold">
              ENGINEERING STANDARDS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">
              Our Commitments to Every Client
            </h2>
            <p className="text-base sm:text-lg text-white/80 font-normal text-pretty">
              No agency games, no junior developer handoffs, and zero hostage retainers.
            </p>
          </div>
        </div>

        {/* Continuous Infinite Smooth Marquee Ticker */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#152717] via-[#152717]/90 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#152717] via-[#152717]/90 to-transparent z-10" />

          <div
            className="flex shrink-0 items-center gap-5 sm:gap-6 hover:[animation-play-state:paused]"
            style={{
              animation: "marquee-scroll 32s linear infinite",
              width: "max-content",
            }}
          >
            {/* Loop 1 */}
            {ENGINEERING_GUARANTEES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`commit-1-${idx}`}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-7 space-y-4 hover:bg-white/10 hover:border-white/20 transition-all duration-200 w-[300px] sm:w-[360px] shrink-0 text-left cursor-default shadow-xs"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#FF8A7A]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase">
                      {item.number} // {item.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-[22px] font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed font-normal mt-2 text-pretty">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Loop 2 for Seamless Continuation */}
            {ENGINEERING_GUARANTEES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`commit-2-${idx}`}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-7 space-y-4 hover:bg-white/10 hover:border-white/20 transition-all duration-200 w-[300px] sm:w-[360px] shrink-0 text-left cursor-default shadow-xs"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#FF8A7A]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase">
                      {item.number} // {item.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-[22px] font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed font-normal mt-2 text-pretty">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default CohereDeployment;
