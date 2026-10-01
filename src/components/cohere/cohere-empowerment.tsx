"use client";

import React from "react";
import Link from "next/link";

export function CohereEmpowerment() {
  return (
    <section className="relative w-full bg-white text-[#212121] overflow-hidden">
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side: Field Texture with Grid & Typography */}
        <div className="relative min-h-[460px] sm:min-h-[540px] lg:min-h-[620px] p-8 sm:p-14 lg:p-20 flex flex-col justify-between overflow-hidden bg-[#1E251F] text-white">
          {/* Background Texture & Ambient Video Overlay */}
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              src="/videos/empowerment-bg.mp4"
              className="absolute inset-0 w-full h-full object-cover opacity-35 filter contrast-125 brightness-75 scale-105 pointer-events-none"
            />
            <img
              src="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/14e17653849fcffefa40ca83674a8136f2e4ac52-1440x1040.png?auto=format&fit=max&q=80&w=1440"
              alt="Vistar Engineering Texture"
              className="w-full h-full object-cover opacity-60 filter contrast-125 mix-blend-overlay"
            />
            {/* Fine Geometric Grid Overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
            {/* Gradient Scrim for supreme text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />
          </div>

          {/* Top Label */}
          <div className="relative z-10 text-xs font-sans tracking-wider uppercase text-white/70 font-medium">
            Data Sovereignty
          </div>

          {/* Bottom Content */}
          <div className="relative z-10 space-y-5 max-w-lg">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-[-0.02em] text-white"
              style={{
                fontFamily:
                  '"CohereText", "Space Grotesk", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Engineered for
              <br />
              Sovereignty
            </h2>

            <p
              className="text-base sm:text-lg text-white/90 leading-relaxed font-normal"
              style={{
                fontFamily:
                  '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Your data. Your cloud. Zero vendor lock-in. VISTAR delivers production autonomous agents and high-performance software with 100% private repository handover from day one.
            </p>

            <div className="pt-2">
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white hover:bg-white/90 text-[#141413] text-[14px] font-medium transition-all active:scale-95 shadow-md"
                style={{
                  fontFamily:
                    '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                Explore Case Studies
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Cinematic Looping Background Video */}
        <div className="relative min-h-[380px] sm:min-h-[540px] lg:min-h-[620px] overflow-hidden bg-[#1E251F]">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/185601cd46c268707c7f97c2f9a0eecec727916a-1440x1040.png?auto=format&fit=max&q=80&w=1440"
            className="w-full h-full object-cover object-center scale-[1.02]"
          >
            <source src="/videos/empowerment-bg.mp4" type="video/mp4" />
            {/* Fallback image */}
            <img
              src="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/185601cd46c268707c7f97c2f9a0eecec727916a-1440x1040.png?auto=format&fit=max&q=80&w=1440"
              alt="AI for Empowerment Landscape"
              className="w-full h-full object-cover object-center"
            />
          </video>
        </div>

      </div>
    </section>
  );
}
