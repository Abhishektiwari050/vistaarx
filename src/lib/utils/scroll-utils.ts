/**
 * Centralized Mathematical Utilities for Vistar Studio 3D Interactive Layers.
 * Built to consolidate scroll-driven calculations and ensure perfect visual consistency
 * between the WebGL 3D Canvas and the lightweight SVG fallback layers.
 */

/**
 * Smoothly calculates Z-rotation (in radians) for the 3D logo's compass indicator.
 * Performs exactly one majestic, meaningful 360-degree rotation across the entire page scroll,
 * with precise 90-degree snap alignments at each key content panel:
 * - Step 1 (Hero/Discovery): 0 radians (UP)
 * - Step 2 (Manifesto/Proof): -Math.PI / 2 radians (RIGHT)
 * - Step 3 (Services/Capabilities): -Math.PI radians (DOWN)
 * - Step 4 (Case Studies/Delivery): -3 * Math.PI / 2 radians (LEFT)
 * - Step 5 (Contact/Gateway): -2 * Math.PI radians (UP again)
 */
export function getLogoRotationZ(progress: number): number {
  if (progress < 0) return 0;
  if (progress > 1.0) return -2.0 * Math.PI;

  // Step 1: 0.0 to 0.05 -> snapped at 0 (UP)
  if (progress <= 0.05) return 0;
  
  // Transition 1 to 2: 0.05 to 0.22 -> lerps from 0 to -0.5 * Math.PI (CW to point RIGHT)
  if (progress > 0.05 && progress < 0.22) {
    const t = (progress - 0.05) / (0.22 - 0.05);
    const ease = t * t * (3 - 2 * t);
    return -ease * 0.5 * Math.PI;
  }
  
  // Step 2: 0.22 to 0.30 -> snapped at -0.5 * Math.PI (RIGHT)
  if (progress >= 0.22 && progress <= 0.30) {
    return -0.5 * Math.PI;
  }
  
  // Transition 2 to 3: 0.30 to 0.47 -> lerps from -0.5 * Math.PI to -Math.PI (CW to point DOWN)
  if (progress > 0.30 && progress < 0.47) {
    const t = (progress - 0.30) / (0.47 - 0.30);
    const ease = t * t * (3 - 2 * t);
    return -0.5 * Math.PI - ease * 0.5 * Math.PI;
  }
  
  // Step 3: 0.47 to 0.55 -> snapped at -Math.PI (DOWN)
  if (progress >= 0.47 && progress <= 0.55) {
    return -Math.PI;
  }
  
  // Transition 3 to 4: 0.55 to 0.72 -> lerps from -Math.PI to -1.5 * Math.PI (CW to point LEFT)
  if (progress > 0.55 && progress < 0.72) {
    const t = (progress - 0.55) / (0.72 - 0.55);
    const ease = t * t * (3 - 2 * t);
    return -Math.PI - ease * 0.5 * Math.PI;
  }
  
  // Step 4: 0.72 to 0.80 -> snapped at -1.5 * Math.PI (LEFT)
  if (progress >= 0.72 && progress <= 0.80) {
    return -1.5 * Math.PI;
  }
  
  // Transition 4 to 5: 0.80 to 0.95 -> lerps from -1.5 * Math.PI to -2.0 * Math.PI (CW to point UP)
  if (progress > 0.80 && progress <= 0.95) {
    const t = (progress - 0.80) / (0.95 - 0.80);
    const ease = t * t * (3 - 2 * t);
    return -1.5 * Math.PI - ease * 0.5 * Math.PI;
  }
  
  return -2.0 * Math.PI;
}

/**
 * Calculates the activation intensity (0.0 to 1.0) of each of the 4 independent arrow heads.
 * Arrow Index Mapping: 0 = UP, 1 = LEFT, 2 = DOWN, 3 = RIGHT
 */
export function getArrowActivation(idx: number, progress: number): number {
  if (progress < 0 || progress > 1.0) return 0;

  if (idx === 0) { // UP
    // Active at the very beginning (Hero) and at the very end (Contact crown)
    if (progress <= 0.08) return 1.0;
    if (progress > 0.08 && progress < 0.15) return 1.0 - (progress - 0.08) / 0.07;
    if (progress >= 0.90) return (progress - 0.90) / 0.10;
    return 0;
  }
  
  if (idx === 3) { // RIGHT
    // Active during the Manifesto section
    if (progress <= 0.15) return 0;
    if (progress > 0.15 && progress < 0.22) return (progress - 0.15) / 0.07;
    if (progress >= 0.22 && progress <= 0.33) return 1.0;
    if (progress > 0.33 && progress < 0.40) return 1.0 - (progress - 0.33) / 0.07;
    return 0;
  }
  
  if (idx === 2) { // DOWN
    // Active during the Services Breakdown section
    if (progress <= 0.40) return 0;
    if (progress > 0.40 && progress < 0.47) return (progress - 0.40) / 0.07;
    if (progress >= 0.47 && progress <= 0.58) return 1.0;
    if (progress > 0.58 && progress < 0.65) return 1.0 - (progress - 0.58) / 0.07;
    return 0;
  }
  
  if (idx === 1) { // LEFT
    // Active during the Case Studies Showcase section
    if (progress <= 0.65) return 0;
    if (progress > 0.65 && progress < 0.72) return (progress - 0.65) / 0.07;
    if (progress >= 0.72 && progress <= 0.83) return 1.0;
    if (progress > 0.83 && progress < 0.90) return 1.0 - (progress - 0.83) / 0.07;
    return 0;
  }
  
  return 0;
}
