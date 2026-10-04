import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { BRAND_TOKENS } from '../constants';

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sub-beat 1: Frames 0 - 50 ("ENTERPRISE")
  // Sub-beat 2: Frames 50 - 105 ("DROWNING IN TOIL")
  // Sub-beat 3: Frames 105 - 160 (Violent Oscilloscope -> Razor Laser Snap)
  const isBeat1 = frame < 50;
  const isBeat2 = frame >= 50 && frame < 105;
  const isBeat3 = frame >= 105;

  // Beat 1: Slam zoom from 2.4x down to 1.0x with impact shake
  const scale1 = interpolate(frame, [0, 18, 50], [2.4, 1.0, 0.96], {
    extrapolateRight: 'clamp',
  });
  const shake1 = frame < 16 ? Math.sin(frame * 3.5) * (16 - frame) * 1.5 : 0;
  const tracking1 = interpolate(frame, [0, 45], [-0.08, 0.04], { extrapolateRight: 'clamp' });

  // Beat 2: Slam zoom and skew punch
  const localF2 = frame - 50;
  const scale2 = interpolate(localF2, [0, 16, 55], [1.8, 1.0, 0.98], {
    extrapolateRight: 'clamp',
  });
  const shake2 = localF2 < 14 ? Math.sin(localF2 * 3.5) * (14 - localF2) * 1.8 : 0;
  const tracking2 = interpolate(localF2, [0, 50], [-0.05, 0.02], { extrapolateRight: 'clamp' });

  // Beat 3: Chaotic Oscilloscope into Laser Caliper Snap
  const localF3 = frame - 105;
  const pointsCount = 64;
  const wavePoints: string[] = [];
  const waveWidth = 1600;
  const waveHeight = 220;

  // Chaos damping down as caliper locks it at frame 135
  const chaosDamp = interpolate(localF3, [0, 30, 45], [1.0, 0.8, 0.0], {
    extrapolateRight: 'clamp',
  });

  for (let i = 0; i <= pointsCount; i++) {
    const x = (i / pointsCount) * waveWidth;
    const noise =
      (Math.sin(i * 0.5 + frame * 0.45) * 60 +
        Math.cos(i * 1.1 - frame * 0.3) * 40 +
        Math.sin(i * 2.2 + frame * 0.6) * 20) *
      chaosDamp;
    const y = waveHeight / 2 + noise;
    wavePoints.push(`${x},${y}`);
  }
  const wavePath = `M ${wavePoints.join(' L ')}`;

  // Laser Caliper Clamp position
  const caliperScan = interpolate(localF3, [10, 35], [-200, 1800], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // End of Act 1: Blinding impact flash
  const exitFlash = interpolate(frame, [150, 158, 160], [0, 0.95, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bgVoid,
        overflow: 'hidden',
      }}
    >
      <CinematicBackground intensity={1.4} />

      {/* BEAT 1: "ENTERPRISE" (Aggressive Scale Slam) */}
      {isBeat1 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${scale1}) translate(${shake1}px, ${shake1 * 0.6}px)`,
            zIndex: 10,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '18%',
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '14px',
              letterSpacing: '0.4em',
              color: BRAND_TOKENS.colors.titaniumMid,
              textTransform: 'uppercase',
            }}
          >
            [ ACT 01 // CRITICAL FRICTION ]
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
              filter: 'drop-shadow(0 0 60px rgba(255, 255, 255, 0.4))',
              textTransform: 'uppercase',
            }}
          >
            ENTERPRISE
          </h1>
        </div>
      )}

      {/* BEAT 2: "DROWNING IN TOIL" (Skewed High-Impact Typography) */}
      {isBeat2 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${scale2}) translate(${shake2}px, ${shake2 * 0.5}px) skewX(-5deg)`,
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '13px',
              letterSpacing: '0.35em',
              color: BRAND_TOKENS.colors.titaniumLight,
              marginBottom: '16px',
            }}
          >
            FRAGMENTED TOOLS // MANUAL COORDINATION // 94% STALL
          </div>
          <h1
            style={{
              fontFamily: BRAND_TOKENS.typography.fontDisplay,
              fontSize: '170px',
              fontWeight: 900,
              letterSpacing: `${tracking2}em`,
              lineHeight: 0.9,
              margin: 0,
              color: '#FFFFFF',
              textShadow: '0 0 80px rgba(255, 255, 255, 0.75), 0 0 20px rgba(214, 218, 232, 0.9)',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            DROWNING
            <br />
            IN TOIL.
          </h1>
        </div>
      )}

      {/* BEAT 3: Dynamic Oscilloscope Waveform Clamped to Zero Line */}
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
              letterSpacing: '0.3em',
              color: BRAND_TOKENS.colors.platinumPure,
              marginBottom: '36px',
              textTransform: 'uppercase',
            }}
          >
            {chaosDamp > 0.1 ? 'CALIPER SCAN: MEASURING OPERATIONAL CHAOS' : 'CHAOS CLAMPED // CONVERGING INTO CODE'}
          </div>

          <div
            style={{
              position: 'relative',
              width: `${waveWidth}px`,
              height: `${waveHeight}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Center Razor Axis */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #FFFFFF, transparent)',
                boxShadow: '0 0 15px #FFFFFF',
              }}
            />

            <svg
              width={waveWidth}
              height={waveHeight}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'visible',
              }}
            >
              <path
                d={wavePath}
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="6"
                filter="drop-shadow(0 0 12px #FFFFFF)"
              />
              <path
                d={wavePath}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />

              {/* Sweeping Caliper Beam */}
              <line
                x1={caliperScan}
                y1="-40"
                x2={caliperScan}
                y2={waveHeight + 40}
                stroke="#FFFFFF"
                strokeWidth="3"
                opacity="0.9"
                filter="drop-shadow(0 0 8px #FFFFFF)"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Impact White Transition Flash */}
      {exitFlash > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#FFFFFF',
            opacity: exitFlash,
            zIndex: 999,
            pointerEvents: 'none',
          }}
        />
      )}
    </AbsoluteFill>
  );
};
