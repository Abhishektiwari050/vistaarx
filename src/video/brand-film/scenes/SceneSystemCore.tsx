import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_TOKENS } from '../constants';

export const SceneSystemCore: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Relative frame (0 to 150)
  const relFrame = Math.max(0, frame - 90);

  // Core Assembly Spring
  const coreScale = spring({
    frame: relFrame,
    fps,
    config: { damping: 15, stiffness: 80, mass: 1 },
  });

  const rotation = relFrame * 0.8;
  const counterRotation = -relFrame * 0.5;

  // Text entrance
  const textOpacity = interpolate(relFrame, [10, 35], [0, 1], { extrapolateRight: 'clamp' });
  const textY = interpolate(relFrame, [10, 35], [20, 0], { extrapolateRight: 'clamp' });

  // Pulsing energy
  const corePulse = 1 + Math.sin(relFrame * 0.15) * 0.05;

  // Exit towards Scene 3
  const exitOpacity = interpolate(relFrame, [135, 150], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exitOpacity,
        overflow: 'hidden',
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: `scale(${corePulse})`,
        }}
      />

      {/* Dynamic 3D Geometric Orbital Core System */}
      <div
        style={{
          position: 'relative',
          width: '500px',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${coreScale})`,
        }}
      >
        {/* Outer Ring 1 */}
        <div
          style={{
            position: 'absolute',
            width: '460px',
            height: '460px',
            borderRadius: '50%',
            border: '1px dashed rgba(16, 185, 129, 0.3)',
            transform: `rotate(${rotation}deg)`,
          }}
        />

        {/* Outer Ring 2 (Counter-rotating) */}
        <div
          style={{
            position: 'absolute',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            transform: `rotate(${counterRotation}deg)`,
          }}
        >
          {/* Orbital Satellite Node */}
          <div
            style={{
              position: 'absolute',
              top: '-6px',
              left: '50%',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: BRAND_TOKENS.colors.accentEmerald,
              boxShadow: `0 0 12px ${BRAND_TOKENS.colors.accentEmerald}`,
            }}
          />
        </div>

        {/* Inner Ring 3 (High speed) */}
        <div
          style={{
            position: 'absolute',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            border: '2px solid rgba(16, 185, 129, 0.4)',
            transform: `rotate(${rotation * 1.5}deg)`,
          }}
        />

        {/* Central Hexagonal Geodesic Core */}
        <div
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(20, 22, 34, 0.9) 0%, rgba(13, 14, 21, 0.95) 100%)',
            border: `1.5px solid ${BRAND_TOKENS.colors.accentEmerald}`,
            boxShadow: `0 0 40px rgba(16, 185, 129, 0.3)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            transform: `rotate(${rotation * 0.25}deg) scale(${corePulse})`,
            zIndex: 5,
          }}
        >
          <div
            style={{
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '11px',
              fontWeight: 700,
              color: BRAND_TOKENS.colors.accentEmerald,
              letterSpacing: '0.15em',
            }}
          >
            VISTAR
          </div>
          <div
            style={{
              fontSize: '9px',
              fontFamily: BRAND_TOKENS.typography.fontMono,
              color: BRAND_TOKENS.colors.textSecondary,
              marginTop: '4px',
            }}
          >
            SYSTEM CORE
          </div>
        </div>
      </div>

      {/* Foreground Kinetic Typography */}
      <div
        style={{
          position: 'absolute',
          bottom: '120px',
          textAlign: 'center',
          maxWidth: '900px',
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: '999px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: `1px solid ${BRAND_TOKENS.colors.borderActive}`,
            color: BRAND_TOKENS.colors.accentEmerald,
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '11px',
            letterSpacing: '0.15em',
            marginBottom: '18px',
          }}
        >
          FOUNDER-DIRECTED ARCHITECTURE
        </div>

        <h2
          style={{
            fontFamily: BRAND_TOKENS.typography.fontSans,
            fontSize: '48px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            color: BRAND_TOKENS.colors.textPrimary,
            margin: 0,
          }}
        >
          WE BUILD THE SYSTEMS
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #ECEEF5 0%, #959CB3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            YOUR ENTERPRISE RUNS ON.
          </span>
        </h2>

        <p
          style={{
            marginTop: '16px',
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '15px',
            color: BRAND_TOKENS.colors.textSecondary,
            letterSpacing: '0.05em',
          }}
        >
          Autonomous WhatsApp Sales Engines • High-Speed Web Platforms • 3D Spatial Interfaces
        </p>
      </div>
    </AbsoluteFill>
  );
};
