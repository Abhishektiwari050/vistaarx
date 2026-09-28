"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { playClick } from "@/lib/sound";

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
    title: "PLATFORM",
    links: [
      { label: "North Autonomous Agents", href: "/vectors" },
      { label: "Sovereign Model Vaults", href: "/vectors" },
      { label: "Edge Telemetry Mesh", href: "/work" },
      { label: "Lattice Cryptography", href: "/work" },
      { label: "Pricing & Tiers", href: "/pricing" },
    ],
  },
  {
    title: "SOLUTIONS",
    links: [
      { label: "Aviation & Mission-Critical", href: "/work" },
      { label: "Critical Healthcare AI", href: "/work" },
      { label: "PropTech & Tokenized Assets", href: "/work" },
      { label: "Institutional Settlement", href: "/work" },
      { label: "Legacy Stack Modernization", href: "/work" },
    ],
  },
  {
    title: "RESEARCH & AXIOMS",
    links: [
      { label: "Technical Essays", href: "/philosophy" },
      { label: "Deterministic Multi-Agent Graphs", href: "/philosophy" },
      { label: "Falcon-1024 Lattice Security", href: "/philosophy" },
      { label: "Sub-90ms Edge Architecture", href: "/philosophy" },
      { label: "The Death of Vendor Lock-In", href: "/philosophy" },
    ],
  },
  {
    title: "SOVEREIGNTY",
    links: [
      { label: "100% Day-One Git Handover", href: "/philosophy" },
      { label: "Air-Gapped Private VPC", href: "/vectors" },
      { label: "Direct Systems Consultation", href: "/contact" },
      { label: "GitHub Repository", href: "https://github.com", isExternal: true },
    ],
  },
];

export function VistarFooter() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    playClick(1000, 0.03);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail("");
    }, 450);
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
          <span className="inline-block font-mono text-xs uppercase tracking-widest text-[#100F12]/80 bg-white/70 border border-black/10 px-3 py-1 rounded-full shadow-2xs">
            Autonomous Enterprise Systems
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold text-[#100F12] tracking-[-0.03em] leading-[1.12]">
            Your enterprise AI infrastructure, fully sovereign.
          </h2>
          <p className="text-base sm:text-lg text-[#100F12]/80 max-w-xl mx-auto leading-relaxed font-normal">
            Deterministic multi-agent graphs, air-gapped VPC vaults, and 100% private codebase handover delivered in guaranteed sprints.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/start"
              onClick={() => playClick(800, 0.04)}
              className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-[#100F12] hover:bg-[#232227] text-white text-[14.5px] font-medium shadow-md transition-all active:scale-95"
            >
              Start Free Diagnostic
            </Link>

            <Link
              href="/contact"
              onClick={() => playClick(1000, 0.02)}
              className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-white/80 hover:bg-white text-[#100F12] border border-black/15 text-[14.5px] font-medium shadow-md transition-all active:scale-95"
            >
              Get A Demo
            </Link>
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
                        onClick={() => playClick(1100, 0.02)}
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

        {/* ── 4. BOTTOM LEGAL & SOCIAL ROW ── */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-white/50">
          
          {/* Left: Copyright & Legal Policies */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>&copy; {currentYear} VISTAR Inc. All rights reserved.</span>
            <span>&middot;</span>
            <Link href="/privacy" className="hover:text-white/90 transition-colors">
              Privacy policy
            </Link>
            <span>&middot;</span>
            <Link href="/terms" className="hover:text-white/90 transition-colors">
              Terms of use
            </Link>
            <span>&middot;</span>
            <Link href="/privacy" className="hover:text-white/90 transition-colors">
              Security &amp; Compliance
            </Link>
          </div>

          {/* Right: Circular Social Media Buttons */}
          <div className="flex items-center gap-3">
            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VISTAR on X"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VISTAR on GitHub"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VISTAR on LinkedIn"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default VistarFooter;
