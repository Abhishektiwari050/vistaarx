"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
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
    tag: "NO AGENCY BLOAT",
    title: "Small Principal Cells Outperform Monolithic Consultancies",
    desc: "Large consultancies staff client projects with junior developers managed by account executives who have never written production software. VISTAR is intentionally compact: a strike team of principal engineers who write TypeScript, Python, and SQL directly. No telephone games. No billable-hour padding.",
    spec: "PRINCIPLE: DIRECT SENIOR ENGINEERING",
    domain: "Team Structure",
  },
  {
    num: "02",
    tag: "PRODUCTION RELIABILITY",
    title: "Deterministic Validation Over Brittle Prompts",
    desc: "The market is flooded with flimsy ChatGPT wrappers that break the moment real customers use them. We build autonomous agents with strict schema validation gates and verification steps that guarantee your system never writes corrupted data or executes unauthorized actions.",
    spec: "PRINCIPLE: ZERO-HALLUCINATION GATES",
    domain: "Autonomous Agents",
  },
  {
    num: "03",
    tag: "PRIVATE CLOUD",
    title: "Private VPC Perimeters Over Public Multi-Tenant APIs",
    desc: "Your confidential business intelligence should never train a third-party model. We architect all model inference, fine-tuned weights, and vector databases directly inside your private VPC perimeter (AWS, GCP, or Azure) with encrypted state channels and zero external data leaks.",
    spec: "PRINCIPLE: AIR-GAPPED PRIVATE CLOUD",
    domain: "Security & Privacy",
  },
  {
    num: "04",
    tag: "100% CODE OWNERSHIP",
    title: "Full GitHub Handover on Day One",
    desc: "Traditional agencies build proprietary dependencies and closed platforms to lock you into $15,000/month retainers. We reject this rent-seeking model entirely. You receive 100% private GitHub repository rights, typed Next.js and Python codebases, Dockerfiles, and deployment runbooks. You own every line of code.",
    spec: "PRINCIPLE: 100% CLIENT CODE OWNERSHIP",
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
    vistar: "Direct pairing with principal software engineers who write code",
  },
  {
    dimension: "Source Code Ownership",
    agency: "Proprietary CMS dependencies and monthly hostage retainers",
    vistar: "100% private GitHub repository transfer on day one",
  },
  {
    dimension: "AI Architecture",
    agency: "Cosmetic API wrappers that break under real enterprise loads",
    vistar: "Deterministic multi-agent workflows & private VPC vaults",
  },
  {
    dimension: "Data Sovereignty",
    agency: "Multi-tenant clouds with potential training data leakage",
    vistar: "Air-gapped private VPC perimeter (GDPR, HIPAA, DIFC, DPDP)",
  },
  {
    dimension: "Performance & Speed",
    agency: "Sluggish monolithic templates with failing Lighthouse metrics",
    vistar: "Sub-45ms P95 global edge latency across 16 Anycast PoPs",
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
    <div className="w-full bg-[#FAF9F5] text-[#141413] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen">
      
      {/* ── FRAME 1: WARM EDITORIAL HERO ── */}
      <section className="relative w-full pt-28 pb-16 md:pt-36 md:pb-24 border-b border-black/10 overflow-hidden px-4 sm:px-6">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/10 rounded-full text-xs font-medium text-[#5E605D] shadow-xs">
            <Code2 className="w-3.5 h-3.5 text-[#FF3823]" />
            <span>THE UNDERDOG ENGINEERING MANIFESTO</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#141413] tracking-tight leading-[1.08]">
            Big Consultancies Build Slides. <br />
            <span className="text-[#5E605D] italic">We Ship Production Code.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-[19px] text-[#5E605D] max-w-2xl mx-auto leading-relaxed font-normal">
            In an industry saturated with bloated agencies and fragile prompt demos, VISTAR is the lean engineering cell that builds real production systems. Zero fluff. 100% source code ownership.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3">
            <Link
              href="/start"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#FF3823] hover:bg-[#E02F1C] text-white font-medium text-sm rounded-none transition-colors shadow-xs gap-2"
            >
              Start Free Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-[#141413] text-[#141413] bg-transparent hover:bg-white font-medium text-sm rounded-none transition-colors"
            >
              Inspect Production Systems
            </Link>
          </div>
        </div>
      </section>

      {/* ── FRAME 2: 4 FOUNDATIONAL ENGINEERING PRINCIPLES ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#F6F4ED] border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#FF3823] font-semibold">
              ENGINEERING PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#141413] tracking-tight">
              Foundational Operating Rules
            </h2>
            <p className="text-base text-[#5E605D]">
              The core principles that govern every single system we engineer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {AXIOMS.map((axiom) => (
              <article
                key={axiom.num}
                className="bg-white border border-black/10 rounded-2xl p-7 sm:p-8 hover:border-black/30 hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#FF3823] uppercase tracking-wider">
                      {axiom.tag}
                    </span>
                    <span className="text-lg font-bold text-neutral-400 group-hover:text-[#141413] transition-colors">
                      {axiom.num}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-[#141413] group-hover:text-[#FF3823] transition-colors leading-snug">
                    {axiom.title}
                  </h3>

                  <p className="text-sm text-[#5E605D] leading-relaxed font-normal">
                    {axiom.desc}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-black/10 text-xs text-[#5E605D] gap-1">
                  <span className="text-[#141413] font-medium">{axiom.spec}</span>
                  <span className="text-[#888888]">{axiom.domain}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAME 3: COMPARISON TABLE ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#FAF9F5] border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-2 text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#FF3823] font-semibold">
              THE BLOAT COMPARISON
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#141413] tracking-tight">
              The Underdog Edge vs. Traditional Consultancies
            </h2>
            <p className="text-base text-[#5E605D]">
              Why lean, principal-led engineering teams deliver vastly superior software outcomes.
            </p>
          </div>

          <div className="overflow-x-auto border border-black/10 rounded-2xl bg-white shadow-xs">
            <table className="w-full text-left text-sm font-sans border-collapse">
              <thead>
                <tr className="border-b border-black/10 bg-[#F6F4ED] text-xs text-[#141413] uppercase tracking-wider font-semibold">
                  <th className="p-4 sm:p-5">Dimension</th>
                  <th className="p-4 sm:p-5 text-[#5E605D]">Traditional Consultancies</th>
                  <th className="p-4 sm:p-5 text-[#052E16] bg-[#E8FCE8]">VISTAR (Engineering Cell)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 text-xs sm:text-sm">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-[#141413] whitespace-nowrap">
                      {row.dimension}
                    </td>
                    <td className="p-4 sm:p-5 text-[#5E605D] flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{row.agency}</span>
                    </td>
                    <td className="p-4 sm:p-5 text-[#141413] bg-[#E8FCE8]/40 font-medium">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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

      {/* ── FRAME 4: TECHNICAL ANSWER BLOCKS (LIGHT THEME) ── */}
      <AnswerBlocks
        title="Underdog Engineering & Capability Answers"
        subtitle="Answers regarding our engineering cell architecture, delivery velocity, and source code ownership guarantees."
        badge="MANIFESTO SPECIFICATION"
        items={PHILOSOPHY_FAQ_ITEMS}
        schemaId="philosophy-faq-schema"
        theme="light"
      />

      {/* ── FRAME 5: BOTTOM CONVERSION CTA ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#F6F4ED] border-t border-black/10 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#141413] tracking-tight">
            Read enough theory? Let&apos;s engineer.
          </h2>
          <p className="text-base text-[#5E605D] max-w-xl mx-auto leading-relaxed">
            Pair directly with principal systems engineers. Ship production AI software in 14 days with 100% repository handover.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3">
            <Link
              href="/start"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#FF3823] hover:bg-[#E02F1C] text-white font-medium text-sm rounded-none transition-colors shadow-xs gap-2"
            >
              Start Free Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-[#141413] text-[#141413] bg-transparent hover:bg-white font-medium text-sm rounded-none transition-colors"
            >
              Talk to Principal Engineers
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
