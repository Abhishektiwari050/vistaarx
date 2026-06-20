"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Horizontal Scroll-Driven Process Timeline
// ─────────────────────────────────────────────────────────────────────────────

interface Phase {
  id: string;
  phase: string;
  title: string;
  desc: string;
  deliverables: string[];
  timeframe: string;
  output: string;
  accent: string;
}

interface TechTimelineProps {
  scrollProgress: number; // 0 → 1 within this section
}

const phases: Phase[] = [
  {
    id: "01",
    phase: "Phase 01",
    title: "Systemic Discovery",
    desc: "We map your commercial targets to visual conversion strategies. We outline the precise parameter variables, user session flows, and data architecture scopes needed to capture high-ticket clients.",
    deliverables: [
      "Commercial Goal Mapping",
      "User Flow Topology",
      "Data Schema Scope",
    ],
    timeframe: "Week 1",
    output: "Strategy Matrix",
    accent: "#ff1e90",
  },
  {
    id: "02",
    phase: "Phase 02",
    title: "Cinematic Prototyping",
    desc: "We construct high-fidelity interactive 3D concepts and web layouts. By rendering responsive wireframes and custom WebGL models early on, you interact with the actual experience before development starts.",
    deliverables: [
      "Immersive 3D wireframes",
      "Framer interaction testbeds",
      "Typography scale audit",
    ],
    timeframe: "Weeks 2-3",
    output: "Interactive Prototypes",
    accent: "#d8ff42",
  },
  {
    id: "03",
    phase: "Phase 03",
    title: "High-Fidelity Build",
    desc: "Our engineering team builds modular, production-ready React structures. All styles and assets are compiled straight to the edge for rapid loading, locked animations, and flawless accessibility.",
    deliverables: [
      "Modular React codebase",
      "Clean type-safe hooks",
      "Access boundary checks",
    ],
    timeframe: "Weeks 4-6",
    output: "Production Codebase",
    accent: "#ff1e90",
  },
  {
    id: "04",
    phase: "Phase 04",
    title: "Latency Optimization",
    desc: "We run speed audits and security testing. We fine-tune CDN caching and code execution threads, ensuring a highly performant application that delivers flawless conversions.",
    deliverables: [
      "Lighthouse speed audit",
      "Global CDN cache tuning",
      "Direct SLA provisioning",
    ],
    timeframe: "Week 7",
    output: "Deployment Ready",
    accent: "#d8ff42",
  },
];

export function TechTimeline({ scrollProgress }: TechTimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // How far the track has scrolled horizontally (in %)
  const translateX = scrollProgress * -75; // move 75% to the left over the scroll range
  // The glowing cursor position along the track
  const cursorProgress = Math.min(scrollProgress * 1.1, 1);

  return (
    <div className="relative w-full h-screen flex flex-col justify-center overflow-hidden">
      {/* Section header */}
      <div className="px-8 md:px-16 mb-12 select-none">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="space-y-2">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">
              Section 03 // Delivery Pipeline
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white">
              Build Lifecycle
            </h2>
          </div>
          <span className="font-mono text-[9px] text-white/20 font-bold uppercase tracking-wider hidden sm:block">
            4 Phases // 7 Weeks
          </span>
        </div>
      </div>

      {/* Track container */}
      <div className="relative w-full overflow-hidden">
        {/* The sliding track */}
        <div
          ref={trackRef}
          className="flex gap-8 pl-8 md:pl-16 pr-[40vw] transition-transform duration-100 ease-out"
          style={{
            transform: `translateX(${translateX}%)`,
            willChange: "transform",
          }}
        >
          {phases.map((phase, idx) => {
            // Card visibility based on cursor position
            const cardStart = idx / phases.length;
            const cardVisible = cursorProgress > cardStart - 0.1;
            const cardProgress = Math.max(
              0,
              Math.min(1, (cursorProgress - cardStart) / 0.25)
            );

            return (
              <div
                key={phase.id}
                className="flex-shrink-0 w-[380px] sm:w-[420px] relative"
              >
                {/* Junction marker */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-4 h-4 rounded-full border-2 transition-all duration-500"
                    style={{
                      borderColor: cardVisible ? phase.accent : "rgba(255,255,255,0.1)",
                      backgroundColor: cardVisible ? phase.accent : "transparent",
                      boxShadow: cardVisible
                        ? `0 0 16px ${phase.accent}60`
                        : "none",
                    }}
                  />
                  <div
                    className="h-px flex-grow transition-all duration-700"
                    style={{
                      background: `linear-gradient(90deg, ${phase.accent}${cardVisible ? "60" : "10"}, transparent)`,
                    }}
                  />
                </div>

                {/* Phase card */}
                <div
                  className="rounded-2xl border p-7 space-y-5 transition-all duration-700"
                  style={{
                    borderColor: cardVisible
                      ? `${phase.accent}30`
                      : "rgba(255,255,255,0.05)",
                    backgroundColor: cardVisible
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(255,255,255,0.01)",
                    opacity: cardVisible ? 1 : 0.3,
                    transform: `translateY(${cardVisible ? 0 : 20}px)`,
                  }}
                >
                  {/* Card header */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span
                      className="font-mono text-[9px] font-extrabold uppercase tracking-widest"
                      style={{ color: phase.accent }}
                    >
                      {phase.phase}
                    </span>
                    <span className="font-mono text-[9px] text-white/25 font-bold uppercase tracking-wider">
                      {phase.timeframe}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold uppercase text-white tracking-tight">
                    {phase.title}
                  </h3>

                  <p className="font-sans text-[11px] text-white/40 leading-relaxed">
                    {phase.desc}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-2 pt-2">
                    {phase.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-white/50 font-sans text-[10px]"
                        style={{
                          opacity: cardProgress > 0.3 ? 1 : 0,
                          transform: `translateX(${cardProgress > 0.3 ? 0 : 10}px)`,
                          transition: `all 0.4s ease ${i * 0.08}s`,
                        }}
                      >
                        <span style={{ color: phase.accent }} className="text-[8px]">
                          ✦
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-white/5 pt-3 flex justify-between items-center select-none">
                    <span className="font-mono text-[8px] font-bold text-white/20 uppercase">
                      Output: {phase.output}
                    </span>
                    <span
                      className="font-mono text-[8px] font-bold uppercase px-2 py-0.5 rounded border"
                      style={{
                        color: phase.accent,
                        borderColor: `${phase.accent}30`,
                        backgroundColor: `${phase.accent}10`,
                      }}
                    >
                      {phase.timeframe}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Track rail line */}
        <div className="absolute top-[22px] left-8 md:left-16 right-0 h-px bg-white/5 z-0" />

        {/* Travelling glow cursor */}
        <div
          className="absolute top-[15px] z-10 w-3 h-3 rounded-full"
          style={{
            left: `calc(${8 + cursorProgress * 60}%)`,
            background:
              "radial-gradient(circle, #ff1e90 0%, #d8ff42 60%, transparent 100%)",
            boxShadow: "0 0 20px #ff1e90, 0 0 40px #d8ff4280",
            transition: "left 0.1s ease-out",
          }}
        />
      </div>

      {/* Progress indicator */}
      <div className="px-8 md:px-16 mt-10 select-none">
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
