"use client";

import React from "react";

interface CrosshairContainerProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  coordinates?: string;
}

export function CrosshairContainer({
  children,
  className = "",
  label,
  coordinates,
}: CrosshairContainerProps) {
  return (
    <div className={`relative border border-[rgba(26,25,22,0.12)] ${className}`}>
      {/* 4 Corner Crosshairs */}
      <span className="absolute -top-1.5 -left-1.5 text-[10px] font-mono text-[#9E9A90] select-none pointer-events-none">
        +
      </span>
      <span className="absolute -top-1.5 -right-1.5 text-[10px] font-mono text-[#9E9A90] select-none pointer-events-none">
        +
      </span>
      <span className="absolute -bottom-1.5 -left-1.5 text-[10px] font-mono text-[#9E9A90] select-none pointer-events-none">
        +
      </span>
      <span className="absolute -bottom-1.5 -right-1.5 text-[10px] font-mono text-[#9E9A90] select-none pointer-events-none">
        +
      </span>

      {/* Optional Top Technical Header Mark */}
      {(label || coordinates) && (
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-[rgba(26,25,22,0.08)] bg-[#F2EFE9] text-[10px] font-mono text-[#68645E] select-none">
          <span>{label || "REGISTRATION // SPEC"}</span>
          <span>{coordinates || "40.7128° N, 74.0060° W"}</span>
        </div>
      )}

      {children}
    </div>
  );
}

export default CrosshairContainer;
