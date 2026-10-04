export const VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInSeconds: 30,
  totalFrames: 900,
} as const;

export const SCENE_RANGES = {
  entropy: { start: 0, end: 160, duration: 160 }, // 0s - 5.3s: Vector Entropy & Operational Friction
  auditConvergence: { start: 160, end: 340, duration: 180 }, // 5.3s - 11.3s: Caliper Audit & Geometric Convergence
  typographicSlam: { start: 340, end: 520, duration: 180 }, // 11.3s - 17.3s: Pure Kinetic Typographic Slam (Instant / Autonomous / Humanless)
  operationalVelocity: { start: 520, end: 720, duration: 200 }, // 17.3s - 24s: Abstract Operational Speed & Data Telemetry
  grandMonogram: { start: 720, end: 900, duration: 180 }, // 24s - 30s: Mathematical Vector Climax & Sovereign Lockup
} as const;

export const BRAND_TOKENS = {
  colors: {
    // Strict Bespoke Luxury Monochrome (from .cursorrules & AGENTS.md)
    bgVoid: '#000000',
    bgObsidian: '#060709',
    bgCard: '#0D0E15',
    bgElevated: '#13151F',

    // Liquid Platinum & Titanium Silver Highlights
    platinumPure: '#FFFFFF',
    platinumLiquid: '#ECEEF5',
    titaniumLight: '#D6DAE8',
    titaniumMid: '#959CB3',
    titaniumDark: '#6E768E',
    slateMuted: '#484D60',
    slateBorder: 'rgba(255, 255, 255, 0.1)',
    slateBorderSubtle: 'rgba(255, 255, 255, 0.05)',
    specularGleam: 'rgba(255, 255, 255, 0.28)',

    // Pure Monochromatic Gradients
    gradients: {
      chromeText: 'linear-gradient(180deg, #FFFFFF 0%, #D6DAE8 45%, #959CB3 75%, #6E768E 100%)',
      silverSheen: 'linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.45) 50%, transparent 65%)',
      glassPanel: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%)',
      radialWash: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.07) 0%, rgba(6, 7, 9, 0) 70%)',
    },
  },
  typography: {
    fontDisplay: '"CohereText", "Space Grotesk", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontBody: '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontMono: '"CohereMono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
} as const;
