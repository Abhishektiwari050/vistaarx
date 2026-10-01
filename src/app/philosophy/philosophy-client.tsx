"use client";

import React, { useState } from "react";
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
  Terminal,
  Activity,
  GitBranch,
  Server,
  Database,
  Check,
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
    inspectorType: "commitLog",
  },
  {
    num: "02",
    tag: "PRODUCTION RELIABILITY",
    title: "Deterministic Validation Over Brittle Prompts",
    desc: "The market is flooded with flimsy ChatGPT wrappers that break the moment real customers use them. We build autonomous agents with strict schema validation gates and verification steps that guarantee your system never writes corrupted data or executes unauthorized actions.",
    spec: "PRINCIPLE: ZERO-HALLUCINATION GATES",
    domain: "Autonomous Agents",
    inspectorType: "schemaGate",
  },
  {
    num: "03",
    tag: "PRIVATE CLOUD",
    title: "Private VPC Perimeters Over Public Multi-Tenant APIs",
    desc: "Your confidential business intelligence should never train a third-party model. We architect all model inference, fine-tuned weights, and vector databases directly inside your private VPC perimeter (AWS, GCP, or Azure) with encrypted state channels and zero external data leaks.",
    spec: "PRINCIPLE: AIR-GAPPED PRIVATE CLOUD",
    domain: "Security & Privacy",
    inspectorType: "vpcDiagram",
  },
  {
    num: "04",
    tag: "100% CODE OWNERSHIP",
    title: "Full GitHub Handover on Day One",
    desc: "Traditional agencies build proprietary dependencies and closed platforms to lock you into $15,000/month retainers. We reject this rent-seeking model entirely. You receive 100% private GitHub repository rights, typed Next.js and Python codebases, Dockerfiles, and deployment runbooks. You own every line of code.",
    spec: "PRINCIPLE: 100% CLIENT CODE OWNERSHIP",
    domain: "Code Sovereignty",
    inspectorType: "repoHandover",
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
    vistar: "Dedicated client-owned cloud accounts with zero external training leakage",
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
    question: "What makes VISTAR's software development approach different?",
    answer:
      "While hype-driven agencies showcase brittle chatbot mockups, VISTAR quietly engineers production systems: automated WhatsApp & CRM lead pipelines, geospatial aviation tools, 60fps WebGL spatial architecture, and clean Next.js codebases delivered with 100% repository handover.",
    keyPoints: [
      "Deep technical rigor across Python, Next.js 16, Three.js, and PostgreSQL",
      "Fixed 14-day production delivery with weekly deployable releases",
      "Direct pairing with founding systems engineers under bilateral NDA",
    ],
  },
];

