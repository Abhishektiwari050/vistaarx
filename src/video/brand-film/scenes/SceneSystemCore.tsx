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

  // Scanner sweep
  const scannerY = interpolate(relFrame, [0, 120], [-180, 180], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

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
          width: '850px',
          height: '850px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: `scale(${corePulse})`,
        }}
      />

      {/* Dynamic Operational Diagnostic Mesh & Scanner */}
      <div
        style={{
          position: 'relative',
          width: '520px',
          height: '520px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${coreScale})`,
        }}
      >
        {/* Outer Ring 1 - Workflow Trace Perimeter */}
        <div
          style={{
            position: 'absolute',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            border: '1px dashed rgba(16, 185, 129, 0.35)',
            transform: `rotate(${rotation}deg)`,
          }}
        />

        {/* Outer Ring 2 - Operational Conduits */}
        <div
          style={{
            position: 'absolute',
            width: '390px',
            height: '390px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            transform: `rotate(${counterRotation}deg)`,
          }}
        >
          {/* Active Diagnostic Probe Node */}
          <div
            style={{
              position: 'absolute',
              top: '-7px',
              left: '50%',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: BRAND_TOKENS.colors.accentEmerald,
              boxShadow: `0 0 16px ${BRAND_TOKENS.colors.accentEmerald}`,
            }}
          />
        </div>

        {/* Inner Ring 3 - Automation Synthesizer */}
        <div
          style={{
            position: 'absolute',
            width: '290px',
            height: '290px',
            borderRadius: '50%',
            border: '2px solid rgba(16, 185, 129, 0.4)',
            transform: `rotate(${rotation * 1.5}deg)`,
          }}
        />

        {/* Central Operational Diagnostic Core */}
        <div
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(20, 22, 34, 0.95) 0%, rgba(13, 14, 21, 0.98) 100%)',
            border: `1.5px solid ${BRAND_TOKENS.colors.accentEmerald}`,
            boxShadow: `0 0 40px rgba(16, 185, 129, 0.3)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            transform: `rotate(${rotation * 0.25}deg) scale(${corePulse})`,
            zIndex: 5,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Laser Scanner Bar */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '2px',
              backgroundColor: BRAND_TOKENS.colors.accentEmerald,
              boxShadow: '0 0 10px #10b981',
              transform: `translateY(${scannerY * 0.3}px)`,
            }}
          />
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
            OPERATIONAL X-RAY
          </div>
        </div>
      </div>

      {/* Foreground Kinetic Copy */}
      <div
        style={{
          position: 'absolute',
          bottom: '110px',
          textAlign: 'center',
          maxWidth: '960px',
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
            padding: '5px 16px',
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
          STEP 01 // OPERATIONAL INTELLIGENCE AUDIT
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
          WE EXAMINE HOW YOUR COMPANY
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #ECEEF5 0%, #959CB3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ACTUALLY FUNCTIONS.
          </span>
        </h2>

        <p
          style={{
            marginTop: '16px',
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '15px',
            color: BRAND_TOKENS.colors.textSecondary,
            letterSpacing: '0.04em',
          }}
        >
          We trace every information flow, locate every human drag point, and identify where AI makes software run itself.
        </p>
      </div>
    </AbsoluteFill>
  );
};
