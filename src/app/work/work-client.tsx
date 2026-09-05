"use client";

import React from "react";
import Link from "next/link";
import { SphereRoom, type Project } from "@/components/ui/sphere-room";
import { SpotlightCard } from "@/components/spotlight-card";

// ─────────────────────────────────────────────────────────────────────────────
// Case Studies — 6 high-impact projects across different verticals
// ─────────────────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: "01",
    title: "Apex Algorithmic Ledger",
    client: "FinTech Trade Labs",
    metric: "+38% Signups // 140% Session Lift",
    desc: "A high-performance algorithmic trading interface for digital asset dealers. We built a custom WebGL shader pipeline displaying sub-millisecond real-time ledger metrics. This high-fidelity interface eliminated transaction lag, increased average user session times by 140%, and generated a 38% boost in signup conversions.",
    tags: ["WebGL", "Framer Motion", "Real-Time Telemetry", "Next.js"],
    status: "NDA Protected // Active",
  },
  {
    id: "02",
    title: "Router Scaling Compiler",
    client: "Enterprise Media Cloud",
    metric: "2.4× Speedup // +62% Search CTR",
    desc: "Complete architectural overhaul and edge routing deployment for a global media distribution network. By implementing Next.js native server-side rendering pipelines and eliminating code bottlenecks, we boosted load speeds by 240% and improved search engine visibility click-throughs by 62% under heavy traffic load.",
    tags: ["Next.js SSR", "Edge Functions", "API Routing", "PostgreSQL"],
    status: "NDA Protected // Deployed",
  },
  {
    id: "03",
    title: "Spatial Bio-Modeling Engine",
    client: "Helix Research Corp",
    metric: "1.2M Sessions // Zero Latency",
    desc: "Immersive spatial computed bio-modeling environment built directly inside the web browser. We designed and coded custom GLSL fluid simulation matrices, handling over 1.2M daily active user sessions without a single drop in render frame rate, bringing absolute clarity to heavy genetic datasets.",
    tags: ["Three.js", "GLSL Shaders", "Bio-Computing UI", "React"],
    status: "NDA Protected // Active",
  },
  {
    id: "04",
    title: "Phantom Commerce Engine",
    client: "Luminary DTC Brands",
    metric: "+220% AOV // 4.2× Conversion Rate",
    desc: "A revolutionary direct-to-consumer e-commerce platform combining AR try-on, AI-powered product recommendation, and a WebGL-rendered virtual showroom. The immersive product exploration experience increased average order values by 220% and quadrupled conversion rates compared to the client's previous Shopify storefront.",
    tags: ["AR.js", "Three.js", "Shopify Headless", "OpenAI", "Next.js"],
    status: "NDA Protected // Active",
  },
  {
    id: "05",
    title: "Neural Brand OS",
    client: "Axiom Ventures (Series A)",
    metric: "9 Brands // 72Hr Delivery",
    desc: "An AI-powered brand generation operating system that produces complete brand identities — logos, color systems, typography, motion design, and pitch decks — in under 72 hours. Built for a Series A-backed venture studio, the system generated 9 launch-ready brand identities across three portfolio companies in the first week of deployment.",
    tags: ["Gemini API", "Stable Diffusion", "Next.js", "Supabase", "Framer"],
    status: "NDA Protected // Active",
  },
  {
    id: "06",
    title: "Quantum Cryptography Matrix",
    client: "Defense Tech Coalition",
    metric: "256-Bit // Zero Vulnerability",
    desc: "A browser-based real-time cryptographic visualizer that compiles Rust-based post-quantum algorithms into WebAssembly, achieving ultra-high performance simulations of security matrices under simulated brute force attacks.",
    tags: ["WebAssembly", "Rust", "React", "Next.js", "Edge Functions"],
    status: "NDA Protected // Active",
  },
];

