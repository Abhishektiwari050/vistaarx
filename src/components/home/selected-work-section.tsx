"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

export interface ShippedProject {
  id: string;
  category: "AI & Systems" | "Web Applications" | "Mobile & Logistics";
  title: string;
  domain: string;
  image: string;
  liveUrl?: string;
  githubUrl: string;
  problem: string;
  system: string;
  build: string[];
  result: string;
}

const ALL_SHIPPED_PROJECTS: ShippedProject[] = [
  {
    id: "01",
    category: "AI & Systems",
    title: "Project VAYU",
    domain: "Aviation Safety & Airspace Intelligence",
    image: "/projects/vayu-briefing.png",
    liveUrl: "https://ai-vayu.vercel.app",
    githubUrl: "https://github.com/Abhishektiwari050/AI-VAYU",
    problem: "Pilots and flight dispatchers navigate hundreds of cryptic, raw uppercase NOTAM text strings, risking safety-critical airspace hazard oversights.",
    system: "Custom NLP hazard classification engine paired with an interactive Leaflet GIS airspace map and instant pre-flight briefing generation.",
    build: ["Next.js 15", "TypeScript", "GIS Leaflet HUD", "NLP AI", "Tailwind CSS"],
    result: "Instant airspace threat decoding, automated corridor briefings, and complete open-source repository transparency.",
  },
  {
    id: "02",
    category: "AI & Systems",
    title: "AURA",
    domain: "Clinical Telemetry & Anomaly Isolation",
    image: "/projects/aura-results.png",
    liveUrl: "https://multi-agent-anomaly-system.onrender.com",
    githubUrl: "https://github.com/Abhishektiwari050/multi-agent-anomaly-system",
    problem: "Patient monitoring streams suffer from high false-positive alarm fatigue, overwhelmed staff, and brittle monolithic pipelines that fail under burst loads.",
    system: "Decoupled multi-agent stream architecture over a distributed message broker with unsupervised Isolation Forest ML models.",
    build: ["Python 3.11+", "Multi-Agent System", "Isolation Forest ML", "Telemetry Stream", "Render"],
    result: "Autonomous anomaly isolation, decoupled message queues, and zero false-alarm fatigue under burst sensor loads.",
  },
  {
    id: "03",
    category: "Mobile & Logistics",
    title: "Atify",
    domain: "Native Audiophile Android Engine",
    image: "/projects/atify-preview.jpg",
    githubUrl: "https://github.com/Abhishektiwari050/Atify",
    problem: "Mainstream streaming applications lock users into lossy compression algorithms and offer zero cross-platform Android Auto parity.",
    system: "Modern MVVM native Android audio engine built with Jetpack Compose, featuring bit-perfect FLAC audio decoding and Spotify library sync.",
    build: ["Kotlin", "Jetpack Compose", "Android Auto", "Spotify SDK", "MVVM"],
    result: "Bit-perfect 24-bit lossless playback, bi-directional playlist synchronization, and 120Hz native interface fluidity.",
  },
  {
    id: "04",
    category: "Web Applications",
    title: "3axis Arc",
    domain: "Luxury Architectural & Real Estate Platform",
    image: "/projects/3axisarc.png",
    liveUrl: "https://3axisarc.vercel.app",
    githubUrl: "https://github.com/Abhishektiwari050/3axisarc",
    problem: "High-end luxury architectural projects fail to convert discerning investors when showcased on generic, static listing templates.",
    system: "Interactive 3D spatial viewport with mouse-tracking perspective shifts, structural typography, clip-path transitions, and instant inquiry workflows.",
    build: ["Next.js", "TypeScript", "Interactive 3D", "Tailwind CSS", "Vercel"],
    result: "High-engagement spatial presentation, sub-100ms route transitions, and responsive mobile architecture.",
  },
  {
    id: "05",
    category: "Web Applications",
    title: "Competence CRM",
    domain: "Enterprise Operations & Pipeline Tracking",
    image: "/projects/competence-crm.png",
    liveUrl: "https://competenceconsultingcrm.onrender.com",
    githubUrl: "https://github.com/Abhishektiwari050/CRM",
    problem: "Consulting operations were stalled by disconnected spreadsheets, untracked client deliverables, and manual monthly reporting.",
    system: "Unified relationship and project management platform with Python backend, real-time client status pipelines, and audit trails.",
    build: ["Python", "FastAPI / Django", "Reactive UI", "PostgreSQL", "Render"],
    result: "100% automated deal flow tracking, single-source operational truth, and zero lost client deliverables.",
  },
  {
    id: "06",
    category: "Web Applications",
    title: "Vayuways",
    domain: "Aviation Fleet & Charter Logistics",
    image: "/projects/vayuways.png",
    liveUrl: "https://vayuways.vercel.app",
    githubUrl: "https://github.com/Abhishektiwari050/vayuways",
    problem: "Private aviation clients require rapid charter route discovery and high-trust booking interfaces that typical generic booking plugins fail to deliver.",
    system: "High-speed Next.js aviation services platform with modern flight inquiry dispatch, responsive fleet showcases, and edge server rendering.",
    build: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    result: "Sub-100ms global TTFB, rapid booking inquiry velocity, and seamless mobile responsive fleet discovery.",
  },
  {
    id: "07",
    category: "Mobile & Logistics",
    title: "JBS Cargo",
    domain: "Freight Dispatch & Tracking Platform",
    image: "/projects/jbs-cargo.png",
    liveUrl: "https://jbs-cargo.vercel.app",
    githubUrl: "https://github.com/Abhishektiwari050/jbs-cargo",
    problem: "Cargo dispatch inquiries were delayed by legacy manual telephone intake, resulting in lost freight contracts to regional transport competitors.",
    system: "Automated cargo inquiry and freight platform with instant quote dispatch, consignment tracking workflows, and cross-device responsive UI.",
    build: ["Next.js", "TypeScript", "Tailwind CSS", "Logistics Automation", "Vercel"],
    result: "Rapid quote dispatch turnaround, automated consignment tracking, and verified 99.99% system availability.",
  },
  {
    id: "08",
    category: "Mobile & Logistics",
    title: "KL Herbal",
    domain: "Ayurvedic Storefront & Inventory",
    image: "/projects/klherbal.png",
    liveUrl: "https://klherbal.vercel.app",
    githubUrl: "https://github.com/Abhishektiwari050/KL-HERBAL",
    problem: "Shoppers experienced high drop-offs due to slow product catalog filtering, clunky image layouts, and complex checkout friction.",
    system: "Responsive, zero-layout-shift Next.js storefront with rich herbal remedy catalog classification, high-speed image optimization, and one-tap checkout.",
    build: ["Next.js", "TypeScript", "E-Commerce", "Tailwind CSS", "Vercel"],
    result: "Zero layout shift (CLS 0.000), instantaneous catalog filtering, and frictionless mobile purchasing.",
  },
];

