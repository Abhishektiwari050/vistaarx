"use client";

import React from "react";
import { motion } from "framer-motion";

const PROCESS_STEPS = [
  {
    num: "01",
    name: "DISCOVER",
    sub: "Understand the business operations",
    desc: "We analyze your actual workflows, data silos, team bottlenecks, and commercial goals. Zero assumptions. We define exactly what the system must accomplish.",
    duration: "Day 01–03",
  },
  {
    num: "02",
    name: "ARCHITECT",
    sub: "Design the technical blueprint",
    desc: "Data schemas, API contracts, infrastructure diagrams, and interface wireframes. We resolve all architectural complexity before writing a line of code.",
    duration: "Day 04–07",
  },
  {
    num: "03",
    name: "BUILD",
    sub: "Engineer the production software",
    desc: "High-velocity sprints using Next.js 16, Python microservices, strict TypeScript, and automated testing suites. You receive live preview builds every 48 hours.",
    duration: "Day 08–18",
  },
  {
    num: "04",
    name: "DEPLOY",
    sub: "Ship with Core Web Vitals SLA",
    desc: "Zero-downtime deployment to your production environment (Vercel, AWS, or Render) with sub-100ms edge routing, SSL, and live telemetry observability.",
    duration: "Day 19–20",
  },
  {
    num: "05",
    name: "TRANSFER",
    sub: "100% IP & documentation handover",
    desc: "Complete, unencumbered transfer of your private GitHub repositories, deployment credentials, architecture docs, and developer runbooks. You own it.",
    duration: "Day 21",
  },
];

export function ProcessSection() {
  return (
    <section id="approach" className="py-24 px-6 sm:px-12 md:px-16 bg-[#faf9f5] border-t-2 border-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3.5 py-1.5 rounded-lg text-[9px] font-mono font-black tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#d8ff42]">
            <span className="w-2 h-2 rounded-full bg-[#d8ff42] inline-block" />
            07 // ENGINEERING METHODOLOGY
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-[#0a0a0a] leading-[0.95]">
            How we execute: <br />
            <span className="font-serif italic font-normal text-zinc-400 lowercase">
              the 21-day sprint rhythm.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-zinc-600 leading-relaxed">
            No endless agency retainers that drag on for quarters. We work in disciplined, fixed-scope sprints with transparent daily visibility.
          </p>
        </div>

        {/* Process Timeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white border-[2.5px] border-black rounded-2xl p-6 shadow-[4px_4px_0px_#000] flex flex-col justify-between space-y-6 group hover:shadow-[6px_6px_0px_#ff1e90] hover:-translate-y-1 transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-black/10 pb-3">
                  <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-black text-[#d8ff42]">
                    {step.num}
                  </span>
                  <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase">
                    {step.duration}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-black text-xl uppercase tracking-tight text-black">
                    {step.name}
                  </h3>
                  <p className="font-mono text-[9px] font-bold text-[#ff1e90] uppercase tracking-wider mt-0.5">
                    {step.sub}
                  </p>
                </div>

                <p className="font-sans text-xs text-zinc-600 leading-relaxed pt-1">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-black/10 font-mono text-[9px] font-bold text-zinc-400 uppercase flex items-center justify-between">
                <span>PHASE {step.num}</span>
                <span className="text-black group-hover:text-[#ff1e90] transition-colors">→</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
