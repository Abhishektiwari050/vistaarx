"use client";

import { useEffect, useRef } from "react";
import createGlobe, { COBEOptions } from "cobe";

export function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 450 * 2,
      height: 450 * 2,
      phi: 0,
      theta: 0.25,
      dark: 0, // light theme background
      diffuse: 1.25,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.98, 0.98, 0.96], // matches bg-[#faf9f5]
      markerColor: [1.0, 0.12, 0.56],   // Neon pink [#ff1e90]
      glowColor: [0.9, 0.9, 0.9],
      markers: [
        { location: [28.61, 77.20], size: 0.08 }, // New Delhi (Studio HQ)
        { location: [35.67, 139.65], size: 0.05 }, // Tokyo (Inspiration Garden Eight)
        { location: [37.77, -122.41], size: 0.05 }, // San Francisco (US Clients)
        { location: [51.50, -0.12], size: 0.05 }, // London (UK Clients)
      ],
      onRender: (state: Record<string, number>) => {
        state.phi = phi;
        phi += 0.004; // smooth slow rotation
      },
    } as unknown as COBEOptions);

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative select-none pointer-events-none">
      <canvas
        ref={canvasRef}
        style={{
          width: 450,
          height: 450,
          maxWidth: "100%",
          aspectRatio: "1",
        }}
        className="interactive"
      />
    </div>
  );
}

export default CobeGlobe;
