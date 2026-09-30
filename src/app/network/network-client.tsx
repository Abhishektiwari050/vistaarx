"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Radio,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Server,
  Zap,
  CheckCircle2,
  Lock,
  Layers,
} from "lucide-react";
import { AnswerBlocks, type QAPair } from "@/components/seo/answer-blocks";

interface PopNode {
  id: string;
  city: string;
  country: string;
  region: "Americas" | "EMEA" | "APAC" | "Middle East";
  latency: string;
  status: "ACTIVE" | "PRIMARY PEER";
  compliance: string[];
  capabilities: string[];
  datacenter: string;
}

const GLOBAL_POPS: PopNode[] = [
  {
    id: "SFO-1",
    city: "San Francisco / Silicon Valley",
    country: "United States",
    region: "Americas",
    latency: "14ms",
    status: "PRIMARY PEER",
    compliance: ["SOC 2 Type II", "CCPA", "HIPAA Vault"],
    capabilities: ["Autonomous Agent Swarms", "GPU Cluster Peering", "VPC Direct Connect"],
    datacenter: "Equinix SV1 / AWS us-west-1",
  },
  {
    id: "IAD-1",
    city: "Ashburn / Northern Virginia",
    country: "United States",
    region: "Americas",
    latency: "18ms",
    status: "PRIMARY PEER",
    compliance: ["SOC 2 Type II", "FedRAMP Ready", "HIPAA"],
    capabilities: ["FinTech Telemetry", "Private Embedding Store", "Anycast Edge Mesh"],
    datacenter: "Equinix DC2 / AWS us-east-1",
  },
  {
    id: "LGA-1",
    city: "New York City",
    country: "United States",
    region: "Americas",
    latency: "20ms",
    status: "ACTIVE",
    compliance: ["SOC 2 Type II", "FINRA Architecture", "NYDFS 500"],
    capabilities: ["High-Frequency WebGL", "Algorithmic State Machines", "Edge Caching"],
    datacenter: "Telx NYC / GCP us-east4",
  },
  {
    id: "ORD-1",
    city: "Chicago",
    country: "United States",
    region: "Americas",
    latency: "22ms",
    status: "ACTIVE",
    compliance: ["SOC 2 Type II", "ISO 27001"],
    capabilities: ["Industrial Supply Chain AI", "Real-Time Telemetry Relay", "Distributed Cache"],
    datacenter: "Coresite CH1 / AWS us-east-2",
  },
  {
    id: "YYZ-1",
    city: "Toronto",
    country: "Canada",
    region: "Americas",
    latency: "25ms",
    status: "ACTIVE",
    compliance: ["PIPEDA", "SOC 2 Type II"],
    capabilities: ["Healthcare ML Sandboxes", "Bilingual NLP Pipelines", "Private VPC Storage"],
    datacenter: "Equinix TR2 / AWS ca-central-1",
  },
  {
    id: "LHR-1",
    city: "London",
    country: "United Kingdom",
    region: "EMEA",
    latency: "24ms",
    status: "PRIMARY PEER",
    compliance: ["UK GDPR", "ISO 27001", "DORA Compliant"],
    capabilities: ["Aviation Telemetry GIS", "Banking Model Vaults", "Sub-second Ledger Push"],
    datacenter: "Equinix LD4 / AWS eu-west-2",
  },
  {
    id: "FRA-1",
    city: "Frankfurt",
    country: "Germany",
    region: "EMEA",
    latency: "26ms",
    status: "PRIMARY PEER",
    compliance: ["EU GDPR", "EU AI Act Enclave", "BSI C5"],
    capabilities: ["Air-Gapped VPC Pods", "Deterministic Agent Audits", "Zero Egress Sandboxes"],
    datacenter: "Equinix FR5 / AWS eu-central-1",
  },
  {
    id: "AMS-1",
    city: "Amsterdam",
    country: "Netherlands",
    region: "EMEA",
    latency: "28ms",
    status: "ACTIVE",
    compliance: ["EU GDPR", "ISO 27001"],
    capabilities: ["High-Density Vector Index", "European Anycast Transit", "Multi-Agent Queues"],
    datacenter: "Nikhef AMS-IX / GCP europe-west4",
  },
  {
    id: "CDG-1",
    city: "Paris",
    country: "France",
    region: "EMEA",
    latency: "29ms",
    status: "ACTIVE",
    compliance: ["EU GDPR", "SecNumCloud Ready"],
    capabilities: ["PropTech 3D Spatial Streams", "Sovereign Document RAG", "Encrypted State Bus"],
    datacenter: "Equinix PA3 / AWS eu-west-3",
  },
  {
    id: "ZRH-1",
    city: "Zurich",
    country: "Switzerland",
    region: "EMEA",
    latency: "30ms",
    status: "ACTIVE",
    compliance: ["Swiss FADP", "FINMA Circular 08/21", "ISO 27001"],
    capabilities: ["Private Wealth ML Enclaves", "Hardware Security Modules", "Encrypted Ledgers"],
    datacenter: "Green Datacenter ZRH / GCP europe-west6",
  },
  {
    id: "DXB-1",
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    latency: "38ms",
    status: "PRIMARY PEER",
    compliance: ["DIFC Data Protection Law", "UAE Federal Decree 45", "ISO 27001"],
    capabilities: ["MENA Sovereign AI", "GovTech Agent Automation", "Energy Grid Telemetry"],
    datacenter: "Equinix DX1 / AWS me-central-1",
  },
  {
    id: "AUH-1",
    city: "Abu Dhabi",
    country: "United Arab Emirates",
    region: "Middle East",
    latency: "40ms",
    status: "ACTIVE",
    compliance: ["ADGM Regulations", "UAE Data Sovereignty", "ISO 27001"],
    capabilities: ["Sovereign Arabic LLM Hosting", "Aerospace Hazard Monitoring", "Private VPC Storage"],
    datacenter: "Khazna Abu Dhabi / Azure UAE Central",
  },
  {
    id: "BLR-1",
    city: "Bengaluru",
    country: "India",
    region: "APAC",
    latency: "35ms",
    status: "PRIMARY PEER",
    compliance: ["DPDP Act 2023", "ISO 27001", "SOC 2 Type II"],
    capabilities: ["Principal Engineering Hub", "High-Throughput Multi-Agent Pods", "Sub-100ms Inference"],
    datacenter: "CtrlS BLR / AWS ap-south-1",
  },
  {
    id: "BOM-1",
    city: "Mumbai",
    country: "India",
    region: "APAC",
    latency: "37ms",
    status: "ACTIVE",
    compliance: ["RBI Data Localization", "DPDP Act 2023"],
    capabilities: ["Enterprise Banking Microservices", "Postgres Read Replicas", "Fiber Peering"],
    datacenter: "Equinix MB1 / GCP asia-south1",
  },
  {
    id: "SIN-1",
    city: "Singapore",
    country: "Singapore",
    region: "APAC",
    latency: "32ms",
    status: "PRIMARY PEER",
    compliance: ["Singapore PDPA", "MAS TRM Guidelines", "ISO 27001"],
    capabilities: ["Cross-Border Trade Swarms", "Maritime GIS Stream", "APAC Anycast Gateway"],
    datacenter: "Equinix SG1 / AWS ap-southeast-1",
  },
  {
    id: "NRT-1",
    city: "Tokyo",
    country: "Japan",
    region: "APAC",
    latency: "42ms",
    status: "ACTIVE",
    compliance: ["APPI Compliance", "ISO 27001"],
    capabilities: ["Biometric Telemetry Anomaly", "Robotics Interface AI", "Edge Vector Compute"],
    datacenter: "Equinix TY2 / AWS ap-northeast-1",
  },
  {
    id: "SYD-1",
    city: "Sydney",
    country: "Australia",
    region: "APAC",
    latency: "55ms",
    status: "ACTIVE",
    compliance: ["Privacy Act 1988", "IRAP Assessment Ready"],
    capabilities: ["Natural Resources Telemetry", "Enterprise Next.js 16 Edge", "Private VPC Mesh"],
    datacenter: "Equinix SY3 / AWS ap-southeast-2",
  },
];

