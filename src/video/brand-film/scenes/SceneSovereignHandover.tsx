import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
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
            width: '180px',
            height: '180px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '44px',
          }}
        >
          <svg
            width="180"
            height="180"
            viewBox="0 0 100 100"
            fill="none"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="vistarSovereignChrome" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#D6DAE8" />
                <stop offset="100%" stopColor="#959CB3" />
              </linearGradient>
            </defs>

            {/* Central Pure White Core (ignites on impact) */}
            <rect
              x="34"
              y="34"
              width="32"
              height="32"
              fill="#FFFFFF"
              stroke="#FFFFFF"
              strokeWidth="0.5"
              style={{
                opacity: convergence,
                transform: `scale(${0.2 + convergence * 0.8})`,
                transformOrigin: '50px 50px',
                filter: convergence > 0.85 ? 'drop-shadow(0 0 25px #FFFFFF)' : 'none',
              }}
            />

            {/* Top Triangle (dives down) */}
            <polygon
              points="50,2 66,34 34,34"
              fill="url(#vistarSovereignChrome)"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              style={{
                transform: `translateY(${-offset}px)`,
                transformOrigin: '50px 18px',
                filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.4))',
              }}
            />

            {/* Right Triangle (shoots left) */}
            <polygon
              points="98,50 66,66 66,34"
              fill="url(#vistarSovereignChrome)"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              style={{
                transform: `translateX(${offset}px)`,
                transformOrigin: '82px 50px',
                filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.4))',
              }}
            />

            {/* Bottom Triangle (shoots up) */}
            <polygon
              points="50,98 34,66 66,66"
              fill="url(#vistarSovereignChrome)"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              style={{
                transform: `translateY(${offset}px)`,
                transformOrigin: '50px 82px',
                filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.4))',
              }}
            />

            {/* Left Triangle (shoots right) */}
            <polygon
              points="2,50 34,34 34,66"
              fill="url(#vistarSovereignChrome)"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              style={{
                transform: `translateX(${-offset}px)`,
                transformOrigin: '18px 50px',
                filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.4))',
              }}
            />
          </svg>
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
