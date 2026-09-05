"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

interface SystemStage {
  id: string;
  code: string;
  name: string;
  status: string;
  terminalOutput: string[];
  nodes: { id: string; label: string; x: number; y: number; type: "input" | "core" | "output" }[];
  connections: [string, string][];
}

const STAGES: SystemStage[] = [
  {
    id: "01",
    code: "SCHEMA",
    name: "01 // DOMAIN ARCHITECTURE",
    status: "SPECIFIED",
    terminalOutput: [
      "› [model] Defining business domain contracts...",
      "› [schema] Initializing PostgreSQL schemas & zero-trust auth",
      "› [api] Generating type-safe OpenAPI endpoints...",
      "✔ Architecture validated. Zero technical ambiguity.",
    ],
    nodes: [
      { id: "biz", label: "BUSINESS_LOGIC", x: 22, y: 30, type: "input" },
      { id: "data", label: "DATA_SCHEMA", x: 22, y: 70, type: "input" },
      { id: "spec", label: "SYSTEM_CORE", x: 50, y: 50, type: "core" },
      { id: "auth", label: "AUTH_GATEWAY", x: 78, y: 50, type: "output" },
    ],
    connections: [
      ["biz", "spec"],
      ["data", "spec"],
      ["spec", "auth"],
    ],
  },
  {
    id: "02",
    code: "CONNECT",
    name: "02 // SERVICE MESH",
    status: "SYNCHRONIZED",
    terminalOutput: [
      "› [mesh] Decoupling asynchronous message queues...",
      "› [stream] Establishing bi-directional WebSocket telemetry",
      "› [cache] Warming sub-100ms global Edge ISR layers...",
      "✔ All services interconnected. Zero latency bottlenecks.",
    ],
    nodes: [
      { id: "biz", label: "FRONTEND_SSR", x: 22, y: 25, type: "input" },
      { id: "data", label: "AI_ROUTER", x: 22, y: 75, type: "input" },
      { id: "spec", label: "MESSAGE_BUS", x: 50, y: 50, type: "core" },
      { id: "auth", label: "EDGE_RUNTIME", x: 76, y: 25, type: "output" },
      { id: "db", label: "DB_CLUSTER", x: 76, y: 75, type: "output" },
    ],
    connections: [
      ["biz", "spec"],
      ["data", "spec"],
      ["spec", "auth"],
      ["spec", "db"],
      ["auth", "db"],
    ],
  },
  {
    id: "03",
    code: "COMPILE",
    name: "03 // PERFORMANCE KERNEL",
    status: "OPTIMIZED",
    terminalOutput: [
      "› [turbopack] Tree-shaking unused dependencies...",
      "› [cwv] Enforcing strict 0.000 CLS and LCP < 1.1s",
      "› [shaders] Compiling GPU-accelerated WebGL geometry...",
      "✔ Production bundle compiled. 99+ Lighthouse verified.",
    ],
    nodes: [
      { id: "biz", label: "COMPILER", x: 22, y: 30, type: "input" },
      { id: "data", label: "ASSET_PIPELINE", x: 22, y: 70, type: "input" },
      { id: "spec", label: "P99_OPTIMIZER", x: 50, y: 50, type: "core" },
      { id: "auth", label: "ZERO_CLS_OUT", x: 76, y: 50, type: "output" },
    ],
    connections: [
      ["biz", "spec"],
      ["data", "spec"],
      ["spec", "auth"],
    ],
  },
  {
    id: "04",
    code: "DEPLOY",
    name: "04 // LIVE RUNTIME & HANDOVER",
    status: "LIVE // 100% OWNED",
    terminalOutput: [
      "› [edge] Broadcasting across 24 global edge nodes",
      "› [health] 99.99% availability & telemetry stream verified",
      "› [handover] 100% source code transferred to client GitHub",
      "✔ System operational. You own everything we built.",
    ],
    nodes: [
      { id: "biz", label: "GLOBAL_EDGE", x: 22, y: 50, type: "input" },
      { id: "spec", label: "LIVE_SYSTEM", x: 50, y: 50, type: "core" },
      { id: "auth", label: "CLIENT_GITHUB", x: 76, y: 30, type: "output" },
      { id: "tel", label: "ANALYTICS_HUD", x: 76, y: 70, type: "output" },
    ],
    connections: [
      ["biz", "spec"],
      ["spec", "auth"],
      ["spec", "tel"],
    ],
  },
];

