"use client";

import * as React from "react";

export interface TigerTearRevealProps {
  /** The big word that gets torn. */
  word?: string;
  /** Small line above the word. Empty hides it. */
  tagline?: string;
  /** Word colour. */
  ink?: string;
  /** Paper colour, the sheet that tears. */
  paper?: string;
  /** Tagline colour. */
  taglineColor?: string;
  /** Iris colour. */
  eyeColor?: string;
  /** Fur colour. */
  furColor?: string;
  /** Font stack for the word. */
  fontFamily?: string;
  /** Height of the stage container. */
  height?: string;
  /** Reveal mode: "scroll-reveal" (smooth viewport reveal without empty space) or "pinned" */
  mode?: "scroll-reveal" | "pinned";
  /** Extra scroll distance if mode="pinned". */
  scrollDistance?: string;
  /** 0..1. Drive the tear manually instead of from scroll. */
  progress?: number;
  /** Show the scroll hint before the tear starts. */
  hint?: boolean;
  /** Extra root class names. */
  className?: string;
}

export type Pt = [number, number];

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const clamp01 = (x: number) => (x <= 0 ? 0 : x > 1 ? 1 : x);

export function smooth(a: number, b: number, x: number) {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}

export function easeOutBack(t: number) {
  const c = 1.70158;
  const u = clamp01(t) - 1;
  return 1 + (c + 1) * u * u * u + c * u * u;
}

export function stages(p: number) {
  return {
    crack: smooth(0.02, 0.22, p),
    open: smooth(0.15, 0.65, p),
    rise: smooth(0.25, 0.78, p),
    pop: smooth(0.55, 0.90, p),
    shake: smooth(0.12, 0.22, p) * (1 - smooth(0.24, 0.38, p)),
  };
}

export function tearLine(seed = 11, from = -800, to = 1800, step = 9, cx = 500, cy = 318, angle = -7): Pt[] {
  const r = rng(seed);
  const slope = Math.tan((angle * Math.PI) / 180);
  const out: Pt[] = [];
  for (let x = from; x <= to; x += step) {
    const fibre = (r() - 0.5) * 5;
    const tooth = r() < 0.09 ? (r() - 0.5) * 26 : 0;
    const wander = Math.sin(x * 0.019 + seed) * 10 + Math.sin(x * 0.053 + seed * 2) * 4;
    out.push([x, cy + (x - cx) * slope + wander + fibre + tooth]);
  }
  return out;
}

export function pieceMotion(open: number) {
  return {
    top: { dx: -10 * open, dy: -82 * open, rot: -2.6 * open },
    bottom: { dx: 12 * open, dy: 78 * open, rot: 2.1 * open },
  };
}

export function fibreWidths(n: number, open: number, seed = 5) {
  const r = rng(seed);
  const k = Math.min(1, open * 4);
  return Array.from({ length: n }, (_, i) => k * (2.5 + 6 * (0.5 + 0.5 * Math.sin(i * 0.37 + seed)) * (0.6 + r() * 0.8)));
}

const VIEW_W = 1000;
const CX = 500;
const CY = 318;
const FAR = 3200;
const FRAME = "36 44 928 468";
const EYES: Pt[] = [
  [-138, 6],
  [138, -4],
];

const d = (pts: Pt[], close = true) =>
  "M" + pts.map(([x, y]) => x.toFixed(1) + " " + y.toFixed(1)).join("L") + (close ? "Z" : "");

function stripe(p0: Pt, p1: Pt, p2: Pt, w: number, n = 14) {
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const m = 1 - t;
    const x = m * m * p0[0] + 2 * m * t * p1[0] + t * t * p2[0];
    const y = m * m * p0[1] + 2 * m * t * p1[1] + t * t * p2[1];
    const dx = 2 * m * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
    const dy = 2 * m * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
    const l = Math.hypot(dx, dy) || 1;
    const h = (w / 2) * Math.pow(Math.sin(Math.PI * t), 0.6);
    left.push([x - (dy / l) * h, y + (dx / l) * h]);
    right.push([x + (dy / l) * h, y - (dx / l) * h]);
  }
  return d(left.concat(right.reverse()));
}

