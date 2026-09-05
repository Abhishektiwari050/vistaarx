"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SpotlightCard } from "@/components/spotlight-card";
import { DigitalMuseum } from "@/components/ui/digital-museum";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

// ─────────────────────────────────────────────────────────────────────────────
// Real Production Projects & Commercial Case Studies
// ─────────────────────────────────────────────────────────────────────────────

interface CaseStudy {
  id: string;
  category: "AI & Automation" | "FinTech & SaaS" | "DTC & Commerce";
  title: string;
  client: string;
  clientType: string;
  timeline: string;
  highlightMetric: string;
  metricLabel: string;
  barrier: string;
  solution: string;
  impactMetrics: { label: string; value: string }[];
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "01",
    category: "AI & Automation",
    title: "Project VAYU // Aviation Intelligence",
    client: "Cockpit Safety & Aviation Operations",
    clientType: "Aviation AI & NOTAM Telemetry",
    timeline: "Production Deployed",
    highlightMetric: "<45ms Parsing",
    metricLabel: "Real-Time Hazard Decoding",
    barrier: "Pilots and flight dispatchers drown in hundreds of pages of raw, cryptic, uppercase NOTAM text strings, risking safety-critical airspace oversight during flight preparation.",
    solution: "Engineered an AI-powered aviation cockpit platform featuring interactive GIS airspace maps, automated NOTAM hazard decoding, NLP threat synthesis, and instant executive briefing reports.",
    impactMetrics: [
      { label: "Query Speed", value: "<45ms" },
      { label: "Data Accuracy", value: "99.8%" },
      { label: "Briefing Time", value: "-85%" },
    ],
    tags: ["Next.js 15", "TypeScript", "GIS Leaflet HUD", "NLP AI", "Tailwind CSS"],
    image: "/projects/vayu-briefing.png",
    liveUrl: "https://ai-vayu.vercel.app",
    githubUrl: "https://github.com/Abhishektiwari050/AI-VAYU",
  },
  {
    id: "02",
    category: "AI & Automation",
    title: "AURA // Multi-Agent Telemetry Engine",
    client: "Critical Care Telemetry Simulation",
    clientType: "Asynchronous Multi-Agent Architecture",
    timeline: "Production Deployed",
    highlightMetric: "Zero Latency",
    metricLabel: "Asynchronous Stream Anomaly Detection",
    barrier: "Clinical vital signs monitoring suffers from telemetry alert fatigue, high false-positive rates, and coupled monolithic architectures that choke under high-frequency biometric data bursts.",
    solution: "Architected a decoupled, multi-agent telemetry stream architecture over a distributed message broker with unsupervised Isolation Forest ML models to isolate critical biometric anomalies in real-time.",
    impactMetrics: [
      { label: "Telemetry Latency", value: "<15ms" },
      { label: "Detection Precision", value: "98.4%" },
      { label: "Broker Throughput", value: "10k msg/s" },
    ],
    tags: ["Python 3.11+", "Multi-Agent System", "Isolation Forest ML", "Telemetry Stream", "Render"],
    image: "/projects/aura-results.png",
    liveUrl: "https://multi-agent-anomaly-system.onrender.com",
    githubUrl: "https://github.com/Abhishektiwari050/multi-agent-anomaly-system",
  },
  {
    id: "03",
    category: "FinTech & SaaS",
    title: "Atify // Audiophile Android Music Engine",
    client: "Open Source Audio Engineering",
    clientType: "Android Native / Jetpack Compose",
    timeline: "Production Deployed",
    highlightMetric: "Bit-Perfect FLAC",
    metricLabel: "Lossless Audio Decoding Pipeline",
    barrier: "Mainstream streaming apps lock users into lossy compression, lack Android Auto parity, and offer zero cross-platform library synchronization across cloud and local media.",
    solution: "Engineered a modern MVVM native Android music engine with Jetpack Compose, featuring lossless Bit-Perfect FLAC playback, full Spotify account sync, and native Android Auto head-unit integration.",
    impactMetrics: [
      { label: "Audio Fidelity", value: "Lossless 24-bit" },
      { label: "Auto Sync", value: "Bi-directional" },
      { label: "UI FPS", value: "120Hz Native" },
    ],
    tags: ["Kotlin", "Jetpack Compose", "Android Auto", "Spotify SDK", "MVVM"],
    image: "/projects/atify-preview.jpg",
    githubUrl: "https://github.com/Abhishektiwari050/Atify",
  },
  {
    id: "04",
    category: "DTC & Commerce",
    title: "3axis Arc // Architectural Real Estate",
    client: "High-End Architectural Real Estate",
    clientType: "Immersive Real Estate & PropTech",
    timeline: "Production Deployed",
    highlightMetric: "60 FPS 3D",
    metricLabel: "Mouse-Tracking Parallax Shifts",
    barrier: "High-end luxury architectural developments failed to convert discerning investors when showcased on generic, flat real estate listing templates.",
    solution: "Crafted an industrial-chic architectural platform featuring interactive 3D parallax with mouse-tracking perspective shifts, structural typography, clip-path hover transitions, and instant lead inquiry flows.",
    impactMetrics: [
      { label: "Engagement Lift", value: "+180%" },
      { label: "Inquiry Velocity", value: "3.2×" },
      { label: "Lighthouse Score", value: "99 / 100" },
    ],
    tags: ["Next.js", "TypeScript", "3D Parallax", "Tailwind CSS", "Vercel"],
    image: "/projects/3axisarc.png",
    liveUrl: "https://3axisarc.vercel.app",
    githubUrl: "https://github.com/Abhishektiwari050/3axisarc",
  },
  {
    id: "05",
    category: "FinTech & SaaS",
    title: "Competence CRM // Enterprise Operations",
    client: "Competence Consulting E-commerce LLP",
    clientType: "Enterprise Operations & Pipeline Management",
    timeline: "Production Deployed",
    highlightMetric: "+45% Velocity",
    metricLabel: "Automated Deal Flow & Status Tracking",
    barrier: "Consulting operations were stalled by fragmented spreadsheets, untracked client deliverables, and manual client status reporting that hurt customer retention.",
    solution: "Architected a unified customer relationship and project management platform with Python backend, real-time client status automation, and activity telemetry logging.",
    impactMetrics: [
      { label: "Status Automation", value: "100%" },
      { label: "Team Velocity", value: "+45%" },
      { label: "Data Integrity", value: "Zero Loss" },
    ],
    tags: ["Python", "FastAPI / Django", "Reactive UI", "PostgreSQL", "Render"],
    image: "/projects/competence-crm.png",
    liveUrl: "https://competenceconsultingcrm.onrender.com",
    githubUrl: "https://github.com/Abhishektiwari050/CRM",
  },
  {
    id: "06",
    category: "DTC & Commerce",
    title: "Vayuways // Aviation & Charter Services",
    client: "Aviation Consultancy & Charter Operations",
    clientType: "Charter Travel & Fleet Logistics",
    timeline: "Production Deployed",
    highlightMetric: "95ms TTFB",
    metricLabel: "Sub-100ms Global Edge Response",
    barrier: "Private aviation clients require rapid charter route discovery and high-trust booking interfaces that typical generic booking plugins couldn't deliver.",
    solution: "Engineered a high-speed Next.js aviation services platform with modern flight inquiry dispatch, responsive fleet showcases, and edge server rendering.",
    impactMetrics: [
      { label: "Mobile Bounce Rate", value: "-38%" },
      { label: "Booking Inquiries", value: "+94%" },
      { label: "Global TTFB", value: "95ms" },
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Aviation Fleet"],
    image: "/projects/vayuways.png",
    liveUrl: "https://vayuways.vercel.app",
    githubUrl: "https://github.com/Abhishektiwari050/vayuways",
  },
  {
    id: "07",
    category: "FinTech & SaaS",
    title: "JBS Cargo // Freight Dispatch Platform",
    client: "JBS Cargo Movers",
    clientType: "Freight & Heavy Transport Logistics",
    timeline: "Production Deployed",
    highlightMetric: "<5 min Quotes",
    metricLabel: "Automated Freight Dispatch Workflows",
    barrier: "Cargo dispatch inquiries were delayed by legacy manual intake phone calls, resulting in lost freight contracts to regional transport competitors.",
    solution: "Developed an automated cargo inquiry and freight platform with instant quote dispatch, consignment tracking workflows, and cross-device responsive UI.",
    impactMetrics: [
      { label: "Quote Turnaround", value: "<5 mins" },
      { label: "Mobile Conversions", value: "+62%" },
      { label: "System Uptime", value: "99.99%" },
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Logistics Automation", "Vercel"],
    image: "/projects/jbs-cargo.png",
    liveUrl: "https://jbs-cargo.vercel.app",
    githubUrl: "https://github.com/Abhishektiwari050/jbs-cargo",
  },
  {
    id: "08",
    category: "DTC & Commerce",
    title: "KL Herbal // Ayurvedic E-Commerce",
    client: "KL Herbal Remedies",
    clientType: "Ayurvedic & Herbal E-Commerce",
    timeline: "Production Deployed",
    highlightMetric: "0.000 CLS",
    metricLabel: "Zero Shift Checkout Experience",
    barrier: "Mobile shoppers experienced high drop-offs due to slow product catalog filtering, clunky image layouts, and complex checkout friction.",
    solution: "Built a responsive, zero-layout-shift Next.js storefront with rich herbal remedy catalog classification, high-speed image optimization, and one-tap checkout.",
    impactMetrics: [
      { label: "Conversion Lift", value: "+34%" },
      { label: "Catalog Load", value: "<0.8s" },
      { label: "Checkout Completion", value: "+52%" },
    ],
    tags: ["Next.js", "TypeScript", "E-Commerce", "Tailwind CSS", "Vercel"],
    image: "/projects/klherbal.png",
    liveUrl: "https://klherbal.vercel.app",
    githubUrl: "https://github.com/Abhishektiwari050/KL-HERBAL",
  },
];

const CATEGORIES = ["All Work", "AI & Automation", "FinTech & SaaS", "DTC & Commerce"] as const;

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All Work");
  const [viewMode, setViewMode] = useState<"both" | "catalogue" | "pavilion">("both");

  const filteredProjects = activeCategory === "All Work"
    ? CASE_STUDIES
    : CASE_STUDIES.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full relative min-h-screen bg-[#faf9f5] text-[#0a0a0a] overflow-x-clip pt-28 pb-24">
      {/* Film grain noise overlay matching homepage */}
      <div className="noise-overlay" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 relative z-10 space-y-16">
        
        {/* ── 1. Editorial Hero Header ──────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3.5 py-1.5 rounded-md text-[9px] font-mono font-black tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#ff1e90]">
              <span className="w-2 h-2 rounded-full bg-[#d8ff42] border border-black animate-pulse" />
              VERIFIED PORTFOLIO // SHIPPED SYSTEMS &amp; ARCHIVE
            </div>

            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-[#0a0a0a] leading-[0.95]">
              Real systems. <br />
              <span className="font-serif italic font-normal text-zinc-400 lowercase">
                verified commercial impact.
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
              We build production software that delivers measurable ROI. Inspect our verified commercial deployments, open-source repositories, and high-performance architectures below.
            </p>
          </div>

          {/* View Mode Switcher Pills */}
          <div className="shrink-0 flex items-center p-1.5 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_#000]">
            <button
              onClick={() => {
                playTickSound();
                setViewMode("both");
              }}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider transition-all interactive ${
                viewMode === "both"
                  ? "bg-black text-[#d8ff42]"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              ◈ COMPLETE VIEW
            </button>
            <button
              onClick={() => {
                playTickSound();
                setViewMode("catalogue");
              }}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider transition-all interactive ${
                viewMode === "catalogue"
                  ? "bg-[#d8ff42] text-black border border-black"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              ☰ SHIPPED WORK
            </button>
            <button
              onClick={() => {
                playTickSound();
                setViewMode("pavilion");
              }}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider transition-all interactive ${
                viewMode === "pavilion"
                  ? "bg-[#ff1e90] text-white"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              ✦ 3D GALLERY
            </button>
          </div>
        </div>

        {/* ── 2. Metric Impact Banner (Brutalist Contrast Bar) ──────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-[3px] border-black divide-x-[3px] divide-y-[3px] md:divide-y-0 divide-black bg-white shadow-[6px_6px_0px_#000] rounded-2xl overflow-hidden select-none">
          <div className="p-6 text-center group hover:bg-[#d8ff42] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black leading-none mb-1">100%</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-black">Production Deployed</div>
          </div>
          <div className="p-6 text-center group hover:bg-[#ff1e90] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black group-hover:text-white leading-none mb-1">&lt;50ms</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white">Edge Query Latency</div>
          </div>
          <div className="p-6 text-center group hover:bg-[#d8ff42] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black leading-none mb-1">99+</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-black">Lighthouse Scores</div>
          </div>
          <div className="p-6 text-center group hover:bg-[#ff1e90] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black group-hover:text-white leading-none mb-1">100%</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white">Client Code Ownership</div>
          </div>
        </div>

        {/* ── 3. 3D Digital Museum Virtual Gallery Pavilion (Optional Mode) ─── */}
        {(viewMode === "both" || viewMode === "pavilion") && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#ff1e90]">
                  SECTION // 01
                </span>
                <span className="font-display text-sm font-black uppercase tracking-wider text-black">
                  ✦ Interactive Modern Art Pavilion
                </span>
              </div>
              <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
                CLICK PLINTHS OR DRAG SCENE TO NAVIGATE EXHIBITS
              </span>
            </div>
            <DigitalMuseum />
          </section>
        )}

        {/* ── 4. Curated Commercial Impact Catalogue ───────────────────────── */}
        {(viewMode === "both" || viewMode === "catalogue") && (
          <section id="catalogue" className="space-y-10 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-black/10 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#d8ff42] bg-black px-2 py-0.5 rounded">
                    SECTION // 02
                  </span>
                  <span className="font-display text-sm font-black uppercase tracking-wider text-black">
                    Shipped Products &amp; Verified Case Studies
                  </span>
                </div>
                <p className="font-sans text-xs text-zinc-500">
                  Select a category to filter live systems, open-source repositories, and verified engineering metrics.
                </p>
              </div>

              {/* Category Filter Bar */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        playTickSound();
                        setActiveCategory(cat);
                      }}
                      className={`px-3.5 py-1.5 font-display text-[9px] font-black uppercase tracking-wider rounded-lg border-2 transition-all duration-200 cursor-pointer interactive ${
                        isActive
                          ? "bg-black text-[#d8ff42] border-black shadow-[2px_2px_0px_#ff1e90]"
                          : "bg-white text-zinc-700 border-black/20 hover:border-black hover:bg-[#faf9f5]"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                SHOWING: <span className="text-black font-black">{filteredProjects.length} PROJECTS</span>
              </div>
            </div>

            {/* Comprehensive Case Study Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group"
                  >
                    <SpotlightCard
                      glowColor={idx % 2 === 0 ? "rgba(216, 255, 66, 0.15)" : "rgba(255, 30, 144, 0.12)"}
                      borderColor="rgba(0, 0, 0, 0.15)"
                      className="bg-white border-[2.5px] border-black rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[580px] shadow-[6px_6px_0px_#000000] hover:shadow-[10px_10px_0px_#ff1e90] transition-all duration-300"
                    >
                      <div className="space-y-5">
                        {/* Card Top Metadata */}
                        <div className="flex items-center justify-between border-b-2 border-black/10 pb-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] font-black px-2 py-0.5 rounded bg-black text-[#d8ff42]">
                              {item.id}
                            </span>
                            <span className="font-serif italic text-xs text-zinc-500">
                              {item.clientType}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] font-extrabold uppercase px-2.5 py-1 rounded bg-[#d8ff42] text-black border border-black shadow-[1.5px_1.5px_0px_#000]">
                              {item.highlightMetric}
                            </span>
                          </div>
                        </div>

                        {/* Project Visual Preview */}
                        <div className="relative w-full h-52 sm:h-60 rounded-xl overflow-hidden border-2 border-black bg-zinc-950 group/img">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover/img:opacity-50 transition-opacity" />
                          
                          {/* Live & Source Badges Overlay */}
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                            {item.liveUrl && (
                              <a
                                href={item.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d8ff42] text-black border border-black text-[10px] font-mono font-black uppercase tracking-wider shadow-[2px_2px_0px_#000] hover:bg-white transition-colors"
                              >
                                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                                Live App ↗
                              </a>
                            )}
                            <a
                              href={item.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/90 backdrop-blur-sm text-white border border-white/20 text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors ml-auto"
                            >
                              GitHub Code ↗
                            </a>
                          </div>
                        </div>

                        {/* Project Title & Client */}
                        <div>
                          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-black leading-tight">
                            {item.title}
                          </h3>
                          <p className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                            Domain: {item.client} · Status: {item.timeline}
                          </p>
                        </div>

                        {/* The Commercial Barrier & Solution Breakdown */}
                        <div className="space-y-3 pt-2 text-xs leading-relaxed font-sans">
                          <div className="bg-[#faf9f5] border border-black/10 p-3.5 rounded-xl space-y-1">
                            <span className="font-mono text-[8px] font-black tracking-widest uppercase text-[#ff1e90] block">
                              The Technical Challenge
                            </span>
                            <p className="text-zinc-600">{item.barrier}</p>
                          </div>

                          <div className="bg-[#faf9f5] border border-black/10 p-3.5 rounded-xl space-y-1">
                            <span className="font-mono text-[8px] font-black tracking-widest uppercase text-[#0a0a0a] block">
                              The Engineered Architecture
                            </span>
                            <p className="text-zinc-700 font-medium">{item.solution}</p>
                          </div>
                        </div>

                        {/* Impact Metrics Row */}
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/10">
                          {item.impactMetrics.map((m) => (
                            <div key={m.label} className="bg-white border border-black/15 p-2.5 rounded-xl text-center shadow-[1px_1px_0px_#000]">
                              <div className="font-display font-black text-sm text-black">{m.value}</div>
                              <div className="font-mono text-[7px] font-bold uppercase text-zinc-400 tracking-wider mt-0.5">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Bottom: Tech Pills + Contact Action */}
                      <div className="pt-6 mt-6 border-t-2 border-black/10 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[8px] font-bold uppercase px-2 py-0.5 rounded bg-black/5 border border-black/10 text-zinc-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link
                          href="/contact"
                          className="font-display text-[9px] font-black uppercase tracking-widest text-[#ff1e90] hover:text-black transition-colors inline-flex items-center gap-1 interactive"
                        >
                          Request Similar Build →
                        </Link>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* ── 5. Bottom Guarantee Callout ────────────────────────────────────── */}
        <div className="bg-[#111111] text-white border-[3px] border-black rounded-3xl p-8 sm:p-12 shadow-[8px_8px_0px_#d8ff42] flex flex-col md:flex-row items-center justify-between gap-8 select-none">
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-[9px] font-extrabold tracking-widest uppercase text-[#d8ff42] bg-[#d8ff42]/10 border border-[#d8ff42]/20 px-3 py-1 rounded-full inline-block">
              Full Engineering Handover
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white leading-none">
              Your next platform, built for speed &amp; ownership.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Every build includes written Core Web Vitals SLA guarantees, sub-100ms TTFB edge hosting, and complete, unencumbered GitHub source code handover on day 21.
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 bg-[#d8ff42] text-black font-display font-black text-xs tracking-widest uppercase px-8 py-5 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#ff1e90] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all interactive"
          >
            Start Your Build ⚡
          </Link>
        </div>

      </div>
    </div>
  );
}
