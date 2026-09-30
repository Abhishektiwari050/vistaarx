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
    slug: "vayu",
    pill: "Aviation Telemetry",
    pillPosition: "top-8 right-[16%]",
    tag: "SYSTEM 01 // AVIATION & DEFENSE",
    category: "Aviation GIS & Situational Telemetry",
    title: "Project VAYU: Cockpit Telemetry & NOTAM AI",
    shortDesc: "Real-time situational awareness cockpit dashboard with GIS vector hazard layers and automated threat parsing.",
    fullDesc:
      "Vistar engineered Project VAYU for critical aviation operations, combining low-latency GIS spatial layers with deterministic threat extraction and offline-resilient telemetry streams.",
    image: "/projects/vayuways.png",
    alt: "Project VAYU Telemetry Interface",
    bgGradient: "linear-gradient(135deg, #091326 0%, #0F2042 50%, #081124 100%)",
    accentColor: "#38BDF8",
    metrics: [
      { label: "Situational Latency", value: "<45ms" },
      { label: "Vector Layers", value: "Real-Time GIS" },
      { label: "Security", value: "TLS 1.3 / AES-256" },
    ],
    liveUrl: "https://ai-vayu.vercel.app",
    displayUrl: "ai-vayu.vercel.app",
    caseStudyUrl: "/work",
  },
  {
    id: 2,
    slug: "aura",
    pill: "Agentic Biometrics",
    pillPosition: "top-8 right-[24%]",
    tag: "SYSTEM 02 // MULTI-AGENT DETECTION",
    category: "Autonomous Multi-Agent Telemetry",
    title: "AURA: Multi-Agent Biometric Anomaly Detection",
    shortDesc: "Distributed multi-agent telemetry stream architecture with unsupervised Isolation Forest ML models.",
    fullDesc:
      "A distributed agentic harness that executes multi-step telemetry ingestion, dynamic anomaly thresholding, and programmatic alert routing with 99.8% precision at real-time speeds.",
    image: "/projects/aura-results.png",
    alt: "AURA Anomaly Detection Platform",
    bgGradient: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
    accentColor: "#818CF8",
    metrics: [
      { label: "Agentic Precision", value: "99.8%" },
      { label: "ML Architecture", value: "Isolation Forest" },
      { label: "Event Pipeline", value: "Zero-Latency" },
    ],
    liveUrl: "https://multi-agent-anomaly-system.onrender.com",
    displayUrl: "aura-anomaly.onrender.com",
    caseStudyUrl: "/work",
  },
  {
    id: 3,
    slug: "3axisarc",
    pill: "Spatial 3D Engine",
    pillPosition: "top-8 right-[26%]",
    tag: "SYSTEM 03 // SPATIAL ARCHITECTURE",
    category: "Spatial WebGL & Architectural Systems",
    title: "3axis Arc: High-Performance Spatial Platform",
    shortDesc: "Bespoke spatial engineering platform featuring dynamic perspective transformations and sub-85ms global TTFB.",
    fullDesc:
      "Engineered for high-end architectural and engineering firms, rendering 60fps WebGL spatial models and high-density blueprint telemetry directly in modern web browsers.",
    image: "/projects/3axisarc.png",
    alt: "3axis Arc Spatial Platform",
    bgGradient: "linear-gradient(135deg, #181510 0%, #262117 50%, #100E0A 100%)",
    accentColor: "#F59E0B",
    metrics: [
      { label: "WebGL Rendering", value: "60 FPS" },
      { label: "Edge TTFB", value: "<85ms" },
      { label: "Code Sovereignty", value: "100% Transfer" },
    ],
    liveUrl: "https://3axisarc.vercel.app",
    displayUrl: "3axisarc.vercel.app",
    caseStudyUrl: "/work",
  },
  {
    id: 4,
    slug: "competence",
    pill: "Enterprise CRM",
    pillPosition: "top-8 right-[22%]",
    tag: "SYSTEM 04 // ENTERPRISE OPERATIONS",
    category: "Enterprise Intelligence & Data Systems",
    title: "Competence: Sovereign CRM & Operations Platform",
    shortDesc: "Full-stack operational intelligence platform with typed PostgreSQL audit schemas and sub-50ms query times.",
    fullDesc:
      "A deterministic enterprise operations platform built with Next.js 16 and PostgreSQL, delivered with 100% private codebase handover, zero third-party lock-in, and automated role compliance.",
    image: "/projects/competence-crm.png",
    alt: "Competence CRM Platform",
    bgGradient: "linear-gradient(135deg, #0A0F1D 0%, #141C33 50%, #0A0F1D 100%)",
    accentColor: "#38BDF8",
    metrics: [
      { label: "Query TTFB", value: "<50ms" },
      { label: "Data Integrity", value: "Typed Postgres" },
      { label: "IP Ownership", value: "100% Git" },
    ],
    displayUrl: "competence.vistar.internal",
    caseStudyUrl: "/work",
  },
  {
    id: 5,
    slug: "atify",
    pill: "Global Edge Network",
    pillPosition: "top-8 right-8",
    tag: "SYSTEM 05 // HIGH-THROUGHPUT COMMERCE",
    category: "Global High-Speed Edge Network",
    title: "Atify: Ultra-Fast Distributed Commerce",
    shortDesc: "Sub-100ms global edge e-commerce platform deployed across 24 edge points of presence.",
    fullDesc:
      "A resilient international commerce platform engineered for high-concurrency peak traffic, processing high-volume low-cost settlements across global edge networks with zero downtime.",
    image: "/projects/atify-banner.png",
    alt: "Atify Global Platform",
    bgGradient: "linear-gradient(135deg, #051A1F 0%, #082F38 50%, #041418 100%)",
    accentColor: "#10B981",
    metrics: [
      { label: "Global Latency", value: "<90ms P99" },
      { label: "Edge PoPs", value: "24 Global" },
      { label: "Uptime SLA", value: "99.99%" },
    ],
    displayUrl: "atify.global",
    caseStudyUrl: "/work",
  },
];

