"use client";

import React from "react";
import { JasperInteractiveHero } from "@/components/jasper/jasper-interactive-hero";

export function JasperAgentsSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#FAF9F5] border-b border-black/[0.08] text-[#141413] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 space-y-4">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-[-0.03em] leading-[1.12] text-[#141413]"
            style={{
              fontFamily:
                '"CohereText", "Space Grotesk", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Deploy reliable automations across your business.
          </h2>

          <p
            className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed"
            style={{
              fontFamily:
                '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            From automated lead intake and instant WhatsApp founder notifications to high-frequency 3D WebGL rendering. Click keys or select capabilities below to interact with the stage.
          </p>
        </div>

        {/* Interactive 3D Canvas Stage */}
        <div className="relative mx-auto w-full max-w-[1360px] overflow-hidden rounded-[16px] border border-black/[0.08] shadow-sm bg-white">
          <JasperInteractiveHero />
        </div>

      </div>
    </section>
  );
}

export default JasperAgentsSection;
