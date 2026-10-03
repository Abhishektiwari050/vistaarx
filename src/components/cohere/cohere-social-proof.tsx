"use client";

import React from "react";

interface PartnerLogo {
  name: string;
  src?: string;
  isTextOnly?: boolean;
}

const LOGOS: PartnerLogo[] = [
  {
    name: "Next.js 16",
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
  },
  {
    name: "React 19",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
  {
    name: "TypeScript",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
  },
  {
    name: "Python",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
  },
  {
    name: "PostgreSQL",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
  },
  {
    name: "Docker",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg",
  },
  {
    name: "Tailwind CSS",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  },
  {
    name: "Three.js",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Three.js_Icon.svg",
  },
  {
    name: "FastAPI",
    src: "https://cdn.worldvectorlogo.com/logos/fastapi-1.svg",
  },
  {
    name: "Redis",
    src: "https://upload.wikimedia.org/wikipedia/en/6/6b/Redis_Logo.svg",
  },
];

export function CohereSocialProof() {
  return (
    <section className="relative w-full py-14 sm:py-20 bg-white border-b border-black/[0.06] text-[#212121] overflow-hidden select-none">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10 mb-8 sm:mb-10">
        <p
          className="text-center text-sm sm:text-base md:text-[17px] text-[#212121] font-normal"
          style={{
            fontFamily:
              '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          Core technologies powering our production web applications, automations, and spatial systems
        </p>
      </div>

      {/* ── CONTINUOUS INFINITE SMOOTH MARQUEE TICKER ── */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left & Right Subtle Fade Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Marquee Track with Duplicate for Seamless Infinite Loop */}
        <div
          className="flex shrink-0 items-center gap-12 sm:gap-20 hover:[animation-play-state:paused]"
          style={{
            animation: "marquee-scroll 32s linear infinite",
            width: "max-content",
          }}
        >
          {/* First loop */}
          {LOGOS.map((logo, idx) => (
            <div
              key={`logo-1-${logo.name}-${idx}`}
              className="flex items-center justify-center shrink-0 opacity-75 hover:opacity-100 transition-opacity duration-200 grayscale hover:grayscale-0 cursor-default"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-7 sm:h-9 w-auto max-w-[140px] sm:max-w-[170px] object-contain"
                loading="lazy"
              />
            </div>
          ))}

          {/* Duplicate loop for seamless continuation */}
          {LOGOS.map((logo, idx) => (
            <div
              key={`logo-2-${logo.name}-${idx}`}
              className="flex items-center justify-center shrink-0 opacity-75 hover:opacity-100 transition-opacity duration-200 grayscale hover:grayscale-0 cursor-default"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-7 sm:h-9 w-auto max-w-[140px] sm:max-w-[170px] object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
