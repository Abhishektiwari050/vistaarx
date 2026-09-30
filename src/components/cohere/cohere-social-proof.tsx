"use client";

import React from "react";

interface PartnerLogo {
  name: string;
  src?: string;
  isTextOnly?: boolean;
}

const LOGOS: PartnerLogo[] = [
  {
    name: "Amazon Web Services",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  },
  {
    name: "Google Cloud",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
  },
  {
    name: "Microsoft Azure",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg",
  },
  {
    name: "Cloudflare",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg",
  },
  {
    name: "Docker",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg",
  },
  {
    name: "Kubernetes",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg",
  },
  {
    name: "PostgreSQL",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
  },
  {
    name: "Next.js",
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
  },
  {
    name: "Python",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
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
          Engineered to interface natively with enterprise architectures, private VPCs, and global clouds
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
