"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, ContactShadows, Stars } from "@react-three/drei";
import * as THREE from "three";

function ShinyDiamond() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  // Create an Icosahedron geometry
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(0.8, 0), []);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} geometry={geometry} position={[1.3, 0.2, 0]}>
        <MeshDistortMaterial
          color="#ff0080"
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.8}
          roughness={0.1}
          distort={0.2}
          speed={2}
        />
        {/* Shiny Edges/Wireframe overlay for a comic/tech hybrid look */}
        <mesh geometry={geometry}>
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.3} />
        </mesh>
      </mesh>
    </Float>
  );
}

export function ShinyArtifactScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ccff00" />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={2} color="#00f0ff" />
        
        <ShinyDiamond />
        
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={1} fade speed={1} />
        
        <Environment preset="city" />
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
}
