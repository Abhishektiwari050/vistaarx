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
  accentBg: string;
  accentText: string;
}

const PRODUCTION_SYSTEMS: ProductionSystem[] = [
  {
    tag: "AVIATION TELEMETRY & GIS",
    title: "Project VAYU: Cockpit Telemetry & NOTAM AI",
    sector: "Aerospace & Mission-Critical",
    metrics: ["Sub-45ms Stream", "99.4% Threat Precision", "Vector GIS Overlay"],
    desc: "Cockpit situational awareness system ingesting live FAA notices, weather telemetry, and geospatial vector hazard layers into an intuitive heads-up display.",
    architecture: "Next.js 16 Edge + Python FastAPI LangGraph + Mapbox GL Vector Tiles + Private VPC",
    liveUrl: "https://ai-vayu.vercel.app",
    repoTransfer: "100% Private GitHub Handover & Docker Manifests",
    accentBg: "bg-[#EBF3FF]",
    accentText: "text-[#1E3A8A]",
  },
  {
    tag: "CRITICAL HEALTHCARE & ML",
    title: "AURA: Multi-Agent Biometric Anomaly Detection",
    sector: "Healthcare & Life Sciences",
    metrics: ["99.8% Anomaly F1-Score", "Sub-100ms Inference", "Zero Data Egress"],
    desc: "Biometric telemetry pipeline running unsupervised ML anomaly detection over live patient sensor feeds with strict validation gates and HIPAA compliance.",
    architecture: "Python PyTorch / Scikit-Learn + Multi-Agent Consensus Stream + ClickHouse Ledger",
    liveUrl: "https://multi-agent-anomaly-system.onrender.com",
    repoTransfer: "Air-Gapped Private VPC Weights & Model Artifacts",
    accentBg: "bg-[#E8FCE8]",
    accentText: "text-[#052E16]",
  },
  {
    tag: "PROPTECH & SPATIAL COMPUTING",
    title: "3axis Arc: High-Performance Spatial 3D Platform",
    sector: "PropTech & Architectural Real Estate",
    metrics: ["60fps WebGL Canvas", "Sub-85ms Global TTFB", "100/100 Lighthouse"],
    desc: "Interactive 3D architectural visualization platform featuring real-time perspective transformations, volumetric lighting, and global edge CDN distribution.",
    architecture: "Next.js 16 App Router + Three.js / WebGL Custom Shaders + Edge Replicas",
    liveUrl: "https://3axisarc.vercel.app",
    repoTransfer: "100% Repository Transfer & Custom Shader Assets",
    accentBg: "bg-[#FFF0EB]",
    accentText: "text-[#9A3412]",
  },
];

const ROLES = [
  {
    role: "Chief Technology Officers",
    summary: "Eliminate vendor lock-in and agency maintenance retainers with 100% day-one private GitHub repository transfer.",
    detail: "Receive clean Next.js 16 codebases, private Dockerfiles, and production-tested security configurations.",
  },
  {
    role: "VP Engineering & Architecture",
    summary: "Deliver reliable multi-agent systems without junior developer telephone games.",
    detail: "Direct access to principal systems engineers delivering production software in 14-day guaranteed sprints.",
  },
  {
    role: "Head of AI & Machine Learning",
    summary: "Isolate proprietary model weights and fine-tuned embeddings in your private VPC perimeter.",
    detail: "Zero cross-tenant inference leakage. Dedicated private endpoints and encrypted state channels.",
  },
  {
    role: "Information Security & Compliance",
    summary: "Air-gapped VPC sandbox perimeters meeting SOC 2 Type II and ISO 27001 standards.",
    detail: "Audit ledgers for every model inference, prompt execution, and database tool interaction.",
  },
  {
    role: "Product & Business Leadership",
    summary: "Sub-100ms edge latency accelerating user conversion and eliminating bounce.",
    detail: "Continuous telemetry streaming 60fps interaction metrics and automated health checks.",
  },
];

