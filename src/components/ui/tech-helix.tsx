"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

// ─────────────────────────────────────────────────────────────────────────────
// 3D DNA Helix Hero — scroll-driven unwind & scatter
// ─────────────────────────────────────────────────────────────────────────────

interface TechHelixProps {
  scrollProgress: number; // 0 → 1 within this section
}

const HELIX_PARTICLES = 1200;
const HELIX_RADIUS = 2.8;
const HELIX_HEIGHT = 18;
const HELIX_TURNS = 4;

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
    renderer.toneMappingExposure = 0.8;

    // ── Post-processing ─────────────────────────────────────────────────────
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(w, h),
      1.2, 0.4, 0.7
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

      // Helix position
      const x = Math.cos(angle) * HELIX_RADIUS;
      const z = Math.sin(angle) * HELIX_RADIUS;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Scatter target: random sphere positions far away
      const sr = 15 + Math.random() * 25;
      const sTheta = Math.random() * Math.PI * 2;
      const sPhi = Math.acos(Math.random() * 2 - 1);
      scatterTargets[i * 3] = sr * Math.sin(sPhi) * Math.cos(sTheta);
      scatterTargets[i * 3 + 1] = sr * Math.sin(sPhi) * Math.sin(sTheta);
      scatterTargets[i * 3 + 2] = sr * Math.cos(sPhi);

      // Colors: strand 1 = pink, strand 2 = lime, with some randomness
      if (isStrand2) {
        colors[i * 3] = 0.85;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 0.26;
      } else {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.12;
        colors[i * 3 + 2] = 0.56;
      }

      // Add connecting "rungs" between strands
      if (!isStrand2 && idx % 8 === 0) {
        // Slightly brighten rung particles
        colors[i * 3] = 0.7;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 1.0;
      }

      sizes[i] = 1.5 + Math.random() * 2.0;
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
          // subtle breathing
          pos.x += sin(time * 0.5 + position.y * 0.3) * 0.08;
          pos.z += cos(time * 0.4 + position.y * 0.2) * 0.08;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (180.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform float uOpacity;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float glow = exp(-d * 4.0) * 0.6;
          float core = 1.0 - smoothstep(0.0, 0.3, d);
          vec3 col = vColor * (core + glow) + vec3(1.0) * core * 0.3;
          float alpha = (core + glow * 0.8) * uOpacity;
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
        // Rotate the helix
        points.rotation.y = time * 0.15;

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

    // Ease out cubic for smoother scatter
    const t = Math.min(scrollProgress * 1.5, 1);
    const ease = 1 - Math.pow(1 - t, 3);

    for (let i = 0; i < arr.length; i++) {
      arr[i] = basePositions[i] + (scatterTargets[i] - basePositions[i]) * ease;
    }
    posAttr.needsUpdate = true;

    // Fade out as particles scatter
    if (points.material instanceof THREE.ShaderMaterial) {
      points.material.uniforms.uOpacity.value = 1.0 - ease * 0.7;
    }
  }, [scrollProgress]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
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
          opacity: 1 - scrollProgress * 2.5,
          transform: `translateY(${scrollProgress * -60}px)`,
        }}
      >
        <span className="font-mono text-[9px] font-extrabold tracking-[0.3em] text-[#ff1e90] uppercase mb-4 bg-[#ff1e90]/10 border border-[#ff1e90]/20 px-4 py-1.5 rounded">
          Vistar Engineering Core
        </span>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white text-center leading-[0.9]">
          Technology
          <br />
          <span className="bg-gradient-to-r from-[#ff1e90] via-[#d8ff42] to-[#3366ff] bg-clip-text text-transparent">
            &amp; Process
          </span>
        </h1>
        <p className="mt-6 font-sans text-sm sm:text-base text-white/50 text-center max-w-md leading-relaxed">
          We engineer digital systems at the molecular level.
        </p>
      </div>
    </div>
  );
}
