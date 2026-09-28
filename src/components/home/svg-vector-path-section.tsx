"use client";

import React, { useState } from "react";
import Link from "next/link";
import { playClick } from "@/lib/sound";

interface VectorNode {
  id: number;
  step: string;
  title: string;
  metric: string;
  metricLabel: string;
  cx: number;
  cy: number;
  summary: string;
  deliverables: string[];
  techSpec: string;
  telemetry: {
    latency: string;
    throughput: string;
    resilience: string;
    protocol: string;
  };
}

const VECTOR_NODES: VectorNode[] = [
  {
    id: 1,
    step: "VECTOR 01 // INCEPTION",
    title: "Type-Safe Schemas & Lattice Cryptography",
    metric: "<12ms",
    metricLabel: "Contract Validation",
    cx: 210,
    cy: 135,
    summary:
      "Deterministic data contracts and Falcon-1024 post-quantum lattice security verification ensure unbreakable runtime integrity before a single component renders.",
    deliverables: [
      "Strict TypeScript Schema Synchronization",
      "Post-Quantum Falcon-1024 Signatures",
      "Automated OpenTelemetry Instrumentation",
    ],
    techSpec: "RFC-9110 // Next.js 16 Typed Handlers",
    telemetry: {
      latency: "11.4ms",
      throughput: "142k ops/s",
      resilience: "100.0%",
      protocol: "QUIC / HTTP3",
    },
  },
  {
    id: 2,
    step: "VECTOR 02 // INTELLIGENCE",
    title: "Deterministic Autonomous Agent Pipelines",
    metric: "0% Drift",
    metricLabel: "Schema Adherence",
    cx: 510,
    cy: 275,
    summary:
      "Constrained LLM tool-calling orchestration with vector retrieval loops and strict schema validation, eliminating hallucinations in high-consequence business workflows.",
    deliverables: [
      "Deterministic Tool-Calling State Machines",
      "pgvector Sub-50ms Embedding Retrieval",
      "Zero-Retention Enterprise Model Guardrails",
    ],
    techSpec: "Claude 3.7 + OpenAI o3 Tool Handlers",
    telemetry: {
      latency: "38.2ms",
      throughput: "880 ops/s",
      resilience: "99.99%",
      protocol: "gRPC Streaming",
    },
  },
  {
    id: 3,
    step: "VECTOR 03 // EDGE COMPUTE",
    title: "Sub-85ms Global Edge Distribution",
    metric: "<85ms",
    metricLabel: "Global TTFB",
    cx: 830,
    cy: 115,
    summary:
      "Static generation paired with edge-rendered dynamic slots deployed across 24 global edge points of presence, ensuring instantaneous interaction at any coordinate.",
    deliverables: [
      "Edge-Cached Server-Driven Telemetry",
      "60fps WebGL GPU Shader Runtimes",
      "Automatic Brotli/Zstandard Compression",
    ],
    techSpec: "Cloudflare Edge Workers + Vercel ODB",
    telemetry: {
      latency: "14.8ms",
      throughput: "1.8M req/min",
      resilience: "99.999%",
      protocol: "BGP Anycast Edge",
    },
  },
  {
    id: 4,
    step: "VECTOR 04 // SOVEREIGNTY",
    title: "100% Sovereign Codebase Handover",
    metric: "100%",
    metricLabel: "Client IP Ownership",
    cx: 1110,
    cy: 255,
    summary:
      "Full private GitHub repository transfer on deployment day. Zero subscription traps, zero proprietary vendor lock-in, and 100% intellectual property sovereignty.",
    deliverables: [
      "Direct GitHub Org Transfer & Handover",
      "Docker Production Container Definitions",
      "Exhaustive OpenAPI Documentation & Tests",
    ],
    techSpec: "Pure MIT / Client Enterprise License",
    telemetry: {
      latency: "0.0ms",
      throughput: "Unconstrained",
      resilience: "Permanent",
      protocol: "Direct Git Handover",
    },
  },
];

