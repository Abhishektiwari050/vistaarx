"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VistarLogo } from "./vistar-logo";
import {
  MessageSquare,
  ArrowRight,
  X,
  Menu,
  ChevronDown,
  LayoutDashboard,
  Layers,
  Compass,
} from "lucide-react";

interface NavLinkItem {
  label: string;
  href: string;
}

const PRIMARY_LINKS: NavLinkItem[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const SOLUTION_SUB_LINKS = [
  {
    title: "Capture & Convert",
    desc: "WhatsApp & Web Enquiry Automation",
    href: "/solutions/lead-automation",
    icon: MessageSquare,
  },
  {
    title: "Run Operations",
    desc: "Custom Portals & Internal Dashboards",
    href: "/solutions/operations-systems",
    icon: LayoutDashboard,
  },
  {
    title: "Build Custom Software",
    desc: "Next.js Web Applications & APIs",
    href: "/solutions/custom-software",
    icon: Layers,
  },
  {
    title: "Specialist 3D & GIS",
    desc: "Spatial Showrooms & Aviation Mapping",
    href: "/solutions/3d-and-gis",
    icon: Compass,
  },
];

export function VistarNav() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
  }, [pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSolutionsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
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

      {/* Navbar Container: Fluid & Adaptive */}
      <div
        className={`relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between transition-all duration-200 ${
          isScrolled ? "h-[54px] sm:h-[58px]" : "h-[60px] sm:h-[66px]"
        }`}
      >
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#121316] rounded-sm transition-transform active:scale-95 flex items-center shrink-0"
          aria-label="VISTAR Homepage"
        >
          <VistarLogo size={22} textColor="text-[#121316]" />
        </Link>

        {/* Center: Clean Primary Links (Desktop & Tablet) */}
        <nav
          className="hidden md:flex items-center gap-1 text-[13.5px] font-medium text-neutral-600"
          aria-label="Primary Navigation"
        >
          {/* Solutions Dropdown Menu */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setSolutionsDropdownOpen(true)}
            onMouseLeave={() => setSolutionsDropdownOpen(false)}
          >
            <Link
              href="/solutions"
              className={`transition-colors duration-150 px-3 py-1.5 rounded-full inline-flex items-center gap-1 ${
                pathname.startsWith("/solutions")
                  ? "text-[#121316] font-semibold bg-black/[0.06]"
                  : "hover:text-[#121316] hover:bg-black/[0.03]"
              }`}
            >
              <span>Solutions</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  solutionsDropdownOpen ? "rotate-180 text-[#E1341E]" : "text-neutral-400"
                }`}
              />
            </Link>

            {/* Desktop Dropdown Panel */}
            {solutionsDropdownOpen && (
              <div className="absolute top-full left-0 w-80 pt-2 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-white border border-black/10 rounded-2xl p-2.5 shadow-xl">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase font-semibold text-neutral-400 tracking-wider">
                    Core Capabilities
                  </div>
                  {SOLUTION_SUB_LINKS.map((sub) => {
                    const SubIcon = sub.icon;
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-[#E1341E]/10 group-hover:text-[#E1341E] transition-colors shrink-0 mt-0.5">
                          <SubIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[13px] font-semibold text-neutral-900 group-hover:text-[#E1341E] transition-colors">
                            {sub.title}
                          </div>
                          <div className="text-[11.5px] text-neutral-500 leading-tight">
                            {sub.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="pt-2 mt-1 border-t border-black/6 px-2">
                    <Link
                      href="/solutions"
                      className="block text-center py-1.5 text-xs font-semibold text-[#121316] hover:text-[#E1341E] transition-colors"
                    >
                      View All Solutions &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Remaining Primary Links */}
          {PRIMARY_LINKS.slice(1).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`transition-colors duration-150 px-3 py-1.5 rounded-full ${
                  isActive
                    ? "text-[#121316] font-semibold bg-black/[0.06]"
                    : "hover:text-[#121316] hover:bg-black/[0.03]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Clean CTAs (Desktop & Tablet) */}
        <div className="hidden md:flex items-center gap-2.5 text-[13px] font-medium shrink-0">
          <a
            href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20VISTAR."
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-emerald-800 transition-colors py-1.5 px-3 rounded-full hover:bg-emerald-50 font-medium inline-flex items-center gap-1.5"
            title="Chat on WhatsApp (+91 88601 10144)"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>WhatsApp</span>
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-8 sm:h-9 px-4 rounded-xl bg-[#121316] hover:bg-[#282A2E] text-white text-[13px] font-medium transition-all active:scale-95 shadow-xs"
          >
            Discuss a Workflow
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
            className="flex items-center justify-center w-9 h-9 rounded-lg text-[#121316] hover:bg-black/[0.04] focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#121316]" />
            ) : (
              <Menu className="w-5 h-5 text-[#121316]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden absolute top-full left-0 right-0 h-[calc(100svh-100%)] max-h-[calc(100svh-54px)] bg-white/98 backdrop-blur-2xl border-t border-black/[0.08] shadow-2xl flex flex-col justify-between overflow-y-auto px-6 py-6"
        >
          {/* Mobile Nav Links */}
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {PRIMARY_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3 px-3 rounded-lg flex items-center justify-between text-[15px] font-medium transition-colors ${
                    isActive
                      ? "text-[#E1341E] bg-[#E1341E]/[0.06] font-semibold"
                      : "text-[#121316] hover:bg-black/[0.03]"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? "text-[#E1341E] translate-x-0.5" : "text-black/30"
                    }`}
                  />
                </Link>
              );
            })}

            {/* Mobile Sub Solutions links */}
            <div className="pt-2 pl-3 border-l-2 border-black/10 my-2 space-y-1">
              <div className="text-[10px] font-mono uppercase text-neutral-400 font-semibold mb-1">
                Specific Solutions
              </div>
              {SOLUTION_SUB_LINKS.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-xs text-neutral-600 hover:text-[#E1341E]"
                >
                  &bull; {sub.title}
                </Link>
              ))}
            </div>
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
              className="w-full inline-flex items-center justify-center py-3 px-4 bg-[#121316] hover:bg-black text-white rounded-xl font-medium text-[14px] transition-colors shadow-xs gap-2 active:scale-[0.98]"
            >
              <span>Discuss a Workflow &rarr;</span>
            </Link>

            <p className="text-center text-[11px] font-mono text-neutral-400 pt-2">
              VISTAR &bull; Lucknow, India &bull; Founder-Led Engineering
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

export default VistarNav;
