"use client";

import React, { useEffect, useState } from "react";
import { isSoundMuted, toggleSound, playClick } from "@/lib/sound";

export function AtmosphericShader() {
  const [muted, setMuted] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMuted(isSoundMuted());

    // Mouse specular lighting variable updater
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleAudioToggle = () => {
    const nextState = toggleSound();
    setMuted(nextState);
    playClick(nextState ? 900 : 2400, 0.03);
  };

  return (
    <>
      {/* ── 1. PROCEDURAL 35MM FILM GRAIN OVERLAY ────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.032] mix-blend-overlay select-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* ── 2. FLUID GRADIENT MESH SHADER (WARM IVORY & SAGE DIFFUSION) ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Kinetic Ambient Mesh 1: Warm Signal Orange Bloom */}
        <div
          className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] rounded-full blur-[140px] opacity-[0.06] animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(2, 132, 199, 0.06) 0%, rgba(2, 132, 199, 0.015) 50%, transparent 70%)",
            animationDuration: "14s",
          }}
        />

        {/* Kinetic Ambient Mesh 2: Crail Terracotta Diffusion */}
        <div
          className="absolute top-[35%] -right-[15%] w-[70vw] h-[70vw] rounded-full blur-[160px] opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, rgba(193, 95, 60, 0.06) 0%, rgba(193, 95, 60, 0.015) 40%, transparent 70%)",
          }}
        />

        {/* Kinetic Ambient Mesh 3: Warm Desert Sand Sheen */}
        <div
          className="absolute top-[65%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[180px] opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, rgba(240, 238, 230, 0.8) 0%, transparent 70%)",
          }}
        />

        {/* Cursor Specular Spotlight (Reactive to Mouse Position) */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(700px circle at var(--cursor-x, 50vw) var(--cursor-y, 30vh), rgba(2, 132, 199, 0.02), transparent 80%)",
          }}
        />

        {/* Subtle Tech Dot Matrix (Charcoal Ink) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(rgba(20, 20, 19, 0.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>
    </>
  );
}

export default AtmosphericShader;
