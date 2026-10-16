"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { playClick } from "@/lib/sound";

export function JasperInteractiveHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const riveInstanceRef = useRef<any>(null);
  const nextSlideRef = useRef<any>(null);
  const mouseXRef = useRef<any>(null);
  const currentSlideRef = useRef<number>(1);
  const isAnimatingRef = useRef<boolean>(false);
  const initialTimersRef = useRef<NodeJS.Timeout[]>([]);

  const [loaded, setLoaded] = useState(false);

  // Advance to next slide in state machine
  const advanceToNext = useCallback(() => {
    if (!nextSlideRef.current || isAnimatingRef.current) return;
    try {
      isAnimatingRef.current = true;
      nextSlideRef.current.fire();
      currentSlideRef.current = (currentSlideRef.current + 1) % 4;
      playClick(1050, 0.03);
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 1500);
    } catch (_) {
      isAnimatingRef.current = false;
    }
  }, []);

  // Initialize Rive instance using @rive-app/canvas matching Jasper production embed
  const initRive = useCallback(async () => {
    if (!canvasRef.current) return;

    try {
      const riveModule: any = await import("@rive-app/canvas");
      const Rive = riveModule.Rive || (riveModule as any).default?.Rive || (window as any).rive?.Rive;
      const Layout = riveModule.Layout || (riveModule as any).default?.Layout || (window as any).rive?.Layout;
      const Fit = riveModule.Fit || (riveModule as any).default?.Fit || (window as any).rive?.Fit;
      const Alignment = riveModule.Alignment || (riveModule as any).default?.Alignment || (window as any).rive?.Alignment;

      if (!Rive) {
        setLoaded(true);
        return;
      }

      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const artboard = isMobile ? "home_hero_mobile" : "home_hero";

      const layout = new Layout({
        fit: Fit.Cover,
        alignment: Alignment.Center,
      });

      const r = new Rive({
        src: "/home_hero.riv",
        canvas: canvasRef.current,
        artboard: artboard,
        stateMachines: [artboard],
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
            const smNames = r.stateMachineNames || [];
            const activeSM = smNames.find((n: string) => n === artboard) || smNames[0] || artboard;
            const inputs = r.stateMachineInputs(activeSM);

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

              // Auto advance initial slide to match reference
              const t1 = setTimeout(() => {
                if (nextSlide) {
                  nextSlide.fire();
                  const t2 = setTimeout(() => {
                    if (nextSlide) {
                      nextSlide.fire();
                    }
                  }, 2000);
                  initialTimersRef.current.push(t2);
                }
              }, 1000);
              initialTimersRef.current.push(t1);
            }
          } catch (err) {
            console.warn("Rive state machine inputs notice:", err);
          }

          setLoaded(true);
        },
        onLoadError: (e: any) => {
          console.error("Rive canvas load error:", e);
          setLoaded(true);
        },
      });
    } catch (e) {
      console.error("Failed to construct Rive instance:", e);
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    initRive();

    // Fallback: If Rive WASM hasn't signaled load within 2s, force reveal canvas so it never hangs
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
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
      {/* ── EXACT JASPER PRODUCTION RIVE WRAPPER (aspect-ratio: 14.4 / 4.2) ── */}
      <div
        ref={containerRef}
        onClick={advanceToNext}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative w-full aspect-[674/410] md:aspect-[14.4/4.2] cursor-pointer overflow-hidden block select-none bg-[#FAF9F5]"
        title="Hover grid to depress keys • Click to cycle persona"
      >
        {/* Sleek Loading Skeleton (never blocks forever) */}
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
    </div>
  );
}

export default JasperInteractiveHero;
