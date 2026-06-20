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
const SPHERE_RADIUS = 700;
const AUTO_ROTATE_SPEED = 0.25;

// Sphere card CSS — injected into <head> once via a <style> tag
// (styled-jsx is not available in App Router; we use a plain style element)
const CARD_STYLES = `
.sr-card {
  width: 380px;
  cursor: pointer;
  user-select: none;
}
.sr-inner {
  background: rgba(8, 8, 18, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 26px 22px;
  color: white;
  font-family: system-ui, -apple-system, sans-serif;
  transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.2s ease;
}
.sr-card:hover .sr-inner {
  border-color: rgba(255, 30, 144, 0.45);
  box-shadow: 0 0 50px rgba(255, 30, 144, 0.18), 0 0 100px rgba(216, 255, 66, 0.06);
  transform: translateY(-3px);
}
.sr-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}
.sr-id {
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #ff1e90;
  background: rgba(255, 30, 144, 0.1);
  border: 1px solid rgba(255, 30, 144, 0.2);
  padding: 4px 9px;
  border-radius: 5px;
}
.sr-metric {
  font-size: 9px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #050510;
  background: #d8ff42;
  border: 2px solid #050510;
  padding: 4px 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 0 #050510;
  white-space: nowrap;
}
.sr-title {
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0 0 4px;
  color: #ffffff;
}
.sr-client {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: rgba(255,255,255,0.32);
  font-weight: 700;
  margin: 0 0 13px;
}
.sr-desc {
  font-size: 11px;
  line-height: 1.65;
  color: rgba(255,255,255,0.52);
  margin: 0 0 15px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.sr-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 14px;
}
.sr-tag {
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 3px 8px;
  border-radius: 4px;
  color: rgba(255,255,255,0.45);
}
.sr-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 11px;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.sr-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px #22c55e;
  animation: srPulse 2.2s ease-in-out infinite;
  flex-shrink: 0;
}
.sr-status-text {
  font-size: 8px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.28);
}
@keyframes srPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(1.4); }
}
`;

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
    panelPositions: { position: THREE.Vector3 }[];
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

  // ── Inject card CSS into <head> once ─────────────────────────────────────
  useEffect(() => {
    const styleId = "sphere-room-card-styles";
    if (document.getElementById(styleId)) return;
    const styleEl = document.createElement("style");
    styleEl.id = styleId;
    styleEl.textContent = CARD_STYLES;
    document.head.appendChild(styleEl);
    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, []);

  // ── Snap camera to a panel ───────────────────────────────────────────────
  const snapToPanel = useCallback((index: number) => {
    const refs = threeRefs.current;
    if (!refs.camera || !refs.controls) return;

    const pos = refs.panelPositions[index];
    if (!pos) return;

    // Move camera inside the sphere toward the panel
    const target = pos.position.clone().multiplyScalar(0.32);
    target.y = pos.position.y * 0.45;

    const startPos = refs.camera.position.clone();
    const startTarget = refs.controls.target.clone();
    const endTarget = new THREE.Vector3(0, 0, 0);
    const duration = 1100;
    const startTime = performance.now();

    // Pause auto-rotate while tweening
    if (refs.controls) refs.controls.autoRotate = false;

    const tween = () => {
      const t = Math.min((performance.now() - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      refs.camera!.position.lerpVectors(startPos, target, ease);
      refs.controls!.target.lerpVectors(startTarget, endTarget, ease);
      refs.controls!.update();
      if (t < 1) {
        requestAnimationFrame(tween);
      } else {
        // Resume auto-rotate after tween
        if (refs.controls) refs.controls.autoRotate = true;
      }
    };
    tween();
  }, []);

  // ── Initialize Three.js ──────────────────────────────────────────────────
  useEffect(() => {
    if (!webglCanvasRef.current || !cssContainerRef.current) return;

    const refs = threeRefs.current;
    const W = window.innerWidth;
    const H = window.innerHeight;

    // Camera
    refs.camera = new THREE.PerspectiveCamera(60, W / H, 1, 6000);
    refs.camera.position.set(0, 60, SPHERE_RADIUS * 0.42);

    // WebGL scene
    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x050510, 0.00035);

    // CSS3D scene
    refs.cssScene = new THREE.Scene();

    // WebGL renderer
    refs.webglRenderer = new THREE.WebGLRenderer({
      canvas: webglCanvasRef.current,
      antialias: true,
      alpha: true,
    });
    refs.webglRenderer.setSize(W, H);
    refs.webglRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.webglRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.webglRenderer.toneMappingExposure = 0.65;

    // CSS3D renderer
    refs.cssRenderer = new CSS3DRenderer();
    refs.cssRenderer.setSize(W, H);
    Object.assign(refs.cssRenderer.domElement.style, {
      position: "absolute",
      top: "0",
      left: "0",
      pointerEvents: "auto",
    });
    cssContainerRef.current.appendChild(refs.cssRenderer.domElement);

    // Post-processing
    refs.composer = new EffectComposer(refs.webglRenderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    refs.composer.addPass(
      new UnrealBloomPass(new THREE.Vector2(W, H), 0.7, 0.35, 0.82)
    );

    // Orbit controls — bound to CSS3D element so drags work over cards
    refs.controls = new OrbitControls(refs.camera, refs.cssRenderer.domElement);
    Object.assign(refs.controls, {
      enableDamping: true,
      dampingFactor: 0.06,
      enableZoom: false,
      enablePan: false,
      autoRotate: true,
      autoRotateSpeed: AUTO_ROTATE_SPEED,
      minPolarAngle: Math.PI * 0.2,
      maxPolarAngle: Math.PI * 0.8,
    });

    // Scene elements
    buildWireframe(refs);
    buildParticles(refs);
    buildGlowRings(refs);
    buildPanels(refs, projects, setActiveProject, snapToPanel);

    refs.scene.add(new THREE.AmbientLight(0x334466, 0.6));

    // Render loop
    const loop = () => {
      refs.animationId = requestAnimationFrame(loop);
      const t = performance.now() * 0.001;
      refs.controls?.update();
      if (refs.wireframe) {
        refs.wireframe.rotation.y += 0.0003;
        refs.wireframe.rotation.x += 0.0001;
      }
      if (refs.particles?.material instanceof THREE.ShaderMaterial) {
        refs.particles.material.uniforms.time.value = t;
      }
      refs.glowRings.forEach((ring, i) => {
        ring.rotation.z += 0.0008 * (i % 2 === 0 ? 1 : -1);
        if (ring.material instanceof THREE.ShaderMaterial) {
          ring.material.uniforms.time.value = t;
        }
      });
      refs.composer?.render();
      if (refs.cssRenderer && refs.cssScene && refs.camera) {
        refs.cssRenderer.render(refs.cssScene, refs.camera);
      }
    };
    loop();
    setIsLoaded(true);

    // Resize
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      refs.camera!.aspect = w / h;
      refs.camera!.updateProjectionMatrix();
      refs.webglRenderer!.setSize(w, h);
      refs.cssRenderer!.setSize(w, h);
      refs.composer!.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      refs.controls?.dispose();
      refs.particles?.geometry.dispose();
      if (refs.particles?.material instanceof THREE.ShaderMaterial) {
        refs.particles.material.dispose();
      }
      refs.wireframe?.geometry.dispose();
      if (refs.wireframe?.material instanceof THREE.Material) {
        refs.wireframe.material.dispose();
      }
      refs.glowRings.forEach((r) => {
        r.geometry.dispose();
        if (r.material instanceof THREE.Material) r.material.dispose();
      });
      refs.webglRenderer?.dispose();
      if (refs.cssRenderer && cssContainerRef.current) {
        try {
          cssContainerRef.current.removeChild(refs.cssRenderer.domElement);
        } catch { /* already removed */ }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#050510] overflow-hidden"
    >
      {/* WebGL canvas */}
      <canvas
        ref={webglCanvasRef}
        className={`absolute inset-0 w-full h-full z-0 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* CSS3D panel container */}
      <div
        ref={cssContainerRef}
        className={`absolute inset-0 z-10 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#ff1e90]/30 border-t-[#ff1e90] animate-spin" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
              Initialising Sphere...
            </span>
          </div>
        </div>
      )}

      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none select-none">
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-[#ff1e90] font-bold block mb-2">
          {projects.length} Projects // Selected Work
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white/90">
          Case Studies
        </h1>
        <p className="font-mono text-[9px] tracking-widest uppercase text-white/35 mt-2">
          Drag to explore &nbsp;·&nbsp; Click panel to focus
        </p>
      </div>

      {/* Right-side project dot navigator */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 pointer-events-auto">
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => {
              setActiveProject(p.id);
              snapToPanel(i);
            }}
            className="flex items-center gap-2 group"
            aria-label={`Focus ${p.title}`}
            title={p.title}
          >
            <span
              className="font-mono text-[7px] font-bold uppercase tracking-wider transition-all duration-300 hidden sm:block"
              style={{
                color: activeProject === p.id ? "#d8ff42" : "transparent",
              }}
            >
              {p.id}
            </span>
            <div
              className="rounded-full transition-all duration-300 flex-shrink-0"
              style={{
                width: activeProject === p.id ? "6px" : "4px",
                height: activeProject === p.id ? "22px" : "14px",
                background:
                  activeProject === p.id
                    ? "#ff1e90"
                    : "rgba(255,255,255,0.18)",
                boxShadow:
                  activeProject === p.id ? "0 0 12px #ff1e90" : "none",
              }}
            />
          </button>
        ))}
      </div>

      {/* Active project footer bar */}
      {activeProject && (() => {
        const proj = projects.find((p) => p.id === activeProject);
        if (!proj) return null;
        return (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-full max-w-md px-4">
            <div className="bg-black/80 backdrop-blur-md border border-[#ff1e90]/25 rounded-xl px-5 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-[8px] font-extrabold text-[#ff1e90] uppercase tracking-wider flex-shrink-0">
                  {proj.id}
                </span>
                <span className="font-display text-[11px] font-bold text-white uppercase tracking-tight truncate">
                  {proj.title}
                </span>
              </div>
              <span className="font-mono text-[8px] text-[#d8ff42] font-bold uppercase tracking-wider flex-shrink-0 whitespace-nowrap">
                {proj.client}
              </span>
            </div>
          </div>
        );
      })()}

      {/* Corner hint */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none select-none hidden sm:block">
        <div className="font-mono text-[8px] text-white/15 uppercase tracking-wider leading-relaxed">
          <div>↑↓ Drag to orbit</div>
          <div>← → Auto-rotating</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene builder functions (outside component to avoid re-definition)
// ─────────────────────────────────────────────────────────────────────────────

type Refs = {
  scene: THREE.Scene | null;
  cssScene: THREE.Scene | null;
  wireframe: THREE.LineSegments | null;
  particles: THREE.Points | null;
  glowRings: THREE.Mesh[];
  panelPositions: { position: THREE.Vector3 }[];
};

function buildWireframe(refs: Refs) {
  const geo = new THREE.SphereGeometry(SPHERE_RADIUS, 28, 20);
  const wireGeo = new THREE.WireframeGeometry(geo);
  const mat = new THREE.LineBasicMaterial({
    color: 0x1a2a4a,
    transparent: true,
    opacity: 0.12,
  });
  refs.wireframe = new THREE.LineSegments(wireGeo, mat);
  refs.scene!.add(refs.wireframe);
  geo.dispose();
}

function buildParticles(refs: Refs) {
  const count = 2800;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = Math.random() * SPHERE_RADIUS * 0.88;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    sizes[i] = Math.random() * 2.2 + 0.6;

    const c = Math.random();
    if (c < 0.68) {
      colors[i * 3] = 0.55; colors[i * 3 + 1] = 0.65; colors[i * 3 + 2] = 0.88;
    } else if (c < 0.84) {
      colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.12; colors[i * 3 + 2] = 0.56;
    } else {
      colors[i * 3] = 0.85; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 0.26;
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
        pos.x += sin(time * 0.22 + position.y * 0.012) * 3.5;
        pos.y += cos(time * 0.17 + position.z * 0.012) * 2.5;
        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (260.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.15, 0.5, d);
        gl_FragColor = vec4(vColor, alpha * 0.65);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  refs.particles = new THREE.Points(geo, mat);
  refs.scene!.add(refs.particles);
}

function buildGlowRings(refs: Refs) {
  const ringDefs = [
    { color: 0xff1e90, tiltX: Math.PI * 0.5, tiltY: 0.2 },
    { color: 0xd8ff42, tiltX: Math.PI * 0.5 + 0.35, tiltY: 0.8 },
    { color: 0x3366ff, tiltX: Math.PI * 0.5 - 0.35, tiltY: 1.5 },
  ];

  ringDefs.forEach(({ color, tiltX, tiltY }, i) => {
    const innerR = SPHERE_RADIUS * (0.62 + i * 0.1);
    const geo = new THREE.RingGeometry(innerR, innerR + 2, 72);
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
          float pulse = sin(time * 1.4 + vUv.x * 18.0) * 0.35 + 0.65;
          gl_FragColor = vec4(ringColor * pulse, 0.22 * pulse);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const ring = new THREE.Mesh(geo, mat);
    ring.rotation.x = tiltX;
    ring.rotation.y = tiltY;
    refs.scene!.add(ring);
    refs.glowRings.push(ring);
  });
}

function buildPanels(
  refs: Refs,
  projects: Project[],
  setActive: (id: string) => void,
  snapTo: (i: number) => void
) {
  refs.panelPositions = [];
  const count = projects.length;

  projects.forEach((project, i) => {
    // Evenly distribute around full 360° circle in the XZ plane
    // Add a slight vertical spread so panels don't all sit at Y=0
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const dist = SPHERE_RADIUS * 0.58;
    const x = Math.cos(angle) * dist;
    const z = Math.sin(angle) * dist;
    // Spread panels vertically with a gentle sine wave
    const y = Math.sin((i / count) * Math.PI * 2) * 80;

    const el = document.createElement("div");
    el.className = "sr-card";
    el.innerHTML = `
      <div class="sr-inner">
        <div class="sr-header">
          <span class="sr-id">${project.id} // CASE</span>
          <span class="sr-metric">${project.metric.split(" // ")[0]}</span>
        </div>
        <h2 class="sr-title">${project.title}</h2>
        <p class="sr-client">Client: ${project.client}</p>
        <p class="sr-desc">${project.desc}</p>
        <div class="sr-tags">
          ${project.tags.map((t) => `<span class="sr-tag">${t}</span>`).join("")}
        </div>
        <div class="sr-status">
          <span class="sr-dot"></span>
          <span class="sr-status-text">${project.status}</span>
        </div>
      </div>
    `;

    el.style.pointerEvents = "auto";
    el.addEventListener("click", () => {
      setActive(project.id);
      snapTo(i);
    });

    const obj = new CSS3DObject(el);
    obj.position.set(x, y, z);
    // Each panel faces the center of the sphere
    obj.lookAt(0, y, 0);
    // Scale: at 700 sphere radius, 0.55 makes 380px cards ≈ 209 CSS units
    obj.scale.setScalar(0.55);

    refs.cssScene!.add(obj);
    refs.panelPositions.push({ position: new THREE.Vector3(x, y, z) });
  });
}
