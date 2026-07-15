"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Engineering DNA — Animated Metrics + Terminal System Readout
// ─────────────────────────────────────────────────────────────────────────────

const metrics = [
  { value: 60, suffix: "+", label: "Projects Deployed", color: "#ff1e90" },
  { value: 97, suffix: "", label: "Avg Lighthouse Score", color: "#d8ff42" },
  { value: 21, suffix: "d", label: "Fastest Delivery", color: "#3366ff" },
  { value: 100, suffix: "%", label: "Client Ownership", color: "#ff1e90" },
];

const capabilities = [
  "Full-stack Next.js applications with edge-first architecture",
  "Three.js / WebGL immersive experiences & interactive data viz",
  "AI-powered product layers using OpenAI, Gemini, Anthropic",
  "Custom CMS integrations & headless e-commerce stacks",
  "Real-time collaboration features with presence & sync",
  "Performance engineering: <1s TTFB, >95 Lighthouse, A11y AA",
];

const terminalLines = [
  { type: "cmd", text: "$ vistar-bench --target production --env global" },
  { type: "info", text: "→ Connecting to edge network (24 PoPs)..." },
  { type: "ok", text: "✓ CDN Cache Hit Rate: 97.4%" },
  { type: "ok", text: "✓ P95 TTFB (Global): 143ms" },
  { type: "ok", text: "✓ Core Web Vitals: LCP 0.9s | FID 8ms | CLS 0.01" },
  { type: "warn", text: "→ Running accessibility audit..." },
  { type: "ok", text: "✓ WCAG 2.1 AA: PASS (0 violations)" },
  { type: "ok", text: "✓ Lighthouse Performance: 97 / 100" },
  { type: "cmd", text: "$ vistar-deploy --zero-downtime" },
  { type: "ok", text: "✓ Build: 0 TypeScript errors" },
  { type: "ok", text: "✓ Deploy: Production live in 4.2s" },
  { type: "ok", text: "✓ SLA: 24Hr on-call provisioning active" },
];

function useCountUp(target: number, isActive: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) return;
    startRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive, target, duration]);

  return count;
}

function MetricCard({ metric, index, isActive }: {
  metric: typeof metrics[0];
  index: number;
  isActive: boolean;
}) {
  const count = useCountUp(metric.value, isActive, 1200 + index * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col gap-1.5 p-6 rounded-2xl border border-white/5 bg-white/[0.02] group overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 20% 20%, ${metric.color}10 0%, transparent 65%)`,
        }}
      />
      <div className="relative z-10">
        <div className="font-display font-black text-5xl leading-none tracking-tighter" style={{ color: metric.color }}>
          {count}
          <span className="text-3xl">{metric.suffix}</span>
        </div>
        <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/30 mt-2">
          {metric.label}
        </div>
        <div
          className="mt-3 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500"
          style={{ background: `linear-gradient(90deg, ${metric.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

function TerminalBlock({ isActive }: { isActive: boolean }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= terminalLines.length) clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, [isActive]);

  const colorMap: Record<string, string> = {
    cmd: "#d8ff42",
    info: "#3366ff",
    ok: "#22c55e",
    warn: "#ff1e90",
  };

  return (
    <div className="relative rounded-2xl border border-white/5 bg-[#080810] overflow-hidden h-full">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-[9px] text-white/25 ml-2 uppercase tracking-wider">
          vistar-bench v2.4 — production
        </span>
      </div>

      {/* Terminal content */}
      <div className="p-5 space-y-2 font-mono text-[11px] leading-relaxed">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className="transition-all duration-300"
            style={{ color: colorMap[line.type] ?? "#ffffff" }}
          >
            {line.text}
          </div>
        ))}
        {visibleLines < terminalLines.length && isActive && (
          <div className="flex items-center gap-1 text-white/30">
            <span className="inline-block w-1.5 h-3.5 bg-white/60 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

export function TechMetrics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden"
    >
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 80% 80%, rgba(216,255,66,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Section label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none">
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/30">
          04 // Engineering DNA
        </span>
      </div>

      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="font-mono text-[9px] text-[#ff1e90] font-bold uppercase tracking-[0.25em] block mb-2">
              Performance Benchmarks
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white leading-none">
              Numbers That<br />
              <span className="font-serif italic font-normal text-zinc-500 lowercase bg-none tracking-normal mr-2">don&apos;t</span>
              <span className="bg-gradient-to-r from-[#d8ff42] to-[#3366ff] bg-clip-text text-transparent">
                Lie
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Metrics strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {metrics.map((m, i) => (
            <MetricCard key={m.label} metric={m} index={i} isActive={isInView} />
          ))}
        </div>

        {/* Two-column layout: capabilities + terminal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-[240px]">
          {/* Capabilities list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 flex flex-col gap-2 overflow-hidden"
          >
            <span className="font-mono text-[8px] font-bold text-[#d8ff42] uppercase tracking-[0.25em] mb-1">
              What We Build
            </span>
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.07 }}
                className="flex items-start gap-2 font-sans text-[10px] text-white/40 leading-snug"
              >
                <svg viewBox="0 0 6 6" className="w-1.5 h-1.5 mt-1 flex-shrink-0 fill-[#ff1e90]">
                  <rect width="6" height="6" rx="0.5" />
                </svg>
                {cap}
              </motion.div>
            ))}
          </motion.div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            <TerminalBlock isActive={isInView} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
