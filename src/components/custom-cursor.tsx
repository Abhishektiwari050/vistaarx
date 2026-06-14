"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hoveredEl, setHoveredEl] = useState<{ text?: string; type?: string } | null>(null);

  // Motion values for tracking cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring options for smooth trailing effect
  const springConfig = { stiffness: 250, damping: 28, mass: 0.2 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Traversal to find interactive parents or cursor text hints
      let target = e.target as HTMLElement | null;
      let foundInteractive = false;
      let cursorText = "";

      while (target && target !== document.body) {
        if (target.getAttribute("data-cursor-text")) {
          cursorText = target.getAttribute("data-cursor-text") || "";
          foundInteractive = true;
          break;
        }
        const tagName = target.tagName.toLowerCase();
        if (
          tagName === "a" ||
          tagName === "button" ||
          target.classList.contains("interactive") ||
          target.classList.contains("cursor-pointer") ||
          target.getAttribute("role") === "button"
        ) {
          foundInteractive = true;
        }
        target = target.parentElement;
      }

      const newType = foundInteractive ? (cursorText ? "text" : "link") : null;

      setHoveredEl((prev) => {
        const prevType = prev?.type || null;
        const prevText = prev?.text || "";
        if (prevType === newType && prevText === cursorText) {
          return prev;
        }
        return newType ? { text: cursorText || undefined, type: newType } : null;
      });
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      clearTimeout(timer);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  const isTextHover = hoveredEl?.type === "text";
  const isLinkHover = hoveredEl?.type === "link";
  const hasHover = !!hoveredEl;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer trailing spring circle */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isTextHover ? 80 : isLinkHover ? 44 : 20,
          height: isTextHover ? 80 : isLinkHover ? 44 : 20,
          backgroundColor: isTextHover ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0)",
          border: isTextHover ? "0px solid transparent" : "1.5px solid rgba(0, 0, 0, 0.45)",
          mixBlendMode: isTextHover ? "normal" : "difference",
          borderColor: isLinkHover ? "rgba(255, 30, 144, 0.85)" : "rgba(255, 255, 255, 0.95)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.1 }}
        className="fixed flex items-center justify-center rounded-full"
      >
        {isTextHover && hoveredEl.text && (
          <span className="font-display text-[9px] font-black tracking-widest uppercase text-black select-none">
            {hoveredEl.text}
          </span>
        )}
      </motion.div>

      {/* Inner fast-tracking point */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hasHover ? 0.4 : 1.0,
          opacity: isTextHover ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="fixed w-2 h-2 bg-[#ff1e90] rounded-full mix-blend-difference"
      />
    </div>
  );
}

export default CustomCursor;
