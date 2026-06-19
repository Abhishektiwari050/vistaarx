"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import dynamic from "next/dynamic";

function WobblyStar() {
  const groupRef = useRef<THREE.Group>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const { viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;

    // Fast spin on hover
    const speed = hovered ? 3.2 : 0.8;
    groupRef.current.rotation.y += 0.008 * speed;
    groupRef.current.rotation.x += 0.005 * speed;

    // Outer shell wobbly distortion and rotating slightly faster/differently
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.y -= 0.003 * speed;
    }
    // Inner core rotating differently
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y += 0.005 * speed;
      innerMeshRef.current.rotation.z += 0.002 * speed;
    }

    // Gentle floating translation matching mouse pointer coordinates inside viewport bounds
    const targetX = (state.pointer.x * viewport.width) / 5;
    const targetY = (state.pointer.y * viewport.height) / 5;
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.1;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.1;
    
    // Scale spring animation on hover
    const targetScale = hovered ? 1.4 : 1.15;
    groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * 0.12;
    groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * 0.12;
    groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * 0.12;
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Outer Shell: Distorted wireframe icosahedron (colors swap between Neon Pink (#ff1e90) and Lime Green (#d8ff42) on hover) */}
      <mesh ref={outerMeshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={hovered ? "#ff1e90" : "#d8ff42"}
          distort={hovered ? 0.45 : 0.22}
          speed={hovered ? 3.8 : 1.8}
          roughness={0.1}
          metalness={0.9}
          wireframe={true}
          transparent={true}
          opacity={0.85}
        />
      </mesh>

      {/* Inner Core: Solid faceted octahedron (emissive glowing Pink/Lime) */}
      <mesh ref={innerMeshRef} scale={[0.5, 0.5, 0.5]}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color={hovered ? "#d8ff42" : "#ff1e90"}
          emissive={hovered ? "#d8ff42" : "#ff1e90"}
          emissiveIntensity={hovered ? 1.5 : 0.8}
          roughness={0.05}
          metalness={0.95}
        />
      </mesh>
    </group>
  );
}

function InteractiveHero3DCanvas() {
  return (
    <div className="w-20 h-20 sm:w-28 sm:h-28 relative select-none" data-cursor-text="GEOMETRY">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 } as never}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} intensity={1.5} />
        <pointLight position={[-3, -3, -1]} intensity={0.8} color="#ff1e90" />
        <WobblyStar />
      </Canvas>
    </div>
  );
}

export const InteractiveHero3D = dynamic(
  () => Promise.resolve(InteractiveHero3DCanvas),
  { ssr: false }
);

export default InteractiveHero3D;
