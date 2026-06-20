"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  client: string;
  metric: string;
  desc: string;
  tags: string[];
  status: string;
}

interface SphereRoomProps {
  projects: Project[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const SPHERE_RADIUS = 800;
const PANEL_COUNT_OFFSET = Math.PI * 2; // full circle
const AUTO_ROTATE_SPEED = 0.3;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export function SphereRoom({ projects }: SphereRoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const webglCanvasRef = useRef<HTMLCanvasElement>(null);
  const cssContainerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const threeRefs = useRef<{
    scene: THREE.Scene | null;
    cssScene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    webglRenderer: THREE.WebGLRenderer | null;
    cssRenderer: CSS3DRenderer | null;
    composer: EffectComposer | null;
    controls: OrbitControls | null;
    animationId: number | null;
    particles: THREE.Points | null;
    wireframe: THREE.LineSegments | null;
    glowRings: THREE.Mesh[];
    panelPositions: { position: THREE.Vector3; lookAt: THREE.Vector3 }[];
  }>({
    scene: null,
    cssScene: null,
    camera: null,
    webglRenderer: null,
    cssRenderer: null,
    composer: null,
    controls: null,
    animationId: null,
    particles: null,
    wireframe: null,
    glowRings: [],
    panelPositions: [],
  });

  // ─── Snap camera to a project panel ───────────────────────────────────────
  const snapToPanel = useCallback((index: number) => {
    const refs = threeRefs.current;
    if (!refs.camera || !refs.controls) return;

    const pos = refs.panelPositions[index];
    if (!pos) return;

    // Calculate camera position: between center and panel, closer to center
    const cameraTarget = pos.position.clone().multiplyScalar(0.35);
    cameraTarget.y = pos.position.y * 0.5;

    // Smooth tween using animation
    const startPos = refs.camera.position.clone();
    const startTarget = refs.controls.target.clone();
    const endTarget = new THREE.Vector3(0, 0, 0);
    const duration = 1200;
    const startTime = Date.now();

    const tweenCamera = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - t, 3);

      refs.camera!.position.lerpVectors(startPos, cameraTarget, ease);
      refs.controls!.target.lerpVectors(startTarget, endTarget, ease);
      refs.controls!.update();

      if (t < 1) {
        requestAnimationFrame(tweenCamera);
      }
    };

    tweenCamera();
  }, []);

