"use client";

import React, { useEffect, useRef, useState } from "react";
import { TechHelix } from "@/components/ui/tech-helix";
import { TechOrbit } from "@/components/ui/tech-orbit";
import { TechTimeline } from "@/components/ui/tech-timeline";
import { TechMetrics } from "@/components/ui/tech-metrics";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Technology Page — Scroll-Driven Cinematic Experience
//
// ARCHITECTURE: Each section has its own scroll-budget wrapper div.
// This is the canonical CSS sticky pattern:
//
//   <div style={{height: "150vh"}}>   ← scroll budget
//     <div className="sticky top-0 h-screen">  ← sticks only within budget
//       <Section />
//     </div>
//   </div>
//
// Without individual budget wrappers, all sticky elements share the same
// parent container and all stick simultaneously, causing visual overlap.
// ─────────────────────────────────────────────────────────────────────────────

const SECTION_HEIGHTS = {
  s1: 1.5, // Helix hero  — 1.5 screens of scroll
  s2: 1.5, // Bento stack — 1.5 screens
  s3: 2.0, // Timeline    — 2.0 screens (horizontal scroll needs more budget)
  s4: 1.2, // Metrics     — 1.2 screens
  s5: 1.2, // CTA         — 1.2 screens
};

function clamp(v: number, lo = 0, hi = 1) {
  if (isNaN(v)) return lo;
  return Math.max(lo, Math.min(hi, v));
}

export default function VectorsPage() {
  return (
    <div className="w-full bg-[#050510] text-white">
      {/* Fixed film-grain texture */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Fixed grid overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.016]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ─── Section 1: DNA Helix Hero ────────────────────────────────────────
          Budget: 1.5vh — sticky child sticks only while this wrapper is in view
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[150vh]">
        <div className="sticky top-0 h-screen z-10 overflow-hidden bg-[#050510]">
          <TechHelix />
        </div>
      </div>

      {/* ─── Section 2: Tech Stack Bento Grid ───────────────────────────────
          Budget: 1.5vh — fades in as section scrolls into view
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[150vh]">
        <div className="sticky top-0 h-screen z-20 overflow-hidden bg-[#050510]">
          <TechOrbit />
        </div>
      </div>

      {/* ─── Section 3: Process Timeline ─────────────────────────────────────
          Budget: 2.0vh — horizontal track needs more scroll budget
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[200vh]">
        <div className="sticky top-0 h-screen z-30 overflow-hidden bg-[#050510]">
          <TechTimeline />
        </div>
      </div>

      {/* ─── Section 4: Engineering Metrics + Terminal ───────────────────────
          Budget: 1.2vh
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[120vh]">
        <div className="sticky top-0 h-screen z-40 overflow-hidden bg-[#050510]">
          <TechMetrics />
        </div>
      </div>

      {/* ─── Section 5: Launch CTA ───────────────────────────────────────────
          Budget: 1.2vh
      ──────────────────────────────────────────────────────────────────────── */}
      <CtaSection />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CtaSection — Self-contained scroll tracking and animations for the CTA section
// ─────────────────────────────────────────────────────────────────────────────
function CtaSection() {
  const [ctaProgress, setCtaProgress] = useState(0);
  const [borderGlow, setBorderGlow] = useState(0.15);
  const glowFrame = useRef<number>(0);

  // Animated CTA border glow using rAF
  useEffect(() => {
    const tick = () => {
      setBorderGlow(0.15 + Math.sin(performance.now() * 0.003) * 0.1);
      glowFrame.current = requestAnimationFrame(tick);
    };
    glowFrame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(glowFrame.current);
  }, []);

  // Local scroll tracking for CtaSection
  useEffect(() => {
    const handleScroll = () => {
      const h = window.innerHeight;
      const y = window.scrollY;
      // Section 5 starts at s5Start = s4Start + s4Height
      // s1 = 1.5, s2 = 1.5, s3 = 2.0, s4 = 1.2 => s5Start = 6.2vh
      const s5Start = h * 6.2;
      const rawProgress = (y - s5Start) / (h * 1.2); // s5 height = 1.2vh
      const progress = isNaN(rawProgress) ? 0 : Math.max(0, Math.min(1, rawProgress));
      setCtaProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[120vh]">
      <div className="sticky top-0 h-screen z-50 overflow-hidden bg-[#050510] flex items-center justify-center">
        <div
          className="w-full flex flex-col items-center justify-center px-6 transition-all duration-700"
          style={{
            opacity: Math.min(ctaProgress * 4, 1),
            transform: `translateY(${(1 - Math.min(ctaProgress * 4, 1)) * 24}px)`,
          }}
        >
          {/* Qualifier pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { label: "No lock-in contracts", dot: "#d8ff42" },
              { label: "Full code ownership", dot: "#ff1e90" },
              { label: "7–21 day delivery", dot: "#3366ff" },
            ].map((pill) => (
              <div
                key={pill.label}
                className="flex items-center gap-1.5 bg-white/[0.04] border border-white/10 rounded-full px-4 py-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: pill.dot }} />
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/35">
                  {pill.label}
                </span>
              </div>
            ))}
          </div>

          {/* Pulsing border card */}
          <div
            className="relative max-w-2xl w-full text-center space-y-8 py-16 px-8 rounded-3xl border"
            style={{
              borderColor: `rgba(255, 30, 144, ${borderGlow})`,
              background:
                "radial-gradient(ellipse at center, rgba(255,30,144,0.04) 0%, rgba(5,5,16,0.97) 70%)",
            }}
          >
            <div className="flex justify-center">
              <span className="font-mono text-[9px] font-extrabold tracking-[0.3em] text-[#d8ff42] uppercase bg-[#d8ff42]/10 border border-[#d8ff42]/20 px-5 py-2 rounded inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d8ff42] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d8ff42]" />
                </span>
                System Ready
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
              Ready to
              <br />
              <span className="bg-gradient-to-r from-[#ff1e90] to-[#d8ff42] bg-clip-text text-transparent">
                Build?
              </span>
            </h2>

            <p className="font-sans text-sm text-white/40 max-w-md mx-auto leading-relaxed">
              Every project starts with a conversation. Let&apos;s discuss your
              vision and architect a system engineered for maximum impact.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-display text-sm font-black uppercase tracking-widest text-black bg-[#d8ff42] px-10 py-4 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#ff1e90] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300"
            >
              Initiate Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <div className="flex flex-wrap justify-center gap-6 pt-2 text-white/20 font-mono text-[9px] uppercase tracking-wider">
              <span>From <span className="text-white/50 font-bold">$15k</span></span>
              <span>•</span>
              <span>SLA: <span className="text-white/50 font-bold">24Hr Direct</span></span>
              <span>•</span>
              <span>Slots: <span className="text-[#d8ff42] font-bold">Limited</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
