"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";


export function CohereHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Viewport-aware autoplay/pause: saves CPU/GPU battery and keeps site fast
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

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
            
            {/* 01: Headline matching original Cohere aesthetic */}
            <div className="mb-5 break-words max-w-[1020px] mx-auto overflow-hidden px-2">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] font-normal leading-[1.05] tracking-[-0.035em] text-[#141413]"
                style={{
                  fontFamily:
                    '"CohereText", "Space Grotesk", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                <span className="gsap-hero-title-line block overflow-hidden will-change-transform">
                  Stop losing time
                </span>
                <span className="gsap-hero-title-line block overflow-hidden will-change-transform">
                  to manual work.
                </span>
              </h1>
            </div>

            {/* 02: Polished Authoritative Subhead */}
            <div className="gsap-hero-subhead w-full max-w-[760px] px-4 mx-auto mb-7 will-change-transform">
              <p
                className="text-base sm:text-lg md:text-[18.5px] font-normal leading-[1.55] text-neutral-600"
                style={{
                  fontFamily:
                    '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                Vistar builds practical software and automation that helps growing businesses manage enquiries, streamline operations, and make better decisions—with direct engineering involvement from discovery to deployment.
              </p>
            </div>

            {/* 03: Clear Conversion CTA Row */}
            <div className="gsap-hero-cta flex flex-wrap items-center justify-center gap-3 sm:gap-4 will-change-transform">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-[#FF3823] hover:bg-[#E02F1C] text-white font-medium text-sm sm:text-base rounded-none transition-all shadow-xs hover:shadow-sm active:scale-95 gap-2"
                style={{
                  fontFamily:
                    '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                Discuss a workflow
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/918860110144?text=Hi%20VISTAR%2C%20I%20would%20like%20to%20discuss%20an%20automation%20workflow."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium text-sm sm:text-base rounded-none transition-all active:scale-95 gap-2 shadow-xs"
                style={{
                  fontFamily:
                    '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                Chat on WhatsApp (+91 88601 10144)
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-[#141413] text-[#141413] bg-transparent hover:bg-neutral-100 font-medium text-sm sm:text-base rounded-none transition-all active:scale-95"
                style={{
                  fontFamily:
                    '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                Explore our engineering work &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. HIGH-CRAFT MOTION SHOWREEL VISUAL (ZERO-LAG GIF-STYLE SILENT HD LOOP) ── */}
      <section className="gsap-hero-media relative w-full px-4 lg:px-10 pb-16 md:pb-24 bg-white text-[#212121] will-change-transform">
        <div className="relative mx-auto w-full max-w-[1240px]">
          
          {/* Hardware-Accelerated 16:9 Showcase Frame */}
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl shadow-[0_24px_70px_-20px_rgba(0,0,0,0.18)] bg-[#0C0D12] border border-black/[0.08]">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/videos/hero-showreel-poster.webp"
              className="w-full h-full object-cover block"
              width={1280}
              height={720}
              aria-label="VISTAR Engineering Showreel — Stop losing time to manual work"
            >
              <source src="/videos/hero-showreel-loop.webm" type="video/webm" />
              <source src="/videos/hero-showreel-loop.mp4" type="video/mp4" />
              {/* Fallback image */}
              <img
                src="/videos/hero-showreel-poster.webp"
                alt="VISTAR — Stop losing time to manual work"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </video>

            {/* Subtle Inner Bevel Accent */}
            <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl ring-1 ring-inset ring-white/10" />

            {/* Status Pill Badge (Minimal, Non-Intrusive) */}
            <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10 flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] sm:text-[11px] font-mono text-neutral-300 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>VISTAR // MOTION SHOWREEL</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default CohereHero;
