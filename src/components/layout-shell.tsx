"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { VistarNav } from "@/components/vistar-nav";
import { VistarFooter } from "@/components/vistar-footer";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCatalogue = pathname === "/catalogue";

  if (isCatalogue) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#141413] font-sans antialiased selection:bg-[#FF3823] selection:text-white">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#141413] focus:text-white focus:px-4 focus:py-2 font-mono text-xs uppercase font-bold"
      >
        Skip to content
      </a>

      {/* Unified Global Top Nav across all pages */}
      <VistarNav />

      {/* Main Content Area with uniform top padding for fixed navbar */}
      <main id="main-content" className="flex-grow pt-[64px]">
        {children}
      </main>

      {/* Unified Global Footer across all pages */}
      <VistarFooter />
    </div>
  );
}

export default LayoutShell;
