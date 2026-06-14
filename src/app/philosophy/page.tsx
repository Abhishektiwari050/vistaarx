"use client";

import React from "react";
import Link from "next/link";
import { ThemeOverlay } from "@/components/theme-overlay";
import { BlurText } from "@/components/blur-text";

export default function PhilosophyPage() {
  return (
    <div className="w-full min-h-screen py-20 px-6 md:px-12 z-20 relative max-w-7xl mx-auto space-y-24">
      <title>Philosophy &amp; Team // Vistar Web Systems</title>
      <meta name="description" content="Discover Vistar Web Systems' custom design-engineering philosophy: hand-crafted code, zero templates, complete codebase transfer, and sub-second load times." />
      <ThemeOverlay />
      
      {/* Background Grid */}
      <div className="fixed inset-0 z-[-1] opacity-5 pointer-events-none system-grid" />

      {/* Page Heading (Asymmetric Cover Style) */}
      <div className="mb-16 mt-10 relative z-10 text-left space-y-4 bg-white/70 backdrop-blur-md border border-zinc-200/50 p-8 rounded-2xl max-w-2xl shadow-[6px_6px_20px_rgba(0,0,0,0.015)]">
        <span className="font-display text-[9px] font-bold tracking-widest text-[#ff1e90] uppercase border border-[#ff1e90]/20 px-3 py-1 bg-[#ff1e90]/5 rounded inline-block">
          Studio Identity
        </span>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold uppercase tracking-tight text-black leading-none">
          <BlurText text="Creative Chemists /" />
          <br />
          <span className="text-[#ff1e90]">
            <BlurText text="Software Architects" delay={0.25} />
          </span>
        </h1>
        <p className="font-sans text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-md">
          Behind the vectors and shaders: senior software engineers building high-performance web systems that drive conversion.
        </p>
      </div>

      {/* Section 1: The Identity (Left Aligned, Text Focus) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-start relative z-10">
        <div className="lg:col-span-7 space-y-6 bg-white/70 backdrop-blur-md border border-zinc-200 rounded-2xl p-8 shadow-sm">
          <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">01 // The Studio Philosophy</span>
          <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-black">
            Boutique Craftsmanship over bloated agency management
          </h2>
          <div className="space-y-4 font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
            <p>
              Vistar Studio is an elite, senior-led digital engineering laboratory. We do not support bloated account management or multi-layered jargon buffers. When you partner with us, you work directly with the system architects who compile your platform.
            </p>
            <p>
              We believe digital design is a branch of digital architecture. Visual interactions should feel responsive, mathematical structures should follow balanced grid systems, and data pipelines must operate with zero latency.
            </p>
            <p>
              Our team consists of industry veterans who have delivered over 40+ custom web platforms, real-time WebGL engines, and enterprise backend infrastructures. We focus purely on visual excellence and engineering integrity.
            </p>
          </div>
        </div>
        
        {/* Placeholder Column - Left side is occupied by the background 3D canvas */}
        <div className="hidden lg:block lg:col-span-5" />
      </section>

      {/* Section 2: Founder Biography (Right Shifted Grid) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-start relative z-10">
        <div className="hidden lg:block lg:col-span-4" />

        <div className="lg:col-span-8 bg-white/70 backdrop-blur-md border border-zinc-200 rounded-2xl p-8 shadow-sm space-y-6">
          <span className="font-mono text-[9px] text-[#ff1e90] font-bold uppercase tracking-wider">02 // The Principal Architect</span>
          
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-20 h-20 rounded bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 font-display text-lg font-bold text-[#ff1e90] shadow-sm select-none">
              AT
            </div>
            
            <div className="space-y-3">
              <div>
                <h3 className="font-display text-xl font-semibold text-black uppercase leading-tight">Abhishek Tiwari</h3>
                <span className="font-mono text-[9px] text-[#ff1e90] font-bold uppercase tracking-widest">Founder & Chief Systems Architect</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
                With over 8 years of software engineering experience deploying low-latency web platforms, Abhishek founded Vistar Studio to bridge advanced WebGL design with high-performance edge compilers. He leads the development of our React, Three.js, and cognitive AI workflows.
              </p>
              <div className="flex gap-4 font-mono text-[9px] text-[#ff1e90] select-none pointer-events-auto interactive font-bold">
                <a href="https://linkedin.com/in/abhishektiwari050" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn ↗</a>
                <a href="https://github.com/Abhishektiwari050" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Engineering Standards (Left Shifted Grid) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-start relative z-10 pb-12">
        <div className="lg:col-span-7 bg-white/70 backdrop-blur-md border border-zinc-200 rounded-2xl p-8 shadow-sm space-y-6">
          <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">03 // Studio Standards</span>
          <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-black">
            Our Systemic Methodology
          </h2>
          <div className="space-y-4 font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
            <p>
              We treat digital platforms as high-yield physical infrastructure. We compile code that loads instantly, responds to user gestures at peak rate, and operates with absolute zero downtime.
            </p>
            <p>
              Every visual asset is optimized. Shaders are structured to render directly on the GPU, avoiding CPU rendering bottlenecks. This guarantees fluid interactions even on lower-end hardware configurations.
            </p>
          </div>
          <div className="pt-4 select-none">
            <Link
              href="/contact"
              className="px-6 py-3 border border-zinc-800 bg-[#0c0c0e] text-[#faf9f5] font-display text-xs font-bold tracking-widest uppercase transition-colors rounded hover:bg-[#ff1e90] hover:text-black shadow-sm"
            >
              Collaborate With Us ⚡
            </Link>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-5" />
      </section>

    </div>
  );
}
