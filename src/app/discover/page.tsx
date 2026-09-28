import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/vistar-card";
import { Button } from "@/components/vistar-button";
import { DiscoverGrammarDiagram } from "@/components/diagrams/discover-grammar-diagram";

import { DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "DISCOVER — Distribution & Technical Reach Systems",
  description:
    "Programmatic SEO engines, sub-second Core Web Vitals, structured schema graphs, and algorithmic visibility infrastructure. We engineer distribution as a software system.",
  alternates: {
    canonical: "/discover",
  },
  openGraph: {
    title: "DISCOVER — Distribution & Technical Reach Systems",
    description:
      "Programmatic SEO engines, sub-second Core Web Vitals, structured schema graphs, and algorithmic visibility infrastructure.",
    url: "https://www.vistar.tech/discover",
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Distribution & Technical Reach Systems",
  name: "DISCOVER by VISTAR",
  provider: {
    "@type": "Organization",
    name: "VISTAR",
    url: "https://www.vistar.tech",
  },
  description:
    "Programmatic SEO engines, sub-second Core Web Vitals, structured schema graphs, and algorithmic visibility infrastructure for modern enterprises.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Discover Distribution Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Programmatic SEO Engines & Dynamic Page Generation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sub-Second Core Web Vitals & Edge CDN Optimization",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Structured Data, Schema.org & Knowledge Graph Modeling",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "LLM & AI Search Indexation (llms.txt & Semantic Markup)",
        },
      },
    ],
  },
};

const CAPABILITIES = [
  {
    number: "01",
    title: "Programmatic SEO & Dynamic Indexation",
    stack: "Next.js ISR · Dynamic Route Generation · PostgreSQL · Automated Sitemaps",
    description:
      "Database-driven search surface expansion. Instead of handcrafting dozens of static marketing pages, we build algorithmic landing page engines that render thousands of high-intent, targeted pages with zero performance penalty.",
    specs: [
      "Sub-150ms dynamic page generation via Incremental Static Regeneration",
      "Automated XML sitemap splitting and search crawler indexation pings",
      "Dynamic Open Graph metadata and social card generation per route",
      "Strict canonical URL modeling to prevent duplicate content penalties",
    ],
  },
  {
    number: "02",
    title: "Sub-Second Core Web Vitals & Edge Delivery",
    stack: "Vercel Edge Network · HTTP/3 · CSS Purging · Brotli Compression",
    description:
      "Speed is a primary algorithmic ranking vector. We optimize font loading, server execution, and asset delivery to guarantee sub-second LCP and flawless Lighthouse scores across mobile and desktop devices.",
    specs: [
      "Largest Contentful Paint (LCP) strictly under 1.2 seconds",
      "Cumulative Layout Shift (CLS) capped below 0.02",
      "Interaction to Next Paint (INP) under 100 milliseconds",
      "Zero render-blocking scripts in the critical render path",
    ],
  },
  {
    number: "03",
    title: "Structured Data & Knowledge Graphs",
    stack: "JSON-LD · Schema.org · Google Rich Results Validation",
    description:
      "We embed exhaustive semantic entities into the HTML structure. Search engine crawlers understand your exact organization hierarchy, service catalog, software specifications, and pricing terms directly through structured data.",
    specs: [
      "Nested Organization, Service, WebSite, and FAQPage schemas",
      "100% Google Rich Results test validation on all production URLs",
      "Semantic breadcrumb hierarchy mapping for instant SERP sitelinks",
      "Entity disambiguation for high-authority enterprise search panels",
    ],
  },
  {
    number: "04",
    title: "LLM & AI Engine Discoverability",
    stack: "llms.txt · Semantic HTML5 · Markdown Feeds · AI Crawler Support",
    description:
      "Search is shifting from classic keyword matching to generative AI reasoning engines. We engineer structured markdown outputs, llms.txt manifests, and semantic document trees so Perplexity, ChatGPT, and Claude ingest your products accurately.",
    specs: [
      "Standardized llms.txt and llms-full.txt manifest files",
      "Clean markdown export endpoints for AI crawler citation",
      "Semantic HTML article parsing with clean heading hierarchies",
      "Zero JavaScript payload requirement for complete AI indexation",
    ],
  },
];

