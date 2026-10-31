"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, ArrowRight, Check, Copy, CheckCircle2, ArrowUpRight } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "SYSTEMS & CAPABILITIES",
    links: [
      { label: "Capture & Convert (WhatsApp CRM)", href: "/solutions/lead-automation" },
      { label: "Internal Operations Portals", href: "/solutions/operations-systems" },
      { label: "Custom Next.js & Python Web Apps", href: "/solutions/custom-software" },
      { label: "Specialist 3D & Spatial WebGL", href: "/solutions/3d-and-gis" },
      { label: "All Engineering Solutions", href: "/solutions" },
    ],
  },
  {
    title: "VERIFIED PROOF",
    links: [
      { label: "3axis Arc (3D Spatial Showroom)", href: "https://3axisarc.vercel.app", isExternal: true },
      { label: "Project VAYU (GIS Telemetry)", href: "https://ai-vayu.vercel.app", isExternal: true },
      { label: "AutoLead Engine (Intake System)", href: "/work" },
      { label: "AURA (Biometric Prototype)", href: "https://multi-agent-anomaly-system.onrender.com", isExternal: true },
      { label: "Inspect All Case Studies", href: "/work" },
    ],
  },
  {
    title: "HOW WE WORK",
    links: [
      { label: "6-Stage Engineering Process", href: "/how-we-work" },
      { label: "100% Client Code Ownership", href: "/how-we-work#ownership" },
      { label: "Pricing & Engagement Options", href: "/pricing" },
      { label: "About VISTAR Studio & Team", href: "/about" },
      { label: "Engineering Insights & Blog", href: "/blog" },
    ],
  },
  {
    title: "STUDIO TELEMETRY",
    links: [
      { label: "Chat on WhatsApp (+91 88601 10144)", href: "https://wa.me/918860110144", isExternal: true },
      { label: "Email: services.vistaar@gmail.com", href: "mailto:services.vistaar@gmail.com", isExternal: true },
      { label: "Discuss a Workflow", href: "/contact" },
      { label: "GitHub: VISTAR Systems", href: "https://github.com/Abhishektiwari050", isExternal: true },
    ],
  },
];

export function VistarFooter() {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("services.vistaar@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#08090C] text-white select-none relative overflow-hidden font-sans border-t border-white/10">
      
      {/* ── 1. THE GRAND INVITATION (AWWWARDS / PINTEREST DESIGNED SCENE) ── */}
      <section className="relative w-full pt-20 sm:pt-28 pb-16 px-6 lg:px-12 border-b border-white/10">
        
        {/* Subtle Ambient Radial Highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#FF3823]/10 to-transparent blur-3xl opacity-60"
        />

        <div className="relative max-w-[1340px] mx-auto space-y-12 sm:space-y-16">
          
          {/* Top Status & Kicker */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-white/90">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LEAD ENGINEER ONLINE // NEW DELHI &bull; IST (UTC+5:30)</span>
            </div>

            <span className="text-xs font-mono text-neutral-400">
              Direct founder collaboration &bull; 100% Repository Sovereignty
            </span>
          </div>

          {/* Massive Typographic Headline */}
          <div className="max-w-4xl space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.04] text-balance">
              Have a process to automate? <br />
              <span className="text-neutral-400">Let&apos;s build something practical.</span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal max-w-2xl text-pretty pt-2">
              Every system starts with a 30-minute discovery conversation directly with our lead engineer. We audit your workflow, confirm whether software will genuinely save your team time, and quote an upfront fixed fee.
            </p>
          </div>

          {/* Interactive Direct Contact Terminal Gateway */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            
            {/* Primary Action Button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-14 px-8 rounded-2xl bg-white hover:bg-neutral-100 text-[#08090C] text-sm sm:text-base font-bold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-lg active:scale-[0.98] gap-2.5 group"
            >
              <span>Discuss a workflow</span>
              <ArrowRight className="w-4 h-4 text-[#08090C] group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Direct WhatsApp Channel */}
            <a
              href="https://wa.me/918860110144?text=Hi%20VISTAR%2C%20I%20would%20like%20to%20discuss%20a%20process%20at%20our%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-14 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm sm:text-base font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-md active:scale-[0.98] gap-2.5"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp (+91 88601 10144)</span>
            </a>

            {/* Click-to-Copy Founder Email Pill */}
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center justify-center h-14 px-5 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-mono transition-all duration-300 active:scale-[0.98] cursor-pointer gap-2"
              title="Click to copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Email copied to clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>services.vistaar@gmail.com</span>
                </>
              )}
            </button>

          </div>

          {/* Reassurance Strip */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-start sm:justify-between gap-4 text-xs text-neutral-400 font-mono tabular-nums">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Direct reply from lead engineer within 24h
            </span>
            <span className="hidden sm:inline text-white/20">&bull;</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Bilateral NDA executed before detailed scoping
            </span>
            <span className="hidden sm:inline text-white/20">&bull;</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              100% private GitHub repository rights handover
            </span>
            <span className="hidden sm:inline text-white/20">&bull;</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Dual-currency milestone invoicing (INR ₹ / USD $)
            </span>
          </div>

        </div>
      </section>

      {/* ── 2. ARCHITECTURAL STUDIO DIRECTORY (THE NAVIGATION GRID) ── */}
      <div className="max-w-[1340px] mx-auto px-6 lg:px-12 pt-16 pb-12 space-y-16">
        
        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="space-y-4">
              <div className="text-[11px] font-mono font-semibold tracking-wider uppercase text-neutral-500">
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-[13px] text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 text-neutral-600 group-hover:text-white transition-colors" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-xs sm:text-[13px] text-neutral-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── 3. MONUMENTAL FULL-WIDTH VISTAR ARCHITECTURAL WORDMARK ── */}
        <div className="pt-8 border-t border-white/10 select-none overflow-hidden">
          <div className="flex items-center justify-between pb-4">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
              VISTAR WEB SYSTEMS // FOUNDER-LED ENGINEERING STUDIO
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="text-[11px] font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <span>Back to top</span>
              <ArrowRight className="w-3 h-3 -rotate-90" />
            </button>
          </div>

          {/* Monumental Kinetic Typographic Horizon */}
          <div className="w-full text-center py-4">
            <span
              className="font-bold tracking-[0.16em] sm:tracking-[0.22em] text-[#161820] text-[18vw] leading-none block select-none pointer-events-none transition-colors duration-500 hover:text-[#1F222C]"
              style={{ fontFamily: '"Geist", sans-serif' }}
            >
              VISTAR
            </span>
          </div>
        </div>

        {/* ── 4. BASELINE LEGAL & JURISDICTION ROW ── */}
        <div className="pt-6 border-t border-white/8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>&copy; {currentYear} VISTAR Web Systems. New Delhi, India.</span>
            <span>&bull;</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Engagement
            </Link>
            <span>&bull;</span>
            <span>Bilateral NDA Standard</span>
          </div>

          <div>
            <span>Sovereign software &bull; 100% repository handover</span>
          </div>
        </div>

      </div>

    </footer>
  );
}

export default VistarFooter;
