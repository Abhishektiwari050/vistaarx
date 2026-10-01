import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Shield, Code2, Sparkles, MessageCircle, MapPin, Mail, Phone } from "lucide-react";
import { DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About VISTAR — Founder-Led Software & AI Studio in Lucknow, India",
  description:
    "VISTAR is a founder-led digital engineering studio based in Lucknow, India, founded by Abhishek Tiwari. We engineer custom web apps, WhatsApp automation engines, and 3D spatial platforms with 100% repository ownership.",
  alternates: {
    canonical: "https://www.vistar.tech/about",
  },
  openGraph: {
    title: "About VISTAR — Founder-Led Software & AI Studio in Lucknow, India",
    description:
      "VISTAR is a founder-led digital engineering studio based in Lucknow, India, founded by Abhishek Tiwari. We engineer custom web apps, WhatsApp automation engines, and 3D spatial platforms with 100% repository ownership.",
    url: "https://www.vistar.tech/about",
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
};

const STATS = [
  { value: "100%", label: "Repository Ownership", detail: "Day-one private GitHub transfer with zero retainers" },
  { value: "14 Days", label: "Production Sprint Cadence", detail: "Guaranteed fixed-scope engineering cycles" },
  { value: "30 Days", label: "Post-Delivery Warranty", detail: "Zero-cost bug fixes and deployment support" },
];

const ENGINEERING_PILLARS = [
  {
    icon: Code2,
    tag: "PILLAR 01",
    title: "100% Source Code Sovereignty",
    desc: "Every line of TypeScript, Python, Docker configurations, and PostgreSQL schemas is committed directly to your private GitHub repository. You own your IP completely—zero vendor lock-in, zero CMS hostage retainers.",
  },
  {
    icon: Shield,
    tag: "PILLAR 02",
    title: "Bilateral NDA & Data Privacy",
    desc: "We sign bilateral NDAs before scoping proprietary details. Your business data, client records, and API credentials stay within your private infrastructure. We never train public models on your proprietary assets.",
  },
  {
    icon: Sparkles,
    tag: "PILLAR 03",
    title: "Transparent Fixed Pricing",
    desc: "Transparent scope and upfront dual-currency pricing starting at ₹49,000 ($600). No surprise invoices, no phantom hours, and no junior-developer telephone games.",
  },
];

export default function AboutCompanyPage() {
  return (
    <div className="w-full bg-[#FAF9F5] text-[#0E1118] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen">
      
      {/* ── FRAME 1: EDITORIAL HERO ── */}
      <section className="relative w-full pt-24 pb-16 md:pt-32 md:pb-24 border-b border-black/10 bg-[#FAF9F5] text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/5 border border-black/10 text-neutral-800 font-mono text-xs uppercase tracking-wider font-semibold rounded-[2px]">
              <MapPin className="w-3.5 h-3.5 text-[#FF3823]" /> Lucknow, Uttar Pradesh, India
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#0E1118] tracking-tight leading-[1.08]">
            Founder-led software studio.{" "}
            <span className="font-serif italic font-normal text-[#FF3823]">
              Shipped in 14 days.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            We eliminate agency bloat and unmaintainable templates. VISTAR builds production WhatsApp sales automations, high-performance Next.js 16 portals, and interactive 3D WebGL showcases with 100% private code ownership from day one.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center h-12 px-7 rounded-[4px] bg-[#FF3823] hover:bg-[#E0301C] text-white text-[14px] font-medium shadow-sm transition-all active:scale-95 gap-2"
            >
              View Packages (from ₹49k / $600)
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/917985790432?text=Hi%20Abhishek%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20VISTAR."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-7 rounded-[4px] bg-[#25D366] hover:bg-[#20BD5A] text-white text-[14px] font-medium shadow-sm transition-all active:scale-95 gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>

            <Link
              href="/work"
              className="inline-flex items-center justify-center h-12 px-7 rounded-[4px] bg-white hover:bg-neutral-100 text-[#0E1118] border border-black/15 text-[14px] font-medium shadow-sm transition-all active:scale-95"
            >
              Inspect Verified Work
            </Link>
          </div>
        </div>
      </section>

      {/* ── FRAME 2: FOUNDER PROFILE & STUDIO IDENTITY ── */}
      <section className="relative w-full py-20 md:py-28 px-6 bg-white border-b border-black/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            {/* Founder Headshot */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-[8px] overflow-hidden border border-black/15 shadow-lg bg-[#FAF9F5]">
                <Image
                  src="/images/headshot_primary.png"
                  alt="Abhishek Tiwari — Founder & Lead Engineer at VISTAR"
                  fill
                  sizes="(max-width: 768px) 100vw, 340px"
                  className="object-cover object-top filter grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                  priority
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                  <div className="font-serif text-lg font-medium">Abhishek Tiwari</div>
                  <div className="font-mono text-xs text-neutral-300">Founder &amp; Principal Systems Engineer</div>
                </div>
              </div>
            </div>

            {/* Founder Bio & Narrative */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <span className="inline-block font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-2">
                  Founder &amp; Lead Systems Engineer
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#0E1118] tracking-tight leading-tight">
                  Direct engineering without junior telephone games.
                </h2>
              </div>

              <div className="space-y-4 text-neutral-700 font-sans text-base leading-relaxed">
                <p>
                  I founded VISTAR in Lucknow, Uttar Pradesh, with one core principle: businesses deserve direct collaboration with the engineer writing their code, not layers of account managers, sales intermediaries, and outsourced juniors.
                </p>
                <p>
                  My engineering background spans modern TypeScript, Next.js 16, Python/FastAPI backends, and Three.js/WebGL spatial rendering. Recent work includes <strong>3axis Arc</strong> (a production 60fps 3D architecture platform for Lucknow developers), <strong>Project VAYU</strong> (an open-source pre-flight aviation GIS tool), and automated <strong>AutoLead</strong> intake pipelines that capture IndiaMART and JustDial buyer leads straight to WhatsApp.
                </p>
                <p>
                  When you work with VISTAR, every sprint is planned and executed by senior hands. You receive 100% repository transfer, a clear bilateral NDA, and a 30-day post-delivery bug warranty.
                </p>
              </div>

              {/* Direct Founder Links */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-600">
                <a
                  href="https://github.com/Abhishektiwari050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F5] border border-black/10 rounded-[4px] text-neutral-800 hover:border-black/30 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub / Abhishektiwari050</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/abhishek-tiwari-92318728b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F5] border border-black/10 rounded-[4px] text-neutral-800 hover:border-black/30 transition-colors"
                >
                  <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.88 0-1.6.72-1.6 1.6s.72 1.6 1.6 1.6 1.6-.72 1.6-1.6-.72-1.6-1.6-1.6Z" />
                  </svg>
                  <span>LinkedIn / Abhishek Tiwari</span>
                </a>
                <a
                  href="mailto:services.vistaar@gmail.com"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F5] border border-black/10 rounded-[4px] text-neutral-800 hover:border-black/30 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#FF3823]" /> services.vistaar@gmail.com
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FRAME 3: STATS STRIP ── */}
      <section className="w-full py-16 px-6 bg-[#FAF9F5] border-b border-black/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((stat, i) => (
              <div key={i} className="bg-white border border-black/10 rounded-[4px] p-8 text-center space-y-2 shadow-2xs">
                <div className="font-serif text-4xl sm:text-5xl font-normal text-[#0E1118] tracking-tight">
                  {stat.value}
                </div>
                <div className="font-sans font-medium text-sm text-neutral-800">
                  {stat.label}
                </div>
                <div className="font-mono text-xs text-neutral-500">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAME 4: ARCHITECTURAL PILLARS ── */}
      <section className="w-full py-20 px-6 bg-white border-b border-black/10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-2 text-center">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold">
              Our Core Promises
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#0E1118]">
              Engineered for Sovereignty &amp; Speed
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENGINEERING_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF9F5] border border-black/10 rounded-[6px] p-7 space-y-4 hover:border-black/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#FF3823] font-semibold tracking-wider">
                      {pillar.tag}
                    </span>
                    <Icon className="w-5 h-5 text-neutral-600" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#0E1118]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FRAME 5: BOTTOM CONVERSION CTA ── */}
      <section className="w-full py-24 px-6 bg-[#141413] text-center text-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-block font-mono text-xs uppercase tracking-widest text-neutral-400 bg-white/10 px-3 py-1 rounded-full">
            Ready to Build?
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
            Schedule a 30-minute scoping discussion.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-normal">
            Directly with Abhishek Tiwari. Guaranteed response within 24 hours under mutual NDA.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/917985790432?text=Hi%20Abhishek%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20VISTAR."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium text-sm px-8 py-3.5 rounded-[4px] transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp (+91 79857 90432)
            </a>
            <Link
              href="/contact"
              className="bg-transparent hover:bg-white/10 text-white border border-white/20 font-medium text-sm px-8 py-3.5 rounded-[4px] transition-colors inline-flex items-center gap-2"
            >
              Submit Project Details
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
