"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface FooterColumn {
  title: string;
  links: Array<{
    label: string;
    href: string;
    isExternal?: boolean;
  }>;
}

const VISTAR_COLUMNS: FooterColumn[] = [
  {
    title: "WHAT WE BUILD",
    links: [
      { label: "3D Spatial & Architecture (3axis Arc)", href: "/work" },
      { label: "Aviation GIS Tool (Project VAYU)", href: "/work" },
      { label: "WhatsApp & Lead Ingestion Automation", href: "/work" },
      { label: "Custom Next.js Web Applications", href: "/work" },
      { label: "14-Day Production Sprints", href: "/pricing" },
    ],
  },
  {
    title: "STUDIO & ETHOS",
    links: [
      { label: "About Abhishek Tiwari & Studio", href: "/about" },
      { label: "The Underdog Manifesto", href: "/philosophy" },
      { label: "100% Repository Handover", href: "/philosophy" },
      { label: "Engineering Blog & Blueprints", href: "/blog" },
      { label: "Pricing & Packages (₹ / $)", href: "/pricing" },
    ],
  },
  {
    title: "ENGINEERING GUIDES",
    links: [
      { label: "The Death of Agency Wrappers", href: "/blog/why-agencies-charge-200k-for-chatgpt-wrappers" },
      { label: "Deterministic Multi-Agent Graphs", href: "/blog/deterministic-multi-agent-graphs-vs-probabilistic-drift" },
      { label: "Sovereign Private Cloud Deployment", href: "/blog/sovereign-private-vpc-ai-deployment-guide" },
      { label: "GitHub: Open Source VAYU", href: "https://github.com/Abhishektiwari050/AI-VAYU", isExternal: true },
      { label: "Live Showroom: 3axis Arc", href: "https://3axisarc.vercel.app", isExternal: true },
    ],
  },
  {
    title: "DIRECT CONTACT",
    links: [
      { label: "Chat on WhatsApp (+91 88601 10144)", href: "https://wa.me/918860110144", isExternal: true },
      { label: "Email: services.vistaar@gmail.com", href: "mailto:services.vistaar@gmail.com", isExternal: true },
      { label: "Schedule 30-Min Diagnostic", href: "/contact" },
      { label: "GitHub: Abhishek Tiwari", href: "https://github.com/Abhishektiwari050", isExternal: true },
    ],
  },
];

