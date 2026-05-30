"use client";

import { useScrollStore } from "@/lib/stores/scroll-store";

/**
 * Shared backdrop overlay for sub-pages.
 * Replaces 4 identical copies across contact, work, philosophy, vectors.
 */
export function ThemeOverlay() {
  const theme = useScrollStore((s) => s.theme);

  const bgColor = {
    "cyber-light": "rgba(245, 245, 247, 0.88)",
    "cyber-dark": "rgba(8, 8, 10, 0.85)",
    mono: "rgba(255, 255, 255, 0.92)",
    solar: "rgba(12, 5, 2, 0.85)",
  }[theme];

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none transition-colors duration-500"
      style={{ backgroundColor: bgColor, backdropFilter: "blur(12px)" }}
      aria-hidden="true"
    />
  );
}
