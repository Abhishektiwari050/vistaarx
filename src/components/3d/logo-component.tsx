"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getScrollProgress, getCursor, getThemeColors, getActiveRoute, getPrefersReducedMotion } from "@/lib/stores/scroll-store";

// ─────────────────────────────────────────────────────────────────────────────
// Custom GLSL Shader Material for the dark carbon core, neon gradient & highlights
// ─────────────────────────────────────────────────────────────────────────────

const customShader = {
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vLocalPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vLocalPosition = position;
      
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vLocalPosition;

    uniform float uTime;
    uniform float uScroll;
    uniform float uHighlight;
    uniform vec3 uColorBase;
    uniform vec3 uColorPrimary;
    uniform vec3 uColorSecondary;

    void main() {
      // Dynamic base color based on active theme
      vec3 baseColor = uColorBase;

      // The triangle geometry local Y ranges from 0.5 (base) to 1.5 (tip).
      float heightFactor = smoothstep(0.4, 1.5, vLocalPosition.y);

      // ─────────────────────────────────────────────────────────────────
      // Premium Watercolor / Fluid Domain Warping
      // ─────────────────────────────────────────────────────────────────
      // We use time AND scroll to animate the fluid. 
      // Scrolling causes a rush of fluid dynamics.
      vec2 uv = vLocalPosition.xy * 2.5; 
      float t = uTime * 0.6 + uScroll * 12.0;
      
      // First warp layer
      vec2 q = vec2(0.0);
      q.x = sin(uv.y * 1.5 + t) + cos(uv.x * 1.1 - t * 0.8);
      q.y = cos(uv.x * 1.6 - t) + sin(uv.y * 1.3 + t * 0.7);
      
      // Second warp layer (adds complexity and organic fluid feel)
      vec2 r = vec2(0.0);
      r.x = sin(uv.y * 2.2 + q.y * 2.5 + t * 1.1);
      r.y = cos(uv.x * 2.1 + q.x * 2.4 - t * 1.2);
      
      // Final fluid intensity map
      float fluid = sin(uv.x * 1.2 + r.x * 2.0) * cos(uv.y * 1.2 + r.y * 2.0);
      // Remap from [-1, 1] to [0, 1] with a soft watercolor fade
      fluid = smoothstep(-0.6, 0.6, fluid);

      // Blend the palette colors organically based on the fluid warping
      // This creates a multi-tonal watercolor pooling effect
      vec3 watercolor = mix(uColorPrimary, uColorSecondary, fluid);
      // Add a third color mixing layer based on the secondary warp for depth
      float depthMix = sin(r.x * 1.5 + r.y * 1.5 + t * 0.5) * 0.5 + 0.5;
      watercolor = mix(watercolor, vec3(1.0, 1.0, 1.0), depthMix * 0.15); // subtle highlights

      // Blend dark body into the flowing watercolor at the tip
      vec3 finalColor = mix(baseColor, watercolor, heightFactor * 0.9);

      // ─────────────────────────────────────────────────────────────────
      // 3D Lighting & Fresnel Edge Highlights
      // ─────────────────────────────────────────────────────────────────
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
      
      // Highlight the borders with glowing primary color
      finalColor = mix(finalColor, uColorPrimary, fresnel * 0.75);

      // Emissive neon boost inside custom shader when highlighted
      vec3 emissiveGlow = uColorPrimary * max(uHighlight - 1.0, 0.0) * 1.5;
      vec3 brightenedColor = finalColor * min(uHighlight, 1.2) + emissiveGlow;

      // Opacity scales smoothly so inactive arrowheads fade down on GPU
      float opacity = smoothstep(0.0, 0.5, uHighlight) * 0.88 + 0.12;

      gl_FragColor = vec4(brightenedColor, opacity);
    }
  `
};

// ─────────────────────────────────────────────────────────────────────────────
// Monotonic Scroll-to-Rotation mathematical function
// Snaps: Step 1: 0.50-0.58 (UP), Step 2: 0.58-0.68 (RIGHT), Step 3: 0.68-0.78 (DOWN), Step 4: 0.78-0.88 (LEFT)
// ─────────────────────────────────────────────────────────────────────────────

function getLogoRotationZ(progress: number): number {
  if (progress < 0) return -1;
  if (progress > 1.0) return -1;

  // Snaps and transitions (contiguous, monotonic inside [0, 1])
  if (progress <= 0.05) return 0;
  if (progress > 0.05 && progress < 0.22) {
    const t = (progress - 0.05) / (0.22 - 0.05);
    const ease = t * t * (3 - 2 * t);
    return ease * 2.5 * Math.PI; // Spins 360° + quarter turn (2.5 PI) to face Right Arrow
  }
  if (progress >= 0.22 && progress <= 0.30) return 2.5 * Math.PI; // snapped at Right
  if (progress > 0.30 && progress < 0.47) {
    const t = (progress - 0.30) / (0.47 - 0.30);
    const ease = t * t * (3 - 2 * t);
    return 2.5 * Math.PI + ease * 2.5 * Math.PI; // Spins 360° + quarter turn to face Down Arrow
  }
  if (progress >= 0.47 && progress <= 0.55) return 5.0 * Math.PI; // snapped at Down
  if (progress > 0.55 && progress < 0.72) {
    const t = (progress - 0.55) / (0.72 - 0.55);
    const ease = t * t * (3 - 2 * t);
    return 5.0 * Math.PI + ease * 2.5 * Math.PI; // Spins 360° + quarter turn to face Left Arrow
  }
  if (progress >= 0.72 && progress <= 0.80) return 7.5 * Math.PI; // snapped at Left
  if (progress > 0.80 && progress <= 0.95) {
    const t = (progress - 0.80) / (0.95 - 0.80);
    const ease = t * t * (3 - 2 * t);
    return 7.5 * Math.PI + ease * 2.5 * Math.PI; // Spins 360° + quarter turn to face Up Arrow again
  }
  return 10.0 * Math.PI;
}

// ─────────────────────────────────────────────────────────────────────────────
// Smooth activation mapping for independent arrow heads
// ─────────────────────────────────────────────────────────────────────────────

function getArrowActivation(idx: number, progress: number): number {
  if (idx === 0) { // UP
    if (progress <= 0.08) return 1.0;
    if (progress > 0.08 && progress < 0.15) return 1.0 - (progress - 0.08) / 0.07;
    return 0;
  }
  if (idx === 3) { // RIGHT
    if (progress <= 0.15) return 0;
    if (progress > 0.15 && progress < 0.22) return (progress - 0.15) / 0.07;
    if (progress >= 0.22 && progress <= 0.33) return 1.0;
    if (progress > 0.33 && progress < 0.40) return 1.0 - (progress - 0.33) / 0.07;
    return 0;
  }
  if (idx === 2) { // DOWN
    if (progress <= 0.40) return 0;
    if (progress > 0.40 && progress < 0.47) return (progress - 0.40) / 0.07;
    if (progress >= 0.47 && progress <= 0.58) return 1.0;
    if (progress > 0.58 && progress < 0.65) return 1.0 - (progress - 0.58) / 0.07;
    return 0;
  }
  if (idx === 1) { // LEFT
    if (progress <= 0.65) return 0;
    if (progress > 0.65 && progress < 0.72) return (progress - 0.65) / 0.07;
    if (progress >= 0.72 && progress <= 0.83) return 1.0;
    if (progress > 0.83 && progress < 0.90) return 1.0 - (progress - 0.83) / 0.07;
    return 0;
  }
  return 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// Master 3D Logo Component — Symmetrical Bevel Arrows with Rotational Showcase
// ─────────────────────────────────────────────────────────────────────────────

interface HomepageProperties {
  x: number;
  y: number;
  z: number;
  scale: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  arrowOffset: number;
  highlight: number;
  arrowHighlights: number[];
  arrowScales: number[];
}

function getHomepageLogoProperties(scroll: number): HomepageProperties {
  const s = Math.max(0, Math.min(1, scroll));
  
  let x = 0;
  let y = 0;
  let z = 0;
  let scale = 1.6;
  let rotX = 0;
  let rotY = 0;
  let rotZ = 0;
  let arrowOffset = 0;
  let highlight = 2.0;
  let arrowHighlights = [1.0, 1.0, 1.0, 1.0];
  let arrowScales = [1.0, 1.0, 1.0, 1.0];

  if (s <= 0.10) {
    // Stage 1: Hero Centered Active
    x = 0;
    y = 0;
    z = 0;
    scale = 1.6;
    arrowOffset = 0.0;
    highlight = 2.0;
    rotX = 0;
    rotY = 0;
    rotZ = s * 2.0 * Math.PI; // slow scroll-linked Z roll
  } else if (s > 0.10 && s <= 0.20) {
    // Stage 1 -> Stage 2: Glides Right, Scales Down
    const t = (s - 0.10) / 0.10;
    const ease = t * t * (3 - 2 * t);
    x = THREE.MathUtils.lerp(0.0, 2.2, ease);
    y = THREE.MathUtils.lerp(0.0, 0.5, ease);
    z = 0;
    scale = THREE.MathUtils.lerp(1.6, 0.75, ease);
    arrowOffset = 0.0;
    highlight = THREE.MathUtils.lerp(2.0, 1.0, ease);
    rotX = 0;
    rotY = 0;
    rotZ = 0.2 * Math.PI + ease * 2.3 * Math.PI; // spins 360° + quarter
  } else if (s > 0.20 && s <= 0.30) {
    // Stage 2: Manifesto Settled Right
    x = 2.2;
    y = 0.5;
    z = 0;
    scale = 0.75;
    arrowOffset = 0.0;
    highlight = 1.0;
    rotX = -0.1; // slight tilt to face left DOM text
    rotY = -0.3;
    rotZ = 2.5 * Math.PI;
  } else if (s > 0.30 && s <= 0.40) {
    // Stage 2 -> Stage 3: Glides to Left, expands arrows
    const t = (s - 0.30) / 0.10;
    const ease = t * t * (3 - 2 * t);
    x = THREE.MathUtils.lerp(2.2, -2.2, ease);
    y = THREE.MathUtils.lerp(0.5, -0.5, ease);
    z = 0;
    scale = THREE.MathUtils.lerp(0.75, 0.85, ease);
    arrowOffset = THREE.MathUtils.lerp(0.0, 0.45, ease);
    highlight = THREE.MathUtils.lerp(1.0, 2.5, ease);
    rotX = THREE.MathUtils.lerp(-0.1, 0.0, ease);
    rotY = THREE.MathUtils.lerp(-0.3, 0.3, ease);
    rotZ = 2.5 * Math.PI + ease * 2.5 * Math.PI; // spin to Left layout
  } else if (s > 0.40 && s <= 0.50) {
    // Stage 3 Part A: Capabilities Left, UP Arrow Active
    x = -2.2;
    y = -0.5;
    z = 0;
    scale = 0.85;
    arrowOffset = 0.45;
    highlight = 2.5;
    rotX = 0;
    rotY = 0.3; // faces right Capabilities cards
    rotZ = 5.0 * Math.PI;
    
    // Up Arrow (index 0) active
    arrowHighlights = [3.0, 0.2, 0.2, 0.2];
    arrowScales = [1.4, 0.75, 0.75, 0.75];
  } else if (s > 0.50 && s <= 0.60) {
    // Stage 3 Part B: Capabilities Left, DOWN Arrow Active
    x = -2.2;
    y = -0.5;
    z = 0;
    scale = 0.85;
    arrowOffset = 0.45;
    highlight = 2.5;
    rotX = 0;
    rotY = 0.3;
    rotZ = 5.0 * Math.PI;

    // Down Arrow (index 2) active
    arrowHighlights = [0.2, 0.2, 3.0, 0.2];
    arrowScales = [0.75, 0.75, 1.4, 0.75];
  } else if (s > 0.60 && s <= 0.70) {
    // Stage 3 -> Stage 4: Returns to Center, collapses arrows
    const t = (s - 0.60) / 0.10;
    const ease = t * t * (3 - 2 * t);
    x = THREE.MathUtils.lerp(-2.2, 0.0, ease);
    y = THREE.MathUtils.lerp(-0.5, 0.0, ease);
    z = 0;
    scale = THREE.MathUtils.lerp(0.85, 1.2, ease);
    arrowOffset = THREE.MathUtils.lerp(0.45, 0.0, ease);
    highlight = THREE.MathUtils.lerp(2.5, 1.5, ease);
    rotX = THREE.MathUtils.lerp(0.0, 0.4, ease); // tilts deep
    rotY = THREE.MathUtils.lerp(0.3, 0.0, ease);
    rotZ = 5.0 * Math.PI + ease * 2.5 * Math.PI;
  } else if (s > 0.70 && s <= 0.80) {
    // Stage 4: Neural Operator Center (Hyper speed rotation)
    x = 0;
    y = 0;
    z = 0;
    scale = 1.2;
    arrowOffset = 0.0;
    highlight = 3.5;
    rotX = 0.4;
    rotY = 0.0;
    
    // Extreme high speed spinning linked to scroll within this range
    const rollFactor = (s - 0.70) / 0.10;
    rotZ = 7.5 * Math.PI + rollFactor * 25.0 * Math.PI;
  } else if (s > 0.80 && s <= 0.90) {
    // Stage 4 -> Stage 5: Ascends to Header Center, scales down
    const t = (s - 0.80) / 0.10;
    const ease = t * t * (3 - 2 * t);
    x = 0;
    y = THREE.MathUtils.lerp(0.0, 2.4, ease);
    z = 0;
    scale = THREE.MathUtils.lerp(1.2, 0.55, ease);
    arrowOffset = 0.0;
    highlight = THREE.MathUtils.lerp(3.5, 2.0, ease);
    rotX = THREE.MathUtils.lerp(0.4, 0.0, ease);
    rotY = 0;
    rotZ = 32.5 * Math.PI + ease * 3.5 * Math.PI;
  } else {
    // Stage 5: Contact Gateway Crown (Pulsing glowing beacon)
    x = 0;
    y = 2.4;
    z = 0;
    scale = 0.55;
    arrowOffset = 0.0;
    highlight = 2.0 + Math.sin(s * 50.0) * 0.3; // subtle neon pulse
    rotX = 0;
    rotY = 0;
    rotZ = 36.0 * Math.PI + (s - 0.90) * 2.0 * Math.PI;
  }

  return {
    x, y, z, scale, rotX, rotY, rotZ, arrowOffset, highlight, arrowHighlights, arrowScales
  };
}

export function Logo3D() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Refs for the 4 individual arrows to coordinate their expansion in perfect sync
  const arrowUp = useRef<THREE.Mesh>(null);
  const arrowLeft = useRef<THREE.Mesh>(null);
  const arrowDown = useRef<THREE.Mesh>(null);
  const arrowRight = useRef<THREE.Mesh>(null);

  // Reusable colors inside useFrame loop (prevents allocation spikes)
  const primaryColor = useRef(new THREE.Color());
  const secondaryColor = useRef(new THREE.Color());
  const baseColor = useRef(new THREE.Color());

  // Extrude settings for high-quality bevel highlights
  const extrudeSettings = useMemo(() => ({
    depth: 0.28,
    bevelEnabled: true,
    bevelSegments: 6,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
  }), []);

  // 2D Arrowhead Shape (triangle pointing UP)
  const arrowShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.5, 0.5);
    shape.lineTo(0.5, 0.5);
    shape.lineTo(0.0, 1.5);
    shape.closePath();
    return shape;
  }, []);

  // Individual Shader Materials for each of the 4 arrows to allow independent GPU highlights & themeing
  const materials = useMemo(() => {
    return Array.from({ length: 4 }).map(() => {
      return new THREE.ShaderMaterial({
        vertexShader: customShader.vertexShader,
        fragmentShader: customShader.fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uHighlight: { value: 1.0 },
          uColorBase: { value: new THREE.Color("#08080a") },
          uColorPrimary: { value: new THREE.Color("#ff0080") },
          uColorSecondary: { value: new THREE.Color("#ccff00") }
        },
        side: THREE.DoubleSide,
        transparent: true
      });
    });
  }, []);

  // Smoothed animation vectors for positions & rotations (buttery spring effect)
  const smoothedX = useRef(0);
  const smoothedY = useRef(0);
  const smoothedZ = useRef(0);
  const smoothedScale = useRef(1.0);
  const smoothedRotX = useRef(0);
  const smoothedRotY = useRef(0);

  // Persistent independent smoothed values for the 4 arrows
  const smoothedArrows = useRef([
    { y: 0, scale: 1, highlight: 1 },
    { y: 0, scale: 1, highlight: 1 },
    { y: 0, scale: 1, highlight: 1 },
    { y: 0, scale: 1, highlight: 1 }
  ]);

  useFrame((state) => {
    const scroll = getScrollProgress();
    const cursor = getCursor();

    // Fetch theme colors dynamically
    const colors = getThemeColors();
    primaryColor.current.set(colors.primary);
    secondaryColor.current.set(colors.secondary);
    baseColor.current.set(colors.base);

    // ─────────────────────────────────────────────────────────────────────────
    // Storyboard Route-Choreography (Multi-Page Adaptation)
    // ─────────────────────────────────────────────────────────────────────────

    const route = getActiveRoute();
    
    let targetX = 0.0;
    let targetY = 0.0; // Global arrow expansion offset
    let targetScale = 1.0;
    let targetRotX = cursor.y * 0.35;
    let targetRotY = cursor.x * 0.35;
    let targetRotZ = 0.0;

    let isDeepDive = false;
    let deepDiveProgress = 0;
    let isHomepage = false;
    let homepageProps: HomepageProperties | null = null;

    if (route === "/") {
      isHomepage = true;
      homepageProps = getHomepageLogoProperties(scroll);
      targetX = homepageProps.x;
      targetY = homepageProps.y;
      targetScale = homepageProps.scale;
      // Add cursor parallax on top of homepage base rotations
      targetRotX = homepageProps.rotX + cursor.y * 0.15;
      targetRotY = homepageProps.rotY + cursor.x * 0.15;
      targetRotZ = homepageProps.rotZ;
    } else if (route === "/philosophy") {
      // Company Context (Shift RIGHT, Collapsed, Reacts to local scroll progress)
      targetX = 2.1;
      // As you scroll down philosophy page, logo drifts slightly on Y
      targetY = -scroll * 1.2;
      targetScale = 0.85;
      // Add slight tumble based on scroll
      targetRotX = cursor.y * 0.35 + scroll * 0.6;
      targetRotY = cursor.x * 0.35 - scroll * 0.4;
      targetRotZ = state.clock.getElapsedTime() * 0.15; // slow idle roll
    } else if (route === "/work") {
      // Symmetrical Overview (Shift LEFT, Expand based on project scroll)
      targetX = -2.1;
      targetY = 0.45; // standard expansion
      targetScale = 0.85;
      targetRotX = cursor.y * 0.35;
      targetRotY = cursor.x * 0.35;
      targetRotZ = state.clock.getElapsedTime() * 0.15;
    } else if (route === "/vectors") {
      // Vector Rotational Showcase (Glides Center, snaps and highlights based on local page scroll)
      targetX = 0.0;
      targetY = 0.0;
      targetScale = 1.0;
      isDeepDive = true;
      deepDiveProgress = scroll; // Full 0.0 -> 1.0 mapping within the Vectors page
    } else if (route === "/contact") {
      // Contact Form (Returns Center, Collapsed, Magnet parallax)
      targetX = 0.0;
      targetY = 0.0;
      targetScale = 1.1;
      targetRotX = cursor.y * 0.75; // double standard cursor parallax
      targetRotY = cursor.x * 0.75;
      targetRotZ = state.clock.getElapsedTime() * 0.1;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Smooth Lerping (Floaty, Liquid Damping)
    // ─────────────────────────────────────────────────────────────────────────
    const LERP_FACTOR = 0.038;
    const prefersReducedMotion = getPrefersReducedMotion();

    smoothedX.current = THREE.MathUtils.lerp(smoothedX.current, targetX, LERP_FACTOR);
    smoothedY.current = THREE.MathUtils.lerp(smoothedY.current, targetY, LERP_FACTOR);
    smoothedScale.current = THREE.MathUtils.lerp(smoothedScale.current, targetScale, LERP_FACTOR);

    // Apply translations
    if (groupRef.current) {
      groupRef.current.position.x = smoothedX.current;

      // Subtle dynamic float bobbing added on top of target Y for organic feel (except contact or vectors deep snaps)
      // Completely skipped if prefersReducedMotion is active to maintain zero dynamic animation load
      const bobMultiplier = (route === "/vectors" || route === "/contact" || prefersReducedMotion) ? 0.0 : 0.12;
      const bobbing = Math.sin(state.clock.getElapsedTime() * 1.2) * bobMultiplier;
      groupRef.current.position.y = smoothedY.current + bobbing;

      groupRef.current.scale.setScalar(smoothedScale.current);

      if (prefersReducedMotion) {
        // Locked flat front-facing profile
        groupRef.current.rotation.set(0, 0, 0);
      } else {
        // Cursor Parallax rotation
        smoothedRotX.current = THREE.MathUtils.lerp(smoothedRotX.current, targetRotX, 0.05);
        smoothedRotY.current = THREE.MathUtils.lerp(smoothedRotY.current, targetRotY, 0.05);

        groupRef.current.rotation.x = smoothedRotX.current;
        groupRef.current.rotation.y = smoothedRotY.current;

        // Monotonic Scroll-to-Rotation Choreography
        if (isDeepDive) {
          const targetRotZ = getLogoRotationZ(deepDiveProgress);
          if (targetRotZ >= 0) {
            // Continuous monotonic transition
            smoothedZ.current = THREE.MathUtils.lerp(smoothedZ.current, targetRotZ, 0.08);
          }
          groupRef.current.rotation.z = smoothedZ.current;
        } else if (isHomepage) {
          smoothedZ.current = THREE.MathUtils.lerp(smoothedZ.current, targetRotZ, 0.08);
          groupRef.current.rotation.z = smoothedZ.current;
        } else {
          // Continuous slow idle spin elsewhere
          groupRef.current.rotation.z += 0.003;
          smoothedZ.current = groupRef.current.rotation.z; // keep Z sync
        }
      }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Symmetrical Arrow-by-Arrow Positioning & Highlight Interpolation
    // Arrow Index Mapping: 0 = Up, 1 = Left, 2 = Down, 3 = Right
    // ─────────────────────────────────────────────────────────────────────────
    
    // Blend showcase targets based on how deep we are in the showcase boundaries
    // We smooth it out at the very top and bottom of the page
    let showcaseFactor = 0;
    if (isDeepDive) {
      if (scroll < 0.05) showcaseFactor = scroll / 0.05;
      else if (scroll > 0.95) showcaseFactor = 1.0 - ((scroll - 0.95) / 0.05);
      else showcaseFactor = 1.0;
    }

    const arrowRefs = [arrowUp, arrowLeft, arrowDown, arrowRight];

    arrowRefs.forEach((ref, idx) => {
      if (!ref.current) return;

      const act = isDeepDive ? getArrowActivation(idx, deepDiveProgress) : 0;

      // Define extreme premium states for active snaps vs inactive rest states
      const standardY = smoothedY.current;
      const standardScale = 1.0;
      const standardHighlight = 1.0;

      const showcaseY = THREE.MathUtils.lerp(0.12, 0.95, act);
      const showcaseScale = THREE.MathUtils.lerp(0.75, 1.4, act);
      const showcaseHighlight = THREE.MathUtils.lerp(0.15, 3.0, act);

      let arrowTargetY = 0;
      let arrowTargetScale = 1.0;
      let arrowTargetHighlight = 1.0;

      if (isHomepage && homepageProps) {
        arrowTargetY = homepageProps.arrowOffset;
        arrowTargetScale = homepageProps.arrowScales[idx];
        arrowTargetHighlight = homepageProps.arrowHighlights[idx] * homepageProps.highlight;
      } else if (route === "/work") {
        let activeIdx = 0;
        if (scroll < 0.25) activeIdx = 0;
        else if (scroll >= 0.25 && scroll < 0.50) activeIdx = 1;
        else if (scroll >= 0.50 && scroll < 0.75) activeIdx = 2;
        else activeIdx = 3;

        const workAct = activeIdx === idx ? 1.0 : 0.0;
        arrowTargetY = 0.25 + workAct * 0.45;
        arrowTargetScale = THREE.MathUtils.lerp(0.8, 1.25, workAct);
        arrowTargetHighlight = THREE.MathUtils.lerp(0.6, 2.8, workAct);
      } else {
        arrowTargetY = THREE.MathUtils.lerp(standardY, showcaseY, showcaseFactor);
        arrowTargetScale = THREE.MathUtils.lerp(standardScale, showcaseScale, showcaseFactor);
        arrowTargetHighlight = THREE.MathUtils.lerp(standardHighlight, showcaseHighlight, showcaseFactor);
      }

      // Smoothly update each arrowhead's properties independently using spring interpolation
      const s = smoothedArrows.current[idx];
      s.y = THREE.MathUtils.lerp(s.y, arrowTargetY, LERP_FACTOR);
      s.scale = THREE.MathUtils.lerp(s.scale, arrowTargetScale, LERP_FACTOR);
      s.highlight = THREE.MathUtils.lerp(s.highlight, arrowTargetHighlight, LERP_FACTOR);

      ref.current.position.y = s.y;
      ref.current.scale.setScalar(s.scale);

      // Direct uniform dispatch to prevent React updates (maintains locks at 60 FPS)
      const mat = materials[idx];
      mat.uniforms.uTime.value = state.clock.getElapsedTime();
      mat.uniforms.uScroll.value = scroll;
      mat.uniforms.uHighlight.value = s.highlight;
      mat.uniforms.uColorBase.value = baseColor.current;
      mat.uniforms.uColorPrimary.value = primaryColor.current;
      mat.uniforms.uColorSecondary.value = secondaryColor.current;
    });
  });

  // Clean up materials on unmount
  useEffect(() => {
    return () => {
      materials.forEach((mat) => mat.dispose());
    };
  }, [materials]);

  return (
    <group ref={groupRef}>
      
      {/* Up Arrow (Z = 0) */}
      <group rotation={[0, 0, 0]}>
        <mesh ref={arrowUp} material={materials[0]} frustumCulled>
          <extrudeGeometry args={[arrowShape, extrudeSettings]} />
        </mesh>
      </group>
      
      {/* Left Arrow (Z = 90 deg CCW) */}
      <group rotation={[0, 0, Math.PI / 2]}>
        <mesh ref={arrowLeft} material={materials[1]} frustumCulled>
          <extrudeGeometry args={[arrowShape, extrudeSettings]} />
        </mesh>
      </group>
      
      {/* Down Arrow (Z = 180 deg CCW) */}
      <group rotation={[0, 0, Math.PI]}>
        <mesh ref={arrowDown} material={materials[2]} frustumCulled>
          <extrudeGeometry args={[arrowShape, extrudeSettings]} />
        </mesh>
      </group>
      
      {/* Right Arrow (Z = 90 deg CW) */}
      <group rotation={[0, 0, -Math.PI / 2]}>
        <mesh ref={arrowRight} material={materials[3]} frustumCulled>
          <extrudeGeometry args={[arrowShape, extrudeSettings]} />
        </mesh>
      </group>

    </group>
  );
}

export default Logo3D;
