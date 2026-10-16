import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { VistarLogoMark } from '../components/VistarLogoMark';
import { BRAND_TOKENS } from '../constants';

export const SceneSovereignHandover: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Violent kinetic collision of 4 vectors from offscreen
  // They start off-screen and slam together at frame 35
  const collisionProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.8 },
  });

  // Clamped 0 to 1
  const convergence = Math.min(1, Math.max(0, collisionProgress));

  // Impact frame shake at moment of collision (around frame 30-45)
  let collisionShake = 0;
  if (frame >= 28 && frame < 44) {
    const localF = frame - 28;
    collisionShake = Math.sin(localF * 3.5) * (16 - localF) * 1.8;
  }

  // Impact white flash ring
  const impactFlash = interpolate(frame, [30, 34, 45], [0, 0.9, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Expanding shockwave ring
  const ringScale = interpolate(frame, [32, 70], [0.2, 5.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ringOpacity = interpolate(frame, [32, 45, 70], [0, 0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Camera slow pull-back for sovereign majesty
  const cameraScale = interpolate(frame, [35, 180], [1.18, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Wordmark tracking expansion
  const tracking = interpolate(frame, [35, 120], [0.08, 0.32], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const wordmarkOpacity = interpolate(frame, [32, 50], [0, 1], { extrapolateLeft: 'clamp' });

  // Outward displacement of the 4 vectors before collision
  // At convergence = 0, offset is 260px (off the central emblem area)
  const offset = (1 - convergence) * 260;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bgVoid,
        overflow: 'hidden',
        transform: `scale(${cameraScale}) translate(${collisionShake}px, ${collisionShake * 0.5}px)`,
      }}
    >
      <CinematicBackground intensity={1.8} />

      {/* Collision Shockwave Ring */}
      {ringOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '42%',
            left: '50%',
            width: '300px',
            height: '300px',
            transform: `translate(-50%, -50%) scale(${ringScale})`,
            borderRadius: '50%',
            border: '2px solid #FFFFFF',
            boxShadow: '0 0 50px #FFFFFF',
            opacity: ringOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Central Sovereign Logo & Wordmark Lockup */}
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
        {/* Kinetic 4-Vector Collision Emblem */}
        <div
          style={{
            marginBottom: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <VistarLogoMark
            size={220}
            convergence={convergence}
            strokeWidth={1}
          />
        </div>

        {/* Wordmark Expanding In */}
        <h1
          style={{
            fontFamily: BRAND_TOKENS.typography.fontDisplay,
            fontSize: '120px',
            fontWeight: 900,
            letterSpacing: `${tracking}em`,
            lineHeight: 1,
            margin: 0,
            opacity: wordmarkOpacity,
            background: BRAND_TOKENS.colors.gradients.chromeText,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 50px rgba(255, 255, 255, 0.5))',
            textTransform: 'uppercase',
          }}
        >
          VISTAR
        </h1>

        {/* Brand Mission Tagline */}
        <div
          style={{
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.4em',
            color: BRAND_TOKENS.colors.titaniumLight,
            marginTop: '22px',
            opacity: wordmarkOpacity,
            textTransform: 'uppercase',
          }}
        >
          ENTERPRISE OPERATIONAL INTELLIGENCE // AUTONOMOUS SYSTEMS
        </div>

        {/* Sovereign Domain Reveal */}
        <div
          style={{
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '0.3em',
            color: '#FFFFFF',
            marginTop: '40px',
            opacity: wordmarkOpacity,
            textShadow: '0 0 20px #FFFFFF',
          }}
        >
          VISTAR.TECH
        </div>
      </div>

      {/* Collision Impact White Screen Flash */}
      {impactFlash > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#FFFFFF',
            opacity: impactFlash,
            zIndex: 999,
            pointerEvents: 'none',
          }}
        />
      )}
    </AbsoluteFill>
  );
};
