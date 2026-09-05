"use client";

import { useEffect, useState, useRef } from "react";
import { useScrollStore, ScrollStore } from "@/lib/stores/scroll-store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAudioFeedback, playTickSound } from "@/lib/hooks/use-audio-feedback";
import { TextPressure } from "@/components/text-pressure";
import { Preloader } from "@/components/preloader";

// ─────────────────────────────────────────────────────────────────────────────
// Minimal Editorial Footer
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = [
    { href: "/work", label: "WORK" },
    { href: "/#systems", label: "SYSTEMS" },
    { href: "/vectors", label: "APPROACH" },
    { href: "/philosophy", label: "ABOUT" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <footer className="bg-[#faf9f5] border-t-2 border-black py-16 px-6 md:px-12 select-none relative z-30 font-sans text-black overflow-hidden">
      <div className="absolute inset-0 halftone-dots-fine opacity-[0.015] pointer-events-none z-0" />
      
      {/* Big watermark text */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 pointer-events-none select-none leading-none overflow-hidden z-0"
      >
        <span className="font-display font-black tracking-tighter text-[#0a0a0a]/5 text-fluid-footer leading-[0.82] block">
          VISTAR.
        </span>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10 relative z-10">
        
        {/* Brand Statement */}
        <div className="space-y-4 max-w-sm">
          <Link href="/" className="font-display text-2xl font-black tracking-wider flex items-center gap-2.5 uppercase text-black">
            <span className="relative flex h-2.5 w-2.5 shrink-0 select-none">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff1e90] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff1e90]"></span>
            </span>
            <TextPressure text="VISTAR" />
          </Link>
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider leading-relaxed">
            We build the systems your business runs on. Digital platforms, custom software, automations, and AI infrastructure.
          </p>
          <div className="inline-flex items-center gap-2 border border-black/20 bg-white px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase text-zinc-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            SYSTEM STATUS: ONLINE // 99.99% SLA
          </div>
        </div>

        {/* Minimal Navigation & Socials */}
        <div className="flex flex-col sm:flex-row gap-8 md:gap-14 font-mono text-xs font-black uppercase tracking-widest">
          <div className="flex flex-col gap-2.5">
            <span className="text-[9px] font-bold text-zinc-400 tracking-widest pb-1 border-b border-black/10">NAVIGATION</span>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black hover:text-[#ff1e90] transition-colors interactive"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-[9px] font-bold text-zinc-400 tracking-widest pb-1 border-b border-black/10">SOCIALS</span>
            <a
              href="https://linkedin.com/in/abhishektiwari050"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-[#ff1e90] transition-colors interactive"
            >
              LINKEDIN ↗
            </a>
            <a
              href="https://github.com/Abhishektiwari050/vistaarx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-[#ff1e90] transition-colors interactive"
            >
              GITHUB ↗
            </a>
            <Link
              href="/contact"
              className="text-[#ff1e90] hover:text-black transition-colors interactive"
            >
              START A BUILD →
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-6xl mx-auto border-t border-dashed border-black/15 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono tracking-widest text-zinc-400 gap-4 relative z-10">
        <p>© {year} VISTAR. ALL SYSTEMS OPERATIONAL.</p>
        <p>100% CLIENT SOURCE CODE OWNERSHIP · ZERO LOCK-IN</p>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sleek Top-Edge Page Loading Indicator Component
// ─────────────────────────────────────────────────────────────────────────────
function TopLoadingBar() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setActive(true);
    setProgress(0);

    let fadeTimer: NodeJS.Timeout;
    const startTime = performance.now();
    const duration = 400;

    const update = () => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(update);
      } else {
        fadeTimer = setTimeout(() => {
          setActive(false);
        }, 150);
      }
    };

    requestAnimationFrame(update);

    return () => {
      clearTimeout(fadeTimer);
    };
  }, [pathname]);

  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        backgroundColor: "#d8ff42",
        transform: `scaleX(${progress / 100})`,
        transformOrigin: "left",
        zIndex: 99999,
        pointerEvents: "none",
        transition: progress === 100 ? "opacity 150ms ease-out" : "none",
        opacity: progress === 100 ? 0 : 1,
        boxShadow: "0 0 8px #d8ff42, 0 0 4px #ff1e90",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Master Layout Shell Wrapper
