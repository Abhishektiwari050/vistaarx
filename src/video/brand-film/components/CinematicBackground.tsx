import React from 'react';
import { useCurrentFrame } from 'remotion';
import { BRAND_TOKENS } from '../constants';

export const CinematicBackground: React.FC<{
  intensity?: number;
}> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();

  // Subtle breathing of the liquid platinum specular core
  const auraPulse = Math.sin(frame * 0.03) * 0.03 + 0.97;
  const auraX = Math.sin(frame * 0.015) * 40;
  const auraY = Math.cos(frame * 0.018) * 30;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: BRAND_TOKENS.colors.bgVoid,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Deep Obsidian Background Texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 45%, ${BRAND_TOKENS.colors.bgElevated} 0%, ${BRAND_TOKENS.colors.bgObsidian} 55%, ${BRAND_TOKENS.colors.bgVoid} 100%)`,
          opacity: 0.95,
        }}
      />

      {/* Central Liquid Platinum Volumetric Specular Flare */}
      <div
        style={{
          position: 'absolute',
          top: `calc(50% + ${auraY}px)`,
          left: `calc(50% + ${auraX}px)`,
          width: '1300px',
          height: '850px',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(255, 255, 255, ${0.055 * intensity}) 0%, rgba(214, 218, 232, ${0.02 * intensity}) 40%, rgba(6, 7, 9, 0) 72%)`,
          filter: 'blur(120px)',
          opacity: auraPulse,
        }}
      />

      {/* High-Precision Architectural Coordinate Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.8,
        }}
      />

      {/* Hairline Technical Sub-grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.01) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.01) 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px',
          opacity: 0.6,
        }}
      />

      {/* Precision Crosshair Corner Accents */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.35,
        }}
      >
        <line x1="80" y1="70" x2="80" y2="90" stroke="#FFFFFF" strokeWidth="1" />
        <line x1="70" y1="80" x2="90" y2="80" stroke="#FFFFFF" strokeWidth="1" />

        <line x1="1840" y1="70" x2="1840" y2="90" stroke="#FFFFFF" strokeWidth="1" />
        <line x1="1830" y1="80" x2="1850" y2="80" stroke="#FFFFFF" strokeWidth="1" />

        <line x1="80" y1="990" x2="80" y2="1010" stroke="#FFFFFF" strokeWidth="1" />
        <line x1="70" y1="1000" x2="90" y2="1000" stroke="#FFFFFF" strokeWidth="1" />

        <line x1="1840" y1="990" x2="1840" y2="1010" stroke="#FFFFFF" strokeWidth="1" />
        <line x1="1830" y1="1000" x2="1850" y2="1000" stroke="#FFFFFF" strokeWidth="1" />
      </svg>
    </div>
  );
};
