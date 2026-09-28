import React from "react";
import type { Metadata } from "next";
import { StartDiagnosticClient } from "./start-diagnostic-client";
import { DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request a Demo & Technical Diagnostic | VISTAR",
  description:
    "Complete our project diagnostic or connect directly with a principal engineer. Guaranteed response within 24 hours.",
  alternates: {
    canonical: "/start",
  },
  openGraph: {
    title: "Request a Demo & Technical Diagnostic | VISTAR",
    description:
      "Complete our project diagnostic or connect directly with a principal engineer. Guaranteed response within 24 hours.",
    url: "https://www.vistar.tech/start",
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
};

export default function StartPage() {
  return (
    <div className="w-full bg-[#FAF9F5] text-[#0E1118] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen pt-20 pb-32">
      
      {/* ── 1. JASPER HERO: ARCHITECTURAL BLUEPRINT GRID ── */}
      <section className="relative w-full pt-16 pb-16 md:pt-24 md:pb-24 jasper-grid-hero border-b border-black/10 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div>
            <span className="jasper-tape-salmon font-mono text-xs uppercase tracking-wider font-semibold px-3 py-1">
              Project Initiation // 24-Hour SLA
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold text-[#0E1118] tracking-tight leading-[1.08]">
            Request a demo &amp;{" "}
            <span className="jasper-tape-lime text-3xl sm:text-5xl md:text-6xl px-4 py-1">
              diagnostic
            </span>{" "}
            sprint.
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed">
            Outline your platform objectives, model parameters, and target timeline. Inquiries are evaluated directly by principal systems engineers under mutual non-disclosure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-500 pt-2">
            <span>SLA: &lt; 24 HOURS</span>
            <span>•</span>
            <span>REVIEWER: PRINCIPAL ENGINEER</span>
            <span>•</span>
            <span className="text-[#0E1118] font-semibold">NDA: DEFAULT PROTECTION</span>
          </div>
        </div>
      </section>

      {/* ── 2. DIAGNOSTIC INTERFACE CONTAINER ── */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
        <StartDiagnosticClient />
      </div>
    </div>
  );
}
