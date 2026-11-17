import React from "react";
import { VistarEmblem } from "@/components/vistar-logo";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 dark:bg-[#07080B]/95 backdrop-blur-md select-none transition-opacity duration-300"
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Breathing Faceted Emblem */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-sky-400/10 dark:bg-sky-400/20 blur-xl animate-pulse" />
          <VistarEmblem size={42} className="text-[#0B0C10] dark:text-white animate-spin-slow" />
        </div>

        {/* Wordmark and Official Tagline */}
        <div className="text-center space-y-1">
          <span className="block font-sans font-black tracking-[0.14em] text-lg sm:text-xl text-[#0B0C10] dark:text-white uppercase leading-none">
            VISTAR
          </span>
          <span className="block text-[8px] sm:text-[9px] font-sans font-bold tracking-[0.28em] text-neutral-500 dark:text-neutral-400 uppercase leading-none">
            INTELLIGENCE FOR WHAT&apos;S NEXT
          </span>
        </div>

        {/* Subtle Indeterminate Hairline Progress Indicator */}
        <div className="w-24 h-[1.5px] bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-gradient-to-r from-transparent via-[#0284C7] to-transparent w-full animate-indeterminate" />
        </div>
      </div>
      <span className="sr-only">Loading VISTAR...</span>
    </div>
  );
}
