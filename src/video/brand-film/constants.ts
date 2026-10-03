export const VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInSeconds: 30,
  totalFrames: 900,
} as const;

export const SCENE_RANGES = {
  genesis: { start: 0, end: 140, duration: 140 }, // 0s - 4.6s: Terminal Spark & The Human Friction Problem
  auditEngine: { start: 140, end: 320, duration: 180 }, // 4.6s - 10.6s: The Massive Edge-to-Edge Diagnostic Cockpit
  patternInterrupt: { start: 320, end: 460, duration: 140 }, // 10.6s - 15.3s: Apple-style Kinetic Typography Slam
  autonomousRuntime: { start: 460, end: 680, duration: 220 }, // 15.3s - 22.6s: Real-time Multi-agent Execution & Latency Crash
  climax: { start: 680, end: 900, duration: 220 }, // 22.6s - 30s: Grand Mathematical Logo Lockup & Sonic Finale
} as const;

export const BRAND_TOKENS = {
  colors: {
    // Cinematic Obsidian Core (Linear / Cursor / Apple Launch Film Palette)
    bg: '#05060A',
    bgSurface: 'rgba(255, 255, 255, 0.035)',
    bgSurfaceElevated: 'rgba(255, 255, 255, 0.06)',
    
    // Specular Glass Borders
    border: 'rgba(255, 255, 255, 0.09)',
    borderBright: 'rgba(255, 255, 255, 0.22)',
    borderFocus: 'rgba(255, 56, 35, 0.5)',

    // Crisp Display Typography
    textPrimary: '#FFFFFF',
    textSecondary: '#9499AD',
    textTertiary: '#5E6375',

    // Signature Accents
    accentCoral: '#FF3823', // VISTAR Coral Red
    accentCoralGlow: 'rgba(255, 56, 35, 0.35)',
    accentEmerald: '#10B981', // Verified autonomous green
    accentEmeraldGlow: 'rgba(16, 185, 129, 0.3)',
    accentCyan: '#06B6D4',
    accentAmber: '#F59E0B',
    accentIndigo: '#6366F1',
  },
  typography: {
    fontDisplay: '"CohereText", "Space Grotesk", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontBody: '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontMono: '"CohereMono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
} as const;
