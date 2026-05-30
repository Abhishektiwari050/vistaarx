"use client";

import { useScrollStore, type ThemeType } from "@/lib/stores/scroll-store";

/**
 * Centralized theme styling hook — single source of truth.
 * Governs the visual tokens for cards, tags, buttons, overlays, and concentric containers.
 */
export function useThemeStyles() {
  const theme = useScrollStore((s) => s.theme);
  return getThemeStyles(theme);
}

/**
 * Pure function to compute theme styles — can be used outside React.
 */
export function getThemeStyles(theme: ThemeType) {
  // ── Base text colors ──────────────────────────────────────────────
  const textPrimary = {
    "cyber-light": "text-neutral-900 font-extrabold",
    "cyber-dark": "text-white font-extrabold",
    mono: "text-neutral-900 font-extrabold",
    solar: "text-[#100501] font-extrabold",
  }[theme];

  const textSecondary = {
    "cyber-light": "text-neutral-800 font-semibold",
    "cyber-dark": "text-neutral-300 font-semibold",
    mono: "text-neutral-700 font-semibold",
    solar: "text-[#ff5500] font-semibold",
  }[theme];

  // ── Accent / tag labels (Chunky Brutalist Badge) ───────────────────
  const tagLabel = {
    "cyber-light":
      "text-black bg-[#ff0080]/10 border-2 border-black font-mono font-black uppercase px-2.5 py-1 rounded text-[8px] tracking-[0.1em] shadow-[2px_2px_0px_#000] inline-block",
    "cyber-dark":
      "text-[#ff0080] bg-black border-2 border-[#ff0080] font-mono font-black uppercase px-2.5 py-1 rounded text-[8px] tracking-[0.1em] shadow-[2px_2px_0px_#ff0080] inline-block",
    mono: "text-white bg-black border-2 border-black font-mono font-black uppercase px-2.5 py-1 rounded text-[8px] tracking-[0.1em] shadow-[2px_2px_0px_#000] inline-block",
    solar:
      "text-[#ffcc00] bg-[#100501] border-2 border-[#ff5500] font-mono font-black uppercase px-2.5 py-1 rounded text-[8px] tracking-[0.1em] shadow-[2px_2px_0px_#ff5500] inline-block",
  }[theme];

  // ── Primary CTA button (Tactile Brutalist Button click mechanism) ───
  const btnPrimary = {
    "cyber-light":
      "border-[3px] border-black px-7 py-3.5 bg-[#ccff00] text-black font-mono text-[10px] uppercase font-black tracking-[0.15em] flex items-center justify-between gap-3 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer group rounded-xl",
    "cyber-dark":
      "border-[3px] border-[#ff0080] px-7 py-3.5 bg-[#ff0080] text-white font-mono text-[10px] uppercase font-black tracking-[0.15em] flex items-center justify-between gap-3 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer group rounded-xl",
    mono: "border-[3px] border-black px-7 py-3.5 bg-black text-white hover:bg-neutral-900 font-mono text-[10px] uppercase font-black tracking-[0.15em] flex items-center justify-between gap-3 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer group rounded-xl",
    solar:
      "border-[3px] border-[#100501] px-7 py-3.5 bg-[#ffcc00] text-black font-mono text-[10px] uppercase font-black tracking-[0.15em] flex items-center justify-between gap-3 shadow-[4px_4px_0px_0px_#ff5500] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#ff5500] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer group rounded-xl",
  }[theme];

  // ── Brutalist Comic Card Outer Shell (3px black border & offset shadows) ──
  const brutalistCard = {
    "cyber-light":
      "bg-[#fdfbf7] border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-1 transition-transform",
    "cyber-dark":
      "bg-[#0a0a0f] border-[3px] border-black shadow-[6px_6px_0px_0px_#ff0080] rounded-2xl p-1 transition-transform",
    mono: "bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-1.5 transition-transform",
    solar:
      "bg-[#fcf6e8] border-[3px] border-[#100501] shadow-[6px_6px_0px_0px_#ff5500] rounded-2xl p-1 transition-transform",
  }[theme];

  // ── Concentric Inner Core Styles (Simplified layout) ─────────────────
  const innerCore = {
    "cyber-light":
      "h-full p-8 md:p-9 bg-[#fdfbf7] border-t-2 border-black/5 rounded-xl flex flex-col justify-between",
    "cyber-dark":
      "h-full p-8 md:p-9 bg-[#0a0a0f] border-t-2 border-white/5 rounded-xl flex flex-col justify-between",
    mono: "h-full p-8 md:p-9 bg-white border-t-2 border-black/5 rounded-xl flex flex-col justify-between",
    solar:
      "h-full p-8 md:p-9 bg-[#fcf6e8] border-t-2 border-[#100501]/5 rounded-xl flex flex-col justify-between",
  }[theme];

  // ── Glass card (Styled as solid card for brutalist comic book) ───────
  const glassCard = {
    "cyber-light":
      "bg-[#fdfbf7] border-[3px] border-black text-neutral-900 shadow-[6px_6px_0px_0px_#000] p-8 rounded-2xl transition-transform",
    "cyber-dark":
      "bg-[#0a0a0f] border-[3px] border-black text-white shadow-[6px_6px_0px_0px_#ff0080] p-8 rounded-2xl transition-transform",
    mono: "bg-white border-[3px] border-black text-neutral-900 shadow-[6px_6px_0px_0px_#000] rounded-2xl p-8 transition-transform",
    solar:
      "bg-[#fcf6e8] border-[3px] border-[#100501] text-[#100501] shadow-[6px_6px_0px_0px_#ff5500] rounded-2xl p-8 transition-transform",
  }[theme];

  // ── Manifesto panel card (homepage panels) ────────────────────────
  const panelCard = {
    "cyber-light":
      "bg-[#fdfbf7] border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-1 transition-transform",
    "cyber-dark":
      "bg-[#0a0a0f] border-[3px] border-black shadow-[6px_6px_0px_0px_#ff0080] rounded-2xl p-1 transition-transform",
    mono: "bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-1.5 transition-transform",
    solar:
      "bg-[#fcf6e8] border-[3px] border-[#100501] shadow-[6px_6px_0px_0px_#ff5500] rounded-2xl p-1 transition-transform",
  }[theme];

  // ── Accent tag for case studies / section markers ─────────────────
  const accentTag = {
    "cyber-light": "bg-black text-[#ccff00] border-2 border-black shadow-[2px_2px_0px_#000] rounded-md font-mono font-bold",
    "cyber-dark": "bg-black text-[#ff0080] border-2 border-[#ff0080] shadow-[2px_2px_0px_#ff0080] rounded-md font-mono font-bold",
    mono: "bg-black text-white border-2 border-black shadow-[2px_2px_0px_#000] rounded-md font-mono font-bold",
    solar: "bg-black text-[#ffcc00] border-2 border-[#ff5500] shadow-[2px_2px_0px_#ff5500] rounded-md font-mono font-bold",
  }[theme];

  // ── Stroke text color for hero heading ────────────────────────────
  const strokeColor = {
    "cyber-light": "#000000",
    "cyber-dark": "#ff0080",
    mono: "#000000",
    solar: "#ff5500",
  }[theme];

  // ── Backdrop overlay for sub-pages (slightly opaque warm tint) ──────
  const overlayBg = {
    "cyber-light": "rgba(253, 251, 247, 0.94)",
    "cyber-dark": "rgba(10, 10, 15, 0.94)",
    mono: "rgba(255, 255, 255, 0.96)",
    solar: "rgba(252, 246, 232, 0.94)",
  }[theme];

  // ── Progress / accent indicator color ─────────────────────────────
  const accentColor = {
    "cyber-light": "#ff0080",
    "cyber-dark": "#ff0080",
    mono: "#000000",
    solar: "#ff5500",
  }[theme];

  // ── Work page tag class ───────────────────────────────────────────
  const workTag = {
    "cyber-light":
      "text-black bg-[#ff0080]/10 border-2 border-black font-mono font-black uppercase px-2.5 py-1 rounded text-[8px] tracking-[0.1em] shadow-[2px_2px_0px_#000]",
    "cyber-dark":
      "text-[#ff0080] bg-black border-2 border-[#ff0080] font-mono font-black uppercase px-2.5 py-1 rounded text-[8px] tracking-[0.1em] shadow-[2px_2px_0px_#ff0080]",
    mono: "text-white bg-black border-2 border-black font-mono font-black uppercase px-2.5 py-1 rounded text-[8px] tracking-[0.1em] shadow-[2px_2px_0px_#000]",
    solar:
      "text-[#ffcc00] bg-[#100501] border-2 border-[#ff5500] font-mono font-black uppercase px-2.5 py-1 rounded text-[8px] tracking-[0.1em] shadow-[2px_2px_0px_#ff5500]",
  }[theme];

  // ── Outline button (Tactile Brutalist click) ──────────────────────
  const outlineBtn = {
    "cyber-light":
      "border-[3px] border-black text-black bg-white rounded-xl font-mono text-[9px] font-black uppercase tracking-[0.15em] py-3 px-6 shadow-[3px_3px_0px_#000] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer",
    "cyber-dark":
      "border-[3px] border-[#ff0080] text-white bg-black rounded-xl font-mono text-[9px] font-black uppercase tracking-[0.15em] py-3 px-6 shadow-[3px_3px_0px_#ff0080] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0px_#ff0080] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer",
    mono:
      "border-[3px] border-black text-black bg-white rounded-xl font-mono text-[9px] font-black uppercase tracking-[0.15em] py-3 px-6 shadow-[3px_3px_0px_#000] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer",
    solar:
      "border-[3px] border-[#ff5500] text-[#ffcc00] bg-[#100501] rounded-xl font-mono text-[9px] font-black uppercase tracking-[0.15em] py-3 px-6 shadow-[3px_3px_0px_#ff5500] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0px_#ff5500] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer",
  }[theme];

  return {
    theme,
    textPrimary,
    textSecondary,
    tagLabel,
    btnPrimary,
    brutalistCard,
    innerCore,
    glassCard,
    panelCard,
    accentTag,
    strokeColor,
    overlayBg,
    accentColor,
    workTag,
    outlineBtn,
  };
}
