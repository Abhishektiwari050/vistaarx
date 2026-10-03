import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { BRAND_TOKENS } from '../constants';

export const SceneSovereignHandover: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Majestic typographic reveal
  const statementEntrance = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 80, mass: 1 },
  });

  const logoEntrance = spring({
    frame: frame - 25,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  const sublockEntrance = spring({
    frame: frame - 40,
    fps,
    config: { damping: 16, stiffness: 85 },
  });

  // Slow, regal push-in
  const cameraScale = interpolate(frame, [0, 160], [0.98, 1.02], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bg,
        transform: `scale(${cameraScale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 100px',
        overflow: 'hidden',
      }}
    >
      <CinematicBackground tint="warm" />

      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        {/* The Climax Statement */}
        <div
          style={{
            marginBottom: '48px',
            opacity: interpolate(statementEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(statementEntrance, [0, 1], [25, 0])}px)`,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '999px',
              marginBottom: '24px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: BRAND_TOKENS.colors.accentCoral,
              }}
            />
            <span
              style={{
                fontFamily: BRAND_TOKENS.typography.fontMono,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                color: BRAND_TOKENS.colors.textSecondary,
                textTransform: 'uppercase',
              }}
            >
              The Next Evolution of Enterprise Work
            </span>
          </div>

          <h2
            style={{
              fontFamily: BRAND_TOKENS.typography.fontDisplay,
              fontSize: '68px',
              lineHeight: 1.1,
              fontWeight: 500,
              letterSpacing: '-0.04em',
              color: BRAND_TOKENS.colors.textPrimary,
              maxWidth: '1040px',
              margin: '0 auto',
            }}
          >
            Make your enterprise work{' '}
            <span style={{ color: BRAND_TOKENS.colors.accentCoral }}>easier</span>,{' '}
            <span style={{ color: BRAND_TOKENS.colors.accentCoral }}>faster</span>, and{' '}
            <span
              style={{
                color: BRAND_TOKENS.colors.textPrimary,
                borderBottom: '3px solid #141413',
                paddingBottom: '2px',
              }}
            >
              humanless.
            </span>
          </h2>
        </div>

        {/* Central Brand Lockup */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: interpolate(logoEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(logoEntrance, [0, 1], [30, 0])}px)`,
          }}
        >
          {/* Refined Brand Geometric Mark */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '20px',
              backgroundColor: '#141413',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              boxShadow: '0 16px 36px rgba(20, 20, 19, 0.16)',
            }}
          >
            <span
              style={{
                fontFamily: BRAND_TOKENS.typography.fontDisplay,
                fontSize: '38px',
                fontWeight: 700,
                color: '#FAF9F5',
                letterSpacing: '-0.05em',
              }}
            >
              V
            </span>
          </div>

          {/* Brand Name */}
          <h1
            style={{
              fontFamily: BRAND_TOKENS.typography.fontDisplay,
              fontSize: '84px',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: BRAND_TOKENS.colors.textPrimary,
              margin: '0 0 10px 0',
              lineHeight: 1,
            }}
          >
            VISTAR
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: BRAND_TOKENS.colors.textSecondary,
              textTransform: 'uppercase',
              margin: '0 0 36px 0',
            }}
          >
            Enterprise Operational Intelligence & Autonomous Systems
          </p>

          {/* Action & Link Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              opacity: interpolate(sublockEntrance, [0, 1], [0, 1]),
            }}
          >
            <div
              style={{
                padding: '14px 32px',
                backgroundColor: BRAND_TOKENS.colors.accentCoral,
                color: '#FFFFFF',
                borderRadius: '0px',
                fontFamily: BRAND_TOKENS.typography.fontBody,
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                boxShadow: '0 8px 24px rgba(255, 56, 35, 0.25)',
              }}
            >
              Schedule an Operational Audit &rarr;
            </div>

            <div
              style={{
                padding: '14px 28px',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                color: BRAND_TOKENS.colors.textPrimary,
                borderRadius: '0px',
                fontFamily: BRAND_TOKENS.typography.fontMono,
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              vistar.tech
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
