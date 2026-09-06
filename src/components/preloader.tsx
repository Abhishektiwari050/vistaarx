"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { playTensionDrone, playTearSnapSound } from "@/lib/hooks/use-audio-feedback";

type PreloadPhase = "still" | "tension" | "tear" | "done";

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
  uniform vec3 uColorCopper;
  uniform vec3 uColorHighlight;

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

    // Color gradient across cloth folds (from Mineral shadow to Warm Ivory)
    vec3 clothColor = mix(uColorShadow, uColorBase, smoothstep(-0.45, 0.45, hC));
    clothColor += uColorHighlight * spec * 0.4;

    // -------------------------------------------------------------
    // ORGANIC TEAR & PARTING BOUNDARY (Unseen Studio Fluid Physics)
    // -------------------------------------------------------------
    float angle = atan(cUv.y, cUv.x);
    // 4-lobe bias matching the 4 cardinal arrows pulling the fabric
    float quadMod = 1.0 + 0.32 * cos(angle * 4.0);
    
    // Fluid boundary distortion using domain waves
    float tearDist = (r / (quadMod + 0.01)) - (hC * 0.22);

    // Exact corner distance in UV space: length(aspect * 0.5)
    float cornerDist = length(aspect) * 0.52;
    float currentRadius = uTearProgress * (cornerDist * 1.18);

    float tearMask = 1.0;
    float edgeLip = 0.0;
    float edgeShadow = 0.0;

    if (uTearProgress > 0.001) {
      tearMask = smoothstep(currentRadius - 0.06, currentRadius + 0.04, tearDist);
      edgeLip = (1.0 - smoothstep(0.0, 0.09, abs(tearDist - currentRadius))) * (1.0 - uTearProgress * 0.6);
      edgeShadow = smoothstep(currentRadius, currentRadius + 0.12, tearDist) * (1.0 - smoothstep(currentRadius + 0.12, currentRadius + 0.26, tearDist));
      
      clothColor = mix(clothColor, vec3(0.08, 0.08, 0.08), edgeShadow * 0.4);
      clothColor = mix(clothColor, uColorCopper, edgeLip * 0.85);
      clothColor += uColorHighlight * edgeLip * 0.55;
    }

    // Alpha is 0 where the cloth has parted, revealing the website beneath
    float alpha = tearMask;

    gl_FragColor = vec4(clothColor, alpha);
  }
