"use client";

import React from "react";
import Link from "next/link";
import { AgentOrchestrationConsole } from "@/components/cohere/agent-orchestration-console";

const SECURITY_BADGES = [
  {
    name: "SOC2",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/a4bfc60fb89701deeebabcd9501246f459df53ea-240x240.png?auto=format&fit=max&q=80&w=120",
    label: "SOC2",
  },
  {
    name: "GDPR",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/7fd3414e7a961b69827a8c41b1904136fcff9d2c-240x240.png?auto=format&fit=max&q=80&w=120",
    label: "GDPR",
  },
  {
    name: "CCPA",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/0a96ba380fd3fabbcab39f83ba037fe047730bd1-240x240.png?auto=format&fit=max&q=80&w=120",
    label: "CCPA",
  },
  {
    name: "ISO 27001",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/6013d06e01e0ffaaaef1ac484cf07ee833da33c7-240x240.png?auto=format&fit=max&q=80&w=120",
    label: "ISO 27001",
  },
  {
    name: "Cyber Essentials",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/18200243be57ac3ecdde9c59ead50af0c8eeacb7-240x240.png?auto=format&fit=max&q=80&w=120",
    label: "Cyber Essentials",
  },
];

export function CohereDeployment() {
  return (
    <>
      <section className="relative w-full pt-12 sm:pt-16 md:pt-20 pb-0 bg-white border-t border-black/[0.06] overflow-hidden">
        {/* Header & CTAs matching enterprise platform theme */}
        <div className="max-w-[840px] mx-auto px-4 text-center mb-8 sm:mb-12">

          {/* Headline */}
          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.05] tracking-[-0.02em] text-[#0B0D17] mb-5"
            style={{
              fontFamily:
                '"CohereText", "Space Grotesk", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Put autonomous agents to work<br className="hidden sm:inline" /> across your enterprise
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-[19px] text-[#4A4D57] leading-relaxed max-w-[660px] mx-auto mb-8 font-normal">
            Orchestrate autonomous agent systems across your private cloud infrastructure—engineered for real-world reliability, sub-second latency, and zero vendor lock-in.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/start"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#0B0D17] text-[#0B0D17] bg-transparent hover:bg-neutral-100 font-medium text-sm sm:text-base rounded-none transition-colors"
            >
              Start Free Diagnostic
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#FF3823] hover:bg-[#E02F1C] text-white font-medium text-sm sm:text-base rounded-none transition-colors shadow-xs"
            >
              Get A Demo
            </Link>
          </div>
        </div>

        {/* Full-width Multi-Agent Orchestration Console */}
        <div className="w-full pb-16 sm:pb-24">
          <AgentOrchestrationConsole />
        </div>
      </section>

      {/* ── 2. INDUSTRY-LEADING AI SECURITY & DATA PROTECTION (PINE BG #152717) ── */}
      <section className="relative w-full py-20 sm:py-28 bg-[#152717] text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.02em] text-white leading-tight"
              style={{
                fontFamily:
                  '"CohereText", "Space Grotesk", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Industry-leading AI security and data protection
            </h2>
            <p
              className="text-base sm:text-lg text-white/80 leading-relaxed font-normal"
              style={{
                fontFamily:
                  '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Deploy inside your own VPC or on-premise infrastructure. Your data never leaves your perimeter.
            </p>
          </div>

          {/* Continuous Infinite Smooth Marquee for Compliance Badges */}
          <div className="relative w-full overflow-hidden flex items-center pt-2">
            {/* Left & Right Subtle Fade Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#152717] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#152717] to-transparent z-10 pointer-events-none" />

            {/* Marquee Track with Duplicate for Seamless Infinite Loop */}
            <div
              className="flex shrink-0 items-center gap-12 sm:gap-20 hover:[animation-play-state:paused]"
              style={{
                animation: "marquee-scroll 24s linear infinite",
                width: "max-content",
              }}
            >
              {/* Loop 1: Repeated twice for wide screen coverage */}
              {[...SECURITY_BADGES, ...SECURITY_BADGES].map((b, idx) => (
                <div
                  key={`badge-1-${b.name}-${idx}`}
                  className="flex flex-col items-center gap-3 shrink-0 group cursor-default"
                >
                  <img
                    src={b.src}
                    alt={b.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-200"
                  />
                  <span
                    className="text-xs uppercase tracking-wider text-white/70 group-hover:text-white transition-colors"
                    style={{ fontFamily: '"CohereMono", monospace' }}
                  >
                    {b.label}
                  </span>
                </div>
              ))}

              {/* Loop 2: Duplicate for seamless continuation */}
              {[...SECURITY_BADGES, ...SECURITY_BADGES].map((b, idx) => (
                <div
                  key={`badge-2-${b.name}-${idx}`}
                  className="flex flex-col items-center gap-3 shrink-0 group cursor-default"
                >
                  <img
                    src={b.src}
                    alt={b.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-200"
                  />
                  <span
                    className="text-xs uppercase tracking-wider text-white/70 group-hover:text-white transition-colors"
                    style={{ fontFamily: '"CohereMono", monospace' }}
                  >
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default CohereDeployment;
