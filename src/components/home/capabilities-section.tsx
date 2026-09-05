"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

interface Capability {
  num: string;
  title: string;
  problem: string;
  approach: string;
  technology: string[];
  outcome: string;
}

const CAPABILITIES: Capability[] = [
  {
    num: "01",
    title: "Digital Platforms & Flagships",
    problem: "Generic templates with 3.5s+ load times that bleed high-ticket conversions and fail to represent your brand's true value.",
    approach: "Custom Next.js App Router architecture, zero-layout-shift UI (CLS 0.000), sub-100ms edge routing, and interactive WebGL shaders.",
    technology: ["Next.js 16", "React 19", "Tailwind CSS", "Three.js", "Edge Caching"],
    outcome: "99+ Lighthouse performance, +40–200% conversion velocity, and sub-100ms global TTFB.",
  },
  {
    num: "02",
    title: "Web Applications & Client Portals",
    problem: "Internal teams and clients stuck using disconnected spreadsheets, confusing interfaces, and slow legacy dashboards.",
    approach: "Full-stack reactive web applications with role-based access control (RBAC), real-time WebSocket state, and robust PostgreSQL data pipelines.",
    technology: ["TypeScript", "PostgreSQL", "Supabase", "FastAPI / Node", "Zustand"],
    outcome: "Eliminates operational bottlenecks, accelerates client onboarding, and guarantees single-source data truth.",
  },
  {
    num: "03",
    title: "AI & Multi-Agent Systems",
    problem: "Superficial chatbots that hallucinate, break production workflows, and cannot reliably touch real operational data.",
    approach: "Decoupled multi-agent pods communicating over message brokers, unsupervised anomaly detection models, and private local RAG.",
    technology: ["Python 3.11+", "Isolation Forest ML", "Multi-Agent Brokers", "Local RAG (PyMuPDF)"],
    outcome: "Autonomous data classification, real-time telemetry anomaly isolation (<20ms), and zero-leak corporate privacy.",
  },
  {
    num: "04",
    title: "Workflow Automation Engines",
    problem: "Employees spending 40% of their day on repetitive copy-pasting, lead routing, invoicing, and manual WhatsApp/Email follow-ups.",
    approach: "Custom background worker engines and webhooks that automatically capture leads, qualify intent, sync databases, and dispatch communications.",
    technology: ["Async Queues", "Webhook Pipelines", "WhatsApp Cloud API", "Stripe Automations"],
    outcome: "<10s lead response times, zero missed follow-ups, and hundreds of human hours reclaimed monthly.",
  },
  {
    num: "05",
    title: "API & Data Integrations",
    problem: "Isolated business tools that cannot speak to each other, creating fractured customer data and inconsistent financial reporting.",
    approach: "Bespoke bidirectional API sync pipelines, secure OAuth 2.0 gateways, and event-driven webhook orchestrations with retry logic.",
    technology: ["REST / GraphQL", "OpenAPI", "Event Buses", "Secure Token Vaults"],
    outcome: "Flawless real-time data synchronization across billing, CRM, ERP, and communication channels with 99.99% reliability.",
  },
  {
    num: "06",
    title: "Legacy System Modernization",
    problem: "Brittle, 10-year-old codebases that engineering teams are terrified to touch, blocking new feature releases and hiring.",
    approach: "Surgical incremental modernization. Decoupling monoliths, creating clean API boundaries, and migrating critical routes to Next.js with zero downtime.",
    technology: ["Incremental Migration", "Modern TypeScript", "Automated Testing", "CI/CD Gateways"],
    outcome: "Dramatic reduction in developer friction, 4x faster feature velocity, and eliminated security liabilities.",
  },
];

