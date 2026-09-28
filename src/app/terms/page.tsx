import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, FileText, CheckCircle2 } from "lucide-react";
import { DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service — Sovereign IP & Engagement Standards",
  description:
    "Plain-English terms of service for Vistar engineering engagements. Establishing 100% client code ownership, mutual confidentiality, and milestone-based sprint delivery.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service — Sovereign IP & Engagement Standards | VISTAR",
    description:
      "Plain-English terms of service for Vistar engineering engagements. Establishing 100% client code ownership, mutual confidentiality, and milestone-based sprint delivery.",
    url: "https://www.vistar.tech/terms",
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — Sovereign IP & Engagement Standards | VISTAR",
    description:
      "Plain-English terms of service for Vistar engineering engagements. Establishing 100% client code ownership, mutual confidentiality, and milestone-based sprint delivery.",
    images: ["/opengraph-image.jpg"],
  },
};

const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Vistar Terms of Service",
  description: "Terms of service and sovereign intellectual property transfer standards of Vistar.",
  url: "https://www.vistar.tech/terms",
};

export default function TermsPage() {
  return (
    <main className="w-full bg-[#FAF9F5] text-[#0E1118] font-sans antialiased selection:bg-[#FF3823] selection:text-[#0E1118] min-h-screen pt-24 pb-32">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
      />

      {/* ── Hero Banner ── */}
      <section className="relative jasper-grid-hero border-b border-black/10 pt-16 pb-20 overflow-hidden">
        {/* Top radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white border border-black/15 shadow-2xs mb-8">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF3823]" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-600">
              Legal // Master Engagement Terms
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold text-[#0E1118] tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6">
            Terms of Service &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ECEEF5] to-[#959CB3]">
              Sovereign Ownership.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto font-sans leading-relaxed mb-8">
            We operate on engineering integrity and total client sovereignty. This document establishes the foundational legal framework governing all software engineering and architecture engagements.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-600 bg-white border border-black/10 rounded-full px-5 py-2 shadow-sm">
            <span>EFFECTIVE DATE: SEPTEMBER 2026</span>
            <span>•</span>
            <span>VERSION 1.0 (PRODUCTION)</span>
            <span>•</span>
            <span className="font-medium text-[#FF3823] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              CORE AXIOM: 100% CODE OWNERSHIP
            </span>
          </div>
        </div>
      </section>

      {/* ── Terms Body in Dark Modular Cards ── */}
      <section className="max-w-4xl mx-auto px-6 pt-16">
        <div className="space-y-8">
          {/* Card 1 */}
          <div className="bg-white/90 border border-black/10 rounded-[6px] p-8 sm:p-10 shadow-sm hover:border-black/15 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold text-[#FF3823] tracking-wider">01 //</span>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">Scope &amp; Application</span>
            </div>
            <h2 className="text-2xl font-sans font-medium text-[#0E1118] mb-4">Engagement Scope</h2>
            <p className="text-neutral-600 leading-relaxed font-sans text-base">
              These Terms of Service (&quot;Terms&quot;) govern your use of the website{" "}
              <Link href="/" className="text-[#0E1118] underline underline-offset-4 hover:text-[#FF3823] transition-colors">
                vistar.tech
              </Link>
              , our diagnostic platforms, and any statement of work (SOW) or sprint agreement executed between Vistar and the client (&quot;Client&quot;).
            </p>
          </div>

          {/* Card 2 - The Sovereignty Axiom */}
          <div className="bg-white border-2 border-black/15 rounded-[6px] p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#FFF0EB] border-b border-l border-black/10 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#FF3823] px-3 py-1">
              Guaranteed
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold text-[#FF3823] tracking-wider">02 //</span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#0E1118] font-bold">The Sovereignty Axiom</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-medium text-[#0E1118] mb-4">
              Complete Intellectual Property Transfer (100% Ownership)
            </h2>
            <p className="text-neutral-600 leading-relaxed font-sans text-base mb-6">
              Our core business principle is that software is equity, not a rental commodity. Upon settlement of agreed milestone invoices:
            </p>
            <ul className="space-y-4 font-sans text-sm text-neutral-800">
              <li className="flex items-start gap-3 bg-[#FAF9F5] p-4 rounded-[4px] border border-black/5">
                <CheckCircle2 className="w-5 h-5 text-[#FF3823] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0E1118] block font-medium mb-0.5">Total IP Assignment:</strong>
                  Vistar irrevocably transfers and assigns to the Client all worldwide rights, title, copyright, and interest in all bespoke software, custom code, diagrams, and digital assets engineered under the engagement.
                </div>
              </li>
              <li className="flex items-start gap-3 bg-[#FAF9F5] p-4 rounded-[4px] border border-black/5">
                <CheckCircle2 className="w-5 h-5 text-[#FF3823] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0E1118] block font-medium mb-0.5">Zero Vendor Lock-In:</strong>
                  All repositories are transferred directly to the Client&apos;s GitHub or chosen Git host. We do not use proprietary encryption, obfuscated binaries, or mandatory ongoing retainer contracts.
                </div>
              </li>
              <li className="flex items-start gap-3 bg-[#FAF9F5] p-4 rounded-[4px] border border-black/5">
                <CheckCircle2 className="w-5 h-5 text-[#FF3823] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0E1118] block font-medium mb-0.5">Open Source Licenses:</strong>
                  Standard open-source dependencies (e.g. Next.js, React, Tailwind, Lucide) remain subject to their respective permissive licenses (MIT / Apache-2.0).
                </div>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white/90 border border-black/10 rounded-[6px] p-8 sm:p-10 shadow-sm hover:border-black/15 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold text-[#FF3823] tracking-wider">03 //</span>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">Mutual Confidentiality</span>
            </div>
            <h2 className="text-2xl font-sans font-medium text-[#0E1118] mb-4">Bilateral Non-Disclosure Obligations</h2>
            <p className="text-neutral-600 leading-relaxed font-sans text-base">
              Both parties agree to treat all proprietary business data, API credentials, algorithmic architectures, trade secrets, and financial terms disclosed during engagement discussions as strictly confidential. Neither party shall disclose such information to third parties without prior written consent. Bilateral NDAs are standard and executed upon request.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white/90 border border-black/10 rounded-[6px] p-8 sm:p-10 shadow-sm hover:border-black/15 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold text-[#FF3823] tracking-wider">04 //</span>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">Sprint Delivery &amp; Acceptance</span>
            </div>
            <h2 className="text-2xl font-sans font-medium text-[#0E1118] mb-4">14–21 Day Milestone Cycles</h2>
            <p className="text-neutral-600 leading-relaxed font-sans text-base mb-4">
              Engagements are delivered in deterministic 14–21 day production cycles. Each milestone concludes with verifiable deliverables:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-sans text-neutral-800">
              <div className="p-3.5 bg-[#FAF9F5] rounded-[4px] border border-black/5 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF3823] shrink-0" />
                <span>Deployable code merged to Git</span>
              </div>
              <div className="p-3.5 bg-[#FAF9F5] rounded-[4px] border border-black/5 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF3823] shrink-0" />
                <span>Automated test suites (0 criticals)</span>
              </div>
              <div className="p-3.5 bg-[#FAF9F5] rounded-[4px] border border-black/5 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF3823] shrink-0" />
                <span>Sub-2.5s LCP &amp; WCAG AA compliance</span>
              </div>
              <div className="p-3.5 bg-[#FAF9F5] rounded-[4px] border border-black/5 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF3823] shrink-0" />
                <span>Formal 5-day client review window</span>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white/90 border border-black/10 rounded-[6px] p-8 sm:p-10 shadow-sm hover:border-black/15 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold text-[#FF3823] tracking-wider">05 //</span>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">Warranties &amp; Code Integrity</span>
            </div>
            <h2 className="text-2xl font-sans font-medium text-[#0E1118] mb-4">Production-Grade Standards</h2>
            <p className="text-neutral-600 leading-relaxed font-sans text-base">
              Vistar warrants that all custom code delivered will be free of malicious programs, built according to modern TypeScript and OWASP security standards, and conform to the technical specifications defined in the applicable SOW. Following handover, Vistar provides a 30-day warranty window for bug remediation at zero additional charge.
            </p>
          </div>

          {/* Legal Office Contact Card */}
          <div className="bg-white border border-black/10 rounded-[6px] p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-neutral-600 mb-2">06 // Legal Office</div>
              <h3 className="text-xl font-sans font-medium text-[#0E1118] mb-1">Contract &amp; Vendor Inquiries</h3>
              <p className="text-sm text-neutral-600">Direct partner response SLA within 24 hours.</p>
            </div>
            <a
              href="mailto:legal@vistar.tech"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-[#ECEEF5] font-sans text-xs uppercase tracking-wider font-semibold transition-all shadow-sm shrink-0"
            >
              <FileText className="w-4 h-4" />
              <span>Contact Legal Counsel</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
