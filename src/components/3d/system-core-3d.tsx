"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface SystemCore3DProps {
  className?: string;
}

export function SystemCore3D({ className = "" }: SystemCore3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    // Master Group for Mouse Tilt & Rotation
    const coreGroup = new THREE.Group();
    // Offset slightly to right on desktop to frame the terminal visual while keeping text clean
    const isDesktop = container.clientWidth >= 1024;
    coreGroup.position.x = isDesktop ? 3.2 : 0;
    scene.add(coreGroup);

    // 1. Inner Geodesic Core
    const innerGeo = new THREE.IcosahedronGeometry(2.0, 1);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0x0a0a0a,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerWireMat);
    coreGroup.add(innerCore);

    // Inner glowing sphere
    const glowGeo = new THREE.SphereGeometry(1.4, 20, 20);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xd8ff42,
      transparent: true,
      opacity: 0.08,
      wireframe: true,
    });
    const glowSphere = new THREE.Mesh(glowGeo, glowMat);
    coreGroup.add(glowSphere);

    // Central pulsing micro-sphere
    const centerPointGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const centerPointMat = new THREE.MeshBasicMaterial({
      color: 0xff1e90,
      transparent: true,
      opacity: 0.85,
    });
    const centerPoint = new THREE.Mesh(centerPointGeo, centerPointMat);
    coreGroup.add(centerPoint);

    // 2. Concentric Gimbal Orbit Rings
    const rings: THREE.LineLoop[] = [];
    const ringConfigs = [
      { radius: 3.6, color: 0x0a0a0a, opacity: 0.25, axis: new THREE.Vector3(1, 0.4, 0.2) },
      { radius: 4.8, color: 0xd8ff42, opacity: 0.65, axis: new THREE.Vector3(0.2, 1, 0.5) },
      { radius: 6.0, color: 0x0a0a0a, opacity: 0.18, axis: new THREE.Vector3(0.6, 0.3, 1) },
      { radius: 7.2, color: 0xff1e90, opacity: 0.45, axis: new THREE.Vector3(-0.4, 1, 0.3) },
    ];

    ringConfigs.forEach((cfg) => {
      const ringPoints: THREE.Vector3[] = [];
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        ringPoints.push(new THREE.Vector3(Math.cos(theta) * cfg.radius, Math.sin(theta) * cfg.radius, 0));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ringMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
        linewidth: 1,
      });
      const ring = new THREE.LineLoop(ringGeo, ringMat);
      // Orient ring
      ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), cfg.axis.normalize());
      coreGroup.add(ring);
      rings.push(ring);
    });

    // 3. Orbiting Telemetry Micro-Nodes
    const satelliteCount = 8;
    const satellites: { mesh: THREE.Mesh; angle: number; speed: number; radius: number; tilt: THREE.Vector3 }[] = [];
    const satGeo = new THREE.BoxGeometry(0.28, 0.28, 0.28);

    for (let i = 0; i < satelliteCount; i++) {
      const isAccent = i % 2 === 0;
      const satMat = new THREE.MeshBasicMaterial({
        color: isAccent ? 0xd8ff42 : 0xff1e90,
        wireframe: i % 3 === 0,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      coreGroup.add(satMesh);
      satellites.push({
        mesh: satMesh,
        angle: (i / satelliteCount) * Math.PI * 2,
        speed: 0.008 + (i % 3) * 0.004,
        radius: 4.8 + (i % 4) * 1.1,
        tilt: new THREE.Vector3((i % 3) - 1, (i % 2) - 0.5, 1).normalize(),
      });
    }

    // 4. Particle Constellation Network
    const nodeCount = 55;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities: { x: number; y: number; z: number }[] = [];
    const spread = 9.5;

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * spread * 2;
      const y = (Math.random() - 0.5) * spread * 2;
      const z = (Math.random() - 0.5) * spread * 1.5;
      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.006,
        y: (Math.random() - 0.5) * 0.006,
        z: (Math.random() - 0.5) * 0.004,
      });
    }

    const nodesGeo = new THREE.BufferGeometry();
    nodesGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));

    // Custom Canvas Texture for circular crisp nodes
    const nodeCanvas = document.createElement("canvas");
    nodeCanvas.width = 32;
    nodeCanvas.height = 32;
    const ctx = nodeCanvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#0a0a0a";
      ctx.beginPath();
      ctx.arc(16, 16, 14, 0, Math.PI * 2);
      ctx.fill();
    }
    const nodeTexture = new THREE.CanvasTexture(nodeCanvas);

    const nodesMat = new THREE.PointsMaterial({
      size: 0.3,
      map: nodeTexture,
      transparent: true,
      opacity: 0.65,
      alphaTest: 0.05,
    });
    const nodes = new THREE.Points(nodesGeo, nodesMat);
    coreGroup.add(nodes);

    // Dynamic Connections between close nodes
    const maxConnections = 120;
    const linePositions = new Float32Array(maxConnections * 6);
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x0a0a0a,
      transparent: true,
      opacity: 0.15,
    });
    const connectionLines = new THREE.LineSegments(linesGeo, linesMat);
    coreGroup.add(connectionLines);

    // Interaction & Animation State
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let isHovered = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Check if mouse is roughly in vertical view
      if (e.clientY < rect.top - 200 || e.clientY > rect.bottom + 200) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.6;
      targetY = y * 1.6;
      isHovered = Math.abs(x) < 0.35 && Math.abs(y) < 0.35;
    };

    const handleScroll = () => {
      scrollY = window.scrollY || 0;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const { width, height } = entries[0].contentRect;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationId: number;
    const startPerfTime = performance.now();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startPerfTime) * 0.001;

      // Smooth mouse damping (lerp)
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Group rotation and perspective tilt
      const hoverSpeedMult = isHovered ? 1.6 : 1.0;
      coreGroup.rotation.y = elapsedTime * 0.15 * hoverSpeedMult + mouseX * 0.8;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.15 - mouseY * 0.8;
      coreGroup.rotation.z = mouseX * 0.2;

      // Scroll reactive camera travel
      const scrollFactor = Math.min(scrollY / 1200, 1);
      camera.position.z = 18 - scrollFactor * 4;
      camera.position.y = -scrollFactor * 2;

      // Inner Core Rotations
      innerCore.rotation.y -= 0.005 * hoverSpeedMult;
      innerCore.rotation.x += 0.003 * hoverSpeedMult;

      glowSphere.rotation.y += 0.008 * hoverSpeedMult;
      glowSphere.rotation.z += 0.004;

      // Pulse central point
      const pulse = 1 + Math.sin(elapsedTime * 4) * 0.25;
      centerPoint.scale.set(pulse, pulse, pulse);

      // Rings spin
      rings.forEach((ring, idx) => {
        const dir = idx % 2 === 0 ? 1 : -1;
        ring.rotation.z += 0.004 * (idx + 1) * dir * hoverSpeedMult;
        ring.rotation.y += 0.002 * (idx + 1) * dir;
      });

      // Satellites orbital motion
      satellites.forEach((sat) => {
        sat.angle += sat.speed * hoverSpeedMult;
        const x = Math.cos(sat.angle) * sat.radius;
        const y = Math.sin(sat.angle) * sat.radius * sat.tilt.y;
        const z = Math.sin(sat.angle) * sat.radius * sat.tilt.z;
        sat.mesh.position.set(x, y, z);
        sat.mesh.rotation.x += 0.02;
        sat.mesh.rotation.y += 0.03;
      });

      // Update particle positions & connections
      const positions = nodesGeo.attributes.position.array as Float32Array;
      let lineIdx = 0;
      const linePos = linesGeo.attributes.position.array as Float32Array;
      const maxDist = 3.2;

      for (let i = 0; i < nodeCount; i++) {
        // Drift
        positions[i * 3] += nodeVelocities[i].x;
        positions[i * 3 + 1] += nodeVelocities[i].y;
        positions[i * 3 + 2] += nodeVelocities[i].z;

        // Bounce within bounds
        if (Math.abs(positions[i * 3]) > spread) nodeVelocities[i].x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > spread) nodeVelocities[i].y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > spread * 0.75) nodeVelocities[i].z *= -1;

        // Find nearest neighbours for connecting lines
        for (let j = i + 1; j < nodeCount; j++) {
          if (lineIdx >= maxConnections * 6) break;

          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDist) {
            linePos[lineIdx++] = positions[i * 3];
            linePos[lineIdx++] = positions[i * 3 + 1];
            linePos[lineIdx++] = positions[i * 3 + 2];
            linePos[lineIdx++] = positions[j * 3];
            linePos[lineIdx++] = positions[j * 3 + 1];
            linePos[lineIdx++] = positions[j * 3 + 2];
          }
        }
      }

      // Zero out remaining line coordinates
      for (let k = lineIdx; k < maxConnections * 6; k++) {
        linePos[k] = 0;
      }

      nodesGeo.attributes.position.needsUpdate = true;
      linesGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();

      // Dispose Geometries & Materials
      innerGeo.dispose();
      innerWireMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      centerPointGeo.dispose();
      centerPointMat.dispose();
      satGeo.dispose();
      nodesGeo.dispose();
      nodesMat.dispose();
      nodeTexture.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      rings.forEach((r) => {
        r.geometry.dispose();
        (r.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}

export default SystemCore3D;
