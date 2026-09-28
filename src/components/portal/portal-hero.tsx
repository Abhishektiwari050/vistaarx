"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function PortalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.max(
        0,
        Math.min(1, currentScroll / scrollableDistance)
      );
      setProgress(rawProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Kinetic Transformations derived from progress [0, 1]
  const leftPanelX = -progress * 105; // % translates fully off-screen left
  const rightPanelX = progress * 105; // % translates fully off-screen right

  const titleScale = 1 + progress * 0.45; // 1.0 -> 1.45
  const trackingEm = -0.02 - progress * 0.04; // -.02em -> -.06em (tighter)
  const spanSeparationVw = progress * 24; // Travels outward to opposite edges

  const imageScale = 1.15 - progress * 0.15; // 1.15 -> 1.0 (settles in)
  const duotoneOpacity = 0.55 - progress * 0.35; // Fades out as image clarifies

  const dot1X = -progress * 42; // vw
  const dot1Y = -progress * 38; // vh
  const dot2X = progress * 42; // vw
  const dot2Y = progress * 38; // vh

  return (
    <section
      id="portal"
      ref={containerRef}
      className="relative h-[250vh] w-full bg-transparent"
    >
      {/* Sticky Stage: 100svh full-bleed viewport */}
      <div className="sticky top-0 h-svh w-full overflow-hidden isolate bg-transparent">
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
            className="object-cover object-center filter brightness-[0.85] contrast-[1.05]"
          />
        </div>

        {/* Layer 2: Duotone Wash Overlay (Amber & Forest Green blend) */}
        <div
          className="pointer-events-none absolute inset-0 z-10 will-change-opacity"
          style={{
            opacity: duotoneOpacity,
            background:
              "linear-gradient(135deg, rgba(255, 122, 0, 0.20) 0%, rgba(2, 132, 199, 0.25) 100%)",
            mixBlendMode: "overlay",
          }}
        />

        {/* Layer 3: Radial Edge Veil */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(249, 247, 242, 0.90) 100%)",
          }}
        />

        {/* Layer 4: Two Solid Parting Panels (Meet in middle, begin CLOSED) */}
        {/* Left Panel */}
        <div
          className="absolute top-0 bottom-0 left-0 z-30 w-[calc(50%+2px)] bg-transparent will-change-transform border-r border-[rgba(56, 189, 248, 0.15)]"
          style={{
            transform: `translate3d(${leftPanelX}%, 0, 0)`,
          }}
        />
        {/* Right Panel */}
        <div
          className="absolute top-0 bottom-0 right-0 z-30 w-[calc(50%+2px)] bg-transparent will-change-transform border-l border-[rgba(56, 189, 248, 0.15)]"
          style={{
            transform: `translate3d(${rightPanelX}%, 0, 0)`,
          }}
        />

        {/* Layer 5: Two Small Glowing Accent Dots at the Centre */}
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
          {/* Amber Dot (travels top-left) */}
          <div
            className="absolute h-2 w-2 rounded-full bg-[#C9794A] shadow-[0_0_12px_#C9794A] will-change-transform"
            style={{
              transform: `translate3d(${dot1X}vw, ${dot1Y}vh, 0)`,
              opacity: 1 - progress * 0.4,
            }}
          />
          {/* Signal Orange Dot (travels bottom-right) */}
          <div
            className="absolute h-2 w-2 rounded-full bg-[#0284C7] shadow-[0_0_12px_#0284C7] will-change-transform"
            style={{
              transform: `translate3d(${dot2X}vw, ${dot2Y}vh, 0)`,
              opacity: 1 - progress * 0.4,
            }}
          />
        </div>

        {/* Layer 6: Splitting Portal Title (Signature Move) */}
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-6">
          <div
            className="flex items-center justify-center font-syne font-extrabold text-[#0B1320] will-change-transform"
            style={{
              transform: `scale(${titleScale})`,
              letterSpacing: `${trackingEm}em`,
            }}
          >
            {/* First Span: VIS (translates left) */}
            <span
              className="inline-block tracking-tighter will-change-transform text-[clamp(4.5rem,14vw,14rem)] leading-none select-none drop-shadow-[0_10px_25px_rgba(26,25,22,0.18)]"
              style={{
                transform: `translate3d(-${spanSeparationVw}vw, 0, 0)`,
              }}
            >
              VIS
            </span>

            {/* Second Span: TAR (translates right) */}
            <span
              className="inline-block tracking-tighter will-change-transform text-[clamp(4.5rem,14vw,14rem)] leading-none select-none drop-shadow-[0_10px_25px_rgba(26,25,22,0.18)]"
              style={{
                transform: `translate3d(${spanSeparationVw}vw, 0, 0)`,
              }}
            >
              TAR
            </span>
          </div>
        </div>

        {/* Layer 7: Corner Metadata Pins */}
        <div className="pointer-events-none absolute inset-0 z-40 flex flex-col justify-between p-6 md:p-10 font-sora text-[10.5px] uppercase tracking-[0.15em] text-[#0B1320]/60">
          {/* Top Edge Metadata */}
          <div className="flex items-center justify-between pt-16">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9794A]" />
              <span className="font-semibold text-[#0B1320]">VISTAR // CATALOGUE EDITION</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[#0B1320]/50">
              <span>SPECIFICATION 2026.04</span>
              <span className="text-[#0284C7] font-semibold">[VERIFIED]</span>
            </div>
          </div>

          {/* Center Hint (Fades on scroll) */}
          <div
            className="flex flex-col items-center justify-center text-center transition-opacity duration-300"
            style={{ opacity: Math.max(1 - progress * 2.5, 0) }}
          >
            <span className="text-[#0B1320] text-xs tracking-[0.2em] font-semibold">
              PORTAL ENGAGED
            </span>
            <span className="mt-1 text-[9px] text-[#0B1320]/50 tracking-[0.25em]">
              SCROLL TO PART THE VEIL ↓
            </span>
          </div>

          {/* Bottom Edge Metadata */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <span className="text-[#0B1320]/50">GROUND:</span>
              <span className="font-mono text-[#0B1320] font-semibold">#FAF9F5</span>
              <span className="text-[#0B1320]/50">| INK:</span>
              <span className="font-mono text-[#0B1320] font-semibold">#141413</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0284C7]" />
              <span className="text-[#0B1320] font-semibold">
                STATUS: {progress >= 0.95 ? "DISCLOSED" : "LOCKED"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PortalHero;
