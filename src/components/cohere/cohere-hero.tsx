"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { playClick } from "@/lib/sound";

export function CohereHero() {
  return (
    <div className="w-full bg-white text-[#212121]">
      {/* ── 1. COHERE HERO TEXT SECTION (CINEMATIC WELCOME ENTRANCE) ── */}
      <section className="relative w-full px-4 pt-24 md:pt-32 pb-12 md:pb-16 text-[#212121]">
        <div className="relative mx-auto w-full max-w-[1400px]">
          <div className="text-center flex flex-col items-center">
            
            {/* 01: Status Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 inline-flex"
            >
              <Link
                href="/vectors"
                onClick={() => playClick(900, 0.02)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 hover:bg-neutral-200/80 border border-neutral-300/80 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-800 transition-all hover:scale-[1.02] shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-neutral-900">Custom Engineering</span>
                <span className="text-neutral-400">|</span>
                <span className="text-neutral-600">100% Code Ownership &rarr;</span>
              </Link>
            </motion.div>

            {/* 02: Cinematic Headline Reveal */}
            <div className="mb-6 break-words max-w-[1128px] mx-auto overflow-hidden px-2">
              <h1
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[104px] xl:text-[116px] font-normal leading-[1.0] sm:leading-[0.98] tracking-[-0.035em] text-[#141413]"
                style={{
                  fontFamily:
                    '"CohereText", "Space Grotesk", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                <motion.span
                  className="block overflow-hidden"
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  Your AI.
                </motion.span>
                <motion.span
                  className="block overflow-hidden"
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.85, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                >
                  Your Work.
                </motion.span>
              </h1>
            </div>

            {/* 03: Polished Authoritative Subhead */}
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[680px] px-4 mx-auto mb-8"
            >
              <p
                className="text-base sm:text-lg md:text-[19px] font-normal leading-[1.55] text-neutral-600"
                style={{
                  fontFamily:
                    '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                VISTAR engineers custom AI agents, production web platforms, and interactive 3D systems. 100% source code ownership, zero vendor lock-in, delivered in 14-day production sprints.
              </p>
            </motion.div>

            {/* 04: Clear Conversion CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              <Link
                href="/start"
                onClick={() => playClick(950, 0.03)}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-[#FF3823] hover:bg-[#E02F1C] text-white font-medium text-sm sm:text-base rounded-none transition-all shadow-xs hover:shadow-sm active:scale-95 gap-2"
                style={{
                  fontFamily:
                    '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                Start Free Diagnostic
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                onClick={() => playClick(900, 0.03)}
                className="inline-flex items-center justify-center px-7 py-3.5 border border-[#141413] text-[#141413] bg-transparent hover:bg-neutral-100 font-medium text-sm sm:text-base rounded-none transition-all active:scale-95"
                style={{
                  fontFamily:
                    '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                Get A Demo
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. COHERE HERO FEATURED GRAPHIC (SMOOTH ENTRANCE) ── */}
      <motion.section
        initial={{ opacity: 0, y: 44, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.0, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full px-4 lg:px-10 pb-16 md:pb-24 bg-white text-[#212121]"
      >
        <div className="relative mx-auto w-full max-w-[1360px]">
          
          {/* Desktop & Tablet Video Loop (Aspect Ratio 2720/1120 = 2.428) */}
          <div className="hidden md:block w-full overflow-hidden rounded-[12px] shadow-sm bg-[#0C0D12] border border-black/[0.06]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/1a41717be695e315b008b080ff3ae9e10c43060c-2720x1120.png?auto=format&fit=max&q=80&w=1920"
              className="w-full h-auto object-cover rounded-[12px] block"
              width={1920}
              height={791}
            >
              <source src="/videos/hero-agent-loop.mp4" type="video/mp4" />
              <source src="/videos/hero-agent-loop.webm" type="video/webm" />
              {/* Fallback GIF */}
              <img
                src="/videos/hero-agent-loop.gif"
                alt="VISTAR Custom AI Software & Systems Engineering Video Loop"
                className="w-full h-auto object-cover rounded-[12px]"
              />
            </video>
          </div>

          {/* Mobile Video / GIF Loop (Square 1472x1472 Aspect Ratio) */}
          <div className="block md:hidden w-full overflow-hidden rounded-[20px] shadow-sm bg-[#0C0D12] border border-black/[0.06]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/d6caa02cd2aefe2f9cfa34a2f733cd2b883306b5-1472x1472.png?auto=format&fit=max&q=80&w=1472"
              className="w-full h-auto object-cover rounded-[20px] block"
              width={1472}
              height={1472}
            >
              <source src="/videos/hero-agent-loop.mp4" type="video/mp4" />
              <source src="/videos/hero-agent-loop.webm" type="video/webm" />
              {/* Fallback GIF */}
              <img
                src="/videos/hero-agent-loop.gif"
                alt="VISTAR Custom AI Software & Systems Engineering Mobile Loop"
                className="w-full h-auto object-cover rounded-[20px]"
              />
            </video>
          </div>

        </div>
      </motion.section>
    </div>
  );
}

export default CohereHero;
