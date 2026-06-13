import React from "react";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/spotlight-card";

interface BentoCardProps {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
  glowStyle?: "pink" | "green";
}

export function BentoCard({
  eyebrow,
  title,
  description,
  className = "",
  children,
  glowStyle = "pink",
}: BentoCardProps) {
  const isGreen = glowStyle === "green";
  const glowColor = isGreen ? "rgba(216, 255, 66, 0.08)" : "rgba(255, 30, 144, 0.06)";
  const borderColor = isGreen ? "rgba(216, 255, 66, 0.3)" : "rgba(255, 30, 144, 0.2)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col justify-between overflow-hidden rounded-3xl ${className}`}
    >
      <SpotlightCard
        glowColor={glowColor}
        borderColor={borderColor}
        className="w-full h-full p-7 sm:p-9 flex flex-col justify-between border border-zinc-200/50 bg-white"
      >
        <div>
          {/* Visual Graphic Wrapper */}
          {children && (
            <div className="relative h-48 w-full rounded-2xl bg-[#faf9f5] border border-black/5 overflow-hidden mb-6 flex items-center justify-center">
              {children}
            </div>
          )}

          {/* Card Content */}
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] font-bold tracking-[2.2px] uppercase text-zinc-400">
                {eyebrow}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-black/10 group-hover:bg-[#ff1e90] transition-colors" />
            </div>
            <h3 className="font-display text-xl font-bold tracking-tight text-[#0a0a0a] leading-tight group-hover:text-[#ff1e90] transition-colors">
              {title}
            </h3>
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-light">
              {description}
            </p>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export function VistarBentoFeatures() {
  return (
    <section className="py-28 px-6 sm:px-12 md:px-16 relative overflow-hidden bg-[#faf9f5] border-b border-black/5">
      {/* Decorative Grid Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1100px] h-px bg-black/5" />

      <div className="max-w-[1100px] w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <span className="inline-flex items-center gap-1.5 border border-black/10 bg-[#0a0a0a] text-[#d8ff42] px-4 py-1.5 rounded-full text-[9px] font-bold tracking-[2.5px] uppercase mb-4">
              ✦ The Vistar Standard
            </span>
            <h2 className="font-display font-bold uppercase text-3xl sm:text-5xl tracking-tight text-[#0a0a0a] leading-none">
              Bespoke Systems.<br />
              <span className="font-serif text-zinc-400 font-light italic text-2xl sm:text-4xl normal-case">Zero compromise.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-xs sm:text-sm font-light max-w-[340px] leading-relaxed">
            Every platform we ship is hand-crafted, fully indexable, sub-second fast, and 100% owned by your brand from day one.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          
          {/* Card 1: Speed (Spans 3 Columns) */}
          <BentoCard
            eyebrow="Performance"
            title="Sub-Second Delivery"
            description="Static-first Next.js pages served from edge caches worldwide. Guaranteeing 100/100 Core Web Vitals to rank top and optimize customer conversions."
            className="md:col-span-3"
            glowStyle="green"
          >
            {/* Speed Gauge Simulation (Vectorized SVG + pure CSS) */}
            <div className="flex items-center justify-center gap-8 w-full px-4">
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* SVG circular gauge indicator */}
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <path
                    className="text-black/5"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <motion.path
                    className="text-[#d8ff42]"
                    strokeWidth="3.5"
                    strokeDasharray="100, 100"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    initial={{ strokeDasharray: "0, 100" }}
                    whileInView={{ strokeDasharray: "98, 100" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                {/* Gauge Info Text */}
                <div className="absolute flex flex-col items-center select-none">
                  <span className="font-display text-2xl font-black text-[#0a0a0a]">99%</span>
                  <span className="text-[6px] font-mono text-zinc-400 uppercase tracking-widest">Mobile</span>
                </div>
              </div>

              {/* Data Table */}
              <div className="flex flex-col gap-1.5 font-mono text-[9px] text-zinc-500">
                <div className="flex justify-between w-32 border-b border-black/5 pb-1">
                  <span>First Paint</span>
                  <span className="text-black font-bold">0.18s</span>
                </div>
                <div className="flex justify-between w-32 border-b border-black/5 pb-1">
                  <span>Interaction</span>
                  <span className="text-black font-bold">0.24s</span>
                </div>
                <div className="flex justify-between w-32">
                  <span>Total Payload</span>
                  <span className="text-black font-bold">14.2kb</span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 2: AI & Crawler SEO (Spans 3 Columns) */}
          <BentoCard
            eyebrow="Discoverability"
            title="AI & Search Engine Ready"
            description="Optimized with JSON-LD schemas and clean semantic markup. Formatted specifically for Google crawler bots and AI search engine agents."
            className="md:col-span-3"
          >
            {/* Search + Structured Data mockup */}
            <div className="flex flex-col gap-2 w-11/12 max-w-[320px] bg-white rounded-lg p-3 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-black/5 relative">
              {/* Magnifying Glass Search Bar */}
              <div className="flex items-center gap-2 border border-black/10 rounded-md px-2.5 py-1 bg-[#faf9f5]">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400 stroke-current" strokeWidth="2.5" fill="none">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="font-mono text-[9px] text-zinc-600">vistar studio services</span>
              </div>
              {/* Simulated Search Result */}
              <div className="space-y-1 mt-1 pl-1">
                <span className="text-[10px] font-bold text-[#ff1e90] block hover:underline">Vistar Studio: Custom Web Platforms &amp; n8n Automations</span>
                <span className="text-[8px] text-zinc-400 leading-normal block">
                  Bespoke React engineering. 100% complete repository transfer. Core Web Vitals guarantee. Shipped within 7-21 days.
                </span>
              </div>
              <div className="absolute bottom-2 right-2 border border-black/10 bg-[#d8ff42] text-black text-[7px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                Index Valid
              </div>
            </div>
          </BentoCard>

          {/* Card 3: Codebase Ownership (Spans 2 Columns) */}
          <BentoCard
            eyebrow="Independence"
            title="100% Repository Transfer"
            description="Complete git repository transfer. No monthly software license fees, platform lock-ins, or hostage codes. Host anywhere, anytime."
            className="md:col-span-2"
          >
            {/* Folder / Transfer animation */}
            <div className="flex flex-col gap-2.5 w-11/12 max-w-[200px]">
              <div className="flex items-center justify-between border-b border-black/5 pb-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#0a0a0a] font-bold">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-zinc-400 stroke-current" strokeWidth="2" fill="none">
                    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  <span>vistar-core/</span>
                </div>
                <span className="font-mono text-[7px] bg-[#d8ff42] text-black border border-black/10 px-1 rounded">git</span>
              </div>
              {/* File list */}
              <div className="flex flex-col gap-1.5 pl-2 text-[9px] font-mono text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#ff1e90] stroke-current" strokeWidth="2.5" fill="none">
                    <path d="M18 10a3 3 0 11-6 0 3 3 0 016 0zM6 4a3 3 0 110 6 3 3 0 010-6zM6 14a3 3 0 110 6 3 3 0 010-6zM6 10v4m0-4a3 3 0 003 3h3" />
                  </svg>
                  <span>main-branch/</span>
                </div>
                <div className="pl-4 text-zinc-400">├── next.config.ts</div>
                <div className="pl-4 text-[#ff1e90] font-bold">└── LICENSE.md (Fully Transferred)</div>
              </div>
            </div>
          </BentoCard>

          {/* Card 4: Zero Page Builders (Spans 2 Columns) */}
          <BentoCard
            eyebrow="Architecture"
            title="Zero Bloated Page Builders"
            description="No Elementor, no Webflow hosting fees, no custom WordPress plugin vulnerability cycles. Pure React, Next.js, and Tailwind CSS."
            className="md:col-span-2"
          >
            {/* Visual comparative bars */}
            <div className="flex flex-col gap-4 w-11/12 max-w-[200px]">
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[9px] font-bold text-black">
                  <span>Custom React Core</span>
                  <span className="text-[#ff1e90] font-bold">14.2 KB</span>
                </div>
                <div className="w-full bg-black/5 h-2 rounded-full border border-black/5 overflow-hidden">
                  <div className="bg-[#ff1e90] h-full w-[15%]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[9px] text-zinc-400">
                  <span>WordPress/Webflow</span>
                  <span>2.8 MB</span>
                </div>
                <div className="w-full bg-black/5 h-2 rounded-full border border-black/5 overflow-hidden">
                  <div className="bg-zinc-300 h-full w-[85%]" />
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 5: Automation (Spans 2 Columns) */}
          <BentoCard
            eyebrow="Efficiency"
            title="n8n & Webhook Pipelines"
            description="Automated lead capture, intelligent customer profile lookup, auto-response draft generation, and team updates."
            className="md:col-span-2"
            glowStyle="green"
          >
            {/* Pipeline flowchart nodes */}
            <div className="flex flex-col gap-2 w-11/12 max-w-[200px] font-mono text-[9px]">
              <div className="flex items-center gap-1.5 border border-black/10 rounded-lg px-2 py-1.5 bg-[#0a0a0a] text-white">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#d8ff42] stroke-current" strokeWidth="2.5" fill="none">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Lead Ingestion</span>
              </div>
              <div className="h-4 w-px bg-black ml-4" />
              <div className="flex items-center gap-1.5 border border-black/10 rounded-lg px-2 py-1.5 bg-white text-black font-bold">
                <span>Gemini Classifier</span>
                <span className="ml-auto text-[7px] text-[#ff1e90]">Done</span>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
