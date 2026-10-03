import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BRAND_TOKENS } from '../constants';

export const CinematicBackground: React.FC<{
  accent?: 'indigo' | 'coral' | 'emerald' | 'amber';
}> = ({ accent = 'indigo' }) => {
  const frame = useCurrentFrame();

  // Gentle volumetric aura motion
  const auraX = Math.sin(frame * 0.02) * 60;
  const auraY = Math.cos(frame * 0.025) * 40;
  const auraPulse = Math.sin(frame * 0.04) * 0.1 + 0.9;

  let glowColor = 'rgba(99, 102, 241, 0.12)'; // indigo
  if (accent === 'coral') glowColor = 'rgba(255, 56, 35, 0.14)';
  if (accent === 'emerald') glowColor = 'rgba(16, 185, 129, 0.12)';
  if (accent === 'amber') glowColor = 'rgba(245, 158, 11, 0.13)';

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
      {/* Deep Volumetric Light Core */}
      <div
        style={{
          position: 'absolute',
          top: `calc(35% + ${auraY}px)`,
          left: `calc(50% + ${auraX}px)`,
          width: '1200px',
          height: '800px',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(5, 6, 10, 0) 70%)`,
          filter: 'blur(100px)',
          opacity: auraPulse,
        }}
      />

      {/* Secondary Ambient Accent Corner */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 56, 35, 0.07) 0%, rgba(5, 6, 10, 0) 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Subtle Specular Architectural Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.022) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.022) 1px, transparent 1px)
          `,
          backgroundSize: '54px 54px',
          opacity: 0.85,
        }}
      />

      {/* Precision Perimeter Framing Lines */}
      <div
        style={{
          position: 'absolute',
          inset: '32px',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
