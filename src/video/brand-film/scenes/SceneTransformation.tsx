import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { StudioDisplayMockup } from '../components/StudioDisplayMockup';
import { SelectionBoundingBox } from '../components/SelectionBoundingBox';
import { BRAND_TOKENS } from '../constants';

export const SceneTransformation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 distinct staccato kinetic beats (60 frames each = 2.0s per beat)
  const isBeat1 = frame < 55;
  const isBeat2 = frame >= 55 && frame < 125;
  const isBeat3 = frame >= 125;

  // Violent screen-punch on each beat transition
  let punchScale = 1.0;
  let shake = 0;

  if (isBeat1) {
    const localF = frame;
    punchScale = interpolate(localF, [0, 15, 55], [1.35, 1.0, 0.98], { extrapolateRight: 'clamp' });
    if (localF < 12) shake = Math.sin(localF * 3.8) * (12 - localF) * 1.8;
  } else if (isBeat2) {
    const localF = frame - 55;
    punchScale = interpolate(localF, [0, 15, 70], [1.25, 1.0, 0.97], { extrapolateRight: 'clamp' });
    if (localF < 12) shake = Math.sin(localF * 3.8) * (12 - localF) * 1.8;
  } else {
    const localF = frame - 125;
    punchScale = interpolate(localF, [0, 18, 55], [1.45, 1.0, 0.96], { extrapolateRight: 'clamp' });
    if (localF < 16) shake = Math.sin(localF * 4) * (16 - localF) * 2.2;
  }

  // Tracking animation for each beat
  const tracking1 = interpolate(frame, [0, 45], [-0.08, 0.12], { extrapolateRight: 'clamp' });
  const tracking2 = interpolate(frame - 55, [0, 50], [-0.04, 0.08], { extrapolateRight: 'clamp' });
  const tracking3 = interpolate(frame - 125, [0, 45], [-0.07, 0.15], { extrapolateRight: 'clamp' });

  // Curve progress for the Studio Display Mockup in Beat 2
  const localF2 = Math.max(0, frame - 55);
  const curveProg = interpolate(localF2, [0, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3D Perspective Camera Drift for the Hardware Monitor (Reference 1)
  const monitorTiltY = interpolate(localF2, [0, 70], [-10, -3], { extrapolateRight: 'clamp' });
  const monitorTiltX = interpolate(localF2, [0, 70], [12, 6], { extrapolateRight: 'clamp' });
  const monitorScale = interpolate(localF2, [0, 70], [0.88, 1.02], { extrapolateRight: 'clamp' });

  // Laser caliper sweep line on Beat 3
  const laserWidth = interpolate(frame - 125, [4, 35], [0, 1600], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
              fontSize: '15px',
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
              fontSize: '210px',
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

      {/* BEAT 2: 3D STUDIO HARDWARE DISPLAY WITH LIVE CURVE (Direct Reference 1 Style) */}
      {isBeat2 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 72px',
            zIndex: 10,
            perspective: '1400px',
          }}
        >
          {/* Left Side: 3D Studio Display Mockup */}
          <div
            style={{
              transform: `scale(${monitorScale}) rotateY(${monitorTiltY}deg) rotateX(${monitorTiltX}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s ease-out',
            }}
          >
            <StudioDisplayMockup
              width={880}
              height={500}
              curveProgress={curveProg}
            />
          </div>

          {/* Right Side: Floating Kinetic Typographic Stack */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              maxWidth: '820px',
              paddingLeft: '32px',
              transform: 'translateZ(40px)',
            }}
          >
            <SelectionBoundingBox label="AUTONOMOUS RUNTIME" padding="8px 16px" style={{ marginBottom: '24px' }}>
              <span
                style={{
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  fontSize: '12px',
                  letterSpacing: '0.25em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                }}
              >
                ● 14,250 OPS / SEC VERIFIED
              </span>
            </SelectionBoundingBox>

            <h2
              style={{
                fontFamily: BRAND_TOKENS.typography.fontDisplay,
                fontSize: '80px',
                fontWeight: 900,
                letterSpacing: `${tracking2}em`,
                lineHeight: 0.95,
                margin: 0,
                color: '#FFFFFF',
                textShadow: '0 0 60px rgba(255, 255, 255, 0.8)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              AUTONOMOUS.
            </h2>

            <p
              style={{
                fontFamily: BRAND_TOKENS.typography.fontMono,
                fontSize: '15px',
                lineHeight: 1.6,
                letterSpacing: '0.12em',
                color: BRAND_TOKENS.colors.titaniumLight,
                marginTop: '20px',
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0,
                textTransform: 'uppercase',
              }}
            >
              SELF-HEALING ARCHITECTURE RESOLVING ENTERPRISE WORKFLOWS WITHOUT HUMAN INTERVENTION.
            </p>
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