`;

export function Preloader() {
  const [phase, setPhase] = useState<PreloadPhase>("still");
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasTriggeredDrone = useRef(false);
  const hasTriggeredSnap = useRef(false);

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
      uColorBase: { value: new THREE.Color("#F4F1EA") },
      uColorShadow: { value: new THREE.Color("#D8D3C9") },
      uColorCopper: { value: new THREE.Color("#B87333") },
      uColorHighlight: { value: new THREE.Color("#D29A68") },
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

    // Render loop
    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000; // seconds

      uniforms.uTime.value = elapsed;

      // Phase 1 -> 2: Tension (1.6s to 3.0s)
      if (elapsed >= 1.6 && elapsed < 3.0) {
        setPhase((prev) => (prev !== "tension" && prev !== "tear" && prev !== "done" ? "tension" : prev));
        const tensionT = (elapsed - 1.6) / 1.4;
        uniforms.uTension.value = Math.min(1.0, tensionT);

        if (!hasTriggeredDrone.current) {
          hasTriggeredDrone.current = true;
          playTensionDrone(1.4, 0.016);
        }
      }

      // Phase 2 -> 3: Tear & Parting to its End (3.0s to 4.8s)
      if (elapsed >= 3.0) {
        setPhase((prev) => (prev !== "tear" && prev !== "done" ? "tear" : prev));
        uniforms.uTension.value = 1.0;

        if (!hasTriggeredSnap.current) {
          hasTriggeredSnap.current = true;
          playTearSnapSound(0.024);
        }

        const rawTearT = Math.min(1.0, Math.max(0, (elapsed - 3.0) / 1.8)); // 1.8s
        // Smooth easeInOut curve across the full 1.8s so the tear sweeps to the ends
        const smoothTear = rawTearT < 0.5
          ? 2.0 * rawTearT * rawTearT
          : 1.0 - Math.pow(-2.0 * rawTearT + 2.0, 2.0) / 2.0;
        uniforms.uTearProgress.value = smoothTear;
      }

      // Phase 4: Complete Unmount at 5.0s
      if (elapsed >= 5.0) {
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
  }, [mounted, visible]);

  if (!mounted || !visible) return null;

  const isTension = phase === "tension";
  const isTear = phase === "tear" || phase === "done";

  // Heavy mechanical pull transitioning into fluid dispersal
  const tensionEase = [0.22, 1, 0.36, 1] as const;
  const tearEase = [0.76, 0, 0.24, 1] as const;

  return (
    <AnimatePresence>
      {visible && (
        <div 
          className="fixed inset-0 z-[99999] overflow-hidden select-none pointer-events-none"
          aria-label="Vistar Entrance"
        >
          {/* ============================================================ */}
          {/* WEBGL SILK CLOTH & LIQUID WATER TEARING SURFACE              */}
          {/* ============================================================ */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block pointer-events-none"
            style={{ width: "100%", height: "100%" }}
          />

          {/* ============================================================ */}
          {/* ONLY THE 4 ICONIC ARROWS (Zero Text, Zero Extra Clutter)     */}
          {/* ============================================================ */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">

              {/* NORTH ARROW */}
              <motion.div
                initial={{ y: 0 }}
                animate={
                  isTear
                    ? { y: "-95vh", scale: 1.05, opacity: 0 }
                    : isTension
                    ? { y: -38 }
                    : { y: 0 }
                }
                transition={
                  isTear
                    ? { duration: 1.6, ease: tearEase }
                    : { duration: 1.4, ease: tensionEase }
                }
                className="absolute top-1 sm:top-2 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 64 64"
                  className="w-14 sm:w-18 h-14 sm:h-18 drop-shadow-[0_8px_18px_rgba(21,21,21,0.32)]"
                  fill="none"
                >
                  <polygon
                    points="32,6 56,52 8,52"
                    fill="#151515"
                    stroke="#8C542C"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="32,16 48,46 16,46"
                    fill="#151515"
                    stroke="#D29A68"
                    strokeWidth="0.75"
                    strokeOpacity="0.75"
                  />
                </svg>
              </motion.div>

              {/* EAST ARROW */}
              <motion.div
                initial={{ x: 0 }}
                animate={
                  isTear
                    ? { x: "95vw", scale: 1.05, opacity: 0 }
                    : isTension
                    ? { x: 38 }
                    : { x: 0 }
                }
                transition={
                  isTear
                    ? { duration: 1.6, ease: tearEase }
                    : { duration: 1.4, ease: tensionEase }
                }
                className="absolute right-1 sm:right-2 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 64 64"
                  className="w-14 sm:w-18 h-14 sm:h-18 drop-shadow-[8px_0_18px_rgba(21,21,21,0.32)]"
                  fill="none"
                >
                  <polygon
                    points="58,32 12,56 12,8"
                    fill="#151515"
                    stroke="#8C542C"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="48,32 18,48 18,16"
                    fill="#151515"
                    stroke="#D29A68"
                    strokeWidth="0.75"
                    strokeOpacity="0.75"
                  />
                </svg>
              </motion.div>

              {/* SOUTH ARROW */}
              <motion.div
                initial={{ y: 0 }}
                animate={
                  isTear
                    ? { y: "95vh", scale: 1.05, opacity: 0 }
                    : isTension
                    ? { y: 38 }
                    : { y: 0 }
                }
                transition={
                  isTear
                    ? { duration: 1.6, ease: tearEase }
                    : { duration: 1.4, ease: tensionEase }
                }
                className="absolute bottom-1 sm:bottom-2 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 64 64"
                  className="w-14 sm:w-18 h-14 sm:h-18 drop-shadow-[0_10px_20px_rgba(21,21,21,0.32)]"
                  fill="none"
                >
                  <polygon
                    points="32,58 8,12 56,12"
                    fill="#151515"
                    stroke="#8C542C"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="32,48 16,18 48,18"
                    fill="#151515"
                    stroke="#D29A68"
                    strokeWidth="0.75"
                    strokeOpacity="0.75"
                  />
                </svg>
              </motion.div>

              {/* WEST ARROW */}
              <motion.div
                initial={{ x: 0 }}
                animate={
                  isTear
                    ? { x: "-95vw", scale: 1.05, opacity: 0 }
                    : isTension
                    ? { x: -38 }
                    : { x: 0 }
                }
                transition={
                  isTear
                    ? { duration: 1.6, ease: tearEase }
                    : { duration: 1.4, ease: tensionEase }
                }
                className="absolute left-1 sm:left-2 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 64 64"
                  className="w-14 sm:w-18 h-14 sm:h-18 drop-shadow-[-8px_0_18px_rgba(21,21,21,0.32)]"
                  fill="none"
                >
                  <polygon
                    points="6,32 52,8 52,56"
                    fill="#151515"
                    stroke="#8C542C"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="16,32 46,16 46,48"
                    fill="#151515"
                    stroke="#D29A68"
                    strokeWidth="0.75"
                    strokeOpacity="0.75"
                  />
                </svg>
              </motion.div>

            </div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
