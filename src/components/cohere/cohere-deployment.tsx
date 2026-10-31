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
    <section className="relative w-full py-16 sm:py-24 bg-[#FAF9F6] border-t border-black/[0.08] text-[#141518] font-sans overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* ── 1. SOVEREIGNTY SPEC SHEET ── */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider font-semibold rounded-full bg-white border border-black/8 text-neutral-800 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF3823]" />
                ENGINEERING SPEC SHEET
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#141518] leading-[1.10] text-balance">
                Built for ownership. Not ongoing dependence.
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal text-pretty">
                How VISTAR studio delivery compares against traditional agencies and no-code builders.
              </p>
            </div>

            <Link
              href="/how-we-work"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#141518] hover:text-[#FF3823] transition-colors self-start md:self-auto group"
            >
              <span>Explore our full lifecycle</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* High-Density Monospace Comparison Matrix */}
          <div className="w-full overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans min-w-[620px]">
              <thead>
                <tr className="border-b border-black/10 bg-black/[0.02] text-neutral-500 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-5 sm:px-6 font-semibold">Standard</th>
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-neutral-900 bg-emerald-50/70 border-x border-emerald-200/60">
                    VISTAR Studio
                  </th>
                  <th className="py-3.5 px-5 sm:px-6 font-semibold">Traditional Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] font-normal text-neutral-700">
                {SPEC_COMPARISON.map((row, i) => (
                  <tr key={i} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-3.5 px-5 sm:px-6 font-medium text-neutral-900">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-5 sm:px-6 bg-emerald-50/40 border-x border-emerald-200/50 font-semibold text-neutral-900">
                      <div className="flex items-center gap-2 text-emerald-800">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{row.vistar}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 sm:px-6 text-neutral-500">
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

        {/* ── 2. ENGINEERING COMMITMENTS (UNIFIED MONOCHROME WITH TACTILE CARDS) ── */}
        <div className="space-y-8 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/8 pb-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF3823] font-bold block mb-1">
                OUR COMMITMENTS
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141518]">
                Five guarantees backing every engagement.
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-normal">
              Direct engineering partnership with zero agency games, zero junior developer handoffs, and zero hostage retainers.
            </p>
          </div>

          {/* 5-Column Clean Architectural Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {ENGINEERING_GUARANTEES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`commit-${idx}`}
                  className="bg-white border border-black/8 rounded-2xl p-5 sm:p-6 space-y-3.5 hover:border-black/20 hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center text-neutral-800">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase font-semibold">
                        {item.number}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#141518] leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-black/6">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                      GUARANTEED
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default CohereDeployment;
