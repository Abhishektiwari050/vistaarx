"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, RefreshCw, Zap, CheckCircle2 } from "lucide-react";

export function OperationalProblemSection() {
  const [mode, setMode] = useState<"before" | "after">("before");
  const isBefore = mode === "before";

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#FAF8F5] text-[#141518] overflow-hidden font-sans border-y border-black/[0.06] select-none">
      
      {/* ── AMBIENT LUXURY GRADIENT GLOWS (Matching Render) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-emerald-200/35 via-teal-100/20 to-transparent blur-3xl opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 right-0 w-[520px] h-[440px] rounded-full bg-gradient-to-bl from-rose-200/40 via-orange-100/25 to-transparent blur-3xl opacity-80"
      />

      <div className="relative max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── HEADER ROW WITH TOP-RIGHT 3D SPHERE ARTWORK & TOGGLE ── */}
        <div className="relative flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12 sm:mb-16">
          
          {/* Left Text Block */}
          <div className="max-w-2xl space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-black/8 text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-700 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3823] animate-pulse" />
              <span>OPERATIONAL REALITY // BENCHMARK</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#141518] leading-[1.12] text-balance">
              Where businesses lose time, margin, and momentum.
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal text-pretty max-w-xl">
              Manual friction isn&apos;t a team failure. It&apos;s caused by disconnected tools, informal workflows, and copy-pasting across spreadsheets.
            </p>
          </div>

          {/* Right Column: Floating 3D Chrome Sphere + State Toggle Switch */}
          <div className="flex flex-col items-start lg:items-end gap-6 shrink-0">
            
            {/* High-Craft Floating 3D Chrome Sphere with Orbital Glass Rings */}
            <div className="hidden sm:block relative w-48 h-24 -mt-2 pointer-events-none">
              <svg viewBox="0 0 240 120" className="w-full h-full overflow-visible">
                <defs>
                  {/* Chrome sphere gradient */}
                  <radialGradient id="chromeBall" cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="25%" stopColor="#E2E4EB" />
                    <stop offset="55%" stopColor="#8A8F9E" />
                    <stop offset="85%" stopColor="#3C404E" />
                    <stop offset="100%" stopColor="#1B1D24" />
                  </radialGradient>

                  {/* Soft sphere drop shadow */}
                  <radialGradient id="ballShadow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(0,0,0,0.22)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                  </radialGradient>

                  {/* Glass orbital ring gradient */}
                  <linearGradient id="glassRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                    <stop offset="40%" stopColor="rgba(255,180,180,0.4)" />
                    <stop offset="70%" stopColor="rgba(255,255,255,0.2)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.85)" />
                  </linearGradient>

                  {/* Soft pink ambient orb reflection */}
                  <radialGradient id="pinkReflect" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(255,120,120,0.35)" />
                    <stop offset="100%" stopColor="rgba(255,120,120,0)" />
                  </radialGradient>
                </defs>

                {/* Soft ambient back glow */}
                <ellipse cx="140" cy="65" rx="55" ry="30" fill="url(#pinkReflect)" />
                <ellipse cx="140" cy="88" rx="42" ry="10" fill="url(#ballShadow)" />

                {/* Rear Elliptical Orbital Glass Ring */}
                <ellipse
                  cx="140"
                  cy="62"
                  rx="75"
                  ry="26"
                  fill="none"
                  stroke="url(#glassRing)"
                  strokeWidth="2"
                  transform="rotate(-18 140 62)"
                  opacity="0.75"
                />

                {/* Floating Chrome Sphere */}
                <circle cx="140" cy="60" r="28" fill="url(#chromeBall)" />

                {/* Front Elliptical Glass Ring (Intersects sphere) */}
                <path
                  d="M 68 76 C 85 96, 185 80, 208 52"
                  fill="none"
                  stroke="url(#glassRing)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Tiny Floating Satellite Chrome Spheres */}
                <circle cx="82" cy="72" r="3.5" fill="url(#chromeBall)" />
                <circle cx="198" cy="48" r="4.5" fill="url(#chromeBall)" />
                <circle cx="120" cy="30" r="2.5" fill="url(#chromeBall)" />
              </svg>
            </div>

            {/* Tactile Capsule Toggle Switch */}
            <div className="flex items-center p-1 bg-white/90 backdrop-blur-md border border-black/10 rounded-full shadow-sm">
              <button
                type="button"
                onClick={() => setMode("before")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  isBefore
                    ? "bg-[#141518] text-white shadow-xs"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isBefore ? "bg-[#FF3823] shadow-[0_0_8px_#FF3823]" : "bg-neutral-300"
                  }`}
                />
                <span>Manual Reality</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("after")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  !isBefore
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    !isBefore ? "bg-white shadow-[0_0_8px_#FFFFFF]" : "bg-neutral-300"
                  }`}
                />
                <span>With VISTAR Engine</span>
              </button>
            </div>

          </div>
        </div>

        {/* ── THE 3 CONNECTED PIPELINE CARDS ── */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Connecting SVG Flow Curves with Arrow Badges (Desktop) */}
          <div aria-hidden="true" className="hidden lg:block absolute inset-0 pointer-events-none z-20">
            {/* Wire 1 -> 2 */}
            <div className="absolute top-[50%] left-[32.5%] -translate-y-1/2 -translate-x-1/2 flex items-center">
              <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                <path
                  d="M 0 12 C 20 12, 40 12, 60 12"
                  stroke={isBefore ? "#FFB5A8" : "#86EFAC"}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
              <div
                className={`w-6 h-6 rounded-full -ml-8 flex items-center justify-center border shadow-xs transition-colors duration-300 ${
                  isBefore
                    ? "bg-[#FFF2EF] border-[#FFD5CC] text-[#FF3823]"
                    : "bg-[#EDFDF3] border-[#BBF7D0] text-emerald-600"
                }`}
              >
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Wire 2 -> 3 */}
            <div className="absolute top-[50%] left-[66%] -translate-y-1/2 -translate-x-1/2 flex items-center">
              <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                <path
                  d="M 0 12 C 20 12, 40 12, 60 12"
                  stroke={isBefore ? "#FFB5A8" : "#86EFAC"}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
              <div
                className={`w-6 h-6 rounded-full -ml-8 flex items-center justify-center border shadow-xs transition-colors duration-300 ${
                  isBefore
                    ? "bg-[#FFF2EF] border-[#FFD5CC] text-[#FF3823]"
                    : "bg-[#EDFDF3] border-[#BBF7D0] text-emerald-600"
                }`}
              >
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* ── CARD 01: INTAKE & DISPATCH ── */}
          <div
            className={`relative rounded-[26px] sm:rounded-[30px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 bg-white/95 backdrop-blur-md border ${
              isBefore ? "border-red-200/70" : "border-emerald-200"
            } shadow-[0_16px_40px_-12px_rgba(0,0,0,0.04)]`}
          >
            {/* Card Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center font-mono text-[11px] font-bold text-neutral-700 bg-[#FAF9F5]">
                    01
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-neutral-400">
                    INTAKE &amp; DISPATCH
                  </span>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    isBefore
                      ? "bg-[#FFF0ED] text-[#FF3823] border-[#FFD5CC]"
                      : "bg-[#EDFBF2] text-[#16A34A] border-[#C6F2D4]"
                  }`}
                >
                  {isBefore ? "REVENUE LEAK" : "INSTANT CONVERSION"}
                </span>
              </div>

              <h3 className="text-lg sm:text-[19px] font-bold text-[#141518] leading-tight">
                Enquiry Intake &amp; Lead Dispatch
              </h3>
            </div>

            {/* ── 3D VISUAL CENTERPIECE (WhatsApp Chat vs. Excel Sheets) ── */}
            <div className="relative my-6 h-44 sm:h-48 w-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#FAF8F5]/80 to-[#FFF5F2]/50 border border-black/[0.04]">
              {isBefore ? (
                /* Manual Mode Graphic: Floating WhatsApp message cards flowing into disjointed Excel rows */
                <div className="relative w-full h-full flex items-center justify-center scale-95 sm:scale-100">
                  {/* Left: Stacked WhatsApp Chat Cards */}
                  <div className="absolute left-4 sm:left-6 space-y-2 z-10 [transform:perspective(800px)_rotateY(-10deg)_rotateX(6deg)]">
                    <div className="w-36 sm:w-40 p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-xs">
                        <span className="text-white font-bold text-[10px]">W</span>
                      </div>
                      <div className="space-y-1 w-full">
                        <div className="h-2 w-16 bg-neutral-300 rounded-sm" />
                        <div className="h-1.5 w-24 bg-neutral-200 rounded-sm" />
                      </div>
                    </div>

                    <div className="w-36 sm:w-40 p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center gap-2 -translate-x-1">
                      <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-xs">
                        <span className="text-white font-bold text-[10px]">W</span>
                      </div>
                      <div className="space-y-1 w-full">
                        <div className="h-2 w-20 bg-neutral-300 rounded-sm" />
                        <div className="h-1.5 w-16 bg-neutral-200 rounded-sm" />
                      </div>
                    </div>

                    <div className="w-36 sm:w-40 p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center gap-2 translate-x-1">
                      <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center shrink-0 shadow-xs">
                        <span className="text-white font-bold text-[10px]">@</span>
                      </div>
                      <div className="space-y-1 w-full">
                        <div className="h-2 w-14 bg-neutral-300 rounded-sm" />
                        <div className="h-1.5 w-20 bg-neutral-200 rounded-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Right: Floating Excel Spreadsheet Window */}
                  <div className="absolute right-3 sm:right-5 w-40 sm:w-44 h-28 rounded-xl bg-white/90 backdrop-blur-md border border-emerald-200/80 shadow-[0_12px_28px_rgba(0,0,0,0.08)] p-2.5 [transform:perspective(800px)_rotateY(12deg)_rotateX(4deg)]">
                    <div className="flex items-center gap-1.5 pb-2 border-b border-black/6">
                      <div className="w-4 h-4 rounded bg-[#107C41] flex items-center justify-center text-white font-bold text-[8px]">
                        X
                      </div>
                      <span className="text-[9px] font-mono text-neutral-500 font-semibold">Leads_2026.xlsx</span>
                    </div>
                    <div className="pt-2 space-y-1.5">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="h-2 bg-emerald-100/60 rounded-xs" />
                        <div className="h-2 bg-emerald-100/60 rounded-xs" />
                        <div className="h-2 bg-emerald-100/60 rounded-xs" />
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="h-2 bg-neutral-100 rounded-xs" />
                        <div className="h-2 bg-neutral-100 rounded-xs" />
                        <div className="h-2 bg-neutral-100 rounded-xs" />
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="h-2 bg-neutral-100 rounded-xs" />
                        <div className="h-2 bg-neutral-100 rounded-xs" />
                        <div className="h-2 bg-neutral-100 rounded-xs" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* VISTAR Automated Mode: Instant Webhook Pipeline <10s with Verification Badges */
                <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-400 flex items-center justify-center shadow-xs">
                      <Zap className="w-5 h-5 text-emerald-600 animate-pulse" />
                    </div>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" />
                    <div className="w-11 h-11 rounded-2xl bg-white border border-emerald-300 flex items-center justify-center shadow-xs">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>

                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-bold">
                    <span>Speed: &lt; 10s Automated Dispatch</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 mt-1">100% Leads Routed Instantly</span>
                </div>
              )}
            </div>

            {/* Bottom Metric Row */}
            <div className="pt-3 border-t border-black/[0.06] flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  isBefore ? "bg-[#FFF0ED] text-[#FF3823]" : "bg-[#EDFBF2] text-[#16A34A]"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-[13px] font-sans font-medium text-neutral-700">
                {isBefore
                  ? "20%–30% of incoming enquiries lost silently"
                  : "Zero missed leads • Instant sales notification"}
              </span>
            </div>
          </div>

          {/* ── CARD 02: DATA SYNC ── */}
          <div
            className={`relative rounded-[26px] sm:rounded-[30px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 bg-white/95 backdrop-blur-md border ${
              isBefore ? "border-red-200/70" : "border-emerald-200"
            } shadow-[0_16px_40px_-12px_rgba(0,0,0,0.04)]`}
          >
            {/* Card Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center font-mono text-[11px] font-bold text-neutral-700 bg-[#FAF9F5]">
                    02
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-neutral-400">
                    DATA SYNC
                  </span>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    isBefore
                      ? "bg-[#FFF0ED] text-[#FF3823] border-[#FFD5CC]"
                      : "bg-[#EDFBF2] text-[#16A34A] border-[#C6F2D4]"
                  }`}
                >
                  {isBefore ? "CLERICAL CHURN" : "BI-DIRECTIONAL SYNC"}
                </span>
              </div>

              <h3 className="text-lg sm:text-[19px] font-bold text-[#141518] leading-tight">
                Spreadsheet &amp; Tool Synchronization
              </h3>
            </div>

            {/* ── 3D VISUAL CENTERPIECE (App Badges Orbiting Sync Node) ── */}
            <div className="relative my-6 h-44 sm:h-48 w-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#FAF8F5]/80 to-[#FFF5F2]/50 border border-black/[0.04]">
              {isBefore ? (
                /* Manual Mode Graphic: Clashing documents with floating WhatsApp, Gmail, Excel icons and sync bottleneck */
                <div className="relative w-full h-full flex items-center justify-center scale-95 sm:scale-100">
                  {/* Layered Document Cards in Background */}
                  <div className="absolute w-44 h-24 rounded-xl bg-rose-50/80 border border-rose-200/70 shadow-xs [transform:rotate(-6deg)]" />
                  <div className="absolute w-44 h-24 rounded-xl bg-white/90 border border-black/8 shadow-[0_8px_24px_rgba(0,0,0,0.06)] [transform:rotate(4deg)] flex flex-col p-2.5 justify-around">
                    <div className="h-1.5 w-24 bg-neutral-200 rounded-sm" />
                    <div className="h-1.5 w-32 bg-neutral-100 rounded-sm" />
                    <div className="h-1.5 w-20 bg-neutral-200 rounded-sm" />
                  </div>

                  {/* Floating Brand Icons */}
                  <div className="absolute -top-1 left-8 w-8 h-8 rounded-xl bg-white border border-black/8 shadow-md flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white text-[9px] font-bold">
                      W
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-6 w-8 h-8 rounded-xl bg-white border border-black/8 shadow-md flex items-center justify-center">
                    <div className="w-5 h-5 rounded-md bg-red-500 flex items-center justify-center text-white text-[9px] font-bold">
                      M
                    </div>
                  </div>

                  <div className="absolute -top-1 right-8 w-8 h-8 rounded-xl bg-white border border-black/8 shadow-md flex items-center justify-center">
                    <div className="w-5 h-5 rounded-md bg-[#107C41] flex items-center justify-center text-white text-[9px] font-bold">
                      X
                    </div>
                  </div>

                  {/* Central Friction Sync Badge */}
                  <div className="relative z-10 w-11 h-11 rounded-2xl bg-white/95 border border-black/10 shadow-lg flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 text-neutral-800 animate-[spin_6s_linear_infinite]" />
                  </div>
                </div>
              ) : (
                /* VISTAR Automated Mode: Real-time PostgreSQL/API Cloud Sync */
                <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400 flex items-center justify-center shadow-xs">
                    <RefreshCw className="w-6 h-6 text-emerald-600 animate-[spin_3s_linear_infinite]" />
                  </div>

                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-bold">
                    <span>100% Automated Bidirectional Sync</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 mt-1">15+ Manager Hours Recaptured Weekly</span>
                </div>
              )}
            </div>

            {/* Bottom Metric Row */}
            <div className="pt-3 border-t border-black/[0.06] flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  isBefore ? "bg-[#FFF0ED] text-[#FF3823]" : "bg-[#EDFBF2] text-[#16A34A]"
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-[13px] font-sans font-medium text-neutral-700">
                {isBefore
                  ? "Frequent copy-paste errors and fulfillment delays"
                  : "Zero manual re-entry • Real-time DB sync"}
              </span>
            </div>
          </div>

          {/* ── CARD 03: LEADERSHIP VISIBILITY ── */}
          <div
            className={`relative rounded-[26px] sm:rounded-[30px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 bg-white/95 backdrop-blur-md border ${
              isBefore ? "border-emerald-200" : "border-emerald-300 shadow-emerald-500/5"
            } shadow-[0_16px_40px_-12px_rgba(0,0,0,0.04)]`}
          >
            {/* Card Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center font-mono text-[11px] font-bold text-neutral-700 bg-[#FAF9F5]">
                    03
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-neutral-400">
                    LEADERSHIP VISIBILITY
                  </span>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    isBefore
                      ? "bg-[#EDFBF2] text-[#16A34A] border-[#C6F2D4]"
                      : "bg-[#EDFBF2] text-[#16A34A] border-[#C6F2D4]"
                  }`}
                >
                  {isBefore ? "REPORTING BLINDNESS" : "LIVE TELEMETRY"}
                </span>
              </div>

              <h3 className="text-lg sm:text-[19px] font-bold text-[#141518] leading-tight">
                Operational Telemetry &amp; Dashboards
              </h3>
            </div>

            {/* ── 3D VISUAL CENTERPIECE (3D Dashboard with Metallic VISTAR Emblem) ── */}
            <div className="relative my-6 h-44 sm:h-48 w-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#FAF8F5]/80 to-[#EDFAF2]/50 border border-black/[0.04]">
              {/* Floating Glass Dashboard Panel */}
              <div className="relative w-48 sm:w-52 h-32 rounded-xl bg-white/95 backdrop-blur-md border border-emerald-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.07)] p-3 [transform:perspective(800px)_rotateY(-8deg)_rotateX(6deg)] flex flex-col justify-between">
                <div className="flex items-center justify-between pb-1.5 border-b border-black/6">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[9px] font-mono text-emerald-700 font-bold">LIVE TELEMETRY</span>
                </div>

                {/* Vector Trendline Chart */}
                <svg className="w-full h-12 overflow-visible" viewBox="0 0 160 40">
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 35 Q 30 30, 60 18 T 110 14 T 160 4 L 160 40 L 0 40 Z"
                    fill="url(#chartGlow)"
                  />
                  <path
                    d="M 0 35 Q 30 30, 60 18 T 110 14 T 160 4"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="160" cy="4" r="3.5" fill="#10B981" />
                </svg>

                {/* Bar Mini-Indicators */}
                <div className="grid grid-cols-4 gap-1 items-end h-4 pt-1">
                  <div className="bg-emerald-200 h-2 rounded-xs" />
                  <div className="bg-emerald-300 h-3 rounded-xs" />
                  <div className="bg-emerald-400 h-4 rounded-xs" />
                  <div className="bg-emerald-500 h-3.5 rounded-xs" />
                </div>
              </div>

              {/* Floating Metallic VISTAR Emblem Disc (Exact replica from render) */}
              <div className="absolute -bottom-2 right-4 sm:right-6 w-16 h-16 rounded-full bg-gradient-to-tr from-[#121316] via-[#22242B] to-[#3C3E49] border border-white/20 shadow-xl flex flex-col items-center justify-center text-white [transform:perspective(600px)_rotateY(-12deg)] z-10">
                <div className="w-4 h-4 text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="white" />
                  </svg>
                </div>
                <span className="text-[7.5px] font-mono tracking-widest uppercase font-bold mt-0.5">VISTAR</span>

                {/* Delicate outer orbital glass ring around emblem */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-2 rounded-full border border-white/30 [transform:rotate(24deg)]"
                />
              </div>
            </div>

            {/* Bottom Metric Row */}
            <div className="pt-3 border-t border-black/[0.06] flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#EDFBF2] text-[#16A34A] flex items-center justify-center shrink-0">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-[13px] font-sans font-medium text-neutral-700">
                {isBefore ? "3-Day CSV Delay" : "Sub-second production telemetry • Zero stale numbers"}
              </span>
            </div>
          </div>

        </div>

        {/* ── BOTTOM BRIDGE BAR (Exact Replica from Render) ── */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-black/8">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-sans text-neutral-700">
            <div className="w-5 h-5 text-neutral-900 shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#141518" />
              </svg>
            </div>
            <span>Recognize one of these bottlenecks in your current business?</span>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 font-sans font-semibold text-xs sm:text-sm text-[#141518] hover:text-[#FF3823] transition-colors group"
          >
            <span>Audit a workflow with our lead engineer</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default OperationalProblemSection;
