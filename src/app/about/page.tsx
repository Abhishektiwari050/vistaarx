import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Code2, Cpu } from "lucide-react";
import { DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Company — Mission, Systems & Sovereignty | VISTAR",
  description:
    "At VISTAR, we build sovereign AI software and autonomous agent platforms with 100% repository handover. Discover our engineering philosophy, axioms, and governance.",
  alternates: {
    canonical: "https://www.vistar.tech/about",
  },
  openGraph: {
    title: "Company — Mission, Systems & Sovereignty | VISTAR",
    description:
      "At VISTAR, we build sovereign AI software and autonomous agent platforms with 100% repository handover. Discover our engineering philosophy, axioms, and governance.",
    url: "https://www.vistar.tech/about",
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
};

const STATS = [
  { value: "100%", label: "Repository Ownership", detail: "Day-one private GitHub transfer" },
  { value: "< 120ms", label: "P99 Edge Latency", detail: "24 global distributed Anycast PoPs" },
  { value: "14–21 Days", label: "Production Delivery Cadence", detail: "Guaranteed fixed-scope sprints" },
];

const ENGINEERING_PILLARS = [
  {
    icon: Code2,
    tag: "PILLAR 01",
    title: "100% Source Code Sovereignty",
    desc: "Every line of TypeScript, Python, Docker configurations, and infrastructure-as-code is committed directly to your private organization repository. Zero CMS hostage retainers.",
  },
  {
    icon: Shield,
    tag: "PILLAR 02",
    title: "Air-Gapped Private VPC Vaults",
    desc: "Autonomous agent pods and custom fine-tuned model checkpoints execute strictly within your private AWS, GCP, or on-premise perimeter. Zero cross-tenant data leakage.",
  },
  {
    icon: Cpu,
    tag: "PILLAR 03",
    title: "Deterministic Multi-Agent Graphs",
    desc: "We replace fragile prompt wrappers with mathematically verifiable state machines, typed JSON Schema gates, and real-time telemetry anomaly monitoring.",
  },
];

export default function AboutCompanyPage() {
  return (
    <div className="w-full bg-[#FAF9F5] text-[#0E1118] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen">
      
      {/* ── FRAME 1: EDITORIAL HERO ── */}
      <section className="relative w-full pt-24 pb-20 md:pt-32 md:pb-28 border-b border-black/10 bg-[#FAF9F5] text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/5 border border-black/10 text-neutral-800 font-mono text-xs uppercase tracking-wider font-semibold rounded-[2px]">
              Our Mission // Sovereign Engineering
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#0E1118] tracking-tight leading-[1.08]">
            We engineer{" "}
            <span className="font-serif italic font-normal text-[#FF3823]">
              sovereign
            </span>{" "}
            AI systems for high-stakes enterprises.
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Eliminating agency retainers and brittle prompt wrappers. VISTAR delivers deterministic autonomous agents, high-density Next.js web applications, and interactive 3D runtimes with 100% client code ownership.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/start"
              className="inline-flex items-center justify-center h-12 px-7 rounded-[4px] bg-[#FF3823] hover:bg-[#E0301C] text-white text-[14px] font-medium shadow-sm transition-all active:scale-95 gap-2"
            >
              Start Free Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/work"
              className="inline-flex items-center justify-center h-12 px-7 rounded-[4px] bg-white hover:bg-neutral-100 text-[#0E1118] border border-black/15 text-[14px] font-medium shadow-sm transition-all active:scale-95"
            >
              Inspect Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* ── FRAME 2: EDITORIAL MANIFESTO ── */}
      <section className="relative w-full py-20 md:py-28 px-6 bg-white border-b border-black/10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <span className="inline-block font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold">
              The VISTAR Axiom
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0E1118] tracking-tight leading-tight">
            Closing the divide between rapid AI adoption and permanent codebase ownership.
          </h2>

          <div className="space-y-6 text-neutral-700 font-sans text-base sm:text-lg leading-relaxed">
            <p>
              Traditional development agencies build fragile, unmaintainable sites, hoard intellectual property behind closed maintainer agreements, and introduce multi-layered telephone games between junior developers and business leadership.
            </p>
            <p>
              VISTAR was founded on a singular engineering countermeasure: direct pairing with principal systems architects who ship production code in focused 14-to-21 day sprints. On delivery day, 100% of the repository, Docker configurations, infrastructure scripts, and typed schemas transfer to your GitHub organization with zero vendor lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* ── FRAME 3: STATS STRIP ── */}
      <section className="w-full py-16 px-6 bg-[#FAF9F5] border-b border-black/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((stat, i) => (
              <div key={i} className="bg-white border border-black/10 rounded-[4px] p-8 text-center space-y-2 shadow-2xs">
                <div className="font-serif text-4xl sm:text-5xl font-normal text-[#0E1118] tracking-tight">
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

      {/* ── FRAME 4: ARCHITECTURAL PILLARS ── */}
      <section className="w-full py-20 px-6 bg-white border-b border-black/10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-2 text-center">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold">
              System Guarantees
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#0E1118]">
              Engineered for Sovereignty
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENGINEERING_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF9F5] border border-black/10 rounded-[6px] p-7 space-y-4 hover:border-black/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#FF3823] font-semibold tracking-wider">
                      {pillar.tag}
                    </span>
                    <Icon className="w-5 h-5 text-neutral-600" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#0E1118]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FRAME 5: LEADERSHIP & STUDIO STRUCTURE ── */}
      <section className="w-full py-20 px-6 bg-[#FAF9F5] border-b border-black/10">
        <div className="max-w-4xl mx-auto border border-black/10 bg-white rounded-[6px] p-8 sm:p-12 space-y-6 shadow-sm">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block">
            Studio Structure // Principal Pods
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#0E1118]">
            Founded by Abhishek Tiwari
          </h3>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            VISTAR operates as a specialized engineering studio. Rather than staffing projects with junior contractors, each engagement is directed by Abhishek Tiwari and staffed with dedicated principal engineering pods specializing in distributed AI systems, Next.js performance architecture, and high-frequency WebGL rendering.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-600">
            <span className="inline-flex items-center gap-1.5 text-neutral-900 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#FF3823]" /> Direct Principal Access
            </span>
            <span>&bull;</span>
            <span className="inline-flex items-center gap-1.5 text-neutral-900 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#FF3823]" /> Bilateral NDA Protected
            </span>
            <span>&bull;</span>
            <span className="inline-flex items-center gap-1.5 text-neutral-900 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#FF3823]" /> 100% Repository Handover
            </span>
          </div>
        </div>
      </section>

      {/* ── FRAME 6: BOTTOM CONVERSION CTA ── */}
      <section className="w-full py-24 px-6 bg-[#141413] text-center text-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-block font-mono text-xs uppercase tracking-widest text-neutral-400 bg-white/10 px-3 py-1 rounded-full">
            Ready to Build
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
            Schedule a 30-minute architectural review.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-normal">
            Directly with a principal systems engineer. Guaranteed response within 24 hours under mutual NDA.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/start"
              className="bg-[#FF3823] hover:bg-[#E0301C] text-white font-medium text-sm px-8 py-3.5 rounded-[4px] transition-colors shadow-sm"
            >
              Start Diagnostic Sprint
            </Link>
            <Link
              href="/contact"
              className="bg-transparent hover:bg-white/10 text-white border border-white/20 font-medium text-sm px-8 py-3.5 rounded-[4px] transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
