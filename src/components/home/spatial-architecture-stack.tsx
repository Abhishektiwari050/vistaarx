"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

interface LayerInfo {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  nodes: string[];
}

const STACK_LAYERS: LayerInfo[] = [
  {
    id: "01",
    name: "01 // EXPERIENCE",
    subtitle: "Fluid Edge UI / WebGL",
    color: "#d8ff42",
    nodes: ["Next.js 16", "WebGL Shaders", "Zero CLS"],
  },
  {
    id: "02",
    name: "02 // APPLICATION",
    subtitle: "State & Client Portals",
    color: "#ffffff",
    nodes: ["Server Actions", "Streaming SSR", "Zustand"],
  },
  {
    id: "03",
    name: "03 // BUSINESS LOGIC",
    subtitle: "Deterministic Pipelines",
    color: "#ff1e90",
    nodes: ["FastAPI Engine", "Zod Validation", "Stripe API"],
  },
  {
    id: "04",
    name: "04 // DATA & STORAGE",
    subtitle: "Postgres & Edge Vectors",
    color: "#d8ff42",
    nodes: ["PostgreSQL ACID", "Redis Cache", "Vector DB"],
  },
  {
    id: "05",
    name: "05 // INTEGRATIONS",
    subtitle: "Webhooks & Sync",
    color: "#ffffff",
    nodes: ["OpenAPI 3.1", "CRM Bidirectional", "OAuth 2.0"],
  },
  {
    id: "06",
    name: "06 // AUTOMATION",
    subtitle: "Async Worker Queues",
    color: "#ff1e90",
    nodes: ["BullMQ Queues", "Cron Dispatch", "Event Bus"],
  },
  {
    id: "07",
    name: "07 // AI & INTELLIGENCE",
    subtitle: "Multi-Agent Systems",
    color: "#d8ff42",
    nodes: ["Agent Pods", "Local RAG", "Anomaly ML"],
  },
];

interface SpatialArchitectureStackProps {
  activeLayerId: string;
  onSelectLayer: (id: string) => void;
}

export function SpatialArchitectureStack({
  activeLayerId,
  onSelectLayer,
}: SpatialArchitectureStackProps) {
  const [isExploded, setIsExploded] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: y * -20, // pitch
      y: x * 25,  // yaw
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Base isometric angles
  const baseRotateX = 52 + tilt.x;
  const baseRotateZ = -28 + tilt.y;

  return (
    <div className="w-full flex flex-col items-center space-y-6 select-none">
      
      {/* Top Controls Bar */}
      <div className="w-full flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#d8ff42] animate-pulse" />
          <span className="font-mono text-[9px] font-black uppercase tracking-widest text-zinc-400">
            3D SPATIAL CAD VIEWPORT // LIVE
          </span>
        </div>

        {/* Explode / Compact Toggle */}
        <button
          onClick={() => {
            playTickSound();
            setIsExploded(!isExploded);
          }}
          className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 rounded-lg text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#d8ff42] transition-colors shadow-[2px_2px_0px_#000] interactive cursor-pointer"
        >
          <span>{isExploded ? "COMPACT STACK" : "EXPLODE STACK"}</span>
          <span className="text-xs">⇄</span>
        </button>
      </div>

      {/* 3D Stage Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-[460px] sm:h-[500px] bg-[#0c0c0e] rounded-3xl border-[2.5px] border-black shadow-[6px_6px_0px_#000] relative overflow-hidden flex items-center justify-center p-6 cursor-grab active:cursor-grabbing"
        style={{ perspective: "1100px" }}
      >
        {/* Stage Grid Lines & Technical Calibration Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        {/* Corner HUD Data */}
        <div className="absolute top-4 left-4 font-mono text-[8px] text-zinc-500 uppercase tracking-widest space-y-0.5 pointer-events-none">
          <div>PITCH: {(52 + tilt.x).toFixed(1)}°</div>
          <div>YAW: {(-28 + tilt.y).toFixed(1)}°</div>
          <div>MODE: {isExploded ? "DISASSEMBLED_EXPLODED" : "COMPACT_COMPOSED"}</div>
        </div>

        <div className="absolute bottom-4 right-4 font-mono text-[8px] text-zinc-500 uppercase tracking-widest pointer-events-none flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e90]" />
          <span>INTERACTIVE CAD STAGE</span>
        </div>

        {/* 3D Transform Root Group */}
        <motion.div
          animate={{
            rotateX: baseRotateX,
            rotateZ: baseRotateZ,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="relative w-64 sm:w-80 h-36 sm:h-44"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Vertical Optical Laser Axis through all plates */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-[380px] bg-gradient-to-t from-transparent via-[#d8ff42]/50 to-transparent pointer-events-none"
            style={{
              transform: "rotateX(-90deg)",
              transformOrigin: "center center",
            }}
          />

          {/* 7 Floating Architectural Glass Plates */}
          {STACK_LAYERS.map((layer, idx) => {
            const isSelected = layer.id === activeLayerId;
            // Layer 01 is top (highest translateZ), Layer 07 is bottom
            const reversedIdx = 6 - idx;
            const separationGap = isExploded ? 46 : 14;
            const baseZ = reversedIdx * separationGap;
            const elevationOffset = isSelected ? 18 : 0;
            const finalZ = baseZ + elevationOffset;

            return (
              <motion.div
                key={layer.id}
                onClick={() => {
                  playTickSound();
                  onSelectLayer(layer.id);
                }}
                animate={{
                  transform: `translateZ(${finalZ}px)`,
                }}
                transition={{ type: "spring", stiffness: 160, damping: 22 }}
                className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 cursor-pointer p-3 sm:p-4 flex flex-col justify-between backdrop-blur-md interactive group ${
                  isSelected
                    ? "bg-[#1f1f23]/95 border-[#d8ff42] shadow-[0_0_25px_rgba(216,255,66,0.35)]"
                    : "bg-[#141418]/85 border-white/15 hover:border-white/40 hover:bg-[#18181e]"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Plate Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-[8px] sm:text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
                        isSelected
                          ? "bg-[#d8ff42] text-black border-[#d8ff42]"
                          : "bg-white/10 text-white/80 border-white/10 group-hover:border-white/30"
                      }`}
                    >
                      L{layer.id}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] font-black tracking-tight text-white uppercase">
                      {layer.name.replace(/^\d+\s*\/\/\s*/, "")}
                    </span>
                  </div>

                  <span
                    className="w-2 h-2 rounded-full transition-colors"
                    style={{
                      backgroundColor: isSelected ? layer.color : "rgba(255,255,255,0.2)",
                    }}
                  />
                </div>

                {/* Circuit Nodes Visual on the Glass Plate */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {layer.nodes.map((node) => (
                      <span
                        key={node}
                        className={`text-[7px] sm:text-[8px] font-mono px-1.5 py-0.5 rounded border ${
                          isSelected
                            ? "bg-white/10 text-zinc-200 border-white/20"
                            : "bg-black/30 text-zinc-500 border-white/5"
                        }`}
                      >
                        {node}
                      </span>
                    ))}
                  </div>

                  <span
                    className={`font-mono text-[8px] font-black uppercase ${
                      isSelected ? "text-[#d8ff42]" : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  >
                    {isSelected ? "LIVE" : "EXPAND"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Helpful CAD interaction note */}
      <p className="font-mono text-[9px] text-zinc-400 text-center uppercase tracking-wider">
        DRAG TO PITCH / YAW CAD STACK · CLICK ANY LAYER PLATE TO INSPECT ARCHITECTURE SPECIFICATION
      </p>
    </div>
  );
}

export default SpatialArchitectureStack;
