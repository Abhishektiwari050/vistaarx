import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/vistar-card";
import { Button } from "@/components/vistar-button";
import { GrowGrammarDiagram } from "@/components/diagrams/grow-grammar-diagram";

import { DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "GROW — Lifecycle & Retention Operations",
  description:
    "Event-driven telemetry pipelines, automated retention workflows, cohort analytics, and product feedback loops. Growth engineered as a closed-loop system.",
  alternates: {
    canonical: "/grow",
  },
  openGraph: {
    title: "GROW — Lifecycle & Retention Operations",
    description:
      "Event-driven telemetry pipelines, automated retention workflows, cohort analytics, and product feedback loops.",
    url: "https://www.vistar.tech/grow",
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Lifecycle & Retention Operations Systems",
  name: "GROW by VISTAR",
  provider: {
    "@type": "Organization",
    name: "VISTAR",
    url: "https://www.vistar.tech",
  },
  description:
    "Event-driven telemetry pipelines, automated retention workflows, cohort analytics, and product feedback loops for modern businesses.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Grow Retention Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Event-Driven Telemetry & Server-Side Event Streaming",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automated Lifecycle Workflows & Multi-Channel Triggers",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cohort Retention Modeling & Churn Telemetry",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Closed-Loop Product Feedback Ingestion (Returning to BUILD)",
        },
      },
    ],
  },
};

const CAPABILITIES = [
  {
    number: "01",
    title: "Event-Driven Telemetry Infrastructure",
    stack: "Redis Streams · PostgreSQL · Server-Side Ingestion · Audit Logs",
    description:
      "Reliable event streaming pipelines that record critical user touchpoints with zero client-side ad blocker vulnerabilities. Every conversion, API invocation, and friction point is logged with strict schema validation.",
    specs: [
      "Sub-10ms event ingestion latency via serverless edge routes",
      "Buffered event queues with guaranteed at-least-once delivery",
      "Full GDPR / CCPA privacy compliance with anonymized user hashing",
      "Zero reliance on heavy, fragile third-party JavaScript tracking tags",
    ],
  },
  {
    number: "02",
    title: "Automated Lifecycle Workflows",
    stack: "Transactional Email · Webhooks · In-App Messaging · Cron Triggers",
    description:
      "Deterministic engagement workflows that respond to customer behavior in real time. We build automated onboarding sequences, milestone celebrations, and churn intervention triggers directly into your application architecture.",
    specs: [
      "Dynamic webhook triggers for instant third-party CRM sync",
      "High-deliverability transactional email pipelines via Resend / SES",
      "State-machine lifecycle rules preventing duplicate notifications",
      "Granular user notification preferences and cryptographic unsubscribes",
    ],
  },
  {
    number: "03",
    title: "Cohort Retention & Churn Modeling",
    stack: "SQL Analytics · Cohort Segmentation · Retention Matrices",
    description:
      "Quantitative retention telemetry that identifies why accounts upgrade or drop off. We establish verifiable cohort retention matrices and feature-adoption telemetry rather than superficial vanity metrics.",
    specs: [
      "Day-1, Day-7, and Day-30 rolling retention cohort matrices",
      "Automated early-warning alerts for dormant enterprise accounts",
      "Feature adoption frequency and velocity telemetry",
      "Direct integration with executive BI tools and SQL databases",
    ],
  },
  {
    number: "04",
    title: "Product Feedback Loop Ingestion",
    stack: "Continuous Telemetry · Prioritization Engine · Git Integration",
    description:
      "The growth engine does not operate in isolation. It routes empirical user friction and adoption data directly back into your development roadmap, dictating the exact technical primitives to construct in the next BUILD cycle.",
    specs: [
      "Automated conversion drop-off tracing linked to UI components",
      "Deterministic data signals feeding product engineering backlogs",
      "Zero agency stagnation: constant iteration driven by real user proof",
      "Complete closed-loop verification: BUILD → DISCOVER → GROW → BUILD",
    ],
  },
];

const DELIVERABLES = [
  {
    label: "EVENT BUS",
    title: "Server-Side Telemetry Stream",
    body: "A production-grade event pipeline deployed to your backend, capturing user actions, API invocations, and checkout flows with zero client-side ad blocker drops.",
  },
  {
    label: "LIFECYCLE ENGINE",
    title: "Automated Journey Matrices",
    body: "Configured multi-channel lifecycle workflows (transactional email, webhooks, in-app triggers) running reliably on event-driven infrastructure.",
  },
  {
    label: "RETENTION DASHBOARD",
    title: "Cohort Analytics Suite",
    body: "Custom SQL queries and lightweight telemetry dashboards tracking real cohort retention, activation velocity, and account expansion signals.",
  },
  {
    label: "SYSTEM MONITORING",
    title: "Alerting Runbooks & Gates",
    body: "Production alerting rules with automated Slack / WhatsApp / email alerts for critical system drops, API anomalies, or churn thresholds.",
  },
];

