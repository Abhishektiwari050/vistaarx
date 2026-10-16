import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface StudioDisplayMockupProps {
  width?: number;
  height?: number;
  curveProgress?: number; // 0 to 1
  style?: React.CSSProperties;
}

/**
 * High-End Studio Hardware Display (Inspired by Reference 1: 008682d6b41274062697c9359492f5bd)
 * Renders an ultra-sleek matte dark hardware monitor with real live animated performance curve & tooltip
 */
export const StudioDisplayMockup: React.FC<StudioDisplayMockupProps> = ({
  width = 960,
  height = 540,
  curveProgress = 1,
  style = {},
}) => {
  const frame = useCurrentFrame();

  // Dynamic live metric data
  const dataValue = Math.floor(interpolate(curveProgress, [0, 1], [120, 14250]));

  // Live bezier curve points inside the monitor
  const p0 = { x: 80, y: 360 };
  const p1 = { x: 260, y: 350 };
  const p2 = { x: 480, y: 220 };
  const p3 = { x: 740, y: 120 };

  // Current head position on the curve
  const t = Math.max(0, Math.min(1, curveProgress));
  // Cubic bezier formula for point: (1-t)^3*p0 + 3(1-t)^2*t*p1 + 3(1-t)*t^2*p2 + t^3*p3
  const curX =
    Math.pow(1 - t, 3) * p0.x +
    3 * Math.pow(1 - t, 2) * t * p1.x +
    3 * (1 - t) * Math.pow(t, 2) * p2.x +
    Math.pow(t, 3) * p3.x;
  const curY =
    Math.pow(1 - t, 3) * p0.y +
    3 * Math.pow(1 - t, 2) * t * p1.y +
    3 * (1 - t) * Math.pow(t, 2) * p2.y +
    Math.pow(t, 3) * p3.y;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...style,
      }}
    >
      {/* Monitor Outer Chassis */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#080A10',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '16px',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Subtle Screen Bezel Reflection */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        {/* Display Screen Interior */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#050609',
            padding: '32px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {/* Internal Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div
                style={{
                  fontFamily: '"CohereMono", monospace',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  color: '#959CB3',
                  textTransform: 'uppercase',
                }}
              >
                ENTERPRISE OPERATIONAL RUNTIME
              </div>
              <div
                style={{
                  fontFamily: '"CohereText", sans-serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginTop: '4px',
                }}
              >
                Autonomous Execution Curve
              </div>
            </div>

            <div
              style={{
                fontFamily: '"CohereMono", monospace',
                fontSize: '12px',
                padding: '4px 12px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '4px',
                color: '#FFFFFF',
              }}
            >
              ● LIVE 100%
            </div>
          </div>

          {/* SVG Animated Exponential Curve */}
          <div style={{ position: 'relative', width: '100%', height: '320px' }}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 840 400"
              fill="none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.18)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.0)" />
                </linearGradient>
              </defs>

              {/* Background Grid Lines */}
              {[100, 180, 260, 340].map((y) => (
                <line
                  key={y}
                  x1="80"
                  y1={y}
                  x2="780"
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeWidth="1"
                />
              ))}

              {/* Shaded Area Under Curve */}
              <path
                d={`M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${curX} ${curY} L ${curX} 360 L ${p0.x} 360 Z`}
                fill="url(#areaGradient)"
              />

              {/* High-Gloss Main Curve */}
              <path
                d={`M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${curX} ${curY}`}
                stroke="#FFFFFF"
                strokeWidth="3.5"
                filter="drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))"
              />

              {/* Active Tracking Head Pin */}
              <circle
                cx={curX}
                cy={curY}
                r="6"
                fill="#FFFFFF"
                filter="drop-shadow(0 0 12px #FFFFFF)"
              />
              <circle
                cx={curX}
                cy={curY}
                r="14"
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="1.5"
              />
            </svg>

            {/* Interactive Data Tooltip (Direct Reference 1 Style) */}
            <div
              style={{
                position: 'absolute',
                left: `${curX * 0.98}px`,
                top: `${curY * 0.85 - 50}px`,
                transform: 'translate(-50%, -100%)',
                padding: '6px 14px',
                backgroundColor: '#0D0E15',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '6px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.8), 0 0 16px rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: '"CohereMono", monospace',
                fontSize: '12px',
                fontWeight: 700,
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ color: '#D6DAE8', fontSize: '10px' }}>THROUGHPUT:</span>
              <span>{dataValue.toLocaleString()} OPS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monitor Stand Base */}
      <div
        style={{
          width: '180px',
          height: '24px',
          backgroundColor: '#0D0E15',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderTop: 'none',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
        }}
      />
      <div
        style={{
          width: '320px',
          height: '10px',
          backgroundColor: '#080A10',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '4px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.9)',
        }}
      />
    </div>
  );
};
