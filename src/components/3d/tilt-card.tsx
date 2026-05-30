"use client";

import React, { useRef, useCallback } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt angle in degrees. Default 10 */
  intensity?: number;
}

/**
 * High-performance tilt card — uses refs + direct DOM manipulation
 * instead of 5x useState to avoid re-renders on every mouse move.
 */
export function TiltCard({ children, className = "", intensity = 10 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const glare = glareRef.current;
      if (!card || !glare) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xNorm = (x / rect.width) * 2 - 1;
      const yNorm = (y / rect.height) * 2 - 1;

      const rotateX = -yNorm * intensity;
      const rotateY = xNorm * intensity;

      card.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`;
      glare.style.opacity = "0.4";
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    card.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    glare.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transform-gpu transition-transform duration-300 ease-out ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glare layer — physical glass shine */}
      <div
        ref={glareRef}
        className="absolute inset-0 z-50 pointer-events-none transition-opacity duration-300 rounded-[inherit] overflow-hidden"
        style={{ opacity: 0, mixBlendMode: "screen" }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
