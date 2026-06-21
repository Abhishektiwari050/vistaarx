"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Tech Stack Bento Grid — Apple-style feature showcase
// Replaces the orbital animation for a more informative, scannable layout
// ─────────────────────────────────────────────────────────────────────────────



const techStack = [
  {
    name: "Next.js 16",
    category: "Framework",
    desc: "Server components, Partial Prerendering, and Edge Runtime — every page delivered at sub-150ms TTFB globally.",
    metric: "<150ms",
    metricLabel: "Global TTFB",
    color: "#ffffff",
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.1)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="white" fillOpacity="0.15"/>
        <path d="M9 8l6 8M15 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    span: "col-span-2 row-span-2",
    large: true,
  },
  {
    name: "Three.js / WebGL",
    category: "3D Graphics",
    desc: "Custom GLSL shaders, particle systems, and post-processing bloom for immersive browser experiences.",
    metric: "60fps",
    metricLabel: "GL Render Rate",
    color: "#d8ff42",
    bg: "rgba(216,255,66,0.04)",
    border: "rgba(216,255,66,0.2)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 3l9 5v8l-9 5-9-5V8l9-5z" stroke="#d8ff42" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 3v13M3 8l9 5 9-5" stroke="#d8ff42" strokeWidth="1.5"/>
      </svg>
    ),
    span: "col-span-1 row-span-1",
    large: false,
  },
  {
    name: "Framer Motion",
    category: "Animation",
    desc: "Hardware-accelerated 60fps orchestration for micro-interactions and cinematic page transitions.",
    metric: "~16ms",
    metricLabel: "Frame Budget",
    color: "#ff1e90",
    bg: "rgba(255,30,144,0.04)",
    border: "rgba(255,30,144,0.2)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="12" cy="12" r="3" fill="#ff1e90"/>
        <circle cx="12" cy="12" r="7" stroke="#ff1e90" strokeWidth="1.5" strokeDasharray="4 3"/>
      </svg>
    ),
    span: "col-span-1 row-span-1",
    large: false,
  },
  {
    name: "TypeScript",
    category: "Language",
    desc: "Strict typing across every module — runtime errors eliminated before they reach production.",
    metric: "100%",
    metricLabel: "Type Coverage",
    color: "#3366ff",
    bg: "rgba(51,102,255,0.04)",
    border: "rgba(51,102,255,0.2)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="rgba(51,102,255,0.15)" stroke="#3366ff" strokeWidth="1.5"/>
        <path d="M8 14v1a3 3 0 006 0v-1M8 11h8M12 11v5" stroke="#3366ff" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    span: "col-span-1 row-span-1",
    large: false,
  },
  {
    name: "Tailwind CSS v4",
    category: "Styling",
    desc: "Zero-runtime CSS compilation using @layer directives — no bloated stylesheets, 100% custom design tokens.",
    metric: "0kb",
    metricLabel: "Runtime CSS",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.04)",
    border: "rgba(6,182,212,0.2)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M6 9c.5-2 1.5-3 3-3 2 0 2.5 1.5 4 1.5s2.5-1 3-2.5" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 15c.5-2 1.5-3 3-3 2 0 2.5 1.5 4 1.5s2.5-1 3-2.5" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    span: "col-span-1 row-span-1",
    large: false,
  },
  {
    name: "PostgreSQL + Supabase",
    category: "Database",
    desc: "Real-time subscriptions, row-level security, and edge functions — your data layer is production-hardened.",
    metric: "RLS",
    metricLabel: "Row Security",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.04)",
    border: "rgba(34,197,94,0.2)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <ellipse cx="12" cy="7" rx="8" ry="3" stroke="#22c55e" strokeWidth="1.5"/>
        <path d="M4 7v5c0 1.66 3.58 3 8 3s8-1.34 8-3V7" stroke="#22c55e" strokeWidth="1.5"/>
        <path d="M4 12v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" stroke="#22c55e" strokeWidth="1.5"/>
      </svg>
    ),
    span: "col-span-1 row-span-1",
    large: false,
  },
];

const methodologySteps = [
  { num: "01", title: "Discovery", desc: "Commercial goal mapping & user flow topology" },
  { num: "02", title: "Prototyping", desc: "Immersive 3D wireframes & interaction testbeds" },
  { num: "03", title: "Engineering", desc: "Modular React codebase with clean type-safe hooks" },
  { num: "04", title: "Optimization", desc: "Lighthouse audits, CDN tuning, and SLA provisioning" },
];

export function TechOrbit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  // Section enter/exit opacity
  const opacity = 1;

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-12"
      style={{ opacity }}
    >
      {/* Section label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none">
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/30">
          02 // Stack Architecture
        </span>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="font-mono text-[9px] text-[#d8ff42] font-bold uppercase tracking-[0.25em] block mb-2">
              Core Architecture
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white leading-none">
              Built on the<br />
              <span className="bg-gradient-to-r from-[#ff1e90] to-[#d8ff42] bg-clip-text text-transparent">
                Right Stack
              </span>
            </h2>
          </div>
          <p className="font-sans text-xs text-white/35 max-w-[240px] leading-relaxed">
            Every tool is chosen for performance, maintainability, and zero vendor lock-in.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 auto-rows-[120px]">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`${tech.span} relative rounded-2xl p-5 border flex flex-col justify-between group cursor-default overflow-hidden`}
              style={{
                background: tech.bg,
                borderColor: tech.border,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 30% 30%, ${tech.color}12 0%, transparent 65%)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg border" style={{ borderColor: tech.border, background: `${tech.color}10` }}>
                    {tech.icon}
                  </div>
                  <span
                    className="font-mono text-[7px] font-bold uppercase tracking-widest px-2 py-1 rounded border"
                    style={{ color: tech.color, borderColor: `${tech.color}30`, background: `${tech.color}10` }}
                  >
                    {tech.category}
                  </span>
                </div>
                <h3 className="font-display font-black text-white uppercase tracking-tight text-sm leading-tight">
                  {tech.name}
                </h3>
                {tech.large && (
                  <p className="font-sans text-[11px] text-white/40 leading-relaxed mt-2">
                    {tech.desc}
                  </p>
                )}
              </div>

              {/* Metric */}
              <div className="relative z-10 flex items-baseline gap-1.5 mt-2">
                <span className="font-display font-black text-2xl leading-none" style={{ color: tech.color }}>
                  {tech.metric}
                </span>
                <span className="font-mono text-[8px] text-white/30 uppercase tracking-wider">
                  {tech.metricLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Methodology strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {methodologySteps.map((step, i) => (
            <div
              key={step.num}
              className="bg-white/[0.025] border border-white/5 rounded-xl p-4 flex flex-col gap-1"
            >
              <span className="font-mono text-[8px] font-bold text-[#ff1e90] uppercase tracking-widest">
                {step.num}
              </span>
              <span className="font-display font-bold text-white text-sm uppercase tracking-tight">
                {step.title}
              </span>
              <span className="font-sans text-[10px] text-white/35 leading-snug">
                {step.desc}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
