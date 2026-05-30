"use client";

import React, { Suspense, useEffect, useCallback, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { useScrollStore, getThemeColors } from "@/lib/stores/scroll-store";
import { Logo3D } from "./logo-component";
import { WatercolorShower } from "./watercolor-shower";
import { getLogoRotationZ, getArrowActivation } from "@/lib/utils/scroll-utils";

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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
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
  const route = useScrollStore((s) => s.activeRoute);
  const theme = useScrollStore((s) => s.theme);
  const colors = getThemeColors();

  const isHomepage = route === "/";
  const isVectors = route === "/vectors";
  
  let targetX = 0;
  let targetY = 0;
  let targetScale = 1.0;

  // Replicate the exact homepage glide & scale transitions of the 3D Logo
  if (isHomepage) {
    if (scroll <= 0.10) {
      targetX = 0;
      targetY = 0;
      targetScale = 1.6;
    } else if (scroll > 0.10 && scroll <= 0.20) {
      const t = (scroll - 0.10) / 0.10;
      const ease = t * t * (3 - 2 * t);
      // Remap 3D positions to 2D screen coordinate pixels (approx 65px per units)
      targetX = ease * 143; 
      targetY = ease * 32.5;
      targetScale = 1.6 - ease * 0.85;
    } else if (scroll > 0.20 && scroll <= 0.30) {
      targetX = 143;
      targetY = 32.5;
      targetScale = 0.75;
    } else if (scroll > 0.30 && scroll <= 0.40) {
      const t = (scroll - 0.30) / 0.10;
      const ease = t * t * (3 - 2 * t);
      targetX = 143 - ease * 286;
      targetY = 32.5 - ease * 65;
      targetScale = 0.75 + ease * 0.10;
    } else if (scroll > 0.40 && scroll <= 0.60) {
      targetX = -143;
      targetY = -32.5;
      targetScale = 0.85;
    } else if (scroll > 0.60 && scroll <= 0.70) {
      const t = (scroll - 0.60) / 0.10;
      const ease = t * t * (3 - 2 * t);
      targetX = -143 + ease * 143;
      targetY = -32.5 + ease * 32.5;
      targetScale = 0.85 + ease * 0.35;
    } else if (scroll > 0.70 && scroll <= 0.80) {
      targetX = 0;
      targetY = 0;
      targetScale = 1.2;
    } else if (scroll > 0.80 && scroll <= 0.90) {
      const t = (scroll - 0.80) / 0.10;
      const ease = t * t * (3 - 2 * t);
      targetX = 0;
      targetY = ease * 156;
      targetScale = 1.2 - ease * 0.65;
    } else {
      targetX = 0;
      targetY = 156;
      targetScale = 0.55;
    }
  } else if (route === "/philosophy") {
    targetX = 136;
    targetY = -scroll * 78;
    targetScale = 0.85;
  } else if (route === "/work") {
    targetX = -136;
    targetY = 26;
    targetScale = 0.85;
  } else if (route === "/contact") {
    targetX = 0;
    targetY = 0;
    targetScale = 1.1;
  }

  // Unified snapped rotation in degrees
  const rotRad = getLogoRotationZ(scroll);
  let rotationZ = (rotRad * 180) / Math.PI;

  if (!isHomepage && !isVectors) {
    // Elegant slow idle Z spin elsewhere
    rotationZ = scroll * 120;
  }

  // Symmetrical CSS Parallax tilt
  const tiltX = cursorY * 12;
  const tiltY = cursorX * 12;

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
          transform: `translate3d(${targetX}px, ${targetY}px, 0) scale(${targetScale}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
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
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
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
            const act = getArrowActivation(idx, scroll);
            
            // Replicate standard expansion vs deep-dive snaps
            let finalDist = 0;
            let finalScale = 1.0;
            let finalOpacity = 1.0;

            if (isHomepage) {
              const isUpArrowAtHero = (idx === 0 && scroll <= 0.10);
              const isUpArrowAtContact = (idx === 0 && scroll >= 0.90);
              const isRightArrowAtManifesto = (idx === 3 && scroll > 0.20 && scroll <= 0.30);
              const isDownArrowAtServices = (idx === 2 && scroll > 0.40 && scroll <= 0.60);
              const isLeftArrowAtCaseStudies = (idx === 1 && scroll > 0.70 && scroll <= 0.80);

              const isHighlighted = isUpArrowAtHero || isUpArrowAtContact || isRightArrowAtManifesto || isDownArrowAtServices || isLeftArrowAtCaseStudies;

              finalDist = isHighlighted ? 35 : (scroll > 0.30 && scroll <= 0.60 ? 20 : 0);
              finalScale = isHighlighted ? 1.25 : (scroll > 0.30 && scroll <= 0.60 ? 0.75 : 1.0);
              finalOpacity = isHighlighted ? 1.0 : (scroll > 0.30 && scroll <= 0.60 ? 0.25 : 0.8);
            } else if (isVectors) {
              const standardDist = 25;
              const showcaseDist = act * 42 + (1.0 - act) * 8;
              const showcaseFactor = 1.0; // Locked in vectors showcase
              finalDist = standardDist * (1 - showcaseFactor) + showcaseDist * showcaseFactor;

              const standardScale = 1.0;
              const showcaseScale = act * 1.35 + (1.0 - act) * 0.75;
              finalScale = standardScale * (1 - showcaseFactor) + showcaseScale * showcaseFactor;

              const standardOpacity = 1.0;
              const showcaseOpacity = act * 1.0 + (1.0 - act) * 0.25;
              finalOpacity = standardOpacity * (1 - showcaseFactor) + showcaseOpacity * showcaseFactor;
            }

            const isActive = act > 0.5 || (isHomepage && finalOpacity > 0.9);
            const angle = idx === 0 ? 0 : idx === 1 ? 90 : idx === 2 ? 180 : 270;

            return (
              <g
                key={idx}
                transform={`rotate(${angle}) translate(0, ${-finalDist}) scale(${finalScale})`}
                style={{
                  transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                  opacity: finalOpacity,
                }}
              >
                {/* Offset flat 2D shadow */}
                <path
                  d="M -22 15 L 22 15 L 0 -22 Z"
                  fill={theme === 'cyber-dark' ? '#ff0080' : theme === 'solar' ? '#ff5500' : '#000000'}
                  transform="translate(4, 4)"
                  style={{ opacity: isActive ? 1.0 : 0.4 }}
                />
                {/* Main comic arrowhead with thick black border */}
                <path
                  d="M -22 15 L 22 15 L 0 -22 Z"
                  fill="url(#arrow-grad-fallback)"
                  stroke={theme === 'solar' ? '#100501' : '#000000'}
                  strokeWidth="3"
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
  const showerTrigger = useScrollStore((s) => s.showerTrigger);
  const [canvasZIndex, setCanvasZIndex] = useState(-5);

  useEffect(() => {
    if (showerTrigger > 0) {
      setCanvasZIndex(998);
      const timer = setTimeout(() => {
        setCanvasZIndex(-5);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [showerTrigger]);

  useEffect(() => {
    try {
      // 1. Progressive Enhancement Hardware Check
      // We check hardware concurrency (CPU cores) and device memory (RAM in GB)
      // Low-end mobile devices usually have <= 4 cores or <= 4GB RAM.
      // WebGL runs poorly on them and stalls initial loading.
      const isLowEnd = 
        (typeof navigator !== "undefined" && 
          ((navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
           // @ts-expect-error - deviceMemory is experimental but standard in Chrome/Android
           (navigator.deviceMemory && navigator.deviceMemory < 4)));

      if (isLowEnd) {
        console.warn("Low-end hardware detected. Enforcing lightweight SVG 2D layout fallback to secure fast page loads.");
        Promise.resolve().then(() => {
          setWebglSupported(false);
        });
        return;
      }

      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      const supported = !!gl;
      Promise.resolve().then(() => {
        setWebglSupported(supported);
      });
    } catch {
      Promise.resolve().then(() => {
        setWebglSupported(false);
      });
    }
  }, []);

  if (webglSupported === null) {
    return null; // Prevents Next.js dynamic hydration mismatch
  }

  let themeBg = "bg-[#08080c] halftone-dots-white text-white";
  if (theme === "cyber-light") {
    themeBg = "bg-[#fdfbf7] halftone-dots text-neutral-900";
  } else if (theme === "cyber-dark") {
    themeBg = "bg-[#08080c] halftone-dots-white text-white";
  } else if (theme === "mono") {
    themeBg = "bg-white halftone-dots text-neutral-900";
  } else if (theme === "solar") {
    themeBg = "bg-[#fcf6e8] halftone-dots text-[#100501]";
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
            zIndex: canvasZIndex,
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
            <directionalLight position={[0, 5, -2]} intensity={0.8} color="#ff0080" />

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
