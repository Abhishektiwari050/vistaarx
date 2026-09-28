"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { playTickSound, playTensionDrone, playTearSnapSound } from "@/lib/hooks/use-audio-feedback";

type PreloadPhase = "logo_only" | "brand_reveal" | "tear" | "done";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform float uTension;
  uniform float uTearProgress;
  uniform vec2 uResolution;
  uniform vec3 uColorBase;
  uniform vec3 uColorShadow;

  varying vec2 vUv;

  // Multi-frequency domain-warped wave simulating undulating silk cloth and liquid water
  float getClothWave(vec2 p, float t, float tension) {
    float w = 0.0;
    // Primary silk drape folds
    w += sin(p.x * 3.2 + t * 1.1) * cos(p.y * 2.6 + t * 0.85) * 0.45;
    
    // Tension ripples (frequency increases with tensile strain)
    float freq = 6.0 + tension * 8.0;
    w += sin((p.x + w * 0.4) * freq - t * 1.7) * cos((p.y - w * 0.4) * (freq * 0.9) + t * 1.3) * (0.28 + tension * 0.15);
    
    // Micro silk sheen & water meniscus ripples
    w += sin(p.x * 15.0 + p.y * 13.0 + t * 2.6) * (0.07 + tension * 0.1);
    return w;
  }

  void main() {
    // Aspect-ratio corrected center coordinates
    vec2 aspect = vec2(uResolution.x / min(uResolution.x, uResolution.y), uResolution.y / min(uResolution.x, uResolution.y));
    vec2 cUv = (vUv - 0.5) * aspect;
    float r = length(cUv);

    // Radial strain ripples expanding from the center mark
    float radialWave = sin(r * 22.0 - uTime * 4.0) * exp(-r * 2.0) * uTension * 0.28;

    // Normal calculation via finite differences for real-time silk specular lighting
    float eps = 0.006;
    float hC = getClothWave(cUv, uTime, uTension) + radialWave;
    float hR = getClothWave(cUv + vec2(eps, 0.0), uTime, uTension) + sin((r + eps) * 22.0 - uTime * 4.0) * exp(-(r + eps) * 2.0) * uTension * 0.28;
    float hU = getClothWave(cUv + vec2(0.0, eps), uTime, uTension) + sin((r + eps) * 22.0 - uTime * 4.0) * exp(-(r + eps) * 2.0) * uTension * 0.28;

    vec3 normal = normalize(vec3(-(hR - hC) / eps, -(hU - hC) / eps, 1.0));
    
    // Directional studio lighting
    vec3 lightDir = normalize(vec3(0.5, 0.75, 0.9));
    
    // Specular silk / liquid sheen
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 24.0);

    // Color gradient across cloth folds (from Titanium shadow to Liquid Platinum)
    vec3 clothColor = mix(uColorShadow, uColorBase, smoothstep(-0.45, 0.45, hC));
    // Pure neutral silver / liquid specular sheen (absolutely zero warm tint or copper)
    vec3 silverSheen = vec3(1.0, 1.0, 1.0);
    clothColor += silverSheen * spec * 0.35;

    // -------------------------------------------------------------
    // ORGANIC TEAR & PARTING BOUNDARY (4 Cardinal Tearing Physics)
    // -------------------------------------------------------------
    float angle = atan(cUv.y, cUv.x);
    // 4-lobe bias matching the 4 cardinal arrows pulling the fabric
    float quadMod = 1.0 + 0.35 * cos(angle * 4.0);
    
    // Fluid boundary distortion using domain waves
    float tearDist = (r / (quadMod + 0.01)) - (hC * 0.22);

    // Exact corner distance in UV space: length(aspect * 0.5)
    float cornerDist = length(aspect) * 0.52;
    float currentRadius = uTearProgress * (cornerDist * 1.25);

    float tearMask = 1.0;
    float edgeLip = 0.0;
    float edgeShadow = 0.0;

    if (uTearProgress > 0.001) {
      tearMask = smoothstep(currentRadius - 0.06, currentRadius + 0.04, tearDist);
      edgeLip = (1.0 - smoothstep(0.0, 0.09, abs(tearDist - currentRadius))) * (1.0 - uTearProgress * 0.6);
      edgeShadow = smoothstep(currentRadius, currentRadius + 0.12, tearDist) * (1.0 - smoothstep(currentRadius + 0.12, currentRadius + 0.26, tearDist));
      
      // Warm ivory fabric torn rim and depth shadow
      clothColor = mix(clothColor, vec3(0.1, 0.098, 0.086), edgeShadow * 0.35);
      clothColor = mix(clothColor, vec3(1.0, 0.98, 0.95), edgeLip * 0.6);
    }

    // Alpha is 0 where the cloth has parted, revealing the website beneath
    float alpha = tearMask;

    gl_FragColor = vec4(clothColor, alpha);
  }
