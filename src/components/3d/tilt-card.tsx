"use client";

import React, { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt angle in degrees. Default 10 */
  intensity?: number;
}

export function TiltCard({ children, className = "", intensity = 10 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [glareOpacity, setGlareOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates to range [-1, 1] relative to center
    const xNorm = (x / rect.width) * 2 - 1;
    const yNorm = (y / rect.height) * 2 - 1;

    // We invert Y so moving mouse up tilts top towards us
    setRotateX(-yNorm * intensity);
    setRotateY(xNorm * intensity);
    
    // Position the radial gradient glare directly under the cursor
    setGlareX((x / rect.width) * 100);
    setGlareY((y / rect.height) * 100);
    setGlareOpacity(0.4); // Stronger glare for glassmorphism
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlareOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transform-gpu transition-all duration-300 ease-out ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${glareOpacity > 0 ? '10px' : '0px'})`,
      }}
    >
      {/* Glare layer - provides that physical glass shine */}
      <div 
        className="absolute inset-0 z-50 pointer-events-none transition-opacity duration-300 rounded-[inherit] overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`,
          opacity: glareOpacity,
          mixBlendMode: "screen",
        }}
      />
      {children}
    </div>
  );
}
