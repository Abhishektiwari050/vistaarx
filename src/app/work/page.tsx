// Server Component — exports metadata for SSR <head> injection.
// The actual interactive UI lives in work-client.tsx.
import type { Metadata } from "next";
import { KEYWORDS, BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";
import WorkSolutionsPage from "./work-client";

// ─── Page-level metadata ──────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "AI Software Engineering Portfolio & Enterprise Case Studies",
  description:
    "Inspect production systems built by VISTAR: an AI cockpit telemetry platform for aviation, multi-agent biometric anomaly detection for healthcare, and 3D architectural platforms for PropTech. 100% source code handed over on every project.",
  keywords: KEYWORDS.work,
  alternates: {
    canonical: `${BASE_URL}/work`,
  },
  openGraph: {
    title: "AI Software Engineering Portfolio & Enterprise Case Studies | VISTAR",
    description:
      "Production AI agents, enterprise web platforms, and interactive 3D systems — engineered by VISTAR and fully owned by the client. Inspect our live systems.",
    url: `${BASE_URL}/work`,
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    title: "AI Software Engineering Portfolio & Enterprise Case Studies | VISTAR",
    description:
      "Production AI agents, enterprise web platforms, and interactive 3D systems — engineered by VISTAR and fully owned by the client.",
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
      name: "AI Software Engineering Portfolio — VISTAR",
      description:
        "A portfolio of mission-critical production software engineered by VISTAR: aviation telemetry, healthcare AI, PropTech 3D platforms, and enterprise SaaS.",
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
