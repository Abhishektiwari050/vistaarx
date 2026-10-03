"use client";

import React, { useState } from "react";
import { CloudShader } from "@/components/ui/cloud-shader";
import { Compass, CloudSun, Wind, Plane, Sliders } from "lucide-react";

export function CloudShaderDemo() {
  const [speed, setSpeed] = useState(1);
  const [count, setCount] = useState(5);
  const [preset, setPreset] = useState<"daylight" | "sunset" | "dawn" | "storm">("daylight");

  const presets = {
    daylight: {
      cloudColor: "#fbf8f2",
      skyTopColor: "#3876ba",
      skyBottomColor: "#8cbfe8",
    },
    sunset: {
      cloudColor: "#ffd6ba",
      skyTopColor: "#4a154b",
      skyBottomColor: "#e65c00",
    },
    dawn: {
      cloudColor: "#fff0f5",
      skyTopColor: "#1a2a6c",
      skyBottomColor: "#b21f1f",
    },
    storm: {
      cloudColor: "#757f9a",
      skyTopColor: "#1f2937",
      skyBottomColor: "#4b5563",
    },
  };

  const currentTheme = presets[preset];

  return (
    <div className="relative w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden border border-black/15 shadow-xl bg-neutral-900 group">
      {/* Background Cloud WebGL Shader */}
      <CloudShader
        className="h-full w-full"
        speed={speed}
        count={count}
        cloudColor={currentTheme.cloudColor}
        skyTopColor={currentTheme.skyTopColor}
        skyBottomColor={currentTheme.skyBottomColor}
      >
        {/* Aviation HUD Overlay */}
        <div className="w-full h-full p-6 md:p-10 flex flex-col justify-between pointer-events-none select-none">
          {/* Top Flight Telemetry Bar */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-xs">
              <Plane className="w-4 h-4 text-sky-400" />
              <span>PROJECT VAYU &bull; LIVE ATMOSPHERIC DRIFT</span>
            </div>

            <div className="hidden sm:flex items-center gap-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Wind className="w-3.5 h-3.5" />
                <span>FL320 WINDS 280/45KT</span>
              </span>
              <span className="text-white/30">|</span>
              <span className="flex items-center gap-1.5 text-sky-300">
                <Compass className="w-3.5 h-3.5" />
                <span>HDG 084&deg;</span>
              </span>
            </div>
          </div>

          {/* Center Title Card */}
          <div className="text-center max-w-xl mx-auto space-y-3 pointer-events-auto bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/15 text-white shadow-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 text-white/90 font-mono text-[11px] uppercase tracking-wider">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>WebGL 3D Volumetric Billow Shader</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
              Pre-Flight Atmospheric Modeling
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
              Domain-warped billow noise approximating self-shadowing and Rayleigh scattering over real-time vector flight corridors.
            </p>
          </div>

          {/* Bottom Interactive Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pointer-events-auto bg-black/60 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-white/20 text-white text-xs font-mono">
            {/* Presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-white/50 uppercase text-[10px] tracking-wider pr-1">ATMOSPHERE:</span>
              {(["daylight", "sunset", "dawn", "storm"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPreset(p)}
                  className={`px-2.5 py-1 rounded text-[11px] capitalize transition-all cursor-pointer ${
                    preset === p
                      ? "bg-white text-black font-semibold shadow-xs"
                      : "bg-white/10 hover:bg-white/20 text-white/80"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Speed & Cloud Count Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-white/60">Speed:</span>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.2"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-20 accent-sky-400 cursor-pointer"
                />
                <span className="w-8 text-right text-sky-400 font-semibold">{speed}x</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-white/60">Density:</span>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value, 10))}
                  className="w-16 accent-sky-400 cursor-pointer"
                />
                <span className="w-4 text-sky-400 font-semibold">{count}</span>
              </div>
            </div>
          </div>
        </div>
      </CloudShader>
    </div>
  );
}

export default CloudShaderDemo;