const DELIVERABLES = [
  {
    label: "PROGRAMMATIC ENGINE",
    title: "Dynamic Indexing Architecture",
    body: "A custom programmatic generation engine integrated into your Next.js codebase, capable of generating search landing pages at scale from your product database.",
  },
  {
    label: "RICH RESULTS SCHEMA",
    title: "JSON-LD Entity Graph",
    body: "Full Schema.org implementation across every production route, verified against Google Rich Results standards for enhanced SERP snippets and knowledge panels.",
  },
  {
    label: "PERFORMANCE AUDIT",
    title: "Core Web Vitals Guarantee",
    body: "Comprehensive Lighthouse and WebPageTest audit reports validating 95+ scores across Performance, Accessibility, Best Practices, and SEO on 4G throttling.",
  },
  {
    label: "AI INDEXATION",
    title: "llms.txt Manifest & Feeds",
    body: "Machine-readable documentation feeds engineered specifically for AI search engines, citation algorithms, and agentic researchers.",
  },
];

const METHODOLOGY = [
  {
    phase: "01",
    name: "Search Surface & Intent Mapping",
    timing: "Days 1–3",
    deliverable: "Taxonomy audit, programmatic entity model, and competitor crawl gap analysis.",
  },
  {
    phase: "02",
    name: "Schema Architecture & Edge Tuning",
    timing: "Days 4–7",
    deliverable: "JSON-LD entity graph wiring, global CDN edge caching rules, and font sub-setting.",
  },
  {
    phase: "03",
    name: "Programmatic Engine Implementation",
    timing: "Days 8–11",
    deliverable: "Dynamic ISR generation pipeline, automated XML sitemaps, and llms.txt endpoints.",
  },
  {
    phase: "04",
    name: "Indexation Verification & Handoff",
    timing: "Days 12–14",
    deliverable: "Google Search Console submission, rich snippet verification, and routing to GROW.",
  },
];

