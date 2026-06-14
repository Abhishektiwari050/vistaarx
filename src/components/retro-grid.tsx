"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RetroGridProps {
  className?: string;
  angle?: number;
  color?: string;
}

export function RetroGrid({ className = "", angle = 30, color = "rgba(0, 0, 0, 0.05)" }: RetroGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden opacity-75 [perspective:200px]",
        className
      )}
    >
      {/* 3D Grid Plane */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `rotateX(${angle}deg)`,
        }}
      >
        <div
          className={cn(
            "animate-grid",
            "[background-repeat:repeat] [background-size:50px_50px] [height:400vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:50%_0_0] [width:200vw]"
          )}
          style={{
            backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
          }}
        />
      </div>

      {/* Fade overlay to hide the top/far edge of the 3D plane */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f5]/100 via-[#faf9f5]/15 to-transparent pointer-events-none" />
    </div>
  );
}

export default RetroGrid;
