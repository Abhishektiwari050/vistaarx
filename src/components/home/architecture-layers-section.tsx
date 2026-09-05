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

const LAYERS: Layer[] = [
  {
    id: "01",
    name: "Experience Layer",
    subtitle: "Fluid, high-contrast, sub-100ms user interfaces",
    desc: "We construct custom customer-facing surfaces designed with microinteractions, zero layout shifts (CLS 0.000), and GPU-accelerated WebGL rendering when appropriate.",
    example: "Production flagship platforms, responsive web apps, interactive product configurators.",
    tech: ["Next.js 16 App Router", "React 19", "Tailwind CSS", "Framer Motion", "Three.js / WebGL"],
  },
  {
    id: "02",
    name: "Application Layer",
    subtitle: "Reactive state synchronizers & client portals",
    desc: "Full-stack application engines handling complex client permissions, role-based access control, responsive dashboards, and streaming state updates.",
    example: "B2B client portals, diagnostic dashboards, operations command centers.",
    tech: ["TypeScript", "Zustand", "Server Actions", "Streaming SSR"],
  },
  {
    id: "03",
    name: "Business Logic Layer",
    subtitle: "Immutable business rules & transaction pipelines",
    desc: "The heartbeat of the system. We codify domain rules, contract validation, payment capture, and data transformation so your business operates deterministically.",
    example: "Automated billing pipelines, multi-currency checkout, contract generation logic.",
    tech: ["Python / FastAPI", "Node.js", "Zod Strict Schemas", "Stripe API"],
  },
  {
    id: "04",
    name: "Data & Storage Layer",
    subtitle: "Relational integrity, vector stores & edge caching",
    desc: "ACID-compliant relational databases combined with high-speed vector embeddings and globally replicated edge key-value stores.",
    example: "PostgreSQL databases, Redis cache, vector memory for contextual AI retrieval.",
    tech: ["PostgreSQL", "Supabase", "Redis", "Vector Embeddings"],
  },
  {
    id: "05",
    name: "Integrations Layer",
    subtitle: "Bespoke webhooks, CRMs & third-party sync",
    desc: "Connecting your technology stack to the outside world. Bidirectional synchronization with CRMs, payment gateways, ERPs, and custom enterprise REST/GraphQL APIs.",
    example: "Automated HubSpot/Salesforce sync, WhatsApp Cloud API, custom ERP ingest.",
    tech: ["Webhooks", "OpenAPI", "WhatsApp Cloud API", "OAuth 2.0"],
  },
  {
    id: "06",
    name: "Automation Layer",
    subtitle: "Background workers & asynchronous queue dispatch",
    desc: "Eliminating human busywork. Distributed workers execute background jobs, periodic cron tasks, automated invoice delivery, and customer notifications.",
    example: "Scheduled data reconciliation, instant order dispatch, customer re-engagement workflows.",
    tech: ["Celery / BullMQ", "Async Workers", "Event Brokers"],
  },
  {
    id: "07",
    name: "Intelligence Layer",
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
    <section id="systems" className="py-28 px-6 sm:px-12 md:px-16 bg-[#faf9f5] border-t border-black/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-black/80 bg-white px-3 py-1 rounded text-[9px] font-mono font-bold tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#d8ff42]">
            <span>03 // THE 7-LAYER SYSTEMS ARCHITECTURE</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-[#0a0a0a] leading-[0.95]">
            Physical systems. <br />
            <span className="font-serif italic font-normal text-zinc-500 lowercase">
              engineered layer by layer.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-zinc-700 leading-relaxed max-w-2xl">
            Vistar doesn&apos;t merely design pages. We engineer interconnected technology infrastructure around your business operations. Inspect how each operational layer is codified.
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

            {/* Layer Switcher Tabs */}
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
                    className={`font-mono text-[9px] font-bold uppercase px-3 py-1.5 rounded border transition-all cursor-pointer interactive ${
                      isSelected
                        ? "bg-black text-white border-black shadow-[2px_2px_0px_#d8ff42]"
                        : "bg-white text-zinc-600 border-black/20 hover:border-black hover:text-black"
                    }`}
                  >
                    L{layer.id} {layer.name.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Architectural Specification Console (6 Columns) */}
          <div className="lg:col-span-6 sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLayer.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-white text-black border border-black/80 rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#000] space-y-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                      LAYER // 0{selectedLayer.id}
                    </span>
                    <h3 className="font-display font-black text-2xl uppercase text-[#0a0a0a]">
                      {selectedLayer.name}
                    </h3>
                  </div>
                  <span className="font-mono text-[9px] font-bold px-2.5 py-1 rounded bg-[#faf9f5] border border-black/10 text-zinc-700 uppercase">
                    SPECIFICATION
                  </span>
                </div>

                {/* Subtitle */}
                <p className="font-mono text-xs text-zinc-600 font-medium">
                  {selectedLayer.subtitle}
                </p>

                {/* Function & Purpose */}
                <div className="space-y-2 border-t border-black/10 pt-4">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-400 block">
                    FUNCTION &amp; ARCHITECTURAL ROLE
                  </span>
                  <p className="font-sans text-sm text-zinc-700 leading-relaxed">
                    {selectedLayer.desc}
                  </p>
                </div>

                {/* Shipped Work Example */}
                <div className="bg-[#faf9f5] border border-black/10 p-4 rounded-xl space-y-2">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 block">
                    PRODUCTION DEPLOYMENT IN SHIPPED WORK
                  </span>
                  <p className="font-sans text-xs text-zinc-900 font-medium leading-relaxed">
                    {selectedLayer.example}
                  </p>
                </div>

                {/* Engineering Stack */}
                <div className="space-y-2 pt-2 border-t border-black/10">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-400 block">
                    CORE ENGINEERING STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLayer.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] font-medium px-2 py-0.5 rounded bg-[#faf9f5] border border-black/15 text-zinc-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Spec Footer */}
                <div className="pt-2 flex justify-between items-center text-[9px] font-mono text-zinc-400 uppercase border-t border-black/10">
                  <span>ARCHITECTURE: ZERO VENDOR LOCK-IN</span>
                  <span className="text-black font-bold">100% CODE HANDOVER</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
