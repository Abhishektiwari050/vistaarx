"use client";

import React, { useState } from "react";
import { Button } from "@/components/vistar-button";
import { playClick } from "@/lib/sound";

interface SprintTier {
  id: string;
  badge: string;
  name: string;
  tagline: string;
  price: string;
  duration: string;
  bestFor: string;
  deliverables: string[];
  techStack: string[];
  highlight?: boolean;
}

const SPRINT_TIERS: SprintTier[] = [
  {
    id: "mvp",
    badge: "TIER 01 // 0→1 WEB APP",
    name: "Production Web Architecture",
    tagline: "Turn wireframes or legacy code into a sovereign, high-performance web platform.",
    price: "$4,800",
    duration: "14 Days Fixed",
    bestFor: "Startups and engineering leaders needing a flawless product launch with zero technical debt.",
    deliverables: [
      "Production Next.js 16 + React 19 web application",
      "Type-safe API architecture & PostgreSQL / Supabase schemas",
      "Bespoke design system & accessible component primitives",
      "Sub-2.5s LCP & 99+ Core Web Vitals audit compliance",
      "100% Git repository ownership transferred on day one",
    ],
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "PostgreSQL", "Cloudflare"],
  },
  {
    id: "ai-engine",
    badge: "TIER 02 // AUTONOMOUS AI",
    name: "Autonomous AI & Telemetry Engine",
    tagline: "Custom LLM workflows, multi-agent pipelines, and real-time streaming telemetry.",
    price: "$7,500",
    duration: "14 Days Fixed",
    bestFor: "Teams requiring production-ready AI (agent tool calling, vector search, GIS, or anomaly detection).",
    deliverables: [
      "Deterministic agent workflows with structured schema validation",
      "High-throughput vector search & knowledge retrieval pipelines",
      "Real-time WebSocket / SSE telemetry streaming infrastructure",
      "Automated evaluation suites & latency benchmarking (<120ms)",
      "Complete deployment runbooks & sovereign infrastructure code",
    ],
    techStack: ["Claude 3.7", "OpenAI o3", "FastAPI / Python", "pgvector", "Redis"],
    highlight: true,
  },
  {
    id: "growth",
    badge: "TIER 03 // DIGITAL REACH",
    name: "Sovereign Digital Growth Engine",
    tagline: "Programmatic search engines and ultra-high-converting digital platforms.",
    price: "$5,500",
    duration: "14 Days Fixed",
    bestFor: "Companies scaling customer acquisition with fast programmatic landing pages and elite craft.",
    deliverables: [
      "Programmatic SEO architecture generating thousands of indexable routes",
      "Interactive product configurators & dynamic calculators",
      "Hardware-accelerated 60fps micro-interactions & WebGL showcases",
      "End-to-end telemetry event tracking and conversion analytics",
      "Zero-CMS dependency — clean, version-controlled markdown & code",
    ],
    techStack: ["Next.js SSR", "Tailwind v4", "Schema.org LD+JSON", "Edge CDN"],
  },
];

export function SprintPackagesSection() {
  const [selectedTierId, setSelectedTierId] = useState<string>("ai-engine");

  return (
    <section className="relative w-full bg-gradient-to-b from-[#FFFFFF] via-[#F8FBFE] to-[#F0F7FC] border-b border-[rgba(14,165,233,0.12)] py-18 sm:py-24 font-serif">
      <div className="vistar-container space-y-14">
        {/* Section Header with Sequential Numbering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[rgba(14,165,233,0.12)] pb-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[rgba(14,165,233,0.15)] text-xs font-mono text-[#64748B] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span className="font-semibold text-[#0B1320]">06 // Transparent Sprint Packages</span>
              <span className="text-[#0B1320]/25">•</span>
              <span>Fixed Scope &amp; Pricing</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#050A14] tracking-[-0.03em] leading-tight">
              Production sprint packages with fixed pricing.
            </h2>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-serif">
              No open-ended hourly billing or runaway retainers. Every sprint is bounded by a fixed 14-day production milestone, transparent pricing, and live demo deliverables.
            </p>
          </div>

          <div className="hidden lg:block text-right font-mono text-xs text-[#64748B]">
            <span className="text-[#0284C7] font-semibold">100% Git IP Ownership</span>
            <br />
            <span>Zero Vendor Lock-in</span>
          </div>
        </div>

        {/* 3-Column Sprint Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {SPRINT_TIERS.map((tier) => {
            const isHighlighted = tier.highlight;

            return (
              <div
                key={tier.id}
                onClick={() => {
                  setSelectedTierId(tier.id);
                  playClick(2400, 0.02);
                }}
                className={`relative rounded-[12px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isHighlighted
                    ? "bg-white border-2 border-[#0284C7] shadow-[0_8px_32px_rgba(2,132,199,0.14)]"
                    : "bg-white border border-[rgba(14,165,233,0.14)] shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:border-[rgba(2,132,199,0.30)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.08)]"
                }`}
              >
                {/* Popular / Recommended Pill */}
                {isHighlighted && (
                  <div className="absolute -top-3 left-8 px-3 py-0.5 bg-gradient-to-r from-[#0284C7] to-[#0096C7] text-white text-[10.5px] font-mono font-bold uppercase tracking-wider rounded-full shadow-xs">
                    Most Popular Sprint
                  </div>
                )}

                <div className="space-y-6">
                  {/* Top Metadata & Price Anchor */}
                  <div className="space-y-3">
                    <span className="font-mono text-[11px] font-bold text-[#64748B] tracking-wider block">
                      {tier.badge}
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-[#0B1320] tracking-tight">
                      {tier.name}
                    </h3>
                    <p className="text-xs sm:text-[13.5px] text-[#475569] leading-relaxed font-serif">
                      {tier.tagline}
                    </p>

                    {/* Prominent Pricing Block */}
                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="font-display text-4xl font-bold text-[#050A14] tracking-tight">
                        {tier.price}
                      </span>
                      <span className="text-xs font-mono text-[#0284C7] font-semibold">
                        / {tier.duration}
                      </span>
                    </div>
                  </div>

                  {/* Cadence Badge */}
                  <div className="p-3 rounded-[6px] bg-[#F8FBFE] border border-[rgba(14,165,233,0.12)] flex items-center justify-between font-mono text-xs">
                    <span className="text-[#64748B]">Milestone Cadence:</span>
                    <span className="font-bold text-[#0B1320]">{tier.duration}</span>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-2.5 pt-1">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                      Guaranteed Deliverables:
                    </span>
                    <ul className="space-y-2 text-xs sm:text-[13px] text-[#0B1320] font-serif">
                      {tier.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#0284C7] font-bold mt-0.5">✓</span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="space-y-2 pt-2 border-t border-[rgba(14,165,233,0.10)]">
                    <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[#64748B] block">
                      Primary Tech Stack:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {tier.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-[4px] bg-[#F0F6FA] border border-[rgba(14,165,233,0.12)] text-[11px] font-mono text-[#0B1320]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-6">
                  <Button
                    variant={isHighlighted ? "primary" : "secondary"}
                    href={`/start?tier=${tier.id}`}
                    className="w-full justify-center"
                  >
                    Commission this Sprint →
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SprintPackagesSection;
