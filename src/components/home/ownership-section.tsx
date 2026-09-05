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
    <section id="ownership" className="py-28 px-6 sm:px-12 md:px-16 bg-[#faf9f5] border-t border-black/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Ownership Manifesto Box */}
        <div className="bg-[#121316] text-white border border-black rounded-3xl p-8 sm:p-14 shadow-[6px_6px_0px_#000] space-y-8 select-none">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 rounded text-[9px] font-mono font-bold tracking-[2px] uppercase text-[#d8ff42]">
            <span>04 // THE VISTAR SOVEREIGNTY MANIFESTO</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white leading-[0.92]">
            We build it. <br />
            We document it. <br />
            We hand it over. <br />
            <span className="text-[#d8ff42] font-serif italic font-normal lowercase">
              you own it.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
            Most software agencies create artificial dependencies so you are forced to pay them forever. Vistar operates on the exact opposite principle: we build systems so robust and clean that your internal team can operate them autonomously.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            {PILLARS.map((p) => (
              <div key={p.code} className="space-y-2 bg-white/[0.03] border border-white/10 p-5 rounded-xl">
                <span className="font-mono text-[9px] font-bold text-[#d8ff42]">PILLAR // {p.code}</span>
                <h3 className="font-display font-black text-lg uppercase text-white leading-snug">{p.title}</h3>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Guarantees */}
        <div className="space-y-6">
          <div className="border-b border-black/10 pb-4">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">
              ENGINEERING STANDARDS
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#0a0a0a]">
              Built for production. Zero placeholder fiction.
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 border border-black divide-x divide-y sm:divide-y-0 divide-black bg-white rounded-xl shadow-[3px_3px_0px_#000] overflow-hidden">
            <div className="p-6 text-center space-y-1">
              <div className="font-display font-black text-2xl sm:text-3xl text-black">100%</div>
              <div className="font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Source Code Handover</div>
            </div>
            <div className="p-6 text-center space-y-1">
              <div className="font-display font-black text-2xl sm:text-3xl text-black">Zero</div>
              <div className="font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Proprietary Lock-in</div>
            </div>
            <div className="p-6 text-center space-y-1">
              <div className="font-display font-black text-2xl sm:text-3xl text-black">0.000</div>
              <div className="font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-widest">CLS Layout Shift Target</div>
            </div>
            <div className="p-6 text-center space-y-1">
              <div className="font-display font-black text-2xl sm:text-3xl text-black">Public</div>
              <div className="font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-widest">GitHub Repositories</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