export default function WorkPage() {
  return (
    <div className="w-full relative bg-[#050510] text-white">
      {/* ── 1. 3D Spatial Interactive Sphere Room ───────────────────────────── */}
      <section className="relative w-full h-[88vh] overflow-hidden">
        <SphereRoom projects={projects} />
        
        {/* Subtle scroll down hint bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-25 pointer-events-auto">
          <a
            href="#catalogue"
            className="font-mono text-[9px] uppercase tracking-widest text-white/40 hover:text-[#d8ff42] transition-colors flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 interactive"
          >
            <span>Scroll for Full Specifications</span>
            <span className="text-xs">↓</span>
          </a>
        </div>
      </section>

      {/* ── 2. Editorial Case Studies Directory (Paper Canvas) ──────────────── */}
      <section id="catalogue" className="w-full bg-[#faf9f5] text-[#0a0a0a] py-24 px-6 sm:px-12 md:px-16 border-t-2 border-black relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b-2 border-black/10">
            <div className="space-y-3">
              <span className="font-mono text-[9px] font-extrabold tracking-[0.3em] uppercase text-[#ff1e90] bg-[#ff1e90]/10 border border-[#ff1e90]/20 px-3 py-1 rounded-full inline-block">
                Architectural Records // All Projects
              </span>
              <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-[#0a0a0a] leading-none">
                Case Study{" "}
                <span className="font-serif italic font-normal text-zinc-400 lowercase">
                  directory
                </span>
              </h2>
            </div>
            <p className="font-sans text-xs sm:text-sm text-zinc-600 max-w-sm leading-relaxed">
              Every system is engineered from raw primitives with guaranteed sub-second performance, strict type validation, and zero template dependencies.
            </p>
          </div>

          {/* 2-Column Neo-Brutalist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <div key={p.id} className="group cursor-pointer">
                <SpotlightCard
                  glowColor={i % 2 === 0 ? "rgba(255, 30, 144, 0.08)" : "rgba(216, 255, 66, 0.12)"}
                  borderColor={i % 2 === 0 ? "rgba(255, 30, 144, 0.25)" : "rgba(0, 0, 0, 0.2)"}
                  className={`border-[3px] border-black rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[380px] shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#ff1e90] transition-all duration-300 ${
                    i % 2 === 0 ? "bg-[#111111] text-white" : "bg-white text-black"
                  } interactive`}
                >
                  <div>
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-[#ff1e90]/15 text-[#ff1e90] border border-[#ff1e90]/20">
                          {p.id}
                        </span>
                        <span className={`font-serif italic text-xs ${i % 2 === 0 ? "text-zinc-400" : "text-zinc-500"}`}>
                          {p.client}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] font-extrabold uppercase px-2.5 py-1 rounded bg-[#d8ff42] text-black border border-black shadow-[1.5px_1.5px_0px_#000]">
                        {p.metric.split("//")[0].trim()}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`font-display font-black text-2xl sm:text-3xl uppercase tracking-tight leading-tight mb-4 ${
                      i % 2 === 0 ? "text-white" : "text-black"
                    }`}>
                      {p.title}
                    </h3>

                    {/* Description */}
                    <p className={`font-sans text-xs leading-relaxed ${
                      i % 2 === 0 ? "text-zinc-400" : "text-zinc-600"
                    }`}>
                      {p.desc}
                    </p>
                  </div>

                  {/* Footer tags and link */}
                  <div className="pt-6 mt-6 border-t border-black/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className={`font-mono text-[8px] font-bold uppercase px-2 py-0.5 rounded border ${
                            i % 2 === 0
                              ? "bg-white/5 border-white/10 text-zinc-400"
                              : "bg-black/5 border-black/10 text-zinc-600"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className={`font-mono text-[9px] font-extrabold uppercase tracking-widest inline-flex items-center gap-1 transition-colors ${
                        i % 2 === 0
                          ? "text-[#d8ff42] hover:text-white"
                          : "text-[#ff1e90] hover:text-black"
                      }`}
                    >
                      Request Architecture Spec →
                    </Link>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
