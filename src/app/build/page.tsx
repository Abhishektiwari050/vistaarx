import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/vistar-card";
import { Button } from "@/components/vistar-button";
import { BuildGrammarDiagram } from "@/components/diagrams/build-grammar-diagram";

import { DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "BUILD — Software & AI Engineering Systems",
  description:
    "Full-stack web applications and autonomous AI systems built from raw primitives. We engineer clean, type-safe architectures with 100% client code ownership and zero template debt.",
  alternates: {
    canonical: "/build",
  },
  openGraph: {
    title: "BUILD — Software & AI Engineering Systems",
    description:
      "Full-stack web applications and autonomous AI systems built from raw primitives. 100% client code ownership and sub-second performance.",
    url: "https://www.vistar.tech/build",
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Software & AI Engineering Systems",
  name: "BUILD by VISTAR",
  provider: {
    "@type": "Organization",
    name: "VISTAR",
    url: "https://www.vistar.tech",
  },
  description:
    "Full-stack web applications and autonomous AI agent systems built from raw primitives. Clean type-safe architectures with 100% client codebase ownership.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Build Engineering Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full-Stack Web Architecture (Next.js & TypeScript)",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Autonomous AI Agent Workflows & Vector Embeddings",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Distributed Backends & High-Performance Data Layers",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sovereign Codebase Handover & CI/CD Pipelines",
        },
      },
    ],
  },
};

const CAPABILITIES = [
  {
    number: "01",
    title: "Full-Stack Web Architecture",
    stack: "Next.js 15 · React 19 RSC · TypeScript · Tailwind CSS",
    description:
      "We build mission-critical web applications with React Server Components, streaming SSR, and edge compute. Every interface is constructed from raw semantic primitives with zero disposable template dependencies.",
    specs: [
      "Sub-100ms Time to First Byte (TTFB) globally",
      "Strict compile-time TypeScript type checking",
      "Zero layout shift (CLS < 0.05) and instant interaction (INP < 150ms)",
      "Progressive enhancement with full accessibility compliance",
    ],
  },
  {
    number: "02",
    title: "Autonomous AI Systems & Tooling",
    stack: "FastAPI · pgvector · OpenAI / Anthropic / Local Models · Python",
    description:
      "Deterministic agent workflows that automate core business logic. We reject fragile chat wrappers in favor of structured tool calls, vector similarity search, and robust guardrails that run with mathematical predictability.",
    specs: [
      "Sub-50ms vector semantic search via PostgreSQL pgvector",
      "Constrained JSON schema outputs and validation gates",
      "Multi-agent task pipelines with state persistence",
      "Self-healing error recovery and token usage telemetry",
    ],
  },
  {
    number: "03",
    title: "Distributed Backend & Data Modeling",
    stack: "PostgreSQL · Redis · Docker · Node.js / Python / Go",
    description:
      "Relational data schemas and caching tiers architected for high transaction volume. We establish strict foreign key constraints, connection pooling, and automated database migration pipelines.",
    specs: [
      "ACID transactional guarantees with automated migration rollbacks",
      "High-throughput Redis caching and rate-limiting middleware",
      "Isolated containerized deployment environments",
      "Zero vendor database lock-in: runs on AWS, GCP, or bare metal",
    ],
  },
  {
    number: "04",
    title: "API Contracts & Real-Time Ingestion",
    stack: "REST · Server-Sent Events · WebSockets · Webhooks",
    description:
      "High-concurrency data ingestion pipelines and real-time streaming interfaces. We design clean, self-documenting API contracts that integrate seamlessly with third-party enterprise providers.",
    specs: [
      "Streaming responses for generative LLM outputs",
      "Idempotent webhook processing with exponential backoff queues",
      "Automated OpenAPI / Swagger contract generation",
      "Sub-50ms internal inter-service communication latency",
    ],
  },
];

const DELIVERABLES = [
  {
    label: "SOVEREIGN OWNERSHIP",
    title: "100% Client Codebase Handover",
    body: "You receive clean, documented source code directly in your organization's GitHub repository. No proprietary licensing, no recurring agency lock-in, no hostage codebases.",
  },
  {
    label: "AUTOMATED TESTING",
    title: "End-to-End Verification Suites",
    body: "Every critical user path and API contract is guarded by automated unit tests (Vitest) and end-to-end browser tests (Playwright), running on GitHub Actions CI.",
  },
  {
    label: "INFRASTRUCTURE AS CODE",
    title: "Automated Deployment Pipelines",
    body: "Reproducible CI/CD configurations for Vercel, AWS, or Docker containers. Staging environments automatically mirror production with zero manual deployment steps.",
  },
  {
    label: "ARCHITECTURE SPECS",
    title: "Comprehensive Technical Schematics",
    body: "Detailed domain models, API schemas, and deployment runbooks so your internal engineering team can immediately maintain and extend the system without friction.",
  },
];

