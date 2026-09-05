"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SpotlightCard } from "@/components/spotlight-card";
import { DigitalMuseum } from "@/components/ui/digital-museum";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

// ─────────────────────────────────────────────────────────────────────────────
// Commercial Growth Case Studies Data
// ─────────────────────────────────────────────────────────────────────────────

interface CaseStudy {
  id: string;
  category: "DTC & Commerce" | "FinTech & SaaS" | "AI & Automation";
  title: string;
  client: string;
  clientType: string;
  timeline: string;
  highlightMetric: string;
  metricLabel: string;
  barrier: string;
  solution: string;
  impactMetrics: { label: string; value: string }[];
  tags: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "01",
    category: "DTC & Commerce",
    title: "Luminary Atelier Flagship",
    client: "Luminary Global Brands",
    clientType: "Luxury Direct-to-Consumer",
    timeline: "18 Days to Production",
    highlightMetric: "+220% AOV",
    metricLabel: "Average Order Value Lift",
    barrier: "A generic, bloated template storefront suffered 3.8s mobile load times, causing 68% cart abandonment and failing to reflect the brand's luxury price point.",
    solution: "Engineered a bespoke headless Next.js storefront with edge-rendered product catalogs, sub-second routing, and lightweight WebGL material staging.",
    impactMetrics: [
      { label: "Conversion Rate", value: "4.2×" },
      { label: "Global TTFB", value: "112ms" },
      { label: "Mobile Bounce Rate", value: "-44%" },
    ],
    tags: ["Next.js App Router", "Shopify Headless", "WebGL Shaders", "Tailwind"],
  },
  {
    id: "02",
    category: "FinTech & SaaS",
    title: "Apex Algorithmic Ledger",
    client: "TradeLabs Global",
    clientType: "Institutional Digital Assets",
    timeline: "21 Days to Production",
    highlightMetric: "+38% Signups",
    metricLabel: "Conversion Funnel Lift",
    barrier: "Institutional traders abandoned the onboarding funnel due to UI latency during volatile market swings, eroding credibility and trust.",
    solution: "Constructed a real-time WebGL data rendering pipeline with zero render lag and sub-millisecond WebSocket state synchronisation.",
    impactMetrics: [
      { label: "Session Duration", value: "+140%" },
      { label: "FPS Stability", value: "60 FPS Solid" },
      { label: "Funnel Completion", value: "+38%" },
    ],
    tags: ["WebGL", "Framer Motion", "Real-Time Telemetry", "Next.js"],
  },
  {
    id: "03",
    category: "AI & Automation",
    title: "Axiom Neural Brand OS",
    client: "Axiom Venture Studio",
    clientType: "Series-A Portfolio Incubator",
    timeline: "14 Days to Production",
    highlightMetric: "9 Launches",
    metricLabel: "Shipped in First 60 Days",
    barrier: "Portfolio founders spent 3+ months and $50k on fragmented agencies just to launch basic web presence, delaying seed round milestones.",
    solution: "Engineered an AI-augmented brand generation engine that produces complete typography, color palettes, and production-ready Next.js sites in 72 hours.",
    impactMetrics: [
      { label: "Speed-to-Market", value: "72 Hours" },
      { label: "Seed Capital Closed", value: "$14M" },
      { label: "Cost Reduction", value: "-78%" },
    ],
    tags: ["Gemini API", "Next.js", "Supabase", "Tailwind CSS"],
  },
  {
    id: "04",
    category: "FinTech & SaaS",
    title: "Chronicle Global Media Engine",
    client: "Chronicle Digital",
    clientType: "Enterprise Media Cloud",
    timeline: "16 Days to Production",
    highlightMetric: "2.4× Speedup",
    metricLabel: "Core Web Vitals Boost",
    barrier: "Sluggish mobile load times (4.2s) crushed Google Core Web Vitals, resulting in algorithmic search penalties and dropping advertising CTRs.",
    solution: "Architected edge-rendered static pipelines with intelligent image prefetching and zero third-party bloated script dependencies.",
    impactMetrics: [
      { label: "Organic Search CTR", value: "+62%" },
      { label: "Lighthouse Score", value: "99 / 100" },
      { label: "Monthly Readers", value: "1.8M" },
    ],
    tags: ["Edge SSR", "Cloudflare Workers", "Next.js", "PostgreSQL"],
  },
  {
    id: "05",
    category: "DTC & Commerce",
    title: "Verve High-Performance Storefront",
    client: "Verve Athletics",
    clientType: "DTC Performance Wear",
    timeline: "12 Days to Production",
    highlightMetric: "+84% Mobile Sales",
    metricLabel: "First 30 Days Post-Launch",
    barrier: "Heavy theme plugins resulted in 18 layout shifts (CLS 0.42) during checkout on iOS devices, causing high payment drop-offs.",
    solution: "Rebuilt from raw primitives with strict zero-layout-shift architecture and instant Apple Pay / Google Pay one-click checkout.",
    impactMetrics: [
      { label: "Cumulative Layout Shift", value: "0.000" },
      { label: "Checkout Completion", value: "+46%" },
      { label: "Mobile Revenue", value: "+84%" },
    ],
    tags: ["Next.js", "Stripe Elements", "Tailwind CSS", "Framer"],
  },
  {
    id: "06",
    category: "AI & Automation",
    title: "Synthetix Autonomous Pipeline",
    client: "Synthetix Cloud",
    clientType: "Enterprise Developer Tools",
    timeline: "19 Days to Production",
    highlightMetric: "Zero Latency",
    metricLabel: "Real-time AI Playground",
    barrier: "Developer prospects couldn't interactively evaluate model outputs without signing up for expensive enterprise trials.",
    solution: "Built an interactive in-browser playground compiling Rust WebAssembly with streaming token visualization and instant code generation.",
    impactMetrics: [
      { label: "Trial Conversions", value: "+210%" },
      { label: "Time-to-First-Call", value: "<15s" },
      { label: "Inbound Pipeline", value: "3.5×" },
    ],
    tags: ["WebAssembly", "Rust", "Next.js", "AI Streaming"],
  },
];

