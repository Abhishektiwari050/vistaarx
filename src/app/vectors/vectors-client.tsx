"use client";

import React, { useEffect, useRef, useState } from "react";
import { TechHelix } from "@/components/ui/tech-helix";
import { TechOrbit } from "@/components/ui/tech-orbit";
import { TechTimeline } from "@/components/ui/tech-timeline";
import { TechMetrics } from "@/components/ui/tech-metrics";
import { motion } from "framer-motion";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Technology Page — 5-Section Cinematic Scroll-Driven Experience
// Sections: [Helix Hero] → [Bento Stack] → [Process Timeline] → [Metrics] → [CTA]
// ─────────────────────────────────────────────────────────────────────────────

export default function VectorsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [helixProgress, setHelixProgress] = useState(0);
  const [orbitProgress, setOrbitProgress] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [metricsProgress, setMetricsProgress] = useState(0);
  const [ctaProgress, setCtaProgress] = useState(0);

  // Animated border glow for CTA (replaces static Math.sin(Date.now()))
  const [borderGlow, setBorderGlow] = useState(0.15);
  const glowFrame = useRef<number>(0);

  useEffect(() => {
    const animateGlow = () => {
      setBorderGlow(0.15 + Math.sin(performance.now() * 0.003) * 0.1);
      glowFrame.current = requestAnimationFrame(animateGlow);
    };
    glowFrame.current = requestAnimationFrame(animateGlow);
    return () => cancelAnimationFrame(glowFrame.current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // 7-viewport page total (sections: 1.5+1.5+2.0+1.0+1.0)
      const s1Start = 0;
      const s1End = vh * 1.5;      // Helix: 0 → 1.5vh

      const s2Start = s1End;
      const s2End = s2Start + vh * 1.5; // Bento: 1.5 → 3vh

      const s3Start = s2End;
      const s3End = s3Start + vh * 2.0; // Timeline: 3 → 5vh

      const s4Start = s3End;
      const s4End = s4Start + vh * 1.0; // Metrics: 5 → 6vh

      const s5Start = s4End;
      const s5End = s5Start + vh * 1.0; // CTA: 6 → 7vh

      setHelixProgress(clamp((scrollY - s1Start) / (s1End - s1Start)));
      setOrbitProgress(clamp((scrollY - s2Start) / (s2End - s2Start)));
      setTimelineProgress(clamp((scrollY - s3Start) / (s3End - s3Start)));
      setMetricsProgress(clamp((scrollY - s4Start) / (s4End - s4Start)));
      setCtaProgress(clamp((scrollY - s5Start) / (s5End - s5Start)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#050510] text-white relative"
      style={{ height: "700vh" }}
    >
      {/* Persistent film-grain noise */}
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

      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ─── Section 1: DNA Helix Hero ────────────────────────────────────── */}
      <div className="sticky top-0 h-screen z-10">
        <TechHelix scrollProgress={helixProgress} />
      </div>

      {/* ─── Section 2: Tech Stack Bento Grid ────────────────────────────── */}
      <div className="sticky top-0 h-screen z-20">
        <div
          className="w-full h-full"
          style={{
            opacity: orbitProgress > 0 ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <TechOrbit scrollProgress={orbitProgress} />
        </div>
      </div>

      {/* ─── Section 3: Process Timeline ──────────────────────────────────── */}
      <div className="sticky top-0 h-screen z-30">
        <div
          className="w-full h-full"
          style={{
            opacity: timelineProgress > 0 ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <TechTimeline scrollProgress={timelineProgress} />
        </div>
      </div>

      {/* ─── Section 4: Engineering Metrics + Terminal ─────────────────────── */}
      <div className="sticky top-0 h-screen z-[35]">
        <div
          className="w-full h-full"
          style={{
            opacity: metricsProgress > 0 ? Math.min(metricsProgress * 4, 1) : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <TechMetrics />
        </div>
      </div>

      {/* ─── Section 5: Launch CTA ────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen z-40 flex items-center justify-center">
        <div
          className="w-full h-full flex flex-col items-center justify-center px-6"
          style={{
            opacity: ctaProgress > 0 ? Math.min(ctaProgress * 3, 1) : 0,
            transition: "opacity 0.4s ease",
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
                className="flex items-center gap-1.5 bg-white/[0.04] border border-white/8 rounded-full px-4 py-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: pill.dot }} />
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/35">{pill.label}</span>
              </div>
            ))}
          </div>

          {/* Pulsing border container */}
          <div
            className="relative max-w-2xl w-full text-center space-y-8 py-16 px-8 rounded-3xl border"
            style={{
              borderColor: `rgba(255, 30, 144, ${borderGlow})`,
              background:
                "radial-gradient(ellipse at center, rgba(255,30,144,0.04) 0%, rgba(5,5,16,0.97) 70%)",
            }}
          >
            {/* System ready badge */}
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

// ── Utility ──────────────────────────────────────────────────────────────────
function clamp(val: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, val));
}
