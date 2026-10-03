import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BRAND_TOKENS } from '../constants';

export const CinematicBackground: React.FC<{
  tint?: 'warm' | 'subtle' | 'focus';
}> = ({ tint = 'warm' }) => {
  const frame = useCurrentFrame();

  // Very gentle, imperceptible ambient breathing
  const ambientPulse = Math.sin(frame * 0.03) * 0.05 + 0.95;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: BRAND_TOKENS.colors.bg,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Subtle architectural hairline grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          opacity: 0.8,
        }}
      />

      {/* Gentle warm organic ambient radial warmth (Anthropic editorial aesthetic) */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '1100px',
          height: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 237, 225, 0.55) 0%, rgba(250, 249, 245, 0) 70%)',
          filter: 'blur(100px)',
          opacity: ambientPulse,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-5%',
          width: '1000px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(238, 235, 222, 0.6) 0%, rgba(250, 249, 245, 0) 70%)',
          filter: 'blur(90px)',
          opacity: ambientPulse,
        }}
      />

      {/* Editorial Frame Borders (Architectural perimeter hairlines) */}
      <div
        style={{
          position: 'absolute',
          inset: '28px',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
