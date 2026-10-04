"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, ShieldCheck, CheckCircle2, Terminal } from "lucide-react";
import { InteractiveWorkflowSimulator } from "./interactive-workflow-simulator";

export function VistarHeroSection() {
  return (
    <section className="relative w-full pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 bg-white text-[#121316] overflow-hidden">
      {/* Subtle architectural background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#121316 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Top Editorial Pill */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/8 text-[12px] font-medium text-neutral-800">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E1341E]" />
            <span className="font-mono uppercase tracking-wider text-[11px] font-semibold text-neutral-600">
              Founder-Led Engineering Studio
            </span>
            <span className="text-neutral-300">&bull;</span>
            <span className="text-neutral-600">Direct Delivery</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-medium text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>Accepting Q4 &amp; 2026 Engineering Sprints</span>
          </div>
        </div>

        {/* Primary Editorial Headline */}
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold tracking-[-0.035em] text-[#121316] leading-[1.08]">
            Stop losing time to{" "}
            <span className="underline decoration-[#E1341E]/40 decoration-wavy decoration-2">
              manual work.
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-[21px] text-neutral-600 leading-relaxed font-normal max-w-3xl">
            Vistar builds practical software and automation that helps growing businesses manage enquiries, streamline operations, and make better decisions—with direct engineering involvement from discovery to deployment.
          </p>
        </div>

        {/* Action CTAs & Direct Contact */}
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-12 px-7 rounded-xl bg-[#121316] hover:bg-[#282A2E] text-white text-[14.5px] font-medium transition-all shadow-sm hover:shadow-md active:scale-95 gap-2 group"
          >
            <span>Discuss a workflow</span>
            <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <a
            href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I%20would%20like%20to%20discuss%20an%20automation%20workflow%20for%20our%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-[14.5px] font-medium transition-all shadow-xs hover:shadow-sm active:scale-95 gap-2"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp (+91 88601 10144)</span>
          </a>

          <Link
            href="/work"
            className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-black/12 hover:bg-black/4 text-neutral-800 text-[14.5px] font-medium transition-all active:scale-95"
          >
            <span>Explore our engineering work</span>
          </Link>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-8 pt-6 border-t border-black/8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-neutral-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span>100% Client Code Ownership</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span>Direct Access to Lead Engineer</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span>Bilateral NDA &amp; Data Privacy</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span>Fixed Scope &amp; Milestones</span>
          </div>
        </div>

        {/* Distinctive Visual Element: Interactive Workflow Simulator */}
        <div className="mt-12 sm:mt-16">
          <InteractiveWorkflowSimulator />
        </div>
      </div>
    </section>
  );
}

export default VistarHeroSection;
