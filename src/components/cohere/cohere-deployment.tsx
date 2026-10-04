"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Code2, Lock, GitBranch, Clock, Zap } from "lucide-react";

const ENGINEERING_GUARANTEES = [
  {
    icon: Code2,
    title: "100% Repository Handover",
    desc: "Complete private GitHub transfer with clean Next.js, Python, and Docker code. You own every commit.",
  },
  {
    icon: Zap,
    title: "14-Day Sprint Cadence",
    desc: "Direct pairing with founder and senior engineers. Working production software delivered in two-week cycles.",
  },
  {
    icon: Lock,
    title: "Strict Data Privacy",
    desc: "Protected under bilateral NDA. Environment keys encrypted with zero third-party training on your data.",
  },
  {
    icon: GitBranch,
    title: "Zero Hostage Retainers",
    desc: "No proprietary platform lock-in or recurring monthly maintenance fees. Full deployment documentation included.",
  },
  {
    icon: Clock,
    title: "30-Day Bug Warranty",
    desc: "Every release is backed by a 30-day zero-cost bug fix guarantee and automated regression test suites.",
  },
];

export function CohereDeployment() {
  return (
    <>
      <section className="relative w-full pt-8 sm:pt-12 md:pt-14 pb-0 bg-white border-t border-black/[0.06] overflow-hidden">
        {/* Header & CTAs */}
        <div className="max-w-[840px] mx-auto px-4 text-center mb-8 sm:mb-12">

          {/* Headline */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] tracking-[-0.02em] text-[#0B0D17] mb-5 font-serif"
          >
            Practical software built for your business.<br className="hidden sm:inline" /> Direct founder involvement.
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-[18px] text-[#4A4D57] leading-relaxed max-w-[660px] mx-auto mb-8 font-normal">
            From WhatsApp enquiry automations and internal portals to high-performance 3D web applications. Direct engineering by Abhishek Tiwari with 100% source code ownership.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#FF3823] hover:bg-[#E02F1C] text-white font-medium text-sm sm:text-base rounded-none transition-colors shadow-xs"
            >
              Discuss a workflow
            </Link>
            <a
              href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I%20would%20like%20to%20discuss%20an%20automation%20project%20with%20VISTAR."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium text-sm sm:text-base rounded-none transition-colors shadow-xs"
            >
              Chat on WhatsApp (+91 88601 10144)
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. ENGINEERING COMMITMENTS & DELIVERABLES (CLEAN PINE BG #152717) ── */}
      <section className="relative w-full py-16 sm:py-24 bg-[#152717] text-white">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-10 space-y-12">
          
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF8A7A] font-semibold">
              ENGINEERING STANDARDS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white tracking-tight">
              Our Commitments to Every Client
            </h2>
            <p className="text-base sm:text-lg text-white/80 font-normal">
              No agency games, no junior developer handoffs, and zero hostage retainers.
            </p>
          </div>

          {/* Clean 5-Pillar Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {ENGINEERING_GUARANTEES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#FF8A7A]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed font-sans">
                    {item.desc}
                  </p>
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