export function SvgVectorPathSection() {
  const [activeNodeId, setActiveNodeId] = useState<number>(1);
  const activeNode = VECTOR_NODES.find((n) => n.id === activeNodeId) || VECTOR_NODES[0];

  // SVG Cubic Bezier Curve Coordinates:
  // Starts at (40, 230), flows smoothly through (210, 135), (510, 275), (830, 115), (1110, 255), and ends at (1240, 195)
  const pathData =
    "M 40,230 C 130,150 145,135 210,135 C 310,135 390,275 510,275 C 640,275 710,115 830,115 C 950,115 1010,255 1110,255 C 1170,255 1200,210 1240,195";

  const ghostPathData =
    "M 40,250 C 130,170 145,155 210,155 C 310,155 390,295 510,295 C 640,295 710,135 830,135 C 950,135 1010,275 1110,275 C 1170,275 1200,230 1240,215";

  return (
    <section
      id="vector-stream"
      className="relative w-full bg-gradient-to-b from-[#FFFFFF] via-[#F8FBFE] to-[#F0F7FC] border-b border-[rgba(14,165,233,0.12)] pt-28 pb-20 sm:pt-36 sm:pb-28 scroll-mt-20 overflow-hidden select-none"
      aria-label="SVG Path Vector Engineering Pipeline"
    >
      {/* Background Decorative Tech Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/20 to-transparent" />
        <div className="absolute top-12 left-10 text-[11px] font-mono text-[#0284C7]/30 tracking-widest">
          SYS.VECTOR.GRID // X: 1280 Y: 420
        </div>
        <div className="absolute bottom-12 right-10 text-[11px] font-mono text-[#0284C7]/30 tracking-widest">
          PROTOCOL // FALCON-1024.LATTICE
        </div>
      </div>

      <div className="vistar-container relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[rgba(14,165,233,0.12)] pb-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
              <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
              <span className="uppercase tracking-wider font-semibold text-[#0B1320]">
                02 // CONTINUOUS SVG VECTOR STREAM
              </span>
              <span className="text-[#0B1320]/25">•</span>
              <span className="text-[#0284C7] font-semibold">Deterministic Execution</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#050A14] tracking-[-0.03em] leading-[1.08]"
              style={{
                fontFamily:
                  "'Savage Roses', 'Delamoore', 'DM Serif Display', 'Playfair Display', serif",
              }}
            >
              The Architecture Vector Line.
            </h2>

            <p
              className="text-base sm:text-lg text-[#475569] leading-relaxed"
              style={{
                fontFamily:
                  "'Wasted Vindy', 'Delamoore', 'Playfair Display', 'DM Serif Display', serif",
              }}
            >
              Trace the continuous execution path of modern Vistar deployments. Click any coordinate
              node along the curve to inspect verified telemetry, type invariants, and edge latency.
            </p>
          </div>

          {/* Realtime Status Beacon */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-white/90 border border-[rgba(14,165,233,0.18)] rounded-xl shadow-xs self-start md:self-end">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0284C7]" />
            </span>
            <div className="text-xs font-mono">
              <span className="text-[#64748B]">LIVE TELEMETRY: </span>
              <span className="font-bold text-[#0284C7]">ACTIVE VECTOR ROUTE</span>
            </div>
          </div>
        </div>

        {/* ── THE INTERACTIVE SVG VECTOR PATH CANVAS ── */}
        <div className="relative w-full bg-white/70 backdrop-blur-md rounded-2xl border border-[rgba(14,165,233,0.16)] p-4 sm:p-8 shadow-[0_8px_30px_rgba(2,132,199,0.04)] overflow-hidden">
          
          {/* Subtle Top Telemetry Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] border-b border-[rgba(14,165,233,0.10)] pb-4 mb-4">
            <div className="flex items-center gap-4">
              <span>PATH EQUATION: CUBIC BÉZIER</span>
              <span className="hidden sm:inline text-[#94A3B8]">•</span>
              <span className="hidden sm:inline">NODES: 4 VERIFIED CHECKPOINTS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#0284C7] font-semibold">FLOW: 60FPS SYNCHRONIZED</span>
            </div>
          </div>

          <div className="relative w-full aspect-[1280/420] min-h-[280px]">
            <svg
              viewBox="0 0 1280 420"
              className="w-full h-full overflow-visible select-none"
              preserveAspectRatio="xMidYMid meet"
              aria-label="SVG Vector Pipeline Diagram"
            >
              <defs>
                {/* Gradient for primary vector path */}
                <linearGradient id="vector-stroke-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                  <stop offset="25%" stopColor="#0284C7" stopOpacity="1" />
                  <stop offset="50%" stopColor="#38BDF8" stopOpacity="1" />
                  <stop offset="75%" stopColor="#0284C7" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0369A1" stopOpacity="0.6" />
                </linearGradient>

                {/* Soft glow for laser beam energy packets */}
                <filter id="vector-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Grid Pattern */}
                <pattern id="vector-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(14, 165, 233, 0.05)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>

              {/* Grid Background */}
              <rect width="1280" height="420" fill="url(#vector-grid)" />

              {/* Baseline Axis Guide */}
              <line
                x1="40"
                y1="380"
                x2="1240"
                y2="380"
                stroke="rgba(15, 23, 42, 0.08)"
                strokeWidth="1"
                strokeDasharray="4 8"
              />

              {/* Ghost Guide Vector Line (Parallel Harmonic) */}
              <path
                d={ghostPathData}
                fill="none"
                stroke="rgba(56, 189, 248, 0.18)"
                strokeWidth="1.5"
                strokeDasharray="5 7"
              />

              {/* Vertical Coordinate Drop Lines from each Node */}
              {VECTOR_NODES.map((node) => {
                const isActive = activeNodeId === node.id;
                return (
                  <g key={`dropline-${node.id}`}>
                    <line
                      x1={node.cx}
                      y1={node.cy}
                      x2={node.cx}
                      y2="380"
                      stroke={isActive ? "rgba(2, 132, 199, 0.45)" : "rgba(148, 163, 184, 0.2)"}
                      strokeWidth={isActive ? "1.5" : "1"}
                      strokeDasharray={isActive ? "none" : "3 4"}
                    />
                    <circle
                      cx={node.cx}
                      cy="380"
                      r={isActive ? "3" : "2"}
                      fill={isActive ? "#0284C7" : "#CBD5E1"}
                    />
                    <text
                      x={node.cx}
                      y="402"
                      textAnchor="middle"
                      fill={isActive ? "#0284C7" : "#94A3B8"}
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight={isActive ? "bold" : "normal"}
                    >
                      {`NODE 0${node.id}`}
                    </text>
                  </g>
                );
              })}

              {/* MAIN PRIMARY VECTOR PATH (Thick Architectural Stroke) */}
              <path
                id="main-vector-path"
                d={pathData}
                fill="none"
                stroke="url(#vector-stroke-gradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="drop-shadow(0 4px 12px rgba(2, 132, 199, 0.18))"
              />

              {/* Secondary Animated Dash Tracer Wave */}
              <path
                d={pathData}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeDasharray="16 120"
                strokeLinecap="round"
                className="opacity-70"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="544"
                  to="0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </path>

              {/* CONTINUOUS ENERGETIC PULSE PACKETS TRAVELING ON THE SVG PATH */}
              {/* Primary Leading Light Pulse */}
              <circle r="7" fill="#38BDF8" filter="url(#vector-glow)">
                <animateMotion dur="6s" repeatCount="indefinite" path={pathData} />
              </circle>
              <circle r="3" fill="#FFFFFF">
                <animateMotion dur="6s" repeatCount="indefinite" path={pathData} />
              </circle>

              {/* Secondary Trailing Wave Pulses */}
              <circle r="5" fill="#0284C7" opacity="0.8" filter="url(#vector-glow)">
                <animateMotion dur="6s" begin="-1.5s" repeatCount="indefinite" path={pathData} />
              </circle>
              <circle r="4" fill="#38BDF8" opacity="0.6">
                <animateMotion dur="6s" begin="-3.0s" repeatCount="indefinite" path={pathData} />
              </circle>
              <circle r="5" fill="#0369A1" opacity="0.75" filter="url(#vector-glow)">
                <animateMotion dur="6s" begin="-4.5s" repeatCount="indefinite" path={pathData} />
              </circle>

              {/* INTERACTIVE WAYPOINT NODES ON THE SVG PATH */}
              {VECTOR_NODES.map((node) => {
                const isActive = activeNodeId === node.id;

                return (
                  <g
                    key={`node-${node.id}`}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => {
                      playClick(600 + node.id * 150, 0.04);
                      setActiveNodeId(node.id);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${node.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setActiveNodeId(node.id);
                      }
                    }}
                  >
                    {/* Outer Ripple for Active Node */}
                    {isActive && (
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r="26"
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="1.5"
                        opacity="0.4"
                      >
                        <animate
                          attributeName="r"
                          from="14"
                          to="32"
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          from="0.8"
                          to="0"
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    {/* Outer Halo Disc */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={isActive ? "16" : "12"}
                      fill="#FFFFFF"
                      stroke={isActive ? "#0284C7" : "#38BDF8"}
                      strokeWidth={isActive ? "3" : "2"}
                      className="transition-all duration-200 drop-shadow-sm"
                    />

                    {/* Core Coordinate Dot */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={isActive ? "7" : "4.5"}
                      fill={isActive ? "#0284C7" : "#0B1320"}
                      className="transition-all duration-200"
                    />

                    {/* Node Metric Callout Floating Badge Above Node */}
                    <g
                      transform={`translate(${node.cx - 55}, ${
                        node.cy < 180 ? node.cy - 52 : node.cy + 22
                      })`}
                    >
                      <rect
                        width="110"
                        height="30"
                        rx="6"
                        fill={isActive ? "#050A14" : "#FFFFFF"}
                        stroke={isActive ? "#0284C7" : "rgba(15,23,42,0.12)"}
                        strokeWidth={isActive ? "1.5" : "1"}
                        className="drop-shadow-sm transition-colors duration-200"
                      />
                      <text
                        x="55"
                        y="15"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={isActive ? "#FFFFFF" : "#0B1320"}
                        fontSize="11"
                        fontFamily="'DM Serif Display', 'Delamoore', serif"
                        fontWeight="bold"
                      >
                        {node.metric}
                      </text>
                      <text
                        x="55"
                        y="23"
                        textAnchor="middle"
                        fill={isActive ? "#38BDF8" : "#64748B"}
                        fontSize="7"
                        fontFamily="monospace"
                        fontWeight="600"
                      >
                        {node.metricLabel.toUpperCase()}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive Scrubbing Instructions */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] border-t border-[rgba(14,165,233,0.10)] pt-3 mt-2">
            <span>INTERACTION: TAP ANY NODE TO FOCUS TELEMETRY</span>
            <span className="hidden sm:inline">COORDINATE MAPPING // VECTOR ACTIVE</span>
          </div>
        </div>

        {/* ── LIVE TELEMETRY HUD INSPECTION CARD (SELECTED NODE SPEC) ── */}
        <div className="bg-white border border-[rgba(14,165,233,0.18)] rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (7 cols): Selected Stage Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-[#F0F7FC] text-[#0284C7] font-mono text-xs font-bold rounded-md border border-[rgba(14,165,233,0.22)]">
                  {activeNode.step}
                </span>
                <span className="text-xs font-mono text-[#64748B]">
                  SPEC: {activeNode.techSpec}
                </span>
              </div>

              <h3
                className="text-2xl sm:text-3xl font-bold text-[#050A14] tracking-tight"
                style={{
                  fontFamily:
                    "'DM Serif Display', 'Delamoore', 'Savage Roses', 'Playfair Display', serif",
                }}
              >
                {activeNode.title}
              </h3>

              <p
                className="text-base text-[#475569] leading-relaxed"
                style={{
                  fontFamily:
                    "'Wasted Vindy', 'Playfair Display', 'Delamoore', 'DM Serif Display', serif",
                }}
              >
                {activeNode.summary}
              </p>

              {/* Deliverables Bullet List */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono font-bold text-[#0B1320] uppercase tracking-wider">
                  Guaranteed Pipeline Invariants:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#334155]">
                  {activeNode.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-[#0284C7] shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-sans text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Live Telemetry Metrics Card */}
            <div className="lg:col-span-5 bg-[#F8FBFE] border border-[rgba(14,165,233,0.18)] rounded-xl p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-[rgba(14,165,233,0.14)] pb-3">
                <span className="font-mono text-xs font-bold text-[#0B1320] tracking-wider uppercase">
                  Telemetry Diagnostics
                </span>
                <span className="text-[10px] font-mono text-[#0284C7] bg-[#E0F2FE] px-2 py-0.5 rounded-full font-bold">
                  VERIFIED
                </span>
              </div>

              {/* 4 Telemetry Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white border border-[#E2E8F0] rounded-lg">
                  <div className="text-[10px] font-mono text-[#64748B] uppercase">Latency</div>
                  <div
                    className="text-xl font-bold text-[#0284C7] mt-0.5"
                    style={{ fontFamily: "'DM Serif Display', 'Delamoore', serif" }}
                  >
                    {activeNode.telemetry.latency}
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E2E8F0] rounded-lg">
                  <div className="text-[10px] font-mono text-[#64748B] uppercase">Throughput</div>
                  <div
                    className="text-xl font-bold text-[#050A14] mt-0.5"
                    style={{ fontFamily: "'DM Serif Display', 'Delamoore', serif" }}
                  >
                    {activeNode.telemetry.throughput}
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E2E8F0] rounded-lg">
                  <div className="text-[10px] font-mono text-[#64748B] uppercase">Resilience</div>
                  <div
                    className="text-xl font-bold text-[#050A14] mt-0.5"
                    style={{ fontFamily: "'DM Serif Display', 'Delamoore', serif" }}
                  >
                    {activeNode.telemetry.resilience}
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E2E8F0] rounded-lg">
                  <div className="text-[10px] font-mono text-[#64748B] uppercase">Protocol</div>
                  <div className="text-xs font-mono font-bold text-[#0284C7] mt-1.5 truncate">
                    {activeNode.telemetry.protocol}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold shadow-sm transition-all"
                style={{
                  fontFamily: "'Delamoore', 'DM Serif Display', 'Playfair Display', serif",
                }}
              >
                <span>Deploy Systems with This Pipeline</span>
                <span>→</span>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
