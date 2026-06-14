"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loaderLogs = [
  "INITIALIZING CORE WEBGL SHADERS...",
  "LOADING 3D GEOMETRY MATRICES...",
  "COMPILING ROUTE CONTROLLER SYSTEM...",
  "SYNCING CDN EDGE CACHES...",
  "ESTABLISHING PROTOCOL CHANNELS...",
  "STATUS: ONLINE // READY",
];

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
      setMounted(true);
    });

    // Respect sessionStorage to only play the preloader on first session visit
    if (typeof window !== "undefined") {
      const alreadyLoaded = sessionStorage.getItem("vistar-preloaded");
      if (alreadyLoaded === "true") {
        Promise.resolve().then(() => {
          setVisible(false);
        });
        return;
      }
    }

    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < loaderLogs.length) {
        setLogs((prev) => [...prev, `[system] ${loaderLogs[logIdx]}`]);
        logIdx++;
      } else {
        clearInterval(logInterval);
      }
    }, 280);

    const progressDuration = 1800; // 1.8 seconds total
    const startTime = performance.now();

    const animateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min((elapsed / progressDuration) * 100, 100);
      setProgress(Math.floor(pct));

      if (pct < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        setTimeout(() => {
          setVisible(false);
          if (typeof window !== "undefined") {
            sessionStorage.setItem("vistar-preloaded", "true");
          }
        }, 300);
      }
    };

    requestAnimationFrame(animateProgress);

    return () => {
      clearInterval(logInterval);
    };
  }, []);

  if (!mounted || !visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center select-none"
        >
          {/* Halftone dots texture background */}
          <div className="absolute inset-0 halftone-dots opacity-[0.02] pointer-events-none" />

          {/* Star spinner and progress content */}
          <div className="flex flex-col items-center gap-8 z-10 max-w-sm px-6">
            
            {/* Spinning 4-pointed star vector */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
              className="relative w-16 h-16 text-[#d8ff42] flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                <path d="M12,2 L14.5,9.5 L22,12 L14.5,14.5 L12,22 L9.5,14.5 L2,12 L9.5,9.5 Z" />
              </svg>
              <span className="absolute w-2 h-2 rounded-full bg-[#ff1e90]" />
            </motion.div>

            {/* Title / Brand */}
            <div className="text-center space-y-1">
              <h1 className="font-display text-sm font-extrabold text-[#faf9f5] tracking-[6px] uppercase">
                Vistar Studio
              </h1>
              <p className="text-[7.5px] font-mono text-zinc-500 tracking-[3px] uppercase">
                Systems Architecture Lab
              </p>
            </div>

            {/* Progress percentage bar */}
            <div className="w-48 space-y-2">
              <div className="flex justify-between font-mono text-[8px] text-zinc-400">
                <span>COMPILE_PROGRESS</span>
                <span className="text-[#d8ff42]">{progress}%</span>
              </div>
              <div className="w-full h-[3px] bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#d8ff42]" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>

            {/* Animating log output */}
            <div className="w-64 bg-black/40 border border-white/5 rounded-lg p-3 h-24 font-mono text-[7px] leading-relaxed flex flex-col justify-end overflow-hidden no-scrollbar">
              {logs.map((log, i) => (
                <p 
                  key={i} 
                  className={log.includes("ONLINE") ? "text-[#d8ff42]" : "text-white/40"}
                  style={{ transform: `translate3d(0, 0, 0)` }}
                >
                  {log}
                </p>
              ))}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
