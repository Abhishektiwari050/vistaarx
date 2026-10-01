"use client";

import React, { useState, useEffect } from "react";
import { Box, Play, Pause, Compass, Layers, RefreshCw, Cpu, Activity } from "lucide-react";

export function SpatialGimbalMotion({ className = "" }: { className?: string }) {
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(60.0);
  const [drawCalls, setDrawCalls] = useState<number>(14);
  const [quaternion, setQuaternion] = useState({
    w: 0.7071,
    x: 0.5,
    y: 0.5,
    z: 0.0,
  });

  // Small live telemetry fluctuation to simulate realistic WebGL profiler
  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setFps(Number((59.8 + Math.random() * 0.4).toFixed(1)));
      const time = Date.now() * 0.001;
      setQuaternion({
        w: Number(Math.cos(time * 0.3).toFixed(4)),
        x: Number((Math.sin(time * 0.3) * 0.7071).toFixed(4)),
        y: Number((Math.sin(time * 0.2) * 0.5).toFixed(4)),
        z: Number((Math.cos(time * 0.4) * 0.5).toFixed(4)),
      });
    }, 400);
    return () => clearInterval(interval);
  }, [isRotating]);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-black/15 bg-[#080A10] text-white shadow-xl ${className}`}
    >
      {/* Top Header & Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-black/70 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E60E6] animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider uppercase text-neutral-200">
              60 FPS SPATIAL GIMBAL ENGINE
            </span>
          </div>

          <span className="hidden sm:inline-block px-2 py-0.5 rounded font-mono text-[10px] bg-blue-500/10 text-blue-300 border border-blue-500/20">
            PROJECTION: 4x4 AFFINE
          </span>
        </div>

        {/* Interactive Controls */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => setWireframe((prev) => !prev)}
            className={`px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 cursor-pointer ${
              wireframe
                ? "bg-blue-500/20 border-blue-400 text-blue-200"
                : "bg-white/10 hover:bg-white/20 border-white/15 text-neutral-300"
            }`}
            title="Toggle coordinate wireframe"
          >
            <Layers className="w-3 h-3 text-[#1E60E6]" />
            <span>{wireframe ? "WIREFRAME" : "SOLID"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsRotating((prev) => !prev)}
            className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/15 text-neutral-300 transition-colors flex items-center gap-1 cursor-pointer"
            title={isRotating ? "Pause rotation" : "Resume rotation"}
          >
            {isRotating ? (
              <>
                <Pause className="w-3 h-3 text-amber-400" />
                <span>FREEZE</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                <span>ORBIT</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3D Gimbal Depiction Stage */}
      <div className="relative w-full aspect-[21/9] min-h-[280px] sm:min-h-[340px] max-h-[440px] flex items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-[#080A10] via-[#0E121E] to-[#080A10]">
        {/* Spatial Grid */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(30,96,230,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,96,230,0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient Center Glow */}
        <div className="absolute w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        {/* Gimbal SVG Visualization */}
        <svg
          viewBox="0 0 500 320"
          className="w-full h-full max-w-[800px] select-none"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="ringGradYaw" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E60E6" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1E60E6" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="ringGradPitch" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#34D399" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="ringGradRoll" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF3823" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#F87171" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF3823" stopOpacity="0.1" />
            </linearGradient>

            <filter id="gimbalGlow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Coordinate Crosshairs */}
          <line x1="70" y1="160" x2="430" y2="160" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <line x1="250" y1="30" x2="250" y2="290" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

          {/* Origin Pivot Point */}
          <g transform="translate(250, 160)">
            {/* Outer Gimbal Ring (Yaw - Z Axis, Blue) */}
            <g
              style={{
                animation: isRotating ? "gimbalYaw 18s linear infinite" : undefined,
                transformOrigin: "0 0",
              }}
            >
              <ellipse
                cx="0"
                cy="0"
                rx="120"
                ry="120"
                fill="none"
                stroke="url(#ringGradYaw)"
                strokeWidth={wireframe ? "1.2" : "2"}
                strokeDasharray={wireframe ? "4 3" : undefined}
                filter="url(#gimbalGlow)"
              />
              {/* Yaw Axis Markers */}
              <circle cx="120" cy="0" r="3.5" fill="#60A5FA" />
              <circle cx="-120" cy="0" r="3.5" fill="#60A5FA" />
              <text x="128" y="4" fill="#93C5FD" fontSize="8" fontFamily="monospace">
                YAW (Z)
              </text>
            </g>

            {/* Middle Gimbal Ring (Pitch - X Axis, Green) */}
            <g
              style={{
                animation: isRotating ? "gimbalPitch 12s ease-in-out infinite alternate" : undefined,
                transformOrigin: "0 0",
              }}
            >
              <ellipse
                cx="0"
                cy="0"
                rx="92"
                ry="58"
                fill="none"
                stroke="url(#ringGradPitch)"
                strokeWidth={wireframe ? "1.2" : "2"}
                strokeDasharray={wireframe ? "4 3" : undefined}
                filter="url(#gimbalGlow)"
              />
              {/* Pitch Axis Markers */}
              <circle cx="0" cy="58" r="3" fill="#34D399" />
              <circle cx="0" cy="-58" r="3" fill="#34D399" />
              <text x="6" y="-62" fill="#6EE7B7" fontSize="8" fontFamily="monospace">
                PITCH (X)
              </text>
            </g>

            {/* Inner Gimbal Ring (Roll - Y Axis, Red) */}
            <g
              style={{
                animation: isRotating ? "gimbalRoll 8s ease-in-out infinite alternate-reverse" : undefined,
                transformOrigin: "0 0",
              }}
            >
              <ellipse
                cx="0"
                cy="0"
                rx="42"
                ry="68"
                fill="none"
                stroke="url(#ringGradRoll)"
                strokeWidth={wireframe ? "1.2" : "2"}
                strokeDasharray={wireframe ? "3 2" : undefined}
                filter="url(#gimbalGlow)"
              />
              <circle cx="42" cy="0" r="2.5" fill="#F87171" />
              <circle cx="-42" cy="0" r="2.5" fill="#F87171" />
              <text x="46" y="-4" fill="#FCA5A5" fontSize="8" fontFamily="monospace">
                ROLL (Y)
              </text>
            </g>

            {/* Center Core: Spatial Vector Matrix */}
            <circle cx="0" cy="0" r="12" fill="#0E121E" stroke="#60A5FA" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" fill="#FFF" className="animate-pulse" />

            {/* Orthogonal Normal Vector Pointer */}
            <g
              style={{
                animation: isRotating ? "vectorSwing 6s ease-in-out infinite alternate" : undefined,
              }}
            >
              <line x1="0" y1="0" x2="35" y2="-45" stroke="#FFF" strokeWidth="1.8" />
              <polygon points="35,-45 28,-36 39,-38" fill="#FFF" />
              <text x="40" y="-48" fill="#FFF" fontSize="9" fontFamily="monospace" fontWeight="600">
                N(vec3)
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Telemetry Dashboard Readouts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-black/75 border-t border-white/10 text-xs font-mono">
        <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            REFRESH RATE
          </span>
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            {fps} FPS (LOCKED)
          </span>
        </div>

        <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            BATCH DRAW CALLS
          </span>
          <span className="font-semibold text-white">
            {drawCalls} CALLS / FRAME
          </span>
        </div>

        <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            QUATERNION MATRIX
          </span>
          <span className="font-semibold text-blue-400">
            [{quaternion.w}, {quaternion.x}]
          </span>
        </div>

        <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            GPU MEMORY HYDRATION
          </span>
          <span className="font-semibold text-neutral-200">
            &lt; 14.2 MB TEXTURES
          </span>
        </div>
      </div>

      {/* CSS Keyframes for Gimbal Motion */}
      <style jsx>{`
        @keyframes gimbalYaw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes gimbalPitch {
          0% {
            transform: rotate(-25deg) scaleY(0.7);
          }
          50% {
            transform: rotate(20deg) scaleY(1.1);
          }
          100% {
            transform: rotate(-25deg) scaleY(0.7);
          }
        }
        @keyframes gimbalRoll {
          0% {
            transform: rotate(45deg) scaleX(0.8);
          }
          50% {
            transform: rotate(-35deg) scaleX(1.15);
          }
          100% {
            transform: rotate(45deg) scaleX(0.8);
          }
        }
        @keyframes vectorSwing {
          0% {
            transform: rotate(-15deg);
          }
          100% {
            transform: rotate(25deg);
          }
        }
      `}</style>
    </div>
  );
}
