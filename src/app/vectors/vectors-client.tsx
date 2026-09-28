"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Terminal, Cpu, ShieldCheck, Activity, Copy, Check, Plus } from "lucide-react";
import { playClick } from "@/lib/sound";
import { JasperInteractiveHero } from "@/components/jasper/jasper-interactive-hero";

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
    title: "Cryptographic Lattice Audit",
    desc: "Every step is verified with Falcon-1024 quantum-resistant signatures logged to immutable ClickHouse ledgers.",
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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText("npx vistar deploy --sovereign");
    setCopied(true);
    playClick(1000, 0.03);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <span className="inline-block bg-[#55FF55] text-[#052E16] -rotate-1 shadow-sm font-serif font-bold text-3xl sm:text-5xl md:text-6xl px-3 py-1">
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
              onClick={() => playClick(900, 0.03)}
              className="bg-[#FF3823] hover:bg-[#E0301C] text-white px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150 inline-flex items-center gap-2 cursor-pointer"
            >
              Start Free Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              onClick={() => playClick(950, 0.03)}
              className="bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-900 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150 inline-flex items-center gap-2"
            >
              Get A Demo
            </Link>
          </div>
        </div>

        {/* ── INTERACTIVE RIVE HERO STAGE (KEYPRESS GRID & LAYERED GRAPHICS) ── */}
        <div className="relative z-10 max-w-6xl mx-auto pt-8 sm:pt-12">
          <JasperInteractiveHero />
        </div>
      </section>

      {/* ── FRAME 2: WORLD-CLASS ENTERPRISE PROOF BAR ── */}
      <section className="w-full py-8 px-6 bg-white border-b border-black/10 text-center">
        <p className="font-sans text-xs font-medium text-neutral-500 uppercase tracking-widest mb-6">
          World-class engineering teams build on Vistar sovereign runtime
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-70 font-mono text-xs text-neutral-700">
          <span>// NATIONAL AIRSPACE</span>
          <span>// MEDTELEMETRY LABS</span>
          <span>// DEFENSE SYSTEMS</span>
          <span>// PROPTECH VENTURES</span>
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
              By combining agent execution, sovereign VPC vaults, shared governance, and edge orchestration in a single runtime, Vistar helps leadership execute mission-critical automation with mathematical certainty.
            </p>
          </div>

          {/* Right Column: Stacked Interactive Banners (Matching Jasper Platform Mid Exactly) */}
          <div className="lg:col-span-6 flex flex-col items-start gap-4">
            
            {/* Banner 1: Agents */}
            <button
              onClick={() => {
                setActiveFeature("agents");
                playClick(900, 0.02);
              }}
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
              onClick={() => {
                setActiveFeature("vaults");
                playClick(1000, 0.02);
              }}
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
              onClick={() => {
                setActiveFeature("mesh");
                playClick(1100, 0.02);
              }}
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
                  <h4 className="font-serif font-bold text-lg text-[#00063D]">Edge Telemetry Mesh</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    High-throughput, binary protocol telemetry streaming 60fps interaction metrics, query latency profiling, and automated self-healing triggers to edge nodes.
                  </p>
                </div>
              )}
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

            <div className="lg:col-span-7 bg-white border border-black/10 rounded-[6px] p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <span className="font-mono text-xs uppercase text-neutral-500">RUNTIME SPECIFICATION</span>
                <span className="font-mono text-xs text-emerald-600 font-semibold">STATUS: VERIFIED</span>
              </div>
              <div className="space-y-4 font-mono text-xs text-neutral-700 bg-[#FAF9F5] p-5 rounded border border-black/10">
                <p className="text-[#FF3823] font-semibold">// Continuous Multi-Agent Convergence Loop</p>
                <p>1. INGESTION: 18ms stream ingestion via WebSocket binary buffer</p>
                <p>2. ALIGNMENT: Strict JSON Schema gate &amp; deterministic state DAG</p>
                <p>3. PERIMETER: Air-gapped VPC sandbox with Falcon-1024 encryption</p>
                <p>4. EXECUTION: Parallel tool calls across decoupled worker pods</p>
                <p>5. AUDIT: Immutable cryptographically signed execution proof</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-neutral-500">100% Client Ownership Guarantee</span>
                <Link href="/start" className="bg-[#FF3823] text-white text-xs font-semibold px-4 py-2 rounded-[4px]">
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
            <span className="inline-block bg-[#55FF55] text-[#052E16] font-mono text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-[2px]">
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
              <h3 className="font-serif text-xl font-bold text-[#052E16]">Lattice Ciphers and Falcon-1024</h3>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Post-quantum cryptographic state channels ensure multi-agent communication is immune to present and future threats.
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

      {/* ── FRAME 7: FRAMED BOTTOM CTA (MATCHING JASPER'S FRAMED WORKSPACE CTA) ── */}
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
