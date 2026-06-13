"use client";

import { useEffect, useCallback } from "react";

// Web Audio API Synthesizer for high-fidelity mechanical click/hover sounds
export function playTickSound(pitch: number = 800, duration: number = 0.03, volume: number = 0.008) {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.1, ctx.currentTime + duration);
    
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.01);
  } catch {
    // Suppress audio context autoplay restrictions
  }
}

export function useAudioFeedback() {
  const triggerTick = useCallback((pitch?: number, duration?: number, volume?: number) => {
    playTickSound(pitch, duration, volume);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest(".interactive")) {
        // High pitch soft hover tick
        playTickSound(1100, 0.015, 0.003);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest(".interactive")) {
        // Mid-low click tick
        playTickSound(550, 0.04, 0.01);
      }
    };

    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return { triggerTick };
}
