import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Playfair_Display } from "next/font/google";
import { LayoutShell } from "@/components/layout-shell";
import { ClientCanvas } from "@/components/3d/client-canvas";
import { LenisProvider } from "@/components/lenis-provider";
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
  weight: ["400", "500", "600", "700"],
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
  title: "Vistar — Web Systems // Custom Architected Platforms",
  description:
    "Vistar Web Systems engineers fully custom-architected, search-optimized digital platforms. Sub-second page loads, zero bloated plugins, complete codebase ownership.",
  keywords: [
    "Custom Website Design",
    "Web Application Development",
    "AI Automation Agency",
    "Next.js Developer India",
    "Performance Engineering",
    "SEO Architecture",
  ],
  authors: [{ name: "Vistar Web Systems" }],
  openGraph: {
    title: "Vistar — Web Systems // Custom Architected Platforms",
    description:
      "Elite digital engineering for brands that demand excellence. Bespoke websites, high-performance web apps, and AI automation systems.",
    type: "website",
    locale: "en_IN",
    url: "https://www.vistar.tech",
    siteName: "Vistar Web Systems",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vistar — Web Systems // Custom Architected Platforms",
    description:
      "Elite digital engineering for brands that demand excellence. Bespoke websites, high-performance web apps, and AI automation systems.",
  },
  icons: {
    icon: "/icon.svg",
  },
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
      <body
        className="min-h-screen bg-[#faf9f5] text-[#0a0a0a] selection:bg-[#d8ff42] selection:text-black antialiased overflow-x-hidden font-sans"
        suppressHydrationWarning
      >
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
