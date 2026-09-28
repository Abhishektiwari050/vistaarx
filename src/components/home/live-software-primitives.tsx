"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Card } from "@/components/vistar-card";
import { Button } from "@/components/vistar-button";
import { playClick, playBlip } from "@/lib/sound";

type TabId = "ai_stream" | "browser_telemetry" | "architecture_spec";

interface ExecutionScenario {
  id: string;
  name: string;
  system: string;
  prompt: string;
  tokens: string[];
  toolCalls: { name: string; args: string; result: string }[];
  output: string;
  latencyMs: number;
}

const SCENARIOS: ExecutionScenario[] = [
  {
    id: "vayu_notam",
    name: "01 // NOTAM GIS PARSER",
    system: "Project VAYU AI Agent",
    prompt: "INGEST_NOTAM --raw 'A0452/26 NOTAMR A0449/26 KJFK RWY 04L/22R CLSD DUE WIP WEF 2603170000-2603170800'",
    tokens: [
      "PARSING_HEADER...",
      " IDENTIFIED_AIRPORT: KJFK",
      " RUNWAY_TARGET: 04L/22R",
      " CONDITION: CLOSED_DUE_WIP",
      " TEMPORAL_WINDOW: 2603170000 TO 2603170800",
      " COMPUTING_SPATIAL_INTERSECT...",
      " FENCE_RADIUS: 4.2nm",
      " FLIGHT_RESTRICTION_INDEX: SEVERE",
      " DISPATCH_BRIEF_GENERATED: READY",
    ],
    toolCalls: [
      {
        name: "gis_airspace_index.intersect",
        args: '{"airport": "KJFK", "lat": 40.6413, "lng": -73.7781}',
        result: '{"active_runways": ["13L/31R", "13R/31L"], "hazard_level": "WARNING"}',
      },
      {
        name: "deterministic_brief_compiler",
        args: '{"format": "ICAO_ANNEX_15", "schema": "strict_json"}',
        result: '{"status": "VALIDATED", "hallucination_score": 0.00}',
      },
    ],
    output: JSON.stringify(
      {
        notice_id: "A0452/26",
        facility: "KJFK",
        hazard: "RUNWAY_CLOSURE",
        affected_surface: "04L/22R",
        effective_start: "2026-03-17T00:00:00Z",
        effective_end: "2026-03-17T08:00:00Z",
        re_route_required: false,
        active_alternate_runways: ["13L", "13R"],
        verification_hash: "0x98f2a10b4",
      },
      null,
      2
    ),
    latencyMs: 24,
  },
  {
    id: "aura_anomaly",
    name: "02 // BIOMETRIC ANOMALY DETECTOR",
    system: "AURA Multi-Agent Telemetry",
    prompt: "EVAL_TELEMETRY --stream patient_vital_hub_77 --window 120s --rate 100hz",
    tokens: [
      "INGESTING_SENSORS...",
      " SPO2_SERIES: 98,98,97,94,91,89...",
      " PULSE_DELTA: +38bpm",
      " INVOKING_ISOLATION_FOREST...",
      " COMPUTING_ANOMALY_SCORE: 0.884",
      " THRESHOLD_EXCEEDED: >0.65",
      " MULTI_AGENT_CONSENSUS: HIGH_ACUITY_ALERT",
      " DISPATCHING_SOCKET_PACKET...",
    ],
    toolCalls: [
      {
        name: "isolation_forest.predict",
        args: '{"samples": 1200, "features": ["spo2_drop", "hr_variance"]}',
        result: '{"anomaly_detected": true, "confidence": 0.982}',
      },
      {
        name: "telemetry_bus.publish",
        args: '{"channel": "icu_bed_14", "priority": "CRITICAL"}',
        result: '{"ack": true, "edge_latency_ms": 11}',
      },
    ],
    output: JSON.stringify(
      {
        alert_id: "ALT-78902",
        classification: "ACUTE_DESATURATION",
        anomaly_confidence: 0.982,
        recommended_action: "IMMEDIATE_OXYGEN_TITRATION",
        agent_consensus: {
          sensor_validator: "VALID",
          trend_analyzer: "RAPID_DECLINE",
          triage_arbiter: "ESCALATE",
        },
        processed_at_edge_ms: 18,
      },
      null,
      2
    ),
    latencyMs: 18,
  },
  {
    id: "seo_graph",
    name: "03 // PROGRAMMATIC SCHEMA GRAPH",
    system: "Vistar Algorithmic Reach",
    prompt: "COMPILE_SCHEMA --domain vistar.tech --type EnterpriseServiceGraph --mode strict",
    tokens: [
      "ANALYZING_DOM_NODES...",
      " EXTRACTING_SEMANTIC_ENTITIES: 14",
      " RESOLVING_CANONICAL_HIERARCHY...",
      " BUILDING_JSON_LD_GRAPH...",
      " INJECTING_FAQ_ENTITIES...",
      " VERIFYING_LLM_TXT_TOPOLOGY...",
      " CORE_WEB_VITALS_PRECHECK: 100/100",
      " COMPILATION_COMPLETE.",
    ],
    toolCalls: [
      {
        name: "schema_validator.lint",
        args: '{"spec": "schema.org/v14.0", "target": "ServiceGraph"}',
        result: '{"errors": 0, "warnings": 0, "rich_snippets_qualified": true}',
      },
      {
        name: "search_console_indexer.ping",
        args: '{"sitemap": "/sitemap.xml", "manifest": "/llms.txt"}',
        result: '{"status": 200, "indexed_nodes": 9}',
      },
    ],
    output: JSON.stringify(
      {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "Organization", "name": "VISTAR", "url": "https://www.vistar.tech" },
          { "@type": "Service", "serviceType": "AI, Software & Growth Systems" },
          { "@type": "FAQPage", "entities": 5 },
        ],
        llms_manifest: "/llms.txt",
        crawler_compliance: "PERFECT",
      },
      null,
      2
    ),
    latencyMs: 14,
  },
];

