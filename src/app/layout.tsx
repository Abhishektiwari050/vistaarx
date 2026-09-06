import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Playfair_Display } from "next/font/google";
import { LayoutShell } from "@/components/layout-shell";
import { ClientCanvas } from "@/components/3d/client-canvas";
import { LenisProvider } from "@/components/lenis-provider";
import { Preloader } from "@/components/preloader";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["italic"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#faf9f5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vistar.tech"),
  title: {
    default: "Vistar Web Systems — Custom Web Architecture & High-Performance Platforms",
    template: "%s | Vistar Web Systems",
  },
  description:
    "Vistar Web Systems engineers bespoke, search-optimized digital platforms from raw primitives. Sub-second global TTFB, 98+ Lighthouse scores, zero plugin bloat, and 100% codebase ownership.",
  keywords: [
    "Custom Website Design",
    "Next.js Development Agency",
    "High Performance Web Studio",
    "Web Application Development",
    "Sub-Second TTFB Architecture",
    "Core Web Vitals Optimization",
    "Headless Shopify Next.js",
    "WebGL GLSL Engineering",
    "AI Workflow Automation",
    "Full Codebase Ownership",
    "Enterprise Cloud Architecture",
    "Bespoke SaaS Development",
  ],
  authors: [{ name: "Vistar Web Systems", url: "https://www.vistar.tech" }],
  creator: "Vistar Web Systems",
  publisher: "Vistar Web Systems",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
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
    title: "Vistar Web Systems — Custom Web Architecture & High-Performance Platforms",
    description:
      "Elite digital engineering for ambitious brands. Bespoke websites, high-performance web applications, sub-second edge routing, and 100% codebase ownership.",
    type: "website",
    locale: "en_US",
    url: "https://www.vistar.tech",
    siteName: "Vistar Web Systems",
    images: [
      {
        url: "https://www.vistar.tech/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vistar Web Systems — Custom Web Architecture & High-Performance Platforms",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vistar Web Systems — Custom Web Architecture & High-Performance Platforms",
    description:
      "Elite digital engineering for ambitious brands. Bespoke websites, high-performance web applications, sub-second edge routing, and 100% codebase ownership.",
    images: ["https://www.vistar.tech/og-image.jpg"],
    creator: "@vistartech",
    site: "@vistartech",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=3", sizes: "any" },
      { url: "/icon.svg?v=3", type: "image/svg+xml" },
      { url: "/favicon-32x32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=3", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" },
      { url: "/icon.svg?v=3", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico?v=3"],
  },
  manifest: "/manifest.webmanifest",
  category: "technology",
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://www.vistar.tech/#organization",
      name: "Vistar Web Systems",
      url: "https://www.vistar.tech",
      logo: {
        "@type": "ImageObject",
        "@id": "https://www.vistar.tech/#logo",
        url: "https://www.vistar.tech/icon.svg",
        caption: "Vistar Web Systems Logo",
      },
      description:
        "Bespoke digital engineering studio specializing in custom Next.js platforms, WebGL graphics, sub-150ms TTFB, and autonomous AI automation systems.",
      email: "contact@vistar.tech",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      sameAs: [
        "https://x.com/vistartech",
        "https://github.com/Abhishektiwari050/vistaarx",
        "https://www.linkedin.com/company/vistar-web-systems",
      ],
      priceRange: "$$$$",
      knowsAbout: [
        "Next.js App Router Development",
        "Headless Commerce & Shopify",
        "Core Web Vitals Optimization",
        "Real-Time WebSockets & Telemetry",
        "AI Agent & Workflow Automation",
        "WebGL & GLSL Shader Engineering",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.vistar.tech/#website",
      url: "https://www.vistar.tech",
      name: "Vistar Web Systems",
      description: "Custom Architected Web Platforms & AI Engineering Studio",
      publisher: {
        "@id": "https://www.vistar.tech/#organization",
      },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} ${playfairDisplay.variable} min-h-screen antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body
        className="min-h-screen bg-[#faf9f5] text-[#0a0a0a] selection:bg-[#d8ff42] selection:text-black antialiased overflow-x-clip font-sans"
        suppressHydrationWarning
      >
        {/* Full viewport preloader curtain to eliminate any SSR flash */}
        <Preloader />

        {/* Fixed background WebGL simulation */}
        <ClientCanvas />

        {/* Scrolling content */}
        <div className="relative w-full min-h-screen">
          <LenisProvider>
            <LayoutShell>{children}</LayoutShell>
          </LenisProvider>
        </div>
      </body>
    </html>
  );
}
