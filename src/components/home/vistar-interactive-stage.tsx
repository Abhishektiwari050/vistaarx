"use client";

import React, { useState, useEffect } from "react";
import { playClick } from "@/lib/sound";
import { CloudShader } from "@/components/ui/cloud-shader";
import { 
  MessageSquare, 
  Zap, 
  Box, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Terminal, 
  Cpu, 
  GitBranch, 
  Clock,
  Sparkles
} from "lucide-react";

interface PersonaInfo {
  id: number;
  role: string;
  metric: string;
  metricLabel: string;
  quote: string;
  badgeColor: string;
}

const CAPABILITIES: PersonaInfo[] = [
  {
    id: 0,
    role: "Lead Capture & WhatsApp Bots",
    metric: "< 10s",
    metricLabel: "Lead Response Time",
    quote: "Automated ingestion from web forms and market leads to WhatsApp & CRM",
    badgeColor: "#22C55E",
  },
  {
    id: 1,
    role: "Custom Next.js Web Apps",
    metric: "14 Days",
    metricLabel: "Production Sprint",
    quote: "Fast full-stack web applications and portals delivered with typed schemas",
    badgeColor: "#3B82F6",
  },
  {
    id: 2,
    role: "Spatial WebGL & 3D Web",
    metric: "60 FPS",
    metricLabel: "In-Browser WebGL",
    quote: "High-density architectural walkthroughs and interactive spatial models (3axis Arc)",
    badgeColor: "#F59E0B",
  },
  {
    id: 3,
    role: "100% Source Code Sovereignty",
    metric: "100%",
    metricLabel: "Private Git Transfer",
    quote: "Full private GitHub repo handover with bilateral NDA and 30-day bug warranty",
    badgeColor: "#FF3823",
  },
];

