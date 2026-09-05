"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SpotlightCard } from "@/components/spotlight-card";

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Performance & Growth Benchmark Simulator
// ─────────────────────────────────────────────────────────────────────────────

interface BenchmarkMode {
  id: "legacy" | "vistar";
  name: string;
  tag: string;
  loadTime: string;
  loadTimeMs: number;
  lighthouse: number;
  pageWeight: string;
  conversions: string;
  ownership: string;
  techDebt: string;
  color: string;
  summary: string;
}

const BENCHMARKS: Record<"legacy" | "vistar", BenchmarkMode> = {
  legacy: {
    id: "legacy",
    name: "Standard Agency Stack",
    tag: "WordPress / Webflow / 38 Plugins",
    loadTime: "3.8s",
    loadTimeMs: 3800,
    lighthouse: 42,
    pageWeight: "4.8 MB",
    conversions: "-28% Friction Loss",
    ownership: "0% (Vendor Lock-in)",
    techDebt: "High (Fragile plugin updates break regularly)",
    color: "#ff1e90",
    summary: "Heavy CMS templates load dozens of unoptimized tracking pixels, bloated scripts, and render-blocking styles. Visitors abandon on mobile and Google penalizes search rank.",
  },
  vistar: {
    id: "vistar",
    name: "Vistar Growth Architecture",
    tag: "Next.js 16 + Edge SSR + Raw Primitives",
    loadTime: "124ms",
    loadTimeMs: 124,
    lighthouse: 99,
    pageWeight: "185 KB",
    conversions: "+38% to +220% Lift",
    ownership: "100% (Clean GitHub Handover)",
    techDebt: "Zero (Strict TypeScript, clean modular code)",
    color: "#d8ff42",
    summary: "Engineered from raw primitives on edge networks. Sub-second TTFB, 0KB plugin bloat, flawless Core Web Vitals, and instant user perception of luxury and speed.",
  },
};

