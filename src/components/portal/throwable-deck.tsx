"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface CatalogueRelease {
  code: string;
  title: string;
  tag: string;
  year: string;
  metrics: string[];
  description: string;
  image: string;
  url: string;
}

const CATALOGUE_RELEASES: CatalogueRelease[] = [
  {
    code: "VTR-001",
    title: "PROJECT VAYU",
    tag: "AVIATION GIS & COCKPIT AI",
    year: "2026",
    metrics: ["<45ms NOTAM DECODE", "100% TYPE-SAFE"],
    description:
      "Autonomous GIS airspace hazard decoding runtime with automated NOTAM NLP threat classification and briefing generation.",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    url: "/work",
  },
  {
    code: "VTR-002",
    title: "AURA ANOMALY SYSTEM",
    tag: "TIME-SERIES ML TELEMETRY",
    year: "2026",
    metrics: ["99.8% PRECISION", "ZERO LOCK-IN"],
    description:
      "Decoupled multi-agent stream architecture using unsupervised Isolation Forests for biometric and critical telemetry alerts.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    url: "/work",
  },
  {
    code: "VTR-003",
    title: "3AXIS ARC ENGINE",
    tag: "ARCHITECTURAL WEB GRAPHICS",
    year: "2026",
    metrics: ["99/100 LIGHTHOUSE", "60 FPS SHADERS"],
    description:
      "Spatial real-estate computing platform featuring perspective camera shifts and structural typographic hierarchy.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    url: "/work",
  },
  {
    code: "VTR-004",
    title: "SOVEREIGN CORE 2.0",
    tag: "DISTRIBUTED RUNTIME ARCHITECTURE",
    year: "2026",
    metrics: ["14-DAY CADENCE", "100% OWNED"],
    description:
      "High-concurrency full-stack framework with deterministic type validation and zero third-party vendor dependencies.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    url: "/work",
  },
];

