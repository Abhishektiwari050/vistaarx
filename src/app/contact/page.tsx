import type { Metadata } from "next";
import ContactPage from "./contact-client";

export const metadata: Metadata = {
  title: "Initiate Consultation & Technical Specification",
  description:
    "Connect directly with Vistar Web Systems. Transmit your project requirements, coordinate sprint timelines, and initiate custom high-performance web platform engineering.",
  keywords: [
    "Hire Next.js Agency",
    "Web Engineering Consultation",
    "Custom Web Application Pricing",
    "Performance Audit Consultation",
    "Vistar Web Systems Contact",
    "Enterprise Web Design Handover",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Initiate Consultation & Technical Specification | Vistar Web Systems",
    description:
      "Direct technical consultation with our engineering team. Transparent pricing, strict sprint timelines, and 100% code ownership.",
    url: "https://www.vistar.tech/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Initiate Consultation & Technical Specification | Vistar Web Systems",
    description:
      "Direct technical consultation with our engineering team. Transparent pricing, strict sprint timelines, and 100% code ownership.",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Vistar Web Systems",
  description: "Initiate architectural consultation for custom web platforms and AI automation.",
  url: "https://www.vistar.tech/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Vistar Web Systems",
    email: "contact@vistar.tech",
    url: "https://www.vistar.tech",
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@vistar.tech",
      contactType: "customer support & sales",
      availableLanguage: ["English"],
    },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactPage />
    </>
  );
}