  // ─── Initialize Three.js scenes ──────────────────────────────────────────
  useEffect(() => {
    if (!webglCanvasRef.current || !cssContainerRef.current) return;

    const refs = threeRefs.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // ── Camera ──────────────────────────────────────────────────────────────
    refs.camera = new THREE.PerspectiveCamera(65, width / height, 1, 5000);
    refs.camera.position.set(0, 50, SPHERE_RADIUS * 0.4);

    // ── WebGL Scene (3D environment) ────────────────────────────────────────
    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x050510, 0.0004);

    // ── CSS3D Scene (HTML panels) ───────────────────────────────────────────
    refs.cssScene = new THREE.Scene();

    // ── WebGL Renderer ──────────────────────────────────────────────────────
    refs.webglRenderer = new THREE.WebGLRenderer({
      canvas: webglCanvasRef.current,
      antialias: true,
      alpha: true,
    });
    refs.webglRenderer.setSize(width, height);
    refs.webglRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.webglRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.webglRenderer.toneMappingExposure = 0.6;

    // ── CSS3D Renderer ──────────────────────────────────────────────────────
    refs.cssRenderer = new CSS3DRenderer();
    refs.cssRenderer.setSize(width, height);
    refs.cssRenderer.domElement.style.position = "absolute";
    refs.cssRenderer.domElement.style.top = "0";
    refs.cssRenderer.domElement.style.left = "0";
    refs.cssRenderer.domElement.style.pointerEvents = "none";
    cssContainerRef.current.appendChild(refs.cssRenderer.domElement);

    // ── Post-processing ─────────────────────────────────────────────────────
    refs.composer = new EffectComposer(refs.webglRenderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.6, 0.3, 0.85
    );
    refs.composer.addPass(bloom);

    // ── Orbit Controls ──────────────────────────────────────────────────────
    refs.controls = new OrbitControls(refs.camera, refs.cssRenderer.domElement);
    refs.controls.enableDamping = true;
    refs.controls.dampingFactor = 0.05;
    refs.controls.enableZoom = false;
    refs.controls.enablePan = false;
    refs.controls.autoRotate = true;
    refs.controls.autoRotateSpeed = AUTO_ROTATE_SPEED;
    refs.controls.minPolarAngle = Math.PI * 0.25;
    refs.controls.maxPolarAngle = Math.PI * 0.75;
    refs.cssRenderer.domElement.style.pointerEvents = "auto";

    // ── Build scene elements ────────────────────────────────────────────────
    createSphereWireframe(refs);
    createParticles(refs);
    createGlowRings(refs);
    createProjectPanels(refs, projects);

    // ── Ambient light ───────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0x334466, 0.5);
    refs.scene.add(ambient);

    // ── Animation loop ──────────────────────────────────────────────────────
    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      // Update controls
      if (refs.controls) refs.controls.update();

      // Rotate wireframe slowly
      if (refs.wireframe) {
        refs.wireframe.rotation.y += 0.0003;
        refs.wireframe.rotation.x += 0.0001;
      }

      // Animate particles
      if (refs.particles && refs.particles.material instanceof THREE.ShaderMaterial) {
        refs.particles.material.uniforms.time.value = time;
      }

      // Animate glow rings
      refs.glowRings.forEach((ring, i) => {
        ring.rotation.z += 0.001 * (i % 2 === 0 ? 1 : -1);
        if (ring.material instanceof THREE.ShaderMaterial) {
          ring.material.uniforms.time.value = time;
        }
      });

      // Render
      if (refs.composer) refs.composer.render();
      if (refs.cssRenderer && refs.cssScene && refs.camera) {
        refs.cssRenderer.render(refs.cssScene, refs.camera);
      }
    };

    animate();
    setIsLoaded(true);

    // ── Resize handler ──────────────────────────────────────────────────────
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (refs.camera) {
        refs.camera.aspect = w / h;
        refs.camera.updateProjectionMatrix();
      }
      if (refs.webglRenderer) refs.webglRenderer.setSize(w, h);
      if (refs.cssRenderer) refs.cssRenderer.setSize(w, h);
      if (refs.composer) refs.composer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // ── Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener("resize", handleResize);
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      if (refs.controls) refs.controls.dispose();

      // Dispose WebGL resources
      if (refs.particles) {
        refs.particles.geometry.dispose();
        const mat = refs.particles.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat.dispose();
      }
      if (refs.wireframe) {
        refs.wireframe.geometry.dispose();
        const mat = refs.wireframe.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat.dispose();
      }
      refs.glowRings.forEach((ring) => {
        ring.geometry.dispose();
        const mat = ring.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat.dispose();
      });
      if (refs.webglRenderer) refs.webglRenderer.dispose();

