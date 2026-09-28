"use client";

import React from "react";
import Link from "next/link";
import { playClick } from "@/lib/sound";

export function CohereCTA() {
  return (
    <section className="relative w-full min-h-[500px] md:min-h-[580px] bg-[#355146] text-white flex items-center justify-center overflow-hidden">
      {/* Background Aerial Mountain Photography Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/df2a70f280194c1fc4f01987c4c1b334618ad32a-2880x1200.png?auto=format&fit=max&q=80&w=1920"
          alt="Ready to put AI to work background"
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-[#355146]/30" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 text-center space-y-8">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal tracking-[-0.02em] text-white leading-tight"
          style={{
            fontFamily:
              '"CohereText", "Space Grotesk", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          Ready to put AI to work?
        </h2>

        <div className="flex justify-center pt-2">
          <Link
            href="/start"
            onClick={() => playClick(900, 0.04)}
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white hover:bg-[#ECEEF5] text-[#141413] text-[15px] font-medium transition-all active:scale-95 shadow-xl"
            style={{
              fontFamily:
                '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Request a demo
          </Link>
        </div>
      </div>
    </section>
  );
}
