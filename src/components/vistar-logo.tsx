import React from "react";
import Image from "next/image";

export interface VistarLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  showTagline?: boolean;
  showDivider?: boolean;
  textColor?: string;
  taglineColor?: string;
  variant?: "svg" | "png" | "full" | "emblem";
}

/**
 * VISTAR Official Faceted Star Emblem SVG
 * Precision aerodynamic 4-pointed star with concave wings,
 * central square aperture, and directional pinwheel facet shading.
 */
export function VistarEmblem({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 hover:rotate-12 ${className}`}
      aria-hidden="true"
    >
      {/* Top Wing */}
      <path
        d="M 50 2 C 49 14 46 27 39 39 L 50 39 Z"
        fill="currentColor"
        fillOpacity="0.72"
        className="text-neutral-700 dark:text-neutral-400"
      />
      <path
        d="M 50 2 L 50 39 L 61 39 C 54 27 51 14 50 2 Z"
        fill="currentColor"
        fillOpacity="1"
        className="text-[#0B0C10] dark:text-white"
      />

      {/* Right Wing */}
      <path
        d="M 98 50 C 86 49 73 46 61 39 L 61 50 Z"
        fill="currentColor"
        fillOpacity="0.72"
        className="text-neutral-700 dark:text-neutral-400"
      />
      <path
        d="M 98 50 L 61 50 L 61 61 C 73 54 86 51 98 50 Z"
        fill="currentColor"
        fillOpacity="1"
        className="text-[#0B0C10] dark:text-white"
      />

      {/* Bottom Wing */}
      <path
        d="M 50 98 C 51 86 54 73 61 61 L 50 61 Z"
        fill="currentColor"
        fillOpacity="0.72"
        className="text-neutral-700 dark:text-neutral-400"
      />
      <path
        d="M 50 98 L 50 61 L 39 61 C 46 73 49 86 50 98 Z"
        fill="currentColor"
        fillOpacity="1"
        className="text-[#0B0C10] dark:text-white"
      />

      {/* Left Wing */}
      <path
        d="M 2 50 L 39 50 L 39 39 C 27 46 14 49 2 50 Z"
        fill="currentColor"
        fillOpacity="0.72"
        className="text-neutral-700 dark:text-neutral-400"
      />
      <path
        d="M 2 50 C 14 51 27 54 39 61 L 39 50 Z"
        fill="currentColor"
        fillOpacity="1"
        className="text-[#0B0C10] dark:text-white"
      />

      {/* Central Square Boundary Border Definition */}
      <rect
        x="39"
        y="39"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeOpacity="0.12"
      />
    </svg>
  );
}

/**
 * VISTAR Official Brand Lockup:
 * Combines the faceted emblem, vertical separator, geometric wordmark,
 * and the official tagline: "INTELLIGENCE FOR WHAT'S NEXT".
 */
export function VistarLogo({
  className = "",
  size = 28,
  showText = true,
  showTagline = false,
  showDivider = false,
  textColor = "text-[#0F172A] dark:text-white",
  taglineColor = "text-neutral-600 dark:text-neutral-400",
  variant = "svg",
}: VistarLogoProps) {
  // If variant is emblem, render only the star mark
  if (variant === "emblem") {
    return <VistarEmblem size={size} className={className} />;
  }

  // Full lockup auto-enables divider and tagline
  const isFull = variant === "full" || showTagline;
  const displayDivider = showDivider || variant === "full";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {variant === "png" ? (
        <Image
          src="/vistar-logo.png"
          alt="VISTAR Emblem"
          width={size}
          height={size}
          className="object-contain shrink-0"
          priority
        />
      ) : (
        <VistarEmblem size={size} />
      )}

      {/* Vertical Hairline Divider */}
      {displayDivider && (
        <span
          className="w-[1px] h-7 bg-neutral-300 dark:bg-neutral-700 shrink-0 mx-0.5 rounded-full"
          aria-hidden="true"
        />
      )}

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-sans font-black tracking-[0.08em] uppercase text-[19px] sm:text-[21px] md:text-[22px] leading-tight ${textColor}`}
          >
            VISTAR
          </span>
          {isFull && (
            <span
              className={`text-[7.5px] sm:text-[8px] md:text-[8.5px] font-sans font-bold tracking-[0.24em] sm:tracking-[0.28em] uppercase mt-0.5 leading-tight ${taglineColor}`}
            >
              INTELLIGENCE FOR WHAT&apos;S NEXT
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default VistarLogo;
