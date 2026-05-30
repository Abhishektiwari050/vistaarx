"use client";

import { useEffect, useState, useRef } from "react";
import { useScrollStore, ThemeType } from "@/lib/stores/scroll-store";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// Symmetrical Terminal Boot Preloader (0.0s - 1.4s)
// ─────────────────────────────────────────────────────────────────────────────
// Terminal compilation logs sequence (declared globally to prevent React dependency warning)
const compilationLogs = [
  "[INIT] Engaged Vistar Studio Core Module...",
  "[GLSL] Compiling vertex shader pipelines...",
  "[GLSL] Linked organic watercolor shader material (OK)",
  "[STORES] Active Zustand dynamic dispatch at 144Hz",
  "[GEOM] Binding symmetrical 3D vector arrowheads...",
  "[HUD] System live feeds mapping to active state...",
  "[SYS] Symmetrical compile target active. Zero-latency active."
];

function TerminalPreloader() {
  const isLoaded = useScrollStore((s) => s.isLoaded);
  const theme = useScrollStore((s) => s.theme);
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      Promise.resolve().then(() => {
        setProgress(100);
      });
      const timer = setTimeout(() => setMounted(false), 800); // unmount after fade-out
      return () => clearTimeout(timer);
    }

    const start = Date.now();
    const duration = 1200; // 1.2 seconds booting

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      const lineCount = Math.min(
        compilationLogs.length,
        Math.floor((pct / 100) * (compilationLogs.length + 1))
      );
      setLines(compilationLogs.slice(0, lineCount));

      if (pct >= 100) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isLoaded]);

  if (!mounted) return null;

  let bgClass = "bg-[#050507] text-[#ff0080]";
  let borderClass = "border-[#ff0080]";
  
  if (theme === "cyber-light") {
    bgClass = "bg-[#f5f5f7] text-black";
    borderClass = "border-black";
  } else if (theme === "mono") {
    bgClass = "bg-white text-black";
    borderClass = "border-black";
  } else if (theme === "solar") {
    bgClass = "bg-[#0b0603] text-[#ffcc00]";
    borderClass = "border-[#ff5500]";
  }

  const totalBlocks = 20;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  const barString = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

  return (
    <div
      style={{ transition: "opacity 0.70s cubic-bezier(0.16, 1, 0.3, 1)" }}
      className={`fixed inset-0 z-[999] flex flex-col justify-center items-center px-6 ${bgClass} ${isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className={`w-full max-w-xl p-8 border-4 ${borderClass} bg-black/10 backdrop-blur-md shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] relative crt-effect font-mono text-xs uppercase leading-relaxed`}>
        <div className="flex justify-between items-center border-b-2 border-current pb-2 mb-4 font-bold select-none">
          <span>VISTAR_SYSTEM_BOOT_v3.0.4</span>
          <span className="animate-pulse">● LIVE_FEED</span>
        </div>

        <div className="space-y-1.5 min-h-[140px] text-left text-[10px] md:text-xs">
          {lines.map((line, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="opacity-40 select-none">►</span>
              <span>{line}</span>
            </div>
          ))}
          {progress < 100 && (
            <div className="flex gap-2 text-current animate-pulse">
              <span className="opacity-40 select-none">►</span>
              <span>COMPILING ENVIRONMENT DATA...</span>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-current/25 space-y-2 select-none">
          <div className="flex justify-between items-center font-bold">
            <span>CORE_SHADERS: {progress}%</span>
            <span>TARGET: LATENCY_ZERO</span>
          </div>
          <div className="w-full border border-current p-1 bg-black/20">
            <div className="text-left font-black tracking-tight select-none overflow-hidden whitespace-nowrap text-current">
              {barString}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Custom Symmetrical Trailing Cursor
// ─────────────────────────────────────────────────────────────────────────────
function CustomCursor() {
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

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;

      // Normalise coordinates to [-1.00, 1.00] range
      const normX = ((e.clientX / window.innerWidth) * 2 - 1);
      const normY = (-((e.clientY / window.innerHeight) * 2 - 1));
      setCoords({ x: normX, y: normY });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    let animId: number;
    const tick = () => {
      curPointerX.current += (targetX.current - curPointerX.current) * 0.3;
      curPointerY.current += (targetY.current - curPointerY.current) * 0.3;

      const dx = targetX.current - curRingX.current;
      const dy = targetY.current - curRingY.current;
      
      curRingX.current += dx * 0.08;
      curRingY.current += dy * 0.08;

      const speed = Math.sqrt(dx * dx + dy * dy);
      const ringScale = isHovered ? 1.6 : 1.0 + Math.min(speed * 0.012, 0.6);
      
      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.transform = `translate3d(${curPointerX.current - 4}px, ${curPointerY.current - 4}px, 0)`;
        ringRef.current.style.transform = `translate3d(${curRingX.current - 16}px, ${curRingY.current - 16}px, 0) scale(${ringScale})`;
      }

      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isHovered, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  let pointerColor = "bg-white";
  let ringBorderColor = "border-white";
  let ringBgColor = "rgba(255, 255, 255, 0.0)";
  let badgeTheme = "bg-black text-[#ccff00] border-black shadow-[2px_2px_0px_#000]";

  if (theme === "cyber-light" || theme === "cyber-dark") {
    pointerColor = isHovered ? "bg-[#ff0080]" : "bg-white";
    ringBorderColor = isHovered ? "border-[#ff0080]" : "border-white/40";
    ringBgColor = isHovered ? "rgba(255, 0, 128, 0.2)" : "rgba(255, 255, 255, 0.02)";
    badgeTheme = "bg-black text-[#ff0080] border-black shadow-[2px_2px_0px_#ff0080]";
  } else if (theme === "mono") {
    pointerColor = isHovered ? "bg-white" : "bg-black";
    ringBorderColor = isHovered ? "border-white" : "border-neutral-500";
    ringBgColor = isHovered ? "rgba(255, 255, 255, 0.15)" : "transparent";
    badgeTheme = "bg-black text-white border-black shadow-[2px_2px_0px_#000]";
  } else if (theme === "solar") {
    pointerColor = isHovered ? "bg-[#ffcc00]" : "bg-white";
    ringBorderColor = isHovered ? "border-[#ffcc00]" : "border-[#ff5500]";
    ringBgColor = isHovered ? "rgba(255, 204, 0, 0.2)" : "rgba(255, 85, 0, 0.05)";
    badgeTheme = "bg-[#100501] text-[#ffcc00] border-[#100501] shadow-[2px_2px_0px_#ff5500]";
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full ${pointerColor} z-[9999] pointer-events-none transition-colors duration-200 hidden md:block mix-blend-difference`}
      />
      <div
        ref={ringRef}
        style={{ backgroundColor: ringBgColor }}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border-2 ${ringBorderColor} z-[9999] pointer-events-none transition-all duration-300 ease-out hidden md:flex items-center justify-center`}
      >
        <span className={`absolute top-9 left-9 font-mono text-[7px] font-black uppercase border px-1.5 py-0.5 rounded tracking-tighter whitespace-nowrap opacity-85 transition-colors ${badgeTheme}`}>
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
    { id: "cyber-light", label: "CYBER LIGHT", activeClasses: "bg-[#ccff00] text-black border-black shadow-[2px_2px_0px_#000] font-black", inactiveClasses: "bg-transparent text-neutral-500 border-transparent hover:text-black" },
    { id: "cyber-dark", label: "CYBER DARK", activeClasses: "bg-[#ff0080] text-white border-[#ff0080] shadow-[2px_2px_0px_#ff0080] font-black", inactiveClasses: "bg-transparent text-neutral-450 border-transparent hover:text-[#ff0080]" },
    { id: "mono", label: "MONOCHROME", activeClasses: "bg-black text-white border-black shadow-[2px_2px_0px_#000] font-black", inactiveClasses: "bg-transparent text-neutral-500 border-transparent hover:text-black" },
    { id: "solar", label: "SOLAR FLARE", activeClasses: "bg-[#ff5500] text-black border-black shadow-[2px_2px_0px_#ff5500] font-black", inactiveClasses: "bg-transparent text-neutral-600 border-transparent hover:text-[#ff5500]" },
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
            className={`py-3.5 border-2 text-[9px] font-mono font-bold uppercase transition-all duration-100 cursor-pointer rounded-lg active:translate-y-0.5 ${
              theme === t.id
                ? (t.id === 'cyber-dark' ? 'bg-[#ff0080] text-white border-[#ff0080] shadow-[2px_2px_0px_#ff0080]' : t.activeClasses)
                : 'bg-white/5 border-black text-neutral-500 hover:border-neutral-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex p-0.5 gap-1 font-mono text-[9px] font-bold uppercase rounded-lg select-none border-[3px] border-black shadow-[3px_3px_0px_#000] ${theme === 'cyber-dark' ? 'bg-black border-[#ff0080] shadow-[3px_3px_0px_#ff0080]' : 'bg-[#fdfbf7]'}`}>
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => handleSelect(t.id as ThemeType)}
          className={`px-3 py-1 border rounded-md transition-all duration-200 cursor-pointer text-[9px] interactive ${
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
  const theme = useScrollStore((s) => s.theme);
  const year = new Date().getFullYear();

  let footerBg = "bg-white border-t border-neutral-150 text-black";
  let textSecondary = "text-neutral-500";
  let borderDashed = "border-neutral-200";

  if (theme === "cyber-dark") {
    footerBg = "bg-[#0a0a0f] border-t-[3px] border-black text-white";
    textSecondary = "text-neutral-300";
    borderDashed = "border-zinc-800";
  } else if (theme === "mono") {
    footerBg = "bg-white border-t-[3px] border-black text-black";
    textSecondary = "text-neutral-700";
    borderDashed = "border-neutral-300";
  } else if (theme === "solar") {
    footerBg = "bg-[#fcf6e8] border-t-[3px] border-[#100501] text-[#100501]";
    textSecondary = "text-[#ff5500]";
    borderDashed = "border-[#100501]/10";
  }

  const links = [
    { href: "/", label: "Showcase" },
    { href: "/work", label: "Case Studies" },
    { href: "/vectors", label: "Technology" },
    { href: "/philosophy", label: "About Us" },
    { href: "/contact", label: "Contact HQ" },
  ];

  return (
    <footer className={`${footerBg} py-14 px-6 md:px-12 select-none relative z-30 font-sans`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Col 1: Brand & Socials (5 Columns) */}
        <div className="md:col-span-5 space-y-4">
          <Link href="/" className="font-mono font-black tracking-widest text-sm flex items-center gap-2 uppercase">
            <span className="w-2.5 h-2.5 bg-[#ff0080] animate-pulse rounded-full" style={{
              backgroundColor: theme === 'cyber-dark' ? '#ccff00' : theme === 'solar' ? '#ff5500' : '#ff0080'
            }} />
            <span>Vistar_Studio</span>
          </Link>
          <p className={`text-xs max-w-xs ${textSecondary} leading-relaxed font-light`}>
            Elite digital engineering & creative WebGL design laboratory. We construct high-performance visual frameworks.
          </p>
          <div className="flex gap-4 font-mono text-[9px] font-bold uppercase tracking-wider pt-2">
            <a href="https://linkedin.com/in/abhishektiwari050" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff0080] transition-colors interactive">LINKEDIN</a>
            <a href="https://github.com/Abhishektiwari050/vistaarx" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff0080] transition-colors interactive">GITHUB</a>
          </div>
        </div>

        {/* Col 2: Sitemap Navigation (4 Columns) */}
        <div className="md:col-span-4 space-y-4">
          <span className="font-mono text-[9px] font-black uppercase text-neutral-400 tracking-wider block border-b pb-1">SITEMAP_INDEX</span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[9px] font-bold uppercase">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`hover:text-[#ff0080] text-neutral-600 transition-colors interactive`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3: Business Qualifiers (3 Columns) */}
        <div className="md:col-span-3 space-y-4 font-mono text-[9px] leading-relaxed">
          <span className="font-mono text-[9px] font-black uppercase text-neutral-400 tracking-wider block border-b pb-1">STUDIO STANDARDS</span>
          <div className={`space-y-1.5 ${textSecondary}`}>
            <p>Engagement: <span className="text-current font-semibold">From $15,000 USD</span></p>
            <p>Availability: <span className="text-current font-semibold">Limited Q3 Slots</span></p>
            <p>SLA: <span className="text-current font-semibold">24-Hour Direct Response</span></p>
          </div>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className={`max-w-7xl mx-auto border-t border-dashed ${borderDashed} mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-[9px] font-mono text-neutral-400 gap-4`}>
        <p>© {year} VISTAR STUDIO. ALL OPERATIONS ONLINE.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline interactive">PRIVACY_POLICY</a>
          <span>/</span>
          <a href="#" className="hover:underline interactive">TERMS_OF_SERVICE</a>
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
  const theme = useScrollStore((s) => s.theme);
  const isLoaded = useScrollStore((s) => s.isLoaded);
  const pathname = usePathname();

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

  // Listen to browser motion accessibility preferences globally
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    useScrollStore.getState().setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      useScrollStore.getState().setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Listen to keyboard shortcut 'T' to cycle themes dynamically with watercolor shower
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleKeyPress = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl && 
        (activeEl.tagName === "INPUT" || 
         activeEl.tagName === "TEXTAREA" || 
         activeEl.tagName === "SELECT" || 
         activeEl.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      if (e.key.toLowerCase() === "t") {
        const themeList: ThemeType[] = ["cyber-light", "cyber-dark", "mono", "solar"];
        const currentTheme = useScrollStore.getState().theme;
        const currentIndex = themeList.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themeList.length;
        const nextTheme = themeList[nextIndex];
        useScrollStore.getState().setTheme(nextTheme);
        
        // Trigger shower to celebrate the cycle!
        useScrollStore.getState().triggerShower();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  let themeSelection = "selection:bg-[#ccff00] selection:text-black";
  let textPrimary = "text-black";
  let textSecondary = "text-neutral-800";
  let highlightText = "text-[#ff0080] font-black";
  let headerBg = "bg-white border-neutral-200 border-b shadow-[0_4px_30px_rgba(0,0,0,0.02)] backdrop-blur-lg";
  let logoDot = "bg-[#ff0080] border-2 border-black";

  if (theme === "cyber-light") {
    themeSelection = "selection:bg-[#ff0080] selection:text-white";
    textPrimary = "text-black";
    textSecondary = "text-neutral-900";
    highlightText = "text-[#ff0080] font-black border-b-[3px] border-[#ff0080]";
    headerBg = "bg-[#fdfbf7] border-b-[3px] border-black shadow-[0_4px_0px_rgba(0,0,0,1)]";
    logoDot = "bg-[#ff0080] border-2 border-black";
  } else if (theme === "cyber-dark") {
    themeSelection = "selection:bg-[#ff0080] selection:text-white";
    textPrimary = "text-white";
    textSecondary = "text-neutral-200";
    highlightText = "text-[#ff0080] font-black border-b-[3px] border-[#ff0080]";
    headerBg = "bg-[#0a0a0f] border-b-[3px] border-[#ff0080] shadow-[0_4px_0px_rgba(255,0,128,1)]";
    logoDot = "bg-[#ff0080] border border-black";
  } else if (theme === "mono") {
    themeSelection = "selection:bg-black selection:text-white";
    textPrimary = "text-black";
    textSecondary = "text-neutral-900";
    highlightText = "text-black font-black border-b-[3px] border-black";
    headerBg = "bg-white border-b-[3px] border-black shadow-[0_4px_0px_rgba(0,0,0,1)]";
    logoDot = "bg-black";
  } else if (theme === "solar") {
    themeSelection = "selection:bg-black selection:text-[#ffcc00]";
    textPrimary = "text-[#100501]";
    textSecondary = "text-[#ff5500]";
    highlightText = "text-[#ff5500] font-black border-b-[3px] border-[#ff5500]";
    headerBg = "bg-[#fcf6e8] border-b-[3px] border-[#100501] shadow-[0_4px_0px_rgba(255,85,0,1)]";
    logoDot = "bg-[#ff5500] border-2 border-black";
  }

  const navLinks = [
    { href: "/", label: "Showcase" },
    { href: "/work", label: "Case Studies" },
    { href: "/vectors", label: "Technology" },
    { href: "/philosophy", label: "About Us" },
    { href: "/contact", label: "Contact HQ" },
  ];

  if (!mounted) return <>{children}</>;

  return (
    <div className={`w-full min-h-screen bg-transparent transition-colors duration-500 ease-in-out ${themeSelection}`}>
      <TerminalPreloader />

      <div 
        className="transition-opacity duration-1000 ease-in-out" 
        style={{ opacity: isLoaded ? 1 : 0, pointerEvents: isLoaded ? "auto" : "none" }}
      >
        <CustomCursor />
        
        {/* Skip-to-content accessibility link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#ff0080] focus:text-white focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:uppercase focus:border-2 focus:border-black"
        >
          Skip to content
        </a>

        {/* Navigation Header Bar */}
        <header className={`fixed top-0 left-0 w-full z-45 flex justify-between items-center px-6 md:px-12 py-4 select-none transition-all duration-300 ${headerBg}`}>
          <Link href="/" id="nav-brand-logo" className={`font-bangers text-lg md:text-2xl tracking-wider ${textPrimary} flex items-center gap-2 interactive uppercase`} style={{ WebkitTextStroke: "1px #000" }}>
            <span className={`w-3 h-3 ${logoDot} rounded-full shrink-0 animate-pulse`} />
            <span>Vistar Studio</span>
          </Link>
          
          {/* Integrated Desktop Nav + Socials & Theme Switcher */}
          <div className="hidden md:flex items-center gap-10">
            <nav className={`flex gap-6 font-bangers text-sm md:text-base font-normal uppercase tracking-wider ${textSecondary}`}>
              {navLinks.map((link, idx) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  id={`nav-link-${idx}`}
                  className={`transition-all py-1 interactive whitespace-nowrap ${pathname === link.href ? highlightText : `hover:${highlightText}`}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="h-5 w-[1px] bg-neutral-200" />
            <div className="flex gap-4 font-bangers text-xs font-normal uppercase tracking-wider text-neutral-400">
              <a href="https://linkedin.com/in/abhishektiwari050" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff0080] transition-colors interactive">LINKEDIN</a>
              <a href="https://github.com/Abhishektiwari050/vistaarx" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff0080] transition-colors interactive">GITHUB</a>
            </div>
            <div className="h-5 w-[1px] bg-neutral-200" />
            <ThemeSwitcher />
          </div>
          
          {/* Symmetrical Animatable Hamburger Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-menu-toggle"
            aria-label="Toggle Navigation Drawer"
            className={`md:hidden p-2.5 border cursor-pointer interactive active:translate-y-0.5 rounded-lg ${
              mobileMenuOpen 
                ? (theme === 'cyber-dark' ? 'bg-[#ff0080] text-white border-transparent shadow-sm' : 'bg-black text-white border-transparent shadow-sm')
                : (theme === 'cyber-dark' ? 'bg-zinc-900/60 text-[#ff0080] border-zinc-800 shadow-sm' : 'bg-white text-black border-neutral-250 shadow-sm')
            } transition-all duration-100 flex items-center justify-center`}
          >
            <div className="flex flex-col gap-1 items-center justify-center w-5 h-4 select-none pointer-events-none text-current">
              <span className={`w-5 h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-5 h-0.5 bg-current transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`w-5 h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </header>

        {/* Fullscreen Mobile Navigation Menu Drawer Overlay */}
        <div 
          className="fixed inset-0 z-40 flex flex-col justify-center px-8 md:hidden transition-all duration-500"
          style={{
            opacity: mobileMenuOpen ? 1 : 0,
            transform: `translate3d(0, ${mobileMenuOpen ? 0 : -100}%, 0)`,
            pointerEvents: mobileMenuOpen ? "auto" : "none",
            backgroundColor: theme === 'cyber-dark' ? 'rgba(5, 5, 7, 0.98)' : theme === 'solar' ? 'rgba(11, 6, 3, 0.98)' : 'rgba(255, 255, 255, 0.98)',
            borderBottom: theme === 'cyber-dark' ? '1px solid #ccff00' : '1px solid black'
          }}
        >
          <nav className="flex flex-col gap-6 font-mono text-base font-black uppercase tracking-widest relative z-50">
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
                className={`transition-all interactive border-b py-2 inline-block ${
                  pathname === link.href 
                    ? highlightText + (theme === 'cyber-dark' ? ' border-[#ccff00]' : ' border-black')
                    : `hover:${highlightText} ${theme === 'cyber-dark' ? 'text-white border-zinc-800 hover:border-white' : 'text-black border-neutral-200 hover:border-black'}`
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="my-6 border-t border-dashed border-neutral-300" />
          
          {/* Mobile Socials */}
          <div className="flex gap-4 font-mono text-[9px] font-bold uppercase tracking-widest justify-center">
            <a href="https://linkedin.com/in/abhishektiwari050" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff0080] transition-colors interactive">LINKEDIN</a>
            <a href="https://github.com/Abhishektiwari050/vistaarx" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff0080] transition-colors interactive">GITHUB</a>
          </div>

          <div className="my-6 border-t-2 border-dashed border-neutral-300" />
          
          {/* Beautiful brutalist integrated mobile Theme Switcher */}
          <div className="flex flex-col gap-2.5 relative z-50">
            <span className="font-mono text-[9px] font-black uppercase tracking-widest text-neutral-400">SELECT OPERATOR THEME</span>
            <ThemeSwitcher isMobile onThemeSelect={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      </div>

      {/* Main Content - Faded in after preloader */}
      <div 
        className="pt-20 min-h-screen transition-opacity duration-1000 ease-in-out delay-300 relative z-10 flex flex-col justify-between"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        
        {/* Unified Premium Footer */}
        <Footer />
      </div>
    </div>
  );
}
export default LayoutShell;
