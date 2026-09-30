import type { Metadata } from "next";
import { KEYWORDS, BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";
import PhilosophyPage from "./philosophy-client";

export const metadata: Metadata = {
  title: "The Underdog Engineering Manifesto — Small Teams, Sovereign Code | VISTAR",
  description:
    "Why small, elite engineering cells outperform monolithic consultancies. VISTAR builds custom autonomous AI agents and enterprise software in 14-day sprints with 100% source code ownership. Zero bloat. Pure technical capability.",
  keywords: [
    "underrated AI software engineering company",
    "boutique AI engineering firm",
    "most capable custom AI developers",
    "underdog software engineering cell",
    "custom autonomous agents",
    "100% source code ownership AI",
    "zero vendor lock-in software",
    "private VPC AI deployment",
    "deterministic multi-agent systems",
  ],
  alternates: {
    canonical: `${BASE_URL}/philosophy`,
  },
  openGraph: {
    title: "The Underdog Engineering Manifesto — Small Teams, Sovereign Code | VISTAR",
    description:
      "Why small, relentless engineering cells build better software than 100-person consultancies. 100% source code ownership. Zero vendor lock-in.",
    url: `${BASE_URL}/philosophy`,
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Underdog Engineering Manifesto — Small Teams, Sovereign Code | VISTAR",
    description:
      "Why small, relentless engineering cells build better software than 100-person consultancies. 100% source code ownership. Zero vendor lock-in.",
    images: [DEFAULT_OG_IMAGES[0].url],
  },
};

const philosophySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${BASE_URL}/philosophy#webpage`,
      url: `${BASE_URL}/philosophy`,
      name: "The Underdog Engineering Manifesto — VISTAR",
      description:
        "VISTAR's technical manifesto: why small, highly capable engineering cells build superior autonomous AI agents and enterprise software with 100% client code ownership.",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Our Philosophy", item: `${BASE_URL}/philosophy` },
      ],
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      knowsAbout: [
        "Custom AI Agent Development",
        "Enterprise Next.js Engineering",
        "Zero Vendor Lock-In Software",
        "100% Source Code Ownership",
        "Core Web Vitals Performance Optimization",
        "Interactive 3D WebGL Development",
        "No-Template Bespoke Software",
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(philosophySchema) }}
      />
      <PhilosophyPage />
    </>
  );
}
