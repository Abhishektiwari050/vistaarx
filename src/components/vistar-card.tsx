"use client";

import React, { useRef, useState } from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverHighlight?: boolean;
  spotlight?: boolean;
  crosshairs?: boolean;
}

export function Card({
  children,
  className = "",
  hoverHighlight = true,
  spotlight = true,
  crosshairs = false,
  ...props
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !spotlight) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: -100, y: -100 });
      }}
      className={`group relative overflow-hidden border border-[#1A1916]/[0.08] bg-white rounded-xl shadow-[0_2px_12px_rgba(26,25,22,0.03),0_8px_32px_rgba(26,25,22,0.03)] transition-all duration-300 ${
        hoverHighlight ? "hover:border-[#1A1916]/20 hover:shadow-[0_4px_20px_rgba(26,25,22,0.06),0_12px_40px_rgba(27,67,50,0.05)]" : ""
      } ${className}`.trim()}
      {...props}
    >
      {/* Corner Registration Crosshairs */}
      {crosshairs && (
        <>
          <span className="absolute -top-1 -left-1 text-[9px] font-mono text-[#1A1916]/35 pointer-events-none select-none z-10">
            +
          </span>
          <span className="absolute -top-1 -right-1 text-[9px] font-mono text-[#1A1916]/35 pointer-events-none select-none z-10">
            +
          </span>
          <span className="absolute -bottom-1 -left-1 text-[9px] font-mono text-[#1A1916]/35 pointer-events-none select-none z-10">
            +
          </span>
          <span className="absolute -bottom-1 -right-1 text-[9px] font-mono text-[#1A1916]/35 pointer-events-none select-none z-10">
            +
          </span>
        </>
      )}

      {/* Dynamic Specular Border Spotlight */}
      {spotlight && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(217, 119, 87, 0.06), transparent 70%)`,
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default Card;
