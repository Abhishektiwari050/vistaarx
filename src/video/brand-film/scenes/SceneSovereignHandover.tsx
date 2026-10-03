import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { CinematicCamera } from '../components/CinematicCamera';
import { MaskedKineticText } from '../components/MaskedKineticText';
import { VistarLogoMark } from '../components/VistarLogoMark';
import { BRAND_TOKENS } from '../constants';

export const SceneSovereignHandover: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Mathematical vector convergence: starts separated, snaps together
  const convergence = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const pulse = Math.sin(frame * 0.05) * 0.03 + 1;

  // Specular light sweep on settled logo
  const sheenProgress = interpolate(frame, [50, 110], [-100, 200], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bg,
        overflow: 'hidden',
      }}
    >
      <CinematicCamera durationInFrames={220} startScale={1.05} endScale={1.0} tiltX={2} panY={-8}>
        <CinematicBackground accent="coral" />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 80px',
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          {/* Eyebrow Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '999px',
              marginBottom: '28px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: BRAND_TOKENS.colors.accentCoral,
                boxShadow: '0 0 10px rgba(255, 56, 35, 0.9)',
              }}
            />
            <span
              style={{
                fontFamily: BRAND_TOKENS.typography.fontMono,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: BRAND_TOKENS.colors.textSecondary,
                textTransform: 'uppercase',
              }}
            >
              The Autonomous Horizon
            </span>
          </div>

          {/* Climax Statement */}
          <h2
            style={{
              fontFamily: BRAND_TOKENS.typography.fontDisplay,
              fontSize: '68px',
              lineHeight: 1.1,
              fontWeight: 600,
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
              maxWidth: '1120px',
              margin: '0 auto 40px auto',
            }}
          >
            <MaskedKineticText delay={5}>Make your enterprise work</MaskedKineticText>{' '}
            <MaskedKineticText delay={14}>
              <span style={{ color: BRAND_TOKENS.colors.accentCoral }}>easier</span>,{' '}
              <span style={{ color: BRAND_TOKENS.colors.accentCoral }}>faster</span>, and{' '}
              <span style={{ color: '#FFFFFF', textDecoration: 'underline', textDecorationColor: BRAND_TOKENS.colors.accentCoral }}>
                humanless.
              </span>
            </MaskedKineticText>
          </h2>

          {/* Mathematical Logo Reveal Lockup */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Logo Emblem Glass Card */}
            <div
              style={{
                position: 'relative',
                marginBottom: '20px',
                padding: '20px',
                borderRadius: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <VistarLogoMark
                size={76}
                color="#FFFFFF"
                centerColor="#FF3823"
                convergence={convergence}
                pulse={pulse}
              />

              {/* Specular Sheen Sweep */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.25) 50%, transparent 60%)',
                  transform: `translateX(${sheenProgress}%)`,
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Brand Title */}
            <h1
              style={{
                fontFamily: BRAND_TOKENS.typography.fontDisplay,
                fontSize: '84px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: '#FFFFFF',
                margin: '0 0 10px 0',
                lineHeight: 1,
              }}
            >
              VISTAR
            </h1>

            {/* Brand Subtitle */}
            <p
              style={{
                fontFamily: BRAND_TOKENS.typography.fontMono,
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                color: BRAND_TOKENS.colors.textSecondary,
                textTransform: 'uppercase',
                margin: '0 0 36px 0',
              }}
            >
              Enterprise Operational Intelligence & Autonomous Systems
            </p>

            {/* Conversion CTA Group */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              <div
                style={{
                  padding: '16px 36px',
                  backgroundColor: BRAND_TOKENS.colors.accentCoral,
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  fontFamily: BRAND_TOKENS.typography.fontBody,
                  fontSize: '15px',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  boxShadow: '0 8px 30px rgba(255, 56, 35, 0.45)',
                }}
              >
                Schedule an Operational Audit &rarr;
              </div>

              <div
                style={{
                  padding: '16px 30px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  borderRadius: '10px',
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
      </CinematicCamera>
    </AbsoluteFill>
  );
};
