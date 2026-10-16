import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface SelectionBoundingBoxProps {
  children: React.ReactNode;
  active?: boolean;
  label?: string;
  padding?: string;
  style?: React.CSSProperties;
}

/**
 * Philipp Baikov-inspired Interactive Selection Bounding Box
 * Features corner resize handles, hairline cyan/platinum perimeter, and active coordinate label
 */
export const SelectionBoundingBox: React.FC<SelectionBoundingBoxProps> = ({
  children,
  active = true,
  label,
  padding = '12px 24px',
  style = {},
}) => {
  const frame = useCurrentFrame();

  // Subtle breathing pulse of the corner handles
  const handlePulse = Math.sin(frame * 0.1) * 0.5 + 4.5; // handle size in px

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding,
        border: '1px solid rgba(255, 255, 255, 0.25)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        ...style,
      }}
    >
      {/* 4 Corner Anchor Handles (Figma / AfterEffects Style) */}
      <div
        style={{
          position: 'absolute',
          top: -handlePulse / 2,
          left: -handlePulse / 2,
          width: handlePulse,
          height: handlePulse,
          backgroundColor: '#FFFFFF',
          boxShadow: '0 0 8px #FFFFFF',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -handlePulse / 2,
          right: -handlePulse / 2,
          width: handlePulse,
          height: handlePulse,
          backgroundColor: '#FFFFFF',
          boxShadow: '0 0 8px #FFFFFF',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -handlePulse / 2,
          left: -handlePulse / 2,
          width: handlePulse,
          height: handlePulse,
          backgroundColor: '#FFFFFF',
          boxShadow: '0 0 8px #FFFFFF',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -handlePulse / 2,
          right: -handlePulse / 2,
          width: handlePulse,
          height: handlePulse,
          backgroundColor: '#FFFFFF',
          boxShadow: '0 0 8px #FFFFFF',
        }}
      />

      {/* Optional Top Tag Label */}
      {label && (
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            left: '0px',
            fontFamily: '"CohereMono", monospace',
            fontSize: '10px',
            letterSpacing: '0.18em',
            color: '#D6DAE8',
            backgroundColor: '#060709',
            padding: '2px 6px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      )}

      {children}
    </div>
  );
};
