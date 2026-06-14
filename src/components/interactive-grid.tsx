"use client";

import React, { useRef, useEffect } from "react";

interface InteractiveGridProps {
  className?: string;
  cellSize?: number;
  gridColor?: string;
  glowColor?: string;
}

export function InteractiveGrid({
  className = "",
  cellSize = 40,
  gridColor = "rgba(10, 10, 10, 0.03)",
  glowColor = "rgba(216, 255, 66, 0.25)",
}: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<{ [key: string]: number }>({});
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    const resize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Parse the glowColor string to extract rgb numbers for interpolation
    let rgbGlow = "216, 255, 66";
    const rgbMatch = glowColor.match(/\d+,\s*\d+,\s*\d+/);
    if (rgbMatch) {
      rgbGlow = rgbMatch[0];
    }

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / cellSize);
      const rows = Math.ceil(h / cellSize);

      // Determine active cell under cursor
      const mouseCol = Math.floor(mouseRef.current.x / cellSize);
      const mouseRow = Math.floor(mouseRef.current.y / cellSize);

      if (mouseCol >= 0 && mouseCol < cols && mouseRow >= 0 && mouseRow < rows) {
        const key = `${mouseCol},${mouseRow}`;
        cellsRef.current[key] = 1.0; // max opacity
      }

      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const key = `${c},${r}`;
          const opacity = cellsRef.current[key] || 0;

          if (opacity > 0) {
            // Draw glowing active cell
            ctx.fillStyle = `rgba(${rgbGlow}, ${opacity * 0.25})`;
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);

            // Decay cell illumination smoothly (~800ms)
            cellsRef.current[key] = opacity - 0.02;
          }

          // Draw wireframe grid lines
          ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
      }

      // Evict expired grid states
      Object.keys(cellsRef.current).forEach((key) => {
        if (cellsRef.current[key] <= 0) {
          delete cellsRef.current[key];
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cellSize, gridColor, glowColor]);

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}

export default InteractiveGrid;
