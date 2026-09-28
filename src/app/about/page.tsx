import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Company — Mission, Systems & Sovereignty | VISTAR",
  description:
    "At Vistar, we build sovereign AI software and autonomous agent platforms with 100% repository handover. Discover our engineering philosophy, axioms, and governance.",
  alternates: {
    canonical: "https://www.vistar.tech/about",
  },
  openGraph: {
    title: "Company — Mission, Systems & Sovereignty | VISTAR",
    description:
      "At Vistar, we build sovereign AI software and autonomous agent platforms with 100% repository handover. Discover our engineering philosophy, axioms, and governance.",
    url: "https://www.vistar.tech/about",
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
};

const STATS = [
  { value: "100%", label: "Repository Ownership", detail: "Day-one private Git transfer" },
  { value: "< 120ms", label: "P99 Edge Latency", detail: "24 global distributed PoPs" },
  { value: "14 Days", label: "Production Delivery Cadence", detail: "Zero agency telephone games" },
];

const PRINCIPALS = [
  {
    name: "Abhishek Tiwari",
    role: "Chief Architect & Founder",
    tapeBg: "bg-[#FFE600] text-[#00063D]",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Vikramaditya Roy",
    role: "Head of Autonomous Systems",
    tapeBg: "bg-[#FF3823] text-white",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Christian Vance",
    role: "VP of Quantum Cryptography",
    tapeBg: "bg-[#1E60E6] text-white",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Elena Rostova",
    role: "Director of Edge Telemetry",
    tapeBg: "bg-[#55FF55] text-[#00063D]",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
];

export default function AboutCompanyPage() {
  return (
    <div className="w-full bg-[#FAF9F5] text-[#00063D] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen">
      
      {/* ── FRAME 1: ARCHITECTURAL BLUEPRINT GRID HERO WITH STACKED TAPES ── */}
      <section className="relative w-full pt-20 pb-28 md:pt-28 md:pb-36 bg-[#F2EFE9] [background-image:linear-gradient(to_right,#ffffff_1.5px,transparent_1.5px),linear-gradient(to_bottom,#ffffff_1.5px,transparent_1.5px)] [background-size:46px_46px] border-b border-black/10 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <p className="text-neutral-500 font-sans text-sm md:text-base font-medium tracking-wide mb-8">
          Our Mission
        </p>

        {/* Stacked Tilted Highlighted Tapes */}
        <div className="flex flex-col items-center gap-3 md:gap-4 max-w-4xl mx-auto">
          {/* Tape 1: Lime */}
          <div className="inline-block bg-[#55FF55] text-[#052E16] -rotate-1 shadow-sm font-serif font-bold text-3xl sm:text-5xl md:text-7xl px-4 md:px-7 py-1.5 md:py-2 tracking-tight">
            Sovereign AI Systems
          </div>

          {/* Tape 2: Royal Blue */}
          <div className="inline-block bg-[#1E60E6] text-white rotate-1 shadow-sm font-serif font-bold text-3xl sm:text-5xl md:text-7xl px-5 md:px-8 py-1.5 md:py-2 tracking-tight">
            For Autonomous Enterprises
          </div>

          {/* Tape 3: Bright Coral-Red */}
          <div className="inline-block bg-[#FF3823] text-[#FFE8DE] rotate-0 shadow-sm font-serif font-bold text-3xl sm:text-5xl md:text-7xl px-5 md:px-8 py-1.5 md:py-2 tracking-tight">
            With 100% Code Handover
          </div>
        </div>
      </section>

      {/* ── FRAME 2: EDITORIAL VISION FOLD (MATCHING JASPER'S 80PX EDITORIAL PARAGRAPHS) ── */}
      <section className="relative w-full py-24 md:py-36 px-6 bg-white border-b border-black/10">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <span className="inline-block bg-[#FFD8CE] text-[#1A1A1A] font-mono text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-[2px]">
              Our Vision
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-[80px] font-normal text-[#00063D] tracking-[-2.4px] leading-[1.0] max-w-4xl">
            At Vistar, we’re closing the gap between &ldquo;code&rdquo; and &ldquo;sovereignty&rdquo;
          </h1>

          <div className="space-y-10 pt-4 font-serif text-2xl sm:text-4xl text-[#00063D] font-normal leading-[1.15] tracking-[-0.8px]">
            <p>
              We’re giving engineering leadership the power to turn vision into reality with sovereign ease. The days of slow, cumbersome agency retainers are fading, as we clear the path for architectural excellence and autonomous workflows to accelerate.
            </p>

            <p>
              Vistar is your catalyst, allowing you to move faster, think smarter, and deploy with mathematical precision—all while maintaining 100% repository and IP sovereignty. With deterministic pipelines and zero agency telephone games, you’re free to focus on what matters most: building software that endures.
            </p>

            <p>
              Because sovereign software is more than just tools; it’s an enduring competitive moat. A space where engineering teams build without vendor hostage fees, unmaintainable templates, or private data leakage. With Vistar, you’re not just keeping up with the pace of change—you’re leading it.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-6">
            <Link
              href="/start"
              className="bg-[#FF3823] hover:bg-[#E0301C] text-white px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150 inline-flex items-center gap-2"
            >
              Get A Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/vectors"
              className="bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-900 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150 inline-flex items-center gap-2"
            >
              Explore Platform
            </Link>
          </div>
        </div>
      </section>

      {/* ── FRAME 3: BLUEPRINT DRAFTING GRID CALLOUT BANNER ── */}
      <section className="w-full py-28 px-6 bg-[#EDF5FF] [background-image:linear-gradient(to_right,#ffffff_1.5px,transparent_1.5px),linear-gradient(to_bottom,#ffffff_1.5px,transparent_1.5px)] [background-size:44px_44px] border-b border-black/10 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#00063D] tracking-[-1.6px] leading-[1.1]">
            Together, we’re transforming the future of enterprise software, one repository, one agent, one system at a time.
          </h2>
        </div>
      </section>

      {/* ── FRAME 4: VISTAR BY THE NUMBERS (EXACT JASPER IMPACT SECTION) ── */}
      <section className="w-full py-24 px-6 bg-white border-b border-black/10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="inline-block bg-[#FFD8CE] text-[#1A1A1A] font-mono text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-[2px]">
              Our Impact
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#00063D] tracking-[-2px]">
              Vistar by the numbers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((stat, i) => (
              <div key={i} className="bg-[#FAF9F5] border border-black/10 rounded-[4px] p-8 text-center space-y-2">
                <div className="font-serif text-5xl sm:text-6xl font-normal text-[#00063D] tracking-tight">
                  {stat.value}
                </div>
                <div className="font-sans font-medium text-sm text-neutral-800">
                  {stat.label}
                </div>
                <div className="font-mono text-xs text-neutral-500">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAME 5: EXECUTIVE LEADERSHIP PEACH SECTION (MATCHING JASPER LEADERSHIP) ── */}
      <section className="w-full py-24 px-6 bg-[#FAF9F5] border-b border-black/10">
        <div className="max-w-6xl mx-auto bg-[#FFA08C] rounded-[6px] p-8 sm:p-14 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="inline-block bg-white text-[#1A1A1A] font-mono text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-[2px]">
                Our Principal Systems Engineering Team
              </span>
              <h3 className="font-serif text-3xl sm:text-5xl font-normal text-[#00063D] tracking-tight">
                Leading the way to sovereign engineering
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button aria-label="Previous" className="w-10 h-10 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-neutral-800 shadow-sm transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button aria-label="Next" className="w-10 h-10 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-neutral-800 shadow-sm transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRINCIPALS.map((p, idx) => (
              <div key={idx} className="bg-white rounded-[4px] overflow-hidden shadow-sm flex flex-col">
                <div className="w-full h-72 relative bg-neutral-200 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className={`absolute bottom-0 left-0 right-0 py-2.5 px-4 font-serif font-bold text-xl md:text-2xl ${p.tapeBg} tracking-tight`}>
                    {p.name}
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="font-sans text-xs font-semibold text-neutral-800">{p.role}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── FRAME 6: DARK CHARCOAL CALLOUT SECTION (MATCHING JASPER'S CAREERS SECTION) ── */}
      <section className="w-full py-28 px-6 bg-[#3E4048] text-center text-white">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <span className="inline-block bg-white/20 text-white font-mono text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-[2px]">
              Sovereign Handover
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-[-1.5px] leading-tight">
            Join the sovereign software revolution
          </h2>

          <div className="pt-2">
            <Link
              href="/start"
              className="inline-block border border-white text-white hover:bg-white hover:text-black font-semibold text-sm px-8 py-3.5 rounded-[4px] transition-colors"
            >
              Start Diagnostic
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
