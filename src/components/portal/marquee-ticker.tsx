"use client";

import { useState } from "react";

/**
 * MarqueeTicker — Neo-industrial horizontal running text strip.
 *
 * Source skill: elithrar/neo-industrial-design (UI Skills MCP)
 * Applied principle: one graphic motif that reinforces a boundary/axis.
 * This strip acts as the editorial separator between the portal hero and the
 * statement fold — a typographic "grid axis" in motion.
 *
 * Mobile-native: touch-action: pan-y (browser handles vertical scroll;
 * horizontal stays with the tracker). Pauses on mouse hover only.
 * Animation keyframe lives in globals.css to avoid styled-jsx dependency.
 * prefers-reduced-motion is handled in globals.css @keyframe override.
 */

const TICKER_ITEMS = [
  { text: "SOVEREIGN AI RUNTIME", accent: false },
  { text: "VTR-001 VERIFIED", accent: true },
  { text: "AEROSPACE GIS SYSTEMS", accent: false },
  { text: "ZERO VENDOR CAPTIVITY", accent: false },
  { text: "VTR-002 ACTIVE", accent: true },
  { text: "100% IP OWNERSHIP", accent: false },
  { text: "SUB-45MS LATENCY", accent: false },
  { text: "VTR-003 DEPLOYED", accent: true },
  { text: "14-DAY CADENCE", accent: false },
  { text: "ISOLATION FOREST TELEMETRY", accent: false },
  { text: "VTR-004 SCHEDULED", accent: true },
  { text: "DETERMINISTIC SYSTEMS", accent: false },
];

export function MarqueeTicker() {
  // Paused state: only activated on hover (mouse) — touch users never trigger this
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden border-y border-[rgba(237,231,220,0.13)] bg-[#0A0C0E] py-4 select-none"
      style={{ touchAction: "pan-y" }} /* mobile-native: don't intercept vertical scroll */
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-hidden="true" /* purely decorative — no interactive content */
    >
      {/* Fade-edge masks for depth — neo-industrial left/right vignette */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0A0C0E] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0A0C0E] to-transparent" />

      {/* Scrolling track — two identical copies = seamless 50% loop */}
      <div
        className="flex items-center whitespace-nowrap"
        style={{
          animation: "marquee-scroll 32s linear infinite",
          animationPlayState: isPaused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {/* First copy */}
        {TICKER_ITEMS.map((item, idx) => (
          <TickerItem key={`a-${idx}`} item={item} />
        ))}
        {/* Second copy for seamless loop */}
        {TICKER_ITEMS.map((item, idx) => (
          <TickerItem key={`b-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function TickerItem({
  item,
}: {
  item: { text: string; accent: boolean };
}) {
  return (
    <span className="inline-flex items-center gap-4 px-6 flex-shrink-0">
      {/* Separator dot — amber for VTR codes (signal), teal for descriptors */}
      <span
        className={`h-1 w-1 rounded-full flex-shrink-0 ${
          item.accent ? "bg-[#E8913C]" : "bg-[#2E6B72]"
        }`}
      />
      <span
        className={`font-sora text-[10.5px] uppercase tracking-[0.18em] ${
          item.accent ? "font-semibold text-[#E8913C]" : "text-[#6C7378]"
        }`}
      >
        {item.text}
      </span>
    </span>
  );
}
