import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Globe, ArrowRight, ShieldCheck, Zap, Layers, CheckCircle2 } from "lucide-react";
import { KEYWORDS, BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Next.js Development Agency — Hire Next.js & React Engineers | VISTAR",
  description:
    "Hire senior Next.js developers. VISTAR builds enterprise Next.js App Router applications with sub-100ms TTFB, React 19 Server Components, Core Web Vitals optimization, and 100% source code ownership. No vendor lock-in.",
  keywords: KEYWORDS.nextjsEngineering,
  alternates: {
    canonical: `${BASE_URL}/services/nextjs-engineering`,
  },
  openGraph: {
    title: "Next.js Development Agency — Hire Next.js & React Engineers | VISTAR",
    description:
      "Senior Next.js engineers for enterprise web applications. Sub-100ms TTFB, React 19 Server Components, full source code ownership.",
    url: `${BASE_URL}/services/nextjs-engineering`,
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Development Agency — Hire Next.js & React Engineers | VISTAR",
    description:
      "Senior Next.js engineers for enterprise web applications. Sub-100ms TTFB, full source code ownership.",
    images: [DEFAULT_OG_IMAGES[0].url],
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
    tags: ["React 19", "Next.js 16", "Streaming SSR"],
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
              Services // Next.js &amp; Web Systems
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold text-[#0E1118] tracking-tight leading-[1.08]">
            Enterprise Next.js &amp;{" "}
            <span className="font-serif italic font-normal text-[#FF3823]">
              App Router
            </span>{" "}
            Engineering.
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Eliminate sluggish WordPress plugins and fragile Webflow sites. We build custom Next.js 16 platforms with sub-100ms TTFB, 99+ Lighthouse performance, and 100% repository ownership.
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
              Explore Next.js Platforms
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. CAPABILITIES GRID ── */}
      <section className="max-w-6xl mx-auto px-6 py-24 space-y-16">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest border border-black/15 px-2.5 py-1 rounded bg-white">
            Architecture Core
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0E1118] tracking-tight mt-3">
            High-Performance Deliverables
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DELIVERABLES.map((item) => (
            <div
              key={item.step}
              className="bg-white border border-black/10 rounded-[6px] p-8 shadow-sm space-y-4 hover:border-black/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#FF3823] uppercase tracking-wider">
                    MODULE // {item.step}
                  </span>
                  <span className="font-serif text-2xl font-bold text-neutral-300">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0E1118]">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5">
                {item.tags.map((t, idx) => (
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
            Accelerate your web architecture.
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto">
            14-day production delivery with verified 99+ Core Web Vitals.
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