export default function PhilosophyPage() {
  const [activeModel, setActiveModel] = useState<"vistar" | "agency">("vistar");

  return (
    <div className="w-full bg-[#FAF9F5] text-[#141413] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen">
      
      {/* ── FRAME 1: WARM EDITORIAL HERO ── */}
      <section className="relative w-full pt-28 pb-12 md:pt-36 md:pb-16 border-b border-black/10 overflow-hidden px-4 sm:px-6">
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

      {/* ── FRAME 2: CINEMATIC AMBIENT VIDEO STAGE ── */}
      <section className="w-full py-10 px-4 sm:px-6 bg-white border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="relative w-full rounded-2xl overflow-hidden border border-black/15 shadow-md bg-[#080d19]">
            {/* Window Top Bar */}
            <div className="h-8 px-4 flex items-center justify-between bg-black/80 border-b border-white/10 z-20 relative text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>

              <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/10 border border-white/10 font-mono text-[11px] text-white/90">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>vistar.systems/sovereign-architecture</span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>HARDWARE-BACKED VAULT</span>
              </div>
            </div>

            {/* Video Container */}
            <div className="relative aspect-[16/9] md:aspect-[24/10] w-full overflow-hidden bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover opacity-85"
              >
                <source src="/videos/empowerment-bg.mp4" type="video/mp4" />
              </video>

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none" />

              {/* Text & Telemetry Badges */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
                <div className="space-y-1.5 max-w-xl">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF3823] font-semibold">
                    AUTONOMOUS PLATFORM BLUEPRINT
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
                    Deterministic Architecture Running on Customer-Owned Infrastructure
                  </h3>
                  <p className="text-xs text-neutral-300 font-sans">
                    Zero public API telemetry egress. Complete code sovereignty delivered with production test suites.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/15">
                    <span className="text-neutral-400 block text-[9px]">SPRINT VELOCITY</span>
                    <span className="text-white font-semibold">14 Days Guaranteed</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/15">
                    <span className="text-neutral-400 block text-[9px]">OWNERSHIP</span>
                    <span className="text-emerald-400 font-semibold">100% Day-One</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 3: INTERACTIVE ARCHITECTURAL COMPARISON WORKBENCH ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#F6F4ED] border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#FF3823] font-semibold">
                SYSTEM ARCHITECTURE COMPARISON
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#141413] tracking-tight">
                How Sovereign Engineering Outperforms
              </h2>
            </div>

            {/* Model Switcher Tabs */}
            <div className="p-1 bg-white border border-black/10 rounded-xl flex gap-1 self-start sm:self-end">
              <button
                onClick={() => setActiveModel("vistar")}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activeModel === "vistar"
                    ? "bg-[#141413] text-white shadow-xs"
                    : "text-[#5E605D] hover:text-[#141413]"
                }`}
              >
                VISTAR Sovereign Engine
              </button>
              <button
                onClick={() => setActiveModel("agency")}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activeModel === "agency"
                    ? "bg-[#141413] text-white shadow-xs"
                    : "text-[#5E605D] hover:text-[#141413]"
                }`}
              >
                Traditional 50-Person Agency
              </button>
            </div>
          </div>

          {/* Interactive Flow Diagram Visualizer */}
          {activeModel === "vistar" ? (
            <div className="bg-white border border-[#141413] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm transition-all">
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#141413]">
                    VISTAR SOVEREIGN WORKFLOW &bull; DIRECT SENIOR PIPELINE
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-xs font-mono font-medium border border-emerald-200">
                  Zero Retainers &bull; 100% Git Handover
                </span>
              </div>

              {/* Step Nodes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-[#FAF9F5] border border-black/10 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono text-[#FF3823] font-bold">STAGE 01</span>
                  <h4 className="font-serif text-base font-normal text-[#141413]">48-Hour Architecture Scoping</h4>
                  <p className="text-xs text-[#5E605D]">Direct pairing with principal systems architect. Concrete system interfaces and typed API boundaries.</p>
                </div>

                <div className="p-4 bg-[#FAF9F5] border border-black/10 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono text-[#FF3823] font-bold">STAGE 02</span>
                  <h4 className="font-serif text-base font-normal text-[#141413]">14-Day Production Sprint</h4>
                  <p className="text-xs text-[#5E605D]">Principal engineers write TypeScript, Python, and SQL directly. Weekly deployable milestones with automated test suites.</p>
                </div>

                <div className="p-4 bg-[#FAF9F5] border border-black/10 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono text-[#FF3823] font-bold">STAGE 03</span>
                  <h4 className="font-serif text-base font-normal text-[#141413]">Air-Gapped Private VPC</h4>
                  <p className="text-xs text-[#5E605D]">Models, embeddings, and vector stores deployed directly in your AWS, GCP, or Azure perimeter. Zero third-party training leaks.</p>
                </div>

                <div className="p-4 bg-[#FAF9F5] border border-black/10 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono text-[#FF3823] font-bold">STAGE 04</span>
                  <h4 className="font-serif text-base font-normal text-[#141413]">100% Repository Transfer</h4>
                  <p className="text-xs text-[#5E605D]">Full private GitHub handover, Dockerfiles, and Terraform scripts. You own every line of code with zero ongoing retainers.</p>
                </div>
              </div>

              {/* Benchmarks Row */}
              <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  Monthly Retainer Fee: $0 / month
                </span>
                <span className="text-[#141413]">
                  P95 Edge Latency: &lt;45ms
                </span>
                <span className="text-[#141413]">
                  Time-to-Production: 14 Days
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-rose-300 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm transition-all">
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-900">
                    TRADITIONAL 50-PERSON CONSULTANCY &bull; THE BLOAT TRAP
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-rose-50 text-rose-800 text-xs font-mono font-medium border border-rose-200">
                  $15k/mo Hostage Retainer &bull; Proprietary Lock-in
                </span>
              </div>

              {/* Step Nodes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono text-rose-700 font-bold">STAGE 01</span>
                  <h4 className="font-serif text-base font-normal text-rose-950">6-Month Discovery Phase</h4>
                  <p className="text-xs text-rose-800">100-page PowerPoint decks, endless stakeholder interviews, zero functional software delivered.</p>
                </div>

                <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono text-rose-700 font-bold">STAGE 02</span>
                  <h4 className="font-serif text-base font-normal text-rose-950">Junior Developer Handoff</h4>
                  <p className="text-xs text-rose-800">Account reps pass requirements through 3 layers of management to junior offshore contractors.</p>
                </div>

                <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono text-rose-700 font-bold">STAGE 03</span>
                  <h4 className="font-serif text-base font-normal text-rose-950">Brittle Prompt Wrapper</h4>
                  <p className="text-xs text-rose-800">Superficial chatbot mockups wired to shared third-party APIs with zero deterministic validation.</p>
                </div>

                <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono text-rose-700 font-bold">STAGE 04</span>
                  <h4 className="font-serif text-base font-normal text-rose-950">Hostage Maintenance Lock-in</h4>
                  <p className="text-xs text-rose-800">Proprietary platform dependencies requiring $15,000/month recurring fees just to keep features online.</p>
                </div>
              </div>

              {/* Benchmarks Row */}
              <div className="pt-4 border-t border-rose-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-rose-900">
                <span className="font-semibold flex items-center gap-1.5 text-rose-700">
                  <XCircle className="w-4 h-4" />
                  Monthly Retainer Fee: $15,000 / month
                </span>
                <span>P95 Response Latency: 3.2 Seconds</span>
                <span>Time-to-Production: 6+ Months</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FRAME 4: 4 FOUNDATIONAL ENGINEERING PRINCIPLES WITH CODE/TELEMETRY INSPECTORS ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#FAF9F5] border-b border-black/10">
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

                {/* Interactive Code / Telemetry Inspector Graphic for each Axiom */}
                <div className="p-3 bg-[#0C0D12] rounded-xl text-neutral-300 font-mono text-xs space-y-2 border border-black/10">
                  {axiom.inspectorType === "commitLog" && (
                    <div className="space-y-1">
                      <div className="text-[10px] text-neutral-500 flex items-center justify-between">
                        <span>git log --oneline -n 2</span>
                        <span className="text-emerald-400">Sprint Day 08</span>
                      </div>
                      <div className="text-emerald-400 text-[11px] truncate">
                        &bull; feat(agent): deterministic tool-calling state machine
                      </div>
                      <div className="text-neutral-400 text-[11px] truncate">
                        &bull; test(vpc): automated egress boundary verification passed
                      </div>
                    </div>
                  )}

                  {axiom.inspectorType === "schemaGate" && (
                    <div className="space-y-1">
                      <div className="text-[10px] text-neutral-500 flex items-center justify-between">
                        <span>Pydantic / Zod Validation Gate</span>
                        <span className="text-emerald-400">100% Verified</span>
                      </div>
                      <div className="text-amber-400 text-[11px] truncate">
                        const AnomalyPayload = z.object(&#123; sensorId: z.string(), score: z.number().max(1.0) &#125;)
                      </div>
                      <div className="text-emerald-400 text-[11px] truncate">
                        &gt; State mutation committed to ClickHouse immutable ledger
                      </div>
                    </div>
                  )}

                  {axiom.inspectorType === "vpcDiagram" && (
                    <div className="space-y-1">
                      <div className="text-[10px] text-neutral-500 flex items-center justify-between">
                        <span>Private VPC Subnet Perimeter</span>
                        <span className="text-emerald-400">TLS 1.3 / AES-256</span>
                      </div>
                      <div className="text-sky-400 text-[11px] truncate">
                        Subnet 10.0.4.0/24 &bull; Isolated Model Vault &bull; No Public Ingress
                      </div>
                      <div className="text-neutral-400 text-[11px] truncate">
                        Data Isolation: Bilateral NDA &bull; Zero Public Training &bull; Private Subnets
                      </div>
                    </div>
                  )}

                  {axiom.inspectorType === "repoHandover" && (
                    <div className="space-y-1">
                      <div className="text-[10px] text-neutral-500 flex items-center justify-between">
                        <span>GitHub Enterprise Handover</span>
                        <span className="text-emerald-400">Day-One Transfer</span>
                      </div>
                      <div className="text-purple-400 text-[11px] truncate">
                        repo: client-org/sovereign-runtime &bull; full git commit tree
                      </div>
                      <div className="text-emerald-400 text-[11px] truncate">
                        &bull; Dockerfiles &bull; Terraform scripts &bull; Zero retainers
                      </div>
                    </div>
                  )}
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

      {/* ── FRAME 5: COMPARISON TABLE ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#F6F4ED] border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-2 text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#FF3823] font-semibold">
              THE BLOAT COMPARISON
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#141413] tracking-tight">
              The Underdog Edge vs. Traditional Consultancies
            </h2>
            <p className="text-base text-[#5E605D]">
              Clear architectural differences between monolithic agencies and an agile strike team of principal software engineers.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-black/10 bg-[#FAF9F5] text-xs uppercase tracking-wider text-[#5E605D] font-mono">
                    <th className="py-4 px-6 font-semibold w-1/4">Evaluation Vector</th>
                    <th className="py-4 px-6 font-semibold w-3/8 text-neutral-500">Traditional Agency / Consultancy</th>
                    <th className="py-4 px-6 font-semibold w-3/8 text-[#141413] bg-[#E8FCE8]/50">VISTAR Sovereign Engineering</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-[#141413]">
                        {row.dimension}
                      </td>
                      <td className="py-4 px-6 text-[#5E605D]">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                          <span>{row.agency}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#141413] font-medium bg-[#E8FCE8]/20">
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
        </div>
      </section>

      {/* ── FRAME 6: TECHNICAL ANSWER BLOCKS (LIGHT THEME) ── */}
      <AnswerBlocks
        title="Philosophy & Architectural Specifications"
        subtitle="Frequently referenced answers regarding our engineering ethos, delivery velocity, and digital sovereignty."
        badge="ETHOS SPECIFICATION"
        items={PHILOSOPHY_FAQ_ITEMS}
        schemaId="philosophy-faq-schema"
        theme="light"
      />

      {/* ── FRAME 7: BOTTOM CONVERSION CTA ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#FAF9F5] border-t border-black/10 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#141413] tracking-tight">
            Ready to ship software without the agency circus?
          </h2>
          <p className="text-base text-[#5E605D] max-w-xl mx-auto leading-relaxed">
            Direct access to principal systems engineers. 14-day production delivery. 100% source code ownership.
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
              Schedule Engineering Consultation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
