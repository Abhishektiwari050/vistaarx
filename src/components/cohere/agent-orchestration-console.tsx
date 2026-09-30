"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Shield, Cpu, Activity, Play, CheckCircle2, ArrowRight } from "lucide-react";

interface AgentPod {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  latency: string;
  accuracy: string;
  steps: {
    title: string;
    agent: string;
    status: "done" | "running" | "ready";
    detail: string;
  }[];
  inputPayload: string;
  toolCall: {
    tool: string;
    parameters: string;
    result: string;
  };
  outputPayload: string;
}

const AGENT_PODS: AgentPod[] = [
  {
    id: "vayu",
    name: "Aviation NOTAM & GIS Agent",
    subtitle: "Project VAYU Airspace Safety Pod",
    badge: "AVIONICS // GIS",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    latency: "<42ms",
    accuracy: "100% Deterministic",
    steps: [
      { title: "Ingest NOTAM Stream", agent: "Telemetry Ingestion Worker", status: "done", detail: "Parsed ICAO Annex 15 format from FAA & Eurocontrol feeds" },
      { title: "Compute Spatial Vector Geofence", agent: "Spatial Reasoning Kernel", status: "done", detail: "Calculated 4.2nm buffer on KJFK Runway 04L/22R" },
      { title: "Validate Conflict Boundaries", agent: "Deterministic Rule Engine", status: "done", detail: "Zero hallucination gate passed, schema strictly typed" },
      { title: "Dispatch Cockpit Briefing", agent: "VPC State Handover", status: "ready", detail: "Payload emitted to authenticated pilot EFB clients" },
    ],
    inputPayload: `{\n  "source": "FAA_NOTAM_FEED",\n  "airport": "KJFK",\n  "raw": "A0452/26 NOTAMR A0449/26 KJFK RWY 04L/22R CLSD DUE WIP",\n  "effective_window": "2026-03-17T00:00:00Z/2026-03-17T08:00:00Z"\n}`,
    toolCall: {
      tool: "gis_airspace_index.intersect",
      parameters: `{\n  "airport": "KJFK",\n  "surface": "04L/22R",\n  "lat": 40.6413,\n  "lng": -73.7781\n}`,
      result: `{\n  "active_runways": ["13L/31R", "13R/31L"],\n  "hazard_level": "WARNING",\n  "reroute_required": false\n}`,
    },
    outputPayload: `{\n  "status": "DISPATCH_READY",\n  "flight_hazard_index": 0.84,\n  "hallucination_score": 0.00,\n  "audit_hash": "0x98f2a10b4c81"\n}`,
  },
  {
    id: "aura",
    name: "Multi-Agent Biometric Anomaly Detector",
    subtitle: "AURA High-Acuity Telemetry Pod",
    badge: "HEALTHCARE // ML",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    latency: "<18ms",
    accuracy: "99.8% Precision",
    steps: [
      { title: "Stream 100Hz Sensor Array", agent: "Sensor Ingestion Agent", status: "done", detail: "Continuous SpO2, HRV, and mean arterial pressure tracking" },
      { title: "Unsupervised Isolation Forest", agent: "ML Inference Pod", status: "done", detail: "Real-time outlier calculation with rolling 120s sliding window" },
      { title: "Multi-Agent Alert Consensus", agent: "Clinical Arbiter Agent", status: "done", detail: "Cross-correlated vital drops against ambient noise artifacts" },
      { title: "Route Emergency Notification", agent: "VPC State Handover", status: "ready", detail: "High-priority WebSocket packet delivered to ICU central station" },
    ],
    inputPayload: `{\n  "stream_id": "icu_bed_14",\n  "window_seconds": 120,\n  "sample_rate_hz": 100,\n  "sensor_types": ["spo2", "pulse_rate", "map"]\n}`,
    toolCall: {
      tool: "isolation_forest.predict",
      parameters: `{\n  "window_samples": 12000,\n  "threshold_sigma": 3.2\n}`,
      result: `{\n  "anomaly_detected": true,\n  "acuity_score": 0.982,\n  "false_positive_risk": 0.002\n}`,
    },
    outputPayload: `{\n  "alert_id": "ALT-94021",\n  "classification": "ACUTE_DESATURATION",\n  "p99_latency_ms": 14.2,\n  "audit_hash": "0x4b7c19e31d02"\n}`,
  },
  {
    id: "competence",
    name: "Deterministic Schema & Operations Agent",
    subtitle: "Competence Enterprise Intelligence Pod",
    badge: "OPERATIONS // POSTGRES",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    latency: "<26ms",
    accuracy: "Strict Type Safety",
    steps: [
      { title: "Ingest Event Streams", agent: "Ledger Observer Agent", status: "done", detail: "Capture state mutations from CRM & financial gateways" },
      { title: "Validate Schema Contracts", agent: "JSON Schema Validator", status: "done", detail: "Enforce strict relational typing before persistence" },
      { title: "Execute Atomic Transactions", agent: "Postgres 16 Transaction Pod", status: "done", detail: "Zero-data-loss commit with cryptographically signed logs" },
      { title: "Sync Private Repository Handover", agent: "Git Handover Pipeline", status: "ready", detail: "Automated mirror to client-owned GitHub Enterprise repository" },
    ],
    inputPayload: `{\n  "action": "COMMIT_SETTLEMENT_RECORD",\n  "entity_id": "CORP-8840",\n  "currency": "USD",\n  "amount_cents": 4850000\n}`,
    toolCall: {
      tool: "pg_transaction.execute",
      parameters: `{\n  "isolation_level": "SERIALIZABLE",\n  "table": "settlement_ledger"\n}`,
      result: `{\n  "tx_status": "COMMITTED",\n  "block_time_ms": 3.8,\n  "rows_affected": 1\n}`,
    },
    outputPayload: `{\n  "tx_hash": "0xfe3820a1bc77",\n  "git_commit": "8f03c4a",\n  "codebase_ownership": "100% Client Sovereign"\n}`,
  },
];

