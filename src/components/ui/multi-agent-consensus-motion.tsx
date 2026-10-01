"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Play, CheckCircle2, ShieldCheck, Zap, Terminal, RefreshCw, Layers } from "lucide-react";

interface AgentNode {
  id: string;
  name: string;
  role: string;
  badge: string;
  cx: number;
  cy: number;
  accent: string;
  status: "idle" | "evaluating" | "verified";
}

const NODES: AgentNode[] = [
  {
    id: "planner",
    name: "Planner Kernel",
    role: "Task Graph Decomposition",
    badge: "AGENT 01",
    cx: 90,
    cy: 160,
    accent: "#FF3823",
    status: "verified",
  },
  {
    id: "tool",
    name: "Tool Dispatcher",
    role: "Typed Schema Invocations",
    badge: "AGENT 02",
    cx: 230,
    cy: 85,
    accent: "#3B82F6",
    status: "verified",
  },
  {
    id: "auditor",
    name: "Consensus Verifier",
    role: "Zero-Hallucination Gate",
    badge: "AGENT 03",
    cx: 230,
    cy: 235,
    accent: "#10B981",
    status: "verified",
  },
  {
    id: "state",
    name: "State Engine",
    role: "VPC Atomic Persistence",
    badge: "PERSIST",
    cx: 390,
    cy: 160,
    accent: "#F59E0B",
    status: "verified",
  },
];

export function MultiAgentConsensusMotion({ className = "" }: { className?: string }) {
  const [pulseActive, setPulseActive] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [inferencesCount, setInferencesCount] = useState<number>(14290);
  const [latencyMs, setLatencyMs] = useState<number>(84);

  // Live cycle simulation
  useEffect(() => {
    if (!pulseActive) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
      setInferencesCount((prev) => prev + 1);
      setLatencyMs(Math.floor(78 + Math.random() * 12));
    }, 1400);
    return () => clearInterval(interval);
  }, [pulseActive]);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-black/15 bg-[#090B12] text-white shadow-xl ${className}`}
    >
      {/* Top Header & Telemetry Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-black/70 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider uppercase text-neutral-200">
              AUTONOMOUS MULTI-AGENT CONSENSUS BUS
            </span>
          </div>

          <span className="hidden sm:inline-block px-2 py-0.5 rounded font-mono text-[10px] bg-white/10 text-neutral-400 border border-white/10">
            GRAPH: DETERMINISTIC DAG
          </span>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => setPulseActive((prev) => !prev)}
            className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/15 text-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {pulseActive ? (
              <>
                <Zap className="w-3 h-3 text-[#FF3823]" />
                <span>BUS STREAMING</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-400" />
                <span>RESUME PIPELINE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* SVG Multi-Agent Directed Acyclic Graph */}
      <div className="relative w-full aspect-[21/9] min-h-[280px] sm:min-h-[340px] max-h-[440px] flex items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-[#090B12] via-[#0E121E] to-[#090B12]">
        {/* Subtle Background Grid */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <svg
          viewBox="0 0 480 320"
          className="w-full h-full max-w-[840px] select-none"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="busLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF3823" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
            </linearGradient>

            <filter id="packetGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Conduit Connecting Lines */}
          {/* Path 1: Planner to Tool */}
          <path
            d="M 90 160 C 140 160, 160 85, 230 85"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Path 2: Planner to Auditor */}
          <path
            d="M 90 160 C 140 160, 160 235, 230 235"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Path 3: Tool to Auditor Cross-Sync */}
          <line
            x1="230"
            y1="85"
            x2="230"
            y2="235"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="1.5"
            strokeDasharray="2 3"
          />
          {/* Path 4: Tool to State */}
          <path
            d="M 230 85 C 300 85, 330 160, 390 160"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Path 5: Auditor to State */}
          <path
            d="M 230 235 C 300 235, 330 160, 390 160"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Animated Flow Packets */}
          {pulseActive && (
            <>
              {/* Packet along Path 1 */}
              <circle r="4" fill="#FF3823" filter="url(#packetGlow)">
                <animateMotion
                  path="M 90 160 C 140 160, 160 85, 230 85"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Packet along Path 2 */}
              <circle r="4" fill="#3B82F6" filter="url(#packetGlow)">
                <animateMotion
                  path="M 90 160 C 140 160, 160 235, 230 235"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Packet along Tool to State */}
              <circle r="4" fill="#10B981" filter="url(#packetGlow)">
                <animateMotion
                  path="M 230 85 C 300 85, 330 160, 390 160"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Packet along Auditor to State */}
              <circle r="4" fill="#F59E0B" filter="url(#packetGlow)">
                <animateMotion
                  path="M 230 235 C 300 235, 330 160, 390 160"
                  dur="2.1s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}

          {/* Agent Nodes */}
          {NODES.map((node, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <g key={node.id} transform={`translate(${node.cx}, ${node.cy})`}>
                {/* Outer Target Circle */}
                <circle
                  cx="0"
                  cy="0"
                  r="36"
                  fill="#11131F"
                  stroke={isCurrent ? node.accent : "rgba(255,255,255,0.15)"}
                  strokeWidth={isCurrent ? "2" : "1"}
                  className="transition-colors duration-300"
                />

                {/* Inner Pulse Ring */}
                {isCurrent && (
                  <circle
                    cx="0"
                    cy="0"
                    r="44"
                    fill="none"
                    stroke={node.accent}
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    className="animate-spin"
                    style={{ transformOrigin: "0 0", animationDuration: "6s" }}
                  />
                )}

                {/* Center Core */}
                <circle
                  cx="0"
                  cy="0"
                  r="26"
                  fill="#0B0D16"
                  stroke={node.accent}
                  strokeWidth="1.2"
                />

                {/* Node Status Dot */}
                <circle
                  cx="0"
                  cy="-8"
                  r="3"
                  fill={node.accent}
                  className={isCurrent ? "animate-ping" : undefined}
                />

                {/* Node Badge */}
                <text
                  x="0"
                  y="6"
                  textAnchor="middle"
                  fill="#FFF"
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="700"
                  letterSpacing="0.5"
                >
                  {node.badge}
                </text>

                {/* Labels Below Node */}
                <text
                  x="0"
                  y="48"
                  textAnchor="middle"
                  fill="#FFF"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {node.name}
                </text>
                <text
                  x="0"
                  y="60"
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="8.5"
                  fontFamily="monospace"
                >
                  {node.role}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Live Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-black/75 border-t border-white/10 text-xs font-mono">
        <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            CONSENSUS VERIFICATION
          </span>
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            UNANIMOUS (4/4 GATES)
          </span>
        </div>

        <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            HALLUCINATION RATE
          </span>
          <span className="font-semibold text-emerald-400">
            0.00% (STRICT SCHEMA)
          </span>
        </div>

        <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            PIPELINE INFERENCES
          </span>
          <span className="font-semibold text-white">
            {inferencesCount.toLocaleString()} EXECUTED
          </span>
        </div>

        <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            P95 LATENCY
          </span>
          <span className="font-semibold text-[#FF3823]">
            {latencyMs}ms DIRECT ASYNC
          </span>
        </div>
      </div>
    </div>
  );
}
