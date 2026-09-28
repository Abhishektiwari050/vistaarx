"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playClick } from "@/lib/sound";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface CompanyData {
  id: string;
  name: string;
  badgeLetter: string;
  oneLiner: string;
  metricNumber: string;
  metricLabel: string;
  brandColor: string;
  brandDark: string;
  gridFill: string;
  gridStroke: string;
  gridHoverFill: string;
  barColor: string;
  circleColor: string;
  blockColor: string;
  chevronColor: string;
  logo: React.ReactNode;
}

const COMPANIES: CompanyData[] = [
  {
    id: "nvidia",
    name: "NVIDIA",
    badgeLetter: "N",
    oneLiner: "Deploy sovereign agentic systems with 100% private data ownership",
    metricNumber: "100%",
    metricLabel: "Sovereign AI",
    brandColor: "#76B900",
    brandDark: "#10180F",
    gridFill: "#CEF372",
    gridStroke: "#A6DE35",
    gridHoverFill: "#76B900",
    barColor: "#8AE000",
    circleColor: "#4E7A00",
    blockColor: "#EBF8A8",
    chevronColor: "#F4FCE6",
    logo: (
      <svg className="w-[200px] sm:w-[260px] md:w-[290px] h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.14)]" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* NVIDIA Eye Glyph */}
        <path
          d="M32.5 12C20.2 12 10.2 21.6 9.5 33.6C16.8 28.5 28.1 27.2 34.6 30.1C35.8 24.3 39.4 19.3 44.5 16.5C40.9 13.6 36.9 12 32.5 12ZM32.5 4C47.2 4 59.5 14.8 61.7 29.1C58.2 32.5 53.6 34.9 48.7 35.8C47.4 39.2 44.8 42 41.5 43.6C44.7 44.9 48.3 45.4 51.9 44.9C46.8 50.8 39.3 54.4 31.2 54.4C14.7 54.4 1.2 41.3 0 25.1C2.5 35.7 13.8 43.8 26.6 42.6C26 39.4 26.5 36.1 28.1 33.3C21.7 32.3 16.1 28.5 12.8 23C16.6 11.9 27.8 4 40.8 4H32.5Z"
          fill="#76B900"
        />
        {/* NVIDIA Wordmark with high-contrast obsidian fill */}
        <text
          x="72"
          y="42"
          fill="#111418"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="36"
          letterSpacing="-0.5px"
        >
          NVIDIA
        </text>
      </svg>
    ),
  },
  {
    id: "oracle",
    name: "Oracle",
    badgeLetter: "O",
    oneLiner: "Execute deterministic consensus with zero cross-tenant leak",
    metricNumber: "99.999%",
    metricLabel: "Database Uptime",
    brandColor: "#F80000",
    brandDark: "#1E0B0B",
    gridFill: "#FFCBD0",
    gridStroke: "#FFA0AA",
    gridHoverFill: "#F80000",
    barColor: "#FF5252",
    circleColor: "#A30000",
    blockColor: "#FFE0B2",
    chevronColor: "#FFF5F5",
    logo: (
      <svg className="w-[190px] sm:w-[240px] md:w-[270px] h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.14)]" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="46" height="34" rx="17" stroke="#F80000" strokeWidth="8" />
        <text
          x="62"
          y="36"
          fill="#F80000"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="34"
          letterSpacing="1px"
        >
          ORACLE
        </text>
      </svg>
    ),
  },
  {
    id: "google",
    name: "Google Cloud",
    badgeLetter: "G",
    oneLiner: "Scale multi-agent reasoning across distributed enterprise clusters",
    metricNumber: "10x",
    metricLabel: "Inference Speed",
    brandColor: "#4285F4",
    brandDark: "#0A1324",
    gridFill: "#CCE4FF",
    gridStroke: "#9BC7FF",
    gridHoverFill: "#4285F4",
    barColor: "#5B9BFC",
    circleColor: "#0F52BA",
    blockColor: "#FFF176",
    chevronColor: "#F0F6FF",
    logo: (
      <svg className="w-[200px] sm:w-[250px] md:w-[280px] h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.14)]" viewBox="0 0 240 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 36H12a10 10 0 0 1-2-19.8A14 14 0 0 1 36 12a14 14 0 0 1 8.5 2.9A10 10 0 0 1 44 36H28z" fill="#4285F4" opacity="0.2" />
        <path d="M12 36a10 10 0 0 1 0-20c.7 0 1.4.1 2 .2A14 14 0 0 1 36 12c4 0 7.6 1.7 10 4.4A10 10 0 0 1 44 36H12z" stroke="#4285F4" strokeWidth="4" />
        <text
          x="56"
          y="34"
          fill="#1F2937"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="24"
        >
          Google Cloud
        </text>
      </svg>
    ),
  },
  {
    id: "microsoft",
    name: "Microsoft",
    badgeLetter: "M",
    oneLiner: "Automate mission-critical workflows with sovereign cognitive privacy",
    metricNumber: "400+",
    metricLabel: "Private VPC Vaults",
    brandColor: "#00A4EF",
    brandDark: "#081626",
    gridFill: "#C6F0FD",
    gridStroke: "#8AE0FB",
    gridHoverFill: "#00A4EF",
    barColor: "#2BBBF8",
    circleColor: "#0077B6",
    blockColor: "#FFD166",
    chevronColor: "#F0FBFF",
    logo: (
      <svg className="w-[190px] sm:w-[240px] md:w-[270px] h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.14)]" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="16" height="16" fill="#F25022" />
        <rect x="26" y="8" width="16" height="16" fill="#7FBA00" />
        <rect x="6" y="28" width="16" height="16" fill="#00A4EF" />
        <rect x="26" y="28" width="16" height="16" fill="#FFB900" />
        <text
          x="52"
          y="35"
          fill="#24292F"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
          fontSize="28"
          letterSpacing="-0.3px"
        >
          Microsoft
        </text>
      </svg>
    ),
  },
];

