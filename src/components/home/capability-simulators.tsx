"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

// --- SIMULATOR 01: DIGITAL PLATFORMS (Responsive Viewport & Web Vitals) ---
export function PlatformSimulator() {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isReflowing, setIsReflowing] = useState(false);
  const [fps, setFps] = useState(60.0);

  const widths = {
    desktop: "w-full",
    tablet: "w-[72%] max-w-[480px]",
    mobile: "w-[45%] max-w-[280px]",
  };

  const handleReflow = () => {
    playTickSound();
    setIsReflowing(true);
    setTimeout(() => setIsReflowing(false), 800);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] text-zinc-500 uppercase mr-1">VIEWPORT:</span>
          {(["desktop", "tablet", "mobile"] as const).map((v) => (
            <button
              key={v}
              onClick={() => {
                playTickSound();
                setViewport(v);
              }}
              className={`font-mono text-[9px] font-black uppercase px-2.5 py-1 rounded transition-all cursor-pointer ${
                viewport === v
                  ? "bg-[#d8ff42] text-black shadow-[1.5px_1.5px_0px_#fff]"
                  : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              {v === "desktop" ? "1920px" : v === "tablet" ? "768px" : "375px"}
            </button>
          ))}
        </div>

        <button
          onClick={handleReflow}
          disabled={isReflowing}
          className="font-mono text-[9px] font-black uppercase px-3 py-1 rounded bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isReflowing ? "bg-[#ff1e90] animate-ping" : "bg-[#d8ff42]"}`} />
          {isReflowing ? "MEASURING..." : "TRIGGER REFLOW"}
        </button>
      </div>

      {/* Simulated Viewport Stage */}
      <div className="w-full h-52 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
        {/* Metric telemetry overlay */}
        <div className="absolute top-2 left-3 flex items-center gap-3 font-mono text-[8px] text-zinc-400 pointer-events-none z-20">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            CLS: 0.000
          </span>
          <span className="text-zinc-500">|</span>
          <span className="text-white">LCP: 0.62s</span>
          <span className="text-zinc-500">|</span>
          <span className="text-[#d8ff42]">TTFB: 24ms</span>
          <span className="text-zinc-500">|</span>
          <span className="text-zinc-400">FPS: 60.0</span>
        </div>

        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className={`h-40 bg-zinc-900 border border-zinc-700 rounded-lg p-3 flex flex-col justify-between transition-all duration-300 relative shadow-2xl ${widths[viewport]}`}
        >
          {/* Header Mock */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div className="w-12 h-2.5 bg-zinc-700 rounded" />
            <div className="flex gap-1.5">
              <div className="w-6 h-2 bg-zinc-800 rounded" />
              <div className="w-6 h-2 bg-zinc-800 rounded" />
              <div className="w-6 h-2 bg-[#d8ff42]/80 rounded" />
            </div>
          </div>

          {/* Body Content Mock */}
          <div className="space-y-2 py-1">
            <div className="w-3/4 h-3 bg-white/80 rounded" />
            <div className="w-1/2 h-2 bg-zinc-600 rounded" />
            
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <div className="h-9 bg-zinc-800 border border-zinc-700/50 rounded flex items-center justify-center">
                <div className="w-4 h-1.5 bg-[#d8ff42] rounded" />
              </div>
              <div className="h-9 bg-zinc-800 border border-zinc-700/50 rounded flex items-center justify-center">
                <div className="w-4 h-1.5 bg-[#ff1e90] rounded" />
              </div>
              <div className="h-9 bg-zinc-800 border border-zinc-700/50 rounded flex items-center justify-center">
                <div className="w-4 h-1.5 bg-zinc-600 rounded" />
              </div>
            </div>
          </div>

          {/* Footer Mock */}
          <div className="flex justify-between items-center text-[7px] font-mono text-zinc-500 pt-1 border-t border-zinc-800/80">
            <span>EDGE_RENDER // OK</span>
            <span className="text-[#d8ff42]">100% RESPONSIVE</span>
          </div>

          {isReflowing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#d8ff42]/10 backdrop-blur-[1px] rounded-lg border border-[#d8ff42] flex items-center justify-center"
            >
              <span className="font-mono text-[10px] font-black text-[#d8ff42] bg-black px-2 py-0.5 rounded border border-[#d8ff42]">
                LAYOUT SHIFT AUDIT: 0.0000 Δ
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// --- SIMULATOR 02: WEB APPLICATIONS (WebSocket State & RBAC) ---
export function StateSyncSimulator() {
  const [role, setRole] = useState<"ADMIN" | "ENGINEER" | "AUDITOR">("ADMIN");
  const [syncStatus, setSyncStatus] = useState<"IDLE" | "MUTATING" | "SYNCED">("IDLE");
  const [latency, setLatency] = useState(14);
  const [events, setEvents] = useState<string[]>([
    "Initial snapshot loaded from PostgreSQL",
    "WebSocket room channel connected: wss://edge.vistar.tech",
  ]);

  const handleMutate = () => {
    playTickSound();
    setSyncStatus("MUTATING");
    const id = Math.floor(1000 + Math.random() * 9000);
    const newLatency = Math.floor(11 + Math.random() * 8);
    setLatency(newLatency);

    setTimeout(() => {
      setSyncStatus("SYNCED");
      setEvents((prev) => [
        `[${role}] Record #${id} mutated → Optimistic UI (0ms) → DB ACK (${newLatency}ms)`,
        ...prev.slice(0, 3),
      ]);
      setTimeout(() => setSyncStatus("IDLE"), 1200);
    }, 450);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] text-zinc-500 uppercase mr-1">ACTIVE ROLE:</span>
          {(["ADMIN", "ENGINEER", "AUDITOR"] as const).map((r) => (
            <button
              key={r}
              onClick={() => {
                playTickSound();
                setRole(r);
              }}
              className={`font-mono text-[9px] font-black uppercase px-2 py-1 rounded transition-all cursor-pointer ${
                role === r
                  ? "bg-[#ff1e90] text-white shadow-[1.5px_1.5px_0px_#fff]"
                  : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <button
          onClick={handleMutate}
          disabled={syncStatus === "MUTATING"}
          className="font-mono text-[9px] font-black uppercase px-3 py-1 rounded bg-[#d8ff42] text-black hover:bg-white transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${syncStatus === "MUTATING" ? "bg-black animate-spin" : "bg-black"}`} />
          {syncStatus === "MUTATING" ? "SYNCING..." : "DISPATCH MUTATION"}
        </button>
      </div>

      {/* Sync Diagram & Live Stream */}
      <div className="w-full h-52 bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
        {/* Pipeline Nodes */}
        <div className="grid grid-cols-4 gap-2 relative z-10">
          <div className="bg-zinc-900 border border-zinc-700/70 p-2 rounded-lg text-center">
            <span className="font-mono text-[7px] text-zinc-400 uppercase block">NODE 01</span>
            <span className="font-mono text-[9px] font-black text-white">Client UI</span>
            <span className="font-mono text-[7px] text-emerald-400 block mt-0.5">Optimistic</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-700/70 p-2 rounded-lg text-center">
            <span className="font-mono text-[7px] text-zinc-400 uppercase block">NODE 02</span>
            <span className="font-mono text-[9px] font-black text-[#d8ff42]">WS Gateway</span>
            <span className="font-mono text-[7px] text-zinc-400 block mt-0.5">Event Bus</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-700/70 p-2 rounded-lg text-center">
            <span className="font-mono text-[7px] text-zinc-400 uppercase block">NODE 03</span>
            <span className="font-mono text-[9px] font-black text-[#ff1e90]">RBAC Policy</span>
            <span className="font-mono text-[7px] text-zinc-400 block mt-0.5">Role Guard</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-700/70 p-2 rounded-lg text-center">
            <span className="font-mono text-[7px] text-zinc-400 uppercase block">NODE 04</span>
            <span className="font-mono text-[9px] font-black text-white">PostgreSQL</span>
            <span className="font-mono text-[7px] text-emerald-400 block mt-0.5">ACID Truth</span>
          </div>
        </div>

        {/* Sync Ping Banner */}
        <div className="bg-zinc-900/90 border border-zinc-800 p-2.5 rounded-lg space-y-1">
          <div className="flex items-center justify-between text-[8px] font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${syncStatus === "MUTATING" ? "bg-[#ff1e90] animate-ping" : "bg-emerald-400"}`} />
              LATENCY: <strong className="text-white">{latency}ms</strong> ROUNDTRIP
            </span>
            <span className="text-[#d8ff42] font-black">WS // ACTIVE</span>
          </div>
          
          <div className="space-y-0.5">
            {events.map((ev, idx) => (
              <p key={idx} className="font-mono text-[8px] text-zinc-400 truncate">
                {ev}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SIMULATOR 03: AI & MULTI-AGENT SYSTEMS (Autonomous Tool-Calling) ---
export function AgentSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "READY: Multi-Agent Cluster standby on node cluster-04",
    "Isolation Forest ML loaded with 2,400 baseline telemetry vectors",
  ]);

  const runAudit = () => {
    playTickSound();
    setIsRunning(true);
    setLogs(["[00:00.002] INGESTION :: Vector stream packet #9240 received"]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "[00:00.008] RAG_POD :: Local embedding similarity evaluated (Score: 0.988)",
      ]);
    }, 300);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "[00:00.016] ISOLATION_FOREST :: Unsupervised model check completed (0 anomalies)",
      ]);
    }, 600);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "[00:00.021] DISPATCH :: Payload validated & forwarded to client gateway [200 OK]",
      ]);
      setIsRunning(false);
    }, 900);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#d8ff42] animate-pulse" />
          <span className="font-mono text-[9px] font-black text-white uppercase tracking-wider">
            NEURAL PODS: 3 ACTIVE
          </span>
        </div>

        <button
          onClick={runAudit}
          disabled={isRunning}
          className="font-mono text-[9px] font-black uppercase px-3 py-1 rounded bg-[#ff1e90] text-white hover:bg-white hover:text-black transition-all cursor-pointer flex items-center gap-1.5"
        >
          {isRunning ? "PROCESSING STREAM..." : "DISPATCH TELEMETRY QUERY"}
        </button>
      </div>

      {/* Terminal View */}
      <div className="w-full h-52 bg-zinc-950 border border-zinc-800 rounded-xl p-3 font-mono text-[9px] flex flex-col justify-between overflow-hidden">
        <div className="space-y-1.5 overflow-y-auto pr-1">
          <div className="flex items-center justify-between text-zinc-500 border-b border-zinc-800 pb-1 text-[8px]">
            <span>SYSTEM // MULTI-AGENT TELEMETRY PIPELINE</span>
            <span className="text-[#d8ff42]">STREAM_MODE: ISOLATED</span>
          </div>

          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-zinc-300 leading-relaxed font-medium"
            >
              <span className="text-[#d8ff42] mr-1.5">›</span>
              {log}
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-zinc-800 pt-2 text-[8px] text-zinc-500">
          <span>LATENCY: &lt;22ms</span>
          <span className="text-emerald-400 font-bold">100% ZERO-LEAK PRIVATE RAG</span>
        </div>
      </div>
    </div>
  );
}

