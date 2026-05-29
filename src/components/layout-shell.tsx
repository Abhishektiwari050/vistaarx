"use client";

import { useEffect, useState, useRef } from "react";
import { useScrollStore, ThemeType } from "@/lib/stores/scroll-store";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// Enhanced Trailing Cursor
// ─────────────────────────────────────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useScrollStore((s) => s.theme);

  const targetX = useRef(0);
  const targetY = useRef(0);
  
  const curPointerX = useRef(0);
  const curPointerY = useRef(0);
  
  const curRingX = useRef(0);
  const curRingY = useRef(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    const attachListeners = () => {
      const interactives = document.querySelectorAll(".interactive, a, button");
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
  }, [isHovered]);

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
// Floating Theme Switcher Component
// ─────────────────────────────────────────────────────────────────────────────
function ThemeSwitcher() {
  const theme = useScrollStore((s) => s.theme);
  const setTheme = useScrollStore((s) => s.setTheme);

  const themes = [
    { id: "cyber-light", label: "LIGHT", activeClasses: "bg-white text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]", inactiveClasses: "bg-transparent text-neutral-500 border-transparent hover:border-black hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" },
    { id: "cyber-dark", label: "DARK", activeClasses: "bg-black text-[#ccff00] border-[#ccff00] shadow-[4px_4px_0px_0px_#ccff00]", inactiveClasses: "bg-transparent text-neutral-500 border-transparent hover:border-white hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" },
    { id: "mono", label: "MONO", activeClasses: "bg-white text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]", inactiveClasses: "bg-transparent text-neutral-500 border-transparent hover:border-black hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" },
    { id: "solar", label: "SOLAR", activeClasses: "bg-[#ff5500] text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]", inactiveClasses: "bg-transparent text-neutral-500 border-transparent hover:border-[#ff5500] hover:text-[#ff5500] hover:shadow-[4px_4px_0px_0px_#ff5500]" },
  ];

  return (
    <div className="fixed top-6 right-6 z-50 flex p-2 gap-2 font-mono text-xs font-black uppercase select-none">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id as ThemeType)}
          className={`px-4 py-2 border-2 transition-all duration-150 cursor-pointer interactive ${
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
// Telemetry HUD
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
  let bgClass = "bg-black border-2 border-[#ccff00] shadow-[6px_6px_0px_0px_#ccff00]";

  if (theme === "cyber-light") {
    textColor = "text-neutral-500";
    accentColor = "text-black";
    bgClass = "bg-[#ccff00] border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]";
  } else if (theme === "mono") {
    textColor = "text-neutral-500";
    accentColor = "text-black";
    bgClass = "bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]";
  } else if (theme === "solar") {
    textColor = "text-[#ff8844]";
    accentColor = "text-white";
    bgClass = "bg-[#ff5500] border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]";
  }

  const isBottom = scrollProgress > 0.95;

  return (
    <div 
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-6 py-4 ${bgClass} transition-all duration-500 flex items-center gap-6 font-mono text-xs uppercase font-black tracking-widest ${isBottom ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'}`}
    >
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 border border-black animate-pulse" />
        <span className={`${textColor}`}>SYS.LIVE</span>
      </div>
      <div className="w-1 h-1 bg-current opacity-20" />
      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <span className={textColor}>RT:</span>
          <span className={`${accentColor}`}>{pathname === "/" ? "/PORTAL" : pathname}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={textColor}>FPS:</span>
          <span className={`${accentColor}`}>{fps.toFixed(0)}</span>
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
  const theme = useScrollStore((s) => s.theme);
  const isLoaded = useScrollStore((s) => s.isLoaded);
  const pathname = usePathname();

  useEffect(() => {
    Promise.resolve().then(() => {
      setMounted(true);
    });
  }, []);

  let themeSelection = "selection:bg-[#ccff00] selection:text-black";
  let textPrimary = "text-black";
  let textSecondary = "text-neutral-800";
  let highlightText = "text-[#ff0080] font-black";
  let headerBg = "bg-[#ccff00] border-black border-b-4 shadow-[0_8px_0px_0px_rgba(0,0,0,1)]";
  let logoDot = "bg-[#ff0080] border-2 border-black";

  if (theme === "cyber-dark") {
    themeSelection = "selection:bg-[#ff0080] selection:text-white";
    textPrimary = "text-white";
    textSecondary = "text-neutral-400";
    highlightText = "text-[#ccff00] font-black";
    headerBg = "bg-black border-[#ccff00] border-b-4 shadow-[0_8px_0px_0px_#ccff00]";
    logoDot = "bg-[#ccff00] border-2 border-black";
  } else if (theme === "mono") {
    themeSelection = "selection:bg-black selection:text-white";
    textPrimary = "text-black";
    textSecondary = "text-neutral-500";
    highlightText = "text-black font-black underline decoration-4 decoration-[#ff0080]";
    headerBg = "bg-white border-black border-b-4 shadow-[0_8px_0px_0px_rgba(0,0,0,1)]";
    logoDot = "bg-black";
  } else if (theme === "solar") {
    themeSelection = "selection:bg-black selection:text-[#ffcc00]";
    textPrimary = "text-[#fff5eb]";
    textSecondary = "text-[#ffcc00]";
    highlightText = "text-[#ff5500] font-black";
    headerBg = "bg-[#140b04] border-[#ff5500] border-b-4 shadow-[0_8px_0px_0px_#ff5500]";
    logoDot = "bg-[#ff5500] border-2 border-black";
  }

  const navLinks = [
    { href: "/", label: "Portal" },
    { href: "/philosophy", label: "Philosophy" },
    { href: "/vectors", label: "Vectors Deep-Dive" },
    { href: "/work", label: "Featured Work" },
    { href: "/contact", label: "Connect" },
  ];

  if (!mounted) return <>{children}</>;

  return (
    <div className={`w-full min-h-screen bg-transparent transition-colors duration-500 ease-in-out ${themeSelection}`}>
      
      {/* UI Elements - Hidden until loaded */}
      <div 
        className="transition-opacity duration-1000 ease-in-out" 
        style={{ opacity: isLoaded ? 1 : 0, pointerEvents: isLoaded ? "auto" : "none" }}
      >
        <CustomCursor />
        <ThemeSwitcher />
        <TelemetryHUD />
        
        {/* Navigation Header Bar */}
        <header className={`fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 md:px-12 py-5 select-none transition-all duration-300 ${headerBg}`}>
          <Link href="/" className={`font-mono font-black tracking-widest text-lg ${textPrimary} flex items-center gap-3 interactive uppercase`}>
            <span className={`w-4 h-4 ${logoDot} animate-pulse`} />
            <span>Vistar_Engine</span>
          </Link>
          <nav className={`hidden md:flex gap-8 font-mono text-sm font-bold uppercase tracking-wider ${textSecondary}`}>
            {navLinks.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`transition-all interactive ${pathname === link.href ? highlightText : `hover:${highlightText}`}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
      </div>

      {/* Main Content - Faded in after preloader */}
      <div 
        className="pt-20 min-h-screen transition-opacity duration-1000 ease-in-out delay-300 relative z-10"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}
