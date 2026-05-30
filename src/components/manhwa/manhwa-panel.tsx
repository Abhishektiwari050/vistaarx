"use client";

import React from "react";
import { useScrollStore } from "@/lib/stores/scroll-store";

// ─────────────────────────────────────────────────────────────────────────────
// 1. ManhwaSpeechBubble Component — Outlined Dialog Bubble with SVG Pointer Tail
// ─────────────────────────────────────────────────────────────────────────────
interface ManhwaSpeechBubbleProps {
  text: string;
  themeType?: "lime" | "pink" | "yellow" | "white";
  pointerPosition?: "left" | "right" | "center";
  tilt?: "left" | "right" | "none";
  className?: string;
}

export function ManhwaSpeechBubble({
  text,
  themeType = "lime",
  pointerPosition = "center",
  tilt = "none",
  className = "",
}: ManhwaSpeechBubbleProps) {
  const currentTheme = useScrollStore((s) => s.theme);

  // Determine speech bubble background color
  const bubbleBg = {
    lime: "bg-[#ccff00] text-black",
    pink: "bg-[#ff0080] text-white",
    yellow: "bg-[#ffd200] text-black",
    white: "bg-white text-black",
  }[themeType];

  // Tail color must match the background color of the bubble
  const tailColor = {
    lime: "#ccff00",
    pink: "#ff0080",
    yellow: "#ffd200",
    white: "#ffffff",
  }[themeType];

  // Diagonal slant rotation
  const slantClass = {
    left: "rotate-[-3deg]",
    right: "rotate-[3deg]",
    none: "",
  }[tilt];

  // Positioning class for the tail
  const tailPosClass = {
    left: "left-6 translate-x-0",
    right: "right-6 translate-x-0",
    center: "left-1/2 -translate-x-1/2",
  }[pointerPosition];

  return (
    <div className={`relative inline-block z-30 font-mono text-[9px] sm:text-[10px] font-black px-5 py-3 rounded-2xl border-[3.5px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase tracking-wider animate-bounce select-none ${bubbleBg} ${slantClass} ${className}`}>
      {text}
      
      {/* Outlined SVG comic bubble pointer tail */}
      <svg 
        className={`absolute -bottom-4 w-8 h-4 text-current fill-current filter drop-shadow-[0px_3.5px_0px_rgba(0,0,0,1)] ${tailPosClass}`} 
        style={{ color: tailColor }}
        viewBox="0 0 40 20"
        aria-hidden="true"
      >
        <path d="M 10,0 L 20,15 L 30,0 Z" stroke="black" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ManhwaPanel Component — Chunky Bordered Staggered Comic Panel Frame
// ─────────────────────────────────────────────────────────────────────────────
interface ManhwaPanelProps {
  children: React.ReactNode;
  panelTheme?: "cyan" | "pink" | "yellow" | "purple" | "orange" | "mono";
  tilt?: "left" | "right" | "none";
  narration?: string;
  sfx?: string;
  sfxPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export function ManhwaPanel({
  children,
  panelTheme = "cyan",
  tilt = "none",
  narration,
  sfx,
  sfxPosition = "top-right",
  className = "",
}: ManhwaPanelProps) {
  // Diagonal slant rotation for hand-drawn comic frames
  const slantClass = {
    left: "rotate-[-0.8deg]",
    right: "rotate-[0.8deg]",
    none: "",
  }[tilt];

  // Vibrant gradient background classes for colored manhwa style
  const bgGradient = {
    cyan: "bg-gradient-to-br from-[#00f0ff] via-[#00a2ff] to-[#0048ff]/20 border-[#000000] shadow-[8px_8px_0px_#000]",
    pink: "bg-gradient-to-br from-[#ff00a2] via-[#ff0055] to-[#cc0000]/20 border-[#000000] shadow-[8px_8px_0px_#000]",
    yellow: "bg-gradient-to-br from-[#ffd500] via-[#ffa100] to-[#ff0080]/15 border-[#000000] shadow-[8px_8px_0px_#000]",
    purple: "bg-gradient-to-br from-[#1e073c] via-[#090117] to-[#04000b] border-[#000000] shadow-[8px_8px_0px_#ff0080]",
    orange: "bg-gradient-to-br from-[#ffe5a3] via-[#ff8c3a] to-[#ff5500] border-[#000000] shadow-[8px_8px_0px_#ff5500]",
    mono: "bg-white border-[#000000] shadow-[8px_8px_0px_#000]",
  }[panelTheme];

  // SFX starburst positioning classes
  const sfxClass = {
    "top-left": "-top-8 -left-8 manhwa-sfx-starburst-left",
    "top-right": "-top-8 -right-8 manhwa-sfx-starburst",
    "bottom-left": "-bottom-8 -left-8 manhwa-sfx-starburst-left",
    "bottom-right": "-bottom-8 -right-8 manhwa-sfx-starburst",
  }[sfxPosition];

  // SFX background color dynamic mapping
  const sfxBg = {
    cyan: "#ff0080", // pink sfx pops against cyan panel
    pink: "#ccff00", // lime pops against pink
    yellow: "#ff0080", // pink pops against yellow
    purple: "#00ffff", // cyan pops against purple
    orange: "#ccff00", // lime pops against orange
    mono: "#000000",   // black pops against white
  }[panelTheme];

  const sfxText = {
    cyan: "text-white",
    pink: "text-black",
    yellow: "text-white",
    purple: "text-black",
    orange: "text-black",
    mono: "text-white",
  }[panelTheme];

  return (
    <div className={`relative border-[4px] rounded-3xl p-1.5 transition-transform duration-300 transform-gpu hover:scale-[1.01] ${bgGradient} ${slantClass} ${className}`}>
      
      {/* 1. Optional Overlapping Narration Box */}
      {narration && (
        <div className="absolute -top-5 left-8 z-30 select-none pointer-events-none manga-narration-banner px-4 py-2 font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg">
          NARRATION: {narration}
        </div>
      )}

      {/* 2. Optional Overlapping SFX Starburst */}
      {sfx && (
        <div className={`absolute z-35 select-none pointer-events-none ${sfxClass}`}>
          <div className="relative flex items-center justify-center">
            <svg className="w-24 h-24 drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] text-[#ccff00] transition-colors duration-300" style={{ color: sfxBg }} viewBox="0 0 100 100">
              <polygon
                points="50,5 60,30 85,20 70,45 95,50 70,55 85,80 60,70 50,95 40,70 15,80 30,55 5,50 30,45 15,20 40,30"
                fill="currentColor"
                stroke="black"
                strokeWidth="4"
                strokeLinejoin="miter"
              />
            </svg>
            <span className={`absolute font-mono text-[9px] sm:text-[10px] font-black uppercase rotate-[-12deg] tracking-widest ${sfxText}`}>
              {sfx}
            </span>
          </div>
        </div>
      )}

      {/* 3. Panel Content Container */}
      <div className="h-full rounded-2xl overflow-hidden relative">
        {/* Subtle halter dot overlay inside panel */}
        <div className="absolute inset-0 halftone-dots opacity-5 pointer-events-none z-0" />
        
        {/* Content Wrapper */}
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
