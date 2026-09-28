"use client";

import React, { useEffect, useRef, useState } from "react";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    // Disable on touch devices or if user prefers reduced motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) return;

    let mouseX = -100;
    let mouseY = -100;
    let targetX = -100;
    let targetY = -100;
    let rafId = 0;

    let hoveredState = false;
    let inputHoveredState = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetX = mouseX;
      targetY = mouseY;
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;

      // Check if hovering over text inputs/textareas to restore standard I-beam
      const isTextInput = !!target?.closest("input, textarea, select, [contenteditable='true']");
      if (isTextInput !== inputHoveredState) {
        inputHoveredState = isTextInput;
        setIsInputHovered(isTextInput);
      }

      // Check if hovering over interactive element
      const interactive = !!target?.closest(
        "button, a, [role='button'], .interactive, .cursor-pointer, [data-cursor-hover]"
      );
      if (interactive !== hoveredState) {
        hoveredState = interactive;
        setIsHovered(interactive);
        if (interactive) {
          playTickSound(780, 0.02, 0.008);
        }
      }
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // 60-120fps hardware-accelerated transform loop
    const render = () => {
      if (cursorRef.current) {
        // Offset so the sharp tip (at coordinates 6,6 in 100x170 viewBox -> ~2.6px, 2.2px) matches mouse pointer
        cursorRef.current.style.transform = `translate3d(${targetX - 2.6}px, ${targetY - 2.2}px, 0)`;
      }
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  return (
    <>
      {/* Hide native cursor globally on fine-pointer devices, restore on text inputs */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (pointer: fine) {
              body, body * {
                cursor: none !important;
              }
              input, textarea, select, [contenteditable="true"] {
                cursor: text !important;
              }
            }
          `,
        }}
      />

      <div
        className={`fixed inset-0 pointer-events-none z-[999999] transition-opacity duration-200 ${
          visible && !isInputHovered ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 pointer-events-none will-change-transform"
          style={{ transformOrigin: "2.6px 2.2px" }}
        >
          {/* Enlarged Iconic Mac Pointer */}
          <div
            className={`transition-transform duration-150 ease-out will-change-transform ${
              isPressed
                ? "scale-[0.88]"
                : isHovered
                ? "scale-[1.18]"
                : "scale-100"
            }`}
            style={{ transformOrigin: "2.6px 2.2px" }}
          >
            <svg
              width="42"
              height="60"
              viewBox="0 0 100 170"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.42)]"
            >
              <path
                d="M 6 6 L 6 130 L 32 104 L 57 164 L 79 154 L 55 96 L 94 96 Z"
                fill="#000000"
                stroke="#FFFFFF"
                strokeWidth="7"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default MagneticCursor;
