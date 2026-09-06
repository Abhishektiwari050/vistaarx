"use client";

import { useEffect, useCallback } from "react";

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!sharedAudioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        sharedAudioCtx = new AudioContextClass();
      }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

// Web Audio API Synthesizer for high-fidelity mechanical click/hover sounds
export function playTickSound(pitch: number = 800, duration: number = 0.03, volume: number = 0.008) {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
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

// Low-frequency tactile tension drone for preloader
export function playTensionDrone(duration: number = 1.2, volume: number = 0.015) {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(55, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + duration);
    
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(180, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + duration);
    
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.05);
  } catch {
    // Suppress audio context autoplay restrictions
  }
}

// Tactile rupture/tear sound synthesized with noise burst + sub snap
export function playTearSnapSound(volume: number = 0.025) {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    // Low sub snap
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(160, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.12);
    oscGain.gain.setValueAtTime(volume * 1.2, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.12);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);

    // Textured tear friction noise
    const bufferSize = Math.floor(ctx.sampleRate * 0.18);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(800, ctx.currentTime);
    noiseFilter.Q.setValueAtTime(1.5, ctx.currentTime);
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(volume, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.18);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start();
    noise.stop(ctx.currentTime + 0.2);
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