const CATEGORIES = ["All Work", "DTC & Commerce", "FinTech & SaaS", "AI & Automation"] as const;

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All Work");
  const [viewMode, setViewMode] = useState<"both" | "pavilion" | "catalogue">("both");

  const filteredProjects = activeCategory === "All Work"
    ? CASE_STUDIES
    : CASE_STUDIES.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full relative min-h-screen bg-[#faf9f5] text-[#0a0a0a] overflow-x-clip pt-28 pb-24">
      {/* Film grain noise overlay matching homepage */}
      <div className="noise-overlay" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 relative z-10 space-y-16">
        
        {/* ── 1. Editorial Hero Header ──────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3.5 py-1.5 rounded-md text-[9px] font-mono font-black tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#ff1e90]">
              <span className="w-2 h-2 rounded-full bg-[#d8ff42] border border-black animate-pulse" />
              CASE STUDIES // 3D VIRTUAL PAVILION &amp; ARCHIVE
            </div>

            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-[#0a0a0a] leading-[0.95]">
              Engineered for <br />
              <span className="font-serif italic font-normal text-zinc-400 lowercase">
                market dominance.
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
              We reject digital decoration and generic templates. Experience our selected commissions in the interactive 3D Virtual Art Pavilion or inspect the quantified commercial impact in the full engineering archive below.
            </p>
          </div>

          {/* View Mode Switcher Pills */}
          <div className="shrink-0 flex items-center p-1.5 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_#000]">
            <button
              onClick={() => {
                playTickSound();
                setViewMode("both");
              }}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider transition-all interactive ${
                viewMode === "both"
                  ? "bg-black text-[#d8ff42]"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              ◈ COMPLETE VIEW
            </button>
            <button
              onClick={() => {
                playTickSound();
                setViewMode("pavilion");
              }}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider transition-all interactive ${
                viewMode === "pavilion"
                  ? "bg-[#ff1e90] text-white"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              ✦ 3D PAVILION
            </button>
            <button
              onClick={() => {
                playTickSound();
                setViewMode("catalogue");
              }}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider transition-all interactive ${
                viewMode === "catalogue"
                  ? "bg-[#d8ff42] text-black border border-black"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              ☰ CATALOGUE
            </button>
          </div>
        </div>

        {/* ── 2. Metric Impact Banner (Brutalist Contrast Bar) ──────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-[3px] border-black divide-x-[3px] divide-y-[3px] md:divide-y-0 divide-black bg-white shadow-[6px_6px_0px_#000] rounded-2xl overflow-hidden select-none">
          <div className="p-6 text-center group hover:bg-[#d8ff42] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black leading-none mb-1">+220%</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-black">DTC Order Value Lift</div>
          </div>
          <div className="p-6 text-center group hover:bg-[#ff1e90] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black group-hover:text-white leading-none mb-1">98+</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white">Lighthouse P95 Score</div>
          </div>
          <div className="p-6 text-center group hover:bg-[#d8ff42] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black leading-none mb-1">7–21d</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-black">Sprint Delivery Time</div>
          </div>
          <div className="p-6 text-center group hover:bg-[#ff1e90] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black group-hover:text-white leading-none mb-1">100%</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white">Client Code Ownership</div>
          </div>
        </div>

        {/* ── 3. 3D Digital Museum Virtual Gallery Pavilion ─────────────────── */}
        {(viewMode === "both" || viewMode === "pavilion") && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#ff1e90]">
                  SECTION // 01
                </span>
                <span className="font-display text-sm font-black uppercase tracking-wider text-black">
                  ✦ Interactive Modern Art Pavilion
                </span>
              </div>
              <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
                CLICK PLINTHS OR DRAG SCENE TO NAVIGATE EXHIBITS
              </span>
            </div>
            <DigitalMuseum />
          </section>
        )}

        {/* ── 4. Curated Commercial Impact Catalogue ───────────────────────── */}
        {(viewMode === "both" || viewMode === "catalogue") && (
          <section id="catalogue" className="space-y-10 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-black/10 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#d8ff42] bg-black px-2 py-0.5 rounded">
                    SECTION // 02
                  </span>
                  <span className="font-display text-sm font-black uppercase tracking-wider text-black">
                    Engineering Archive &amp; Commercial Case Studies
                  </span>
                </div>
                <p className="font-sans text-xs text-zinc-500">
                  Select a commercial discipline to filter deep architectural breakdowns and verified metrics.
                </p>
              </div>

              {/* Category Filter Bar */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        playTickSound();
                        setActiveCategory(cat);
                      }}
                      className={`px-3.5 py-1.5 font-display text-[9px] font-black uppercase tracking-wider rounded-lg border-2 transition-all duration-200 cursor-pointer interactive ${
                        isActive
                          ? "bg-black text-[#d8ff42] border-black shadow-[2px_2px_0px_#ff1e90]"
                          : "bg-white text-zinc-700 border-black/20 hover:border-black hover:bg-[#faf9f5]"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                SHOWING: <span className="text-black font-black">{filteredProjects.length} RECORDS</span>
              </div>
            </div>

            {/* Comprehensive Case Study Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group"
              >
                <SpotlightCard
                  glowColor={idx % 2 === 0 ? "rgba(216, 255, 66, 0.15)" : "rgba(255, 30, 144, 0.12)"}
                  borderColor="rgba(0, 0, 0, 0.15)"
                  className="bg-white border-[2.5px] border-black rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[440px] shadow-[6px_6px_0px_#000000] hover:shadow-[10px_10px_0px_#ff1e90] transition-all duration-300"
                >
                  <div className="space-y-5">
                    {/* Card Top Metadata */}
                    <div className="flex items-center justify-between border-b-2 border-black/10 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] font-black px-2 py-0.5 rounded bg-black text-[#d8ff42]">
                          {item.id}
                        </span>
                        <span className="font-serif italic text-xs text-zinc-500">
                          {item.clientType}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] font-extrabold uppercase px-2.5 py-1 rounded bg-[#d8ff42] text-black border border-black shadow-[1.5px_1.5px_0px_#000]">
                          {item.highlightMetric}
                        </span>
                      </div>
                    </div>

                    {/* Project Title & Client */}
                    <div>
                      <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-black leading-tight">
                        {item.title}
                      </h3>
                      <p className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                        Client: {item.client} · Timeline: {item.timeline}
                      </p>
                    </div>

                    {/* The Commercial Barrier & Solution Breakdown */}
                    <div className="space-y-3 pt-2 text-xs leading-relaxed font-sans">
                      <div className="bg-[#faf9f5] border border-black/10 p-3 rounded-lg space-y-1">
                        <span className="font-mono text-[8px] font-black tracking-widest uppercase text-[#ff1e90] block">
                          The Commercial Barrier
                        </span>
                        <p className="text-zinc-600">{item.barrier}</p>
                      </div>

                      <div className="bg-[#faf9f5] border border-black/10 p-3 rounded-lg space-y-1">
                        <span className="font-mono text-[8px] font-black tracking-widest uppercase text-[#0a0a0a] block">
                          The Bespoke Architecture
                        </span>
                        <p className="text-zinc-700 font-medium">{item.solution}</p>
                      </div>
                    </div>

                    {/* Impact Metrics Row */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/10">
                      {item.impactMetrics.map((m) => (
                        <div key={m.label} className="bg-white border border-black/15 p-2 rounded text-center">
                          <div className="font-display font-black text-sm text-black">{m.value}</div>
                          <div className="font-mono text-[7px] font-bold uppercase text-zinc-400 tracking-wider mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Tech Pills + Contact Action */}
                  <div className="pt-6 mt-6 border-t-2 border-black/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[8px] font-bold uppercase px-2 py-0.5 rounded bg-black/5 border border-black/10 text-zinc-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="font-display text-[9px] font-black uppercase tracking-widest text-[#ff1e90] hover:text-black transition-colors inline-flex items-center gap-1 interactive"
                    >
                      Request Technical Spec →
                    </Link>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    )}

        {/* ── 5. Bottom Guarantee Callout ────────────────────────────────────── */}
        <div className="bg-[#111111] text-white border-[3px] border-black rounded-3xl p-8 sm:p-12 shadow-[8px_8px_0px_#d8ff42] flex flex-col md:flex-row items-center justify-between gap-8 select-none">
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-[9px] font-extrabold tracking-widest uppercase text-[#d8ff42] bg-[#d8ff42]/10 border border-[#d8ff42]/20 px-3 py-1 rounded-full inline-block">
              SLA &amp; Performance Guarantee
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white leading-none">
              Your next platform, built for speed &amp; ownership.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Every build includes written Core Web Vitals SLA guarantees, sub-150ms TTFB edge hosting, and complete, unencumbered GitHub source code handover on day 21.
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 bg-[#d8ff42] text-black font-display font-black text-xs tracking-widest uppercase px-8 py-5 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#ff1e90] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all interactive"
          >
            Start Your Transformation ⚡
          </Link>
        </div>

      </div>
    </div>
  );
}
