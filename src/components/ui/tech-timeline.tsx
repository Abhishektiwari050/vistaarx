"use client";

import React from "react";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Horizontal Scroll-Driven Process Timeline
// ─────────────────────────────────────────────────────────────────────────────

interface TechTimelineProps {
  scrollProgress: number; // 0 → 1 within this section
}

const phases = [
  {
    id: "01",
    phase: "Discovery",
    title: "Systemic Discovery",
    subtitle: "Understanding your commercial vectors",
    desc: "We map your business targets to visual conversion architecture. Precise parameter variables, user session flows, and data scope — all outlined before a single line of code is written.",
    deliverables: [
      "Commercial Goal Mapping",
      "User Flow Topology",
      "Data Architecture Scope",
      "Competitor Benchmark Audit",
    ],
    timeframe: "Week 1",
    output: "Strategy Matrix",
    accent: "#ff1e90",
    outputBg: "rgba(255,30,144,0.1)",
  },
  {
    id: "02",
    phase: "Prototype",
    title: "Cinematic Prototyping",
    subtitle: "You interact with the experience first",
    desc: "High-fidelity interactive 3D concepts and responsive wireframes. You see and feel the actual experience before development begins — reducing costly revisions at later stages.",
    deliverables: [
      "Immersive 3D Wireframes",
      "Framer Motion Testbeds",
      "Typography Scale Audit",
      "Motion Design Blueprints",
    ],
    timeframe: "Weeks 2–3",
    output: "Interactive Prototypes",
    accent: "#d8ff42",
    outputBg: "rgba(216,255,66,0.1)",
  },
  {
    id: "03",
    phase: "Engineering",
    title: "High-Fidelity Build",
    subtitle: "Modular, production-ready React architecture",
    desc: "Clean, typed, tree-shakeable React modules compiled directly to the edge. All styles, animations, and assets are precision-engineered for flawless accessibility and locked rendering.",
    deliverables: [
      "Modular React Codebase",
      "Clean Type-Safe Hooks",
      "WCAG Accessibility Checks",
      "CI/CD Pipeline Setup",
    ],
    timeframe: "Weeks 4–6",
    output: "Production Codebase",
    accent: "#ff1e90",
    outputBg: "rgba(255,30,144,0.1)",
  },
  {
    id: "04",
    phase: "Launch",
    title: "Latency Optimization",
    subtitle: "Zero compromise on speed or security",
    desc: "Full Lighthouse audits, CDN cache tuning, and security testing before every deployment. We achieve sub-second load times and 24Hr SLA provisioning on all production systems.",
    deliverables: [
      "Lighthouse Speed Audit",
      "Global CDN Cache Tuning",
      "Security Penetration Test",
      "Direct SLA Provisioning",
    ],
    timeframe: "Week 7",
    output: "Deployment Ready",
    accent: "#d8ff42",
    outputBg: "rgba(216,255,66,0.1)",
  },
];

