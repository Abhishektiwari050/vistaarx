"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Disable on touch devices to preserve native 120Hz hardware momentum
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) return;

    // Initialize ultra-responsive desktop momentum scrolling
    const lenis = new Lenis({
      lerp: 0.1, // Responsive damping without artificial lag
      wheelMultiplier: 1.0,
      syncTouch: false,
      smoothWheel: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Harmonize GSAP RAF ticker with Lenis loop for 100% stutter-free rendering
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor link click interceptor
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (element) {
        e.preventDefault();
        lenis.scrollTo(element as HTMLElement, {
          offset: -72,
          duration: 1.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    return () => {
      gsap.ticker.remove(updateTicker);
      document.removeEventListener("click", handleAnchorClick);
      delete (window as unknown as { lenis?: Lenis }).lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
