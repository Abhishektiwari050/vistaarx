"use client";

import React from "react";
import { MinimalistHero } from "@/components/ui/minimalist-hero";
import { SpotlightCard } from "@/components/spotlight-card";

// Custom SVG components to bypass old lucide-react brand icon limitations
const LinkedinIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function PhilosophyPage() {
  const navLinks = [
    { label: "SHOWCASE", href: "/" },
    { label: "CASE STUDIES", href: "/work" },
    { label: "TECHNOLOGY", href: "/vectors" },
    { label: "ABOUT US", href: "/philosophy" },
    { label: "CONTACT HQ", href: "/contact" }
  ];

  const socialLinks = [
    { icon: LinkedinIcon, href: "https://linkedin.com/in/abhishektiwari050" },
    { icon: GithubIcon, href: "https://github.com/Abhishektiwari050/vistaarx" }
  ];

  return (
    <div className="w-full relative bg-[#faf9f5]">
      {/* Global paper-grain texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* 1. Minimalist Hero Section */}
      <MinimalistHero
        logoText="vistar."
        navLinks={navLinks}
        mainText="Elite digital engineering and custom-architected web systems. We refuse bloated plug-ins, pre-fabricated template setups, and unnecessary code clutter to build high-performance visual solutions."
        readMoreLink="#journey"
        imageSrc="/images/headshot_primary.png"
        imageAlt="Abhishek Tiwari - Lead Systems Architect Portrait"
        overlayText={{
          part1: "less is",
          part2: "more.",
        }}
        socialLinks={socialLinks}
        locationText="New Delhi, India // Operational Q2 2026"
        className="bg-[#faf9f5] text-black"
      />

      {/* 2. Core Philosophy Manifesto Section */}
      <section id="journey" className="py-24 px-6 sm:px-12 md:px-16 relative overflow-hidden bg-[#faf9f5] border-t border-black/5 z-20">
        <div className="max-w-6xl mx-auto text-center relative z-10 mb-16 select-none">
          <span className="font-mono text-[9px] font-bold tracking-[3px] text-[#ff1e90] uppercase bg-[#ff1e90]/10 border border-[#ff1e90]/20 px-3 py-1 rounded-full inline-block mb-4">
            Our Core Manifesto
          </span>
          <h2 className="font-display font-bold tracking-tight text-[#0a0a0a] leading-tight text-fluid-section uppercase">
            Pillars of <span className="font-serif italic font-normal text-zinc-400 lowercase">excellence</span>.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-sans max-w-xl mx-auto mt-4">
            We operate at the intersection of extreme speed, complete ownership, and structural minimalism.
          </p>
        </div>

        {/* 3 Columns Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1 - Refusal */}
          <div className="group cursor-pointer">
            <SpotlightCard
              glowColor="rgba(0, 0, 0, 0.05)"
              borderColor="rgba(0, 0, 0, 0.15)"
              className="bg-[#d8ff42] border-[3px] border-black rounded-3xl p-6 md:p-8 min-h-[380px] flex flex-col justify-between shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] transition-all duration-500 interactive"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 text-black text-xl">
                  ✦
                </div>
                <span className="text-black font-mono font-bold text-xs border-2 border-black px-3 py-1 rounded-full bg-white shadow-[2px_2px_0px_#000]">01</span>
              </div>
              <div className="mt-8">
                <h3 className="font-display font-bold uppercase text-2xl md:text-3xl text-black mb-3 leading-none tracking-tight">
                  Refusal &amp;<br />Minimalism
                </h3>
                <p className="text-black/70 text-xs leading-relaxed font-sans">
                  We reject bloated plug-ins, pre-fabricated template setups, and unnecessary code clutter. Symmetrical, custom-crafted architecture is our baseline standard.
                </p>
              </div>
              <div className="w-full h-[2px] bg-black/10 mt-6" />
            </SpotlightCard>
          </div>

          {/* Card 2 - Performance */}
          <div className="group cursor-pointer">
            <SpotlightCard
              glowColor="rgba(255, 30, 144, 0.1)"
              borderColor="rgba(255, 255, 255, 0.1)"
              className="bg-[#111] border-[3px] border-black rounded-3xl p-6 md:p-8 min-h-[380px] flex flex-col justify-between shadow-[6px_6px_0px_#ff1e90] hover:shadow-[10px_10px_0px_#ff1e90] transition-all duration-500 interactive"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 text-white text-xl">
                  ⚡
                </div>
                <span className="text-white/50 font-mono font-bold text-xs border border-white/10 px-3 py-1 rounded-full bg-white/5">02</span>
              </div>
              <div className="mt-8">
                <h3 className="font-display font-bold uppercase text-2xl md:text-3xl text-white mb-3 leading-none tracking-tight">
                  Sub-Second<br />Performance
                </h3>
                <p className="text-white/40 text-xs leading-relaxed font-sans">
                  Page load speeds are not a vanity metric — they are a core business driver. High-speed, edge-rendered platforms with optimal Core Web Vitals are built from day one.
                </p>
              </div>
              <div className="w-full h-px bg-white/10 mt-6" />
            </SpotlightCard>
          </div>

          {/* Card 3 - Ownership */}
          <div className="group cursor-pointer">
            <SpotlightCard
              glowColor="rgba(51, 102, 255, 0.05)"
              borderColor="rgba(0, 0, 0, 0.15)"
              className="bg-white border-[3px] border-black rounded-3xl p-6 md:p-8 min-h-[380px] flex flex-col justify-between shadow-[6px_6px_0px_#3366ff] hover:shadow-[10px_10px_0px_#3366ff] transition-all duration-500 interactive"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-full bg-[#3366ff]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 text-[#3366ff] text-xl">
                  🔑
                </div>
                <span className="text-[#3366ff] font-mono font-bold text-xs border-2 border-[#3366ff] px-3 py-1 rounded-full bg-white shadow-[2px_2px_0px_#3366ff]">03</span>
              </div>
              <div className="mt-8">
                <h3 className="font-display font-bold uppercase text-2xl md:text-3xl text-black mb-3 leading-none tracking-tight">
                  Total Codebase<br />Ownership
                </h3>
                <p className="text-black/60 text-xs leading-relaxed font-sans">
                  We hand over 100% of the codebase from the moment of deployment. Zero ongoing subscription lock-ins, zero proprietary platform dependencies, complete autonomy.
                </p>
              </div>
              <div className="w-full h-px bg-black/10 mt-6" />
            </SpotlightCard>
          </div>
        </div>
      </section>
    </div>
  );
}
