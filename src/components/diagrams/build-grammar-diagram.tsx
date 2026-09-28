import React from "react";

export function BuildGrammarDiagram() {
  return (
    <div className="w-full relative border border-[rgba(56, 189, 248, 0.15)] bg-white shadow-sm rounded-[4px] p-4 md:p-8 overflow-hidden select-none">
      {/* Top Diagram Telemetry Bar */}
      <div className="flex items-center justify-between border-b border-[rgba(56, 189, 248, 0.15)] pb-3 mb-6 text-xs font-mono text-[#475569]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[#0284C7] rounded-full animate-pulse" />
          <span className="text-[#0B1320] font-medium tracking-wider">DIAGRAM 01-A // COMPILED SYSTEM TOPOLOGY</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#94A3B8]">
          <span>PROTOCOL: TYPE_SAFE_IPC</span>
          <span>LATENCY: &lt;45MS</span>
          <span className="text-[#0284C7] font-semibold">OWNERSHIP: 100%</span>
        </div>
      </div>

      <svg
        viewBox="0 0 800 440"
        className="w-full h-auto max-h-[440px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Vistar Build Architecture: Runtime Engine, AI Agents, Data Layer, and Sovereign Codebase"
      >
        <title>Vistar Build Architecture Diagram</title>
        <desc>
          A schematic showing Next.js App Router, Autonomous AI Tooling, FastAPI, and PostgreSQL connected into a unified sovereign codebase.
        </desc>

        <defs>
          <style>{`
            @keyframes pulseSignal {
              0% { stroke-dashoffset: 24; }
              100% { stroke-dashoffset: 0; }
            }
            @keyframes softGlow {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 0.8; transform: scale(1.08); }
            }
            .animated-signal {
              stroke-dasharray: 4 8;
              animation: pulseSignal 1.2s linear infinite;
            }
            .node-glow {
              transform-origin: center;
              animation: softGlow 2.8s ease-in-out infinite;
            }
          `}</style>
          <radialGradient id="build-orange-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* System Perimeter Hairline */}
        <rect
          x="20"
          y="20"
          width="760"
          height="400"
          stroke="rgba(56, 189, 248, 0.15)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* Central Sovereign Cluster Boundary */}
        <circle
          cx="400"
          cy="220"
          r="120"
          stroke="rgba(56, 189, 248, 0.22)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
        <circle
          cx="400"
          cy="220"
          r="160"
          fill="url(#build-orange-glow)"
          className="node-glow"
        />

        {/* Static Relationship Lines */}
        <line x1="180" y1="110" x2="400" y2="220" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" />
        <line x1="620" y1="110" x2="400" y2="220" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" />
        <line x1="180" y1="330" x2="400" y2="220" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" />
        <line x1="620" y1="330" x2="400" y2="220" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" />

        {/* Cross Inter-Node Arteries */}
        <line x1="180" y1="110" x2="620" y2="110" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
        <line x1="180" y1="110" x2="180" y2="330" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
        <line x1="620" y1="110" x2="620" y2="330" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
        <line x1="180" y1="330" x2="620" y2="330" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />

        {/* Active Animated Signal Pulses (#0284C7) */}
        <line
          x1="180"
          y1="110"
          x2="400"
          y2="220"
          stroke="#0284C7"
          strokeWidth="1.5"
          className="animated-signal"
        />
        <line
          x1="620"
          y1="110"
          x2="400"
          y2="220"
          stroke="#0284C7"
          strokeWidth="1.5"
          className="animated-signal"
        />
        <line
          x1="400"
          y1="220"
          x2="180"
          y2="330"
          stroke="#0284C7"
          strokeWidth="1.5"
          className="animated-signal"
        />
        <line
          x1="400"
          y1="220"
          x2="620"
          y2="330"
          stroke="#0284C7"
          strokeWidth="1.5"
          className="animated-signal"
        />

        {/* Peripheral Node 1: Frontend & Edge Runtime (Top Left) */}
        <g transform="translate(180, 110)">
          <circle r="18" fill="#F0F7FD" stroke="rgba(26, 25, 22, 0.2)" strokeWidth="1" />
          <circle r="4" fill="#0284C7" />
          <text x="-25" y="-28" fill="#0B1320" fontFamily="'Instrument Sans', sans-serif" fontSize="13" fontWeight="600">
            01 // RUNTIME ENGINE
          </text>
          <text x="-25" y="-12" fill="#475569" fontFamily="'Instrument Sans', sans-serif" fontSize="11">
            Next.js 15 App Router &amp; RSC
          </text>
          <rect x="-80" y="24" width="130" height="20" fill="#FFFFFF" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" rx="2" />
          <text x="-74" y="38" fill="#0284C7" fontFamily="monospace" fontSize="9" fontWeight="600">
            SUB-100MS TTFB / SSR
          </text>
        </g>

        {/* Peripheral Node 2: AI Orchestration & Tooling (Top Right) */}
        <g transform="translate(620, 110)">
          <circle r="18" fill="#F0F7FD" stroke="#0284C7" strokeWidth="1" />
          <circle r="4" fill="#0284C7" />
          <circle r="8" fill="none" stroke="#0284C7" strokeWidth="1" opacity="0.6" className="node-glow" />
          <text x="-140" y="-28" fill="#0B1320" fontFamily="'Instrument Sans', sans-serif" fontSize="13" fontWeight="600">
            02 // AI AGENT ORCHESTRATION
          </text>
          <text x="-140" y="-12" fill="#475569" fontFamily="'Instrument Sans', sans-serif" fontSize="11">
            Deterministic Workflows &amp; Guardrails
          </text>
          <rect x="-60" y="24" width="140" height="20" fill="#FFFFFF" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" rx="2" />
          <text x="-54" y="38" fill="#C9794A" fontFamily="monospace" fontSize="9" fontWeight="600">
            VECTOR RAG / EMBEDDINGS
          </text>
        </g>

        {/* Peripheral Node 3: Data Access & State (Bottom Left) */}
        <g transform="translate(180, 330)">
          <circle r="18" fill="#F0F7FD" stroke="rgba(26, 25, 22, 0.2)" strokeWidth="1" />
          <circle r="4" fill="#0284C7" />
          <text x="-25" y="32" fill="#0B1320" fontFamily="'Instrument Sans', sans-serif" fontSize="13" fontWeight="600">
            03 // DATA ARCHITECTURE
          </text>
          <text x="-25" y="48" fill="#475569" fontFamily="'Instrument Sans', sans-serif" fontSize="11">
            PostgreSQL + Redis Caching
          </text>
          <rect x="-80" y="-40" width="120" height="20" fill="#FFFFFF" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" rx="2" />
          <text x="-74" y="-26" fill="#475569" fontFamily="monospace" fontSize="9">
            ACID / STRICT SCHEMAS
          </text>
        </g>

        {/* Peripheral Node 4: Microservices & API Gateway (Bottom Right) */}
        <g transform="translate(620, 330)">
          <circle r="18" fill="#F0F7FD" stroke="rgba(26, 25, 22, 0.2)" strokeWidth="1" />
          <circle r="4" fill="#0284C7" />
          <text x="-140" y="32" fill="#0B1320" fontFamily="'Instrument Sans', sans-serif" fontSize="13" fontWeight="600">
            04 // BACKEND &amp; API GATEWAY
          </text>
          <text x="-140" y="48" fill="#475569" fontFamily="'Instrument Sans', sans-serif" fontSize="11">
            FastAPI Streaming &amp; Webhooks
          </text>
          <rect x="-60" y="-40" width="130" height="20" fill="#FFFFFF" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" rx="2" />
          <text x="-54" y="-26" fill="#475569" fontFamily="monospace" fontSize="9">
            STREAMING PROTOCOLS
          </text>
        </g>

        {/* Central Core Sovereign Cluster (Resolved) */}
        <g transform="translate(400, 220)">
          <rect
            x="-85"
            y="-38"
            width="170"
            height="76"
            fill="#F0F7FD"
            stroke="#0284C7"
            strokeWidth="1.5"
            rx="0"
          />
          <text
            x="0"
            y="-14"
            textAnchor="middle"
            fill="#0284C7"
            fontFamily="monospace"
            fontSize="10"
            letterSpacing="0.1em"
            fontWeight="bold"
          >
            CORE RESULT
          </text>
          <text
            x="0"
            y="7"
            textAnchor="middle"
            fill="#0B1320"
            fontFamily="'Instrument Sans', sans-serif"
            fontSize="14"
            fontWeight="600"
          >
            SOVEREIGN SYSTEM
          </text>
          <text
            x="0"
            y="25"
            textAnchor="middle"
            fill="#475569"
            fontFamily="'Instrument Sans', sans-serif"
            fontSize="11"
          >
            100% Client Ownership
          </text>
        </g>
      </svg>
    </div>
  );
}
