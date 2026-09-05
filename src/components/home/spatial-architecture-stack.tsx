"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

interface LayerInfo {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  nodes: string[];
  throughput: string;
}

const STACK_LAYERS: LayerInfo[] = [
  {
    id: "01",
    name: "01 // EXPERIENCE",
    subtitle: "Fluid Edge UI / WebGL",
    color: "#d8ff42",
    nodes: ["Next.js 16", "WebGL Shaders", "Zero CLS"],
    throughput: "<24ms Global TTFB",
  },
  {
    id: "02",
    name: "02 // APPLICATION",
    subtitle: "State & Client Portals",
    color: "#ffffff",
    nodes: ["Server Actions", "Streaming SSR", "Zustand"],
    throughput: "60 FPS Hydration",
  },
  {
    id: "03",
    name: "03 // BUSINESS LOGIC",
    subtitle: "Deterministic Pipelines",
    color: "#ff1e90",
    nodes: ["FastAPI Engine", "Zod Validation", "Stripe API"],
    throughput: "100% Type-Safe",
  },
  {
    id: "04",
    name: "04 // DATA & STORAGE",
    subtitle: "Postgres & Edge Vectors",
    color: "#d8ff42",
    nodes: ["PostgreSQL ACID", "Redis Cache", "Vector DB"],
    throughput: "Zero Data-Loss SLA",
  },
  {
    id: "05",
    name: "05 // INTEGRATIONS",
    subtitle: "Webhooks & Sync",
    color: "#ffffff",
    nodes: ["OpenAPI 3.1", "CRM Bidirectional", "OAuth 2.0"],
    throughput: "99.99% Webhook ACK",
  },
  {
    id: "06",
    name: "06 // AUTOMATION",
    subtitle: "Async Worker Queues",
    color: "#ff1e90",
    nodes: ["BullMQ Queues", "Cron Dispatch", "Event Bus"],
    throughput: "480 Jobs / Sec",
  },
  {
    id: "07",
    name: "07 // AI & INTELLIGENCE",
    subtitle: "Multi-Agent Systems",
    color: "#d8ff42",
    nodes: ["Agent Pods", "Local RAG", "Anomaly ML"],
    throughput: "<15ms Neural Latency",
  },
];

type CameraPreset = "ISOMETRIC" | "EXPLODED" | "ELEVATION" | "PLAN";

interface SpatialArchitectureStackProps {
  activeLayerId: string;
  onSelectLayer: (id: string) => void;
}

