import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { BRAND_TOKENS } from '../constants';

export const SceneAssemblyLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Rapid latency collapse
  const latencyMs = Math.floor(
    interpolate(frame, [25, 95], [48000, 144], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // Kinetic sub-words flashing on staccato beats
  let activeWord = 'ZERO QUEUES.';
  if (frame >= 95 && frame < 145) {
    activeWord = 'ZERO HANDOFFS.';
  } else if (frame >= 145) {
    activeWord = 'ZERO HUMAN TOIL.';
  }

  // Camera velocity push
  const cameraZoom = interpolate(frame, [0, 200], [1.0, 1.25], { extrapolateRight: 'clamp' });

  // 6 high-speed vector light beams rushing horizontally across the canvas
  const beamOffsets = [
    (frame * 45) % 1920,
    (frame * 65 + 300) % 1920,
    (frame * 50 + 700) % 1920,
    (frame * 80 + 1100) % 1920,
    (frame * 55 + 1400) % 1920,
    (frame * 70 + 1700) % 1920,
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bgVoid,
        transform: `scale(${cameraZoom})`,
        overflow: 'hidden',
      }}
    >
      <CinematicBackground intensity={1.5} />

      {/* High-Speed Rushing Vector Streaks */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          opacity: 0.8,
        }}
      >
        {[18, 32, 46, 60, 74, 88].map((topPercent, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${topPercent}%`,
              left: 0,
              right: 0,
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: `${beamOffsets[i]}px`,
                top: '-1px',
                width: `${180 + i * 40}px`,
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #FFFFFF, transparent)',
                boxShadow: '0 0 14px #FFFFFF',
              }}
            />
          </div>
        ))}
      </div>

      {/* Central High-Octane Motion Graphics Display */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '16px',
            letterSpacing: '0.45em',
            color: BRAND_TOKENS.colors.titaniumLight,
            marginBottom: '16px',
            textTransform: 'uppercase',
          }}
        >
          [ ACT 04 // OPERATIONAL VELOCITY CRASH ]
        </div>

        {/* Massive 220px Latency Number Display */}
        <div
          style={{
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '220px',
            fontWeight: 900,
            letterSpacing: '-0.06em',
            lineHeight: 0.85,
            color: '#FFFFFF',
            fontVariantNumeric: 'tabular-nums',
            textShadow: '0 0 90px rgba(255, 255, 255, 0.85), 0 0 30px #FFFFFF',
          }}
        >
          {latencyMs > 999 ? `${(latencyMs / 1000).toFixed(1)}s` : `${latencyMs}ms`}
        </div>

        {/* Flashing Kinetic Staccato Word */}
        <div
          style={{
            fontFamily: BRAND_TOKENS.typography.fontDisplay,
            fontSize: '64px',
            fontWeight: 900,
            letterSpacing: '0.12em',
            color: '#FFFFFF',
            marginTop: '36px',
            textTransform: 'uppercase',
            textShadow: '0 0 40px rgba(255, 255, 255, 0.6)',
          }}
        >
          {activeWord}
        </div>

        <div
          style={{
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '14px',
            letterSpacing: '0.3em',
            color: BRAND_TOKENS.colors.titaniumMid,
            marginTop: '18px',
            textTransform: 'uppercase',
          }}
        >
          EXECUTION AT LINE-RATE // 10,000 OPS/SEC
        </div>
      </div>
    </AbsoluteFill>
  );
};
