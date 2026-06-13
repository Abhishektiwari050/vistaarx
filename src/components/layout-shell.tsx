"use client";

import { useEffect, useState, useRef } from "react";
import { useScrollStore, ScrollStore } from "@/lib/stores/scroll-store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAudioFeedback } from "@/lib/hooks/use-audio-feedback";
import { CustomCursor } from "@/components/custom-cursor";

// ─────────────────────────────────────────────────────────────────────────────
// Unified Premium Footer Component
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { href: "/", label: "Showcase" },
    { href: "/work", label: "Case Studies" },
    { href: "/vectors", label: "Technology" },
    { href: "/philosophy", label: "About Us" },
    { href: "/contact", label: "Contact HQ" },
  ];

  return (
    <footer className="bg-[#faf9f5] border-t border-zinc-200 py-16 px-6 md:px-12 select-none relative z-30 font-sans text-zinc-800">
      <div className="absolute inset-0 halftone-dots-fine opacity-[0.015] pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Col 1: Brand & Socials (5 Columns) */}
        <div className="md:col-span-5 space-y-5">
          <Link href="/" className="font-display text-2xl font-bold tracking-wider flex items-center gap-2 uppercase text-black">
            <span className="w-2 h-2 bg-[#ff1e90] rounded-full shrink-0" />
            <span>Vistar Studio</span>
          </Link>
          <p className="text-sm max-w-xs text-zinc-500 font-sans leading-relaxed">
            Elite digital engineering & creative web systems studio. We construct high-performance visual frameworks.
          </p>
          <div className="flex gap-5 font-display text-xs font-semibold tracking-widest uppercase pt-2">
            <a href="https://linkedin.com/in/abhishektiwari050" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#ff1e90] transition-colors interactive">LINKEDIN</a>
            <a href="https://github.com/Abhishektiwari050/vistaarx" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#ff1e90] transition-colors interactive">GITHUB</a>
          </div>
        </div>

        {/* Col 2: Sitemap Navigation (4 Columns) */}
        <div className="md:col-span-4 space-y-4">
          <span className="font-display text-xs font-bold tracking-widest uppercase text-zinc-400 block border-b border-zinc-100 pb-2">SITEMAP_INDEX</span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-display text-xs font-semibold tracking-widest uppercase">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-zinc-700 hover:text-[#ff1e90] transition-colors interactive"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3: Business Qualifiers (3 Columns) */}
        <div className="md:col-span-3 space-y-4 font-sans text-sm">
          <span className="font-display text-xs font-bold tracking-widest uppercase text-zinc-400 block border-b border-zinc-100 pb-2">STUDIO STANDARDS</span>
          <div className="space-y-2 text-zinc-700">
            <p>Engagement: <span className="font-semibold bg-[#faf9f5] px-1.5 py-0.5 border border-zinc-200 rounded text-xs text-black">From $15k</span></p>
            <p>Availability: <span className="font-semibold bg-[#d8ff42]/15 text-black px-1.5 py-0.5 border border-black/10 rounded text-xs">Limited Slots</span></p>
            <p>SLA: <span className="font-semibold text-black">24Hr Direct</span></p>
          </div>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-dashed border-zinc-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-display tracking-widest text-zinc-400 gap-4 relative z-10">
        <p>© {year} VISTAR STUDIO. ALL OPERATIONS ONLINE.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#ff1e90] transition-colors interactive">PRIVACY_POLICY</a>
          <span>/</span>
          <a href="#" className="hover:text-[#ff1e90] transition-colors interactive">TERMS_OF_SERVICE</a>
        </div>
      </div>
    </footer>
  );
}



