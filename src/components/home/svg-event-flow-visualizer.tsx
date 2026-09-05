"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

interface EventScenario {
  id: string;
  tag: string;
  name: string;
  triggerSource: string;
  scenario: string;
  totalLatency: string;
  stages: {
    nodeId: number;
    title: string;
    action: string;
    deltaMs: string;
  }[];
}

const EVENT_SCENARIOS: EventScenario[] = [
  {
    id: "01",
    tag: "AVIATION AI // PROJECT VAYU",
    name: "PILOT FLIGHT NOTAM AIRSPACE QUERY",
    triggerSource: "Next.js 15 Client GIS HUD",
    scenario: "Pilot requests real-time hazard threat assessment for Delhi (VIDP) to New York (KJFK) crossing 4 FIR airspaces.",
    totalLatency: "34ms",
    stages: [
      { nodeId: 1, title: "Edge Ingestion", action: "Geo-routed via closest Delhi Edge POP", deltaMs: "4ms" },
      { nodeId: 2, title: "Auth & Token", action: "Pilot token & flight dispatch clearance verified", deltaMs: "3ms" },
      { nodeId: 3, title: "Event Broker", action: "Route payload enqueued in high-priority async queue", deltaMs: "5ms" },
      { nodeId: 4, title: "AI / NLP Pod", action: "Raw NOTAM parsed with NLP hazard classification", deltaMs: "14ms" },
      { nodeId: 5, title: "Spatial Cache", action: "Briefing committed to Redis cache & Postgres log", deltaMs: "4ms" },
      { nodeId: 6, title: "Client Re-render", action: "Interactive GIS map illuminates warning corridor", deltaMs: "4ms" },
    ],
  },
  {
    id: "02",
    tag: "TELEMETRY ML // AURA",
    name: "CLINICAL 500Hz SENSOR BURST",
    triggerSource: "Biometric Sensor Gateway",
    scenario: "Patient monitor transmits high-frequency multi-lead ECG vital telemetry with sudden motion noise artifact.",
    totalLatency: "15ms",
    stages: [
      { nodeId: 1, title: "Edge Ingestion", action: "WebSocket binary packet ingested over TLS 1.3", deltaMs: "2ms" },
      { nodeId: 2, title: "Auth & Token", action: "Cryptographic device signature validated", deltaMs: "1ms" },
      { nodeId: 3, title: "Event Broker", action: "Distributed message broker fans out 10k msg/s stream", deltaMs: "2ms" },
      { nodeId: 4, title: "AI / NLP Pod", action: "Unsupervised Isolation Forest classifies motion spike", deltaMs: "6ms" },
      { nodeId: 5, title: "Spatial Cache", action: "False alarm suppressed; telemetry vector stored", deltaMs: "2ms" },
      { nodeId: 6, title: "Client Re-render", action: "Clinical dashboard remains calm (0 alarm fatigue)", deltaMs: "2ms" },
    ],
  },
  {
    id: "03",
    tag: "ENTERPRISE CRM // FASTAPI",
    name: "HIGH-TICKET DEAL STAGE CONVERSION",
    triggerSource: "Client Web Application Portal",
    scenario: "B2B client approves enterprise engineering statement of work; payment milestone authorized.",
    totalLatency: "21ms",
    stages: [
      { nodeId: 1, title: "Edge Ingestion", action: "Edge API route handles signed mutation", deltaMs: "3ms" },
      { nodeId: 2, title: "Auth & Token", action: "RBAC verifies signer authority & enterprise tenant", deltaMs: "3ms" },
      { nodeId: 3, title: "Event Broker", action: "Event bus triggers invoice & repo dispatch tasks", deltaMs: "4ms" },
      { nodeId: 4, title: "AI / NLP Pod", action: "FastAPI business logic runs milestone validation", deltaMs: "5ms" },
      { nodeId: 5, title: "Spatial Cache", action: "ACID commit to PostgreSQL with audit trail lock", deltaMs: "3ms" },
      { nodeId: 6, title: "Client Re-render", action: "Real-time deal board advances with live badge", deltaMs: "3ms" },
    ],
  },
  {
    id: "04",
    tag: "COMMERCE AUTOMATION // WEBHOOK",
    name: "CONCURRENT PAYMENT WEBHOOK SPIKE",
    triggerSource: "Stripe Webhook Gateway",
    scenario: "100 concurrent order checkout completion webhooks arrive during product drop burst.",
    totalLatency: "11ms",
    stages: [
      { nodeId: 1, title: "Edge Ingestion", action: "Edge gateway captures raw payload with HMAC signature", deltaMs: "2ms" },
      { nodeId: 2, title: "Auth & Token", action: "Cryptographic HMAC webhook secret verified", deltaMs: "1ms" },
      { nodeId: 3, title: "Event Broker", action: "Idempotent Redis lock prevents duplicate execution", deltaMs: "2ms" },
      { nodeId: 4, title: "AI / NLP Pod", action: "Worker pool dispatches receipt and inventory decrement", deltaMs: "3ms" },
      { nodeId: 5, title: "Spatial Cache", action: "PostgreSQL orders table atomically updated", deltaMs: "2ms" },
      { nodeId: 6, title: "Client Re-render", action: "Order status UI immediately updates without reload", deltaMs: "1ms" },
    ],
  },
];

