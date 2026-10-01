import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_TOKENS } from '../constants';

const METHOD_STAGES = [
  {
    step: 'STAGE 01',
    title: 'Operational Deep-Dive & Friction Mapping',
    details: 'We audit how your company functions: uncovering hidden data choke points, manual toil, and where employees spend hours on mechanical tasks.',
    status: 'AUDIT COMPLETE',
  },
  {
    step: 'STAGE 02',
    title: 'Autonomous System & AI Synthesis',
    details: 'We engineer custom automations, intelligent AI workers, and high-speed software pipelines that execute routine workflows without human delays.',
    status: 'SYSTEM DEPLOYED',
  },
  {
    step: 'STAGE 03',
    title: 'Humanless Velocity & Complete Sovereignty',
    details: 'Your enterprise operates 10x faster and easier. You receive 100% source code ownership, private deployment, and total operational autonomy.',
    status: 'OPERATIONAL SOVEREIGNTY',
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
          THE VISTAR METHOD // HOW WE OPERATE
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
          RE-ENGINEERING ENTERPRISES FOR HUMANLESS SCALE
        </h2>
        <p
          style={{
            marginTop: '12px',
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '15px',
            color: BRAND_TOKENS.colors.textSecondary,
          }}
        >
          We audit your operations. We build the automations. Software does the work.
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
        {METHOD_STAGES.map((stage, idx) => {
          const cardSpring = spring({
            frame: relFrame - idx * 15,
            fps,
            config: { damping: 14, stiffness: 90 },
          });

          const isActive = relFrame >= idx * 40;

          return (
            <div
              key={stage.step}
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
                  {stage.step}
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
                  {stage.status}
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
                {stage.title}
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
                {stage.details}
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
