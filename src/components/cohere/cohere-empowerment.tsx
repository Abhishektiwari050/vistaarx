"use client";

import React from "react";
import Link from "next/link";

export function CohereEmpowerment() {
  return (
    <section className="relative w-full bg-white text-[#212121] overflow-hidden">
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side: Field Texture with Grid & Typography */}
        <div className="relative min-h-[460px] sm:min-h-[540px] lg:min-h-[620px] p-8 sm:p-14 lg:p-20 flex flex-col justify-between overflow-hidden bg-[#1E251F] text-white">
          {/* Subtle Grid and Gradient Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Fine Geometric Grid Overlay */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
            {/* Gradient Scrim for supreme text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
          </div>

          {/* Top Label */}
          <div className="relative z-10 text-xs font-mono tracking-wider uppercase text-white/70 font-medium">
            Data Sovereignty
          </div>

          {/* Bottom Content */}
          <div className="relative z-10 space-y-5 max-w-lg">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-[-0.02em] text-white font-sans"
            >
              Engineered for
              <br />
              Sovereignty
            </h2>

            <p
              className="text-base sm:text-lg text-white/90 leading-relaxed font-normal font-sans"
            >
              Your data. Your cloud. Zero vendor lock-in. VISTAR delivers production autonomous software with 100% private repository handover from day one.
            </p>

            <div className="pt-2">
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white hover:bg-white/90 text-[#141413] text-[14px] font-medium transition-all active:scale-95 shadow-md"
              >
                Explore Case Studies
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Cinematic Looping Background Video (Lazy Loaded) */}
        <div className="relative min-h-[380px] sm:min-h-[540px] lg:min-h-[620px] overflow-hidden bg-[#1E251F]">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/og-image.jpg"
            className="w-full h-full object-cover object-center scale-[1.02]"
          >
            <source src="/videos/empowerment-bg.mp4" type="video/mp4" />
          </video>
        </div>

      </div>
    </section>
  );
}
