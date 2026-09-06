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

    // Make preloader mandatory at each sequence (removed sessionStorage restriction)
    // Only bypass if explicitly requested via ?nopreload URL parameter
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

    // Phase 1: Tension (starts at 1.6s - allowing a generous moment of stillness)
    const timerTension = setTimeout(() => {
      setPhase("tension");
      if (!hasTriggeredSound.current) {
        playTensionDrone(1.4, 0.015);
      }
    }, 1600);

    // Phase 2: The Tear (starts at 3.2s - deliberate, heavy mechanical snap)
    const timerTear = setTimeout(() => {
      setPhase("tear");
      playTearSnapSound(0.022);
    }, 3200);

    // Phase 3: Final Reveal & Smooth Unmount (at 4.6s)
    const timerDone = setTimeout(() => {
      setPhase("done");
      setVisible(false);
    }, 4600);

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

  // Luxurious cinematic easing curves
  const tensionEase = [0.22, 1, 0.36, 1] as const;
  const tearEase = [0.76, 0, 0.24, 1] as const;

  return (
    <AnimatePresence>
      {visible && (
        <div 
          className="fixed inset-0 z-[99999] overflow-hidden select-none pointer-events-none"
          aria-label="Vistar Logo Surface Tear Entrance"
        >
          {/* ============================================================ */}
          {/* THE 4 TEARING IVORY SURFACE FLAPS                            */}
          {/* ============================================================ */}

          {/* NORTH FLAP */}
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={
              isTear
                ? { y: "-110vh", scale: 1.01, rotateX: 8 }
                : { y: 0, scale: 1 }
            }
            transition={
              isTear
                ? { duration: 1.35, ease: tearEase }
                : { duration: 1.5, ease: tensionEase }
            }
            className="absolute inset-0 w-full h-full bg-[#faf9f5] origin-top"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 50%)",
              filter: isTear ? "drop-shadow(0 20px 30px rgba(0,0,0,0.22))" : "none",
            }}
          />

          {/* EAST FLAP */}
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={
              isTear
                ? { x: "110vw", scale: 1.01, rotateY: 8 }
                : { x: 0, scale: 1 }
            }
            transition={
              isTear
                ? { duration: 1.35, ease: tearEase }
                : { duration: 1.5, ease: tensionEase }
            }
            className="absolute inset-0 w-full h-full bg-[#faf9f5] origin-right"
            style={{
              clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
              filter: isTear ? "drop-shadow(-20px 0 30px rgba(0,0,0,0.22))" : "none",
            }}
          />

          {/* SOUTH FLAP */}
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={
              isTear
                ? { y: "110vh", scale: 1.01, rotateX: -8 }
                : { y: 0, scale: 1 }
            }
            transition={
              isTear
                ? { duration: 1.35, ease: tearEase }
                : { duration: 1.5, ease: tensionEase }
            }
            className="absolute inset-0 w-full h-full bg-[#faf9f5] origin-bottom"
            style={{
              clipPath: "polygon(100% 100%, 0 100%, 50% 50%)",
              filter: isTear ? "drop-shadow(0 -20px 30px rgba(0,0,0,0.22))" : "none",
            }}
          />

          {/* WEST FLAP */}
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={
              isTear
                ? { x: "-110vw", scale: 1.01, rotateY: -8 }
                : { x: 0, scale: 1 }
            }
            transition={
              isTear
                ? { duration: 1.35, ease: tearEase }
                : { duration: 1.5, ease: tensionEase }
            }
            className="absolute inset-0 w-full h-full bg-[#faf9f5] origin-left"
            style={{
              clipPath: "polygon(0 100%, 0 0, 50% 50%)",
              filter: isTear ? "drop-shadow(20px 0 30px rgba(0,0,0,0.22))" : "none",
            }}
          />

          {/* ============================================================ */}
          {/* TENSION FRACTURE SEAMS (Clean, subtle structural hairlines)  */}
          {/* ============================================================ */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <line
              x1="0"
              y1="0"
              x2="50%"
              y2="50%"
              stroke="#0a0a0a"
              strokeWidth="0.75"
              className={`transition-opacity duration-700 ease-out ${
                isTension ? "opacity-25" : "opacity-0"
              }`}
            />
            <line
              x1="100%"
              y1="0"
              x2="50%"
              y2="50%"
              stroke="#0a0a0a"
              strokeWidth="0.75"
              className={`transition-opacity duration-700 ease-out ${
                isTension ? "opacity-25" : "opacity-0"
              }`}
            />
            <line
              x1="100%"
              y1="100%"
              x2="50%"
              y2="50%"
              stroke="#0a0a0a"
              strokeWidth="0.75"
              className={`transition-opacity duration-700 ease-out ${
                isTension ? "opacity-25" : "opacity-0"
              }`}
            />
            <line
              x1="0"
              y1="100%"
              x2="50%"
              y2="50%"
              stroke="#0a0a0a"
              strokeWidth="0.75"
              className={`transition-opacity duration-700 ease-out ${
                isTension ? "opacity-25" : "opacity-0"
              }`}
            />
          </svg>

          {/* ============================================================ */}
          {/* THE VISTAR 4-TRIANGLE KINETIC APERTURE MARK                  */}
          {/* ============================================================ */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
              
              {/* Subtle Ambient Radial Tension Shadow */}
              <motion.div
                animate={
                  isTension
                    ? { scale: [1, 1.15, 1.08], opacity: [0.3, 0.6, 0.45] }
                    : isTear
                    ? { scale: 2.5, opacity: 0 }
                    : { scale: 1, opacity: 0.25 }
                }
                transition={{ duration: 1.0, ease: "easeInOut" }}
                className="absolute w-40 h-40 rounded-full bg-black/15 blur-2xl -z-10"
              />

              {/* Central Singularity Glow in Void */}
              <motion.div
                animate={
                  isTension
                    ? { scale: [1, 1.4, 1.2], opacity: [0.7, 1, 0.8] }
                    : isTear
                    ? { scale: 3, opacity: 0 }
                    : { scale: 1, opacity: 0.7 }
                }
                transition={{ duration: 0.8, repeat: isStill ? Infinity : 0, repeatType: "reverse" }}
                className="absolute w-3.5 h-3.5 rounded-full bg-[#d8ff42] border border-black shadow-[0_0_16px_#d8ff42] z-30"
              />

              {/* NORTH TRIANGLE */}
              <motion.div
                initial={{ y: 0 }}
                animate={
                  isTear
                    ? { y: "-85vh", scale: 1.1, opacity: 0 }
                    : isTension
                    ? { y: -34 }
                    : { y: 0 }
                }
                transition={
                  isTear
                    ? { duration: 1.35, ease: tearEase }
                    : { duration: 1.5, ease: tensionEase }
                }
                className="absolute top-2 sm:top-4 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 64 52"
                  className="w-14 sm:w-18 h-12 sm:h-15 drop-shadow-[0_4px_12px_rgba(0,0,0,0.22)]"
                  fill="none"
                >
                  <polygon
                    points="32,4 60,48 4,48"
                    fill="#0a0a0a"
                    stroke="#27272a"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  {/* Subtle 3D inner chamfer accent */}
                  <polygon
                    points="32,8 54,45 10,45"
                    fill="#18181b"
                    opacity="0.4"
                  />
                </svg>
              </motion.div>

              {/* EAST TRIANGLE */}
              <motion.div
                initial={{ x: 0 }}
                animate={
                  isTear
                    ? { x: "85vw", scale: 1.1, opacity: 0 }
                    : isTension
                    ? { x: 34 }
                    : { x: 0 }
                }
                transition={
                  isTear
                    ? { duration: 1.35, ease: tearEase }
                    : { duration: 1.5, ease: tensionEase }
                }
                className="absolute right-2 sm:right-4 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 52 64"
                  className="w-12 sm:w-15 h-14 sm:h-18 drop-shadow-[4px_0_12px_rgba(0,0,0,0.22)]"
                  fill="none"
                >
                  <polygon
                    points="48,32 4,60 4,4"
                    fill="#0a0a0a"
                    stroke="#27272a"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="44,32 8,54 8,10"
                    fill="#18181b"
                    opacity="0.4"
                  />
                </svg>
              </motion.div>

              {/* SOUTH TRIANGLE */}
              <motion.div
                initial={{ y: 0 }}
                animate={
                  isTear
                    ? { y: "85vh", scale: 1.1, opacity: 0 }
                    : isTension
                    ? { y: 34 }
                    : { y: 0 }
                }
                transition={
                  isTear
                    ? { duration: 1.35, ease: tearEase }
                    : { duration: 1.5, ease: tensionEase }
                }
                className="absolute bottom-2 sm:bottom-4 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 64 52"
                  className="w-14 sm:w-18 h-12 sm:h-15 drop-shadow-[0_8px_16px_rgba(0,0,0,0.22)]"
                  fill="none"
                >
                  <polygon
                    points="32,48 4,4 60,4"
                    fill="#0a0a0a"
                    stroke="#27272a"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="32,44 10,7 54,7"
                    fill="#18181b"
                    opacity="0.4"
                  />
                </svg>
              </motion.div>

              {/* WEST TRIANGLE */}
              <motion.div
                initial={{ x: 0 }}
                animate={
                  isTear
                    ? { x: "-85vw", scale: 1.1, opacity: 0 }
                    : isTension
                    ? { x: -34 }
                    : { x: 0 }
                }
                transition={
                  isTear
                    ? { duration: 1.35, ease: tearEase }
                    : { duration: 1.5, ease: tensionEase }
                }
                className="absolute left-2 sm:left-4 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 52 64"
                  className="w-12 sm:w-15 h-14 sm:h-18 drop-shadow-[-4px_0_12px_rgba(0,0,0,0.22)]"
                  fill="none"
                >
                  <polygon
                    points="4,32 48,4 48,60"
                    fill="#0a0a0a"
                    stroke="#27272a"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="8,32 44,10 44,54"
                    fill="#18181b"
                    opacity="0.4"
                  />
                </svg>
              </motion.div>

            </div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
