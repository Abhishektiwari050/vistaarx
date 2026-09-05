"use client";

import React from "react";
import { motion } from "framer-motion";

const FRAGMENTED_TOOLS = [
  { name: "CRM", flaw: "Siloed customer history & outdated contacts", badge: "DATA SILO" },
  { name: "Spreadsheets", flaw: "Manual copy-pasting prone to human error", badge: "MANUAL SYNC" },
  { name: "Email Threads", flaw: "Missed follow-ups & zero automated routing", badge: "LOST REVENUE" },
  { name: "WhatsApp", flaw: "Locked in personal staff phones with no audit log", badge: "NO AUDIT" },
  { name: "Manual Ops", flaw: "Engineers and operators doing repetitive robotic work", badge: "HIGH OVERHEAD" },
  { name: "Fragmented Reports", flaw: "Flying blind with delayed monthly reconciliation", badge: "ZERO INSIGHT" },
];

export function ProblemSection() {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 border-t-2 border-black bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 border-2 border-black bg-[#faf9f5] px-3.5 py-1.5 rounded-lg text-[9px] font-mono font-black tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#ff1e90]">
            <span className="w-2 h-2 rounded-full bg-[#ff1e90] inline-block" />
            02 // THE OPERATIONAL REALITY
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-[#0a0a0a] leading-[0.95]">
            Your business shouldn&apos;t run on <br />
            <span className="text-[#ff1e90] underline decoration-black decoration-wavy decoration-2">
              disconnected tools.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-zinc-600 leading-relaxed">
            Most businesses don&apos;t have a growth problem—they have a systems fragmentation problem. When your software doesn&apos;t talk to each other, humans become the glue, errors multiply, and scale becomes painful.
          </p>
        </div>

        {/* Fragmented Workflow Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FRAGMENTED_TOOLS.map((tool, idx) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-[#faf9f5] border-[2.5px] border-black rounded-2xl p-6 shadow-[4px_4px_0px_#000] flex flex-col justify-between space-y-4 relative group hover:shadow-[6px_6px_0px_#ff1e90] hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-3">
                <span className="font-mono text-[9px] font-black uppercase text-zinc-400">
                  TOOL // 0{idx + 1}
                </span>
                <span className="font-mono text-[8px] font-extrabold px-2 py-0.5 rounded bg-red-100 border border-red-300 text-red-700 uppercase">
                  {tool.badge}
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-black mb-2">
                  {tool.name}
                </h3>
                <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                  {tool.flaw}
                </p>
              </div>

              <div className="pt-3 border-t border-black/10 flex items-center justify-between text-[9px] font-mono font-bold text-zinc-400 uppercase">
                <span>STATUS: DISCONNECTED</span>
                <span className="text-red-500 font-black">HIGH FRICTION ⚠</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transition Callout into the Solution */}
        <div className="bg-[#111111] text-white border-[3px] border-black rounded-2xl p-8 shadow-[6px_6px_0px_#d8ff42] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#d8ff42]">
              THE ARCHITECTURAL SHIFT
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
              Replace fragmented band-aids with one connected system.
            </h3>
          </div>
          <a
            href="#before-after"
            className="shrink-0 bg-[#d8ff42] text-black font-mono font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-lg border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-white transition-colors"
          >
            See The Transformation ↓
          </a>
        </div>

      </div>
    </section>
  );
}
