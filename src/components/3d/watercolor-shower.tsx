"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore, getThemeColors } from "@/lib/stores/scroll-store";

const fragmentShader = `
  uniform float uTime;
  uniform float uShowerTime;
  uniform vec3 uColorBase;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;
  
  varying vec2 vUv;
  
  // Hash function for noise
  float hash(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  // 2D Noise
  float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                 mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
  }
  
  void main() {
      // Shower animation logic based on uShowerTime (0.0 to 1.0)
      if (uShowerTime <= 0.0 || uShowerTime >= 1.0) {
          gl_FragColor = vec4(0.0);
          return;
      }
      
      float progress = uShowerTime;
      
      // Distort UV based on noise to make organic watercolor drips
      vec2 uv = vUv;
      float dripNoise = noise(vec2(uv.x * 12.0, uTime * 0.8));
      
      // The leading edge of the water dripping down (from top to bottom)
      // UV.y is 1.0 at the top, 0.0 at the bottom.
      // We want the edge to move from >1.0 down to <0.0
      float yEdge = 1.2 - (progress * 2.5); 
      yEdge += dripNoise * 0.2; // organic uneven edge
      
      // Flowing distortion inside the water
      vec2 q = vec2(0.0);
      q.x = sin(uv.y * 6.0 + uTime * 2.5) * 0.15;
      q.y = cos(uv.x * 6.0 + uTime * 2.5) * 0.15;
      
      float fluid = sin((uv.x + q.x) * 5.0) * cos((uv.y + q.y) * 5.0);
      fluid = smoothstep(-0.6, 0.6, fluid);
      
      // Watercolor palette
      vec3 watercolor = mix(uColorPrimary, uColorSecondary, fluid);
      
      // Add depth drops inside the fluid
      float bubbles = noise(uv * 25.0 + vec2(0.0, uTime * 3.0));
      watercolor = mix(watercolor, vec3(1.0), bubbles * 0.2); // slight white foam
      
      // Is this pixel covered by water? (yEdge is moving down)
      float isWater = smoothstep(yEdge - 0.1, yEdge + 0.1, uv.y);
      
      // Fade out entirely at the end of the transition (progress > 0.5)
      float fadeOut = 1.0 - smoothstep(0.5, 0.9, progress);
      
      float alpha = isWater * fadeOut * 0.95; 
      
      gl_FragColor = vec4(watercolor, alpha);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
  }
`;

export function WatercolorShower() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Track shower state
  const showerTrigger = useScrollStore(state => state.showerTrigger);
  const showerStartTime = useRef(-1);
  const isShowering = useRef(false);
  
  // Reusable colors
  const primaryColor = useRef(new THREE.Color());
  const secondaryColor = useRef(new THREE.Color());
  const baseColor = useRef(new THREE.Color());

  useEffect(() => {
    if (showerTrigger > 0) {
      isShowering.current = true;
      showerStartTime.current = -1; // Flag to capture on next frame inside R3F clock space
    }
  }, [showerTrigger]);

  useFrame((state) => {
    if (!materialRef.current) return;
    
    const prefersReducedMotion = useScrollStore.getState().prefersReducedMotion;
    if (prefersReducedMotion) {
      materialRef.current.uniforms.uShowerTime.value = 0;
      return;
    }
    
    const colors = getThemeColors();
    primaryColor.current.set(colors.primary);
    secondaryColor.current.set(colors.secondary);
    baseColor.current.set(colors.base);
    
    const mat = materialRef.current;
    mat.uniforms.uTime.value = state.clock.getElapsedTime();
    mat.uniforms.uColorBase.value = baseColor.current;
    mat.uniforms.uColorPrimary.value = primaryColor.current;
    mat.uniforms.uColorSecondary.value = secondaryColor.current;
    
    if (isShowering.current) {
      const now = state.clock.getElapsedTime();
      if (showerStartTime.current === -1) {
        showerStartTime.current = now; // Capture R3F elapsedTime safely
      }
      const elapsed = now - showerStartTime.current;
      
      // The shower takes 1.8 seconds to complete
      const SHOWER_DURATION = 1.8;
      let progress = elapsed / SHOWER_DURATION;
      
      if (progress >= 1.0) {
        progress = 1.0;
        isShowering.current = false;
      }
      mat.uniforms.uShowerTime.value = progress;
    } else {
      mat.uniforms.uShowerTime.value = 0;
    }
  });

  return (
    <mesh renderOrder={9999} frustumCulled={false}>
      {/* 2x2 plane covering the screen coordinates exactly (-1 to 1) */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uShowerTime: { value: 0 },
          uColorBase: { value: new THREE.Color() },
          uColorPrimary: { value: new THREE.Color() },
          uColorSecondary: { value: new THREE.Color() }
        }}
        transparent={true}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
