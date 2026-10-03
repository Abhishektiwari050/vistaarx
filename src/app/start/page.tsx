import React from "react";
import type { Metadata } from "next";
import { StartDiagnosticClient } from "./start-diagnostic-client";
import { DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Start a Project — 14-Day Production Sprints | VISTAR",
  description:
    "Outline what you need built. Inquiries are evaluated directly by Abhishek Tiwari (Founder & Lead Engineer) with guaranteed response within 24 hours.",
  alternates: {
    canonical: "/start",
  },
  openGraph: {
    title: "Start a Project — 14-Day Production Sprints | VISTAR",
    description:
      "Outline what you need built. Inquiries are evaluated directly by Abhishek Tiwari (Founder & Lead Engineer) with guaranteed response within 24 hours.",
    url: "https://www.vistar.tech/start",
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
};

export default function StartPage() {
  return (
    <div className="w-full bg-[#FAF9F5] text-[#0E1118] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen pt-20 pb-32">
      
      {/* ── 1. EDITORIAL HERO ── */}
      <section className="relative w-full pt-16 pb-16 md:pt-24 md:pb-24 border-b border-black/10 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/5 border border-black/10 text-neutral-800 font-mono text-xs uppercase tracking-wider font-semibold rounded-[2px]">
              Direct Inquiry // 24-Hour Evaluation
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold text-[#0E1118] tracking-tight leading-[1.08]">
            Start your{" "}
            <span className="font-serif italic font-normal text-[#FF3823]">
              project
            </span>{" "}
            sprint.
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed">
            Outline what is slow, broken, or what you need built. Every inquiry is evaluated directly by Abhishek Tiwari (Founder &amp; Lead Engineer) with zero sales fluff.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-500 pt-2">
            <span>RESPONSE: &lt; 24 HOURS</span>
            <span>•</span>
            <span>REVIEWER: FOUNDER &amp; LEAD ENGINEER</span>
            <span>•</span>
            <span className="text-[#0E1118] font-semibold">100% PRIVATE REPO HANDOVER</span>
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
