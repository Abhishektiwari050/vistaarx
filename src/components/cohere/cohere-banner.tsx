"use client";

import React, { useState } from "react";
import Link from "next/link";

export function CohereBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative z-[60] flex items-center justify-between overflow-hidden px-4 py-2.5 bg-[#000000] text-[#FFFFFF] text-xs sm:text-sm font-sans transition-all duration-300">
      <div className="flex flex-1 flex-row flex-wrap items-center justify-center gap-2 text-center">
        <p className="font-normal text-white/90">
          <strong className="font-semibold text-white">Engineering for Empowerment:</strong> Your
          code. Your sovereign IP. See how autonomous software infrastructure gives you full control.
        </p>
        <Link
          href="/work"
          className="underline underline-offset-4 font-medium text-white hover:text-white/80 transition-colors ml-1 inline-flex items-center gap-1"
        >
          <span>Explore now</span>
          <span className="text-xs">→</span>
        </Link>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        aria-label="Close banner"
        className="ml-3 p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
