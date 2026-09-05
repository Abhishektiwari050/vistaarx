"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/spotlight-card";
import { MagneticButton } from "@/components/magnetic-button";

export default function PhilosophyPage() {
  return (
    <div className="w-full relative bg-[#faf9f5] text-[#0a0a0a] min-h-screen overflow-x-hidden pt-28 pb-24">
      {/* Global paper-grain texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── Section 1: Editorial Studio Philosophy Hero ─────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 pt-8 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff1e90] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff1e90]" />
            </span>
            <span className="font-mono text-[9px] font-extrabold tracking-[0.3em] uppercase text-[#ff1e90] bg-[#ff1e90]/10 border border-[#ff1e90]/20 px-3 py-1 rounded-full">
              Studio Philosophy // Brand As Defensible Equity
            </span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter text-[#0a0a0a] leading-[0.88] select-none">
            We refuse commodity.
            <br />
            We compile{" "}
            <span className="font-serif italic font-normal text-zinc-400 lowercase">
              authority.
            </span>
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-600 leading-relaxed max-w-2xl pt-2">
            Your website is not digital decoration—it is your highest-leverage sales executive and the definitive benchmark of your company&apos;s ambition. In an internet flooded with generic AI templates, bespoke architectural distinction is the ultimate competitive advantage.
          </p>

          {/* Quick Pillars Chips */}
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-black bg-[#d8ff42] shadow-[3px_3px_0px_#000] font-mono text-[10px] font-extrabold uppercase">
              <span>✦</span> 100% Code Ownership
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-black bg-white shadow-[3px_3px_0px_#ff1e90] font-mono text-[10px] font-extrabold uppercase">
              <span className="text-[#ff1e90]">⚡</span> &lt; 150ms Global TTFB
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-black bg-[#0a0a0a] text-white shadow-[3px_3px_0px_#000] font-mono text-[10px] font-extrabold uppercase">
              <span>●</span> Category Differentiation
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <MagneticButton>
              <Link
                href="/contact"
                className="bg-[#d8ff42] text-black font-sans font-black text-xs tracking-widest uppercase px-8 py-4 border-2 border-black rounded-xl shadow-[4px_4px_0px_#000000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#ff1e90] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer inline-flex items-center gap-2 interactive"
              >
                Initiate Consultation ⚡
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/work"
                className="bg-white text-black font-sans font-black text-xs tracking-widest uppercase px-8 py-4 border-2 border-black rounded-xl shadow-[4px_4px_0px_#000000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#ff1e90] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer inline-flex items-center gap-2 interactive"
              >
                Inspect Case Studies →
              </Link>
            </MagneticButton>
          </div>
        </motion.div>
      </section>

      {/* ── Section 2: Core Manifesto Pillars Grid ──────────────────────────── */}
      <section className="py-20 px-6 sm:px-12 md:px-16 relative overflow-hidden bg-white/60 border-t border-b border-black/10 z-20">
        <div className="max-w-6xl mx-auto text-center relative z-10 mb-16 select-none">
          <span className="font-mono text-[9px] font-bold tracking-[3px] text-[#ff1e90] uppercase bg-[#ff1e90]/10 border border-[#ff1e90]/20 px-3 py-1 rounded-full inline-block mb-4">
            Our Core Manifesto
          </span>
          <h2 className="font-display font-black tracking-tight text-[#0a0a0a] leading-tight text-4xl sm:text-5xl md:text-6xl uppercase">
            Four axioms of{" "}
            <span className="font-serif italic font-normal text-zinc-400 lowercase">
              brand building
            </span>
            .
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-sans max-w-xl mx-auto mt-4">
            We operate at the convergence of relentless performance, uncompromising aesthetic execution, and structural autonomy.
          </p>
        </div>

        {/* 3 Columns Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1 - Refusal */}
          <div className="group cursor-pointer">
            <SpotlightCard
              glowColor="rgba(0, 0, 0, 0.05)"
              borderColor="rgba(0, 0, 0, 0.15)"
              className="bg-[#d8ff42] border-[3px] border-black rounded-3xl p-6 md:p-8 min-h-[380px] flex flex-col justify-between shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] transition-all duration-500 interactive"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 text-black text-xl font-bold">
                  ✦
                </div>
                <span className="text-black font-mono font-bold text-xs border-2 border-black px-3 py-1 rounded-full bg-white shadow-[2px_2px_0px_#000]">
                  01
                </span>
              </div>
              <div className="mt-8">
                <h3 className="font-display font-black uppercase text-2xl md:text-3xl text-black mb-3 leading-none tracking-tight">
                  Distinctiveness<br />Over Templates
                </h3>
                <p className="text-black/75 text-xs leading-relaxed font-sans">
                  If your website is assembled from the same popular UI kit as 10,000 other companies, your product is judged as average. Custom shaders and bespoke layouts give you instant category leadership.
                </p>
              </div>
              <div className="w-full h-[2px] bg-black/10 mt-6" />
            </SpotlightCard>
          </div>

          {/* Card 2 - Performance */}
          <div className="group cursor-pointer">
            <SpotlightCard
              glowColor="rgba(255, 30, 144, 0.1)"
              borderColor="rgba(255, 255, 255, 0.1)"
              className="bg-[#111] border-[3px] border-black rounded-3xl p-6 md:p-8 min-h-[380px] flex flex-col justify-between shadow-[6px_6px_0px_#ff1e90] hover:shadow-[10px_10px_0px_#ff1e90] transition-all duration-500 interactive"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 text-white text-xl">
                  ⚡
                </div>
                <span className="text-white/70 font-mono font-bold text-xs border border-white/10 px-3 py-1 rounded-full bg-white/5">
                  02
                </span>
              </div>
              <div className="mt-8">
                <h3 className="font-display font-black uppercase text-2xl md:text-3xl text-white mb-3 leading-none tracking-tight">
                  Performance is<br />Brand Respect
                </h3>
                <p className="text-white/50 text-xs leading-relaxed font-sans">
                  Every 500ms of lag communicates carelessness. Sub-150ms page loads subconsciously tell your customer that your engineering is world-class, driving conversion rates up to 4.2× higher.
                </p>
              </div>
              <div className="w-full h-px bg-white/10 mt-6" />
            </SpotlightCard>
          </div>

          {/* Card 3 - Ownership */}
          <div className="group cursor-pointer">
            <SpotlightCard
              glowColor="rgba(216, 255, 66, 0.08)"
              borderColor="rgba(0, 0, 0, 0.15)"
              className="bg-white border-[3px] border-black rounded-3xl p-6 md:p-8 min-h-[380px] flex flex-col justify-between shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#d8ff42] transition-all duration-500 interactive"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-full bg-[#d8ff42]/20 border border-black/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 text-black text-xl">
                  🔑
                </div>
                <span className="text-black font-mono font-bold text-xs border-2 border-black px-3 py-1 rounded-full bg-[#d8ff42] shadow-[2px_2px_0px_#000]">
                  03
                </span>
              </div>
              <div className="mt-8">
                <h3 className="font-display font-black uppercase text-2xl md:text-3xl text-black mb-3 leading-none tracking-tight">
                  Total Digital<br />Sovereignty
                </h3>
                <p className="text-black/70 text-xs leading-relaxed font-sans">
                  We transfer 100% of the repository, design tokens, and deployment infrastructure directly to you upon launch. Zero monthly agency ransom, zero vendor lock-in, complete commercial control.
                </p>
              </div>
              <div className="w-full h-px bg-black/10 mt-6" />
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ── Section 3: Engineering Standards vs Conventional Agencies ────────── */}
      <section className="py-24 px-6 sm:px-12 md:px-16 max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-[9px] font-bold tracking-[3px] text-zinc-400 uppercase bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-full inline-block mb-3">
            Studio Standards
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#0a0a0a]">
            How We Differ From{" "}
            <span className="font-serif italic font-normal text-zinc-400 lowercase">
              the industry
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Box 1: Conventional Agencies */}
          <div className="border-[2.5px] border-black/20 bg-zinc-100/60 rounded-2xl p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                Standard Agency Paradigm
              </span>
              <span className="text-red-500 font-mono text-sm">✕ The Trap</span>
            </div>
            <ul className="space-y-4 font-sans text-xs sm:text-sm text-zinc-600">
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>Template customization with 40+ third-party WordPress plugins and recurring security liabilities.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>4MB+ page bundles leading to sluggish 3.5s+ mobile load times and heavy Core Web Vitals penalties.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>Perpetual retainer lock-ins where clients do not own or understand their own codebase.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>Generic layouts assembled from popular UI kits without custom brand differentiation.</span>
              </li>
            </ul>
          </div>

          {/* Box 2: Vistar Standard */}
          <div className="border-[3px] border-black bg-white rounded-2xl p-8 space-y-6 shadow-[6px_6px_0px_#ff1e90]">
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <span className="font-mono text-[10px] font-extrabold tracking-widest uppercase text-[#ff1e90]">
                The Vistar Standard
              </span>
              <span className="text-[#22c55e] font-mono text-sm font-bold">✓ Direct Impact</span>
            </div>
            <ul className="space-y-4 font-sans text-xs sm:text-sm text-black">
              <li className="flex items-start gap-3">
                <span className="text-[#22c55e] font-bold shrink-0">✓</span>
                <span>Bespoke Next.js 16 + TypeScript architectures with zero bloated plugins and clean modules.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#22c55e] font-bold shrink-0">✓</span>
                <span>Sub-150ms global TTFB delivered on edge networks with 95+ verified Lighthouse scores.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#22c55e] font-bold shrink-0">✓</span>
                <span>Full GitHub repository and deployment infrastructure handed over completely on day one.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#22c55e] font-bold shrink-0">✓</span>
                <span>Bespoke visual identity combining custom GLSL shaders, micro-motion, and industrial UI typography.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
