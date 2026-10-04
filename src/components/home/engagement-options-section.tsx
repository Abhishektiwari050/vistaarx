"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  Zap,
  Layout,
  Repeat,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

interface EngagementOption {
  tag: string;
  title: string;
  badge?: string;
  priceNote: string;
  priceSub: string;
  timeline: string;
  bestFor: string;
  deliverables: string[];
  ctaText: string;
  ctaHref: string;
  highlighted?: boolean;
}

const OPTIONS: EngagementOption[] = [
  {
    tag: "OPTION 01",
    title: "Workflow Assessment & Roadmap",
    priceNote: "Free / Discovery Call",
    priceSub: "30-minute structured process audit",
    timeline: "1–2 Days",
    bestFor: "Businesses wanting to identify where automation will yield the fastest return on investment before spending capital.",
    deliverables: [
      "Process breakdown of your current enquiry or order bottleneck",
      "Analysis of software vs. simple operational changes needed",
      "Exact architectural proposal, scope boundaries, and fixed quotation",
      "Zero obligation to proceed",
    ],
    ctaText: "Book Discovery Call",
    ctaHref: "/contact",
  },
  {
    tag: "OPTION 02",
    title: "Focused Automation Pilot",
    badge: "MOST POPULAR ENTRY POINT",
    priceNote: "₹49,000",
    priceSub: "Or $600 USD &bull; Fixed Scope",
    timeline: "5–10 Business Days",
    bestFor: "Wholesalers, distributors, and service companies looking to fix one critical bottleneck (e.g. WhatsApp lead capture, quote alerts).",
    deliverables: [
      "Dedicated WhatsApp Business Cloud API integration or web form pipeline",
      "Automated lead parsing, triage, and instant team routing",
      "Customer auto-confirmation messages with reference tracking",
      "Sync to Google Sheets or PostgreSQL database",
      "Complete deployment, documentation, and 30-day bug warranty",
    ],
    ctaText: "Discuss Automation Pilot",
    ctaHref: "/contact",
    highlighted: true,
  },
  {
    tag: "OPTION 03",
    title: "Custom Application or Portal",
    priceNote: "From ₹1,49,000",
    priceSub: "Or $1,800 USD &bull; Milestone-Driven",
    timeline: "2–4 Weeks",
    bestFor: "Companies replacing legacy spreadsheets with a multi-user internal portal, customer desk, or bespoke web application.",
    deliverables: [
      "Full-stack Next.js web application with modern responsive UI",
      "Role-based authentication (Admin, Staff, Client)",
      "Database schema design (PostgreSQL/Supabase) and API connections",
      "Automated quotation/invoice generation and operational dashboard",
      "100% private GitHub repository rights transfer and team handover",
    ],
    ctaText: "Scope Custom Portal",
    ctaHref: "/contact",
  },
  {
    tag: "OPTION 04",
    title: "Ongoing Engineering Retainer",
    priceNote: "Custom Monthly",
    priceSub: "Month-to-month &bull; Cancel anytime",
    timeline: "Ongoing Cadence",
    bestFor: "Established clients who have deployed a system and want continuous feature development, monitoring, and dedicated developer hours.",
    deliverables: [
      "Guaranteed monthly engineering hours for features and optimizations",
      "Uptime monitoring, security dependency patches, and cloud maintenance",
      "Direct priority WhatsApp and Slack channel access to Abhishek",
      "No long-term lock-in; renew or pause on a monthly basis",
    ],
    ctaText: "Inquire About Retainers",
    ctaHref: "/contact",
  },
];

export function EngagementOptionsSection() {
  return (
    <section className="w-full py-16 sm:py-24 bg-white text-[#121316]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/8 text-neutral-700 text-xs font-mono font-semibold uppercase tracking-wider">
            Investment Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#121316] leading-[1.12]">
            Straightforward ways to engage.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            We don’t believe in ambiguous hourly estimates that multiply midway through. Every engagement starts with a defined scope, clear boundaries, and predictable investment.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {OPTIONS.map((opt) => (
            <div
              key={opt.title}
              className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                opt.highlighted
                  ? "bg-[#FAF9F6] border-2 border-[#E1341E] shadow-md ring-1 ring-[#E1341E]/10"
                  : "bg-white border border-black/10 hover:border-black/20 shadow-xs"
              }`}
            >
              {opt.badge && (
                <span className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider bg-[#E1341E] text-white uppercase shadow-xs">
                  {opt.badge}
                </span>
              )}

              <div className="space-y-4">
                <span className="text-[11px] font-mono font-semibold text-neutral-400">
                  {opt.tag}
                </span>

                <div>
                  <h3 className="text-lg font-bold text-[#121316] leading-snug">
                    {opt.title}
                  </h3>
                  <div className="mt-3">
                    <div className="text-2xl font-bold font-mono text-[#121316]">
                      {opt.priceNote}
                    </div>
                    <div className="text-xs text-neutral-500 font-mono mt-0.5">
                      {opt.priceSub}
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-black/4 text-xs font-mono text-neutral-700">
                  <span className="text-neutral-500 font-semibold block text-[10px] uppercase">
                    Typical Delivery:
                  </span>
                  {opt.timeline}
                </div>

                <div className="text-xs text-neutral-600 leading-relaxed">
                  <span className="font-semibold text-neutral-800 block mb-1">
                    Best for:
                  </span>
                  {opt.bestFor}
                </div>

                <div className="pt-2">
                  <span className="font-semibold text-neutral-800 text-xs block mb-2 font-mono uppercase text-[10px]">
                    Included Deliverables:
                  </span>
                  <ul className="space-y-2">
                    {opt.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black/8">
                <Link
                  href={opt.ctaHref}
                  className={`w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-semibold transition-all shadow-xs gap-1.5 ${
                    opt.highlighted
                      ? "bg-[#E1341E] hover:bg-[#C92915] text-white"
                      : "bg-[#121316] hover:bg-[#282A2E] text-white"
                  }`}
                >
                  <span>{opt.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Principles Note */}
        <div className="mt-12 p-6 rounded-2xl bg-[#FAF9F6] border border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-600">
          <div className="space-y-1">
            <strong className="text-neutral-900 font-semibold block text-[13px]">
              What drives project pricing?
            </strong>
            <p>
              Costs depend on the number of third-party integrations (WhatsApp API, payment gateways, ERPs), user role complexity, custom reporting requirements, and whether existing databases require data cleaning. We quote a fixed fee after discovery so you have total certainty.
            </p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#121316] hover:text-[#E1341E] shrink-0 transition-colors"
          >
            <span>Detailed Pricing Page &rarr;</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

export default EngagementOptionsSection;
