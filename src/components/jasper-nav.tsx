"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Resources", href: "/philosophy" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export function JasperNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-black/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#00063D] group-hover:text-[#FF3823] transition-colors">
              Vistar
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href === "/company" && pathname === "/about") ||
                (link.href === "/platform" && pathname === "/vectors") ||
                (link.href === "/solutions" && pathname === "/work");

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#FF3823] font-semibold"
                      : "text-neutral-700 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/start"
            className="text-sm font-medium text-neutral-800 hover:text-black transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/start"
            className="text-sm font-medium text-neutral-800 hover:text-black transition-colors"
          >
            Free Trial
          </Link>
          <Link
            href="/contact"
            className="bg-[#FF3823] hover:bg-[#E0301C] text-white px-5 py-2 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150 inline-flex items-center gap-1.5"
          >
            Get A Demo
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/contact"
            className="bg-[#FF3823] text-white px-3.5 py-1.5 font-semibold text-xs rounded-[4px]"
          >
            Demo
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="p-2 text-neutral-800 hover:text-black focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-black/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-neutral-800 hover:text-[#FF3823] py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-black/10 flex flex-col gap-3">
            <Link
              href="/start"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center w-full py-2.5 border border-black/20 text-neutral-900 rounded-[4px] font-medium text-sm"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center w-full py-2.5 bg-[#FF3823] text-white rounded-[4px] font-semibold text-sm"
            >
              Get A Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default JasperNav;
