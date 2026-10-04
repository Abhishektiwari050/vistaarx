import type { Metadata } from "next";
import { BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";
import { CohereHero } from "@/components/cohere/cohere-hero";
import { InteractiveWorkflowSimulator } from "@/components/home/interactive-workflow-simulator";
import { CohereSocialProof } from "@/components/cohere/cohere-social-proof";
import { OperationalProblemSection } from "@/components/home/operational-problem-section";
import { JasperAgentsSection } from "@/components/home/jasper-agents-section";
import { CohereSolutions } from "@/components/cohere/cohere-solutions";
import { CohereEmpowerment } from "@/components/cohere/cohere-empowerment";
import { HowEngagementWorksSection } from "@/components/home/how-engagement-works-section";
import { CohereDeployment } from "@/components/cohere/cohere-deployment";
import { CourageRevealSection } from "@/components/home/courage-reveal-section";
import { AnswerBlocks, type QAPair } from "@/components/seo/answer-blocks";
import { FinalCtaSection } from "@/components/home/final-cta-section";

// ─── Page-level metadata ──────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "VISTAR — Founder-Led Software Engineering & Business Automation Studio",
  description:
    "Vistar builds practical software, WhatsApp enquiry automations, internal portals, and custom web applications to help growing businesses eliminate manual work and scale.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "VISTAR — Founder-Led Software Engineering & Business Automation Studio",
    description:
      "Practical software engineering, WhatsApp automations, and operational portals for growing businesses. Direct founder involvement from discovery to 100% source code handover.",
    url: BASE_URL,
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    title: "VISTAR — Founder-Led Software Engineering & Business Automation Studio",
    description:
      "Practical software engineering, WhatsApp automations, and operational portals for growing businesses. Direct founder involvement from discovery to 100% source code handover.",
    images: [DEFAULT_OG_IMAGES[0].url],
  },
};

