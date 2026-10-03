"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Clock,
  Code2,
  Layers,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { AnswerBlocks, type QAPair } from "@/components/seo/answer-blocks";

interface ServicePackage {
  id: string;
  badge: string;
  name: string;
  inrPrice: string;
  usdPrice: string;
  timeline: string;
  idealFor: string;
  desc: string;
  included: string[];
  notIncluded: string[];
  example: {
    name: string;
    tag: string;
    desc: string;
    image: string;
    liveUrl?: string;
    githubUrl?: string;
    metric: string;
  };
}

const PACKAGES: ServicePackage[] = [
  {
    id: "starter",
    badge: "PACKAGE 01 // RAPID LAUNCH",
    name: "Starter MVP",
    inrPrice: "₹49,000",
    usdPrice: "$590",
    timeline: "5–7 Days Delivery",
    idealFor: "Solopreneurs, direct-to-consumer brands, and businesses needing a fast, high-converting digital storefront or single workflow tool.",
    desc: "A focused, high-speed web application or landing page engineered with sub-second load times and direct WhatsApp inquiry routing to start capturing revenue immediately.",
    included: [
      "Custom Next.js web application or high-converting landing page",
      "Direct WhatsApp click-to-chat & automated lead capture routing",
      "Mobile-first responsive layout with sub-second TTFB",
      "Custom domain setup on Vercel or Cloudflare Edge CDN",
      "100% private GitHub repository transfer on completion",
      "14 days post-launch technical warranty",
    ],
    notIncluded: [
      "Multi-tenant user authentication",
      "Complex relational database migrations",
      "Custom WebGL / 3D spatial rendering",
    ],
    example: {
      name: "KL Herbal Storefront & Lead Pipeline",
      tag: "E-COMMERCE // WHATSAPP AUTOMATION",
      desc: "Fast, mobile-optimized catalog with instant WhatsApp order routing, replacing sluggish third-party plugins with sub-second page loads.",
      image: "/projects/klherbal.png",
      liveUrl: "https://klherbal.in",
      metric: "< 2s Inquiry Routing",
    },
  },
  {
    id: "production",
    badge: "PACKAGE 02 // MOST POPULAR",
    name: "Production System",
    inrPrice: "₹1,85,000",
    usdPrice: "$2,200",
    timeline: "14 Days Guaranteed",
    idealFor: "Funded startups, growing businesses, and architecture/real estate firms needing a full-stack web application or 60 FPS interactive 3D showcase.",
    desc: "A comprehensive production platform built with Next.js 16, relational PostgreSQL database architecture, automated WhatsApp/CRM lead pipelines, or 60 FPS WebGL spatial models.",
    included: [
      "Full-stack Next.js 16 App Router application",
      "PostgreSQL or Supabase database with strictly typed schemas",
      "Automated lead triage pipeline (WhatsApp alerts + CRM dashboard)",
      "Or 60 FPS interactive WebGL / Three.js 3D spatial showcase",
      "Automated CI/CD pipelines and deployment runbooks",
      "100% private GitHub repository transfer with full commit history",
      "30 days post-launch bug warranty & handover walkthrough",
    ],
    notIncluded: [
      "Multi-region database sharding",
      "Continuous custom ML model training pipelines",
    ],
    example: {
      name: "3axis Arc: 60 FPS 3D Showroom",
      tag: "ARCHITECTURE & 3D SPATIAL",
      desc: "Interactive WebGL architectural showcase built for an architectural design firm in Lucknow, replacing slow static PDFs with real-time 3D spatial exploration on mobile & desktop.",
      image: "/projects/3axisarc.png",
      liveUrl: "https://3axisarc.vercel.app",
      githubUrl: "https://github.com/Abhishektiwari050/3axisarc",
      metric: "60 FPS In-Browser WebGL",
    },
  },
  {
    id: "custom",
    badge: "PACKAGE 03 // BESPOKE ENGINEERING",
    name: "Custom Architecture",
    inrPrice: "₹3,90,000+",
    usdPrice: "$4,700+",
    timeline: "21–30 Days",
    idealFor: "Enterprises, specialized platforms, and technical teams requiring bespoke data engines, GIS mapping tools, or multi-agent automation workflows.",
    desc: "Bespoke full-stack software engineering tailored to complex requirements—such as real-time GIS mapping, asynchronous task queues, and structured validation pipelines.",
    included: [
      "Bespoke full-stack architecture with asynchronous worker queues",
      "Automated GIS / vector map layers (MapLibre / PostGIS)",
      "Multi-step automated workflows with structured Pydantic / TypeScript gates",
      "Dedicated staging environment and Docker containerization",
      "Bilateral NDA protection and direct founder pairing",
      "100% private repository handover with complete architecture documentation",
      "45 days post-launch support and maintainability runbooks",
    ],
    notIncluded: [
      "Endless scope creep (all milestones bounded by signed specification)",
    ],
    example: {
      name: "Project VAYU Aviation Pre-Flight Tool",
      tag: "OPEN SOURCE // AVIATION GIS",
      desc: "Real-time situational awareness and NOTAM mapping tool built for pilots with Next.js, MapLibre GIS, and automated weather parsing. Free & open-source on GitHub.",
      image: "/projects/vayu-briefing.png",
      liveUrl: "https://ai-vayu.vercel.app",
      githubUrl: "https://github.com/Abhishektiwari050/AI-VAYU",
      metric: "Sub-50ms Map Hydration",
    },
  },
];

