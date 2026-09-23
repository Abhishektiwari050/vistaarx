"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function PortalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScroll;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      animationFrameId = requestAnimationFrame(() => {
        setProgress(clampedProgress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Transformation values derived directly from scroll position (reversible)
  const leftPanelX = -(progress * 105); // percent
  const rightPanelX = progress * 105; // percent
  const imageScale = 1.18 - progress * 0.18; // 1.18 -> 1.00
  const duotoneOpacity = progress * 0.4;
  const titleScale = 1 + progress * 0.35; // 1.0 -> 1.35
  const trackingEm = 0.04 - progress * 0.09; // 0.04em -> -0.05em (tightens)
  const spanSeparationVw = progress * 24; // translates outward by ~24vw

  // Accent dots travelling to opposite corners
  const dot1X = -(progress * 42); // vw
  const dot1Y = -(progress * 38); // vh
  const dot2X = progress * 42; // vw
  const dot2Y = progress * 38; // vh

  return (
    <section
      id="portal"
      ref={containerRef}
      className="relative h-[250vh] w-full bg-[#0A0C0E]"
    >
      {/* Sticky Stage: 100svh full-bleed viewport (svh = smallest viewport, never clips on mobile) */}
      <div className="sticky top-0 h-svh w-full overflow-hidden isolate bg-[#0A0C0E]">
        {/* Layer 1: Full-bleed Background Image */}
        <div
          className="absolute inset-0 z-0 h-full w-full will-change-transform"
          style={{
            transform: `scale(${imageScale})`,
            transition: "transform 0.05s linear",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=85"
            alt="Sovereign Neural Hardware Architecture"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.7] contrast-[1.15]"
          />
        </div>

        {/* Layer 2: Duotone Wash Overlay (Amber & Teal blend) */}
        <div
          className="pointer-events-none absolute inset-0 z-10 will-change-opacity"
          style={{
            opacity: duotoneOpacity,
            background:
              "linear-gradient(135deg, rgba(232, 145, 60, 0.45) 0%, rgba(46, 107, 114, 0.55) 100%)",
            mixBlendMode: "overlay",
          }}
        />

        {/* Layer 3: Radial Edge Veil */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(10, 12, 14, 0.88) 100%)",
          }}
        />

        {/* Layer 4: Two Solid Parting Panels (Meet in middle, begin CLOSED) */}
        {/* Left Panel */}
        <div
          className="absolute top-0 bottom-0 left-0 z-30 w-[calc(50%+2px)] bg-[#0A0C0E] will-change-transform border-r border-[rgba(237,231,220,0.08)]"
          style={{
            transform: `translate3d(${leftPanelX}%, 0, 0)`,
          }}
        />
        {/* Right Panel */}
        <div
          className="absolute top-0 bottom-0 right-0 z-30 w-[calc(50%+2px)] bg-[#0A0C0E] will-change-transform border-l border-[rgba(237,231,220,0.08)]"
          style={{
            transform: `translate3d(${rightPanelX}%, 0, 0)`,
          }}
        />

        {/* Layer 5: Two Small Glowing Accent Dots at the Centre */}
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
          {/* Amber Dot (travels top-left) */}
          <div
            className="absolute h-2 w-2 rounded-full bg-[#E8913C] shadow-[0_0_12px_#E8913C] will-change-transform"
            style={{
              transform: `translate3d(${dot1X}vw, ${dot1Y}vh, 0)`,
              opacity: 1 - progress * 0.4,
            }}
          />
          {/* Teal Dot (travels bottom-right) */}
          <div
            className="absolute h-2 w-2 rounded-full bg-[#2E6B72] shadow-[0_0_12px_#2E6B72] will-change-transform"
            style={{
              transform: `translate3d(${dot2X}vw, ${dot2Y}vh, 0)`,
              opacity: 1 - progress * 0.4,
            }}
          />
        </div>

        {/* Layer 6: Splitting Portal Title (Signature Move) */}
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-6">
          <div
            className="flex items-center justify-center font-syne font-extrabold text-[#EDE7DC] will-change-transform"
            style={{
              transform: `scale(${titleScale})`,
              letterSpacing: `${trackingEm}em`,
            }}
          >
            {/* First Span: VIS (translates left) */}
            <span
              className="inline-block tracking-tighter will-change-transform text-[clamp(4.5rem,14vw,14rem)] leading-none select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
              style={{
                transform: `translate3d(-${spanSeparationVw}vw, 0, 0)`,
              }}
            >
              VIS
            </span>

            {/* Second Span: TAR (translates right) */}
            <span
              className="inline-block tracking-tighter will-change-transform text-[clamp(4.5rem,14vw,14rem)] leading-none select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
              style={{
                transform: `translate3d(${spanSeparationVw}vw, 0, 0)`,
              }}
            >
              TAR
            </span>
          </div>
        </div>

        {/* Layer 7: Corner Metadata Pins */}
        <div className="pointer-events-none absolute inset-0 z-40 flex flex-col justify-between p-6 md:p-10 font-sora text-[10.5px] uppercase tracking-[0.15em] text-[#9EA5A8]">
          {/* Top Edge Metadata */}
          <div className="flex items-center justify-between pt-16">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8913C]" />
              <span>VISTAR // CATALOGUE EDITION</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[#6C7378]">
              <span>SPECIFICATION 2026.04</span>
              <span className="text-[#2E6B72] font-semibold">[VERIFIED]</span>
            </div>
          </div>

          {/* Center Hint (Fades on scroll) */}
          <div
            className="flex flex-col items-center justify-center text-center transition-opacity duration-300"
            style={{ opacity: Math.max(1 - progress * 2.5, 0) }}
          >
            <span className="text-[#EDE7DC] text-xs tracking-[0.2em] font-medium">
              PORTAL ENGAGED
            </span>
            <span className="mt-1 text-[9px] text-[#6C7378] tracking-[0.25em]">
              SCROLL TO PART THE VEIL ↓
            </span>
          </div>

          {/* Bottom Edge Metadata */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <span className="text-[#6C7378]">GROUND:</span>
              <span className="font-mono text-[#EDE7DC]">#0A0C0E</span>
              <span className="text-[#6C7378]">| INK:</span>
              <span className="font-mono text-[#EDE7DC]">#EDE7DC</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2E6B72]" />
              <span className="text-[#EDE7DC]">
                STATUS: {progress >= 0.95 ? "DISCLOSED" : "LOCKED"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
