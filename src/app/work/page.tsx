// Server Component — exports metadata for SSR <head> injection.
// The actual interactive UI lives in work-client.tsx.
import type { Metadata } from "next";
import { KEYWORDS, BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";
import WorkSolutionsPage from "./work-client";

// ─── Page-level metadata ──────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Production Software & Web Engineering Case Studies",
  description:
    "Inspect production systems engineered by VISTAR: 3axis Arc (interactive 3D spatial showroom for Lucknow architecture), Project VAYU (open-source aviation NOTAM GIS tool), and automated WhatsApp CRM pipelines. 100% source code handover.",
  keywords: KEYWORDS.work,
  alternates: {
    canonical: `${BASE_URL}/work`,
  },
  openGraph: {
    title: "Production Software & Web Engineering Case Studies | VISTAR",
    description:
      "Production web applications, WhatsApp automations, and interactive 3D spatial platforms engineered by VISTAR with 100% source code ownership. Inspect our live deployments.",
    url: `${BASE_URL}/work`,
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    title: "Production Software & Web Engineering Case Studies | VISTAR",
    description:
      "Production web applications, WhatsApp automations, and interactive 3D spatial platforms engineered by VISTAR with 100% source code ownership.",
    images: [DEFAULT_OG_IMAGES[0].url],
  },
};

// ─── Page JSON-LD ─────────────────────────────────────────────────────────────
const workPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${BASE_URL}/work#webpage`,
      url: `${BASE_URL}/work`,
      name: "Production Software Portfolio — VISTAR",
      description:
        "A portfolio of production software engineered by VISTAR: 3D spatial web for architecture, open-source aviation GIS, and internal lead pipelines.",
      isPartOf: { "@id": `${BASE_URL}/#website` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Our Work", item: `${BASE_URL}/work` },
      ],
    },
    // Case study items
    {
      "@type": "ItemList",
      name: "VISTAR Production Systems",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "CreativeWork",
            name: "Project VAYU: Cockpit Telemetry & NOTAM AI",
            description:
              "Real-time aviation cockpit dashboard with GIS vector hazard layers, automated NOTAM threat extraction, and sub-45ms situational awareness.",
            url: "https://ai-vayu.vercel.app",
            creator: { "@id": `${BASE_URL}/#organization` },
            keywords: "aviation software development, cockpit telemetry dashboard, GIS hazard mapping",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "CreativeWork",
            name: "AURA: Multi-Agent Biometric Anomaly Detection",
            description:
              "Multi-agent telemetry architecture with Isolation Forest ML models for real-time biometric anomaly detection in healthcare environments.",
            url: "https://multi-agent-anomaly-system.onrender.com",
            creator: { "@id": `${BASE_URL}/#organization` },
            keywords: "healthcare AI development, biometric anomaly detection, multi-agent systems",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "CreativeWork",
            name: "3axis Arc: High-Performance Spatial Platform",
            description:
              "Bespoke Next.js 16 3D architectural visualization platform with dynamic perspective transformations and sub-85ms global TTFB.",
            url: "https://3axisarc.vercel.app",
            creator: { "@id": `${BASE_URL}/#organization` },
            keywords: "PropTech software development, architectural 3D visualization, WebGL real estate",
          },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workPageSchema) }}
      />
      <WorkSolutionsPage />
    </>
  );
}
