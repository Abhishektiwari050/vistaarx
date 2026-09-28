import React from "react";

export function AboutGrammarDiagram() {
  return (
    <div className="w-full relative border border-[rgba(56, 189, 248, 0.15)] bg-white shadow-sm rounded-[4px] p-4 md:p-8 overflow-hidden select-none">
      {/* Top Diagram Telemetry Bar */}
      <div className="flex items-center justify-between border-b border-[rgba(56, 189, 248, 0.15)] pb-3 mb-6 text-xs font-mono text-[#475569]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[#0284C7] rounded-full animate-pulse" />
          <span className="text-[#0B1320] font-medium tracking-wider">DIAGRAM 00-A // SYSTEM LOOP ARCHITECTURE</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#94A3B8]">
          <span>MODEL: CLOSED_LOOP_ENGINE</span>
          <span>SOVEREIGNTY: 100%</span>
          <span className="text-[#0284C7] font-semibold">INTEGRATION: UNIFIED</span>
        </div>
      </div>

      <svg
        viewBox="0 0 800 440"
        className="w-full h-auto max-h-[440px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Vistar Tripartite Architecture: BUILD, DISCOVER, GROW in a closed continuous feedback loop"
      >
        <title>Vistar System Loop Architecture Diagram</title>
        <desc>
          An architectural schematic demonstrating how the BUILD engineering core powers DISCOVER distribution rings, which feeds GROW telemetry, returning real-time data back to BUILD.
        </desc>

        <defs>
          <style>{`
            @keyframes loopSignalForward {
              0% { stroke-dashoffset: 48; }
              100% { stroke-dashoffset: 0; }
            }
            @keyframes loopSignalReverse {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: 48; }
            }
            @keyframes ringExpand {
              0% { r: 36px; opacity: 0.8; }
              100% { r: 84px; opacity: 0; }
            }
            @keyframes pulseCenter {
              0%, 100% { transform: scale(1); opacity: 0.4; }
              50% { transform: scale(1.06); opacity: 0.8; }
            }
            .animated-signal-forward {
              stroke-dasharray: 6 10;
              animation: loopSignalForward 1.5s linear infinite;
            }
            .animated-signal-loop {
              stroke-dasharray: 6 10;
              animation: loopSignalReverse 2s linear infinite;
            }
            .expanding-ring {
              animation: ringExpand 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
            }
            .core-pulse {
              transform-origin: 400px 220px;
              animation: pulseCenter 3s ease-in-out infinite;
            }
          `}</style>
          <radialGradient id="about-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* System Boundary Box */}
        <rect
          x="20"
          y="20"
          width="760"
          height="400"
          stroke="rgba(56, 189, 248, 0.15)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* Central Interconnection Perimeter */}
        <circle
          cx="400"
          cy="220"
          r="150"
          stroke="rgba(56, 189, 248, 0.15)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
        <circle
          cx="400"
          cy="220"
          r="180"
          className="core-pulse"
          fill="url(#about-center-glow)"
        />

        {/* ── CONNECTION PATHS (THE SYSTEM LOOP) ────────────────────── */}
        {/* BUILD (180, 290) -> DISCOVER (400, 110) */}
        <path
          d="M 210 265 L 375 130"
          stroke="rgba(26, 25, 22, 0.15)"
          strokeWidth="1.5"
        />
        <path
          d="M 210 265 L 375 130"
          stroke="#0284C7"
          strokeWidth="1.5"
          className="animated-signal-forward"
        />

        {/* DISCOVER (400, 110) -> GROW (620, 290) */}
        <path
          d="M 425 130 L 590 265"
          stroke="rgba(26, 25, 22, 0.15)"
          strokeWidth="1.5"
        />
        <path
          d="M 425 130 L 590 265"
          stroke="#0284C7"
          strokeWidth="1.5"
          className="animated-signal-forward"
        />

        {/* GROW (620, 290) -> BUILD (180, 290) [The Closed-Loop Feedback Arc] */}
        <path
          d="M 570 310 C 470 380, 330 380, 230 310"
          stroke="rgba(26, 25, 22, 0.15)"
          strokeWidth="1.5"
        />
        <path
          d="M 570 310 C 470 380, 330 380, 230 310"
          stroke="#0284C7"
          strokeWidth="2"
          className="animated-signal-loop"
        />

        {/* Loop Label on Feedback Arc */}
        <rect
          x="335"
          y="352"
          width="130"
          height="22"
          fill="#F0F7FD"
          stroke="rgba(56, 189, 248, 0.22)"
          strokeWidth="1"
          rx="2"
        />
        <text
          x="400"
          y="367"
          fill="#0284C7"
          fontFamily="monospace"
          fontSize="10"
          textAnchor="middle"
          letterSpacing="0.1em"
          fontWeight="600"
        >
          TELEMETRY FEEDBACK
        </text>

        {/* ── NODE 1: BUILD (Left Lower) ───────────────────────────── */}
        <g transform="translate(180, 280)">
          {/* Node Orbit Ring */}
          <circle cx="0" cy="0" r="48" stroke="rgba(26, 25, 22, 0.1)" strokeWidth="1" />
          {/* Node Outer Disc */}
          <circle cx="0" cy="0" r="34" fill="#F0F7FD" stroke="#0B1320" strokeWidth="1.5" />
          {/* Core Node Pulse */}
          <circle cx="0" cy="0" r="10" fill="#0284C7" />
          <circle cx="0" cy="0" r="18" stroke="#0284C7" strokeWidth="1" opacity="0.6" />

          {/* Node Labels */}
          <text
            x="0"
            y="-58"
            fill="#0B1320"
            fontFamily="Instrument Sans, sans-serif"
            fontWeight="600"
            fontSize="14"
            textAnchor="middle"
            letterSpacing="0.05em"
          >
            01 // BUILD
          </text>
          <text
            x="0"
            y="56"
            fill="#475569"
            fontFamily="monospace"
            fontSize="11"
            textAnchor="middle"
          >
            ENGINEERING PRIMITIVES
          </text>
          <text
            x="0"
            y="72"
            fill="#94A3B8"
            fontFamily="monospace"
            fontSize="9"
            textAnchor="middle"
          >
            NEXT.JS • AI • 100% OWNERSHIP
          </text>
        </g>

        {/* ── NODE 2: DISCOVER (Top Center) ────────────────────────── */}
        <g transform="translate(400, 110)">
          {/* Expanding Reach Rings */}
          <circle cx="0" cy="0" r="48" stroke="rgba(26, 25, 22, 0.1)" strokeWidth="1" />
          <circle cx="0" cy="0" r="54" className="expanding-ring" stroke="#0284C7" strokeWidth="1" fill="none" />
          {/* Node Outer Disc */}
          <circle cx="0" cy="0" r="34" fill="#F0F7FD" stroke="#0B1320" strokeWidth="1.5" />
          {/* Core Node Pulse */}
          <circle cx="0" cy="0" r="10" fill="#0284C7" />
          <circle cx="0" cy="0" r="18" stroke="#0284C7" strokeWidth="1" opacity="0.6" />

          {/* Node Labels */}
          <text
            x="0"
            y="-46"
            fill="#0B1320"
            fontFamily="Instrument Sans, sans-serif"
            fontWeight="600"
            fontSize="14"
            textAnchor="middle"
            letterSpacing="0.05em"
          >
            02 // DISCOVER
          </text>
          <text
            x="0"
            y="54"
            fill="#475569"
            fontFamily="monospace"
            fontSize="11"
            textAnchor="middle"
          >
            SEARCH &amp; LLM CITATION
          </text>
          <text
            x="0"
            y="70"
            fill="#94A3B8"
            fontFamily="monospace"
            fontSize="9"
            textAnchor="middle"
          >
            PROGRAMMATIC SEO • LLMS.TXT
          </text>
        </g>

        {/* ── NODE 3: GROW (Right Lower) ───────────────────────────── */}
        <g transform="translate(620, 280)">
          {/* Node Orbit Ring */}
          <circle cx="0" cy="0" r="48" stroke="rgba(26, 25, 22, 0.1)" strokeWidth="1" />
          {/* Node Outer Disc */}
          <circle cx="0" cy="0" r="34" fill="#F0F7FD" stroke="#0B1320" strokeWidth="1.5" />
          {/* Core Node Pulse */}
          <circle cx="0" cy="0" r="10" fill="#0284C7" />
          <circle cx="0" cy="0" r="18" stroke="#0284C7" strokeWidth="1" opacity="0.6" />

          {/* Node Labels */}
          <text
            x="0"
            y="-58"
            fill="#0B1320"
            fontFamily="Instrument Sans, sans-serif"
            fontWeight="600"
            fontSize="14"
            textAnchor="middle"
            letterSpacing="0.05em"
          >
            03 // GROW
          </text>
          <text
            x="0"
            y="56"
            fill="#475569"
            fontFamily="monospace"
            fontSize="11"
            textAnchor="middle"
          >
            CONTINUOUS TELEMETRY
          </text>
          <text
            x="0"
            y="72"
            fill="#94A3B8"
            fontFamily="monospace"
            fontSize="9"
            textAnchor="middle"
          >
            LIFECYCLES • ATTRIBUTION • EXPERIMENTS
          </text>
        </g>

        {/* Center Kernel Spec Indicator */}
        <g transform="translate(400, 235)">
          <text
            x="0"
            y="0"
            fill="#0B1320"
            fontFamily="monospace"
            fontSize="11"
            fontWeight="600"
            textAnchor="middle"
            letterSpacing="0.1em"
          >
            ONE CONNECTED SYSTEM
          </text>
          <text
            x="0"
            y="16"
            fill="#475569"
            fontFamily="monospace"
            fontSize="9"
            textAnchor="middle"
          >
            ZERO VENDOR SILOS • CONTINUOUS RUNTIME
          </text>
        </g>

        {/* Diagram Technical Metadata Footprint */}
        <text
          x="30"
          y="405"
          fill="#94A3B8"
          fontFamily="monospace"
          fontSize="9"
        >
          KERNEL: VISTAR_CORE_V1 // SPEC: SECTION_01_POSITIONING
        </text>
        <text
          x="770"
          y="405"
          fill="#94A3B8"
          fontFamily="monospace"
          fontSize="9"
          textAnchor="end"
        >
          PROGRESSIVE_ENHANCEMENT: ACTIVE
        </text>
      </svg>
    </div>
  );
}
