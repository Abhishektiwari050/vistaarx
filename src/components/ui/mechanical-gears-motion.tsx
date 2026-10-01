"use client";

import React, { useState } from "react";
import { Play, Pause, Zap, CheckCircle2, RotateCw, AlertTriangle, ShieldCheck, Cpu } from "lucide-react";

interface MechanicalGearsMotionProps {
  mode?: "vistar" | "agency";
  className?: string;
  onSelectStage?: (stageIndex: number) => void;
  activeStage?: number;
}

interface GearSpec {
  id: string;
  name: string;
  code: string;
  teeth: number;
  pitchRadius: number;
  cx: number;
  cy: number;
  color: string;
  accentColor: string;
  direction: "cw" | "ccw";
  speedSec: number;
  initialAngle: number;
  stageIndex: number;
  description: string;
  rpm: number;
}

// Module m = 3.2
// Gear 1 (Spec): N=14, R=44.8, cx=110, cy=180
// Gear 2 (Sprint Engine): N=28, R=89.6, cx=110 + 44.8 + 89.6 = 244.4, cy=180
// Gear 3 (QA Verifier): N=20, R=64.0, cx=244.4 + 89.6 + 64.0 = 398.0, cy=180
// Gear 4 (IP Transfer): N=14, R=44.8, cx=398.0 + 64.0 + 44.8 = 506.8, cy=180
const MODULE = 3.2;

const GEARS: GearSpec[] = [
  {
    id: "gear-1",
    name: "Architecture Scoping",
    code: "STAGE 01 // SPEC-14T",
    teeth: 14,
    pitchRadius: 14 * MODULE, // 44.8
    cx: 95,
    cy: 160,
    color: "#27272A",
    accentColor: "#FF3823",
    direction: "cw",
    speedSec: 8, // 14 teeth: 8s per rev
    initialAngle: 0,
    stageIndex: 0,
    description: "48-Hour Interface Contracts & Architecture Scoping",
    rpm: 45,
  },
  {
    id: "gear-2",
    name: "14-Day Sprint Engine",
    code: "STAGE 02 // SPRINT-28T",
    teeth: 28,
    pitchRadius: 28 * MODULE, // 89.6
    cx: 95 + 14 * MODULE + 28 * MODULE, // 229.4
    cy: 160,
    color: "#18181B",
    accentColor: "#3B82F6",
    direction: "ccw",
    speedSec: 16, // 28 teeth: 16s per rev (ratio 2:1)
    initialAngle: 180 / 28, // Offset to mesh teeth into gaps
    stageIndex: 1,
    description: "Continuous 14-Day Production Engineering Velocity",
    rpm: 22.5,
  },
  {
    id: "gear-3",
    name: "Automated QA & Security",
    code: "STAGE 03 // VERIFY-20T",
    teeth: 20,
    pitchRadius: 20 * MODULE, // 64.0
    cx: 229.4 + 28 * MODULE + 20 * MODULE, // 383.0
    cy: 160,
    color: "#27272A",
    accentColor: "#10B981",
    direction: "cw",
    speedSec: 11.43, // 20 teeth: (20/28)*16 = 11.43s per rev
    initialAngle: 180 / 20 + 2.5, // Alignment offset
    stageIndex: 2,
    description: "Deterministic Test Suites & Air-Gapped Security",
    rpm: 31.5,
  },
  {
    id: "gear-4",
    name: "Repository & IP Transfer",
    code: "STAGE 04 // HANDOVER-14T",
    teeth: 14,
    pitchRadius: 14 * MODULE, // 44.8
    cx: 383.0 + 20 * MODULE + 14 * MODULE, // 491.8
    cy: 160,
    color: "#18181B",
    accentColor: "#F59E0B",
    direction: "ccw",
    speedSec: 8, // 14 teeth: 8s per rev
    initialAngle: 180 / 14 + 1.2,
    stageIndex: 3,
    description: "100% Private GitHub Handover & Zero Retainers",
    rpm: 45,
  },
];

/**
 * Generates an involute-inspired spur gear path with precise teeth geometry
 */
