import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_TOKENS } from '../constants';

const PHASES = [
  {
    day: 'DAYS 01 - 05',
    title: 'System Architecture & Schema',
    details: 'Database modeling, Next.js 16 core scaffold, WhatsApp webhook architecture & API contracts.',
    status: 'COMPLETED',
  },
  {
    day: 'DAYS 06 - 10',
    title: 'Core Engine Build & Integration',
    details: 'Live staging release, AutoLead qualification engine, CRM synchronization, 3D interactive layers.',
    status: 'ACTIVE BUILD',
  },
  {
    day: 'DAYS 11 - 14',
    title: 'Hardening & Repository Transfer',
    details: 'E2E test suite, load testing, Docker containerization, 100% GitHub IP handover with 30-day warranty.',
    status: 'PRODUCTION READY',
  },
];

export const SceneAssemblyLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Relative frame (0 to 240)
  const relFrame = Math.max(0, frame - 480);

  // Entrance
  const entrance = spring({
    frame: relFrame,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  // Animated progress bar: 0% to 100%
  const progress = interpolate(relFrame, [20, 180], [0, 100], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Exit towards Scene 5
  const exitOpacity = interpolate(relFrame, [225, 240], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bg,
        opacity: exitOpacity,
        transform: `scale(${entrance})`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 100px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 16px',
            borderRadius: '999px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: `1px solid ${BRAND_TOKENS.colors.borderActive}`,
            color: BRAND_TOKENS.colors.accentEmerald,
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '11px',
            letterSpacing: '0.15em',
            marginBottom: '12px',
          }}
        >
          HOW WE BUILD // THE ASSEMBLY LINE
        </div>
        <h2
          style={{
            fontFamily: BRAND_TOKENS.typography.fontSans,
            fontSize: '44px',
            fontWeight: 800,
            margin: 0,
            color: BRAND_TOKENS.colors.textPrimary,
            letterSpacing: '-0.02em',
          }}
        >
          THE 14-DAY PRODUCTION SPRINT
        </h2>
        <p
          style={{
            marginTop: '12px',
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '15px',
            color: BRAND_TOKENS.colors.textSecondary,
          }}
        >
          Direct collaboration with founding engineers. Fixed scope, fixed timeline, zero bloat.
        </p>
      </div>

      {/* 3 Chronological Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          maxWidth: '1300px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {PHASES.map((phase, idx) => {
          const cardSpring = spring({
            frame: relFrame - idx * 15,
            fps,
            config: { damping: 14, stiffness: 90 },
          });

          const isActive = relFrame >= idx * 40;

          return (
            <div
              key={phase.day}
              style={{
                background: 'rgba(13, 14, 21, 0.85)',
                border: `1px solid ${
                  isActive ? BRAND_TOKENS.colors.borderActive : BRAND_TOKENS.colors.border
                }`,
                borderRadius: '16px',
                padding: '28px',
                transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px)`,
                opacity: cardSpring,
                boxShadow: isActive ? '0 12px 32px rgba(16, 185, 129, 0.08)' : 'none',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontFamily: BRAND_TOKENS.typography.fontMono,
                    fontSize: '11px',
                    fontWeight: 700,
                    color: BRAND_TOKENS.colors.accentEmerald,
                    letterSpacing: '0.1em',
                  }}
                >
                  {phase.day}
                </span>
                <span
                  style={{
                    fontFamily: BRAND_TOKENS.typography.fontMono,
                    fontSize: '10px',
                    color: BRAND_TOKENS.colors.textTertiary,
                    border: '1px solid rgba(255,255,255,0.06)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  PHASE 0{idx + 1}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: BRAND_TOKENS.typography.fontSans,
                  fontSize: '18px',
                  fontWeight: 700,
                  color: BRAND_TOKENS.colors.textPrimary,
                  margin: '0 0 10px 0',
                }}
              >
                {phase.title}
              </h3>

              <p
                style={{
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  fontSize: '12px',
                  lineHeight: '1.6',
                  color: BRAND_TOKENS.colors.textSecondary,
                  margin: 0,
                }}
              >
                {phase.details}
              </p>
            </div>
          );
        })}
      </div>

      {/* Global Sprint Progress Meter */}
      <div
        style={{
          maxWidth: '1300px',
          width: '100%',
          margin: '36px auto 0 auto',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: '999px',
          height: '6px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)',
            boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
