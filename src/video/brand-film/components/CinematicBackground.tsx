import React from 'react';
import { useCurrentFrame } from 'remotion';

export const CinematicBackground: React.FC<{ accentColor?: string; alertMode?: boolean }> = ({
  accentColor = '#10b981',
  alertMode = false,
}) => {
  const frame = useCurrentFrame();

  // Grid animation offset
  const gridOffset = (frame * 1.5) % 60;

  // Pulse effect
  const pulse = Math.sin(frame * 0.08) * 0.15 + 0.85;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#040507',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Volumetric Radial Light Core */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          width: '1200px',
          height: '800px',
          transform: 'translate(-50%, -50%)',
          background: alertMode
            ? `radial-gradient(circle, rgba(239, 68, 68, 0.22) 0%, rgba(185, 28, 28, 0.08) 45%, transparent 70%)`
            : `radial-gradient(circle, ${accentColor}25 0%, rgba(6, 182, 212, 0.08) 45%, transparent 70%)`,
          filter: 'blur(90px)',
          opacity: pulse,
        }}
      />

      {/* Perspective 3D Moving Floor Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          perspective: '600px',
          perspectiveOrigin: '50% 50%',
          opacity: 0.35,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '-40%',
            left: '-50%',
            width: '200%',
            height: '140%',
            transform: 'rotateX(68deg)',
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: `0px ${gridOffset}px`,
            maskImage: 'linear-gradient(to top, black 30%, transparent 95%)',
            WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 95%)',
          }}
        />
      </div>

      {/* Ambient Moving Laser Streaks */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.4,
        }}
      >
        <line
          x1="0"
          y1={`${(frame * 4) % 1080}`}
          x2="1920"
          y2={`${(frame * 4) % 1080}`}
          stroke={alertMode ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}
          strokeWidth="1.5"
          strokeDasharray="120 400"
          strokeDashoffset={-frame * 12}
        />
        <line
          x1={`${(frame * 6) % 1920}`}
          y1="0"
          x2={`${(frame * 6) % 1920}`}
          y2="1080"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      </svg>

      {/* CRT Scanlines Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0px, rgba(0, 0, 0, 0.25) 1px, transparent 1px, transparent 3px)',
          opacity: 0.6,
        }}
      />

      {/* Cinematic Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 40%, rgba(4, 5, 7, 0.85) 100%)',
        }}
      />
    </div>
  );
};
