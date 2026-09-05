"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

interface SequenceMilestone {
  range: [number, number];
  romanId: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  artworkRef: string;
  tags: string[];
}

const MILESTONES: SequenceMilestone[] = [
  {
    range: [0.0, 0.25],
    romanId: "SEQUENCE I",
    title: "The Genomic Substrate",
    subtitle: "Raw Architectural Primitives",
    description: "Every digital artifact begins with ontological reduction. We strip away heavy templates and CMS dependencies, engineering directly on edge compute with sub-second TTFB and zero layout shift.",
    metric: "< 120ms TTFB // 0KB Bloat",
    artworkRef: "Exh. 01: Obsidian Monolith & Liquid Chrome",
    tags: ["Next.js 16", "Cloudflare Edge", "Raw Primitives"],
  },
  {
    range: [0.25, 0.5],
    romanId: "SEQUENCE II",
    title: "Figurative Synthetics",
    subtitle: "Modern Art Aesthetic Engineering",
    description: "Digital presence must evoke the visceral gravity of a gallery sculpture. We craft bespoke WebGL shaders and procedural geometries that evoke modern figurative sculpture while maintaining 60–120 FPS Retina fidelity.",
    metric: "60 FPS Retina // Custom GLSL",
    artworkRef: "Exh. 02: Kinetic Bronze & Smoked Quartz",
    tags: ["Three.js", "GLSL Shaders", "Procedural Geometry"],
  },
  {
    range: [0.5, 0.75],
    romanId: "SEQUENCE III",
    title: "Neural Synaptic Bus",
    subtitle: "Real-Time State Synchronization",
    description: "Dynamic data flows through bi-directional WebSocket streams and edge AI interfaces. Low-latency state synchronization creates instantaneous tactile user feedback without UI stall.",
    metric: "0.000 CLS // Real-Time AI",
    artworkRef: "Exh. 03: Carrara Marble & Frosted Platinum",
    tags: ["WebSockets", "Gemini API", "Supabase Realtime"],
  },
  {
    range: [0.75, 1.0],
    romanId: "SEQUENCE IV",
    title: "Sovereign Monolith",
    subtitle: "100% Client Code Ownership",
    description: "The culmination of engineering purity. Complete unencumbered GitHub source code handover on day 21. No vendor handcuffs, no fragile plugin licenses, full enterprise valuation.",
    metric: "100% Code Ownership // Day 21",
    artworkRef: "Exh. 04: Basalt Stele & Mirror Titanium",
    tags: ["GitHub CI/CD", "TypeScript", "Audit Handover"],
  },
];

const TOTAL_FRAMES = 70;

