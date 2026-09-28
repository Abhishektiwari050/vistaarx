"use client";

import React from "react";

export function TrustProofMarquee() {
  const proofVectors = [
    {
      metric: "14 Days",
      title: "Fixed Milestone Cadence",
      description: "Deterministic 2-week production milestones with live demo deliverables. No slide decks.",
      accent: "text-[#0284C7]",
    },
    {
      metric: "100%",
      title: "Sovereign Code Ownership",
      description: "Direct Git repository handover on day one. You own 100% of code, schemas, and IP.",
      accent: "text-[#0B1320]",
    },
    {
      metric: "<100ms",
      title: "Edge Execution & LCP",
      description: "Sub-2.5s Largest Contentful Paint and 99+ Core Web Vitals audited by default.",
      accent: "text-[#00B4D8]",
    },
    {
      metric: "0% Fluff",
      title: "Senior Design Engineers",
      description: "Direct pairing with staff-level engineers. Zero junior account managers or middlemen.",
      accent: "text-[#0284C7]",
    },
  ];

  const clientPlatforms = [
    "Next.js 16 App Router",
    "FastAPI & Python 3.11",
    "PostgreSQL & Supabase",
    "Anthropic Claude 3.7",
    "OpenAI o3 Primitives",
    "Cloudflare Edge Workers",
    "TypeScript Strict Mode",
    "Tailwind CSS v4",
    "Docker & Cloud Deployments",
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#F0F7FC] via-[#F8FBFE] to-[#FFFFFF] border-b border-[rgba(14,165,233,0.12)] py-14 sm:py-18 overflow-hidden">
      <div className="vistar-container space-y-10">
        {/* Subtle Eyebrow with Sequential Number */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(14,165,233,0.12)] pb-5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
            <span className="uppercase tracking-wider font-semibold text-[#0B1320]">
              01 // Commercial Engineering Standard
            </span>
            <span className="text-[#0B1320]/25">•</span>
            <span>Deterministic Delivery Guarantees</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[11px] font-mono text-[#64748B]">
            <span>AUDITED CORE WEB VITALS</span>
            <span>ZERO VENDOR LOCK-IN</span>
            <span>SOVEREIGN INFRASTRUCTURE</span>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {proofVectors.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-[10px] border border-[rgba(14,165,233,0.12)] shadow-[0_2px_12px_rgba(2,132,199,0.04)] hover:border-[rgba(2,132,199,0.30)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.08)] transition-all duration-200 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className={`font-display text-3xl sm:text-4xl font-bold tracking-tight ${item.accent}`}>
                  {item.metric}
                </div>
                <h3 className="font-serif font-bold text-base text-[#0B1320] tracking-[-0.01em]">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs sm:text-[13.5px] text-[#475569] leading-relaxed font-serif">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Real Animated Continuous Marquee Ticker */}
      <div className="mt-10 pt-6 border-t border-[rgba(14,165,233,0.10)] relative overflow-hidden">
        <div className="flex whitespace-nowrap overflow-hidden select-none">
          <div
            className="flex items-center gap-8 font-mono text-xs text-[#64748B] shrink-0"
            style={{ animation: "marquee-scroll 28s linear infinite" }}
          >
            {clientPlatforms.concat(clientPlatforms).map((platform, i) => (
              <span key={i} className="flex items-center gap-2 hover:text-[#0284C7] transition-colors">
                <span className="text-[#0284C7]">/</span>
                <span className="tracking-wide text-[#0B1320]/80">{platform}</span>
                <span className="text-[#0284C7]/30 ml-6">✦</span>
              </span>
            ))}
          </div>
          <div
            className="flex items-center gap-8 font-mono text-xs text-[#64748B] shrink-0"
            style={{ animation: "marquee-scroll 28s linear infinite" }}
            aria-hidden="true"
          >
            {clientPlatforms.concat(clientPlatforms).map((platform, i) => (
              <span key={`dup-${i}`} className="flex items-center gap-2 hover:text-[#0284C7] transition-colors">
                <span className="text-[#0284C7]">/</span>
                <span className="tracking-wide text-[#0B1320]/80">{platform}</span>
                <span className="text-[#0284C7]/30 ml-6">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