const INDUSTRIES = [
  {
    name: "Aviation & Mission-Critical",
    summary: "Low-latency situational awareness, geospatial hazard extraction, and resilient multi-agent channels.",
    detail: "Real-time vector GIS overlay and automated NOTAM parsing engineered for cockpit operations.",
  },
  {
    name: "Healthcare & Life Sciences",
    summary: "Anomaly detection, zero data retention perimeters, and HIPAA-compliant VPC vaults.",
    detail: "Biometric telemetry with validation gates and air-gapped patient confidentiality.",
  },
  {
    name: "PropTech & Spatial Assets",
    summary: "60fps WebGL rendering, architectural perspective engines, and instant asset verification.",
    detail: "Next.js 16 and Three.js custom shader pipelines delivering smooth spatial exploration worldwide.",
  },
  {
    name: "Financial Services & Trading",
    summary: "Fast data streams, deterministic transaction validation, and clean Postgres audit ledgers.",
    detail: "Reliable transactional pipelines and immutable audit trails built to enterprise standards.",
  },
  {
    name: "Enterprise Software Modernization",
    summary: "Replace sluggish legacy software or template sites with ultra-fast Next.js 16 web applications.",
    detail: "Full architectural rewrites replacing slow legacy monoliths with typed edge runtimes.",
  },
];

const WORK_FAQ_ITEMS: QAPair[] = [
  {
    category: "PRODUCTION SYSTEMS",
    question: "What production AI systems has VISTAR engineered?",
    answer:
      "VISTAR has engineered software including Project VAYU (aviation cockpit telemetry and automated NOTAM GIS threat analysis), AURA (healthcare multi-agent biometric anomaly detection with 99.8% precision), and 3axis Arc (a 60fps WebGL spatial architectural platform).",
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
      "VISTAR transfers the private GitHub repository directly to your organization on day one. You receive all application code, Dockerfiles, Kubernetes manifests, and cloud scripts. VISTAR never retains proprietary royalties, license fees, or platform retainers.",
    keyPoints: [
      "Full private GitHub repository transfer with complete commit history",
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
      "Dedicated client-managed VPC subnets with zero external training leakage",
      "Hardware-backed encryption in-transit (TLS 1.3) and at-rest (AES-256)",
      "Automated ClickHouse audit ledgers for comprehensive compliance reporting",
    ],
  },
];

