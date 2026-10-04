import React from 'react';
import { BRAND_TOKENS } from '../constants';

interface VistarLogoMarkProps {
  size?: number;
  color?: string;
  centerColor?: string;
  showCenterCore?: boolean;
  convergence?: number; // 0 = fully separated outwards (fragmented), 1 = snapped together (unified)
  rotation?: number; // degrees
  pulse?: number; // scale multiplier
  wireframe?: boolean;
  strokeWidth?: number;
  sheenOffset?: number; // percentage for gradient sweep
  style?: React.CSSProperties;
}

/**
 * VISTAR Brand Logo Mark (Motion Graphics Edition)
 * Mathematical 4-vector cardinal compass & expansion star:
 * - Pure monochrome luxury styling (liquid platinum, titanium silver, specular highlights)
 * - Parametric convergence physics (triangles translate along cardinal axes)
 */
export const VistarLogoMark: React.FC<VistarLogoMarkProps> = ({
  size = 72,
  color = '#FFFFFF',
  centerColor = '#FFFFFF',
  showCenterCore = true,
  convergence = 1,
  rotation = 0,
  pulse = 1,
  wireframe = false,
  strokeWidth = 0.5,
  sheenOffset,
  style = {},
}) => {
  // Outward displacement when disconnected (convergence = 0 means max offset of 28 units)
  const offset = (1 - convergence) * 28;

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
        <defs>
          <linearGradient id="vistarChromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#D6DAE8" />
            <stop offset="100%" stopColor="#959CB3" />
          </linearGradient>
          <linearGradient id="vistarCenterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#ECEEF5" />
          </linearGradient>
        </defs>

        {/* Center Operational Core (illuminates in pure brilliant white when converged) */}
        {showCenterCore && (
          <rect
            x="34"
            y="34"
            width="32"
            height="32"
            fill={wireframe ? 'none' : 'url(#vistarCenterGrad)'}
            stroke="#FFFFFF"
            strokeWidth={wireframe ? 1.5 : strokeWidth}
            style={{
              opacity: convergence,
              transform: `scale(${0.5 + convergence * 0.5})`,
              transformOrigin: '50px 50px',
              filter: convergence > 0.8 ? 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.6))' : 'none',
            }}
          />
        )}

        {/* Top Triangle Pointing Up (North) */}
        <polygon
          points="50,2 66,34 34,34"
          fill={wireframe ? 'none' : 'url(#vistarChromeGrad)'}
          stroke="#FFFFFF"
          strokeWidth={wireframe ? 1.5 : strokeWidth}
          style={{
            transform: `translateY(${-offset}px)`,
            transformOrigin: '50px 18px',
          }}
        />

        {/* Right Triangle Pointing Right (East) */}
        <polygon
          points="98,50 66,66 66,34"
          fill={wireframe ? 'none' : 'url(#vistarChromeGrad)'}
          stroke="#FFFFFF"
          strokeWidth={wireframe ? 1.5 : strokeWidth}
          style={{
            transform: `translateX(${offset}px)`,
            transformOrigin: '82px 50px',
          }}
        />

        {/* Bottom Triangle Pointing Down (South) */}
        <polygon
          points="50,98 34,66 66,66"
          fill={wireframe ? 'none' : 'url(#vistarChromeGrad)'}
          stroke="#FFFFFF"
          strokeWidth={wireframe ? 1.5 : strokeWidth}
          style={{
            transform: `translateY(${offset}px)`,
            transformOrigin: '50px 82px',
          }}
        />

        {/* Left Triangle Pointing Left (West) */}
        <polygon
          points="2,50 34,34 34,66"
          fill={wireframe ? 'none' : 'url(#vistarChromeGrad)'}
          stroke="#FFFFFF"
          strokeWidth={wireframe ? 1.5 : strokeWidth}
          style={{
            transform: `translateX(${-offset}px)`,
            transformOrigin: '18px 50px',
          }}
        />
      </svg>

      {/* Optional Specular Sheen Overlay */}
      {typeof sheenOffset === 'number' && (
        <div
          style={{
            position: 'absolute',
            inset: -10,
            background: 'linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.6) 50%, transparent 65%)',
            transform: `translateX(${sheenOffset}%)`,
            pointerEvents: 'none',
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </div>
  );
};
