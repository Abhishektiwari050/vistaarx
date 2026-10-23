"use client";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import "./page-curtain.css";

type Phase = "idle" | "cover-start" | "covering" | "revealing";

// router.push() adds the app's basePath (next.config) itself, so strip it from the link's path first.
// `route` is the current usePathname(), which never includes the basePath.
function routeOf(url: URL, route: string) {
  const here = location.pathname.replace(/\/$/, "");
  const r = route.replace(/\/$/, "");
  const base = here.endsWith(r) ? here.slice(0, here.length - r.length) : "";
  const path = base && url.pathname.startsWith(base + "/") ? url.pathname.slice(base.length) : url.pathname;
  return path + url.search + url.hash;
}

const ReadyCtx = createContext(true);
/** false while a page is covered — key entrance animations off it. */
export const useTransitionReady = () => useContext(ReadyCtx);

// Two solid sheets moved with translateY: dark in front, red behind. On cover the red leads, on reveal it trails.
const OPEN = "-100%";
const CLOSED = "0%";
const BELOW = "100%";
const ease = [0.76, 0, 0.24, 1] as const;
const LAG = 0.1;

const scrollToHash = (hash: string, smooth: boolean) => {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 24;
  window.scrollTo({ top, behavior: smooth ? "smooth" : "instant" });
};

export function PageCurtain({ children, mark }: { children: ReactNode; mark?: ReactNode }) {
  const reduce = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const pending = useRef<string | null>(null);
  const lastPath = useRef(pathname);

  // Intercept internal navigations (not hash-only changes). Capture phase: runs before Next's <Link> handler.
  useEffect(() => {
    if (reduce) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest("a");
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (a.target === "_blank" || a.hasAttribute("download") || a.hasAttribute("data-no-transition")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) {
        if (url.hash) {
          e.preventDefault();
          history.pushState(null, "", url.hash);
          scrollToHash(url.hash, true);
        }
        return;
      }
      e.preventDefault(); // next/link sees defaultPrevented and stands down; other React handlers still run
      pending.current = routeOf(url, lastPath.current);
      setPhase("cover-start");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduce]);

  // cover-start → covering a tick later, so the jump below the viewport is committed first
  useEffect(() => {
    if (phase !== "cover-start") return;
    const t = window.setTimeout(() => setPhase("covering"), 20);
    return () => window.clearTimeout(t);
  }, [phase]);

  // The new route has rendered underneath → land at the top (or the #hash), then reveal.
  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    if (phase !== "covering") return;
    const hash = pending.current?.includes("#") ? "#" + pending.current.split("#")[1] : "";
    pending.current = null;
    window.scrollTo(0, 0);
    const t = window.setTimeout(() => {
      if (hash) scrollToHash(hash, false);
      setPhase("revealing");
    }, 0);
    return () => window.clearTimeout(t);
  }, [pathname, phase]);

  // The new page keeps settling for a moment (fonts, images, pins shift heights) — re-land on the #hash
  // whenever the document resizes, briefly.
  useEffect(() => {
    if (phase !== "revealing" || !location.hash) return;
    const hash = location.hash;
    scrollToHash(hash, false);
    const ro = new ResizeObserver(() => scrollToHash(hash, false));
    ro.observe(document.documentElement);
    const stop = window.setTimeout(() => ro.disconnect(), 1500);
    return () => {
      ro.disconnect();
      window.clearTimeout(stop);
    };
  }, [phase]);

  // Safety nets: background tabs stall rAF and onAnimationComplete may never fire.
  useEffect(() => {
    if (phase === "covering") {
      const t = window.setTimeout(() => pending.current && router.push(pending.current, { scroll: false }), 900);
      return () => window.clearTimeout(t);
    }
    if (phase === "revealing") {
      const t = window.setTimeout(() => setPhase("idle"), 1500);
      return () => window.clearTimeout(t);
    }
  }, [phase, router]);

  const y = phase === "covering" ? CLOSED : phase === "cover-start" ? BELOW : OPEN;
  const ready = phase === "idle" || phase === "revealing";
  const dur = phase === "covering" ? 0.55 : 0.8;
  const tr = (delay: number) => (phase === "cover-start" ? { duration: 0 } : { duration: dur, ease, delay });

  return (
    <ReadyCtx.Provider value={ready}>
      {children}
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className={`tds-pcurtain tds-pcurtain--back ${ready ? "tds-pcurtain--off" : ""}`}
            initial={{ y: OPEN }}
            animate={{ y }}
            transition={tr(phase === "covering" ? 0 : LAG)}
          />
          <motion.div
            aria-hidden
            className={`tds-pcurtain tds-pcurtain--front ${ready ? "tds-pcurtain--off" : ""}`}
            initial={{ y: OPEN }}
            animate={{ y }}
            transition={tr(phase === "covering" ? LAG : 0)}
            onAnimationComplete={() => {
              if (phase === "covering" && pending.current) router.push(pending.current, { scroll: false });
              if (phase === "revealing") setPhase("idle");
            }}
          >
            <span className="tds-pcurtain__mark">{mark ?? <DefaultMark />}</span>
          </motion.div>
        </>
      )}
    </ReadyCtx.Provider>
  );
}

// Placeholder brand mark — replace via the `mark` prop.
function DefaultMark() {
  return (
    <svg width="56" height="62" viewBox="0 0 54 60" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M27 2 52 16v28L27 58 2 44V16z" />
      <path d="M27 2v28M2 16l25 14 25-14" />
    </svg>
  );
}
