"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { playTickSound } from "@/lib/hooks/use-audio-feedback";
import { motion, AnimatePresence } from "framer-motion";

export interface MuseumExhibit {
  id: string;
  romanId: string;
  title: string;
  client: string;
  clientType: string;
  metric: string;
  desc: string;
  medium: string;
  color: string;
  tags: string[];
}

export const MUSEUM_EXHIBITS: MuseumExhibit[] = [
  {
    id: "01",
    romanId: "EXHIBIT I",
    title: "Luminary Atelier Flagship",
    client: "Luminary Global Brands",
    clientType: "Luxury Direct-to-Consumer",
    metric: "+220% AOV // 4.2× Conversion Rate",
    desc: "A bespoke headless Next.js storefront engineered with edge-rendered product catalogs, sub-second routing, and lightweight WebGL material staging.",
    medium: "Next.js 16 · Shopify Headless · Custom GLSL",
    color: "#ff1e90",
    tags: ["Next.js", "Shopify Headless", "WebGL Shaders"],
  },
  {
    id: "02",
    romanId: "EXHIBIT II",
    title: "Apex Algorithmic Ledger",
    client: "TradeLabs Global",
    clientType: "Institutional Digital Assets",
    metric: "+38% Signups // 140% Session Lift",
    desc: "A sub-millisecond real-time WebGL trading canvas with zero render lag and sub-millisecond WebSocket state synchronisation.",
    medium: "WebGL Shaders · Framer Motion · Next.js",
    color: "#d8ff42",
    tags: ["WebGL", "Framer Motion", "Real-Time Telemetry"],
  },
  {
    id: "03",
    romanId: "EXHIBIT III",
    title: "Axiom Neural Brand OS",
    client: "Axiom Venture Studio",
    clientType: "Series-A Portfolio Incubator",
    metric: "9 Brands Shipped // $14M Seed Closed",
    desc: "An AI-augmented brand generation operating system producing complete design tokens, typography, and production-ready Next.js sites in 72 hours.",
    medium: "Gemini API · Next.js · Supabase · Tailwind",
    color: "#d8ff42",
    tags: ["Gemini API", "Next.js", "Supabase"],
  },
  {
    id: "04",
    romanId: "EXHIBIT IV",
    title: "Chronicle Global Media Engine",
    client: "Chronicle Digital",
    clientType: "Enterprise Media Cloud",
    metric: "2.4× Speedup // +62% Search CTR",
    desc: "Edge-rendered static architecture with intelligent asset prefetching, achieving a 99/100 Lighthouse score and serving 1.8M monthly readers.",
    medium: "Edge SSR · Cloudflare Workers · PostgreSQL",
    color: "#ff1e90",
    tags: ["Edge SSR", "Cloudflare Workers", "Next.js"],
  },
  {
    id: "05",
    romanId: "EXHIBIT V",
    title: "Verve High-Performance Storefront",
    client: "Verve Athletics",
    clientType: "DTC Performance Wear",
    metric: "+84% Mobile Sales // 0.000 CLS",
    desc: "Built from raw primitives with strict zero-layout-shift architecture and instant Apple Pay / Google Pay one-click checkout.",
    medium: "Next.js · Stripe Elements · Tailwind CSS",
    color: "#d8ff42",
    tags: ["Next.js", "Stripe Elements", "Tailwind CSS"],
  },
  {
    id: "06",
    romanId: "EXHIBIT VI",
    title: "Synthetix Autonomous Pipeline",
    client: "Synthetix Cloud",
    clientType: "Enterprise Developer Tools",
    metric: "Zero Latency // +210% Trial Conversions",
    desc: "An interactive in-browser playground compiling Rust WebAssembly with streaming token visualization and instant code generation.",
    medium: "WebAssembly · Rust · Next.js · AI Streaming",
    color: "#ff1e90",
    tags: ["WebAssembly", "Rust", "Next.js"],
  },
];

