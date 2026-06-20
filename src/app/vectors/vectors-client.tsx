"use client";

import React, { useEffect, useRef, useState } from "react";
import { TechHelix } from "@/components/ui/tech-helix";
import { TechOrbit } from "@/components/ui/tech-orbit";
import { TechTimeline } from "@/components/ui/tech-timeline";
import { motion } from "framer-motion";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Technology Page — Cinematic Scroll-Driven Experience
// ─────────────────────────────────────────────────────────────────────────────

export default function VectorsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Section scroll progress values (0-1 each)
  const [helixProgress, setHelixProgress] = useState(0);
  const [orbitProgress, setOrbitProgress] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [ctaProgress, setCtaProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Section breakpoints (based on total page height ~500vh)
      // Section 1 (Helix): 0vh → 150vh
      const s1Start = 0;
      const s1End = vh * 1.5;

      // Section 2 (Orbit): 150vh → 300vh
      const s2Start = s1End;
      const s2End = s2Start + vh * 1.5;

      // Section 3 (Timeline): 300vh → 450vh
      const s3Start = s2End;
      const s3End = s3Start + vh * 1.5;

      // Section 4 (CTA): 450vh → 500vh
      const s4Start = s3End;
      const s4End = s4Start + vh * 0.5;

      setHelixProgress(clamp((scrollY - s1Start) / (s1End - s1Start)));
      setOrbitProgress(clamp((scrollY - s2Start) / (s2End - s2Start)));
      setTimelineProgress(clamp((scrollY - s3Start) / (s3End - s3Start)));
      setCtaProgress(clamp((scrollY - s4Start) / (s4End - s4Start)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial calculation
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#050510] text-white relative"
      style={{ height: "500vh" }}
    >
      {/* Persistent background noise */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.015]"
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
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ─── Section 1: DNA Helix Hero ──────────────────────────────────── */}
      <div className="sticky top-0 h-screen z-10">
        <TechHelix scrollProgress={helixProgress} />

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none select-none"
          style={{ opacity: 1 - helixProgress * 3 }}
        >
          <span className="font-mono text-[9px] tracking-widest uppercase text-white/25">
            Scroll to explore
          </span>
          <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 rounded-full bg-[#ff1e90]"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      {/* ─── Section 2: Tech Stack Orbit → Grid ─────────────────────────── */}
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

      {/* ─── Section 3: Process Timeline ────────────────────────────────── */}
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

      {/* ─── Section 4: Launch CTA ──────────────────────────────────────── */}
      <div className="sticky top-0 h-screen z-40 flex items-center justify-center">
        <div
          className="w-full h-full flex flex-col items-center justify-center px-6"
          style={{
            opacity: ctaProgress > 0 ? Math.min(ctaProgress * 3, 1) : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Pulsing border container */}
          <div
            className="relative max-w-2xl w-full text-center space-y-8 py-16 px-8 rounded-3xl border"
            style={{
              borderColor: `rgba(255, 30, 144, ${0.15 + Math.sin(Date.now() * 0.003) * 0.1})`,
              background:
                "radial-gradient(ellipse at center, rgba(255,30,144,0.03) 0%, rgba(5,5,16,0.95) 70%)",
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
                build?
              </span>
            </h2>

            <p className="font-sans text-sm text-white/40 max-w-md mx-auto leading-relaxed">
              Every project starts with a conversation. Let&apos;s discuss your
              vision and architect a system engineered for maximum impact.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-display text-sm font-black uppercase tracking-widest text-black bg-[#d8ff42] px-8 py-4 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#ff1e90] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 interactive"
            >
              Initiate Project
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>

            {/* Engagement details */}
            <div className="flex flex-wrap justify-center gap-6 pt-4 text-white/20 font-mono text-[9px] uppercase tracking-wider">
              <span>
                From{" "}
                <span className="text-white/50 font-bold">$15k</span>
              </span>
              <span>•</span>
              <span>
                SLA:{" "}
                <span className="text-white/50 font-bold">24Hr Direct</span>
              </span>
              <span>•</span>
              <span>
                Slots:{" "}
                <span className="text-[#d8ff42] font-bold">Limited</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Utility ─────────────────────────────────────────────────────────────────
function clamp(val: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, val));
}
