"use client";

// NOTE: This is a client component. Metadata for /work is exported from a
// separate server wrapper. For page-level metadata on this route, see the
// metadata defined inside WorkSolutionsPage export below via a sibling server page.

import React, { useState } from "react";
import Link from "next/link";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { playClick } from "@/lib/sound";

interface SolutionCard {
  title: string;
  tag: string;
  desc: string;
  liveUrl?: string;
  bgGradient: string;
}

const CARDS: SolutionCard[] = [
  {
    tag: "AVIATION & DEFENSE",
    title: "Project VAYU: Cockpit Telemetry & NOTAM Parsing",
    desc: "AI cockpit dashboard with GIS vector hazard layers, automated threat extraction, and zero-latency situational awareness.",
    bgGradient: "from-[#8B1E0F] via-[#5C1309] to-[#2B0803]",
    liveUrl: "https://ai-vayu.vercel.app",
  },
  {
    tag: "CRITICAL HEALTHCARE",
    title: "AURA: Multi-Agent Biometric Anomaly Detection",
    desc: "Multi-agent telemetry stream architecture with unsupervised Isolation Forest ML models for real-time biometric anomaly detection.",
    bgGradient: "from-[#0F224A] via-[#0A1733] to-[#040914]",
    liveUrl: "https://multi-agent-anomaly-system.onrender.com",
  },
  {
    tag: "PROPTECH & RWA",
    title: "3axis Arc: High-Performance Architectural 3D",
    desc: "Bespoke Next.js 16 platform featuring dynamic architectural perspective transformations and sub-100ms global TTFB.",
    bgGradient: "from-[#113B1F] via-[#0B2614] to-[#041208]",
    liveUrl: "https://3axisarc.vercel.app",
  },
];

const ROLES = [
  {
    role: "Chief Technology Officers",
    summary: "Eliminate vendor lock-in and agency maintenance retainers with 100% day-one private GitHub repository transfer.",
    detail: "Receive typed Next.js 16 codebases, private Dockerfiles, and hardware-backed TLS 1.3 / AES-256 cryptographic security.",
  },
  {
    role: "VP Engineering & Architecture",
    summary: "Deliver deterministic multi-agent graphs without junior developer telephone games.",
    detail: "Direct access to principal systems engineers delivering production software in 14-day guaranteed sprints.",
  },
  {
    role: "Head of AI & Machine Learning",
    summary: "Isolate proprietary model weights and fine-tuned embeddings in your private VPC perimeter.",
    detail: "Zero cross-tenant inference leakage. Dedicated TLS 1.3 / AES-256 state channels.",
  },
  {
    role: "Information Security & Compliance",
    summary: "Air-gapped VPC sandbox perimeters meeting SOC2 Type II and ISO 27001 rigor.",
    detail: "Cryptographic audit ledgers for every model inference and database tool interaction.",
  },
  {
    role: "Product & Operations Leadership",
    summary: "Sub-100ms P99 edge latency accelerating user conversion and eliminating mobile bounce.",
    detail: "Continuous closed-loop telemetry streaming 60fps interaction metrics and automated self-healing triggers.",
  },
];

const INDUSTRIES = [
  {
    name: "Financial Services & Trading",
    summary: "Sub-second order book streams, deterministic cryptographic settlement, and typed Postgres audit ledgers.",
  },
  {
    name: "Aviation & Mission-Critical",
    summary: "Zero-latency situational dispatch, geospatial hazard extraction, and resilient multi-agent channels.",
  },
  {
    name: "Healthcare & Life Sciences",
    summary: "Unsupervised anomaly detection, zero data retention perimeters, and HIPAA-compliant VPC vaults.",
  },
  {
    name: "PropTech & Tokenized Assets",
    summary: "High-frequency WebGL rendering, architectural perspective engines, and instant asset verification.",
  },
  {
    name: "Enterprise SaaS & Modernization",
    summary: "Unbundle sluggish agency WordPress/Webflow sites into ultra-fast Next.js 16 microservices.",
  },
];

