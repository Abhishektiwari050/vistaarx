import React from 'react';

interface VistarLogoMarkProps {
  size?: number;
  color?: string;
  centerColor?: string;
  showCenterCore?: boolean;
  convergence?: number; // 0 = fully separated outwards (fragmented), 1 = snapped together (unified)
  rotation?: number; // degrees
  pulse?: number; // scale multiplier
  style?: React.CSSProperties;
}

/**
 * VISTAR Brand Logo Mark
 * Mathematical 4-vector cardinal compass & expansion star:
 * - Top Triangle pointing Up (North)
 * - Bottom Triangle pointing Down (South)
 * - Left Triangle pointing Left (West)
 * - Right Triangle pointing Right (East)
 * - Center 32x32 Core: The unified operational engine
 */
export const VistarLogoMark: React.FC<VistarLogoMarkProps> = ({
  size = 64,
  color = '#141413',
  centerColor = '#FF3823',
  showCenterCore = true,
  convergence = 1, // 0 to 1
  rotation = 0,
  pulse = 1,
  style = {},
}) => {
  // Outward displacement when disconnected (convergence = 0 means max offset)
  const offset = (1 - convergence) * 22; // up to 22 units outward displacement

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
        {/* Center Operational Core (illuminates when converged) */}
        {showCenterCore && (
          <rect
            x="34"
            y="34"
            width="32"
            height="32"
            fill={centerColor}
            style={{
              opacity: convergence,
              transform: `scale(${0.6 + convergence * 0.4})`,
              transformOrigin: '50px 50px',
              transition: 'opacity 0.2s ease',
            }}
          />
        )}

        {/* Top Triangle (Translates along -Y when separated) */}
        <polygon
          points="50,2 66,34 34,34"
          fill={color}
          style={{
            transform: `translateY(${-offset}px)`,
            transformOrigin: '50px 18px',
          }}
        />

        {/* Right Triangle (Translates along +X when separated) */}
        <polygon
          points="98,50 66,66 66,34"
          fill={color}
          style={{
            transform: `translateX(${offset}px)`,
            transformOrigin: '82px 50px',
          }}
        />

        {/* Bottom Triangle (Translates along +Y when separated) */}
        <polygon
          points="50,98 34,66 66,66"
          fill={color}
          style={{
            transform: `translateY(${offset}px)`,
            transformOrigin: '50px 82px',
          }}
        />

        {/* Left Triangle (Translates along -X when separated) */}
        <polygon
          points="2,50 34,34 34,66"
          fill={color}
          style={{
            transform: `translateX(${-offset}px)`,
            transformOrigin: '18px 50px',
          }}
        />
      </svg>
    </div>
  );
};