export function TechTimeline({ scrollProgress }: TechTimelineProps) {
  // Horizontal track movement
  const translateX = scrollProgress * -70;
  const cursorProgress = Math.min(scrollProgress * 1.15, 1);

  // Section enter opacity
  const opacity = scrollProgress > 0.02
    ? Math.min((scrollProgress - 0.02) / 0.1, 1)
    : 0;

  return (
    <div
      className="relative w-full h-screen flex flex-col justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Section header */}
      <div className="px-8 md:px-16 mb-10 select-none flex-shrink-0">
        <div className="flex items-end justify-between max-w-7xl mx-auto">
          <div className="space-y-2">
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/30">
              03 // Delivery Pipeline
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white leading-none">
              Build Lifecycle
            </h2>
            <p className="font-sans text-xs text-white/35 max-w-xs leading-relaxed pt-1">
              A battle-tested 4-phase delivery process refined across 60+ projects.
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="font-display text-2xl font-black text-[#d8ff42] leading-none">7</span>
            <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest">Weeks Avg</span>
          </div>
        </div>
      </div>

      {/* Track */}
      <div className="relative w-full overflow-hidden flex-shrink-0">
        {/* Track rail */}
        <div className="absolute top-[28px] left-8 md:left-16 right-0 h-px bg-white/5 z-0" />

        {/* Glow cursor on rail */}
        <div
          className="absolute top-[22px] z-10 w-3.5 h-3.5 rounded-full"
          style={{
            left: `calc(${6 + cursorProgress * 56}%)`,
            background: "radial-gradient(circle, #ff1e90 0%, #d8ff42 65%, transparent 100%)",
            boxShadow: "0 0 16px #ff1e90cc, 0 0 32px #d8ff4260",
            transition: "left 0.1s ease-out",
          }}
        />

        {/* Sliding card track */}
        <div
          className="flex gap-6 pl-8 md:pl-16 pr-[38vw] transition-transform duration-100 ease-out"
          style={{
            transform: `translateX(${translateX}%)`,
            willChange: "transform",
          }}
        >
          {phases.map((phase, idx) => {
            const cardStart = idx / phases.length;
            const cardVisible = cursorProgress > cardStart - 0.08;
            const cardProgress = Math.max(
              0,
              Math.min(1, (cursorProgress - cardStart) / 0.22)
            );

            return (
              <div
                key={phase.id}
                className="flex-shrink-0 w-[440px] sm:w-[480px]"
              >
                {/* Junction */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-500"
                    style={{
                      borderColor: cardVisible ? phase.accent : "rgba(255,255,255,0.1)",
                      backgroundColor: cardVisible ? phase.accent : "transparent",
                      boxShadow: cardVisible ? `0 0 20px ${phase.accent}70` : "none",
                    }}
                  >
                    {cardVisible && (
                      <div className="w-2 h-2 rounded-full bg-black" />
                    )}
                  </div>
                  <div
                    className="h-px flex-grow transition-all duration-700"
                    style={{
                      background: `linear-gradient(90deg, ${phase.accent}${cardVisible ? "50" : "10"}, transparent)`,
                    }}
                  />
                  <span
                    className="font-mono text-[8px] font-bold uppercase tracking-widest transition-all duration-500"
                    style={{ color: cardVisible ? phase.accent : "rgba(255,255,255,0.15)" }}
                  >
                    {phase.timeframe}
                  </span>
                </div>

                {/* Card */}
                <div
                  className="rounded-2xl border p-7 space-y-5 transition-all duration-600"
                  style={{
                    borderColor: cardVisible ? `${phase.accent}30` : "rgba(255,255,255,0.05)",
                    backgroundColor: cardVisible
                      ? "rgba(255,255,255,0.025)"
                      : "rgba(255,255,255,0.01)",
                    opacity: cardVisible ? 1 : 0.25,
                    transform: `translateY(${cardVisible ? 0 : 20}px)`,
                    boxShadow: cardVisible
                      ? `0 0 40px ${phase.accent}08, inset 0 1px 0 ${phase.accent}10`
                      : "none",
                  }}
                >
                  {/* Card header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span
                        className="font-mono text-[8px] font-extrabold uppercase tracking-[0.25em]"
                        style={{ color: phase.accent }}
                      >
                        Phase {phase.id} // {phase.phase}
                      </span>
                      <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight mt-1 leading-none">
                        {phase.title}
                      </h3>
                      <p className="font-sans text-[11px] text-white/35 mt-1">
                        {phase.subtitle}
                      </p>
                    </div>
                    <div
                      className="font-mono text-[8px] font-bold uppercase px-3 py-1.5 rounded border whitespace-nowrap ml-4"
                      style={{
                        color: phase.accent,
                        borderColor: `${phase.accent}30`,
                        background: phase.outputBg,
                      }}
                    >
                      {phase.output}
                    </div>
                  </div>

                  <p className="font-sans text-[11px] text-white/45 leading-relaxed border-t border-white/5 pt-4">
                    {phase.desc}
                  </p>

                  {/* Deliverables */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
                    {phase.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 font-sans text-[10px] text-white/50"
                        style={{
                          opacity: cardProgress > 0.3 ? 1 : 0,
                          transform: `translateX(${cardProgress > 0.3 ? 0 : 10}px)`,
                          transition: `all 0.4s ease ${i * 0.06}s`,
                        }}
                      >
                        <svg
                          viewBox="0 0 8 8"
                          className="w-1.5 h-1.5 flex-shrink-0"
                          fill={phase.accent}
                        >
                          <rect width="8" height="8" rx="1" />
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-8 md:px-16 mt-8 select-none flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="flex-grow h-px bg-white/5 relative overflow-hidden rounded-full">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${cursorProgress * 100}%`,
                background: "linear-gradient(90deg, #ff1e90, #d8ff42)",
                transition: "width 0.15s ease-out",
              }}
            />
          </div>
          <span className="font-mono text-[9px] text-white/20 font-bold uppercase tracking-wider whitespace-nowrap">
            {Math.round(cursorProgress * 100)}% Complete
          </span>
        </div>
      </div>
    </div>
  );
}
