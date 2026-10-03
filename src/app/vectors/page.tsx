import type { Metadata } from "next";
import { KEYWORDS, BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";
import VectorsPage from "./vectors-client";

export const metadata: Metadata = {
  title: "Engineering Services & Packages — 14-Day Production Sprints | VISTAR",
  description:
    "Explore VISTAR's fixed-scope software packages: Starter MVP (₹49,000), Production System (₹1,85,000), and Custom Architecture (₹3,90,000+). Engineered directly by Abhishek Tiwari with 100% source code ownership.",
  keywords: KEYWORDS.vectors,
  alternates: {
    canonical: `${BASE_URL}/vectors`,
  },
  openGraph: {
    title: "Engineering Services & Packages — 14-Day Production Sprints | VISTAR",
    description:
      "Fixed-scope software delivery packages: Starter MVP (₹49k), Production System (₹1.85L), and Custom Architecture (₹3.9L+). 100% source code ownership.",
    url: `${BASE_URL}/vectors`,
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Services & Packages | VISTAR",
    description:
      "Fixed-scope software delivery packages: Starter MVP (₹49k), Production System (₹1.85L), and Custom Architecture (₹3.9L+). 100% source code ownership.",
    images: [DEFAULT_OG_IMAGES[0].url],
  },
};

const vectorsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${BASE_URL}/vectors#service`,
      name: "VISTAR Engineering Services & Delivery Packages",
      description:
        "Fixed-scope software engineering packages for businesses: Starter MVP (₹49k), Production System (₹1.85L), and Custom Architecture (₹3.9L+). Built with 100% private GitHub repository transfer.",
      provider: {
        "@type": "Person",
        name: "Abhishek Tiwari",
        jobTitle: "Founder & Lead Engineer",
        url: "https://www.linkedin.com/in/abhishektiwari-vistar/",
      },
      offers: [
        {
          "@type": "Offer",
          name: "Starter MVP",
          price: "49000",
          priceCurrency: "INR",
          description: "High-speed Next.js web application or landing page with WhatsApp lead routing. 5–7 days delivery.",
        },
        {
          "@type": "Offer",
          name: "Production System",
          price: "185000",
          priceCurrency: "INR",
          description: "Full-stack Next.js 16 web application, PostgreSQL database, or 60 FPS 3D WebGL showroom. 14 days guaranteed.",
        },
        {
          "@type": "Offer",
          name: "Custom Architecture",
          price: "390000",
          priceCurrency: "INR",
          description: "Bespoke software systems, GIS mapping tools, or multi-agent automation. 21–30 days delivery.",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/vectors` },
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
