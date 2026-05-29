import type { Metadata } from "next";
import { ClientCanvas } from "@/components/3d/client-canvas";
import { LayoutShell } from "@/components/layout-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vistar - Premium Interactive Software Studio",
  description: "High-fidelity digital engineering for the modern internet.",
  keywords: ["AI Software", "Software Studio", "3D Design Studio", "Vistar"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased bg-[#f5f5f7]" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Dynamic client-side Google Fonts for Outfit and Space Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body 
        className="h-full bg-transparent text-[#1d1d1f] selection:bg-black selection:text-[#ccff00] antialiased overflow-x-hidden font-sans"
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
