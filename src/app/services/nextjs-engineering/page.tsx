import type { Metadata } from "next";
import Link from "next/link";
import { SpotlightCard } from "@/components/spotlight-card";

export const metadata: Metadata = {
  title: "Enterprise Next.js Development & App Router Engineering",
  description:
    "Hire elite Next.js developers. We build custom high-performance web applications with sub-100ms TTFB, 99+ Lighthouse scores, React 19 Server Components, and 100% code ownership.",
  keywords: [
    "Enterprise Next.js Development",
    "Hire Next.js Developers",
    "Next.js App Router Migration",
    "React Performance Optimization",
    "Headless Shopify Next.js",
    "Core Web Vitals Consulting",
    "Sub-100ms TTFB Agency",
  ],
  alternates: {
    canonical: "/services/nextjs-engineering",
  },
  openGraph: {
    title: "Enterprise Next.js Development & Engineering | Vistar Web Systems",
    description:
      "Production-grade Next.js systems engineered for maximum velocity, sub-100ms TTFB, and zero layout shifts.",
    url: "https://www.vistar.tech/services/nextjs-engineering",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Enterprise Next.js Development & React Engineering",
  provider: {
    "@type": "Organization",
    name: "Vistar Web Systems",
    url: "https://www.vistar.tech",
  },
  description:
    "End-to-end Next.js application architecture, App Router migrations, Core Web Vitals optimization, and edge-rendered headless web systems.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    description: "Fixed-scope 14–21 day production sprints with complete code ownership.",
  },
};

const DELIVERABLES = [
  {
    step: "01",
    title: "App Router & Server Component Architecture",
    desc: "Migrate legacy codebases or construct from zero using Next.js App Router, streaming SSR, and React 19 Server Components for instant page transitions.",
    tags: ["React 19", "Next.js 15/16", "Streaming SSR"],
  },
  {
    step: "02",
    title: "Sub-100ms Edge TTFB & Caching Strategy",
    desc: "Deploy edge middleware, stale-while-revalidate data fetching, and intelligent CDN caching rules across Vercel and Cloudflare networks.",
    tags: ["Edge Caching", "ISR", "Cloudflare Workers"],
  },
  {
    step: "03",
    title: "Strict Core Web Vitals 99+ Guarantee",
    desc: "Zero layout shifts (CLS 0.000), optimized largest contentful paint (LCP < 1.2s), and minimal total blocking time (TBT < 50ms) backed by contract SLA.",
    tags: ["Lighthouse P99", "CLS 0.000", "Asset Optimization"],
  },
  {
    step: "04",
    title: "Full Code Handover & CI/CD Pipeline",
    desc: "Complete, unencumbered source code ownership in your private GitHub repository with automated GitHub Actions, type checking, and preview branches.",
    tags: ["GitHub Actions", "Turbopack", "100% IP Ownership"],
  },
];

export default function NextJSEngineeringPage() {
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
          <span className="text-black font-bold">Next.js Engineering</span>
        </div>

        {/* Hero Section */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3.5 py-1.5 rounded-md text-[9px] font-mono font-black tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#ff1e90]">
            <span className="w-2 h-2 rounded-full bg-[#d8ff42] border border-black animate-pulse" />
            HIGH-INTENT COMMERCIAL SERVICE // NEXT.JS SPECIALISTS
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-[#0a0a0a] leading-[0.95]">
            Enterprise Next.js <br />
            <span className="font-serif italic font-normal text-zinc-400 lowercase">
              built for speed, scale &amp; revenue.
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-zinc-700 max-w-3xl leading-relaxed">
            Stop losing conversions to slow, bloated templates. We engineer bespoke Next.js web applications with sub-100ms TTFB, 99+ Lighthouse performance scores, and uncompromised code ownership.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/contact"
              className="bg-[#d8ff42] text-black font-display font-black text-xs tracking-widest uppercase px-8 py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#ff1e90] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all interactive"
            >
              Book Technical Consultation ⚡
            </Link>
            <Link
              href="/work"
              className="bg-white text-black font-display font-black text-xs tracking-widest uppercase px-8 py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#faf9f5] transition-all interactive"
            >
              Inspect Shipped Code &rarr;
            </Link>
          </div>
        </div>

        {/* SLA Benchmark Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-[3px] border-black divide-x-[3px] divide-y-[3px] md:divide-y-0 divide-black bg-white shadow-[6px_6px_0px_#000] rounded-2xl overflow-hidden select-none">
          <div className="p-6 text-center group hover:bg-[#d8ff42] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black leading-none mb-1">&lt;100ms</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-black">Global Edge TTFB</div>
          </div>
          <div className="p-6 text-center group hover:bg-[#ff1e90] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black group-hover:text-white leading-none mb-1">99 / 100</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white">Lighthouse Performance</div>
          </div>
          <div className="p-6 text-center group hover:bg-[#d8ff42] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black leading-none mb-1">0.000</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-black">CLS Layout Shift</div>
          </div>
          <div className="p-6 text-center group hover:bg-[#ff1e90] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black group-hover:text-white leading-none mb-1">14–21d</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white">Production Deployment</div>
          </div>
        </div>

        {/* Deliverables Architecture */}
        <div className="space-y-8">
          <div className="border-b-2 border-black/10 pb-4">
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#ff1e90] block mb-1">
              ENGINEERING DELIVERABLES
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-black">
              What We Architect For Your Business
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DELIVERABLES.map((d) => (
              <SpotlightCard
                key={d.step}
                className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#000] hover:shadow-[8px_8px_0px_#d8ff42] transition-all duration-300"
              >
                <div className="space-y-4">
                  <span className="font-mono text-xs font-black px-2.5 py-1 rounded bg-black text-[#d8ff42] inline-block">
                    PHASE {d.step}
                  </span>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-black">
                    {d.title}
                  </h3>
                  <p className="font-sans text-sm text-zinc-600 leading-relaxed">
                    {d.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {d.tags.map((t) => (
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
              Ready To Deploy
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white leading-tight">
              Let&apos;s build your next high-performance platform.
            </h3>
            <p className="font-sans text-sm text-zinc-400 leading-relaxed">
              We take on a maximum of 2 enterprise builds per month to maintain flawless engineering standards.
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 bg-[#d8ff42] text-black font-display font-black text-xs tracking-widest uppercase px-8 py-5 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#ff1e90] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all interactive"
          >
            Start Your Next.js Sprint ⚡
          </Link>
        </div>
      </div>
    </div>
  );
}
