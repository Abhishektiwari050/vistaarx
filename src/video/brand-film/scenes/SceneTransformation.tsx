import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { BRAND_TOKENS } from '../constants';

export const SceneTransformation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 distinct staccato kinetic beats (60 frames each = 2.0s per beat)
  const isBeat1 = frame < 60;
  const isBeat2 = frame >= 60 && frame < 120;
  const isBeat3 = frame >= 120;

  // Violent screen-punch on each beat transition
  let punchScale = 1.0;
  let shake = 0;

  if (isBeat1) {
    const localF = frame;
    punchScale = interpolate(localF, [0, 15, 60], [1.35, 1.0, 0.96], { extrapolateRight: 'clamp' });
    if (localF < 12) shake = Math.sin(localF * 3.8) * (12 - localF) * 2;
  } else if (isBeat2) {
    const localF = frame - 60;
    punchScale = interpolate(localF, [0, 15, 60], [1.4, 1.0, 0.96], { extrapolateRight: 'clamp' });
    if (localF < 12) shake = Math.sin(localF * 3.8) * (12 - localF) * 2;
  } else {
    const localF = frame - 120;
    punchScale = interpolate(localF, [0, 18, 60], [1.5, 1.0, 0.95], { extrapolateRight: 'clamp' });
    if (localF < 16) shake = Math.sin(localF * 4) * (16 - localF) * 2.4;
  }

  // Laser caliper sweep line on Beat 3
  const laserWidth = interpolate(frame - 120, [4, 40], [0, 1600], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tracking animation for each beat
  const tracking1 = interpolate(frame, [0, 50], [-0.08, 0.12], { extrapolateRight: 'clamp' });
  const tracking2 = interpolate(frame - 60, [0, 50], [-0.06, 0.1], { extrapolateRight: 'clamp' });
  const tracking3 = interpolate(frame - 120, [0, 50], [-0.07, 0.15], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bgVoid,
        transform: `scale(${punchScale}) translate(${shake}px, ${shake * 0.5}px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <CinematicBackground intensity={isBeat3 ? 1.6 : 1.2} />

      {/* BEAT 1: "INSTANT." (Screen-Filling Kinetic Typography) */}
      {isBeat1 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '16px',
              letterSpacing: '0.45em',
              color: BRAND_TOKENS.colors.titaniumLight,
              marginBottom: '20px',
              textTransform: 'uppercase',
            }}
          >
            [ 01 // ZERO LATENCY EXECUTION ]
          </div>
          <h1
            style={{
              fontFamily: BRAND_TOKENS.typography.fontDisplay,
              fontSize: '220px',
              fontWeight: 900,
              letterSpacing: `${tracking1}em`,
              lineHeight: 0.85,
              margin: 0,
              background: BRAND_TOKENS.colors.gradients.chromeText,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 80px rgba(255, 255, 255, 0.5))',
              textTransform: 'uppercase',
            }}
          >
            INSTANT.
          </h1>
          <div
            style={{
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '14px',
              letterSpacing: '0.3em',
              color: BRAND_TOKENS.colors.titaniumMid,
              marginTop: '28px',
              textTransform: 'uppercase',
            }}
          >
            LINE-RATE SPEED // ZERO HUMAN QUEUES
          </div>
        </div>
      )}

      {/* BEAT 2: "AUTONOMOUS." (3D Angled Kinetic Typography) */}
      {isBeat2 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'skewX(-6deg) rotate(-2deg)',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '16px',
              letterSpacing: '0.45em',
              color: BRAND_TOKENS.colors.titaniumLight,
              marginBottom: '20px',
              textTransform: 'uppercase',
            }}
          >
            [ 02 // SELF-HEALING RUNTIME ]
          </div>
          <h1
            style={{
              fontFamily: BRAND_TOKENS.typography.fontDisplay,
              fontSize: '190px',
              fontWeight: 900,
              letterSpacing: `${tracking2}em`,
              lineHeight: 0.85,
              margin: 0,
              color: '#FFFFFF',
              textShadow: '0 0 90px rgba(255, 255, 255, 0.8), 0 0 30px rgba(214, 218, 232, 0.9)',
              textTransform: 'uppercase',
            }}
          >
            AUTONOMOUS.
          </h1>
          <div
            style={{
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '14px',
              letterSpacing: '0.3em',
              color: BRAND_TOKENS.colors.titaniumMid,
              marginTop: '28px',
              textTransform: 'uppercase',
            }}
          >
            RESOLVING WORKFLOWS WITHOUT HUMAN INTERVENTION
          </div>
        </div>
      )}

      {/* BEAT 3: "HUMANLESS." (Maximum Impact Full-Screen Slam) */}
      {isBeat3 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '16px',
              letterSpacing: '0.45em',
              color: BRAND_TOKENS.colors.platinumLiquid,
              marginBottom: '20px',
              textTransform: 'uppercase',
            }}
          >
            [ 03 // THE ULTIMATE OBJECTIVE ]
          </div>
          <h1
            style={{
              fontFamily: BRAND_TOKENS.typography.fontDisplay,
              fontSize: '210px',
              fontWeight: 900,
              letterSpacing: `${tracking3}em`,
              lineHeight: 0.85,
              margin: 0,
              color: '#FFFFFF',
              textShadow: '0 0 100px rgba(255, 255, 255, 0.95), 0 0 40px rgba(255, 255, 255, 0.8)',
              textTransform: 'uppercase',
            }}
          >
            HUMANLESS.
          </h1>
          <div
            style={{
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '15px',
              letterSpacing: '0.3em',
              color: BRAND_TOKENS.colors.platinumLiquid,
              marginTop: '28px',
              textTransform: 'uppercase',
            }}
          >
            10X SCALE // ZERO EXTRA HEADCOUNT
          </div>

          {/* Full-width laser slice */}
          <div
            style={{
              width: `${laserWidth}px`,
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #FFFFFF, transparent)',
              boxShadow: '0 0 20px #FFFFFF',
              marginTop: '36px',
            }}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
