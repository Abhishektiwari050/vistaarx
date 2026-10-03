import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { BRAND_TOKENS } from '../constants';

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth editorial typography reveal
  const titleEntrance = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 90, mass: 0.9 },
  });

  const subEntrance = spring({
    frame: frame - 15,
    fps,
    config: { damping: 16, stiffness: 85 },
  });

  const cardsEntrance = spring({
    frame: frame - 28,
    fps,
    config: { damping: 16, stiffness: 80 },
  });

  // Camera drift (gentle cinematic push-in)
  const cameraScale = interpolate(frame, [0, 160], [0.98, 1.025], {
    extrapolateRight: 'clamp',
  });

  // Scene exit fade
  const exitOpacity = interpolate(frame, [145, 160], [1, 0], {
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bg,
        opacity: exitOpacity,
        transform: `scale(${cameraScale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 120px',
        overflow: 'hidden',
      }}
    >
      <CinematicBackground tint="warm" />

      {/* Main Content Container */}
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
        {/* Eyebrow Pill */}
        <div
          style={{
            opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
            transform: `translateY(${interpolate(titleEntrance, [0, 1], [15, 0])}px)`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '999px',
            marginBottom: '28px',
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
            The Operational Reality // Enterprise Friction
          </span>
        </div>

        {/* Primary Editorial Headline */}
        <h1
          style={{
            fontFamily: BRAND_TOKENS.typography.fontDisplay,
            fontSize: '76px',
            lineHeight: 1.06,
            fontWeight: 500,
            letterSpacing: '-0.04em',
            color: BRAND_TOKENS.colors.textPrimary,
            maxWidth: '1080px',
            margin: '0 auto 24px auto',
            opacity: interpolate(titleEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleEntrance, [0, 1], [30, 0])}px)`,
          }}
        >
          Most enterprises run on{' '}
          <span
            style={{
              color: BRAND_TOKENS.colors.accentCoral,
              borderBottom: '3px solid rgba(255, 56, 35, 0.3)',
              paddingBottom: '2px',
            }}
          >
            human glue.
          </span>
        </h1>

        {/* Narrative Subhead */}
        <p
          style={{
            fontFamily: BRAND_TOKENS.typography.fontBody,
            fontSize: '22px',
            lineHeight: 1.5,
            color: BRAND_TOKENS.colors.textSecondary,
            maxWidth: '780px',
            margin: '0 auto 48px auto',
            opacity: interpolate(subEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subEntrance, [0, 1], [20, 0])}px)`,
          }}
        >
          Valuable teams trapped in manual spreadsheet entry, copy-pasting customer records, and chasing handoffs across disconnected tools.
        </p>

        {/* 3 Silo Inspection Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            width: '100%',
            opacity: interpolate(cardsEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(cardsEntrance, [0, 1], [35, 0])}px)`,
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '24px 28px',
              textAlign: 'left',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '190px',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span
                  style={{
                    fontFamily: BRAND_TOKENS.typography.fontMono,
                    fontSize: '11px',
                    color: BRAND_TOKENS.colors.textTertiary,
                    letterSpacing: '0.08em',
                  }}
                >
                  CHANNEL 01
                </span>
                <span
                  style={{
                    padding: '3px 10px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(217, 119, 6, 0.08)',
                    border: '1px solid rgba(217, 119, 6, 0.2)',
                    color: '#B45309',
                    fontFamily: BRAND_TOKENS.typography.fontMono,
                    fontSize: '10px',
                    fontWeight: 600,
                  }}
                >
                  MANUAL TRIAGE
                </span>
              </div>
              <h3
                style={{
                  fontFamily: BRAND_TOKENS.typography.fontDisplay,
                  fontSize: '19px',
                  fontWeight: 600,
                  color: BRAND_TOKENS.colors.textPrimary,
                  marginBottom: '6px',
                  letterSpacing: '-0.02em',
                }}
              >
                Inbound Inquiries & Leads
              </h3>
              <p style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '13px', color: BRAND_TOKENS.colors.textSecondary }}>
                WhatsApp, email, and web inquiries queueing for human review.
              </p>
            </div>
            <div
              style={{
                borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                paddingTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: BRAND_TOKENS.typography.fontMono,
                fontSize: '11px',
                color: BRAND_TOKENS.colors.textTertiary,
              }}
            >
              <span>Latency: <strong style={{ color: '#DC2626' }}>4.2 Hours</strong></span>
              <span>Human Touch: <strong style={{ color: '#DC2626' }}>100%</strong></span>
            </div>
          </div>

          {/* Card 2 */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '24px 28px',
              textAlign: 'left',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '190px',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span
                  style={{
                    fontFamily: BRAND_TOKENS.typography.fontMono,
                    fontSize: '11px',
                    color: BRAND_TOKENS.colors.textTertiary,
                    letterSpacing: '0.08em',
                  }}
                >
                  CHANNEL 02
                </span>
                <span
                  style={{
                    padding: '3px 10px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#DC2626',
                    fontFamily: BRAND_TOKENS.typography.fontMono,
                    fontSize: '10px',
                    fontWeight: 600,
                  }}
                >
                  DATA SILO FRICTION
                </span>
              </div>
              <h3
                style={{
                  fontFamily: BRAND_TOKENS.typography.fontDisplay,
                  fontSize: '19px',
                  fontWeight: 600,
                  color: BRAND_TOKENS.colors.textPrimary,
                  marginBottom: '6px',
                  letterSpacing: '-0.02em',
                }}
              >
                ERP & Spreadsheets
              </h3>
              <p style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '13px', color: BRAND_TOKENS.colors.textSecondary }}>
                Data manually re-keyed across accounting, inventory, and CRM.
              </p>
            </div>
            <div
              style={{
                borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                paddingTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: BRAND_TOKENS.typography.fontMono,
                fontSize: '11px',
                color: BRAND_TOKENS.colors.textTertiary,
              }}
            >
              <span>Sync Drift: <strong style={{ color: '#DC2626' }}>High</strong></span>
              <span>Lost Capacity: <strong style={{ color: '#DC2626' }}>6 hrs / day</strong></span>
            </div>
          </div>

          {/* Card 3 */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '24px 28px',
              textAlign: 'left',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '190px',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span
                  style={{
                    fontFamily: BRAND_TOKENS.typography.fontMono,
                    fontSize: '11px',
                    color: BRAND_TOKENS.colors.textTertiary,
                    letterSpacing: '0.08em',
                  }}
                >
                  CHANNEL 03
                </span>
                <span
                  style={{
                    padding: '3px 10px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(217, 119, 6, 0.08)',
                    border: '1px solid rgba(217, 119, 6, 0.2)',
                    color: '#B45309',
                    fontFamily: BRAND_TOKENS.typography.fontMono,
                    fontSize: '10px',
                    fontWeight: 600,
                  }}
                >
                  COORDINATION LAG
                </span>
              </div>
              <h3
                style={{
                  fontFamily: BRAND_TOKENS.typography.fontDisplay,
                  fontSize: '19px',
                  fontWeight: 600,
                  color: BRAND_TOKENS.colors.textPrimary,
                  marginBottom: '6px',
                  letterSpacing: '-0.02em',
                }}
              >
                Cross-Department Handover
              </h3>
              <p style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '13px', color: BRAND_TOKENS.colors.textSecondary }}>
                Waiting on approvals, manual email reminders, and offline checks.
              </p>
            </div>
            <div
              style={{
                borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                paddingTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: BRAND_TOKENS.typography.fontMono,
                fontSize: '11px',
                color: BRAND_TOKENS.colors.textTertiary,
              }}
            >
              <span>Fulfillment Lag: <strong style={{ color: '#DC2626' }}>24 - 48h</strong></span>
              <span>Throughput: <strong style={{ color: '#DC2626' }}>Constrained</strong></span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
