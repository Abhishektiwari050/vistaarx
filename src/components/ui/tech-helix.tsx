"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// 3D DNA Helix Hero — scroll-driven unwind & scatter
// ─────────────────────────────────────────────────────────────────────────────

interface TechHelixProps {
  scrollProgress: number; // 0 → 1 within this section
}

const HELIX_PARTICLES = 1400;
const HELIX_RADIUS = 2.6;
const HELIX_HEIGHT = 20;
const HELIX_TURNS = 5;

export function TechHelix({ scrollProgress }: TechHelixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    composer: EffectComposer;
    points: THREE.Points;
    basePositions: Float32Array;
    scatterTargets: Float32Array;
  } | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    // ── Scene setup ─────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;

    // ── Post-processing ─────────────────────────────────────────────────────
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(w, h),
      1.4, 0.35, 0.65
    );
    composer.addPass(bloom);

    // ── Generate double helix geometry ──────────────────────────────────────
    const positions = new Float32Array(HELIX_PARTICLES * 3);
    const colors = new Float32Array(HELIX_PARTICLES * 3);
    const sizes = new Float32Array(HELIX_PARTICLES);
    const scatterTargets = new Float32Array(HELIX_PARTICLES * 3);

    const halfCount = HELIX_PARTICLES / 2;

    for (let i = 0; i < HELIX_PARTICLES; i++) {
      const isStrand2 = i >= halfCount;
      const idx = isStrand2 ? i - halfCount : i;
      const t = idx / halfCount;

      const angle = t * Math.PI * 2 * HELIX_TURNS + (isStrand2 ? Math.PI : 0);
      const y = (t - 0.5) * HELIX_HEIGHT;

      const x = Math.cos(angle) * HELIX_RADIUS;
      const z = Math.sin(angle) * HELIX_RADIUS;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Scatter target: random sphere positions
      const sr = 18 + Math.random() * 28;
      const sTheta = Math.random() * Math.PI * 2;
      const sPhi = Math.acos(Math.random() * 2 - 1);
      scatterTargets[i * 3] = sr * Math.sin(sPhi) * Math.cos(sTheta);
      scatterTargets[i * 3 + 1] = sr * Math.sin(sPhi) * Math.sin(sTheta);
      scatterTargets[i * 3 + 2] = sr * Math.cos(sPhi);

      // Colors
      if (isStrand2) {
        colors[i * 3] = 0.85;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 0.26; // lime
      } else {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.12;
        colors[i * 3 + 2] = 0.56; // pink
      }

      // Cross-rungs: bright blue
      if (!isStrand2 && idx % 6 === 0) {
        colors[i * 3] = 0.2;
        colors[i * 3 + 1] = 0.4;
        colors[i * 3 + 2] = 1.0;
      }

      sizes[i] = 1.8 + Math.random() * 2.2;
    }

    const basePositions = new Float32Array(positions);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uOpacity: { value: 1.0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        void main() {
          vColor = color;
          vec3 pos = position;
          pos.x += sin(time * 0.45 + position.y * 0.25) * 0.07;
          pos.z += cos(time * 0.35 + position.y * 0.18) * 0.07;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (200.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform float uOpacity;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float glow = exp(-d * 3.5) * 0.65;
          float core = 1.0 - smoothstep(0.0, 0.28, d);
          vec3 col = vColor * (core + glow) + vec3(1.0) * core * 0.25;
          float alpha = (core + glow * 0.85) * uOpacity;
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    sceneRef.current = {
      renderer,
      scene,
      camera,
      composer,
      points,
      basePositions,
      scatterTargets,
    };

    setIsReady(true);

    // ── Animation loop ──────────────────────────────────────────────────────
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      if (sceneRef.current) {
        const { points, composer } = sceneRef.current;
        points.rotation.y = time * 0.12;

        if (points.material instanceof THREE.ShaderMaterial) {
          points.material.uniforms.time.value = time;
        }

        composer.render();
      }
    };

    animate();

    // ── Resize ──────────────────────────────────────────────────────────────
    const handleResize = () => {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
      composer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  // ── Scroll-driven particle interpolation ──────────────────────────────────
  useEffect(() => {
    if (!sceneRef.current) return;
    const { points, basePositions, scatterTargets } = sceneRef.current;
    const posAttr = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    const progress = typeof scrollProgress === "number" && !isNaN(scrollProgress) ? scrollProgress : 0;
    const t = Math.min(progress * 1.4, 1);
    const ease = 1 - Math.pow(1 - t, 3);

    for (let i = 0; i < arr.length; i++) {
      arr[i] = basePositions[i] + (scatterTargets[i] - basePositions[i]) * ease;
    }
    posAttr.needsUpdate = true;

    if (points.material instanceof THREE.ShaderMaterial) {
      points.material.uniforms.uOpacity.value = 1.0 - ease * 0.75;
    }
  }, [scrollProgress]);

  const textOpacity = Math.max(0, 1 - scrollProgress * 2.2);
  const textY = scrollProgress * -70;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Ambient radial glow behind text */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,30,144,0.08) 0%, rgba(216,255,66,0.04) 40%, transparent 70%)",
        }}
      />

      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Title overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none px-6"
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 16 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-mono text-[9px] font-extrabold tracking-[0.35em] text-[#ff1e90] uppercase mb-6 bg-[#ff1e90]/10 border border-[#ff1e90]/25 px-5 py-2 rounded flex items-center gap-2"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff1e90] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ff1e90]" />
          </span>
          Vistar Engineering Core
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 24 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black uppercase tracking-tighter text-white text-center leading-[0.88]"
          style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)" }}
        >
          Technology
          <br />
          <span className="bg-gradient-to-r from-[#ff1e90] via-[#d8ff42] to-[#3366ff] bg-clip-text text-transparent">
            &amp; Process
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 16 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-8 font-sans text-sm sm:text-base text-white/45 text-center max-w-md leading-relaxed"
        >
          We engineer digital systems at the molecular level —<br className="hidden sm:block" />
          from particle shaders to edge-deployed compute.
        </motion.p>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 12 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {[
            { label: "Build Speed", val: "7–21 Days" },
            { label: "Page Load", val: "<1s TTFB" },
            { label: "Ownership", val: "100% Yours" },
          ].map((pill) => (
            <div
              key={pill.label}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded px-4 py-2 backdrop-blur-sm"
            >
              <span className="font-mono text-[8px] uppercase tracking-widest text-white/35">{pill.label}</span>
              <span className="font-display font-bold text-xs text-[#d8ff42]">{pill.val}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none select-none"
        style={{ opacity: Math.max(0, 1 - scrollProgress * 4) }}
      >
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/25">
          Scroll to explore
        </span>
        <div className="w-5 h-9 rounded-full border border-white/15 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-2.5 rounded-full bg-[#ff1e90]"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
