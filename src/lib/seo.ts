// ─── Core brand constants ────────────────────────────────────────────────────
export const BASE_URL = "https://www.vistar.tech";
export const BRAND_NAME = "VISTAR";
export const BRAND_TAGLINE =
  "Custom AI Agents, Enterprise Web Engineering & 3D Interactive Development";

export const DEFAULT_OG_IMAGES = [
  {
    url: "/opengraph-image.jpg",
    width: 1200,
    height: 630,
    alt: "VISTAR — Custom AI Software & Enterprise Web Engineering",
  },
];

// ─── Per-page keyword clusters (real buyer intent) ───────────────────────────
// These reflect what a CTO, VP Eng, or technical founder actually types.
export const KEYWORDS = {
  home: [
    "custom AI software development company",
    "enterprise AI agents development",
    "hire AI engineers",
    "custom software development agency",
    "Next.js development company",
    "AI automation company",
    "autonomous agent development",
    "software engineering firm",
    "full stack web development agency",
    "AI-powered web applications",
    "enterprise software development India",
    "product engineering company",
    "tech partner for startups",
    "dedicated software development team",
    "custom SaaS development",
  ],
  work: [
    "AI software portfolio",
    "enterprise AI case studies",
    "aviation software development",
    "healthcare AI development",
    "PropTech software development",
    "real estate tech platform development",
    "custom CRM development",
    "web application development case studies",
    "production AI agent examples",
    "software engineering portfolio",
    "startup software development examples",
    "custom enterprise platform examples",
  ],
  philosophy: [
    "software development philosophy",
    "bespoke web development agency",
    "no vendor lock-in software",
    "code ownership software agency",
    "anti-template development studio",
    "software engineering principles",
    "100% IP ownership software",
    "full source code handover agency",
    "performance-first web development",
    "digital sovereignty software",
  ],
  vectors: [
    "Next.js web development company",
    "AI platform development",
    "autonomous multi-agent systems",
    "enterprise web platform engineering",
    "edge computing web development",
    "sub-100ms web application",
    "Core Web Vitals optimization agency",
    "private AI deployment",
    "VPC AI infrastructure",
    "Next.js 15 App Router development",
    "enterprise SaaS engineering",
    "real-time data platform development",
  ],
  contact: [
    "hire software engineers",
    "software development consultation",
    "get a quote software development",
    "custom software project inquiry",
    "AI development team contact",
    "enterprise software agency India",
    "software engineering estimate",
    "technical consultation web application",
  ],
  aiSolutions: [
    "custom AI agent development",
    "AI automation software company",
    "enterprise AI integration",
    "LLM application development",
    "autonomous AI workflow automation",
    "multi-agent AI systems",
    "AI API integration service",
    "RAG application development",
    "GPT integration company",
    "AI chatbot development agency",
    "machine learning application development",
    "generative AI development company",
  ],
  nextjsEngineering: [
    "Next.js development agency",
    "hire Next.js developers",
    "React web application development",
    "Next.js App Router development",
    "TypeScript web development agency",
    "headless CMS development",
    "high performance web app development",
    "Next.js migration service",
    "React development company India",
    "full stack Next.js development",
  ],
  interactive3D: [
    "WebGL development company",
    "Three.js development agency",
    "interactive 3D website development",
    "3D web application development",
    "creative web development studio",
    "WebGL animation development",
    "interactive product configurator development",
    "immersive web experience development",
    "real estate 3D visualization",
    "architectural visualization web",
    "60fps web animation development",
  ],
};

// ─── Schema.org helpers ────────────────────────────────────────────────────
export const organizationSchema = {
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: BRAND_NAME,
  legalName: "VISTAR Web Systems",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/icon.svg`,
    width: 512,
    height: 512,
  },
  description:
    "VISTAR is a custom software engineering company specializing in AI agent development, enterprise Next.js applications, and interactive 3D web experiences. 100% source code ownership on every engagement.",
  foundingDate: "2022",
  areaServed: ["US", "GB", "EU", "IN", "AE", "AU"],
  serviceType: [
    "AI Agent Development",
    "Enterprise Web Engineering",
    "Interactive 3D Development",
    "Custom SaaS Development",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "services.vistaar@gmail.com",
    contactType: "sales",
    availableLanguage: ["English"],
  },
  sameAs: [],
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});
