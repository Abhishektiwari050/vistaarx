"use client";

import React, { useEffect, useRef, useState, useId, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { colors, grammar } from "@/lib/design-tokens";
import { Button } from "@/components/vistar-button";
import { playClick, playSwoosh } from "@/lib/sound";

// ── Node & Edge Data Structures ──────────────────────────────────────────────

interface GrammarNode {
  id: string;
  label: string;
  cluster: "BUILD" | "DISCOVER" | "GROW";
  scattered: { x: number; y: number };
  clustered: { x: number; y: number };
}

interface GrammarEdge {
  id: string;
  source: string;
  target: string;
  isLoop?: boolean; // Part of the Act III closed-loop highway
}

const NODES: GrammarNode[] = [
  // Cluster 1: BUILD (Left, center ~ 280, 320)
  { id: "b1", label: "Next.js Core", cluster: "BUILD", scattered: { x: 120, y: 140 }, clustered: { x: 220, y: 260 } },
  { id: "b2", label: "FastAPI Engine", cluster: "BUILD", scattered: { x: 380, y: 110 }, clustered: { x: 340, y: 250 } },
  { id: "b3", label: "Postgres Schema", cluster: "BUILD", scattered: { x: 190, y: 480 }, clustered: { x: 230, y: 380 } },
  { id: "b4", label: "AI Agent Layer", cluster: "BUILD", scattered: { x: 420, y: 520 }, clustered: { x: 350, y: 370 } },
  { id: "b5", label: "Vector Index", cluster: "BUILD", scattered: { x: 80, y: 320 }, clustered: { x: 160, y: 320 } },
  { id: "b6", label: "Auth / Crypt", cluster: "BUILD", scattered: { x: 310, y: 80 }, clustered: { x: 290, y: 320 } },

  // Cluster 2: DISCOVER (Center-Top, center ~ 600, 200)
  { id: "d1", label: "Technical SEO", cluster: "DISCOVER", scattered: { x: 520, y: 100 }, clustered: { x: 540, y: 150 } },
  { id: "d2", label: "Edge Latency", cluster: "DISCOVER", scattered: { x: 690, y: 90 }, clustered: { x: 660, y: 150 } },
  { id: "d3", label: "Demand Graph", cluster: "DISCOVER", scattered: { x: 580, y: 490 }, clustered: { x: 530, y: 240 } },
  { id: "d4", label: "Index Coverage", cluster: "DISCOVER", scattered: { x: 740, y: 450 }, clustered: { x: 670, y: 240 } },
  { id: "d5", label: "Signal Feed", cluster: "DISCOVER", scattered: { x: 610, y: 80 }, clustered: { x: 600, y: 130 } },
  { id: "d6", label: "Analytics Core", cluster: "DISCOVER", scattered: { x: 470, y: 390 }, clustered: { x: 600, y: 260 } },

  // Cluster 3: GROW (Right, center ~ 920, 320)
  { id: "g1", label: "Lifecycle Bus", cluster: "GROW", scattered: { x: 840, y: 120 }, clustered: { x: 860, y: 260 } },
  { id: "g2", label: "Retention ML", cluster: "GROW", scattered: { x: 1040, y: 160 }, clustered: { x: 980, y: 250 } },
  { id: "g3", label: "Event Pipeline", cluster: "GROW", scattered: { x: 880, y: 530 }, clustered: { x: 870, y: 380 } },
  { id: "g4", label: "Telemetry Hub", cluster: "GROW", scattered: { x: 1080, y: 480 }, clustered: { x: 970, y: 370 } },
  { id: "g5", label: "Automated Ops", cluster: "GROW", scattered: { x: 1020, y: 310 }, clustered: { x: 1040, y: 320 } },
  { id: "g6", label: "Scale Vector", cluster: "GROW", scattered: { x: 790, y: 340 }, clustered: { x: 920, y: 320 } },
];

const EDGES: GrammarEdge[] = [
  // BUILD Intra-cluster
  { id: "eb1", source: "b1", target: "b2" },
  { id: "eb2", source: "b1", target: "b5" },
  { id: "eb3", source: "b2", target: "b4" },
  { id: "eb4", source: "b3", target: "b4" },
  { id: "eb5", source: "b3", target: "b5" },
  { id: "eb6", source: "b6", target: "b1" },
  { id: "eb7", source: "b6", target: "b2" },
  { id: "eb8", source: "b6", target: "b3" },
  { id: "eb9", source: "b6", target: "b4" },

  // DISCOVER Intra-cluster
  { id: "ed1", source: "d1", target: "d2" },
  { id: "ed2", source: "d1", target: "d5" },
  { id: "ed3", source: "d2", target: "d4" },
  { id: "ed4", source: "d3", target: "d4" },
  { id: "ed5", source: "d3", target: "d6" },
  { id: "ed6", source: "d5", target: "d6" },

  // GROW Intra-cluster
  { id: "eg1", source: "g1", target: "g2" },
  { id: "eg2", source: "g1", target: "g6" },
  { id: "eg3", source: "g2", target: "g5" },
  { id: "eg4", source: "g3", target: "g4" },
  { id: "eg5", source: "g3", target: "g6" },
  { id: "eg6", source: "g4", target: "g5" },
  { id: "eg7", source: "g6", target: "g5" },

  // Inter-Cluster Highway (Act III Closed Loop: BUILD -> DISCOVER -> GROW -> BUILD)
  { id: "loop_bd", source: "b2", target: "d1", isLoop: true },
  { id: "loop_dg", source: "d4", target: "g1", isLoop: true },
  { id: "loop_gb", source: "g3", target: "b4", isLoop: true },
];

const CLUSTER_COLORS = {
  BUILD: "#0284C7",    // Deep Forest Green
  DISCOVER: "#C9794A", // Muted Amber
  GROW: "#2E6B72",     // Deep Teal
} as const;

export function HeroGrammarSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const titleId = useId();
  const descId = useId();

  // Active hover node for proximity effect
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activeAct, setActiveAct] = useState<1 | 2 | 3>(1);
  const [scrubProgress, setScrubProgress] = useState<number>(0);

  // Apply timeline scrub progress
  const applyProgress = useCallback((p: number) => {
    const clamped = Math.max(0, Math.min(1, p));
    setScrubProgress(clamped);

    let newAct: 1 | 2 | 3 = 1;
    if (clamped < 0.33) {
      newAct = 1;
    } else if (clamped < 0.66) {
      newAct = 2;
    } else {
      newAct = 3;
    }
    setActiveAct(newAct);

    if (timelineRef.current) {
      timelineRef.current.progress(clamped);
    }
  }, []);

  // Jump to specific Act via header buttons
  const jumpToAct = (act: 1 | 2 | 3) => {
    playClick(1200, 0.03, "triangle");
    playSwoosh();
    const targetProgress = act === 1 ? 0 : act === 2 ? 0.5 : 1;
    applyProgress(targetProgress);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Master scrub timeline: defines exact geometric & visual interpolation across progress 0.0 -> 1.0
    const masterTl = gsap.timeline({ paused: true });

    // 1. Node positions interpolation
    NODES.forEach((node) => {
      // Calculate mid-point between scattered and clustered for Act II
      masterTl.fromTo(
        `#node-${node.id}`,
        {
          attr: { cx: node.scattered.x, cy: node.scattered.y },
        },
        {
          attr: { cx: node.clustered.x, cy: node.clustered.y },
          ease: "power2.inOut",
          duration: 0.5,
        },
        0
      );
    });

    // 2. Intra-cluster lines draw in (Act I: 0 -> Act II: 1)
    masterTl.fromTo(
      ".intra-edge",
      { opacity: 0, strokeDashoffset: 120 },
      { opacity: 1, strokeDashoffset: 0, ease: "power1.out", duration: 0.4 },
      0.15
    );

    // 3. Cluster titles fade in during Act II
    masterTl.fromTo(
      ".cluster-label",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 },
      0.25
    );

    // 4. Closed-loop highway lines draw in during Act III (0.5 -> 0.8)
    masterTl.fromTo(
      ".loop-edge",
      { opacity: 0, strokeDashoffset: 350 },
      { opacity: 1, strokeDashoffset: 0, ease: "power2.inOut", duration: 0.35 },
      0.55
    );

    // 5. Signal pulses activate during Act III
    masterTl.fromTo(
      ".signal-pulse",
      { opacity: 0 },
      { opacity: 1, duration: 0.2 },
      0.65
    );

    timelineRef.current = masterTl;

    if (prefersReducedMotion) {
      applyProgress(1);
      return;
    }

    // Scroll scrub handler directly linked to container position
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = -rect.top / totalScrollable;
      if (progress >= -0.05 && progress <= 1.05) {
        applyProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial run
    handleScroll();

    // Continuous signal pulse dash offset loop along the closed loop highway
    const signalTween = gsap.to(".signal-pulse", {
      strokeDashoffset: -48,
      duration: 1.2,
      ease: "none",
      repeat: -1,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      masterTl.kill();
      signalTween.kill();
    };
  }, [applyProgress]);

  // Mouse proximity interaction: expand r to 6 and highlight edges
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;

    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgPt = pt.matrixTransform(svg.getScreenCTM()?.inverse());

    let closestNode: GrammarNode | null = null;
    let minDist = 75; // Proximity threshold

    NODES.forEach((node) => {
      // Interpolate current pos based on scrub progress
      const p = scrubProgress;
      const curX = node.scattered.x + (node.clustered.x - node.scattered.x) * Math.min(1, Math.max(0, p * 2));
      const curY = node.scattered.y + (node.clustered.y - node.scattered.y) * Math.min(1, Math.max(0, p * 2));

      const dx = svgPt.x - curX;
      const dy = svgPt.y - curY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) {
        minDist = dist;
        closestNode = node;
      }
    });

    const newHoveredId = closestNode ? (closestNode as GrammarNode).id : null;
    if (newHoveredId && newHoveredId !== hoveredNodeId) {
      playClick(1400, 0.02, "sine");
    }
    setHoveredNodeId(newHoveredId);
  };

  const handleMouseLeave = () => {
    setHoveredNodeId(null);
  };

  // Compute live node position based on scrub progress
  const getInterpolatedPos = (node: GrammarNode) => {
    const p = Math.min(1, Math.max(0, scrubProgress * 2));
    return {
      x: node.scattered.x + (node.clustered.x - node.scattered.x) * p,
      y: node.scattered.y + (node.clustered.y - node.scattered.y) * p,
    };
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-transparent text-[#0B1320] select-none flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8 md:px-12 pt-28 pb-16 md:pt-32 md:pb-20"
      aria-label="VISTAR Hero Sequence"
    >
      <div className="w-full flex flex-col items-center max-w-6xl mx-auto space-y-8">
        {/* Subtle Background Grid Lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26, 25, 22, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 25, 22, 0.25) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
          aria-hidden="true"
        />

        {/* 1. Top Status Bar / Interactive Act Selector */}
        <div className="relative z-20 flex items-center justify-between border-b border-[#0B1320]/[0.08] pb-3 text-xs font-heading">
          <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#F0F7FD]/60 border border-[#0B1320]/[0.08]">
            <span
              className="inline-block w-2 h-2 rounded-full transition-colors duration-300 shadow-[0_0_8px_rgba(2, 132, 199,0.4)]"
              style={{ backgroundColor: "#0284C7" }}
            />
            <span className="type-label text-[#0B1320] text-[11px]">
              SYSTEMS GRAMMAR // ACT 0{activeAct}
            </span>
          </div>

          {/* Interactive Act Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#F0F7FD]/60 border border-[#0B1320]/[0.08] rounded-full p-1 text-[11px] sm:text-xs">
            <button
              type="button"
              onClick={() => jumpToAct(1)}
              className={`transition-all cursor-pointer py-1 px-3 rounded-full ${
                activeAct === 1
                  ? "bg-[#0284C7] text-[#FFFFFF] font-semibold shadow-sm"
                  : "text-[#0B1320]/65 hover:text-[#0B1320]"
              }`}
            >
              01 DISCRETE
            </button>
            <span className="text-[#0B1320]/20">→</span>
            <button
              type="button"
              onClick={() => jumpToAct(2)}
              className={`transition-all cursor-pointer py-1 px-3 rounded-full ${
                activeAct === 2
                  ? "bg-[#0284C7] text-[#FFFFFF] font-semibold shadow-sm"
                  : "text-[#0B1320]/65 hover:text-[#0B1320]"
              }`}
            >
              02 CONVERGE
            </button>
            <span className="text-[#0B1320]/20">→</span>
            <button
              type="button"
              onClick={() => jumpToAct(3)}
              className={`transition-all cursor-pointer py-1 px-3 rounded-full ${
                activeAct === 3
                  ? "bg-[#0284C7] text-[#FFFFFF] font-semibold shadow-sm"
                  : "text-[#0B1320]/65 hover:text-[#0B1320]"
              }`}
            >
              03 CLOSED LOOP
            </button>
          </div>
        </div>

        {/* 2. Top-Center Commanding Authority Header */}
        <div className="relative z-20 max-w-5xl mx-auto text-center space-y-3.5 pt-3 md:pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0F7FD]/60 border border-[#0B1320]/10 text-[11px] font-heading tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] shadow-[0_0_8px_rgba(2, 132, 199,0.4)] animate-pulse" />
            <span className="text-[#0B1320]/90 font-medium">FRONTIER AI &amp; BESPOKE SYSTEMS STUDIO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-[-0.03em] text-[#0B1320] leading-[1.04]">
            <span>BUILD</span> <span className="text-[#0B1320]/35">→</span> <span>DISCOVER</span> <span className="text-[#0B1320]/35">→</span> <span>GROW</span>
          </h1>

          <p className="type-body text-[#0B1320]/75 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
            We engineer bespoke software, autonomous AI layers, and distribution engines as one connected technological system. 100% sovereign client codebase ownership. Zero commodity templates.
          </p>

          {/* Direct CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Button variant="primary" href="/start">
              START A PROJECT →
            </Button>
            <Button variant="secondary" href="/build">
              EXPLORE ARCHITECTURE
            </Button>
          </div>
        </div>

        {/* 3. Interactive Responsive SVG Canvas */}
        <div className="relative z-10 w-full flex-grow flex items-center justify-center my-1 max-h-[340px] md:max-h-[400px]">
          {/* Ambient Platinum Flare */}
          <div className="absolute inset-0 max-w-4xl mx-auto pointer-events-none bg-[radial-gradient(ellipse_65%_45%_at_50%_50%,rgba(255,255,255,0.06),rgba(255,255,255,0)_70%)] blur-2xl -z-10" />
          <svg
            ref={svgRef}
            viewBox="0 0 1200 640"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full max-h-[380px] overflow-visible"
            role="img"
            aria-labelledby={`${titleId} ${descId}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <title id={titleId}>Vistar Connected Systems Graph</title>
            <desc id={descId}>
              Interactive network graph illustrating scattered discrete tools converging into three unified clusters: Build, Discover, and Grow.
            </desc>

            <defs>
              <filter id="platinum-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#FFFFFF" floodOpacity="0.8" />
              </filter>
              <filter id="silver-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#D5D8E4" floodOpacity="0.7" />
              </filter>
              <filter id="titanium-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#959CB3" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* ── Cluster Labels (Act II & III) ── */}
            <g
              className="cluster-label transition-opacity duration-300"
              style={{ opacity: scrubProgress > 0.3 ? 1 : 0 }}
              aria-hidden="true"
            >
              <text
                x="280"
                y="190"
                fill="#0284C7"
                fontSize="13"
                fontFamily="'Instrument Sans', sans-serif"
                fontWeight="700"
                letterSpacing="0.1em"
                textAnchor="middle"
              >
                01 // BUILD
              </text>
              <text
                x="600"
                y="80"
                fill="#C9794A"
                fontSize="13"
                fontFamily="'Instrument Sans', sans-serif"
                fontWeight="700"
                letterSpacing="0.1em"
                textAnchor="middle"
              >
                02 // DISCOVER
              </text>
              <text
                x="920"
                y="190"
                fill="#2E6B72"
                fontSize="13"
                fontFamily="'Instrument Sans', sans-serif"
                fontWeight="700"
                letterSpacing="0.1em"
                textAnchor="middle"
              >
                03 // GROW
              </text>
            </g>

            {/* ── Edges (Hairline Lines) ── */}
            <g className="edges-layer" strokeLinecap="round">
              {EDGES.map((edge) => {
                const sourceNode = NODES.find((n) => n.id === edge.source);
                const targetNode = NODES.find((n) => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                const isConnectedToHover =
                  hoveredNodeId === edge.source || hoveredNodeId === edge.target;

                const sPos = getInterpolatedPos(sourceNode);
                const tPos = getInterpolatedPos(targetNode);

                const isEdgeVisible = edge.isLoop
                  ? scrubProgress > 0.55
                  : scrubProgress > 0.15;

                return (
                  <line
                    key={edge.id}
                    id={`edge-${edge.id}`}
                    x1={sPos.x}
                    y1={sPos.y}
                    x2={tPos.x}
                    y2={tPos.y}
                    stroke={
                      isConnectedToHover
                        ? "rgba(2, 132, 199, 0.75)"
                        : "rgba(56, 189, 248, 0.22)"
                    }
                    strokeWidth={isConnectedToHover ? 1.5 : grammar.lineWidth}
                    className={edge.isLoop ? "loop-edge" : "intra-edge"}
                    opacity={isEdgeVisible ? 1 : 0}
                    style={{
                      transition: "opacity 0.3s ease, stroke 0.2s, stroke-width 0.2s",
                    }}
                  />
                );
              })}

              {/* ── Act III: Closed Loop Signal Pulses (Tripartite Monochrome Pulses) ── */}
              {EDGES.filter((e) => e.isLoop).map((edge) => {
                const sourceNode = NODES.find((n) => n.id === edge.source);
                const targetNode = NODES.find((n) => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                const sPos = getInterpolatedPos(sourceNode);
                const tPos = getInterpolatedPos(targetNode);

                const strokeColor =
                  edge.id === "loop_bd"
                    ? "#0284C7"
                    : edge.id === "loop_dg"
                    ? "#C9794A"
                    : "#0B1320";
                const filterId =
                  edge.id === "loop_bd"
                    ? "url(#silver-glow)"
                    : edge.id === "loop_dg"
                    ? "url(#titanium-glow)"
                    : "url(#platinum-glow)";

                return (
                  <line
                    key={`signal-${edge.id}`}
                    x1={sPos.x}
                    y1={sPos.y}
                    x2={tPos.x}
                    y2={tPos.y}
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    strokeDasharray={grammar.signalDashArray}
                    className="signal-pulse"
                    filter={filterId}
                    opacity={scrubProgress > 0.65 ? 1 : 0}
                    style={{ transition: "opacity 0.4s ease" }}
                  />
                );
              })}
            </g>

            {/* ── Nodes (Circles: r=4 default, r=6 active/proximity) ── */}
            <g className="nodes-layer">
              {NODES.map((node) => {
                const isHovered = hoveredNodeId === node.id;
                const pos = getInterpolatedPos(node);
                const radius = isHovered ? grammar.nodeActiveRadius : grammar.nodeRadius;
                const clusterColor = CLUSTER_COLORS[node.cluster];

                return (
                  <g key={node.id} className="cursor-pointer">
                    {/* Outer invisible hit zone for proximity */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="18"
                      fill="transparent"
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                    />

                    {/* Visible Node Circle */}
                    <circle
                      id={`node-${node.id}`}
                      cx={pos.x}
                      cy={pos.y}
                      r={radius}
                      fill={isHovered ? clusterColor : scrubProgress > 0.25 ? `${clusterColor}30` : "#FFFFFF"}
                      stroke={isHovered ? clusterColor : scrubProgress > 0.25 ? clusterColor : "rgba(26, 25, 22, 0.35)"}
                      strokeWidth={isHovered ? 2 : 1}
                      style={{
                        transition: "r 0.15s ease-out, fill 0.15s, stroke 0.15s",
                      }}
                    />

                    {/* Node Hover Tooltip/Label */}
                    {isHovered && (
                      <g transform={`translate(${pos.x}, ${pos.y - 14})`}>
                        <rect
                          x="-50"
                          y="-18"
                          width="100"
                          height="22"
                          fill="#FFFFFF"
                          stroke={clusterColor}
                          strokeWidth="1"
                          rx="4"
                        />
                        <text
                          x="0"
                          y="-3"
                          fill={clusterColor}
                          fontSize="10"
                          fontFamily="'Instrument Sans', sans-serif"
                          fontWeight="600"
                          textAnchor="middle"
                        >
                          {node.label}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* 4. Dynamic Interactive Act Status Pill */}
        <div className="relative z-20 w-full max-w-3xl mx-auto pb-1">
          <div className="flex items-center justify-between px-4 py-2 bg-[#F0F7FD]/60 border border-[rgba(56, 189, 248, 0.15)] rounded-xl text-xs font-heading">
            <div className="flex items-center gap-2">
              <span className="text-[#0284C7] font-bold">
                SYSTEM TOPOLOGY:
              </span>
              <span className="text-[#0B1320]/80">
                {activeAct === 1 && "01 DISCRETE // Siloed tools & disconnected vendors drain momentum."}
                {activeAct === 2 && "02 CONVERGED // Code, reach & retention unified into 3 coherent layers."}
                {activeAct === 3 && "03 CLOSED LOOP // Live telemetry feedback autonomously drives iteration."}
              </span>
            </div>
            <span className="hidden md:inline text-[11px] text-[#94A3B8]">
              SCROLL OR CLICK TO SCRUB GRAPH ↓
            </span>
          </div>
        </div>

        {/* 5. Bottom Metadata Chips */}
        <div className="relative z-20 flex flex-wrap items-center justify-center sm:justify-between gap-2.5 pt-3 border-t border-[rgba(56, 189, 248, 0.15)] text-[11px] md:text-xs font-heading text-[#475569]">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#F0F7FD]/60 border border-[rgba(56, 189, 248, 0.15)] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
            <span>100% Client Codebase Sovereignty</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#F0F7FD]/60 border border-[rgba(56, 189, 248, 0.15)] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9794A]" />
            <span>Zero Lock-in // Raw Primitives</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#F0F7FD]/60 border border-[rgba(56, 189, 248, 0.15)] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
            <span>Guaranteed SLA: &lt;24h Architecture Scope</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroGrammarSystem;
