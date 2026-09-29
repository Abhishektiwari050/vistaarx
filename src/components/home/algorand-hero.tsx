"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { playClick } from "@/lib/sound";

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
  caseStudyUrl: string;
}

const PRODUCTION_CARDS: ProductionCard[] = [
  {
    id: 1,
    slug: "enterprise-security",
    pill: "Zero-Trust Security",
    pillPosition: "top-8 right-12",
    tag: "LAYER 01 // ENTERPRISE SECURITY",
    category: "Zero-Trust Cryptography & AI",
    title: "TLS 1.3 / AES-256 State Security & AI Architecture",
    shortDesc: "Hardware-backed zero-trust state channels, AES-256 egress controls, and enterprise AI safeguards.",
    fullDesc:
      "Vistar engineers mission-critical web applications with mutual TLS 1.3, AES-256-GCM encryption at rest and in transit, and deterministic AI guardrails ensuring sovereign platform resilience.",
    image: "/projects/vayuways.png",
    alt: "Zero-Trust Security Interface",
    bgGradient: "linear-gradient(135deg, #0C34F0 0%, #1640EA 45%, #0A26A8 100%)",
    accentColor: "#38BDF8",
    metrics: [
      { label: "Encryption", value: "AES-256" },
      { label: "Verification", value: "<45ms" },
      { label: "IP Ownership", value: "100% Git" },
    ],
    liveUrl: "https://ai-vayu.vercel.app",
    caseStudyUrl: "/work",
  },
  {
    id: 2,
    slug: "agentic",
    pill: "Agentic Commerce",
    pillPosition: "top-8 left-12",
    tag: "LAYER 02 // AGENTIC COMMERCE",
    category: "Autonomous Multi-Agent Systems",
    title: "High-Throughput Agentic Commerce Engine",
    shortDesc: "Decoupled multi-agent commerce stream architecture with unsupervised machine learning.",
    fullDesc:
      "A distributed agentic harness that executes multi-step tool calling, dynamic inventory rebalancing, and programmatic transaction flows in real time with zero latency friction.",
    image: "/projects/aura-results.png",
    alt: "Agentic Commerce Architecture",
    bgGradient: "linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 45%, #94A3B8 100%)",
    accentColor: "#0284C7",
    metrics: [
      { label: "Agentic Precision", value: "99.8%" },
      { label: "Event Pipeline", value: "Real-Time" },
      { label: "Model Stack", value: "Claude 3.7" },
    ],
    liveUrl: "https://multi-agent-anomaly-system.onrender.com",
    caseStudyUrl: "/work",
  },
  {
    id: 3,
    slug: "defi",
    pill: "DeFi",
    pillPosition: "top-8 left-[34%]",
    tag: "LAYER 03 // DEFI ARCHITECTURE",
    category: "Institutional Financial Infrastructure",
    title: "Institutional-Grade Settlement & Liquidity Protocol",
    shortDesc: "High-frequency algorithmic liquidity engine with 60fps tactile interfaces and sovereign custody.",
    fullDesc:
      "Engineered for high-volume financial liquidity protocols, pairing high-density WebGL telemetry with sub-second order book updates, providing an uncompromising institutional trading dashboard.",
    image: "/projects/3axisarc.png",
    alt: "Institutional DeFi Platform",
    bgGradient: "linear-gradient(135deg, #2A1F13 0%, #1F170E 40%, #0D0A06 100%)",
    accentColor: "#F59E0B",
    metrics: [
      { label: "Settlement TTFB", value: "<85ms" },
      { label: "WebGL FPS", value: "60 FPS" },
      { label: "Code Sovereignty", value: "100%" },
    ],
    liveUrl: "https://3axisarc.com",
    caseStudyUrl: "/work",
  },
  {
    id: 4,
    slug: "rwa",
    pill: "RWA tokenization",
    pillPosition: "top-8 right-[24%]",
    tag: "LAYER 04 // RWA TOKENIZATION",
    category: "Asset Architecture & Smart Systems",
    title: "Sovereign Asset Handover & Tokenized Equity",
    shortDesc: "Full-stack fractionalized asset infrastructure with automated compliance and typed schemas.",
    fullDesc:
      "A deterministic compliance and tokenization platform built with Next.js 16 and PostgreSQL, allowing instant asset reconciliation and 100% private codebase handover on deployment day.",
    image: "/projects/competence-crm.png",
    alt: "RWA Tokenization Platform",
    bgGradient: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)",
    accentColor: "#38BDF8",
    metrics: [
      { label: "Reconciliation", value: "Instant" },
      { label: "Core Web Vitals", value: "100/100" },
      { label: "Stack", value: "Next.js Edge" },
    ],
    caseStudyUrl: "/work",
  },
  {
    id: 5,
    slug: "humanitarian",
    pill: "Humanitarian payments",
    pillPosition: "top-8 right-10",
    tag: "LAYER 05 // GLOBAL EDGE",
    category: "Global High-Speed Edge Network",
    title: "Sub-100ms Global Humanitarian Disbursement",
    shortDesc: "Zero-latency cross-border disbursement stream operating on 24 edge points of presence.",
    fullDesc:
      "A resilient international disbursement network engineered for maximum fault-tolerance, processing high-volume low-cost settlements across global edge networks with zero downtime.",
    image: "/projects/atify-banner.png",
    alt: "Global Edge Humanitarian Network",
    bgGradient: "linear-gradient(135deg, #06B6D4 0%, #0EA5E9 45%, #10B981 100%)",
    accentColor: "#10B981",
    metrics: [
      { label: "Global TTFB", value: "<90ms" },
      { label: "Edge PoPs", value: "24 Global" },
      { label: "Uptime SLA", value: "99.99%" },
    ],
    caseStudyUrl: "/work",
  },
];