export default function WorkSolutionsPage() {
  const [activeRole, setActiveRole] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState(0);

  return (
    <div className="w-full bg-[#FAF9F5] text-[#00063D] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen">
      
      {/* ── FRAME 1: SOLUTIONS HERO WITH FLOATING CURSOR BADGES & PINK TILED STEP BANNER ── */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 bg-[#FAF9F5] border-b border-black/10 overflow-hidden text-center px-4">
        <div className="max-w-5xl mx-auto relative">
          
          {/* Floating Cursor Role Badges (Matching Jasper's Hero Badges) */}
          <div className="hidden sm:inline-flex items-center gap-2 absolute -top-4 left-6 bg-[#FF3823] text-white px-3 py-1 rounded-[4px] shadow-sm text-xs font-semibold z-20">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span>Principal Systems Architect</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 absolute top-12 right-6 bg-[#55FF55] text-[#052E16] px-3 py-1 rounded-[4px] shadow-sm text-xs font-semibold z-20">
            <span className="w-2 h-2 rounded-full bg-[#052E16]" />
            <span>AI &amp; Consensus Engineer</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 absolute -bottom-6 left-1/4 bg-[#1E60E6] text-white px-3 py-1 rounded-[4px] shadow-sm text-xs font-semibold z-20">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span>Head of Cryptography</span>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-6 pt-6">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-[80px] font-normal text-[#00063D] tracking-[-2.4px] leading-[1.0]">
              Mission-Critical Production Systems. Proven at Scale.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Inspect sovereign production architectures engineered by Vistar—from real-time cockpit GIS and multi-agent anomaly detection to high-frequency spatial 3D platforms with 100% repository handover.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/start"
                onClick={() => playClick(950, 0.03)}
                className="bg-[#FF3823] hover:bg-[#E0301C] text-white px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150 inline-flex items-center gap-2"
              >
                Start Free Diagnostic
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                onClick={() => playClick(900, 0.03)}
                className="bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-900 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150 inline-flex items-center gap-2"
              >
                Get A Demo
              </Link>
            </div>
          </div>
        </div>

        {/* Stepped Technical Grid Pattern at bottom of hero */}
        <div className="w-full h-12 bg-neutral-100/80 [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1.5px,transparent_1.5px)] [background-size:24px_24px] mt-12 border-t border-black/10" />
      </section>

      {/* ── FRAME 2: SOLUTIONS BY USE CASE (3 DEEP HALFTONE GRADIENT CARDS) ── */}
      <section className="w-full py-24 px-6 bg-white border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-[80px] font-normal text-[#00063D] tracking-[-2.4px]">
              Solutions by use case
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CARDS.map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-black/10 rounded-[6px] overflow-hidden shadow-sm flex flex-col justify-between hover:border-black/30 transition-all"
              >
                <div className={`w-full h-56 bg-gradient-to-br ${card.bgGradient} p-6 relative flex flex-col justify-between text-white overflow-hidden`}>
                  <div className="absolute inset-0 [background-image:radial-gradient(circle,#ffffff_2px,transparent_2px)] [background-size:18px_18px] opacity-20 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                      {card.tag}
                    </span>
                  </div>

                  <div className="relative z-10">
                    {card.liveUrl && (
                      <a
                        href={card.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#FFD8CE] hover:bg-white text-[#1A1A1A] font-mono text-xs font-semibold px-3 py-1 rounded-[2px] transition-colors inline-flex items-center gap-1 shadow-xs"
                      >
                        Learn More →
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <h3 className="font-serif text-2xl font-bold text-[#00063D]">
                    {card.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAME 3: SOLUTIONS BY ROLE (ACCORDION WITH VISUAL CONTAINER ON LEFT) ── */}
      <section className="w-full py-24 px-6 bg-[#FAF9F5] border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-right">
            <h2 className="font-serif text-4xl sm:text-6xl md:text-[80px] font-normal text-[#00063D] tracking-[-2.4px]">
              Solutions by role
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Graphic Visual Placeholder */}
            <div className="lg:col-span-5 bg-white border border-black/10 rounded-[6px] p-8 shadow-sm space-y-4">
              <div className="w-full h-64 bg-[#E8FCE8] [background-image:linear-gradient(to_right,rgba(34,197,94,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.15)_1px,transparent_1px)] [background-size:24px_24px] rounded flex items-center justify-center">
                <span className="font-mono text-xs text-emerald-800 bg-white/80 px-3 py-1 rounded shadow-2xs">
                  Sovereignty Profile: {ROLES[activeRole].role}
                </span>
              </div>
              <p className="font-serif text-lg font-bold text-[#00063D]">
                {ROLES[activeRole].role}
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {ROLES[activeRole].detail}
              </p>
            </div>

            {/* Right Column: Accordion List with Hairline Dividers */}
            <div className="lg:col-span-7 space-y-2">
              {ROLES.map((r, i) => {
                const isActive = activeRole === i;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveRole(i);
                      playClick(900, 0.02);
                    }}
                    className={`p-6 rounded-[4px] border cursor-pointer transition-all ${
                      isActive
                        ? "bg-[#E8FCE8] border-emerald-300"
                        : "bg-white border-black/10 hover:border-black/25"
                    }`}
                  >
                    <h3 className="font-serif text-2xl font-bold text-[#00063D]">
                      {r.role}
                    </h3>
                    {isActive && (
                      <p className="text-sm text-neutral-700 mt-2 leading-relaxed">
                        {r.summary}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 4: SOLUTIONS BY INDUSTRY (ACCORDION WITH VISUAL CONTAINER ON RIGHT) ── */}
      <section className="w-full py-24 px-6 bg-white border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-[80px] font-normal text-[#00063D] tracking-[-2.4px]">
              Solutions by industry
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Accordion List */}
            <div className="lg:col-span-7 space-y-2">
              {INDUSTRIES.map((ind, i) => {
                const isActive = activeIndustry === i;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveIndustry(i);
                      playClick(950, 0.02);
                    }}
                    className={`p-6 rounded-[4px] border cursor-pointer transition-all ${
                      isActive
                        ? "bg-[#E8FCE8] border-emerald-300"
                        : "bg-[#FAF9F5] border-black/10 hover:border-black/25"
                    }`}
                  >
                    <h3 className="font-serif text-2xl font-bold text-[#00063D]">
                      {ind.name}
                    </h3>
                    {isActive && (
                      <p className="text-sm text-neutral-700 mt-2 leading-relaxed">
                        {ind.summary}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column: Visual Container */}
            <div className="lg:col-span-5 bg-[#FAF9F5] border border-black/10 rounded-[6px] p-8 shadow-sm space-y-4">
              <div className="w-full h-64 bg-[#FFF0EB] [background-image:linear-gradient(to_right,rgba(255,138,122,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,138,122,0.2)_1px,transparent_1px)] [background-size:24px_24px] rounded flex items-center justify-center">
                <span className="font-mono text-xs text-[#801A10] bg-white/80 px-3 py-1 rounded shadow-2xs">
                  Industry Benchmark: {INDUSTRIES[activeIndustry].name}
                </span>
              </div>
              <p className="font-serif text-lg font-bold text-[#00063D]">
                {INDUSTRIES[activeIndustry].name}
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {INDUSTRIES[activeIndustry].summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 5: MOSAIC FRAMED BOTTOM CTA (MATCHING JASPER SOLUTIONS MOSAIC CTA) ── */}
      <section className="relative w-full py-28 px-6 bg-[#CBE7F5] [background-image:linear-gradient(to_right,#ffffff_1.5px,transparent_1.5px),linear-gradient(to_bottom,#ffffff_1.5px,transparent_1.5px)] [background-size:46px_46px] border-b border-black/10 overflow-hidden">
        {/* Mosaic geometric decorative elements */}
        <div className="absolute top-10 left-10 w-44 h-44 bg-[#1E60E6] [background-image:linear-gradient(to_right,#ffffff_2px,transparent_2px),linear-gradient(to_bottom,#ffffff_2px,transparent_2px)] [background-size:20px_20px] rounded shadow-md pointer-events-none opacity-85 hidden md:block" />
        <div className="absolute bottom-6 left-12 w-56 h-16 bg-[#FF3823] [background-image:repeating-linear-gradient(45deg,#ffffff,#ffffff_8px,transparent_8px,transparent_16px)] shadow-md -rotate-6 pointer-events-none hidden md:block" />
        <div className="absolute -bottom-12 right-12 w-56 h-56 rounded-full bg-[#1A6B35] [background-image:radial-gradient(circle,#55FF55_2px,transparent_2px)] [background-size:16px_16px] shadow-lg pointer-events-none hidden md:block" />

        <div className="relative z-10 max-w-4xl mx-auto border border-black/15 rounded-[6px] shadow-xl overflow-hidden bg-white">
          <div className="bg-[#FAF9F5] border-b border-black/10 px-4 py-2.5 flex items-center justify-between font-mono text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2">vistar-solutions-dispatch.sh</span>
            </div>
            <span>v1.0 Production</span>
          </div>

          <div className="p-12 sm:p-24 text-center space-y-6">
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#00063D] tracking-tight">
              Start building with Vistar today
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/start"
                className="bg-[#FF3823] hover:bg-[#E0301C] text-white px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150 inline-flex items-center gap-2"
              >
                Start Free Diagnostic
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-900 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150"
              >
                Get A Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
