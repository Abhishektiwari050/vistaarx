"use client";

import { create } from "zustand";

export type ThemeType = "cyber-light" | "cyber-dark" | "mono" | "solar";

interface ScrollStore {
  /** Normalized scroll progress from 0.0 (top) to 1.0 (bottom) */
  scrollProgress: number;
  /** Raw scroll Y position in pixels */
  scrollY: number;
  /** Scroll velocity in pixels per second */
  scrollVelocity: number;
  /** Normalized cursor X position from -1 to 1 (center = 0) */
  cursorX: number;
  /** Normalized cursor Y position from -1 to 1 (center = 0) */
  cursorY: number;
  /** Active dynamic design theme profile */
  theme: ThemeType;
  
  /** Current active routing path */
  activeRoute: string;
  /** Counter/trigger to fire the 3D watercolor shower transition */
  showerTrigger: number;
  /** Application loading state */
  isLoaded: boolean;

  // Actions
  setScrollProgress: (progress: number) => void;
  setScrollY: (y: number) => void;
  setScrollVelocity: (velocity: number) => void;
  setCursor: (x: number, y: number) => void;
  setTheme: (theme: ThemeType) => void;
  setActiveRoute: (route: string) => void;
  triggerShower: () => void;
  setLoaded: (val: boolean) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  scrollProgress: 0,
  scrollY: 0,
  scrollVelocity: 0,
  cursorX: 0,
  cursorY: 0,
  theme: "cyber-light",
  activeRoute: "/",
  showerTrigger: 0,
  isLoaded: false,

  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setScrollY: (y) => set({ scrollY: y }),
  setScrollVelocity: (velocity) => set({ scrollVelocity: velocity }),
  setCursor: (x, y) => set({ cursorX: x, cursorY: y }),
  setTheme: (theme) => set({ theme }),
  setActiveRoute: (route) => set({ activeRoute: route }),
  triggerShower: () => set((state) => ({ showerTrigger: state.showerTrigger + 1 })),
  setLoaded: (val) => set({ isLoaded: val }),
}));

/**
 * Direct getters for use inside useFrame loops.
 * These bypass React subscriptions entirely to avoid re-renders on high-frequency events.
 */
export const getScrollProgress = () => useScrollStore.getState().scrollProgress;
export const getScrollY = () => useScrollStore.getState().scrollY;
export const getScrollVelocity = () => useScrollStore.getState().scrollVelocity;
export const getTheme = () => useScrollStore.getState().theme;

export const getThemeColors = () => {
  const theme = useScrollStore.getState().theme;
  if (theme === "mono") {
    // Elegant pure black and subtle gray for high-end monochrome aesthetic
    return { primary: "#000000", secondary: "#737373", base: "#111111" };
  }
  if (theme === "solar") {
    // Flaring solar orange and brilliant gold
    return { primary: "#ff5500", secondary: "#ffcc00", base: "#0c0502" };
  }
  if (theme === "cyber-light") {
    // Premium satin off-white marble body for light theme with vibrant neon accents
    return { primary: "#ff0080", secondary: "#ccff00", base: "#e2e2e8" };
  }
  // Cyber Dark (Neon Pink & Lime on deep charcoal black)
  return { primary: "#ff0080", secondary: "#ccff00", base: "#08080a" };
};

export const getCursor = () => {
  const state = useScrollStore.getState();
  return { x: state.cursorX, y: state.cursorY };
};

export const getActiveRoute = () => useScrollStore.getState().activeRoute;
export const getShowerTrigger = () => useScrollStore.getState().showerTrigger;
