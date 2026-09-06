"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTensionDrone, playTearSnapSound } from "@/lib/hooks/use-audio-feedback";

type PreloadPhase = "still" | "tension" | "tear" | "done";

export function Preloader() {
  const [phase, setPhase] = useState<PreloadPhase>("still");
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const hasTriggeredSound = useRef(false);

  useEffect(() => {
    setMounted(true);

    // Mandatory on every sequence/refresh. Only bypass for test automation via ?nopreload
    if (typeof window !== "undefined") {
      const isBypassed =
        window.location.search.includes("nopreload") ||
        (window as unknown as { __disablePreloader?: boolean }).__disablePreloader;
      if (isBypassed) {
        setVisible(false);
        setPhase("done");
        return;
      }
    }

    // Phase 1: Tension & Mechanical Incision (starts at 1.6s of dignified stillness)
    const timerTension = setTimeout(() => {
      setPhase("tension");
      if (!hasTriggeredSound.current) {
        hasTriggeredSound.current = true;
        playTensionDrone(1.5, 0.016);
      }
    }, 1600);

    // Phase 2: Delamination & 3D Peeling Tear (starts at 3.2s)
    const timerTear = setTimeout(() => {
      setPhase("tear");
      playTearSnapSound(0.024);
    }, 3200);

    // Phase 3: Reveal Handoff & Unmount (at 4.8s)
    const timerDone = setTimeout(() => {
      setPhase("done");
      setVisible(false);
    }, 4800);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPhase("done");
        setVisible(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timerTension);
      clearTimeout(timerTear);
      clearTimeout(timerDone);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!mounted || !visible) return null;

  const isStill = phase === "still";
  const isTension = phase === "tension";
  const isTear = phase === "tear" || phase === "done";

  // Heavy mechanical and fluid cinematic easing curves
  const tensionEase = [0.22, 1, 0.36, 1] as const;
  const tearEase = [0.76, 0, 0.24, 1] as const;

  return (
    <AnimatePresence>
      {visible && (
        <div 
          className="fixed inset-0 z-[99999] overflow-hidden select-none pointer-events-none"
          style={{ perspective: "1200px" }}
          aria-label="Vistar Architectural Fracture & Delamination Entrance"
        >
          {/* ============================================================ */}
          {/* THE 4 DELAMINATING WARM IVORY SURFACE FLAPS                  */}
          {/* ============================================================ */}

          {/* NORTH FLAP */}
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={
              isTear
                ? { y: "-115vh", scale: 1.02, rotateX: 12 }
                : { y: 0, scale: 1, rotateX: 0 }
            }
            transition={
              isTear
                ? { duration: 1.45, ease: tearEase }
                : { duration: 1.5, ease: tensionEase }
            }
            className="absolute inset-0 w-full h-full bg-[#F4F1EA] origin-top"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 50%)",
              filter: isTear ? "drop-shadow(0 24px 36px rgba(21,21,21,0.3))" : "none",
            }}
          />

          {/* EAST FLAP */}
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={
              isTear
                ? { x: "115vw", scale: 1.02, rotateY: 12 }
                : { x: 0, scale: 1, rotateY: 0 }
            }
            transition={
              isTear
                ? { duration: 1.45, ease: tearEase }
                : { duration: 1.5, ease: tensionEase }
            }
            className="absolute inset-0 w-full h-full bg-[#F4F1EA] origin-right"
            style={{
              clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
              filter: isTear ? "drop-shadow(-24px 0 36px rgba(21,21,21,0.3))" : "none",
            }}
          />

          {/* SOUTH FLAP */}
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={
              isTear
                ? { y: "115vh", scale: 1.02, rotateX: -12 }
                : { y: 0, scale: 1, rotateX: 0 }
            }
            transition={
              isTear
                ? { duration: 1.45, ease: tearEase }
                : { duration: 1.5, ease: tensionEase }
            }
            className="absolute inset-0 w-full h-full bg-[#F4F1EA] origin-bottom"
            style={{
              clipPath: "polygon(100% 100%, 0 100%, 50% 50%)",
              filter: isTear ? "drop-shadow(0 -24px 36px rgba(21,21,21,0.3))" : "none",
            }}
          />

          {/* WEST FLAP */}
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={
              isTear
                ? { x: "-115vw", scale: 1.02, rotateY: -12 }
                : { x: 0, scale: 1, rotateY: 0 }
            }
            transition={
              isTear
                ? { duration: 1.45, ease: tearEase }
                : { duration: 1.5, ease: tensionEase }
            }
            className="absolute inset-0 w-full h-full bg-[#F4F1EA] origin-left"
            style={{
              clipPath: "polygon(0 100%, 0 0, 50% 50%)",
              filter: isTear ? "drop-shadow(24px 0 36px rgba(21,21,21,0.3))" : "none",
            }}
          />

          {/* ============================================================ */}
          {/* TENSILE INCISION RELIEF SEAMS (Dual-edge physical fracture)  */}
          {/* ============================================================ */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id="copperReliefGradTL" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8C542C" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#B87333" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#D29A68" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="copperReliefGradTR" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8C542C" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#B87333" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#D29A68" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="copperReliefGradBR" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#8C542C" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#B87333" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#D29A68" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="copperReliefGradBL" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8C542C" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#B87333" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#D29A68" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* TOP-LEFT SEAM: Shadow Line + Specular Copper Line */}
            <line
              x1="0"
              y1="0"
              x2="50%"
              y2="50%"
              stroke="#151515"
              strokeWidth="1.2"
              className={`transition-opacity duration-700 ease-out ${
                isTension ? "opacity-35" : "opacity-0"
              }`}
            />
            <line
              x1="0"
              y1="1"
              x2="50%"
              y2="50%"
              stroke="url(#copperReliefGradTL)"
              strokeWidth="1"
              className={`transition-opacity duration-700 ease-out ${
                isTension ? "opacity-60" : "opacity-0"
              }`}
            />

            {/* TOP-RIGHT SEAM */}
            <line
              x1="100%"
              y1="0"
              x2="50%"
              y2="50%"
              stroke="#151515"
              strokeWidth="1.2"
              className={`transition-opacity duration-700 ease-out ${
                isTension ? "opacity-35" : "opacity-0"
              }`}
            />
            <line
              x1="100%"
              y1="1"
              x2="50%"
              y2="50%"
              stroke="url(#copperReliefGradTR)"
              strokeWidth="1"
              className={`transition-opacity duration-700 ease-out ${
                isTension ? "opacity-60" : "opacity-0"
              }`}
            />

            {/* BOTTOM-RIGHT SEAM */}
            <line
              x1="100%"
              y1="100%"
              x2="50%"
              y2="50%"
              stroke="#151515"
              strokeWidth="1.2"
              className={`transition-opacity duration-700 ease-out ${
                isTension ? "opacity-35" : "opacity-0"
              }`}
            />
            <line
              x1="100%"
              y1="99%"
              x2="50%"
              y2="50%"
              stroke="url(#copperReliefGradBR)"
              strokeWidth="1"
              className={`transition-opacity duration-700 ease-out ${
                isTension ? "opacity-60" : "opacity-0"
              }`}
            />

            {/* BOTTOM-LEFT SEAM */}
            <line
              x1="0"
              y1="100%"
              x2="50%"
              y2="50%"
              stroke="#151515"
              strokeWidth="1.2"
              className={`transition-opacity duration-700 ease-out ${
                isTension ? "opacity-35" : "opacity-0"
              }`}
            />
            <line
              x1="0"
              y1="99%"
              x2="50%"
              y2="50%"
              stroke="url(#copperReliefGradBL)"
              strokeWidth="1"
              className={`transition-opacity duration-700 ease-out ${
                isTension ? "opacity-60" : "opacity-0"
              }`}
            />
          </svg>

          {/* ============================================================ */}
          {/* THE VISTAR 4-WEDGED APERTURE CORE & SIGNAL BEACON            */}
          {/* ============================================================ */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
              
              {/* Diffused Mineral/Graphite Contact Shadow */}
              <motion.div
                animate={
                  isTension
                    ? { scale: [1, 1.2, 1.1], opacity: [0.25, 0.45, 0.35] }
                    : isTear
                    ? { scale: 3.0, opacity: 0 }
                    : { scale: 1, opacity: 0.22 }
                }
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute w-44 h-44 rounded-full bg-[#151515]/18 blur-2xl -z-10"
              />

              {/* Central Concentric Precision Copper Aperture Dial */}
              <motion.div
                animate={
                  isTension
                    ? { scale: [1, 1.15, 1.1], opacity: 1 }
                    : isTear
                    ? { scale: 2.8, opacity: 0 }
                    : { scale: 1, opacity: 0.9 }
                }
                transition={
                  isTear
                    ? { duration: 1.0, ease: tearEase }
                    : { duration: 1.4, ease: tensionEase }
                }
                className="absolute flex items-center justify-center z-15 pointer-events-none"
              >
                <svg viewBox="0 0 80 80" className="w-16 h-16 sm:w-20 sm:h-20" fill="none">
                  {/* Subtle outer dashed precision coordinate ring */}
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    stroke="#D8D3C9"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                    opacity="0.8"
                  />
                  {/* Burnished copper mid ring */}
                  <circle
                    cx="40"
                    cy="40"
                    r="24"
                    stroke="#8C542C"
                    strokeWidth="1.2"
                    opacity="0.75"
                  />
                  {/* Core copper optical rim */}
                  <circle
                    cx="40"
                    cy="40"
                    r="15"
                    stroke="#B87333"
                    strokeWidth="1.5"
                    opacity="0.9"
                  />
                  {/* Cardinal micro alignment notches */}
                  <line x1="40" y1="9" x2="40" y2="13" stroke="#B87333" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="40" y1="67" x2="40" y2="71" stroke="#B87333" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="9" y1="40" x2="13" y2="40" stroke="#B87333" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="67" y1="40" x2="71" y2="40" stroke="#B87333" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Central Pure Copper Signal Beacon */}
                  <circle cx="40" cy="40" r="4.5" fill="#B87333" stroke="#D29A68" strokeWidth="1" />
                  <circle cx="40" cy="40" r="1.8" fill="#F4F1EA" />
                </svg>
              </motion.div>

              {/* Breathing Warm Copper Halo Glow */}
              <motion.div
                animate={
                  isTension
                    ? { scale: [1, 1.35, 1.2], opacity: [0.4, 0.75, 0.6] }
                    : isTear
                    ? { scale: 3.5, opacity: 0 }
                    : { scale: [0.95, 1.05, 0.95], opacity: [0.35, 0.55, 0.35] }
                }
                transition={{
                  duration: isStill ? 2.4 : 1.2,
                  repeat: isStill ? Infinity : 0,
                  ease: "easeInOut",
                }}
                className="absolute w-12 h-12 rounded-full bg-[#B87333]/25 blur-lg z-14"
              />

              {/* ========================================================== */}
              {/* THE 4 ARCHITECTURAL MONOLITHIC WEDGES (Deep Graphite + Copper) */}
              {/* ========================================================== */}

              {/* NORTH WEDGE: Apex North, Flat base South */}
              <motion.div
                initial={{ y: 0 }}
                animate={
                  isTear
                    ? { y: "-90vh", scale: 1.08, opacity: 0 }
                    : isTension
                    ? { y: -38 }
                    : { y: 0 }
                }
                transition={
                  isTear
                    ? { duration: 1.45, ease: tearEase }
                    : { duration: 1.5, ease: tensionEase }
                }
                className="absolute top-1 sm:top-2 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 64 64"
                  className="w-14 sm:w-18 h-14 sm:h-18 drop-shadow-[0_6px_14px_rgba(21,21,21,0.28)]"
                  fill="none"
                >
                  <polygon
                    points="32,6 56,52 8,52"
                    fill="#151515"
                    stroke="#8C542C"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  {/* Inner Specular Copper Bevel */}
                  <polygon
                    points="32,16 48,46 16,46"
                    fill="#151515"
                    stroke="#D29A68"
                    strokeWidth="0.75"
                    strokeOpacity="0.65"
                  />
                </svg>
              </motion.div>

              {/* EAST WEDGE: Apex East, Flat base West */}
              <motion.div
                initial={{ x: 0 }}
                animate={
                  isTear
                    ? { x: "90vw", scale: 1.08, opacity: 0 }
                    : isTension
                    ? { x: 38 }
                    : { x: 0 }
                }
                transition={
                  isTear
                    ? { duration: 1.45, ease: tearEase }
                    : { duration: 1.5, ease: tensionEase }
                }
                className="absolute right-1 sm:right-2 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 64 64"
                  className="w-14 sm:w-18 h-14 sm:h-18 drop-shadow-[6px_0_14px_rgba(21,21,21,0.28)]"
                  fill="none"
                >
                  <polygon
                    points="58,32 12,56 12,8"
                    fill="#151515"
                    stroke="#8C542C"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  {/* Inner Specular Copper Bevel */}
                  <polygon
                    points="48,32 18,48 18,16"
                    fill="#151515"
                    stroke="#D29A68"
                    strokeWidth="0.75"
                    strokeOpacity="0.65"
                  />
                </svg>
              </motion.div>

              {/* SOUTH WEDGE: Apex South, Flat base North */}
              <motion.div
                initial={{ y: 0 }}
                animate={
                  isTear
                    ? { y: "90vh", scale: 1.08, opacity: 0 }
                    : isTension
                    ? { y: 38 }
                    : { y: 0 }
                }
                transition={
                  isTear
                    ? { duration: 1.45, ease: tearEase }
                    : { duration: 1.5, ease: tensionEase }
                }
                className="absolute bottom-1 sm:bottom-2 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 64 64"
                  className="w-14 sm:w-18 h-14 sm:h-18 drop-shadow-[0_8px_16px_rgba(21,21,21,0.28)]"
                  fill="none"
                >
                  <polygon
                    points="32,58 8,12 56,12"
                    fill="#151515"
                    stroke="#8C542C"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  {/* Inner Specular Copper Bevel */}
                  <polygon
                    points="32,48 16,18 48,18"
                    fill="#151515"
                    stroke="#D29A68"
                    strokeWidth="0.75"
                    strokeOpacity="0.65"
                  />
                </svg>
              </motion.div>

              {/* WEST WEDGE: Apex West, Flat base East */}
              <motion.div
                initial={{ x: 0 }}
                animate={
                  isTear
                    ? { x: "-90vw", scale: 1.08, opacity: 0 }
                    : isTension
                    ? { x: -38 }
                    : { x: 0 }
                }
                transition={
                  isTear
                    ? { duration: 1.45, ease: tearEase }
                    : { duration: 1.5, ease: tensionEase }
                }
                className="absolute left-1 sm:left-2 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 64 64"
                  className="w-14 sm:w-18 h-14 sm:h-18 drop-shadow-[-6px_0_14px_rgba(21,21,21,0.28)]"
                  fill="none"
                >
                  <polygon
                    points="6,32 52,8 52,56"
                    fill="#151515"
                    stroke="#8C542C"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  {/* Inner Specular Copper Bevel */}
                  <polygon
                    points="16,32 46,16 46,48"
                    fill="#151515"
                    stroke="#D29A68"
                    strokeWidth="0.75"
                    strokeOpacity="0.65"
                  />
                </svg>
              </motion.div>

            </div>

            {/* Technical Sub-Caption Underneath Mark */}
            <motion.div
              initial={{ opacity: 0.6 }}
              animate={
                isTear
                  ? { opacity: 0, y: 20 }
                  : isTension
                  ? { opacity: 0.85, y: 6 }
                  : { opacity: 0.55, y: 0 }
              }
              transition={{ duration: 1.0 }}
              className="absolute bottom-16 sm:bottom-20 flex flex-col items-center gap-1 text-[#151515] font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase select-none"
            >
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#B87333]" />
                <span>VISTAR PRECISION SYSTEMS</span>
              </div>
              <span className="text-[#8C542C] text-[7px] sm:text-[8px] tracking-[0.3em]">
                ARCHITECTURAL APERTURE ENGINE
              </span>
            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
