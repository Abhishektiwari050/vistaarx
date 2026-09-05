"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

// --- PROJECT 01: VAYU (Aviation Intelligence NOTAM Decoder & Airspace HUD) ---
export function VayuSimulator() {
  const [selectedRoute, setSelectedRoute] = useState<"VIDP" | "KJFK" | "EGLL">("VIDP");
  const [isDecoding, setIsDecoding] = useState(false);

  const routes = {
    VIDP: {
      callsign: "VIDP // INDIRA GANDHI INTL (DELHI)",
      rawNotam: "A0482/26 NOTAMN Q) VIDP/QFAXX/IV/NBO/A/000/999/2834N07706E005 A) VIDP B) 2609050000 C) 2609051800 E) RWY 11/29 CLOSED FOR SCHEDULED FRICTION CALIBRATION MAINT.",
      threat: "LOW OPERATIONAL HAZARD",
      threatColor: "text-emerald-400 border-emerald-500/40 bg-emerald-950/40",
      aiBrief: "Runway 11/29 closed today 00:00–18:00 UTC for surface calibration. Expect routing to parallel Runway 10/28 with minor ground sequencing delay.",
      latency: "34ms",
    },
    KJFK: {
      callsign: "KJFK // JOHN F. KENNEDY INTL (NEW YORK)",
      rawNotam: "A1192/26 NOTAMR Q) ZNY/QWBLW/IV/M/AE/000/180/4038N07346E025 A) KJFK B) 2609051200 C) 2609052000 E) AIRSPACE RESTRICTION TEMPORARY VIP TFR IN EFFECT 25NM RADIUS.",
      threat: "MODERATE FLIGHT ROUTE DIVERSION",
      threatColor: "text-amber-400 border-amber-500/40 bg-amber-950/40",
      aiBrief: "Temporary Flight Restriction (VIP TFR) active within 25NM radius. Standard arrival STAR routes diverted via CAMRN transition.",
      latency: "41ms",
    },
    EGLL: {
      callsign: "EGLL // LONDON HEATHROW (LONDON)",
      rawNotam: "A0814/26 NOTAMN Q) EGTT/QMXLC/IV/M/A/000/999/5128N00027W005 A) EGLL B) 2609050600 C) 2609051400 E) TWY B CLOSED BTN TWY A AND STAND 514 DUE TO RESURFACING WORKS.",
      threat: "LOW TAXIWAY CONGESTION",
      threatColor: "text-emerald-400 border-emerald-500/40 bg-emerald-950/40",
      aiBrief: "Taxiway Bravo closed between Alpha and Stand 514. Inbound heavy widebody gate assignments re-sequenced to Terminal 2 apron.",
      latency: "29ms",
    },
  };

  const current = routes[selectedRoute];

  const handleSelect = (r: "VIDP" | "KJFK" | "EGLL") => {
    playTickSound();
    setIsDecoding(true);
    setSelectedRoute(r);
    setTimeout(() => setIsDecoding(false), 350);
  };

  return (
    <div className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4 font-mono text-[10px]">
      {/* HUD Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#d8ff42] animate-pulse" />
          <span className="font-black text-white uppercase tracking-wider">
            VAYU NLP AIRSPACE PARSER HUD
          </span>
        </div>

        {/* Airport Selectors */}
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500 text-[9px] mr-1">AIRPORT:</span>
          {(["VIDP", "KJFK", "EGLL"] as const).map((code) => (
            <button
              key={code}
              onClick={() => handleSelect(code)}
              className={`px-2.5 py-1 rounded font-black uppercase text-[9px] transition-all cursor-pointer ${
                selectedRoute === code
                  ? "bg-[#d8ff42] text-black shadow-[1.5px_1.5px_0px_#fff]"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {/* Raw NOTAM Stream */}
      <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl space-y-1.5">
        <div className="flex items-center justify-between text-[8px] text-zinc-500">
          <span>RAW ICAO NOTAM TELEMETRY STRING</span>
          <span className="text-[#d8ff42]">PARSING ENGINE: ACTIVE</span>
        </div>
        <p className="text-zinc-300 text-[9px] leading-relaxed break-all font-mono">
          {current.rawNotam}
        </p>
      </div>

      {/* Decoded Executive Briefing */}
      <div className="bg-zinc-900 border border-zinc-700/80 p-3.5 rounded-xl space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-black uppercase text-[#d8ff42]">
            AI DECODED EXECUTIVE BRIEFING (FOR PILOTS)
          </span>
          <span className={`text-[8px] font-bold px-2 py-0.5 rounded border ${current.threatColor}`}>
            ● {current.threat}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={selectedRoute}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-white text-xs font-sans font-medium leading-relaxed"
          >
            {current.aiBrief}
          </motion.p>
        </AnimatePresence>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[8px] text-zinc-500">
          <span>PROCESSING LATENCY: <strong className="text-white">{current.latency}</strong></span>
          <span className="text-emerald-400 font-bold">ACCURACY: 99.8% VERIFIED</span>
        </div>
      </div>
    </div>
  );
}

// --- PROJECT 02: AURA (Healthcare Multi-Agent Telemetry Stream & Anomaly Detector) ---
export function AuraSimulator() {
  const [hasAnomaly, setHasAnomaly] = useState(false);
  const [pulseWave, setPulseWave] = useState<number[]>([40, 42, 45, 90, 20, 55, 42, 40]);
  const [isolationScore, setIsolationScore] = useState(0.042);
  const [filterActive, setFilterActive] = useState(true);

  const triggerSpike = () => {
    playTickSound();
    setHasAnomaly(true);
    setIsolationScore(0.984);
    setPulseWave([40, 42, 110, 10, 130, 25, 60, 40]);

    setTimeout(() => {
      setHasAnomaly(false);
      setIsolationScore(0.048);
      setPulseWave([40, 42, 45, 90, 20, 55, 42, 40]);
    }, 1800);
  };

  return (
    <div className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4 font-mono text-[10px]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${hasAnomaly ? "bg-[#ff1e90] animate-ping" : "bg-emerald-400 animate-pulse"}`} />
          <span className="font-black text-white uppercase tracking-wider">
            AURA MULTI-AGENT VITAL TELEMETRY STREAM
          </span>
        </div>

        <button
          onClick={triggerSpike}
          disabled={hasAnomaly}
          className="px-3 py-1 rounded bg-[#ff1e90] text-white hover:bg-white hover:text-black font-black uppercase text-[9px] transition-all cursor-pointer"
        >
          {hasAnomaly ? "ISOLATING SPIKE..." : "INJECT MOTION ARTIFACT"}
        </button>
      </div>

      {/* Real-Time Waveform Monitor */}
      <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-xl space-y-3">
        <div className="flex items-center justify-between text-[8px] text-zinc-400">
          <span>STREAM: LEAD-II ECG SENSOR // SAMPLING RATE: 500Hz</span>
          <span className={hasAnomaly ? "text-[#ff1e90] font-black" : "text-emerald-400 font-black"}>
            {hasAnomaly ? "ARTIFACT DETECTED (<14ms)" : "STABLE VITAL STATE"}
          </span>
        </div>

        {/* Animated SVG Waveform */}
        <div className="h-16 w-full bg-zinc-950/80 rounded-lg flex items-center px-3 border border-zinc-800/80 relative overflow-hidden">
          <svg className="w-full h-12" viewBox="0 0 300 60">
            <polyline
              fill="none"
              stroke={hasAnomaly ? "#ff1e90" : "#d8ff42"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0,30 30,30 45,28 60,32 75,5 90,55 105,20 120,30 160,30 175,28 190,32 205,5 220,55 235,20 250,30 300,30"
            />
          </svg>

          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        </div>

        {/* Isolation Forest Inference Readout */}
        <div className="grid grid-cols-3 gap-2 text-center text-[8px]">
          <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
            <span className="text-zinc-500 block">ISOLATION SCORE</span>
            <span className={`font-black text-xs ${hasAnomaly ? "text-[#ff1e90]" : "text-[#d8ff42]"}`}>
              {isolationScore.toFixed(3)}
            </span>
          </div>

          <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
            <span className="text-zinc-500 block">FALSE POSITIVE FILTER</span>
            <span className="font-black text-xs text-emerald-400">
              {hasAnomaly ? "SUPPRESSED" : "ARMED"}
            </span>
          </div>

          <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
            <span className="text-zinc-500 block">BROKER LATENCY</span>
            <span className="font-black text-xs text-white">12.4ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- PROJECT 03: 3AXIS ARC (3D Spatial Perspective Depth Stage) ---
export function ThreeAxisSimulator() {
  const [pitch, setPitch] = useState(15);
  const [yaw, setYaw] = useState(-20);
  const [wireframeMode, setWireframeMode] = useState(true);

  return (
    <div className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4 font-mono text-[10px]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#d8ff42] animate-pulse" />
          <span className="font-black text-white uppercase tracking-wider">
            3AXIS ARC // SPATIAL PERSPECTIVE CONTROLLER
          </span>
        </div>

        <button
          onClick={() => {
            playTickSound();
            setWireframeMode(!wireframeMode);
          }}
          className={`px-3 py-1 rounded font-black uppercase text-[9px] transition-all cursor-pointer ${
            wireframeMode
              ? "bg-[#d8ff42] text-black"
              : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
          }`}
        >
          {wireframeMode ? "WIREFRAME: ACTIVE" : "RENDER: SHADED"}
        </button>
      </div>

      {/* 3D Perspective Stage */}
      <div
        className="h-44 w-full bg-zinc-900/90 border border-zinc-800 rounded-xl flex items-center justify-center relative overflow-hidden [perspective:800px] cursor-grab active:cursor-grabbing"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          setPitch(-y * 35);
          setYaw(x * 45);
        }}
      >
        <motion.div
          animate={{ rotateX: pitch, rotateY: yaw }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-48 h-32 border-2 border-[#d8ff42] bg-[#d8ff42]/10 rounded-lg p-3 flex flex-col justify-between shadow-[0_0_25px_#d8ff4220] relative [transform-style:preserve-3d]"
        >
          {/* Inner Elevation Planes */}
          <div className="border border-white/40 bg-white/5 h-8 rounded [transform:translateZ(20px)] flex items-center justify-center text-[7px] text-white font-bold">
            ROOF CANTILEVER // LEVEL 03
          </div>
          <div className="border border-[#ff1e90]/60 bg-[#ff1e90]/10 h-8 rounded [transform:translateZ(10px)] flex items-center justify-center text-[7px] text-[#ff1e90] font-bold">
            ATRIUM LIVING CORE // LEVEL 02
          </div>
          <div className="border border-zinc-500 bg-zinc-800/40 h-8 rounded flex items-center justify-center text-[7px] text-zinc-300 font-bold">
            FOUNDATION SUB-STRUCTURE
          </div>
        </motion.div>

        {/* Telemetry HUD in Corner */}
        <div className="absolute bottom-2 left-3 text-[8px] text-zinc-500 font-mono pointer-events-none">
          PITCH: <span className="text-white">{pitch.toFixed(1)}°</span> | YAW: <span className="text-white">{yaw.toFixed(1)}°</span> | FPS: <span className="text-[#d8ff42]">60.0</span>
        </div>
      </div>
    </div>
  );
}

// --- PROJECT 04: COMPETENCE CRM (Pipeline Velocity & Deal Automation) ---
export function CompetenceCrmSimulator() {
  const [pipelineState, setPipelineState] = useState<"IDLE" | "RUNNING" | "ADVANCED">("IDLE");
  const [activeStage, setActiveStage] = useState(2);

  const advancePipeline = () => {
    playTickSound();
    setPipelineState("RUNNING");
    setTimeout(() => {
      setActiveStage((prev) => (prev >= 4 ? 1 : prev + 1));
      setPipelineState("ADVANCED");
      setTimeout(() => setPipelineState("IDLE"), 800);
    }, 500);
  };

  const stages = [
    { num: "01", name: "Inbound Lead", time: "0.0s", status: "Auto-Enriched" },
    { num: "02", name: "Intent Scoring", time: "0.4s", status: "Qualified" },
    { num: "03", name: "Proposal Gen", time: "1.2s", status: "Dispatched" },
    { num: "04", name: "Closing Sync", time: "2.1s", status: "Postgres ACK" },
  ];

  return (
    <div className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4 font-mono text-[10px]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#d8ff42] animate-pulse" />
          <span className="font-black text-white uppercase tracking-wider">
            COMPETENCE CRM // DEAL VELOCITY PIPELINE
          </span>
        </div>

        <button
          onClick={advancePipeline}
          disabled={pipelineState === "RUNNING"}
          className="px-3 py-1 rounded bg-[#d8ff42] text-black hover:bg-white font-black uppercase text-[9px] transition-all cursor-pointer"
        >
          {pipelineState === "RUNNING" ? "AUTOMATING..." : "TRIGGER STAGE PROGRESSION"}
        </button>
      </div>

      {/* Stage Flow */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {stages.map((stg, idx) => {
          const isCurrent = idx + 1 === activeStage;
          const isPassed = idx + 1 < activeStage;
          return (
            <div
              key={stg.num}
              className={`p-2.5 rounded-xl border transition-all ${
                isCurrent
                  ? "bg-zinc-900 border-[#d8ff42] shadow-[0_0_12px_#d8ff4220]"
                  : isPassed
                  ? "bg-zinc-950 border-zinc-700/60 opacity-80"
                  : "bg-zinc-950 border-zinc-800 opacity-40"
              }`}
            >
              <div className="flex items-center justify-between text-[7px] text-zinc-500 pb-1">
                <span>STAGE {stg.num}</span>
                <span className={isCurrent ? "text-[#d8ff42] font-black" : "text-zinc-600"}>
                  {stg.time}
                </span>
              </div>
              <p className="font-display font-black text-[11px] text-white uppercase">{stg.name}</p>
              <span className="text-[8px] text-emerald-400 block mt-1 font-bold">
                {isPassed ? "✓ " : isCurrent ? "● " : "○ "}
                {stg.status}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[8px] text-zinc-500 border-t border-zinc-800 pt-2">
        <span>BACKEND ENGINE: FASTAPI + POSTGRESQL</span>
        <span className="text-[#d8ff42] font-bold">VELOCITY: +45% TEAM VELOCITY</span>
      </div>
    </div>
  );
}

// Master component switch
export function ProjectSimulator({ projectId }: { projectId: string }) {
  switch (projectId) {
    case "01":
      return <VayuSimulator />;
    case "02":
      return <AuraSimulator />;
    case "03":
      return <ThreeAxisSimulator />;
    case "04":
      return <CompetenceCrmSimulator />;
    default:
      return <VayuSimulator />;
  }
}
