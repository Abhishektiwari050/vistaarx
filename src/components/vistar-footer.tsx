"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

interface FooterColumn {
  title: string;
  links: Array<{
    label: string;
    href: string;
    isExternal?: boolean;
  }>;
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "SOLUTIONS & SYSTEMS",
    links: [
      { label: "Capture & Convert (WhatsApp CRM)", href: "/solutions/lead-automation" },
      { label: "Run Operations (Internal Portals)", href: "/solutions/operations-systems" },
      { label: "Build Custom Software (Next.js & APIs)", href: "/solutions/custom-software" },
      { label: "Specialist 3D & GIS Platforms", href: "/solutions/3d-and-gis" },
      { label: "All Solutions Overview", href: "/solutions" },
    ],
  },
  {
    title: "ENGINEERING PROOF",
    links: [
      { label: "3axis Arc (3D Spatial Showroom)", href: "https://3axisarc.vercel.app", isExternal: true },
      { label: "Project VAYU (Aviation GIS Tool)", href: "https://ai-vayu.vercel.app", isExternal: true },
      { label: "AutoLead (Internal Intake Engine)", href: "/work" },
      { label: "AURA (Biometric ML Prototype)", href: "https://multi-agent-anomaly-system.onrender.com", isExternal: true },
      { label: "View All Engineering Case Studies", href: "/work" },
    ],
  },
  {
    title: "HOW WE WORK",
    links: [
      { label: "Our 6-Stage Engineering Process", href: "/how-we-work" },
      { label: "100% Client Code Ownership", href: "/how-we-work#ownership" },
      { label: "Pricing & Engagement Options", href: "/pricing" },
      { label: "About Abhishek Tiwari & Studio", href: "/about" },
      { label: "Engineering Insights & Blog", href: "/blog" },
    ],
  },
  {
    title: "DIRECT CONTACT",
    links: [
      { label: "Chat on WhatsApp (+91 88601 10144)", href: "https://wa.me/918860110144", isExternal: true },
      { label: "Email: services.vistaar@gmail.com", href: "mailto:services.vistaar@gmail.com", isExternal: true },
      { label: "Discuss a Workflow", href: "/contact" },
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
    <footer className="w-full bg-[#121316] text-white select-none relative overflow-hidden font-sans border-t border-black/10">
      
      {/* ── 1. PRE-FOOTER INVITATION BAR ── */}
      <section className="relative w-full py-16 sm:py-20 px-6 lg:px-12 border-b border-white/10 bg-[#16181C]">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>DIRECT FOUNDER COLLABORATION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ready to eliminate manual friction from your business?
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Book a 30-minute discovery conversation with Abhishek to review one workflow bottleneck.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-white hover:bg-neutral-100 text-[#121316] text-xs font-semibold transition-all shadow-sm active:scale-95 gap-2"
            >
              <span>Discuss a Workflow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I%20would%20like%20to%20discuss%20a%20software%20project%20with%20VISTAR."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold transition-all shadow-sm active:scale-95 gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp (+91 88601 10144)</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN FOOTER GRID ── */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 pt-16 pb-12 space-y-14">
        
        {/* Top: Brand Description & Newsletter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-white/10">
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-white font-mono">
                VISTAR
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                FOUNDER-LED STUDIO
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We engineer practical software, WhatsApp enquiry automations, and operational internal portals that help growing businesses manage sales, streamline workflows, and scale.
            </p>
          </div>

          {/* Newsletter Input */}
          <div className="max-w-md w-full">
            {subscribed ? (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Thank you. You will receive our technical publications.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex items-center w-full rounded-xl border border-white/12 bg-white/5 p-1 focus-within:border-white/30 transition-all"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for technical notes & case studies"
                  required
                  className="bg-transparent text-white placeholder:text-neutral-500 text-xs px-3.5 py-2 flex-1 outline-none font-sans"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-white hover:bg-neutral-100 text-[#121316] text-xs font-semibold transition-all shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle: 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="space-y-4">
              <div className="text-[11px] font-mono font-semibold tracking-wider uppercase text-neutral-400">
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
                        className="text-xs text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                      >
                        <span>{link.label}</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-xs text-neutral-400 hover:text-white transition-colors"
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

        {/* Bottom Legal & Identity Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>&copy; {currentYear} Vistar Web Systems. Lucknow, UP, India.</span>
            <span>&bull;</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Engagement
            </Link>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span>Directed by Abhishek Tiwari</span>
            <a
              href="https://github.com/Abhishektiwari050"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default VistarFooter;
