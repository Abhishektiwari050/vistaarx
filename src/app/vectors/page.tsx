import type { Metadata } from "next";
import { KEYWORDS, BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";
import VectorsPage from "./vectors-client";

export const metadata: Metadata = {
  title: "AI Platform & Next.js Enterprise Engineering — Technical Architecture",
  description:
    "Explore VISTAR's technical architecture: autonomous multi-agent AI systems, enterprise Next.js App Router development, Core Web Vitals optimization, and edge computing with sub-100ms TTFB across 24 global PoPs.",
  keywords: KEYWORDS.vectors,
  alternates: {
    canonical: `${BASE_URL}/vectors`,
  },
  openGraph: {
    title: "AI Platform & Enterprise Next.js Engineering — Technical Architecture | VISTAR",
    description:
      "Autonomous multi-agent systems, enterprise web platforms, and edge-optimized Next.js — the VISTAR technical engineering stack explained.",
    url: `${BASE_URL}/vectors`,
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Platform & Enterprise Next.js Engineering | VISTAR",
    description:
      "Autonomous multi-agent systems, enterprise web platforms, and edge-optimized Next.js — the VISTAR technical engineering stack explained.",
    images: [DEFAULT_OG_IMAGES[0].url],
  },
};

const vectorsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": `${BASE_URL}/vectors#article`,
      headline: "Enterprise AI Platform & Next.js Architecture: Autonomous Systems Engineering",
      description:
        "A technical overview of VISTAR's engineering stack: autonomous multi-agent AI systems, enterprise Next.js App Router platforms, Core Web Vitals optimization, and edge computing with sub-100ms global TTFB.",
      url: `${BASE_URL}/vectors`,
      publisher: { "@id": `${BASE_URL}/#organization` },
      about: [
        { "@type": "Thing", name: "Autonomous AI Agents" },
        { "@type": "Thing", name: "Enterprise Next.js Development" },
        { "@type": "Thing", name: "Core Web Vitals" },
        { "@type": "Thing", name: "Edge Computing" },
        { "@type": "Thing", name: "Sub-Second TTFB Architecture" },
        { "@type": "Thing", name: "Multi-Agent Systems" },
        { "@type": "Thing", name: "Private VPC AI Deployment" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Platform & Technology", item: `${BASE_URL}/vectors` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vectorsSchema) }}
      />
      <VectorsPage />
    </>
  );
}