const SERVICES_FAQ_ITEMS: QAPair[] = [
  {
    category: "SCOPE & PACKAGES",
    question: "How do your fixed-scope delivery packages work?",
    answer:
      "We operate exclusively on fixed-scope, fixed-price delivery milestones. Before writing code, we define concrete deliverables, typed interface contracts, and delivery dates. You know exactly what you are paying, when it will be delivered, and what is included—with zero unexpected hourly billing.",
    keyPoints: [
      "Fixed pricing: ₹49,000 (Starter), ₹1,85,000 (Production), ₹3,90,000+ (Custom)",
      "Guaranteed timelines ranging from 5 to 30 days",
      "Clear scope boundaries with zero surprise invoices",
    ],
  },
  {
    category: "ENGINEERING & EXECUTION",
    question: "Who writes and deploys the software?",
    answer:
      "Every project is built directly by Abhishek Tiwari, Founder & Lead Engineer at VISTAR. We do not use account managers, junior offshore subcontractors, or non-technical intermediaries. You communicate directly with the engineer writing your code via WhatsApp, Slack, or Google Meet.",
    keyPoints: [
      "Direct collaboration with founding engineer Abhishek Tiwari",
      "Zero communication overhead or junior developer telephone games",
      "Daily staging updates and transparent technical progress",
    ],
  },
  {
    category: "CODE OWNERSHIP & IP",
    question: "Who owns the code upon project completion?",
    answer:
      "You own 100% of all custom software, application code, database schemas, and configuration runbooks. Everything is transferred directly to your organization's private GitHub repository upon deployment. VISTAR never retains proprietary licensing rights, royalties, or mandatory maintenance fees.",
    keyPoints: [
      "100% private GitHub repository transfer on completion",
      "Zero recurring software licensing fees or vendor lock-in",
      "Complete deployment documentation enabling internal team maintainability",
    ],
  },
  {
    category: "SUPPORT & POST-LAUNCH",
    question: "What happens after the project is deployed?",
    answer:
      "Every package includes a post-launch technical warranty (14 to 45 days depending on tier) covering any bug fixes and deployment adjustments. For clients without internal engineering teams, we also offer an optional monthly care plan (hosting maintenance, dependency updates, and minor feature additions) with no lock-in.",
    keyPoints: [
      "14 to 45 days included bug-fix warranty on all packages",
      "Optional, transparent monthly care plan for maintenance",
      "Full documentation provided so any competent engineer can maintain it",
    ],
  },
];

