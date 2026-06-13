"use client";

/**
 * Shared backdrop overlay for sub-pages.
 * Replaces 4 identical copies across contact, work, philosophy, vectors.
 */
export function ThemeOverlay() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none transition-colors duration-500 theme-overlay theme-overlay-neon-flyer"
      aria-hidden="true"
    />
  );
}
