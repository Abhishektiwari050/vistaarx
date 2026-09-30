"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  Activity,
  Code2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { AnswerBlocks, type QAPair } from "@/components/seo/answer-blocks";

interface ProductionSystem {
  tag: string;
  title: string;
  sector: string;
  metrics: string[];
  desc: string;
  architecture: string;
  liveUrl: string;
  repoTransfer: string;
  gradient: string;
}

const PRODUCTION_SYSTEMS: ProductionSystem[] = [
  {
    tag: "AVIATION TELEMETRY & GIS",
    title: "Project VAYU: Cockpit Telemetry & NOTAM AI",
    sector: "Aerospace & Mission-Critical",
    metrics: ["Sub-45ms Telemetry Stream", "99.4% Threat Precision", "Vector GIS Overlay"],
    desc: "Autonomous situational awareness platform ingesting live NOTAM advisories, weather telemetry, and geospatial vector hazard layers into an air-gapped cockpit heads-up interface.",
    architecture: "Next.js 16 Edge + Python FastAPI LangGraph + Mapbox GL Vector Tiles + Private VPC Vault",
    liveUrl: "https://ai-vayu.vercel.app",
    repoTransfer: "100% Private GitHub Handover & Docker Containerization",
    gradient: "from-blue-600/20 via-blue-900/10 to-transparent",
  },
  {
    tag: "CRITICAL HEALTHCARE & ML",
    title: "AURA: Multi-Agent Biometric Anomaly Detection",
    sector: "Healthcare & Life Sciences",
    metrics: ["99.8% Anomaly F1-Score", "Sub-100ms Inference", "Zero Data Egress"],
    desc: "Multi-agent biometric telemetry pipeline running unsupervised Isolation Forest ML models over live patient sensor feeds with deterministic verification gates and HIPAA-compliant data boundaries.",
    architecture: "Python PyTorch / Scikit-Learn + Multi-Agent Consensus Stream + ClickHouse Audit Ledger",
    liveUrl: "https://multi-agent-anomaly-system.onrender.com",
    repoTransfer: "Air-Gapped Private VPC Weights & Model Artifacts",
    gradient: "from-emerald-600/20 via-emerald-900/10 to-transparent",
  },
  {
    tag: "PROPTECH & SPATIAL COMPUTING",
    title: "3axis Arc: High-Performance Spatial 3D Platform",
    sector: "PropTech & Architectural Real Estate",
    metrics: ["60fps WebGL Dynamic Transforms", "Sub-85ms Global TTFB", "100/100 Lighthouse"],
    desc: "High-frequency 3D architectural visualization platform featuring real-time perspective transformations, volumetric lighting, and localized multi-region Anycast distribution.",
    architecture: "Next.js 16 App Router + Three.js / WebGL Custom Shaders + Edge Cache Replicas",
    liveUrl: "https://3axisarc.vercel.app",
    repoTransfer: "100% Repository Transfer & Custom Shader Assets",
    gradient: "from-purple-600/20 via-purple-900/10 to-transparent",
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
    summary: "Air-gapped VPC sandbox perimeters meeting SOC 2 Type II and ISO 27001 rigor.",
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
    name: "Aviation & Mission-Critical",
    summary: "Zero-latency situational dispatch, geospatial hazard extraction, and resilient multi-agent channels.",
    detail: "Real-time vector GIS overlay and automated NOTAM parsing engineered for cockpit operations.",
  },
  {
    name: "Healthcare & Life Sciences",
    summary: "Unsupervised anomaly detection, zero data retention perimeters, and HIPAA-compliant VPC vaults.",
    detail: "Multi-agent biometric telemetry with mathematical verification and air-gapped patient confidentiality.",
  },
  {
    name: "PropTech & Spatial Assets",
    summary: "High-frequency WebGL rendering, architectural perspective engines, and instant asset verification.",
    detail: "Next.js 16 and Three.js custom shader pipelines delivering 60fps spatial exploration worldwide.",
  },
  {
    name: "Financial Services & Trading",
    summary: "Sub-second order book streams, deterministic cryptographic settlement, and typed Postgres audit ledgers.",
    detail: "Zero-loss transactional pipelines and immutable audit trails built to banking standards.",
  },
  {
    name: "Enterprise Software Modernization",
    summary: "Unbundle sluggish agency WordPress/Webflow sites into ultra-fast Next.js 16 microservices.",
    detail: "Full architectural rewrites replacing slow legacy monoliths with typed edge runtimes.",
  },
];