// --- SIMULATOR 04: WORKFLOW AUTOMATION (Worker Queue Dispatch Runner) ---
export function WorkflowSimulator() {
  const [jobCount, setJobCount] = useState(148);
  const [isProcessing, setIsProcessing] = useState(false);
  const [workers, setWorkers] = useState([
    { id: "01", status: "BUSY", task: "Stripe Webhook Sync" },
    { id: "02", status: "IDLE", task: "Awaiting Payload" },
    { id: "03", status: "BUSY", task: "WhatsApp API Dispatch" },
  ]);

  const injectJobs = () => {
    playTickSound();
    setIsProcessing(true);
    setJobCount((c) => c + 50);
    setWorkers([
      { id: "01", status: "BUSY", task: "Lead Enrichment" },
      { id: "02", status: "BUSY", task: "PostgreSQL Upsert" },
      { id: "03", status: "BUSY", task: "Notification Trigger" },
    ]);

    setTimeout(() => {
      setIsProcessing(false);
      setWorkers([
        { id: "01", status: "IDLE", task: "Standby" },
        { id: "02", status: "BUSY", task: "Data Verification" },
        { id: "03", status: "IDLE", task: "Standby" },
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-zinc-400">
            QUEUE DEPTH: <strong className="text-[#d8ff42] font-black">{jobCount} JOBS</strong>
          </span>
          <span className="font-mono text-[9px] text-zinc-500">|</span>
          <span className="font-mono text-[9px] text-emerald-400">THROUGHPUT: 480/SEC</span>
        </div>

        <button
          onClick={injectJobs}
          disabled={isProcessing}
          className="font-mono text-[9px] font-black uppercase px-3 py-1 rounded bg-[#d8ff42] text-black hover:bg-white transition-all cursor-pointer"
        >
          {isProcessing ? "PROCESSING..." : "INJECT 50 JOBS"}
        </button>
      </div>

      {/* Live Worker Pool */}
      <div className="w-full h-52 bg-zinc-950 border border-zinc-800 rounded-xl p-3 flex flex-col justify-between">
        <div className="space-y-2">
          <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-wider block">
            CONCURRENT CONCURRENCY POOL (ASYNC DISPATCH)
          </span>

          {workers.map((w) => (
            <div
              key={w.id}
              className="bg-zinc-900 border border-zinc-800 p-2 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[8px] font-black px-1.5 py-0.5 rounded bg-zinc-800 text-white border border-zinc-700">
                  W-{w.id}
                </span>
                <span className="font-mono text-[9px] text-zinc-300 font-bold">{w.task}</span>
              </div>

              <span
                className={`font-mono text-[8px] font-black px-2 py-0.5 rounded ${
                  w.status === "BUSY"
                    ? "bg-[#ff1e90]/20 text-[#ff1e90] border border-[#ff1e90]/40 animate-pulse"
                    : "bg-emerald-950 text-emerald-400 border border-emerald-800"
                }`}
              >
                {w.status}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500 border-t border-zinc-800 pt-2">
          <span>AVG EXECUTION TIME: 14ms</span>
          <span className="text-[#d8ff42]">RETRY QUEUE: 0 DEAD LETTERS</span>
        </div>
      </div>
    </div>
  );
}

// --- SIMULATOR 05: API & DATA INTEGRATIONS (Bidirectional Event Bus) ---
export function IntegrationSimulator() {
  const [packetActive, setPacketActive] = useState(false);
  const [status, setStatus] = useState<"IDLE" | "ROUTING" | "DELIVERED">("IDLE");

  const sendPacket = () => {
    playTickSound();
    setPacketActive(true);
    setStatus("ROUTING");
    setTimeout(() => {
      setStatus("DELIVERED");
      setTimeout(() => {
        setPacketActive(false);
        setStatus("IDLE");
      }, 1000);
    }, 600);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
        <span className="font-mono text-[9px] text-zinc-400">
          EVENT BUS: <strong className="text-white">IDEMPOTENT GATEWAY</strong>
        </span>

        <button
          onClick={sendPacket}
          disabled={packetActive}
          className="font-mono text-[9px] font-black uppercase px-3 py-1 rounded bg-[#d8ff42] text-black hover:bg-white transition-all cursor-pointer"
        >
          {packetActive ? "ROUTING PAYLOAD..." : "EMIT WEBHOOK EVENT"}
        </button>
      </div>

      {/* Bus Routing Stage */}
      <div className="w-full h-52 bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="bg-zinc-900 border border-zinc-700 p-2.5 rounded-lg text-center w-24">
            <span className="font-mono text-[7px] text-zinc-400 block">ORIGIN</span>
            <span className="font-mono text-[9px] font-bold text-white">Stripe / Webhook</span>
          </div>

          <div className="flex-1 px-4 relative flex items-center justify-center">
            <div className="w-full h-0.5 bg-zinc-800 relative">
              {packetActive && (
                <motion.div
                  initial={{ left: "0%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-[#d8ff42] shadow-[0_0_8px_#d8ff42]"
                />
              )}
            </div>
            <span className="absolute -top-3 font-mono text-[7px] text-zinc-500 bg-zinc-950 px-1">
              TLS 1.3 / HMAC SIGNED
            </span>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 p-2.5 rounded-lg text-center w-24">
            <span className="font-mono text-[7px] text-zinc-400 block">DESTINATION</span>
            <span className="font-mono text-[9px] font-bold text-white">Postgres / CRM</span>
          </div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-2.5 rounded-lg flex items-center justify-between font-mono text-[8px]">
          <span className="text-zinc-400">
            SCHEMA VALIDATION: <strong className="text-emerald-400">OpenAPI 3.1 [VALID]</strong>
          </span>
          <span className={status === "DELIVERED" ? "text-[#d8ff42] font-black" : "text-zinc-500"}>
            STATUS: {status === "DELIVERED" ? "200 OK (ACK)" : status}
          </span>
        </div>
      </div>
    </div>
  );
}

// --- SIMULATOR 06: LEGACY MODERNIZATION (Strangler Fig Architecture) ---
export function ModernizationSimulator() {
  const [architecture, setArchitecture] = useState<"LEGACY" | "VISTAR_EDGE">("VISTAR_EDGE");

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] text-zinc-500 uppercase mr-1">STATE:</span>
          {(["LEGACY", "VISTAR_EDGE"] as const).map((a) => (
            <button
              key={a}
              onClick={() => {
                playTickSound();
                setArchitecture(a);
              }}
              className={`font-mono text-[9px] font-black uppercase px-2.5 py-1 rounded transition-all cursor-pointer ${
                architecture === a
                  ? a === "LEGACY"
                    ? "bg-red-500 text-white shadow-[1.5px_1.5px_0px_#fff]"
                    : "bg-[#d8ff42] text-black shadow-[1.5px_1.5px_0px_#fff]"
                  : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              {a === "LEGACY" ? "MONOLITH (BEFORE)" : "DECOUPLED EDGE (AFTER)"}
            </button>
          ))}
        </div>

        <span className="font-mono text-[9px] text-zinc-400">
          MIGRATION: <strong className="text-[#d8ff42]">ZERO DOWNTIME</strong>
        </span>
      </div>

      {/* Comparison Grid */}
      <div className="w-full h-52 bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-center space-y-1">
            <span className="font-mono text-[7px] text-zinc-400 uppercase block">GLOBAL TTFB</span>
            <span
              className={`font-mono text-base font-black ${
                architecture === "LEGACY" ? "text-red-400" : "text-[#d8ff42]"
              }`}
            >
              {architecture === "LEGACY" ? "3,420ms" : "28ms"}
            </span>
            <span className="font-mono text-[7px] text-zinc-500 block">
              {architecture === "LEGACY" ? "Monolith Bottleneck" : "Global Edge Network"}
            </span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-center space-y-1">
            <span className="font-mono text-[7px] text-zinc-400 uppercase block">DEPLOY VELOCITY</span>
            <span
              className={`font-mono text-base font-black ${
                architecture === "LEGACY" ? "text-red-400" : "text-white"
              }`}
            >
              {architecture === "LEGACY" ? "45 mins" : "38 secs"}
            </span>
            <span className="font-mono text-[7px] text-zinc-500 block">
              {architecture === "LEGACY" ? "Brittle Rollbacks" : "Atomic Previews"}
            </span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-center space-y-1">
            <span className="font-mono text-[7px] text-zinc-400 uppercase block">FAILURE ISOLATION</span>
            <span
              className={`font-mono text-base font-black ${
                architecture === "LEGACY" ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {architecture === "LEGACY" ? "Cascade Fail" : "Autonomous Pods"}
            </span>
            <span className="font-mono text-[7px] text-zinc-500 block">
              {architecture === "LEGACY" ? "Single Point Failure" : "100% Fault Tolerant"}
            </span>
          </div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-2 rounded-lg flex items-center justify-between text-[8px] font-mono text-zinc-400">
          <span>STRANGLER FIG REVERSE PROXY ROUTING: ACTIVE</span>
          <span className="text-[#d8ff42]">CI/CD GATES: VERIFIED</span>
        </div>
      </div>
    </div>
  );
}

// Master component switch
export function CapabilitySimulator({ capabilityNum }: { capabilityNum: string }) {
  switch (capabilityNum) {
    case "01":
      return <PlatformSimulator />;
    case "02":
      return <StateSyncSimulator />;
    case "03":
      return <AgentSimulator />;
    case "04":
      return <WorkflowSimulator />;
    case "05":
      return <IntegrationSimulator />;
    case "06":
      return <ModernizationSimulator />;
    default:
      return <PlatformSimulator />;
  }
}