function buildStripes() {
  const r = rng(29);
  const j = (a: number) => (r() - 0.5) * a;
  const out: string[] = [];
  for (const k of [-2, -1, 0, 1, 2]) {
    out.push(stripe([k * 27 + j(8), -205], [k * 21 + j(6), -140], [k * 11, -72 + Math.abs(k) * 10], 13 - Math.abs(k) * 2));
  }
  for (const s of [-1, 1]) {
    out.push(stripe([s * 50, -108], [s * 138, -140 + j(8)], [s * 228, -96], 13));
    out.push(stripe([s * 72, -158], [s * 150, -188 + j(8)], [s * 250, -150], 11));
    for (const y of [-160, -104, -48, 14, 76, 138]) {
      out.push(stripe([s * 350, y + j(10)], [s * 292, y + j(26)], [s * (222 + r() * 30), y + j(34)], 18 + r() * 8));
    }
    out.push(stripe([s * 212, 38], [s * 256, 72], [s * 330, 98], 14));
    out.push(stripe([s * 182, 74], [s * 226, 120], [s * 312, 156], 12));
    out.push(stripe([s * 64, 22], [s * 50, 88], [s * 42, 178], 8));
    for (let k = 0; k < 12; k++) {
      const x = s * (390 + k * 70 + j(30));
      out.push(stripe([x + j(40), -330], [x + s * 30 + j(40), j(60)], [x + s * 10 + j(40), 330], 20 + r() * 14));
    }
  }
  return out.join("");
}

// Optimized hair density (280 segments instead of 2600 for instant 60fps)
function buildHairs() {
  const r = rng(53);
  const tones = ["", "", ""];
  for (let i = 0; i < 280; i++) {
    const x = (r() - 0.5) * 1900;
    const y = (r() - 0.5) * 480;
    const a = Math.atan2(y - 150, x) + (r() - 0.5) * 0.5;
    const l = 9 + r() * 12;
    const seg = "M" + x.toFixed(1) + " " + y.toFixed(1) + "l" + (Math.cos(a) * l).toFixed(1) + " " + (Math.sin(a) * l).toFixed(1);
    tones[r() < 0.45 ? 0 : r() < 0.7 ? 1 : 2] += seg;
  }
  return tones;
}

function buildFibres() {
  const r = rng(71);
  let s = "";
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * Math.PI * 2 + r() * 0.08;
    const r0 = 12 + r() * 4;
    const r1 = 30 + r() * 5;
    s += "M" + (Math.cos(a) * r0).toFixed(1) + " " + (Math.sin(a) * r0).toFixed(1) + "L" + (Math.cos(a) * r1).toFixed(1) + " " + (Math.sin(a) * r1).toFixed(1);
  }
  return s;
}

const ALMOND = "M-78 10 C-52 -40 30 -56 80 -8 C44 40 -30 50 -78 10Z";

const Fur = React.memo(function Fur({ id, fur }: { id: string; fur: string }) {
  const stripes = React.useMemo(buildStripes, []);
  const hairs = React.useMemo(buildHairs, []);
  return (
    <g>
      <rect x={-2600} y={-420} width={5200} height={840} fill={fur} />
      <rect x={-2600} y={-420} width={5200} height={840} fill={"url(#" + id + "-shade)"} />
      <rect x={-2600} y={-420} width={5200} height={840} fill={"url(#" + id + "-vignette)"} />
      <g filter={"url(#" + id + "-soft)"} fill="#fbf6ec">
        {EYES.map(([x, y], i) => (
          <React.Fragment key={i}>
            <ellipse cx={x} cy={y - 52} rx={78} ry={22} />
            <ellipse cx={x} cy={y + 44} rx={64} ry={15} opacity={0.9} />
          </React.Fragment>
        ))}
        <ellipse cx={0} cy={188} rx={96} ry={52} opacity={0.85} />
      </g>
      {/* High-performance crisp SVG stripes without GPU-choking feDisplacementMap */}
      <g>
        <path d={stripes} fill="#140b05" opacity={0.98} />
      </g>
      <path d={hairs[0]} stroke="#3b1c07" strokeWidth={1.4} opacity={0.35} strokeLinecap="round" />
      <path d={hairs[1]} stroke="#f7c46e" strokeWidth={1.2} opacity={0.35} strokeLinecap="round" />
      <path d={hairs[2]} stroke="#fff6e4" strokeWidth={1} opacity={0.22} strokeLinecap="round" />
    </g>
  );
});