const METHODOLOGY = [
  {
    phase: "01",
    name: "Event Taxonomy & Architecture Design",
    timing: "Days 1–3",
    deliverable: "Standardized event naming schema, privacy model, and tracking plan.",
  },
  {
    phase: "02",
    name: "Telemetry Pipeline Deployment",
    timing: "Days 4–7",
    deliverable: "Serverless event ingestion routes, Redis queue buffering, and database logging.",
  },
  {
    phase: "03",
    name: "Lifecycle Workflow Automation",
    timing: "Days 8–11",
    deliverable: "Transactional triggers, webhook dispatchers, and state machine lifecycle logic.",
  },
  {
    phase: "04",
    name: "Cohort Dashboards & Loop Handoff",
    timing: "Days 12–14",
    deliverable: "Live retention reporting and feedback loop configuration returning to BUILD.",
  },
];

export default function GrowPage() {
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
              <span className="type-label text-[#0284C7]">03 // LAYER 03: GROW</span>
              <span className="text-xs text-[#94A3B8] font-mono">BUILD → DISCOVER → <strong>GROW</strong></span>
            </div>
            <h1 className="type-display">
              GROW
            </h1>
            <p className="type-h3 text-[#0B1320] max-w-3xl">
              Lifecycle Operations &amp; Telemetry Feedback Loops.
            </p>
            <p className="type-body text-[#475569] max-w-3xl">
              Growth is not a disconnected collection of ad hacks or arbitrary email blasts. We build the event streaming architectures that capture customer actions, automate retention sequences, and route behavioral telemetry directly back into product engineering.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button href="/start" variant="primary">
                START A RETENTION SPRINT
              </Button>
              <Button href="#capabilities" variant="secondary">
                EXPLORE LIFECYCLE SYSTEMS ↓
              </Button>
            </div>
          </div>

          {/* Grammar Loop Diagram */}
          <div className="pt-6">
            <GrowGrammarDiagram />
          </div>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES (RETENTION VECTORS) */}
      <section id="capabilities" className="vistar-section border-b border-[rgba(56, 189, 248, 0.15)]">
        <div className="vistar-container space-y-12">
          <div className="space-y-3 max-w-3xl">
            <p className="type-label text-[#0284C7]">02 // CAPABILITIES</p>
            <h2 className="type-h2">Retention Primitives</h2>
            <p className="type-body text-[#475569]">
              Sustainable enterprise growth requires an operational engine that monitors customer health and systematically closes the product feedback loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAPABILITIES.map((cap) => (
              <Card key={cap.number} className="p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between border-b border-[rgba(56, 189, 248, 0.15)] pb-3">
                    <span className="font-mono text-xs text-[#0284C7] font-semibold">{cap.number} // LIFECYCLE VECTOR</span>
                    <span className="font-mono text-[11px] text-[#94A3B8] truncate max-w-[200px]">{cap.stack}</span>
                  </div>
                  <h3 className="type-h3">{cap.title}</h3>
                  <p className="type-body text-[#475569] text-sm">{cap.description}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-[rgba(56, 189, 248, 0.15)]">
                  <p className="type-label text-[11px] text-[#94A3B8]">OPERATIONAL SPECIFICATIONS</p>
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
            <h2 className="type-h2">The Retention Operations Engine</h2>
            <p className="type-body text-[#475569]">
              We deliver complete lifecycle and telemetry infrastructure that runs continuously on your cloud environment, maintaining customer relationships without manual overhead.
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
            <h2 className="type-h2">14-Day Retention Sprint</h2>
            <p className="type-body text-[#475569]">
              A disciplined operational sprint deploying event telemetry, automated engagement pipelines, and cohort dashboards.
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

      {/* 5. CLOSED-LOOP CONTINUITY (GROW -> BUILD) */}
      <section className="vistar-section border-b border-[rgba(56, 189, 248, 0.15)] bg-[#F0F7FD]/60">
        <div className="vistar-container flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="type-label text-[#0284C7]">SYSTEM CONTINUITY // CLOSING THE LOOP</span>
            <h3 className="type-h3">
              Telemetry Informs the Next Construction Sprint.
            </h3>
            <p className="type-body text-[#475569] text-base">
              The loop does not end with retention. The behavioral data gathered in GROW feeds directly into the architecture of Layer 01: BUILD. Your technological engine evolves systematically based on real empirical usage.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button href="/build" variant="primary">
              COMPLETE THE LOOP: BUILD
            </Button>
          </div>
        </div>
      </section>

      {/* 6. FINAL ACTION */}
      <section className="vistar-section">
        <div className="vistar-container text-center space-y-8 max-w-3xl mx-auto">
          <p className="type-label text-[#0284C7]">05 // START</p>
          <h2 className="type-h2">Ready to Automate Your Retention Engine?</h2>
          <p className="type-body text-[#475569]">
            Take our 6-step project diagnostic to evaluate your event architecture, churn points, and telemetry pipelines.
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