export default function DiscoverPage() {
  return (
    <div className="relative min-h-screen bg-transparent text-[#0B1320] w-full">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* 1. HERO SECTION */}
      <section className="vistar-section pt-24 md:pt-32 border-b border-[rgba(56, 189, 248, 0.15)]">
        <div className="vistar-container space-y-12">
          {/* Overline & System Breadcrumb */}
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="type-label text-[#0284C7]">02 // LAYER 02: DISCOVER</span>
              <span className="text-xs text-[#94A3B8] font-mono">BUILD → <strong>DISCOVER</strong> → GROW</span>
            </div>
            <h1 className="type-display">
              DISCOVER
            </h1>
            <p className="type-h3 text-[#0B1320] max-w-3xl">
              Distribution &amp; Technical Reach Systems Engineered for Algorithmic Dominance.
            </p>
            <p className="type-body text-[#475569] max-w-3xl">
              We treat distribution as an engineering discipline, not a creative guesswork campaign. Through programmatic SEO architectures, sub-second edge delivery, structured knowledge graphs, and LLM indexation manifests, we engineer reliable organic acquisition.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button href="/start" variant="primary">
                START A DISCOVERY SPRINT
              </Button>
              <Button href="#capabilities" variant="secondary">
                EXPLORE REACH SYSTEMS ↓
              </Button>
            </div>
          </div>

          {/* Grammar Reach Diagram */}
          <div className="pt-6">
            <DiscoverGrammarDiagram />
          </div>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES (REACH VECTORS) */}
      <section id="capabilities" className="vistar-section border-b border-[rgba(56, 189, 248, 0.15)]">
        <div className="vistar-container space-y-12">
          <div className="space-y-3 max-w-3xl">
            <p className="type-label text-[#0284C7]">02 // CAPABILITIES</p>
            <h2 className="type-h2">Distribution Primitives</h2>
            <p className="type-body text-[#475569]">
              Organic visibility is achieved by satisfying the exact technical heuristics of search algorithms and AI citation crawlers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAPABILITIES.map((cap) => (
              <Card key={cap.number} className="p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between border-b border-[rgba(56, 189, 248, 0.15)] pb-3">
                    <span className="font-mono text-xs text-[#0284C7] font-semibold">{cap.number} // REACH VECTOR</span>
                    <span className="font-mono text-[11px] text-[#94A3B8] truncate max-w-[200px]">{cap.stack}</span>
                  </div>
                  <h3 className="type-h3">{cap.title}</h3>
                  <p className="type-body text-[#475569] text-sm">{cap.description}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-[rgba(56, 189, 248, 0.15)]">
                  <p className="type-label text-[11px] text-[#94A3B8]">ENGINEERED SPECIFICATIONS</p>
                  <ul className="space-y-1.5 text-xs text-[#475569] font-mono">
                    {cap.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#0284C7] mt-0.5">▪</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DELIVERABLES */}
      <section className="vistar-section border-b border-[rgba(56, 189, 248, 0.15)] bg-[#F0F7FD]/60">
        <div className="vistar-container space-y-12">
          <div className="space-y-3 max-w-3xl">
            <p className="type-label text-[#0284C7]">03 // DELIVERABLES</p>
            <h2 className="type-h2">The Distribution Infrastructure</h2>
            <p className="type-body text-[#475569]">
              We hand over permanent algorithmic assets. Once deployed into your code repository, your distribution systems continue indexing and generating organic leverage automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {DELIVERABLES.map((deliv, idx) => (
              <Card key={idx} className="p-6 space-y-4">
                <span className="type-label text-[#0284C7] text-[11px] block">{deliv.label}</span>
                <h4 className="font-semibold text-lg text-[#0B1320]">{deliv.title}</h4>
                <p className="text-sm text-[#475569] leading-relaxed">{deliv.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXECUTION METHODOLOGY */}
      <section className="vistar-section border-b border-[rgba(56, 189, 248, 0.15)]">
        <div className="vistar-container space-y-12">
          <div className="space-y-3 max-w-3xl">
            <p className="type-label text-[#0284C7]">04 // METHODOLOGY</p>
            <h2 className="type-h2">14-Day Distribution Sprint</h2>
            <p className="type-body text-[#475569]">
              A rapid, highly focused technical sprint establishing search dominance and sub-second edge distribution for your digital assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {METHODOLOGY.map((step) => (
              <div key={step.phase} className="p-6 border border-[rgba(56, 189, 248, 0.15)] rounded-[4px] space-y-3 bg-white shadow-sm">
                <div className="flex items-center justify-between font-mono text-xs pb-2 border-b border-[rgba(56, 189, 248, 0.15)]">
                  <span className="text-[#0284C7] font-bold">PHASE {step.phase}</span>
                  <span className="text-[#94A3B8]">{step.timing}</span>
                </div>
                <h4 className="font-semibold text-base text-[#0B1320]">{step.name}</h4>
                <p className="text-xs text-[#475569] leading-relaxed">{step.deliverable}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTER-LAYER SYSTEM HANDOFF (DISCOVER -> GROW) */}
      <section className="vistar-section border-b border-[rgba(56, 189, 248, 0.15)] bg-[#F0F7FD]/60">
        <div className="vistar-container flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="type-label text-[#0284C7]">SYSTEM CONTINUITY // LAYER HANDOFF</span>
            <h3 className="type-h3">
              Traffic Without Retention Is A Leaky Bucket.
            </h3>
            <p className="type-body text-[#475569] text-base">
              Once discovery infrastructure captures qualified demand, behavioral telemetry must immediately ingest user actions. We connect your inbound traffic streams directly into the retention engine: Layer 03.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button href="/grow" variant="primary">
              EXPLORE LAYER 03: GROW
            </Button>
          </div>
        </div>
      </section>

      {/* 6. FINAL ACTION */}
      <section className="vistar-section">
        <div className="vistar-container text-center space-y-8 max-w-3xl mx-auto">
          <p className="type-label text-[#0284C7]">05 // START</p>
          <h2 className="type-h2">Ready to Scale Your Technical Reach?</h2>
          <p className="type-body text-[#475569]">
            Take our 6-step project diagnostic to analyze your search surface, performance profile, and distribution architecture.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button href="/start" variant="primary">
              START A PROJECT
            </Button>
            <Button href="/work" variant="secondary">
              VIEW CASE STUDIES
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
