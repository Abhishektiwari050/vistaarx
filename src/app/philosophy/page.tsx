import type { Metadata } from "next";
import PhilosophyPage from "./philosophy-client";

export const metadata: Metadata = {
  title: "Studio Philosophy & Curatorial Axioms",
  description:
    "The core engineering philosophy of Vistar Web Systems: hand-crafted code, ontological reduction, zero templates, complete codebase transfer, and sub-second load times.",
  keywords: [
    "Design Engineering Philosophy",
    "Anti-Template Agency",
    "Digital Sovereignty",
    "Bespoke Web Studio Manifesto",
    "Performance First Design",
    "Full IP Ownership",
  ],
  alternates: {
    canonical: "/philosophy",
  },
  openGraph: {
    title: "Studio Philosophy & Curatorial Axioms | Vistar Web Systems",
    description:
      "We refuse digital commodity. Discover our four axioms of brand building and digital equity.",
    url: "https://www.vistar.tech/philosophy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Philosophy & Curatorial Axioms | Vistar Web Systems",
    description:
      "We refuse digital commodity. Discover our four axioms of brand building and digital equity.",
  },
};

const philosophySchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Vistar Web Systems Philosophy",
  description: "Studio manifesto and four axioms of high-performance brand architecture.",
  url: "https://www.vistar.tech/philosophy",
  mainEntity: {
    "@type": "Organization",
    name: "Vistar Web Systems",
    knowsAbout: [
      "Ontological Reduction & Zero Bloat",
      "Sensory Kineticism & Bespoke GLSL",
      "Velocity As Brand Respect",
      "Institutional Sovereignty & 100% Code Ownership",
    ],
  },
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
