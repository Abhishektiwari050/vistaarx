"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useScroll, motion, useTransform } from "framer-motion";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";

interface GenomeMilestone {
  progressRange: [number, number];
  romanId: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  color: string;
  tags: string[];
}

const GENOME_MILESTONES: GenomeMilestone[] = [
  {
    progressRange: [0.0, 0.25],
    romanId: "SEQUENCE I",
    title: "The Genomic Substrate",
    subtitle: "Zero-bloat edge foundation",
    description: "Every digital organism begins at the substrate. We strip away heavy templates and CMS dependencies, engineering directly on edge compute with sub-second TTFB and zero layout shift.",
    metric: "< 120ms TTFB // 0KB Bloat",
    color: "#d8ff42",
    tags: ["Next.js 16", "Cloudflare Workers", "Edge SSR"],
  },
  {
    progressRange: [0.25, 0.5],
    romanId: "SEQUENCE II",
    title: "Figurative Synthetics",
    subtitle: "Modern art aesthetic engineering",
    description: "Modern web experiences require visceral emotional resonance. We craft bespoke WebGL shaders and procedural geometries that evoke modern figurative sculpture while maintaining 60–120 FPS Retina fidelity.",
    metric: "60 FPS Retina // Custom GLSL",
    color: "#ff1e90",
    tags: ["Three.js", "GLSL Shaders", "Procedural Geometry"],
  },
  {
    progressRange: [0.5, 0.75],
    romanId: "SEQUENCE III",
    title: "Neural Synaptic Bus",
    subtitle: "Sub-millisecond real-time state",
    description: "Dynamic data flows through bi-directional WebSocket streams and edge AI interfaces. Low-latency state synchronization creates instantaneous tactile user feedback without UI stall.",
    metric: "0.000 CLS // Real-Time AI",
    color: "#d8ff42",
    tags: ["WebSockets", "Gemini API", "Supabase Realtime"],
  },
  {
    progressRange: [0.75, 1.0],
    romanId: "SEQUENCE IV",
    title: "Sovereign Monolith",
    subtitle: "100% Client IP Ownership",
    description: "The culmination of engineering purity. Complete unencumbered GitHub source code handover on day 21. No vendor handcuffs, no fragile plugin licenses, full enterprise valuation.",
    metric: "100% Code Ownership // Day 21",
    color: "#ff1e90",
    tags: ["GitHub CI/CD", "TypeScript", "Audit Handover"],
  },
];

type RenderMode = "wireframe" | "sculptural" | "particles";

