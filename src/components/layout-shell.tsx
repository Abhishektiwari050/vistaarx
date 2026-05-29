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

    // Fast loading simulation syncing with log prints
    const start = Date.now();
    const duration = 1200; // 1.2 seconds booting

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      // Dynamically display compile log lines based on progress
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

  let bgClass = "bg-[#050507] text-[#ccff00]";
  let borderClass = "border-[#ccff00]";
  
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

  // Generate brutalist bar representation
  const totalBlocks = 20;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  const barString = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

  return (
    <div
      style={{ transition: "opacity 0.70s cubic-bezier(0.16, 1, 0.3, 1)" }}
      className={`fixed inset-0 z-[999] flex flex-col justify-center items-center px-6 ${bgClass} ${isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className={`w-full max-w-xl p-8 border-4 ${borderClass} bg-black/10 dark:bg-black/40 backdrop-blur-md shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] relative crt-effect font-mono text-xs uppercase leading-relaxed`}>
        <div className="flex justify-between items-center border-b-2 border-current pb-2 mb-4 font-bold select-none">
          <span>VISTAR_SYSTEM_BOOT_v3.0.4</span>
          <span className="animate-pulse">● LIVE_FEED</span>
        </div>

        {/* Animated compiling console logs */}
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

        {/* Brutalist Progress Bar */}
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

  useEffect(() => {
    if (prefersReducedMotion) return; // Completely disable custom cursor under motion sensitivity to prevent lag or motion issues

    const onMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    const attachListeners = () => {
      const interactives = document.querySelectorAll(".interactive, a, button, input, select, textarea");
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

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
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [isHovered, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  let pointerColor = "bg-white";
  let ringBorderColor = "border-white";
  let ringBgColor = "rgba(255, 255, 255, 0.0)";

  if (theme === "cyber-light" || theme === "cyber-dark") {
    pointerColor = isHovered ? "bg-[#ff0080]" : "bg-white";
    ringBorderColor = isHovered ? "border-[#ff0080]" : "border-[#ccff00]";
    ringBgColor = isHovered ? "rgba(255, 0, 128, 0.2)" : "rgba(204, 255, 0, 0.05)";
  } else if (theme === "mono") {
    pointerColor = isHovered ? "bg-white" : "bg-black";
    ringBorderColor = isHovered ? "border-white" : "border-neutral-500";
    ringBgColor = isHovered ? "rgba(255, 255, 255, 0.15)" : "transparent";
  } else if (theme === "solar") {
    pointerColor = isHovered ? "bg-[#ffcc00]" : "bg-white";
    ringBorderColor = isHovered ? "border-[#ffcc00]" : "border-[#ff5500]";
    ringBgColor = isHovered ? "rgba(255, 204, 0, 0.2)" : "rgba(255, 85, 0, 0.05)";
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
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border-2 ${ringBorderColor} z-[9999] pointer-events-none transition-all duration-300 ease-out hidden md:block`}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Integrated Theme Switcher (Polished Desktop Layout)
// ─────────────────────────────────────────────────────────────────────────────
interface ThemeSwitcherProps {
  isMobile?: boolean;
  onThemeSelect?: () => void;
}