export function SpatialArchitectureStack({
  activeLayerId,
  onSelectLayer,
}: SpatialArchitectureStackProps) {
  const [camera, setCamera] = useState<CameraPreset>("EXPLODED");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const cameraAngles: Record<CameraPreset, { x: number; z: number; gap: number }> = {
    ISOMETRIC: { x: 52, z: -30, gap: 36 },
    EXPLODED: { x: 58, z: -26, gap: 54 },
    ELEVATION: { x: 26, z: -12, gap: 42 },
    PLAN: { x: 74, z: 0, gap: 48 },
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: y * -15, // pitch
      y: x * 18,  // yaw
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const currentCfg = cameraAngles[camera];
  const rotateX = currentCfg.x + tilt.x;
  const rotateZ = currentCfg.z + tilt.y;

  return (
    <div className="w-full flex flex-col items-center space-y-6 select-none">
      
      {/* Top CAD Control Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#d8ff42] animate-pulse" />
          <span className="font-mono text-[9px] font-black uppercase tracking-widest text-zinc-400">
            3D SPATIAL CAD VIEWPORT // 7-LAYER SYSTEM CORE
          </span>
        </div>

        {/* Camera Angle Presets */}
        <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
          <span className="font-mono text-[8px] text-zinc-500 uppercase px-1.5">CAM:</span>
          {(["EXPLODED", "ISOMETRIC", "ELEVATION", "PLAN"] as const).map((cam) => (
            <button
              key={cam}
              onClick={() => {
                playTickSound();
                setCamera(cam);
              }}
              className={`font-mono text-[9px] font-black uppercase px-2.5 py-1 rounded transition-all cursor-pointer ${
                camera === cam
                  ? "bg-[#d8ff42] text-black shadow-[1.5px_1.5px_0px_#fff]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {cam}
            </button>
          ))}
        </div>
      </div>

      {/* 3D CAD Stage Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-[520px] sm:h-[560px] bg-[#09090b] rounded-3xl border-[2.5px] border-black shadow-[8px_8px_0px_#000] relative overflow-hidden flex items-center justify-center p-6 cursor-grab active:cursor-grabbing"
        style={{ perspective: "1200px" }}
      >
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Radial Depth Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#09090b_90%)] pointer-events-none" />

        {/* CAD Telemetry HUD Overlays */}
        <div className="absolute top-4 left-4 font-mono text-[8px] text-zinc-400 uppercase tracking-widest space-y-1 pointer-events-none z-20 bg-black/75 p-2.5 rounded-xl border border-white/10 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-[#d8ff42] font-black">ROT_X:</span>
            <span className="text-white">{rotateX.toFixed(1)}°</span>
            <span className="text-[#ff1e90] font-black ml-2">ROT_Z:</span>
            <span className="text-white">{rotateZ.toFixed(1)}°</span>
          </div>
          <div>LAYER_SEPARATION: <span className="text-zinc-300">{currentCfg.gap}mm</span></div>
          <div>STATUS: <span className="text-emerald-400 font-bold">ALL 7 TIERS DECOUPLED</span></div>
        </div>

        <div className="absolute bottom-4 left-4 font-mono text-[8px] text-zinc-400 uppercase tracking-widest pointer-events-none z-20 bg-black/75 px-2.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
          <div>CONDUIT: <span className="text-[#d8ff42]">OPTICAL DATA BUS (ACTIVE)</span></div>
        </div>

        <div className="absolute bottom-4 right-4 font-mono text-[8px] text-zinc-400 uppercase tracking-widest pointer-events-none z-20 flex items-center gap-2 bg-black/75 px-2.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e90] animate-ping" />
          <span>INTERACTIVE CAD SLABS // CLICK TO EXPAND</span>
        </div>

        {/* 3D Transform Root Group */}
        <motion.div
          animate={{
            rotateX: rotateX,
            rotateZ: rotateZ,
          }}
          transition={{ type: "spring", stiffness: 140, damping: 22 }}
          className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] h-36 sm:h-40 mt-6"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Vertical Central Optical Laser Axis */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-[480px] bg-gradient-to-t from-transparent via-[#d8ff42]/60 to-transparent pointer-events-none"
            style={{
              transform: "rotateX(-90deg)",
              transformOrigin: "center center",
            }}
          />

          {/* Left Vertical Bus Conduit */}
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2 w-0.5 h-[440px] bg-gradient-to-t from-transparent via-[#ff1e90]/40 to-transparent pointer-events-none"
            style={{
              transform: "rotateX(-90deg)",
              transformOrigin: "center center",
            }}
          />

          {/* Right Vertical Bus Conduit */}
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 w-0.5 h-[440px] bg-gradient-to-t from-transparent via-[#d8ff42]/40 to-transparent pointer-events-none"
            style={{
              transform: "rotateX(-90deg)",
              transformOrigin: "center center",
            }}
          />

          {/* 7 Floating Architectural Glass Slabs */}
          {STACK_LAYERS.map((layer, idx) => {
            const isSelected = layer.id === activeLayerId;
            // Layer 01 is top (highest translateZ), Layer 07 is bottom (lowest translateZ)
            const reversedIdx = 6 - idx;
            const baseZ = reversedIdx * currentCfg.gap;
            const elevationOffset = isSelected ? 24 : 0;
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
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
                className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 cursor-pointer p-3 sm:p-4 flex flex-col justify-between backdrop-blur-md interactive group ${
                  isSelected
                    ? "bg-[#18181c]/95 border-[#d8ff42] shadow-[0_0_30px_rgba(216,255,66,0.4)] ring-2 ring-[#d8ff42]/50"
                    : "bg-[#111114]/90 border-white/15 hover:border-white/40 hover:bg-[#16161b]"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Precision CAD Corner Crosshairs */}
                <span className="absolute top-1.5 left-2 font-mono text-[9px] text-white/30 pointer-events-none">+</span>
                <span className="absolute top-1.5 right-2 font-mono text-[9px] text-white/30 pointer-events-none">+</span>
                <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-white/30 pointer-events-none">+</span>
                <span className="absolute bottom-1.5 right-2 font-mono text-[9px] text-white/30 pointer-events-none">+</span>

                {/* Plate Header */}
                <div className="flex items-center justify-between relative z-10 pl-2 pr-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`font-mono text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded border transition-colors ${
                        isSelected
                          ? "bg-[#d8ff42] text-black border-[#d8ff42] shadow-[1.5px_1.5px_0px_#fff]"
                          : "bg-white/10 text-white/80 border-white/10 group-hover:border-white/30"
                      }`}
                    >
                      TIER {layer.id}
                    </span>
                    <span className="font-display font-black text-xs sm:text-sm tracking-tight text-white uppercase">
                      {layer.name.replace(/^\d+\s*\/\/\s*/, "")}
                    </span>
                    <span className="font-mono text-[8px] text-zinc-400 hidden sm:inline">
                      — {layer.subtitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[8px] text-[#d8ff42] font-bold hidden sm:inline">
                      {layer.throughput}
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        isSelected ? "bg-[#d8ff42] shadow-[0_0_8px_#d8ff42]" : "bg-white/20"
                      }`}
                    />
                  </div>
                </div>

                {/* Circuit Nodes Visual on the Glass Slab */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10 relative z-10 pl-2 pr-2">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {layer.nodes.map((node) => (
                      <span
                        key={node}
                        className={`text-[8px] sm:text-[9px] font-mono px-2 py-0.5 rounded border transition-colors ${
                          isSelected
                            ? "bg-white/10 text-white border-white/20"
                            : "bg-black/40 text-zinc-400 border-white/5 group-hover:text-zinc-200"
                        }`}
                      >
                        {node}
                      </span>
                    ))}
                  </div>

                  <span
                    className={`font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-wider ${
                      isSelected ? "text-[#d8ff42]" : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  >
                    {isSelected ? "● INSPECTING" : "SELECT →"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* CAD Instruction Caption */}
      <p className="font-mono text-[9px] text-zinc-500 text-center uppercase tracking-widest">
        USE CAMERA PRESETS OR DRAG TO ROTATE 3D PERSPECTIVE · CLICK ANY TIER SLAB TO READ ARCHITECTURAL SPECIFICATION
      </p>
    </div>
  );
}

export default SpatialArchitectureStack;
