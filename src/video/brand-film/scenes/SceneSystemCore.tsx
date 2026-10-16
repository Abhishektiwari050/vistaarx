import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { VistarLogoMark } from '../components/VistarLogoMark';
import { SelectionBoundingBox } from '../components/SelectionBoundingBox';
import { GlowingConduitPipe } from '../components/GlowingConduitPipe';
import { BRAND_TOKENS } from '../constants';

export const SceneSystemCore: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 fast-paced kinetic acts:
  // f0 - 50: "WE AUDIT."
  // f50 - 110: 3D Multi-Card Architecture + GlowingConduits ("EVERY PROCESS.")
  // f110 - 180: "DISSECTED INTO CODE." + 3D Orbiting VISTAR Vectors
  const isBeat1 = frame < 50;
  const isBeat2 = frame >= 50 && frame < 110;
  const isBeat3 = frame >= 110;

  // Beat 1: Slam scale & tracking expansion
  const scale1 = interpolate(frame, [0, 16, 50], [2.1, 1.0, 0.98], { extrapolateRight: 'clamp' });
  const tracking1 = interpolate(frame, [0, 45], [-0.08, 0.22], { extrapolateRight: 'clamp' });
  const shake1 = frame < 12 ? Math.sin(frame * 3) * (12 - frame) : 0;

  // Beat 2: 3D Camera drift across the 3 floating cards
  const localF2 = frame - 50;
  const cardScale = interpolate(localF2, [0, 15, 60], [0.95, 1.22, 1.28], { extrapolateRight: 'clamp' });
  const cardTiltX = interpolate(localF2, [0, 60], [16, 8], { extrapolateRight: 'clamp' });
  const cardTiltY = interpolate(localF2, [0, 60], [-12, -4], { extrapolateRight: 'clamp' });

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
          <SelectionBoundingBox label="ACT 02 // REVERSE ENGINEERING" padding="6px 16px" style={{ marginBottom: '24px' }}>
            <span
              style={{
                fontFamily: BRAND_TOKENS.typography.fontMono,
                fontSize: '12px',
                letterSpacing: '0.35em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
              }}
            >
              PROPRIETARY CODE EXTRACTION
            </span>
          </SelectionBoundingBox>
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

      {/* BEAT 2: 3D FLOATING ARCHITECTURAL CARDS + GLOWING CONDUIT (Philipp Baikov Ref 2 Style) */}
      {isBeat2 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1600px',
            zIndex: 10,
          }}
        >
          {/* Top Title Tag */}
          <div
            style={{
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '13px',
              letterSpacing: '0.35em',
              color: BRAND_TOKENS.colors.titaniumLight,
              marginBottom: '40px',
              textTransform: 'uppercase',
            }}
          >
            MAPPING SILOS // STRIPPING BOTTLENECKS // PURGING REDUNDANCY
          </div>

          {/* 3D Tilted Card Container */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              transform: `scale(${cardScale}) rotateX(${cardTiltX}deg) rotateY(${cardTiltY}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Card 1: Data Ingestion */}
            <div
              style={{
                width: '320px',
                padding: '24px',
                backgroundColor: 'rgba(13, 14, 21, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '12px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: '#959CB3', letterSpacing: '0.2em' }}>
                NODE 01
              </div>
              <div style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginTop: '8px' }}>
                Workflow Ingestion
              </div>
              <div style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '12px', color: '#D6DAE8', marginTop: '14px' }}>
                Legacy manual queues: <span style={{ color: '#FF5555' }}>48.0s</span>
              </div>
            </div>

            {/* Connecting Illuminated Conduit Pipe */}
            <div style={{ width: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GlowingConduitPipe width={120} height={40} speed={1.5} />
            </div>

            {/* Card 2: Interactive Bounding Box Node (Selected / Active) */}
            <SelectionBoundingBox label="REVERSE SYNTHESIS" padding="20px 24px">
              <div style={{ width: '320px' }}>
                <div style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: '#959CB3', letterSpacing: '0.2em' }}>
                  NODE 02 // COMPILING
                </div>
                <div style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginTop: '8px' }}>
                  Logic Extraction
                </div>
                <div style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '12px', color: '#FFFFFF', marginTop: '14px' }}>
                  State: <span style={{ color: '#55FF99' }}>● 100% Deterministic</span>
                </div>
              </div>
            </SelectionBoundingBox>

            {/* Connecting Illuminated Conduit Pipe */}
            <div style={{ width: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GlowingConduitPipe width={120} height={40} speed={1.5} />
            </div>

            {/* Card 3: Autonomous Runtime */}
            <div
              style={{
                width: '320px',
                padding: '24px',
                backgroundColor: 'rgba(13, 14, 21, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '12px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: '#959CB3', letterSpacing: '0.2em' }}>
                NODE 03
              </div>
              <div style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginTop: '8px' }}>
                Autonomous Core
              </div>
              <div style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '12px', color: '#D6DAE8', marginTop: '14px' }}>
                Latency: <span style={{ color: '#55FF99' }}>144ms line-rate</span>
              </div>
            </div>
          </div>
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
