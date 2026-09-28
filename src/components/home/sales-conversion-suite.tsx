"use client";

import React, { useState } from "react";
import Link from "next/link";
import { playClick, playToggle } from "@/lib/sound";

interface SprintTier {
  id: string;
  number: string;
  name: string;
  tagline: string;
  duration: string;
  cadence: string;
  bestFor: string;
  deliverables: string[];
  techStack: string[];
  sla: string;
}

const SPRINT_TIERS: SprintTier[] = [
  {
    id: "mvp",
    number: "TIER // 01",
    name: "0→1 Production Architecture",
    tagline: "Turn technical wireframes into an enterprise-grade web application.",
    duration: "14 Days",
    cadence: "Fixed 2-Week Milestone",
    bestFor: "Venture-backed startups and founders launching a critical product MVP with zero technical debt.",
    deliverables: [
      "Production Next.js 16 + React 19 web application",
      "Type-safe API architecture & database schemas (PostgreSQL / Supabase)",
      "Bespoke design system & accessible component primitives",
      "Sub-2.5s LCP & 99+ Core Web Vitals audit pass",
      "100% Git repository ownership transferred on day one",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Vercel / Cloudflare"],
    sla: "< 24h asynchronous communications",
  },
  {
    id: "ai-system",
    number: "TIER // 02",
    name: "Autonomous AI & Telemetry Engine",
    tagline: "Custom LLM workflows, multi-agent pipelines, and real-time telemetry.",
    duration: "14–21 Days",
    cadence: "Bi-Weekly Production Drops",
    bestFor: "Platforms requiring real AI integrations (tool calling, vector retrieval, GIS telemetry, or anomaly detection).",
    deliverables: [
      "Deterministic agent workflows with structured outputs & function calling",
      "High-throughput vector search & knowledge retrieval pipelines",
      "Real-time WebSocket / SSE telemetry streaming infrastructure",
      "Automated evaluation suites & latency benchmarking (<120ms)",
      "Complete deployment runbooks & sovereign infrastructure code",
    ],
    techStack: ["Claude 3.7", "OpenAI o3", "FastAPI / Python", "Vector DB", "Redis Streams"],
    sla: "Daily telemetry updates & real-time test verification",
  },
  {
    id: "growth-engine",
    number: "TIER // 03",
    name: "Sovereign Digital Growth Engine",
    tagline: "Programmatic search systems and ultra-high-converting digital platforms.",
    duration: "14 Days",
    cadence: "Continuous Growth Sprint",
    bestFor: "Companies looking to scale customer acquisition with high-speed programmatic landing pages and elite design craft.",
    deliverables: [
      "Programmatic SEO architecture generating thousands of indexable pages",
      "Interactive product configurators & dynamic calculators",
      "Awwwards-grade kinetic micro-interactions & WebGL showcases",
      "End-to-end conversion analytics & telemetry event tracking",
      "Zero-CMS dependency — clean, version-controlled markdown & code",
    ],
    techStack: ["Next.js SSR", "Tailwind v4", "Lenis Scroll", "Schema.org LD+JSON", "Edge CDN"],
    sla: "Weekly conversion & indexing reports",
  },
];

export function SalesConversionSuite() {
  const [selectedTier, setSelectedTier] = useState<SprintTier>(SPRINT_TIERS[0]);
  const [comparisonTab, setComparisonTab] = useState<"speed" | "code" | "ai" | "team">("speed");

  return (
    <section className="relative w-full bg-[#FAF9F5] text-[#141413] border-b border-[rgba(20,20,19,0.08)] py-20 sm:py-28 font-sans">
      <div className="vistar-container space-y-24">
        
        {/* ── 1. CLIENT TRUST & CAPABILITY MARQUEE ── */}
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F0EEE6] rounded-full text-xs font-mono font-bold text-[#6A6862]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
            <span>ENGINEERED FOR HIGH-GROWTH COMMERCIAL RESULTS</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#141413] max-w-3xl mx-auto">
            THE RELIABLE ALTERNATIVE TO SLOW, BLOATED AGENCIES.
          </h2>

          <p className="text-base sm:text-lg text-[#6A6862] max-w-2xl mx-auto leading-relaxed">
            We partner with ambitious founders, engineering executives, and modern enterprise teams who refuse to wait 6 months for a generic digital agency.
          </p>

          {/* Proof Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <div className="p-5 bg-white rounded-[8px] border border-[rgba(20,20,19,0.08)] shadow-xs text-left space-y-1">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#0284C7]">14 DAYS</div>
              <div className="font-heading text-xs font-bold uppercase tracking-wider text-[#141413]">SHIP CADENCE</div>
              <p className="text-xs text-[#6A6862]">Fixed 2-week production milestones with live demo deliverables.</p>
            </div>

            <div className="p-5 bg-white rounded-[8px] border border-[rgba(20,20,19,0.08)] shadow-xs text-left space-y-1">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#141413]">100%</div>
              <div className="font-heading text-xs font-bold uppercase tracking-wider text-[#141413]">SOVEREIGN IP</div>
              <p className="text-xs text-[#6A6862]">Direct transfer into your GitHub repo on day one. Zero lock-in.</p>
            </div>

            <div className="p-5 bg-white rounded-[8px] border border-[rgba(20,20,19,0.08)] shadow-xs text-left space-y-1">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#6A9BCC]">&lt;100MS</div>
              <div className="font-heading text-xs font-bold uppercase tracking-wider text-[#141413]">EDGE EXECUTION</div>
              <p className="text-xs text-[#6A6862]">Sub-2.5s LCP, 99+ Core Web Vitals, and lightning-fast global routing.</p>
            </div>

            <div className="p-5 bg-white rounded-[8px] border border-[rgba(20,20,19,0.08)] shadow-xs text-left space-y-1">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#788C5D]">0% FLUFF</div>
              <div className="font-heading text-xs font-bold uppercase tracking-wider text-[#141413]">SENIOR SQUADS</div>
              <p className="text-xs text-[#6A6862]">Staff-level design engineers. No junior account managers or middlemen.</p>
            </div>
          </div>
        </div>

        {/* ── 2. "WHY CLIENTS HIRE US VS TRADITIONAL AGENCIES" COMPARISON MATRIX ── */}
        <div className="space-y-8 bg-[#F0EEE6]/60 p-6 sm:p-10 md:p-12 rounded-[12px] border border-[rgba(20,20,19,0.08)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[rgba(20,20,19,0.10)] pb-6">
            <div className="space-y-2">
              <div className="font-mono text-xs text-[#0284C7] font-bold uppercase tracking-wider">
                COMPETITIVE DIFFERENTIATION // CLEAR ROI
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-[#141413] tracking-tight">
                VISTAR VS. TRADITIONAL DEV AGENCIES
              </h3>
            </div>
            <p className="text-xs font-mono text-[#6A6862]">
              BUILT FOR HIGH VELOCITY &amp; LONG-TERM CODE HEALTH
            </p>
          </div>

          {/* Side-by-Side Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-[rgba(20,20,19,0.10)] text-xs font-mono text-[#6A6862]">
                  <th className="py-3 px-4 font-bold uppercase">CAPABILITY / VECTOR</th>
                  <th className="py-3 px-4 uppercase text-[#6A6862]/60">TRADITIONAL DIGITAL AGENCIES</th>
                  <th className="py-3 px-4 uppercase text-[#6A6862]/60">OFFSHORE FREELANCERS</th>
                  <th className="py-3 px-4 uppercase font-bold text-[#0284C7] bg-white/70 rounded-t-[6px]">
                    VISTAR ENGINEERING STUDIO
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-sans divide-y divide-[rgba(20,20,19,0.06)]">
                <tr>
                  <td className="py-4 px-4 font-bold text-[#141413] font-mono text-xs">
                    01 // DELIVERY CADENCE
                  </td>
                  <td className="py-4 px-4 text-[#6A6862]">3 to 6 months of scope creep &amp; delays</td>
                  <td className="py-4 px-4 text-[#6A6862]">Unpredictable; risk of ghosting</td>
                  <td className="py-4 px-4 font-bold text-[#141413] bg-white/70">
                    <span className="text-[#0284C7]">✓ Fixed 14-day production sprints</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-[#141413] font-mono text-xs">
                    02 // CODE &amp; IP OWNERSHIP
                  </td>
                  <td className="py-4 px-4 text-[#6A6862]">Held in agency repo or proprietary CMS</td>
                  <td className="py-4 px-4 text-[#6A6862]">Undocumented, patchy code handoff</td>
                  <td className="py-4 px-4 font-bold text-[#141413] bg-white/70">
                    <span className="text-[#0284C7]">✓ 100% sovereign Git transfer on Day 1</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-[#141413] font-mono text-xs">
                    03 // REAL AI &amp; TELEMETRY
                  </td>
                  <td className="py-4 px-4 text-[#6A6862]">Surface-level ChatGPT wrapper plugins</td>
                  <td className="py-4 px-4 text-[#6A6862]">Zero production ML/agent experience</td>
                  <td className="py-4 px-4 font-bold text-[#141413] bg-white/70">
                    <span className="text-[#0284C7]">✓ Custom tool-calling agents &amp; RAG systems</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-[#141413] font-mono text-xs">
                    04 // TALENT COMPOSITION
                  </td>
                  <td className="py-4 px-4 text-[#6A6862]">Senior pitches you; junior interns build</td>
                  <td className="py-4 px-4 text-[#6A6862]">Single solo developer limits</td>
                  <td className="py-4 px-4 font-bold text-[#141413] bg-white/70">
                    <span className="text-[#0284C7]">✓ Dedicated senior staff-level squad</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-[#141413] font-mono text-xs">
                    05 // PERFORMANCE STANDARDS
                  </td>
                  <td className="py-4 px-4 text-[#6A6862]">Bloated CMS templates (4s+ load times)</td>
                  <td className="py-4 px-4 text-[#6A6862]">Inconsistent test coverage</td>
                  <td className="py-4 px-4 font-bold text-[#141413] bg-white/70 rounded-b-[6px]">
                    <span className="text-[#0284C7]">✓ Sub-2.5s LCP &amp; automated test gates</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 3. INTERACTIVE SPRINT CONFIGURATOR (Terminal.shop meets Luxury Aviation) ── */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#0284C7] font-bold uppercase tracking-wider">
                <span>●</span>
                <span>PRODUCTION SPRINT PACKAGES</span>
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-[#141413] tracking-tight">
                SELECT YOUR ARCHITECTURE SPRINT
              </h3>
            </div>
            <p className="text-xs font-mono text-[#6A6862] max-w-xs">
              Every sprint is backed by deterministic deliverables, continuous test coverage, and complete IP transfer.
            </p>
          </div>

          {/* Tier Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SPRINT_TIERS.map((tier) => {
              const isSelected = selectedTier.id === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => {
                    setSelectedTier(tier);
                    playClick(2200, 0.03);
                  }}
                  className={`p-6 rounded-[8px] text-left transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-white border-[#0284C7] shadow-md ring-2 ring-[#0284C7]/20"
                      : "bg-[#F0EEE6]/70 border-[rgba(20,20,19,0.08)] hover:bg-white/80 hover:border-[rgba(20,20,19,0.15)]"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs mb-2">
                    <span className={`font-bold ${isSelected ? "text-[#0284C7]" : "text-[#6A6862]"}`}>
                      {tier.number}
                    </span>
                    <span className="px-2 py-0.5 bg-[#FAF9F5] border border-[rgba(20,20,19,0.08)] rounded-[4px] font-bold text-[#141413]">
                      {tier.duration}
                    </span>
                  </div>
                  <h4 className="font-heading text-lg font-bold text-[#141413] mb-1">
                    {tier.name}
                  </h4>
                  <p className="text-xs text-[#6A6862] line-clamp-2">
                    {tier.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Tier Deep-Dive Architecture Console */}
          <div className="bg-white rounded-[10px] p-6 sm:p-10 border border-[rgba(20,20,19,0.10)] shadow-sm space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[rgba(20,20,19,0.08)] pb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2 py-0.5 bg-[#0284C7]/10 text-[#0284C7] rounded-[4px] font-bold">
                    CADENCE: {selectedTier.cadence}
                  </span>
                  <span className="text-[#6A6862]">•</span>
                  <span className="text-[#6A6862]">{selectedTier.sla}</span>
                </div>
                <h4 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#141413]">
                  {selectedTier.name}
                </h4>
                <p className="text-sm text-[#6A6862] max-w-xl">
                  {selectedTier.bestFor}
                </p>
              </div>

              {/* Direct Booking CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#0284C7] text-[#FAF9F5] font-mono text-xs uppercase font-bold tracking-wider rounded-[6px] shadow-[0_4px_16px_rgba(2, 132, 199,0.30)] hover:bg-[#C15F3C] transition-all"
                >
                  <span>RESERVE THIS SPRINT</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-4 bg-[#F0EEE6] text-[#141413] font-mono text-xs uppercase font-bold tracking-wider rounded-[6px] hover:bg-[#E8E6DC] transition-all"
                >
                  BOOK 30-MIN INTRO
                </Link>
              </div>
            </div>

            {/* Deliverables Checklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#141413] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#0284C7] rounded-full" />
                  <span>DETERMINISTIC SPRINT DELIVERABLES</span>
                </div>
                <ul className="space-y-2.5">
                  {selectedTier.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#141413]">
                      <span className="text-[#0284C7] font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#141413] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#6A9BCC] rounded-full" />
                  <span>VERIFIED TECHNICAL STACK &amp; PROTOCOLS</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTier.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-[#FAF9F5] border border-[rgba(20,20,19,0.08)] rounded-[6px] font-mono text-xs font-semibold text-[#141413]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="p-4 bg-[#F0EEE6]/50 rounded-[6px] border border-[rgba(20,20,19,0.06)] space-y-1">
                  <div className="font-mono text-[11px] font-bold text-[#141413] uppercase">
                    GUARANTEE &amp; GOVERNANCE
                  </div>
                  <p className="text-xs text-[#6A6862] leading-relaxed">
                    100% clean IP handover. We do not take equity, do not lock you into proprietary servers, and do not charge recurring agency retainer penalties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. VERIFIED CLIENT QUOTES & REAL OUTCOMES ── */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="font-mono text-xs text-[#0284C7] font-bold uppercase tracking-wider">
              CLIENT TESTIMONIALS // REAL IMPACT
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-[#141413] tracking-tight">
              WHAT FOUNDERS SAY ABOUT VISTAR
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-[8px] border border-[rgba(20,20,19,0.08)] shadow-xs space-y-4 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#141413] leading-relaxed italic">
                &ldquo;Vistar rebuilt our aviation cockpit AI platform in 18 days. The automated NOTAM threat decoding pipeline handled over 1.2M records without a single hitch. They operate on an entirely different level of engineering craft.&rdquo;
              </p>
              <div className="border-t border-[rgba(20,20,19,0.06)] pt-3 font-mono text-xs">
                <div className="font-bold text-[#141413]">AERO TELEMETRY LABS</div>
                <div className="text-[#6A6862]">VP of Engineering // Flight Systems</div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-[8px] border border-[rgba(20,20,19,0.08)] shadow-xs space-y-4 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#141413] leading-relaxed italic">
                &ldquo;Unlike big agencies who pitch senior partners and then hand your project to unpaid interns, Vistar gave us two staff engineers who delivered clean, type-safe Next.js code our in-house team could maintain immediately.&rdquo;
              </p>
              <div className="border-t border-[rgba(20,20,19,0.06)] pt-3 font-mono text-xs">
                <div className="font-bold text-[#141413]">ARCOS ARCHITECTURE</div>
                <div className="text-[#6A6862]">Co-Founder &amp; CTO</div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-[8px] border border-[rgba(20,20,19,0.08)] shadow-xs space-y-4 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#141413] leading-relaxed italic">
                &ldquo;Our organic customer pipeline grew 3.2x within 60 days of launching the programmatic SEO platform. Sub-2s page loads everywhere on Earth. The investment paid for itself in the first sprint cycle.&rdquo;
              </p>
              <div className="border-t border-[rgba(20,20,19,0.06)] pt-3 font-mono text-xs">
                <div className="font-bold text-[#141413]">FINSCALE CAPITAL</div>
                <div className="text-[#6A6862]">Head of Growth</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
