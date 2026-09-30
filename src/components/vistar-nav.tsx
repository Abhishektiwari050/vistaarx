"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VistarLogo } from "./vistar-logo";

interface NavLinkItem {
  label: string;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: "Platform", href: "/vectors" },
  { label: "Solutions", href: "/work" },
  { label: "Network", href: "/network" },
  { label: "Research", href: "/philosophy" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function VistarNav() {
  const pathname = usePathname();

  // Scroll reaction states
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);

  // Directional scroll engine: hide on down scroll past 140px, reveal immediately on up scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = Math.max(0, window.scrollY);
          const diff = currentY - lastScrollY.current;

          setIsScrolled(currentY > 15);

          if (Math.abs(diff) > 4) {
            const newDirection = diff > 0 ? "down" : "up";
            if (currentY > 140 && newDirection === "down") {
              setIsVisible(false);
            } else if (newDirection === "up" || currentY <= 140) {
              setIsVisible(true);
            }
          }

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 select-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Blurred Backdrop */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            : "bg-white/90 backdrop-blur-sm border-b border-black/[0.04]"
        }`}
      />

      {/* Navbar Container */}
      <div
        className={`relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "h-[56px]" : "h-[64px]"
        }`}
      >
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413] rounded-sm transition-transform active:scale-95 flex items-center"
          aria-label="VISTAR Homepage"
        >
          <VistarLogo size={23} textColor="text-[#141413]" />
        </Link>

        {/* Center: Clean Primary Links */}
        <nav
          className="hidden md:flex items-center gap-1 text-[13.5px] font-medium text-[#5E605D]"
          style={{
            fontFamily:
              '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
          aria-label="Primary Navigation"
        >
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`transition-colors duration-150 px-3.5 py-1.5 rounded-full ${
                  isActive
                    ? "text-[#141413] font-semibold bg-black/[0.05]"
                    : "text-[#5E605D] hover:text-[#141413] hover:bg-black/[0.03]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Clean CTAs */}
        <div
          className="hidden md:flex items-center gap-3 text-[13.5px] font-medium"
          style={{
            fontFamily:
              '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          <Link
            href="/start"
            className="text-[#5E605D] hover:text-[#141413] transition-colors py-1.5 px-3 rounded-full hover:bg-black/[0.03]"
          >
            Start Free Diagnostic
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-9 px-4 rounded-full bg-[#141413] hover:bg-[#2A2B2A] text-white text-[13px] font-medium transition-all duration-150 active:scale-95 shadow-sm"
          >
            Get A Demo
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden p-2 text-[#141413] hover:text-[#0284C7] focus:outline-none cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 top-[60px] bg-white/98 backdrop-blur-2xl z-40 flex flex-col justify-between p-8 md:hidden border-t border-black/[0.08]"
        >
          <nav className="flex flex-col space-y-4 pt-4 text-[17px] font-medium text-[#141413]">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`border-b border-black/[0.06] pb-3.5 flex items-center justify-between ${
                    isActive ? "text-[#FF3823] font-semibold" : "text-[#141413]/80 hover:text-[#141413]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-sm font-mono text-black/30">&rarr;</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 pb-4 space-y-3">
            <Link
              href="/start"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300 rounded-full font-medium text-[14px] transition-colors"
            >
              Start Free Diagnostic
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-3 bg-[#FF3823] hover:bg-[#E0301C] text-white rounded-full font-medium text-[14px] transition-colors shadow-sm"
            >
              Get A Demo &rarr;
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default VistarNav;
