"use client";

import { useState } from "react";

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
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden border-y border-[rgba(56, 189, 248, 0.15)] bg-[#F0F7FD]/60 py-4 select-none"
      style={{ touchAction: "pan-y" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-hidden="true"
    >
      {/* Fade-edge masks for depth */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F0F7FD] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F0F7FD] to-transparent" />

      {/* Scrolling track */}
      <div
        className="flex items-center whitespace-nowrap"
        style={{
          animation: "marquee-scroll 32s linear infinite",
          animationPlayState: isPaused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {TICKER_ITEMS.map((item, idx) => (
          <TickerItem key={`a-${idx}`} item={item} />
        ))}
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
      <span
        className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${
          item.accent ? "bg-[#FF7A00]" : "bg-[#0284C7]"
        }`}
      />
      <span
        className={`font-mono text-[10.5px] uppercase tracking-[0.18em] ${
          item.accent ? "font-bold text-[#0284C7]" : "text-[#0B1320]/65"
        }`}
      >
        {item.text}
      </span>
    </span>
  );
}

export default MarqueeTicker;