// ─── Homepage JSON-LD: WebPage + Organization + Breadcrumbs ───────────────────
const homePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "VISTAR Web Systems",
      url: BASE_URL,
      logo: `${BASE_URL}/icon.svg`,
      founder: {
        "@type": "Person",
        name: "Abhishek Tiwari",
        jobTitle: "Founder & Principal Systems Engineer",
        sameAs: "https://github.com/Abhishektiwari050",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-8860110144",
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "VISTAR — Founder-Led Software Engineering & Business Automation Studio",
      description:
        "Practical software and automation that helps growing businesses manage enquiries, streamline operations, and make better decisions.",
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
    category: "AUDIENCE & FIT",
    question: "What kind of businesses does Vistar work with?",
    answer:
      "We primarily partner with B2B distributors, wholesalers, small and mid-sized manufacturers, and service companies dealing with high enquiry volumes, manual quotation prep, or scattered operational data. We also partner with software startups needing full-stack Next.js delivery, architecture firms seeking interactive 3D WebGL showcases, and organizations with specialized GIS or data requirements.",
    keyPoints: [
      "B2B distributors, wholesalers, and manufacturers with enquiry or quoting bottlenecks",
      "Early-stage startups needing high-velocity Next.js web application delivery",
      "Architecture & design firms needing interactive 3D WebGL showrooms without app downloads",
    ],
  },
  {
    category: "FIRST STEPS",
    question: "What is a good first project to start with?",
    answer:
      "A focused operational bottleneck where manual work creates delays or mistakes. Common starting points include: an automated WhatsApp enquiry intake pipeline that alerts sales reps in seconds; an internal quoting tool that turns raw inputs into standardized PDF proposals; or an order status dashboard that replaces back-and-forth phone calls. Starting with a bounded pilot proves value quickly before undertaking larger systems.",
    keyPoints: [
      "WhatsApp & web form enquiry qualification and team routing",
      "Automated quotation or invoice generation from spreadsheets",
      "Single-purpose internal portal or order tracking dashboard",
    ],
  },
  {
    category: "INVESTMENT & PRICING",
    question: "How does project pricing work?",
    answer:
      "We quote fixed-scope milestone pricing upfront after our discovery discussion. Focused automation pilots typically start at ₹49,000 ($600 USD); comprehensive multi-user operational portals or custom web applications start from ₹1,49,000 ($1,800 USD). You never face unexpected billable hours, hidden cloud markups, or surprise change-order fees.",
    keyPoints: [
      "Fixed-scope quotes with clear inclusions and exclusions",
      "Dual-currency invoicing in INR (₹) or USD ($)",
      "Zero hidden hourly markups or surprise change orders",
    ],
  },
  {
    category: "INTEGRATIONS",
    question: "Can Vistar work with our existing tools?",
    answer:
      "Yes. We avoid forcing you to abandon tools your staff already knows. We integrate directly with WhatsApp Business Cloud API, Google Sheets, PostgreSQL, Supabase, Zoho, Tally, Gmail, Slack, and standard REST/webhook APIs. If your existing tool provides an API or exportable format, we can connect it to your new workflow.",
    keyPoints: [
      "Direct WhatsApp Business API and automated customer notifications",
      "Bi-directional sync with Google Sheets, PostgreSQL, Zoho, or Tally",
      "Connects to legacy accounting and CRM software without forcing migrations",
    ],
  },
  {
    category: "CODE OWNERSHIP",
    question: "Who owns the source code?",
    answer:
      "You do. 100%. On deployment day, full administrative ownership of the private GitHub repository transfers directly to your organization. You receive all TypeScript, Next.js, Python, Docker configs, and database schemas. There are zero recurring software license fees from Vistar, zero proprietary lock-in, and you have complete freedom to maintain or extend the system.",
    keyPoints: [
      "100% private GitHub repository rights transferred to your organization",
      "Zero recurring licensing fees or vendor lock-in",
      "Complete deployment documentation enabling internal team maintainability",
    ],
  },
  {
    category: "CONFIDENTIALITY & PRIVACY",
    question: "How is confidential business data handled?",
    answer:
      "We sign a bilateral Non-Disclosure Agreement (NDA) before reviewing sensitive operational workflows or proprietary records. All credentials, API secrets, customer databases, and files remain within your private cloud environment (AWS, GCP, Supabase, or bare-metal). We never train public AI models on your proprietary business records.",
    keyPoints: [
      "Mutual bilateral NDA executed prior to scoping proprietary details",
      "Client-owned private cloud deployment with zero external model training",
      "Strict data privacy standards adhering to DPDP Act 2023 regulations",
    ],
  },
  {
    category: "DEPLOYMENT & WARRANTY",
    question: "What happens after deployment?",
    answer:
      "Every project includes clear documentation, an environment runbook, a live walkthrough for your team, and a 30-day post-delivery bug warranty at zero additional charge. If any defect appears in the agreed scope during those 30 days, we fix it immediately.",
    keyPoints: [
      "Comprehensive environment runbook and user documentation",
      "Live team training and administrative walkthrough",
      "30-day bug warranty included in every fixed project fee",
    ],
  },
  {
    category: "MAINTENANCE & RETAINERS",
    question: "Is ongoing support mandatory?",
    answer:
      "No. Because you own 100% of the clean source code and runbooks, you have zero obligation to retain us. Many clients run their deployed systems independently for years. However, if you prefer dedicated availability for monthly feature additions, routine security updates, or workflow expansions, we offer flexible month-to-month retainers.",
    keyPoints: [
      "Zero ongoing maintenance hostage retainers",
      "Run your systems autonomously or with internal engineers",
      "Optional month-to-month partnership retainers available if desired",
    ],
  },
  {
    category: "TIMELINES & CADENCE",
    question: "How long does a typical project take?",
    answer:
      "Focused automation pilots and enquiry pipelines typically take 5 to 10 business days. Custom multi-user operational portals, web apps, or 3D spatial showcases typically take 2 to 4 weeks. Exact timelines depend on scope boundaries, third-party API keys, data readiness, and how quickly your team can review staging milestones.",
    keyPoints: [
      "Focused automation pilots: 5–10 business days",
      "Custom portals and web applications: 2–4 weeks",
      "Timelines explicitly agreed upon in writing before billing begins",
    ],
  },
  {
    category: "GETTING STARTED",
    question: "What does Vistar need from the client to begin?",
    answer:
      "Very little technical knowledge is needed. We only need: (1) A 30-minute conversation explaining your current manual process; (2) Access or sample exports of the forms, spreadsheets, or messages currently used; and (3) A designated point of contact who can test staging milestones and confirm business requirements.",
    keyPoints: [
      "A 30-minute discovery conversation explaining your current bottleneck",
      "Sample spreadsheets or workflow examples to understand data fields",
      "One team point of contact to review milestone demos",
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
      <div className="relative min-h-screen bg-white text-[#212121] w-full selection:bg-[#FF3823] selection:text-white">
        {/* 01: HERO (BEAUTIFUL EDITORIAL TYPOGRAPHY + GROUNDED B2B COPY + VIDEO LOOP) */}
        <CohereHero />

        {/* 02: INTERACTIVE WORKFLOW SIMULATOR (PRACTICAL ENQUIRY TRIAGE DEMO) */}
        <section className="relative w-full max-w-[1360px] mx-auto px-4 lg:px-10 -mt-6 sm:-mt-8 mb-16 z-20">
          <InteractiveWorkflowSimulator />
        </section>

        {/* 03: VERIFIED TECH MARQUEE (CONTINUOUS SMOOTH TICKER) */}
        <CohereSocialProof />

        {/* 04: THE OPERATIONAL PROBLEM (WHERE BUSINESSES LOSE TIME & MARGIN) */}
        <OperationalProblemSection />

        {/* 05: JASPER INTERACTIVE 3D RIVE STAGE (SYSTEM CAPABILITY MATRIX) */}
        <JasperAgentsSection />

        {/* 06: SOLUTIONS (APPLE-STYLE 3D WINDOW DECK: 3AXIS ARC, AUTOLEAD, VAYU, AURA) */}
        <CohereSolutions />

        {/* 07: DATA SOVEREIGNTY (EDITORIAL TEXTURE + VIDEO BANNER) */}
        <CohereEmpowerment />

        {/* 08: HOW WE WORK (6-STAGE TRANSPARENT ENGINEERING LIFECYCLE) */}
        <HowEngagementWorksSection />

        {/* 09: SECURITY & DEPLOYMENT (ENGINEERING COMMITMENTS & SPRINT CADENCE) */}
        <CohereDeployment />

        {/* 10: FOUNDER CONVICTION (COURAGE TIGER TEAR REVEAL) */}
        <CourageRevealSection />

        {/* 11: TECHNICAL ANSWER BLOCKS (GOOGLE SEO & REAL BUYING FAQS) */}
        <AnswerBlocks
          title="Frequently Asked Questions"
          subtitle="Direct, practical answers about our engineering process, pricing, data privacy, and source code ownership."
          badge="COMMON QUESTIONS"
          items={HOME_FAQ_ITEMS}
          schemaId="home-faq-schema"
          theme="light"
        />

        {/* 12: FINAL LOW-FRICTION INVITATION */}
        <FinalCtaSection />
      </div>
    </>
  );
}
