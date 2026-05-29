"use client";

import { useState } from "react";
import { useScrollStore } from "@/lib/stores/scroll-store";
import { Terminal, Database, Cpu, Shield, ArrowUpRight } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  stats: { label: string; value: string }[];
  blueprint: string;
}

export default function ServicesHub() {
  const theme = useScrollStore((s) => s.theme);
  const [activeTab, setActiveTab] = useState<string>("s-1");

  const services: ServiceItem[] = [
    {
      id: "s-1",
      title: "WebGL Immersive Systems",
      icon: Terminal,
      description: "High-performance, GPU-accelerated spatial environments engineered directly within the client runtime. We construct custom, physics-driven canvas modules utilizing WebGL2 and raw Three.js matrices. Our architectures compile native CAD models and procedural point clouds into compressed, instanced mesh buffers, maintaining a persistent 60+ FPS under massive coordinate density profiles.",
      stats: [
        { label: "GRAPHICS ENGINE", value: "WebGL2 / GLSL ES 3.00" },
        { label: "GEOMETRY FORMAT", value: "Instanced Draw Calls" },
        { label: "POLYGON BUDGET", value: "250k dynamic polygons" },
        { label: "RENDER TIME", value: "<1.42ms Frame Latency" }
      ],
      blueprint: `+---------------------------------------------------+
|               WEBGL RENDER RUNTIME                |
|  [ThreeJS Matrix] -> [Custom GLSL Shader]         |
|         |                                         |
|         v (Parametric VBO Stream)                 |
|  [Instanced Buffer Objects] -> [Direct GPU DRAW]  |
+---------------------------------------------------+`
    },
    {
      id: "s-2",
      title: "High-Fidelity Edge Networks",
      icon: Database,
      description: "Global application routing systems utilizing multi-region edge runtimes and hyper-fast memory replica clusters. Mapped directly to localized cluster nodes (AP-SOUTH, US-EAST, EU-WEST), our systems eliminate cold starts and routing hops, guaranteeing absolute packet delivery speeds and zero-latency backend synchronizations.",
      stats: [
        { label: "GLOBAL ROUTERS", value: "Multi-region Anycast DNS" },
        { label: "TTFB PROFILE", value: "<12ms average latency" },
        { label: "SYNC INTERVAL", value: "Conflict-free replication" },
        { label: "CONNECTION OVERHEAD", value: "0.1ms TLS handshakes" }
      ],
      blueprint: `+---------------------------------------------------+
|               DECENTRALIZED ROUTER                |
|  [Client DNS Query] -> [Edge Node Proximity]      |
|         |                                         |
|         v (Sub-millisecond routing hop)           |
|  [Anycast Edge Routing] -> [Memory Replica Sync]  |
+---------------------------------------------------+`
    },
    {
      id: "s-3",
      title: "Cryptographic Isolation & Security",
      icon: Shield,
      description: "Multi-layered, sandboxed runtime environments designed to isolate client-side logic and highly sensitive transactional nodes. Operating under strict formal verification models, we execute application workloads within isolated WebAssembly (Wasm) boundaries, protected by strict AES-256-GCM symmetric block ciphers and multi-signature authorization handshakes.",
      stats: [
        { label: "SANDBOX ENGINE", value: "Isolated Wasm VM" },
        { label: "ENCRYPTION STANDARD", value: "AES-256-GCM" },
        { label: "COMPLIANCE BOUNDS", value: "100% formal mathematical" },
        { label: "DATA LEAK PROBABILITY", value: "0.00% absolute isolation" }
      ],
      blueprint: `+---------------------------------------------------+
|                CRYPTOGRAPHIC SHIELD               |
|  [External Network Request] -> [Isolated Wasm VM] |
|         |                                         |
|         v (Formal Verification Layer)             |
|  [AES-256-GCM Block Cipher] -> [Secure Handshake] |
+---------------------------------------------------+`
    },
    {
      id: "s-4",
      title: "Direct-to-GPU Compiler Architectures",
      icon: Cpu,
      description: "Specialized compilation structures that transform complex mathematical graphics coordinates and spatial parameters directly into GLSL fragment and vertex shaders. By bypassing CPU-bound parser loops, we translate parametric design data directly to dedicated graphics hardware, ensuring extreme frame rates and optimal graphics compute allocations.",
      stats: [
        { label: "COMPILER TARGET", value: "Native GLSL / Shader" },
        { label: "COMPILATION SPEED", value: "<48ms for complex matrices" },
        { label: "MATH PRECISION", value: "32-bit floating point" },
        { label: "DRAW THROUGHPUT", value: "Direct GPU Mapped writes" }
      ],
      blueprint: `+---------------------------------------------------+
|                 DIRECT-TO-GPU COMPILER            |
|  [Parametric Vector Asset] -> [Vector Compiler]   |
|         |                                         |
|         v (Bypass traditional CPU translation)    |
|  [Direct Shader Compilation] -> [GPU Core Alloc]  |
+---------------------------------------------------+`
    }
  ];

  const activeService = services.find((s) => s.id === activeTab) || services[0];

  // Theme-dependent styles
  let themeHeader = "text-black";
  let cardClass = "bg-white text-neutral-900 border-2 border-black shadow-[6px_6px_0px_rgba(255,0,128,1)]";
  let activeTabStyle = "border-black bg-[#ccff00] text-black shadow-[2px_2px_0px_rgba(255,0,128,1)]";
  let inactiveTabStyle = "border-neutral-200 bg-neutral-50/50 text-neutral-500 hover:border-black hover:text-black";
  let borderAccent = "border-neutral-800/10";
  let textPrimary = "text-neutral-900";
  let textSecondary = "text-neutral-500";
  let blueprintColor = "bg-neutral-950 text-emerald-400";

  if (theme === "cyber-dark") {
    themeHeader = "text-[#ccff00]";
    cardClass = "bg-neutral-950 text-white border border-neutral-800 shadow-[6px_6px_0px_rgba(255,0,128,0.25)]";
    activeTabStyle = "border-[#ccff00] bg-neutral-900 text-[#ccff00] shadow-[2px_2px_0px_rgba(204,255,0,1)]";
    inactiveTabStyle = "border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-white hover:text-white";
    borderAccent = "border-neutral-800/40";
    textPrimary = "text-white";
    textSecondary = "text-neutral-400";
    blueprintColor = "bg-black text-[#ccff00]";
  } else if (theme === "mono") {
    themeHeader = "text-black";
    cardClass = "bg-white text-neutral-900 border border-neutral-200 shadow-[6px_6px_0px_rgba(0,0,0,0.15)]";
    activeTabStyle = "border-black bg-neutral-900 text-white shadow-[2px_2px_0px_rgba(0,0,0,1)]";
    inactiveTabStyle = "border-neutral-200 bg-white text-neutral-500 hover:border-black hover:text-black";
    borderAccent = "border-neutral-200";
    textPrimary = "text-neutral-900";
    textSecondary = "text-neutral-500";
    blueprintColor = "bg-neutral-950 text-neutral-300";
  } else if (theme === "solar") {
    themeHeader = "text-[#ffcc00]";
    cardClass = "bg-[#140b04] text-orange-50 border border-[#ff5500]/20 shadow-[6px_6px_0px_rgba(255,85,0,0.25)]";
    activeTabStyle = "border-[#ffcc00] bg-black text-[#ffcc00] shadow-[2px_2px_0px_rgba(255,204,0,1)]";
    inactiveTabStyle = "border-[#ff5500]/10 bg-[#1c0f05] text-orange-300/40 hover:border-white hover:text-orange-200";
    borderAccent = "border-[#ff5500]/20";
    textPrimary = "text-orange-50";
    textSecondary = "text-orange-300/40";
    blueprintColor = "bg-[#080301] text-orange-400";
  }

  return (
    <div className={`w-full border-2 p-6 transition-all duration-300 ${cardClass}`}>
      {/* Header */}
      <div className={`flex justify-between items-center border-b pb-4 mb-6 font-mono text-xs ${borderAccent}`}>
        <span className={`${themeHeader} font-black uppercase tracking-wider`}>INTELLIGENT_SERVICES_HUB.OUT</span>
        <span className="text-zinc-500 uppercase tracking-widest hidden sm:inline text-[9px]">HIGH-FIDELITY DIGITAL BLUEPRINTS</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Dynamic Tab Selectors */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <div className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider mb-2">
            ENGINEERING PILLARS
          </div>
          {services.map((s) => {
            const Icon = s.icon;
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`flex items-center justify-between p-4 border-2 font-mono text-left transition-all cursor-pointer interactive ${
                  isActive ? activeTabStyle : inactiveTabStyle
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-black uppercase tracking-tight">{s.title}</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            );
          })}
        </div>

        {/* Right Side: Description & Architecture Blueprint */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-zinc-500 font-mono text-[8px] uppercase font-bold tracking-widest block mb-1">
                SYSTEM SPECIFICATIONS
              </span>
              <h3 className={`text-2xl font-black uppercase tracking-tight ${textPrimary}`}>
                {activeService.title}
              </h3>
            </div>

            <p className={`font-mono text-xs leading-relaxed ${textSecondary}`}>
              {activeService.description}
            </p>

            {/* Simulated Architecture Blueprint */}
            <div className={`p-4 font-mono text-[9px] leading-tight select-none overflow-x-auto ${blueprintColor}`}>
              <pre>{activeService.blueprint}</pre>
            </div>

            {/* Performance Statistics Table */}
            <div className={`border-t pt-4 ${borderAccent}`}>
              <div className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider mb-3">
                METRIC_TELEMETRY.DUMP
              </div>
              <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                {activeService.stats.map((stat, idx) => (
                  <div key={idx} className={`flex justify-between border-b pb-2 ${borderAccent}`}>
                    <span className="text-zinc-500 uppercase text-[9px] font-bold">{stat.label}:</span>
                    <span className={`font-black ${textPrimary}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
