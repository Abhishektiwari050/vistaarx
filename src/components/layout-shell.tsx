"use client";

import { useEffect, useState, useRef } from "react";
import { useScrollStore, ThemeType } from "@/lib/stores/scroll-store";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// Custom Symmetrical Trailing Cursor
// ─────────────────────────────────────────────────────────────────────────────
function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useScrollStore((s) => s.theme);
  const prefersReducedMotion = useScrollStore((s) => s.prefersReducedMotion);

  const targetX = useRef(0);
  const targetY = useRef(0);
  const curPointerX = useRef(0);
  const curPointerY = useRef(0);
  const curRingX = useRef(0);
  const curRingY = useRef(0);
  const lastTargetX = useRef(0);
  const lastTargetY = useRef(0);

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const NUM_POINTS = 16;
  const points = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Initialize points
    points.current = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      points.current.push({ x: 0, y: 0 });
    }

    const onMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;

      const normX = ((e.clientX / window.innerWidth) * 2 - 1);
      const normY = (-((e.clientY / window.innerHeight) * 2 - 1));
      setCoords({ x: normX, y: normY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.closest("a") || target.closest("button") || target.closest(".interactive") || target.closest("[role='button']"))) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    // Handle Canvas Resize
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();

    let animId: number;
    const tick = () => {
      // Smoothly interpolate lead pointer position
      curPointerX.current += (targetX.current - curPointerX.current) * 0.35;
      curPointerY.current += (targetY.current - curPointerY.current) * 0.35;

      // Smoothly interpolate coordinate badge tracker
      const dx = targetX.current - curRingX.current;
      const dy = targetY.current - curRingY.current;
      curRingX.current += dx * 0.1;
      curRingY.current += dy * 0.1;

      // Calculate velocity
      const vdx = targetX.current - lastTargetX.current;
      const vdy = targetY.current - lastTargetY.current;
      const velocity = Math.sqrt(vdx * vdx + vdy * vdy);
      
      // Save last target
      lastTargetX.current = targetX.current;
      lastTargetY.current = targetY.current;

      // Update trail points
      if (points.current.length === NUM_POINTS) {
        points.current[0].x = curPointerX.current;
        points.current[0].y = curPointerY.current;

        for (let i = 1; i < NUM_POINTS; i++) {
          const p = points.current[i];
          const prev = points.current[i - 1];
          // Spring effect that gets looser towards the tail
          const spring = 0.5 - (i / NUM_POINTS) * 0.25;
          p.x += (prev.x - p.x) * spring;
          p.y += (prev.y - p.y) * spring;
        }
      }

      // Draw the trailing ribbon
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          let strokeColor = "#ff0080"; // Pop Pink default
          let glowColor = "rgba(255, 0, 128, 0.4)";
          
          if (theme === "solar") {
            strokeColor = "#ffcc00"; // solar gold
            glowColor = "rgba(255, 204, 0, 0.4)";
          } else if (theme === "mono") {
            strokeColor = "#000000";
            glowColor = "rgba(0, 0, 0, 0.2)";
          }

          if (isHovered) {
            strokeColor = "#00f0ff"; // Electric cyan on hover
            glowColor = "rgba(0, 240, 255, 0.6)";
          }

          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          // Draw neon ribbon tail
          ctx.shadowBlur = isHovered ? 18 : 8;
          ctx.shadowColor = glowColor;

          for (let i = 0; i < NUM_POINTS - 1; i++) {
            const p1 = points.current[i];
            const p2 = points.current[i + 1];

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            // Ribbon width grows with speed/velocity, and tapers towards tail
            const widthRatio = (NUM_POINTS - i) / NUM_POINTS;
            const velocityStretch = Math.min(velocity * 0.05, 4);
            const baseWidth = isHovered ? 14 : 7;
            
            ctx.lineWidth = (baseWidth + velocityStretch) * widthRatio;
            ctx.strokeStyle = strokeColor;
            ctx.stroke();
          }

          ctx.shadowBlur = 0; // reset
        }
      }

      // Update DOM components
      const ringScale = isHovered ? 1.5 : 1.0 + Math.min(velocity * 0.015, 0.5);
      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.transform = `translate3d(${curPointerX.current - 4}px, ${curPointerY.current - 4}px, 0)`;
        ringRef.current.style.transform = `translate3d(${curRingX.current - 16}px, ${curRingY.current - 16}px, 0) scale(${ringScale})`;
      }

      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, [isHovered, prefersReducedMotion, theme]);

  if (prefersReducedMotion) return null;

  // Render cursor dot & floating badge coordinate panel
  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] hidden md:block"
      />
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 rounded-full z-[9999] pointer-events-none transition-colors duration-200 hidden md:block ${
          isHovered
            ? "bg-[#00f0ff] scale-125"
            : theme === "cyber-light"
            ? "bg-[#ff0080]"
            : theme === "solar"
            ? "bg-[#ffcc00]"
            : "bg-black"
        }`}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border-2 z-[9999] pointer-events-none transition-all duration-300 ease-out hidden md:flex items-center justify-center bg-transparent ${
          isHovered
            ? "border-[#00f0ff]"
            : theme === "cyber-light"
            ? "border-[#ff0080]"
            : theme === "solar"
            ? "border-[#ffcc00]"
            : "border-black"
        }`}
      >
        <span
          className={`absolute top-9 left-9 font-comic text-[8px] font-black uppercase border-2 px-1.5 py-0.5 rounded tracking-tighter whitespace-nowrap opacity-85 transition-colors bg-white shadow-[2px_2px_0px_#000] ${
            isHovered
              ? "text-[#00f0ff] border-[#00f0ff]"
              : theme === "cyber-light"
              ? "text-[#ff0080] border-[#ff0080]"
              : theme === "solar"
              ? "text-[#ffcc00] border-[#ffcc00]"
              : "text-black border-black"
          }`}
        >
          X: {coords.x >= 0 ? `+${coords.x.toFixed(2)}` : coords.x.toFixed(2)} Y: {coords.y >= 0 ? `+${coords.y.toFixed(2)}` : coords.y.toFixed(2)}
        </span>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Integrated Theme Switcher (Polished Desktop Layout - Capsule Pill)