const WORK_FAQ_ITEMS: QAPair[] = [
  {
    category: "PRODUCTION CASE STUDIES",
    question: "What production AI systems has VISTAR engineered?",
    answer:
      "VISTAR has engineered mission-critical software including Project VAYU (an aviation cockpit telemetry and automated NOTAM GIS threat analysis system), AURA (a healthcare multi-agent biometric anomaly detection engine with 99.8% precision), and 3axis Arc (a 60fps WebGL spatial architectural platform).",
    keyPoints: [
      "Live verified deployments with public links and performance benchmarks",
      "Sub-45ms real-time telemetry processing in aviation and life sciences",
      "High-performance WebGL 3D architectural engines with 100/100 Lighthouse scores",
    ],
  },
  {
    category: "CODE OWNERSHIP & IP",
    question: "How does VISTAR guarantee 100% source code ownership?",
    answer:
      "VISTAR transfers the private GitHub repository directly to your organization on day one. You receive all application code, Dockerfiles, Kubernetes manifests, and Terraform scripts. VISTAR does not retain proprietary royalties, license fees, or platform retainers.",
    keyPoints: [
      "Full private GitHub repository transfer with commit history",
      "Zero recurring software licensing fees, subscription markup, or vendor lock-in",
      "Comprehensive architectural documentation and team handover walkthroughs",
    ],
  },
  {
    category: "SPRINT DELIVERY TIMELINE",
    question: "What is the delivery timeline for custom enterprise software?",
    answer:
      "VISTAR operates on fixed 14-day production sprints. Following an initial 48-hour architecture diagnostic, principal engineers build and ship functional production software in two-week cycles, eliminating the multi-month delays common with traditional consultancy agencies.",
    keyPoints: [
      "48-hour architecture diagnostic and system scoping",
      "14-day iterative production sprints with weekly deployable releases",
      "Direct pairing with principal engineers rather than outsourced junior teams",
    ],
  },
  {
    category: "DATA SECURITY & ISOLATION",
    question: "Are client data and model weights isolated from third parties?",
    answer:
      "Yes. All inference engines, embeddings, and vector stores are deployed within your private VPC (AWS, GCP, Azure, or bare-metal). Egress filters ensure your proprietary corporate data is never transmitted to third parties or used for external model training.",
    keyPoints: [
      "Air-gapped VPC perimeter deployment with zero model training leakage",
      "Hardware-backed TLS 1.3 and AES-256 encryption in transit and at rest",
      "Full compliance with SOC 2 Type II, HIPAA, and GDPR standards",
    ],
  },
];