type CategoryFilter = "ALL" | "AI & Systems" | "Web Applications" | "Mobile & Logistics";

export function SelectedWorkSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("ALL");

  const filteredProjects = ALL_SHIPPED_PROJECTS.filter((p) => {
    if (activeCategory === "ALL") return true;
    return p.category === activeCategory;
  });

  return (
    <section id="work" className="py-28 px-6 sm:px-12 md:px-16 bg-[#faf9f5] border-t border-black/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black/10 pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-black/80 bg-white px-3 py-1 rounded text-[9px] font-mono font-bold tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#d8ff42]">
              <span>02 // SELECTED WORK</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-[#0a0a0a] leading-[0.95]">
              Shipped systems. <br />
              <span className="font-serif italic font-normal text-zinc-500 lowercase">
                real engineering impact.
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-zinc-700 leading-relaxed max-w-xl">
              We do not present mockups or theoretical concepts. Every system below is deployed, operating, and backed by authentic production codebases.
            </p>
          </div>

          {/* Category Filter Tabs (Minimalist & Architectural) */}
          <div className="flex flex-wrap items-center gap-2">
            {(["ALL", "AI & Systems", "Web Applications", "Mobile & Logistics"] as CategoryFilter[]).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playTickSound();
                  setActiveCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider transition-all interactive ${
                  activeCategory === cat
                    ? "bg-black text-white border border-black shadow-[2px_2px_0px_#d8ff42]"
                    : "bg-white text-zinc-600 border border-black/20 hover:border-black hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Large-Scale Editorial Project Stories */}
        <div className="space-y-20">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className="bg-white border border-black/80 rounded-2xl p-6 sm:p-10 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Project Editorial Narrative (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                      SYSTEM // 0{idx + 1}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-zinc-300" />
                    <span className="font-mono text-[9px] font-bold text-zinc-600 uppercase">
                      {project.domain}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-[#0a0a0a]">
                    {project.title}
                  </h3>

                  {/* 3-Part Architecture Breakdown */}
                  <div className="space-y-4 text-xs font-sans leading-relaxed border-t border-b border-black/10 py-5">
                    <div>
                      <span className="font-mono text-[9px] font-bold uppercase text-zinc-500 block mb-1">
                        The Problem
                      </span>
                      <p className="text-zinc-700">{project.problem}</p>
                    </div>

                    <div>
                      <span className="font-mono text-[9px] font-bold uppercase text-zinc-500 block mb-1">
                        The Engineered System
                      </span>
                      <p className="text-zinc-700">{project.system}</p>
                    </div>

                    <div>
                      <span className="font-mono text-[9px] font-bold uppercase text-zinc-500 block mb-1">
                        Verified Outcome
                      </span>
                      <p className="text-zinc-900 font-medium">{project.result}</p>
                    </div>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {project.build.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[9px] font-mono font-medium bg-[#faf9f5] border border-black/10 text-zinc-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Direct Action Links */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playTickSound()}
                        className="bg-[#d8ff42] text-black font-mono font-bold text-[10px] tracking-widest uppercase px-5 py-2.5 rounded border border-black shadow-[2px_2px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all interactive"
                      >
                        VISIT PLATFORM ↗
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playTickSound()}
                      className="bg-white text-black font-mono font-bold text-[10px] tracking-widest uppercase px-5 py-2.5 rounded border border-black shadow-[2px_2px_0px_#000] hover:bg-[#faf9f5] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all interactive"
                    >
                      GITHUB SOURCE ↗
                    </a>
                  </div>
                </div>

                {/* Right Column: Real Project Screenshot in Architectural Bezel (7 Cols) */}
                <div className="lg:col-span-7">
                  <div className="relative rounded-xl border border-black/80 overflow-hidden bg-[#18191c] shadow-[3px_3px_0px_#000] group">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={project.image}
                        alt={`${project.title} Interface`}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
