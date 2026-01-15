"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function SmoothScroll({ children, speed = 1, className = "" }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(window, {
        scrollTo: { y: 0 },
        duration: 0,
      });

      gsap.to(containerRef.current, {
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: speed,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export function smoothScrollTo(target: string | number, duration = 1) {
  gsap.to(window, {
    scrollTo: target,
    duration,
    ease: "power2.inOut",
  });
}

export function useSmoothScroll() {
  return {
    scrollTo: smoothScrollTo,
  };
}
