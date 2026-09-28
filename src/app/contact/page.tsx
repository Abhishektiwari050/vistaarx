import type { Metadata } from "next";
import { KEYWORDS, BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";
import ContactPage from "./contact-client";

export const metadata: Metadata = {
  title: "Hire Our Software Engineering Team — Free Technical Consultation",
  description:
    "Start a technical consultation with VISTAR's principal engineers. Get a custom AI agent, enterprise Next.js app, or interactive 3D platform — built and fully handed over in 14–21 days. Contact us for a free diagnostic.",
  keywords: KEYWORDS.contact,
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: "Hire Software Engineers — Free Technical Consultation | VISTAR",
    description:
      "Direct access to VISTAR principal engineers. Submit your project requirements and receive a production roadmap and pricing within 24 hours.",
    url: `${BASE_URL}/contact`,
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Software Engineers — Free Technical Consultation | VISTAR",
    description:
      "Direct access to VISTAR principal engineers. Submit your project requirements and receive a production roadmap within 24 hours.",
    images: [DEFAULT_OG_IMAGES[0].url],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${BASE_URL}/contact#webpage`,
      url: `${BASE_URL}/contact`,
      name: "Hire VISTAR — Free Technical Consultation",
      description:
        "Start a custom AI agent, enterprise Next.js platform, or interactive 3D project with VISTAR. Free technical consultation and project diagnostic.",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      mainEntity: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Contact", item: `${BASE_URL}/contact` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who owns the code and intellectual property?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You own 100% of all source code, infrastructure configurations, and intellectual property. Everything is committed to your private GitHub repository and handed over unencumbered on day one.",
          },
        },
        {
          "@type": "Question",
          name: "Do you sign NDAs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We execute mutual NDAs before any sensitive data, proprietary codebase, or confidential business parameters are exchanged.",
          },
        },
        {
          "@type": "Question",
          name: "How fast can you deliver?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Production-ready software in 14–21 day sprints. Milestone reviews, automated testing, and staging delivery at each checkpoint.",
          },
        },
        {
          "@type": "Question",
          name: "What is your pricing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Projects start at $5,000. We offer fixed-scope sprints with transparent pricing and no hidden retainers. Get a free technical diagnostic to receive a precise estimate.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer post-launch support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All deployments include 30 days of complimentary bug fixes and performance monitoring. We also offer ongoing engineering retainers for continued feature development.",
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
