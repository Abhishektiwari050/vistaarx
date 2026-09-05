"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

import { SpatialArchitectureStack } from "./spatial-architecture-stack";

interface Layer {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  example: string;
  tech: string[];
}

const LAYER_TELEMETRY: Record<string, { label: string; metric: string; status: string; detail: string }> = {
  "01": { label: "CORE WEB VITALS", metric: "CLS 0.000 // LCP 0.8s", status: "EDGE SYNC", detail: "GPU compositor frame timing: 16.6ms lock (60 FPS minimum SLA)" },
  "02": { label: "STREAMING SSR", metric: "TTFB 42ms // ZERO HYDRATION DELAY", status: "ONLINE", detail: "React 19 Server Actions with optimistic state transitions" },
  "03": { label: "TRANSACTION INTEGRITY", metric: "DETERMINISTIC ZOD PIPELINE", status: "VERIFIED", detail: "Multi-currency checkout & ledger locking with idempotency keys" },
  "04": { label: "DATA RELATIONAL POOL", metric: "ACID STRICT // 128 CONNECTIONS", status: "REPLICATED", detail: "Postgres connection pooling with sub-5ms Redis cache hit rate" },
  "05": { label: "BIDIRECTIONAL WEBHOOKS", metric: "HTTP 200 INGEST // 99.99% UP", status: "CONNECTED", detail: "CRM & ERP webhook streaming with dead-letter retry queues" },
  "06": { label: "ASYNC DISPATCH QUEUE", metric: "0.00% DROP // 16 CONCURRENT", status: "PROCESSING", detail: "BullMQ background workers processing scheduled jobs & cron" },
  "07": { label: "AGENTIC INFERENCE", metric: "TOOL-CALLING POD // 0.4s LATENCY", status: "ENGAGED", detail: "Private local RAG + isolated anomaly detection models" },
};

const LAYERS: Layer[] = [
  {
    id: "01",
    name: "01 // EXPERIENCE LAYER",
    subtitle: "Fluid, high-contrast, sub-100ms user interfaces",
    desc: "We construct bespoke customer-facing surfaces designed with microinteractions, zero layout shifts (CLS 0.000), and GPU-accelerated WebGL rendering when appropriate.",
    example: "Production flagship platforms, responsive web apps, interactive product configurators.",
    tech: ["Next.js 16 App Router", "React 19", "Tailwind CSS", "Framer Motion", "Three.js / WebGL"],
  },
  {
    id: "02",
    name: "02 // APPLICATION LAYER",
    subtitle: "Reactive state synchronizers & client portals",
    desc: "Full-stack application engines handling complex client permissions, role-based access control, responsive dashboards, and streaming state updates.",
    example: "B2B client portals, diagnostic dashboards, operations command centers.",
    tech: ["TypeScript", "Zustand", "Server Actions", "Streaming SSR"],
  },
  {
    id: "03",
    name: "03 // BUSINESS LOGIC LAYER",
    subtitle: "Immutable business rules & transaction pipelines",
    desc: "The heartbeat of the system. We codify domain rules, contract validation, payment capture, and data transformation so your business operates deterministically.",
    example: "Automated billing pipelines, multi-currency checkout, contract generation logic.",
    tech: ["Python / FastAPI", "Node.js", "Zod Strict Schemas", "Stripe API"],
  },
  {
    id: "04",
    name: "04 // DATA & STORAGE LAYER",
    subtitle: "Relational integrity, vector stores & edge caching",
    desc: "Robust, ACID-compliant relational databases combined with high-speed vector embeddings and globally replicated edge key-value stores.",
    example: "PostgreSQL databases, Redis cache, vector memory for contextual AI retrieval.",
    tech: ["PostgreSQL", "Supabase", "Redis", "Vector Embeddings"],
  },
  {
    id: "05",
    name: "05 // INTEGRATIONS LAYER",
    subtitle: "Seamless webhooks, CRMs & third-party sync",
    desc: "Connecting your technology stack to the outside world. Bidirectional synchronization with CRMs, payment gateways, ERPs, and custom enterprise REST/GraphQL APIs.",
    example: "Automated HubSpot/Salesforce sync, WhatsApp Cloud API, custom ERP ingest.",
    tech: ["Webhooks", "OpenAPI", "WhatsApp Cloud API", "OAuth 2.0"],
  },
  {
    id: "06",
    name: "06 // AUTOMATION LAYER",
    subtitle: "Background workers & asynchronous queue dispatch",
    desc: "Eliminating human busywork. Distributed workers execute background jobs, periodic cron tasks, automated invoice delivery, and customer notifications.",
    example: "Scheduled data reconciliation, instant order dispatch, customer re-engagement workflows.",
    tech: ["Celery / BullMQ", "Async Workers", "Event Brokers"],
  },
  {
    id: "07",
    name: "07 // AI & INTELLIGENCE LAYER",
    subtitle: "Autonomous agent pods & telemetry anomaly models",
    desc: "Targeted, reliable machine intelligence. We engineer multi-agent systems with tool-calling permissions, private local RAG pipelines, and real-time anomaly detection.",
    example: "Aviation NOTAM hazard decoding (Project VAYU), clinical telemetry anomaly engine (AURA).",
    tech: ["Multi-Agent Architecture", "Isolation Forest ML", "Local RAG (PyMuPDF)", "LLM Tool Calling"],
  },
];

