import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { MaskedKineticText } from '../components/MaskedKineticText';
import { BRAND_TOKENS } from '../constants';

export const SceneTransformation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 distinct musical beat hits:
  // Beat 1: Frames 0 - 45 ("INSTANT.")
  // Beat 2: Frames 45 - 90 ("AUTONOMOUS.")
  // Beat 3: Frames 90 - 140 ("HUMANLESS.")
  const isBeat1 = frame < 45;
  const isBeat2 = frame >= 45 && frame < 90;
  const isBeat3 = frame >= 90;

  // Micro screen-shake impact on each beat
  let shake = 0;
  if (frame < 8) shake = Math.sin(frame * 2) * (8 - frame);
  else if (frame >= 45 && frame < 53) shake = Math.sin((frame - 45) * 2) * (53 - frame);
  else if (frame >= 90 && frame < 98) shake = Math.sin((frame - 90) * 2) * (98 - frame);

  // Dynamic scale punch on each beat
  let scale = 1.0;
  if (isBeat1) {
    scale = interpolate(frame, [0, 45], [1.12, 1.0], { extrapolateRight: 'clamp' });
  } else if (isBeat2) {
    scale = interpolate(frame, [45, 90], [1.15, 1.0], { extrapolateRight: 'clamp' });
  } else {
    scale = interpolate(frame, [90, 140], [1.18, 1.02], { extrapolateRight: 'clamp' });
  }

  // Laser line sweep on beat 3
  const laserProgress = interpolate(frame, [95, 135], [0, 100], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const exitOpacity = interpolate(frame, [128, 140], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#05060A',
        opacity: exitOpacity,
        transform: `scale(${scale}) translate(${shake}px, ${shake * 0.5}px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <CinematicBackground accent={isBeat3 ? 'coral' : isBeat2 ? 'indigo' : 'amber'} />

      {/* Full-Bleed Kinetic Word Displays */}
      <div
        style={{
          width: '100%',
          maxWidth: '1400px',
          textAlign: 'center',
          zIndex: 10,
          padding: '0 40px',
        }}
      >
        {isBeat1 && (
          <div>
            <div
              style={{
                fontFamily: BRAND_TOKENS.typography.fontMono,
                fontSize: '14px',
                letterSpacing: '0.25em',
                color: BRAND_TOKENS.colors.accentAmber,
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}
            >
              01 // SUB-200MS EDGE EXECUTION
            </div>
            <h1
              style={{
                fontFamily: BRAND_TOKENS.typography.fontDisplay,
                fontSize: '140px',
                fontWeight: 800,
                letterSpacing: '-0.05em',
                color: '#FFFFFF',
                lineHeight: 0.95,
                margin: 0,
                textShadow: '0 0 80px rgba(245, 158, 11, 0.4)',
              }}
            >
              INSTANT.
            </h1>
            <p
              style={{
                fontFamily: BRAND_TOKENS.typography.fontBody,
                fontSize: '24px',
                color: BRAND_TOKENS.colors.textSecondary,
                marginTop: '20px',
              }}
            >
              Zero human waiting queues. Customers served in real-time.
            </p>
          </div>
        )}

        {isBeat2 && (
          <div>
            <div
              style={{
                fontFamily: BRAND_TOKENS.typography.fontMono,
                fontSize: '14px',
                letterSpacing: '0.25em',
                color: BRAND_TOKENS.colors.accentIndigo,
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}
            >
              02 // SELF-HEALING ARCHITECTURE
            </div>
            <h1
              style={{
                fontFamily: BRAND_TOKENS.typography.fontDisplay,
                fontSize: '140px',
                fontWeight: 800,
                letterSpacing: '-0.05em',
                color: '#FFFFFF',
                lineHeight: 0.95,
                margin: 0,
                textShadow: '0 0 80px rgba(99, 102, 241, 0.4)',
              }}
            >
              AUTONOMOUS.
            </h1>
            <p
              style={{
                fontFamily: BRAND_TOKENS.typography.fontBody,
                fontSize: '24px',
                color: BRAND_TOKENS.colors.textSecondary,
                marginTop: '20px',
              }}
            >
              Systems that diagnose, validate, and execute operations on their own.
            </p>
          </div>
        )}

        {isBeat3 && (
          <div>
            <div
              style={{
                fontFamily: BRAND_TOKENS.typography.fontMono,
                fontSize: '14px',
                letterSpacing: '0.25em',
                color: BRAND_TOKENS.colors.accentCoral,
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}
            >
              03 // THE ULTIMATE SHIFT
            </div>
            <h1
              style={{
                fontFamily: BRAND_TOKENS.typography.fontDisplay,
                fontSize: '140px',
                fontWeight: 800,
                letterSpacing: '-0.05em',
                color: BRAND_TOKENS.colors.accentCoral,
                lineHeight: 0.95,
                margin: 0,
                textShadow: '0 0 90px rgba(255, 56, 35, 0.6)',
              }}
            >
              HUMANLESS.
            </h1>
            <p
              style={{
                fontFamily: BRAND_TOKENS.typography.fontBody,
                fontSize: '24px',
                color: '#FFFFFF',
                marginTop: '20px',
              }}
            >
              10x scale without expanding headcount.
            </p>

            {/* Precision Laser Line Sweep */}
            <div
              style={{
                width: '600px',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                margin: '28px auto 0 auto',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '999px',
              }}
            >
              <div
                style={{
                  width: `${laserProgress}%`,
                  height: '100%',
                  backgroundColor: BRAND_TOKENS.colors.accentCoral,
                  boxShadow: '0 0 14px rgba(255, 56, 35, 0.9)',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
