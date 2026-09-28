import React from "react";
import Image from "next/image";

interface VistarLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
  variant?: "svg" | "png";
}

/**
 * VISTAR Official Emblem:
 * Four-pointed star / compass glyph with central square negative space,
 * exactly matching the brand mark from the design spec.
 */
export function VistarLogo({
  className = "",
  size = 28,
  showText = true,
  textColor = "text-[#0F172A]",
  variant = "svg",
}: VistarLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {variant === "png" ? (
        <Image
          src="/vistar-logo.png"
          alt="VISTAR Emblem"
          width={size}
          height={size}
          className="object-contain"
          priority
        />
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 transition-transform duration-300 hover:rotate-45"
          aria-hidden="true"
        >
          {/* Top Triangle */}
          <polygon points="50,2 66,34 34,34" fill="currentColor" />
          {/* Right Triangle */}
          <polygon points="98,50 66,66 66,34" fill="currentColor" />
          {/* Bottom Triangle */}
          <polygon points="50,98 34,66 66,66" fill="currentColor" />
          {/* Left Triangle */}
          <polygon points="2,50 34,34 34,66" fill="currentColor" />
          {/* Center Square Boundary Border for crisp definition */}
          <rect
            x="34"
            y="34"
            width="32"
            height="32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.15"
          />
        </svg>
      )}

      {showText && (
        <span
          className={`font-sans font-extrabold tracking-[-0.035em] uppercase text-[20px] md:text-[22px] ${textColor}`}
        >
          VISTAR
        </span>
      )}
    </div>
  );
}

export default VistarLogo;
