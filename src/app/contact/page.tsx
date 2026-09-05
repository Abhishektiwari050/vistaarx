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
  "@graph": [
    {
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
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who owns the code and intellectual property?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You own 100% of all source code, assets, and intellectual property. Everything is committed to your private GitHub repository and handed over unencumbered upon final milestone acceptance.",
          },
        },
        {
          "@type": "Question",
          name: "Do you sign non-disclosure agreements (NDAs)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We execute mutual standard NDAs before any sensitive data, proprietary codebases, or confidential business parameters are exchanged.",
          },
        },
        {
          "@type": "Question",
          name: "How do project milestones and payments work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sprints typically operate on a 50% kick-off deposit and 50% balance due upon successful staging review, automated testing sign-off, and repository transfer.",
          },
        },
        {
          "@type": "Question",
          name: "What if we need post-launch support and hosting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All deployments include 30 days of complimentary bug fixes and performance monitoring. We also provide ongoing fractional engineering retainers for continuous feature evolution.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactPage />
    </>
  );
}