export function VectorsServicesClient() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  return (
    <div className="w-full bg-[#FAF9F5] text-[#0E1118] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen pt-20 pb-32">
      
      {/* ── 1. HERO SECTION ── */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 border-b border-black/10 overflow-hidden text-center px-4 sm:px-6">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/10 rounded-full text-xs font-mono font-medium text-neutral-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#FF3823] animate-pulse" />
            <span>ENGINEERING PACKAGES // FIXED 14-DAY SPRINTS</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#0E1118] tracking-tight leading-[1.08]">
            Software built for real business outcomes. <br />
            <span className="text-[#FF3823] italic font-normal">Zero agency fluff. 100% code ownership.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-normal">
            No open-ended retainers. No junior contractor markups. Choose from three fixed-scope delivery packages—engineered directly by Abhishek Tiwari with guaranteed timelines and full private GitHub transfer.
          </p>

          {/* Currency Toggle */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <span className="text-xs font-mono text-neutral-500">CURRENCY:</span>
            <div className="inline-flex items-center p-1 bg-white border border-black/15 rounded-lg text-xs font-mono">
              <button
                type="button"
                onClick={() => setCurrency("INR")}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  currency === "INR" ? "bg-[#0E1118] text-white font-semibold" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                ₹ INR
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  currency === "USD" ? "bg-[#0E1118] text-white font-semibold" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                $ USD
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="https://wa.me/918860110144?text=Hi%20Abhishek,%20I'm%20interested%20in%20VISTAR%20engineering%20packages."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Chat on WhatsApp (+91 88601 10144)
            </a>
            <Link
              href="/start"
              className="bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-900 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-all inline-flex items-center gap-2"
            >
              Start Technical Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. THREE PACKAGES WITH REAL EXAMPLES ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-24">
        {PACKAGES.map((pkg, idx) => {
          const price = currency === "INR" ? pkg.inrPrice : pkg.usdPrice;
          const isFeatured = pkg.id === "production";

          return (
            <div
              key={pkg.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white shadow-sm ${
                isFeatured ? "border-[#FF3823] ring-2 ring-[#FF3823]/10" : "border-black/10 hover:border-black/30"
              }`}
            >
              {/* Package Top Header */}
              <div className="p-6 sm:p-10 border-b border-black/10 bg-[#FAF9F5]/70 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#FF3823] uppercase tracking-wider">
                      {pkg.badge}
                    </span>
                    {isFeatured && (
                      <span className="px-2 py-0.5 rounded bg-[#FF3823]/10 text-[#FF3823] font-mono text-[10px] font-semibold">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0E1118]">
                    {pkg.name}
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
                    {pkg.desc}
                  </p>
                </div>

                <div className="text-left md:text-right shrink-0 space-y-1">
                  <div className="font-serif text-3xl sm:text-5xl font-normal text-[#0E1118]">
                    {price}
                  </div>
                  <div className="font-mono text-xs text-neutral-500 flex items-center md:justify-end gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF3823]" />
                    <span>{pkg.timeline}</span>
                  </div>
                </div>
              </div>

              {/* Package Body: Two Columns (Specs & Real Example) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-black/10">
                
                {/* Left Column: Scope & Deliverables (6 cols) */}
                <div className="lg:col-span-6 p-6 sm:p-10 space-y-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold mb-3">
                        WHAT IS INCLUDED:
                      </h4>
                      <ul className="space-y-2.5">
                        {pkg.included.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-black/10">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold mb-3">
                        OUT OF SCOPE:
                      </h4>
                      <ul className="space-y-2">
                        {pkg.notIncluded.map((item, nIdx) => (
                          <li key={nIdx} className="flex items-start gap-2 text-xs text-neutral-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-black/10 flex flex-wrap items-center gap-3">
                    <a
                      href={`https://wa.me/918860110144?text=Hi%20Abhishek,%20I'd%20like%20to%20book%20the%20${encodeURIComponent(
                        pkg.name
                      )}%20package.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-[4px] inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      Book on WhatsApp
                    </a>
                    <Link
                      href="/start"
                      className="px-5 py-2.5 bg-[#0E1118] hover:bg-neutral-800 text-white text-xs font-semibold rounded-[4px] inline-flex items-center gap-1.5"
                    >
                      Start Technical Diagnostic
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Concrete Production Example (6 cols) */}
                <div className="lg:col-span-6 p-6 sm:p-10 bg-[#FAF9F5] flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#FF3823] px-2 py-0.5 bg-white rounded border border-black/10">
                        {pkg.example.tag}
                      </span>
                      <span className="font-mono text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {pkg.example.metric}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#0E1118]">
                        {pkg.example.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                        {pkg.example.desc}
                      </p>
                    </div>

                    {/* Screenshot Frame */}
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-black/15 shadow-sm bg-neutral-900 group">
                      <Image
                        src={pkg.example.image}
                        alt={pkg.example.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 600px"
                      />
                    </div>
                  </div>

                  {/* Links */}
                  <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    {pkg.example.liveUrl && (
                      <a
                        href={pkg.example.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-800 hover:text-[#FF3823] font-semibold inline-flex items-center gap-1 underline underline-offset-2"
                      >
                        Inspect Live Deployment <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {pkg.example.githubUrl && (
                      <a
                        href={pkg.example.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-1"
                      >
                        View Public Repo <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* ── 3. HOW WE DELIVER (THE 14-DAY PRODUCTION ENGINE) ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-white border-y border-black/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-wider text-[#FF3823] font-bold">
              DELIVERY PROTOCOL
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0E1118] tracking-tight">
              How your software gets delivered
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Every package follows our strict 4-step engineering protocol. You receive working software shipped continuously to a private preview URL.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#FAF9F5] border border-black/10 rounded-xl space-y-2">
              <span className="text-[10px] font-mono text-[#FF3823] font-bold">STAGE 01</span>
              <h4 className="font-serif text-lg font-bold text-[#0E1118]">48-Hour Architecture Scoping</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Direct pairing call with Abhishek. We define clear interface contracts, data models, and bounded scope with zero ambiguity.
              </p>
            </div>

            <div className="p-6 bg-[#FAF9F5] border border-black/10 rounded-xl space-y-2">
              <span className="text-[10px] font-mono text-[#FF3823] font-bold">STAGE 02</span>
              <h4 className="font-serif text-lg font-bold text-[#0E1118]">Direct Production Sprint</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Clean TypeScript, Next.js, and SQL written directly. Weekly deployable milestones with continuous preview environments.
              </p>
            </div>

            <div className="p-6 bg-[#FAF9F5] border border-black/10 rounded-xl space-y-2">
              <span className="text-[10px] font-mono text-[#FF3823] font-bold">STAGE 03</span>
              <h4 className="font-serif text-lg font-bold text-[#0E1118]">Automated QA &amp; Testing</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Rigorous testing for sub-second load times, zero cumulative layout shift (CLS 0.000), and fluid mobile responsiveness.
              </p>
            </div>

            <div className="p-6 bg-[#FAF9F5] border border-black/10 rounded-xl space-y-2">
              <span className="text-[10px] font-mono text-[#FF3823] font-bold">STAGE 04</span>
              <h4 className="font-serif text-lg font-bold text-[#0E1118]">100% Repository Handover</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Full private GitHub transfer, deployment runbooks, and domain setup. You own every line of code with zero ongoing retainers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. ANSWER BLOCKS // FAQ ── */}
      <AnswerBlocks
        badge="SERVICES & PACKAGES // FAQ"
        title="Frequently Asked Questions"
        subtitle="Clear, honest answers about scope, pricing, code ownership, and post-launch support."
        items={SERVICES_FAQ_ITEMS}
        schemaId="services-packages-faq-schema"
      />

      {/* ── 5. FINAL DIRECT CONVERSION CTA ── */}
      <section className="w-full py-20 px-6 border-t border-black/10 text-center bg-[#FAF9F5]">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0E1118] tracking-tight">
            Ready to build? Discuss your project in 15 minutes.
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto">
            Talk directly to Abhishek Tiwari. We’ll review your requirements and tell you honestly which package fits your timeline and budget.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/918860110144?text=Hi%20Abhishek,%20I'd%20like%20to%20discuss%20a%20project%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 font-semibold text-sm rounded-[4px] shadow-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Chat on WhatsApp (+91 88601 10144)
            </a>
            <Link
              href="/start"
              className="bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-900 px-8 py-4 font-semibold text-sm rounded-[4px] shadow-sm inline-flex items-center gap-2"
            >
              Start Technical Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default VectorsServicesClient;
