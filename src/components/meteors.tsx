"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
  color?: "pink" | "green" | "slate";
}

export function Meteors({ number = 20, className = "", color = "slate" }: MeteorsProps) {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      top: Math.floor(Math.random() * -10) + "px",
      left: Math.floor(Math.random() * 100) + "%",
      animationDelay: Math.random() * 1.5 + "s",
      animationDuration: Math.floor(Math.random() * 4) + 2 + "s",
    }));

    const timer = setTimeout(() => {
      setMeteorStyles(styles);
    }, 0);

    return () => clearTimeout(timer);
  }, [number]);

  const colorClass = 
    color === "pink" 
      ? "bg-[#ff1e90] before:from-[#ff1e90]" 
      : color === "green" 
      ? "bg-[#d8ff42] before:from-[#d8ff42]"
      : "bg-slate-400 before:from-slate-400";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-[inherit]">
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor absolute h-0.5 w-0.5 rounded-[9999px] shadow-[0_0_0_1px_ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:to-transparent",
            colorClass,
            className
          )}
          style={style}
        />
      ))}
    </div>
  );
}

export default Meteors;