export function AgentOrchestrationConsole() {
  const [selectedPodId, setSelectedPodId] = useState<string>("vayu");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(2);
  const [activeTab, setActiveTab] = useState<"pipeline" | "tool" | "output">("pipeline");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const activePod = AGENT_PODS.find((p) => p.id === selectedPodId) || AGENT_PODS[0];

  const handleSimulate = () => {
    setIsSimulating(true);
    setActiveStepIndex(0);
    const t1 = setTimeout(() => setActiveStepIndex(1), 400);
    const t2 = setTimeout(() => setActiveStepIndex(2), 850);
    const t3 = setTimeout(() => {
      setActiveStepIndex(3);
      setIsSimulating(false);
    }, 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
      <div className="rounded-xl border border-black/10 bg-[#FAF9F5] shadow-xl overflow-hidden">
        
        {/* Top Header Chrome */}
        <div className="flex flex-wrap items-center justify-between border-b border-black/10 bg-white px-5 py-3.5 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
            </div>
            <div className="h-4 w-px bg-black/10 mx-1" />
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-neutral-600" />
              <span className="font-mono text-xs font-semibold text-neutral-800 tracking-tight">
                VISTAR_AGENT_KERNEL // RUNTIME 4.2
              </span>
            </div>
          </div>

          {/* Pod Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-lg">
            {AGENT_PODS.map((pod) => (
              <button
                key={pod.id}
                type="button"
                onClick={() => {
                  setSelectedPodId(pod.id);
                  setActiveStepIndex(2);
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
                  selectedPodId === pod.id
                    ? "bg-white text-neutral-900 font-semibold shadow-xs"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                {pod.id.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Live System Badges */}
          <div className="hidden sm:flex items-center gap-4 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 text-neutral-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Latency: <strong className="text-neutral-900">{activePod.latency}</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 text-neutral-600">
              <Shield className="w-3.5 h-3.5 text-neutral-600" />
              VPC Air-Gapped
            </span>
          </div>
        </div>

        {/* Main Console Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-black/10 bg-[#FAF9F5]">
          
          {/* Left Column: Pod Identity & Execution Steps (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${activePod.badgeColor}`}>
                  {activePod.badge}
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  {activePod.accuracy}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 tracking-tight">
                  {activePod.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  {activePod.subtitle}
                </p>
              </div>

              {/* Execution Steps */}
              <div className="space-y-2.5 pt-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  Deterministic Execution Pipeline
                </div>
                {activePod.steps.map((step, idx) => {
                  const isCurrent = idx === activeStepIndex;
                  const isPassed = idx < activeStepIndex;
                  return (
                    <div
                      key={step.title}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-neutral-50 border-neutral-900 shadow-xs"
                          : isPassed
                          ? "bg-white border-neutral-200 opacity-90"
                          : "bg-white border-neutral-200 opacity-60 hover:opacity-90"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {isPassed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : isCurrent ? (
                            <span className="w-3.5 h-3.5 rounded-full bg-neutral-900 flex items-center justify-center text-[9px] text-white font-mono font-bold shrink-0">
                              {idx + 1}
                            </span>
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border border-neutral-300 flex items-center justify-center text-[9px] text-neutral-400 font-mono shrink-0">
                              {idx + 1}
                            </span>
                          )}
                          <span className="font-medium text-xs text-neutral-900">
                            {step.title}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-neutral-400">
                          {step.agent.split(" ")[0]}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-600 pl-5.5 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Run Action */}
            <div className="pt-2 flex items-center justify-between border-t border-neutral-100">
              <button
                type="button"
                onClick={handleSimulate}
                disabled={isSimulating}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isSimulating ? "Executing Pipeline..." : "Step Execution"}</span>
              </button>
              <span className="text-[11px] font-mono text-neutral-500">
                100% Repository Handover
              </span>
            </div>
          </div>

          {/* Right Column: Code & State Inspector Terminal (7 cols) */}
          <div className="lg:col-span-7 flex flex-col bg-[#0F1117] text-neutral-200">
            
            {/* Terminal Tab Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#0B0D13]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("pipeline")}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                    activeTab === "pipeline"
                      ? "bg-white/10 text-white font-medium"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  01 // INPUT STREAM
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("tool")}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                    activeTab === "tool"
                      ? "bg-white/10 text-white font-medium"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  02 // TOOL CALL
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("output")}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                    activeTab === "output"
                      ? "bg-white/10 text-white font-medium"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  03 // OUTPUT & AUDIT
                </button>
              </div>

              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                VERIFIED_JSON
              </span>
            </div>

            {/* Code / State Content */}
            <div className="p-5 font-mono text-xs overflow-x-auto flex-1 min-h-[300px] sm:min-h-[360px] flex flex-col justify-between">
              <div>
                {activeTab === "pipeline" && (
                  <div className="space-y-3">
                    <div className="text-neutral-400 text-[11px]">
                      // Real-time sensor stream emitted from edge gateway:
                    </div>
                    <pre className="text-emerald-300 leading-relaxed overflow-x-auto">
                      {activePod.inputPayload}
                    </pre>
                  </div>
                )}

                {activeTab === "tool" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                      <span>// Deterministic Tool Invocation:</span>
                      <span className="text-amber-400">{activePod.toolCall.tool}()</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-neutral-500 text-[10px] uppercase">Parameters:</span>
                      <pre className="text-sky-300 leading-relaxed overflow-x-auto">
                        {activePod.toolCall.parameters}
                      </pre>
                    </div>
                    <div className="space-y-1 pt-2 border-t border-white/5">
                      <span className="text-neutral-500 text-[10px] uppercase">Validated Return:</span>
                      <pre className="text-emerald-300 leading-relaxed overflow-x-auto">
                        {activePod.toolCall.result}
                      </pre>
                    </div>
                  </div>
                )}

                {activeTab === "output" && (
                  <div className="space-y-3">
                    <div className="text-neutral-400 text-[11px]">
                      // Cryptographically validated output payload for client VPC:
                    </div>
                    <pre className="text-amber-300 leading-relaxed overflow-x-auto">
                      {activePod.outputPayload}
                    </pre>
                  </div>
                )}
              </div>

              {/* Terminal Footer Telemetry */}
              <div className="pt-4 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-neutral-400">
                <span className="inline-flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Execution Latency: <strong className="text-white">{activePod.latency}</strong></span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-sky-400" />
                  <span>VPC Cloud: <strong className="text-white">AWS / GCP / Bare Metal</strong></span>
                </span>
                <span className="text-neutral-500">
                  Sprint Delivery: <strong>14 Days</strong>
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AgentOrchestrationConsole;
