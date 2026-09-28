"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function StatementFold() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const offset = windowHeight - rect.top;
        setRotation(offset * 0.08);
        setTranslateY(offset * 0.12 - 40);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="statement"
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-transparent px-6 py-24 md:px-16 lg:px-24 border-t border-[rgba(56, 189, 248, 0.15)]"
    >
      {/* Background Outlined Index Numeral: -webkit-text-stroke */}
      <div className="pointer-events-none absolute right-6 md:right-16 top-12 z-0 select-none">
        <span className="stroke-text font-syne text-[clamp(7rem,18vw,16rem)] font-extrabold leading-none opacity-40">
          01
        </span>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        {/* Uppercase Metadata Label */}
        <div className="mb-8 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C9794A]" />
          <p className="font-sora text-[11px] uppercase tracking-[0.16em] text-[#0B1320]/60">
            CORE ARCHITECTURAL THESIS // 01
          </p>
        </div>

        {/* The Clamped Statement */}
        <div>
          <h2 className="max-w-[24ch] font-syne text-[clamp(24px,3.6vw,52px)] font-bold leading-[1.14] tracking-[-0.025em] text-[#0B1320]">
            We engineer autonomous software architectures where{" "}
            <span className="text-[#C9794A] underline decoration-[#C9794A]/40 underline-offset-8">
              intelligence is sovereign
            </span>
            , deterministic, and owned.
          </h2>
        </div>

        {/* Fine Print Sub-statement */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 border-t border-[rgba(56, 189, 248, 0.15)] pt-8">
          <div>
            <p className="font-sora text-[13px] leading-relaxed text-[#0B1320]/75 max-w-[44ch]">
              Every system we construct is transferred directly to the client's repository with 100% intellectual property ownership. Zero vendor captivity, zero black boxes, and continuous sub-45ms execution.
            </p>
          </div>
          <div className="flex flex-col justify-between font-sora text-[11px] uppercase tracking-[0.14em] text-[#0B1320]/60">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0284C7]" />
              <span>DISPATCH REGIME: BERLIN // TOKYO // SAN FRANCISCO</span>
            </div>
            <div className="mt-4 flex items-center gap-4 text-[#0B1320]/70">
              <span>CODEBASE FREEDOM: 100%</span>
              <span className="text-[rgba(26,25,22,0.2)]">/</span>
              <span>RESTRICTIONS: NONE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Circular Image Floating Off Right Edge */}
      <div
        className="pointer-events-none absolute -right-24 md:-right-20 bottom-10 md:bottom-20 z-0 h-[300px] w-[300px] md:h-[420px] md:w-[420px] rounded-full overflow-hidden border border-[rgba(56, 189, 248, 0.22)] opacity-40 will-change-transform"
        style={{
          transform: `translate3d(0, ${translateY}px, 0) rotate(${rotation}deg)`,
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80"
          alt="Orbital Planetary Geometry"
          fill
          sizes="420px"
          className="object-cover filter contrast-[1.1] brightness-[0.95]"
        />
        <div className="absolute inset-0 bg-radial from-transparent via-[#FFFFFF]/30 to-[#FFFFFF]" />
      </div>
    </section>
  );
}

export default StatementFold;
