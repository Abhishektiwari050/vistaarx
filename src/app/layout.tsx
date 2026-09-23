import type { Metadata, Viewport } from "next";
import { LayoutShell } from "@/components/layout-shell";
import { LenisProvider } from "@/components/lenis-provider";
import { VistarTelemetryListener } from "@/components/vistar-telemetry-listener";
import "./globals.css";

export const viewport: Viewport = {
  // Mobile-native: dual theme-color so iOS status bar matches our ground color
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0C0E" },
    { media: "(prefers-color-scheme: light)", color: "#0A0C0E" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  // Mobile-native: paint edge-to-edge under notch/Dynamic Island
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vistar.tech"),
  title: {
    default: "VISTAR — AI, Software & Growth Systems",
    template: "%s | VISTAR",
  },
  description:
    "Vistar builds AI-powered software and digital growth systems for modern businesses. BUILD → DISCOVER → GROW as one connected system.",
  keywords: [
    "AI-powered software",
    "Digital growth systems",
    "Next.js enterprise engineering",
    "Custom AI software development",
    "Programmatic SEO architecture",
    "Bespoke software systems",
    "Full-stack design engineering",
    "Autonomous AI agents",
    "High-performance web applications",
    "Sovereign codebase ownership",
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
  },
  openGraph: {
    title: "VISTAR — AI, Software & Growth Systems",
    description:
      "Vistar builds AI-powered software and digital growth systems for modern businesses. BUILD → DISCOVER → GROW as one connected system.",
    type: "website",
    locale: "en_US",
    url: "https://www.vistar.tech",
    siteName: "VISTAR",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "VISTAR — AI, Software & Growth Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VISTAR — AI, Software & Growth Systems",
    description:
      "Vistar builds AI-powered software and digital growth systems for modern businesses. BUILD → DISCOVER → GROW as one connected system.",
    creator: "@vistartech",
    images: ["/opengraph-image.jpg"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

// Section 10 Compliance: Schema.org Organization & Service
const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.vistar.tech/#organization",
      name: "VISTAR",
      url: "https://www.vistar.tech",
      description:
        "Vistar builds AI-powered software and digital growth systems for modern businesses.",
      logo: "https://www.vistar.tech/icon.svg",
    },
    {
      "@type": "Service",
      "@id": "https://www.vistar.tech/#service",
      serviceType: "AI, Software & Digital Growth Systems",
      provider: {
        "@id": "https://www.vistar.tech/#organization",
      },
      areaServed: "Worldwide",
      description: "BUILD → DISCOVER → GROW as one connected system.",
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.vistar.tech/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does Vistar build?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Vistar builds AI-powered software and digital growth systems for modern businesses under a connected tripartite system: BUILD → DISCOVER → GROW.",
          },
        },
        {
          "@type": "Question",
          name: "Does the client own 100% of the code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Vistar provides 100% sovereign code and intellectual property ownership transferred directly to the client's Git repository on day one with zero vendor lock-in.",
          },
        },
        {
          "@type": "Question",
          name: "What is the typical sprint delivery cadence?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Engagements operate in deterministic 14–21 day production milestone cycles with automated test verification, sub-2.5s LCP, and continuous telemetry.",
          },
        },
        {
          "@type": "Question",
          name: "How does Vistar handle AI integration?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We engineer autonomous agents, type-safe API contracts, vector retrieval pipelines, and deterministic tool-calling workflows directly into the application runtime.",
          },
        },
      ],
    },
  ],
};

import { AtmosphericShader } from "@/components/ui/atmospheric-shader";
import { Preloader } from "@/components/preloader";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#060709] text-[#F3F4F6] selection:bg-white selection:text-[#060709] antialiased font-sans">
        <MagneticCursor />
        <Preloader />
        <LenisProvider>
          <VistarTelemetryListener />
          <AtmosphericShader />
          <LayoutShell>{children}</LayoutShell>
        </LenisProvider>
      </body>
    </html>
  );
}
