"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  borderRadius?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "#0a0a0a",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            "--shimmer-color": shimmerColor,
            "--shimmer-size": shimmerSize,
            "--shimmer-duration": shimmerDuration,
            "--border-radius": borderRadius,
            "--bg-color": background,
          } as React.CSSProperties
        }
        suppressHydrationWarning
        className={cn(
          "group relative z-10 flex cursor-pointer items-center justify-center overflow-hidden border border-white/10 px-6 py-3 text-white transition-all duration-300 ease-in-out hover:shadow-[0_0_25px_rgba(216,255,66,0.25)] active:scale-[0.97]",
          "bg-[var(--bg-color)] rounded-[var(--border-radius)]",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Shimmer overlay element */}
        <div className="absolute inset-0 overflow-hidden rounded-[var(--border-radius)] pointer-events-none">
          <div 
            className="absolute inset-0 h-full w-[200%] -translate-x-[100%] animate-shimmer"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(216, 255, 66, 0.18), rgba(255, 30, 144, 0.08), transparent)`,
            }}
          />
        </div>

        {/* Content text */}
        <span className="relative z-10 flex items-center gap-1.5 font-display text-[10px] font-bold tracking-widest uppercase text-white group-hover:text-[#d8ff42] transition-colors duration-200">
          {children}
        </span>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
export default ShimmerButton;
