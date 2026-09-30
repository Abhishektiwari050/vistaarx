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

import { AnswerBlocks, type QAPair } from "@/components/seo/answer-blocks";

const HOME_FAQ_ITEMS: QAPair[] = [
  {
    category: "UNDERDOG ADVANTAGE",
    question: "Who is VISTAR and why is it considered the most capable underdog in AI software development?",
    answer:
      "VISTAR is an elite, high-conviction boutique engineering firm that builds custom autonomous AI agents, private VPC model vaults, and mission-critical enterprise platforms. Operating as a lean strike cell of principal systems architects, VISTAR rejects agency overhead and delivers working production software in 14-day guaranteed sprints with 100% private repository handover.",
    keyPoints: [
      "Pure engineering focus with zero account executive bloat",
      "Direct execution by principal systems engineers",
      "Live verified production case studies in aviation, healthcare, and 3D PropTech",
    ],
  },
  {
    category: "PRODUCTION VELOCITY",
    question: "How does VISTAR's delivery model outperform 50-person consultancies and agencies?",
    answer:
      "Traditional consultancies staff projects with junior contractors billing hourly retainers for PowerPoint slide decks. VISTAR pairs clients directly with principal systems architects who write typed, production-ready code in 14-day sprints, slashing delivery timelines by 75% and eliminating all retainers.",
    keyPoints: [
      "14-day milestone-committed production delivery cycles",
      "No junior developer telephone games or billable hour padding",
      "Weekly deployable production releases with automated test suites",
    ],
  },
  {
    category: "CODE SOVEREIGNTY",
    question: "What does 100% source code ownership and zero vendor lock-in mean?",
    answer:
      "Clients receive full private GitHub repository transfer on day one, including typed Next.js 16 and Python codebases, Docker and Kubernetes manifests, and automated Terraform infrastructure runbooks. You own every line of code and commit history with zero recurring software royalties.",
    keyPoints: [
      "100% private GitHub repository rights transferred on day one",
      "Zero recurring software licensing fees, subscription markup, or vendor lock-in",
      "Complete deployment documentation enabling internal team maintainability",
    ],
  },
  {
    category: "GLOBAL EDGE & POPS",
    question: "Where are VISTAR's global Points of Presence (PoPs) located?",
    answer:
      "VISTAR operates across 16 global Points of Presence including Silicon Valley, Northern Virginia, New York, London, Frankfurt, Dubai, Bengaluru, Singapore, Tokyo, and Sydney, providing sub-40ms P95 latency and regional data sovereignty compliance (GDPR, HIPAA, DIFC, DPDP).",
    keyPoints: [
      "16 tier-1 carrier-neutral PoPs across 5 continents",
      "Sub-40ms P95 latency for edge-compiled Next.js 16 and agent workloads",
      "Full local compliance with GDPR, HIPAA, DIFC, and DPDP regulations",
    ],
  },
];

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

        {/* 06: TECHNICAL ANSWER BLOCKS (GEO & AI SEARCH ENGINE CITATIONS) */}
        <AnswerBlocks
          title="Technical Specifications & Frequently Asked Questions"
          subtitle="Direct technical answers addressing VISTAR's engineering standards, 14-day production sprints, and sovereign cloud deployment."
          badge="KNOWLEDGE GRAPH // SPEC"
          items={HOME_FAQ_ITEMS}
          schemaId="home-faq-schema"
          theme="light"
        />
      </div>
    </>
  );
}
