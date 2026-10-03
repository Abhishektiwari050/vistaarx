import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface MaskedKineticTextProps {
  children: React.ReactNode;
  delay?: number; // frame delay
  direction?: 'up' | 'down';
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
}

/**
 * MaskedKineticText component
 * Replaces standard fade-ins with crisp Apple/Linear style masked reveals.
 * The text rises or drops from an invisible slit (overflow: hidden) using high-tension spring physics.
 */
export const MaskedKineticText: React.FC<MaskedKineticTextProps> = ({
  children,
  delay = 0,
  direction = 'up',
  style = {},
  wrapperStyle = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 180, mass: 0.8 },
  });

  const initialY = direction === 'up' ? 115 : -115;
  const translateY = interpolate(progress, [0, 1], [initialY, 0]);
  const opacity = interpolate(frame - delay, [0, 4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        overflow: 'hidden',
        display: 'inline-block',
        verticalAlign: 'bottom',
        ...wrapperStyle,
      }}
    >
      <div
        style={{
          transform: `translateY(${translateY}%)`,
          opacity,
          willChange: 'transform, opacity',
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};
