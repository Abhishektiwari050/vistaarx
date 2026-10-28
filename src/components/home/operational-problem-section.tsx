"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Database,
  LineChart,
  CheckCircle2,
  XCircle,
  Zap,
} from "lucide-react";

interface TelemetryPoint {
  id: string;
  metric: string;
  category: string;
  title: string;
  before: {
    status: string;
    badge: string;
    desc: string;
    impact: string;
  };
  after: {
    status: string;
    badge: string;
    desc: string;
    impact: string;
  };
  icon: React.ComponentType<{ className?: string }>;
}

const TELEMETRY_BENCHMARKS: TelemetryPoint[] = [
  {
    id: "intake",
    category: "01 // INTAKE VELOCITY",
    metric: "Enquiry Response Time",
    title: "Enquiry Intake & Lead Dispatch",
    icon: Clock,
    before: {
      status: "Lag > 24 Hours",
      badge: "REVENUE LEAK",
      desc: "Inquiries land scattered across personal WhatsApp chats, email inboxes, and phone calls. Leads sit unseen and follow-ups rely on memory.",
      impact: "20%–30% of incoming enquiries lost silently",
    },
    after: {
      status: "< 10s Automated",
      badge: "INSTANT CONVERSION",
      desc: "Official WhatsApp Cloud API and webhook pipelines triage every enquiry instantly, notify sales reps, and issue automated reference IDs.",
      impact: "100% enquiry capture with instant sales assignment",
    },
  },
  {
    id: "sync",
    category: "02 // DATA HYGIENE",
    metric: "Clerical Data Entry",
    title: "Spreadsheet & Tool Synchronization",
    icon: Database,
    before: {
      status: "15+ Hrs / Week",
      badge: "CLERICAL CHURN",
      desc: "Skilled managers waste hours re-typing customer names, order items, and billing details between WhatsApp, Excel, and accounting tools.",
      impact: "Frequent copy-paste errors and fulfillment delays",
    },
    after: {
      status: "0 Hrs Manual Work",
      badge: "BI-DIRECTIONAL SYNC",
      desc: "Direct integrations sync data between WhatsApp, PostgreSQL, Google Sheets, and CRM in real time without manual copy-pasting.",
      impact: "15+ manager hours recaptured every single week",
    },
  },
  {
    id: "reporting",
    category: "03 // LEADERSHIP VISIBILITY",
    metric: "Reporting Latency",
    title: "Operational Telemetry & Dashboards",
    icon: LineChart,
    before: {
      status: "3-Day CSV Delay",
      badge: "REPORTING BLINDNESS",
      desc: "Leadership waits days for pending order or margin reports while staff stitch together broken formulas and disjointed spreadsheets.",
      impact: "Strategic decisions made on outdated operational data",
    },
    after: {
      status: "Real-Time Telemetry",
      badge: "LIVE INSIGHT",
      desc: "Unified internal portals and web dashboards display live pending orders, pipeline margins, and staff velocity from any phone or browser.",
      impact: "Decisions backed by live, single-source-of-truth data",
    },
  },
];

export function OperationalProblemSection() {
  const [mode, setMode] = useState<"before" | "after">("before");

  return (
    <section className="w-full py-14 sm:py-20 bg-[#FAF9F6] border-y border-black/8 text-[#121316] relative overflow-hidden font-sans">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Segmented Switch */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl space-y-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/5 border border-black/8 text-neutral-800 text-[11px] font-mono font-semibold uppercase tracking-wider">
              OPERATIONAL REALITY // BENCHMARK
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#121316] leading-[1.14] text-balance">
              Where businesses lose time, margin, and momentum.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal text-pretty max-w-xl">
              Manual friction isn&apos;t a team failure. It is caused by disconnected tools, informal workflows, and copy-pasting across spreadsheets.
            </p>
          </div>

          {/* Interactive State Toggle */}
          <div className="flex items-center p-1 bg-white border border-black/10 rounded-xl shadow-xs shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setMode("before")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === "before"
                  ? "bg-[#181818] text-white shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <XCircle className="w-3.5 h-3.5 text-red-400" />
              <span>Manual Reality</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("after")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === "after"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>With VISTAR Engine</span>
            </button>
          </div>
        </div>

        {/* 3 High-Density Telemetry Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {TELEMETRY_BENCHMARKS.map((item) => {
            const Icon = item.icon;
            const current = mode === "before" ? item.before : item.after;
            const isBefore = mode === "before";

            return (
              <div
                key={item.id}
                className={`p-5 sm:p-6 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                  isBefore
                    ? "bg-white border-red-200/70 hover:border-red-300 shadow-xs"
                    : "bg-white border-emerald-200 hover:border-emerald-300 shadow-xs"
                }`}
              >
                <div className="space-y-3.5">
                  {/* Category + Indicator */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase">
                      {item.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider border ${
                        isBefore
                          ? "bg-red-50 text-red-700 border-red-200/60"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                      }`}
                    >
                      {current.badge}
                    </span>
                  </div>

                  {/* Header & Icon */}
                  <div className="flex items-start justify-between gap-3 pt-1">
                    <div>
                      <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-tight block">
                        {item.metric}
                      </span>
                      <h3 className="text-base sm:text-[17px] font-bold text-[#181818] leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                        isBefore
                          ? "bg-red-50 text-red-600 border-red-100"
                          : "bg-emerald-50 text-emerald-600 border-emerald-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Metric Delta Stat Callout */}
                  <div
                    className={`py-2 px-3 rounded-lg border font-mono text-xs font-semibold tabular-nums flex items-center justify-between ${
                      isBefore
                        ? "bg-red-50/50 border-red-100 text-red-800"
                        : "bg-emerald-50/50 border-emerald-100 text-emerald-900"
                    }`}
                  >
                    <span className="text-neutral-500 font-sans text-[11px] font-normal">Current State:</span>
                    <span className="font-bold">{current.status}</span>
                  </div>

                  {/* Descriptive Context */}
                  <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal text-pretty">
                    {current.desc}
                  </p>
                </div>

                {/* Outcome Statement */}
                <div
                  className={`mt-4 pt-3 border-t text-xs font-mono font-medium flex items-center gap-1.5 ${
                    isBefore
                      ? "border-red-100 text-red-700"
                      : "border-emerald-100 text-emerald-700"
                  }`}
                >
                  {isBefore ? (
                    <XCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                  ) : (
                    <Zap className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                  )}
                  <span className="text-[11px] leading-tight">{current.impact}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Streamlined Bridge Link */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-black/8 text-xs text-neutral-500 font-mono">
          <span>Recognize one of these bottlenecks in your current business?</span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 font-sans font-semibold text-xs text-[#121316] hover:text-[#FF3823] transition-colors"
          >
            <span>Audit a workflow with our lead engineer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default OperationalProblemSection;
