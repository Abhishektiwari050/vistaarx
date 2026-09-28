"use client";

import React from "react";

interface PartnerLogo {
  name: string;
  src?: string;
  isTextOnly?: boolean;
}

const LOGOS: PartnerLogo[] = [
  {
    name: "Alibaba Group",
    src: "https://upload.wikimedia.org/wikipedia/en/8/80/Alibaba-Group-Logo.svg",
  },
  {
    name: "Oracle",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/5836b142b7434a7600de0481735a41a310dd3c3c-171x61.svg",
  },
  {
    name: "Dell Technologies",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/d5bd03ccb68aceccae91a5e93f104e143b8b930d-170x60.svg",
  },
  {
    name: "McKinsey & Company",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/5e55f56f8e105cddbcd6f243fc2686c7eeb63a29-160x50.svg",
  },
  {
    name: "Accenture",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/44b6dcb718341a204c9684ecd69889fd204d1368-170x60.svg",
  },
  {
    name: "Fujitsu",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/bea01a873a54823b1b79c71b16e74e94d7871b14-170x60.svg",
  },
  {
    name: "RBC",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/39abce988f8dc7b0c10f36e7e766e5d04d3e2d94-171x61.svg",
  },
  {
    name: "LG CNS",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/e8a30bc84caccaef42d84f2c447c58c63443d2fb-170x60.svg",
  },
  {
    name: "Bell",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/38a1f54b2cfcd93209930bedec2bd723a70d5e90-170x61.svg",
  },
  {
    name: "Asana",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/d1d693711b08a6ea65038d7514ba2dbafcc2e1dc-170x60.svg",
  },
  {
    name: "Salesforce",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/6fa18af555fccc6529de4bb0f6ceb0f00db62696-171x61.svg",
  },
  {
    name: "SAP",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/9210d325433b4057e78429767006c4886df08ac4-170x60.svg",
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
