import type { Metadata } from "next";
import { KEYWORDS, BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";
import PhilosophyPage from "./philosophy-client";

export const metadata: Metadata = {
  title: "Our Engineering Philosophy — No Vendor Lock-In & 100% Code Ownership",
  description:
    "VISTAR's software engineering philosophy: hand-crafted production code, zero templates, 100% IP ownership transferred to the client, and performance-first architecture. We reject throwaway software.",
  keywords: KEYWORDS.philosophy,
  alternates: {
    canonical: `${BASE_URL}/philosophy`,
  },
  openGraph: {
    title: "Engineering Philosophy — No Vendor Lock-In & 100% Code Ownership | VISTAR",
    description:
      "We build bespoke software, not templates. Every engagement includes full source code ownership, no retainer lock-in, and performance-first architecture.",
    url: `${BASE_URL}/philosophy`,
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Philosophy — No Vendor Lock-In & 100% Code Ownership | VISTAR",
    description:
      "We build bespoke software, not templates. Every engagement includes full source code ownership, no retainer lock-in, and performance-first architecture.",
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
      name: "VISTAR Engineering Philosophy — No Vendor Lock-In & 100% Code Ownership",
      description:
        "VISTAR's manifesto for bespoke software engineering: zero templates, full source code ownership, and performance-first development.",
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
