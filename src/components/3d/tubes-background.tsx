"use client";

import React, { useEffect, useRef, useState } from "react";

// Helper for generating random colors
const randomColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"));
};

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true,
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tubesRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // Safe runtime dynamic import bypassing Webpack/Turbopack compile-time resolution
        const dynamicImport = new Function("url", "return import(url)");
        const module = await dynamicImport(
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
        );
        const TubesCursor = module.default;

        if (!mounted) return;

        // Custom palette matching Vistar's brand guidelines (Pink, Lime Green, Black)
        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#ff1e90", "#d8ff42", "#000000"],
            lights: {
              intensity: 220,
              colors: ["#d8ff42", "#ff1e90", "#00e1ff", "#7000ff"],
            },
          },
        });

        tubesRef.current = app;
        setIsLoaded(true);

        cleanup = () => {
          // Clean up standard Three.js canvas components if exposed
          if (app && typeof app.destroy === "function") {
            app.destroy();
          } else if (app && app.tubes && typeof app.tubes.destroy === "function") {
            app.tubes.destroy();
          }
        };
      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  // Global window click listener to randomize colors without blocking pointer events
  useEffect(() => {
    if (!enableClickInteraction) return;

    const handleGlobalClick = () => {
      if (!tubesRef.current) return;

      const colors = randomColors(3);
      const lightsColors = randomColors(4);

      try {
        if (tubesRef.current.tubes && typeof tubesRef.current.tubes.setColors === "function") {
          tubesRef.current.tubes.setColors(colors);
        }
        if (tubesRef.current.tubes && typeof tubesRef.current.tubes.setLightsColors === "function") {
          tubesRef.current.tubes.setLightsColors(lightsColors);
        }
      } catch (err) {
        console.warn("Failed to set randomized colors on click:", err);
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, [enableClickInteraction]);

  return (
    <div className={`relative w-full h-full ${className || ""}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ touchAction: "none" }}
      />
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
}

export default TubesBackground;
