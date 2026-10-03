import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { CinematicCamera } from '../components/CinematicCamera';
import { MaskedKineticText } from '../components/MaskedKineticText';
import { BRAND_TOKENS } from '../constants';

export const SceneAssemblyLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sequential validation checks
  const step1 = frame >= 20;
  const step2 = frame >= 55;
  const step3 = frame >= 95;
  const step4 = frame >= 140;

  // Real-time latency collapse
  const latency = Math.floor(interpolate(frame, [20, 160], [48000, 144], { extrapolateRight: 'clamp' }));
  const humanHours = (interpolate(frame, [20, 160], [14.0, 0.0], { extrapolateRight: 'clamp' })).toFixed(1);

  // Dynamic camera punch-in on frame 150
  const punchScale = interpolate(frame, [140, 200], [1.0, 1.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exitOpacity = interpolate(frame, [200, 220], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bg,
        opacity: exitOpacity,
        overflow: 'hidden',
      }}
    >
      <CinematicCamera durationInFrames={220} startScale={0.96} endScale={1.03 * punchScale} tiltX={4} tiltY={-2} panY={-12}>
        <CinematicBackground accent="emerald" />

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
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '999px',
                marginBottom: '14px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: BRAND_TOKENS.colors.accentEmerald }} />
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
                Production Execution // Zero Human Drag
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
              <MaskedKineticText delay={5}>Software that executes.</MaskedKineticText>{' '}
              <MaskedKineticText delay={14}>
                <span style={{ color: BRAND_TOKENS.colors.accentCoral }}>Not another dashboard.</span>
              </MaskedKineticText>
            </h2>
          </div>

          {/* Full-Bleed 1540px Dark Glass Console */}
          <div
            style={{
              width: '100%',
              maxWidth: '1540px',
              backgroundColor: 'rgba(11, 13, 20, 0.8)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              overflow: 'hidden',
            }}
          >
            {/* Top Chrome */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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
                  VISTAR_AUTONOMOUS_KERNEL // PRODUCTION_NODE_01
                </span>
              </div>

              <div style={{ display: 'flex', gap: '20px', fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px' }}>
                <span style={{ color: BRAND_TOKENS.colors.textSecondary }}>
                  LATENCY: <strong style={{ color: BRAND_TOKENS.colors.accentEmerald }}>SUB-150MS EDGE</strong>
                </span>
                <span style={{ color: BRAND_TOKENS.colors.accentEmerald, fontWeight: 600 }}>
                  ● 100% AUTONOMOUS
                </span>
              </div>
            </div>

            {/* Console Body Split */}
            <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr' }}>
              {/* Left Execution Steps */}
              <div style={{ padding: '28px 32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '16px', fontWeight: 600, color: '#FFFFFF' }}>
                    Live Operational Stream
                  </span>
                  <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.accentEmerald }}>
                    CLOCK: {latency > 1000 ? `${(latency / 1000).toFixed(1)}s` : `${latency}ms`}
                  </span>
                </div>

                {/* Step 1 */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 18px',
                    borderRadius: '10px',
                    backgroundColor: step1 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                    border: step1 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: step1 ? BRAND_TOKENS.colors.accentEmerald : 'rgba(255,255,255,0.2)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>
                    ✓
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
                      01 // Inbound Enterprise Event Ingested
                    </div>
                    <div style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '11.5px', color: BRAND_TOKENS.colors.textSecondary }}>
                      WhatsApp & CRM inquiry parsed via webhook bus
                    </div>
                  </div>
                  <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary }}>
                    12ms
                  </span>
                </div>

                {/* Step 2 */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 18px',
                    borderRadius: '10px',
                    backgroundColor: step2 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                    border: step2 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: step2 ? BRAND_TOKENS.colors.accentEmerald : 'rgba(255,255,255,0.2)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>
                    {step2 ? '✓' : '2'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
                      02 // Autonomous Reasoning & Policy Validation
                    </div>
                    <div style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '11.5px', color: BRAND_TOKENS.colors.textSecondary }}>
                      Business logic verified against enterprise security schema
                    </div>
                  </div>
                  <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary }}>
                    {step2 ? '48ms' : '...'}
                  </span>
                </div>

                {/* Step 3 */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 18px',
                    borderRadius: '10px',
                    backgroundColor: step3 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                    border: step3 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: step3 ? BRAND_TOKENS.colors.accentEmerald : 'rgba(255,255,255,0.2)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>
                    {step3 ? '✓' : '3'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
                      03 // Real-Time System Mutation & Sync
                    </div>
                    <div style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '11.5px', color: BRAND_TOKENS.colors.textSecondary }}>
                      ERP records committed, inventory adjusted, notification pushed
                    </div>
                  </div>
                  <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary }}>
                    {step3 ? '56ms' : '...'}
                  </span>
                </div>

                {/* Step 4 */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 18px',
                    borderRadius: '10px',
                    backgroundColor: step4 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                    border: step4 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: step4 ? BRAND_TOKENS.colors.accentEmerald : 'rgba(255,255,255,0.2)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>
                    {step4 ? '✓' : '4'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
                      04 // Zero-Touch Operational Completion
                    </div>
                    <div style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '11.5px', color: BRAND_TOKENS.colors.textSecondary }}>
                      Human toil bypassed completely. Full cryptographic audit logged.
                    </div>
                  </div>
                  <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary }}>
                    {step4 ? '28ms' : '...'}
                  </span>
                </div>
              </div>

              {/* Right: Structured JSON & Contrast HUD */}
              <div
                style={{
                  padding: '24px 28px',
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary }}>
                    KERNEL_MUTATION.JSON
                  </span>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: BRAND_TOKENS.colors.accentEmerald,
                      fontFamily: BRAND_TOKENS.typography.fontMono,
                      fontSize: '10px',
                      fontWeight: 600,
                    }}
                  >
                    DISPATCHED
                  </span>
                </div>

                <pre
                  style={{
                    fontFamily: BRAND_TOKENS.typography.fontMono,
                    fontSize: '12px',
                    lineHeight: 1.6,
                    color: '#FFFFFF',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    margin: 0,
                    overflow: 'hidden',
                  }}
                >
{`{
  "system": "vistar_autonomous_bus",
  "workflow": "enterprise_triage",
  "manual_steps": 0,
  "human_hours_required": ${humanHours},
  "execution_time": "144ms",
  "target_systems": [
    "whatsapp_cloud_api",
    "postgresql_ledger",
    "edge_triage_agent"
  ],
  "outcome": "SUCCESS_ZERO_TOIL"
}`}
                </pre>

                <div
                  style={{
                    marginTop: '16px',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: BRAND_TOKENS.typography.fontMono,
                    fontSize: '11px',
                  }}
                >
                  <span style={{ color: BRAND_TOKENS.colors.textSecondary }}>Old Human Turnaround:</span>
                  <strong style={{ color: '#EF4444' }}>48 Hours</strong>
                </div>
                <div
                  style={{
                    marginTop: '6px',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: BRAND_TOKENS.typography.fontMono,
                    fontSize: '11px',
                  }}
                >
                  <span style={{ color: BRAND_TOKENS.colors.accentEmerald }}>VISTAR Autonomous Turnaround:</span>
                  <strong style={{ color: BRAND_TOKENS.colors.accentEmerald }}>144 Milliseconds</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CinematicCamera>
    </AbsoluteFill>
  );
};
