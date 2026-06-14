"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hoveredEl, setHoveredEl] = useState<{ text?: string; type?: string } | null>(null);
  const [snappedRect, setSnappedRect] = useState<DOMRect | null>(null);

  // Motion values for tracking cursor and trail targets
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const rawMouseX = useMotionValue(-100);
  const rawMouseY = useMotionValue(-100);

  // Spring options for smooth trailing and snapping effects
  const springConfig = { stiffness: 220, damping: 24, mass: 0.25 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    const moveCursor = (e: MouseEvent) => {
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);

      // Traversal to find interactive parents or cursor text hints
      let target = e.target as HTMLElement | null;
      let foundInteractive = false;
      let interactiveEl: HTMLElement | null = null;
      let cursorText = "";

      while (target && target !== document.body) {
        if (target.getAttribute("data-cursor-text")) {
          cursorText = target.getAttribute("data-cursor-text") || "";
          foundInteractive = true;
          interactiveEl = target;
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
          interactiveEl = target;
          break;
        }
        target = target.parentElement;
      }

      if (foundInteractive && interactiveEl) {
        const rect = interactiveEl.getBoundingClientRect();
        setSnappedRect(rect);
        
        // Target position snaps to center of interactive element
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        cursorX.set(elementCenterX);
        cursorY.set(elementCenterY);
      } else {
        setSnappedRect(null);
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
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
  }, [cursorX, cursorY, rawMouseX, rawMouseY]);

  if (!mounted) return null;

  const isTextHover = hoveredEl?.type === "text";
  const isLinkHover = hoveredEl?.type === "link";

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer trailing spring circle / snapped card */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: snappedRect ? snappedRect.width + 12 : (isTextHover ? 80 : 20),
          height: snappedRect ? snappedRect.height + 12 : (isTextHover ? 80 : 20),
          borderRadius: snappedRect ? "8px" : "50%",
          backgroundColor: isTextHover ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0)",
          border: snappedRect 
            ? "2px solid #ff1e90" 
            : (isTextHover ? "0px solid transparent" : "1.5px solid rgba(0, 0, 0, 0.45)"),
          mixBlendMode: (snappedRect || isTextHover) ? "normal" : "difference",
          borderColor: snappedRect ? "#ff1e90" : (isLinkHover ? "rgba(255, 30, 144, 0.85)" : "rgba(255, 255, 255, 0.95)"),
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.1 }}
        className="fixed flex items-center justify-center pointer-events-none"
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
          x: rawMouseX,
          y: rawMouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: snappedRect ? 0.35 : (isTextHover ? 0 : 1.0),
          opacity: isTextHover ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="fixed w-2 h-2 bg-[#ff1e90] rounded-full mix-blend-difference pointer-events-none"
      />
    </div>
  );
}

export default CustomCursor;
