import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { LayoutShell } from "@/components/layout-shell";
import { LenisProvider } from "@/components/lenis-provider";
import { VistarTelemetryListener } from "@/components/vistar-telemetry-listener";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vistar.tech"),
  title: {
    default: "VISTAR — Custom Web Apps, WhatsApp Automations & 3D Spatial Systems",
    template: "%s | VISTAR",
  },
  description:
    "VISTAR is a founder-led engineering studio based in New Delhi, India. We engineer custom web applications, WhatsApp lead automations, and interactive 3D WebGL platforms with 100% repository ownership.",
  keywords: [
    "custom software engineering Delhi",
    "software development studio Delhi NCR",
    "WhatsApp automation development India",
    "Next.js web development company",
    "WebGL Three.js development studio",
    "full stack web development studio",
    "100% source code ownership software",
    "founder led software engineering",
    "interactive 3D architecture website",
    "fastapi python web development",
  ],
  authors: [{ name: "VISTAR Engineering", url: "https://www.vistar.tech/about" }],
  creator: "VISTAR Web Systems",
  publisher: "VISTAR",
  alternates: {
    canonical: "https://www.vistar.tech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "VISTAR — Custom Web Apps, WhatsApp Automations & 3D Spatial Systems",
    description:
      "Founder-led digital engineering studio in New Delhi, India. Custom web apps, WhatsApp sales automations, and interactive 3D platforms shipped in 14 days with 100% repository ownership.",
    type: "website",
    locale: "en_US",
    url: "https://www.vistar.tech",
    siteName: "VISTAR",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "VISTAR — Founder-Led Web Engineering & Production Software Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VISTAR — Custom Web Apps, WhatsApp Automations & 3D Spatial Systems",
    description:
      "Founder-led digital engineering studio in New Delhi, India. Shipped in 14 days with 100% repository ownership.",
    creator: "@vistartech",
    images: ["/opengraph-image.jpg"],
  },
  // ── Search engine verification ─────────────────────────────────────────────
  verification: {
    google: "Sd-AgqQ0I1QUGM8wHq9t-i_HthghPMiZCI25jRVJpfY",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

// ─── Global Schema.org JSON-LD: Organization + WebSite + Services + FAQ ─────
const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.vistar.tech/#organization",
      name: "VISTAR",
      legalName: "VISTAR Web Systems",
      url: "https://www.vistar.tech",
      logo: {
        "@type": "ImageObject",
        url: "https://www.vistar.tech/icon.svg",
        width: 512,
        height: 512,
      },
      description:
        "VISTAR is a founder-led digital engineering studio based in New Delhi, India. We engineer high-performance web applications, WhatsApp lead automations, and interactive 3D WebGL spatial platforms with 100% repository ownership.",
      foundingDate: "2024",
      knowsAbout: [
        "Full-Stack Web Development",
        "Next.js 16 & React 19",
        "Interactive 3D WebGL & Three.js",
        "WhatsApp Business Automation & CRM Ingestion",
        "Aviation GIS & Vector Mapping",
        "Python & FastAPI Backend Architecture",
        "100% Source Code Ownership & IP Handover",
      ],
      areaServed: ["India", "Global"],
      email: "services.vistaar@gmail.com",
      contactPoint: {
        "@type": "ContactPoint",
        email: "services.vistaar@gmail.com",
        contactType: "sales",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.vistar.tech/#website",
      url: "https://www.vistar.tech",
      name: "VISTAR",
      description:
        "Custom AI agents, enterprise Next.js web apps, and interactive 3D experiences — built and fully handed over to you.",
      publisher: { "@id": "https://www.vistar.tech/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.vistar.tech/work?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.vistar.tech/#service",
      name: "Custom AI & Enterprise Software Development",
      provider: { "@id": "https://www.vistar.tech/#organization" },
      areaServed: "Worldwide",
      serviceType: [
        "Custom AI Agent Development",
        "Enterprise Next.js Engineering",
        "Interactive 3D WebGL Development",
        "Custom SaaS Platform Development",
      ],
      description:
        "End-to-end custom software engineering: AI agents, enterprise web platforms, and interactive 3D experiences. Every engagement includes 100% source code ownership.",
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description:
          "Production-ready software delivered in 14–21 day sprints. 100% code ownership. No vendor lock-in.",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.vistar.tech/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does VISTAR build?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "VISTAR builds custom AI agents, enterprise Next.js web platforms, interactive 3D WebGL experiences, and full-stack SaaS applications. Every project includes 100% source code handover to the client.",
          },
        },
        {
          "@type": "Question",
          name: "Does the client own 100% of the code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All source code, infrastructure configurations, and intellectual property are committed to your private GitHub repository and fully transferred on day one. Zero vendor lock-in.",
          },
        },
        {
          "@type": "Question",
          name: "How fast can VISTAR deliver production software?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Engagements operate in 14–21 day guaranteed production sprints with automated testing, sub-2.5s LCP performance benchmarks, and staging reviews at each milestone.",
          },
        },
        {
          "@type": "Question",
          name: "How does VISTAR handle AI integration?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We engineer custom autonomous AI agents, LLM-powered workflows, vector retrieval pipelines, and multi-agent systems directly into your application. All AI runs in your private infrastructure.",
          },
        },
        {
          "@type": "Question",
          name: "What is VISTAR's pricing model?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Projects operate on transparent, fixed-scope engineering packages. Our 14-day production Sprint package starts at $14,800, with enterprise sovereign deployments tailored with custom SLAs and private VPC isolation.",
          },
        },
      ],
    },
  ],
};

import { MagneticCursor } from "@/components/ui/magnetic-cursor";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import { PageCurtain } from "@/components/tds/page-curtain/PageCurtain";
import { VistarLogo } from "@/components/vistar-logo";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--tds-display" });
const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen antialiased">
      <head>
        {/* Machine-Readable AI & LLM Discovery Feeds */}
        <link rel="alternate" type="text/markdown" href="https://www.vistar.tech/llms.txt" title="LLM Summary" />
        <link rel="help" type="text/markdown" href="https://www.vistar.tech/llms-full.txt" title="Full LLM Specification" />
        <link rel="alternate" type="application/rss+xml" href="https://www.vistar.tech/feed.xml" title="VISTAR Engineering RSS Feed" />
        {/* Preload Jasper Interactive Rive Stage Asset for Instant 0-lag Paint */}
        <link rel="preload" href="/home_hero.riv" as="fetch" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        {/* Google Analytics 4 (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-E9R9LTXFNR"
        />
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-E9R9LTXFNR', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`min-h-screen bg-white text-[#181818] selection:bg-[#181818] selection:text-white antialiased font-sans ${display.variable} ${sans.variable} ${mono.variable}`}>
        <PageCurtain mark={<VistarLogo size={52} showText={false} className="text-white" />}>
          <MagneticCursor />
          <LenisProvider>
            <VistarTelemetryListener />
            <LayoutShell>{children}</LayoutShell>
          </LenisProvider>
        </PageCurtain>
      </body>
    </html>
  );
}