export function ReleasesSection() {
  const [topIndex, setTopIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isThrowing, setIsThrowing] = useState(false);
  const [throwDir, setThrowDir] = useState<number>(0);

  const deckRef = useRef<HTMLDivElement>(null);
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Advance stack to next card
  const throwCard = useCallback((direction: number) => {
    setIsThrowing(true);
    setThrowDir(direction);

    // Audio click feedback if Web Audio is available
    try {
      if (typeof window !== "undefined" && window.AudioContext) {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(640, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      }
    } catch {
      // Audio optional
    }

    setTimeout(() => {
      setTopIndex((prev) => (prev + 1) % CATALOGUE_RELEASES.length);
      setIsThrowing(false);
      setDragX(0);
      setDragY(0);
      setThrowDir(0);
    }, 280);
  }, []);

  // Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isThrowing) return;
    startPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isThrowing) return;
    const dx = e.clientX - startPos.current.x;
    const dy = (e.clientY - startPos.current.y) * 0.35; // dampened vertical
    setDragX(dx);
    setDragY(dy);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // pointer release fallback
    }

    const deckWidth = deckRef.current?.offsetWidth || 340;
    const threshold = deckWidth * 0.12; // 12% threshold

    if (Math.abs(dragX) > threshold) {
      throwCard(Math.sign(dragX));
    } else {
      // snap back
      setDragX(0);
      setDragY(0);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      throwCard(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      throwCard(-1);
    }
  };

  const currentRelease = CATALOGUE_RELEASES[topIndex];

  return (
    <section
      id="releases"
      className="relative min-h-screen w-full bg-transparent px-6 py-28 md:px-16 lg:px-24 border-t border-[rgba(56, 189, 248, 0.15)]"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Left Column: Headline, Lede, Buttons */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9794A]" />
              <p className="font-sora text-[11px] uppercase tracking-[0.16em] text-[#0B1320]/60">
                CATALOGUE // SYSTEM SLEEVES
              </p>
            </div>

            <h2 className="font-syne text-[clamp(2rem,4.2vw,3.8rem)] font-bold leading-[1.08] tracking-[-0.025em] text-[#0B1320]">
              Physical sleeve deck of shipped software releases.
            </h2>

            <p className="mt-6 font-sora text-[14px] leading-relaxed text-[#0B1320]/75 max-w-[48ch]">
              Each card encapsulates a production-verified architecture deployed into commercial flight, biometric surveillance, or high-throughput computing. Drag or flick to throw aside and un-sleeve the next system.
            </p>

            {/* Active Card Specs Strip */}
            <div className="mt-8 border-y border-[rgba(56, 189, 248, 0.15)] py-4 font-sora text-[11px] uppercase tracking-[0.12em] text-[#0B1320]/60 flex flex-wrap items-center gap-6">
              <div>
                <span className="text-[#0B1320]/50">INDEX:</span>{" "}
                <span className="font-mono font-bold text-[#C9794A]">{currentRelease.code}</span>
              </div>
              <div>
                <span className="text-[#0B1320]/50">YEAR:</span>{" "}
                <span className="text-[#0B1320]">{currentRelease.year}</span>
              </div>
              <div>
                <span className="text-[#0B1320]/50">TAG:</span>{" "}
                <span className="text-[#0284C7] font-semibold">{currentRelease.tag}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/work"
                className="group inline-flex items-center justify-center rounded-[4px] border border-[#0284C7] bg-[#0284C7] px-6 py-3 font-mono text-[11.5px] font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-[#C15F3C]"
              >
                INSPECT CASE STUDY
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <button
                type="button"
                onClick={() => throwCard(1)}
                className="inline-flex items-center justify-center rounded-[4px] border border-[#0B1320]/15 bg-white px-6 py-3 font-mono text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#0B1320] transition-colors hover:border-[#0284C7] hover:text-[#0284C7]"
              >
                NEXT SLEEVE (FLICK)
              </button>
            </div>
          </div>

          {/* Right Column: Square Throwable Card Deck */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div
              ref={deckRef}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              className="group relative h-[380px] w-[320px] sm:h-[440px] sm:w-[380px] md:h-[480px] md:w-[420px] cursor-grab active:cursor-grabbing select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
              style={{ touchAction: "pan-y" }}
              aria-label="Physical Catalogue Deck. Use arrow keys or drag to throw cards."
            >
              {/* Stacked Cards */}
              {CATALOGUE_RELEASES.map((release, index) => {
                const depth =
                  (index - topIndex + CATALOGUE_RELEASES.length) %
                  CATALOGUE_RELEASES.length;

                // Physics calculations for cards
                const isTop = depth === 0;
                const cardScale = isTop
                  ? isDragging
                    ? 1.02
                    : 1
                  : 1 - depth * 0.045;
                const cardOffsetX = isTop
                  ? isThrowing
                    ? throwDir * 420
                    : dragX
                  : depth * 10;
                const cardOffsetY = isTop
                  ? isThrowing
                    ? dragY - 30
                    : dragY
                  : -depth * 10;
                const cardRotation = isTop
                  ? isThrowing
                    ? throwDir * 24
                    : dragX * 0.08
                  : depth % 2 === 0
                  ? depth * 2.8
                  : -depth * 2.8;

                // Hidden if deeper than 3
                if (depth > 3) return null;

                return (
                  <div
                    key={release.code}
                    onPointerDown={isTop ? handlePointerDown : undefined}
                    onPointerMove={isTop ? handlePointerMove : undefined}
                    onPointerUp={isTop ? handlePointerUp : undefined}
                    className={`absolute inset-0 rounded-xl bg-white p-6 border border-[rgba(56, 189, 248, 0.22)] ${
                      isTop
                        ? "shadow-[0_20px_45px_-10px_rgba(56, 189, 248, 0.22)] z-30"
                        : "shadow-[0_10px_25px_-5px_rgba(56, 189, 248, 0.10)]"
                    }`}
                    style={{
                      transform: `translate3d(${cardOffsetX}px, ${cardOffsetY}px, 0) rotate(${cardRotation}deg) scale(${cardScale})`,
                      zIndex: 30 - depth,
                      opacity: Math.max(1 - depth * 0.2, 0.4),
                      transition:
                        isDragging && isTop
                          ? "none"
                          : "transform 0.28s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.28s ease",
                    }}
                  >
                    {/* Inner Card Sleeve Layout */}
                    <div className="flex h-full flex-col justify-between">
                      {/* Sleeve Header */}
                      <div className="flex items-center justify-between border-b border-[rgba(56, 189, 248, 0.15)] pb-3">
                        <span className="font-mono text-[11px] font-bold text-[#C9794A] tracking-wider">
                          {release.code}
                        </span>
                        <span className="font-sora text-[9.5px] uppercase tracking-[0.16em] text-[#0B1320]/60">
                          {release.tag}
                        </span>
                      </div>

                      {/* Sleeve Artwork Container */}
                      <div className="relative my-4 aspect-[16/10] w-full overflow-hidden rounded-lg border border-[rgba(56, 189, 248, 0.15)] bg-[#F0F7FD]/60">
                        <Image
                          src={release.image}
                          alt={release.title}
                          fill
                          sizes="400px"
                          className="object-cover filter contrast-[1.1] brightness-[0.95]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between font-mono text-[9px] text-white">
                          <span>{release.metrics[0]}</span>
                          <span className="text-[#FFFFFF] font-semibold">{release.metrics[1]}</span>
                        </div>
                      </div>

                      {/* Sleeve Title & Lede */}
                      <div>
                        <h3 className="font-syne text-xl font-bold tracking-tight text-[#0B1320]">
                          {release.title}
                        </h3>
                        <p className="mt-1 font-sora text-[11.5px] leading-relaxed text-[#0B1320]/75 line-clamp-2">
                          {release.description}
                        </p>
                      </div>

                      {/* Sleeve Footer Strip */}
                      <div className="mt-4 flex items-center justify-between border-t border-[rgba(56, 189, 248, 0.15)] pt-3 font-sora text-[9px] uppercase tracking-[0.15em] text-[#0B1320]/50">
                        <span>RELEASE // 2026</span>
                        <span className="text-[#0B1320] font-semibold flex items-center gap-1.5">
                          PULL TO THROW <span className="text-[#C9794A]">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hint Line & Progress Dots Beneath Deck */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                {CATALOGUE_RELEASES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTopIndex(idx)}
                    aria-label={`Go to sleeve ${idx + 1}`}
                    className={`h-1.5 transition-all ${
                      idx === topIndex
                        ? "w-8 rounded-full bg-[#0284C7]"
                        : "w-1.5 rounded-full bg-[rgba(26,25,22,0.18)] hover:bg-[rgba(26,25,22,0.35)]"
                    }`}
                  />
                ))}
              </div>

              <span className="font-sora text-[10px] uppercase tracking-[0.16em] text-[#0B1320]/50">
                DRAG OR USE ← / → KEYS TO THROW CARDS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
