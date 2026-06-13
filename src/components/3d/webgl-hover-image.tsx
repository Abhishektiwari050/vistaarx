"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Custom liquid displacement shader material
const LiquidDistortionMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uHover: 0.0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uTime: 0.0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform vec2 uMouse;
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      float dist = distance(uv, uMouse);
      
      // Fine-tuned noise ripple wave inspired by Garden Eight
      float ripple = sin(uv.y * 10.0 + uTime * 2.5) * 0.025 * uHover;
      
      // Cursor displacement field
      if (dist < 0.35) {
        float force = (1.0 - dist / 0.35) * 0.05 * uHover;
        uv += normalize(uv - uMouse) * force;
      }
      
      uv.x += ripple;
      vec4 color = texture2D(uTexture, uv);
      gl_FragColor = color;
    }
  `
);

// Register the custom shader material to use it as JSX tag
extend({ LiquidDistortionMaterial });

function ImagePlane({ imgUrl }: { imgUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const texture = useLoader(THREE.TextureLoader, imgUrl);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uHover = THREE.MathUtils.lerp(
        materialRef.current.uHover,
        hovered ? 1.0 : 0.0,
        0.08
      );
      materialRef.current.uTime = state.clock.getElapsedTime();
      materialRef.current.uMouse.lerp(mouseRef.current, 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerMove={(e: any) => {
        if (e.uv) mouseRef.current.copy(e.uv);
      }}
    >
      <planeGeometry args={[3.2, 4.2, 32, 32]} />
      {/* @ts-ignore */}
      <liquidDistortionMaterial 
        ref={materialRef} 
        uTexture={texture} 
        transparent 
      />
    </mesh>
  );
}

export function WebGLHoverImage({ imgUrl, className = "" }: { imgUrl: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <React.Suspense fallback={null}>
          <ImagePlane imgUrl={imgUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

export default WebGLHoverImage;