// ─────────────────────────────────────────────────────────────────────────────
// Master Layout Shell Wrapper
// ─────────────────────────────────────────────────────────────────────────────
export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Enable global Awwwards-grade tactile audio feedback
  useAudioFeedback();
  const pathname = usePathname();
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollProgress = useScrollStore((s: ScrollStore) => s.scrollProgress);

  // Reset scroll progress in store on route/pathname change
  useEffect(() => {
    useScrollStore.getState().setScrollProgress(0);
    useScrollStore.getState().setScrollY(0);
  }, [pathname]);

  // Set mounted on client mount
  useEffect(() => {
    Promise.resolve().then(() => {
      setMounted(true);
    });
  }, []);

  // Auto-hiding header scroll listener and store updates
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 120;
      const dy = scrollY - lastScrollY.current;

      // Update global scroll store
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? scrollY / totalScroll : 0;
      useScrollStore.getState().setScrollProgress(progress);
      useScrollStore.getState().setScrollY(scrollY);
      
      const isHomepage = window.location.pathname === "/";
      const scrollProgressVal = useScrollStore.getState().scrollProgress;
      const inHorizontalSweep = isHomepage && scrollProgressVal > 0.04 && scrollProgressVal < 0.83;

      if (inHorizontalSweep) {
        setHeaderVisible(false);
      } else {
        if (scrollY < threshold) {
          setHeaderVisible(true);
        } else if (dy > 8) {
          setHeaderVisible(false);
        } else if (dy < -8) {
          setHeaderVisible(true);
        }
      }
      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  // Handle immediate transitions at boundaries
  const isHomepage = pathname === "/";
  const inHorizontalSweep = isHomepage && scrollProgress > 0.04 && scrollProgress < 0.83;

  useEffect(() => {
    const show = !inHorizontalSweep;
    const animationFrameId = requestAnimationFrame(() => {
      setHeaderVisible(show);
    });
    return () => cancelAnimationFrame(animationFrameId);
  }, [inHorizontalSweep]);

  const navLinks = [
    { href: "/", label: "Showcase" },
    { href: "/work", label: "Case Studies" },
    { href: "/vectors", label: "Technology" },
    { href: "/philosophy", label: "About Us" },
    { href: "/contact", label: "Contact HQ" },
  ];

  const getLinkStyles = (href: string) => {
    const isActive = pathname === href;
    return `transition-all py-1 interactive whitespace-nowrap border-b-2 font-display font-medium tracking-widest uppercase text-[10px] ${
      isActive 
        ? "text-[#ff1e90] border-[#ff1e90]" 
        : "text-zinc-500 border-transparent hover:text-black hover:border-black/20"
    }`;
  };

  const getDrawerBg = () => {
    return "bg-[#faf9f5]";
  };

  if (!mounted) return <>{children}</>;

  return (
    <div className="w-full min-h-screen bg-transparent text-black transition-colors duration-500 ease-in-out selection:bg-[#ff0080] selection:text-white">
      <CustomCursor />
      <div className="transition-opacity duration-1000 ease-in-out opacity-100 pointer-events-auto">
        
        {/* Skip-to-content accessibility link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#ff0080] focus:text-white focus:px-4 focus:py-2 font-bangers text-xl uppercase border-[3px] border-black shadow-[4px_4px_0px_#000]"
        >
          Skip to content
        </a>

        {/* Navigation Header Bar - Premium Centered Capsule Layout */}
        <header 
          className={`fixed top-4 left-1/2 z-45 flex justify-between items-center gap-6 px-6 py-2 select-none rounded bg-[#faf9f5]/90 backdrop-blur-md border border-zinc-200 shadow-[3px_3px_0px_rgba(12,12,14,0.08)] transition-all duration-400 ease-out w-auto max-w-[95vw] -translate-x-1/2 ${
            headerVisible ? "translate-y-0" : "-translate-y-[180%]"
          }`}
        >
          <Link href="/" id="nav-brand-logo" className="font-display text-base font-bold tracking-widest text-black flex items-center gap-2 interactive uppercase">
            <span className="w-2 h-2 bg-[#ff1e90] rounded-full shrink-0" />
            <span>Vistar Studio</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={getLinkStyles(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile hamburger menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-menu-toggle"
            aria-label="Toggle Navigation Drawer"
            className="md:hidden p-2 border border-zinc-300 bg-[#faf9f5] text-black shadow-[2px_2px_0px_rgba(0,0,0,0.08)] cursor-pointer interactive active:translate-y-0.5 active:shadow-none transition-all duration-100 flex items-center justify-center rounded"
          >
            <div className="flex flex-col gap-0.5 items-center justify-center w-4 h-3 select-none pointer-events-none text-current">
              <span className={`w-4 h-[1.5px] bg-black transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`w-4 h-[1.5px] bg-black transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`w-4 h-[1.5px] bg-black transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </header>

        {/* Fullscreen Mobile Navigation Menu Drawer Overlay */}
        <div 
          className={`fixed inset-0 z-40 flex flex-col justify-center px-8 md:hidden transition-all duration-500 border-b border-zinc-200 ${getDrawerBg()} ${
            mobileMenuOpen 
              ? "opacity-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 halftone-dots-fine opacity-5 pointer-events-none z-0" />
          <nav className="flex flex-col gap-6 font-display text-2xl uppercase tracking-widest relative z-50 text-black">
            {navLinks.map((link, idx) => (
              <Link 
                key={link.href} 
                href={link.href} 
                id={`mobile-nav-link-${idx}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  transform: `translate3d(${mobileMenuOpen ? 0 : -30}px, 0, 0)`,
                  transition: `transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.06}s`
                }}
                className={`transition-all interactive border-b pb-2 inline-block ${
                  pathname === link.href 
                    ? "text-[#ff1e90] border-[#ff1e90]"
                    : "text-zinc-500 border-zinc-100 hover:border-[#ff1e90] hover:text-[#ff1e90]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="my-6 border-t border-zinc-100" />
          
          {/* Mobile Socials */}
          <div className="flex gap-5 font-display text-xs font-semibold tracking-widest uppercase justify-center text-zinc-500 relative z-50">
            <a href="https://linkedin.com/in/abhishektiwari050" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff1e90] transition-colors interactive">LINKEDIN</a>
            <a href="https://github.com/Abhishektiwari050/vistaarx" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff1e90] transition-colors interactive">GITHUB</a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 min-h-screen relative z-10 flex flex-col justify-between">
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
export default LayoutShell;