export function CohereSolutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const wrpRef = useRef<HTMLDivElement>(null);

  const [activeModalCard, setActiveModalCard] = useState<ProductionCard | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  // Exact Isometric Constants matching Algorand reference
  const BASE_RX = 72.964;
  const BASE_RZ = 35.9048;
  const RANGE_X = 9;
  const RANGE_Z = 7;

  const currentValues = useRef({
    rx: BASE_RX,
    rz: BASE_RZ,
    scale: 1,
    wrpT: 0,
  });

  const targetValues = useRef({
    rx: BASE_RX,
    rz: BASE_RZ,
    scale: 1,
    wrpT: 0,
  });

  const rafId = useRef<number | null>(null);
  const isLocked = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const applyTransforms = useCallback(() => {
    if (listRef.current) {
      const { scale, rx, rz } = currentValues.current;
      listRef.current.style.transform = `translate3d(16%, 0%, 0px) scale3d(${scale * 0.915},${scale * 0.915},1) rotateX(${rx}deg) rotateY(0deg) rotateZ(${rz}deg) skew(0deg,0deg)`;
    }
    if (wrpRef.current) {
      const offY = currentValues.current.wrpT * 32;
      wrpRef.current.style.transform = `translate3d(0%, ${offY}px, 0px) scale3d(1,1,1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg,0deg)`;
    }
  }, []);

  const tick = useCallback(() => {
    const cur = currentValues.current;
    const tgt = targetValues.current;

    cur.rx = lerp(cur.rx, tgt.rx, 0.08);
    cur.rz = lerp(cur.rz, tgt.rz, 0.08);
    cur.scale = lerp(cur.scale, tgt.scale, 0.14);
    cur.wrpT = lerp(cur.wrpT, tgt.wrpT, 0.08);

    applyTransforms();

    const isDone =
      Math.abs(cur.rx - tgt.rx) < 0.01 &&
      Math.abs(cur.rz - tgt.rz) < 0.01 &&
      Math.abs(cur.scale - tgt.scale) < 0.001 &&
      Math.abs(cur.wrpT - tgt.wrpT) < 0.001;

    if (!isDone) {
      rafId.current = requestAnimationFrame(tick);
    } else {
      cur.rx = tgt.rx;
      cur.rz = tgt.rz;
      cur.scale = tgt.scale;
      cur.wrpT = tgt.wrpT;
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
      if (isLocked.current) return;
      if (!cachedRect) updateRect();
      const rect = cachedRect!;
      const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const ny = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      targetValues.current.rx = BASE_RX + (ny - 0.5) * RANGE_X;
      targetValues.current.rz = BASE_RZ + (nx - 0.5) * RANGE_Z;
      startTick();
    };

    const handleMouseLeave = () => {
      if (isLocked.current) return;
      targetValues.current.rx = BASE_RX;
      targetValues.current.rz = BASE_RZ;
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
    isLocked.current = true;
    setHoveredCardId(cardId);

    targetValues.current.scale = 1.03;
    targetValues.current.wrpT = 0.5;
    startTick();
  };

  const handleCardMouseLeave = () => {
    isLocked.current = false;
    setHoveredCardId(null);

    targetValues.current.scale = 1.0;
    targetValues.current.wrpT = 0.0;
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
      className="relative w-full bg-white text-[#050A14] overflow-hidden select-none pt-8 md:pt-12 pb-12 md:pb-16"
      aria-label="Built for what's next. Ready now."
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* ── 1. EXACT SAMPLE HEADER LAYOUT: TOP-LEFT POSITIONED, BOLD SANS TYPOGRAPHY ── */}
        <div className="max-w-[560px] space-y-4 pt-2 sm:pt-4 pb-2 z-30 relative">
          <h2
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-bold text-[#050A14] tracking-[-0.035em] leading-[1.0] font-sans"
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
            className="text-base sm:text-[17px] md:text-[17.5px] text-[#334155] leading-[1.58] max-w-[480px] font-normal font-sans"
            style={{
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            From mission-critical cockpit GIS and real-time biometric anomaly detection to high-throughput spatial 3D platforms, Vistar engineers production software with 100% private codebase ownership.{" "}
            <strong className="text-[#050A14] font-bold">Inspect our live systems.</strong>
          </p>
        </div>

        {/* ── 2A. MOBILE-OPTIMIZED PRODUCTION CARD STACK (CLEAN, ZERO 3D PERSPECTIVE DISTORTION) ── */}
        <div className="flex md:hidden flex-col gap-6 w-full mt-8">
          {PRODUCTION_CARDS.map((card) => (
            <div
              key={`mobile-${card.id}`}
              onClick={() => handleCardClick(card)}
              className="w-full bg-[#080d19] rounded-[16px] overflow-hidden border border-black/10 shadow-md cursor-pointer transition-transform active:scale-[0.99]"
            >
              {/* Browser Window Bar */}
              <div className="h-8 px-3.5 flex items-center justify-between border-b border-white/10 bg-black/75">
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

              {/* Screenshot Image */}
              <div className="relative w-full aspect-[16/10] bg-slate-950 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/20 to-transparent pointer-events-none" />
                
                {/* Floating Category Pill */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-3 py-1 bg-white text-[#050A14] text-[11px] font-bold rounded-full shadow-sm font-sans">
                    {card.pill}
                  </span>
                </div>

                {/* Bottom Overlay Title & Tag */}
                <div className="absolute inset-x-0 bottom-0 p-4 z-10">
                  <span
                    className="text-[9px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-black/70 border border-white/15 text-white/90"
                    style={{ color: card.accentColor }}
                  >
                    {card.tag}
                  </span>
                  <h3 className="font-sans font-bold text-base text-white mt-1.5 truncate">
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* Mobile Quick Metrics & Action */}
              <div className="p-3.5 bg-neutral-900 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-300">
                <div className="flex items-center gap-3">
                  {card.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[10px] text-neutral-400 uppercase">{m.label}</span>
                      <span className="text-white font-semibold">{m.value}</span>
                    </div>
                  ))}
                </div>
                <span className="text-[11px] font-sans font-semibold text-[#FF3823] flex items-center gap-1">
                  Inspect System &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── 2B. DESKTOP 3D PERSPECTIVE CARD DECK: SHIFTED UP TO BALANCE WITH HEADER ── */}
        <div className="hidden md:flex relative w-full flex-col items-center lg:items-end justify-center min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] xl:min-h-[540px] -mt-16 sm:-mt-24 lg:-mt-[190px] xl:-mt-[220px] overflow-visible">
          
          {/* 3D Perspective Scene Container */}
          <div
            className="w-full h-full flex items-center justify-center lg:justify-end overflow-visible"
            style={{ perspective: "2800px" }}
          >
            {/* Cards List Wrapper */}
            <div
              ref={wrpRef}
              className="relative w-full flex items-center justify-center lg:justify-end transition-transform duration-75 ease-out overflow-visible"
              style={{
                transformStyle: "preserve-3d",
                transform: "translate3d(0%, 0px, 0px)",
              }}
            >
              {/* Isometric 3D Cards Stack */}
              <div
                ref={listRef}
                className="flex flex-col-reverse items-center justify-center relative w-full overflow-visible"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate3d(16%, 0%, 0px) scale3d(0.915, 0.915, 1) rotateX(${BASE_RX}deg) rotateY(0deg) rotateZ(${BASE_RZ}deg) skew(0deg, 0deg)`,
                }}
              >
                {PRODUCTION_CARDS.map((card, idx) => {
                  const isHovered = hoveredCardId === card.id;
                  const isAnyHovered = hoveredCardId !== null;

                  return (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      onMouseEnter={() => handleCardMouseEnter(card.id)}
                      onMouseLeave={handleCardMouseLeave}
                      data-card-id={card.id}
                      className="group relative cursor-pointer"
                      style={{
                        zIndex: isHovered ? 100 : 50 - idx,
                        aspectRatio: "16 / 10",
                        width: "clamp(390px, 42vw, 690px)",
                        marginTop: "-95px",
                        marginBottom: "-95px",
                        transformStyle: "preserve-3d",
                        transform: "rotateX(-90deg) rotateY(0deg) rotate(0deg)",
                      }}
                    >
                      {/* Card Surface Container */}
                      <div
                        className="relative w-full h-full rounded-[24px] overflow-hidden border border-white/20 shadow-[0_30px_70px_rgba(15,23,42,0.22)] transition-all duration-300 ease-out select-none"
                        style={{
                          background: card.bgGradient,
                          transformStyle: "preserve-3d",
                          transform: isHovered
                            ? "translate3d(0px, -30%, 0px) scale3d(1.06, 1.06, 1)"
                            : "translate3d(0px, 0%, 0px) scale3d(1, 1, 1)",
                        }}
                      >
                        {/* ── CARD FACE: BROWSER / SOFTWARE WINDOW FRAME WITH REAL SCREENSHOT ── */}
                        <div className="absolute inset-0 flex flex-col overflow-hidden pointer-events-none bg-[#080d19]">
                          {/* macOS / Web App Window Header */}
                          <div className="relative h-8 px-4 flex items-center justify-between border-b border-white/10 bg-black/65 backdrop-blur-md z-10 shrink-0">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]/50" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]/50" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/90 border border-[#1aab29]/50" />
                            </div>

                            {/* URL Pill */}
                            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/10 text-[10.5px] font-mono text-white/80">
                              <Lock className="w-2.5 h-2.5 text-emerald-400" />
                              <span className="tracking-tight">{card.displayUrl || "vistar.systems"}</span>
                            </div>

                            {/* Live Pulse Indicator */}
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                                LIVE
                              </span>
                            </div>
                          </div>

                          {/* Real Project Screenshot Surface */}
                          <div className="relative w-full flex-1 overflow-hidden bg-slate-950">
                            <Image
                              src={card.image}
                              alt={card.alt}
                              fill
                              className="object-cover object-top filter brightness-[0.98] contrast-[1.02] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                              sizes="(max-width: 768px) 100vw, 690px"
                              priority={idx < 2}
                            />

                            {/* Subtle Vignette & Scrim */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/30 to-transparent pointer-events-none" />

                            {/* Project Metadata Caption at Bottom */}
                            <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end pointer-events-none z-10">
                              <div className="flex items-center gap-2">
                                <span
                                  className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-black/60 border border-white/15 backdrop-blur-sm"
                                  style={{ color: card.accentColor }}
                                >
                                  {card.tag}
                                </span>
                              </div>
                              <h3 className="font-sans font-bold text-base sm:text-lg text-white drop-shadow-md tracking-tight truncate mt-1">
                                {card.title}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* ── Signature Floating Pill Badge (Exact Sample Placement & Font) ── */}
                        <div className={`absolute ${card.pillPosition} z-20 pointer-events-none`}>
                          <span
                            className="px-4 py-1.5 bg-white text-[#050A14] text-[13px] font-bold rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.20)] border border-white/90 tracking-tight whitespace-nowrap font-sans"
                            style={{
                              fontFamily:
                                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                            }}
                          >
                            {card.pill}
                          </span>
                        </div>

                        {/* Dimming overlay when another card is hovered */}
                        <div
                          className={`absolute inset-0 bg-white/60 transition-opacity duration-200 pointer-events-none ${
                            isAnyHovered && !isHovered ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
