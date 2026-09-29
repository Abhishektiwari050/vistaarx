"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, ShieldCheck, Terminal, Cpu } from "lucide-react";
import { playClick } from "@/lib/sound";

interface MatrixSection {
  title: string;
  headerBg: string;
  rows: { name: string; sprint: string | boolean; business: string | boolean }[];
}

const MATRIX_SECTIONS: MatrixSection[] = [
  {
    title: "Sovereign Runtime & Multi-Agent Pods",
    headerBg: "bg-[#E8FCE8] text-[#052E16]",
    rows: [
      { name: "Deterministic Multi-Agent Tool Calling", sprint: true, business: true },
      { name: "Execution Perimeter", sprint: "Managed Cloud Sandbox", business: "Dedicated Private VPC" },
      { name: "Schema Validation & Verification Gate", sprint: true, business: true },
      { name: "Autonomous Agent Pods", sprint: "Up to 3 Agent Pods", business: "Unlimited Autonomous Clusters" },
      { name: "Custom Fine-Tuned Model Weights", sprint: false, business: true },
    ],
  },
  {
    title: "LLM & Cryptographic Security",
    headerBg: "bg-[#EBF3FF] text-[#1E3A8A]",
    rows: [
      { name: "Model Routing & Token Optimization", sprint: true, business: true },
      { name: "TLS 1.3 / AES-256 State Channels & Egress Controls", sprint: "Standard Security", business: "Dedicated Hardened Channels" },
      { name: "Zero Third-Party Model Training Leakage", sprint: true, business: true },
      { name: "Air-Gapped Egress Option", sprint: false, business: true },
    ],
  },
  {
    title: "Vistar Platform & Telemetry Mesh",
    headerBg: "bg-[#FFF0EB] text-[#9A3412]",
    rows: [
      { name: "Next.js 16 High-Performance Edge Engine", sprint: true, business: true },
      { name: "Global Edge Anycast PoPs", sprint: "12 Global Regions", business: "24 Anycast Regions" },
      { name: "P99 Response Latency", sprint: "< 120ms", business: "< 45ms" },
      { name: "60fps WebGL Canvas Telemetry", sprint: true, business: true },
    ],
  },
  {
    title: "Sovereignty & Code Ownership",
    headerBg: "bg-[#FCE4EC] text-[#831843]",
    rows: [
      { name: "100% GitHub Repository Handover", sprint: true, business: true },
      { name: "Private Dockerfiles & Infrastructure as Code", sprint: true, business: true },
      { name: "Zero Hostage Retainer Contracts", sprint: true, business: true },
      { name: "Full Unencumbered IP Copyright", sprint: true, business: true },
    ],
  },
  {
    title: "Engineering Engagement & SLA",
    headerBg: "bg-[#E0F2FE] text-[#0369A1]",
    rows: [
      { name: "Production Delivery Cadence", sprint: "14–21 Days Guaranteed", business: "Continuous Milestone Cadence" },
      { name: "Direct Principal Engineer Access", sprint: "Dedicated Slack & Daily Standups", business: "Dedicated Principal Pod" },
      { name: "Post-Launch Warranty", sprint: "30-Day Zero-Cost Bug Warranty", business: "Continuous SLA & Liveness" },
      { name: "Enterprise Support SLA", sprint: "Standard Support", business: "24/7 Priority SLA" },
    ],
  },
];

const FAQS_BASICS = [
  {
    q: "How much does Vistar cost?",
    a: "Vistar operates on transparent, fixed-scope engineering packages. Our 14-day production Sprint package is $14,800 (billed yearly) or $18,500 (billed sprint-by-sprint). Enterprise sovereign deployments are tailored with custom SLAs and private VPC isolation.",
  },
  {
    q: "What is sovereign software handover?",
    a: "On deployment day, we transfer complete, unencumbered ownership of the private GitHub repository, Docker configurations, infrastructure scripts, and typed documentation directly to your organization. You never pay hostage maintenance fees.",
  },
  {
    q: "Why should I choose Vistar over an agency?",
    a: "Agencies build fragile WordPress/Webflow sites, charge recurring retainer fees, and introduce junior developer telephone games. Vistar provides direct access to principal systems engineers delivering sovereign Next.js 16 runtimes in 14-day deterministic sprints.",
  },
];