function generateGearPath(teeth: number, pitchRadius: number, module: number = MODULE): string {
  const addendum = 0.85 * module;
  const dedendum = 1.05 * module;
  const tipRadius = pitchRadius + addendum;
  const rootRadius = pitchRadius - dedendum;

  const points: { x: number; y: number }[] = [];
  const toothAngle = (2 * Math.PI) / teeth;

  for (let i = 0; i < teeth; i++) {
    const baseAngle = i * toothAngle;

    // Angle checkpoints for one tooth cycle
    const a0 = baseAngle;
    const a1 = baseAngle + toothAngle * 0.18; // rise
    const a2 = baseAngle + toothAngle * 0.38; // tip start
    const a3 = baseAngle + toothAngle * 0.62; // tip end
    const a4 = baseAngle + toothAngle * 0.82; // fall
    const a5 = baseAngle + toothAngle * 1.0; // root land

    // Root start
    points.push({
      x: rootRadius * Math.cos(a0),
      y: rootRadius * Math.sin(a0),
    });
    // Flank rise to pitch
    points.push({
      x: pitchRadius * Math.cos(a1),
      y: pitchRadius * Math.sin(a1),
    });
    // Crest start
    points.push({
      x: tipRadius * Math.cos(a2),
      y: tipRadius * Math.sin(a2),
    });
    // Crest end
    points.push({
      x: tipRadius * Math.cos(a3),
      y: tipRadius * Math.sin(a3),
    });
    // Flank fall to root
    points.push({
      x: pitchRadius * Math.cos(a4),
      y: pitchRadius * Math.sin(a4),
    });
    // Root land
    points.push({
      x: rootRadius * Math.cos(a5),
      y: rootRadius * Math.sin(a5),
    });
  }

  // Convert points to SVG closed path
  return (
    points.reduce((acc, pt, idx) => {
      const cmd = idx === 0 ? "M" : "L";
      return `${acc} ${cmd} ${pt.x.toFixed(2)},${pt.y.toFixed(2)}`;
    }, "") + " Z"
  );
}

