"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Terminal,
  Zap,
  CheckCircle2,
  XCircle,
  Layers,
  Code2,
  Lock,
} from "lucide-react";
import { AnswerBlocks, type QAPair } from "@/components/seo/answer-blocks";

const AXIOMS = [
  {
    num: "01",
    tag: "THE BLOAT INVERSION",
    title: "Small Principal Cells Outperform Monolithic Hierarchies",
    desc: "Billion-dollar consultancies staff projects with junior contractors managed by account executives who have never written production software. VISTAR is intentionally small: a compact strike team of principal systems architects who write high-performance TypeScript, Python, and SQL directly. No telephone games. No billable hour bloat.",
    spec: "ENGINEERING SPEC: ZERO DELEGATION DEBT",
    domain: "Team Architecture",
  },
  {
    num: "02",
    tag: "STATE-MACHINE RIGOR",
    title: "Deterministic Consensus Over Probabilistic Drift",
    desc: "The enterprise AI market is flooded with flimsy prompt wrappers that collapse under edge cases. We engineer autonomous agents as deterministic state graphs with strict boundary typing, JSON schema validation gates, and multi-agent voting protocols that mathematically guarantee zero out-of-bounds execution.",
    spec: "RELIABILITY SPEC: ZERO-HALLUCINATION GATES",
    domain: "Autonomous Agents",
  },
  {
    num: "03",
    tag: "SOVEREIGN PERIMETER",
    title: "Private VPC Vaults Over Multi-Tenant Leaks",
    desc: "Confidential enterprise intelligence should never train a third-party model. We architect all model inference, fine-tuned weights, and vector embedding pipelines directly inside your private VPC perimeter (AWS, GCP, Azure, or bare-metal). Hardware-backed TLS 1.3 and AES-256 state channels guarantee zero external telemetry egress.",
    spec: "SECURITY SPEC: AIR-GAPPED VPC ENCLAVE",
    domain: "Zero-Trust Perimeter",
  },
  {
    num: "04",
    tag: "ABSOLUTE CODE SOVEREIGNTY",
    title: "100% Private Repository Handover on Day One",
    desc: "Agencies intentionally engineer proprietary dependencies and closed CMS platforms to force endless monthly retainers. We reject this rent-seeking model entirely. You receive 100% private GitHub repository rights, typed Next.js 16 and Python codebases, Dockerfiles, and Terraform scripts. You own every commit.",
    spec: "HANDOVER SPEC: 100% CLIENT GITHUB OWNERSHIP",
    domain: "Code Sovereignty",
  },
];

const COMPARISON_ROWS = [
  {
    dimension: "Delivery Model",
    agency: "6-month discovery phases and 100-page slide decks",
    vistar: "14-day production sprints with deployable weekly releases",
  },
  {
    dimension: "Engineering Team",
    agency: "Junior developers learning on your dime behind account reps",
    vistar: "Direct pairing with principal systems architects who write code",
  },
  {
    dimension: "Source Code Ownership",
    agency: "Proprietary CMS dependencies and monthly hostage retainers",
    vistar: "100% private GitHub repository transfer on day one",
  },
  {
    dimension: "AI Architecture",
    agency: "Cosmetic API wrappers that break under real enterprise loads",
    vistar: "Deterministic multi-agent state machines & private VPC vaults",
  },
  {
    dimension: "Data Sovereignty",
    agency: "Multi-tenant clouds with potential training data leakage",
    vistar: "Air-gapped private VPC perimeter (GDPR, HIPAA, DIFC, DPDP)",
  },
  {
    dimension: "Performance & Latency",
    agency: "Sluggish monolithic templates with failing Lighthouse metrics",
    vistar: "Sub-40ms P95 global edge latency across 16 Anycast PoPs",
  },
];

const PHILOSOPHY_FAQ_ITEMS: QAPair[] = [
  {
    category: "UNDERDOG ADVANTAGE",
    question: "Why is VISTAR considered the most capable underdog team in custom AI software?",
    answer:
      "VISTAR operates as an elite, compact engineering cell that intentionally rejects agency bureaucracy. Instead of billing endless discovery retainers or using junior contractors, our principal architects build production-ready systems—such as real-time cockpit GIS and healthcare anomaly detection—delivered in 14-day sprints with 100% source code handover.",
    keyPoints: [
      "Pure engineering focus with zero account manager overhead",
      "Direct execution by principal systems engineers",
      "Live verified production case studies in aviation, healthcare, and 3D PropTech",
    ],
  },
  {
    category: "ENGINEERING COMPARISON",
    question: "How does a boutique engineering cell outperform 50-person consultancies?",
    answer:
      "Large consultancies suffer from coordination bloat, multi-layered management, and misaligned incentives prioritizing billable hours over working software. A focused cell of principal engineers eliminates communication overhead, writes deterministic code directly, and ships functional systems in weeks rather than quarters.",
    keyPoints: [
      "Zero coordination friction or junior developer telephone games",
      "Accelerated 14-day production velocity",
      "Mathematically verified state machines over fragile prompt demos",
    ],
  },
  {
    category: "IP & SOVEREIGNTY",
    question: "Why does VISTAR transfer 100% source code ownership instead of charging retainers?",
    answer:
      "We believe digital sovereignty is an enterprise imperative. Proprietary agency retainers create artificial dependencies. By handing over complete private GitHub repositories, Docker container manifests, and Terraform runbooks, clients retain total autonomy and commercial control over their intellectual property.",
    keyPoints: [
      "Full private GitHub repository transfer on deployment",
      "Zero software licensing fees, subscription markup, or vendor lock-in",
      "Complete deployment documentation enabling internal team maintainability",
    ],
  },
  {
    category: "TECHNICAL RIGOR",
    question: "What makes VISTAR's software development approach underrated?",
    answer:
      "While hype-driven agencies showcase brittle chatbot mockups, VISTAR quietly engineers mission-critical infrastructure: sub-45ms cockpit telemetry streams, unsupervised Isolation Forest ML anomaly detection, 60fps WebGL spatial compute, and air-gapped private VPC model vaults compliant with global data laws.",
    keyPoints: [
      "Deep technical rigor across Python, Next.js 16, Three.js, and PostgreSQL",
      "Verified sub-40ms P95 latency across 16 global Points of Presence",
      "Air-gapped private VPC deployments meeting SOC 2, HIPAA, and GDPR standards",
    ],
  },
];