const NODES = [
  { id: 1, code: "01", name: "Edge Ingestion", label: "Global Edge DNS & SSL", color: "#d8ff42" },
  { id: 2, code: "02", name: "Auth & Security", label: "RBAC & Token Gateway", color: "#ffffff" },
  { id: 3, code: "03", name: "Event Broker", label: "Distributed Message Bus", color: "#ff1e90" },
  { id: 4, code: "04", name: "Compute / AI Pod", label: "FastAPI & ML Inference", color: "#d8ff42" },
  { id: 5, code: "05", name: "Persistence Store", label: "PostgreSQL ACID & Cache", color: "#ffffff" },
  { id: 6, code: "06", name: "Reactive Broadcast", label: "WebSocket & Zero-CLS UI", color: "#d8ff42" },
];

export function SvgEventFlowVisualizer() {
  const [activeScenarioId, setActiveScenarioId] = useState("01");
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const scenario = EVENT_SCENARIOS.find((s) => s.id === activeScenarioId) || EVENT_SCENARIOS[0];

  const triggerSimulation = () => {
    playTickSound();
    setIsSimulating(true);
    setActiveStageIndex(1);

    const interval = setInterval(() => {
      setActiveStageIndex((prev) => {
        if (prev >= 6) {
          clearInterval(interval);
          setIsSimulating(false);
          return 6;
        }
        playTickSound();
        return prev + 1;
      });
    }, 420);
  };

  const selectScenario = (id: string) => {
    playTickSound();
    setActiveScenarioId(id);
    setActiveStageIndex(0);
    setIsSimulating(false);
  };

  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#09090b] text-white border-t-2 border-black relative overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1f1f23_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 border-2 border-white/20 bg-black px-3.5 py-1.5 rounded-lg text-[9px] font-mono font-black tracking-[2px] uppercase text-[#d8ff42] shadow-[2px_2px_0px_#d8ff42]">
              <span className="w-2 h-2 rounded-full bg-[#d8ff42] animate-pulse inline-block" />
              03.5 // REACTIVE ARCHITECTURE TRACE
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-white leading-[0.95]">
              What happens when <br />
              <span className="font-serif italic font-normal text-zinc-400 lowercase">
                a real-world event occurs.
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed">
              Don&apos;t settle for vague promises. Pick a live production scenario below and watch the vectorized circuit path trace data propagation through Vistar&apos;s 6 decoupled pipeline stages in real time.
            </p>
          </div>

          <button
            onClick={triggerSimulation}
            disabled={isSimulating}
            className="shrink-0 bg-[#d8ff42] text-black font-mono font-black text-xs uppercase tracking-widest px-6 py-4 rounded-xl border-2 border-[#d8ff42] shadow-[4px_4px_0px_#fff] hover:bg-white transition-all cursor-pointer flex items-center gap-2"
          >
            <span className={`w-2 h-2 rounded-full ${isSimulating ? "bg-[#ff1e90] animate-ping" : "bg-black"}`} />
            {isSimulating ? "TRACING VECTOR PATH..." : "RUN LIVE TRACE →"}
          </button>
        </div>

        {/* 4 Interactive Event Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {EVENT_SCENARIOS.map((s) => {
            const isSelected = s.id === activeScenarioId;
            return (
              <button
                key={s.id}
                onClick={() => selectScenario(s.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? "bg-[#16161b] border-[#d8ff42] shadow-[4px_4px_0px_#d8ff42]"
                    : "bg-black/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[8px] font-mono font-bold uppercase pb-1">
                    <span className={isSelected ? "text-[#ff1e90]" : "text-zinc-500"}>{s.tag}</span>
                    <span className={isSelected ? "text-[#d8ff42]" : "text-zinc-500"}>S-{s.id}</span>
                  </div>
                  <h4 className="font-display font-black text-xs sm:text-sm uppercase text-white leading-tight">
                    {s.name}
                  </h4>
                </div>

                <div className="pt-2 border-t border-zinc-800 text-[9px] font-mono flex items-center justify-between">
                  <span className="text-zinc-500">SLA LATENCY:</span>
                  <strong className={isSelected ? "text-[#d8ff42]" : "text-zinc-300"}>
                    {s.totalLatency}
                  </strong>
                </div>
              </button>
            );
          })}
        </div>

        {/* Scenario Description Banner */}
        <div className="bg-zinc-900/90 border border-zinc-800 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-[8px] font-black uppercase tracking-widest text-[#d8ff42]">
              TRIGGER SOURCE: {scenario.triggerSource}
            </span>
            <p className="font-sans text-xs sm:text-sm text-zinc-300 font-medium">
              &quot;{scenario.scenario}&quot;
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-black border border-zinc-800 px-3 py-1.5 rounded-lg text-right font-mono">
              <span className="text-[7px] text-zinc-500 uppercase block">END-TO-END LATENCY</span>
              <span className="text-sm font-black text-[#d8ff42]">{scenario.totalLatency}</span>
            </div>
          </div>
        </div>

        {/* Vectorized SVG Circuit Board Stage */}
        <div className="bg-black border-2 border-zinc-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          {/* Circuit PCB Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          {/* SVG Vectorized Circuit Tracks */}
          <div className="relative w-full overflow-x-auto pb-4">
            <div className="min-w-[840px] space-y-8">
              
              {/* Top Vector Circuit Path with Animated Traveling Pulse */}
              <div className="relative h-16 w-full flex items-center px-8">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                  {/* Background Track */}
                  <line
                    x1="60"
                    y1="32"
                    x2="780"
                    y2="32"
                    stroke="#27272a"
                    strokeWidth="3"
                    strokeDasharray="4 4"
                  />

                  {/* Active Vectorized Illuminated Path */}
                  <motion.line
                    x1="60"
                    y1="32"
                    x2={60 + (activeStageIndex > 0 ? (activeStageIndex / 6) * 720 : 0)}
                    y2="32"
                    stroke="#d8ff42"
                    strokeWidth="3"
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />
                </svg>

                {/* 6 Node Markers along the track */}
                <div className="w-full flex items-center justify-between relative z-10">
                  {NODES.map((node, i) => {
                    const isNodeActive = activeStageIndex >= node.id;
                    const isCurrentStage = activeStageIndex === node.id;

                    return (
                      <div key={node.id} className="flex flex-col items-center">
                        <motion.div
                          animate={{
                            scale: isCurrentStage ? 1.25 : 1,
                            borderColor: isNodeActive ? "#d8ff42" : "#3f3f46",
                          }}
                          className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-mono font-black text-xs transition-all duration-300 relative ${
                            isNodeActive
                              ? "bg-black text-[#d8ff42] border-[#d8ff42] shadow-[0_0_15px_#d8ff4260]"
                              : "bg-zinc-900 text-zinc-500 border-zinc-700"
                          }`}
                        >
                          {node.code}

                          {isCurrentStage && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ff1e90] animate-ping" />
                          )}
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Node Details Grid */}
              <div className="grid grid-cols-6 gap-3">
                {NODES.map((node) => {
                  const isNodeActive = activeStageIndex >= node.id;
                  const isCurrent = activeStageIndex === node.id;
                  const currentStageData = scenario.stages.find((s) => s.nodeId === node.id);

                  return (
                    <div
                      key={node.id}
                      className={`p-3 rounded-xl border transition-all ${
                        isCurrent
                          ? "bg-[#18181d] border-[#d8ff42] shadow-[0_0_20px_#d8ff4220]"
                          : isNodeActive
                          ? "bg-zinc-950 border-zinc-700"
                          : "bg-black/60 border-zinc-900 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[7px] font-mono text-zinc-500 pb-1">
                        <span>STAGE {node.code}</span>
                        <span className={isNodeActive ? "text-[#d8ff42] font-black" : "text-zinc-600"}>
                          +{currentStageData?.deltaMs}
                        </span>
                      </div>

                      <h5 className="font-display font-black text-[11px] uppercase text-white leading-tight">
                        {node.name}
                      </h5>

                      <p className="font-mono text-[8px] text-zinc-400 mt-1 leading-snug">
                        {node.label}
                      </p>

                      <div className="mt-2 pt-2 border-t border-zinc-800/80">
                        <span
                          className={`text-[8px] font-sans leading-tight block ${
                            isCurrent
                              ? "text-[#d8ff42] font-bold"
                              : isNodeActive
                              ? "text-zinc-300"
                              : "text-zinc-600"
                          }`}
                        >
                          {currentStageData?.action}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Real-Time Telemetry Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800 pt-4 mt-2 font-mono text-[9px] text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="text-[#d8ff42] font-black">ACTIVE PIPELINE STATUS:</span>
              <span>
                {activeStageIndex === 0
                  ? "STANDBY // READY TO SIMULATE"
                  : activeStageIndex < 6
                  ? `NODE 0${activeStageIndex} EXECUTING...`
                  : `COMPLETE: SLA MET IN ${scenario.totalLatency}`}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span>ZERO IN-FLIGHT PACKET DROP</span>
              <span className="text-zinc-600">|</span>
              <span className="text-emerald-400 font-bold">100% IDEMPOTENT</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