export function MechanicalGearsMotion({
  mode = "vistar",
  className = "",
  onSelectStage,
  activeStage = 1,
}: MechanicalGearsMotionProps) {
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [hoveredGear, setHoveredGear] = useState<string | null>(null);

  const isAgency = mode === "agency";

  // Precomputed gear paths for SVG
  const gearPaths = React.useMemo(() => {
    return GEARS.map((g) => ({
      ...g,
      path: generateGearPath(g.teeth, g.pitchRadius),
    }));
  }, []);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-black/15 bg-[#090A0F] text-white shadow-xl ${className}`}
    >
      {/* Top Header & Telemetry Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-black/60 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isAgency ? "bg-rose-500 animate-ping" : "bg-emerald-400 animate-pulse"
              }`}
            />
            <span className="font-mono text-xs font-semibold tracking-wider uppercase text-neutral-200">
              {isAgency ? "AGENCY FRICTION DYNAMICS" : "MECHANICAL SPRINT TRANSMISSION"}
            </span>
          </div>

          <span className="hidden sm:inline-block px-2 py-0.5 rounded font-mono text-[10px] bg-white/10 text-neutral-400 border border-white/10">
            {isAgency ? "TRANSMISSION: STALLED" : "PITCH SYNCHRONIZED: 100%"}
          </span>
        </div>

        {/* Speed & Pause Controls */}
        <div className="flex items-center gap-2 text-xs font-mono">
          {!isAgency && (
            <>
              <button
                type="button"
                onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 0.5 : 1))}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/15 text-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Toggle transmission cadence"
              >
                <Zap className="w-3 h-3 text-[#FF3823]" />
                <span>{speedMultiplier}x VELOCITY</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/15 text-neutral-300 transition-colors flex items-center gap-1 cursor-pointer"
                title={isPaused ? "Engage gears" : "Pause gears"}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                    <span>ENGAGE</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3 h-3 text-amber-400" />
                    <span>PAUSE</span>
                  </>
                )}
              </button>
            </>
          )}

          {isAgency && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[11px]">
              <AlertTriangle className="w-3 h-3 text-rose-400" />
              <span>BUREAUCRACY LOCK (FRICTION LOSS 96.4%)</span>
            </div>
          )}
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full aspect-[21/9] min-h-[260px] sm:min-h-[320px] max-h-[420px] flex items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-[#090A0F] via-[#0E1017] to-[#090A0F]">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Center Transmission Pitch Line (Tangency Axis) */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        <svg
          viewBox="0 0 580 320"
          className="w-full h-full max-w-[900px] select-none"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Gear 3D Metal Gradients */}
            <linearGradient id="gearMetalDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D3139" />
              <stop offset="50%" stopColor="#1B1D22" />
              <stop offset="100%" stopColor="#121316" />
            </linearGradient>

            <linearGradient id="gearMetalHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4A4E59" />
              <stop offset="100%" stopColor="#1D1F24" />
            </linearGradient>

            {/* Glowing Mesh Filter */}
            <filter id="gearGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Pitch Circle Dash */}
            <pattern id="pitchDash" width="10" height="10" patternUnits="userSpaceOnUse">
              <line x1="0" y1="5" x2="10" y2="5" stroke="rgba(255,255,255,0.2)" strokeDasharray="2,2" />
            </pattern>
          </defs>

          {/* Interlocking Gears Group */}
          {gearPaths.map((gear) => {
            const isHovered = hoveredGear === gear.id;
            const isSelected = activeStage === gear.stageIndex;

            // Calculate rotation style
            // If in agency mode, gears are jammed / jittering violently or stopped
            const animDuration = isAgency ? 0 : gear.speedSec / speedMultiplier;
            const animDirection = gear.direction === "cw" ? "normal" : "reverse";

            return (
              <g
                key={gear.id}
                className="cursor-pointer transition-opacity"
                onClick={() => onSelectStage?.(gear.stageIndex)}
                onMouseEnter={() => setHoveredGear(gear.id)}
                onMouseLeave={() => setHoveredGear(null)}
              >
                {/* Tangent Pitch Circle (Mechanical Alignment Reference) */}
                <circle
                  cx={gear.cx}
                  cy={gear.cy}
                  r={gear.pitchRadius}
                  fill="none"
                  stroke={isSelected ? gear.accentColor : "rgba(255,255,255,0.12)"}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  className="transition-colors duration-300"
                />

                {/* Rotating Body (Gear Teeth + Spokes) */}
                <g
                  transform={`translate(${gear.cx}, ${gear.cy})`}
                  style={{
                    transformOrigin: `${gear.cx}px ${gear.cy}px`,
                  }}
                >
                  <g
                    style={{
                      transformOrigin: "0px 0px",
                      animation:
                        isAgency || isPaused
                          ? undefined
                          : `gearRotate ${animDuration}s linear infinite ${animDirection}`,
                      transform: isAgency
                        ? `rotate(${gear.initialAngle + (gear.stageIndex % 2 === 0 ? 5 : -5)}deg)`
                        : `rotate(${gear.initialAngle}deg)`,
                    }}
                  >
                    {/* Main Gear Outer Path */}
                    <path
                      d={gear.path}
                      fill="url(#gearMetalDark)"
                      stroke={isSelected ? gear.accentColor : isHovered ? "#959CB3" : "#3F424E"}
                      strokeWidth={isSelected ? 1.8 : 1}
                      filter={isSelected ? "url(#gearGlow)" : undefined}
                      className="transition-colors duration-300"
                    />

                    {/* Inner Rim Recess */}
                    <circle
                      cx="0"
                      cy="0"
                      r={gear.pitchRadius * 0.72}
                      fill="#12141A"
                      stroke="#272A32"
                      strokeWidth="1.5"
                    />

                    {/* Weight Reduction Cutouts / Mechanical Spokes */}
                    {gear.teeth >= 20 ? (
                      // 6 Spoke Holes for larger gears
                      [0, 60, 120, 180, 240, 300].map((angle, idx) => {
                        const spokeRadius = gear.pitchRadius * 0.45;
                        const sx = spokeRadius * Math.cos((angle * Math.PI) / 180);
                        const sy = spokeRadius * Math.sin((angle * Math.PI) / 180);
                        const holeR = gear.pitchRadius * 0.16;
                        return (
                          <circle
                            key={idx}
                            cx={sx}
                            cy={sy}
                            r={holeR}
                            fill="#0A0B0F"
                            stroke="#2C303B"
                            strokeWidth="1"
                          />
                        );
                      })
                    ) : (
                      // 4 Spoke Holes for smaller gears
                      [0, 90, 180, 270].map((angle, idx) => {
                        const spokeRadius = gear.pitchRadius * 0.42;
                        const sx = spokeRadius * Math.cos((angle * Math.PI) / 180);
                        const sy = spokeRadius * Math.sin((angle * Math.PI) / 180);
                        const holeR = gear.pitchRadius * 0.18;
                        return (
                          <circle
                            key={idx}
                            cx={sx}
                            cy={sy}
                            r={holeR}
                            fill="#0A0B0F"
                            stroke="#2C303B"
                            strokeWidth="1"
                          />
                        );
                      })
                    )}

                    {/* Axle Hub Center Ring */}
                    <circle
                      cx="0"
                      cy="0"
                      r={gear.pitchRadius * 0.28}
                      fill="url(#gearMetalHighlight)"
                      stroke="#4F5463"
                      strokeWidth="1"
                    />

                    {/* Drive Shaft Keyway & Bolts */}
                    <circle cx="0" cy="0" r={gear.pitchRadius * 0.12} fill="#060709" />
                    <rect
                      x={-gear.pitchRadius * 0.04}
                      y={-gear.pitchRadius * 0.16}
                      width={gear.pitchRadius * 0.08}
                      height={gear.pitchRadius * 0.12}
                      fill="#060709"
                    />

                    {/* Directional Velocity Indicator Arrow */}
                    {!isAgency && !isPaused && (
                      <circle
                        cx={gear.pitchRadius * 0.72}
                        cy="0"
                        r="2.5"
                        fill={gear.accentColor}
                        className="animate-pulse"
                      />
                    )}
                  </g>
                </g>

                {/* Static Center Bearing Pin */}
                <circle
                  cx={gear.cx}
                  cy={gear.cy}
                  r={4}
                  fill={isSelected ? gear.accentColor : "#ECEEF5"}
                  stroke="#0E1017"
                  strokeWidth="1.5"
                />

                {/* Stage Tag Label Under Gear */}
                <g transform={`translate(${gear.cx}, ${gear.cy + gear.pitchRadius + 24})`}>
                  <rect
                    x="-45"
                    y="-10"
                    width="90"
                    height="20"
                    rx="4"
                    fill={isSelected ? "rgba(255, 56, 35, 0.15)" : "rgba(255, 255, 255, 0.04)"}
                    stroke={isSelected ? gear.accentColor : "rgba(255, 255, 255, 0.1)"}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill={isSelected ? "#FFF" : "#959CB3"}
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="600"
                    letterSpacing="0.5"
                  >
                    STAGE 0{gear.stageIndex + 1}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Jammed Agency Bureaucracy Graphic Indicator */}
          {isAgency && (
            <g transform="translate(290, 160)">
              <rect
                x="-120"
                y="-30"
                width="240"
                height="60"
                rx="6"
                fill="rgba(15, 6, 8, 0.92)"
                stroke="#F43F5E"
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="-6"
                textAnchor="middle"
                fill="#FDA4AF"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="700"
                letterSpacing="1"
              >
                MECHANICAL JAM: ZERO ROTATION
              </text>
              <text
                x="0"
                y="14"
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="9"
                fontFamily="monospace"
              >
                12 Unaligned Committees &bull; Friction 96.4%
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Bottom Live Engineering Telemetry Readouts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-black/70 border-t border-white/10 text-xs font-mono">
        <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            TRANSMISSION STATUS
          </span>
          <span
            className={`font-semibold flex items-center gap-1.5 ${
              isAgency ? "text-rose-400" : "text-emerald-400"
            }`}
          >
            {isAgency ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5" />
                STALLED
              </>
            ) : isPaused ? (
              "PAUSED"
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                SYNCHRONIZED 60 FPS
              </>
            )}
          </span>
        </div>

        <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            SLIPPAGE / EFFICIENCY
          </span>
          <span className="font-semibold text-white">
            {isAgency ? "0.0% DIRECT DRIVE" : "100% NO POWER LOSS"}
          </span>
        </div>

        <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            SPRINT CADENCE
          </span>
          <span className="font-semibold text-[#FF3823]">
            {isAgency ? "6+ MONTHS (SLIDE DECKS)" : "14-DAY COMMITTED RELEASES"}
          </span>
        </div>

        <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
            CODE HANDOVER
          </span>
          <span className="font-semibold text-emerald-400">
            {isAgency ? "0% (LOCKED TO RETAINER)" : "100% PRIVATE GIT REPO"}
          </span>
        </div>
      </div>

      {/* Global CSS Keyframe for hardware-accelerated continuous gear rotation */}
      <style jsx>{`
        @keyframes gearRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
