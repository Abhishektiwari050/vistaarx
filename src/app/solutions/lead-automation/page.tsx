import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Bell,
  Clock,
  Database,
  Send,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "WhatsApp & Lead Ingestion Automation — VISTAR",
  description:
    "Automate incoming customer inquiries, quotation triage, and instant sales alerts using official WhatsApp Business API and custom web intake pipelines.",
  alternates: {
    canonical: `${BASE_URL}/solutions/lead-automation`,
  },
  openGraph: {
    title: "WhatsApp & Lead Ingestion Automation — VISTAR",
    description:
      "Automated lead capture, quotation intake, and team routing over WhatsApp. Shipped with 100% source code ownership.",
    url: `${BASE_URL}/solutions/lead-automation`,
    images: DEFAULT_OG_IMAGES,
  },
};

export default function LeadAutomationPage() {
  return (
    <div className="w-full bg-[#FAF9F6] text-[#121316] min-h-screen pt-24 sm:pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb & Hero */}
        <div className="space-y-5 border-b border-black/8 pb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <Link href="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <Link href="/solutions" className="hover:text-black">Solutions</Link>
            <span>/</span>
            <span className="text-[#E1341E] font-semibold">Lead &amp; WhatsApp Automation</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>CAPTURE &amp; CONVERT</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#121316] leading-[1.08]">
            Capture every enquiry. Alert your team in 15 seconds.
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal max-w-3xl">
            In B2B distribution and services, fast response times win orders. We replace scattered personal WhatsApp chats and unmonitored inboxes with an automated intake engine that structures incoming leads, notifies the right person immediately, and guarantees customer follow-up.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#121316] hover:bg-[#282A2E] text-white text-xs font-semibold transition-all shadow-xs gap-2"
            >
              <span>Discuss WhatsApp Automation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I%20am%20interested%20in%20a%20WhatsApp%20lead%20automation%20pipeline%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold transition-all shadow-xs gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Direct WhatsApp Inquiry</span>
            </a>
          </div>
        </div>

        {/* The Concrete Problem Solved */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#121316] tracking-tight">
              Why manual enquiry handling leaks revenue
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              When prospective buyers request a quotation, they often reach out to multiple vendors simultaneously. If your enquiry sits unread in an individual rep&rsquo;s phone or lost among dozens of family chats, your competitor responds first and wins the deal.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Furthermore, reps forget to follow up on quotes sent three days earlier, leading to cold leads and unmeasured conversion rates.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-neutral-400">
              The Vistar Automation Engine
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-xs text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span><strong>Multi-channel intake:</strong> Captures WhatsApp messages, website forms, and email quote requests into one standardized stream.</span>
              </li>
              <li className="flex items-start gap-3 text-xs text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span><strong>Smart triage:</strong> Automatically extracts customer name, company, items requested, quantities, and delivery deadline.</span>
              </li>
              <li className="flex items-start gap-3 text-xs text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span><strong>Instant team routing:</strong> Sends actionable push alerts to your designated sales rep with a 1-tap quote builder link.</span>
              </li>
              <li className="flex items-start gap-3 text-xs text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span><strong>Customer auto-reassurance:</strong> Immediately replies to the buyer with a branded confirmation and unique reference ID.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-black/8 pb-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#121316]">
                Technical Stack &amp; Deliverables
              </h3>
              <p className="text-xs text-neutral-500">
                Built on official, supported developer APIs with zero fragile browser hacks.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-[#16A34A] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Official WhatsApp Cloud API
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="space-y-2">
              <strong className="text-neutral-900 font-semibold block text-[13px]">
                Official Meta Cloud API
              </strong>
              <p className="text-neutral-600 leading-relaxed">
                We register your official Meta business account with verified green badge eligibility. No risk of phone number bans from unapproved scraping scripts.
              </p>
            </div>

            <div className="space-y-2">
              <strong className="text-neutral-900 font-semibold block text-[13px]">
                Bi-Directional Database Sync
              </strong>
              <p className="text-neutral-600 leading-relaxed">
                Leads are logged instantly into Google Sheets, PostgreSQL, Supabase, or your existing CRM. Your team always has a complete historical audit trail.
              </p>
            </div>

            <div className="space-y-2">
              <strong className="text-neutral-900 font-semibold block text-[13px]">
                100% Repository Transfer
              </strong>
              <p className="text-neutral-600 leading-relaxed">
                You receive the complete source code, deployment scripts, environment keys, and documentation on your private GitHub account.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing & Timeline Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#121316] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs font-mono text-emerald-400 font-semibold">
              FIXED PILOT CADENCE
            </div>
            <h4 className="text-2xl font-bold text-white">
              Shipped in 5–10 business days.
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Fixed fee of ₹49,000 ($600 USD). Includes discovery, Meta WhatsApp Cloud setup, lead routing logic, database sync, team training, and 30 days of bug warranty.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-white hover:bg-neutral-100 text-[#121316] text-xs font-semibold transition-all shrink-0 gap-2 shadow-xs"
          >
            <span>Book 30-Min Discovery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
