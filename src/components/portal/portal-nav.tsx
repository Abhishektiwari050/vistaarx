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
          ? "bg-transparent/85 backdrop-blur-[14px] border-b border-[rgba(56, 189, 248, 0.15)]"
          : "bg-transparent/60 backdrop-blur-[10px] border-b border-[rgba(26,25,22,0.05)]"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto flex h-[58px] max-w-[1400px] items-center justify-between px-6 md:px-10">
        {/* Left: Display Wordmark */}
        <Link
          href="/"
          className="portal-nav-link font-syne text-[15px] font-bold tracking-[-0.02em] text-[#0B1320]"
        >
          VISTAR<span className="text-[#0284C7]">.</span>
        </Link>

        {/* Center: Navigation Links */}
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
              className="portal-nav-link font-sora text-[10.5px] uppercase tracking-[0.15em] text-[#0B1320]/65 hover:text-[#0284C7] transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: Pill Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/start"
            className="portal-pill group relative inline-flex items-center justify-center rounded-[4px] border border-[#0284C7] bg-[#0284C7] px-4 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-[#C15F3C]"
          >
            COMMISSION ↗
          </Link>
        </div>
      </div>
    </header>
  );
}

export default PortalNav;
