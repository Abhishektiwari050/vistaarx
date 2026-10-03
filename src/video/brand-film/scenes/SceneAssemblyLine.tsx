import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { BRAND_TOKENS } from '../constants';

export const SceneAssemblyLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance springs
  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  const card1Entrance = spring({
    frame: frame - 12,
    fps,
    config: { damping: 16, stiffness: 85 },
  });

  const card2Entrance = spring({
    frame: frame - 22,
    fps,
    config: { damping: 16, stiffness: 85 },
  });

  const card3Entrance = spring({
    frame: frame - 32,
    fps,
    config: { damping: 16, stiffness: 85 },
  });

  // Camera drift
  const scale = interpolate(frame, [0, 190], [0.985, 1.025], { extrapolateRight: 'clamp' });
  const exitOpacity = interpolate(frame, [175, 190], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bg,
        opacity: exitOpacity,
        transform: `scale(${scale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 100px',
        overflow: 'hidden',
      }}
    >
      <CinematicBackground tint="warm" />

      <div
        style={{
          width: '100%',
          maxWidth: '1360px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            opacity: interpolate(headerEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerEntrance, [0, 1], [15, 0])}px)`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '999px',
            marginBottom: '20px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: BRAND_TOKENS.colors.accentCoral,
            }}
          />
          <span
            style={{
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: BRAND_TOKENS.colors.textSecondary,
              textTransform: 'uppercase',
            }}
          >
            Step 03 // Three Operational Pillars
          </span>
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: BRAND_TOKENS.typography.fontDisplay,
            fontSize: '66px',
            lineHeight: 1.08,
            fontWeight: 500,
            letterSpacing: '-0.035em',
            color: BRAND_TOKENS.colors.textPrimary,
            maxWidth: '1100px',
            margin: '0 auto 16px auto',
            opacity: interpolate(headerEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerEntrance, [0, 1], [25, 0])}px)`,
          }}
        >
          Engineered for{' '}
          <span style={{ color: BRAND_TOKENS.colors.accentCoral }}>
            autonomous scale.
          </span>
        </h2>

        {/* Subhead */}
        <p
          style={{
            fontFamily: BRAND_TOKENS.typography.fontBody,
            fontSize: '20px',
            lineHeight: 1.5,
            color: BRAND_TOKENS.colors.textSecondary,
            maxWidth: '800px',
            margin: '0 auto 40px auto',
            opacity: interpolate(headerEntrance, [0, 1], [0, 1]),
          }}
        >
          Permanent software infrastructure that operates your business without expanding headcount.
        </p>

        {/* 3 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            width: '100%',
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '28px 28px',
              textAlign: 'left',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '240px',
              opacity: interpolate(card1Entrance, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(card1Entrance, [0, 1], [30, 0])}px)`,
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.accentCoral, fontWeight: 700 }}>
                  PILLAR 01
                </span>
                <span style={{ padding: '3px 10px', borderRadius: '999px', backgroundColor: 'rgba(5, 150, 105, 0.08)', color: BRAND_TOKENS.colors.accentEmerald, fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '10px', fontWeight: 600 }}>
                  LIVE EXECUTION
                </span>
              </div>
              <h3 style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '20px', fontWeight: 600, color: BRAND_TOKENS.colors.textPrimary, marginBottom: '8px', letterSpacing: '-0.02em' }}>
                Autonomous Customer Ops
              </h3>
              <p style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '13.5px', color: BRAND_TOKENS.colors.textSecondary, lineHeight: 1.5 }}>
                Direct WhatsApp and web agents resolving customer demands and closing transactions with zero queue time.
              </p>
            </div>
            <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary }}>
              <span>Turnaround: <strong style={{ color: BRAND_TOKENS.colors.accentEmerald }}>Sub-2s</strong></span>
              <span>Availability: <strong style={{ color: BRAND_TOKENS.colors.textPrimary }}>24/7</strong></span>
            </div>
          </div>

          {/* Card 2 */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '28px 28px',
              textAlign: 'left',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '240px',
              opacity: interpolate(card2Entrance, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(card2Entrance, [0, 1], [30, 0])}px)`,
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.accentCoral, fontWeight: 700 }}>
                  PILLAR 02
                </span>
                <span style={{ padding: '3px 10px', borderRadius: '999px', backgroundColor: 'rgba(5, 150, 105, 0.08)', color: BRAND_TOKENS.colors.accentEmerald, fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '10px', fontWeight: 600 }}>
                  ZERO MANUAL GLUE
                </span>
              </div>
              <h3 style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '20px', fontWeight: 600, color: BRAND_TOKENS.colors.textPrimary, marginBottom: '8px', letterSpacing: '-0.02em' }}>
                Self-Healing Data Sync
              </h3>
              <p style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '13.5px', color: BRAND_TOKENS.colors.textSecondary, lineHeight: 1.5 }}>
                ERP, CRM, and internal databases continuously synchronized with automated reconciliation and error recovery.
              </p>
            </div>
            <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary }}>
              <span>Data Entry: <strong style={{ color: BRAND_TOKENS.colors.accentEmerald }}>0% Human</strong></span>
              <span>Reliability: <strong style={{ color: BRAND_TOKENS.colors.textPrimary }}>99.98%</strong></span>
            </div>
          </div>

          {/* Card 3 */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '28px 28px',
              textAlign: 'left',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '240px',
              opacity: interpolate(card3Entrance, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(card3Entrance, [0, 1], [30, 0])}px)`,
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.accentCoral, fontWeight: 700 }}>
                  PILLAR 03
                </span>
                <span style={{ padding: '3px 10px', borderRadius: '999px', backgroundColor: 'rgba(5, 150, 105, 0.08)', color: BRAND_TOKENS.colors.accentEmerald, fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '10px', fontWeight: 600 }}>
                  SOVEREIGN IP
                </span>
              </div>
              <h3 style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '20px', fontWeight: 600, color: BRAND_TOKENS.colors.textPrimary, marginBottom: '8px', letterSpacing: '-0.02em' }}>
                100% Code Ownership
              </h3>
              <p style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '13.5px', color: BRAND_TOKENS.colors.textSecondary, lineHeight: 1.5 }}>
                Private GitHub repository transferred to your enterprise cloud. No recurring software subscriptions or vendor lock-in.
              </p>
            </div>
            <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary }}>
              <span>Handover: <strong style={{ color: BRAND_TOKENS.colors.accentEmerald }}>Full Source</strong></span>
              <span>Lock-In: <strong style={{ color: BRAND_TOKENS.colors.textPrimary }}>Zero</strong></span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
