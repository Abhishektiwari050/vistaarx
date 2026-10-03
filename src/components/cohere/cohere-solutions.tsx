"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";

interface ProductionCard {
  id: number;
  slug: string;
  pill: string;
  pillPosition: string;
  tag: string;
  category: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  alt: string;
  bgGradient: string;
  accentColor: string;
  metrics: Array<{ label: string; value: string }>;
  liveUrl?: string;
  displayUrl?: string;
  caseStudyUrl: string;
}

const PRODUCTION_CARDS: ProductionCard[] = [
  {
    id: 1,
    slug: "3axisarc",
    pill: "Spatial 3D Engine",
    pillPosition: "top-8 right-[26%]",
    tag: "SYSTEM 01 // ARCHITECTURE & REAL ESTATE",
    category: "Spatial WebGL & Architectural Systems",
    title: "3axis Arc: High-Performance Spatial 3D Platform",
    shortDesc: "Interactive 3D architectural platform for Lucknow developers and architects, rendering 60fps WebGL in-browser.",
    fullDesc:
      "Engineered for high-end architectural and interior firms, rendering 60fps WebGL spatial models and blueprint walkthroughs directly in modern mobile and desktop browsers with 100% Lighthouse performance.",
    image: "/projects/3axisarc.png",
    alt: "3axis Arc Spatial Platform",
    bgGradient: "linear-gradient(135deg, #181510 0%, #262117 50%, #100E0A 100%)",
    accentColor: "#F59E0B",
    metrics: [
      { label: "WebGL Rendering", value: "60 FPS" },
      { label: "Edge TTFB", value: "<100ms" },
      { label: "Code Sovereignty", value: "100% Handover" },
    ],
    liveUrl: "https://3axisarc.vercel.app",
    displayUrl: "3axisarc.vercel.app",
    caseStudyUrl: "/work",
  },
  {
    id: 2,
    slug: "autolead",
    pill: "Sales Automation",
    pillPosition: "top-8 right-[22%]",
    tag: "SYSTEM 02 // SALES & LEAD INGESTION",
    category: "Indian SME Sales & Lead Capture",
    title: "VISTAR AutoLead: IndiaMART & WhatsApp Pipeline",
    shortDesc: "Automated lead intake engine ingesting inquiries from IndiaMART, JustDial, and web forms into instant WhatsApp alerts.",
    fullDesc:
      "A deterministic lead routing and qualification engine for Indian SME business owners. Captures leads across multiple marketplaces, sends automated founder alerts on WhatsApp in under 10s, and syncs data to Google Sheets and PostgreSQL.",
    image: "/projects/competence-crm.png",
    alt: "VISTAR AutoLead Platform",
    bgGradient: "linear-gradient(135deg, #0A0F1D 0%, #141C33 50%, #0A0F1D 100%)",
    accentColor: "#22C55E",
    metrics: [
      { label: "WhatsApp Alert", value: "<10s" },
      { label: "Intake Source", value: "IndiaMART + JustDial" },
      { label: "Lead Capture", value: "24/7 Automated" },
    ],
    liveUrl: "https://vistar.tech/contact",
    displayUrl: "autolead.vistar.tech",
    caseStudyUrl: "/work",
  },
  {
    id: 3,
    slug: "vayu",
    pill: "Aviation GIS",
    pillPosition: "top-8 right-[16%]",
    tag: "SYSTEM 03 // AVIATION & GEOSPATIAL",
    category: "Aviation GIS & Situational Telemetry",
    title: "Project VAYU: Pre-Flight NOTAM & Weather Briefing",
    shortDesc: "Open-source situational awareness tool with vector GIS hazard layers and automated NOTAM flight briefing parsing.",
    fullDesc:
      "Vistar engineered Project VAYU as a free open-source tool for pilots and flight dispatchers, parsing FAA NOTAM alerts along planned routes onto interactive vector tile maps with offline capability.",
    image: "/projects/vayuways.png",
    alt: "Project VAYU Interface",
    bgGradient: "linear-gradient(135deg, #091326 0%, #0F2042 50%, #081124 100%)",
    accentColor: "#38BDF8",
    metrics: [
      { label: "GIS Layers", value: "Vector Maps" },
      { label: "NOTAM Parser", value: "Automated" },
      { label: "Codebase", value: "Open Source" },
    ],
    liveUrl: "https://ai-vayu.vercel.app",
    displayUrl: "ai-vayu.vercel.app",
    caseStudyUrl: "/work",
  },
  {
    id: 4,
    slug: "aura",
    pill: "ML Research",
    pillPosition: "top-8 right-[24%]",
    tag: "SYSTEM 04 // MACHINE LEARNING RESEARCH",
    category: "Autonomous Multi-Agent Telemetry",
    title: "AURA: Multi-Agent Biometric Anomaly Detection",
    shortDesc: "Open-source research prototype testing unsupervised Isolation Forest ML algorithms over synthetic telemetry streams.",
    fullDesc:
      "An experimental machine learning harness testing unsupervised multi-agent anomaly detection over simulated continuous telemetry streams, protected by strict Pydantic JSON schema gates.",
    image: "/projects/aura-results.png",
    alt: "AURA Anomaly Detection Platform",
    bgGradient: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
    accentColor: "#818CF8",
    metrics: [
      { label: "Algorithm", value: "Isolation Forest" },
      { label: "Validation", value: "Pydantic Schemas" },
      { label: "Availability", value: "Open Source" },
    ],
    liveUrl: "https://multi-agent-anomaly-system.onrender.com",
    displayUrl: "aura-anomaly.onrender.com",
    caseStudyUrl: "/work",
  },
];

