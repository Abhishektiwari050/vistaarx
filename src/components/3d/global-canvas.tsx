"use client";

import React, { Suspense, useEffect, useCallback, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { useScrollStore, getThemeColors } from "@/lib/stores/scroll-store";
import { Logo3D } from "./logo-component";
import { WatercolorShower } from "./watercolor-shower";

// ─────────────────────────────────────────────────────────────────────────────
// Monotonic snap-rotation math selectors (identical to logo-component)
// ─────────────────────────────────────────────────────────────────────────────

function getLogoRotationZ(progress: number): number {
  if (progress < 0) return -1;
  if (progress > 1.0) return -1;

  // Snaps and transitions (contiguous, monotonic inside [0, 1])
  if (progress <= 0.05) return 0;
  if (progress > 0.05 && progress < 0.22) {
    const t = (progress - 0.05) / (0.22 - 0.05);
    const ease = t * t * (3 - 2 * t);
    return ease * 2.5 * Math.PI; // Spins 360° + quarter turn (2.5 PI) to face Right Arrow
  }
  if (progress >= 0.22 && progress <= 0.30) return 2.5 * Math.PI; // snapped at Right
  if (progress > 0.30 && progress < 0.47) {
    const t = (progress - 0.30) / (0.47 - 0.30);
    const ease = t * t * (3 - 2 * t);
    return 2.5 * Math.PI + ease * 2.5 * Math.PI; // Spins 360° + quarter turn to face Down Arrow
  }
  if (progress >= 0.47 && progress <= 0.55) return 5.0 * Math.PI; // snapped at Down
  if (progress > 0.55 && progress < 0.72) {
    const t = (progress - 0.55) / (0.72 - 0.55);
    const ease = t * t * (3 - 2 * t);
    return 5.0 * Math.PI + ease * 2.5 * Math.PI; // Spins 360° + quarter turn to face Left Arrow
  }
  if (progress >= 0.72 && progress <= 0.80) return 7.5 * Math.PI; // snapped at Left
  if (progress > 0.80 && progress <= 0.95) {
    const t = (progress - 0.80) / (0.95 - 0.80);
    const ease = t * t * (3 - 2 * t);
    return 7.5 * Math.PI + ease * 2.5 * Math.PI; // Spins 360° + quarter turn to face Up Arrow again
  }
  return 10.0 * Math.PI;
}

function getArrowActivation(idx: number, progress: number): number {
  if (idx === 0) { // UP
    if (progress <= 0.08) return 1.0;
    if (progress > 0.08 && progress < 0.15) return 1.0 - (progress - 0.08) / 0.07;
    return 0;
  }
  if (idx === 3) { // RIGHT
    if (progress <= 0.15) return 0;
    if (progress > 0.15 && progress < 0.22) return (progress - 0.15) / 0.07;
    if (progress >= 0.22 && progress <= 0.33) return 1.0;
    if (progress > 0.33 && progress < 0.40) return 1.0 - (progress - 0.33) / 0.07;
    return 0;
  }
  if (idx === 2) { // DOWN
    if (progress <= 0.40) return 0;
    if (progress > 0.40 && progress < 0.47) return (progress - 0.40) / 0.07;
    if (progress >= 0.47 && progress <= 0.58) return 1.0;
    if (progress > 0.58 && progress < 0.65) return 1.0 - (progress - 0.58) / 0.07;
    return 0;
  }
  if (idx === 1) { // LEFT
    if (progress <= 0.65) return 0;
    if (progress > 0.65 && progress < 0.72) return (progress - 0.65) / 0.07;
    if (progress >= 0.72 && progress <= 0.83) return 1.0;
    if (progress > 0.83 && progress < 0.90) return 1.0 - (progress - 0.83) / 0.07;
    return 0;
  }
  return 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// CanvasErrorBoundary — Catches three.js shader or initialization crashes
// ─────────────────────────────────────────────────────────────────────────────

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn("R3F / WebGL crashed. Activating SvgFallbackLogo:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SvgFallbackLogo — Sleek, ultra-fast 2D fallback that reacts identically
// ─────────────────────────────────────────────────────────────────────────────

function SvgFallbackLogo() {
  const scroll = useScrollStore((s) => s.scrollProgress);
  const cursorX = useScrollStore((s) => s.cursorX);
  const cursorY = useScrollStore((s) => s.cursorY);
  const colors = getThemeColors();

  const isDeepDive = scroll >= 0.50 && scroll <= 0.88;
  const deepDiveProgress = isDeepDive ? (scroll - 0.50) / 0.38 : 0;
  
  let targetX = 0;
  let showcaseFactor = 0;

  if (scroll <= 0.15) {
    targetX = 0;
  } else if (scroll > 0.15 && scroll <= 0.35) {
    targetX = 140; // Shift right
  } else if (scroll > 0.35 && scroll <= 0.50) {
    targetX = -140; // Shift left
  } else if (isDeepDive) {
    targetX = 0;
  }

  if (isDeepDive) {
    showcaseFactor = 1.0;
  } else if (scroll > 0.47 && scroll < 0.50) {
    showcaseFactor = (scroll - 0.47) / 0.03;
  } else if (scroll > 0.88 && scroll <= 0.91) {
    showcaseFactor = 1.0 - (scroll - 0.88) / 0.03;
  }

  // Calculate snap rotation
  let rotationZ = scroll * 240; // slow idle spin
  if (isDeepDive) {
    const rotRad = getLogoRotationZ(deepDiveProgress);
    if (rotRad >= 0) {
      rotationZ = (rotRad * 180) / Math.PI;
    }
  }

  // Luxury CSS Parallax tilt
  const tiltX = cursorY * 18;
  const tiltY = cursorX * 18;

  const arrowIndices = [0, 1, 2, 3]; // Up, Left, Down, Right

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: -5,
      }}
    >
      <div
        style={{
          transform: `translate3d(${targetX}px, 0, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.4s cubic-bezier(0.1, 0.8, 0.2, 1.0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "280px",
          height: "280px",
        }}
      >
        <svg
          viewBox="-100 -100 200 200"
          width="100%"
          height="100%"
          style={{
            transform: `rotate(${rotationZ}deg)`,
            transition: isDeepDive ? "transform 0.5s cubic-bezier(0.1, 0.8, 0.2, 1.0)" : "none",
            overflow: "visible",
            filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.15))"
          }}
        >
          <defs>
            <filter id="glow-fallback" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <linearGradient id="arrow-grad-fallback" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={colors.base} />
              <stop offset="100%" stopColor={colors.primary} />
            </linearGradient>
          </defs>

          {arrowIndices.map((idx) => {
            const act = isDeepDive ? getArrowActivation(idx, deepDiveProgress) : 0;
            
            const standardDist = scroll > 0.35 && scroll <= 0.50 ? 25 : 0;
            const showcaseDist = act * 42 + (1.0 - act) * 8;
            const finalDist = standardDist * (1 - showcaseFactor) + showcaseDist * showcaseFactor;

            const standardScale = 1.0;
            const showcaseScale = act * 1.35 + (1.0 - act) * 0.75;
            const finalScale = standardScale * (1 - showcaseFactor) + showcaseScale * showcaseFactor;

            const standardOpacity = 1.0;
            const showcaseOpacity = act * 1.0 + (1.0 - act) * 0.25;
            const finalOpacity = standardOpacity * (1 - showcaseFactor) + showcaseOpacity * showcaseFactor;

            const isActive = isDeepDive && act > 0.5;
            const angle = idx === 0 ? 0 : idx === 1 ? 90 : idx === 2 ? 180 : 270;

            return (
              <g
                key={idx}
                transform={`rotate(${angle}) translate(0, ${-finalDist}) scale(${finalScale})`}
                style={{
                  transition: "transform 0.45s cubic-bezier(0.1, 0.8, 0.2, 1.0)",
                  opacity: finalOpacity,
                }}
              >
                <path
                  d="M -22 15 L 22 15 L 0 -22 Z"
                  fill="url(#arrow-grad-fallback)"
                  stroke={colors.primary}
                  strokeWidth={isActive ? "2.5" : "1"}
                  filter={isActive ? "url(#glow-fallback)" : "none"}
                  style={{
                    transition: "fill 0.3s, stroke 0.3s, stroke-width 0.3s",
                  }}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ScrollTracker — DOM bridge component
// ─────────────────────────────────────────────────────────────────────────────

function ScrollTracker() {
  const setScrollProgress = useScrollStore((s) => s.setScrollProgress);
  const setScrollY = useScrollStore((s) => s.setScrollY);
  const setActiveRoute = useScrollStore((s) => s.setActiveRoute);
  const triggerShower = useScrollStore((s) => s.triggerShower);
  const setLoaded = useScrollStore((s) => s.setLoaded);
  const setCursor = useScrollStore((s) => s.setCursor);
  const pathname = usePathname();

  const lastScrollY = useRef(0);
  const lastTime = useRef(0);
  const velocityTimeout = useRef<NodeJS.Timeout | null>(null);

  // Initial load effect (acts as preloader)
  useEffect(() => {
    // Fire the shower immediately on first mount
    triggerShower();
    
    // The shower takes 1.8s to finish. Let's reveal HTML at 1.4s (as it starts to fade)
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1400);

    return () => clearTimeout(timer);
  }, [triggerShower, setLoaded]);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = docHeight - winHeight;

    const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;

    setScrollProgress(progress);
    setScrollY(scrollY);

    const now = performance.now();
    const dt = now - lastTime.current;
    const dy = scrollY - lastScrollY.current;

    let velocity = 0;
    if (dt > 0) {
      velocity = Math.abs(dy / dt) * 1000;
    }

    if (velocity > 12000) velocity = 12000;
    useScrollStore.getState().setScrollVelocity(velocity);

    lastScrollY.current = scrollY;
    lastTime.current = now;

    if (velocityTimeout.current) clearTimeout(velocityTimeout.current);
    velocityTimeout.current = setTimeout(() => {
      useScrollStore.getState().setScrollVelocity(0);
    }, 150);
  }, [setScrollProgress, setScrollY]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setCursor(x, y);
  }, [setCursor]);

  // Trigger shower on route change
  useEffect(() => {
    setActiveRoute(pathname || "/");
    // We only want to trigger the shower on SUBSEQUENT route changes, not on initial mount.
    // However, the initial mount shower is handled above. 
    // To distinguish, we can just let it fire again if pathname changes later.
    // Actually, on first load `pathname` will trigger this. It's fine to fire triggerShower twice rapidly,
    // the watercolor-shower just resets its timer.
    triggerShower();
    
    // Snap to top
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname, setActiveRoute, triggerShower]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    lastTime.current = performance.now();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleScroll);
      if (velocityTimeout.current) clearTimeout(velocityTimeout.current);
    };
  }, [handleScroll, handleMouseMove]);

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Master 3D WebGL Canvas Layer
// ─────────────────────────────────────────────────────────────────────────────

export function GlobalCanvas() {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const theme = useScrollStore((s) => s.theme);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebglSupported(!!gl);
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  if (webglSupported === null) {
    return null; // Prevents Next.js dynamic hydration mismatch
  }

  let themeBg = "bg-[#050507] text-white";
  if (theme === "cyber-light") {
    themeBg = "bg-[#f5f5f7] text-[#1d1d1f]";
  } else if (theme === "cyber-dark") {
    themeBg = "bg-[#050507] text-white";
  } else if (theme === "mono") {
    themeBg = "bg-[#f9f9f9] text-neutral-900";
  } else if (theme === "solar") {
    themeBg = "bg-[#0b0603] text-orange-50";
  }

  // Gracefully fallback to 2D SVG if WebGL is disabled or unsupported
  if (!webglSupported) {
    return (
      <>
        <ScrollTracker />
        
        {/* Dynamic Theme background layer */}
        <div 
          className="fixed inset-0 transition-colors duration-500 ease-in-out"
          style={{ zIndex: -10, pointerEvents: "none" }}
          aria-hidden="true"
        >
          <div className={`w-full h-full transition-colors duration-500 ease-in-out ${themeBg}`} />
        </div>

        <SvgFallbackLogo />
      </>
    );
  }

  return (
    <>
      <ScrollTracker />

      {/* Dynamic Theme background layer */}
      <div 
        className="fixed inset-0 transition-colors duration-500 ease-in-out"
        style={{ zIndex: -10, pointerEvents: "none" }}
        aria-hidden="true"
      >
        <div className={`w-full h-full transition-colors duration-500 ease-in-out ${themeBg}`} />
      </div>

      <CanvasErrorBoundary fallback={<SvgFallbackLogo />}>
        {/* Fullscreen Fixed Canvas behind elements */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -5,
            pointerEvents: "none",
            backgroundColor: "transparent",
          }}
          aria-hidden="true"
        >
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            dpr={[1, 1.5]} // Performance limit
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            eventSource={undefined}
            style={{ pointerEvents: "none" }}
          >
            <ambientLight intensity={0.5} />
            
            {/* Key lights casting highlights */}
            <directionalLight position={[5, 5, 5]} intensity={1.3} />
            <directionalLight position={[-5, -5, 2]} intensity={0.6} color="#ff0080" />
            <directionalLight position={[0, 5, -2]} intensity={0.8} color="#ccff00" />

            <Suspense fallback={null}>
              <WatercolorShower />
              <Logo3D />
            </Suspense>
          </Canvas>
        </div>
      </CanvasErrorBoundary>
    </>
  );
}

export default GlobalCanvas;
