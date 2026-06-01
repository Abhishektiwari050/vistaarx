import type { Metadata } from "next";
import { Outfit, Space_Mono, Bangers, Comic_Neue } from "next/font/google";
import { ClientCanvas } from "@/components/3d/client-canvas";
import { LayoutShell } from "@/components/layout-shell";
import "./globals.css";

// Configure optimized Google Fonts with size adjust and swap
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "600", "800", "900"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

const bangers = Bangers({
  subsets: ["latin"],
  variable: "--font-bangers",
  weight: "400",
  display: "swap",
});

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  variable: "--font-comic-neue",
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vistar Studio // Premium Immersive WebGL & Software Engineering",
  description: "Vistar Studio is an elite digital engineering & design laboratory. We build high-performance WebGL websites and custom software systems for forward-thinking brands.",
  keywords: ["Design Studio", "Software Studio", "WebGL Agency", "3D Interactive Websites", "Next.js Developer", "Brutalist Web Design"],
  authors: [{ name: "Vistar Studio HQ" }],
  openGraph: {
    title: "Vistar Studio // Immersive WebGL & Software Engineering",
    description: "Elite digital engineering and cinematic 3D experiences for forward-thinking brands who want to dominate the modern internet.",
    type: "website",
    locale: "en_US",
    url: "https://www.vistar.tech",
    siteName: "Vistar Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vistar Studio // Immersive WebGL & Software Engineering",
    description: "Elite digital engineering and cinematic 3D experiences for forward-thinking brands who want to dominate the modern internet.",
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
      className={`${outfit.variable} ${spaceMono.variable} ${bangers.variable} ${comicNeue.variable} min-h-screen antialiased bg-[#f5f5f7]`} 
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#f5f5f7" />
      </head>
      <body 
        className="min-h-screen bg-transparent text-[#1d1d1f] selection:bg-[#ff0080] selection:text-white antialiased overflow-x-hidden font-sans"
        suppressHydrationWarning
      >
        {/* Fixed background WebGL simulation */}
        <ClientCanvas />
        
        {/* Scrolling content layer in front */}
        <div className="relative w-full min-h-screen">
          <LayoutShell>{children}</LayoutShell>
        </div>
      </body>
    </html>
  );
}