const FAQS_SECURITY = [
  {
    q: "Does Vistar support private VPC deployments?",
    a: "Yes. On our Sovereign Business deployments, the entire autonomous agent cluster, vector databases, and model checkpoints are provisioned inside your private AWS, GCP, or on-premise VPC perimeter with zero public egress.",
  },
  {
    q: "How does Vistar secure multi-agent communication and data egress?",
    a: "We enforce mutual TLS 1.3, AES-256-GCM encryption at rest and in transit, private VPC subnet isolation, and strict role-based token sanitization to guarantee zero cross-tenant leakage and zero third-party training on your data.",
  },
  {
    q: "What certifications does Vistar align with?",
    a: "All Vistar architectures are designed to comply with SOC2 Type II, ISO 27001, and GDPR standards, featuring encrypted audit ledgers and strict zero-leakage policies.",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [openFaq, setOpenFaq] = useState<string | null>("b-0");

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
    playClick(950, 0.02);
  };

  return (
    <div className="w-full bg-[#FAF9F5] text-[#00063D] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen">
      
      {/* ── FRAME 1: BLUEPRINT DRAFTING GRID HERO ── */}
      <section className="relative w-full pt-20 pb-20 md:pt-28 md:pb-28 bg-[#F2EFE9] [background-image:linear-gradient(to_right,#ffffff_1.5px,transparent_1.5px),linear-gradient(to_bottom,#ffffff_1.5px,transparent_1.5px)] [background-size:46px_46px] border-b border-black/10 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-[80px] font-normal text-[#00063D] tracking-[-2.4px] leading-[1.0]">
            Get the AI built for better sovereign results
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto">
            Vistar&apos;s plans &amp; pricing are designed to meet your needs as you scale
          </p>

          {/* Toggle Switch: Monthly vs Yearly (Matching Jasper Pill) */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex items-center bg-white border border-black/15 p-1 rounded-[4px] shadow-2xs">
              <button
                onClick={() => {
                  setBillingCycle("monthly");
                  playClick(900, 0.02);
                }}
                className={`px-5 py-2 font-sans text-sm font-semibold rounded-[3px] transition-colors cursor-pointer ${
                  billingCycle === "monthly"
                    ? "bg-[#FF3823] text-white"
                    : "text-neutral-700 hover:text-black"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => {
                  setBillingCycle("yearly");
                  playClick(1000, 0.02);
                }}
                className={`px-5 py-2 font-sans text-sm font-semibold rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === "yearly"
                    ? "bg-[#FF3823] text-white"
                    : "text-neutral-700 hover:text-black"
                }`}
              >
                <span>Yearly</span>
                <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${
                  billingCycle === "yearly" ? "bg-white/25 text-white" : "bg-[#FFD8CE] text-[#FF3823]"
                }`}>
                  Save ~20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 2: PRICING CARDS ── */}
      <section className="w-full py-16 px-6 -mt-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Sprint */}
          <div className="bg-white border border-black/10 rounded-[6px] shadow-sm p-8 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-3xl font-normal text-[#00063D]">Sprint</h3>
                <div className="text-right">
                  <span className="font-serif text-3xl sm:text-4xl font-normal text-[#FF3823]">
                    {billingCycle === "yearly" ? "$14,800" : "$18,500"}
                  </span>
                  <span className="text-xs text-neutral-500 block font-mono">/ sprint package</span>
                </div>
              </div>

              <div className="w-full h-px bg-black/10" />

              <p className="text-sm text-neutral-600 leading-relaxed min-h-[44px]">
                Deterministic 14–21 day production delivery with 100% private Git repo handover on day one.
              </p>

              <Link
                href="/start"
                onClick={() => playClick(900, 0.03)}
                className="w-full bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-900 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150 inline-flex items-center justify-center gap-2 text-center"
              >
                Start Free Diagnostic
              </Link>

              <div className="space-y-3 pt-4">
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider">Plan includes:</p>
                <ul className="space-y-2.5 text-sm text-neutral-700">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#FF3823] shrink-0" />
                    <span>100% Day-One GitHub Transfer</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#FF3823] shrink-0" />
                    <span>Up to 3 Autonomous Agent Pods</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#FF3823] shrink-0" />
                    <span>Next.js 16 Edge Runtime (&lt; 120ms P99)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#FF3823] shrink-0" />
                    <span>30-Day Zero-Cost Bug Warranty</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2: Business */}
          <div className="bg-white border-2 border-[#FF3823] rounded-[6px] shadow-md p-8 sm:p-10 space-y-6 flex flex-col justify-between relative">
            <div className="absolute -top-3.5 right-6 bg-[#FF3823] text-white text-[11px] font-mono uppercase tracking-widest px-3 py-0.5 rounded-[2px] font-semibold">
              Most Popular
            </div>

            <div className="space-y-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-3xl font-normal text-[#00063D]">Business</h3>
                <div className="text-right">
                  <span className="font-mono text-xs font-semibold text-[#FF3823] uppercase tracking-wider block">
                    Custom Pricing
                  </span>
                  <span className="text-xs text-neutral-500 block font-mono">tailored SLA</span>
                </div>
              </div>

              <div className="w-full h-px bg-black/10" />

              <p className="text-sm text-neutral-600 leading-relaxed min-h-[44px]">
                Dedicated autonomous clusters deployed inside your private VPC perimeter with post-quantum security.
              </p>

              <Link
                href="/contact"
                onClick={() => playClick(950, 0.03)}
                className="w-full bg-[#FF3823] hover:bg-[#E0301C] text-white px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150 inline-flex items-center justify-center gap-2 text-center"
              >
                Contact Sales
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="space-y-3 pt-4">
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider">Plan includes everything in Sprint, plus:</p>
                <ul className="space-y-2.5 text-sm text-neutral-700">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#FF3823] shrink-0" />
                    <span>Unlimited Autonomous Agent Pods</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#FF3823] shrink-0" />
                    <span>Private AWS / GCP VPC Isolation</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#FF3823] shrink-0" />
                    <span>TLS 1.3 &amp; AES-256 Enterprise Security</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#FF3823] shrink-0" />
                    <span>Dedicated Principal Engineering Pod</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FRAME 3: COLOR-CODED MATRIX COMPARISON TABLE (EXACT MATCH TO JASPER TABLE) ── */}
      <section className="w-full py-20 px-6 bg-white border-y border-black/10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#00063D] tracking-tight">
              Detailed Feature Comparison
            </h2>
            <p className="text-neutral-500 text-sm mt-2">
              Comprehensive breakdown of capabilities across engagement tiers.
            </p>
            <p className="text-neutral-400 font-mono text-[11px] mt-3 sm:hidden">
              ← Scroll horizontally to inspect full matrix →
            </p>
          </div>

          <div className="border border-black/10 rounded-[6px] overflow-hidden bg-white shadow-2xs overflow-x-auto">
            <div className="min-w-[580px]">
              {MATRIX_SECTIONS.map((sec, idx) => (
                <div key={idx} className="border-b last:border-b-0 border-black/10">
                  <div className={`${sec.headerBg} px-6 py-3.5 font-serif text-base font-bold tracking-tight`}>
                    {sec.title}
                  </div>
                  <div className="divide-y divide-black/5">
                    {sec.rows.map((row, rIdx) => (
                      <div key={rIdx} className="grid grid-cols-12 px-6 py-3.5 text-sm items-center hover:bg-neutral-50">
                        <div className="col-span-6 font-medium text-neutral-800">{row.name}</div>
                        <div className="col-span-3 text-center text-xs text-neutral-600">
                          {typeof row.sprint === "boolean" ? (
                            row.sprint ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-neutral-300">—</span>
                          ) : (
                            row.sprint
                          )}
                        </div>
                        <div className="col-span-3 text-center text-xs font-semibold text-[#00063D]">
                          {typeof row.business === "boolean" ? (
                            row.business ? <Check className="w-4 h-4 text-[#FF3823] mx-auto" /> : <span className="text-neutral-300">—</span>
                          ) : (
                            row.business
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 4: TRUST & SAFETY CALLOUT ── */}
      <section className="w-full py-20 px-6 bg-[#FAF9F5] border-b border-black/10 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="font-mono text-xs uppercase text-neutral-500">Trust Foundation</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#00063D] tracking-tight">
            Enterprise-grade security, quality outputs
          </h2>
          <p className="text-neutral-600 text-sm max-w-xl mx-auto">
            Zero training on client payloads, air-gapped VPC sandbox perimeters, and end-to-end cryptographic verification.
          </p>
          <div className="pt-2">
            <Link href="/philosophy" className="border border-black text-[#00063D] font-semibold text-xs px-5 py-2.5 rounded-[4px] inline-block hover:bg-neutral-50">
              Explore Trust &amp; Safety
            </Link>
          </div>
        </div>
      </section>

      {/* ── FRAME 5: SALMON-TINTED ACCORDION FAQS (EXACT JASPER FAQS SECTION) ── */}
      <section className="w-full py-24 px-6 bg-white border-b border-black/10">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* FAQ Block 1: Basics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-2">
              <span className="inline-block bg-[#FF3823] text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                FAQS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#00063D]">
                Questions about Sovereign Basics
              </h3>
            </div>

            <div className="lg:col-span-8 space-y-3">
              {FAQS_BASICS.map((faq, idx) => {
                const id = `b-${idx}`;
                const isOpen = openFaq === id;
                return (
                  <div
                    key={id}
                    onClick={() => toggleFaq(id)}
                    className="bg-[#FFF0EB] border border-[#FFD0C4] rounded-[4px] p-5 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-base font-bold text-[#00063D]">{faq.q}</h4>
                      <span className="font-mono text-xs text-[#FF3823]">{isOpen ? "−" : "+"}</span>
                    </div>
                    {isOpen && (
                      <p className="text-xs text-neutral-700 mt-3 pt-3 border-t border-[#FFD0C4] leading-relaxed">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQ Block 2: Security */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-black/10">
            <div className="lg:col-span-4 space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#00063D]">
                Enterprise Security Questions
              </h3>
            </div>

            <div className="lg:col-span-8 space-y-3">
              {FAQS_SECURITY.map((faq, idx) => {
                const id = `s-${idx}`;
                const isOpen = openFaq === id;
                return (
                  <div
                    key={id}
                    onClick={() => toggleFaq(id)}
                    className="bg-[#FFF0EB] border border-[#FFD0C4] rounded-[4px] p-5 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-base font-bold text-[#00063D]">{faq.q}</h4>
                      <span className="font-mono text-xs text-[#FF3823]">{isOpen ? "−" : "+"}</span>
                    </div>
                    {isOpen && (
                      <p className="text-xs text-neutral-700 mt-3 pt-3 border-t border-[#FFD0C4] leading-relaxed">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ── FRAME 6: 3 GRID TEXTURE CARDS (EXACT MATCH TO JASPER'S "HAVE ADDITIONAL QUESTIONS?") ── */}
      <section className="w-full py-24 px-6 bg-[#FAF9F5] border-b border-black/10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#00063D]">
              Have additional questions?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Articles / FAQs (Gray grid) */}
            <Link href="/philosophy" className="bg-[#FAF9F5] border border-black/10 rounded-[4px] p-6 h-64 flex flex-col justify-between hover:border-black/30 transition-colors [background-image:linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:24px_24px]">
              <h3 className="font-serif text-xl font-bold text-[#00063D]">Read architectural RFCs &amp; FAQs</h3>
              <span className="text-xs font-mono text-neutral-700">Explore Architecture →</span>
            </Link>

            {/* Card 2: Support (Cyan grid) */}
            <a href="mailto:engineering@vistar.tech" className="bg-[#EBF3FF] border border-black/10 rounded-[4px] p-6 h-64 flex flex-col justify-between hover:border-black/30 transition-colors [background-image:linear-gradient(to_right,rgba(30,96,230,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,96,230,0.08)_1px,transparent_1px)] [background-size:24px_24px]">
              <h3 className="font-serif text-xl font-bold text-[#00063D]">Get engineering support</h3>
              <span className="text-xs font-mono text-neutral-700">Email engineering@vistar.tech →</span>
            </a>

            {/* Card 3: Learn more (Green grid) */}
            <Link href="/about" className="bg-[#E8FCE8] border border-black/10 rounded-[4px] p-6 h-64 flex flex-col justify-between hover:border-black/30 transition-colors [background-image:linear-gradient(to_right,rgba(34,197,94,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.12)_1px,transparent_1px)] [background-size:24px_24px]">
              <h3 className="font-serif text-xl font-bold text-[#00063D]">Learn more about Vistar</h3>
              <span className="text-xs font-mono text-neutral-700">Company Overview →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FRAME 7: FRAMED WORKSPACE BOTTOM CTA ── */}
      <section className="w-full py-24 px-6 bg-white border-b border-black/10">
        <div className="max-w-4xl mx-auto border border-black/15 rounded-[6px] shadow-sm overflow-hidden bg-[#FAF9F5]">
          <div className="bg-white border-b border-black/10 px-4 py-2.5 flex items-center justify-between font-mono text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2">vistar-pricing-tier.sh</span>
            </div>
            <span>Verified 100% Handover</span>
          </div>

          <div className="p-12 sm:p-20 text-center space-y-6">
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#00063D] tracking-tight">
              Start building with Vistar today
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/start"
                className="bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-900 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150"
              >
                Start Free Diagnostic
              </Link>
              <Link
                href="/contact"
                className="bg-[#FF3823] hover:bg-[#E0301C] text-white px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150 inline-flex items-center gap-2"
              >
                Get A Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
