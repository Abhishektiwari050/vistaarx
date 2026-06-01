"use client";

import React, { ReactNode, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

// ─────────────────────────────────────────────────────────────────────────────
// 1. ManhwaSpeechBubble — Classic Comic Dialogue Box
// ─────────────────────────────────────────────────────────────────────────────
interface ManhwaSpeechBubbleProps {
  text: string;
  themeType?: "cyan" | "purple" | "gold" | "crimson" | "mono" | "pink" | "lime" | "orange";
  pointerPosition?: "left" | "right" | "center";
  tilt?: "left" | "right" | "none";
  className?: string;
}

export function ManhwaSpeechBubble({
  text,
  themeType = "cyan",
  pointerPosition = "left",
  tilt = "none",
  className = "",
}: ManhwaSpeechBubbleProps) {
  const boxStyles = {
    cyan: "bg-[#00f0ff] text-black",
    purple: "bg-[#9d00ff] text-white",
    gold: "bg-[#ffbe0b] text-black",
    crimson: "bg-[#ff003c] text-white",
    mono: "bg-white text-black",
    pink: "bg-[#ff0080] text-white",
    lime: "bg-[#ccff00] text-black",
    orange: "bg-[#ff5500] text-white",
  }[themeType];

  const slantClass = {
    left: "rotate-[-2deg]",
    right: "rotate-[2deg]",
    none: "",
  }[tilt];

  const pointerClass = {
    left: "left-4 -bottom-3",
    right: "right-4 -bottom-3 transform scale-x-[-1]",
    center: "left-1/2 -translate-x-1/2 -bottom-3",
  }[pointerPosition];

  return (
    <div className={`relative inline-block z-30 font-bangers text-base sm:text-xl tracking-wider px-5 py-3 border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_#000] select-none hand-drawn-border ${boxStyles} ${slantClass} ${className}`}>
      {text}
      {/* Cartoon Speech Bubble Pointer */}
      <svg 
        className={`absolute ${pointerClass} w-6 h-4 text-current drop-shadow-[2px_2px_0px_#000]`} 
        viewBox="0 0 24 16" 
        fill="currentColor"
        stroke="black"
        strokeWidth="3"
        style={{ overflow: "visible" }}
      >
        <path d="M0 0 L12 16 L24 0 Z" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ManhwaPanel — Chunky Comic Panel with Bold Borders
// ─────────────────────────────────────────────────────────────────────────────
interface ManhwaPanelProps {
  children: React.ReactNode;
  panelTheme?: "cyan" | "purple" | "gold" | "crimson" | "mono" | "pink" | "lime" | "orange";
  tilt?: "left" | "right" | "none";
  narration?: string;
  sfx?: string;
  sfxPosition?: "top-right" | "bottom-left" | "bottom-right" | "top-left";
  reveal?: "up" | "left" | "right" | "scale" | "none";
  className?: string;
}

export function ManhwaPanel({
  children,
  panelTheme = "mono",
  tilt = "none",
  narration,
  sfx,
  sfxPosition = "bottom-right",
  reveal = "up",
  className = "",
}: ManhwaPanelProps) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });

  const slantClass = {
    left: "rotate-[-1deg]",
    right: "rotate-[1deg]",
    none: "",
  }[tilt];

  const shadowStyles = {
    cyan: "shadow-[6px_6px_0px_#00f0ff] hover:shadow-[10px_10px_0px_#00f0ff]",
    purple: "shadow-[6px_6px_0px_#9d00ff] hover:shadow-[10px_10px_0px_#9d00ff]",
    gold: "shadow-[6px_6px_0px_#ffbe0b] hover:shadow-[10px_10px_0px_#ffbe0b]",
    crimson: "shadow-[6px_6px_0px_#ff003c] hover:shadow-[10px_10px_0px_#ff003c]",
    mono: "shadow-[6px_6px_0px_#000000] hover:shadow-[10px_10px_0px_#000000]",
    pink: "shadow-[6px_6px_0px_#ff0080] hover:shadow-[10px_10px_0px_#ff0080]",
    lime: "shadow-[6px_6px_0px_#ccff00] hover:shadow-[10px_10px_0px_#ccff00]",
    orange: "shadow-[6px_6px_0px_#ff5500] hover:shadow-[10px_10px_0px_#ff5500]",
  }[panelTheme];

  const revealClass = {
    up: "manhwa-reveal",
    left: "manhwa-reveal-left",
    right: "manhwa-reveal-right",
    scale: "manhwa-reveal-scale",
    none: "",
  }[reveal];

  const sfxPosClass = {
    "top-right": "-top-6 -right-6 rotate-[15deg]",
    "bottom-left": "-bottom-6 -left-6 rotate-[-15deg]",
    "bottom-right": "-bottom-6 -right-6 rotate-[15deg]",
    "top-left": "-top-6 -left-6 rotate-[-15deg]",
  }[sfxPosition];

  return (
    <div 
      ref={ref}
      className={`relative transition-all duration-300 transform-gpu hover:scale-[1.02] bg-white border-[4px] border-black rounded-xl hand-drawn-border ${shadowStyles} ${slantClass} ${revealClass} ${isVisible ? "visible" : ""} ${className}`}
    >
      {/* 1. Optional Comic Narration Box */}
      {narration && (
        <div className="absolute -top-4 left-4 z-30 select-none bg-[#ffcc00] border-[3px] border-black text-black px-4 py-1.5 font-comic font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[2px_2px_0px_#000] hand-drawn-border">
          {narration}
        </div>
      )}

      {/* 2. Panel Content Container */}
      <div className="h-full relative overflow-hidden rounded-lg">
        {/* Subtle comic halftone overlay for texture */}
        <div className="absolute inset-0 halftone-dots opacity-[0.04] pointer-events-none z-0" />
        
        {/* Content Wrapper */}
        <div className="relative z-10 h-full p-6 sm:p-10">
          {children}
        </div>
      </div>

      {/* 3. Optional Sound Effect (SFX) */}
      {sfx && (
        <div className={`absolute z-40 select-none pointer-events-none ${sfxPosClass}`}>
          <span 
            className="font-bangers text-4xl sm:text-5xl text-[#ff0080] drop-shadow-[3px_3px_0px_#000] inline-block hover-shake-burst"
            style={{ WebkitTextStroke: "1px #000" }}
          >
            {sfx}
          </span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. ManhwaStarburst — Jagged, Loud Action Text (UPGRADED TO 24-POINT CLASSIC STARBURST)
// ─────────────────────────────────────────────────────────────────────────────
interface ManhwaStarburstProps {
  text: string;
  themeType?: "cyan" | "purple" | "gold" | "crimson" | "mono" | "pink" | "lime" | "orange";
  size?: "sm" | "md" | "lg";
  tilt?: "left" | "right" | "none";
  className?: string;
}

export function ManhwaStarburst({
  text,
  themeType = "lime",
  size = "md",
  tilt = "none",
  className = "",
}: ManhwaStarburstProps) {
  const colors = {
    cyan: "bg-[#00f0ff] text-black",
    purple: "bg-[#9d00ff] text-white",
    gold: "bg-[#ffbe0b] text-black",
    crimson: "bg-[#ff003c] text-white",
    mono: "bg-white text-black",
    pink: "bg-[#ff0080] text-white",
    lime: "bg-[#ccff00] text-black",
    orange: "bg-[#ff5500] text-white",
  }[themeType];

  const sizeClasses = {
    sm: "text-2xl sm:text-3xl px-6 py-4",
    md: "text-4xl sm:text-5xl px-8 py-6",
    lg: "text-5xl sm:text-7xl px-10 py-8",
  }[size];

  const slantClass = {
    left: "rotate-[-10deg]",
    right: "rotate-[10deg]",
    none: "",
  }[tilt];

  // Precise 24-Point Retro Comic Starburst clip-path
  const starburstClipPath = "polygon(50% 0%, 57% 18%, 76% 8%, 73% 27%, 93% 25%, 82% 42%, 98% 50%, 82% 58%, 93% 75%, 73% 73%, 76% 92%, 57% 82%, 50% 100%, 43% 82%, 24% 92%, 27% 73%, 7% 75%, 18% 58%, 2% 50%, 18% 42%, 7% 25%, 27% 27%, 24% 8%, 43% 18%)";

  return (
    <div className={`relative inline-block select-none cursor-pointer transition-all duration-300 hover-shake-burst ${slantClass} ${className}`}>
      <div 
        className={`relative z-10 flex items-center justify-center font-bangers uppercase tracking-wider ${colors} ${sizeClasses}`}
        style={{ 
          clipPath: starburstClipPath,
          WebkitTextStroke: "1.5px #000"
        }}
      >
        <span className="drop-shadow-[3px_3px_0px_rgba(0,0,0,0.8)] mt-1">{text}</span>
      </div>
      {/* Background shadow starburst */}
      <div 
        className="absolute top-1.5 left-1.5 w-full h-full bg-black z-0"
        style={{ clipPath: starburstClipPath }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. ManhwaNarrationBanner — Thick Black Comic Border Title
// ─────────────────────────────────────────────────────────────────────────────
interface ManhwaNarrationBannerProps {
  title: string;
  subtitle?: string;
  themeType?: "cyan" | "purple" | "gold" | "crimson" | "mono" | "pink" | "lime" | "orange";
  className?: string;
}

export function ManhwaNarrationBanner({
  title,
  subtitle,
  themeType = "mono",
  className = "",
}: ManhwaNarrationBannerProps) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  const bgStyles = {
    cyan: "bg-[#00f0ff] text-black",
    purple: "bg-[#9d00ff] text-white",
    gold: "bg-[#ffbe0b] text-black",
    crimson: "bg-[#ff003c] text-white",
    mono: "bg-black text-white",
    pink: "bg-[#ff0080] text-white",
    lime: "bg-[#ccff00] text-black",
    orange: "bg-[#ff5500] text-white",
  }[themeType];

  return (
    <div 
      ref={ref}
      className={`relative inline-block border-[4px] border-black px-6 py-3 select-none manhwa-reveal-left shadow-[6px_6px_0px_#000] hand-drawn-border ${isVisible ? "visible" : ""} ${bgStyles} ${className} rotate-[-1deg]`}
    >
      <h2 className="font-bangers text-3xl sm:text-5xl uppercase tracking-wider" style={{ WebkitTextStroke: "1px #000" }}>
        {title}
      </h2>
      
      {subtitle && (
        <p className="font-comic font-bold text-sm sm:text-base mt-1 tracking-wide bg-white text-black px-2 py-1 inline-block border-2 border-black -rotate-[1deg] hand-drawn-border">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. ManhwaGutterDivider — Jagged Action Lines
// ─────────────────────────────────────────────────────────────────────────────
interface ManhwaGutterDividerProps {
  themeType?: "cyan" | "purple" | "gold" | "crimson" | "mono" | "pink" | "lime" | "orange";
  className?: string;
}

export function ManhwaGutterDivider({
  themeType = "pink",
  className = "",
}: ManhwaGutterDividerProps) {
  const stripeColor = {
    cyan: "bg-[#00f0ff]",
    purple: "bg-[#9d00ff]",
    gold: "bg-[#ffbe0b]",
    crimson: "bg-[#ff003c]",
    mono: "bg-black",
    pink: "bg-[#ff0080]",
    lime: "bg-[#ccff00]",
    orange: "bg-[#ff5500]",
  }[themeType];

  return (
    <div className={`relative w-full h-16 flex items-center justify-center overflow-hidden select-none pointer-events-none ${className}`}>
      {/* Thick jagged lines resembling speedlines or comic dividers */}
      <div className={`absolute w-full h-[4px] top-1/2 -translate-y-1/2 ${stripeColor} rotate-[1deg]`} />
      <div className={`absolute w-full h-[8px] top-1/2 -translate-y-1/2 ${stripeColor} rotate-[-2deg]`} />
      <div className={`absolute w-full h-[2px] top-1/3 -translate-y-1/2 ${stripeColor} rotate-[3deg]`} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. ManhwaChapterDivider — Bold Comic Book Issue Title
// ─────────────────────────────────────────────────────────────────────────────
interface ManhwaChapterDividerProps {
  chapterNumber: number;
  title: string;
  className?: string;
}

export function ManhwaChapterDivider({
  chapterNumber,
  title,
  className = "",
}: ManhwaChapterDividerProps) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div 
      ref={ref}
      className={`relative w-full py-16 select-none flex flex-col items-center justify-center text-center manhwa-reveal ${isVisible ? "visible" : ""} ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none opacity-10">
        <div className="w-full h-[2px] bg-black" />
      </div>
      
      <span className="font-comic font-black text-xs sm:text-sm uppercase tracking-widest bg-black text-white px-3 py-1 border-[3px] border-black shadow-[3px_3px_0px_#000] rotate-[-2deg] mb-4 z-10">
        ISSUE #{String(chapterNumber).padStart(2, "0")}
      </span>
      
      <h2 
        className="font-bangers text-5xl sm:text-7xl uppercase tracking-wider text-[#ccff00] rotate-[1deg] z-10"
        style={{ WebkitTextStroke: "2px #000", textShadow: "4px 4px 0px #000" }}
      >
        {title}
      </h2>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. ManhwaFloatingParticle — Comic Halftone Dots
// ─────────────────────────────────────────────────────────────────────────────
interface ManhwaFloatingParticleProps {
  color?: string;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  delay?: number;
  className?: string;
}

export function ManhwaFloatingParticle({
  color = "#ff0080",
  size = 12,
  top,
  left,
  right,
  delay = 0,
  className = "",
}: ManhwaFloatingParticleProps) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none border-2 border-black bg-[${color}] shadow-[2px_2px_0px_#000] floating-particle-slow ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        top,
        left,
        right,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. ManhwaActionPanel — Full-bleed Comic Page Background
// ─────────────────────────────────────────────────────────────────────────────
interface ManhwaActionPanelProps {
  children: React.ReactNode;
  bgGradient?: string;
  reveal?: "up" | "left" | "right" | "scale" | "none";
  className?: string;
}

export function ManhwaActionPanel({
  children,
  bgGradient = "bg-white",
  reveal = "up",
  className = "",
}: ManhwaActionPanelProps) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  const revealClass = {
    up: "manhwa-reveal",
    left: "manhwa-reveal-left",
    right: "manhwa-reveal-right",
    scale: "manhwa-reveal-scale",
    none: "",
  }[reveal];

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${bgGradient} ${revealClass} border-y-[6px] border-black ${isVisible ? "visible" : ""} ${className}`}
    >
      {/* Bold halftone pattern for comic texture */}
      <div className="absolute inset-0 halftone-dots opacity-[0.08] pointer-events-none z-0" />
      
      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Comic Mask Reveal (Framer Motion)
// ─────────────────────────────────────────────────────────────────────────────
export function ComicMaskReveal({
  children,
  delay = 0,
  direction = "left",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "left" | "right" | "top" | "bottom";
  className?: string;
}) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  const getClipPath = () => {
    switch (direction) {
      case "left": return "inset(0 100% 0 0)";
      case "right": return "inset(0 0 0 100%)";
      case "top": return "inset(100% 0 0 0)";
      case "bottom": return "inset(0 0 100% 0)";
    }
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: getClipPath(), y: direction === "top" ? 20 : 0 }}
        animate={isVisible ? { clipPath: "inset(0 0 0 0)", y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ManhwaTerminal — Interactive Neo-Brutalist Compiling Terminal
// ─────────────────────────────────────────────────────────────────────────────
export function ManhwaTerminal({ className = "" }: { className?: string }) {
  const [logs, setLogs] = React.useState<string[]>([]);
  const [syncStatus, setSyncStatus] = React.useState("AWAITING SYNC...");

  const mockLines = useMemo(() => [
    "★ INITIATING VECTOR NODE HANDSHAKE...",
    "✔ GPU RASTERIZER DISPATCH: OK [144Hz LOCKED]",
    "★ RESOLVING IMMERSIVE SHADER PIPELINE...",
    "✔ COMPILING PARTICLE SHADER: SUCCESS [0.03ms]",
    "✔ GENERATING 5,000 PARTICLE POINTS...",
    "★ CONNECTING TO SUPABASE LEDGER POOL...",
    "✔ LEDGER TRANSACTION LOG: SYNCHRONIZED",
    "★ CALCULATING MATHEMATICAL SCROLL VECTORS...",
    "✔ DYNAMIC PARALLAX SWEEP BUFFER: STABLE",
    "★ INJECTING TACTILE MICRO-INTERACTIONS...",
    "✔ PIPELINE SYNC COMPLETE. VISTAR WEB CORE ONLINE!"
  ], []);

  useEffect(() => {
    let index = 0;
    setLogs([mockLines[0]]);
    
    const interval = setInterval(() => {
      index++;
      if (index < mockLines.length) {
        setLogs(prev => [...prev, mockLines[index]]);
      } else {
        setSyncStatus("SYSTEM SYNCED ★ STABLE");
        clearInterval(interval);
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [mockLines]);

  return (
    <div className={`border-[4px] border-black bg-black rounded-xl overflow-hidden shadow-[6px_6px_0px_#000] font-mono text-xs text-lime-400 select-none ${className}`}>
      {/* Title Bar */}
      <div className="bg-[#ccff00] border-b-[4px] border-black px-4 py-2 flex items-center justify-between text-black font-comic font-black">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-black animate-pulse" />
          <span>VISTAR_SYNC_CONSOLE // PORT 3000</span>
        </span>
        <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded border border-black">
          {syncStatus}
        </span>
      </div>

      {/* Terminal Screen */}
      <div className="p-4 h-[240px] overflow-y-auto space-y-2.5 scrollbar-thin bg-neutral-950 font-bold">
        {logs.map((log, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.3 }}
            key={idx} 
            className={`${log.startsWith("✔") ? "text-[#00f0ff]" : "text-[#ff0080]"}`}
          >
            {log}
          </motion.div>
        ))}
        {logs.length < mockLines.length && (
          <span className="inline-block w-2 h-4 bg-[#ccff00] animate-pulse" />
        )}
      </div>
    </div>
  );
}