// ─────────────────────────────────────────────────────────────────────────────
export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useAudioFeedback();
  const pathname = usePathname();
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    useScrollStore.getState().setScrollProgress(0);
    useScrollStore.getState().setScrollY(0);
  }, [pathname]);

  useEffect(() => {
    Promise.resolve().then(() => {
      setMounted(true);
    });
  }, []);

  // Header hide on scroll down, show on scroll up
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 80;
      const dy = scrollY - lastScrollY.current;

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? scrollY / totalScroll : 0;
      useScrollStore.getState().setScrollProgress(progress);
      useScrollStore.getState().setScrollY(scrollY);

      if (scrollY < threshold) {
        setHeaderVisible(true);
      } else if (dy > 6) {
        setHeaderVisible(false);
      } else if (dy < -6) {
        setHeaderVisible(true);
      }
      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  const navLinks = [
    { href: "/work", label: "WORK" },
    { href: "/#systems", label: "SYSTEMS" },
    { href: "/vectors", label: "APPROACH" },
    { href: "/philosophy", label: "ABOUT" },
  ];

  const getLinkStyles = (href: string) => {
    const isActive = pathname === href;
    return `transition-all py-1 interactive whitespace-nowrap border-b-2 font-mono font-bold tracking-widest uppercase text-[11px] ${
      isActive 
        ? "text-[#ff1e90] border-[#ff1e90]" 
        : "text-zinc-600 border-transparent hover:text-black hover:border-black"
    }`;
  };

  if (!mounted) return <>{children}</>;

  return (
    <div className="w-full min-h-screen bg-transparent text-black transition-colors duration-500 ease-in-out selection:bg-[#d8ff42] selection:text-black">
      <Preloader />
      <TopLoadingBar />

      <div className="transition-opacity duration-1000 ease-in-out opacity-100 pointer-events-auto">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#d8ff42] focus:text-black focus:px-4 focus:py-2 font-mono text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#000]"
        >
          Skip to content
        </a>

        {/* Navigation Header Bar */}
        <header 
          className={`fixed top-4 left-1/2 z-45 flex items-center justify-between gap-6 sm:gap-10 px-5 sm:px-7 py-2.5 select-none rounded-xl bg-white/95 backdrop-blur-md border-2 border-black shadow-[4px_4px_0px_#000] transition-all duration-300 ease-out w-auto max-w-[94vw] -translate-x-1/2 ${
            headerVisible ? "translate-y-0" : "-translate-y-[180%]"
          }`}
        >
          <Link href="/" id="nav-brand-logo" className="font-display text-base font-black tracking-widest text-black flex items-center gap-2 interactive uppercase">
            <span className="relative flex h-2 w-2 shrink-0 select-none">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff1e90] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff1e90]"></span>
            </span>
            <TextPressure text="VISTAR" />
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={getLinkStyles(link.href)}
                onClick={() => playTickSound()}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Primary CTA */}
          <div className="hidden sm:flex items-center">
            <Link
              href="/contact"
              onClick={() => playTickSound()}
              className="bg-[#d8ff42] text-black font-mono font-black text-[10px] tracking-widest uppercase px-3.5 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-black hover:text-[#d8ff42] hover:shadow-[3px_3px_0px_#ff1e90] active:translate-x-0.5 active:translate-y-0.5 transition-all interactive"
            >
              START A BUILD →
            </Link>
          </div>
          
          {/* Mobile menu toggle */}
          <button 
            onClick={() => {
              playTickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            id="nav-menu-toggle"
            aria-label="Toggle Navigation Drawer"
            className="md:hidden p-2 border-2 border-black bg-white text-black shadow-[2px_2px_0px_#000] cursor-pointer interactive active:translate-y-0.5 transition-all flex items-center justify-center rounded-lg"
          >
            <div className="flex flex-col gap-1 items-center justify-center w-4 h-3.5 select-none pointer-events-none">
              <span className={`w-4 h-[2px] bg-black transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-4 h-[2px] bg-black transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`w-4 h-[2px] bg-black transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </header>

        {/* Fullscreen Mobile Navigation Menu Drawer Overlay */}
        <div 
          className={`fixed inset-0 z-40 flex flex-col justify-center px-8 md:hidden transition-all duration-400 bg-[#faf9f5] border-b-2 border-black ${
            mobileMenuOpen 
              ? "opacity-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 halftone-dots-fine opacity-5 pointer-events-none z-0" />
          <nav className="flex flex-col gap-5 font-display text-3xl font-black uppercase tracking-tight relative z-50 text-black">
            {navLinks.map((link, idx) => (
              <Link 
                key={link.href} 
                href={link.href} 
                id={`mobile-nav-link-${idx}`}
                onClick={() => {
                  playTickSound();
                  setMobileMenuOpen(false);
                }}
                className={`transition-all interactive border-b-2 pb-2 inline-block ${
                  pathname === link.href 
                    ? "text-[#ff1e90] border-black"
                    : "text-black border-black/10 hover:border-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => {
                playTickSound();
                setMobileMenuOpen(false);
              }}
              className="mt-4 bg-[#d8ff42] text-black font-mono text-sm font-black tracking-widest uppercase p-4 text-center rounded-xl border-2 border-black shadow-[4px_4px_0px_#000]"
            >
              START A BUILD →
            </Link>
          </nav>
          
          <div className="my-6 border-t border-black/10" />
          
          <div className="flex gap-6 font-mono text-xs font-bold tracking-widest uppercase justify-center text-zinc-600 relative z-50">
            <a href="https://linkedin.com/in/abhishektiwari050" target="_blank" rel="noopener noreferrer" className="hover:text-black">LINKEDIN ↗</a>
            <a href="https://github.com/Abhishektiwari050/vistaarx" target="_blank" rel="noopener noreferrer" className="hover:text-black">GITHUB ↗</a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen relative z-10 flex flex-col justify-between">
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
export default LayoutShell;
