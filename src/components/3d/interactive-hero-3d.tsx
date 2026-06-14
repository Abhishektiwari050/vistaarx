"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import dynamic from "next/dynamic";

function WobblyStar() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const { viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;

    // Fast spin on hover
    const speed = hovered ? 3.2 : 0.8;
    meshRef.current.rotation.y += 0.008 * speed;
    meshRef.current.rotation.x += 0.005 * speed;

    // Gentle floating translation matching mouse pointer coordinates inside viewport bounds
    const targetX = (state.pointer.x * viewport.width) / 5;
    const targetY = (state.pointer.y * viewport.height) / 5;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.1;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1;
    
    // Scale spring animation on hover
    const targetScale = hovered ? 1.6 : 1.3;
    meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.12;
    meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.12;
    meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.12;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Geodesic sphere/crystal architecture */}
      <icosahedronGeometry args={[1, 1]} />
      <MeshDistortMaterial
        color={hovered ? "#ff1e90" : "#d8ff42"}
        distort={hovered ? 0.45 : 0.22}
        speed={hovered ? 3.8 : 1.8}
        roughness={0.1}
        metalness={0.9}
        wireframe={true}
        transparent={true}
        opacity={0.9}
      />
    </mesh>
  );
}

function InteractiveHero3DCanvas() {
  return (
    <div className="w-16 h-16 sm:w-24 sm:h-24 relative select-none" data-cursor-text="GEOMETRY">
      <Canvas
        camera={{ position: [0, 0, 2.5], fof: 45 } as never}
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