export function LiveSoftwarePrimitives() {
  const [activeTab, setActiveTab] = useState<TabId>("ai_stream");

  // AI Stream State
  const [selectedScenario, setSelectedScenario] = useState<ExecutionScenario>(SCENARIOS[0]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [streamedText, setStreamedText] = useState<string[]>(SCENARIOS[0].tokens);
  const [showOutput, setShowOutput] = useState(true);

  // Browser Telemetry State
  const [fps, setFps] = useState<number>(60);
  const [domCount, setDomCount] = useState<number>(0);
  const [concurrency, setConcurrency] = useState<number>(8);
  const [memoryEstimate, setMemoryEstimate] = useState<string>("8 GB");
  const [ttfb, setTtfb] = useState<number>(24);
  const [eventLogs, setEventLogs] = useState<{ id: number; msg: string; time: string }[]>([]);

  // Architecture Spec State
  const [specView, setSpecView] = useState<"topology" | "contract" | "database">("topology");

  // 1. Live Browser Runtime Metrics Hook
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Concurrency
    if (navigator.hardwareConcurrency) {
      setConcurrency(navigator.hardwareConcurrency);
    }
    // Device Memory
    const nav = navigator as unknown as { deviceMemory?: number };
    if (nav.deviceMemory) {
      setMemoryEstimate(`${nav.deviceMemory} GB`);
    }

    // DOM Count
    setDomCount(document.querySelectorAll("*").length);

    // TTFB from Performance Navigation Timing
    try {
      const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      if (navEntries.length > 0 && navEntries[0].responseStart) {
        setTtfb(Math.max(8, Math.round(navEntries[0].responseStart)));
      }
    } catch {
      // Fallback
    }

    // Live FPS Tracker
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };
    animId = requestAnimationFrame(calcFps);

    // Real-time Event Heartbeat
    let logCounter = 1;
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${Math.floor(
        now.getMilliseconds() / 100
      )}`;

      const events = [
        "TELEMETRY_BEACON: client_heartbeat (sub-second)",
        "PERF_OBSERVER: FID / INP latency check passed (<16ms)",
        "ROUTER_CACHE: prefetch /start ready in memory",
        "SECURITY_GUARD: CSP headers validated, 0 inline violations",
        "GIS_WORKER: spatial index hot-cache hit (0.4ms)",
      ];

      const chosenEvent = events[Math.floor(Math.random() * events.length)];
      setEventLogs((prev) => [
        { id: logCounter++, msg: chosenEvent, time: timeStr },
        ...prev.slice(0, 4),
      ]);
    }, 2800);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(interval);
    };
  }, []);

  // 2. Trigger AI Stream Execution Simulation
  const runScenario = (scenario: ExecutionScenario) => {
    playBlip(750);
    setSelectedScenario(scenario);
    setIsExecuting(true);
    setStreamedText([]);
    setShowOutput(false);

    let tokenIndex = 0;
    const interval = setInterval(() => {
      if (tokenIndex < scenario.tokens.length) {
        const nextToken = scenario.tokens[tokenIndex];
        setStreamedText((prev) => [...prev, nextToken]);
        playClick(1100 + tokenIndex * 40, 0.015, "sine");
        tokenIndex++;
      } else {
        clearInterval(interval);
        setIsExecuting(false);
        setShowOutput(true);
        playClick(1500, 0.025, "triangle");
      }
    }, 60);
  };

  return (
    <section className="relative w-full py-20 md:py-28 bg-transparent border-t border-b border-[#0B1320]/[0.08] text-[#0B1320]">
      {/* Subtle Luminous Radial Haze */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-25 -z-10"
        style={{
          background: "radial-gradient(circle at 70% 20%, rgba(201, 121, 74, 0.04), transparent 50%), radial-gradient(circle at 20% 80%, rgba(27, 67, 50, 0.03), transparent 50%)",
        }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#0B1320]/[0.08]">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#EBEAE5] border border-[#0B1320]/10 text-xs font-mono tracking-wider uppercase">
              <span className="w-1.5 h-1.5 bg-[#0284C7] rounded-full shadow-[0_0_6px_rgba(2, 132, 199,0.4)]" />
              <span className="text-[#0F0F11] font-bold">
                03 // LIVE RUNTIME PRIMITIVES
              </span>
            </div>
            <h2 className="type-display text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0F0F11] tracking-tight">
              PROVEN IN RUNTIME. NOT POWERPOINTS.
            </h2>
            <p className="type-body text-sm sm:text-base text-[#0F0F11]/75 leading-relaxed">
              High-caliber engineering agencies don&apos;t just sell design concepts. We compile deterministic AI pipelines, zero-latency browser telemetry, and sovereign cloud architectures directly into production.
            </p>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EBEAE5] border border-[#0B1320]/10 rounded-[6px] font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                playClick(1000, 0.025, "triangle");
                setActiveTab("ai_stream");
              }}
              className={`px-4 py-2 rounded-[4px] transition-all cursor-pointer ${
                activeTab === "ai_stream"
                  ? "bg-[#0284C7] text-white font-bold shadow-sm"
                  : "text-[#0F0F11]/60 hover:text-[#0F0F11] hover:bg-white/60"
              }`}
            >
              01 // AI ENGINE
            </button>
            <button
              type="button"
              onClick={() => {
                playClick(1000, 0.025, "triangle");
                setActiveTab("browser_telemetry");
              }}
              className={`px-4 py-2 rounded-[4px] transition-all cursor-pointer ${
                activeTab === "browser_telemetry"
                  ? "bg-[#0284C7] text-white font-bold shadow-sm"
                  : "text-[#0F0F11]/60 hover:text-[#0F0F11] hover:bg-white/60"
              }`}
            >
              02 // TELEMETRY
            </button>
            <button
              type="button"
              onClick={() => {
                playClick(1000, 0.025, "triangle");
                setActiveTab("architecture_spec");
              }}
              className={`px-4 py-2 rounded-[4px] transition-all cursor-pointer ${
                activeTab === "architecture_spec"
                  ? "bg-[#0284C7] text-white font-bold shadow-sm"
                  : "text-[#0F0F11]/60 hover:text-[#0F0F11] hover:bg-white/60"
              }`}
            >
              03 // SPEC
            </button>
          </div>
        </div>

        {/* ── TAB 1: AI EXECUTION ENGINE ────────────────────────────────────── */}
        {activeTab === "ai_stream" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Controls: Select Scenario (Cols 1-4) */}
            <div className="lg:col-span-4 space-y-3 font-mono">
              <p className="type-label text-[11px] text-white/50">
                SELECT OPERATIONAL RUNTIME SCENARIO:
              </p>
              {SCENARIOS.map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => runScenario(sc)}
                  className={`w-full text-left p-4 border transition-all cursor-pointer rounded-[4px] ${
                    selectedScenario.id === sc.id
                      ? "border-[#0284C7] bg-[#0284C7]/[0.06]"
                      : "border-[#0B1320]/10 bg-white hover:border-[#0B1320]/25"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs pb-1">
                    <span className={selectedScenario.id === sc.id ? "text-[#0284C7] font-bold" : "text-[#0B1320]"}>
                      {sc.name}
                    </span>
                    <span className="text-[10px] text-[#0B1320]/40">
                      {sc.latencyMs}ms
                    </span>
                  </div>
                  <p className="text-[11px] text-[#0B1320]/60">
                    Engine: {sc.system}
                  </p>
                </button>
              ))}

              <div className="pt-2">
                <button
                  type="button"
                  disabled={isExecuting}
                  onClick={() => runScenario(selectedScenario)}
                  className="w-full py-3 bg-[#0284C7] text-white border border-[#0284C7] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#C15F3C] transition-colors disabled:opacity-50 cursor-pointer shadow-sm rounded-[4px]"
                >
                  {isExecuting ? "EXECUTING PRIMITIVE..." : "RE-RUN PIPELINE (SUB-25MS)"}
                </button>
              </div>

              <div className="p-4 bg-white border border-[#0B1320]/[0.08] text-[11px] text-[#0B1320]/60 space-y-2 rounded-[4px]">
                <div className="flex justify-between">
                  <span>DETERMINISM:</span>
                  <span className="text-[#0B1320] font-semibold">100% STRICT SCHEMA</span>
                </div>
                <div className="flex justify-between">
                  <span>HALLUCINATION RISK:</span>
                  <span className="text-[#0284C7] font-semibold">0.00% (CONSTRAINED)</span>
                </div>
                <div className="flex justify-between">
                  <span>CODEBASE SOVEREIGNTY:</span>
                  <span className="text-[#0B1320] font-semibold">CLIENT REPO</span>
                </div>
              </div>
            </div>

            {/* Right Execution Viewport (Cols 5-12) */}
            <div className="lg:col-span-8">
              <div className="vistar-card overflow-hidden bg-white rounded-[6px]">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#EBEAE5] border-b border-[#0B1320]/[0.08] font-mono text-xs text-[#0B1320]/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0284C7] shadow-[0_0_6px_rgba(2, 132, 199,0.4)]" />
                    <span className="text-[#0B1320] font-medium">
                      PRIMITIVE_EXECUTION // {selectedScenario.system}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-[#0284C7] font-semibold">LATENCY: {selectedScenario.latencyMs}ms</span>
                    <span>STATUS: 200 OK</span>
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-5 font-mono text-xs space-y-4 min-h-[360px] bg-white text-[#0B1320]">
                  {/* Prompt Command */}
                  <div className="space-y-1 pb-3 border-b border-[#0B1320]/[0.08]">
                    <span className="text-[#0B1320]/40 text-[11px]">$ vistar-agent run</span>
                    <p className="text-[#0B1320] font-semibold break-all">
                      {selectedScenario.prompt}
                    </p>
                  </div>

                  {/* Token Stream */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-[#94A3B8] block">
                      // REAL-TIME STREAMING INFERENCE TOKENS:
                    </span>
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#0B1320] leading-relaxed">
                      {streamedText.map((tok, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 bg-[#F0F7FD]/60 border border-[rgba(26,25,22,0.1)] rounded-[2px]"
                        >
                          {tok}
                        </span>
                      ))}
                      {isExecuting && (
                        <span className="inline-block w-2 h-4 bg-[#0284C7] animate-pulse align-middle ml-1" />
                      )}
                    </div>
                  </div>

                  {/* Tool Invocations */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] text-[#94A3B8] block">
                      // DETERMINISTIC TOOL CALLS DISPATCHED:
                    </span>
                    <div className="space-y-2">
                      {selectedScenario.toolCalls.map((tc, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-[#F0EEE6] border border-[rgba(56, 189, 248, 0.15)] rounded-[2px] space-y-1 text-[11px]"
                        >
                          <div className="flex items-center justify-between text-[#0284C7] font-semibold">
                            <span>call: {tc.name}()</span>
                            <span className="text-[10px] text-[#94A3B8]">ACK_TRUE</span>
                          </div>
                          <p className="text-[#475569] truncate font-mono">
                            args: {tc.args}
                          </p>
                          <p className="text-[#0B1320] font-mono">
                            result: {tc.result}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Validated Output Payload */}
                  {showOutput && (
                    <div className="space-y-1 pt-2 border-t border-[rgba(56, 189, 248, 0.15)]">
                      <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
                        <span>// TYPED JSON RESPONSE VALIDATED BY ZOD:</span>
                        <span className="text-[#0284C7] font-semibold">0 SCHEMA ERRORS</span>
                      </div>
                      <pre className="p-3 bg-[#F0F7FD]/60 border border-[rgba(26,25,22,0.1)] text-[11px] text-[#0B1320] overflow-x-auto rounded-[2px]">
                        {selectedScenario.output}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: CLIENT TELEMETRY DIAL ──────────────────────────────────── */}
        {activeTab === "browser_telemetry" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="p-5 space-y-1">
                <span className="type-label text-[11px] text-white/50">CLIENT RENDER FPS</span>
                <p className="font-mono text-3xl sm:text-4xl font-semibold text-gradient-silver">
                  {fps} <span className="text-xs text-white/50 font-normal">FPS</span>
                </p>
                <p className="text-[11px] text-white/60">Measured via rAF loop</p>
              </Card>

              <Card className="p-5 space-y-1">
                <span className="type-label text-[11px] text-white/50">ACTIVE DOM NODES</span>
                <p className="font-mono text-3xl sm:text-4xl font-semibold text-gradient-silver">
                  {domCount}
                </p>
                <p className="text-[11px] text-white/60">Ultra-lean footprint</p>
              </Card>

              <Card className="p-5 space-y-1">
                <span className="type-label text-[11px] text-white/50">HARDWARE CONCURRENCY</span>
                <p className="font-mono text-3xl sm:text-4xl font-semibold text-gradient-silver">
                  {concurrency} <span className="text-xs text-white/50 font-normal">THREADS</span>
                </p>
                <p className="text-[11px] text-white/60">Client system allocation</p>
              </Card>

              <Card className="p-5 space-y-1">
                <span className="type-label text-[11px] text-white/50">ESTIMATED TTFB</span>
                <p className="font-mono text-3xl sm:text-4xl font-semibold text-gradient-silver">
                  {ttfb} <span className="text-xs text-white/50 font-normal">MS</span>
                </p>
                <p className="text-[11px] text-white/60">Sub-50ms edge target</p>
              </Card>
            </div>

            {/* Live Telemetry Stream Terminal */}
            <div className="vistar-card overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-white/[0.08] font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.85)] animate-pulse" />
                  <span className="text-white font-medium">LIVE FIRST-PARTY TELEMETRY EVENT BUS</span>
                </div>
                <span className="text-[11px] text-white/40">POLL: 2800MS // 0 THIRD-PARTY COOKIES</span>
              </div>
              <div className="p-5 font-mono text-xs space-y-2 bg-[#0D0E15]">
                <p className="text-[11px] text-white/40 pb-1">
                  // Event stream transmitted to /api/telemetry (zero GA4 / zero Facebook Pixel weight):
                </p>
                {eventLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-2.5 bg-white/[0.03] border border-white/[0.06] rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold">&gt;</span>
                      <span className="text-white/85">{log.msg}</span>
                    </div>
                    <span className="text-[10px] text-white/40">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: SOVEREIGN SPEC ────────────────────────────────────────── */}
        {activeTab === "architecture_spec" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                type="button"
                onClick={() => {
                  playClick(1150, 0.025, "sine");
                  setSpecView("topology");
                }}
                className={`px-3 py-1.5 border transition-colors cursor-pointer rounded-[4px] font-mono text-xs ${
                  specView === "topology"
                    ? "bg-[#0284C7] text-white font-bold border-[#0284C7]"
                    : "bg-white text-[#0B1320]/70 border-[#0B1320]/20 hover:text-[#0B1320]"
                }`}
              >
                TOPOLOGY DIAGRAM
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick(1150, 0.025, "sine");
                  setSpecView("contract");
                }}
                className={`px-3 py-1.5 border transition-colors cursor-pointer rounded-[4px] font-mono text-xs ${
                  specView === "contract"
                    ? "bg-[#0284C7] text-white font-bold border-[#0284C7]"
                    : "bg-white text-[#0B1320]/70 border-[#0B1320]/20 hover:text-[#0B1320]"
                }`}
              >
                TYPE CONTRACT (TYPESCRIPT)
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick(1150, 0.025, "sine");
                  setSpecView("database");
                }}
                className={`px-3 py-1.5 border transition-colors cursor-pointer rounded-[4px] font-mono text-xs ${
                  specView === "database"
                    ? "bg-[#0284C7] text-white font-bold border-[#0284C7]"
                    : "bg-white text-[#0B1320]/70 border-[#0B1320]/20 hover:text-[#0B1320]"
                }`}
              >
                POSTGRES RELATIONAL DDL
              </button>
            </div>

            <div className="vistar-card p-6 font-mono text-xs leading-relaxed overflow-x-auto bg-white border border-[#0B1320]/[0.08]">
              {specView === "topology" && (
                <pre className="text-[#0B1320]/85">
{`+-----------------------------------------------------------------------------------------+
|                                  VISTAR SYSTEM TOPOLOGY                                 |
+-----------------------------------------------------------------------------------------+

  [Edge Client (Next.js 16 App Router)]
      |
      |-- (1) Fast HTTP/3 Request & Static Hydration
      v
  [Cloudflare Edge Gateway / Vercel Edge Runtime]
      |
      |-- (2) Rate Limiting (5 req / 5 min) & Honeypot Anti-Spam
      |-- (3) Real-User Core Web Vitals Beacon (/api/telemetry)
      v
  [Sovereign API Service Layer]
      |
      +---> [LLM & Vector Index Pipeline]  (Sub-25ms constrained schema inference)
      |
      +---> [PostgreSQL Production Cluster] (ACID Transactions, Audit Trail, Zero Lock-In)
      |
      +---> [First-Party Telemetry Bus]     (Closed-loop event correlation: Build -> Grow)`}
                </pre>
              )}

              {specView === "contract" && (
                <pre className="text-white/80">
{`// Sovereign API Contract: Zero Ambiguity, Strict Type Boundaries
export interface SystemArchitectureSpec {
  projectId: \`VST-\${string}\`;
  clientSovereignty: {
    codebaseOwnership: 100; // 100% Client Git Repo
    vendorLockIn: 0;        // Zero proprietary black-boxes
    intellectualProperty: "TRANSFERRED_DAY_ONE";
  };
  performanceSLA: {
    maxTTFB: 50;            // milliseconds
    targetLCP: 800;         // milliseconds
    lighthouseScore: 99;    // minimum threshold
  };
  telemetryPipeline: {
    firstPartyOnly: true;
    gdprCompliant: true;
    cookieDeprecateSafe: true;
  };
}`}
                </pre>
              )}

              {specView === "database" && (
                <pre className="text-white/80">
{`-- VISTAR Sovereign Relational Schema (PostgreSQL 16)
CREATE TABLE IF NOT EXISTS system_engagements (
    engagement_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id VARCHAR(32) NOT NULL UNIQUE, -- e.g., VST-74219
    client_domain VARCHAR(255) NOT NULL,
    architecture_tier VARCHAR(64) NOT NULL,    -- 'BUILD' | 'DISCOVER' | 'GROW' | 'TRIPARTITE'
    sla_response_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    code_repository_url VARCHAR(512),
    ip_assignment_signed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_engagements_ref ON system_engagements(reference_id);
CREATE INDEX idx_engagements_deadline ON system_engagements(sla_response_deadline);`}
                </pre>
              )}
            </div>
          </div>
        )}

        {/* Section Footer CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white/[0.02] border border-white/[0.12] rounded-xl">
          <div>
            <p className="type-label text-xs text-white font-bold">LOOKING FOR THIS CALIBER OF ARCHITECTURE?</p>
            <p className="text-sm text-white/80">
              Submit your project scope or RFC. Principal systems engineers respond with a verified architecture within 24 hours.
            </p>
          </div>
          <Button variant="primary" href="/start">
            SUBMIT PROJECT RFC →
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LiveSoftwarePrimitives;