export function VistarInteractiveStage() {
  const [activeTab, setActiveTab] = useState(0);
  const [simulatedMessages, setSimulatedMessages] = useState<
    Array<{ sender: "lead" | "bot" | "founder"; text: string; time: string }>
  >([
    {
      sender: "lead",
      text: "Hi, need a custom Next.js portal with WhatsApp notifications.",
      time: "10:14:02 AM",
    },
    {
      sender: "bot",
      text: "⚡ Lead verified & scoped. Routing specification to Abhishek Tiwari...",
      time: "10:14:05 AM",
    },
    {
      sender: "founder",
      text: "Hey! Reviewed your scope. 14-day sprint roadmap ready for kickoff.",
      time: "10:14:09 AM",
    },
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Auto-cycle through capabilities every 8s if idle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % CAPABILITIES.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const triggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    playClick(1000, 0.05);

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setSimulatedMessages([
      { sender: "lead", text: "New enterprise lead submitted via vistar.tech/start", time: now },
    ]);

    setTimeout(() => {
      playClick(1100, 0.04);
      setSimulatedMessages((prev) => [
        ...prev,
        { sender: "bot", text: "✓ Parsed requirements. Database record created in PostgreSQL (<45ms).", time: now },
      ]);
    }, 1200);

    setTimeout(() => {
      playClick(1200, 0.04);
      setSimulatedMessages((prev) => [
        ...prev,
        { sender: "founder", text: "🚀 WhatsApp alert received on +91 88601 10144. Founder reviewing.", time: now },
      ]);
      setIsSimulating(false);
    }, 2400);
  };

  const handleTabClick = (id: number) => {
    playClick(900 + id * 80, 0.03);
    setActiveTab(id);
  };

  return (
    <div className="w-full flex flex-col bg-[#FAF9F5] select-none rounded-[16px] overflow-hidden border border-black/[0.08]">
      {/* ── STAGE VIEWPORT ── */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] min-h-[360px] sm:min-h-[420px] overflow-hidden bg-[#0D0E15] text-white">
        
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* ── STATE 0: Lead Capture & WhatsApp Bots ── */}
        {activeTab === 0 && (
          <div className="relative z-10 w-full h-full p-6 sm:p-10 flex flex-col justify-between animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                  LIVE WHATSAPP INGESTION ENGINE
                </span>
              </div>
              <button
                onClick={triggerSimulation}
                disabled={isSimulating}
                className="px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono hover:bg-emerald-500/30 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSimulating ? "Simulating..." : "Simulate Incoming Lead"}</span>
              </button>
            </div>

            {/* Chat Simulator Bubbles */}
            <div className="max-w-2xl mx-auto w-full space-y-3 my-auto py-4">
              {simulatedMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.sender === "lead" ? "items-start" : msg.sender === "bot" ? "items-center" : "items-end"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-sans ${
                      msg.sender === "lead"
                        ? "bg-white/10 text-white border border-white/15"
                        : msg.sender === "bot"
                        ? "bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 font-mono text-[11px] sm:text-xs"
                        : "bg-[#22C55E] text-slate-950 font-medium shadow-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] font-mono text-white/40 mt-1 px-1">
                    {msg.time} • {msg.sender === "lead" ? "Buyer Ingestion" : msg.sender === "bot" ? "Webhook Parser" : "Founder Phone"}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer metrics strip */}
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50 border-t border-white/10 pt-3">
              <span>LATENCY: &lt; 2.4s P99</span>
              <span>TELEMETRY: Meta WhatsApp Cloud API</span>
              <span>STATUS: 100% OPERATIONAL</span>
            </div>
          </div>
        )}

        {/* ── STATE 1: Custom Next.js Web Apps ── */}
        {activeTab === 1 && (
          <div className="relative z-10 w-full h-full p-6 sm:p-10 flex flex-col justify-between animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">
                  14-DAY PRODUCTION SPRINT BLUEPRINT
                </span>
              </div>
              <span className="text-xs font-mono text-white/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                Next.js 16 + React 19 + TypeScript
              </span>
            </div>

            {/* Milestone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-auto py-2 max-w-4xl mx-auto w-full">
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                <div className="text-[10px] font-mono uppercase text-blue-400 font-semibold">Days 01–03</div>
                <div className="text-sm font-medium text-white">System Architecture & Schemas</div>
                <p className="text-xs text-white/60 font-sans">
                  Relational PostgreSQL schema, auth boundaries, API contracts, and GitHub repo provisioning on day 1.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-2">
                <div className="text-[10px] font-mono uppercase text-blue-300 font-semibold">Days 04–11</div>
                <div className="text-sm font-medium text-white">Full-Stack Core Build</div>
                <p className="text-xs text-white/70 font-sans">
                  Founding engineers code the complete UI, backend, webhooks, and automated regression tests.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                <div className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">Days 12–14</div>
                <div className="text-sm font-medium text-white">Production Launch & Handover</div>
                <p className="text-xs text-white/60 font-sans">
                  Vercel/AWS deployment, DNS cutover, and 100% private GitHub repository rights transfer.
                </p>
              </div>
            </div>

            {/* Footer specs */}
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50 border-t border-white/10 pt-3">
              <span>PERFORMANCE: 100/100 LIGHTHOUSE</span>
              <span>TYPE CHECKING: Strict (0 `any`)</span>
              <span>DELIVERY: Guaranteed 14 Days</span>
            </div>
          </div>
        )}

        {/* ── STATE 2: Spatial WebGL & 3D Web ── */}
        {activeTab === 2 && (
          <div className="relative z-10 w-full h-full flex flex-col justify-between overflow-hidden animate-in fade-in duration-300">
            {/* Live GPU Cloud Shader Canvas */}
            <div className="absolute inset-0 pointer-events-none opacity-80">
              <CloudShader
                speed={0.8}
                count={4}
                cloudColor="#3B82F6"
                skyTopColor="#080B14"
                skyBottomColor="#0D1322"
              />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 p-6 sm:p-10 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                    IN-BROWSER GPU 3D PIPELINE
                  </span>
                </div>
                <span className="text-xs font-mono text-white/70 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                  Locked 60 FPS • Zero Plugins
                </span>
              </div>

              <div className="max-w-xl mx-auto text-center space-y-3 my-auto py-4">
                <h3 className="text-2xl sm:text-3xl font-normal font-sans tracking-tight text-white">
                  60 FPS Spatial Graphics on Any Device
                </h3>
                <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                  Interactive architectural configurators and procedural GLSL shaders. Tested across iPhone, Android, and desktop browsers.
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-white/60 border-t border-white/10 pt-3">
                <span>CANVAS: Three.js / WebGL 2.0 / GLSL</span>
                <span>PRODUCTION CASE: 3axis Arc (Architecture)</span>
                <span>FRAME TIME: ~16.6ms locked</span>
              </div>
            </div>
          </div>
        )}

        {/* ── STATE 3: 100% Source Code Sovereignty ── */}
        {activeTab === 3 && (
          <div className="relative z-10 w-full h-full p-6 sm:p-10 flex flex-col justify-between animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF3823] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#FF8A7A] font-semibold">
                  PRIVATE REPOSITORY TRANSFER
                </span>
              </div>
              <span className="text-xs font-mono text-white/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                Bilateral NDA • 100% Client Ownership
              </span>
            </div>

            {/* Terminal Preview */}
            <div className="max-w-2xl mx-auto w-full my-auto rounded-xl bg-black/80 border border-white/10 p-5 font-mono text-xs space-y-2 shadow-2xl">
              <div className="flex items-center gap-1.5 pb-2 border-b border-white/10 text-white/40 text-[10px]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-2 text-white/60">terminal — vistar-handover</span>
              </div>
              <div className="text-emerald-400">
                $ git clone git@github.com:your-organization/production-app.git
              </div>
              <div className="text-white/60">
                Cloning into &apos;production-app&apos;... Complete (100% private transfer).
              </div>
              <div className="text-white/60">
                Verified commit signatures: <span className="text-white">Abhishek Tiwari &lt;founder@vistar.tech&gt;</span>
              </div>
              <div className="text-[#FF8A7A] pt-1">
                ✓ ZERO vendor lock-in &nbsp;•&nbsp; ZERO hostage retainers &nbsp;•&nbsp; 30-Day Bug Warranty Active
              </div>
            </div>

            {/* Footer specs */}
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50 border-t border-white/10 pt-3">
              <span>LICENSING: 100% Client IP</span>
              <span>ENVIRONMENT: Client AWS/Vercel/GCP</span>
              <span>WARANTY: 30-Day Zero Cost Fix</span>
            </div>
          </div>
        )}

      </div>

      {/* ── BOTTOM CAPABILITY SELECTOR BUTTONS ── */}
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-1.5 p-2.5 sm:p-3 bg-white border-t border-black/[0.08]">
        {CAPABILITIES.map((p) => {
          const isActive = activeTab === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handleTabClick(p.id)}
              className={`p-2.5 sm:p-3 rounded-lg text-left transition-all duration-150 cursor-pointer flex flex-col justify-between border ${
                isActive
                  ? "bg-[#FAF9F5] border-[#141413] shadow-xs"
                  : "bg-transparent border-transparent hover:bg-neutral-50 hover:border-black/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5E605D]">
                  0{p.id + 1} // CAPABILITY
                </span>
                <span
                  className="text-xs font-bold font-mono px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: isActive ? `${p.badgeColor}15` : "transparent",
                    color: p.badgeColor,
                  }}
                >
                  {p.metric}
                </span>
              </div>
              <div className="text-xs sm:text-[13px] font-medium text-[#141413] truncate">
                {p.role}
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#5E605D] truncate mt-0.5">
                {p.metricLabel}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default VistarInteractiveStage;