`;

export function Preloader() {
  const [phase, setPhase] = useState<PreloadPhase>("logo_only");
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasTriggeredBrandPhase = useRef(false);
  const hasTriggeredDrone = useRef(false);
  const hasTriggeredTearPhase = useRef(false);
  const hasTriggeredDonePhase = useRef(false);

  // Mount detection for Next.js hydration safety
  useEffect(() => {
    // Mandatory on every sequence/refresh. Only bypass for test automation via ?nopreload
    if (typeof window !== "undefined") {
      const isBypassed =
        window.location.search.includes("nopreload") ||
        (window as unknown as { __disablePreloader?: boolean }).__disablePreloader;
      if (isBypassed) {
        setVisible(false);
        setPhase("done");
        return;
      }
    }
    setMounted(true);
  }, []);

  // WebGL and timing engine (runs once mounted === true)
  useEffect(() => {
    if (!mounted || !visible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize Three.js scene
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);

    const uniforms = {
      uTime: { value: 0 },
      uTension: { value: 0 },
      uTearProgress: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uColorBase: { value: new THREE.Color("#F9F7F2") }, // Warm Ivory
      uColorShadow: { value: new THREE.Color("#D5CFC3") }, // Parchment Shadow Fold
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const startTime = performance.now();
    let animId = 0;

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Choreographed Render Loop:
    // 0.0s - 1.5s: ONLY the 4-arrow logo mark is displayed on Liquid Platinum & Titanium fluid cloth
    // 1.5s - 3.4s: Brand name VISTAR slides up smoothly with zero layout shift & tension builds
    // 3.4s - 6.4s: The 4 arrows tear outward in 4 cardinal directions (North UP, South DOWN, East RIGHT, West LEFT)
    // 6.4s - 7.0s: Full parting holds as hero settles in with luxurious confidence
    // 7.0s: Graceful unmount / exit dissolve
    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000; // seconds

      uniforms.uTime.value = elapsed;
      if (typeof window !== 'undefined') (window as any).__preloaderElapsed = elapsed;

      // Phase 2: Brand name VISTAR slides up (one-shot state trigger at 1.5s)
      if (elapsed >= 1.5 && !hasTriggeredBrandPhase.current) {
        hasTriggeredBrandPhase.current = true;
        setPhase("brand_reveal");
        playTickSound(720, 0.035, 0.01);
      }

      // Tension builds in fabric starting at 2.6s leading into tear at 3.4s
      if (elapsed >= 2.6 && elapsed < 3.4) {
        const tensionT = (elapsed - 2.6) / 0.8;
        uniforms.uTension.value = Math.min(1.0, tensionT);
        if (!hasTriggeredDrone.current) {
          hasTriggeredDrone.current = true;
          playTensionDrone(1.4, 0.016);
        }
      }

      // Phase 3: Arrows tear in 4 directions (one-shot state trigger at 3.4s)
      if (elapsed >= 3.4) {
        if (!hasTriggeredTearPhase.current) {
          hasTriggeredTearPhase.current = true;
          setPhase("tear");
          playTearSnapSound(0.024);
        }
        uniforms.uTension.value = 1.0;

        // Majestic 3.0s tear progression: 3.4s -> 6.4s
        const rawTearT = Math.min(1.0, Math.max(0, (elapsed - 3.4) / 3.0));
        // Organic sinusoidal ease: steady, continuous parting clearing all 4 corners
        const smoothTear = 0.5 * (1.0 - Math.cos(Math.PI * rawTearT));
        uniforms.uTearProgress.value = smoothTear;
      }

      // Phase 4: Settle hold until 7.0s, then unmount with smooth exit dissolve
      if (elapsed >= 7.0 && !hasTriggeredDonePhase.current) {
        hasTriggeredDonePhase.current = true;
        setPhase("done");
        setVisible(false);
        return;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPhase("done");
        setVisible(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [mounted]);

  const isTear = phase === "tear" || phase === "done";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          key="vistar-preloader-curtain"
          id="vistar-preloader-curtain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
          className={`fixed inset-0 z-[99999] overflow-hidden select-none pointer-events-none transition-colors duration-300 ${
            mounted ? "bg-transparent" : "bg-[#F9F7F2]"
          }`}
          aria-label="Vistar Entrance"
        >
          {/* ============================================================ */}
          {/* WEBGL SILK CLOTH & LIQUID WATER TEARING SURFACE              */}
          {/* (Liquid Platinum & Titanium Gray - 100% Monochrome)          */}
          {/* ============================================================ */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block pointer-events-none"
            style={{ width: "100%", height: "100%" }}
          />

          {/* ============================================================ */}
          {/* LOGO & VISTAR BRAND SEQUENCE                                 */}
          {/* ============================================================ */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            {/* Center stationary anchor container - NEVER jumps or layout shifts */}
            <div className="relative flex items-center justify-center">
              
              {/* THE 4 ARROWS EMBLEM (Stationary anchor at exact viewport center) */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
                
                {/* Central beacon (dissolves outward when tearing - sleek obsidian with silver halo) */}
                <motion.div
                  animate={isTear ? { scale: 3.2, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute w-2.5 h-2.5 rounded-full bg-[#151515] border border-[#A1A1AA] shadow-[0_0_6px_rgba(21,21,21,0.4)]" 
                />

                {/* 1. NORTH ARROW: TEARS UPWARD (-75vh) */}
                <motion.div
                  animate={
                    isTear
                      ? { y: "-75vh", scale: 1.2, opacity: [1, 1, 0.9, 0] }
                      : { y: 0, scale: 1, opacity: 1 }
                  }
                  transition={
                    isTear
                      ? {
                          y: { duration: 2.8, ease: [0.22, 1, 0.36, 1] },
                          scale: { duration: 2.8, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.9, delay: 1.8, ease: "easeOut" },
                        }
                      : { duration: 0.3 }
                  }
                  className="absolute top-1 sm:top-2 flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 64 64"
                    className="w-9 sm:w-12 h-9 sm:h-12 drop-shadow-[0_4px_10px_rgba(21,21,21,0.32)]"
                    fill="none"
                  >
                    <polygon
                      points="32,6 56,52 8,52"
                      fill="#151515"
                      stroke="#27272A"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <polygon
                      points="32,16 48,46 16,46"
                      fill="#151515"
                      stroke="#A1A1AA"
                      strokeWidth="0.85"
                      strokeOpacity="0.85"
                    />
                  </svg>
                </motion.div>

                {/* 2. SOUTH ARROW: TEARS DOWNWARD (+75vh) */}
                <motion.div
                  animate={
                    isTear
                      ? { y: "75vh", scale: 1.2, opacity: [1, 1, 0.9, 0] }
                      : { y: 0, scale: 1, opacity: 1 }
                  }
                  transition={
                    isTear
                      ? {
                          y: { duration: 2.8, ease: [0.22, 1, 0.36, 1] },
                          scale: { duration: 2.8, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.9, delay: 1.8, ease: "easeOut" },
                        }
                      : { duration: 0.3 }
                  }
                  className="absolute bottom-1 sm:bottom-2 flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 64 64"
                    className="w-9 sm:w-12 h-9 sm:h-12 drop-shadow-[0_6px_12px_rgba(21,21,21,0.32)]"
                    fill="none"
                  >
                    <polygon
                      points="32,58 8,12 56,12"
                      fill="#151515"
                      stroke="#27272A"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <polygon
                      points="32,48 16,18 48,18"
                      fill="#151515"
                      stroke="#A1A1AA"
                      strokeWidth="0.85"
                      strokeOpacity="0.85"
                    />
                  </svg>
                </motion.div>

                {/* 3. EAST ARROW: TEARS RIGHTWARD (+75vw) */}
                <motion.div
                  animate={
                    isTear
                      ? { x: "75vw", scale: 1.2, opacity: [1, 1, 0.9, 0] }
                      : { x: 0, scale: 1, opacity: 1 }
                  }
                  transition={
                    isTear
                      ? {
                          x: { duration: 2.8, ease: [0.22, 1, 0.36, 1] },
                          scale: { duration: 2.8, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.9, delay: 1.8, ease: "easeOut" },
                        }
                      : { duration: 0.3 }
                  }
                  className="absolute right-1 sm:right-2 flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 64 64"
                    className="w-9 sm:w-12 h-9 sm:h-12 drop-shadow-[4px_0_10px_rgba(21,21,21,0.32)]"
                    fill="none"
                  >
                    <polygon
                      points="58,32 12,56 12,8"
                      fill="#151515"
                      stroke="#27272A"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <polygon
                      points="48,32 18,48 18,16"
                      fill="#151515"
                      stroke="#A1A1AA"
                      strokeWidth="0.85"
                      strokeOpacity="0.85"
                    />
                  </svg>
                </motion.div>

                {/* 4. WEST ARROW: TEARS LEFTWARD (-75vw) */}
                <motion.div
                  animate={
                    isTear
                      ? { x: "-75vw", scale: 1.2, opacity: [1, 1, 0.9, 0] }
                      : { x: 0, scale: 1, opacity: 1 }
                  }
                  transition={
                    isTear
                      ? {
                          x: { duration: 2.8, ease: [0.22, 1, 0.36, 1] },
                          scale: { duration: 2.8, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.9, delay: 1.8, ease: "easeOut" },
                        }
                      : { duration: 0.3 }
                  }
                  className="absolute left-1 sm:left-2 flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 64 64"
                    className="w-9 sm:w-12 h-9 sm:h-12 drop-shadow-[-4px_0_10px_rgba(21,21,21,0.32)]"
                    fill="none"
                  >
                    <polygon
                      points="6,32 52,8 52,56"
                      fill="#151515"
                      stroke="#27272A"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <polygon
                      points="16,32 46,16 46,48"
                      fill="#151515"
                      stroke="#A1A1AA"
                      strokeWidth="0.85"
                      strokeOpacity="0.85"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* VISTAR BRAND NAME (Anchored below emblem with ZERO layout shift) */}
              <div className="absolute top-full pt-3 sm:pt-4 pointer-events-none flex items-center justify-center whitespace-nowrap">
                <motion.div
                  initial={{ y: 16, opacity: 0, filter: "blur(4px)" }}
                  animate={
                    phase === "logo_only"
                      ? { y: 16, opacity: 0, filter: "blur(4px)" }
                      : isTear
                      ? { opacity: 0, scale: 0.94, filter: "blur(6px)" }
                      : { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }
                  }
                  transition={
                    isTear
                      ? { duration: 0.6, ease: "easeOut" }
                      : { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="font-display font-black text-xl sm:text-2xl tracking-[0.38em] text-[#151515] uppercase select-none flex items-center justify-center drop-shadow-[0_2px_8px_rgba(21,21,21,0.18)]"
                >
                  VISTAR
                </motion.div>
              </div>

            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
