export const VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInSeconds: 30,
  totalFrames: 900,
} as const;

export const SCENE_RANGES = {
  hook: { start: 0, end: 90, duration: 90 }, // 0s - 3s
  core: { start: 90, end: 240, duration: 150 }, // 3s - 8s
  transformation: { start: 240, end: 480, duration: 240 }, // 8s - 16s
  assembly: { start: 480, end: 720, duration: 240 }, // 16s - 24s
  handover: { start: 720, end: 900, duration: 180 }, // 24s - 30s
} as const;

export const BRAND_TOKENS = {
  colors: {
    bg: '#060709',
    surface: '#0D0E15',
    surfaceElevated: '#141622',
    border: 'rgba(255, 255, 255, 0.08)',
    borderActive: 'rgba(16, 185, 129, 0.4)',
    textPrimary: '#ECEEF5',
    textSecondary: '#959CB3',
    textTertiary: '#5C6479',
    accentEmerald: '#10b981',
    accentEmeraldGlow: 'rgba(16, 185, 129, 0.25)',
    accentCyan: '#06b6d4',
    accentAmber: '#f59e0b',
    accentCrimson: '#ef4444',
  },
  typography: {
    fontMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
} as const;