export function CapabilitiesSection() {
  const [activeNum, setActiveNum] = useState("01");

  const activeCapability = CAPABILITIES.find((c) => c.num === activeNum) || CAPABILITIES[0];

  return (
    <section id="capabilities" className="py-24 px-6 sm:px-12 md:px-16 bg-[#faf9f5] border-t-2 border-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-black/10 pb-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3.5 py-1.5 rounded-lg text-[9px] font-mono font-black tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#d8ff42]">
              <span className="w-2 h-2 rounded-full bg-[#d8ff42] inline-block" />
              05 // SYSTEM CAPABILITIES
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-[#0a0a0a] leading-[0.95]">
              Capabilities engineered for <br />
              <span className="font-serif italic font-normal text-zinc-400 lowercase">
                operational leverage.
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-zinc-600 leading-relaxed">
              We do not sell generic service packages. We engineer bespoke solutions mapped to: Problem → Approach → Technology → Outcome.
            </p>
          </div>

          <Link
            href="/contact"
            onClick={() => playTickSound()}
            className="shrink-0 bg-black text-[#d8ff42] font-mono font-black text-xs uppercase tracking-widest px-6 py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#d8ff42] hover:text-black transition-colors"
          >
            Commission A Capability →
          </Link>
        </div>

        {/* Interactive Capabilities Selector & Deep-Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 6 Capabilities List (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {CAPABILITIES.map((c) => {
              const isActive = c.num === activeNum;
              return (
                <button
                  key={c.num}
                  onClick={() => {
                    playTickSound();
                    setActiveNum(c.num);
                  }}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer interactive flex items-center justify-between gap-4 ${
                    isActive
                      ? "bg-white text-black border-black shadow-[4px_4px_0px_#ff1e90] translate-x-1"
                      : "bg-[#faf9f5] text-zinc-700 border-black/15 hover:border-black hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs font-black px-2 py-0.5 rounded border ${
                      isActive ? "bg-black text-[#d8ff42] border-black" : "bg-white text-zinc-400 border-black/10"
                    }`}>
                      {c.num}
                    </span>
                    <h3 className="font-display font-black text-base sm:text-lg uppercase tracking-tight">
                      {c.title}
                    </h3>
                  </div>
                  <span className={`font-mono text-xs font-black ${isActive ? "text-[#ff1e90]" : "text-zinc-400"}`}>
                    {isActive ? "●" : "→"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Problem → Approach → Tech → Outcome Display (7 Columns) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCapability.num}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-white border-[2.5px] border-black rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_#000] space-y-6"
              >
                <div className="flex items-center justify-between border-b-2 border-black/10 pb-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#ff1e90]">
                      CAPABILITY {activeCapability.num}
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-black">
                      {activeCapability.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[9px] font-black uppercase px-2.5 py-1 rounded bg-[#d8ff42] text-black border border-black shadow-[1.5px_1.5px_0px_#000]">
                    SPECIFIED
                  </span>
                </div>

                {/* 4-Step Architecture Flow */}
                <div className="space-y-4">
                  {/* Problem */}
                  <div className="bg-red-50/70 border border-red-200 p-4 rounded-xl space-y-1">
                    <span className="font-mono text-[8px] font-black uppercase tracking-widest text-red-600 block">
                      01 // THE BUSINESS PROBLEM
                    </span>
                    <p className="font-sans text-xs text-zinc-700 leading-relaxed font-medium">
                      {activeCapability.problem}
                    </p>
                  </div>

                  {/* Approach */}
                  <div className="bg-[#faf9f5] border border-black/15 p-4 rounded-xl space-y-1">
                    <span className="font-mono text-[8px] font-black uppercase tracking-widest text-[#0a0a0a] block">
                      02 // OUR ARCHITECTURAL APPROACH
                    </span>
                    <p className="font-sans text-xs text-zinc-800 leading-relaxed font-medium">
                      {activeCapability.approach}
                    </p>
                  </div>

                  {/* Technology */}
                  <div className="bg-black text-white p-4 rounded-xl space-y-2">
                    <span className="font-mono text-[8px] font-black uppercase tracking-widest text-[#d8ff42] block">
                      03 // PRODUCTION TECHNOLOGY
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeCapability.technology.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[9px] font-bold uppercase px-2.5 py-0.5 rounded bg-white/10 border border-white/20 text-[#d8ff42]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="bg-[#d8ff42]/15 border-2 border-black p-4 rounded-xl space-y-1 shadow-[2px_2px_0px_#000]">
                    <span className="font-mono text-[8px] font-black uppercase tracking-widest text-black block">
                      04 // VERIFIED BUSINESS OUTCOME
                    </span>
                    <p className="font-sans text-xs text-black font-bold leading-relaxed">
                      {activeCapability.outcome}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center border-t border-black/10">
                  <span className="font-mono text-[9px] text-zinc-400 uppercase">
                    DEPLOYMENT TIMELINE: 14–28 DAYS
                  </span>
                  <Link
                    href="/contact"
                    className="font-mono text-[10px] font-black uppercase text-[#ff1e90] hover:text-black transition-colors"
                  >
                    Discuss This Capability →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
