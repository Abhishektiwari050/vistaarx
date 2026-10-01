"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { playClick } from "@/lib/sound";

interface PersonaInfo {
  id: number;
  role: string;
  metric: string;
  metricLabel: string;
  quote: string;
  badgeColor: string;
}

// VISTAR engineering capabilities matching the 4 interactive canvas states
const PERSONAS: PersonaInfo[] = [
  {
    id: 0,
    role: "Aviation & Mission-Critical Telemetry",
    metric: "<45ms",
    metricLabel: "Situational Latency",
    quote: "Render real-time airspace NOTAM vectors and GIS threat perimeters",
    badgeColor: "#3B82F6",
  },
  {
    id: 1,
    role: "Autonomous Multi-Agent Detection",
    metric: "99.8%",
    metricLabel: "Agentic Precision",
    quote: "Execute multi-step telemetry ingestion and unsupervised anomaly routing",
    badgeColor: "#FF3823",
  },
  {
    id: 2,
    role: "Spatial WebGL & 3D Architecture",
    metric: "60 FPS",
    metricLabel: "Edge Canvas TTFB",
    quote: "High-density architectural perspective transformations directly in-browser",
    badgeColor: "#10B981",
  },
  {
    id: 3,
    role: "Sovereign Enterprise Runtime",
    metric: "100%",
    metricLabel: "Repository Ownership",
    quote: "Private VPC perimeter deployment with day-one source code handover",
    badgeColor: "#FFB800",
  },
];

