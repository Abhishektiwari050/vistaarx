"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VistarLogo } from "./vistar-logo";
import { MessageSquare, ArrowRight, X, Menu } from "lucide-react";

interface NavLinkItem {
  label: string;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/vectors" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/blog" },
];

export function VistarNav() {
  const pathname = usePathname();

  // Scroll reaction state
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll position for subtle background blur / border styling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 12);
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

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 select-none transition-all duration-200"
      role="banner"
    >
      {/* Blurred Backdrop */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-200 ${
          isScrolled || mobileMenuOpen
            ? "bg-white/95 backdrop-blur-md border-b border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            : "bg-white/90 backdrop-blur-sm border-b border-black/[0.04]"
        }`}
      />

      {/* Navbar Container: Fluid & Adaptive for Mobile, Tablet, and Desktop */}
      <div
        className={`relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between transition-all duration-200 ${
          isScrolled ? "h-[54px] sm:h-[58px]" : "h-[60px] sm:h-[66px]"
        }`}
      >
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413] rounded-sm transition-transform active:scale-95 flex items-center shrink-0"
          aria-label="VISTAR Homepage"
        >
          <VistarLogo size={22} textColor="text-[#141413]" />
        </Link>

        {/* Center: Clean Primary Links (Tablet & Desktop Adaptive) */}
        <nav
          className="hidden md:flex items-center gap-0.5 lg:gap-1 text-[13px] lg:text-[13.5px] font-medium text-[#5E605D]"
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
                className={`transition-colors duration-150 px-2.5 lg:px-3.5 py-1.5 rounded-full ${
                  isActive
                    ? "text-[#141413] font-semibold bg-black/[0.06]"
                    : "text-[#5E605D] hover:text-[#141413] hover:bg-black/[0.03]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Clean CTAs (Desktop & Tablet) */}
        <div
          className="hidden md:flex items-center gap-2 lg:gap-3 text-[13px] lg:text-[13.5px] font-medium shrink-0"
          style={{
            fontFamily:
              '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          <a
            href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20VISTAR."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#15803D] hover:text-[#166534] transition-colors py-1.5 px-2.5 lg:px-3 rounded-full hover:bg-emerald-50 font-medium inline-flex items-center gap-1.5"
            title="Chat on WhatsApp"
          >
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="hidden lg:inline">WhatsApp</span>
            <span className="lg:hidden">Chat</span>
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-8 sm:h-9 px-3.5 lg:px-4 rounded-full bg-[#141413] hover:bg-[#2A2B2A] text-white text-[12.5px] lg:text-[13px] font-medium transition-all duration-150 active:scale-95 shadow-sm"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile & Small Tablet Quick Actions (< 768px) */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick WhatsApp Pill on Mobile */}
          <a
            href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20VISTAR."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] text-white text-[12px] font-medium active:scale-95 transition-transform shadow-xs"
            aria-label="Chat on WhatsApp"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>WhatsApp</span>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-[#141413] hover:bg-black/[0.04] focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#141413]" />
            ) : (
              <Menu className="w-5 h-5 text-[#141413]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Small Tablet Full-Screen Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden absolute top-full left-0 right-0 h-[calc(100svh-100%)] max-h-[calc(100svh-54px)] bg-white/98 backdrop-blur-2xl border-t border-black/[0.08] shadow-2xl flex flex-col justify-between overflow-y-auto px-6 py-6"
        >
          {/* Mobile Nav Links */}
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3.5 px-3 rounded-lg flex items-center justify-between text-[16px] font-medium transition-colors ${
                    isActive
                      ? "text-[#FF3823] bg-[#FF3823]/[0.06] font-semibold"
                      : "text-[#141413] hover:bg-black/[0.03]"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? "text-[#FF3823] translate-x-0.5" : "text-black/30"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Mobile Direct Action Buttons */}
          <div className="pt-6 pb-4 space-y-2.5 border-t border-black/[0.06] mt-4">
            <a
              href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20VISTAR."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-3 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl font-medium text-[14px] transition-colors shadow-xs gap-2 active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 88601 10144)</span>
            </a>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-3 px-4 bg-[#141413] hover:bg-black text-white rounded-xl font-medium text-[14px] transition-colors shadow-xs gap-2 active:scale-[0.98]"
            >
              <span>Contact Us &rarr;</span>
            </Link>

            <p className="text-center text-[11px] font-mono text-neutral-400 pt-2">
              VISTAR &bull; Lucknow, India &bull; Sprints Ship in 14 Days
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

export default VistarNav;
