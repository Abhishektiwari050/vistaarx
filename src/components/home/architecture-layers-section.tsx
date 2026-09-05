"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

interface Layer {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  example: string;
  tech: string[];
}

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
            Vistar doesn&apos;t merely design pages. We engineer interconnected technology infrastructure around your business operations. Click any layer below to inspect its architecture.
          </p>
        </div>

        {/* 7-Layer Interactive Stack Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Layer Selector Stack (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            {LAYERS.map((layer) => {
              const isSelected = layer.id === activeLayerId;
              return (
                <button
                  key={layer.id}
                  onClick={() => {
                    playTickSound();
                    setActiveLayerId(layer.id);
                  }}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all cursor-pointer interactive flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-black text-white border-black shadow-[4px_4px_0px_#d8ff42] translate-x-1"
                      : "bg-[#faf9f5] text-black border-black/15 hover:border-black hover:bg-white"
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`font-mono text-[9px] font-black uppercase tracking-widest block ${
                      isSelected ? "text-[#d8ff42]" : "text-zinc-400"
                    }`}>
                      LAYER {layer.id}
                    </span>
                    <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-tight">
                      {layer.name.replace(/^\d+\s*\/\/\s*/, "")}
                    </h3>
                    <p className={`font-sans text-xs line-clamp-1 ${
                      isSelected ? "text-zinc-300" : "text-zinc-500"
                    }`}>
                      {layer.subtitle}
                    </p>
                  </div>

                  <span className={`font-mono text-xs font-black ${
                    isSelected ? "text-[#d8ff42]" : "text-zinc-400"
                  }`}>
                    {isSelected ? "● ACTIVE" : "INSPECT →"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Deep-Dive Console (6 Columns) */}
          <div className="lg:col-span-6 sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLayer.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="bg-[#111111] text-white border-[2.5px] border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#000] space-y-6"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#d8ff42]">
                      LAYER SPECIFICATION // {selectedLayer.id}
                    </span>
                    <h3 className="font-display font-black text-2xl uppercase text-white">
                      {selectedLayer.name}
                    </h3>
                  </div>
                  <span className="font-mono text-[9px] font-bold px-2.5 py-1 rounded bg-white/10 text-white border border-white/20 uppercase">
                    CONNECTED
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-[8px] font-black uppercase tracking-widest text-zinc-400 block">
                    FUNCTION &amp; PURPOSE
                  </span>
                  <p className="font-sans text-sm text-zinc-300 leading-relaxed">
                    {selectedLayer.desc}
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2">
                  <span className="font-mono text-[8px] font-black uppercase tracking-widest text-[#ff1e90] block">
                    PRODUCTION EXAMPLE FROM SHIPPED WORK
                  </span>
                  <p className="font-sans text-xs text-white font-medium leading-relaxed">
                    {selectedLayer.example}
                  </p>
                </div>

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
