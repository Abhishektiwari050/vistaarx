import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  LayoutDashboard,
  ArrowRight,
  CheckCircle2,
  Lock,
  FileSpreadsheet,
  Users,
  TrendingUp,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Internal Operations Portals & Dashboards — VISTAR",
  description:
    "Replace fragile spreadsheets with custom internal business operating portals. Role-based access, automated quotation PDF generation, and real-time operational reporting.",
  alternates: {
    canonical: `${BASE_URL}/solutions/operations-systems`,
  },
  openGraph: {
    title: "Internal Operations Portals & Dashboards — VISTAR",
    description:
      "Custom business portals, automated quoting, and operational dashboards engineered for B2B distributors and manufacturers.",
    url: `${BASE_URL}/solutions/operations-systems`,
    images: DEFAULT_OG_IMAGES,
  },
};

export default function OperationsSystemsPage() {
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
            <span className="text-[#E1341E] font-semibold">Operations Systems &amp; Portals</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>RUN OPERATIONS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#121316] leading-[1.08]">
            Replace spreadsheet chaos with a tailored business portal.
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal max-w-3xl">
            When businesses grow beyond 20 orders a week, spreadsheets start breaking. Formulas get corrupted, file versions get mixed up, and staff waste hours manually reconciling numbers. We engineer fast, secure internal web portals that organize orders, generate quotes, and give management complete visibility.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#121316] hover:bg-[#282A2E] text-white text-xs font-semibold transition-all shadow-xs gap-2"
            >
              <span>Scope an Operations Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I%20would%20like%20to%20discuss%20building%20an%20internal%20operations%20portal%20for%20our%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-white border border-black/10 hover:bg-neutral-50 text-[#121316] text-xs font-semibold transition-all shadow-xs gap-2"
            >
              <span>Discuss via WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-black/10 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-[#121316]">
              Role-Based Access
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Sales reps enter customer enquiries; warehouse staff update dispatch status; accountants see payment confirmations; founders see profit margins and growth metrics.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-[#121316]">
              1-Click PDF Quotations
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Select product lines, specify quantities, apply tiered discount rules, and generate a standardized, branded PDF proposal ready to email or WhatsApp directly to the client.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-[#121316]">
              Live Executive Dashboard
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              See open orders, pipeline revenue, delayed shipments, and staff response times in real time. Zero midnight CSV exports or manual spreadsheet stitching.
            </p>
          </div>
        </div>

        {/* Workflow Comparison */}
        <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="text-2xl font-bold text-[#121316]">
            Before vs. After Vistar Portal Implementation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 rounded-xl bg-red-50/50 border border-red-200/80 space-y-3">
              <span className="font-mono font-bold text-red-700 uppercase">
                THE SPREADSHEET BOTTLENECK:
              </span>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">&times;</span>
                  <span>Four separate Excel files with conflicting customer records.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">&times;</span>
                  <span>Sales reps spend 25 minutes manually drafting every quotation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">&times;</span>
                  <span>Anyone with spreadsheet access can view sensitive pricing formulas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">&times;</span>
                  <span>Leadership has no real-time visibility into pending shipments.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
              <span className="font-mono font-bold text-emerald-800 uppercase">
                WITH A VISTAR OPERATIONAL PORTAL:
              </span>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>One centralized database with complete version history and audit logs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Standardized PDF quotes created and dispatched in under 90 seconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Strict role permissions protect cost margins and supplier records.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Founders open a single live link to see company revenue and pending tasks.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Fixed Cadence Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#121316] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs font-mono text-blue-400 font-semibold">
              FIXED SCOPE &bull; TYPICALLY 2–4 WEEKS
            </div>
            <h4 className="text-2xl font-bold text-white">
              Starting from ₹1,49,000 ($1,800 USD).
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Includes database schema design, role-based login, quotation generator, custom reporting views, deployment to your cloud, and 100% source code repository handover.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-white hover:bg-neutral-100 text-[#121316] text-xs font-semibold transition-all shrink-0 gap-2 shadow-xs"
          >
            <span>Discuss Your Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