export default function WorkSolutionsPage() {
  const [activeRole, setActiveRole] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState(0);

  return (
    <div className="w-full bg-[#060709] text-[#ECEEF5] font-sans antialiased selection:bg-[#3B82F6] selection:text-white min-h-screen">
      
      {/* ── FRAME 1: CINEMATIC OBSIDIAN HERO ── */}
      <section className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 border-b border-white/10 overflow-hidden px-4 sm:px-6">
        {/* Subtle Edge Grid Background */}
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px] pointer-events-none" />
        
        {/* Radial Ambient Core Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-blue-600/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[#959CB3]">
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>PRODUCTION SOFTWARE PORTFOLIO &bull; 100% REPOSITORY HANDOVER</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.08]">
            Mission-Critical Production Systems. <br />
            <span className="text-[#959CB3] italic">Proven at Scale.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#959CB3] max-w-2xl mx-auto leading-relaxed">
            Inspect sovereign production software engineered by VISTAR—from real-time cockpit GIS and multi-agent biometric anomaly detection to high-frequency spatial 3D platforms delivered with complete source code ownership.
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
              href="/contact"
              className="bg-white/5 hover:bg-white/10 text-white border border-white/15 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-all duration-150 inline-flex items-center gap-2"
            >
              Schedule Systems Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── FRAME 2: VERIFIED PRODUCTION SYSTEMS (CASE STUDIES) ── */}
      <section className="w-full py-24 px-4 sm:px-6 bg-[#0A0B10] border-b border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-blue-400 font-semibold">
              // LIVE PRODUCTION ARCHITECTURES
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
              Systems in Active Operation
            </h2>
            <p className="text-sm text-[#959CB3] max-w-xl">
              Inspect deployed systems engineered to sovereign enterprise specifications. Every system is transferred with complete private GitHub repositories and zero vendor lock-in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTION_SYSTEMS.map((sys, idx) => (
              <div
                key={idx}
                className="bg-[#0D0E15] border border-white/10 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-white/25 transition-all duration-200 group"
              >
                {/* Header Graphic Gradient */}
                <div className={`w-full p-6 relative bg-gradient-to-br ${sys.gradient} border-b border-white/10 space-y-3`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white border border-white/15 px-2 py-0.5 rounded">
                      {sys.tag}
                    </span>
                    <a
                      href={sys.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-neutral-200 text-black font-mono text-xs font-semibold px-2.5 py-1 rounded transition-colors inline-flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      Inspect Live
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {sys.title}
                  </h3>
                  <p className="text-xs text-[#959CB3] font-mono">
                    Sector: {sys.sector}
                  </p>
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {sys.desc}
                  </p>

                  {/* Key Metrics Chips */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#959CB3]">
                      Verified Benchmarks:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sys.metrics.map((m, mIdx) => (
                        <span
                          key={mIdx}
                          className="px-2 py-0.5 text-[11px] font-mono bg-white/5 border border-white/10 rounded text-neutral-200"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Architecture & Handover */}
                  <div className="pt-3 border-t border-white/10 space-y-1 font-mono text-[11px]">
                    <p className="text-[#959CB3]">
                      <span className="text-white">Stack:</span> {sys.architecture}
                    </p>
                    <p className="text-emerald-400">
                      &bull; {sys.repoTransfer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAME 3: SOLUTIONS BY LEADERSHIP ROLE ── */}
      <section className="w-full py-24 px-4 sm:px-6 bg-[#060709] border-b border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-blue-400 font-semibold">
              // STAKEHOLDER ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
              Solutions Engineered by Role
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Role Navigation Accordion */}
            <div className="lg:col-span-7 space-y-3">
              {ROLES.map((r, i) => {
                const isActive = activeRole === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveRole(i)}
                    className={`p-5 rounded-lg border cursor-pointer transition-all duration-150 ${
                      isActive
                        ? "bg-[#11131C] border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                        : "bg-[#0D0E15] border-white/10 hover:border-white/20 hover:bg-[#0F111A]"
                    }`}
                  >
                    <h3 className="font-serif text-xl font-bold text-white">
                      {r.role}
                    </h3>
                    {isActive && (
                      <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                        {r.summary}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Role Deep-Dive Card */}
            <div className="lg:col-span-5 bg-[#0D0E15] border border-white/15 rounded-xl p-8 space-y-6 sticky top-24">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Sovereignty Profile: {ROLES[activeRole].role}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                {ROLES[activeRole].role}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {ROLES[activeRole].detail}
              </p>
              <div className="pt-4 border-t border-white/10 space-y-2 font-mono text-xs text-[#959CB3]">
                <p>&bull; 100% Day-One GitHub Transfer</p>
                <p>&bull; Zero Vendor Lock-in or Retainers</p>
                <p>&bull; 14-Day Production Sprints</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 4: SOLUTIONS BY INDUSTRY ── */}
      <section className="w-full py-24 px-4 sm:px-6 bg-[#0A0B10] border-b border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-blue-400 font-semibold">
              // DOMAIN SPECIALIZATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
              Solutions Engineered by Industry
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Selected Industry Card */}
            <div className="lg:col-span-5 bg-[#0D0E15] border border-white/15 rounded-xl p-8 space-y-6">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <Cpu className="w-5 h-5 text-blue-400" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Industry Benchmark: {INDUSTRIES[activeIndustry].name}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                {INDUSTRIES[activeIndustry].name}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {INDUSTRIES[activeIndustry].detail}
              </p>
              <div className="pt-4 border-t border-white/10 space-y-2 font-mono text-xs text-[#959CB3]">
                <p>&bull; Sub-100ms P99 Edge Latency</p>
                <p>&bull; Air-Gapped Private Cloud VPC</p>
                <p>&bull; Full Source Code Handover</p>
              </div>
            </div>

            {/* Right: Industry Navigation List */}
            <div className="lg:col-span-7 space-y-3">
              {INDUSTRIES.map((ind, i) => {
                const isActive = activeIndustry === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveIndustry(i)}
                    className={`p-5 rounded-lg border cursor-pointer transition-all duration-150 ${
                      isActive
                        ? "bg-[#11131C] border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                        : "bg-[#0D0E15] border-white/10 hover:border-white/20 hover:bg-[#0F111A]"
                    }`}
                  >
                    <h3 className="font-serif text-xl font-bold text-white">
                      {ind.name}
                    </h3>
                    {isActive && (
                      <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                        {ind.summary}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 5: TECHNICAL ANSWER BLOCKS (DARK THEME) ── */}
      <AnswerBlocks
        title="Software Engineering & Portfolio Specifications"
        subtitle="Canonical answers addressing VISTAR's production deliverables, intellectual property transfer, and engineering standards."
        badge="ENGINEERING SPECIFICATION"
        items={WORK_FAQ_ITEMS}
        schemaId="work-faq-schema"
        theme="dark"
      />

      {/* ── FRAME 6: BOTTOM CONVERSION CTA ── */}
      <section className="w-full py-24 px-4 sm:px-6 bg-[#060709] border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
            Build your sovereign system with VISTAR
          </h2>
          <p className="text-sm sm:text-base text-[#959CB3] max-w-xl mx-auto">
            Get direct access to principal software engineers. Ship in 14-day guaranteed sprints with 100% repository handover.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/start"
              className="bg-white hover:bg-neutral-200 text-black px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-all duration-150 inline-flex items-center gap-2"
            >
              Start Free Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="bg-white/5 hover:bg-white/10 text-white border border-white/15 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-all duration-150"
            >
              Request Engineering Review
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
