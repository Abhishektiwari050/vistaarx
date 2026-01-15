"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

export const ExplosionText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chars = text.split("");

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial explosion
      tl.from(".explosion-char", {
        scale: 0,
        rotation: () => Math.random() * 720 - 360,
        x: () => Math.random() * 400 - 200,
        y: () => Math.random() * 400 - 200,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.02,
      });

      // Settle animation
      tl.to(".explosion-char", {
        rotation: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.01,
      }, "-=0.8");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`inline-flex ${className}`}>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className="explosion-char inline-block"
          whileHover={{
            scale: 1.5,
            rotate: 360,
            color: "#ccff00",
            transition: { duration: 0.3 },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};