export default function WorkClientPage() {
  const [activeRole, setActiveRole] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState(0);

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
            <span>PRODUCTION PORTFOLIO &bull; 100% CODE HANDOVER</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#141413] tracking-tight leading-[1.08]">
            Real Systems. Real Code. <br />
            <span className="text-[#5E605D] italic">Proven in Production.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-[19px] text-[#5E605D] max-w-2xl mx-auto leading-relaxed font-normal">
            Inspect live software engineered by VISTAR—from real-time cockpit GIS and multi-agent anomaly detection to spatial 3D platforms delivered with complete source code ownership.
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
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── FRAME 2: VERIFIED PRODUCTION SYSTEMS (CASE STUDIES) ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#F6F4ED] border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#FF3823] font-semibold">
              LIVE PRODUCTION ARCHITECTURES
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#141413] tracking-tight">
              Systems in Active Operation
            </h2>
            <p className="text-base text-[#5E605D] max-w-xl">
              Inspect deployed systems engineered to enterprise standards. Every project is transferred with private GitHub repositories and zero vendor lock-in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTION_SYSTEMS.map((sys, idx) => (
              <div
                key={idx}
                className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between hover:border-black/30 hover:shadow-md transition-all duration-200 group"
              >
                {/* Header Graphic */}
                <div className={`w-full p-6 relative ${sys.accentBg} border-b border-black/10 space-y-3`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${sys.accentText} bg-white/80 border border-black/10 px-2 py-0.5 rounded`}>
                      {sys.tag}
                    </span>
                    <a
                      href={sys.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#141413] hover:bg-neutral-800 text-white text-xs font-medium px-2.5 py-1 rounded transition-colors inline-flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      Inspect Live
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-[#141413] group-hover:text-[#FF3823] transition-colors leading-snug">
                    {sys.title}
                  </h3>
                  <p className="text-xs text-[#5E605D]">
                    Sector: {sys.sector}
                  </p>
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-[#5E605D] leading-relaxed">
                    {sys.desc}
                  </p>

                  {/* Key Metrics Chips */}
                  <div className="space-y-2 pt-3 border-t border-black/10">
                    <span className="text-[10px] uppercase tracking-wider text-[#5E605D] font-semibold">
                      Verified Metrics:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sys.metrics.map((m, mIdx) => (
                        <span
                          key={mIdx}
                          className="px-2 py-0.5 text-xs bg-[#FAF9F5] border border-black/10 rounded text-[#141413] font-medium"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Architecture & Handover */}
                  <div className="pt-3 border-t border-black/10 space-y-1 text-xs">
                    <p className="text-[#5E605D]">
                      <span className="text-[#141413] font-medium">Stack:</span> {sys.architecture}
                    </p>
                    <p className="text-emerald-700 font-medium">
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
      <section className="w-full py-20 px-4 sm:px-6 bg-[#FAF9F5] border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#FF3823] font-semibold">
              STAKEHOLDER ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#141413] tracking-tight">
              Solutions Engineered by Role
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Role Navigation */}
            <div className="lg:col-span-7 space-y-2.5">
              {ROLES.map((r, i) => {
                const isActive = activeRole === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveRole(i)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all duration-150 ${
                      isActive
                        ? "bg-white border-[#141413] shadow-xs"
                        : "bg-white/60 border-black/10 hover:border-black/30 hover:bg-white"
                    }`}
                  >
                    <h3 className="font-serif text-lg font-normal text-[#141413]">
                      {r.role}
                    </h3>
                    {isActive && (
                      <p className="text-sm text-[#5E605D] mt-2 leading-relaxed">
                        {r.summary}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Role Card */}
            <div className="lg:col-span-5 bg-white border border-black/10 rounded-2xl p-7 space-y-5 sticky top-24 shadow-xs">
              <div className="flex items-center gap-2 border-b border-black/10 pb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-semibold text-[#141413] uppercase tracking-wider">
                  Profile: {ROLES[activeRole].role}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#141413]">
                {ROLES[activeRole].role}
              </h3>
              <p className="text-sm text-[#5E605D] leading-relaxed">
                {ROLES[activeRole].detail}
              </p>
              <div className="pt-4 border-t border-black/10 space-y-1.5 text-xs text-[#5E605D]">
                <p>&bull; 100% Day-One GitHub Transfer</p>
                <p>&bull; Zero Vendor Lock-in or Retainers</p>
                <p>&bull; 14-Day Production Sprints</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 4: SOLUTIONS BY INDUSTRY ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#F6F4ED] border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#FF3823] font-semibold">
              DOMAIN SPECIALIZATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#141413] tracking-tight">
              Solutions Engineered by Industry
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Selected Industry Card */}
            <div className="lg:col-span-5 bg-white border border-black/10 rounded-2xl p-7 space-y-5 shadow-xs">
              <div className="flex items-center gap-2 border-b border-black/10 pb-4">
                <Cpu className="w-5 h-5 text-[#FF3823]" />
                <span className="text-xs font-semibold text-[#141413] uppercase tracking-wider">
                  Benchmark: {INDUSTRIES[activeIndustry].name}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#141413]">
                {INDUSTRIES[activeIndustry].name}
              </h3>
              <p className="text-sm text-[#5E605D] leading-relaxed">
                {INDUSTRIES[activeIndustry].detail}
              </p>
              <div className="pt-4 border-t border-black/10 space-y-1.5 text-xs text-[#5E605D]">
                <p>&bull; Sub-100ms P99 Edge Latency</p>
                <p>&bull; Air-Gapped Private Cloud VPC</p>
                <p>&bull; Full Source Code Handover</p>
              </div>
            </div>

            {/* Right: Industry Navigation List */}
            <div className="lg:col-span-7 space-y-2.5">
              {INDUSTRIES.map((ind, i) => {
                const isActive = activeIndustry === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveIndustry(i)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all duration-150 ${
                      isActive
                        ? "bg-white border-[#141413] shadow-xs"
                        : "bg-white/60 border-black/10 hover:border-black/30 hover:bg-white"
                    }`}
                  >
                    <h3 className="font-serif text-lg font-normal text-[#141413]">
                      {ind.name}
                    </h3>
                    {isActive && (
                      <p className="text-sm text-[#5E605D] mt-2 leading-relaxed">
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

      {/* ── FRAME 5: TECHNICAL ANSWER BLOCKS (LIGHT THEME) ── */}
      <AnswerBlocks
        title="Software Engineering & Portfolio Specifications"
        subtitle="Answers regarding our production deliverables, intellectual property transfer, and engineering standards."
        badge="ENGINEERING SPECIFICATION"
        items={WORK_FAQ_ITEMS}
        schemaId="work-faq-schema"
        theme="light"
      />

      {/* ── FRAME 6: BOTTOM CONVERSION CTA ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#FAF9F5] border-t border-black/10 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#141413] tracking-tight">
            Build your sovereign software with VISTAR
          </h2>
          <p className="text-base text-[#5E605D] max-w-xl mx-auto leading-relaxed">
            Get direct access to principal software engineers. Ship in 14-day guaranteed sprints with 100% repository handover.
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
              Request Engineering Review
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
