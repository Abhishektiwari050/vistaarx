"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";


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
                href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I%20would%20like%20to%20discuss%20an%20automation%20workflow%20for%20our%20business."
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

      {/* ── 2. ORIGINAL COHERE HERO FEATURED GRAPHIC (HARDWARE-ACCELERATED GSAP ENTRANCE) ── */}
      <section className="gsap-hero-media relative w-full px-4 lg:px-10 pb-12 md:pb-16 bg-white text-[#212121] will-change-transform">
        <div className="relative mx-auto w-full max-w-[1360px]">
          
          {/* Desktop & Tablet Video Loop (Aspect Ratio 2720/1120 = 2.428) */}
          <div className="hidden md:block w-full overflow-hidden rounded-[12px] shadow-sm bg-[#0C0D12] border border-black/[0.06]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster="/og-image.jpg"
              className="w-full h-auto object-cover rounded-[12px] block"
              width={1920}
              height={791}
            >
              <source src="/videos/hero-agent-loop.mp4" type="video/mp4" />
              <source src="/videos/hero-agent-loop.webm" type="video/webm" />
              {/* Fallback GIF */}
              <img
                src="/videos/hero-agent-loop.gif"
                alt="VISTAR Custom Software Platform Interface"
                className="w-full h-auto object-cover rounded-[12px]"
              />
            </video>
          </div>

          {/* Mobile Video / GIF Loop (Square 1472x1472 Aspect Ratio) */}
          <div className="block md:hidden w-full overflow-hidden rounded-[20px] shadow-sm bg-[#0C0D12] border border-black/[0.06]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster="/og-image.jpg"
              className="w-full h-auto object-cover rounded-[20px] block"
              width={1472}
              height={1472}
            >
              <source src="/videos/hero-agent-loop.mp4" type="video/mp4" />
              <source src="/videos/hero-agent-loop.webm" type="video/webm" />
              {/* Fallback GIF */}
              <img
                src="/videos/hero-agent-loop.gif"
                alt="VISTAR Custom Software Mobile Interface"
                className="w-full h-auto object-cover rounded-[20px]"
              />
            </video>
          </div>

        </div>
      </section>
    </div>
  );
}

export default CohereHero;
