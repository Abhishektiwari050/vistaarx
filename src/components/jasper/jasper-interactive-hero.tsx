"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { playClick } from "@/lib/sound";

interface CapabilityItem {
  id: number;
  number: string;
  role: string;
  metric: string;
  metricLabel: string;
  badgeColor: string;
  description: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 0,
    number: "01",
    role: "Lead Capture & WhatsApp Bots",
    metric: "< 10s",
    metricLabel: "Lead Response Time",
    badgeColor: "#22C55E",
    description: "Automated ingestion from IndiaMART, JustDial & web forms to WhatsApp & CRM",
  },
  {
    id: 1,
    number: "02",
    role: "Custom Next.js Web Apps",
    metric: "14 Days",
    metricLabel: "Production Sprint",
    badgeColor: "#3B82F6",
    description: "Full-stack web portals delivered with typed schemas & zero SaaS seat taxes",
  },
  {
    id: 2,
    number: "03",
    role: "Spatial WebGL & 3D Web",
    metric: "60 FPS",
    metricLabel: "In-Browser WebGL",
    badgeColor: "#F59E0B",
    description: "High-density architectural walkthroughs & interactive 3D spatial models",
  },
  {
    id: 3,
    number: "04",
    role: "100% Source Code Sovereignty",
    metric: "100%",
    metricLabel: "Private Git Transfer",
    badgeColor: "#FF3823",
    description: "Full private GitHub repo handover with bilateral NDA & 30-day bug warranty",
  },
  {
    id: 4,
    number: "05",
    role: "Internal Operations Portals",
    metric: "Zero Fee",
    metricLabel: "No SaaS Seat Tax",
    badgeColor: "#8B5CF6",
    description: "Custom dispatch, billing, and operational cockpits running in your own cloud",
  },
  {
    id: 5,
    number: "06",
    role: "Deterministic AI Workflows",
    metric: "99.8%",
    metricLabel: "Triage Accuracy",
    badgeColor: "#06B6D4",
    description: "Structured multi-agent graphs with strict schemas and zero hallucination drift",
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

      {/* ── CONTINUOUS INFINITE CAPABILITY MARQUEE TICKER ── */}
      <div className="relative w-full overflow-hidden bg-white border-t border-black/[0.08] py-3 sm:py-3.5 select-none">
        {/* Left & Right Smooth Edge Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Marquee Track with Duplicate for Seamless Infinite Loop */}
        <div
          className="flex shrink-0 items-center gap-2.5 sm:gap-3.5 hover:[animation-play-state:paused]"
          style={{
            animation: "marquee-scroll 30s linear infinite",
            width: "max-content",
          }}
        >
          {/* Loop A */}
          {CAPABILITIES.map((cap, idx) => (
            <div
              key={`cap-a-${cap.id}-${idx}`}
              onClick={(e) => {
                e.stopPropagation();
                advanceToNext();
              }}
              className="group flex flex-col justify-between p-2.5 sm:p-3 w-[260px] sm:w-[290px] rounded-lg border border-black/[0.07] bg-[#FAF9F5] hover:bg-white hover:border-black/[0.18] hover:shadow-xs transition-all duration-150 cursor-pointer text-left shrink-0"
              title="Click to cycle 3D stage"
            >
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5E605D]">
                  {cap.number} // CAPABILITY
                </span>
                <span
                  className="text-[11px] font-bold font-mono px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: `${cap.badgeColor}15`,
                    color: cap.badgeColor,
                  }}
                >
                  {cap.metric}
                </span>
              </div>
              <div className="text-xs sm:text-[13px] font-medium text-[#141413] tracking-tight group-hover:text-black transition-colors truncate">
                {cap.role}
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#5E605D] truncate mt-0.5">
                {cap.description}
              </div>
            </div>
          ))}

          {/* Loop B (Duplicate for seamless continuous loop) */}
          {CAPABILITIES.map((cap, idx) => (
            <div
              key={`cap-b-${cap.id}-${idx}`}
              onClick={(e) => {
                e.stopPropagation();
                advanceToNext();
              }}
              className="group flex flex-col justify-between p-2.5 sm:p-3 w-[260px] sm:w-[290px] rounded-lg border border-black/[0.07] bg-[#FAF9F5] hover:bg-white hover:border-black/[0.18] hover:shadow-xs transition-all duration-150 cursor-pointer text-left shrink-0"
              title="Click to cycle 3D stage"
            >
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5E605D]">
                  {cap.number} // CAPABILITY
                </span>
                <span
                  className="text-[11px] font-bold font-mono px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: `${cap.badgeColor}15`,
                    color: cap.badgeColor,
                  }}
                >
                  {cap.metric}
                </span>
              </div>
              <div className="text-xs sm:text-[13px] font-medium text-[#141413] tracking-tight group-hover:text-black transition-colors truncate">
                {cap.role}
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#5E605D] truncate mt-0.5">
                {cap.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JasperInteractiveHero;
