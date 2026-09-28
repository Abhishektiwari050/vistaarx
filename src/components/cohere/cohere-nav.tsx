"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VistarLogo } from "@/components/vistar-logo";
import { playClick } from "@/lib/sound";

const NAV_LINKS = [
  { label: "Products", href: "/vectors" },
  { label: "Solutions", href: "/work" },
  { label: "Platform", href: "/vectors" },
  { label: "Research", href: "/philosophy" },
  { label: "Company", href: "/about" },
];

export function CohereNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-black/[0.06] transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[64px] flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            onClick={() => playClick(1000, 0.02)}
            className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none"
            aria-label="Vistar Home"
          >
            <VistarLogo size={24} />
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => playClick(1200, 0.02)}
                  className={`px-3.5 py-1.5 rounded-full text-[14px] font-medium transition-colors duration-150 relative ${
                    isActive
                      ? "text-[#141413] font-semibold bg-black/[0.04]"
                      : "text-[#5E605D] hover:text-[#141413] hover:bg-black/[0.03]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/start"
            onClick={() => playClick(1100, 0.02)}
            className="text-[14px] font-medium text-[#141413] hover:text-[#5E605D] transition-colors"
          >
            Sign in
          </Link>

          <Link
            href="/start"
            onClick={() => playClick(800, 0.04)}
            className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#141413] hover:bg-[#2A2B2A] text-white text-[14px] font-medium transition-all duration-150 active:scale-95 shadow-sm"
          >
            Request a demo
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#141413] hover:bg-black/[0.04] rounded-lg transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/[0.06] bg-white px-6 py-6 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#141413] hover:text-[#5E605D] py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-black/[0.06] flex flex-col gap-3">
            <Link
              href="/start"
              className="w-full text-center py-2.5 text-sm font-medium text-[#141413] bg-black/[0.04] rounded-full"
            >
              Sign in
            </Link>
            <Link
              href="/start"
              className="w-full text-center py-2.5 text-sm font-medium text-white bg-[#141413] rounded-full"
            >
              Request a demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
