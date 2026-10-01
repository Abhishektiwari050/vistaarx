"use client";

import React, { useState, useEffect } from "react";
import { Globe, Zap, Play, Pause, Activity, CheckCircle2, AlertTriangle, ArrowRight, Server, ShieldCheck } from "lucide-react";

export function EdgeStreamingPipelineMotion({ className = "" }: { className?: string }) {
  const [pipelineMode, setPipelineMode] = useState<"streaming" | "monolith">("streaming");
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [latency, setLatency] = useState<number>(38);
  const [ttfb, setTtfb] = useState<number>(34);
  const [packetsDelivered, setPacketsDelivered] = useState<number>(284);

  // Micro-telemetry simulation
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      if (pipelineMode === "streaming") {
        setLatency(Math.floor(36 + Math.random() * 8));
        setTtfb(Math.floor(32 + Math.random() * 6));
        setPacketsDelivered((prev) => prev + 3);
      } else {
        setLatency(Math.floor(1650 + Math.random() * 300));
        setTtfb(Math.floor(1420 + Math.random() * 200));
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [isStreaming, pipelineMode]);

  const isStreamingMode = pipelineMode === "streaming";

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-black/15 bg-[#090A10] text-white shadow-xl ${className}`}
    >
      {/* Top Header & Telemetry Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-black/75 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isStreamingMode ? "bg-emerald-400 animate-pulse" : "bg-rose-500 animate-ping"
              }`}
            />
            <span className="font-mono text-xs font-semibold tracking-wider uppercase text-neutral-200">
              {isStreamingMode ? "ANYCAST EDGE STREAMING PIPELINE" : "BLOCKING MONOLITHIC WATERFALL"}
            </span>
          </div>

          <span className="hidden sm:inline-block px-2 py-0.5 rounded font-mono text-[10px] bg-white/10 text-neutral-400 border border-white/10">
            {isStreamingMode ? "PROTOCOL: HTTP/3 0-RTT" : "PROTOCOL: BLOCKING HTTP/1.1"}
          </span>
        </div>

        {/* Mode Switcher & Controls */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => setPipelineMode("streaming")}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
              isStreamingMode
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs"
                : "bg-white/10 text-neutral-400 hover:text-white"
            }`}
          >
            VISTAR Edge SSR
          </button>

          <button
            type="button"
            onClick={() => setPipelineMode("monolith")}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
              !isStreamingMode
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-xs"
                : "bg-white/10 text-neutral-400 hover:text-white"
            }`}
          >
            Monolithic Bundle
          </button>
        </div>
      </div>

      {/* Pipeline Visualization Stage */}
      <div className="relative w-full aspect-[21/9] min-h-[280px] sm:min-h-[340px] max-h-[440px] flex items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-[#090A10] via-[#0D101A] to-[#090A10]">
        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <svg
          viewBox="0 0 520 320"
          className="w-full h-full max-w-[860px] select-none"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="edgeConduitFast" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF3823" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="edgeConduitSlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#9F1239" stopOpacity="0.4" />
            </linearGradient>

            <filter id="packetGlowEdge">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Conduit Pipes */}
          {isStreamingMode ? (
            <>
              {/* Channel 1: Shell & Metadata */}
              <path
                d="M 80 120 C 160 120, 200 90, 260 90 C 320 90, 360 120, 440 120"
                fill="none"
                stroke="rgba(59, 130, 246, 0.4)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Channel 2: Server Component Stream (Main UI) */}
              <path
                d="M 80 160 C 160 160, 200 160, 260 160 C 320 160, 360 160, 440 160"
                fill="none"
                stroke="rgba(16, 185, 129, 0.6)"
                strokeWidth="2.5"
              />
              {/* Channel 3: Async Suspense Boundary (Data-heavy) */}
              <path
                d="M 80 200 C 160 200, 200 230, 260 230 C 320 230, 360 200, 440 200"
                fill="none"
                stroke="rgba(245, 158, 11, 0.4)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Streaming Flow Packets */}
              {isStreaming && (
                <>
                  <circle r="4" fill="#3B82F6" filter="url(#packetGlowEdge)">
                    <animateMotion
                      path="M 80 120 C 160 120, 200 90, 260 90 C 320 90, 360 120, 440 120"
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="5" fill="#10B981" filter="url(#packetGlowEdge)">
                    <animateMotion
                      path="M 80 160 C 160 160, 200 160, 260 160 C 320 160, 360 160, 440 160"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="4.5" fill="#F59E0B" filter="url(#packetGlowEdge)">
                    <animateMotion
                      path="M 80 200 C 160 200, 200 230, 260 230 C 320 230, 360 200, 440 200"
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </>
              )}
            </>
          ) : (
            // Monolithic Blocking Pipe
            <>
              <line
                x1="80"
                y1="160"
                x2="440"
                y2="160"
                stroke="url(#edgeConduitSlow)"
                strokeWidth="8"
                strokeDasharray="8 8"
              />
              {/* Giant Slow Blocking Blob */}
              <circle cx="260" cy="160" r="16" fill="#F43F5E" filter="url(#packetGlowEdge)">
                <animate
                  attributeName="cx"
                  values="100;420;100"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}

          {/* Node 1: Global Anycast Client */}
          <g transform="translate(80, 160)">
            <circle cx="0" cy="0" r="32" fill="#11131E" stroke="#3B82F6" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="22" fill="#090B12" />
            <text x="0" y="3" textAnchor="middle" fill="#60A5FA" fontSize="8" fontFamily="monospace" fontWeight="700">
              CLIENT
            </text>
            <text x="0" y="44" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="600">
              Browser / Mobile
            </text>
            <text x="0" y="55" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">
              HTTP/3 QUIC
            </text>
          </g>

          {/* Node 2: Anycast Edge Worker (Middle) */}
          <g transform="translate(260, 160)">
            <circle
              cx="0"
              cy="0"
              r="38"
              fill="#11131E"
              stroke={isStreamingMode ? "#10B981" : "#F43F5E"}
              strokeWidth="2"
              className="transition-colors duration-300"
            />
            <circle cx="0" cy="0" r="26" fill="#090B12" />
            <text
              x="0"
              y="3"
              textAnchor="middle"
              fill={isStreamingMode ? "#34D399" : "#FDA4AF"}
              fontSize="8"
              fontFamily="monospace"
              fontWeight="700"
            >
              EDGE POP
            </text>
            <text x="0" y="50" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="600">
              Cloudflare / Vercel
            </text>
            <text x="0" y="61" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">
              16 Anycast Regions
            </text>
          </g>

          {/* Node 3: Hydrated React 19 Client (Right) */}
          <g transform="translate(440, 160)">
            <circle
              cx="0"
              cy="0"
              r="32"
              fill="#11131E"
              stroke={isStreamingMode ? "#FF3823" : "#F43F5E"}
              strokeWidth="1.5"
            />
            <circle cx="0" cy="0" r="22" fill="#090B12" />
            <text
              x="0"
              y="3"
              textAnchor="middle"
              fill={isStreamingMode ? "#FF3823" : "#FDA4AF"}
              fontSize="8"
              fontFamily="monospace"
              fontWeight="700"
            >
              RENDER
            </text>
            <text x="0" y="44" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="600">
              Interactive DOM
            </text>
            <text x="0" y="55" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">
              {isStreamingMode ? "Zero TBT Waterfall" : "4.2MB Blocking JS"}
            </text>
          </g>
        </svg>
      </div>

      {/* Telemetry Dashboard Readouts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-black/75 border-t border-white/10 text-xs font-mono">
        <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            TIME TO FIRST BYTE (TTFB)
          </span>
          <span
            className={`font-semibold flex items-center gap-1.5 ${
              isStreamingMode ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {isStreamingMode ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                {ttfb}ms P95 GLOBAL
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5" />
                {ttfb}ms (BLOCKED)
              </>
            )}
          </span>
        </div>

        <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            LIGHTHOUSE SCORE
          </span>
          <span className={`font-semibold ${isStreamingMode ? "text-emerald-400" : "text-rose-400"}`}>
            {isStreamingMode ? "100 / 100 GRADE A" : "34 / 100 FAILING"}
          </span>
        </div>

        <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            EDGE PACKET PIPELINE
          </span>
          <span className="font-semibold text-white">
            {isStreamingMode ? `${packetsDelivered} CHUNKS STREAMED` : "1 MONOLITHIC CHUNK"}
          </span>
        </div>

        <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            CUMULATIVE LAYOUT SHIFT
          </span>
          <span className="font-semibold text-emerald-400">
            {isStreamingMode ? "CLS 0.000 PERFECT" : "CLS 0.380 POOR"}
          </span>
        </div>
      </div>
    </div>
  );
}
