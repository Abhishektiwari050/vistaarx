"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Terminal, Cpu, ShieldCheck, Activity, Plus, ExternalLink, Layers, Eye } from "lucide-react";
import { AgentOrchestrationConsole } from "@/components/cohere/agent-orchestration-console";
import { AnswerBlocks } from "@/components/seo/answer-blocks";

const VECTORS_FAQ_ITEMS = [
  {
    category: "SYSTEM ARCHITECTURE",
    question: "What is VISTAR's unified technical architecture for enterprise AI?",
    answer:
      "VISTAR's technical architecture unifies autonomous agent execution, private VPC model vaults, typed PostgreSQL relational data, and sub-100ms edge runtime orchestration. Rather than daisy-chaining disjointed third-party APIs, workflows are compiled as deterministic, typed state machines running in client-managed clouds.",
    keyPoints: [
      "Deterministic state-machine workflows with strict boundary typing",
      "Private cloud model vaults with air-gapped egress security",
      "Native Next.js 16 edge runtime deployed across global edge CDNs",
    ],
  },
  {
    category: "GLOBAL PERFORMANCE & LATENCY",
    question: "How does VISTAR achieve sub-100ms global latency?",
    answer:
      "VISTAR leverages Next.js 16 App Router primitives deployed across global edge networks (Vercel, Cloudflare, AWS). Static assets are cached at edge points of presence while dynamic database queries execute against localized read replicas, yielding sub-100ms response times worldwide.",
    keyPoints: [
      "Edge routing to the nearest cloud point of presence",
      "Localized read-replica database routing for fast query times",
      "Core Web Vitals compliance targeting 100/100 Lighthouse scores",
    ],
  },
  {
    category: "SECURITY & DATA ISOLATION",
    question: "How does VISTAR protect client data privacy?",
    answer:
      "VISTAR enforces zero third-party training leakage by isolating inference and application databases inside your private cloud accounts. Environment secrets are encrypted at rest and in transit, and your proprietary data is never used to train external models.",
    keyPoints: [
      "Client-owned private cloud deployment with zero external model training",
      "TLS 1.3 cryptographic state channels and AES-256 storage",
      "Strict data privacy guaranteeing full client data isolation",
    ],
  },
  {
    category: "MULTI-AGENT COORDINATION",
    question: "How are multi-agent communication and consensus handled?",
    answer:
      "Agent pods communicate asynchronously over low-latency message buses using structured JSON Schema protocols. Complex multi-step tasks require consensus validation between specialized worker agents (Ingestion, Reasoning, Verification) before committing state mutations or triggering external API calls.",
    keyPoints: [
      "Decoupled asynchronous worker pods communicating via message brokers",
      "Deterministic multi-agent consensus before database persistence",
      "Cryptographically signed execution proofs for full auditability",
    ],
  },
  {
    category: "INTELLECTUAL PROPERTY & DEPLOYMENT",
    question: "What does 100% repository handover include?",
    answer:
      "Repository handover includes complete private GitHub repository ownership, all application source code, Docker and Kubernetes container manifests, Terraform infrastructure-as-code runbooks, CI/CD pipelines, and comprehensive architecture documentation on day one.",
    keyPoints: [
      "100% source code transferred to client GitHub Enterprise",
      "Automated Terraform and Docker infrastructure runbooks",
      "Zero recurring software licensing fees or agency retainers",
    ],
  },
];

type PlatformFeature = "agents" | "vaults" | "mesh";

const LIFECYCLE_STEPS = [
  {
    step: "01. Ingest",
    title: "Document & Telemetry Parsing",
    desc: "Ingest multi-modal documents, schemas, and live sensor streams into private embedding spaces without cloud leak.",
    bg: "bg-[#FFF8E7] border-l-4 border-[#FFD066]",
  },
  {
    step: "02. Align",
    title: "Deterministic Verification",
    desc: "Autonomous agents align objectives against JSON Schema contracts and enterprise business axioms.",
    bg: "bg-[#E8FCE8] border-l-4 border-[#55FF55]",
  },
  {
    step: "03. Isolate",
    title: "Private VPC Vault Perimeter",
    desc: "Model inference and fine-tuned weights run inside air-gapped customer VPCs (AWS, GCP, or bare metal).",
    bg: "bg-[#EBF3FF] border-l-4 border-[#1E60E6]",
  },
  {
    step: "04. Execute",
    title: "Distributed Agent Consensus",
    desc: "Decoupled agents execute parallel database operations, API tool calls, and high-frequency transactions.",
    bg: "bg-[#FFF0EB] border-l-4 border-[#FF3823]",
  },
  {
    step: "05. Verify",
    title: "Cryptographic Audit Ledger",
    desc: "Every step is cryptographically verified with HMAC-SHA256 signatures logged to immutable ClickHouse ledgers.",
    bg: "bg-[#F5F0FF] border-l-4 border-[#9333EA]",
  },
];