const NETWORK_FAQ_ITEMS: QAPair[] = [
  {
    category: "GLOBAL EDGE & POPS",
    question: "What are VISTAR's global Points of Presence (PoPs) for sovereign AI deployment?",
    answer:
      "VISTAR deploys sovereign AI software across 16 global Points of Presence (PoPs) spanning North America, EMEA, the Middle East, and Asia-Pacific. Every PoP provides localized private VPC peering, hardware-backed cryptographic tunnels, and sub-40ms P95 latency to eliminate network bottlenecks.",
    keyPoints: [
      "16 tier-1 carrier-neutral PoPs across 5 continents",
      "Sub-40ms P95 edge round-trip time across global enterprise hubs",
      "Direct BGP Anycast routing eliminating intermediate proxy hops",
    ],
  },
  {
    category: "DATA SOVEREIGNTY & COMPLIANCE",
    question: "Can VISTAR deploy autonomous multi-agent systems within our local sovereign VPC?",
    answer:
      "Yes. VISTAR engineers software to deploy directly into your private cloud perimeter (AWS, GCP, Azure, or on-premise hardware). Inference weights, embedding vectors, and state databases remain air-gapped within your regional jurisdiction, ensuring 100% compliance with GDPR, HIPAA, DIFC, and DPDP laws.",
    keyPoints: [
      "Air-gapped private VPC deployment with zero third-party telemetry egress",
      "Strict data boundary enforcement guaranteeing zero model training leakage",
      "Fully compliant with EU AI Act, DIFC Data Protection, and DPDP regulations",
    ],
  },
  {
    category: "PERFORMANCE & LATENCY",
    question: "How does VISTAR achieve sub-40ms enterprise AI latency globally?",
    answer:
      "VISTAR pairs distributed Anycast routing with localized read-replica databases and edge-compiled Next.js 16 runtimes. Complex agent workflows execute deterministic state graphs near the user while heavy model compute runs in dedicated private VPC GPU clusters connected via low-latency fiber backbones.",
    keyPoints: [
      "Anycast entry routing automatically selects the lowest latency PoP",
      "Decoupled state machines separating deterministic logic from heavy model inference",
      "100/100 Core Web Vitals with zero client-side hydration freezing",
    ],
  },
  {
    category: "SOFTWARE ENGINEERING DELIVERABLES",
    question: "What does VISTAR deliver at the end of an enterprise software engineering engagement?",
    answer:
      "VISTAR delivers production-ready systems in 14-day guaranteed sprints with 100% source code ownership. Clients receive private GitHub repository handover, typed Next.js 16 codebases, Docker and Kubernetes manifests, Terraform infrastructure runbooks, and zero agency retainers.",
    keyPoints: [
      "100% intellectual property and GitHub Enterprise repository transfer",
      "Production-ready Next.js 16, Python, and PostgreSQL codebases",
      "Zero recurring software licensing fees, markup, or vendor lock-in",
    ],
  },
];

