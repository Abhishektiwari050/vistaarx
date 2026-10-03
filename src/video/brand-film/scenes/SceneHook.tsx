import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { CinematicCamera } from '../components/CinematicCamera';
import { MaskedKineticText } from '../components/MaskedKineticText';
import { BRAND_TOKENS } from '../constants';

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Active terminal prompt typing
  const fullCommand = 'npx vistar-audit --target=enterprise --locate-human-friction';
  const charsShown = Math.floor(
    interpolate(frame, [38, 95], [0, fullCommand.length], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    })
  );
  const typedCommand = fullCommand.slice(0, charsShown);
  const cursorBlink = Math.sin(frame * 0.4) > 0;

  // Expanding transition ring at end of scene
  const ringScale = interpolate(frame, [110, 140], [0, 4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ringOpacity = interpolate(frame, [110, 125, 140], [0, 0.9, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exitOpacity = interpolate(frame, [125, 140], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bg,
        opacity: exitOpacity,
        overflow: 'hidden',
      }}
    >
      <CinematicCamera durationInFrames={140} startScale={1.1} endScale={1.0} tiltX={3} panY={-10}>
        <CinematicBackground accent="coral" />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 120px',
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          {/* Status Badge Pop */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '999px',
              marginBottom: '32px',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: BRAND_TOKENS.colors.accentCoral,
                boxShadow: '0 0 8px rgba(255, 56, 35, 0.8)',
              }}
            />
            <span
              style={{
                fontFamily: BRAND_TOKENS.typography.fontMono,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                color: BRAND_TOKENS.colors.textSecondary,
                textTransform: 'uppercase',
              }}
            >
              The Operational Reality // Genesis
            </span>
          </div>

          {/* Masked Hero Typography */}
          <div style={{ marginBottom: '24px' }}>
            <h1
              style={{
                fontFamily: BRAND_TOKENS.typography.fontDisplay,
                fontSize: '84px',
                lineHeight: 1.05,
                fontWeight: 600,
                letterSpacing: '-0.04em',
                color: BRAND_TOKENS.colors.textPrimary,
                margin: 0,
              }}
            >
              <MaskedKineticText delay={5}>
                Most enterprises run on
              </MaskedKineticText>
              <br />
              <MaskedKineticText delay={15}>
                <span
                  style={{
                    color: BRAND_TOKENS.colors.accentCoral,
                    textShadow: '0 0 40px rgba(255, 56, 35, 0.4)',
                  }}
                >
                  HUMAN GLUE.
                </span>
              </MaskedKineticText>
            </h1>
          </div>

          {/* Masked Subtitle */}
          <div style={{ maxWidth: '780px', marginBottom: '44px' }}>
            <p
              style={{
                fontFamily: BRAND_TOKENS.typography.fontBody,
                fontSize: '22px',
                lineHeight: 1.5,
                color: BRAND_TOKENS.colors.textSecondary,
                margin: 0,
              }}
            >
              <MaskedKineticText delay={24}>
                Valuable minds trapped in manual spreadsheet entry, fragmented tools, and slow coordination.
              </MaskedKineticText>
            </p>
          </div>

          {/* Living Interactive Terminal Prompt */}
          <div
            style={{
              width: '100%',
              maxWidth: '820px',
              backgroundColor: 'rgba(10, 12, 18, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '14px',
              padding: '16px 24px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              textAlign: 'left',
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '15px',
            }}
          >
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
            </div>
            <span style={{ color: BRAND_TOKENS.colors.accentCoral, fontWeight: 700 }}>&gt;</span>
            <span style={{ color: '#FFFFFF', flex: 1, letterSpacing: '0.02em' }}>
              {typedCommand}
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '16px',
                  backgroundColor: BRAND_TOKENS.colors.accentCoral,
                  marginLeft: '4px',
                  verticalAlign: 'middle',
                  opacity: cursorBlink ? 1 : 0,
                }}
              />
            </span>
            <span
              style={{
                fontSize: '11px',
                color: BRAND_TOKENS.colors.textTertiary,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '4px 10px',
                borderRadius: '6px',
              }}
            >
              RETURN ↵
            </span>
          </div>
        </div>

        {/* Transition Detonation Ring */}
        {ringOpacity > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              border: `2px solid ${BRAND_TOKENS.colors.accentCoral}`,
              boxShadow: `0 0 80px ${BRAND_TOKENS.colors.accentCoralGlow}`,
              transform: `translate(-50%, -50%) scale(${ringScale})`,
              opacity: ringOpacity,
              pointerEvents: 'none',
            }}
          />
        )}
      </CinematicCamera>
    </AbsoluteFill>
  );
};
