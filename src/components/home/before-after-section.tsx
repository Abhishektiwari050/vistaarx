"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

export function BeforeAfterSection() {
  const [viewState, setViewState] = useState<"after" | "before">("after");

  return (
    <section id="before-after" className="py-24 px-6 sm:px-12 md:px-16 bg-[#faf9f5] border-t-2 border-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header & Interactive Toggle Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-black/10 pb-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3.5 py-1.5 rounded-lg text-[9px] font-mono font-black tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#d8ff42]">
              <span className="w-2 h-2 rounded-full bg-[#d8ff42] inline-block" />
              03 // SYSTEM TRANSFORMATION
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-[#0a0a0a] leading-[0.95]">
              Before &amp; After <br />
              <span className="font-serif italic font-normal text-zinc-400 lowercase">
                architectural transformation.
              </span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-zinc-600 leading-relaxed">
              Toggle between the standard fragmented operational workflow and the unified Vistar connected system.
            </p>
          </div>

          {/* Interactive Toggle Switch */}
          <div className="shrink-0 flex items-center p-1.5 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_#000]">
            <button
              onClick={() => {
                playTickSound();
                setViewState("before");
              }}
              className={`px-4 py-2 rounded-lg text-[10px] font-mono font-black uppercase tracking-wider transition-all interactive ${
                viewState === "before"
                  ? "bg-red-500 text-white shadow-[2px_2px_0px_#000]"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              ⚠ BEFORE // FRAGMENTED
            </button>
            <button
              onClick={() => {
                playTickSound();
                setViewState("after");
              }}
              className={`px-4 py-2 rounded-lg text-[10px] font-mono font-black uppercase tracking-wider transition-all interactive ${
                viewState === "after"
                  ? "bg-[#d8ff42] text-black border border-black shadow-[2px_2px_0px_#000]"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              ⚡ AFTER // ONE CONNECTED SYSTEM
            </button>
          </div>
        </div>

        {/* Dynamic Architectural Display */}
        <AnimatePresence mode="wait">
          {viewState === "before" ? (
            <motion.div
              key="before-state"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="bg-white border-[2.5px] border-black rounded-3xl p-8 sm:p-12 shadow-[8px_8px_0px_rgba(239,68,68,0.3)] space-y-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="font-mono text-xs font-black uppercase tracking-widest text-red-600">
                    THE FRAGMENTED BAND-AID APPROACH (SLOW &amp; FRAGILE)
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">MANUAL</span>
                  <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">REPETITIVE</span>
                  <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">DATA SILOS</span>
                </div>
              </div>

              {/* Fragmented Flowchart Nodes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { step: "01", name: "Inbound Lead", note: "Lands in inbox" },
                  { step: "02", name: "Manual Sheet", note: "Copy-paste (4hr lag)" },
                  { step: "03", name: "CRM Import", note: "Missing fields" },
                  { step: "04", name: "WhatsApp", note: "On staff phone" },
                  { step: "05", name: "Follow-up", note: "Delayed 48h" },
                  { step: "06", name: "Spreadsheet", note: "Reconciled monthly" },
                ].map((node) => (
                  <div key={node.step} className="bg-red-50/60 border border-red-200 p-4 rounded-xl space-y-2 relative">
                    <span className="font-mono text-[8px] font-black text-red-600 block">STEP {node.step}</span>
                    <h4 className="font-display font-black text-sm uppercase text-black">{node.name}</h4>
                    <p className="font-sans text-[11px] text-zinc-500">{node.note}</p>
                    <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-red-300 hidden lg:inline font-mono">✕</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-red-50 border border-red-200 font-sans text-xs text-red-800 flex items-center justify-between">
                <span>⚠ Result: Slow response times, missed high-ticket buyers, human burnout, and zero real-time visibility.</span>
                <span className="font-mono font-black uppercase text-[10px]">REVENUE EFFICIENCY: ~35%</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="after-state"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="bg-black text-white border-[2.5px] border-black rounded-3xl p-8 sm:p-12 shadow-[8px_8px_0px_#d8ff42] space-y-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#d8ff42] animate-pulse" />
                  <span className="font-mono text-xs font-black uppercase tracking-widest text-[#d8ff42]">
                    THE VISTAR CONNECTED SYSTEM (AUTONOMOUS &amp; OBSERVABLE)
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">CONNECTED</span>
                  <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-[#d8ff42]/15 text-[#d8ff42] border border-[#d8ff42]/30">AUTOMATED</span>
                  <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-[#ff1e90]/15 text-[#ff1e90] border border-[#ff1e90]/30">INTELLIGENT</span>
                </div>
              </div>

              {/* Connected Unified Pipeline */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { step: "01", name: "Inbound Lead", note: "Instant webhook capture", color: "#d8ff42" },
                  { step: "02", name: "AI Router", note: "Parses intent & qualifies", color: "#ff1e90" },
                  { step: "03", name: "Unified DB", note: "Real-time sync to PG", color: "#d8ff42" },
                  { step: "04", name: "Auto Dispatch", note: "WhatsApp + Email in <10s", color: "#ff1e90" },
                  { step: "05", name: "Cal Sync", note: "Calendar locked instantly", color: "#d8ff42" },
                  { step: "06", name: "Telemetry HUD", note: "Real-time revenue metrics", color: "#ff1e90" },
                ].map((node) => (
                  <div key={node.step} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2 relative group hover:border-[#d8ff42] transition-colors">
                    <span className="font-mono text-[8px] font-black text-[#d8ff42] block">STEP {node.step}</span>
                    <h4 className="font-display font-black text-sm uppercase text-white">{node.name}</h4>
                    <p className="font-sans text-[11px] text-zinc-400">{node.note}</p>
                    <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-[#d8ff42] hidden lg:inline font-mono">→</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#d8ff42]/10 border border-[#d8ff42]/30 font-sans text-xs text-white flex items-center justify-between">
                <span>⚡ Result: Sub-10 second inquiry response, 100% data integrity, automated follow-up sequences, and live executive telemetry.</span>
                <span className="font-mono font-black uppercase text-[10px] text-[#d8ff42]">REVENUE EFFICIENCY: ~98%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
