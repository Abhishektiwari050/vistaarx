import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Box, ArrowRight, ShieldCheck, Sparkles, Layers, CheckCircle2 } from "lucide-react";
import { KEYWORDS, BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "WebGL & Three.js Interactive 3D Web Development Studio | VISTAR",
  description:
    "VISTAR builds 60fps WebGL and Three.js interactive 3D websites. Award-quality immersive web experiences, 3D product configurators, architectural visualizations, and real estate 3D platforms. Full source code ownership.",
  keywords: KEYWORDS.interactive3D,
  alternates: {
    canonical: `${BASE_URL}/services/interactive-3d`,
  },
  openGraph: {
    title: "WebGL & Three.js Interactive 3D Web Development | VISTAR",
    description:
      "60fps WebGL canvases, Three.js scenes, interactive product configurators, and immersive 3D brand experiences. Full source code ownership.",
    url: `${BASE_URL}/services/interactive-3d`,
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "WebGL & Three.js Interactive 3D Web Development | VISTAR",
    description:
      "60fps WebGL, Three.js 3D web experiences, interactive product configurators, and real estate visualization platforms.",
    images: [DEFAULT_OG_IMAGES[0].url],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Creative WebGL & 3D Interactive Development",
  provider: {
    "@type": "Organization",
    name: "Vistar Web Systems",
    url: "https://www.vistar.tech",
  },
  description:
    "Bespoke Three.js and WebGL architectures, custom GLSL shader pipelines, interactive product configurators, and immersive brand storytelling.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    description: "Creative engineering sprints delivering 60 FPS WebGL experiences with graceful mobile fallbacks.",
  },
};

const CAPABILITIES = [
  {
    step: "01",
    title: "60 FPS Interactive WebGL & Three.js",
    desc: "Lightweight 3D scene graphs optimized for mobile and desktop viewports. Procedural geometry, mouse-tracking perspective parallax, and silky-smooth rendering.",
    tags: ["Three.js", "React Three Fiber", "60 FPS Native"],
  },
  {
    step: "02",
    title: "Custom GLSL Fragment & Vertex Shaders",
    desc: "Direct GPU computation for liquid glass reflections, procedural noise landscapes, real-time lighting physics, and bespoke aesthetic shaders.",
    tags: ["GLSL Shaders", "GPU Computing", "Post-Processing"],
  },
  {
    step: "03",
    title: "Architectural & Luxury Showcase Platforms",
    desc: "Interactive spatial presentations for high-end real estate, luxury product releases, and industrial machinery with smooth camera choreography.",
    tags: ["PropTech 3D", "Camera Choreography", "Luxury DTC"],
  },
  {
    step: "04",
    title: "Graceful Mobile & Battery Fallbacks",
    desc: "Adaptive resolution scaling, WebGL context loss recovery, and low-power fallbacks ensuring low-end mobile devices load fast without stutter.",
    tags: ["Adaptive DPR", "Battery Friendly", "Zero Jitter"],
  },
];

export default function Interactive3DPage() {
  return (
    <main className="w-full bg-[#FAF9F5] text-[#0E1118] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen pt-20 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ── 1. JASPER HERO: ARCHITECTURAL BLUEPRINT GRID ── */}
      <section className="relative jasper-grid-hero border-b border-black/10 pt-20 pb-28 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/5 border border-black/10 text-neutral-800 font-mono text-xs uppercase tracking-wider font-semibold rounded-[2px]">
              Services // Creative 3D &amp; WebGL
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold text-[#0E1118] tracking-tight leading-[1.08]">
            Interactive 3D WebGL &amp;{" "}
            <span className="font-serif italic font-normal text-[#1E60E6]">
              Shader
            </span>{" "}
            Engineering.
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Transform static corporate websites into award-grade interactive spatial experiences. We engineer 60fps Three.js canvases, procedural GLSL shaders, and luxury brand configurators with sub-second asset hydration.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/start"
              className="bg-[#FF3823] hover:bg-[#E0301C] text-white px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm inline-flex items-center gap-2"
            >
              Start Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/work"
              className="bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-900 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm inline-flex items-center gap-2"
            >
              Explore 3D Work
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. CAPABILITIES GRID ── */}
      <section className="max-w-6xl mx-auto px-6 py-24 space-y-16">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest border border-black/15 px-2.5 py-1 rounded bg-white">
            Shader &amp; Canvas Core
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0E1118] tracking-tight mt-3">
            Bespoke Creative Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.step}
              className="bg-white border border-black/10 rounded-[6px] p-8 shadow-sm space-y-4 hover:border-black/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#FF3823] uppercase tracking-wider">
                    MODULE // {cap.step}
                  </span>
                  <span className="font-serif text-2xl font-bold text-neutral-300">
                    {cap.step}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0E1118]">
                  {cap.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {cap.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5">
                {cap.tags.map((t, idx) => (
                  <span key={idx} className="font-mono text-[11px] px-2.5 py-1 bg-[#FAF9F5] border border-black/10 rounded text-neutral-600">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. FINAL CTA ── */}
      <section className="w-full py-20 px-6 jasper-grid-hero border-t border-black/10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0E1118]">
            Bring your digital brand to life in 3D.
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto">
            14-day production delivery sprints with 60 FPS verified mobile benchmarks.
          </p>
          <div className="pt-2">
            <Link
              href="/start"
              className="bg-[#FF3823] hover:bg-[#E0301C] text-white px-8 py-4 font-semibold text-sm rounded-[4px] shadow-sm inline-flex items-center gap-2"
            >
              Start Technical Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
