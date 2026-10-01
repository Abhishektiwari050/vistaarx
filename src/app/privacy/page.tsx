import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ShieldCheck, Mail, CheckCircle2 } from "lucide-react";
import { DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy — Data Protection & Confidentiality",
  description:
    "Plain-English privacy policy covering diagnostic data collection, confidentiality, technical telemetry, and client data sovereignty at Vistar.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy — Data Protection & Confidentiality | VISTAR",
    description:
      "Plain-English privacy policy covering diagnostic data collection, confidentiality, technical telemetry, and client data sovereignty at Vistar.",
    url: "https://www.vistar.tech/privacy",
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — Data Protection & Confidentiality | VISTAR",
    description:
      "Plain-English privacy policy covering diagnostic data collection, confidentiality, technical telemetry, and client data sovereignty at Vistar.",
    images: ["/opengraph-image.jpg"],
  },
};

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Vistar Privacy Policy",
  description: "Privacy policy, telemetry transparency, and data protection standards of Vistar.",
  url: "https://www.vistar.tech/privacy",
};

export default function PrivacyPage() {
  return (
    <main className="w-full bg-[#FAF9F5] text-[#0E1118] font-sans antialiased selection:bg-[#FF3823] selection:text-[#0E1118] min-h-screen pt-24 pb-32">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />

      {/* ── Hero Banner ── */}
      <section className="relative jasper-grid-hero border-b border-black/10 pt-16 pb-20 overflow-hidden">
        {/* Top radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white border border-black/15 shadow-2xs mb-8">
            <Lock className="w-3.5 h-3.5 text-[#FF3823]" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-600">
              Legal // Data Protection Standards
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold text-[#0E1118] tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6">
            Privacy Policy &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ECEEF5] to-[#959CB3]">
              Data Sovereignty.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto font-sans leading-relaxed mb-8">
            We treat your codebases, architectural designs, and proprietary specifications as confidential assets. This document plainly details how data is secured and your sovereign rights.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-600 bg-white border border-black/10 rounded-full px-5 py-2 shadow-sm">
            <span>EFFECTIVE DATE: SEPTEMBER 2026</span>
            <span>•</span>
            <span>VERSION 1.0 (PRODUCTION)</span>
            <span>•</span>
            <span className="font-medium text-[#FF3823] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              STANDARD: ZERO THIRD-PARTY AD TRACKERS
            </span>
          </div>
        </div>
      </section>

      {/* ── Policy Body in Dark Modular Cards ── */}
      <section className="max-w-4xl mx-auto px-6 pt-16">
        <div className="space-y-8">
          {/* Card 1 */}
          <div className="bg-white/90 border border-black/10 rounded-[6px] p-8 sm:p-10 shadow-sm hover:border-black/15 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold text-[#FF3823] tracking-wider">01 //</span>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">Operating Entity &amp; Scope</span>
            </div>
            <h2 className="text-2xl font-sans font-medium text-[#0E1118] mb-4">Who We Are</h2>
            <p className="text-neutral-600 leading-relaxed font-sans text-base">
              Vistar Web Systems (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is an independent digital engineering studio operating from Lucknow, Uttar Pradesh, India, accessible at{" "}
              <Link href="/" className="text-[#0E1118] underline underline-offset-4 hover:text-[#FF3823] transition-colors">
                vistar.tech
              </Link>
              . We adhere to the Digital Personal Data Protection Act, 2023 (DPDP Act 2023) of India, and uphold international data protection standards (including EU GDPR principles) for our global partners. This policy governs how we collect, process, and protect your information across our website, diagnostic tools, and engineering engagements.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/90 border border-black/10 rounded-[6px] p-8 sm:p-10 shadow-sm hover:border-black/15 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold text-[#FF3823] tracking-wider">02 //</span>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">Information We Collect</span>
            </div>
            <h2 className="text-2xl font-sans font-medium text-[#0E1118] mb-4">Direct Submissions &amp; Infrastructure Telemetry</h2>
            <p className="text-neutral-600 leading-relaxed font-sans text-base mb-6">
              We collect only the minimum high-signal information necessary to evaluate and engineer systems:
            </p>
            <ul className="space-y-4 font-sans text-sm text-neutral-800">
              <li className="flex items-start gap-3 bg-[#FAF9F5] p-4 rounded-[4px] border border-black/5">
                <CheckCircle2 className="w-5 h-5 text-[#FF3823] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0E1118] block font-medium mb-0.5">Diagnostic &amp; Contact Inquiries:</strong>
                  When you complete our project diagnostic at{" "}
                  <Link href="/start" className="text-[#0E1118] underline font-semibold">
                    /start
                  </Link>{" "}
                  or email us, we collect your name, work email address, company name, project goals, technical bottlenecks, current technology stack, and budget allocation.
                </div>
              </li>
              <li className="flex items-start gap-3 bg-[#FAF9F5] p-4 rounded-[4px] border border-black/5">
                <CheckCircle2 className="w-5 h-5 text-[#FF3823] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0E1118] block font-medium mb-0.5">Infrastructure Telemetry:</strong>
                  When you access vistar.tech, our edge infrastructure automatically logs standard network requests (IP address, user agent, requested URLs, and latency metrics) to verify sub-100ms global TTFB and detect malicious traffic.
                </div>
              </li>
              <li className="flex items-start gap-3 bg-[#FAF9F5] p-4 rounded-[4px] border border-black/5">
                <CheckCircle2 className="w-5 h-5 text-[#FF3823] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0E1118] block font-medium mb-0.5">Zero Third-Party Advertising Trackers:</strong>
                  We do not deploy cross-site tracking pixels, data broker beacons, or invasive advertising cookies. Any telemetry used is strictly first-party and privacy-preserving.
                </div>
              </li>
            </ul>
          </div>

          {/* Card 3 - Confidentiality */}
          <div className="bg-white border-2 border-black/15 rounded-[6px] p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#FFF0EB] border-b border-l border-black/10 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#FF3823] px-3 py-1">
              Protected
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold text-[#FF3823] tracking-wider">03 //</span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#0E1118] font-bold">Confidentiality &amp; NDA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-medium text-[#0E1118] mb-4">
              Trade Secrets &amp; Proprietary Software Protection
            </h2>
            <p className="text-neutral-600 leading-relaxed font-sans text-base">
              We recognize that prospective clients share proprietary business logic, API schemas, and architectural pain points. All information submitted through our diagnostic or discussed during initial scoping is held in strict confidence under default mutual non-disclosure obligations. We will never disclose, resell, or commercialize your system concepts or data.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white/90 border border-black/10 rounded-[6px] p-8 sm:p-10 shadow-sm hover:border-black/15 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold text-[#FF3823] tracking-wider">04 //</span>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">Purpose &amp; Use</span>
            </div>
            <h2 className="text-2xl font-sans font-medium text-[#0E1118] mb-4">Engineering Purpose Only</h2>
            <p className="text-neutral-600 leading-relaxed font-sans text-base mb-4">
              Your information is utilized solely for:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-sans text-neutral-800">
              <div className="p-3.5 bg-[#FAF9F5] rounded-[4px] border border-black/5 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF3823] shrink-0" />
                <span>Formulating architecture &amp; sprint estimates</span>
              </div>
              <div className="p-3.5 bg-[#FAF9F5] rounded-[4px] border border-black/5 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF3823] shrink-0" />
                <span>Direct engineer communication (&lt; 24h SLA)</span>
              </div>
              <div className="p-3.5 bg-[#FAF9F5] rounded-[4px] border border-black/5 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF3823] shrink-0" />
                <span>Enforcing edge security &amp; rate limiting</span>
              </div>
              <div className="p-3.5 bg-[#FAF9F5] rounded-[4px] border border-black/5 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF3823] shrink-0" />
                <span>Executing active client sprint contracts</span>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-white border border-black/10 rounded-[6px] p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-neutral-600 mb-2">05 // Legal &amp; Data Inquiries</div>
              <h3 className="text-xl font-sans font-medium text-[#0E1118] mb-1">Direct Privacy Officer</h3>
              <p className="text-sm text-neutral-600 mb-2">Vistar Web Systems &bull; Lucknow, Uttar Pradesh, India</p>
              <p className="text-xs font-mono text-neutral-500">Phone &amp; WhatsApp: +91 79857 90432 &bull; SLA &lt; 24h</p>
            </div>
            <a
              href="mailto:services.vistaar@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[4px] bg-[#141413] text-white hover:bg-neutral-800 font-sans text-xs uppercase tracking-wider font-semibold transition-all shadow-sm shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Privacy Officer</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
