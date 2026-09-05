"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

export interface MuseumExhibit {
  id: string;
  romanId: string;
  title: string;
  client: string;
  clientType: string;
  metric: string;
  desc: string;
  medium: string;
  image: string;
  tags: string[];
}

export const MUSEUM_EXHIBITS: MuseumExhibit[] = [
  {
    id: "01",
    romanId: "EXHIBIT I",
    title: "Luminary Atelier Flagship",
    client: "Luminary Global Brands",
    clientType: "Luxury Direct-to-Consumer",
    metric: "+220% AOV // 4.2× Conversion Rate",
    desc: "A monumental obsidian and liquid mirror chrome sculpture exploring commercial frictionlessness. Edge-rendered product catalogs, sub-second routing, and lightweight WebGL material staging.",
    medium: "Obsidian, Liquid Chrome & Headless Next.js 16",
    image: "/museum/exhibit-1-monolith.jpg",
    tags: ["Next.js", "Shopify Headless", "WebGL Shaders"],
  },
  {
    id: "02",
    romanId: "EXHIBIT II",
    title: "Apex Algorithmic Ledger",
    client: "TradeLabs Global",
    clientType: "Institutional Digital Assets",
    metric: "+38% Signups // 140% Session Lift",
    desc: "Suspended brushed bronze and smoked quartz kinetic rings capturing sub-millisecond market volatility with zero render lag and real-time state synchronization.",
    medium: "Brushed Bronze, Quartz & Real-Time Telemetry",
    image: "/museum/exhibit-2-kinetic-rings.jpg",
    tags: ["WebGL", "Framer Motion", "WebSockets"],
  },
  {
    id: "03",
    romanId: "EXHIBIT III",
    title: "Axiom Neural Brand OS",
    client: "Axiom Venture Studio",
    clientType: "Series-A Portfolio Incubator",
    metric: "9 Brands Shipped // $14M Seed Closed",
    desc: "A neoclassical carved white marble bust merging into faceted frosted glass planes. An AI-augmented engine producing complete typography and production Next.js sites in 72 hours.",
    medium: "Carved Carrara Marble, Frosted Glass & Gemini API",
    image: "/museum/exhibit-3-neoclassical-bust.jpg",
    tags: ["Gemini API", "Next.js", "Supabase"],
  },
  {
    id: "04",
    romanId: "EXHIBIT IV",
    title: "Chronicle Global Media Engine",
    client: "Chronicle Digital",
    clientType: "Enterprise Media Cloud",
    metric: "2.4× Speedup // +62% Search CTR",
    desc: "Monumental architectural sculpture of stacked volcanic basalt and mirror titanium planes. Edge-rendered static architecture with intelligent prefetching serving 1.8M readers.",
    medium: "Basalt, Mirror Titanium & Cloudflare Edge SSR",
    image: "/museum/exhibit-4-basalt-stele.jpg",
    tags: ["Edge SSR", "Cloudflare Workers", "Next.js"],
  },
  {
    id: "05",
    romanId: "EXHIBIT V",
    title: "Verve High-Performance Storefront",
    client: "Verve Athletics",
    clientType: "DTC Performance Wear",
    metric: "+84% Mobile Sales // 0.000 CLS",
    desc: "A suspended aerodynamic ribbon sculpture of curving matte carbon fiber and liquid silver capturing motion in stillness. Strict zero-layout-shift architecture and instant Apple Pay checkout.",
    medium: "Matte Carbon Fiber, Liquid Silver & Stripe Elements",
    image: "/museum/exhibit-5-fluid-ribbon.jpg",
    tags: ["Next.js", "Stripe Elements", "Tailwind CSS"],
  },
  {
    id: "06",
    romanId: "EXHIBIT VI",
    title: "Synthetix Autonomous Pipeline",
    client: "Synthetix Cloud",
    clientType: "Enterprise Developer Tools",
    metric: "Zero Latency // +210% Trial Conversions",
    desc: "A complex faceted quantum crystal resting in an architectural glass pavilion. Compiling Rust WebAssembly with streaming token visualization and instant code generation.",
    medium: "Quantum Crystal, Polished Travertine & Rust Wasm",
    image: "/museum/exhibit-6-quantum-crystal.jpg",
    tags: ["WebAssembly", "Rust", "Next.js"],
  },
];

