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

// Exact Rive slide sequence in public/home_hero.riv
const PERSONAS: PersonaInfo[] = [
  {
    id: 0,
    role: "Growth & Lifecycle Director",
    metric: "11x",
    metricLabel: "Click-Through Rate",
    quote: "Create 6,000 hyper-personalized emails within minutes",
    badgeColor: "#3B82F6",
  },
  {
    id: 1,
    role: "Demand Generation Lead",
    metric: "+35%",
    metricLabel: "Pipeline Growth",
    quote: "Scale a launch campaign into 8 markets, within days",
    badgeColor: "#FF3823",
  },
  {
    id: 2,
    role: "Content Marketing Lead",
    metric: "+67%",
    metricLabel: "Organic Traffic",
    quote: "Optimize 2,000 web pages for search, instantly",
    badgeColor: "#10B981",
  },
  {
    id: 3,
    role: "Product Marketing Lead",
    metric: "+22%",
    metricLabel: "Organic Revenue",
    quote: "Bulk create 5,000 retail product pages within hours",
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

  // Advance to next slide in state machine
  const advanceToNext = useCallback(() => {
    if (!nextSlideRef.current || isAnimatingRef.current) return;
    try {
      isAnimatingRef.current = true;
      nextSlideRef.current.fire();
      currentSlideRef.current = (currentSlideRef.current + 1) % PERSONAS.length;
      playClick(1050, 0.03);
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 2000);
    } catch (_) {
      isAnimatingRef.current = false;
    }
  }, []);

  // Initialize Rive instance using @rive-app/canvas matching Jasper.ai production embed
  const initRive = useCallback(async () => {
    if (!canvasRef.current) return;

    try {
      const riveModule = await import("@rive-app/canvas");
      const Rive = riveModule.Rive || (riveModule as any).default?.Rive || (window as any).rive?.Rive;
      const Layout = riveModule.Layout || (riveModule as any).default?.Layout || (window as any).rive?.Layout;
      const Fit = riveModule.Fit || (riveModule as any).default?.Fit || (window as any).rive?.Fit;
      const Alignment = riveModule.Alignment || (riveModule as any).default?.Alignment || (window as any).rive?.Alignment;

      if (!Rive) return;

      const isMobile = window.innerWidth < 992;
      const artboard = isMobile ? "home_hero_mobile" : "home_hero";

      // Fit.Cover matches Jasper production embed (hero_main_rive_wrap with aspect-ratio: 14.4 / 4.2)
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

              // Clear any previous timers before setting new ones
              initialTimersRef.current.forEach((t) => clearTimeout(t));
              initialTimersRef.current = [];

              // Advance to Redhead man (+35% Pipeline) to match exact reference media_1790471003677.png
              const t1 = setTimeout(() => {
                if (nextSlide) {
                  nextSlide.fire();
                  const t2 = setTimeout(() => {
                    if (nextSlide) {
                      nextSlide.fire();
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
    /* ── EXACT JASPER PRODUCTION RIVE WRAPPER (aspect-ratio: 14.4 / 4.2, width: 100%) ── */
    <div
      ref={containerRef}
      onClick={advanceToNext}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full aspect-[674/410] md:aspect-[14.4/4.2] cursor-pointer overflow-hidden block select-none"
      title="Hover grid to depress keys • Click to cycle persona"
    >
      {/* Loading Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-[#FF3823] animate-ping" />
            <span>Loading Jasper Interactive Stage...</span>
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
  );
}

export default JasperInteractiveHero;