export function ScrollDnaSequencer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [mode, setMode] = useState<"canvas" | "video">("canvas");
  const [currentFrame, setCurrentFrame] = useState(1);
  const [loadedCount, setLoadedCount] = useState(0);
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState(0);
  const [isPlayingReel, setIsPlayingReel] = useState(false);

  // Cached preloaded HTMLImageElements
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. Preload 70 extracted frames
  useEffect(() => {
    let count = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, "0");
      img.src = `/sequence/frame_${numStr}.jpg`;

      img.onload = () => {
        count++;
        setLoadedCount(count);
        // Paint initial frame once ready
        if (i === 1 && canvasRef.current) {
          paintFrame(1);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // 2. Render frame onto canvas with cover fit & crisp scaling
  const paintFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex - 1];
    if (!img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1376;
    const ih = img.naturalHeight || 768;

    // Aspect cover scaling
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const dx = (cw - sw) / 2;
    const dy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, sw, sh);

    // Subtle dark gradient vignette
    const gradient = ctx.createRadialGradient(
      cw / 2,
      ch / 2,
      Math.min(cw, ch) * 0.35,
      cw / 2,
      ch / 2,
      Math.max(cw, ch) * 0.75
    );
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.1)");
    gradient.addColorStop(1, "rgba(10, 10, 10, 0.7)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, cw, ch);
  }, []);

  // 3. Sync canvas with scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (mode !== "canvas") return;

      const frame = Math.min(TOTAL_FRAMES, Math.max(1, Math.floor(latest * (TOTAL_FRAMES - 1)) + 1));
      setCurrentFrame(frame);
      paintFrame(frame);

      // Milestone trigger
      const mIdx = MILESTONES.findIndex((m) => latest >= m.range[0] && latest <= m.range[1]);
      if (mIdx !== -1 && mIdx !== activeMilestoneIdx) {
        setActiveMilestoneIdx(mIdx);
        playTickSound();
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, mode, activeMilestoneIdx, paintFrame]);

  // 4. Handle Canvas Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      paintFrame(currentFrame);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentFrame, paintFrame]);

  // 5. Video Playback toggle
  const togglePlayReel = () => {
    playTickSound();
    if (mode === "video") {
      if (videoRef.current) {
        if (videoRef.current.paused) {
          videoRef.current.play();
          setIsPlayingReel(true);
        } else {
          videoRef.current.pause();
          setIsPlayingReel(false);
        }
      }
    } else {
      setMode("video");
      setIsPlayingReel(true);
      setTimeout(() => {
        if (videoRef.current) videoRef.current.play();
      }, 100);
    }
  };

  const activeMilestone = MILESTONES[activeMilestoneIdx] || MILESTONES[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280vh] bg-[#0c0c0c] text-[#faf9f5] selection:bg-[#d8ff42] selection:text-black"
    >
      {/* Sticky Fullscreen Cinematic Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Canvas or Video Viewport */}
        <div className="absolute inset-0 w-full h-full z-0">
          {mode === "canvas" ? (
            <canvas ref={canvasRef} className="w-full h-full block" />
          ) : (
            <video
              ref={videoRef}
              src="/videos/museum-tour.mp4"
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          )}

          {/* Film Grain & Soft Vignette Layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
        </div>

        {/* ── Top Gallery & Telemetry HUD ────────────────────────────────────── */}
        <div className="relative z-10 w-full p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
          
          {/* Gallery Title Badge */}
          <div className="flex items-center gap-3 bg-black/80 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl pointer-events-auto shadow-[3px_3px_0px_#000]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d8ff42] animate-pulse" />
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-white">
              FRAME-BY-FRAME DNA SCULPTURE // SCROLL PARALLAX
            </span>
          </div>

          {/* Frame Telemetry Counter */}
          <div className="flex items-center gap-3 bg-black/80 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl pointer-events-auto font-mono text-[10px] shadow-[3px_3px_0px_#000]">
            <span className="text-zinc-400">FRAME:</span>
            <span className="text-[#d8ff42] font-black tracking-widest">
              [{String(currentFrame).padStart(3, "0")} / {String(TOTAL_FRAMES).padStart(3, "0")}]
            </span>
            <span className="text-zinc-500">|</span>
            <span className="text-zinc-300">BUFF: {loadedCount}/{TOTAL_FRAMES}</span>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-2 pointer-events-auto bg-black/80 backdrop-blur-md border border-white/20 p-1.5 rounded-xl">
            <button
              onClick={() => {
                playTickSound();
                setMode("canvas");
                setIsPlayingReel(false);
                if (videoRef.current) videoRef.current.pause();
              }}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider transition-all ${
                mode === "canvas"
                  ? "bg-white text-black shadow-[2px_2px_0px_#000]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              ✦ SCROLL SCRUBBER
            </button>

            <button
              onClick={togglePlayReel}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider transition-all ${
                mode === "video" && isPlayingReel
                  ? "bg-[#d8ff42] text-black shadow-[2px_2px_0px_#000]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {mode === "video" && isPlayingReel ? "❚❚ PAUSE REEL" : "▶ PLAY 4K REEL"}
            </button>
          </div>
        </div>

        {/* ── Center Floating Curatorial Placard ─────────────────────────────── */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 w-full my-auto pointer-events-none">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <motion.div
              key={activeMilestone.romanId}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="md:col-span-7 bg-[#111111]/90 backdrop-blur-xl border-2 border-white/20 p-6 sm:p-8 rounded-2xl shadow-[8px_8px_0px_rgba(0,0,0,0.9)] pointer-events-auto space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] font-black uppercase px-2.5 py-1 rounded bg-white text-black">
                    {activeMilestone.romanId}
                  </span>
                  <span className="font-serif italic text-xs text-zinc-300">
                    {activeMilestone.subtitle}
                  </span>
                </div>
                <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest">
                  CURATED GENOME
                </span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
                {activeMilestone.title}
              </h2>

              <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {activeMilestone.description}
              </p>

              <div className="pt-2 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 font-mono text-[9px]">
                <span className="text-[#d8ff42] font-black tracking-widest uppercase">
                  {activeMilestone.metric}
                </span>
                <span className="text-zinc-400">
                  {activeMilestone.artworkRef}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom Scrubber Progress Bar & Jump Link ─────────────────────── */}
        <div className="relative z-10 w-full p-6 sm:p-8 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-none">
          
          <div className="w-full max-w-md pointer-events-auto space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[8px] text-zinc-400 uppercase tracking-widest">
              <span>001 PRIMITIVES</span>
              <span className="text-[#d8ff42] font-bold">SCRUB POSITION</span>
              <span>070 SOVEREIGNTY</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/20 relative">
              <div
                className="h-full bg-[#d8ff42] transition-all duration-75"
                style={{ width: `${(currentFrame / TOTAL_FRAMES) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pointer-events-auto">
            <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest hidden md:inline-block">
              SCROLL DOWN TO ADVANCE TIMELINE
            </span>
            <a
              href="#simulator"
              className="px-4 py-2 bg-white text-black font-display font-black text-[9px] uppercase tracking-widest rounded-xl border border-black shadow-[3px_3px_0px_#000] hover:bg-[#d8ff42] transition-all"
            >
              Skip to Simulator ↓
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