export function DigitalMuseum() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextExhibit = () => {
    playTickSound();
    setCurrentIndex((prev) => (prev + 1) % MUSEUM_EXHIBITS.length);
  };

  const prevExhibit = () => {
    playTickSound();
    setCurrentIndex((prev) => (prev - 1 + MUSEUM_EXHIBITS.length) % MUSEUM_EXHIBITS.length);
  };

  const current = MUSEUM_EXHIBITS[currentIndex];

  return (
    <div className="relative w-full rounded-3xl border-[3px] border-black bg-[#161616] text-[#faf9f5] overflow-hidden shadow-[8px_8px_0px_#000]">
      
      {/* ── Top Gallery Navigation Bar ───────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8 border-b-2 border-white/10 bg-[#111111]/80 backdrop-blur-md relative z-20">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#d8ff42] animate-pulse" />
          <span className="font-mono text-[10px] font-black tracking-widest uppercase text-white">
            CONTEMPORARY ART PAVILION // COMMISSIONED WORKS
          </span>
        </div>

        {/* Rapid Jump Exhibit Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl">
          {MUSEUM_EXHIBITS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                playTickSound();
                setCurrentIndex(idx);
              }}
              className={`px-3 py-1 rounded-lg font-mono text-[9px] font-black transition-all cursor-pointer ${
                currentIndex === idx
                  ? "bg-white text-black shadow-[2px_2px_0px_#000]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {item.id}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Museum Stage: Photographic Artwork + Floating Curatorial Placard ─ */}
      <div className="relative min-h-[580px] sm:min-h-[640px] w-full flex flex-col justify-end p-6 sm:p-12 overflow-hidden">
        
        {/* Background Museum Artwork Image with Crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full z-0"
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center"
            />
            {/* Subtle Vignette and Contrast Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* ── Curatorial Placard & Navigation Controls (Overlay) ─────────────── */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Curator Placard */}
          <motion.div
            key={`placard-${current.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-8 bg-[#111111]/90 backdrop-blur-xl border-2 border-white/20 p-6 sm:p-8 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,0.8)] space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded bg-white text-black">
                  {current.romanId}
                </span>
                <span className="font-serif italic text-xs text-zinc-300">
                  {current.clientType}
                </span>
              </div>
              <span className="font-mono text-[9px] font-black tracking-widest uppercase text-[#d8ff42] bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                {current.metric}
              </span>
            </div>

            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
                {current.title}
              </h2>
              <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest mt-1">
                Client: {current.client} · Medium: {current.medium}
              </p>
            </div>

            <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
              {current.desc}
            </p>

            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {current.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[8px] font-bold uppercase px-2 py-0.5 rounded bg-white/10 border border-white/10 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href="#catalogue"
                className="font-display text-[9px] font-black uppercase tracking-widest text-[#d8ff42] hover:text-white transition-colors inline-flex items-center gap-1"
              >
                Inspect Commercial Spec ↓
              </a>
            </div>
          </motion.div>

          {/* Previous / Next Exhibition Buttons */}
          <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-3 self-end">
            <button
              onClick={prevExhibit}
              aria-label="Previous artwork"
              className="px-5 py-3 rounded-xl border-2 border-white/20 bg-[#111111]/90 backdrop-blur-md text-white font-mono text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[3px_3px_0px_#000] cursor-pointer"
            >
              ← PREV
            </button>
            <div className="font-mono text-[10px] text-zinc-400 uppercase px-3 py-2 bg-black/60 rounded-lg border border-white/10">
              {currentIndex + 1} / {MUSEUM_EXHIBITS.length}
            </div>
            <button
              onClick={nextExhibit}
              aria-label="Next artwork"
              className="px-6 py-3 rounded-xl border-2 border-black bg-[#d8ff42] text-black font-mono text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-[3px_3px_0px_#000] cursor-pointer"
            >
              NEXT →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