function ThemeSwitcher({ isMobile = false, onThemeSelect }: ThemeSwitcherProps) {
  const theme = useScrollStore((s) => s.theme);
  const setTheme = useScrollStore((s) => s.setTheme);

  const themes = [
    { id: "cyber-light", label: "Light", activeClasses: "bg-white text-black border-black shadow-[2px_2px_0px_#000]", inactiveClasses: "bg-transparent text-neutral-500 border-transparent hover:border-black/20 hover:text-black" },
    { id: "cyber-dark", label: "Dark", activeClasses: "bg-black text-[#ccff00] border-[#ccff00] shadow-[2px_2px_0px_#ccff00]", inactiveClasses: "bg-transparent text-neutral-400 border-transparent hover:border-[#ccff00]/40 hover:text-white" },
    { id: "mono", label: "Mono", activeClasses: "bg-black text-white border-black shadow-[2px_2px_0px_#000]", inactiveClasses: "bg-transparent text-neutral-500 border-transparent hover:border-black/20 hover:text-black" },
    { id: "solar", label: "Solar", activeClasses: "bg-[#ff5500] text-black border-black shadow-[2px_2px_0px_#000]", inactiveClasses: "bg-transparent text-neutral-500 border-transparent hover:border-[#ff5500]/40 hover:text-[#ff5500]" },
  ];

  const handleSelect = (themeId: ThemeType) => {
    setTheme(themeId);
    if (onThemeSelect) onThemeSelect();
  };

  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-2 w-full mt-2 select-none">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => handleSelect(t.id as ThemeType)}
            className={`py-3.5 border-2 text-xs font-mono font-bold uppercase transition-all duration-100 cursor-pointer active:translate-y-0.5 ${
              theme === t.id
                ? (t.id === 'cyber-dark' ? 'bg-[#ccff00] text-black border-black shadow-[2px_2px_0px_#ff0080]' : t.activeClasses)
                : 'bg-white/5 border-neutral-300 dark:border-zinc-800 text-neutral-600 dark:text-neutral-400 hover:border-black dark:hover:border-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    );
  }

  // Integrated Desktop Header style
  return (
    <div className="flex p-1 gap-1 font-mono text-[10px] font-bold uppercase bg-neutral-100/60 dark:bg-zinc-900/60 border border-neutral-200/50 dark:border-zinc-800/50 rounded-lg select-none">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => handleSelect(t.id as ThemeType)}
          className={`px-3 py-1.5 border rounded-md transition-all duration-100 cursor-pointer text-[10px] interactive ${
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
// HUD Live Telemetry Info Panel (Repositioned to limit developer jargon over-indexing)
// ─────────────────────────────────────────────────────────────────────────────
function TelemetryHUD() {
  const scrollProgress = useScrollStore((s) => s.scrollProgress);
  const theme = useScrollStore((s) => s.theme);
  const pathname = usePathname();
  const [fps, setFps] = useState(60.0);

  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;
    let animationId: number;
    const updateFps = () => {
      const now = performance.now();
      frameCount++;
      if (now > lastTime + 1000) {
        setFps((frameCount * 1000) / (now - lastTime));
        frameCount = 0;
        lastTime = now;
      }
      animationId = requestAnimationFrame(updateFps);
    };
    animationId = requestAnimationFrame(updateFps);
    return () => cancelAnimationFrame(animationId);
  }, []);

  let textColor = "text-neutral-400";
  let accentColor = "text-[#ccff00]";
  let bgClass = "bg-black border border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]";

  if (theme === "cyber-light") {
    textColor = "text-neutral-500";
    accentColor = "text-neutral-900";
    bgClass = "bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
  } else if (theme === "mono") {
    textColor = "text-neutral-500";
    accentColor = "text-black";
    bgClass = "bg-white border-2 border-neutral-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]";
  } else if (theme === "solar") {
    textColor = "text-[#ff8844]";
    accentColor = "text-white";
    bgClass = "bg-[#140b04] border-2 border-[#ff5500] shadow-[4px_4px_0px_0px_#ff5500]";
  }

  const isBottom = scrollProgress > 0.95;

  return (
    <div 
      className={`fixed bottom-6 left-6 z-40 px-4 py-2 rounded-lg ${bgClass} transition-all duration-500 flex items-center gap-4 font-mono text-[9px] uppercase font-bold tracking-widest ${isBottom ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'}`}
    >
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className={`${textColor}`}>VISTAR_LIVE</span>
      </div>
      <div className="w-[1px] h-3 bg-neutral-300 dark:bg-zinc-800" />
      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          <span className={textColor}>ROUTE:</span>
          <span className={`${accentColor}`}>{pathname === "/" ? "SHOWCASE" : pathname.replace("/", "").toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={textColor}>FRAME_FREQ:</span>
          <span className={`${accentColor}`}>{fps.toFixed(0)}HZ</span>
        </div>
      </div>
    </div>
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

  useEffect(() => {
    Promise.resolve().then(() => {
      setMounted(true);
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

  let themeSelection = "selection:bg-[#ccff00] selection:text-black";
  let textPrimary = "text-black";
  let textSecondary = "text-neutral-800";
  let highlightText = "text-[#ff0080] font-black";
  let headerBg = "bg-white border-neutral-200 border-b shadow-[0_4px_30px_rgba(0,0,0,0.02)] backdrop-blur-lg";
  let logoDot = "bg-[#ff0080] border-2 border-black";

  if (theme === "cyber-light") {
    themeSelection = "selection:bg-[#ff0080] selection:text-white";
    textPrimary = "text-black";
    textSecondary = "text-neutral-600";
    highlightText = "text-[#ff0080] font-black border-b-2 border-[#ff0080]";
    headerBg = "bg-white/80 border-b-4 border-black shadow-[0_6px_0px_rgba(0,0,0,1)]";
    logoDot = "bg-[#ff0080] border-2 border-black";
  } else if (theme === "cyber-dark") {
    themeSelection = "selection:bg-[#ff0080] selection:text-white";
    textPrimary = "text-white";
    textSecondary = "text-neutral-400";
    highlightText = "text-[#ccff00] font-black border-b-2 border-[#ccff00]";
    headerBg = "bg-black/95 border-[#ccff00]/20 border-b shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-lg";
    logoDot = "bg-[#ccff00] border border-black";
  } else if (theme === "mono") {
    themeSelection = "selection:bg-black selection:text-white";
    textPrimary = "text-black";
    textSecondary = "text-neutral-500";
    highlightText = "text-black font-black border-b-4 border-black";
    headerBg = "bg-white/95 border-b border-neutral-200 shadow-[0_4px_30px_rgba(0,0,0,0.02)] backdrop-blur-md";
    logoDot = "bg-black";
  } else if (theme === "solar") {
    themeSelection = "selection:bg-black selection:text-[#ffcc00]";
    textPrimary = "text-[#fff5eb]";
    textSecondary = "text-[#ffcc00]";
    highlightText = "text-[#ff5500] font-black border-b-2 border-[#ff5500]";
    headerBg = "bg-[#0c0502]/95 border-[#ff5500]/20 border-b shadow-[0_8px_30px_rgba(255,85,0,0.08)] backdrop-blur-lg";
    logoDot = "bg-[#ff5500] border-2 border-black";
  }

  // Refactored to premium, client-standard navigation labels
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
      {/* Premium Terminal Preloader Overlay */}
      <TerminalPreloader />

      {/* UI Elements - Hidden until loaded */}
      <div 
        className="transition-opacity duration-1000 ease-in-out" 
        style={{ opacity: isLoaded ? 1 : 0, pointerEvents: isLoaded ? "auto" : "none" }}
      >
        <CustomCursor />
        <TelemetryHUD />
        
        {/* Navigation Header Bar */}
        <header className={`fixed top-0 left-0 w-full z-45 flex justify-between items-center px-6 md:px-12 py-4 select-none transition-all duration-300 ${headerBg}`}>
          <Link href="/" id="nav-brand-logo" className={`font-mono font-black tracking-widest text-base ${textPrimary} flex items-center gap-2.5 interactive uppercase`}>
            <span className={`w-3.5 h-3.5 ${logoDot} animate-pulse`} />
            <span>Vistar_Studio</span>
          </Link>
          
          {/* Integrated Desktop Nav + Theme Switcher */}
          <div className="hidden md:flex items-center gap-10">
            <nav className={`flex gap-8 font-mono text-xs font-black uppercase tracking-wider ${textSecondary}`}>
              {navLinks.map((link, idx) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  id={`nav-link-${idx}`}
                  className={`transition-all py-1 interactive ${pathname === link.href ? highlightText : `hover:${highlightText}`}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="h-5 w-[1px] bg-neutral-200 dark:bg-zinc-800" />
            <ThemeSwitcher />
          </div>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-menu-toggle"
            aria-label="Toggle Navigation Drawer"
            className={`md:hidden font-mono font-black text-[10px] px-3.5 py-1.5 border-2 cursor-pointer interactive active:translate-y-0.5 active:-translate-x-0.5 ${
              mobileMenuOpen 
                ? (theme === 'cyber-dark' ? 'bg-[#ff0080] text-white border-white shadow-[2px_2px_0px_#ccff00]' : 'bg-black text-white border-black shadow-[2px_2px_0px_#ccff00]')
                : (theme === 'cyber-dark' ? 'bg-black text-[#ccff00] border-[#ccff00] shadow-[4px_4px_0px_#ff0080]' : 'bg-white text-black border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]')
            } transition-all duration-100`}
          >
            {mobileMenuOpen ? "[ CLOSE ]" : "[ MENU ]"}
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
            borderBottom: theme === 'cyber-dark' ? '6px solid #ccff00' : '6px solid black'
          }}
        >
          <nav className="flex flex-col gap-6 font-mono text-lg font-black uppercase tracking-widest relative z-50">
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
                className={`transition-all interactive border-b-2 py-2 inline-block ${
                  pathname === link.href 
                    ? highlightText + (theme === 'cyber-dark' ? ' border-[#ccff00]' : ' border-black')
                    : `hover:${highlightText} ${theme === 'cyber-dark' ? 'text-white border-zinc-800 hover:border-white' : 'text-black border-neutral-200 hover:border-black'}`
                }`}
              >
                0{idx + 1} {"//"} {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Divider line inside mobile drawer */}
          <div className="my-8 border-t-2 border-dashed border-neutral-300 dark:border-zinc-800" />
          
          {/* Beautiful brutalist integrated mobile Theme Switcher */}
          <div className="flex flex-col gap-2.5 relative z-50">
            <span className="font-mono text-[9px] font-black uppercase tracking-widest text-neutral-400">SELECT OPERATOR THEME</span>
            <ThemeSwitcher isMobile onThemeSelect={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      </div>

      {/* Main Content - Faded in after preloader */}
      <main 
        className="pt-20 min-h-screen transition-opacity duration-1000 ease-in-out delay-300 relative z-10"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        {children}
      </main>
    </div>
  );
}
export default LayoutShell;
