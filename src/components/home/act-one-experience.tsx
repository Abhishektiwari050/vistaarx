"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

const TOTAL_FRAMES = 120;

export function ActOneExperience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // In-memory image cache for instantaneous 60fps frame drawing
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const [loadedCount, setLoadedCount] = useState(0);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState<0 | 1 | 2>(0);

  // Mouse tilt coordinates for tactile micro-parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 1. CANVAS DRAW FUNCTION
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !viewport) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const width = viewport.clientWidth;
    const height = viewport.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Warm Ivory studio background
    ctx.fillStyle = "#F4F1EA";
    ctx.fillRect(0, 0, width, height);

    // Resolve which image to render (fallback to nearest loaded)
    let imgToDraw = imagesRef.current[frameIdx];
    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        if (frameIdx - offset >= 0 && imagesRef.current[frameIdx - offset]?.complete) {
          imgToDraw = imagesRef.current[frameIdx - offset];
          break;
        }
        if (frameIdx + offset < TOTAL_FRAMES && imagesRef.current[frameIdx + offset]?.complete) {
          imgToDraw = imagesRef.current[frameIdx + offset];
          break;
        }
      }
      if (!imgToDraw || !imgToDraw.complete) {
        imgToDraw = imagesRef.current[0];
      }
    }

    if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
      const isDesktop = width >= 1024;
      const isTablet = width >= 768 && width < 1024;
      const imgAspect = 1280 / 720;

      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      if (isDesktop) {
        // Desktop: generous presence in right half (x ~ 920-980px)
        drawH = height * 1.05;
        drawW = drawH * imgAspect;
        // Position instrument in the right 55%
        drawX = width - drawW * 0.70;
        drawY = (height - drawH) / 2;
      } else if (isTablet) {
        drawH = height * 0.88;
        drawW = drawH * imgAspect;
        drawX = (width - drawW) / 2;
        drawY = height * 0.26;
      } else {
        // Mobile (390x844): Scaled and positioned gracefully in lower half
        drawW = Math.max(width * 1.5, 480);
        drawH = drawW / imgAspect;
        drawX = width / 2 - (700 / 1280) * drawW;
        drawY = height * 0.48;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(imgToDraw, Math.round(drawX), Math.round(drawY), Math.round(drawW), Math.round(drawH));

      // Seamless gradient feather on desktop so left negative space dissolves into #F4F1EA
      if (isDesktop && drawX > 0) {
        ctx.fillStyle = "#F4F1EA";
        ctx.fillRect(0, 0, Math.round(drawX), height);

        const featherWidth = Math.min(280, drawW * 0.28);
        const grad = ctx.createLinearGradient(drawX, 0, drawX + featherWidth, 0);
        grad.addColorStop(0, "#F4F1EA");
        grad.addColorStop(0.3, "rgba(244, 241, 234, 0.85)");
        grad.addColorStop(1, "rgba(244, 241, 234, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(Math.round(drawX), 0, Math.round(featherWidth), height);
      }

      // Seamless soft top fade on mobile so image dissolves smoothly into page background
      if (!isDesktop && drawY > 0) {
        const topFeather = 70;
        const gradY = ctx.createLinearGradient(0, drawY, 0, drawY + topFeather);
        gradY.addColorStop(0, "#F4F1EA");
        gradY.addColorStop(0.3, "rgba(244, 241, 234, 0.85)");
        gradY.addColorStop(1, "rgba(244, 241, 234, 0)");
        ctx.fillStyle = gradY;
        ctx.fillRect(0, Math.round(drawY), width, Math.round(topFeather));
      }
    }

    ctx.restore();
  }, []);

  // 2. PRELOAD FRAMES (Progressive priority loading)
  useEffect(() => {
    let isCancelled = false;

    const loadSingleFrame = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (imagesRef.current[index]) {
          return resolve(imagesRef.current[index]!);
        }
        const img = new Image();
        const padIndex = String(index).padStart(3, "0");
        img.src = `/act1-frames/frame_${padIndex}.webp`;
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index] = img;
            setLoadedCount((c) => c + 1);
            if (index === 0) {
              setInitialLoaded(true);
              drawFrame(0);
            }
            resolve(img);
          }
        };
        img.onerror = (err) => reject(err);
      });
    };

    // Priority 1: Load Frame 0 immediately
    loadSingleFrame(0).then(() => {
      if (isCancelled) return;
      drawFrame(0);

      // Priority 2: Milestone frames (every 4th frame for immediate 30fps scrub fidelity)
      const milestones: number[] = [];
      for (let i = 4; i < TOTAL_FRAMES; i += 4) milestones.push(i);
      if (!milestones.includes(TOTAL_FRAMES - 1)) milestones.push(TOTAL_FRAMES - 1);

      Promise.all(milestones.map((idx) => loadSingleFrame(idx))).then(() => {
        if (isCancelled) return;

        // Priority 3: Remaining frames in idle batches
        const remaining: number[] = [];
        for (let i = 1; i < TOTAL_FRAMES; i++) {
          if (!imagesRef.current[i]) remaining.push(i);
        }

        const BATCH_SIZE = 10;
        let batchPointer = 0;

        const loadNextBatch = () => {
          if (isCancelled || batchPointer >= remaining.length) return;
          const currentBatch = remaining.slice(batchPointer, batchPointer + BATCH_SIZE);
          batchPointer += BATCH_SIZE;

          Promise.all(currentBatch.map((idx) => loadSingleFrame(idx))).then(() => {
            if (!isCancelled) {
              if (window.requestIdleCallback) {
                window.requestIdleCallback(loadNextBatch, { timeout: 80 });
              } else {
                setTimeout(loadNextBatch, 16);
              }
            }
          });
        };

        loadNextBatch();
      });
    });

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  // 3. SCROLL & MOUSE INTERACTION LISTENERS
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = motionQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    motionQuery.addEventListener("change", handleMotionChange);

    let targetProgress = 0;
    let currentProg = 0;

    const handleScroll = () => {
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const maxScroll = track.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const scrolled = -rect.top;
      const prog = Math.min(Math.max(scrolled / maxScroll, 0), 1);
      targetProgress = prog;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let targetMouseX = 0;
    let targetMouseY = 0;
    let curMouseX = 0;
    let curMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetMouseX = nx;
      targetMouseY = ny;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId: number;

    const updateLoop = () => {
      if (prefersReducedMotion) {
        currentProg = targetProgress;
        curMouseX = 0;
        curMouseY = 0;
      } else {
        // Silky smooth inertia damping tuned for Lenis & trackpad scrubbing
        currentProg += (targetProgress - currentProg) * 0.14;
        if (Math.abs(targetProgress - currentProg) < 0.0005) {
          currentProg = targetProgress;
        }
        curMouseX += (targetMouseX - curMouseX) * 0.08;
        curMouseY += (targetMouseY - curMouseY) * 0.08;
      }

      setScrollProgress(currentProg);
      setMousePos({ x: curMouseX, y: curMouseY });

      // Frame mapping: 0 to TOTAL_FRAMES - 1
      const calculatedFrame = Math.min(
        Math.max(Math.floor(currentProg * (TOTAL_FRAMES - 1)), 0),
        TOTAL_FRAMES - 1
      );
      setCurrentFrameIndex(calculatedFrame);

      // Always draw the current frame in the animation loop
      drawFrame(calculatedFrame);

      // Phase identification tuned to 120-frame kinetics
      if (currentProg < 0.20) {
        setPhaseIndex(0); // ARRIVAL (Physical Stillness)
      } else if (currentProg < 0.65) {
        setPhaseIndex(1); // DECOUPLED STRAIN & ASYMMETRY
      } else {
        setPhaseIndex(2); // DECISIVE DOCKING & COHERENT SURGE
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    updateLoop();

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [drawFrame]);

  // Redraw on window resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameIndex);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame, currentFrameIndex]);

  return (
    <div ref={trackRef} className="relative w-full h-[300vh] bg-[#F4F1EA]">
      
      {/* Pinned 100vh Sticky Viewport */}
      <div
        ref={viewportRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-start pt-24 sm:pt-0 sm:justify-center"
      >
        
        {/* Floating Viewport Stage with Smooth Fade Mask & Subtle Ambient Glow */}
        <div
          className="absolute inset-0 w-full h-full block z-0 transition-transform duration-300 ease-out pointer-events-none"
          style={{
            transform: `perspective(1200px) rotateX(${mousePos.y * -2.0}deg) rotateY(${mousePos.x * 2.5}deg) scale(1.006)`,
          }}
        >
          {/* HTML5 High-DPI Canvas Scrubber */}
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            aria-label="Vistar Precision Photorealistic Instrument 4K Scrub Sequence"
          />

          {/* Fallback Base Image (Guarantees zero flash of unstyled content on instant mount) */}
          {!initialLoaded && (
            <img
              src="/act1-frames/frame_000.webp"
              alt="Vistar Precision Hardware Core"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90"
            />
          )}

          {/* Ambient Warm Studio Copper Rim Underglow */}
          <div
            className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 w-[75%] max-w-5xl h-24 sm:h-36 rounded-full blur-[72px] sm:blur-[100px] -z-10 pointer-events-none transition-all duration-700"
            style={{
              backgroundColor: phaseIndex === 2 ? "rgba(184, 115, 51, 0.32)" : "rgba(184, 115, 51, 0.16)",
              opacity: phaseIndex === 2 ? 0.95 : 0.7,
            }}
          />
        </div>

        {/* Editorial Narrative Overlay (Authored single frame with generous negative space) */}
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 sm:px-12 md:px-16 pointer-events-none">
          <div className="max-w-xl">
            
            {/* Phase 01: Arrival & Physical Stillness (0% -> 22%) */}
            {phaseIndex === 0 && (
              <div className="space-y-4 sm:space-y-6 transition-all duration-700 pointer-events-auto">
                <div className="inline-flex items-center gap-2 border border-[#151515] bg-[#F4F1EA] px-2.5 sm:px-3 py-1 rounded text-[8px] sm:text-[9px] font-mono font-bold tracking-[2px] uppercase text-[#151515] shadow-[2px_2px_0px_#B87333]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B87333]" />
                  MAKE WORK DISAPPEAR // SYSTEMS ARCHITECTURE
                </div>

                <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-[4.75rem] uppercase tracking-tight text-[#151515] leading-[0.94]">
                  We build the <br />
                  <span className="text-[#F4F1EA] bg-[#151515] px-2 py-0.5 border border-[#151515] shadow-[3px_3px_0px_#B87333] inline-block my-1">
                    systems
                  </span>
                  <br />
                  your business <br />
                  <span className="font-serif italic font-normal text-stone-500 lowercase text-2xl sm:text-4xl block mt-0.5 sm:mt-1">
                    runs on.
                  </span>
                </h1>

                <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed max-w-sm sm:max-w-md">
                  Websites. Web applications. Workflow automations. AI systems. Engineered as one unified technological engine. Zero templates. 100% client source-code ownership.
                </p>

                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                  <Link
                    href="/contact"
                    onClick={() => playTickSound()}
                    className="bg-[#B87333] text-[#F4F1EA] font-mono font-bold text-[10px] sm:text-[11px] tracking-widest uppercase px-5 py-3 sm:px-7 sm:py-3.5 rounded border border-[#151515] shadow-[3px_3px_0px_#151515] hover:bg-[#8C542C] hover:shadow-[5px_5px_0px_#151515] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all interactive"
                  >
                    START A BUILD →
                  </Link>
                  <Link
                    href="/work"
                    onClick={() => playTickSound()}
                    className="bg-[#F4F1EA] text-[#151515] font-mono font-bold text-[10px] sm:text-[11px] tracking-widest uppercase px-5 py-3 sm:px-7 sm:py-3.5 rounded border border-[#151515] shadow-[3px_3px_0px_#151515] hover:bg-[#D8D3C9] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all interactive"
                  >
                    EXPLORE WORK →
                  </Link>
                </div>

                <div className="pt-2 sm:pt-4 flex items-center gap-2 sm:gap-3 text-[8px] sm:text-[9px] font-mono tracking-widest uppercase text-zinc-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B87333] animate-pulse" />
                  SCROLL TO INITIATE SYSTEM TRANSFORMATION ↓
                </div>
              </div>
            )}

            {/* Phase 02: Strain & Imbalance (22% -> 68%) */}
            {phaseIndex === 1 && (
              <div className="space-y-4 sm:space-y-6 transition-all duration-700 pointer-events-auto">
                <div className="inline-flex items-center gap-2 border border-[#151515] bg-[#F4F1EA] px-2.5 sm:px-3 py-1 rounded text-[8px] sm:text-[9px] font-mono font-bold tracking-[2px] uppercase text-[#151515] shadow-[2px_2px_0px_#8C542C]">
                  <span>02 // THE DECOUPLED REALITY</span>
                </div>

                <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#151515] leading-[0.96]">
                  Your business <br />
                  shouldn&apos;t run on <br />
                  <span className="line-through decoration-[#B87333] decoration-2 text-zinc-600">
                    disconnected
                  </span> <br />
                  tools.
                </h2>

                <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed max-w-sm sm:max-w-md">
                  When software is siloed, humans become the glue. Data leaks across unaligned boundaries. Operations stall under manual copy-pasting, brittle webhooks, and delayed reconciliation.
                </p>

                <div className="pt-1 sm:pt-2 text-[8px] sm:text-[9px] font-mono tracking-widest uppercase text-zinc-500">
                  SCROLL TO CLOSE TOLERANCES ↓
                </div>
              </div>
            )}

            {/* Phase 03: Decisive Mechanical Closure (68% -> 100%) */}
            {phaseIndex === 2 && (
              <div className="space-y-4 sm:space-y-6 transition-all duration-700 pointer-events-auto">
                <div className="inline-flex items-center gap-2 border border-[#151515] bg-[#F4F1EA] px-2.5 sm:px-3 py-1 rounded text-[8px] sm:text-[9px] font-mono font-bold tracking-[2px] uppercase text-[#151515] shadow-[2px_2px_0px_#B87333]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B87333]" />
                  03 // THE UNIFIED ENGINE
                </div>

                <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#151515] leading-[0.96]">
                  One connected <br />
                  <span className="text-[#F4F1EA] bg-[#151515] px-2 py-0.5 border border-[#151515] shadow-[3px_3px_0px_#B87333] inline-block my-1">
                    technological
                  </span> <br />
                  machine.
                </h2>

                <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed max-w-sm sm:max-w-md">
                  We replace fragile band-aids with custom, monolithic technological infrastructure. Components physically locked into alignment. Coherent optical circuits active.
                </p>

                <div className="pt-1 sm:pt-2 text-[8px] sm:text-[9px] font-mono tracking-widest uppercase text-zinc-500">
                  CONTINUE SCROLLING TO EXPLORE THE SYSTEMS ↓
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Technical Telemetry Markers (Inspired by Pinterest Reference HUD) */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-12 hidden lg:flex items-center gap-3 text-[9px] font-mono tracking-widest uppercase text-zinc-400 select-none pointer-events-none">
          <span>( VISTAR_APERTURE )</span>
          <span className="text-zinc-300">/</span>
          <span className="text-black font-bold">
            {phaseIndex === 2 ? "( STATE_B )" : "( STATE_A )"}
          </span>
          <span className="text-zinc-300">/</span>
          <span>[ {String(currentFrameIndex + 1).padStart(3, "0")} / {TOTAL_FRAMES} ]</span>
        </div>

        {/* Global Film Progress Strip */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-20 select-none pointer-events-none">
          <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest -rotate-90 origin-center mb-4">
            ACT I // {Math.round(scrollProgress * 100)}%
          </span>
          <div className="w-0.5 h-28 bg-black/10 rounded-full overflow-hidden">
            <div
              className="w-full bg-black rounded-full transition-all duration-75"
              style={{ height: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <span className="font-mono text-[8px] font-bold text-zinc-400">
            0{phaseIndex + 1}
          </span>
        </div>

      </div>

    </div>
  );
}