// ─────────────────────────────────────────────────────────────────────────────
interface ThemeSwitcherProps {
  isMobile?: boolean;
  onThemeSelect?: () => void;
}

function ThemeSwitcher({ isMobile = false, onThemeSelect }: ThemeSwitcherProps) {
  const theme = useScrollStore((s) => s.theme);
  const setTheme = useScrollStore((s) => s.setTheme);

  const themes = [
    { id: "cyber-light", label: "POP PINK", activeClasses: "bg-[#ff0080] text-white border-black shadow-[2px_2px_0px_#000] font-black", inactiveClasses: "bg-transparent text-black border-transparent hover:text-black" },
    { id: "solar", label: "GOLD", activeClasses: "bg-[#ffcc00] text-black border-black shadow-[2px_2px_0px_#000] font-black", inactiveClasses: "bg-transparent text-black border-transparent hover:text-black" },
    { id: "mono", label: "MONOCHROME", activeClasses: "bg-black text-white border-black shadow-[2px_2px_0px_#000] font-black", inactiveClasses: "bg-transparent text-black border-transparent hover:text-black" },
  ];

  const handleSelect = (themeId: ThemeType) => {
    setTheme(themeId);
    if (onThemeSelect) onThemeSelect();
  };

  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-2.5 w-full mt-2 select-none">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => handleSelect(t.id as ThemeType)}
            className={`py-3.5 border-2 text-[10px] font-bangers tracking-wider uppercase transition-all duration-100 cursor-pointer rounded-lg active:translate-y-0.5 ${
              theme === t.id
                ? t.activeClasses
                : 'bg-white border-black text-black hover:border-black'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex p-0.5 gap-1 font-bangers text-xs tracking-wider uppercase rounded-lg select-none border-[3px] border-black shadow-[3px_3px_0px_#000] bg-white">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => handleSelect(t.id as ThemeType)}
          className={`px-3 py-1 border-2 rounded-md transition-all duration-200 cursor-pointer text-[10px] interactive ${
            theme === t.id ? t.activeClasses : t.inactiveClasses
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

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
    <footer className="bg-white border-t-[4px] border-black py-14 px-6 md:px-12 select-none relative z-30 font-sans text-black">
      <div className="absolute inset-0 halftone-dots-fine opacity-[0.03] pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start relative z-10">
        
        {/* Col 1: Brand & Socials (5 Columns) */}
        <div className="md:col-span-5 space-y-4">
          <Link href="/" className="font-bangers text-3xl tracking-widest flex items-center gap-2 uppercase" style={{ WebkitTextStroke: "1px #000" }}>
            <span className="w-3 h-3 bg-[#ccff00] border-2 border-black animate-pulse rounded-full" />
            <span>Vistar Studio</span>
          </Link>
          <p className="text-sm max-w-xs text-black font-comic font-bold leading-relaxed">
            Elite digital engineering & creative WebGL design laboratory. We construct high-performance visual frameworks.
          </p>
          <div className="flex gap-4 font-bangers text-lg uppercase tracking-wider pt-2">
            <a href="https://linkedin.com/in/abhishektiwari050" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff0080] transition-colors interactive">LINKEDIN</a>
            <a href="https://github.com/Abhishektiwari050/vistaarx" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff0080] transition-colors interactive">GITHUB</a>
          </div>
        </div>

        {/* Col 2: Sitemap Navigation (4 Columns) */}
        <div className="md:col-span-4 space-y-4">
          <span className="font-bangers text-xl uppercase tracking-wider block border-b-2 border-black pb-1">SITEMAP_INDEX</span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-bangers text-base uppercase tracking-wider">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="hover:text-[#ff0080] text-black transition-colors interactive"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3: Business Qualifiers (3 Columns) */}
        <div className="md:col-span-3 space-y-4 font-comic font-bold text-sm leading-relaxed">
          <span className="font-bangers text-xl uppercase tracking-wider block border-b-2 border-black pb-1">STUDIO STANDARDS</span>
          <div className="space-y-1.5 text-black">
            <p>Engagement: <span className="font-black bg-[#ccff00] px-1 border-2 border-black shadow-[1px_1px_0px_#000]">From $15k</span></p>
            <p>Availability: <span className="font-black bg-[#ff0080] text-white px-1 border-2 border-black shadow-[1px_1px_0px_#000]">Limited Slots</span></p>
            <p>SLA: <span className="font-black">24Hr Direct</span></p>
          </div>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t-2 border-dashed border-black mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm font-bangers tracking-widest text-black gap-4 relative z-10">
        <p>© {year} VISTAR STUDIO. ALL OPERATIONS ONLINE.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#ff0080] interactive">PRIVACY_POLICY</a>
          <span>/</span>
          <a href="#" className="hover:text-[#ff0080] interactive">TERMS_OF_SERVICE</a>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sleek Minimalist Theme Cycle Button (For Premium Capsule Nav)
// ─────────────────────────────────────────────────────────────────────────────
function ThemeCycleButton() {
  const theme = useScrollStore((s) => s.theme);
  const setTheme = useScrollStore((s) => s.setTheme);

  const cycleTheme = () => {
    const order: ThemeType[] = ["cyber-light", "solar", "mono"];
    const currentIndex = order.indexOf(theme);
    const nextIndex = (currentIndex + 1) % order.length;
    setTheme(order[nextIndex]);
  };

  const currentThemeInfo = {
    "cyber-light": { emoji: "⚡" },
    "solar": { emoji: "☀️" },
    "mono": { emoji: "⚫" },
    "cyber-dark": { emoji: "⚡" },
  }[theme] || { emoji: "⚡" };

  return (
    <button
      onClick={cycleTheme}
      aria-label={`Cycle theme, current: ${theme}`}
      className="w-9 h-9 rounded-full border-[2.5px] border-black flex items-center justify-center cursor-pointer interactive shadow-[2px_2px_0px_#000] active:translate-y-[1px] active:shadow-none hover:bg-neutral-100 transition-all bg-white"
    >
      <span className="text-base select-none">{currentThemeInfo.emoji}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Master Layout Shell Wrapper
// ─────────────────────────────────────────────────────────────────────────────
export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollProgress = useScrollStore((s) => s.scrollProgress);
  const theme = useScrollStore((s) => s.theme);

  // Read persisted theme from localStorage Safely on client mount
  useEffect(() => {
    Promise.resolve().then(() => {
      setMounted(true);
      if (typeof window !== "undefined") {
        const storedTheme = localStorage.getItem("vistar-theme") as ThemeType;
        if (storedTheme) {
          useScrollStore.getState().setTheme(storedTheme);
        }
      }
    });
  }, []);

  // Auto-hiding header scroll listener
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 120;
      const dy = scrollY - lastScrollY.current;
      
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
    if (inHorizontalSweep) {
      setHeaderVisible(false);
    } else {
      setHeaderVisible(true);
    }
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
    
    let activeTextColor = "text-[#ff0080]";
    let activeBorderColor = "border-[#ff0080]";
    let hoverTextColor = "hover:text-[#ff0080]";
    let hoverBorderColor = "hover:border-[#ff0080]";

    if (theme === "solar") {
      activeTextColor = "text-[#ff5500]";
      activeBorderColor = "border-[#ff5500]";
      hoverTextColor = "hover:text-[#ff5500]";
      hoverBorderColor = "hover:border-[#ff5500]";
    } else if (theme === "mono") {
      activeTextColor = "text-black";
      activeBorderColor = "border-black";
      hoverTextColor = "hover:text-black";
      hoverBorderColor = "hover:border-black";
    }

    return `transition-all py-1.5 interactive whitespace-nowrap border-b-[3px] font-bangers tracking-wider uppercase text-sm sm:text-base md:text-lg ${
      isActive 
        ? `${activeTextColor} ${activeBorderColor}` 
        : `text-black border-transparent ${hoverTextColor} ${hoverBorderColor}`
    }`;
  };

  const getDrawerBg = () => {
    if (theme === "solar") return "bg-[#fcf6e8]";
    if (theme === "cyber-light") return "bg-[#fdfbf7]";
    return "bg-white"; // mono
  };

  if (!mounted) return <>{children}</>;

  return (
    <div className="w-full min-h-screen bg-transparent text-black transition-colors duration-500 ease-in-out selection:bg-[#ff0080] selection:text-white">

      <div className="transition-opacity duration-1000 ease-in-out opacity-100 pointer-events-auto">
        <CustomCursor />
        
        {/* Skip-to-content accessibility link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#ff0080] focus:text-white focus:px-4 focus:py-2 font-bangers text-xl uppercase border-[3px] border-black shadow-[4px_4px_0px_#000]"
        >
          Skip to content
        </a>

        {/* Navigation Header Bar - Premium Centered Capsule Skew Layout */}
        <header 
          className="fixed top-4 left-1/2 z-45 flex justify-between items-center gap-6 px-6 py-2 select-none rounded-full bg-[#fdfbf7]/90 backdrop-blur-md border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-400 ease-out w-auto max-w-[95vw]"
          style={{
            transform: headerVisible 
              ? "translate3d(-50%, 0, 0)" 
              : "translate3d(-50%, -150%, 0)"
          }}
        >
          <Link href="/" id="nav-brand-logo" className="font-bangers text-xl md:text-2xl tracking-wider text-black flex items-center gap-2 interactive uppercase" style={{ WebkitTextStroke: "1px #000" }}>
            <span className="w-3.5 h-3.5 bg-[#ccff00] border-2 border-black rounded-full shrink-0 animate-pulse shadow-[1.5px_1.5px_0px_#000]" />
            <span>Vistar Studio</span>
          </Link>
          
          {/* Integrated Desktop Nav + Theme Switcher */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-5">
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
            <div className="h-6 w-[2px] bg-black/25" />
            <ThemeCycleButton />
          </div>
          
          {/* Mobile hamburger menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-menu-toggle"
            aria-label="Toggle Navigation Drawer"
            className="md:hidden p-2 border-[2.5px] border-black bg-[#ccff00] text-black shadow-[3px_3px_0px_#000] cursor-pointer interactive active:translate-y-1 active:shadow-none transition-all duration-100 flex items-center justify-center rounded-full"
          >
            <div className="flex flex-col gap-0.5 items-center justify-center w-5 h-4 select-none pointer-events-none text-current">
              <span className={`w-5 h-[2.5px] bg-black transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-5 h-[2.5px] bg-black transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`w-5 h-[2.5px] bg-black transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </header>

        {/* Fullscreen Mobile Navigation Menu Drawer Overlay */}
        <div 
          className={`fixed inset-0 z-40 flex flex-col justify-center px-8 md:hidden transition-all duration-500 border-b-[4px] border-black ${getDrawerBg()}`}
          style={{
            opacity: mobileMenuOpen ? 1 : 0,
            transform: `translate3d(0, ${mobileMenuOpen ? 0 : -100}%, 0)`,
            pointerEvents: mobileMenuOpen ? "auto" : "none",
          }}
        >
          <div className="absolute inset-0 halftone-dots-fine opacity-5 pointer-events-none z-0" />
          <nav className="flex flex-col gap-6 font-bangers text-3xl uppercase tracking-widest relative z-50 text-black">
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
                className={`transition-all interactive border-b-4 pb-2 inline-block ${
                  pathname === link.href 
                    ? "text-[#ff0080] border-[#ff0080]"
                    : "text-black border-black hover:border-[#ff0080] hover:text-[#ff0080]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="my-8 border-t-4 border-black" />
          
          {/* Mobile Socials */}
          <div className="flex gap-4 font-bangers text-xl uppercase tracking-widest justify-center text-black relative z-50">
            <a href="https://linkedin.com/in/abhishektiwari050" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff0080] transition-colors interactive">LINKEDIN</a>
            <a href="https://github.com/Abhishektiwari050/vistaarx" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff0080] transition-colors interactive">GITHUB</a>
          </div>

          <div className="my-8 border-t-4 border-black" />
          
          {/* Beautiful brutalist integrated mobile Theme Switcher */}
          <div className="flex flex-col gap-2.5 relative z-50">
            <span className="font-bangers text-lg uppercase tracking-widest text-black">SELECT OPERATOR THEME</span>
            <ThemeSwitcher isMobile onThemeSelect={() => setMobileMenuOpen(false)} />
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
