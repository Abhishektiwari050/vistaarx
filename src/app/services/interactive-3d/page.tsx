import type { Metadata } from "next";
import Link from "next/link";
import { SpotlightCard } from "@/components/spotlight-card";

export const metadata: Metadata = {
  title: "Creative WebGL & 3D Interactive Web Development Studio",
  description:
    "Award-winning creative development studio. We engineer 60fps WebGL experiences, Three.js shaders, interactive product configurators, and 3D architectural showcases.",
  keywords: [
    "WebGL Development Agency",
    "Hire Three.js Developers",
    "Interactive 3D Web Design",
    "Creative Development Studio",
    "GLSL Shader Engineering",
    "React Three Fiber Agency",
    "Award Winning Web Design",
  ],
  alternates: {
    canonical: "/services/interactive-3d",
  },
  openGraph: {
    title: "Creative WebGL & 3D Interactive Web Development | Vistar Web Systems",
    description:
      "Fluid 60 FPS WebGL canvases, interactive 3D perspective shifts, and award-grade digital brand experiences.",
    url: "https://www.vistar.tech/services/interactive-3d",
    type: "website",
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
    <div className="w-full relative min-h-screen bg-[#faf9f5] text-[#0a0a0a] overflow-x-clip pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="noise-overlay" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 relative z-10 space-y-16">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-zinc-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span>Services</span>
          <span>/</span>
          <span className="text-black font-bold">Creative WebGL &amp; 3D</span>
        </div>

        {/* Hero Section */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3.5 py-1.5 rounded-md text-[9px] font-mono font-black tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#ff1e90]">
            <span className="w-2 h-2 rounded-full bg-[#d8ff42] border border-black animate-pulse" />
            HIGH-INTENT COMMERCIAL SERVICE // CREATIVE WEBGL STUDIO
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-[#0a0a0a] leading-[0.95]">
            Creative WebGL &amp; 3D <br />
            <span className="font-serif italic font-normal text-zinc-400 lowercase">
              that mesmerizes and converts.
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-zinc-700 max-w-3xl leading-relaxed">
            Standard websites are forgotten in seconds. We engineer award-winning 3D web experiences, GPU-accelerated shaders, and interactive spatial interfaces that leave competition in the dust.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/contact"
              className="bg-[#d8ff42] text-black font-display font-black text-xs tracking-widest uppercase px-8 py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#ff1e90] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all interactive"
            >
              Commission A 3D Experience ⚡
            </Link>
            <Link
              href="/work"
              className="bg-white text-black font-display font-black text-xs tracking-widest uppercase px-8 py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#faf9f5] transition-all interactive"
            >
              Explore 3D Work &rarr;
            </Link>
          </div>
        </div>

        {/* Performance Metric Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-[3px] border-black divide-x-[3px] divide-y-[3px] md:divide-y-0 divide-black bg-white shadow-[6px_6px_0px_#000] rounded-2xl overflow-hidden select-none">
          <div className="p-6 text-center group hover:bg-[#d8ff42] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black leading-none mb-1">60 FPS</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-black">Stable Frame Rate</div>
          </div>
          <div className="p-6 text-center group hover:bg-[#ff1e90] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black group-hover:text-white leading-none mb-1">&lt;350KB</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white">Compressed Mesh Budgets</div>
          </div>
          <div className="p-6 text-center group hover:bg-[#d8ff42] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black leading-none mb-1">+180%</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-black">Average Session Lift</div>
          </div>
          <div className="p-6 text-center group hover:bg-[#ff1e90] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black group-hover:text-white leading-none mb-1">100%</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white">Mobile Optimized</div>
          </div>
        </div>

        {/* 3D Capabilities Grid */}
        <div className="space-y-8">
          <div className="border-b-2 border-black/10 pb-4">
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#ff1e90] block mb-1">
              CREATIVE CAPABILITIES
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-black">
              Interactive 3D Solutions We Deliver
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAPABILITIES.map((c) => (
              <SpotlightCard
                key={c.step}
                className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#000] hover:shadow-[8px_8px_0px_#d8ff42] transition-all duration-300"
              >
                <div className="space-y-4">
                  <span className="font-mono text-xs font-black px-2.5 py-1 rounded bg-black text-[#d8ff42] inline-block">
                    PILLAR {c.step}
                  </span>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-black">
                    {c.title}
                  </h3>
                  <p className="font-sans text-sm text-zinc-600 leading-relaxed">
                    {c.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-black/5 border border-black/10 text-zinc-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-black text-white border-[3px] border-black rounded-3xl p-8 sm:p-12 shadow-[8px_8px_0px_#d8ff42] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-[9px] font-black tracking-widest uppercase text-[#d8ff42] bg-[#d8ff42]/10 border border-[#d8ff42]/20 px-3 py-1 rounded-full inline-block">
              Awwwards-Grade Standard
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white leading-tight">
              Ready to create an unforgettable 3D brand presence?
            </h3>
            <p className="font-sans text-sm text-zinc-400 leading-relaxed">
              We design and develop custom 3D web systems that combine visual spectacle with rock-solid engineering.
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 bg-[#d8ff42] text-black font-display font-black text-xs tracking-widest uppercase px-8 py-5 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#ff1e90] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all interactive"
          >
            Start Your 3D Project ⚡
          </Link>
        </div>
      </div>
    </div>
  );
}
