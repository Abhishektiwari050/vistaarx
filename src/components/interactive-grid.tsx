"use client";

import React, { useState, useEffect } from "react";

function GridCell() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => setActive(false), 800);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div
      onMouseEnter={() => setActive(true)}
      className="aspect-square border-[0.5px] border-zinc-200/5 transition-all duration-700 ease-out"
      style={{
        backgroundColor: active ? "rgba(216, 255, 66, 0.25)" : "transparent",
        boxShadow: active ? "0 0 10px rgba(216, 255, 66, 0.15)" : "none",
      }}
    />
  );
}

export function InteractiveGrid({ className = "" }: { className?: string }) {
  const [cellCount, setCellCount] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Calculate how many cells we need to fill the screen
      const cols = Math.ceil(w / 40);
      const rows = Math.ceil(h / 40);
      setCellCount(cols * rows);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`grid w-full h-full pointer-events-auto select-none ${className}`}
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))",
      }}
    >
      {Array.from({ length: cellCount }).map((_, i) => (
        <GridCell key={i} />
      ))}
    </div>
  );
}

export default InteractiveGrid;