function Eye({
  id,
  x,
  y,
  flip,
  look,
  blink,
  pupil,
  scale,
  fibres,
}: {
  id: string;
  x: number;
  y: number;
  flip: boolean;
  look: Pt;
  blink: number;
  pupil: number;
  scale: number;
  fibres: string;
}) {
  const clip = id + (flip ? "-cl" : "-cr");
  const lx = look[0] * (flip ? -1 : 1);
  return (
    <g transform={"translate(" + x + " " + y + ") scale(" + (flip ? -scale : scale) + " " + scale + ")"}>
      <clipPath id={clip}>
        <path d={ALMOND} />
      </clipPath>
      <path d={ALMOND} fill="#0c0603" stroke="#0c0603" strokeWidth={11} strokeLinejoin="round" />
      <path d="M-80 8 C-86 20 -96 30 -98 44 C-90 34 -80 24 -70 18Z" fill="#0c0603" />
      <g clipPath={"url(#" + clip + ")"}>
        <ellipse cx={0} cy={0} rx={80} ry={52} fill="#3d1a05" />
        <g transform={"translate(" + (lx * 13).toFixed(2) + " " + (4 + look[1] * 7).toFixed(2) + ")"}>
          <circle r={38} fill={"url(#" + id + "-iris)"} />
          <path d={fibres} stroke="#6b2d05" strokeWidth={1} opacity={0.35} />
          <circle r={38} fill="none" stroke="#3a1602" strokeWidth={3} opacity={0.8} />
          <circle r={13 * pupil} fill="#050302" />
          <ellipse cx={-12} cy={-13} rx={7.5} ry={5.5} fill="#fff" opacity={0.92} />
          <circle cx={9} cy={10} r={2.6} fill="#fff" opacity={0.6} />
        </g>
        <ellipse cx={0} cy={-46} rx={90} ry={34} fill={"url(#" + id + "-lid)"} />
        <g transform={"translate(0 " + (-62 + blink * 72).toFixed(2) + ")"}>
          <rect x={-90} y={-80} width={180} height={80} fill="#9c5212" />
          <path d="M-90 0 H90" stroke="#0c0603" strokeWidth={8} />
        </g>
      </g>
    </g>
  );
}

const CURLS: Record<"top" | "bottom", [number, number, number][]> = {
  top: [
    [300, 44, 30],
    [575, 30, 20],
    [790, 52, 34],
  ],
  bottom: [
    [205, 50, 32],
    [470, 34, 22],
    [690, 40, 28],
  ],
};

