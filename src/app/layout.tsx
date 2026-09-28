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
    default: "VISTAR — Custom AI Software & Enterprise Web Engineering",
    template: "%s | VISTAR",
  },
  description:
    "VISTAR is a custom software engineering company. We build AI agents, enterprise Next.js web apps, and interactive 3D experiences with 100% source code ownership and no vendor lock-in.",
  keywords: [
    "custom AI software development company",
    "enterprise AI agents development",
    "hire AI engineers",
    "custom software development agency",
    "Next.js development company",
    "AI automation company",
    "autonomous agent development",
    "full stack web development agency",
    "AI-powered web applications",
    "enterprise software development India",
    "product engineering company",
    "tech partner for startups",
    "dedicated software development team",
    "WebGL development company",
    "no vendor lock-in software agency",
  ],
  authors: [{ name: "VISTAR", url: "https://www.vistar.tech" }],
  creator: "VISTAR",
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
    title: "VISTAR — Custom AI Software & Enterprise Web Engineering",
    description:
      "We build custom AI agents, enterprise Next.js platforms, and interactive 3D web experiences. 100% source code ownership. No vendor lock-in. Production-ready in 14–21 days.",
    type: "website",
    locale: "en_US",
    url: "https://www.vistar.tech",
    siteName: "VISTAR",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "VISTAR — Custom AI Software & Enterprise Web Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VISTAR — Custom AI Software & Enterprise Web Engineering",
    description:
      "Custom AI agents, enterprise Next.js web apps, and 3D interactive experiences. 100% source code ownership. No vendor lock-in.",
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
        "VISTAR is a custom software engineering company specializing in AI agent development, enterprise Next.js applications, and interactive 3D web experiences. 100% source code ownership on every engagement.",
      foundingDate: "2022",
      areaServed: ["United States", "United Kingdom", "Europe", "India", "UAE", "Australia"],
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
            text: "Projects typically start at $5,000 and scale based on scope and sprint duration. We offer fixed-scope sprints with transparent pricing. Contact us for a free technical diagnostic.",
          },
        },
      ],
    },
  ],
};

import { MagneticCursor } from "@/components/ui/magnetic-cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
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
      <body className="min-h-screen bg-white text-[#212121] selection:bg-[#212121] selection:text-white antialiased font-sans">
        <MagneticCursor />
        <LenisProvider>
          <VistarTelemetryListener />
          <LayoutShell>{children}</LayoutShell>
        </LenisProvider>
      </body>
    </html>
  );
}
