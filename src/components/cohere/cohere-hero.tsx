"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

import { JasperInteractiveHero } from "@/components/jasper/jasper-interactive-hero";

export function CohereHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Headline Entrance - 120fps hardware-accelerated transform
      gsap.fromTo(
        ".gsap-hero-title-line",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          force3D: true,
        }
      );

      // 2. Subhead Entrance
      gsap.fromTo(
        ".gsap-hero-subhead",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          delay: 0.25,
          ease: "power3.out",
          force3D: true,
        }
      );

      // 3. CTA Buttons Entrance
      gsap.fromTo(
        ".gsap-hero-cta",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.38,
          ease: "power3.out",
          force3D: true,
        }
      );

      // 4. Hero Graphic Entrance
      gsap.fromTo(
        ".gsap-hero-media",
        { y: 36, opacity: 0, scale: 0.99 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.95,
          delay: 0.48,
          ease: "power3.out",
          force3D: true,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-white text-[#212121]">
      {/* ── 1. HERO TEXT SECTION ── */}
      <section className="relative w-full px-4 pt-10 sm:pt-14 md:pt-18 pb-6 md:pb-8 text-[#212121]">
        <div className="relative mx-auto w-full max-w-[1400px]">
          <div className="text-center flex flex-col items-center">
            
            {/* 01: Headline */}
            <div className="mb-5 break-words max-w-[1020px] mx-auto overflow-hidden px-2">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] font-normal leading-[1.05] tracking-[-0.035em] text-[#141413]"
                style={{
                  fontFamily:
                    '"CohereText", "Space Grotesk", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                <span className="gsap-hero-title-line block overflow-hidden will-change-transform">
                  Your AI.
                </span>
                <span className="gsap-hero-title-line block overflow-hidden will-change-transform">
                  Your Work.
                </span>
              </h1>
            </div>

            {/* 02: Polished Authoritative Subhead */}
            <div className="gsap-hero-subhead w-full max-w-[680px] px-4 mx-auto mb-7 will-change-transform">
              <p
                className="text-base sm:text-lg md:text-[18.5px] font-normal leading-[1.55] text-neutral-600"
                style={{
                  fontFamily:
                    '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                We architect, build, and deploy custom autonomous AI agents and enterprise software directly into your private infrastructure. 100% source code ownership. Zero vendor lock-in. Delivered in 14-day production sprints.
              </p>
            </div>

            {/* 03: Clear Conversion CTA Row */}
            <div className="gsap-hero-cta flex flex-wrap items-center justify-center gap-3 sm:gap-4 will-change-transform">
              <Link
                href="/start"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-[#FF3823] hover:bg-[#E02F1C] text-white font-medium text-sm sm:text-base rounded-none transition-all shadow-xs hover:shadow-sm active:scale-95 gap-2"
                style={{
                  fontFamily:
                    '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                Start Free Diagnostic
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-[#141413] text-[#141413] bg-transparent hover:bg-neutral-100 font-medium text-sm sm:text-base rounded-none transition-all active:scale-95"
                style={{
                  fontFamily:
                    '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                Explore Production Systems &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. JASPER AI INTERACTIVE HERO STAGE (3D RIVE KEYBOARD & CAPABILITY CYCLER) ── */}
      <section className="gsap-hero-media relative w-full px-4 lg:px-10 pb-12 md:pb-16 bg-white text-[#212121] will-change-transform">
        <div className="relative mx-auto w-full max-w-[1360px] overflow-hidden rounded-[16px] border border-black/[0.08] shadow-sm bg-[#FAF9F5]">
          <JasperInteractiveHero />
        </div>
      </section>
    </div>
  );
}

export default CohereHero;
