import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Mono, Great_Vibes } from "next/font/google";
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Navbar } from "@/components/ui/navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import SmoothScroller from "@/components/motion/SmoothScroller";
import { Footer } from "@/components/ui/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "900"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: 'italic',
  variable: '--font-playfair'
});

const space = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-space'
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: '--font-great-vibes'
});

export const metadata: Metadata = {
  title: "Vistar Studio // AI Powered SDLC",
  description: "Complete AI Powered software development life cycle studio. High-fidelity engineering for the modern internet.",
  keywords: ["AI SDLC", "Software Studio", "AI Engineering", "Vistar", "Vistar Studio"],
  authors: [{ name: "Vistar Studio" }],
  openGraph: {
    title: "Vistar Studio // AI Powered SDLC",
    description: "Complete AI Powered software development cycle studio. High-fidelity engineering for the modern internet.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/vistar-logo.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`font-sans ${inter.variable} ${playfair.variable} ${space.variable} ${greatVibes.variable} ${GeistMono.variable} antialiased bg-white text-black selection:bg-[#ccff00] selection:text-black`}>
        <SmoothScroller />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