export function ScrollDnaSequencer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [renderMode, setRenderMode] = useState<RenderMode>("wireframe");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);

  // Framer Motion scroll tracking over the entire multi-height container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Reference for Three.js instances and animation values
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    helixGroup: THREE.Group;
    bustGroup: THREE.Group;
    particlesMesh: THREE.Points;
    rungsGroup: THREE.Group;
    materials: THREE.Material[];
    scrollProgress: number;
    mouse: THREE.Vector2;
    targetMouse: THREE.Vector2;
    reqId: number | null;
  } | null>(null);

  // Auto-play interval ref
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize Three.js with scrollYProgress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (!sceneRef.current) return;
      sceneRef.current.scrollProgress = latest;

      // Update frame counter (1 to 240 frames)
      const frame = Math.min(240, Math.max(1, Math.floor(latest * 239) + 1));
      setCurrentFrame(frame);

      // Determine milestone
      const milestoneIdx = GENOME_MILESTONES.findIndex(
        (m) => latest >= m.progressRange[0] && latest <= m.progressRange[1]
      );
      if (milestoneIdx !== -1 && milestoneIdx !== activeMilestoneIndex) {
        setActiveMilestoneIndex(milestoneIdx);
        playTickSound();
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, activeMilestoneIndex]);

  // Setup Three.js Scene
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.022);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 10, 24);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xd8ff42, 2.5);
    keyLight.position.set(15, 25, 15);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xff1e90, 2.2);
    fillLight.position.set(-15, -10, -10);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 3.0, 50);
    rimLight.position.set(0, 0, -10);
    scene.add(rimLight);

    const materials: THREE.Material[] = [];

    // 4. DNA Double Helix Geometry
    const helixGroup = new THREE.Group();
    const rungsGroup = new THREE.Group();
    helixGroup.add(rungsGroup);

    const strandPointsA: THREE.Vector3[] = [];
    const strandPointsB: THREE.Vector3[] = [];
    const totalTurns = 4;
    const totalPoints = 160;
    const helixRadius = 5.5;
    const helixHeight = 50;

    const rungSphereGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const rungCylinderGeo = new THREE.CylinderGeometry(0.06, 0.06, 1, 8);

    const limeMat = new THREE.MeshStandardMaterial({
      color: 0xd8ff42,
      emissive: 0xd8ff42,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const pinkMat = new THREE.MeshStandardMaterial({
      color: 0xff1e90,
      emissive: 0xff1e90,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.9,
    });
    materials.push(limeMat, pinkMat, nodeMat);

    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      const angle = t * Math.PI * 2 * totalTurns;
      const y = (t - 0.5) * helixHeight;

      const xA = Math.cos(angle) * helixRadius;
      const zA = Math.sin(angle) * helixRadius;
      const posA = new THREE.Vector3(xA, y, zA);
      strandPointsA.push(posA);

      const xB = Math.cos(angle + Math.PI) * helixRadius;
      const zB = Math.sin(angle + Math.PI) * helixRadius;
      const posB = new THREE.Vector3(xB, y, zB);
      strandPointsB.push(posB);

      // Nucleotide Rungs every 4 points
      if (i % 3 === 0) {
        const rungGroup = new THREE.Group();

        // Node A
        const nodeA = new THREE.Mesh(rungSphereGeo, i % 6 === 0 ? limeMat : pinkMat);
        nodeA.position.copy(posA);
        rungGroup.add(nodeA);

        // Node B
        const nodeB = new THREE.Mesh(rungSphereGeo, i % 6 === 0 ? pinkMat : limeMat);
        nodeB.position.copy(posB);
        rungGroup.add(nodeB);

        // Connector Bar
        const barMat = i % 6 === 0 ? limeMat : pinkMat;
        const bar = new THREE.Mesh(rungCylinderGeo, barMat);
        const midPoint = new THREE.Vector3().addVectors(posA, posB).multiplyScalar(0.5);
        const distance = posA.distanceTo(posB);
        bar.position.copy(midPoint);
        bar.scale.set(1, distance, 1);
        bar.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3().subVectors(posB, posA).normalize()
        );
        rungGroup.add(bar);

        rungsGroup.add(rungGroup);
      }
    }

    // Continuous Backbone Tubes
    const curveA = new THREE.CatmullRomCurve3(strandPointsA);
    const tubeGeoA = new THREE.TubeGeometry(curveA, 200, 0.16, 8, false);
    const tubeMeshA = new THREE.Mesh(
      tubeGeoA,
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.1,
        wireframe: false,
      })
    );
    helixGroup.add(tubeMeshA);

    const curveB = new THREE.CatmullRomCurve3(strandPointsB);
    const tubeGeoB = new THREE.TubeGeometry(curveB, 200, 0.16, 8, false);
    const tubeMeshB = new THREE.Mesh(
      tubeGeoB,
      new THREE.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.9,
        roughness: 0.2,
        wireframe: false,
      })
    );
    helixGroup.add(tubeMeshB);

    scene.add(helixGroup);

    // 5. Figurative Modern Art Centerpiece: Abstract Geometric Bust & Monolith
    const bustGroup = new THREE.Group();

    // Sculptural faceted head silhouette (constructed with faceted icosahedron + torus crown + pedestal)
    const headGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const wireframeMat = new THREE.MeshStandardMaterial({
      color: 0xd8ff42,
      wireframe: true,
      emissive: 0xd8ff42,
      emissiveIntensity: 0.4,
    });
    const headMesh = new THREE.Mesh(headGeo, wireframeMat);
    headMesh.position.set(0, 1.2, 0);
    headMesh.scale.set(1.1, 1.6, 1.2);
    bustGroup.add(headMesh);

    // Inner Glowing Core (representing artificial neural intelligence)
    const coreGeo = new THREE.OctahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xff1e90,
      emissive: 0xff1e90,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, 1.2, 0);
    bustGroup.add(coreMesh);

    // Orbital Halo Rings (Golden Ratio Modern Art)
    const ringGeoA = new THREE.TorusGeometry(3.6, 0.05, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ringA = new THREE.Mesh(ringGeoA, ringMat);
    ringA.rotation.x = Math.PI / 3;
    bustGroup.add(ringA);

    const ringGeoB = new THREE.TorusGeometry(4.2, 0.04, 16, 100);
    const ringB = new THREE.Mesh(ringGeoB, limeMat);
    ringB.rotation.y = Math.PI / 4;
    ringB.rotation.x = -Math.PI / 6;
    bustGroup.add(ringB);

    // Monolithic Pedestal
    const baseGeo = new THREE.CylinderGeometry(1.5, 2.0, 3.5, 6);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.8,
      roughness: 0.3,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.set(0, -2.5, 0);
    bustGroup.add(baseMesh);

    bustGroup.position.set(0, 0, 0);
    scene.add(bustGroup);

    materials.push(wireframeMat, coreMat, ringMat, baseMat);

    // 6. Quantum Particle Matrix (Caustic Data Points)
    const particleCount = 1800;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cLime = new THREE.Color(0xd8ff42);
    const cPink = new THREE.Color(0xff1e90);
    const cWhite = new THREE.Color(0xffffff);

    for (let p = 0; p < particleCount; p++) {
      const radius = 3.0 + Math.random() * 14.0;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 55;

      particlePositions[p * 3] = Math.cos(theta) * radius;
      particlePositions[p * 3 + 1] = y;
      particlePositions[p * 3 + 2] = Math.sin(theta) * radius;

      const choice = Math.random();
      const col = choice > 0.6 ? cLime : choice > 0.3 ? cPink : cWhite;
      particleColors[p * 3] = col.r;
      particleColors[p * 3 + 1] = col.g;
      particleColors[p * 3 + 2] = col.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particlesMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particlesMesh);
    materials.push(particleMat);

    // Save references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      helixGroup,
      bustGroup,
      particlesMesh,
      rungsGroup,
      materials,
      scrollProgress: 0,
      mouse: new THREE.Vector2(0, 0),
      targetMouse: new THREE.Vector2(0, 0),
      reqId: null,
    };

    // 7. Mouse move parallax handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      sceneRef.current.targetMouse.set(x * 0.8, y * 0.8);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 8. Resize Handler
    const handleResize = () => {
      if (!container || !sceneRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      sceneRef.current.camera.aspect = w / h;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 9. Animation Loop (Scrubbed by scrollProgress + interactive mouse)
    let clock = new THREE.Clock();

    const animate = () => {
      if (!sceneRef.current) return;
      const {
        camera,
        renderer,
        scene: s,
        helixGroup: hg,
        bustGroup: bg,
        particlesMesh: pm,
        targetMouse,
        mouse,
      } = sceneRef.current;

      const elapsed = clock.getElapsedTime();
      const p = sceneRef.current.scrollProgress;

      // Smooth mouse lerp
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Camera 3D trajectory based on scrub progress p (0.0 to 1.0)
      // Simulating a cinematic frame-by-frame camera flythrough through the DNA interior
      const camY = 16 - p * 32;
      const camRadius = 22 - Math.sin(p * Math.PI) * 7;
      const camAngle = p * Math.PI * 3 + mouse.x * 0.4;

      const targetCamX = Math.cos(camAngle) * camRadius + mouse.x * 2.5;
      const targetCamZ = Math.sin(camAngle) * camRadius;
      const targetCamY = camY + mouse.y * 2.5;

      camera.position.x += (targetCamX - camera.position.x) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;

      // Look at center with dynamic vertical bias
      const lookAtY = (0.5 - p) * 14;
      camera.lookAt(0, lookAtY, 0);

      // Rotate inner modern art bust
      bg.rotation.y = elapsed * 0.4 + p * Math.PI * 2;
      coreMesh.rotation.x = elapsed * 0.8;
      coreMesh.rotation.y = elapsed * 1.2;
      ringA.rotation.z = elapsed * 0.3;
      ringB.rotation.z = -elapsed * 0.4;

      // Rotate DNA strand subtly
      hg.rotation.y = elapsed * 0.15;

      // Particles slow drift
      pm.rotation.y = -elapsed * 0.05;

      renderer.render(s, camera);
      sceneRef.current.reqId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (sceneRef.current?.reqId) {
        cancelAnimationFrame(sceneRef.current.reqId);
      }
      materials.forEach((m) => m.dispose());
      scene.clear();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update render modes (wireframe vs sculptural vs particles)
  useEffect(() => {
    if (!sceneRef.current) return;
    const { helixGroup, bustGroup, particlesMesh } = sceneRef.current;

    if (renderMode === "wireframe") {
      helixGroup.visible = true;
      bustGroup.visible = true;
      particlesMesh.visible = true;
      helixGroup.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          (child.material as THREE.MeshStandardMaterial).wireframe = false;
        }
      });
      bustGroup.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          (child.material as THREE.MeshStandardMaterial).wireframe = true;
        }
      });
    } else if (renderMode === "sculptural") {
      helixGroup.visible = true;
      bustGroup.visible = true;
      particlesMesh.visible = false;
      bustGroup.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          (child.material as THREE.MeshStandardMaterial).wireframe = false;
        }
      });
    } else if (renderMode === "particles") {
      helixGroup.visible = false;
      bustGroup.visible = true;
      particlesMesh.visible = true;
      bustGroup.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          (child.material as THREE.MeshStandardMaterial).wireframe = true;
        }
      });
    }
  }, [renderMode]);

  // Handle Autoplay preview
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playTickSound();
      autoPlayRef.current = setInterval(() => {
        if (!sceneRef.current) return;
        let next = sceneRef.current.scrollProgress + 0.004;
        if (next > 1.0) next = 0.0;
        sceneRef.current.scrollProgress = next;
        setCurrentFrame(Math.min(240, Math.max(1, Math.floor(next * 239) + 1)));

        const milestoneIdx = GENOME_MILESTONES.findIndex(
          (m) => next >= m.progressRange[0] && next <= m.progressRange[1]
        );
        if (milestoneIdx !== -1) {
          setActiveMilestoneIndex(milestoneIdx);
        }
      }, 1000 / 60);
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const activeMilestone = GENOME_MILESTONES[activeMilestoneIndex] || GENOME_MILESTONES[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320vh] bg-black text-white selection:bg-[#d8ff42] selection:text-black"
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Three.js Canvas Container */}
        <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing" />

        {/* ── Top HUD Bar ─────────────────────────────────────────────────── */}
        <div className="relative z-10 w-full p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
          
          {/* Brand & Sequence Telemetry */}
          <div className="flex items-center gap-3 bg-black/80 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl pointer-events-auto shadow-[4px_4px_0px_#d8ff42]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d8ff42] animate-ping" />
            <div className="font-mono text-[10px] font-black uppercase tracking-widest text-white">
              CODE DNA SEQUENCER <span className="text-zinc-500">//</span> 3D FIGURATIVE CORE
            </div>
          </div>

          {/* Virtual Frame Counter HUD */}
          <div className="flex items-center gap-3 bg-black/80 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl pointer-events-auto font-mono text-[10px] shadow-[4px_4px_0px_#ff1e90]">
            <span className="text-zinc-400">FRAME:</span>
            <span className="text-[#d8ff42] font-black tracking-widest">
              [{String(currentFrame).padStart(3, "0")} / 240]
            </span>
            <span className="text-zinc-500">|</span>
            <span className="text-zinc-300">SCRUB: 60FPS</span>
          </div>

          {/* Controls: Play/Pause + Render Mode Switcher */}
          <div className="flex items-center gap-2 pointer-events-auto bg-black/80 backdrop-blur-md border border-white/20 p-1.5 rounded-xl">
            <button
              onClick={togglePlay}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider transition-all interactive ${
                isPlaying
                  ? "bg-[#ff1e90] text-white shadow-[2px_2px_0px_#000]"
                  : "bg-white text-black hover:bg-[#d8ff42]"
              }`}
            >
              {isPlaying ? "❚❚ PAUSE FILM" : "▶ PLAY REEL"}
            </button>

            <div className="h-4 w-px bg-white/20 mx-1" />

            {(["wireframe", "sculptural", "particles"] as RenderMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  playTickSound();
                  setRenderMode(mode);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider transition-all interactive ${
                  renderMode === mode
                    ? "bg-[#d8ff42] text-black shadow-[2px_2px_0px_#000]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* ── Center / Floating Telemetry Card (Active Milestone) ─────────────── */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 w-full my-auto pointer-events-none">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <motion.div
              key={activeMilestone.romanId}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="md:col-span-6 bg-black/85 backdrop-blur-xl border-2 border-white/30 p-6 sm:p-8 rounded-2xl shadow-[8px_8px_0px_rgba(216,255,66,0.8)] pointer-events-auto space-y-4"
            >
              {/* Badge & Roman Numerals */}
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-[9px] font-black uppercase px-2.5 py-1 rounded border border-black shadow-[1.5px_1.5px_0px_#000]"
                    style={{ backgroundColor: activeMilestone.color, color: "#000" }}
                  >
                    {activeMilestone.romanId}
                  </span>
                  <span className="font-serif italic text-xs text-zinc-300">
                    {activeMilestone.subtitle}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                  TELEMETRY ACTIVE
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
                {activeMilestone.title}
              </h2>

              <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {activeMilestone.description}
              </p>

              {/* Metric & Technology Tags */}
              <div className="pt-2 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
                <span
                  className="font-mono text-[10px] font-black tracking-widest uppercase"
                  style={{ color: activeMilestone.color }}
                >
                  {activeMilestone.metric}
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {activeMilestone.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[8px] font-bold uppercase px-2 py-0.5 rounded bg-white/10 border border-white/10 text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom Scrub Bar & Navigation Helper ─────────────────────────── */}
        <div className="relative z-10 w-full p-6 sm:p-8 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-none">
          
          {/* Scroll Scrubber Visual Progress */}
          <div className="w-full max-w-md pointer-events-auto space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[8px] text-zinc-400 uppercase tracking-widest">
              <span>001 PRIMITIVES</span>
              <span className="text-[#d8ff42] font-bold">SCROLL PARALLAX SCRUBBER</span>
              <span>240 SOVEREIGNTY</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/20 relative">
              <div
                className="h-full bg-gradient-to-r from-[#d8ff42] via-[#ff1e90] to-[#d8ff42] transition-all duration-75"
                style={{ width: `${(currentFrame / 240) * 100}%` }}
              />
            </div>
          </div>

          {/* Quick Jump down to Simulator */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest hidden md:inline-block">
              SCROLL DOWN TO SCRUB SEQUENCE
            </span>
            <a
              href="#simulator"
              className="px-4 py-2 bg-[#d8ff42] text-black font-display font-black text-[9px] uppercase tracking-widest rounded-xl border border-black shadow-[3px_3px_0px_#fff] hover:bg-white hover:shadow-[3px_3px_0px_#ff1e90] transition-all interactive"
            >
              Skip to Spec ↓
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
