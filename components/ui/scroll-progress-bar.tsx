"use client";

import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressBarProps {
  className?: string;
  color?: string;
  position?: "top" | "bottom";
}

export function ScrollProgressBar({
  className = "",
  color = "from-[#ccff00] via-[#ff0080] to-[#ccff00]",
  position = "top",
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const positionClass = position === "top" ? "top-0" : "bottom-0";

  return (
    <motion.div
      className={`fixed ${positionClass} left-0 right-0 z-50 h-1 origin-left bg-gradient-to-r ${color} ${className}`}
      style={{ scaleX }}
    />
  );
}

export function CircularScrollProgress({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div className={`fixed bottom-8 right-8 z-50 ${className}`}>
      <svg width="60" height="60" viewBox="0 0 60 60" className="rotate-[-90deg]">
        <circle
          cx="30"
          cy="30"
          r="25"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="4"
          fill="none"
        />
        <motion.circle
          cx="30"
          cy="30"
          r="25"
          stroke="url(#gradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          style={{
            pathLength: scrollYProgress,
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ccff00" />
            <stop offset="100%" stopColor="#ff0080" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
