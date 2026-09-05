"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/spotlight-card";
import { MagneticButton } from "@/components/magnetic-button";

export default function PhilosophyPage() {
  return (
    <div className="w-full relative bg-[#faf9f5] text-[#0a0a0a] min-h-screen overflow-x-clip pt-28 pb-24">
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

      {/* ── Section 2: Core Manifesto Pillars Grid (Modern Figurative Art Gallery) ── */}
      <section className="py-24 px-6 sm:px-12 md:px-16 relative overflow-hidden bg-white/70 border-t-2 border-b-2 border-black/15 z-20">
        <div className="max-w-6xl mx-auto mb-16 select-none">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-black/10 pb-6">
            <div className="space-y-2">
              <span className="font-mono text-[9px] font-bold tracking-[3px] text-[#ff1e90] uppercase bg-[#ff1e90]/10 border border-[#ff1e90]/20 px-3 py-1 rounded-full inline-block">
                EXHIBITION MANIFESTO // CURATORIAL AXIOMS
              </span>
              <h2 className="font-display font-black tracking-tight text-[#0a0a0a] leading-tight text-4xl sm:text-5xl md:text-6xl uppercase">
                Four axioms of{" "}
                <span className="font-serif italic font-normal text-zinc-400 lowercase">
                  figurative modern art
                </span>
                .
              </h2>
            </div>
            <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest text-right">
              GALLERY PAVILION // VOL. IV <br />
              <span className="text-black font-black">INV. NO. 2026-VISTAR-AXIOM</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans max-w-2xl mt-4">
            We reject the homogenization of the internet. Our work treats digital architecture as a physical sculpture in cyberspace—grounded in classical proportion, driven by sub-second mathematics, and preserved as sovereign property.
          </p>
        </div>

        {/* 4 Columns Curatorial Placard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Axiom I */}
          <div className="group">
            <SpotlightCard
              glowColor="rgba(216, 255, 66, 0.15)"
              borderColor="rgba(0, 0, 0, 0.15)"
              className="bg-[#faf9f5] border-[2.5px] border-black rounded-2xl p-6 min-h-[420px] flex flex-col justify-between shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#d8ff42] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-black/10 pb-3">
                  <span className="font-mono text-[9px] font-black uppercase px-2.5 py-1 rounded bg-black text-[#d8ff42]">
                    AXIOM I
                  </span>
                  <span className="font-serif italic text-xs text-zinc-400">
                    Ontological Reduction
                  </span>
                </div>
                <div className="font-mono text-[8px] tracking-widest text-zinc-400 uppercase">
                  MEDIUM: PURE PRIMITIVES
                </div>
                <h3 className="font-display font-black uppercase text-xl text-black leading-tight">
                  Strip The Commodity
                </h3>
                <p className="text-zinc-600 text-xs leading-relaxed font-sans">
                  If your site relies on the same generic framework template as thousands of competitors, visitors unconsciously downgrade your brand equity. We carve from first principles with zero plugin bloat.
                </p>
              </div>
              <div className="pt-4 border-t border-black/10 flex items-center justify-between font-mono text-[9px]">
                <span className="text-zinc-400">CORE METRIC:</span>
                <span className="font-black text-black">0KB THIRD-PARTY BLOAT</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Axiom II */}
          <div className="group">
            <SpotlightCard
              glowColor="rgba(255, 30, 144, 0.15)"
              borderColor="rgba(0, 0, 0, 0.15)"
              className="bg-[#111] text-white border-[2.5px] border-black rounded-2xl p-6 min-h-[420px] flex flex-col justify-between shadow-[6px_6px_0px_#ff1e90] hover:shadow-[10px_10px_0px_#fff] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="font-mono text-[9px] font-black uppercase px-2.5 py-1 rounded bg-[#ff1e90] text-white">
                    AXIOM II
                  </span>
                  <span className="font-serif italic text-xs text-zinc-400">
                    Sensory Kineticism
                  </span>
                </div>
                <div className="font-mono text-[8px] tracking-widest text-zinc-400 uppercase">
                  MEDIUM: BESPOKE GLSL SHADERS
                </div>
                <h3 className="font-display font-black uppercase text-xl text-white leading-tight">
                  Form Must Stir Emotion
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                  Digital presence should evoke the tactile gravity of an exhibition sculpture. We engineer custom WebGL shaders, scroll-parallax timelines, and responsive micro-motion at solid 60 FPS Retina speed.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[9px]">
                <span className="text-zinc-400">CORE METRIC:</span>
                <span className="font-black text-[#d8ff42]">60 FPS RETINA SMOOTH</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Axiom III */}
          <div className="group">
            <SpotlightCard
              glowColor="rgba(216, 255, 66, 0.15)"
              borderColor="rgba(0, 0, 0, 0.15)"
              className="bg-white border-[2.5px] border-black rounded-2xl p-6 min-h-[420px] flex flex-col justify-between shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#ff1e90] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-black/10 pb-3">
                  <span className="font-mono text-[9px] font-black uppercase px-2.5 py-1 rounded bg-[#d8ff42] text-black border border-black shadow-[1px_1px_0px_#000]">
                    AXIOM III
                  </span>
                  <span className="font-serif italic text-xs text-zinc-400">
                    Velocity As Respect
                  </span>
                </div>
                <div className="font-mono text-[8px] tracking-widest text-zinc-400 uppercase">
                  MEDIUM: EDGE SSR &amp; SUB-SECOND TTFB
                </div>
                <h3 className="font-display font-black uppercase text-xl text-black leading-tight">
                  Speed Is The Art of Polish
                </h3>
                <p className="text-zinc-600 text-xs leading-relaxed font-sans">
                  Lag is visual disrespect. When an interface responds in 120ms with zero layout shift, it triggers instant psychological prestige, multiplying buyer trust and conversion rates by up to 4.2×.
                </p>
              </div>
              <div className="pt-4 border-t border-black/10 flex items-center justify-between font-mono text-[9px]">
                <span className="text-zinc-400">CORE METRIC:</span>
                <span className="font-black text-black">&lt; 150MS GLOBAL TTFB</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Axiom IV */}
          <div className="group">
            <SpotlightCard
              glowColor="rgba(255, 30, 144, 0.15)"
              borderColor="rgba(0, 0, 0, 0.15)"
              className="bg-[#d8ff42] border-[2.5px] border-black rounded-2xl p-6 min-h-[420px] flex flex-col justify-between shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-black/20 pb-3">
                  <span className="font-mono text-[9px] font-black uppercase px-2.5 py-1 rounded bg-black text-white">
                    AXIOM IV
                  </span>
                  <span className="font-serif italic text-xs text-black/60">
                    Institutional Sovereignty
                  </span>
                </div>
                <div className="font-mono text-[8px] tracking-widest text-black/60 uppercase">
                  MEDIUM: 100% GITHUB HANDOVER
                </div>
                <h3 className="font-display font-black uppercase text-xl text-black leading-tight">
                  Total Source Autonomy
                </h3>
                <p className="text-black/80 text-xs leading-relaxed font-sans">
                  True art and true engineering belong to their patron. We transfer 100% of the repository, design tokens, and CI/CD pipelines directly to your GitHub on day 21. No monthly agency ransom.
                </p>
              </div>
              <div className="pt-4 border-t border-black/20 flex items-center justify-between font-mono text-[9px]">
                <span className="text-black/60">CORE METRIC:</span>
                <span className="font-black text-black">100% CLIENT OWNERSHIP</span>
              </div>
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