export function DigitalMuseum() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  // Three.js instances ref
  const stateRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    sculptures: THREE.Group[];
    plinthLights: THREE.PointLight[];
    targetCamX: number;
    targetCamZ: number;
    currentCamX: number;
    currentCamZ: number;
    reqId: number;
  } | null>(null);

  const activeExhibit = MUSEUM_EXHIBITS[currentIndex];

  const navigateTo = useCallback((index: number) => {
    const nextIdx = (index + MUSEUM_EXHIBITS.length) % MUSEUM_EXHIBITS.length;
    setCurrentIndex(nextIdx);
    playTickSound();

    if (stateRef.current) {
      // Calculate target camera position corresponding to selected exhibit station
      const angle = (nextIdx / MUSEUM_EXHIBITS.length) * Math.PI * 2;
      const radius = 16;
      stateRef.current.targetCamX = Math.sin(angle) * radius;
      stateRef.current.targetCamZ = Math.cos(angle) * radius;
    }
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0a0f");
    scene.fog = new THREE.FogExp2("#0a0a0f", 0.035);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const initialAngle = 0;
    const initialRadius = 16;
    const initialX = Math.sin(initialAngle) * initialRadius;
    const initialZ = Math.cos(initialAngle) * initialRadius;
    camera.position.set(initialX, 5, initialZ);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. Ambient & Gallery Lighting
    const ambientLight = new THREE.AmbientLight("#22222e", 1.8);
    scene.add(ambientLight);

    // Central gallery ceiling spotlight
    const centerSpot = new THREE.SpotLight("#ffffff", 120, 40, Math.PI / 4, 0.4, 1.2);
    centerSpot.position.set(0, 18, 0);
    centerSpot.castShadow = true;
    scene.add(centerSpot);

    // 5. Polished Gallery Floor
    const floorGeo = new THREE.PlaneGeometry(80, 80, 40, 40);
    const floorMat = new THREE.MeshStandardMaterial({
      color: "#08080c",
      roughness: 0.25,
      metalness: 0.8,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Floor grid lines
    const grid = new THREE.GridHelper(80, 40, "#ff1e90", "#1e1e28");
    grid.position.y = 0.01;
    scene.add(grid);

    // 6. Plinths & Modern Art Sculptures
    const sculptures: THREE.Group[] = [];
    const plinthLights: THREE.PointLight[] = [];
    const numExhibits = MUSEUM_EXHIBITS.length;
    const galleryRadius = 10;

    // Materials
    const darkMarbleMat = new THREE.MeshStandardMaterial({
      color: "#111116",
      roughness: 0.3,
      metalness: 0.5,
    });
    const neonLimeMat = new THREE.MeshStandardMaterial({
      color: "#d8ff42",
      emissive: "#d8ff42",
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
    });
    const neonPinkMat = new THREE.MeshStandardMaterial({
      color: "#ff1e90",
      emissive: "#ff1e90",
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      transmission: 0.85,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
      thickness: 1.2,
    });

    for (let i = 0; i < numExhibits; i++) {
      const angle = (i / numExhibits) * Math.PI * 2;
      const x = Math.sin(angle) * galleryRadius;
      const z = Math.cos(angle) * galleryRadius;

      const exhibitGroup = new THREE.Group();
      exhibitGroup.position.set(x, 0, z);
      exhibitGroup.lookAt(0, 0, 0);

      // A. Plinth (Pedestal)
      const plinthGeo = new THREE.CylinderGeometry(1.4, 1.6, 2.2, 8);
      const plinth = new THREE.Mesh(plinthGeo, darkMarbleMat);
      plinth.position.y = 1.1;
      plinth.castShadow = true;
      plinth.receiveShadow = true;
      exhibitGroup.add(plinth);

      // Plinth rim glow ring
      const ringGeo = new THREE.TorusGeometry(1.42, 0.04, 8, 32);
      const ringMat = i % 2 === 0 ? neonPinkMat : neonLimeMat;
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 2.21;
      exhibitGroup.add(ring);

      // B. Figurative Modern Art Sculpture atop plinth
      const sculptureGroup = new THREE.Group();
      sculptureGroup.position.y = 3.6;

      if (i === 0) {
        // Exhibit 1: Torus Knot (Continuous Luxury Ribbon)
        const geo = new THREE.TorusKnotGeometry(0.85, 0.24, 96, 16, 2, 3);
        const mesh = new THREE.Mesh(geo, neonPinkMat);
        sculptureGroup.add(mesh);
      } else if (i === 1) {
        // Exhibit 2: Polyhedral Algorithmic Lattice
        const geo = new THREE.IcosahedronGeometry(0.9, 1);
        const mesh = new THREE.Mesh(geo, neonLimeMat);
        const innerGeo = new THREE.OctahedronGeometry(0.5, 0);
        const innerMesh = new THREE.Mesh(innerGeo, glassMat);
        sculptureGroup.add(mesh);
        sculptureGroup.add(innerMesh);
      } else if (i === 2) {
        // Exhibit 3: Dodecahedron Core
        const geo = new THREE.DodecahedronGeometry(0.9, 0);
        const mesh = new THREE.Mesh(geo, neonLimeMat);
        sculptureGroup.add(mesh);
      } else if (i === 3) {
        // Exhibit 4: Hyperbolic Octahedron Ring
        const geo = new THREE.OctahedronGeometry(0.95, 2);
        const mesh = new THREE.Mesh(geo, neonPinkMat);
        sculptureGroup.add(mesh);
      } else if (i === 4) {
        // Exhibit 5: Kinetic Helix Form
        const geo = new THREE.TorusGeometry(0.9, 0.28, 16, 40);
        const mesh = new THREE.Mesh(geo, neonLimeMat);
        sculptureGroup.add(mesh);
      } else {
        // Exhibit 6: Quantum Tetrahedral Crystal
        const geo = new THREE.TetrahedronGeometry(1.0, 1);
        const mesh = new THREE.Mesh(geo, neonPinkMat);
        sculptureGroup.add(mesh);
      }

      exhibitGroup.add(sculptureGroup);

      // C. Point light on plinth
      const pLight = new THREE.PointLight(i % 2 === 0 ? "#ff1e90" : "#d8ff42", 15, 8);
      pLight.position.set(0, 3.6, 0);
      exhibitGroup.add(pLight);
      plinthLights.push(pLight);

      scene.add(exhibitGroup);
      sculptures.push(sculptureGroup);
    }

    stateRef.current = {
      scene,
      camera,
      renderer,
      sculptures,
      plinthLights,
      targetCamX: initialX,
      targetCamZ: initialZ,
      currentCamX: initialX,
      currentCamZ: initialZ,
      reqId: 0,
    };

    // 7. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();
      const state = stateRef.current;
      if (!state) return;

      // Smooth camera interpolation toward target exhibit position
      state.currentCamX += (state.targetCamX - state.currentCamX) * 0.05;
      state.currentCamZ += (state.targetCamZ - state.currentCamZ) * 0.05;
      state.camera.position.x = state.currentCamX;
      state.camera.position.z = state.currentCamZ;
      state.camera.position.y = 4.8;
      state.camera.lookAt(0, 2.5, 0);

      // Rotate modern art sculptures
      state.sculptures.forEach((sculp, idx) => {
        sculp.rotation.y += delta * 0.45 * (idx % 2 === 0 ? 1 : -1);
        sculp.rotation.x += delta * 0.2;
      });

      state.renderer.render(state.scene, state.camera);
      state.reqId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !stateRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      stateRef.current.camera.aspect = w / h;
      stateRef.current.camera.updateProjectionMatrix();
      stateRef.current.renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (stateRef.current) {
        cancelAnimationFrame(stateRef.current.reqId);
        stateRef.current.renderer.dispose();
      }
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden bg-[#0a0a0f] border-b-2 border-black select-none">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Gallery Title Overlay */}
      <div className="absolute top-8 left-6 sm:left-12 z-20 pointer-events-none space-y-1">
        <div className="inline-flex items-center gap-2 bg-black/70 border border-white/20 px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-[2px] uppercase text-[#d8ff42] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#d8ff42] animate-ping" />
          VISTAR 3D DIGITAL PAVILION // CURATED SCULPTURE WING
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-wider text-white">
          The Virtual <span className="font-serif italic text-zinc-400 font-normal lowercase">gallery</span>
        </h2>
      </div>

      {/* Center Curator Placard (Floating Museum Card) */}
      <div className="absolute bottom-8 left-6 sm:left-12 z-20 max-w-md w-full pointer-events-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExhibit.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-[#111116]/90 backdrop-blur-xl border-2 border-white/15 p-6 rounded-2xl shadow-[6px_6px_0px_#000000] text-white space-y-3"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-black text-[#d8ff42] border border-[#d8ff42]/30">
                  {activeExhibit.romanId}
                </span>
                <span className="font-serif italic text-xs text-zinc-400">
                  {activeExhibit.clientType}
                </span>
              </div>
              <span className="font-mono text-[9px] font-extrabold uppercase px-2.5 py-1 rounded bg-[#d8ff42] text-black border border-black shadow-[1px_1px_0px_#000]">
                {activeExhibit.metric.split("//")[0].trim()}
              </span>
            </div>

            <div>
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-white">
                {activeExhibit.title}
              </h3>
              <p className="font-mono text-[8px] uppercase tracking-widest text-zinc-400 mt-0.5">
                Client: {activeExhibit.client} · Medium: {activeExhibit.medium}
              </p>
            </div>

            <p className="font-sans text-xs text-zinc-300 leading-relaxed">
              {activeExhibit.desc}
            </p>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-1.5">
                {activeExhibit.tags.map((t) => (
                  <span key={t} className="font-mono text-[8px] uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href="#catalogue"
                className="font-display text-[9px] font-bold uppercase tracking-widest text-[#d8ff42] hover:text-white transition-colors"
              >
                Full Architecture Spec ↓
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Navigation Dial & Exhibit Selectors */}
      <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex flex-col items-end gap-3 pointer-events-auto">
        <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md p-1.5 rounded-xl border border-white/15 shadow-[4px_4px_0px_#000]">
          <button
            type="button"
            onClick={() => navigateTo(currentIndex - 1)}
            aria-label="Previous Exhibit"
            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#d8ff42] hover:text-black text-white font-mono text-xs font-bold transition-all flex items-center justify-center border border-white/10 active:scale-95 cursor-pointer"
          >
            ←
          </button>

          <div className="px-3 font-mono text-xs font-bold text-zinc-400">
            <span className="text-[#d8ff42]">{currentIndex + 1}</span> / {MUSEUM_EXHIBITS.length}
          </div>

          <button
            type="button"
            onClick={() => navigateTo(currentIndex + 1)}
            aria-label="Next Exhibit"
            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#d8ff42] hover:text-black text-white font-mono text-xs font-bold transition-all flex items-center justify-center border border-white/10 active:scale-95 cursor-pointer"
          >
            →
          </button>
        </div>

        {/* Rapid Station Jumper Pills */}
        <div className="flex gap-1 bg-black/60 backdrop-blur-md p-1 rounded-lg border border-white/10">
          {MUSEUM_EXHIBITS.map((ex, idx) => (
            <button
              key={ex.id}
              onClick={() => navigateTo(idx)}
              className={`w-7 h-7 font-mono text-[9px] font-bold rounded transition-all cursor-pointer ${
                currentIndex === idx
                  ? "bg-[#ff1e90] text-black shadow-[1px_1px_0px_#000]"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {ex.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