export function CohereSolutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const wrpRef = useRef<HTMLDivElement>(null);

  const [activeModalCard, setActiveModalCard] = useState<ProductionCard | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  // Apple-grade 3D perspective constants (zero clipping/crossing)
  const BASE_RX = 7;
  const BASE_RY = -13;
  const RANGE_RX = 10;
  const RANGE_RY = 14;

  const currentValues = useRef({
    rx: BASE_RX,
    ry: BASE_RY,
    scale: 1,
  });

  const targetValues = useRef({
    rx: BASE_RX,
    ry: BASE_RY,
    scale: 1,
  });

  const rafId = useRef<number | null>(null);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const applyTransforms = useCallback(() => {
    if (listRef.current) {
      const { rx, ry, scale } = currentValues.current;
      listRef.current.style.transform = `scale3d(${scale}, ${scale}, 1) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(0deg)`;
    }
  }, []);

  const tick = useCallback(() => {
    const cur = currentValues.current;
    const tgt = targetValues.current;

    cur.rx = lerp(cur.rx, tgt.rx, 0.1);
    cur.ry = lerp(cur.ry, tgt.ry, 0.1);
    cur.scale = lerp(cur.scale, tgt.scale, 0.12);

    applyTransforms();

    const isDone =
      Math.abs(cur.rx - tgt.rx) < 0.01 &&
      Math.abs(cur.ry - tgt.ry) < 0.01 &&
      Math.abs(cur.scale - tgt.scale) < 0.001;

    if (!isDone) {
      rafId.current = requestAnimationFrame(tick);
    } else {
      cur.rx = tgt.rx;
      cur.ry = tgt.ry;
      cur.scale = tgt.scale;
      applyTransforms();
      rafId.current = null;
    }
  }, [applyTransforms]);

  const startTick = useCallback(() => {
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => {
    const isDesktop =
      typeof window !== "undefined" &&
      window.innerWidth >= 1024 &&
      !window.matchMedia("(pointer: coarse)").matches;
    if (!isDesktop) return;

    const section = sectionRef.current;
    if (!section) return;

    let cachedRect: DOMRect | null = null;
    const updateRect = () => {
      cachedRect = section.getBoundingClientRect();
    };

    const handleMouseEnter = () => {
      updateRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!cachedRect) updateRect();
      const rect = cachedRect!;
      const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
      const ny = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));

      targetValues.current.rx = BASE_RX - ny * (RANGE_RX / 2);
      targetValues.current.ry = BASE_RY + nx * (RANGE_RY / 2);
      startTick();
    };

    const handleMouseLeave = () => {
      targetValues.current.rx = BASE_RX;
      targetValues.current.ry = BASE_RY;
      targetValues.current.scale = 1.0;
      startTick();
    };

    section.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    section.addEventListener("mousemove", handleMouseMove, { passive: true });
    section.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("resize", updateRect, { passive: true });

    return () => {
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", updateRect);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [startTick]);

  const handleCardMouseEnter = (cardId: number) => {
    setHoveredCardId(cardId);
    targetValues.current.scale = 1.02;
    startTick();
  };

  const handleCardMouseLeave = () => {
    setHoveredCardId(null);
    targetValues.current.scale = 1.0;
    startTick();
  };

  const handleCardClick = (card: ProductionCard) => {
    setActiveModalCard(card);
  };

  const closeModal = () => {
    setActiveModalCard(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModalCard) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalCard]);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative w-full bg-white text-[#050A14] overflow-hidden select-none py-10 sm:py-14 lg:py-16"
      aria-label="Built for what's next. Ready now."
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* ── UNIFIED 2-COLUMN SECTION: ZERO AWKWARD VERTICAL VACANT GAP ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* 1. Header Column (Left): Crisp Editorial Framing */}
          <div className="lg:col-span-5 space-y-4 z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F1F5F9] rounded-full text-xs font-semibold text-[#0F172A] uppercase tracking-wider">
              <span>Verified Systems</span>
            </div>

            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#050A14] tracking-[-0.03em] leading-[1.05] font-sans"
              style={{
                fontFamily:
                  'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              Built for what&apos;s next.
              <br />
              Ready now.
            </h2>

            <p
              className="text-base sm:text-[17px] text-[#334155] leading-[1.6] max-w-[460px] font-normal font-sans"
              style={{
                fontFamily:
                  'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              From mission-critical cockpit GIS and real-time biometric anomaly detection to high-throughput spatial 3D platforms, Vistar engineers production software with 100% private codebase ownership.
            </p>

            <div className="pt-2">
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#050A14] hover:bg-[#1E293B] text-white text-sm font-semibold rounded-none transition-colors shadow-xs gap-2"
              >
                Inspect All Systems &rarr;
              </Link>
            </div>
          </div>

          {/* 2. Desktop 3D Perspective Card Deck (Right Column): Apple-Style Window Stack */}
          <div className="hidden md:flex lg:col-span-7 relative w-full items-center justify-center min-h-[400px] lg:min-h-[460px] overflow-visible">
            
            {/* 3D Perspective Scene Container */}
            <div
              className="w-full flex items-center justify-center lg:justify-end overflow-visible py-8"
              style={{ perspective: "1800px" }}
            >
              {/* Apple-Style Staggered Window Deck: Zero Crossing, Zero Clipping */}
              <div
                ref={listRef}
                className="relative w-[340px] sm:w-[420px] lg:w-[480px] xl:w-[520px] aspect-[16/10.5] transition-transform duration-100 ease-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `scale3d(1, 1, 1) rotateX(${BASE_RX}deg) rotateY(${BASE_RY}deg) rotateZ(0deg)`,
                }}
              >
                {PRODUCTION_CARDS.map((card, idx) => {
                  const isHovered = hoveredCardId === card.id;
                  const isAnyHovered = hoveredCardId !== null;

                  // Clean Apple-style diagonal stagger: each card is offset in X, Y, Z
                  // idx 0 is front-left, idx 3 is back-right
                  const stepX = 42;
                  const stepY = -28;
                  const stepZ = -50;

                  const restingX = idx * stepX;
                  const restingY = idx * stepY;
                  const restingZ = idx * stepZ;

                  // Hover glides the card forward on Z-axis with subtle lift and zero intersection
                  const transform = isHovered
                    ? `translate3d(${restingX}px, ${restingY - 14}px, ${restingZ + 60}px) scale3d(1.04, 1.04, 1)`
                    : `translate3d(${restingX}px, ${restingY}px, ${restingZ}px) scale3d(1, 1, 1)`;

                  return (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      onMouseEnter={() => handleCardMouseEnter(card.id)}
                      onMouseLeave={handleCardMouseLeave}
                      data-card-id={card.id}
                      className="absolute inset-0 cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none"
                      style={{
                        zIndex: isHovered ? 100 : 40 - idx,
                        transformStyle: "preserve-3d",
                        transform,
                      }}
                    >
                      {/* Apple-Style macOS Safari Window Container */}
                      <div
                        className={`relative w-full h-full rounded-[18px] overflow-hidden border border-black/15 bg-[#080d19] transition-all duration-300 ${
                          isHovered
                            ? "shadow-[0_32px_70px_rgba(0,0,0,0.38),0_0_0_1px_rgba(255,255,255,0.2)]"
                            : "shadow-[0_20px_45px_rgba(0,0,0,0.24),0_0_0_1px_rgba(255,255,255,0.08)]"
                        }`}
                      >
                        {/* ── Sleek Apple macOS Safari Titlebar ── */}
                        <div className="relative h-8 px-4 flex items-center justify-between border-b border-white/10 bg-[#12131A]/95 backdrop-blur-md z-10 shrink-0">
                          {/* Traffic Light Dots */}
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/10" />
                          </div>

                          {/* Centered URL Capsule */}
                          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/10 text-[10.5px] font-mono text-white/90 max-w-[200px] truncate shadow-inner">
                            <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{card.displayUrl}</span>
                          </div>

                          {/* Live Status Pill */}
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                              {card.id === 3 ? "OPEN SOURCE" : card.id === 4 ? "PROTOTYPE" : "LIVE"}
                            </span>
                          </div>
                        </div>

                        {/* Page Preview Image */}
                        <div className="relative w-full h-[calc(100%-32px)] overflow-hidden bg-slate-950">
                          <Image
                            src={card.image}
                            alt={card.alt}
                            fill
                            className="object-cover object-top filter brightness-[1.0] contrast-[1.0] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                            sizes="(max-width: 768px) 100vw, 600px"
                            priority={idx < 2}
                          />

                          {/* Dynamic Specular Sheen on Non-hovered cards */}
                          <div
                            className={`absolute inset-0 bg-black/25 transition-opacity duration-200 pointer-events-none ${
                              isAnyHovered && !isHovered ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* ── MOBILE-OPTIMIZED PRODUCTION CARD STACK ── */}
        <div className="flex md:hidden flex-col gap-6 w-full mt-8">
          {PRODUCTION_CARDS.map((card) => (
            <div
              key={`mobile-${card.id}`}
              onClick={() => handleCardClick(card)}
              className="w-full bg-[#080d19] rounded-[16px] overflow-hidden border border-black/10 shadow-md cursor-pointer transition-transform active:scale-[0.99]"
            >
              {/* Browser Window Bar */}
              <div className="h-7 px-3.5 flex items-center justify-between border-b border-white/10 bg-black/75">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                  <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-white/80">
                  <Lock className="w-2.5 h-2.5 text-emerald-400" />
                  <span className="truncate max-w-[150px]">{card.displayUrl || "vistar.systems"}</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-mono uppercase text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </div>
              </div>

              {/* Pure Screenshot Surface without dark overlays */}
              <div className="relative w-full aspect-[16/10] bg-slate-950 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>

              {/* Clean Bottom Bar with Title & Action */}
              <div className="p-3.5 bg-white border-t border-black/10 flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-bold text-sm text-[#050A14] truncate">
                    {card.title}
                  </h3>
                  <span className="text-[11px] text-[#64748B] font-mono">
                    {card.pill}
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#FF3823] flex items-center gap-1 shrink-0">
                  Inspect &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── 3. FULL-BLEED LUXURY CARD INSPECTION MODAL ── */}
      {activeModalCard && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8 md:p-12 animate-in fade-in duration-200"
        >
          {/* Frosted Backdrop */}
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-5xl bg-white border border-[#E2E8F0] rounded-[24px] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]">
            
            {/* Modal Left (58%): Large Screenshot Preview */}
            <div className="relative w-full lg:w-[58%] min-h-[260px] sm:min-h-[380px] lg:min-h-full bg-[#F0F6FB]">
              <Image
                src={activeModalCard.image}
                alt={activeModalCard.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-top"
                priority
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/95 backdrop-blur-md rounded-md text-xs font-mono font-bold text-[#0B1320] border border-[#E2E8F0] shadow-sm">
                {activeModalCard.tag}
              </div>
            </div>

            {/* Modal Right (42%): Case Study Specs & Direct Action */}
            <div className="w-full lg:w-[42%] p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                  <span className="font-mono text-xs font-bold text-[#050A14] uppercase tracking-wider">
                    {activeModalCard.category}
                  </span>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex items-center gap-1.5 px-3 py-1 text-[#64748B] hover:text-[#0B1320] hover:bg-[#F1F5F9] rounded-full transition-colors cursor-pointer text-xs font-mono border border-[#E2E8F0]"
                    aria-label="Close modal"
                  >
                    <span className="text-[11px] font-sans font-medium">ESC</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                <h3
                  className="text-2xl font-bold text-[#050A14] tracking-tight font-sans"
                  style={{
                    fontFamily:
                      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  {activeModalCard.title}
                </h3>

                <p
                  className="text-sm text-[#475569] leading-relaxed font-sans"
                  style={{
                    fontFamily:
                      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  {activeModalCard.fullDesc}
                </p>

                {/* Metrics Breakdown Grid */}
                <div className="grid grid-cols-3 gap-2.5 py-2">
                  {activeModalCard.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl text-center"
                    >
                      <div
                        className="text-lg font-bold text-[#050A14] font-sans"
                      >
                        {m.value}
                      </div>
                      <div className="text-[10px] text-[#64748B] uppercase font-mono mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="space-y-3 pt-4 border-t border-[#E2E8F0]">
                <Link
                  href="/start"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#050A14] hover:bg-[#1E293B] text-white text-[14px] font-medium rounded-full shadow-md transition-all font-sans"
                >
                  <span>Commission System Like This</span>
                  <span>→</span>
                </Link>

                <div className="flex items-center gap-3 font-sans">
                  {activeModalCard.liveUrl && (
                    <a
                      href={activeModalCard.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#F1F5F9] text-[#0B1320] text-xs font-semibold rounded-full hover:bg-[#E2E8F0] transition-colors"
                    >
                      <span>Live Demo</span>
                      <span>↗</span>
                    </a>
                  )}
                  <Link
                    href={activeModalCard.caseStudyUrl}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-white border border-[#CBD5E1] text-[#0B1320] text-xs font-semibold rounded-full hover:bg-[#F1F5F9] transition-colors"
                  >
                    <span>Read Case Study</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CohereSolutions;
