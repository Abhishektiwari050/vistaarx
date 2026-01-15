"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const HeroAnimation3D = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 3D rotation entrance
      gsap.from(".hero-3d-element", {
        rotationY: 180,
        rotationX: -45,
        scale: 0.5,
        opacity: 0,
        duration: 2,
        ease: "power4.out",
        stagger: 0.2,
      });

      // Floating animation
      gsap.to(".hero-3d-element", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      // Parallax on scroll
      gsap.to(".hero-3d-element", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 200,
        rotationY: 360,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ perspective: "1000px" }}>
      <div className="hero-3d-element" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  );
};
