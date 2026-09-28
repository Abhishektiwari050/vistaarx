import React from "react";

export function GrowGrammarDiagram() {
  return (
    <div className="w-full relative border border-[rgba(56, 189, 248, 0.15)] bg-white shadow-sm rounded-[4px] p-4 md:p-8 overflow-hidden select-none">
      {/* Top Diagram Telemetry Bar */}
      <div className="flex items-center justify-between border-b border-[rgba(56, 189, 248, 0.15)] pb-3 mb-6 text-xs font-mono text-[#475569]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[#0284C7] rounded-full animate-pulse" />
          <span className="text-[#0B1320] font-medium tracking-wider">DIAGRAM 03-A // CLOSED-LOOP TELEMETRY ENGINE</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#94A3B8]">
          <span>EVENT_STREAM: BUFFERED</span>
          <span>INGESTION_RELIABILITY: 99.99%</span>
          <span className="text-[#0284C7] font-semibold">LOOP: CLOSED</span>
        </div>
      </div>

      <svg
        viewBox="0 0 800 440"
        className="w-full h-auto max-h-[440px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Vistar Grow Architecture: Closed Telemetry Loop from User Events to Lifecycle Dispatch and Feedback into Build"
      >
        <title>Vistar Grow Telemetry &amp; Retention Loop</title>
        <desc>
          A continuous closed-loop diagram showing user interaction streams, retention modeling, automated dispatch, and feedback loop ingestion directly returning to the build phase.
        </desc>

        <defs>
          <style>{`
            @keyframes orbitSignal {
              0% { stroke-dashoffset: 48; }
              100% { stroke-dashoffset: 0; }
            }
            @keyframes pulseCenter {
              0%, 100% { transform: scale(1); opacity: 0.3; }
              50% { transform: scale(1.06); opacity: 0.7; }
            }
            .orbit-signal {
              stroke-dasharray: 6 10;
              animation: orbitSignal 1.8s linear infinite;
            }
            .loop-pulse {
              transform-origin: 400px 220px;
              animation: pulseCenter 3s ease-in-out infinite;
            }
          `}</style>
          <radialGradient id="grow-glow" cx="50%" cy="50%" r="50%">
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

        {/* Central Closed-Loop Orbital Ring */}
        <circle
          cx="400"
          cy="220"
          r="135"
          stroke="rgba(56, 189, 248, 0.22)"
          strokeWidth="1"
        />
        <circle
          cx="400"
          cy="220"
          r="135"
          stroke="#0284C7"
          strokeWidth="1.5"
          className="orbit-signal"
        />
        <circle
          cx="400"
          cy="220"
          r="165"
          fill="url(#grow-glow)"
          className="loop-pulse"
        />

        {/* Center Loop Hub Text */}
        <g transform="translate(400, 220)">
          <rect
            x="-75"
            y="-34"
            width="150"
            height="68"
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
            CONTINUOUS CYCLE
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
            GROWTH MOTOR
          </text>
          <text
            x="0"
            y="23"
            textAnchor="middle"
            fill="#475569"
            fontFamily="'Instrument Sans', sans-serif"
            fontSize="10"
          >
            Deterministic Retention
          </text>
        </g>

        {/* Node 1: Top Center (400, 85) - User Interactions */}
        <g transform="translate(400, 85)">
          <circle r="16" fill="#F0F7FD" stroke="rgba(26, 25, 22, 0.2)" strokeWidth="1" />
          <circle r="4" fill="#0284C7" />
          <text x="0" y="-24" textAnchor="middle" fill="#0B1320" fontFamily="'Instrument Sans', sans-serif" fontSize="12" fontWeight="600">
            01 // USER INTERACTION EVENTS
          </text>
          <text x="0" y="-10" textAnchor="middle" fill="#475569" fontFamily="'Instrument Sans', sans-serif" fontSize="10">
            App sessions, API calls, conversion actions
          </text>
        </g>

        {/* Node 2: Top Right (528, 178) - Telemetry Ingestion */}
        <g transform="translate(528, 178)">
          <circle r="16" fill="#F0F7FD" stroke="rgba(26, 25, 22, 0.2)" strokeWidth="1" />
          <circle r="4" fill="#0284C7" />
          <text x="24" y="-6" fill="#0B1320" fontFamily="'Instrument Sans', sans-serif" fontSize="12" fontWeight="600">
            02 // EVENT TELEMETRY STREAM
          </text>
          <text x="24" y="10" fill="#475569" fontFamily="'Instrument Sans', sans-serif" fontSize="10">
            High-concurrency queues &amp; audit logging
          </text>
        </g>

        {/* Node 3: Bottom Right (483, 335) - Retention Modeling */}
        <g transform="translate(483, 335)">
          <circle r="16" fill="#F0F7FD" stroke="#0284C7" strokeWidth="1.5" />
          <circle r="4" fill="#0284C7" />
          <text x="24" y="4" fill="#0B1320" fontFamily="'Instrument Sans', sans-serif" fontSize="12" fontWeight="600">
            03 // RETENTION &amp; CHURN MODELING
          </text>
          <text x="24" y="20" fill="#475569" fontFamily="'Instrument Sans', sans-serif" fontSize="10">
            Cohort segmentation &amp; drop-off detection
          </text>
        </g>

        {/* Node 4: Bottom Left (317, 335) - Automated Dispatch */}
        <g transform="translate(317, 335)">
          <circle r="16" fill="#F0F7FD" stroke="rgba(26, 25, 22, 0.2)" strokeWidth="1" />
          <circle r="4" fill="#0284C7" />
          <text x="-24" y="4" textAnchor="end" fill="#0B1320" fontFamily="'Instrument Sans', sans-serif" fontSize="12" fontWeight="600">
            04 // AUTOMATED LIFECYCLE DISPATCH
          </text>
          <text x="-24" y="20" textAnchor="end" fill="#475569" fontFamily="'Instrument Sans', sans-serif" fontSize="10">
            Dynamic webhooks, transactional triggers
          </text>
        </g>

        {/* Node 5: Top Left (272, 178) - Feedback into BUILD */}
        <g transform="translate(272, 178)">
          <circle r="16" fill="#F0F7FD" stroke="#0284C7" strokeWidth="1.5" />
          <circle r="4" fill="#0284C7" />
          <text x="-24" y="-6" textAnchor="end" fill="#0B1320" fontFamily="'Instrument Sans', sans-serif" fontSize="12" fontWeight="600">
            05 // FEEDBACK LOOP TO BUILD
          </text>
          <text x="-24" y="10" textAnchor="end" fill="#0284C7" fontFamily="'Instrument Sans', sans-serif" fontSize="10" fontWeight="600">
            Telemetry directly drives next code sprint
          </text>
        </g>

        {/* Arrow glyph pointing back to Build */}
        <text
          x="285"
          y="235"
          fill="#0284C7"
          fontFamily="monospace"
          fontSize="18"
          transform="rotate(220 285 235)"
        >
          ➤
        </text>
      </svg>
    </div>
  );
}
