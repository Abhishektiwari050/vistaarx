import React from "react";

export function DiscoverGrammarDiagram() {
  return (
    <div className="w-full relative border border-[rgba(56, 189, 248, 0.15)] bg-white shadow-sm rounded-[4px] p-4 md:p-8 overflow-hidden select-none">
      {/* Top Diagram Telemetry Bar */}
      <div className="flex items-center justify-between border-b border-[rgba(56, 189, 248, 0.15)] pb-3 mb-6 text-xs font-mono text-[#475569]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[#0284C7] rounded-full animate-pulse" />
          <span className="text-[#0B1320] font-medium tracking-wider">DIAGRAM 02-A // DISTRIBUTION &amp; REACH TOPOLOGY</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#94A3B8]">
          <span>EDGE_TTFB: &lt;65MS</span>
          <span>INDEXATION: 100%</span>
          <span className="text-[#0284C7] font-semibold">LLMS.TXT: ACTIVE</span>
        </div>
      </div>

      <svg
        viewBox="0 0 800 440"
        className="w-full h-auto max-h-[440px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Vistar Discover Architecture: Expanding Reach Rings, Programmatic SEO, Edge Distribution, and AI Knowledge Graph"
      >
        <title>Vistar Discover Distribution Diagram</title>
        <desc>
          A radial schematic illustrating outward reach expansion through Schema graphs, programmatic search engines, global edge delivery, and LLM search discoverability.
        </desc>

        <defs>
          <style>{`
            @keyframes expandRing {
              0% { r: 60px; opacity: 0.8; }
              100% { r: 210px; opacity: 0; }
            }
            @keyframes pulseSignalOutward {
              0% { stroke-dashoffset: 32; }
              100% { stroke-dashoffset: 0; }
            }
            .ring-expanding {
              animation: expandRing 3.6s cubic-bezier(0.1, 0.7, 0.1, 1) infinite;
            }
            .ring-expanding-delayed {
              animation: expandRing 3.6s cubic-bezier(0.1, 0.7, 0.1, 1) infinite;
              animation-delay: 1.8s;
            }
            .signal-outward {
              stroke-dasharray: 4 8;
              animation: pulseSignalOutward 1.2s linear infinite;
            }
          `}</style>
          <radialGradient id="discover-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* System Boundary Hairline */}
        <rect
          x="20"
          y="20"
          width="760"
          height="400"
          stroke="rgba(56, 189, 248, 0.15)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* Concentric Static Grammar Rings (Section 6: Ring = discovery/reach) */}
        <circle cx="400" cy="220" r="80" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" />
        <circle cx="400" cy="220" r="140" stroke="rgba(26, 25, 22, 0.1)" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx="400" cy="220" r="190" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" strokeDasharray="2 4" />

        {/* Animated Expanding Discovery Rings */}
        <circle cx="400" cy="220" r="60" stroke="#0284C7" strokeWidth="1" fill="none" className="ring-expanding" />
        <circle cx="400" cy="220" r="60" stroke="#0284C7" strokeWidth="1" fill="none" className="ring-expanding-delayed" />
        <circle cx="400" cy="220" r="80" fill="url(#discover-glow)" />

        {/* Radial Axis Rays (Distribution Channels) */}
        {/* Ray 1: Top (400, 220 -> 400, 45) */}
        <line x1="400" y1="160" x2="400" y2="55" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" />
        <line x1="400" y1="160" x2="400" y2="55" stroke="#0284C7" strokeWidth="1.5" className="signal-outward" />

        {/* Ray 2: Right (400, 220 -> 710, 220) */}
        <line x1="460" y1="220" x2="680" y2="220" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" />
        <line x1="460" y1="220" x2="680" y2="220" stroke="#0284C7" strokeWidth="1.5" className="signal-outward" />

        {/* Ray 3: Bottom (400, 220 -> 400, 395) */}
        <line x1="400" y1="280" x2="400" y2="385" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" />
        <line x1="400" y1="280" x2="400" y2="385" stroke="#0284C7" strokeWidth="1.5" className="signal-outward" />

        {/* Ray 4: Left (400, 220 -> 90, 220) */}
        <line x1="340" y1="220" x2="120" y2="220" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" />
        <line x1="340" y1="220" x2="120" y2="220" stroke="#0284C7" strokeWidth="1.5" className="signal-outward" />

        {/* Ring 1 Intermediary Tag (80px radius) */}
        <rect x="420" y="130" width="130" height="18" fill="#FFFFFF" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" rx="2" />
        <text x="426" y="143" fill="#475569" fontFamily="monospace" fontSize="9">
          RING 01: SCHEMA.ORG
        </text>

        {/* Ring 2 Intermediary Tag (140px radius) */}
        <rect x="490" y="90" width="145" height="18" fill="#FFFFFF" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" rx="2" />
        <text x="496" y="103" fill="#475569" fontFamily="monospace" fontSize="9">
          RING 02: PROGRAMMATIC SEO
        </text>

        {/* Ring 3 Intermediary Tag (190px radius) */}
        <rect x="560" y="50" width="135" height="18" fill="#FFFFFF" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" rx="2" />
        <text x="566" y="63" fill="#0284C7" fontFamily="monospace" fontSize="9" fontWeight="600">
          RING 03: GLOBAL EDGE CDN
        </text>

        {/* Central Origin Node: Verified System Core */}
        <g transform="translate(400, 220)">
          <rect
            x="-70"
            y="-32"
            width="140"
            height="64"
            fill="#F0F7FD"
            stroke="#0284C7"
            strokeWidth="1.5"
          />
          <text
            x="0"
            y="-10"
            textAnchor="middle"
            fill="#0284C7"
            fontFamily="monospace"
            fontSize="9"
            letterSpacing="0.1em"
            fontWeight="bold"
          >
            LAYER 01 ORIGIN
          </text>
          <text
            x="0"
            y="9"
            textAnchor="middle"
            fill="#0B1320"
            fontFamily="'Instrument Sans', sans-serif"
            fontSize="13"
            fontWeight="600"
          >
            CORE SYSTEM
          </text>
          <text
            x="0"
            y="23"
            textAnchor="middle"
            fill="#475569"
            fontFamily="'Instrument Sans', sans-serif"
            fontSize="10"
          >
            High-Performance SSR
          </text>
        </g>

        {/* Destination Node: Top (AI Indexers & LLMs) */}
        <g transform="translate(400, 55)">
          <circle r="14" fill="#F0F7FD" stroke="#0284C7" strokeWidth="1.5" />
          <circle r="4" fill="#0284C7" />
          <text x="0" y="-22" textAnchor="middle" fill="#0B1320" fontFamily="'Instrument Sans', sans-serif" fontSize="12" fontWeight="600">
            01 // AI &amp; LLM HARVESTING
          </text>
          <text x="0" y="-8" textAnchor="middle" fill="#475569" fontFamily="'Instrument Sans', sans-serif" fontSize="10">
            llms.txt, Clean Markdown, Semantic Parsers
          </text>
        </g>

        {/* Destination Node: Right (Search Engines & Organic Crawlers) */}
        <g transform="translate(680, 220)">
          <circle r="14" fill="#F0F7FD" stroke="rgba(26, 25, 22, 0.2)" strokeWidth="1" />
          <circle r="4" fill="#0284C7" />
          <text x="24" y="-8" fill="#0B1320" fontFamily="'Instrument Sans', sans-serif" fontSize="12" fontWeight="600">
            02 // SEARCH ENGINE INDEX
          </text>
          <text x="24" y="8" fill="#475569" fontFamily="'Instrument Sans', sans-serif" fontSize="10">
            Automated Sitemaps &amp; Rich Snippets
          </text>
        </g>

        {/* Destination Node: Bottom (Global Edge Caches & Core Web Vitals) */}
        <g transform="translate(400, 385)">
          <circle r="14" fill="#F0F7FD" stroke="rgba(26, 25, 22, 0.2)" strokeWidth="1" />
          <circle r="4" fill="#0284C7" />
          <text x="0" y="24" textAnchor="middle" fill="#0B1320" fontFamily="'Instrument Sans', sans-serif" fontSize="12" fontWeight="600">
            03 // GLOBAL EDGE NETWORKS
          </text>
          <text x="0" y="38" textAnchor="middle" fill="#475569" fontFamily="'Instrument Sans', sans-serif" fontSize="10">
            Sub-100ms TTFB / Zero Layout Shift
          </text>
        </g>

        {/* Destination Node: Left (Conversion Funnels & Traffic Telemetry) */}
        <g transform="translate(120, 220)">
          <circle r="14" fill="#F0F7FD" stroke="rgba(26, 25, 22, 0.2)" strokeWidth="1" />
          <circle r="4" fill="#0284C7" />
          <text x="-18" y="-8" textAnchor="end" fill="#0B1320" fontFamily="'Instrument Sans', sans-serif" fontSize="12" fontWeight="600">
            04 // TRAFFIC INSTRUMENTATION
          </text>
          <text x="-18" y="8" textAnchor="end" fill="#475569" fontFamily="'Instrument Sans', sans-serif" fontSize="10">
            Server-Side Attribution &amp; Zero Ad-Block Leaks
          </text>
        </g>
      </svg>
    </div>
  );
}