export function JasperInteractiveHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const riveInstanceRef = useRef<any>(null);
  const nextSlideRef = useRef<any>(null);
  const mouseXRef = useRef<any>(null);
  const currentSlideRef = useRef<number>(1); // Default to Redhead man (+35% Pipeline)
  const isAnimatingRef = useRef<boolean>(false);
  const initialTimersRef = useRef<NodeJS.Timeout[]>([]);

  const [loaded, setLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(1);

  // Advance to next slide in state machine
  const advanceToNext = useCallback(() => {
    if (!nextSlideRef.current || isAnimatingRef.current) return;
    try {
      isAnimatingRef.current = true;
      nextSlideRef.current.fire();
      currentSlideRef.current = (currentSlideRef.current + 1) % PERSONAS.length;
      setActiveSlide(currentSlideRef.current);
      playClick(1050, 0.03);
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 1500);
    } catch (_) {
      isAnimatingRef.current = false;
    }
  }, []);

  // Jump to specific slide
  const goToSlide = useCallback((targetIndex: number) => {
    if (!nextSlideRef.current || isAnimatingRef.current) return;
    const diff = (targetIndex - currentSlideRef.current + PERSONAS.length) % PERSONAS.length;
    if (diff === 0) return;

    isAnimatingRef.current = true;
    let step = 0;
    const interval = setInterval(() => {
      if (nextSlideRef.current && step < diff) {
        nextSlideRef.current.fire();
        playClick(1000 + step * 50, 0.02);
        step++;
      } else {
        clearInterval(interval);
        currentSlideRef.current = targetIndex;
        setActiveSlide(targetIndex);
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 1200);
      }
    }, 280);
  }, []);

  // Initialize Rive instance using @rive-app/canvas matching Jasper.ai production embed
  const initRive = useCallback(async () => {
    if (!canvasRef.current) return;

    try {
      // @ts-ignore - dynamic import fallback for production build safety
      const riveModule: any = await import("@rive-app/canvas");
      const Rive = riveModule.Rive || (riveModule as any).default?.Rive || (window as any).rive?.Rive;
      const Layout = riveModule.Layout || (riveModule as any).default?.Layout || (window as any).rive?.Layout;
      const Fit = riveModule.Fit || (riveModule as any).default?.Fit || (window as any).rive?.Fit;
      const Alignment = riveModule.Alignment || (riveModule as any).default?.Alignment || (window as any).rive?.Alignment;

      if (!Rive) return;

      const isMobile = window.innerWidth < 992;
      const artboard = isMobile ? "home_hero_mobile" : "home_hero";

      const layout = new Layout({
        fit: Fit.Cover,
        alignment: Alignment.Center,
      });

      const r = new Rive({
        src: "/home_hero.riv",
        canvas: canvasRef.current,
        artboard: artboard,
        stateMachines: artboard,
        layout: layout,
        isTouchScrollEnabled: true,
        autoplay: true,
        onLoad: () => {
          r.resizeDrawingSurfaceToCanvas();
          riveInstanceRef.current = r;
          if (typeof window !== "undefined") {
            (window as any).currentRive = r;
          }

          try {
            const inputs = r.stateMachineInputs(artboard);
            if (inputs) {
              const nextSlide = inputs.find((i: any) => i.name === "next-slide");
              const mouseX = inputs.find((i: any) => i.name === "mouseX");
              nextSlideRef.current = nextSlide;
              mouseXRef.current = mouseX;

              if (mouseX) {
                mouseX.value = 50;
              }

              initialTimersRef.current.forEach((t) => clearTimeout(t));
              initialTimersRef.current = [];

              // Advance to Redhead man (+35% Pipeline) to match exact reference media_1790471003677.png
              const t1 = setTimeout(() => {
                if (nextSlide) {
                  nextSlide.fire();
                  const t2 = setTimeout(() => {
                    if (nextSlide) {
                      nextSlide.fire();
                      setActiveSlide(1);
                    }
                  }, 2200);
                  initialTimersRef.current.push(t2);
                }
              }, 1200);
              initialTimersRef.current.push(t1);
            }
          } catch (err) {
            console.error("Error reading Rive state machine inputs:", err);
          }

          setLoaded(true);
        },
        onLoadError: (e: any) => {
          console.error("Rive canvas load error:", e);
        },
      });
    } catch (e) {
      console.error("Failed to construct Rive instance:", e);
    }
  }, []);

  useEffect(() => {
    initRive();

    return () => {
      initialTimersRef.current.forEach((t) => clearTimeout(t));
      initialTimersRef.current = [];
      if (riveInstanceRef.current) {
        try {
          riveInstanceRef.current.cleanup();
          riveInstanceRef.current = null;
        } catch (_) {}
      }
    };
  }, [initRive]);

  // Handle pointer tracking for keypress / grid depression effect (mouseX 0 to 100)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!mouseXRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    mouseXRef.current.value = percent;
  };

  // Reset pointer on mouse leave
  const handlePointerLeave = () => {
    if (mouseXRef.current) {
      mouseXRef.current.value = 50;
    }
  };

  // Handle window resize with automatic canvas surface recalibration
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (riveInstanceRef.current) {
          riveInstanceRef.current.resizeDrawingSurfaceToCanvas();
        }
      }, 80);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div className="w-full flex flex-col bg-[#FAF9F5] select-none">
      {/* ── 1. TOP INTERACTIVE STATUS HUD ── */}
      <div className="w-full px-4 py-2.5 bg-white/80 border-b border-black/[0.06] flex items-center justify-between text-xs font-mono text-[#5E605D]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-[#141413] tracking-wide text-[11px]">
            INTERACTIVE 3D ISOMETRIC ENGINE
          </span>
          <span className="hidden sm:inline text-neutral-300">|</span>
          <span className="hidden sm:inline text-[11px] text-[#5E605D]">
            60 FPS HARDWARE ACCELERATED
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="hidden md:inline text-neutral-400">
            Hover keys to press &bull; Click to cycle capability
          </span>
          <span className="px-2 py-0.5 rounded bg-black/5 font-semibold text-[#141413]">
            {activeSlide + 1} / 4
          </span>
        </div>
      </div>

      {/* ── 2. EXACT JASPER PRODUCTION RIVE WRAPPER (aspect-ratio: 14.4 / 4.2) ── */}
      <div
        ref={containerRef}
        onClick={advanceToNext}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative w-full aspect-[674/410] md:aspect-[14.4/4.2] cursor-pointer overflow-hidden block select-none bg-[#FAF9F5]"
        title="Hover grid to depress keys • Click to cycle persona"
      >
        {/* Loading Skeleton */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#FAF9F5]">
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-[#FF3823] animate-ping" />
              <span>Loading Interactive 3D Stage...</span>
            </div>
          </div>
        )}

        {/* Live Interactive Rive Canvas */}
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
          className={`w-full h-full block transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* ── 3. BOTTOM CAPABILITY SELECTOR BUTTONS ── */}
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-1.5 p-2.5 sm:p-3 bg-white border-t border-black/[0.08]">
        {PERSONAS.map((p) => {
          const isActive = activeSlide === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(p.id);
              }}
              className={`p-2.5 sm:p-3 rounded-lg text-left transition-all duration-150 cursor-pointer flex flex-col justify-between border ${
                isActive
                  ? "bg-[#FAF9F5] border-[#141413] shadow-xs"
                  : "bg-transparent border-transparent hover:bg-neutral-50 hover:border-black/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5E605D]">
                  0{p.id + 1} // CAPABILITY
                </span>
                <span
                  className="text-xs font-bold font-mono px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: isActive ? `${p.badgeColor}15` : "transparent",
                    color: p.badgeColor,
                  }}
                >
                  {p.metric}
                </span>
              </div>
              <div className="text-xs sm:text-[13px] font-medium text-[#141413] truncate">
                {p.role}
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#5E605D] truncate mt-0.5">
                {p.metricLabel}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default JasperInteractiveHero;
