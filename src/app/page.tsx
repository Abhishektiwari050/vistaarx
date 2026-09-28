// Homepage is a Server Component so Next.js can SSR the <head> metadata.
// The child components handle their own "use client" directives.
import type { Metadata } from "next";
import { KEYWORDS, BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";
import { CohereHero } from "@/components/cohere/cohere-hero";
import { CohereSocialProof } from "@/components/cohere/cohere-social-proof";
import { CohereEmpowerment } from "@/components/cohere/cohere-empowerment";
import { CohereSolutions } from "@/components/cohere/cohere-solutions";
import { CohereDeployment } from "@/components/cohere/cohere-deployment";

// ─── Page-level metadata (overrides root layout title for the homepage) ───────
export const metadata: Metadata = {
  title: "VISTAR — Custom AI Software & Enterprise Web Engineering",
  description:
    "VISTAR builds custom AI agents, enterprise Next.js web applications, and interactive 3D WebGL experiences. 100% source code ownership. No vendor lock-in. Delivered in 14–21 day sprints.",
  keywords: KEYWORDS.home,
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "VISTAR — Custom AI Software & Enterprise Web Engineering",
    description:
      "Custom AI agents, enterprise Next.js apps, and 3D interactive experiences — built to production and fully handed over to you.",
    url: BASE_URL,
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    title: "VISTAR — Custom AI Software & Enterprise Web Engineering",
    description:
      "Custom AI agents, enterprise Next.js apps, and 3D interactive experiences — built to production and fully handed over to you.",
    images: [DEFAULT_OG_IMAGES[0].url],
  },
};

// ─── Homepage JSON-LD: WebPage + BreadcrumbList ───────────────────────────────
const homePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "VISTAR — Custom AI Software & Enterprise Web Engineering",
      description:
        "VISTAR builds custom AI agents, enterprise Next.js web applications, and interactive 3D WebGL experiences. 100% source code ownership on every project.",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${BASE_URL}/opengraph-image.jpg`,
        width: 1200,
        height: 630,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <div className="relative min-h-screen bg-white text-[#212121] w-full selection:bg-[#212121] selection:text-white">
        {/* 01: HERO */}
        <CohereHero />

        {/* 02: SOCIAL PROOF */}
        <CohereSocialProof />

        {/* 03: EMPOWERMENT */}
        <CohereEmpowerment />

        {/* 04: SOLUTIONS */}
        <CohereSolutions />

        {/* 05: SECURITY & DEPLOYMENT */}
        <CohereDeployment />
      </div>
    </>
  );
}
