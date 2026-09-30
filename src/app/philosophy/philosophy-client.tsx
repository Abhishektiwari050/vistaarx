"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { playClick } from "@/lib/sound";

const RESEARCH_AXIOMS = [
  {
    num: "01",
    tag: "AUTONOMOUS SYSTEMS",
    title: "Deterministic Multi-Agent Graphs vs Probabilistic Drift",
    desc: "Why traditional prompt wrappers fail in production environments, and how typed schema verification, state machine constraints, and multi-agent consensus eliminate non-deterministic hallucinations.",
    spec: "ENGINEERING SPEC: RFC-9110 SCHEMA GATES",
    domain: "Autonomous Agents",
  },
  {
    num: "02",
    tag: "ZERO-TRUST SECURITY",
    title: "Zero-Trust Cryptographic Isolation in Enterprise Telemetry",
    desc: "An architectural breakdown of hardware-backed TLS 1.3 state channels, AES-256-GCM encryption, and air-gapped VPC sandbox boundaries applied to distributed multi-agent clusters.",
    spec: "SECURITY SPEC: TLS 1.3 // AES-256-GCM",
    domain: "Zero-Trust Perimeter",
  },
  {
    num: "03",
    tag: "SYSTEM PERFORMANCE",
    title: "Sub-90ms Edge Inference and Global Cache Disbursement",
    desc: "Achieving sub-second response times across 24 edge points of presence. Profiling Next.js 16 App Router streaming, zero-layout-shift canvas telemetry, and TTFB optimization.",
    spec: "EDGE SPEC: < 120ms P99 ANYCAST POPs",
    domain: "Performance Runtime",
  },
  {
    num: "04",
    tag: "SOFTWARE SOVEREIGNTY",
    title: "The Death of Agency Vendor Lock-In",
    desc: "An economic and technical manifesto on why modern enterprises must demand 100% source code handover, zero CMS hostage fees, and total infrastructure sovereignty from day one.",
    spec: "HANDOVER SPEC: 100% PRIVATE GIT REPO",
    domain: "Code Sovereignty",
  },
];

export default function PhilosophyPage() {
  return (
    <div className="w-full bg-[#FAF9F5] text-[#0E1118] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen">
      
      {/* ── 1. JASPER RESEARCH HERO ── */}
      <section className="relative w-full pt-20 pb-28 md:pt-28 md:pb-36 bg-[#F2EFE9] [background-image:linear-gradient(to_right,#ffffff_1.5px,transparent_1.5px),linear-gradient(to_bottom,#ffffff_1.5px,transparent_1.5px)] [background-size:46px_46px] border-b border-black/10 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="inline-block bg-black/5 border border-black/10 text-neutral-800 font-mono text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-[2px]">
              Research &amp; Axioms
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold text-[#0E1118] tracking-tight leading-[1.08]">
            We reject throwaway software. We engineer{" "}
            <span className="font-serif italic font-normal text-[#1E60E6]">
              sovereign
            </span>{" "}
            infrastructure.
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            In an ecosystem saturated with fragile prompt wrappers and agency lock-in, production-tested software and 100% private repository ownership are the only durable assets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/start"
              onClick={() => playClick(900, 0.03)}
              className="bg-[#FF3823] hover:bg-[#E0301C] text-white px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150 inline-flex items-center gap-2"
            >
              Start Free Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/work"
              onClick={() => playClick(1000, 0.02)}
              className="bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-900 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150 inline-flex items-center gap-2"
            >
              Explore Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. ARCHITECTURAL AXIOMS GRID ── */}
      <section className="w-full py-24 px-6 bg-white border-b border-black/10">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest border border-black/15 px-2.5 py-1 rounded bg-[#FAF9F5]">
              Architectural Axioms
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0E1118] tracking-tight">
              Foundational Engineering Principles
            </h2>
            <p className="text-neutral-600 max-w-xl mx-auto text-sm sm:text-base">
              Peer into our foundational axioms on agent determinism, zero-trust cryptographic isolation, and edge architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {RESEARCH_AXIOMS.map((axiom) => (
              <article
                key={axiom.num}
                className="bg-[#FAF9F5] border border-black/10 rounded-[6px] p-8 hover:border-black/30 transition-all flex flex-col justify-between space-y-6 shadow-2xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#FF3823] uppercase tracking-wider">
                      {axiom.tag}
                    </span>
                    <span className="font-serif text-2xl font-bold text-neutral-400">
                      {axiom.num}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#0E1118] leading-snug">
                    {axiom.title}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {axiom.desc}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-black/10 text-xs text-neutral-500 font-mono gap-2">
                  <span className="text-[#0E1118] font-semibold">{axiom.spec}</span>
                  <span className="text-neutral-400 font-sans">{axiom.domain}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. FINAL CTA ── */}
      <section className="w-full py-24 px-6 vistar-grid-hero border-b border-black/10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-4xl sm:text-6xl font-semibold text-[#0E1118] tracking-tight">
            Read enough theory? Let&apos;s build.
          </h2>
          <p className="text-neutral-600 text-base max-w-xl mx-auto">
            Kick off a 14-day production delivery sprint with guaranteed repository transfer.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/start"
              className="bg-[#FF3823] hover:bg-[#E0301C] text-white px-8 py-4 font-semibold text-sm rounded-[4px] shadow-sm inline-flex items-center gap-2"
            >
              Start Free Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
