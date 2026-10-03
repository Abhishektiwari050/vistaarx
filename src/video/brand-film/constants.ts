export const VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInSeconds: 30,
  totalFrames: 900,
} as const;

export const SCENE_RANGES = {
  friction: { start: 0, end: 160, duration: 160 }, // 0s - 5.3s: The Human Bottleneck & Operational Friction
  audit: { start: 160, end: 340, duration: 180 }, // 5.3s - 11.3s: The VISTAR Operational Audit
  autonomousEngine: { start: 340, end: 550, duration: 210 }, // 11.3s - 18.3s: Autonomous Software in Action (Flagship Console)
  pillars: { start: 550, end: 740, duration: 190 }, // 18.3s - 24.6s: 3 Pillars of Enterprise Autonomy
  climax: { start: 740, end: 900, duration: 160 }, // 24.6s - 30s: Grand Climax & Brand Lockup
} as const;

export const BRAND_TOKENS = {
  colors: {
    // Editorial warm paper palette (matches actual VISTAR Cohere theme)
    bg: '#FAF9F5',
    bgPure: '#FFFFFF',
    bgStone: '#F3F1EA',
    surface: '#FFFFFF',
    surfaceMuted: '#F6F5EE',
    
    // Hairline borders
    border: 'rgba(0, 0, 0, 0.08)',
    borderSubtle: 'rgba(0, 0, 0, 0.04)',
    borderFocus: 'rgba(255, 56, 35, 0.4)',

    // Deep editorial typography
    textPrimary: '#141413',
    textSecondary: '#5A5A55',
    textTertiary: '#8E8E86',

    // Signature accents
    accentCoral: '#FF3823', // VISTAR Coral Red
    accentCoralSoft: 'rgba(255, 56, 35, 0.08)',
    accentEmerald: '#059669', // Verified autonomous green
    accentEmeraldSoft: 'rgba(5, 150, 105, 0.08)',
    accentAmber: '#D97706', // Friction / bottleneck indicator
    accentAmberSoft: 'rgba(217, 119, 6, 0.08)',
    accentIndigo: '#4F46E5', // Pipeline flow
  },
  typography: {
    fontDisplay: '"CohereText", "Space Grotesk", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontBody: '"Unica77 Cohere Web", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontMono: '"CohereMono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
} as const;
