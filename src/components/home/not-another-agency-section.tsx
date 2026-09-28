import React from "react";
import { Card } from "@/components/vistar-card";

export function NotAnotherAgencySection() {
  const differentiators = [
    {
      number: "01",
      title: "Raw Primitives, Zero Template Debt",
      description:
        "We build exclusively with raw TypeScript, Next.js, and modern cloud primitives. We never deploy off-the-shelf theme marketplace templates, brittle page builders, or disposable plugins that accumulate technical liabilities.",
    },
    {
      number: "02",
      title: "100% Client Codebase Ownership",
      description:
        "You own every line of source code, commit history, deployment configuration, and digital asset. Everything is transferred to your private repository with full commercial copyright and zero vendor lock-in.",
    },
    {
      number: "03",
      title: "AI-Native Architecture",
      description:
        "We engineer machine intelligence directly into the operational core: autonomous data ingestion, real-time vector indexing, and asynchronous telemetry, avoiding superficial cosmetic chatbots.",
    },
    {
      number: "04",
      title: "No Retainers for Unfinished Work",
      description:
        "Traditional agencies profit from slow delivery and endless hourly retainers. We work under transparent milestone commitments anchored to functioning systems and verifiable performance metrics.",
    },
  ];

  return (
    <section className="vistar-section border-t border-b border-[#0B1320]/[0.08] bg-transparent text-[#0B1320] relative overflow-hidden">
      {/* Subtle Specular Sheen */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20 -z-10"
        style={{
          background: "radial-gradient(circle at 20% 50%, rgba(201, 121, 74, 0.04), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="vistar-container space-y-16">
        {/* Section Heading */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F7FD]/60 border border-[#0B1320]/10 text-xs font-heading tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] shadow-[0_0_6px_rgba(2, 132, 199,0.4)]" />
            <span className="text-[#0B1320] font-bold">05 // DIFFERENTIATION</span>
          </div>
          <h2 className="type-h2 text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0B1320]">
            Not Another Agency
          </h2>
          <p className="type-body text-[#0B1320]/75 text-base md:text-lg leading-relaxed">
            The traditional digital agency business model is structurally misaligned with client growth. We engineered Vistar as a technical systems partner with zero agency overhead.
          </p>
        </div>

        {/* 4 Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentiators.map((diff) => (
            <Card key={diff.number} className="p-8 space-y-4 bg-white" hoverHighlight>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <span className="font-mono text-sm font-semibold text-white">
                  DIFFERENTIATOR // {diff.number}
                </span>
                <span className="type-label text-white/40">
                  SYSTEM DIRECTIVE
                </span>
              </div>
              <h3 className="type-h3">
                {diff.title}
              </h3>
              <p className="type-body text-white/70 text-[15px] leading-relaxed">
                {diff.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Grammar Architectural Diagram: Legacy Agency Loop vs Vistar Sovereign Engine */}
        <Card className="p-8 md:p-12 space-y-8 bg-white/[0.015]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.1] pb-6">
            <div className="space-y-1">
              <span className="type-label text-white font-bold">
                GRAMMAR COMPARISON // ARCHITECTURAL FLOW
              </span>
              <h3 className="type-h3">
                Structural Topology: Legacy Retainer vs Sovereign Engine
              </h3>
            </div>
            <span className="type-label text-white/40 font-mono">
              DIAGRAM 04-A
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg
              viewBox="0 0 1000 320"
              className="w-full min-w-[700px] h-auto"
              role="img"
              aria-label="Grammar comparison diagram illustrating legacy agency trap versus Vistar sovereign system architecture"
            >
              <defs>
                <filter id="accent-pulse-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#FFFFFF" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* Top Track: The Legacy Agency Loophole */}
              <g>
                <text x="30" y="45" fill="rgba(26, 25, 22, 0.45)" fontSize="11" fontFamily="'Instrument Sans', sans-serif" fontWeight="600" letterSpacing="0.08em">
                  LEGACY AGENCY MODEL // STRUCTURAL LOCK-IN
                </text>

                {/* Edges */}
                <line x1="160" y1="80" x2="380" y2="80" stroke="rgba(26, 25, 22, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="420" y1="80" x2="640" y2="80" stroke="rgba(26, 25, 22, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="680" y1="80" x2="880" y2="80" stroke="rgba(26, 25, 22, 0.15)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Nodes */}
                <circle cx="140" cy="80" r="5" fill="#F0F7FD" stroke="rgba(26, 25, 22, 0.3)" strokeWidth="1" />
                <text x="140" y="110" fill="rgba(26, 25, 22, 0.55)" fontSize="11" fontFamily="'Instrument Sans', sans-serif" textAnchor="middle">
                  Template Themes
                </text>

                <circle cx="400" cy="80" r="5" fill="#F0F7FD" stroke="rgba(26, 25, 22, 0.3)" strokeWidth="1" />
                <text x="400" y="110" fill="rgba(26, 25, 22, 0.55)" fontSize="11" fontFamily="'Instrument Sans', sans-serif" textAnchor="middle">
                  Monthly Retainer Sink
                </text>

                <circle cx="660" cy="80" r="5" fill="#F0F7FD" stroke="rgba(26, 25, 22, 0.3)" strokeWidth="1" />
                <text x="660" y="110" fill="rgba(26, 25, 22, 0.55)" fontSize="11" fontFamily="'Instrument Sans', sans-serif" textAnchor="middle">
                  Disjointed Agencies
                </text>

                <circle cx="900" cy="80" r="5" fill="#F0F7FD" stroke="#78716C" strokeWidth="1" />
                <text x="900" y="110" fill="#78716C" fontSize="11" fontFamily="'Instrument Sans', sans-serif" textAnchor="middle">
                  Proprietary Debt
                </text>
              </g>

              {/* Divider */}
              <line x1="30" y1="160" x2="970" y2="160" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />

              {/* Bottom Track: Vistar Sovereign System Engine */}
              <g>
                <text x="30" y="195" fill="#0B1320" fontSize="11" fontFamily="'Instrument Sans', sans-serif" fontWeight="600" letterSpacing="0.08em">
                  VISTAR CONNECTED MODEL // SOVEREIGN ENGINE
                </text>

                {/* Edges with Active Pulses */}
                <line x1="160" y1="240" x2="380" y2="240" stroke="rgba(2, 132, 199, 0.25)" strokeWidth="1" />
                <line x1="160" y1="240" x2="380" y2="240" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="4 8" />

                <line x1="420" y1="240" x2="640" y2="240" stroke="rgba(2, 132, 199, 0.25)" strokeWidth="1" />
                <line x1="420" y1="240" x2="640" y2="240" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="4 8" />

                <line x1="680" y1="240" x2="880" y2="240" stroke="rgba(2, 132, 199, 0.25)" strokeWidth="1" />
                <line x1="680" y1="240" x2="880" y2="240" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="4 8" />

                {/* Nodes */}
                <circle cx="140" cy="240" r="6" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
                <text x="140" y="275" fill="#0B1320" fontSize="12" fontFamily="'Instrument Sans', sans-serif" fontWeight="600" textAnchor="middle">
                  Raw Primitives
                </text>

                <circle cx="400" cy="240" r="6" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
                <text x="400" y="275" fill="#0B1320" fontSize="12" fontFamily="'Instrument Sans', sans-serif" fontWeight="600" textAnchor="middle">
                  BUILD Layer
                </text>

                <circle cx="660" cy="240" r="6" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
                <text x="660" y="275" fill="#0B1320" fontSize="12" fontFamily="'Instrument Sans', sans-serif" fontWeight="600" textAnchor="middle">
                  DISCOVER &amp; GROW
                </text>

                <circle cx="900" cy="240" r="7" fill="#0284C7" stroke="#CC3700" strokeWidth="2" />
                <text x="900" y="275" fill="#0B1320" fontSize="12" fontFamily="'Instrument Sans', sans-serif" fontWeight="700" textAnchor="middle">
                  100% Client Ownership
                </text>
              </g>
            </svg>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default NotAnotherAgencySection;