      // Remove CSS3D renderer DOM element
      if (refs.cssRenderer && cssContainerRef.current) {
        try {
          cssContainerRef.current.removeChild(refs.cssRenderer.domElement);
        } catch {
          // Already removed
        }
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Build functions ──────────────────────────────────────────────────────

  function createSphereWireframe(refs: typeof threeRefs.current) {
    const geo = new THREE.SphereGeometry(SPHERE_RADIUS, 32, 24);
    const wireGeo = new THREE.WireframeGeometry(geo);
    const mat = new THREE.LineBasicMaterial({
      color: 0x1a2a4a,
      transparent: true,
      opacity: 0.15,
    });
    refs.wireframe = new THREE.LineSegments(wireGeo, mat);
    refs.scene!.add(refs.wireframe);
    geo.dispose();
  }

  function createParticles(refs: typeof threeRefs.current) {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribute inside the sphere
      const r = Math.random() * SPHERE_RADIUS * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 2 + 0.5;

      // Color: mostly white, some pink, some lime
      const colorChoice = Math.random();
      if (colorChoice < 0.7) {
        colors[i * 3] = 0.6; colors[i * 3 + 1] = 0.7; colors[i * 3 + 2] = 0.9;
      } else if (colorChoice < 0.85) {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.12; colors[i * 3 + 2] = 0.56; // pink
      } else {
        colors[i * 3] = 0.85; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 0.26; // lime
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        void main() {
          vColor = color;
          vec3 pos = position;
          pos.x += sin(time * 0.2 + position.y * 0.01) * 3.0;
          pos.y += cos(time * 0.15 + position.z * 0.01) * 2.0;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (250.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.0, 0.5, d);
          gl_FragColor = vec4(vColor, alpha * 0.6);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    refs.particles = new THREE.Points(geo, mat);
    refs.scene!.add(refs.particles);
  }

  function createGlowRings(refs: typeof threeRefs.current) {
    const ringColors = [0xff1e90, 0xd8ff42, 0x3366ff];
    ringColors.forEach((color, i) => {
      const geo = new THREE.RingGeometry(
        SPHERE_RADIUS * (0.6 + i * 0.12),
        SPHERE_RADIUS * (0.6 + i * 0.12) + 1.5,
        64
      );
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          ringColor: { value: new THREE.Color(color) },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 ringColor;
          varying vec2 vUv;
          void main() {
            float pulse = sin(time * 1.5 + vUv.x * 20.0) * 0.3 + 0.7;
            gl_FragColor = vec4(ringColor * pulse, 0.2 * pulse);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.x = Math.PI * 0.5 + (i - 1) * 0.3;
      ring.rotation.y = i * 0.5;
      refs.scene!.add(ring);
      refs.glowRings.push(ring);
    });
  }

  function createProjectPanels(
    refs: typeof threeRefs.current,
    projects: Project[]
  ) {
    refs.panelPositions = [];

    projects.forEach((project, i) => {
      const angle = (i / projects.length) * PANEL_COUNT_OFFSET - Math.PI / 2;
      const dist = SPHERE_RADIUS * 0.55;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;
      const y = (i - 1) * 30; // slight vertical stagger

      // Create the HTML element for the card
      const el = document.createElement("div");
      el.className = "sphere-card";
      el.dataset.projectId = project.id;
      el.innerHTML = `
        <div class="sphere-card-inner">
          <div class="sphere-card-header">
            <span class="sphere-card-id">${project.id} // CASE_STUDY</span>
            <span class="sphere-card-metric">${project.metric.split(" // ")[0]}</span>
          </div>
          <h2 class="sphere-card-title">${project.title}</h2>
          <p class="sphere-card-client">Client: ${project.client}</p>
          <p class="sphere-card-desc">${project.desc}</p>
          <div class="sphere-card-tags">
            ${project.tags.map((t) => `<span class="sphere-tag">${t}</span>`).join("")}
          </div>
          <div class="sphere-card-status">
            <span class="sphere-status-dot"></span>
            <span class="sphere-status-text">${project.status}</span>
          </div>
        </div>
      `;

      // Make card clickable
      el.style.pointerEvents = "auto";
      el.style.cursor = "pointer";
      el.addEventListener("click", () => {
        setActiveProject(project.id);
        snapToPanel(i);
      });

      const cssObject = new CSS3DObject(el);
      cssObject.position.set(x, y, z);
      // Face toward center
      cssObject.lookAt(0, y, 0);
      cssObject.scale.set(0.5, 0.5, 0.5);

      refs.cssScene!.add(cssObject);
      refs.panelPositions.push({
        position: new THREE.Vector3(x, y, z),
        lookAt: new THREE.Vector3(0, y, 0),
      });
    });
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#050510] overflow-hidden"
    >
      {/* WebGL canvas (3D environment) */}
      <canvas
        ref={webglCanvasRef}
        className={`absolute inset-0 w-full h-full z-0 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* CSS3D container (HTML panels in 3D) */}
      <div
        ref={cssContainerRef}
        className={`absolute inset-0 z-10 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Title overlay */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none select-none">
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-[#ff1e90] font-bold block mb-2">
          {projects.length} Projects // Selected Work
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white/90">
          Case Studies
        </h1>
        <p className="font-mono text-[9px] tracking-widest uppercase text-white/35 mt-1.5">
          Drag to explore &nbsp;·&nbsp; Click panel to focus
        </p>
      </div>

      {/* Right-side project navigator */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-auto">
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => { setActiveProject(p.id); snapToPanel(i); }}
            className="group flex items-center gap-2.5 cursor-pointer"
            aria-label={`Focus project ${p.id}: ${p.title}`}
          >
            <div
              className="text-right hidden sm:block"
              style={{ opacity: activeProject === p.id ? 1 : 0, transition: "opacity 0.3s" }}
            >
              <div className="font-mono text-[7px] text-[#d8ff42] uppercase tracking-wider font-bold">{p.id}</div>
            </div>
            <div
              className="w-1 h-5 rounded-full transition-all duration-300"
              style={{
                background: activeProject === p.id ? '#ff1e90' : 'rgba(255,255,255,0.12)',
                transform: activeProject === p.id ? 'scaleY(1.4)' : 'scaleY(1)',
                boxShadow: activeProject === p.id ? '0 0 10px #ff1e90' : 'none',
              }}
            />
          </button>
        ))}
      </div>

      {/* Active project indicator */}
      {activeProject && (() => {
        const proj = projects.find(p => p.id === activeProject);
        return (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none max-w-sm w-full">
            <div className="font-mono text-[9px] tracking-widest text-center bg-black/70 backdrop-blur-sm border border-[#ff1e90]/20 px-5 py-2.5 rounded-lg">
              <span className="text-[#ff1e90] uppercase font-extrabold mr-2">{activeProject}</span>
              <span className="text-white/60 uppercase">{proj?.title}</span>
              <span className="text-white/25 mx-2">//</span>
              <span className="text-[#d8ff42] font-bold uppercase text-[8px]">{proj?.client}</span>
            </div>
          </div>
        );
      })()}

      {/* Inline styles for sphere cards */}
      <style jsx global>{`
        .sphere-card {
          width: 420px;
          user-select: none;
        }
        .sphere-card-inner {
          background: rgba(10, 10, 10, 0.88);
          backdrop-filter: blur(16px);
          border: 2px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 28px 24px;
          color: white;
          font-family: var(--font-plus-jakarta-sans), sans-serif;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .sphere-card:hover .sphere-card-inner {
          border-color: rgba(255, 30, 144, 0.4);
          box-shadow: 0 0 40px rgba(255, 30, 144, 0.15), 0 0 80px rgba(216, 255, 66, 0.05);
        }
        .sphere-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .sphere-card-id {
          font-family: var(--font-space-grotesk), monospace;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #ff1e90;
          background: rgba(255, 30, 144, 0.08);
          border: 1px solid rgba(255, 30, 144, 0.15);
          padding: 3px 8px;
          border-radius: 4px;
        }
        .sphere-card-metric {
          font-family: var(--font-space-grotesk), monospace;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0a0a0a;
          background: #d8ff42;
          border: 2px solid #0a0a0a;
          padding: 3px 10px;
          border-radius: 4px;
          box-shadow: 2px 2px 0px #0a0a0a;
        }
        .sphere-card-title {
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 20px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
          line-height: 1.1;
        }
        .sphere-card-client {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.35);
          font-weight: 700;
          margin-bottom: 12px;
        }
        .sphere-card-desc {
          font-size: 12px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.55);
          margin-bottom: 16px;
        }
        .sphere-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 14px;
        }
        .sphere-tag {
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 8px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 3px 8px;
          border-radius: 4px;
          color: rgba(255, 255, 255, 0.5);
        }
        .sphere-card-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .sphere-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 0 0 6px #ef4444;
          animation: spherePulse 2s ease-in-out infinite;
        }
        .sphere-status-text {
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.3);
        }
        @keyframes spherePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
