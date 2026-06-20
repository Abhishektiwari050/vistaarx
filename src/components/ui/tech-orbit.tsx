"use client";

import React, { useRef } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Tech Stack Orbital → Grid Visualization
// ─────────────────────────────────────────────────────────────────────────────

interface TechItem {
  name: string;
  desc: string;
  color: string;
  icon: string; // emoji or symbol
}

interface TechOrbitProps {
  scrollProgress: number; // 0 → 1 within this section
}

const techItems: TechItem[] = [
  {
    name: "Next.js Edge",
    desc: "Global edge hosting with server-rendered page assets and ISR caching.",
    color: "#ff1e90",
    icon: "⚡",
  },
  {
    name: "Three.js / WebGL",
    desc: "Surrealist, lightweight 3D graphic systems running natively in-browser.",
    color: "#d8ff42",
    icon: "◆",
  },
  {
    name: "Framer Motion",
    desc: "60 FPS hardware-accelerated interface choreography and micro-interactions.",
    color: "#3366ff",
    icon: "◎",
  },
  {
    name: "Tailwind CSS",
    desc: "Streamlined styling compilation for zero bloated assets and rapid iteration.",
    color: "#ff6b35",
    icon: "✦",
  },
];

const coreStats = [
  { label: "Compile Target", val: "Next.js Edge" },
  { label: "First Byte (TTFB)", val: "<180ms" },
  { label: "Base Frame Rate", val: "60 FPS GL" },
  { label: "Core Caching SLA", val: "SWR" },
];

export function TechOrbit({ scrollProgress }: TechOrbitProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Transition phases:
  // 0.0 - 0.4: orbital animation
  // 0.4 - 0.7: transition to grid
  // 0.7 - 1.0: grid + stats fully visible
  const orbitalPhase = Math.max(0, Math.min(1, (0.4 - scrollProgress) / 0.4));
  const gridPhase = Math.max(0, Math.min(1, (scrollProgress - 0.35) / 0.35));
  const statsPhase = Math.max(0, Math.min(1, (scrollProgress - 0.55) / 0.3));

  // Orbital angle computation (continuous rotation when in orbital phase)
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    let animId: number;
    const tick = () => {
      setTime(performance.now() * 0.001);
      animId = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Orbital view (fades out as grid fades in) */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: orbitalPhase,
          pointerEvents: orbitalPhase > 0.1 ? "auto" : "none",
        }}
      >
        {/* Central nucleus */}
        <div className="relative">
          {/* Glow rings */}
          {[200, 300, 400, 500].map((size, i) => (
            <div
              key={i}
              className="absolute rounded-full border"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${-size / 2}px`,
                left: `${-size / 2}px`,
                borderColor: `${techItems[i].color}20`,
                animation: `orbit-ring-pulse ${3 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}

          {/* Core orb */}
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center z-10">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,30,144,0.3) 0%, rgba(216,255,66,0.15) 40%, transparent 70%)",
                filter: "blur(12px)",
              }}
            />
            <div
              className="absolute inset-2 rounded-full border border-white/10"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(8px)",
              }}
            />
            <span className="relative z-10 font-display text-[8px] font-black tracking-[0.2em] uppercase text-white/60">
              Core
            </span>
          </div>

          {/* Orbiting items */}
          {techItems.map((item, i) => {
            const orbitRadius = 100 + i * 50;
            const speed = 0.3 + i * 0.1;
            const offset = (i * Math.PI * 2) / techItems.length;

            return (
              <div
                key={i}
                className="absolute z-20"
                style={{
                  left: `${Math.cos(time * speed + offset) * orbitRadius}px`,
                  top: `${Math.sin(time * speed + offset) * orbitRadius * 0.5}px`,
                  transform: "translate(-50%, -50%)",
                  transition: "none",
                }}
              >
                <div
                  className="px-3 py-1.5 rounded-lg border backdrop-blur-sm whitespace-nowrap"
                  style={{
                    borderColor: `${item.color}40`,
                    backgroundColor: `${item.color}15`,
                    boxShadow: `0 0 20px ${item.color}20`,
                  }}
                >
                  <span className="text-[10px] font-display font-bold uppercase tracking-wider text-white/80">
                    {item.icon} {item.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid view (fades in) */}
      <div
        className="absolute inset-0 flex items-center justify-center px-6"
        style={{
          opacity: gridPhase,
          pointerEvents: gridPhase > 0.1 ? "auto" : "none",
          transform: `translateY(${(1 - gridPhase) * 40}px)`,
        }}
      >
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Tech stack grid (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#d8ff42] animate-pulse" />
              <h2 className="font-display text-lg font-black uppercase tracking-wider text-white">
                Core Architecture
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {techItems.map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: gridPhase > 0.3 ? 1 : 0,
                    y: gridPhase > 0.3 ? 0 : 20,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="rounded-xl p-5 border space-y-2"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: `${tech.color}25`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm"
                      style={{ color: tech.color }}
                    >
                      {tech.icon}
                    </span>
                    <span className="font-display text-xs font-bold text-white uppercase tracking-wider">
                      {tech.name}
                    </span>
                  </div>
                  <p className="font-sans text-[10px] text-white/40 leading-relaxed">
                    {tech.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats panel (5 cols) */}
          <div
            className="lg:col-span-5"
            style={{
              opacity: statsPhase,
              transform: `translateX(${(1 - statsPhase) * 30}px)`,
            }}
          >
            <div className="rounded-2xl border border-white/10 p-8 space-y-6 bg-white/[0.02] backdrop-blur-sm">
              <div className="space-y-2">
                <span className="font-mono text-[9px] font-bold tracking-widest text-[#ff1e90] uppercase">
                  SYSTEM STATUS: ONLINE
                </span>
                <h2 className="font-display text-lg font-black uppercase tracking-wider text-white">
                  Telemetry Targets
                </h2>
              </div>

              <div className="divide-y divide-white/5">
                {coreStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: statsPhase > 0.2 ? 1 : 0,
                      x: statsPhase > 0.2 ? 0 : 20,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex justify-between items-center py-3 font-sans text-xs"
                  >
                    <span className="text-white/40">{stat.label}</span>
                    <span className="font-mono font-bold text-[#ff1e90]">
                      {stat.val}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-[10px] font-mono text-white/30 leading-relaxed">
                All repositories include isolated unit tests, CI pipelines, and
                are handed over completely on launch day.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section label */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none"
        style={{ opacity: 0.4 + gridPhase * 0.6 }}
      >
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">
          Section 02 // Stack Architecture
        </span>
      </div>
    </div>
  );
}
