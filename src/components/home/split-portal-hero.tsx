"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { playClick, playBlip, playToggle } from "@/lib/sound";

type HeroMode = "cad" | "hud" | "terminal";

export function SplitPortalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState<HeroMode>("cad");
  const [activeStoryChapter, setActiveStoryChapter] = useState(0);

  // Terminal state for interactive CLI mode
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; res: string; time: string }>>([
    {
      cmd: "vistar --status",
      res: "SYSTEM_ONLINE // CORE_VERSION: 4.8.0 // SHIP_CADENCE: 14_DAYS // CAPACITY: 2 SLOTS OPEN",
      time: "08:00:12",
    },
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  // 1. Scroll-driven progress tracking across the 280vh stage
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScroll / scrollableDistance));
      setProgress(rawProgress);

      if (rawProgress < 0.35) {
        setActiveStoryChapter(0);
      } else if (rawProgress < 0.65) {
        setActiveStoryChapter(1);
      } else {
        setActiveStoryChapter(2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Mouse tracking for 3D parallax inertia
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 3. WebGL / Canvas 3D Interactive Aeronautical CAD & Avionics HUD Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };

    window.addEventListener("resize", handleResize);

    // Supersonic Jet CAD geometry vertices [x, y, z]
    const jetVertices: [number, number, number][] = [
      [0, 3.2, 0],         // 0: Nose tip
      [0, 2.0, 0.45],      // 1: Canopy peak
      [0, 0.5, 0.35],      // 2: Mid spine
      [0, -1.8, 0.3],      // 3: Aft spine
      [0, -2.6, 0.15],     // 4: Tail stinger
      [0, 2.0, -0.25],     // 5: Forward belly
      [0, 0.5, -0.3],      // 6: Mid belly
      [0, -1.8, -0.25],    // 7: Aft belly
      [-0.35, 1.8, 0.25],  // 8: Canopy L
      [0.35, 1.8, 0.25],   // 9: Canopy R
      [-0.65, 0.6, 0.05],  // 10: Wing root forward L
      [0.65, 0.6, 0.05],   // 11: Wing root forward R
      [-0.8, -1.6, 0.05],  // 12: Wing root aft L
      [0.8, -1.6, 0.05],   // 13: Wing root aft R
      [-3.4, -1.8, 0.0],   // 14: Wingtip L
      [3.4, -1.8, 0.0],    // 15: Wingtip R
      [-2.2, -1.9, 0.0],   // 16: Elevon mid L
      [2.2, -1.9, 0.0],    // 17: Elevon mid R
      [-0.95, -2.5, 1.3],  // 18: Tail fin tip L
      [0.95, -2.5, 1.3],   // 19: Tail fin tip R
      [-0.5, -2.4, 0.3],   // 20: Tail fin base L
      [0.5, -2.4, 0.3],    // 21: Tail fin base R
      [-0.45, -2.7, 0.0],  // 22: Engine nozzle L
      [0.45, -2.7, 0.0],   // 23: Engine nozzle R
    ];

    const jetEdges: [number, number][] = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 4],
      [0, 8], [0, 9], [8, 1], [9, 1],
      [8, 10], [9, 11], [5, 10], [5, 11],
      [10, 2], [11, 2], [10, 12], [11, 13], [12, 3], [13, 3],
      [6, 12], [6, 13], [7, 12], [7, 13],
      [10, 14], [11, 15],
      [14, 16], [15, 17],
      [16, 12], [17, 13],
      [3, 20], [3, 21],
      [20, 18], [21, 19],
      [18, 4], [19, 4],
      [12, 22], [13, 23], [22, 4], [23, 4], [22, 7], [23, 7]
    ];

    let rotX = 1.1; // Slight downward pitch for top-isometric beauty
    let rotY = 0.0;
    let rotZ = 0.0;
    let radarAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const dpr = window.devicePixelRatio;
      const cx = width / 2;
      const cy = height / 2;

      // ─── MODE 01: AERONAUTICAL CAD ─────────────────────────────────
      if (mode === "cad") {
        // Smooth rotational physics
        const targetRotY = mousePos.x * 0.8 + progress * Math.PI;
        const targetRotX = 1.1 + mousePos.y * 0.45;
        rotY += (targetRotY - rotY) * 0.06;
        rotX += (targetRotX - rotX) * 0.06;
        rotZ += 0.003;

        const scale = Math.min(width, height) * 0.16;

        // Project 3D vertices
        const projected = jetVertices.map(([vx, vy, vz]) => {
          // Rotate around X (Pitch)
          const y1 = vy * Math.cos(rotX) - vz * Math.sin(rotX);
          const z1 = vy * Math.sin(rotX) + vz * Math.cos(rotX);

          // Rotate around Y (Yaw)
          const x2 = vx * Math.cos(rotY) + z1 * Math.sin(rotY);
          const z2 = -vx * Math.sin(rotY) + z1 * Math.cos(rotY);

          // Rotate around Z (Roll)
          const x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
          const y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ);

          const pers = 3.6 / (3.6 + z2 * 0.28);
          return {
            x: cx + x3 * scale * pers,
            y: cy - y3 * scale * pers, // Invert Y for aviation orientation
            z: z2,
          };
        });

        // Draw CAD Range Rings
        ctx.strokeStyle = "rgba(20, 20, 19, 0.05)";
        ctx.lineWidth = 1 * dpr;
        for (let r = 80; r <= 320; r += 80) {
          ctx.beginPath();
          ctx.arc(cx, cy, r * dpr, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw Axis Crosshairs
        ctx.strokeStyle = "rgba(2, 132, 199, 0.25)";
        ctx.beginPath();
        ctx.moveTo(cx - 30 * dpr, cy);
        ctx.lineTo(cx + 30 * dpr, cy);
        ctx.moveTo(cx, cy - 30 * dpr);
        ctx.lineTo(cx, cy + 30 * dpr);
        ctx.stroke();

        // Draw Aircraft Wireframe Edges (Claude Terracotta)
        ctx.lineWidth = 1.3 * dpr;
        jetEdges.forEach(([i1, i2]) => {
          const p1 = projected[i1];
          const p2 = projected[i2];
          if (!p1 || !p2) return;

          const avgZ = (p1.z + p2.z) / 2;
          const alpha = Math.max(0.18, Math.min(0.95, 0.5 + avgZ * 0.25));

          ctx.strokeStyle = `rgba(2, 132, 199, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });

        // Draw Glowing Nodes at Key Aerodynamic Vertices
        projected.forEach((p, idx) => {
          if (idx === 0 || idx === 14 || idx === 15 || idx === 18 || idx === 19) {
            ctx.fillStyle = "#0284C7";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3 * dpr, 0, Math.PI * 2);
            ctx.fill();

            // Coordinate label
            ctx.fillStyle = "rgba(20, 20, 19, 0.4)";
            ctx.font = `${9 * dpr}px 'JetBrains Mono', monospace`;
            ctx.fillText(`V[0${idx}]`, p.x + 6 * dpr, p.y - 4 * dpr);
          }
        });
      }

      // ─── MODE 02: FLIGHT AVIONICS HUD ──────────────────────────────
      if (mode === "hud") {
        radarAngle += 0.025;

        // Artificial Horizon & Pitch Ladder
        const rollAngle = mousePos.x * 0.25;
        const pitchOffset = mousePos.y * 60 * dpr;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rollAngle);

        // Horizon Line
        ctx.strokeStyle = "rgba(2, 132, 199, 0.75)";
        ctx.lineWidth = 2 * dpr;
        ctx.beginPath();
        ctx.moveTo(-160 * dpr, pitchOffset);
        ctx.lineTo(-40 * dpr, pitchOffset);
        ctx.moveTo(40 * dpr, pitchOffset);
        ctx.lineTo(160 * dpr, pitchOffset);
        ctx.stroke();

        // Pitch rungs
        ctx.lineWidth = 1 * dpr;
        ctx.font = `${10 * dpr}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = "rgba(20, 20, 19, 0.6)";
        [-20, -10, 10, 20].forEach((deg) => {
          const y = pitchOffset - deg * 5 * dpr;
          ctx.beginPath();
          ctx.moveTo(-60 * dpr, y);
          ctx.lineTo(-30 * dpr, y);
          ctx.moveTo(30 * dpr, y);
          ctx.lineTo(60 * dpr, y);
          ctx.stroke();
          ctx.fillText(`${deg > 0 ? "+" : ""}${deg}°`, 68 * dpr, y + 3 * dpr);
        });

        // Center Bore Sight
        ctx.strokeStyle = "#141413";
        ctx.lineWidth = 1.8 * dpr;
        ctx.beginPath();
        ctx.arc(0, 0, 8 * dpr, 0, Math.PI * 2);
        ctx.moveTo(-18 * dpr, 0);
        ctx.lineTo(-8 * dpr, 0);
        ctx.moveTo(8 * dpr, 0);
        ctx.lineTo(18 * dpr, 0);
        ctx.moveTo(0, -18 * dpr);
        ctx.lineTo(0, -8 * dpr);
        ctx.stroke();

        ctx.restore();

        // Speed Tape (Left)
        ctx.fillStyle = "rgba(20, 20, 19, 0.04)";
        ctx.fillRect(cx - 260 * dpr, cy - 120 * dpr, 55 * dpr, 240 * dpr);
        ctx.strokeStyle = "rgba(20, 20, 19, 0.12)";
        ctx.strokeRect(cx - 260 * dpr, cy - 120 * dpr, 55 * dpr, 240 * dpr);
        ctx.fillStyle = "#141413";
        ctx.font = `bold ${12 * dpr}px 'JetBrains Mono', monospace`;
        ctx.fillText("480", cx - 245 * dpr, cy + 4 * dpr);
        ctx.font = `${9 * dpr}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = "#6A6862";
        ctx.fillText("KTS", cx - 245 * dpr, cy + 18 * dpr);
        ctx.fillText("M 0.88", cx - 250 * dpr, cy + 32 * dpr);

        // Altitude Tape (Right)
        ctx.fillStyle = "rgba(20, 20, 19, 0.04)";
        ctx.fillRect(cx + 205 * dpr, cy - 120 * dpr, 65 * dpr, 240 * dpr);
        ctx.strokeStyle = "rgba(20, 20, 19, 0.12)";
        ctx.strokeRect(cx + 205 * dpr, cy - 120 * dpr, 65 * dpr, 240 * dpr);
        ctx.fillStyle = "#141413";
        ctx.font = `bold ${12 * dpr}px 'JetBrains Mono', monospace`;
        ctx.fillText("FL410", cx + 215 * dpr, cy + 4 * dpr);
        ctx.font = `${9 * dpr}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = "#6A6862";
        ctx.fillText("41,000 FT", cx + 212 * dpr, cy + 18 * dpr);

        // Top Compass Ribbon
        ctx.fillStyle = "rgba(20, 20, 19, 0.04)";
        ctx.fillRect(cx - 150 * dpr, cy - 200 * dpr, 300 * dpr, 30 * dpr);
        ctx.strokeStyle = "rgba(20, 20, 19, 0.12)";
        ctx.strokeRect(cx - 150 * dpr, cy - 200 * dpr, 300 * dpr, 30 * dpr);
        ctx.fillStyle = "#0284C7";
        ctx.font = `bold ${11 * dpr}px 'JetBrains Mono', monospace`;
        ctx.fillText("▲ 340° NNW // FLIGHT CLEARANCE APPROVED", cx - 125 * dpr, cy - 180 * dpr);

        // Circular Radar Sweep in Lower Corner
        const rx = cx;
        const ry = cy + 170 * dpr;
        const rr = 65 * dpr;
        ctx.strokeStyle = "rgba(2, 132, 199, 0.35)";
        ctx.beginPath();
        ctx.arc(rx, ry, rr, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(2, 132, 199, 0.6)";
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx + Math.cos(radarAngle) * rr, ry + Math.sin(radarAngle) * rr);
        ctx.stroke();

        // Radar Blip
        ctx.fillStyle = "#0284C7";
        ctx.beginPath();
        ctx.arc(rx + 28 * dpr, ry - 22 * dpr, 3.5 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = `${8 * dpr}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = "#141413";
        ctx.fillText("NOTAM HAZARD [VAYU]", rx + 35 * dpr, ry - 20 * dpr);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [mode, progress, mousePos]);

  // Terminal command executor
  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    playClick(2400, 0.03);

    const now = new Date().toTimeString().split(" ")[0];
    let response = "";

    switch (trimmed) {
      case "help":
        response = "COMMANDS: [sprint, stack, vayu, aura, quote, hire, clear]";
        break;
      case "sprint":
        response = "CADENCE: 14-Day Deterministic Sprints. 100% IP & Git transfer on Day 1. Zero agency lock-in.";
        break;
      case "stack":
        response = "PRODUCTION STACK: Next.js 16, TypeScript, Tailwind, Claude & OpenAI Agents, FastEdge, PostgreSQL.";
        break;
      case "vayu":
        response = "PROJECT VAYU: Aviation Cockpit AI. 1.2M NOTAMs decoded with GIS hazard vectoring. Sub-120ms latency.";
        break;
      case "aura":
        response = "AURA ANOMALY SYSTEM: Multi-agent telemetry stream architecture with isolation forest ML models.";
        break;
      case "quote":
      case "hire":
        response = "COMMISSION WINDOW OPEN: Next intake Q2 2026. Redirecting to /start for instant diagnostic...";
        if (typeof window !== "undefined") {
          setTimeout(() => {
            window.location.href = "/start";
          }, 1200);
        }
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        response = `COMMAND NOT FOUND: "${trimmed}". Type "help" or click one of the preset pills.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: cmdStr, res: response, time: now }]);
    setTerminalInput("");
  };

  // Kinetic transformations for parting blast doors
  const splitProgress = Math.max(0, Math.min(1, (progress - 0.08) / 0.55));
  const leftPanelX = -splitProgress * 105;
  const rightPanelX = splitProgress * 105;
  const wordmarkSeparation = splitProgress * 28;
  const wordmarkScale = 1 + splitProgress * 0.35;
  const interiorOpacity = Math.min(1, Math.max(0, (progress - 0.05) / 0.3));

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-[280vh] w-full bg-[#FAF9F5] text-[#141413] select-none font-sans"
      aria-label="Vistar Supersonic CAD & Split Portal Experience"
    >
      {/* ── STICKY VIEWPORT CONTAINER (100svh) ────────────────────────── */}
      <div className="sticky top-0 h-svh w-full overflow-hidden isolate bg-[#FAF9F5]">
        
        {/* ── LAYER 1: THE INTERIOR AERONAUTICAL CAD & TERMINAL CANVAS ── */}
        <div
          className="absolute inset-0 z-10 w-full h-full will-change-opacity transition-opacity duration-300 pointer-events-auto"
          style={{ opacity: interiorOpacity }}
        >
          {/* Subtle Background Grid & Coordinate Axes */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(20, 20, 19, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 20, 19, 0.06) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Interactive 3D Canvas Centerpiece */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block pointer-events-none"
            style={{ width: "100%", height: "100%" }}
          />

          {/* Dynamic Interactive Overlay Heads */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-8 md:p-12 pointer-events-none">
            
            {/* Top Interactive Mode Switcher (Aviation CAD vs Cockpit HUD vs Terminal CLI) */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono pointer-events-auto">
              <div className="inline-flex items-center p-1 bg-white/95 border border-[rgba(20,20,19,0.12)] rounded-[8px] shadow-sm backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => {
                    setMode("cad");
                    playToggle(true);
                  }}
                  className={`px-3 py-1.5 rounded-[5px] text-[11px] font-bold uppercase transition-all cursor-pointer ${
                    mode === "cad"
                      ? "bg-[#0284C7] text-[#FAF9F5] shadow-xs"
                      : "text-[#6A6862] hover:text-[#141413] hover:bg-[#F0EEE6]"
                  }`}
                >
                  01 // AERONAUTICAL CAD
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("hud");
                    playToggle(true);
                  }}
                  className={`px-3 py-1.5 rounded-[5px] text-[11px] font-bold uppercase transition-all cursor-pointer ${
                    mode === "hud"
                      ? "bg-[#0284C7] text-[#FAF9F5] shadow-xs"
                      : "text-[#6A6862] hover:text-[#141413] hover:bg-[#F0EEE6]"
                  }`}
                >
                  02 // AVIONICS HUD
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("terminal");
                    playToggle(false);
                  }}
                  className={`px-3 py-1.5 rounded-[5px] text-[11px] font-bold uppercase transition-all cursor-pointer ${
                    mode === "terminal"
                      ? "bg-[#141413] text-[#FAF9F5] shadow-xs"
                      : "text-[#6A6862] hover:text-[#141413] hover:bg-[#F0EEE6]"
                  }`}
                >
                  03 // TERMINAL CLI
                </button>
              </div>

              {/* Live Telemetry Status Pill */}
              <div className="hidden md:flex items-center gap-4 px-3 py-1.5 bg-white/90 border border-[rgba(20,20,19,0.08)] rounded-[6px] text-[#6A6862] backdrop-blur-sm">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#788C5D] animate-pulse" />
                  <strong className="text-[#141413]">STATUS: LIVE 60FPS</strong>
                </span>
                <span>•</span>
                <span>PITCH: {(mousePos.y * 12).toFixed(1)}°</span>
                <span>•</span>
                <span>YAW: {(mousePos.x * 24).toFixed(1)}°</span>
                <span>•</span>
                <span>SCRUB: {Math.round(progress * 100)}%</span>
              </div>
            </div>

            {/* Middle Section: Either Story Cards or Interactive Terminal */}
            <div className="max-w-2xl mx-auto w-full pointer-events-auto">
              {mode === "terminal" ? (
                /* Terminal.shop Style Interactive CLI Box */
                <div className="bg-[#141413] text-[#FAF9F5] rounded-[10px] p-5 shadow-2xl border border-[rgba(255,255,255,0.12)] space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-[#B0AEA5]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
                      <span className="font-bold text-white tracking-wider">VISTAR TACTILE CLI // v4.8</span>
                    </div>
                    <span className="text-[10px] opacity-70">INTERACTIVE SHELL</span>
                  </div>

                  {/* Preset Clickable Command Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[#B0AEA5] text-[10px]">PRESETS:</span>
                    {["help", "sprint", "stack", "vayu", "hire"].map((cmd) => (
                      <button
                        key={cmd}
                        type="button"
                        onClick={() => handleCommand(cmd)}
                        className="px-2 py-0.5 bg-white/10 hover:bg-[#0284C7] hover:text-[#FAF9F5] rounded-[4px] text-[11px] text-[#FAF9F5] transition-colors cursor-pointer"
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>

                  {/* Terminal Log Output */}
                  <div className="max-h-44 overflow-y-auto space-y-2 py-1 scrollbar-thin">
                    {terminalHistory.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center gap-2 text-[#0284C7]">
                          <span>[{item.time}]</span>
                          <span className="text-[#6A9BCC]">$</span>
                          <span className="text-white font-semibold">{item.cmd}</span>
                        </div>
                        <p className="text-[#FAF9F5]/80 pl-4 border-l border-[#0284C7]/40 leading-relaxed text-[11.5px]">
                          {item.res}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Command Input Field */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (terminalInput.trim()) {
                        handleCommand(terminalInput);
                      }
                    }}
                    className="flex items-center gap-2 pt-2 border-t border-white/10"
                  >
                    <span className="text-[#0284C7] font-bold">vistar:~$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="type 'sprint', 'stack', or 'hire'..."
                      className="flex-1 bg-transparent text-white outline-none placeholder:text-white/30 text-xs font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-[#0284C7] text-[#FAF9F5] rounded-[4px] text-[10px] font-bold uppercase tracking-wider hover:bg-[#C15F3C] cursor-pointer"
                    >
                      EXECUTE ↵
                    </button>
                  </form>
                </div>
              ) : (
                /* Dynamic Architectural Story Narrative Cards */
                <div className="text-center space-y-3">
                  {activeStoryChapter === 0 && (
                    <div className="p-6 bg-white/95 border border-[rgba(20,20,19,0.10)] rounded-[10px] shadow-sm backdrop-blur-md space-y-2.5">
                      <div className="inline-block px-3 py-0.5 bg-[#0284C7]/10 text-[#0284C7] font-mono text-[11px] font-bold uppercase rounded-[4px]">
                        01 // SOVEREIGN ARCHITECTURE
                      </div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-[#141413] tracking-tight">
                        WE ENGINEER AIRSPACE &amp; AUTONOMOUS AI.
                      </h3>
                      <p className="text-sm text-[#6A6862] leading-relaxed max-w-lg mx-auto">
                        Aviation telemetry, multi-agent intelligence, and fault-tolerant production software built in rapid 14-day milestones.
                      </p>
                    </div>
                  )}

                  {activeStoryChapter === 1 && (
                    <div className="p-6 bg-white/95 border border-[rgba(20,20,19,0.10)] rounded-[10px] shadow-sm backdrop-blur-md space-y-2.5">
                      <div className="inline-block px-3 py-0.5 bg-[#6A9BCC]/10 text-[#6A9BCC] font-mono text-[11px] font-bold uppercase rounded-[4px]">
                        02 // COMPUTATIONAL VELOCITY
                      </div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-[#141413] tracking-tight">
                        SUB-100MS EXECUTION SPEED.
                      </h3>
                      <p className="text-sm text-[#6A6862] leading-relaxed max-w-lg mx-auto">
                        Global edge routing, type-safe Next.js architecture, and zero-bloat delivery engineered for venture-backed founders.
                      </p>
                    </div>
                  )}

                  {activeStoryChapter === 2 && (
                    <div className="p-6 bg-white/95 border border-[rgba(20,20,19,0.10)] rounded-[10px] shadow-sm backdrop-blur-md space-y-2.5">
                      <div className="inline-block px-3 py-0.5 bg-[#788C5D]/10 text-[#788C5D] font-mono text-[11px] font-bold uppercase rounded-[4px]">
                        03 // 100% CODE SOVEREIGNTY
                      </div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-[#141413] tracking-tight">
                        DAY-ONE CLIENT OWNERSHIP.
                      </h3>
                      <p className="text-sm text-[#6A6862] leading-relaxed max-w-lg mx-auto">
                        Transferred directly to your repository with automated CI/CD verification and zero vendor or agency retainers.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Story Navigation Pointers */}
            <div className="flex items-center justify-between text-xs font-mono text-[#6A6862]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0284C7] rounded-full animate-ping" />
                <span className="font-semibold text-[#141413]">SCROLL TO EXPLORE PRODUCTIONS</span>
              </div>
              <Link
                href="/work"
                className="px-4 py-2 bg-white text-[#141413] border border-[rgba(20,20,19,0.14)] rounded-[6px] font-bold text-xs uppercase hover:bg-[#0284C7] hover:text-[#FAF9F5] hover:border-[#0284C7] transition-all shadow-xs pointer-events-auto"
              >
                VIEW CLIENT PRODUCTIONS ↗
              </Link>
            </div>
          </div>
        </div>

        {/* ── LAYER 2: THE PARTING MONOLITHIC DOORS (Begin CLOSED, Meet in middle) ── */}
        
        {/* Left Blast Panel */}
        <div
          className="absolute top-0 bottom-0 left-0 z-30 w-[calc(50%+1px)] bg-[#FAF9F5] will-change-transform border-r border-[rgba(20,20,19,0.10)] shadow-2xl flex flex-col justify-between p-6 sm:p-10 md:p-14"
          style={{
            transform: `translate3d(${leftPanelX}%, 0, 0)`,
            transition: "transform 0.05s linear",
          }}
        >
          {/* Top Status Left */}
          <div className="flex items-center gap-3 font-mono text-[11.5px] text-[#6A6862]">
            <span className="px-2.5 py-1 bg-[#F0EEE6] rounded-[5px] text-[#141413] font-bold">
              SYSTEM: VTR-4.8
            </span>
            <span className="hidden sm:inline">● ACCEPTING Q2 COMMISSIONS</span>
          </div>

          {/* Left Mid Text Anchor (Authoritative Selling Hook) */}
          <div className="space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#0284C7]/10 text-[#0284C7] rounded-[5px] font-mono text-xs font-bold uppercase tracking-wider">
              <span>●</span>
              <span>AI SOFTWARE &amp; GROWTH STUDIO</span>
            </div>
            <h1 className="font-heading text-[clamp(2.4rem,5.5vw,4.8rem)] font-extrabold uppercase leading-[0.94] tracking-tight text-[#141413]">
              WE ENGINEER<br />
              <span className="text-[#0284C7]">HIGH-IMPACT</span><br />
              SYSTEMS.
            </h1>
            <p className="text-sm md:text-base text-[#6A6862] leading-relaxed max-w-md">
              We build production web platforms, autonomous AI workflows, and digital growth engines for ambitious founders and enterprises in 14-day deterministic sprints.
            </p>
          </div>

          {/* Bottom Left Hardware Controls */}
          <div className="flex items-center gap-4 font-mono text-xs text-[#6A6862]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#788C5D]" />
              <span className="text-[#141413] font-bold">14-DAY SHIP CYCLES</span>
            </div>
            <span>•</span>
            <span>100% CODE SOVEREIGNTY</span>
          </div>
        </div>

        {/* Right Blast Panel */}
        <div
          className="absolute top-0 bottom-0 right-0 z-30 w-[calc(50%+1px)] bg-[#FAF9F5] will-change-transform border-l border-[rgba(20,20,19,0.10)] shadow-2xl flex flex-col justify-between p-6 sm:p-10 md:p-14 text-right items-end"
          style={{
            transform: `translate3d(${rightPanelX}%, 0, 0)`,
            transition: "transform 0.05s linear",
          }}
        >
          {/* Top Status Right */}
          <div className="flex items-center gap-3 font-mono text-[11.5px] text-[#6A6862]">
            <span>ENGINEERING PROTOCOL</span>
            <span className="px-2.5 py-1 bg-[#F0EEE6] rounded-[5px] text-[#141413] font-bold">
              2 SLOTS REMAINING
            </span>
          </div>

          {/* Right Mid Text Anchor */}
          <div className="space-y-4 max-w-lg text-right">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#6A6862] uppercase tracking-wider">
              <span>ZERO AGENCY BLOAT // SENIOR SQUADS</span>
            </div>
            <h2 className="font-heading text-[clamp(2.4rem,5.5vw,4.8rem)] font-extrabold uppercase leading-[0.94] tracking-tight text-[#141413]">
              ZERO FLUFF.<br />
              <span className="text-[#141413]/60">REAL CODE.</span>
            </h2>
            <div className="space-y-2 text-xs md:text-sm text-[#6A6862] font-mono">
              <div>✓ Direct Git Transfer on Day One</div>
              <div>✓ Sub-2.5s LCP &amp; 99+ Core Web Vitals</div>
              <div>✓ Autonomous Claude &amp; OpenAI Agent Runtime</div>
            </div>
          </div>

          {/* Bottom Right Direct Sales CTAs */}
          <div className="flex flex-wrap items-center justify-end gap-3">
            <Link
              href="/start"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0284C7] text-[#FAF9F5] font-mono text-xs uppercase font-bold tracking-wider rounded-[6px] shadow-[0_4px_16px_rgba(2, 132, 199,0.30)] hover:bg-[#C15F3C] transition-all hover:scale-[1.02]"
            >
              <span>COMMISSION A SPRINT</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* ── LAYER 3: MONUMENTAL WORDMARK (Parting in center) ── */}
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
          <div
            className="flex items-center justify-center font-heading font-black text-[#141413] will-change-transform select-none"
            style={{
              transform: `scale(${wordmarkScale})`,
            }}
          >
            {/* Left Wordmark Half: VIS (travels left) */}
            <span
              className="inline-block tracking-tighter will-change-transform text-[clamp(5rem,18vw,20rem)] leading-none drop-shadow-[0_12px_30px_rgba(20,20,19,0.06)] text-[#141413]"
              style={{
                transform: `translate3d(-${wordmarkSeparation}vw, 0, 0)`,
              }}
            >
              VIS
            </span>

            {/* Right Wordmark Half: TAR (travels right) */}
            <span
              className="inline-block tracking-tighter will-change-transform text-[clamp(5rem,18vw,20rem)] leading-none drop-shadow-[0_12px_30px_rgba(20,20,19,0.06)] text-[#141413]"
              style={{
                transform: `translate3d(${wordmarkSeparation}vw, 0, 0)`,
              }}
            >
              TAR
            </span>
          </div>
        </div>

        {/* ── LAYER 4: SCROLL PROMPT CONTROL STRIP ── */}
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - progress * 4) }}
        >
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 border border-[rgba(20,20,19,0.12)] rounded-full shadow-xs backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-bounce" />
            <span className="font-mono text-[10.5px] uppercase font-bold text-[#141413] tracking-widest">
              SCROLL TO PART THE MONOLITH ↓
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