const METHODOLOGY = [
  {
    phase: "01",
    name: "Domain Modeling & Architecture Blueprint",
    timing: "Days 1–3",
    deliverable: "Entity relationship schema, system sequence diagrams, and API contract specification.",
  },
  {
    phase: "02",
    name: "Primitive Construction & Core Integration",
    timing: "Days 4–10",
    deliverable: "Type-safe database schemas, server components, and autonomous agent processing loops.",
  },
  {
    phase: "03",
    name: "Automated Verification & Hardening",
    timing: "Days 11–13",
    deliverable: "Playwright E2E test runs, OWASP security audit, and sub-100ms performance tuning.",
  },
  {
    phase: "04",
    name: "Production Handover & Telemetry Handoff",
    timing: "Days 14–15",
    deliverable: "Repository ownership transfer, live DNS cutover, and telemetry routing to DISCOVER layer.",
  },
];

export default function BuildPage() {
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
              <span className="type-label text-[#0284C7]">01 // LAYER 01: BUILD</span>
              <span className="text-xs text-[#94A3B8] font-mono">→ DISCOVER → GROW</span>
            </div>
            <h1 className="type-display">
              BUILD
            </h1>
            <p className="type-h3 text-[#0B1320] max-w-3xl">
              Software &amp; AI Engineering Systems Engineered from Raw Primitives.
            </p>
            <p className="type-body text-[#475569] max-w-3xl">
              We engineer full-stack web applications, autonomous AI agent pipelines, and distributed backends. Built from first principles with zero disposable agency template debt and 100% client codebase ownership.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button href="/start" variant="primary">
                START A BUILD SPRINT
              </Button>
              <Button href="#capabilities" variant="secondary">
                EXPLORE PRIMITIVES ↓
              </Button>
            </div>
          </div>

          {/* Grammar Topology Diagram */}
          <div className="pt-6">
            <BuildGrammarDiagram />
          </div>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES (PRIMITIVES) */}
      <section id="capabilities" className="vistar-section border-b border-[rgba(56, 189, 248, 0.15)]">
        <div className="vistar-container space-y-12">
          <div className="space-y-3 max-w-3xl">
            <p className="type-label text-[#0284C7]">02 // CAPABILITIES</p>
            <h2 className="type-h2">Engineering Primitives</h2>
            <p className="type-body text-[#475569]">
              Every system is assembled from verified technological building blocks. We use typed languages, compiled runtimes, and resilient data structures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAPABILITIES.map((cap) => (
              <Card key={cap.number} className="p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between border-b border-[rgba(56, 189, 248, 0.15)] pb-3">
                    <span className="font-mono text-xs text-[#0284C7] font-semibold">{cap.number} // ARCHITECTURE</span>
                    <span className="font-mono text-[11px] text-[#94A3B8] truncate max-w-[200px]">{cap.stack}</span>
                  </div>
                  <h3 className="type-h3">{cap.title}</h3>
                  <p className="type-body text-[#475569] text-sm">{cap.description}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-[rgba(56, 189, 248, 0.15)]">
                  <p className="type-label text-[11px] text-[#94A3B8]">VERIFIABLE SPECIFICATIONS</p>
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

      {/* 3. DELIVERABLES & SOVEREIGN CONTRACT */}
      <section className="vistar-section border-b border-[rgba(56, 189, 248, 0.15)] bg-[#EBEAE5]">
        <div className="vistar-container space-y-12">
          <div className="space-y-3 max-w-3xl">
            <p className="type-label text-[#0284C7]">03 // DELIVERABLES</p>
            <h2 className="type-h2">The Sovereign Ownership Contract</h2>
            <p className="type-body text-[#475569]">
              Traditional development agencies thrive on dependency and vendor lock-in. Vistar delivers completely sovereign technology assets that remain permanently under your control.
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
            <h2 className="type-h2">14–21 Day Production Sprint</h2>
            <p className="type-body text-[#475569]">
              We do not bill open-ended hourly retainers. We execute focused, fixed-scope engineering sprints designed to ship working software into production.
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

      {/* 5. INTER-LAYER SYSTEM HANDOFF (BUILD -> DISCOVER) */}
      <section className="vistar-section border-b border-[rgba(56, 189, 248, 0.15)] bg-[#EBEAE5]">
        <div className="vistar-container flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="type-label text-[#0284C7]">SYSTEM CONTINUITY // LAYER HANDOFF</span>
            <h3 className="type-h3">
              Code Without Distribution Is Static Potential.
            </h3>
            <p className="type-body text-[#475569] text-base">
              A performant application requires an organic audience. Every build sprint outputs clean semantic markup, structured JSON-LD schemas, and edge caching rules that feed directly into Layer 02.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button href="/discover" variant="primary">
              EXPLORE LAYER 02: DISCOVER
            </Button>
          </div>
        </div>
      </section>

      {/* 6. FINAL ACTION */}
      <section className="vistar-section">
        <div className="vistar-container text-center space-y-8 max-w-3xl mx-auto">
          <p className="type-label text-[#0284C7]">05 // START</p>
          <h2 className="type-h2">Ready to Engineer a Sovereign System?</h2>
          <p className="type-body text-[#475569]">
            Take our 6-step project diagnostic to evaluate technical requirements, timeline, and architectural scope.
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