// Exact 15-column stepped profile matching Jasper.ai media_1790471003677.png
const STEP_HEIGHTS = [2, 2, 3, 3, 4, 4, 5, 5, 5, 4, 4, 3, 3, 2, 2];

export function InteractiveCompanyTestimonial() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoverCol, setHoverCol] = useState<number | null>(null);
  const [hoverRow, setHoverRow] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const active = COMPANIES[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % COMPANIES.length);
    playClick(1050, 0.03);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + COMPANIES.length) % COMPANIES.length);
    playClick(950, 0.03);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const colWidth = rect.width / 15;
    const col = Math.floor(x / colWidth);
    const row = Math.floor((y / rect.height) * 5);
    setHoverCol(col);
    setHoverRow(row);
  };

  const handlePointerLeave = () => {
    setHoverCol(null);
    setHoverRow(null);
  };

  return (
    <section className="relative w-full py-14 sm:py-20 bg-white border-t border-black/[0.06] overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        
        {/* ── THE EXACT LAYERED INTERACTIVE STAGE ── */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onClick={handleNext}
          className="relative w-full max-w-5xl h-[360px] sm:h-[420px] md:h-[460px] flex items-center justify-center cursor-pointer overflow-hidden rounded-[8px]"
          title="Hover to press grid keys • Click to switch enterprise partner"
        >

          {/* ════ LAYER 1: TACTILE STEPPED ISOMETRIC GRID WITH CRISP INNER LINES ════ */}
          <div className="absolute inset-0 flex items-end justify-center pb-2 pointer-events-none z-0">
            <div className="grid grid-cols-15 gap-1 sm:gap-1.5 w-full h-full px-2 items-end">
              {STEP_HEIGHTS.map((height, colIdx) => {
                return (
                  <div key={colIdx} className="flex flex-col gap-1 sm:gap-1.5 items-center w-full">
                    {Array.from({ length: height }).map((_, rowIdx) => {
                      const dist = hoverCol !== null && hoverRow !== null
                        ? Math.sqrt(Math.pow(hoverCol - colIdx, 2) + Math.pow(hoverRow - rowIdx, 2))
                        : 99;

                      const isNear = dist < 2.2;
                      const depressionY = isNear ? Math.max(0, 9 - dist * 4.2) : 0;

                      return (
                        <div
                          key={rowIdx}
                          className="relative w-full aspect-square rounded-[3px] transition-all duration-150 ease-out border"
                          style={{
                            transform: `translateY(${depressionY}px)`,
                            backgroundColor: isNear ? active.gridHoverFill : active.gridFill,
                            borderColor: isNear ? active.brandColor : active.gridStroke,
                            opacity: isNear ? 1 : 0.92,
                            boxShadow: isNear
                              ? `0 0 14px ${active.brandColor}, inset 0 -3px 0 rgba(0,0,0,0.18)`
                              : "none",
                          }}
                        >
                          {/* Inner 2x2 fine graph-paper grid lines (matching Jasper Rive) */}
                          <div
                            className="absolute inset-0 pointer-events-none opacity-50"
                            style={{
                              backgroundImage: `linear-gradient(to right, #FFFFFF 1.5px, transparent 1.5px), linear-gradient(to bottom, #FFFFFF 1.5px, transparent 1.5px)`,
                              backgroundSize: "50% 50%",
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ════ LAYER 2: GRAPHIC PRIMITIVES (MATCHING Jasper media_1790471003677.png EXACTLY) ════ */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            
            {/* 3 Horizontal Velocity Bars on Left behind Logo */}
            <div className="absolute left-[6%] sm:left-[10%] md:left-[14%] top-[40%] flex flex-col gap-2.5 sm:gap-3 w-[26%] sm:w-[28%]">
              <motion.div
                key={`bar1-${active.id}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                className="h-3.5 sm:h-4.5 rounded-full origin-left opacity-90 shadow-2xs"
                style={{ backgroundColor: active.barColor }}
              />
              <motion.div
                key={`bar2-${active.id}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="h-3.5 sm:h-4.5 w-[90%] rounded-full origin-left opacity-85 shadow-2xs"
                style={{ backgroundColor: active.barColor }}
              />
              <motion.div
                key={`bar3-${active.id}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="h-3.5 sm:h-4.5 w-[70%] rounded-full origin-left opacity-75 shadow-2xs"
                style={{ backgroundColor: active.barColor }}
              />
            </div>

            {/* Horizontal Block with Solid Circles Spanning Bottom Center (Jasper style) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[12%] sm:bottom-[14%] flex items-center">
              <motion.div
                key={`block-${active.id}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative h-12 sm:h-16 w-[280px] sm:w-[380px] md:w-[440px] rounded-[6px] flex items-center justify-around px-3 sm:px-6 shadow-sm"
                style={{ backgroundColor: active.blockColor }}
              >
                {/* 5 Solid Olive/Brand Circles */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 sm:w-12 sm:h-12 rounded-full shadow-xs"
                    style={{ backgroundColor: active.circleColor }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Cream Chevron Arrow pointing Right (Behind right of logo) */}
            <motion.div
              key={`chev-${active.id}`}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 0.9 }}
              transition={{ duration: 0.45 }}
              className="absolute right-[24%] sm:right-[28%] md:right-[32%] top-[36%] w-16 h-16 sm:w-24 sm:h-24 rotate-45 rounded-[6px] shadow-xs"
              style={{ backgroundColor: active.chevronColor }}
            />
          </div>

          {/* ════ LAYER 3: PURE COMPANY LOGO ONLY (ABOVE PRIMITIVES, ZERO HUMAN LAYER) ════ */}
          <div className="relative z-30 flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={`logo-${active.id}`}
                initial={{ opacity: 0, scale: 0.85, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex items-center justify-center p-4"
              >
                {active.logo}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ════ LAYER 4: LEFT SPEECH BUBBLE CARD WITH COMPACT ONE-LINER ════ */}
          <div className="absolute left-2 sm:left-6 md:left-8 top-[18%] sm:top-[22%] z-40 max-w-[210px] sm:max-w-[270px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`bubble-${active.id}`}
                initial={{ opacity: 0, x: -15, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 15, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative bg-white rounded-[8px] p-3.5 sm:p-4.5 shadow-[0_12px_32px_rgba(0,0,0,0.10)] border border-black/10"
              >
                {/* Dark arrow cursor on top left (Exact match to Jasper media_1790471003677.png) */}
                <div className="absolute -left-1.5 -top-1.5 w-0 h-0 border-l-[9px] border-l-transparent border-b-[14px] border-b-[#181a2f] -rotate-45" />

                {/* Header with Circular Brand Badge Letter */}
                <div className="flex items-start gap-2.5">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0 mt-0.5 shadow-xs"
                    style={{ backgroundColor: active.brandColor }}
                  >
                    {active.badgeLetter}
                  </span>
                  
                  {/* Compact Editorial Serif One-Liner */}
                  <p
                    className="text-xs sm:text-sm md:text-[14px] font-normal text-[#181a2f] leading-[1.35] tracking-tight"
                    style={{
                      fontFamily: '"CohereText", "Space Grotesk", Georgia, serif',
                    }}
                  >
                    “{active.oneLiner}”
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ════ LAYER 5: RIGHT CTA / METRIC NUMBER CARD ════ */}
          <div className="absolute right-2 sm:right-6 md:right-8 top-[18%] sm:top-[22%] z-40">
            <AnimatePresence mode="wait">
              <motion.div
                key={`metric-${active.id}`}
                initial={{ opacity: 0, x: 15, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -15, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="px-4 py-3 sm:px-5 sm:py-4 rounded-[8px] shadow-[0_12px_32px_rgba(0,0,0,0.18)] flex flex-col items-start"
                style={{
                  backgroundColor: active.brandDark,
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <span
                  className="text-2xl sm:text-4xl md:text-[44px] font-bold tracking-tight leading-none"
                  style={{
                    color: active.brandColor,
                    fontFamily: '"CohereText", "Space Grotesk", Georgia, serif',
                  }}
                >
                  {active.metricNumber}
                </span>
                <span className="font-sans text-[10px] sm:text-xs font-semibold text-white/85 uppercase tracking-wider mt-1.5">
                  {active.metricLabel}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating Subtle Hint */}
          <div className="absolute bottom-2.5 right-3 pointer-events-none hidden sm:flex items-center gap-1.5 font-mono text-[9px] text-neutral-500 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-[4px] border border-black/10 z-30 shadow-2xs">
            <Sparkles className="w-2.5 h-2.5" style={{ color: active.brandColor }} />
            <span>Hover stepped grid to depress keys • Click stage to cycle partner</span>
          </div>

        </div>

        {/* ── BOTTOM CAROUSEL CONTROLS (Exact match to media_1790474925134.png) ── */}
        <div className="flex items-center gap-4 mt-6 sm:mt-8">
          <button
            onClick={handlePrev}
            aria-label="Previous partner"
            className="w-7 h-7 rounded-full bg-white hover:bg-neutral-50 border border-black/15 shadow-2xs flex items-center justify-center text-neutral-600 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Carousel dots with active outer ring */}
          <div className="flex items-center gap-2">
            {COMPANIES.map((company, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={company.id}
                  onClick={() => {
                    setActiveIdx(idx);
                    playClick(1050, 0.03);
                  }}
                  aria-label={`Go to ${company.name}`}
                  className="relative flex items-center justify-center w-5 h-5 cursor-pointer"
                >
                  {/* Outer active ring */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeCarouselRing"
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: company.brandColor }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  {/* Inner dot */}
                  <span
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isSelected ? company.brandColor : "#D1D5DB",
                    }}
                  />
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next partner"
            className="w-7 h-7 rounded-full bg-white hover:bg-neutral-50 border border-black/15 shadow-2xs flex items-center justify-center text-neutral-600 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default InteractiveCompanyTestimonial;