export default function VectorsPage() {
  const [selectedBenchmark, setSelectedBenchmark] = useState<"legacy" | "vistar">("vistar");
  const currentBench = BENCHMARKS[selectedBenchmark];

  return (
    <div className="w-full relative min-h-screen bg-[#faf9f5] text-[#0a0a0a] overflow-x-hidden pt-28 pb-24">
      {/* Noise overlay matching homepage */}
      <div className="noise-overlay" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 relative z-10 space-y-20">
        
        {/* ── 1. Hero Header ────────────────────────────────────────────────── */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3.5 py-1.5 rounded-md text-[9px] font-mono font-black tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#d8ff42]">
            <span className="w-2 h-2 rounded-full bg-[#d8ff42] border border-black animate-pulse" />
            GROWTH ENGINEERING // TECHNICAL ADVANTAGE
          </div>

          <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-[#0a0a0a] leading-[0.95]">
            The architecture behind <br />
            <span className="font-serif italic font-normal text-zinc-400 lowercase">
              market speed.
            </span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
            Speed is not an aesthetic vanity metric—it is the direct catalyst for search ranking dominance, user trust, and commercial conversion. We engineer clean, sub-second architectures that transform digital presence into enterprise equity.
          </p>

          <div className="flex flex-wrap gap-2 pt-2 select-none">
            {[
              { label: "< 150ms Global TTFB", dot: "#d8ff42" },
              { label: "98+ Lighthouse P95", dot: "#ff1e90" },
              { label: "0KB Plugin Bloat", dot: "#d8ff42" },
              { label: "100% Source Handover", dot: "#ff1e90" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 bg-white border-2 border-black px-3.5 py-1.5 rounded-lg shadow-[2px_2px_0px_#000]"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: b.dot }} />
                <span className="font-mono text-[9px] font-black uppercase text-black tracking-wider">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2. Interactive Performance & Growth Benchmark Simulator ──────── */}
        <div className="bg-[#111111] text-white border-[3px] border-black rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#000] relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="font-mono text-[9px] font-bold text-[#d8ff42] uppercase tracking-widest block mb-1">
                LIVE INTERACTIVE SIMULATOR
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                Technical Stack vs. Commercial Growth
              </h2>
            </div>

            {/* Switcher buttons */}
            <div className="inline-flex p-1.5 bg-black border-2 border-white/20 rounded-xl gap-2 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setSelectedBenchmark("legacy")}
                className={`px-4 py-2 font-display text-[10px] font-black uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer ${
                  selectedBenchmark === "legacy"
                    ? "bg-[#ff1e90] text-black shadow-[2px_2px_0px_#000]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Standard Agency Stack
              </button>
              <button
                type="button"
                onClick={() => setSelectedBenchmark("vistar")}
                className={`px-4 py-2 font-display text-[10px] font-black uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer ${
                  selectedBenchmark === "vistar"
                    ? "bg-[#d8ff42] text-black shadow-[2px_2px_0px_#000]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Vistar Growth Stack ⚡
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentBench.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="pt-8 space-y-8"
            >
              {/* Stack identification */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-black text-xl uppercase tracking-wider text-white">
                    {currentBench.name}
                  </h3>
                  <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                    {currentBench.tag}
                  </p>
                </div>
                <div className="font-mono text-xs font-bold px-3 py-1.5 rounded border border-white/20" style={{ color: currentBench.color }}>
                  ESTIMATED RETENTION IMPACT: {currentBench.conversions}
                </div>
              </div>

              {/* 4-Stat Comparison Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black/50 border border-white/10 p-5 rounded-2xl">
                  <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                    First Page Load Time
                  </span>
                  <div className="font-display font-black text-3xl sm:text-4xl" style={{ color: currentBench.color }}>
                    {currentBench.loadTime}
                  </div>
                  <span className="font-sans text-[10px] text-zinc-500 mt-1 block">
                    {currentBench.id === "vistar" ? "Sub-second instant render" : "Slow mobile perception"}
                  </span>
                </div>

                <div className="bg-black/50 border border-white/10 p-5 rounded-2xl">
                  <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                    Google Lighthouse Score
                  </span>
                  <div className="font-display font-black text-3xl sm:text-4xl" style={{ color: currentBench.color }}>
                    {currentBench.lighthouse} <span className="text-sm font-sans text-zinc-400">/ 100</span>
                  </div>
                  <span className="font-sans text-[10px] text-zinc-500 mt-1 block">
                    {currentBench.id === "vistar" ? "Top 1% global web speed" : "Search algorithmic penalty"}
                  </span>
                </div>

                <div className="bg-black/50 border border-white/10 p-5 rounded-2xl">
                  <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                    Client Code Ownership
                  </span>
                  <div className="font-display font-black text-3xl sm:text-4xl text-white">
                    {currentBench.ownership.split(" ")[0]}
                  </div>
                  <span className="font-sans text-[10px] text-zinc-500 mt-1 block">
                    {currentBench.id === "vistar" ? "Unencumbered GitHub repo" : "Perpetual monthly lock-in"}
                  </span>
                </div>

                <div className="bg-black/50 border border-white/10 p-5 rounded-2xl">
                  <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                    Payload Weight
                  </span>
                  <div className="font-display font-black text-3xl sm:text-4xl text-white">
                    {currentBench.pageWeight}
                  </div>
                  <span className="font-sans text-[10px] text-zinc-500 mt-1 block">
                    {currentBench.id === "vistar" ? "95% leaner than templates" : "Bloated plugin libraries"}
                  </span>
                </div>
              </div>

              {/* Stack analysis note */}
              <div className="bg-black/40 border border-white/10 p-4 rounded-xl text-xs font-sans text-zinc-300 leading-relaxed">
                <span className="font-bold text-white mr-1.5">Architectural Verdict:</span>
                {currentBench.summary}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── 3. The 4 Growth Engineering Pillars (Bento Grid) ───────────────── */}
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="font-mono text-[9px] font-extrabold tracking-widest uppercase text-[#ff1e90] bg-[#ff1e90]/10 border border-[#ff1e90]/20 px-3 py-1 rounded-full inline-block">
              ENGINEERING TAXONOMY // CORE CAPABILITIES
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#0a0a0a] leading-tight">
              Four pillars of <br />
              <span className="font-serif italic font-normal text-zinc-400 lowercase">
                digital defensibility.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 01 */}
            <SpotlightCard
              glowColor="rgba(216, 255, 66, 0.15)"
              borderColor="rgba(0, 0, 0, 0.15)"
              className="bg-white border-[2.5px] border-black rounded-2xl p-8 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#d8ff42] transition-all duration-300 flex flex-col justify-between min-h-[320px]"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs font-black px-2.5 py-1 rounded bg-[#d8ff42] text-black border border-black shadow-[1.5px_1.5px_0px_#000]">
                    PILLAR 01
                  </span>
                  <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    LATENCY DISCIPLINE
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-black mb-3">
                  Sub-Second Speed as a Sales Engine
                </h3>
                <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Every 100ms of delay decreases commercial conversion by 7%. We build on Next.js 16 with edge route handlers, pre-rendered static assets, and automated image pipelines to guarantee instantaneous page loads worldwide.
                </p>
              </div>
              <div className="pt-6 border-t border-black/10 font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                STACK: Next.js App Router · Edge Workers · HTTP/3 Pre-Fetch
              </div>
            </SpotlightCard>

            {/* Pillar 02 */}
            <SpotlightCard
              glowColor="rgba(255, 30, 144, 0.12)"
              borderColor="rgba(0, 0, 0, 0.15)"
              className="bg-white border-[2.5px] border-black rounded-2xl p-8 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#ff1e90] transition-all duration-300 flex flex-col justify-between min-h-[320px]"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs font-black px-2.5 py-1 rounded bg-[#ff1e90] text-black border border-black shadow-[1.5px_1.5px_0px_#000]">
                    PILLAR 02
                  </span>
                  <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    VISUAL AUTHORITY
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-black mb-3">
                  Bespoke Visual Distinction
                </h3>
                <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Template-built websites look identical to competitors, destroying perceived value. We construct bespoke WebGL shaders, tactile typography interactions, and tailored micro-animations that elevate your product to category leader.
                </p>
              </div>
              <div className="pt-6 border-t border-black/10 font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                STACK: Custom GLSL · Three.js · Framer Motion · Industrial CSS
              </div>
            </SpotlightCard>

            {/* Pillar 03 */}
            <SpotlightCard
              glowColor="rgba(255, 30, 144, 0.12)"
              borderColor="rgba(0, 0, 0, 0.15)"
              className="bg-white border-[2.5px] border-black rounded-2xl p-8 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#ff1e90] transition-all duration-300 flex flex-col justify-between min-h-[320px]"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs font-black px-2.5 py-1 rounded bg-black text-white border border-black shadow-[1.5px_1.5px_0px_#000]">
                    PILLAR 03
                  </span>
                  <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    ORGANIC DISCOVERY
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-black mb-3">
                  Search &amp; AI Engine Dominance
                </h3>
                <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Modern search engines and AI answer engines (ChatGPT, Perplexity, Gemini) reward clean semantic markup and instant rendering. We bake schema structured data, OpenGraph protocols, and automated sitemaps into the core build.
                </p>
              </div>
              <div className="pt-6 border-t border-black/10 font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                STACK: JSON-LD Schemas · Edge SSR · Semantic HTML5 · Auto-OG
              </div>
            </SpotlightCard>

            {/* Pillar 04 */}
            <SpotlightCard
              glowColor="rgba(216, 255, 66, 0.15)"
              borderColor="rgba(0, 0, 0, 0.15)"
              className="bg-white border-[2.5px] border-black rounded-2xl p-8 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#d8ff42] transition-all duration-300 flex flex-col justify-between min-h-[320px]"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs font-black px-2.5 py-1 rounded bg-[#d8ff42] text-black border border-black shadow-[1.5px_1.5px_0px_#000]">
                    PILLAR 04
                  </span>
                  <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    INFRASTRUCTURE
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-black mb-3">
                  Zero Technical Debt &amp; Total Ownership
                </h3>
                <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  No proprietary vendor handcuffs. You receive a clean, production-grade GitHub repository with 100% strict TypeScript types, continuous integration pipelines, and total IP ownership on deployment day.
                </p>
              </div>
              <div className="pt-6 border-t border-black/10 font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                STACK: TypeScript · GitHub Actions · Supabase / Postgres · Vercel Edge
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* ── 4. The 21-Day Growth Sprint Framework ─────────────────────────── */}
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="font-mono text-[9px] font-extrabold tracking-widest uppercase text-[#d8ff42] bg-black px-3 py-1 rounded-full inline-block border border-black">
              EXECUTION TIMELINE // 7–21 DAYS
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#0a0a0a] leading-tight">
              The 21-Day <br />
              <span className="font-serif italic font-normal text-zinc-400 lowercase">
                delivery sprint.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border-[2.5px] border-black rounded-2xl p-6 shadow-[5px_5px_0px_#000] space-y-4">
              <div className="flex justify-between items-center border-b border-black/10 pb-3">
                <span className="font-mono text-[9px] font-black uppercase text-[#ff1e90]">Sprint 01</span>
                <span className="font-mono text-[8px] font-bold uppercase text-zinc-400">Days 1–5</span>
              </div>
              <h4 className="font-display font-black text-xl uppercase text-black">
                Strategic Blueprint
              </h4>
              <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                Deep architectural review of your current conversion funnel, performance leaks, competitor positioning, and creation of the technical design system.
              </p>
            </div>

            <div className="bg-white border-[2.5px] border-black rounded-2xl p-6 shadow-[5px_5px_0px_#000] space-y-4">
              <div className="flex justify-between items-center border-b border-black/10 pb-3">
                <span className="font-mono text-[9px] font-black uppercase text-[#d8ff42] bg-black px-1.5 py-0.5 rounded">Sprint 02</span>
                <span className="font-mono text-[8px] font-bold uppercase text-zinc-400">Days 6–15</span>
              </div>
              <h4 className="font-display font-black text-xl uppercase text-black">
                Custom Engineering
              </h4>
              <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                Full-stack construction using Next.js App Router, bespoke WebGL shaders, real-time APIs, responsive layouts, and interactive micro-physics.
              </p>
            </div>

            <div className="bg-white border-[2.5px] border-black rounded-2xl p-6 shadow-[5px_5px_0px_#000] space-y-4">
              <div className="flex justify-between items-center border-b border-black/10 pb-3">
                <span className="font-mono text-[9px] font-black uppercase text-[#ff1e90]">Sprint 03</span>
                <span className="font-mono text-[8px] font-bold uppercase text-zinc-400">Days 16–21</span>
              </div>
              <h4 className="font-display font-black text-xl uppercase text-black">
                Vitals Audit &amp; Handover
              </h4>
              <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                Rigorous Core Web Vitals optimization, automated cross-browser testing, SEO schema validation, production edge deployment, and complete code transfer.
              </p>
            </div>
          </div>
        </div>

        {/* ── 5. Launch CTA Callout ──────────────────────────────────────────── */}
        <div className="bg-[#111111] text-white border-[3px] border-black rounded-3xl p-8 sm:p-12 shadow-[8px_8px_0px_#ff1e90] flex flex-col md:flex-row items-center justify-between gap-8 select-none">
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-[9px] font-extrabold tracking-widest uppercase text-[#ff1e90] bg-[#ff1e90]/10 border border-[#ff1e90]/20 px-3 py-1 rounded-full inline-block">
              Architectural Consultation
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white leading-none">
              Ready to upgrade your digital engine?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Schedule an architectural evaluation with our lead engineer. We analyze your speed bottlenecks, conversion drop-offs, and outline an exact sprint plan.
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 bg-[#ff1e90] text-black font-display font-black text-xs tracking-widest uppercase px-8 py-5 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#d8ff42] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all interactive"
          >
            Initiate Architecture Review ⚡
          </Link>
        </div>

      </div>
    </div>
  );
}
