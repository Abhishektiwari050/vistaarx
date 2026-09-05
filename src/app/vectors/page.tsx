import type { Metadata } from "next";
import VectorsPage from "./vectors-client";

export const metadata: Metadata = {
  title: "Performance Vectors & Growth Engineering",
  description:
    "Explore the engineering taxonomy behind Vistar Web Systems: <150ms global TTFB, 98+ Lighthouse P95, 0KB plugin bloat, and 100% client code ownership.",
  keywords: [
    "Core Web Vitals Optimization",
    "Sub-Second TTFB Architecture",
    "Next.js 16 Edge Rendering",
    "Web Performance Benchmark",
    "Technical Debt Elimination",
    "Cloudflare Edge SSR Performance",
  ],
  alternates: {
    canonical: "/vectors",
  },
  openGraph: {
    title: "Performance Vectors & Growth Engineering | Vistar Web Systems",
    description:
      "Benchmark simulator and technical taxonomy: how Vistar architectures deliver top 1% web speed and market dominance.",
    url: "https://www.vistar.tech/vectors",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Performance Vectors & Growth Engineering | Vistar Web Systems",
    description:
      "Benchmark simulator and technical taxonomy: how Vistar architectures deliver top 1% web speed and market dominance.",
  },
};

const vectorsSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Growth Engineering Taxonomy: Next.js Edge Architecture vs. Legacy CMS",
  description:
    "An architectural comparison between standard WordPress/Webflow agency stacks and Vistar's custom Next.js edge-rendered platforms.",
  url: "https://www.vistar.tech/vectors",
  publisher: {
    "@type": "Organization",
    name: "Vistar Web Systems",
    url: "https://www.vistar.tech",
  },
  about: [
    { "@type": "Thing", name: "Core Web Vitals" },
    { "@type": "Thing", name: "Edge Computing" },
    { "@type": "Thing", name: "Sub-Second Time to First Byte (TTFB)" },
    { "@type": "Thing", name: "Headless Commerce" },
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
