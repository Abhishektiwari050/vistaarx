import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { CinematicCamera } from '../components/CinematicCamera';
import { MaskedKineticText } from '../components/MaskedKineticText';
import { BRAND_TOKENS } from '../constants';

export const SceneSystemCore: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pipe electrical data pulse offset
  const pipeDash = (frame * 6) % 100;

  // Real-time telemetry climbing
  const auditPoints = Math.min(142, Math.floor(interpolate(frame, [20, 140], [12, 142], { extrapolateRight: 'clamp' })));
  const frictionScore = Math.min(88, Math.floor(interpolate(frame, [30, 150], [10, 88], { extrapolateRight: 'clamp' })));
  const hoursReclaimed = Math.min(52, Math.floor(interpolate(frame, [30, 160], [0, 52], { extrapolateRight: 'clamp' })));

  const exitOpacity = interpolate(frame, [160, 180], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bg,
        opacity: exitOpacity,
        overflow: 'hidden',
      }}
    >
      <CinematicCamera durationInFrames={180} startScale={0.96} endScale={1.035} tiltX={5} panY={-10}>
        <CinematicBackground accent="indigo" />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 80px',
            zIndex: 10,
          }}
        >
          {/* Headline Bar */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '999px',
                marginBottom: '16px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: BRAND_TOKENS.colors.accentIndigo }} />
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
                Operational Architecture Audit
              </span>
            </div>

            <h2
              style={{
                fontFamily: BRAND_TOKENS.typography.fontDisplay,
                fontSize: '60px',
                lineHeight: 1.1,
                fontWeight: 600,
                letterSpacing: '-0.035em',
                color: '#FFFFFF',
                margin: 0,
              }}
            >
              <MaskedKineticText delay={5}>
                We audit how your enterprise
              </MaskedKineticText>{' '}
              <MaskedKineticText delay={12}>
                <span style={{ color: BRAND_TOKENS.colors.accentCoral }}>functions.</span>
              </MaskedKineticText>
            </h2>
          </div>

          {/* Full-Bleed 1560px Edge-to-Edge Architectural Diagnostic Cockpit */}
          <div
            style={{
              width: '100%',
              maxWidth: '1560px',
              backgroundColor: 'rgba(12, 14, 22, 0.75)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              overflow: 'hidden',
            }}
          >
            {/* Top Cockpit Chrome */}
            <div
              style={{
                padding: '14px 28px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
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
                  VISTAR_TELEMETRY_TRACER // WORKFLOW_SCANNER
                </span>
              </div>

              <div style={{ display: 'flex', gap: '24px', fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px' }}>
                <span style={{ color: BRAND_TOKENS.colors.textSecondary }}>
                  AUDIT DISCOVERY: <strong style={{ color: BRAND_TOKENS.colors.accentCoral }}>{auditPoints} NODES</strong>
                </span>
                <span style={{ color: BRAND_TOKENS.colors.accentEmerald, fontWeight: 600 }}>
                  ● SENSORS ONLINE
                </span>
              </div>
            </div>

            {/* 3 Active Vector Pipelines with Dynamic Connecting SVG Bus */}
            <div style={{ padding: '32px 36px', position: 'relative' }}>
              {/* Dynamic SVG Animated Wire Conduits */}
              <svg
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              >
                <line
                  x1="22%"
                  y1="50%"
                  x2="48%"
                  y2="50%"
                  stroke="rgba(255, 56, 35, 0.4)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  strokeDashoffset={-pipeDash}
                />
                <line
                  x1="52%"
                  y1="50%"
                  x2="78%"
                  y2="50%"
                  stroke="rgba(16, 185, 129, 0.4)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  strokeDashoffset={-pipeDash}
                />
              </svg>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '28px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Node 1 */}
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary }}>
                      INGESTION VECTOR
                    </span>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '999px',
                        backgroundColor: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#EF4444',
                        fontFamily: BRAND_TOKENS.typography.fontMono,
                        fontSize: '10px',
                        fontWeight: 600,
                      }}
                    >
                      FRICTION DETECTED
                    </span>
                  </div>
                  <h3 style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '6px' }}>
                    Inbound WhatsApp & Web
                  </h3>
                  <p style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '13px', color: BRAND_TOKENS.colors.textSecondary, marginBottom: '20px' }}>
                    Manual triage creates 4.8h latency on customer transactions.
                  </p>
                  <div style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.accentCoral }}>
                    Solution: Autonomous Ingestion Agent
                  </div>
                </div>

                {/* Node 2 */}
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary }}>
                      RECONCILIATION VECTOR
                    </span>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '999px',
                        backgroundColor: 'rgba(245, 158, 11, 0.15)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        color: '#F59E0B',
                        fontFamily: BRAND_TOKENS.typography.fontMono,
                        fontSize: '10px',
                        fontWeight: 600,
                      }}
                    >
                      DATA DRIFT FOUND
                    </span>
                  </div>
                  <h3 style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '6px' }}>
                    CRM ↔ ERP Bridge
                  </h3>
                  <p style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '13px', color: BRAND_TOKENS.colors.textSecondary, marginBottom: '20px' }}>
                    Staff manually copying records across disconnected databases.
                  </p>
                  <div style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.accentCoral }}>
                    Solution: Self-Healing Webhook Bus
                  </div>
                </div>

                {/* Node 3 */}
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary }}>
                      EXECUTION VECTOR
                    </span>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '999px',
                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        color: BRAND_TOKENS.colors.accentEmerald,
                        fontFamily: BRAND_TOKENS.typography.fontMono,
                        fontSize: '10px',
                        fontWeight: 600,
                      }}
                    >
                      AUTOMATION READY
                    </span>
                  </div>
                  <h3 style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '6px' }}>
                    Instant Fulfillment
                  </h3>
                  <p style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '13px', color: BRAND_TOKENS.colors.textSecondary, marginBottom: '20px' }}>
                    Operations resolved autonomously in sub-200ms edge time.
                  </p>
                  <div style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.accentEmerald }}>
                    Target: Zero-Touch Scale
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Real-time Telemetry Stats */}
            <div
              style={{
                padding: '18px 36px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                display: 'flex',
                justifyContent: 'space-around',
                fontFamily: BRAND_TOKENS.typography.fontMono,
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary, display: 'block' }}>
                  MANUAL TOIL IDENTIFIED
                </span>
                <span style={{ fontSize: '22px', fontWeight: 700, color: BRAND_TOKENS.colors.accentCoral }}>
                  {frictionScore}% Redundant
                </span>
              </div>
              <div style={{ width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)' }} />
              <div>
                <span style={{ fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary, display: 'block' }}>
                  TIME RECLAIMED PER TEAM
                </span>
                <span style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF' }}>
                  +{hoursReclaimed} Hours / Week
                </span>
              </div>
              <div style={{ width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)' }} />
              <div>
                <span style={{ fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary, display: 'block' }}>
                  HUMAN INTERVENTION
                </span>
                <span style={{ fontSize: '22px', fontWeight: 700, color: BRAND_TOKENS.colors.accentEmerald }}>
                  Target: 0% (Humanless)
                </span>
              </div>
            </div>
          </div>
        </div>
      </CinematicCamera>
    </AbsoluteFill>
  );
};