export default function NetworkClientPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [activePop, setActivePop] = useState<PopNode>(GLOBAL_POPS[0]);

  const filteredPops =
    selectedRegion === "All"
      ? GLOBAL_POPS
      : GLOBAL_POPS.filter((pop) => pop.region === selectedRegion);

  return (
    <div className="w-full bg-[#060709] text-[#ECEEF5] font-sans antialiased selection:bg-[#3B82F6] selection:text-white min-h-screen">
      
      {/* ── FRAME 1: CINEMATIC OBSIDIAN HERO ── */}
      <section className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 border-b border-white/10 overflow-hidden px-4 sm:px-6">
        {/* Subtle Edge Grid Background */}
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px] pointer-events-none" />
        
        {/* Radial Ambient Core Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-blue-600/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[#959CB3]">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>GLOBAL SOVEREIGN EDGE &bull; 16 POINTS OF PRESENCE</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.08]">
            Sovereign AI Infrastructure <br />
            <span className="text-[#959CB3] italic">Across Every Continent.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#959CB3] max-w-2xl mx-auto leading-relaxed">
            VISTAR engineers custom autonomous AI agents, private VPC vaults, and mission-critical enterprise software deployed to 16 global Points of Presence with sub-40ms P95 latency and 100% source code ownership.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/start"
              className="bg-white hover:bg-neutral-200 text-black px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
            >
              Initialize Architecture Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="bg-white/5 hover:bg-white/10 text-white border border-white/15 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-all duration-150 inline-flex items-center gap-2"
            >
              Request Regional Deployment
            </Link>
          </div>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="relative z-10 max-w-5xl mx-auto mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="font-mono text-3xl font-bold text-white">16</p>
            <p className="text-xs font-mono text-[#959CB3] uppercase tracking-wider">Active Global PoPs</p>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-3xl font-bold text-emerald-400">&lt; 40ms</p>
            <p className="text-xs font-mono text-[#959CB3] uppercase tracking-wider">P95 Global Latency</p>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-3xl font-bold text-blue-400">100%</p>
            <p className="text-xs font-mono text-[#959CB3] uppercase tracking-wider">Private VPC Isolation</p>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-3xl font-bold text-white">14 Days</p>
            <p className="text-xs font-mono text-[#959CB3] uppercase tracking-wider">Production Sprint Delivery</p>
          </div>
        </div>
      </section>

      {/* ── FRAME 2: INTERACTIVE GLOBAL POP MATRIX & INSPECTOR ── */}
      <section className="w-full py-20 px-4 sm:px-6 border-b border-white/10 bg-[#0A0B10]">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-blue-400 font-semibold">
                // EDGE TOPOLOGY EXPLORER
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
                Global Points of Presence (PoPs)
              </h2>
              <p className="text-sm text-[#959CB3] max-w-xl">
                Select any regional Point of Presence to inspect latency profiles, local data sovereignty certifications, and deployed agent clusters.
              </p>
            </div>

            {/* Region Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-lg">
              {["All", "Americas", "EMEA", "Middle East", "APAC"].map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                    selectedRegion === region
                      ? "bg-white/15 text-white font-semibold shadow-xs"
                      : "text-[#959CB3] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout: Master PoP List on Left, Active Inspector on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Scrollable/Dense PoP Cards */}
            <div className="lg:col-span-7 space-y-3">
              {filteredPops.map((pop) => {
                const isSelected = activePop.id === pop.id;
                return (
                  <div
                    key={pop.id}
                    onClick={() => setActivePop(pop)}
                    className={`p-4 sm:p-5 rounded-lg border cursor-pointer transition-all duration-150 flex items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-[#11131C] border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                        : "bg-[#0D0E15] border-white/10 hover:border-white/20 hover:bg-[#0F111A]"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white">
                          {pop.id}
                        </span>
                        <span className="text-xs text-[#959CB3]">
                          &bull; {pop.region}
                        </span>
                        {pop.status === "PRIMARY PEER" && (
                          <span className="px-1.5 py-0.5 text-[9px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
                            PRIMARY
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-white">
                        {pop.city}, {pop.country}
                      </p>
                      <p className="text-xs text-[#959CB3] font-mono">
                        {pop.datacenter}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-sm font-bold text-emerald-400">
                        {pop.latency}
                      </span>
                      <p className="text-[10px] font-mono text-[#959CB3]">
                        P95 RTT
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Active PoP Inspector Card */}
            <div className="lg:col-span-5 bg-[#0D0E15] border border-white/15 rounded-xl p-6 sm:p-8 space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-400" />
                  <span className="font-mono text-sm font-bold text-white">
                    {activePop.id} // SPECS
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-white">
                  {activePop.city}
                </h3>
                <p className="text-xs text-[#959CB3] mt-1 font-mono">
                  {activePop.country} &bull; {activePop.datacenter}
                </p>
              </div>

              {/* Latency and Protocol Benchmarks */}
              <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-lg border border-white/10 font-mono text-xs">
                <div>
                  <span className="text-[#959CB3]">P95 Latency</span>
                  <p className="text-lg font-bold text-emerald-400 mt-0.5">{activePop.latency}</p>
                </div>
                <div>
                  <span className="text-[#959CB3]">Protocol</span>
                  <p className="text-lg font-bold text-white mt-0.5">TLS 1.3 / BGP</p>
                </div>
              </div>

              {/* Compliance & Sovereignty */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#959CB3]">
                  Data Sovereignty &amp; Compliance:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activePop.compliance.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded text-neutral-300 flex items-center gap-1"
                    >
                      <ShieldCheck className="w-3 h-3 text-blue-400" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deployed Capabilities */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#959CB3]">
                  Deployed Cluster Capabilities:
                </span>
                <ul className="space-y-2">
                  {activePop.capabilities.map((cap, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/contact"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 rounded text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-2 text-center"
                >
                  Deploy to {activePop.id} Perimeter
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── FRAME 3: 4-LAYER SOVEREIGN INFRASTRUCTURE ARCHITECTURE ── */}
      <section className="w-full py-24 px-4 sm:px-6 bg-[#060709] border-b border-white/10">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-blue-400 font-semibold">
              // ARCHITECTURAL RIGOR
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
              Four-Layer Sovereign Execution Stack
            </h2>
            <p className="text-sm sm:text-base text-[#959CB3]">
              Every VISTAR system is engineered as an immutable, typed state machine operating inside your cloud boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0D0E15] border border-white/10 rounded-xl p-6 space-y-4 hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-mono text-sm font-bold">
                01
              </div>
              <h3 className="text-lg font-serif font-bold text-white">
                Anycast Global Routing
              </h3>
              <p className="text-xs text-[#959CB3] leading-relaxed">
                Direct BGP peering across 16 PoPs routes client requests to the nearest edge node in &lt;15ms, terminating TLS 1.3 instantly.
              </p>
            </div>

            <div className="bg-[#0D0E15] border border-white/10 rounded-xl p-6 space-y-4 hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono text-sm font-bold">
                02
              </div>
              <h3 className="text-lg font-serif font-bold text-white">
                Private VPC Vaults
              </h3>
              <p className="text-xs text-[#959CB3] leading-relaxed">
                Proprietary weights and fine-tuned embeddings execute within air-gapped AWS, GCP, or Azure VPC perimeters with zero third-party telemetry egress.
              </p>
            </div>

            <div className="bg-[#0D0E15] border border-white/10 rounded-xl p-6 space-y-4 hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-mono text-sm font-bold">
                03
              </div>
              <h3 className="text-lg font-serif font-bold text-white">
                Multi-Agent State Graphs
              </h3>
              <p className="text-xs text-[#959CB3] leading-relaxed">
                Deterministic worker pods communicate over typed message channels, enforcing strict consensus validation before committing state.
              </p>
            </div>

            <div className="bg-[#0D0E15] border border-white/10 rounded-xl p-6 space-y-4 hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono text-sm font-bold">
                04
              </div>
              <h3 className="text-lg font-serif font-bold text-white">
                100% Repository Handover
              </h3>
              <p className="text-xs text-[#959CB3] leading-relaxed">
                Complete private GitHub repository ownership, typed Next.js 16 and Python codebases, Dockerfiles, and Terraform infrastructure on day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 4: TECHNICAL ANSWER BLOCKS (DARK THEME) ── */}
      <AnswerBlocks
        title="Global PoP & Infrastructure Answers"
        subtitle="Canonical architectural documentation and performance specifications formatted for automated intelligence crawlers and CTO technical reviews."
        badge="EDGE NETWORK SPECIFICATION"
        items={NETWORK_FAQ_ITEMS}
        schemaId="network-faq-schema"
        theme="dark"
      />

      {/* ── FRAME 5: BOTTOM CONVERSION CTA ── */}
      <section className="w-full py-24 px-4 sm:px-6 bg-[#0A0B10] border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
            Ready to deploy sovereign AI across the globe?
          </h2>
          <p className="text-sm sm:text-base text-[#959CB3] max-w-xl mx-auto">
            Book a 30-minute technical architecture review directly with our principal engineers. No sales reps, no agency fluff.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/start"
              className="bg-white hover:bg-neutral-200 text-black px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-all duration-150 inline-flex items-center gap-2"
            >
              Start Free Architecture Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="bg-white/5 hover:bg-white/10 text-white border border-white/15 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-all duration-150"
            >
              Contact Principal Engineers
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
