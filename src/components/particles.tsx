"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  color?: string;
  refresh?: boolean;
}

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  translateValX: number;
  translateValY: number;
}

export function Particles({
  className = "",
  quantity = 80,
  staticity = 40,
  ease = 40,
  color = "#000000",
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circleRef = useRef<Particle[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const rgbRef = useRef<{ r: number; g: number; b: number }>({ r: 0, g: 0, b: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  // Pre-parse the color string once outside the drawing loop
  useEffect(() => {
    if (color.startsWith("#")) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      rgbRef.current = { r, g, b };
    } else {
      const match = color.match(/\d+/g);
      if (match && match.length >= 3) {
        rgbRef.current = {
          r: parseInt(match[0], 10),
          g: parseInt(match[1], 10),
          b: parseInt(match[2], 10),
        };
      } else {
        rgbRef.current = { r: 0, g: 0, b: 0 };
      }
    }
  }, [color]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) * dpr;
      mouse.current.y = (e.clientY - rect.top) * dpr;
    }
  }, [dpr]);

  const drawCircle = useCallback((circle: Particle, update = false) => {
    if (context.current) {
      const { x, y, translateValX, translateValY, size, alpha } = circle;
      context.current.translate(translateValX, translateValY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      
      const { r, g, b } = rgbRef.current;
      context.current.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circleRef.current.push(circle);
      }
    }
  }, [dpr]);

  const drawParticles = useCallback(() => {
    circleRef.current = [];
    const w = canvasSize.current.w;
    const h = canvasSize.current.h;
    for (let i = 0; i < quantity; i++) {
      const circle = {
        x: Math.random() * w,
        y: Math.random() * h,
        dx: (Math.random() - 0.5) * 0.1,
        dy: (Math.random() - 0.5) * 0.1,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.15,
        targetAlpha: Math.random() * 0.5 + 0.15,
        translateValX: 0,
        translateValY: 0,
      };
      drawCircle(circle);
    }
  }, [quantity, drawCircle]);

  const resizeCanvas = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circleRef.current = [];
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  }, [dpr]);

  const initCanvas = useCallback(() => {
    resizeCanvas();
    drawParticles();
  }, [resizeCanvas, drawParticles]);

  const animateRef = useRef<() => void>(() => {});

  useEffect(() => {
    animateRef.current = () => {
      if (context.current && canvasRef.current) {
        context.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        circleRef.current.forEach((circle: Particle) => {
          const dx = mouse.current.x / dpr - (circle.x + circle.translateValX);
          const dy = mouse.current.y / dpr - (circle.y + circle.translateValY);
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const force = (100 - dist) / 100;
          if (force > 0) {
            circle.translateValX -= (dx / dist) * force * (circle.size / staticity) * ease;
            circle.translateValY -= (dy / dist) * force * (circle.size / staticity) * ease;
          } else {
            circle.translateValX *= 0.95;
            circle.translateValY *= 0.95;
          }

          circle.x += circle.dx;
          circle.y += circle.dy;

          if (circle.x < 0 || circle.x > canvasSize.current.w) circle.dx = -circle.dx;
          if (circle.y < 0 || circle.y > canvasSize.current.h) circle.dy = -circle.dy;

          drawCircle(circle, true);
        });
        requestAnimationFrame(animateRef.current);
      }
    };
  }, [dpr, staticity, ease, drawCircle]);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animateRef.current();
    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, [color, initCanvas]);

  useEffect(() => {
    initCanvas();
  }, [refresh, initCanvas]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove]);

  return (
    <div
      ref={canvasContainerRef}
      className={`absolute inset-0 -z-10 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Particles;