export function SystemAssemblyVisual() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % STAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const currentStage = STAGES[activeIdx];

  return (
    <div className="w-full bg-[#111111] text-white border-[2.5px] border-black rounded-2xl shadow-[6px_6px_0px_#000] overflow-hidden flex flex-col justify-between select-none">
      
      {/* Console Top Control Bar */}
      <div className="bg-black border-b border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff1e90] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#d8ff42] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/30 inline-block" />
          </div>
          <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest pl-2">
            VISTAR KERNEL // SYSTEM PIPELINE
          </span>
        </div>

        {/* Stage Switcher Tabs */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
          {STAGES.map((s, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={s.id}
                onClick={() => {
                  playTickSound();
                  setAutoPlay(false);
                  setActiveIdx(idx);
                }}
                className={`px-2.5 py-1 rounded text-[9px] font-mono font-black uppercase tracking-wider transition-all interactive ${
                  isActive
                    ? "bg-[#d8ff42] text-black shadow-[1px_1px_0px_#000]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {s.code}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Visual Canvas (SVG Connected Node Graph) */}
      <div className="relative h-64 sm:h-72 w-full p-4 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#111] to-[#0a0a0a]">
        
        {/* Subtle grid lines background */}
        <div className="absolute inset-0 system-grid opacity-10 pointer-events-none" />

        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Animated Connecting Lines */}
          {currentStage.connections.map(([fromId, toId]) => {
            const fromNode = currentStage.nodes.find((n) => n.id === fromId);
            const toNode = currentStage.nodes.find((n) => n.id === toId);
            if (!fromNode || !toNode) return null;

            return (
              <g key={`${fromId}-${toId}`}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="rgba(216, 255, 66, 0.25)"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                />
                <circle
                  r="1.2"
                  fill="#d8ff42"
                  className="animate-pulse"
                >
                  <animate
                    attributeName="cx"
                    from={`${fromNode.x}`}
                    to={`${toNode.x}`}
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    from={`${fromNode.y}`}
                    to={`${toNode.y}`}
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Dynamic Nodes */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <AnimatePresence mode="popLayout">
            {currentStage.nodes.map((node) => (
              <motion.div
                key={`${currentStage.id}-${node.id}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.4 }}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute flex flex-col items-center pointer-events-auto"
              >
                <div
                  className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-md border text-[8px] sm:text-[9px] font-mono font-black tracking-wider uppercase whitespace-nowrap transition-all shadow-[2px_2px_0px_#000] ${
                    node.type === "core"
                      ? "bg-[#d8ff42] text-black border-black shadow-[3px_3px_0px_#ff1e90]"
                      : node.type === "output"
                      ? "bg-black text-[#ff1e90] border-[#ff1e90]/60"
                      : "bg-white/10 text-white border-white/20 backdrop-blur-sm"
                  }`}
                >
                  {node.label}
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d8ff42] mt-1 animate-ping" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Stage Status Watermark */}
        <div className="absolute bottom-3 right-4 font-mono text-[9px] font-extrabold uppercase tracking-widest text-zinc-500">
          STATUS: <span className="text-[#d8ff42]">{currentStage.status}</span>
        </div>
      </div>

      {/* Terminal Telemetry Log Output */}
      <div className="bg-black/95 border-t border-white/10 p-4 font-mono text-xs space-y-1">
        <div className="flex items-center justify-between text-[9px] text-zinc-500 border-b border-white/5 pb-1 mb-2">
          <span>{currentStage.name}</span>
          <span>STEP {currentStage.id} / 04</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className="space-y-1"
          >
            {currentStage.terminalOutput.map((line, i) => (
              <div
                key={i}
                className={`text-[11px] leading-relaxed ${
                  line.startsWith("✔")
                    ? "text-[#d8ff42] font-bold"
                    : "text-zinc-400"
                }`}
              >
                {line}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
