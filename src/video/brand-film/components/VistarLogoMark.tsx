import React from 'react';

interface VistarLogoMarkProps {
  size?: number;
  convergence?: number; // 0 = fully separated outwards (fragmented), 1 = snapped together (unified)
  rotation?: number; // degrees
  pulse?: number; // scale multiplier
  wireframe?: boolean;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

/**
 * Official VISTAR Brand Emblem (Motion Graphics Edition)
 * Exactly reproduces the official logo from public/vistar-logo.svg and public/vistar-logo.png:
 * - Four pure white triangles pointing outward along cardinal axes (North, East, South, West)
 * - Negative space square void in the center (fill="none")
 * - Parametric convergence along cardinal axes
 */
export const VistarLogoMark: React.FC<VistarLogoMarkProps> = ({
  size = 72,
  convergence = 1,
  rotation = 0,
  pulse = 1,
  wireframe = false,
  strokeWidth = 1,
  style = {},
}) => {
  // Outward displacement when disconnected (convergence = 0 means max offset of 32 units)
  const offset = (1 - convergence) * 32;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `rotate(${rotation}deg) scale(${pulse})`,
        transformOrigin: 'center center',
        position: 'relative',
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* Top Triangle (Apex pointing UP at (50, 2), base from (34,34) to (66,34)) */}
        <polygon
          points="50,2 66,34 34,34"
          fill={wireframe ? 'none' : '#FFFFFF'}
          stroke="#FFFFFF"
          strokeWidth={strokeWidth}
          style={{
            transform: `translateY(${-offset}px)`,
            transformOrigin: '50px 18px',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))',
          }}
        />

        {/* Right Triangle (Apex pointing RIGHT at (98, 50), base from (66,34) to (66,66)) */}
        <polygon
          points="98,50 66,66 66,34"
          fill={wireframe ? 'none' : '#FFFFFF'}
          stroke="#FFFFFF"
          strokeWidth={strokeWidth}
          style={{
            transform: `translateX(${offset}px)`,
            transformOrigin: '82px 50px',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))',
          }}
        />

        {/* Bottom Triangle (Apex pointing DOWN at (50, 98), base from (34,66) to (66,66)) */}
        <polygon
          points="50,98 34,66 66,66"
          fill={wireframe ? 'none' : '#FFFFFF'}
          stroke="#FFFFFF"
          strokeWidth={strokeWidth}
          style={{
            transform: `translateY(${offset}px)`,
            transformOrigin: '50px 82px',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))',
          }}
        />

        {/* Left Triangle (Apex pointing LEFT at (2, 50), base from (34,34) to (34,66)) */}
        <polygon
          points="2,50 34,34 34,66"
          fill={wireframe ? 'none' : '#FFFFFF'}
          stroke="#FFFFFF"
          strokeWidth={strokeWidth}
          style={{
            transform: `translateX(${-offset}px)`,
            transformOrigin: '18px 50px',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))',
          }}
        />

        {/* Crisp Central Negative Space Boundary (Hollow square, fill="none") */}
        <rect
          x="34"
          y="34"
          width="32"
          height="32"
          fill="none"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="1"
          style={{
            opacity: convergence,
            transform: `scale(${convergence})`,
            transformOrigin: '50px 50px',
          }}
        />
      </svg>
    </div>
  );
};
