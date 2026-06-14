"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
}

export function AuroraBackground({ className }: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    
    // Check reduced motion settings
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Normalize mouse coordinates to [-1, 1] relative to center
      mouseRef.current.targetX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseRef.current.targetY = ((e.clientY - rect.top) / height) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Particles/beams parameters
    const beams: { angle: number; speed: number; width: number; opacity: number; length: number }[] = [];
    for (let i = 0; i < 6; i++) {
      beams.push({
        angle: (i / 6) * Math.PI * 2,
        speed: (0.002 + Math.random() * 0.003) * (Math.random() > 0.5 ? 1 : -1),
        width: 0.15 + Math.random() * 0.2,
        opacity: 0.08 + Math.random() * 0.08,
        length: 0.6 + Math.random() * 0.4,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      if (!prefersReducedMotion) {
        time += 0.004;
      }

      // Base background color (warm off-white)
      ctx.fillStyle = "#faf9f5";
      ctx.fillRect(0, 0, width, height);

      // Draw dot grid pattern in background
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
      const dotSpacing = 20;
      for (let x = 0; x < width; x += dotSpacing) {
        for (let y = 0; y < height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── 1. AURORA GRADIENT ORBS ──
      // Orb 1: Pink (#ff1e90)
      const pinkX = width * 0.3 + Math.sin(time * 1.5) * width * 0.1 + mouse.x * 30;
      const pinkY = height * 0.4 + Math.cos(time * 1.2) * height * 0.08 + mouse.y * 30;
      const pinkRadius = Math.min(width, height) * 0.6;
      
      const pinkGrad = ctx.createRadialGradient(pinkX, pinkY, 0, pinkX, pinkY, pinkRadius);
      pinkGrad.addColorStop(0, "rgba(255, 30, 144, 0.07)");
      pinkGrad.addColorStop(0.5, "rgba(255, 30, 144, 0.02)");
      pinkGrad.addColorStop(1, "rgba(255, 30, 144, 0)");
      
      ctx.fillStyle = pinkGrad;
      ctx.beginPath();
      ctx.arc(pinkX, pinkY, pinkRadius, 0, Math.PI * 2);
      ctx.fill();

      // Orb 2: Lime Green (#d8ff42)
      const limeX = width * 0.7 + Math.cos(time * 0.9) * width * 0.12 + mouse.x * -40;
      const limeY = height * 0.5 + Math.sin(time * 1.4) * height * 0.06 + mouse.y * -40;
      const limeRadius = Math.min(width, height) * 0.7;
      
      const limeGrad = ctx.createRadialGradient(limeX, limeY, 0, limeX, limeY, limeRadius);
      limeGrad.addColorStop(0, "rgba(216, 255, 66, 0.12)");
      limeGrad.addColorStop(0.5, "rgba(216, 255, 66, 0.03)");
      limeGrad.addColorStop(1, "rgba(216, 255, 66, 0)");
      
      ctx.fillStyle = limeGrad;
      ctx.beginPath();
      ctx.arc(limeX, limeY, limeRadius, 0, Math.PI * 2);
      ctx.fill();

      // ── 2. DYNAMIC LIGHT BEAMS ──
      // Beams emanate from the bottom center
      const centerX = width / 2 + mouse.x * 60;
      const centerY = height + 100;
      
      beams.forEach((beam) => {
        if (!prefersReducedMotion) {
          beam.angle += beam.speed;
        }
        
        // Sway the beam slightly
        const currentAngle = -Math.PI / 2 + Math.sin(beam.angle + time) * 0.25;
        
        const grad = ctx.createLinearGradient(
          centerX,
          centerY,
          centerX + Math.cos(currentAngle) * height * beam.length,
          centerY + Math.sin(currentAngle) * height * beam.length
        );
        
        // Fading out as it goes up
        grad.addColorStop(0, `rgba(255, 30, 144, ${beam.opacity * 0.8})`);
        grad.addColorStop(0.4, `rgba(216, 255, 66, ${beam.opacity * 0.4})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        
        // Draw wedge shape for the beam
        const leftAngle = currentAngle - beam.width / 2;
        const rightAngle = currentAngle + beam.width / 2;
        const radius = height * 1.5;
        
        ctx.lineTo(centerX + Math.cos(leftAngle) * radius, centerY + Math.sin(leftAngle) * radius);
        ctx.lineTo(centerX + Math.cos(rightAngle) * radius, centerY + Math.sin(rightAngle) * radius);
        ctx.closePath();
        ctx.fill();
      });

      // Subtle vignetting overlay for high contrast editorial border look
      const vignette = ctx.createRadialGradient(width / 2, height / 2, Math.max(width, height) * 0.4, width / 2, height / 2, Math.max(width, height) * 0.8);
      vignette.addColorStop(0, "rgba(250, 249, 245, 0)");
      vignette.addColorStop(1, "rgba(250, 249, 245, 0.35)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

export default AuroraBackground;