export function ArchitectureLayersSection() {
  const [activeLayerId, setActiveLayerId] = useState("01");

  const selectedLayer = LAYERS.find((l) => l.id === activeLayerId) || LAYERS[0];
  const telemetry = LAYER_TELEMETRY[activeLayerId] || LAYER_TELEMETRY["01"];

  return (
    <section id="systems" className="py-24 px-6 sm:px-12 md:px-16 bg-white border-t-2 border-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 border-2 border-black bg-[#faf9f5] px-3.5 py-1.5 rounded-lg text-[9px] font-mono font-black tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#ff1e90]">
            <span className="w-2 h-2 rounded-full bg-[#ff1e90] inline-block" />
            04 // WHAT WE ACTUALLY ENGINEER
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-[#0a0a0a] leading-[0.95]">
            The 7-Layer <br />
            <span className="font-serif italic font-normal text-zinc-400 lowercase">
              systems architecture.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-zinc-600 leading-relaxed">
            Vistar doesn&apos;t merely design pages. We engineer interconnected technology infrastructure around your business operations. Pitch, yaw, or explode the 3D architectural stack below to inspect how each operational layer is codified.
          </p>
        </div>

        {/* 7-Layer Interactive Stack Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: 3D Spatial Architecture CAD Stack (6 Columns) */}
          <div className="lg:col-span-6 space-y-6">
            <SpatialArchitectureStack
              activeLayerId={activeLayerId}
              onSelectLayer={(id) => setActiveLayerId(id)}
            />

            {/* Quick Layer Switcher Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {LAYERS.map((layer) => {
                const isSelected = layer.id === activeLayerId;
                return (
                  <button
                    key={layer.id}
                    onClick={() => {
                      playTickSound();
                      setActiveLayerId(layer.id);
                    }}
                    className={`font-mono text-[9px] font-black uppercase px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer interactive ${
                      isSelected
                        ? "bg-black text-[#d8ff42] border-black shadow-[2px_2px_0px_#d8ff42]"
                        : "bg-[#faf9f5] text-zinc-600 border-black/15 hover:border-black hover:text-black"
                    }`}
                  >
                    L{layer.id}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Deep-Dive Console (6 Columns) */}
          <div className="lg:col-span-6 sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLayer.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-[#111111] text-white border-[2.5px] border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#000] space-y-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#d8ff42]">
                      LAYER SPECIFICATION // {selectedLayer.id}
                    </span>
                    <h3 className="font-display font-black text-2xl uppercase text-white">
                      {selectedLayer.name}
                    </h3>
                  </div>
                  <span className="font-mono text-[9px] font-bold px-2.5 py-1 rounded bg-[#d8ff42]/10 text-[#d8ff42] border border-[#d8ff42]/30 uppercase">
                    ACTIVE INSPECTION
                  </span>
                </div>

                {/* Real-time Telemetry Status Bar */}
                <div className="bg-black/60 border border-white/10 rounded-xl p-3.5 space-y-1.5 font-mono">
                  <div className="flex items-center justify-between text-[8px] uppercase tracking-wider text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {telemetry.label}
                    </span>
                    <span className="text-[#d8ff42] font-black">{telemetry.status}</span>
                  </div>
                  <div className="text-xs font-bold text-white tracking-wide">
                    {telemetry.metric}
                  </div>
                  <div className="text-[9px] text-zinc-400 font-sans">
                    {telemetry.detail}
                  </div>
                </div>

                {/* Function & Purpose */}
                <div className="space-y-2">
                  <span className="font-mono text-[8px] font-black uppercase tracking-widest text-zinc-400 block">
                    FUNCTION &amp; PURPOSE
                  </span>
                  <p className="font-sans text-sm text-zinc-300 leading-relaxed">
                    {selectedLayer.desc}
                  </p>
                </div>

                {/* Shipped Work Example */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2">
                  <span className="font-mono text-[8px] font-black uppercase tracking-widest text-[#ff1e90] block">
                    PRODUCTION EXAMPLE FROM SHIPPED WORK
                  </span>
                  <p className="font-sans text-xs text-white font-medium leading-relaxed">
                    {selectedLayer.example}
                  </p>
                </div>

                {/* Engineering Stack */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="font-mono text-[8px] font-black uppercase tracking-widest text-zinc-400 block">
                    CORE ENGINEERING STACK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedLayer.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] font-bold uppercase px-2.5 py-1 rounded bg-white/10 border border-white/20 text-[#d8ff42]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Spec Footer */}
                <div className="pt-2 flex justify-between items-center text-[9px] font-mono text-zinc-400 uppercase border-t border-white/10">
                  <span>ARCHITECTURE: ZERO VENDOR LOCK-IN</span>
                  <span className="text-[#d8ff42] font-black">100% CODE HANDOVER</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

