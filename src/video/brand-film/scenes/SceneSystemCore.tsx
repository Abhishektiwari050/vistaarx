import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { BRAND_TOKENS } from '../constants';

export const SceneSystemCore: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  const mapEntrance = spring({
    frame: frame - 18,
    fps,
    config: { damping: 16, stiffness: 85 },
  });

  // Dynamic audit scanning sweep (0% -> 100% across the pipeline)
  const scanProgress = interpolate(frame, [25, 140], [0, 100], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Dynamic metrics ticker
  const manualStepsSaved = Math.floor(interpolate(frame, [35, 120], [0, 14], { extrapolateRight: 'clamp' }));
  const hoursReclaimed = Math.floor(interpolate(frame, [35, 130], [0, 48], { extrapolateRight: 'clamp' }));
  const automationFeasibility = Math.floor(interpolate(frame, [40, 140], [20, 96], { extrapolateRight: 'clamp' }));

  // Scene camera drift
  const scale = interpolate(frame, [0, 180], [0.985, 1.02], { extrapolateRight: 'clamp' });
  const exitOpacity = interpolate(frame, [165, 180], [1, 0], { extrapolateLeft: 'clamp' });

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
        padding: '0 120px',
        overflow: 'hidden',
      }}
    >
      <CinematicBackground tint="focus" />

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
            marginBottom: '24px',
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
            Step 01 // Operational Intelligence Audit
          </span>
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: BRAND_TOKENS.typography.fontDisplay,
            fontSize: '68px',
            lineHeight: 1.08,
            fontWeight: 500,
            letterSpacing: '-0.035em',
            color: BRAND_TOKENS.colors.textPrimary,
            maxWidth: '1100px',
            margin: '0 auto 20px auto',
            opacity: interpolate(headerEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerEntrance, [0, 1], [25, 0])}px)`,
          }}
        >
          We audit how your company{' '}
          <span style={{ color: BRAND_TOKENS.colors.accentCoral }}>
            actually functions.
          </span>
        </h2>

        {/* Subhead */}
        <p
          style={{
            fontFamily: BRAND_TOKENS.typography.fontBody,
            fontSize: '21px',
            lineHeight: 1.5,
            color: BRAND_TOKENS.colors.textSecondary,
            maxWidth: '820px',
            margin: '0 auto 40px auto',
            opacity: interpolate(headerEntrance, [0, 1], [0, 1]),
          }}
        >
          We map information flows, trace human handoffs, and locate where repetitive friction chokes your velocity.
        </p>

        {/* Diagnostic Audit Interface */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 16px 40px -10px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            opacity: interpolate(mapEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(mapEntrance, [0, 1], [35, 0])}px)`,
            textAlign: 'left',
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: '16px 28px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              backgroundColor: '#FAF9F5',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
              </div>
              <span
                style={{
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  fontSize: '11px',
                  fontWeight: 600,
                  color: BRAND_TOKENS.colors.textSecondary,
                  letterSpacing: '0.08em',
                }}
              >
                VISTAR_WORKFLOW_TRACER // ENTERPRISE_DIAGNOSTICS
              </span>
            </div>

            <div style={{ display: 'flex', gap: '24px', fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px' }}>
              <span style={{ color: BRAND_TOKENS.colors.textSecondary }}>
                SCAN PROGRESS: <strong style={{ color: BRAND_TOKENS.colors.accentCoral }}>{Math.floor(scanProgress)}%</strong>
              </span>
              <span style={{ color: BRAND_TOKENS.colors.accentEmerald, fontWeight: 600 }}>
                ● SENSORS ACTIVE
              </span>
            </div>
          </div>

          {/* 3 Interactive Pipeline Audit Nodes */}
          <div
            style={{
              padding: '32px 36px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              position: 'relative',
            }}
          >
            {/* Stage 1 */}
            <div
              style={{
                backgroundColor: '#FAF9F5',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                borderRadius: '14px',
                padding: '20px 24px',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '10px', color: BRAND_TOKENS.colors.textTertiary }}>
                  VECTOR 01
                </span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(5, 150, 105, 0.1)',
                    color: BRAND_TOKENS.colors.accentEmerald,
                    fontFamily: BRAND_TOKENS.typography.fontMono,
                    fontSize: '10px',
                    fontWeight: 600,
                  }}
                >
                  AUDITED
                </span>
              </div>
              <h4 style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '17px', fontWeight: 600, color: BRAND_TOKENS.colors.textPrimary, marginBottom: '6px' }}>
                Customer Inbound Routing
              </h4>
              <p style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '12.5px', color: BRAND_TOKENS.colors.textSecondary, marginBottom: '16px' }}>
                86% of incoming requests follow 4 deterministic intent patterns.
              </p>
              <div style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.accentCoral }}>
                Target: Autonomous Agent Triage
              </div>
            </div>

            {/* Stage 2 */}
            <div
              style={{
                backgroundColor: '#FAF9F5',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                borderRadius: '14px',
                padding: '20px 24px',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '10px', color: BRAND_TOKENS.colors.textTertiary }}>
                  VECTOR 02
                </span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(5, 150, 105, 0.1)',
                    color: BRAND_TOKENS.colors.accentEmerald,
                    fontFamily: BRAND_TOKENS.typography.fontMono,
                    fontSize: '10px',
                    fontWeight: 600,
                  }}
                >
                  AUDITED
                </span>
              </div>
              <h4 style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '17px', fontWeight: 600, color: BRAND_TOKENS.colors.textPrimary, marginBottom: '6px' }}>
                Cross-System Data Sync
              </h4>
              <p style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '12.5px', color: BRAND_TOKENS.colors.textSecondary, marginBottom: '16px' }}>
                Human staff manually transferring CRM rows into ERP database.
              </p>
              <div style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.accentCoral }}>
                Target: Self-Healing Webhook Bus
              </div>
            </div>

            {/* Stage 3 */}
            <div
              style={{
                backgroundColor: '#FAF9F5',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                borderRadius: '14px',
                padding: '20px 24px',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '10px', color: BRAND_TOKENS.colors.textTertiary }}>
                  VECTOR 03
                </span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(5, 150, 105, 0.1)',
                    color: BRAND_TOKENS.colors.accentEmerald,
                    fontFamily: BRAND_TOKENS.typography.fontMono,
                    fontSize: '10px',
                    fontWeight: 600,
                  }}
                >
                  AUDITED
                </span>
              </div>
              <h4 style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '17px', fontWeight: 600, color: BRAND_TOKENS.colors.textPrimary, marginBottom: '6px' }}>
                Fulfillment & Alerts
              </h4>
              <p style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '12.5px', color: BRAND_TOKENS.colors.textSecondary, marginBottom: '16px' }}>
                Manual status updates causing 24h delays for end clients.
              </p>
              <div style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.accentCoral }}>
                Target: Sub-second Event Dispatch
              </div>
            </div>
          </div>

          {/* Bottom Diagnostic Metrics Row */}
          <div
            style={{
              padding: '16px 36px',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid rgba(0, 0, 0, 0.06)',
              display: 'flex',
              justifyContent: 'space-around',
              fontFamily: BRAND_TOKENS.typography.fontMono,
            }}
          >
            <div>
              <span style={{ fontSize: '10px', color: BRAND_TOKENS.colors.textTertiary, display: 'block' }}>
                MANUAL STEPS TO AUTOMATE
              </span>
              <span style={{ fontSize: '20px', fontWeight: 700, color: BRAND_TOKENS.colors.textPrimary }}>
                {manualStepsSaved} of 16 Steps
              </span>
            </div>
            <div style={{ width: '1px', backgroundColor: 'rgba(0, 0, 0, 0.08)' }} />
            <div>
              <span style={{ fontSize: '10px', color: BRAND_TOKENS.colors.textTertiary, display: 'block' }}>
                WEEKLY HUMAN TOIL RECLAIMED
              </span>
              <span style={{ fontSize: '20px', fontWeight: 700, color: BRAND_TOKENS.colors.accentCoral }}>
                +{hoursReclaimed} Hours / Team
              </span>
            </div>
            <div style={{ width: '1px', backgroundColor: 'rgba(0, 0, 0, 0.08)' }} />
            <div>
              <span style={{ fontSize: '10px', color: BRAND_TOKENS.colors.textTertiary, display: 'block' }}>
                AUTOMATION FEASIBILITY
              </span>
              <span style={{ fontSize: '20px', fontWeight: 700, color: BRAND_TOKENS.colors.accentEmerald }}>
                {automationFeasibility}% Feasible
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