const PURPOSE_AGENTS = [
  {
    title: "Optimization Agent",
    desc: "Profiles runtime queries, minimizes token overhead, and orchestrates global CDN edge disbursement dynamically.",
    bg: "bg-[#E0F2FE]",
    tag: "EDGE RUNTIME",
  },
  {
    title: "Reconciliation Agent",
    desc: "Continuously reconciles distributed financial ledgers, transactional invariants, and multi-cloud database drift.",
    bg: "bg-[#FFE8DE]",
    tag: "FINANCIAL CORE",
  },
  {
    title: "Research & Synthesis Agent",
    desc: "Conducts deep multimodal analysis, parses complex regulatory RFCs, and synthesizes structured briefs instantly.",
    bg: "bg-[#E8FCE8]",
    tag: "DEEP REASONING",
  },
];

export default function VectorsPlatformPage() {
  const [activeFeature, setActiveFeature] = useState<PlatformFeature>("agents");

  return (
    <div className="w-full bg-[#FAF9F5] text-[#00063D] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen">
      
      {/* ── FRAME 1: PEACH HERO (VERTICAL SALMON RULES & WHITE HALFTONE DOTS) ── */}
      <section className="relative w-full pt-20 pb-28 md:pt-28 md:pb-36 bg-[#FFF0EB] [background-image:linear-gradient(to_right,rgba(255,138,122,0.25)_1px,transparent_1px)] [background-size:160px_100%] border-b border-black/10 overflow-hidden text-center px-4">
        {/* Halftone Dot Matrix Overlays */}
        <div className="absolute top-6 left-6 w-48 h-48 [background-image:radial-gradient(circle,#ffffff_2px,transparent_2px)] [background-size:18px_18px] pointer-events-none opacity-60" />
        <div className="absolute bottom-6 right-6 w-64 h-64 [background-image:radial-gradient(circle,#ffffff_2px,transparent_2px)] [background-size:18px_18px] pointer-events-none opacity-60" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-block">
            <span className="font-mono text-xs uppercase tracking-wider px-3 py-1 bg-white/80 border border-black/15 text-neutral-800 rounded-[2px] shadow-2xs">
              The Vistar Platform
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#00063D] tracking-[-2.4px] leading-[1.05]">
            Vistar connects your data, models, and autonomous{" "}
            <span className="font-serif italic font-normal text-[#FF3823]">
              agents
            </span>{" "}
            in one, sovereign runtime.
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Purpose-built for enterprise autonomy. Orchestrate multi-agent clusters, isolate sovereign model vaults in your private VPC, and stream real-time telemetry with zero vendor lock-in.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/start"
              className="bg-[#FF3823] hover:bg-[#E0301C] text-white px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150 inline-flex items-center gap-2 cursor-pointer"
            >
              Start Free Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-900 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150 inline-flex items-center gap-2"
            >
              Get A Demo
            </Link>
          </div>
        </div>

        {/* ── INTERACTIVE MULTI-AGENT ORCHESTRATION CONSOLE ── */}
        <div className="relative z-10 max-w-6xl mx-auto pt-8 sm:pt-12">
          <AgentOrchestrationConsole />
        </div>
      </section>

      {/* ── FRAME 2: CORE TECHNOLOGIES & RUNTIME ── */}
      <section className="w-full py-8 px-6 bg-white border-b border-black/10 text-center">
        <p className="font-sans text-xs font-medium text-neutral-500 uppercase tracking-widest mb-4">
          Core Technologies &amp; Frameworks We Build With
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs text-neutral-800">
          <span className="px-3 py-1 bg-[#FAF9F5] border border-black/10 rounded font-medium">NEXT.JS 16</span>
          <span className="px-3 py-1 bg-[#FAF9F5] border border-black/10 rounded font-medium">PYTHON &amp; FASTAPI</span>
          <span className="px-3 py-1 bg-[#FAF9F5] border border-black/10 rounded font-medium">TYPESCRIPT</span>
          <span className="px-3 py-1 bg-[#FAF9F5] border border-black/10 rounded font-medium">POSTGRESQL</span>
          <span className="px-3 py-1 bg-[#FAF9F5] border border-black/10 rounded font-medium">THREE.JS / WEBGL</span>
          <span className="px-3 py-1 bg-[#FAF9F5] border border-black/10 rounded font-medium">DOCKER</span>
        </div>
      </section>

      {/* ── FRAME 3: 2-COLUMN SECTION WITH STACKED 3D ANGLED BANNERS (EXACT JASPER PLATFORM MID) ── */}
      <section className="w-full py-24 sm:py-32 px-6 bg-white border-b border-black/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 54px Serif Headline & Body */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#00063D] tracking-[-1.62px] leading-[1.08]">
              Vistar is AI built to execute enterprise workflows end to end
            </h2>

            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
              Vistar is the platform that connects your corporate data lake, custom fine-tuned weights, and autonomous agents—so engineering work can be executed as a system, not a collection of fragile third-party tools.
            </p>

            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
              By combining autonomous agent execution, private VPC vaults, continuous governance, and edge orchestration into unified architectures, VISTAR delivers mission-critical automation with sub-second latency and zero vendor lock-in.
            </p>
          </div>

          {/* Right Column: Stacked Interactive Banners (Matching Jasper Platform Mid Exactly) */}
          <div className="lg:col-span-6 flex flex-col items-start gap-4">
            
            {/* Banner 1: Agents */}
            <button
              onClick={() => setActiveFeature("agents")}
              className={`w-full text-left p-6 sm:p-8 rounded-[4px] transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                activeFeature === "agents"
                  ? "bg-[#25130D] text-[#FA7560] border-[#25130D] shadow-md -translate-x-1"
                  : "bg-[#F7F5F0] text-neutral-700 border-black/10 hover:border-black/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <Plus className="w-6 h-6 text-[#FA7560]" />
                <span className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
                  Agents
                </span>
              </div>
              <span className="font-mono text-xs uppercase px-2.5 py-1 bg-white/20 rounded">
                Multi-Cluster
              </span>
            </button>

            {/* Banner 2: Content Pipelines / Sovereign Vaults */}
            <button
              onClick={() => setActiveFeature("vaults")}
              className={`w-full text-left p-6 sm:p-8 rounded-[4px] transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                activeFeature === "vaults"
                  ? "bg-[#FF3823] text-white border-[#FF3823] shadow-md translate-x-1"
                  : "bg-[#F7F5F0] text-neutral-700 border-black/10 hover:border-black/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <Plus className="w-6 h-6 text-white" />
                <span className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
                  Sovereign Vaults
                </span>
              </div>
              <span className="font-mono text-xs uppercase px-2.5 py-1 bg-white/20 rounded">
                Private VPC
              </span>
            </button>

            {/* Banner 3: Edge Telemetry */}
            <button
              onClick={() => setActiveFeature("mesh")}
              className={`w-full text-left p-6 sm:p-8 rounded-[4px] transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                activeFeature === "mesh"
                  ? "bg-[#FFD8CE] text-[#801A10] border-[#FFB4A2] shadow-md -translate-x-1"
                  : "bg-[#F7F5F0] text-neutral-700 border-black/10 hover:border-black/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <Plus className="w-6 h-6 text-[#801A10]" />
                <span className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
                  Edge Mesh
                </span>
              </div>
              <span className="font-mono text-xs uppercase px-2.5 py-1 bg-black/10 rounded">
                60fps Real-Time
              </span>
            </button>

            {/* Active Description Box */}
            <div className="w-full mt-2 p-6 bg-[#FAF9F5] border border-black/10 rounded-[4px]">
              {activeFeature === "agents" && (
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-lg text-[#00063D]">Multi-Agent Consensus Fabric</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Decoupled reasoning engines collaborate with peer agents to execute multi-step research, code synthesis, and data reconciliation with 99.8% verification SLA.
                  </p>
                </div>
              )}
              {activeFeature === "vaults" && (
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-lg text-[#00063D]">Private VPC Model Vaults</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Your model weights, embeddings, and context payloads stay inside your private infrastructure (AWS, GCP, or bare metal). Zero cross-tenant inference leakage.
                  </p>
                </div>
              )}
              {activeFeature === "mesh" && (
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-lg text-[#00063D]">Edge Telemetry & Observability</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    High-throughput, binary protocol telemetry streaming 60fps interaction metrics, query latency profiling, and automated health checks across edge nodes.
                  </p>
                </div>
              )}
            </div>

            {/* Visual Screenshot of Active Architecture */}
            <div className="relative w-full aspect-[16/9] rounded-[4px] overflow-hidden border border-black/15 shadow-sm bg-neutral-900 group">
              {activeFeature === "agents" && (
                <Image
                  src="/projects/competence-crm.png"
                  alt="Multi-Agent Consensus Fabric Architecture"
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover object-top"
                />
              )}
              {activeFeature === "vaults" && (
                <Image
                  src="/projects/vayu-briefing.png"
                  alt="Private VPC Model Vaults & Telemetry Briefing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover object-top"
                />
              )}
              {activeFeature === "mesh" && (
                <Image
                  src="/projects/vayu-map.png"
                  alt="Edge Telemetry & 60fps Airspace Spatial Mesh"
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover object-top"
                />
              )}
              <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                {activeFeature === "agents" && "Live Telemetry: AutoLead CRM & Multi-Agent Routing"}
                {activeFeature === "vaults" && "Air-Gapped Vault: Project VAYU Briefing Telemetry"}
                {activeFeature === "mesh" && "Edge Spatial Mesh: Sub-50ms Airspace Vector Engine"}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── FRAME 4: PIPELINES LIFECYCLE (MATCHING JASPER'S 5-STEP LIFECYCLE) ── */}
      <section className="w-full py-24 px-6 bg-[#FAF9F5] border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest border border-black/15 px-2.5 py-1 rounded bg-white">
              Sovereign Pipelines
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#00063D] tracking-tight mt-3">
              Structured systems for repeatable execution
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              {LIFECYCLE_STEPS.map((s, idx) => (
                <div key={idx} className={`p-5 rounded-[4px] ${s.bg} shadow-2xs`}>
                  <div className="font-mono text-xs font-bold text-[#00063D] uppercase">{s.step}</div>
                  <h4 className="font-serif text-lg font-bold text-[#00063D] mt-1">{s.title}</h4>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-7 bg-white border border-black/10 rounded-[6px] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <span className="font-mono text-xs uppercase text-neutral-500">RUNTIME SPECIFICATION &amp; TELEMETRY</span>
                <span className="font-mono text-xs text-emerald-600 font-semibold">STATUS: LIVE VERIFIED</span>
              </div>

              {/* Real Telemetry Screenshot Preview */}
              <div className="relative w-full aspect-[16/9] rounded overflow-hidden border border-black/15 bg-neutral-950">
                <Image
                  src="/projects/aura-results.png"
                  alt="Live Anomaly Detection & Telemetry Engine"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover object-top"
                />
                <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-xs text-[#00FF66] text-[10px] font-mono px-2 py-0.5 rounded border border-[#00FF66]/30">
                  LIVE TELEMETRY: 99.4% CONVERGENCE PRECISION
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs text-neutral-700 bg-[#FAF9F5] p-5 rounded border border-black/10">
                <p className="text-[#FF3823] font-semibold">// Continuous Multi-Agent Convergence Loop</p>
                <p>1. INGESTION: 18ms stream ingestion via WebSocket binary buffer</p>
                <p>2. ALIGNMENT: Strict JSON Schema gate &amp; deterministic state DAG</p>
                <p>3. PERIMETER: Air-gapped VPC sandbox with TLS 1.3 / AES-256 Egress Controls</p>
                <p>4. EXECUTION: Parallel tool calls across decoupled worker pods</p>
                <p>5. AUDIT: Immutable cryptographically signed execution proof</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-mono text-xs text-neutral-500">100% Client Ownership Guarantee</span>
                <Link href="/start" className="bg-[#FF3823] hover:bg-[#E02F1C] text-white text-xs font-semibold px-4 py-2 rounded-[4px] transition-colors">
                  Deploy Pipeline →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 5: GOVERNANCE & SOVEREIGN IQ (MATCHING JASPER IQ 4-CARD GRID) ── */}
      <section className="w-full py-24 px-6 bg-white border-b border-black/10 text-center">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-3">
            <span className="inline-block bg-black/5 text-[#052E16] border border-black/10 font-mono text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-[2px]">
              Sovereign IQ
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#00063D] tracking-tight">
              Governance, context, and control—built in
            </h2>
            <p className="text-neutral-600 text-base max-w-2xl mx-auto">
              Sovereign IQ is the shared intelligence layer that powers everything on the platform. It centralizes corporate knowledge, deterministic personas, and audit permissions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#E8FCE8] border border-black/10 rounded-[4px] p-6 text-left space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#052E16]">Zero-Trust Cryptographic Isolation</h3>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Hardware-backed TLS 1.3 tunnels, AES-256 state channels, and strict egress filtering guarantee zero data cross-contamination.
              </p>
            </div>

            <div className="bg-[#EBF3FF] border border-black/10 rounded-[4px] p-6 text-left space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#1E3A8A]">Deterministic Agent Personas</h3>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Define strictly constrained agent behaviors, allowed tools, and verification gates to eliminate drift.
              </p>
            </div>

            <div className="bg-[#FFF0EB] border border-black/10 rounded-[4px] p-6 text-left space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#9A3412]">Private VPC Model Vaults</h3>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Embeddings, proprietary data vectors, and fine-tuned checkpoints never leave your isolated VPC perimeter.
              </p>
            </div>

            <div className="bg-[#FCE4EC] border border-black/10 rounded-[4px] p-6 text-left space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#831843]">Controls, permissions, &amp; policies</h3>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Fine-grained role-based access control, cryptographic tool auditing, and real-time execution bounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 6: PURPOSE-BUILT AGENTS (3 PASTEL CARDS MATCHING JASPER AGENTS) ── */}
      <section className="w-full py-24 px-6 bg-[#FAF9F5] border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Autonomous Agents</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#00063D]">
              Purpose-built agents for every stage of execution
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PURPOSE_AGENTS.map((agent, i) => (
              <div key={i} className={`${agent.bg} border border-black/10 rounded-[4px] p-8 space-y-4 flex flex-col justify-between`}>
                <div className="space-y-3">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-neutral-700 bg-white/60 px-2 py-0.5 rounded">
                    {agent.tag}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#00063D]">{agent.title}</h3>
                  <p className="text-xs text-neutral-700 leading-relaxed">{agent.desc}</p>
                </div>
                <Link href="/start" className="font-mono text-xs font-semibold text-[#FF3823] hover:underline pt-4">
                  Explore Agent →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAME 7: HIGH-DENSITY ANSWER BLOCKS (SEMANTIC GEO / FAQ FOR LLM SCRAPERS) ── */}
      <AnswerBlocks
        badge="GEO KNOWLEDGE BASE // ARCHITECTURE"
        title="Technical Answers & Architecture Specifications"
        subtitle="Quotable architecture documentation and engineering answers optimized for technical evaluations and automated intelligence scrapers."
        items={VECTORS_FAQ_ITEMS}
        schemaId="vectors-architecture-faq-schema"
      />

      {/* ── FRAME 8: FRAMED BOTTOM CTA (MATCHING ENTERPRISE WORKSPACE CTA) ── */}
      <section className="w-full py-24 px-6 bg-white border-b border-black/10">
        <div className="max-w-4xl mx-auto border border-black/15 rounded-[6px] shadow-sm overflow-hidden bg-[#FAF9F5]">
          <div className="bg-white border-b border-black/10 px-4 py-2.5 flex items-center justify-between font-mono text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2">vistar-runtime-deployment.sh</span>
            </div>
            <span>v1.0.4 Production</span>
          </div>

          <div className="p-12 sm:p-20 text-center space-y-6">
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#00063D] tracking-tight">
              Start deploying with Vistar today
            </h2>
            <p className="text-neutral-600 text-base max-w-lg mx-auto">
              Deploy sovereign multi-agent runtimes directly into your private enterprise infrastructure.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
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
