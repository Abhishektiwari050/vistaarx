import type { Metadata } from "next";
import WorkPage from "./work-client";

export const metadata: Metadata = {
  title: "Case Studies & Commercial Impact",
  description:
    "Explore proven commercial engineering case studies by Vistar Web Systems: +220% DTC order value lift, sub-120ms global TTFB, 98+ Lighthouse scores, and 100% client code ownership.",
  keywords: [
    "Next.js Case Studies",
    "Headless Shopify Performance",
    "WebGL Production Case Studies",
    "FinTech Web Application Architecture",
    "Core Web Vitals Portfolio",
    "Custom Web Engineering Portfolio",
  ],
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Case Studies & Commercial Impact | Vistar Web Systems",
    description:
      "Deep architectural breakdowns and verified metrics for high-growth commercial platforms engineered by Vistar Web Systems.",
    url: "https://www.vistar.tech/work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies & Commercial Impact | Vistar Web Systems",
    description:
      "Deep architectural breakdowns and verified metrics for high-growth commercial platforms engineered by Vistar Web Systems.",
  },
};

const workSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Vistar Web Systems Case Studies",
  description: "Commercial performance case studies and engineering breakdowns.",
  url: "https://www.vistar.tech/work",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "CreativeWork",
        position: 1,
        name: "Luminary Atelier Flagship",
        headline: "Luxury Direct-to-Consumer Headless Storefront",
        description: "Bespoke Next.js storefront engineered with edge-rendered catalogs and sub-second routing, delivering +220% AOV and 4.2x conversion rate.",
      },
      {
        "@type": "CreativeWork",
        position: 2,
        name: "Apex Algorithmic Ledger",
        headline: "Institutional Digital Assets Real-Time Interface",
        description: "Real-time WebGL data rendering pipeline with zero render lag and sub-millisecond WebSocket state synchronisation.",
      },
      {
        "@type": "CreativeWork",
        position: 3,
        name: "Axiom Neural Brand OS",
        headline: "AI-Augmented Brand Generation Engine",
        description: "Automated brand design operating system producing complete typography, design tokens, and production Next.js sites in 72 hours.",
      },
      {
        "@type": "CreativeWork",
        position: 4,
        name: "Chronicle Global Media Engine",
        headline: "Enterprise Media Cloud & Static Edge SSR",
        description: "Edge-rendered static architecture with intelligent prefetching, achieving 99/100 Lighthouse score and serving 1.8M readers.",
      },
      {
        "@type": "CreativeWork",
        position: 5,
        name: "Verve High-Performance Storefront",
        headline: "DTC Performance Wear Zero-CLS Checkout",
        description: "Rebuilt from raw primitives with strict 0.000 CLS architecture and instant Apple Pay / Google Pay one-click checkout.",
      },
      {
        "@type": "CreativeWork",
        position: 6,
        name: "Synthetix Autonomous Pipeline",
        headline: "Enterprise Developer Tools WebAssembly Playground",
        description: "Interactive in-browser playground compiling Rust WebAssembly with streaming token visualization and instant code generation.",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }}
      />
      <WorkPage />
    </>
  );
}
