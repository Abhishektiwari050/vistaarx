"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function PortalNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0C0E]/85 backdrop-blur-[14px] border-b border-[rgba(237,231,220,0.13)]"
          : "bg-[#0A0C0E]/60 backdrop-blur-[10px] border-b border-[rgba(237,231,220,0.08)]"
      }`}
      /* Mobile-native: paint under notch/Dynamic Island */
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto flex h-[58px] max-w-[1400px] items-center justify-between px-6 md:px-10">
        {/* Left: Display Wordmark */}
        <Link
          href="/"
          className="portal-nav-link font-syne text-[15px] font-bold tracking-[-0.02em] text-[#EDE7DC]"
        >
          VISTAR<span className="text-[#E8913C]">.</span>
        </Link>

        {/* Center: Navigation Links — hidden on mobile (no collapsed menu needed, swipe-friendly) */}
        <nav className="hidden items-center gap-8 md:flex">
          {[
            { href: "#portal", label: "00 // PORTAL" },
            { href: "#statement", label: "01 // THESIS" },
            { href: "#releases", label: "02 // CATALOGUE" },
            { href: "#roster", label: "03 // ROSTER" },
            { href: "#dates", label: "04 // DISPATCH" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="portal-nav-link font-sora text-[10.5px] uppercase tracking-[0.15em] text-[#9EA5A8] transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: Pill Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/start"
            className="portal-pill group relative inline-flex items-center justify-center rounded-full border border-[rgba(237,231,220,0.2)] bg-[#101317] px-4 py-1.5 font-sora text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#EDE7DC] transition-all"
          >
            INITIATE ACCESS
            <span className="ml-1.5 inline-block text-[10px] text-[#E8913C] transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