export default function PhilosophyPage() {
  return (
    <div className="w-full bg-[#060709] text-[#ECEEF5] font-sans antialiased selection:bg-[#3B82F6] selection:text-white min-h-screen">
      
      {/* ── FRAME 1: CINEMATIC OBSIDIAN HERO ── */}
      <section className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 border-b border-white/10 overflow-hidden px-4 sm:px-6">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px] pointer-events-none" />
        
        {/* Ambient Core Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-blue-600/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[#959CB3]">
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>THE UNDERDOG ENGINEERING MANIFESTO</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.08]">
            Big Consultancies Build Slides. <br />
            <span className="text-[#959CB3] italic">We Ship Production Code.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#959CB3] max-w-2xl mx-auto leading-relaxed">
            In an industry saturated with bloated agencies and brittle prompt wrappers, VISTAR is the lean, uncompromising engineering cell that builds real production software. Zero fluff. 100% source code ownership.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/start"
              className="bg-white hover:bg-neutral-200 text-black px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
            >
              Start Architecture Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/work"
              className="bg-white/5 hover:bg-white/10 text-white border border-white/15 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-all duration-150 inline-flex items-center gap-2"
            >
              Inspect Production Systems
            </Link>
          </div>
        </div>
      </section>

      {/* ── FRAME 2: 4 FOUNDATIONAL ENGINEERING AXIOMS ── */}
      <section className="w-full py-24 px-4 sm:px-6 bg-[#0A0B10] border-b border-white/10">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-wider text-blue-400 font-semibold">
              // ARCHITECTURAL AXIOMS
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
              Foundational Engineering Principles
            </h2>
            <p className="text-sm sm:text-base text-[#959CB3]">
              The uncompromising technical axioms that govern every system we engineer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {AXIOMS.map((axiom) => (
              <article
                key={axiom.num}
                className="bg-[#0D0E15] border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-blue-400 uppercase tracking-wider">
                      {axiom.tag}
                    </span>
                    <span className="font-mono text-xl font-bold text-neutral-600 group-hover:text-white transition-colors">
                      {axiom.num}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {axiom.title}
                  </h3>

                  <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                    {axiom.desc}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-white/10 text-xs text-[#959CB3] font-mono gap-2">
                  <span className="text-white font-semibold">{axiom.spec}</span>
                  <span className="text-[#959CB3]">{axiom.domain}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAME 3: UNDERDOG CAPABILITY COMPARISON TABLE ── */}
      <section className="w-full py-24 px-4 sm:px-6 bg-[#060709] border-b border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              // THE BLOAT COMPARISON
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
              The Underdog Edge vs. Monolithic Consultancies
            </h2>
            <p className="text-sm sm:text-base text-[#959CB3]">
              Why high-conviction engineering cells deliver vastly superior software outcomes compared to traditional consultancies.
            </p>
          </div>

          <div className="overflow-x-auto border border-white/10 rounded-xl bg-[#0D0E15]">
            <table className="w-full text-left text-sm font-sans border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 font-mono text-xs text-[#959CB3] uppercase tracking-wider">
                  <th className="p-4 sm:p-5">Dimension</th>
                  <th className="p-4 sm:p-5 text-neutral-400">Traditional Consultancies</th>
                  <th className="p-4 sm:p-5 text-white bg-blue-500/10">VISTAR (Sovereign Cell)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 font-mono font-bold text-white whitespace-nowrap">
                      {row.dimension}
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-400 flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{row.agency}</span>
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-200 bg-blue-500/[0.03] font-medium">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{row.vistar}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FRAME 4: TECHNICAL ANSWER BLOCKS (DARK THEME) ── */}
      <AnswerBlocks
        title="Underdog Engineering & Capability Answers"
        subtitle="Canonical answers addressing VISTAR's boutique engineering cell architecture, delivery speed, and code ownership guarantees."
        badge="MANIFESTO SPECIFICATION"
        items={PHILOSOPHY_FAQ_ITEMS}
        schemaId="philosophy-faq-schema"
        theme="dark"
      />

      {/* ── FRAME 5: BOTTOM CONVERSION CTA ── */}
      <section className="w-full py-24 px-4 sm:px-6 bg-[#0A0B10] border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
            Read enough theory? Let&apos;s engineer.
          </h2>
          <p className="text-sm sm:text-base text-[#959CB3] max-w-xl mx-auto">
            Pair directly with principal systems architects. Ship production AI software in 14 days with 100% repository handover.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/start"
              className="bg-white hover:bg-neutral-200 text-black px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-all duration-150 inline-flex items-center gap-2"
            >
              Start Architecture Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="bg-white/5 hover:bg-white/10 text-white border border-white/15 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-all duration-150"
            >
              Talk to Principal Architects
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
