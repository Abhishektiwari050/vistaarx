import type { Metadata } from "next";
import { BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";
import PricingClient from "./pricing-client";

export const metadata: Metadata = {
  title: "Engineering Pricing & Sprints — Transparent Fixed-Scope Rates",
  description:
    "Transparent pricing for custom AI agents, enterprise Next.js engineering, and spatial 3D web platforms. Fixed-scope 14–21 day production sprints with 100% source code ownership.",
  keywords: [
    "AI agent development cost",
    "custom software development pricing",
    "Next.js agency rates",
    "hire AI developers cost",
    "fixed price software engineering sprint",
    "custom AI software development pricing",
    "enterprise software development cost",
    "AI consultancy fees",
    "14-day software sprint pricing",
    "VISTAR pricing",
  ],
  alternates: {
    canonical: `${BASE_URL}/pricing`,
  },
  openGraph: {
    title: "Engineering Pricing & Sprints — Transparent Rates | VISTAR",
    description:
      "Explore transparent fixed-scope sprint pricing for custom AI software, enterprise web apps, and 3D experiences. 100% code ownership guaranteed.",
    url: `${BASE_URL}/pricing`,
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Pricing & Sprints — Transparent Rates | VISTAR",
    description:
      "Fixed-scope 14–21 day production sprints. Transparent pricing with 100% code ownership.",
    images: [DEFAULT_OG_IMAGES[0].url],
  },
};

const pricingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/pricing#webpage`,
      url: `${BASE_URL}/pricing`,
      name: "VISTAR Engineering Pricing & Sprints",
      description:
        "Transparent pricing tiers for custom AI agents and enterprise web development sprints.",
      isPartOf: { "@id": `${BASE_URL}/#website` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Pricing", item: `${BASE_URL}/pricing` },
      ],
    },
    {
      "@type": "Product",
      name: "Custom Software Engineering Sprint",
      description:
        "14–21 day production software engineering sprint: autonomous AI agents, enterprise Next.js platforms, or spatial WebGL experiences.",
      offers: [
        {
          "@type": "Offer",
          name: "Production Sprint Tier",
          price: "5000",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          description: "Fixed-scope production sprint delivered in 14–21 days with 100% repository handover.",
        },
        {
          "@type": "Offer",
          name: "Enterprise Architecture Tier",
          price: "15000",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          description: "Full sovereign VPC deployment, multi-agent clusters, and dedicated SLA support.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <PricingClient />
    </>
  );
}
