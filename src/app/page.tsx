import type { Metadata } from "next";
import { KEYWORDS, BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";
import { CohereHero } from "@/components/cohere/cohere-hero";
import { CohereSocialProof } from "@/components/cohere/cohere-social-proof";
import { CohereEmpowerment } from "@/components/cohere/cohere-empowerment";
import { JasperAgentsSection } from "@/components/home/jasper-agents-section";
import { CohereSolutions } from "@/components/cohere/cohere-solutions";
import { CohereDeployment } from "@/components/cohere/cohere-deployment";
import { CourageRevealSection } from "@/components/home/courage-reveal-section";
import { AnswerBlocks, type QAPair } from "@/components/seo/answer-blocks";

// ─── Page-level metadata (Google Search Essentials / SEO Starter Guide compliant) ───────
export const metadata: Metadata = {
  title: "VISTAR — Custom Software, AI & WhatsApp Automations Studio",
  description:
    "VISTAR is a founder-led engineering studio in Lucknow, India. We build WhatsApp sales automations, high-speed Next.js web apps, and 3D spatial platforms in fixed 14-day sprints with 100% repository handover.",
  keywords: KEYWORDS.home,
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "VISTAR — Custom Software, AI & WhatsApp Automations Studio",
    description:
      "Custom software, WhatsApp sales automations, and interactive 3D web systems shipped in 14 days by founding engineers with 100% source code ownership.",
    url: BASE_URL,
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    title: "VISTAR — Custom Software, AI & WhatsApp Automations Studio",
    description:
      "Custom software, WhatsApp sales automations, and interactive 3D web systems shipped in 14 days by founding engineers with 100% source code ownership.",
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
      name: "VISTAR — Custom Software, AI & WhatsApp Automations Studio",
      description:
        "VISTAR builds WhatsApp sales automations, high-performance Next.js 16 web applications, and interactive 3D platforms with 100% source code ownership.",
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

const HOME_FAQ_ITEMS: QAPair[] = [
  {
    category: "FOUNDER-LED STUDIO",
    question: "Who is VISTAR and what makes your engineering approach different?",
    answer:
      "VISTAR is a founder-led software engineering studio based in Lucknow, India, directed by Abhishek Tiwari. We work directly with business owners, founders, and CTOs to ship production software without layers of agency account managers or outsourced junior contractors. Every sprint delivers 100% source code ownership with zero retainer hostage lock-in.",
    keyPoints: [
      "Direct collaboration with founding systems engineers",
      "Fixed 14-day production delivery cycles with transparent pricing",
      "Live verified deployments in 3D architecture (3axis Arc) and sales automation (AutoLead)",
    ],
  },
  {
    category: "PRODUCTION VELOCITY",
    question: "How does VISTAR deliver production software in 14-day sprints?",
    answer:
      "Traditional agencies introduce multi-month delays with junior developer telephone games and billable hourly padding. VISTAR operates on focused, milestone-driven sprints (5–7 days for MVPs and WhatsApp bots; 14 days for full Next.js web applications). We pair directly with leadership, scope tightly, and ship production-ready code with automated tests.",
    keyPoints: [
      "14-day fixed-scope production sprints with deployable staging releases",
      "No agency markups, phantom hours, or maintenance retainer traps",
      "Comprehensive 30-day post-delivery bug warranty included at no extra cost",
    ],
  },
  {
    category: "CODE SOVEREIGNTY",
    question: "What does 100% source code ownership mean for my business?",
    answer:
      "On delivery day, full ownership of the private GitHub repository transfers directly to your organization. You receive all TypeScript, Next.js 16, Python, Docker, and PostgreSQL schema files. You own your IP completely—no licensing fees, no recurring agency subscriptions, and full freedom to maintain or extend the codebase.",
    keyPoints: [
      "100% private GitHub repository rights transferred directly to you",
      "Zero recurring software licensing fees, subscription markup, or vendor lock-in",
      "Complete deployment documentation enabling internal team maintainability",
    ],
  },
  {
    category: "DATA PRIVACY & DPDP",
    question: "How does VISTAR protect client business data and proprietary secrets?",
    answer:
      "Every project is protected under a mutual bilateral Non-Disclosure Agreement (NDA). All credentials, databases, and customer records stay within your private cloud environment (AWS, GCP, or bare-metal). We never train public AI models on your proprietary data, fully upholding India's Digital Personal Data Protection Act 2023 (DPDP Act) and international privacy standards.",
    keyPoints: [
      "Bilateral NDA executed before reviewing proprietary specifications",
      "Client-owned private cloud deployment with zero external model training",
      "Full compliance with India's DPDP Act 2023 and GDPR data protection standards",
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
        {/* 01: HERO (RESTORED ORIGINAL COHERE VIDEO / DASHBOARD LOOP) */}
        <CohereHero />

        {/* 02: SOCIAL PROOF (CLOUD & INFRASTRUCTURE INTEGRATIONS) */}
        <CohereSocialProof />

        {/* 03: EMPOWERMENT (DATA SOVEREIGNTY & EDITORIAL VIDEO BANNER) */}
        <CohereEmpowerment />

        {/* 04: JASPER AUTONOMOUS AGENTS SECTION (INTERACTIVE 3D STAGE & CAPABILITY MATRIX) */}
        <JasperAgentsSection />

        {/* 05: SOLUTIONS (4 VERIFIED ISOMETRIC PRODUCTION CARDS) */}
        <CohereSolutions />

        {/* 06: SECURITY & DEPLOYMENT (ENGINEERING GUARANTEES & SPRINT CADENCE) */}
        <CohereDeployment />

        {/* 07: FOUNDER CONVICTION (COURAGE TEAR REVEAL POSTER) */}
        <CourageRevealSection />

        {/* 08: TECHNICAL ANSWER BLOCKS (GOOGLE SEO & KNOWLEDGE GRAPH CITATIONS) */}
        <AnswerBlocks
          title="Frequently Asked Questions"
          subtitle="Clear answers on our 14-day production sprints, dual-currency pricing, WhatsApp automations, and complete source code ownership."
          badge="FAQ"
          items={HOME_FAQ_ITEMS}
          schemaId="home-faq-schema"
          theme="light"
        />
      </div>
    </>
  );
}