export function VistarFooter() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "newsletter" }),
      });
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(true);
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full bg-[#100F12] text-white select-none relative overflow-hidden font-sans">
      {/* ── 1. VISTAR PRE-FOOTER CTA (TRUE PARALLAX SCROLL) ── */}
      <section
        className="relative w-full py-28 sm:py-36 px-6 lg:px-12 flex flex-col items-center justify-center text-center overflow-hidden border-b border-black/10 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/vistar_mountain_parallax.avif')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Subtle scrim overlay so text is crisp and readable */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold text-[#100F12] tracking-[-0.03em] leading-[1.12]">
            Custom software &amp; automations, delivered in 14 days.
          </h2>
          <p className="text-base sm:text-lg text-[#100F12]/80 max-w-xl mx-auto leading-relaxed font-normal">
            WhatsApp sales pipelines, modern Next.js 16 portals, and 3D architectural showcases with 100% private code ownership. Fixed-scope packages from ₹49,000 ($600).
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-[#100F12] hover:bg-[#232227] text-white text-[14.5px] font-medium shadow-md transition-all active:scale-95"
            >
              View Packages (from ₹49k)
            </Link>

            <a
              href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20VISTAR."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-[14.5px] font-medium shadow-md transition-all active:scale-95 gap-2"
            >
              Chat on WhatsApp (+91 88601 10144)
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. VISTAR FOOTER CONTENT ── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 pt-20 pb-12 space-y-16">
        
        {/* Top: Newsletter Subscribe Bar */}
        <div className="max-w-xl">
          {subscribed ? (
            <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#18171B] border border-white/10 text-white/90 text-sm font-medium animate-in fade-in duration-200">
              <span className="w-2 h-2 rounded-full bg-[#FF3823] animate-pulse" />
              <span>Thank you! Your submission has been received.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="relative flex items-center w-full max-w-[500px] rounded-full border border-white/10 bg-[#18171B] p-1.5 focus-within:border-white/30 transition-all shadow-lg"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Subscribe to technical publications"
                required
                className="bg-transparent text-white placeholder:text-white/40 text-[14px] px-5 py-2 flex-1 outline-none font-normal"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-full bg-white hover:bg-white/90 text-[#100F12] text-[13.5px] font-medium transition-all active:scale-95 shrink-0 shadow-md cursor-pointer disabled:opacity-50"
              >
                {loading ? "Please wait..." : "Subscribe"}
              </button>
            </form>
          )}
        </div>

        {/* Middle: 4 Navigation Columns with Divider Lines */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-14 pt-2">
          {VISTAR_COLUMNS.map((col) => (
            <div key={col.title} className="space-y-4">
              {/* Column Title */}
              <div className="text-[12px] font-semibold tracking-wider uppercase text-white/50">
                {col.title}
              </div>

              {/* Fine hairline divider line */}
              <div className="w-full h-px bg-white/10" />

              {/* Column Links */}
              <ul className="space-y-3 pt-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] text-white/80 hover:text-white transition-colors inline-flex items-center gap-1 group font-normal"
                      >
                        <span>{link.label}</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[14px] text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 font-normal"
                      >
                        <span>{link.label}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── 3. VISTAR SIGNATURE BRAND DISPLAY ── */}
        <div className="pt-10 pb-4 flex items-center justify-start border-t border-white/10">
          <div className="flex flex-col gap-2 select-none">
            <div className="flex items-center gap-4 text-white">
              <svg
                width={52}
                height={52}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 text-white"
                aria-hidden="true"
              >
                <polygon points="50,2 66,34 34,34" fill="currentColor" />
                <polygon points="98,50 66,66 66,34" fill="currentColor" />
                <polygon points="50,98 34,66 66,66" fill="currentColor" />
                <polygon points="2,50 34,34 34,66" fill="currentColor" />
                <rect
                  x="34"
                  y="34"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeOpacity="0.3"
                />
              </svg>
              <span className="font-sans font-black tracking-[-0.04em] uppercase text-4xl sm:text-6xl md:text-7xl text-white">
                VISTAR
              </span>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/50 pl-1">
              Autonomous Systems &bull; Sovereign Runtime &bull; 100% Repository Handover
            </p>
          </div>
        </div>

        {/* ── 4. BOTTOM LEGAL & CONTACT ROW ── */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-white/50">
          
          {/* Left: Entity & Legal Policies */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>&copy; {currentYear} Vistar Web Systems. Lucknow, UP, India.</span>
            <span>&middot;</span>
            <Link href="/privacy" className="hover:text-white/90 transition-colors">
              Privacy Policy (DPDP &amp; GDPR)
            </Link>
            <span>&middot;</span>
            <Link href="/terms" className="hover:text-white/90 transition-colors">
              Terms of Engagement
            </Link>
            <span>&middot;</span>
            <Link href="/contact" className="hover:text-white/90 transition-colors">
              Direct Contact
            </Link>
          </div>

          {/* Right: Direct Contact Icons */}
          <div className="flex items-center gap-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me/918860110144?text=Hi%20Vistar%20team,%20I'd%20like%20to%20discuss%20a%20software%20project."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with VISTAR on WhatsApp"
              title="Chat on WhatsApp (+91 88601 10144)"
              className="h-9 px-3 rounded-full bg-emerald-600/30 hover:bg-emerald-600 border border-emerald-500/40 flex items-center gap-1.5 text-white transition-all active:scale-95 cursor-pointer text-xs font-mono"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>WhatsApp: +91 88601 10144</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Abhishektiwari050"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abhishek Tiwari on GitHub"
              title="Abhishek Tiwari GitHub"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:services.vistaar@gmail.com"
              aria-label="Email VISTAR"
              title="services.vistaar@gmail.com"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default VistarFooter;