function Half({
  id,
  side,
  line,
  open,
  children,
}: {
  id: string;
  side: "top" | "bottom";
  line: Pt[];
  open: number;
  children: React.ReactNode;
}) {
  const up = side === "top";
  const m = pieceMotion(open)[side];
  const shape = up
    ? [[line[0][0], -FAR] as Pt, [line[line.length - 1][0], -FAR] as Pt, ...[...line].reverse()]
    : [...line, [line[line.length - 1][0], FAR] as Pt, [line[0][0], FAR] as Pt];
  const widths = fibreWidths(line.length, open, up ? 5 : 8);
  const core = line.concat(line.map(([x, y], i) => [x, y + (up ? -widths[i] : widths[i])] as Pt).reverse());
  const curls = CURLS[side].map(([cx, hw, depth]) => {
    const pts = line.filter(([x]) => Math.abs(x - cx) <= hw);
    const back = pts.map(([x, y]) => {
      const s = Math.cos(((x - cx) / hw) * (Math.PI / 2));
      return [x + (up ? 6 : -6) * s * open, y + (up ? 1 : -1) * depth * s * s * Math.min(1, open * 2.5)] as Pt;
    });
    return d(pts.concat(back.reverse()));
  });
  const transform =
    "translate(" + m.dx.toFixed(2) + " " + m.dy.toFixed(2) + ") rotate(" + m.rot.toFixed(3) + " " + CX + " " + CY + ")";
  const clip = id + "-" + side;
  return (
    <g transform={transform}>
      {open > 0 ? (
        <path
          d={d(line, false)}
          fill="none"
          stroke="#000"
          strokeOpacity={0.45 * Math.min(1, open * 3)}
          strokeWidth={18}
          transform={"translate(0 " + (up ? 10 : -10) + ")"}
          filter={"url(#" + id + "-soft)"}
        />
      ) : null}
      <clipPath id={clip}>
        <path d={d(shape)} />
      </clipPath>
      <g clipPath={"url(#" + clip + ")"}>{children}</g>
      {open > 0 ? (
        <>
          <path d={d(core)} fill="#ffffff" />
          {curls.map((c, i) => (
            <path key={i} d={c} fill={"url(#" + id + "-curl-" + side + ")"} stroke="#fff" strokeWidth={1} />
          ))}
        </>
      ) : null}
    </g>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return reduced;
}

type Frame = { p: number; look: Pt; blink: number; squint: number };

export default function TigerTearReveal({
  word = "COURAGE",
  tagline = "HAVE NO FEAR",
  ink = "#FF3823",
  paper = "#FAFAF9",
  taglineColor = "#2a2a2a",
  eyeColor = "#f0a526",
  furColor = "#d9832c",
  fontFamily = '"Anton", Impact, "Bebas Neue", "Oswald", "Arial Narrow", "Arial Black", sans-serif',
  height = "560px",
  mode = "scroll-reveal",
  scrollDistance = "40svh",
  progress,
  hint = false,
  className = "",
}: TigerTearRevealProps) {
  const rootRef = React.useRef<HTMLElement | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const id = "ttr" + React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const fibres = React.useMemo(buildFibres, []);
  const line = React.useMemo(() => tearLine(), []);
  const [f, setF] = React.useState<Frame>({ p: progress ?? 0, look: [0, 0], blink: 0, squint: 0 });

  const controlled = progress !== undefined;
  const cfg = React.useRef({ progress, controlled, reduced, mode });
  cfg.current = { progress, controlled, reduced, mode };
  const pointer = React.useRef<{ x: number; y: number } | null>(null);
  const squintAt = React.useRef(-1e9);

  // Smooth scroll and gaze loop
  React.useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    let raf = 0;
    let visible = false;
    let p = cfg.current.progress ?? 0;
    let targetP = p;
    let look: Pt = [0, 0];
    let idle: Pt = [0, 0];
    let nextIdle = 0;
    let nextBlink = performance.now() + 2500;
    let last: Frame | null = null;

    // Passive scroll handler: calculates target progress without layout thrashing
    const updateTargetFromScroll = () => {
      if (cfg.current.controlled) {
        targetP = clamp01(cfg.current.progress ?? 0);
        return;
      }

      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      if (cfg.current.mode === "pinned") {
        const range = root.offsetHeight - stage.offsetHeight;
        targetP = range <= 0 ? (rect.top <= 0 ? 1 : 0) : clamp01(-rect.top / range);
      } else {
        // Natural viewport reveal: tears open as the card travels through viewport
        const start = vh * 0.88; // starts tearing as top enters bottom 88%
        const end = vh * 0.18;   // fully torn open when top reaches upper 18%
        targetP = clamp01((start - rect.top) / (start - end));
      }
    };

    const onScroll = () => {
      if (!visible) return;
      updateTargetFromScroll();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) {
        updateTargetFromScroll();
        if (!raf) raf = requestAnimationFrame(tick);
      }
    });
    io.observe(root);

    function tick(now: number) {
      raf = 0;
      if (!visible) return;
      const c = cfg.current;

      // Smooth lerp progress towards target
      const lerpSpeed = c.reduced ? 1 : 0.16;
      p = c.reduced ? (targetP > 0.3 ? 1 : 0) : p + (targetP - p) * lerpSpeed;
      if (Math.abs(targetP - p) < 0.001) p = targetP;

      // Eye gaze tracking
      let want: Pt;
      if (pointer.current) {
        const r = stage!.getBoundingClientRect();
        want = [
          Math.max(-1, Math.min(1, (pointer.current.x - r.left - r.width / 2) / (r.width * 0.35))),
          Math.max(-1, Math.min(1, (pointer.current.y - r.top - r.height * 0.58) / (r.height * 0.35))),
        ];
      } else {
        if (now > nextIdle && !c.reduced) {
          const g = rng(Math.floor(now));
          idle = [(g() - 0.5) * 1.4, (g() - 0.5) * 0.8];
          nextIdle = now + 1400 + g() * 1800;
        }
        want = c.reduced ? [0, 0] : idle;
      }
      look = [look[0] + (want[0] - look[0]) * 0.14, look[1] + (want[1] - look[1]) * 0.14];

      // Natural blinks
      let blink = 0;
      if (!c.reduced) {
        const since = now - nextBlink;
        if (since > 0) blink = since < 90 ? since / 90 : since < 200 ? 1 - (since - 90) / 110 : 0;
        if (since > 200) nextBlink = now + 2600 + Math.random() * 3200;
      }
      const squint = c.reduced ? 0 : Math.max(0, 1 - (now - squintAt.current) / 900);

      const next: Frame = { p, look, blink, squint };
      if (
        !last ||
        Math.abs(next.p - last.p) > 1e-4 ||
        Math.abs(next.look[0] - last.look[0]) > 1e-3 ||
        Math.abs(next.look[1] - last.look[1]) > 1e-3 ||
        next.blink !== last.blink ||
        next.squint !== last.squint
      ) {
        last = next;
        setF(next);
      }

      // Keep animation running while progress is lerping or eyes are moving
      const isProgressSettled = Math.abs(targetP - p) < 0.001;
      if (!isProgressSettled || pointer.current || Math.abs(look[0] - want[0]) > 0.01) {
        raf = requestAnimationFrame(tick);
      }
    }

    updateTargetFromScroll();
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const s = stages(f.p);
  const pop = reduced ? s.pop : easeOutBack(s.pop);
  const eyeScale = 0.9 + 0.1 * pop;
  const pupil = 1.3 - 0.5 * s.pop + 0.35 * f.squint;
  const blink = Math.max(1 - clamp01(pop), f.blink, f.squint * 0.45);
  const rise = (1 - s.rise) * 150;
  const shake = reduced ? 0 : Math.sin(f.p * 900) * 5 * s.shake;
  const crackReach = s.crack * 620;
  const crack = line.filter(([x]) => Math.abs(x - CX) <= crackReach);
  const tiger =
    "translate(" + CX + " " + (CY + rise).toFixed(2) + ") rotate(-7) scale(" + (1.34 - 0.06 * s.rise).toFixed(4) + ")";

  const sheet = (
    <>
      <rect x={-FAR} y={-FAR} width={FAR * 2 + VIEW_W} height={FAR * 2} fill={paper} />
      {tagline ? (
        <text
          x={CX}
          y={150}
          textAnchor="middle"
          fill={taglineColor}
          style={{ font: '700 32px "Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: "0.42em" }}
        >
          {tagline}
        </text>
      ) : null}
      <text
        x={CX}
        y={404}
        textAnchor="middle"
        textLength={880}
        lengthAdjust="spacingAndGlyphs"
        fill={ink}
        style={{ fontFamily, fontSize: 250, fontWeight: 400, letterSpacing: 0 }}
      >
        {word}
      </text>
    </>
  );

  const isPinned = mode === "pinned" && !controlled;

  return (
    <section
      ref={rootRef}
      className={"relative w-full " + className}
      style={{
        height: isPinned ? "calc(" + height + " + " + scrollDistance + ")" : height,
        background: paper,
        overflow: "clip",
      }}
    >
      <div
        ref={stageRef}
        className={`${isPinned ? "sticky top-0" : "relative"} w-full h-full overflow-hidden flex items-center justify-center`}
        style={{ height, cursor: s.pop > 0.9 ? "crosshair" : undefined }}
        onPointerMove={(e) => (pointer.current = { x: e.clientX, y: e.clientY })}
        onPointerLeave={() => (pointer.current = null)}
        onPointerDown={() => s.pop > 0.5 && (squintAt.current = performance.now())}
      >
        <svg
          viewBox={FRAME}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={(tagline ? tagline + ". " : "") + word + ", torn in two by a tiger looking through."}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", maxWidth: "none", display: "block" }}
        >
          <defs>
            <linearGradient id={id + "-shade"} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2a1203" stopOpacity={0.45} />
              <stop offset="0.45" stopColor="#ffd08a" stopOpacity={0.12} />
              <stop offset="1" stopColor="#2a1203" stopOpacity={0.5} />
            </linearGradient>
            <radialGradient id={id + "-vignette"} cx="0.5" cy="0.5" r="0.5" gradientTransform="translate(0.5 0.5) scale(0.25 1) translate(-0.5 -0.5)">
              <stop offset="0.5" stopColor="#1a0a02" stopOpacity={0} />
              <stop offset="1" stopColor="#1a0a02" stopOpacity={0.55} />
            </radialGradient>
            <radialGradient id={id + "-iris"}>
              <stop offset="0" stopColor="#fff0a8" />
              <stop offset="0.35" stopColor={eyeColor} />
              <stop offset="0.8" stopColor="#b8570f" />
              <stop offset="1" stopColor="#4d1f03" />
            </radialGradient>
            <linearGradient id={id + "-lid"} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#000" stopOpacity={0.75} />
              <stop offset="1" stopColor="#000" stopOpacity={0} />
            </linearGradient>
            <linearGradient id={id + "-curl-top"} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#d9d4cb" />
            </linearGradient>
            <linearGradient id={id + "-curl-bottom"} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#d9d4cb" />
            </linearGradient>
            <filter id={id + "-soft"} x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <filter id={id + "-glow"} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="9" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g transform={"translate(" + shake.toFixed(2) + " " + (shake * 0.4).toFixed(2) + ")"}>
            {s.open > 0 ? (
              <g transform={tiger}>
                <Fur id={id} fur={furColor} />
                <g filter={s.pop > 0.02 ? "url(#" + id + "-glow)" : undefined}>
                  {EYES.map(([x, y], i) => (
                    <Eye
                      key={i}
                      id={id}
                      x={x}
                      y={y}
                      flip={i === 0}
                      look={f.look}
                      blink={blink}
                      pupil={pupil}
                      scale={eyeScale}
                      fibres={fibres}
                    />
                  ))}
                </g>
              </g>
            ) : null}

            {s.open > 0 ? (
              <>
                <Half id={id} side="top" line={line} open={s.open}>
                  {sheet}
                </Half>
                <Half id={id} side="bottom" line={line} open={s.open}>
                  {sheet}
                </Half>
              </>
            ) : (
              sheet
            )}

            {s.crack > 0 && s.open < 0.15 && crack.length > 1 ? (
              <path d={d(crack, false)} fill="none" stroke="#1d0f07" strokeWidth={2.4} strokeLinejoin="bevel" opacity={1 - s.open / 0.15} />
            ) : null}
          </g>
        </svg>

        {hint && !controlled && f.p < 0.1 ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em]"
            style={{ color: taglineColor, opacity: Math.max(0, 0.7 - s.crack * 3) }}
          >
            scroll to tear
            <span className="block h-6 w-px animate-pulse motion-reduce:animate-none" style={{ background: taglineColor }} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
