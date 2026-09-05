"use client";

import React from "react";
import Link from "next/link";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

const PILLARS = [
  {
    code: "01",
    title: "100% Source Code Ownership",
    desc: "From the first commit, everything lives in your GitHub repository. You own all intellectual property, copyright, and code unencumbered.",
  },
  {
    code: "02",
    title: "Zero Proprietary Lock-In",
    desc: "We write clean, standard Next.js, Python, PostgreSQL, and Tailwind. Any competent senior engineer can pick up our codebases immediately.",
  },
  {
    code: "03",
    title: "Production Runbooks & Architecture Docs",
    desc: "Every system includes detailed architectural diagrams, API schemas, deployment runbooks, and testing instructions.",
  },
  {
    code: "04",
    title: "Your Cloud Infrastructure",
    desc: "Deployments live on your accounts (Vercel, AWS, Cloudflare, or Render). We never hold your servers or domain DNS hostage.",
  },
];

export function OwnershipSection() {
  return (
    <section id="ownership" className="py-24 px-6 sm:px-12 md:px-16 bg-white border-t-2 border-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Ownership Manifesto Box */}
        <div className="bg-[#111111] text-white border-[3px] border-black rounded-3xl p-8 sm:p-14 shadow-[8px_8px_0px_#d8ff42] space-y-8 select-none">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3.5 py-1.5 rounded-lg text-[9px] font-mono font-black tracking-[2px] uppercase text-[#d8ff42]">
            <span>08 // THE VISTAR OWNERSHIP PHILOSOPHY</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white leading-[0.92]">
            We build it. <br />
            We document it. <br />
            We hand it over. <br />
            <span className="text-[#d8ff42] underline decoration-white decoration-wavy decoration-2">
              You own it.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
            Most software agencies create artificial dependencies so you are forced to pay them forever. Vistar is founded on the exact opposite principle: we build systems so robust and clean that your team can run them autonomously.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            {PILLARS.map((p) => (
              <div key={p.code} className="space-y-2 bg-white/5 border border-white/10 p-5 rounded-xl">
                <span className="font-mono text-[9px] font-black text-[#d8ff42]">PILLAR // {p.code}</span>
                <h3 className="font-display font-black text-lg uppercase text-white leading-snug">{p.title}</h3>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Credibility & Verifiable Standards (Zero Fake Metrics) */}
        <div className="space-y-6">
          <div className="border-b border-black/10 pb-4">
            <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#ff1e90] block mb-1">
              09 // CREDIBILITY &amp; VERIFIABLE ENGINEERING STANDARDS
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-black">
              Built around real business problems. Not placeholder fiction.
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 border-[2.5px] border-black divide-x-[2.5px] divide-y-[2.5px] sm:divide-y-0 divide-black bg-[#faf9f5] rounded-2xl shadow-[4px_4px_0px_#000] overflow-hidden">
            <div className="p-6 text-center space-y-1">
              <div className="font-display font-black text-2xl sm:text-3xl text-black">&lt;100ms</div>
              <div className="font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Global Edge TTFB</div>
            </div>
            <div className="p-6 text-center space-y-1">
              <div className="font-display font-black text-2xl sm:text-3xl text-black">99+</div>
              <div className="font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Lighthouse P95 Score</div>
            </div>
            <div className="p-6 text-center space-y-1">
              <div className="font-display font-black text-2xl sm:text-3xl text-black">0.000</div>
              <div className="font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-widest">CLS Layout Shift SLA</div>
            </div>
            <div className="p-6 text-center space-y-1">
              <div className="font-display font-black text-2xl sm:text-3xl text-black">100%</div>
              <div className="font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Verified Code Ownership</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
