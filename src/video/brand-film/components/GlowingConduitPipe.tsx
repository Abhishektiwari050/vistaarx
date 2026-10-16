import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface GlowingConduitPipeProps {
  width?: number;
  height?: number;
  speed?: number;
  style?: React.CSSProperties;
}

/**
 * Philipp Baikov-inspired Illuminated Conduit Pipe
 * Features an organic curved rounded pathway with an active traveling energy spark
 */
export const GlowingConduitPipe: React.FC<GlowingConduitPipeProps> = ({
  width = 540,
  height = 140,
  speed = 1,
  style = {},
}) => {
  const frame = useCurrentFrame();

  // Normalized path progress for the traveling particle (0 to 1)
  const progress = ((frame * 0.02 * speed) % 1);

  // SVG curved S-conduit path
  const pathD = `M 40 30 L 160 30 Q 200 30 200 70 L 200 80 Q 200 110 240 110 L 500 110`;

  // Dash animation offset
  const dashOffset = (frame * 4 * speed) % 60;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        ...style,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.15)" />
          </linearGradient>
          <filter id="pipeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Outer Pipe Body */}
        <path
          d={pathD}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Core Glowing Conduit Channel */}
        <path
          d={pathD}
          stroke="url(#pipeGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#pipeGlow)"
        />

        {/* High-Frequency Electrical Pulse Dashes */}
        <path
          d={pathD}
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="12 18"
          strokeDashoffset={-dashOffset}
          opacity="0.8"
        />

        {/* Traveling Energy Orb (Philipp Baikov Spark) */}
        <path
          id="conduitMotionPath"
          d={pathD}
          stroke="none"
          fill="none"
        />
      </svg>
    </div>
  );
};
