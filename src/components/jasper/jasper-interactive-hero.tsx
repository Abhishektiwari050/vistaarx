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
    role: "Lead Capture & WhatsApp Bots",
    metric: "< 10s",
    metricLabel: "Lead Response Time",
    quote: "Automated ingestion from IndiaMART, JustDial, and web forms to WhatsApp & CRM",
    badgeColor: "#22C55E",
  },
  {
    id: 1,
    role: "Custom Next.js Web Apps",
    metric: "14 Days",
    metricLabel: "Production Sprint",
    quote: "Fast full-stack web applications and portals delivered with typed schemas",
    badgeColor: "#3B82F6",
  },
  {
    id: 2,
    role: "Spatial WebGL & 3D Web",
    metric: "60 FPS",
    metricLabel: "In-Browser WebGL",
    quote: "High-density architectural walkthroughs and interactive spatial models (3axis Arc)",
    badgeColor: "#F59E0B",
  },
  {
    id: 3,
    role: "100% Source Code Sovereignty",
    metric: "100%",
    metricLabel: "Private Git Transfer",
    quote: "Full private GitHub repo handover with bilateral NDA and 30-day bug warranty",
    badgeColor: "#FF3823",
  },
];

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
        stateMachines: [artboard, "State Machine 1"],
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
                      setActiveSlide(1);
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

      {/* ── BOTTOM CAPABILITY SELECTOR BUTTONS ── */}
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
