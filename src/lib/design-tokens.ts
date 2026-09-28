/**
 * VISTAR DESIGN TOKENS — EDITORIAL SPEC (DM Serif, Playfair, Sky Blue Light)
 * Palette:
 * - Canvas: Luminous White Gradient Ground (#FFFFFF)
 * - Cards: Pure White (#FFFFFF)
 * - Elevated Surface: Luminous Sky Mist (#F0F8FF)
 * - Primary Ink: Technical Deep Midnight (#0B1320)
 * - Secondary Ink: Elegant Slate (#64748B)
 * - Metadata / Mono: Mid Gray (#94A3B8)
 * - Primary Signature Accent: Sky Blue Light (#38BDF8 / #0284C7)
 * - Hover / Active Accent: Deep Ocean Sky (#0369A1)
 * - Secondary Telemetry: Radiant Sky (#7DD3FC)
 */

export const colors = {
  nearBlack: "#050A14", // Deep Obsidian Black
  obsidianCard: "#0D0E15", // Dark Obsidian card surface
  surfaceElevated: "#F0F8FF", // Luminous Sky Mist elevated surface
  surfaceSubtle: "#E6F3FD", // Subtle sky boundary
  warmOffWhite: "#FAF9F5", // Warm light ground
  pureWhite: "#FFFFFF", // Pure white surface & light text
  darkInk: "#0B1320", // Deep Midnight ink text
  accent: "#0284C7", // Sky Blue primary accent
  skyLight: "#38BDF8", // Radiant Sky Blue Light
  orange: "#0284C7",
  crail: "#0369A1", // Deep sky hover
  amber: "#38BDF8", // Sky Blue highlight
  platinum: "#F0F7FD",
  silver: "#64748B", // Elegant slate text
  titanium: "#334155",
  slate: "#94A3B8",
  blue: "#38BDF8", // Sky Blue Light
  olive: "#38BDF8",
  zinc: "#E0F2FE",
  // Hairlines & technical borders
  hairline: "rgba(56, 189, 248, 0.20)",
  hairlineActive: "rgba(56, 189, 248, 0.60)",
  hairlineSubtle: "rgba(56, 189, 248, 0.10)",
  textMuted: "#475569",
  textDim: "#94A3B8",
} as const;

export const typography = {
  fontFamily: "'Playfair Display', 'DM Serif Display', serif",
  headingFontFamily: "'DM Serif Display', 'Playfair Display', serif",
  display: {
    desktop: 96,
    mobile: 48,
    weight: 700,
    lineHeight: 1.04,
    letterSpacing: "-0.03em",
  },
  h2: {
    desktop: 48,
    mobile: 32,
    weight: 600,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  },
  h3: {
    size: 24,
    weight: 600,
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
  },
  body: {
    size: 17,
    weight: 400,
    lineHeight: 1.65,
    letterSpacing: "0",
  },
  mono: {
    fontFamily: "'JetBrains Mono', monospace",
  },
} as const;

export const spacing = {
  8: 8,
  16: 16,
  24: 24,
  32: 32,
  48: 48,
  64: 64,
  96: 96,
  128: 128,
} as const;

export const layout = {
  maxContentWidth: 1560,
  gutter: {
    desktop: 48,
    mobile: 20,
  },
  sectionPadding: {
    desktop: 112,
    mobile: 64,
  },
} as const;

export const grid = {
  columns: 12,
  gap: {
    mobile: 16,
    desktop: 48,
  },
  maxWidth: 1560,
} as const;

export const buttons = {
  primary: {
    background: "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)",
    color: "#FFFFFF",
    border: "#0284C7",
  },
  secondary: {
    background: "#FFFFFF",
    color: "#0284C7",
    border: "rgba(56, 189, 248, 0.40)",
  },
} as const;

export const cards = {
  background: "#FFFFFF",
  border: "rgba(56, 189, 248, 0.18)",
  borderRadius: 8,
} as const;

export const grammar = {
  lineWidth: 1,
  signalDashArray: "4 4",
  nodeRadius: 4,
  nodeActiveRadius: 6,
} as const;