export function AlgorandHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const wrpRef = useRef<HTMLDivElement>(null);

  const [activeModalCard, setActiveModalCard] = useState<ProductionCard | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  // ── Isometric Transform Constants (Matching Algorand's exact mathematical model) ──
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
      listRef.current.style.transform = `translate3d(3%, 9%, 0px) scale3d(${scale * 1.18},${scale * 1.18},1) rotateX(${rx}deg) rotateY(0deg) rotateZ(${rz}deg) skew(0deg,0deg)`;
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
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isLocked.current) return;
      const rect = section.getBoundingClientRect();
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

    section.addEventListener("mousemove", handleMouseMove, { passive: true });
    section.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [startTick]);

  const handleCardMouseEnter = (cardId: number) => {
    isLocked.current = true;
    setHoveredCardId(cardId);
    playClick(1400, 0.015);

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
    playClick(800, 0.04);
    setActiveModalCard(card);
  };

  const closeModal = () => {
    playClick(600, 0.02);
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
      id="hero"
      className="relative w-full min-h-[calc(100vh-80px)] bg-white text-[#050A14] flex items-center overflow-hidden pt-6 pb-0 lg:pt-10 lg:pb-0"
      aria-label="Vistar Production Systems Deck"
    >
      <div className="vistar-container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start pt-6 lg:pt-10 min-h-[calc(100vh-120px)]">
        
        {/* ── LEFT COLUMN: MOVED UP ACCORDING TO USER SPEC ── */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-6 max-w-lg relative z-30 pt-1 lg:pt-3">
          <div className="space-y-6">
            <h1
              className="text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-bold text-[#050A14] tracking-[-0.03em] leading-[1.04]"
              style={{ fontFamily: "'Savage Roses', 'Delamoore', 'DM Serif Display', 'Playfair Display', serif" }}
            >
              <span className="block sm:whitespace-nowrap">Built for what&apos;s next.</span>
              <span className="block sm:whitespace-nowrap">Ready now.</span>
            </h1>

            <p
              className="text-base sm:text-lg lg:text-[18px] text-[#475569] leading-[1.65] max-w-[390px]"
              style={{ fontFamily: "'Wasted Vindy', 'Delamoore', 'Playfair Display', 'DM Serif Display', serif" }}
            >
              While others promise tomorrow, Vistar is ready with trusted infrastructure for agentic commerce, institutional-grade Next.js systems, and a clear path to sovereign code ownership today. <strong className="text-[#050A14] font-bold">Are you ready?</strong>
            </p>
          </div>
        </div>

        {/* ── RIGHT COLUMN: CARD DECK ENLARGED & SHIFTED LEFT ── */}
        <div className="lg:col-span-7 flex flex-col items-center justify-end relative h-[600px] sm:h-[680px] lg:h-[760px] xl:h-[840px] w-full select-none overflow-visible">
          
          {/* 3D Perspective Scene */}
          <div
            className="w-full h-full flex items-center justify-center overflow-visible"
            style={{ perspective: "2800px" }}
          >
            {/* Cards List Wrapper */}
            <div
              ref={wrpRef}
              className="relative w-full flex items-center justify-center transition-transform duration-75 ease-out overflow-visible"
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
                  transform: `translate3d(3%, 9%, 0px) scale3d(1.18, 1.18, 1) rotateX(${BASE_RX}deg) rotateY(0deg) rotateZ(${BASE_RZ}deg) skew(0deg, 0deg)`,
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
                        width: "clamp(500px, 52vw, 820px)",
                        marginTop: "-120px",
                        marginBottom: "-120px",
                        transformStyle: "preserve-3d",
                        transform: "rotateX(-90deg) rotateY(0deg) rotate(0deg)",
                      }}
                    >
                      {/* Card Surface Container */}
                      <div
                        className="relative w-full h-full rounded-[24px] overflow-hidden border border-white/20 shadow-[0_30px_70px_rgba(15,23,42,0.25)] transition-all duration-300 ease-out select-none"
                        style={{
                          background: card.bgGradient,
                          transformStyle: "preserve-3d",
                          transform: isHovered
                            ? "translate3d(0px, -30%, 0px) scale3d(1.06, 1.06, 1)"
                            : "translate3d(0px, 0%, 0px) scale3d(1, 1, 1)",
                        }}
                      >
                          {/* ── CARD 1: ELECTRIC COBALT BLUEPRINT & ZERO-TRUST SECURITY ── */}
                        {card.id === 1 && (
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {/* CAD Corner Bracket */}
                            <div className="absolute top-6 left-8 text-white/70 font-mono text-xl">
                              ┌
                            </div>

                            {/* Code snippet text */}
                            <div className="absolute top-14 left-8 max-w-[280px] text-[11px] font-mono text-cyan-200/80 leading-relaxed">
                              <p className="text-white/90">// Box 01: Vistar Signature Cipher</p>
                              <p>#signature_res: 0x93FA92...</p>
                              <p className="text-cyan-300/80">(AES-256-GCM verified channel)</p>
                              <p className="mt-2 text-white/60">return HMAC.Sign(payload, key) -&gt;</p>
                            </div>

                            {/* 3D Wireframe Cube Monolith in center-bottom */}
                            <div className="absolute bottom-8 left-16 w-44 h-44 pointer-events-none opacity-85">
                              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                                <polygon points="50,15 85,35 50,55 15,35" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeDasharray="3 3" />
                                <polygon points="15,35 50,55 50,90 15,70" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeDasharray="3 3" fill="rgba(56,189,248,0.1)" />
                                <polygon points="85,35 50,55 50,90 85,70" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" fill="rgba(255,255,255,0.12)" />
                              </svg>
                            </div>

                            {/* Technical Monospace Bottom Text */}
                            <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between text-white/95">
                              <div className="text-[10px] font-mono text-cyan-200/80 uppercase tracking-wider">
                                AES-256-GCM zero-trust cryptographic channel
                              </div>
                              <div className="font-mono text-xs text-white bg-white/10 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm font-semibold">
                                &lt;45ms Latency
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ── CARD 2: AGENTIC COMMERCE & SKY CONCRETE MONOLITH ── */}
                        {card.id === 2 && (
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-10 -right-10 w-96 h-96 rounded-full bg-white/40 blur-2xl" />
                            
                            {/* Floating Lilac 3D Disc & Crosshair */}
                            <div className="absolute bottom-12 right-24 w-28 h-28 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-200 opacity-90 shadow-xl border border-white/60 transform rotate-12" />
                            <div className="absolute top-20 right-28 w-2 h-2 rounded-full bg-slate-900" />
                            <div className="absolute top-20 right-28 w-12 h-12 -translate-x-5 -translate-y-5 border border-dashed border-slate-700/40 rounded-full" />

                            <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between text-slate-950">
                              <div className="space-y-1">
                                <div className="text-[11px] font-mono text-slate-700 uppercase tracking-wider font-semibold">
                                  Agentic Commerce // Multi-Step Calling
                                </div>
                                <div className="font-sans font-bold text-lg text-slate-950">
                                  Autonomous Market Orchestrator
                                </div>
                              </div>
                              <div className="font-mono text-xs text-slate-950 bg-white/80 px-3 py-1.5 rounded-full border border-white/40 backdrop-blur-sm font-bold shadow-xs">
                                99.8% Precision
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ── CARD 3: MOLTEN GOLD SCULPTURAL ARCHITECTURE (DEFI) ── */}
                        {card.id === 3 && (
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {/* Molten Liquid Gold Reflective Sculpture */}
                            <div className="absolute -right-8 -bottom-8 w-96 h-96 rounded-full bg-gradient-to-tr from-amber-700 via-yellow-400 to-amber-100 opacity-95 blur-[0.5px] shadow-[0_0_110px_rgba(245,158,11,0.65)] transform rotate-45" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                            <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between text-white">
                              <div className="space-y-1">
                                <div className="text-[11px] font-mono text-amber-300 uppercase tracking-wider font-semibold">
                                  DeFi // Sub-100ms Settlement
                                </div>
                                <div className="font-sans font-bold text-lg text-white">
                                  Institutional Liquidity Core
                                </div>
                              </div>
                              <div className="font-mono text-xs text-amber-300 bg-amber-950/80 px-3 py-1.5 rounded-full border border-amber-500/40 backdrop-blur-sm font-semibold">
                                60 FPS Smooth
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ── CARD 4: RWA TOKENIZATION & TACTILE KEYBOARD ── */}
                        {card.id === 4 && (
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {/* Dark Studio Keyboard with illuminated keys */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A] via-[#1E293B] to-[#334155]" />
                            <div className="absolute inset-0 opacity-25" style={{
                              backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
                              backgroundSize: "20px 20px"
                            }} />

                            {/* Illuminated Macro Keys */}
                            <div className="absolute top-1/2 left-1/3 flex gap-4 -translate-y-1/2">
                              {["S", "P", "N"].map((letter) => (
                                <div
                                  key={letter}
                                  className="w-16 h-16 rounded-xl bg-slate-800/90 border border-slate-600/60 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex items-center justify-center text-white/90 font-mono text-xl font-bold backdrop-blur-md"
                                >
                                  {letter}
                                </div>
                              ))}
                            </div>

                            <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between text-white">
                              <div className="space-y-1">
                                <div className="text-[11px] font-mono text-cyan-200 uppercase tracking-wider font-semibold">
                                  RWA Tokenization // 100% Handover
                                </div>
                                <div className="font-sans font-bold text-lg text-white">
                                  Sovereign Asset Architecture
                                </div>
                              </div>
                              <div className="font-mono text-xs text-cyan-200 bg-sky-950/80 px-3 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-sm font-semibold">
                                100% Sovereign
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ── CARD 5: HUMANITARIAN PAYMENTS & TURQUOISE ENERGY ── */}
                        {card.id === 5 && (
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <div className="absolute -top-12 -right-12 w-80 h-80 rounded-full bg-cyan-300/40 blur-3xl" />

                            <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between text-white">
                              <div className="space-y-1">
                                <div className="text-[11px] font-mono text-emerald-100 uppercase tracking-wider font-semibold">
                                  Humanitarian Payments // 24 Edge PoPs
                                </div>
                                <div className="font-sans font-bold text-lg text-white">
                                  Global Instant Settlement
                                </div>
                              </div>
                              <div className="font-mono text-xs text-emerald-100 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-400/40 backdrop-blur-sm font-semibold">
                                &lt;90ms Global
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ── Signature Floating Pill Badge (Exact Algorand Staggered Placement) ── */}
                        <div className={`absolute ${card.pillPosition} z-20 pointer-events-none`}>
                          <span
                            className="px-4 py-1.5 bg-white text-[#050A14] text-[12.5px] sm:text-[13px] font-bold rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-white/90 tracking-tight whitespace-nowrap"
                            style={{ fontFamily: "'Delamoore', 'DM Serif Display', 'Playfair Display', serif" }}
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
            className="absolute inset-0 bg-black/40 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-5xl bg-white border border-[#E2E8F0] rounded-[16px] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]">
            
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
                  <span className="font-mono text-xs font-bold text-[#1D4ED8] uppercase tracking-wider">
                    {activeModalCard.category}
                  </span>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex items-center gap-1.5 px-3 py-1 text-[#64748B] hover:text-[#0B1320] hover:bg-[#F1F5F9] rounded-full transition-colors cursor-pointer text-xs font-mono border border-[#E2E8F0]"
                    aria-label="Close modal"
                  >
                    <span className="text-[11px] font-sans font-medium">ESC</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                <h3
                  className="text-2xl font-bold text-[#0B1320] tracking-tight"
                  style={{ fontFamily: "'DM Serif Display', 'Delamoore', 'Savage Roses', 'Playfair Display', serif" }}
                >
                  {activeModalCard.title}
                </h3>

                <p
                  className="text-sm text-[#475569] leading-relaxed"
                  style={{ fontFamily: "'Wasted Vindy', 'Playfair Display', 'Delamoore', 'DM Serif Display', serif" }}
                >
                  {activeModalCard.fullDesc}
                </p>

                {/* Metrics Breakdown Grid */}
                <div className="grid grid-cols-3 gap-2.5 py-2">
                  {activeModalCard.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F8FAFD] border border-[#E2E8F0] rounded-lg text-center"
                    >
                      <div
                        className="text-lg font-bold text-[#0284C7]"
                        style={{ fontFamily: "'DM Serif Display', 'Delamoore', 'Playfair Display', serif" }}
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
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#0284C7] hover:bg-[#0369A1] text-white text-[14px] font-semibold rounded-lg shadow-md shadow-[#0284C7]/25 transition-all"
                  style={{ fontFamily: "'Delamoore', 'DM Serif Display', 'Playfair Display', serif" }}
                >
                  <span>Commission System Like This</span>
                  <span>→</span>
                </Link>

                <div className="flex items-center gap-3">
                  {activeModalCard.liveUrl && (
                    <a
                      href={activeModalCard.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#F1F5F9] text-[#0B1320] text-xs font-semibold rounded-lg hover:bg-[#E2E8F0] transition-colors"
                      style={{ fontFamily: "'Delamoore', 'DM Serif Display', 'Playfair Display', serif" }}
                    >
                      <span>Live Demo</span>
                      <span>↗</span>
                    </a>
                  )}
                  <Link
                    href={activeModalCard.caseStudyUrl}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-white border border-[#CBD5E1] text-[#0B1320] text-xs font-semibold rounded-lg hover:bg-[#F1F5F9] transition-colors"
                    style={{ fontFamily: "'Delamoore', 'DM Serif Display', 'Playfair Display', serif" }}
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
