import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Kinetic slam entrance
  const slamSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 180, mass: 0.8 },
  });

  // Camera shake on impact (frames 0 to 25)
  const shake =
    frame < 25 ? Math.sin(frame * 1.5) * Math.max(0, 15 - frame * 0.6) : 0;

  // Staggered line entrances
  const line1Scale = interpolate(slamSpring, [0, 1], [1.35, 1]);
  const line1Opacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });

  const line2Spring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  // Ticking loss numbers
  const lossCount = Math.floor(
    interpolate(frame, [15, 80], [12000, 482600], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    })
  );

  // Exit transition towards Scene 2
  const exitZoom = interpolate(frame, [72, 90], [1, 1.15], { extrapolateLeft: 'clamp' });
  const exitOpacity = interpolate(frame, [78, 90], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#040507',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exitOpacity,
        transform: `scale(${exitZoom}) translate(${shake}px, ${shake * 0.5}px)`,
        overflow: 'hidden',
      }}
    >
      <CinematicBackground alertMode />

      {/* Warning HUD Perimeter Box */}
      <div
        style={{
          position: 'absolute',
          inset: '60px 80px',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          borderRadius: '24px',
          boxShadow: 'inset 0 0 60px rgba(239, 68, 68, 0.08), 0 0 40px rgba(239, 68, 68, 0.1)',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '28px 36px',
        }}
      >
        {/* Top Warning Strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                boxShadow: '0 0 16px #ef4444',
              }}
            />
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '13px',
                fontWeight: 800,
                letterSpacing: '0.2em',
                color: '#ef4444',
              }}
            >
              CRITICAL SYSTEM WARNING // HUMAN TOIL EXPOSED
            </span>
          </div>

          <div
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '0.1em',
            }}
          >
            SYS_FAULT: MANUAL_BOTTLENECK_DETECTED
          </div>
        </div>

        {/* Bottom Ticking Metric Telemetry */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '20px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.4)',
                letterSpacing: '0.1em',
              }}
            >
              ANNUAL SALARY BURNED ON REPETITIVE TOIL
            </div>
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '32px',
                fontWeight: 900,
                color: '#ef4444',
                marginTop: '4px',
                textShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
              }}
            >
              ${lossCount.toLocaleString()}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.4)',
                letterSpacing: '0.1em',
              }}
            >
              HUMAN RESPONSE DRAG
            </div>
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '32px',
                fontWeight: 900,
                color: '#f59e0b',
                marginTop: '4px',
              }}
            >
              +4.8 HOURS
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.4)',
                letterSpacing: '0.1em',
              }}
            >
              LEAD / REVENUE LOSS RATE
            </div>
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '32px',
                fontWeight: 900,
                color: '#ef4444',
                marginTop: '4px',
              }}
            >
              42.4% DROPOFF
            </div>
          </div>
        </div>
      </div>

      {/* Massive Kinetic Hero Headline */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          textAlign: 'center',
          maxWidth: '1300px',
          padding: '0 40px',
        }}
      >
        <div
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '76px',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.02,
            color: '#ECEEF5',
            opacity: line1Opacity,
            transform: `scale(${line1Scale})`,
            textShadow: '0 10px 40px rgba(0, 0, 0, 0.9)',
          }}
        >
          YOUR ENTERPRISE IS BLEEDING
        </div>

        <div
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '88px',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.02,
            marginTop: '12px',
            opacity: line2Spring,
            transform: `scale(${interpolate(line2Spring, [0, 1], [0.92, 1])})`,
            background: 'linear-gradient(135deg, #ef4444 0%, #ff6b6b 50%, #f97316 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 60px rgba(239, 68, 68, 0.6)',
          }}
        >
          ON MANUAL HUMAN TOIL.
        </div>

        <div
          style={{
            marginTop: '28px',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.7)',
            letterSpacing: '0.08em',
            opacity: interpolate(frame, [25, 45], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          HUMANS ARE NOT MEANT TO BE GLUE BETWEEN FRAGMENTED SOFTWARE.
        </div>
      </div>
    </AbsoluteFill>
  );
};
