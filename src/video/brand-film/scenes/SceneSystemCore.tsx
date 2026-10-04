import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { VistarLogoMark } from '../components/VistarLogoMark';
import { BRAND_TOKENS } from '../constants';

export const SceneSystemCore: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 fast-paced kinetic acts:
  // f0 - 55: "WE AUDIT."
  // f55 - 110: "EVERY PROCESS."
  // f110 - 180: "DISSECTED INTO CODE." + 3D Orbiting VISTAR Vectors
  const isBeat1 = frame < 55;
  const isBeat2 = frame >= 55 && frame < 110;
  const isBeat3 = frame >= 110;

  // Beat 1: Slam scale & tracking expansion
  const scale1 = interpolate(frame, [0, 16, 55], [2.1, 1.0, 0.98], { extrapolateRight: 'clamp' });
  const tracking1 = interpolate(frame, [0, 50], [-0.08, 0.22], { extrapolateRight: 'clamp' });
  const shake1 = frame < 12 ? Math.sin(frame * 3) * (12 - frame) : 0;

  // Beat 2: Angled dynamic push
  const localF2 = frame - 55;
  const scale2 = interpolate(localF2, [0, 15, 55], [1.9, 1.0, 0.98], { extrapolateRight: 'clamp' });
  const tracking2 = interpolate(localF2, [0, 50], [-0.06, 0.14], { extrapolateRight: 'clamp' });
  const shake2 = localF2 < 12 ? Math.sin(localF2 * 3) * (12 - localF2) : 0;

  // Beat 3: Vector Dissection in 3D Space
  const localF3 = frame - 110;
  const compassAngle = localF3 * 1.5;
  const convergence = interpolate(localF3, [0, 60], [0.1, 0.8], { extrapolateRight: 'clamp' });
  const logoScale = interpolate(localF3, [0, 20, 70], [0.6, 1.1, 1.0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bgVoid,
        overflow: 'hidden',
      }}
    >
      <CinematicBackground intensity={1.5} />

      {/* BEAT 1: "WE AUDIT." */}
      {isBeat1 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${scale1}) translate(${shake1}px, ${shake1 * 0.5}px)`,
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '14px',
              letterSpacing: '0.45em',
              color: BRAND_TOKENS.colors.titaniumMid,
              marginBottom: '20px',
              textTransform: 'uppercase',
            }}
          >
            [ ACT 02 // REVERSE ENGINEERING THE ENTERPRISE ]
          </div>
          <h1
            style={{
              fontFamily: BRAND_TOKENS.typography.fontDisplay,
              fontSize: '200px',
              fontWeight: 900,
              letterSpacing: `${tracking1}em`,
              lineHeight: 0.85,
              margin: 0,
              background: BRAND_TOKENS.colors.gradients.chromeText,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 70px rgba(255, 255, 255, 0.5))',
              textTransform: 'uppercase',
            }}
          >
            WE AUDIT.
          </h1>
        </div>
      )}

      {/* BEAT 2: "EVERY PROCESS." */}
      {isBeat2 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${scale2}) translate(${shake2}px, ${shake2 * 0.5}px) rotate(-3deg)`,
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '13px',
              letterSpacing: '0.35em',
              color: BRAND_TOKENS.colors.titaniumLight,
              marginBottom: '18px',
            }}
          >
            MAPPING SILOS // STRIPPING BOTTLENECKS // PURGING REDUNDANCY
          </div>
          <h1
            style={{
              fontFamily: BRAND_TOKENS.typography.fontDisplay,
              fontSize: '175px',
              fontWeight: 900,
              letterSpacing: `${tracking2}em`,
              lineHeight: 0.9,
              margin: 0,
              color: '#FFFFFF',
              textShadow: '0 0 90px rgba(255, 255, 255, 0.8)',
              textTransform: 'uppercase',
            }}
          >
            EVERY
            <br />
            PROCESS.
          </h1>
        </div>
      )}

      {/* BEAT 3: "DISSECTED INTO CODE." + Converging 3D VISTAR Cardinal Vectors */}
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
          {/* Radial Caliper Reticle Ring */}
          <div
            style={{
              position: 'absolute',
              width: '560px',
              height: '560px',
              transform: `rotate(${compassAngle}deg)`,
              pointerEvents: 'none',
              opacity: 0.35,
            }}
          >
            <svg width="560" height="560">
              <circle cx="280" cy="280" r="260" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="8 12" />
              <circle cx="280" cy="280" r="180" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4 8" />
              <line x1="280" y1="10" x2="280" y2="40" stroke="#FFFFFF" strokeWidth="3" />
              <line x1="280" y1="520" x2="280" y2="550" stroke="#FFFFFF" strokeWidth="3" />
              <line x1="10" y1="280" x2="40" y2="280" stroke="#FFFFFF" strokeWidth="3" />
              <line x1="520" y1="280" x2="550" y2="280" stroke="#FFFFFF" strokeWidth="3" />
            </svg>
          </div>

          {/* Converging VISTAR Geometry */}
          <div
            style={{
              transform: `scale(${logoScale})`,
              marginBottom: '36px',
            }}
          >
            <VistarLogoMark
              size={240}
              convergence={convergence}
              wireframe={false}
              strokeWidth={1.5}
            />
          </div>

          <h2
            style={{
              fontFamily: BRAND_TOKENS.typography.fontDisplay,
              fontSize: '68px',
              fontWeight: 900,
              letterSpacing: '0.12em',
              margin: 0,
              color: '#FFFFFF',
              textShadow: '0 0 40px rgba(255, 255, 255, 0.6)',
              textTransform: 'uppercase',
            }}
          >
            DISSECTED INTO CODE.
          </h2>

          <div
            style={{
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '13px',
              letterSpacing: '0.3em',
              color: BRAND_TOKENS.colors.titaniumLight,
              marginTop: '16px',
            }}
          >
            AUTONOMOUS ARCHITECTURE // COMPILING RUNTIME
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
