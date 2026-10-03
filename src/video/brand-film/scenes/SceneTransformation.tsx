import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';
import { BRAND_TOKENS } from '../constants';

export const SceneTransformation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance springs
  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  const consoleEntrance = spring({
    frame: frame - 16,
    fps,
    config: { damping: 16, stiffness: 85 },
  });

  // Step progression across frames 30 -> 180
  const step1Done = frame >= 30;
  const step2Done = frame >= 65;
  const step3Done = frame >= 105;
  const step4Done = frame >= 145;

  // Real-time latency & speedup ticker
  const latency = Math.floor(interpolate(frame, [30, 160], [48000, 144], { extrapolateRight: 'clamp' }));
  const humanTouch = Math.floor(interpolate(frame, [30, 160], [100, 0], { extrapolateRight: 'clamp' }));

  // Camera drift
  const scale = interpolate(frame, [0, 210], [0.985, 1.025], { extrapolateRight: 'clamp' });
  const exitOpacity = interpolate(frame, [195, 210], [1, 0], { extrapolateLeft: 'clamp' });

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
          maxWidth: '1400px',
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
              backgroundColor: BRAND_TOKENS.colors.accentEmerald,
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
            Step 02 // Autonomous Architecture
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
          Software that executes.{' '}
          <span style={{ color: BRAND_TOKENS.colors.accentCoral }}>
            Not another dashboard.
          </span>
        </h2>

        {/* Subhead */}
        <p
          style={{
            fontFamily: BRAND_TOKENS.typography.fontBody,
            fontSize: '20px',
            lineHeight: 1.5,
            color: BRAND_TOKENS.colors.textSecondary,
            maxWidth: '820px',
            margin: '0 auto 36px auto',
            opacity: interpolate(headerEntrance, [0, 1], [0, 1]),
          }}
        >
          Autonomous pipelines and custom agents that resolve enterprise operations in milliseconds with zero human toil.
        </p>

        {/* The Flagship Runtime Console (Matches site's AgentOrchestrationConsole) */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.07)',
            overflow: 'hidden',
            opacity: interpolate(consoleEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(consoleEntrance, [0, 1], [35, 0])}px)`,
            textAlign: 'left',
          }}
        >
          {/* Top Console Bar */}
          <div
            style={{
              padding: '14px 28px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              backgroundColor: '#FAF9F5',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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
                VISTAR_AUTONOMOUS_KERNEL // PRODUCTION_NODE_01
              </span>
            </div>

            <div style={{ display: 'flex', gap: '20px', fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px' }}>
              <span style={{ color: BRAND_TOKENS.colors.textSecondary }}>
                SPEED: <strong style={{ color: BRAND_TOKENS.colors.accentEmerald }}>SUB-150MS EDGE</strong>
              </span>
              <span style={{ color: BRAND_TOKENS.colors.textSecondary }}>
                HUMAN INTERVENTION: <strong style={{ color: BRAND_TOKENS.colors.accentCoral }}>{humanTouch}%</strong>
              </span>
              <span style={{ color: BRAND_TOKENS.colors.accentEmerald, fontWeight: 600 }}>
                ● 100% AUTONOMOUS
              </span>
            </div>
          </div>

          {/* Console Split: Left Execution Pipeline, Right Tool Payload */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '7fr 5fr',
            }}
          >
            {/* Left: Execution Steps */}
            <div style={{ padding: '28px 32px', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '16px', fontWeight: 600, color: BRAND_TOKENS.colors.textPrimary }}>
                  Live Operational Stream
                </span>
                <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.accentEmerald }}>
                  LATENCY: {latency > 1000 ? `${(latency / 1000).toFixed(1)}s` : `${latency}ms`}
                </span>
              </div>

              {/* Step 1 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: step1Done ? '#F0FDF4' : '#FAF9F5',
                  border: step1Done ? '1px solid rgba(5, 150, 105, 0.2)' : '1px solid rgba(0, 0, 0, 0.05)',
                  marginBottom: '10px',
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: step1Done ? BRAND_TOKENS.colors.accentEmerald : '#D1D5DB',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  ✓
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '14px', fontWeight: 600, color: BRAND_TOKENS.colors.textPrimary }}>
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
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: step2Done ? '#F0FDF4' : '#FAF9F5',
                  border: step2Done ? '1px solid rgba(5, 150, 105, 0.2)' : '1px solid rgba(0, 0, 0, 0.05)',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: step2Done ? BRAND_TOKENS.colors.accentEmerald : '#D1D5DB',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  {step2Done ? '✓' : '2'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '14px', fontWeight: 600, color: BRAND_TOKENS.colors.textPrimary }}>
                    02 // Autonomous Reasoning & Policy Validation
                  </div>
                  <div style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '11.5px', color: BRAND_TOKENS.colors.textSecondary }}>
                    Business logic verified against enterprise security schema
                  </div>
                </div>
                <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary }}>
                  {step2Done ? '48ms' : '...'}
                </span>
              </div>

              {/* Step 3 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: step3Done ? '#F0FDF4' : '#FAF9F5',
                  border: step3Done ? '1px solid rgba(5, 150, 105, 0.2)' : '1px solid rgba(0, 0, 0, 0.05)',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: step3Done ? BRAND_TOKENS.colors.accentEmerald : '#D1D5DB',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  {step3Done ? '✓' : '3'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '14px', fontWeight: 600, color: BRAND_TOKENS.colors.textPrimary }}>
                    03 // Real-Time System Mutation & Sync
                  </div>
                  <div style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '11.5px', color: BRAND_TOKENS.colors.textSecondary }}>
                    ERP records committed, inventory adjusted, notification pushed
                  </div>
                </div>
                <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary }}>
                  {step3Done ? '56ms' : '...'}
                </span>
              </div>

              {/* Step 4 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: step4Done ? '#F0FDF4' : '#FAF9F5',
                  border: step4Done ? '1px solid rgba(5, 150, 105, 0.2)' : '1px solid rgba(0, 0, 0, 0.05)',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: step4Done ? BRAND_TOKENS.colors.accentEmerald : '#D1D5DB',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  {step4Done ? '✓' : '4'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: BRAND_TOKENS.typography.fontDisplay, fontSize: '14px', fontWeight: 600, color: BRAND_TOKENS.colors.textPrimary }}>
                    04 // Zero-Touch Operational Completion
                  </div>
                  <div style={{ fontFamily: BRAND_TOKENS.typography.fontBody, fontSize: '11.5px', color: BRAND_TOKENS.colors.textSecondary }}>
                    Human toil bypassed completely. Full cryptographic audit logged.
                  </div>
                </div>
                <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary }}>
                  {step4Done ? '28ms' : '...'}
                </span>
              </div>
            </div>

            {/* Right: Code & Mutation JSON */}
            <div style={{ padding: '24px 28px', backgroundColor: '#FAF9F5', borderLeft: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontFamily: BRAND_TOKENS.typography.fontMono, fontSize: '11px', color: BRAND_TOKENS.colors.textTertiary }}>
                  KERNEL_MUTATION.JSON
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
                  DISPATCHED
                </span>
              </div>

              <pre
                style={{
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  fontSize: '12px',
                  lineHeight: 1.6,
                  color: BRAND_TOKENS.colors.textPrimary,
                  backgroundColor: '#FFFFFF',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  margin: 0,
                  overflow: 'hidden',
                }}
              >
{`{
  "system": "vistar_autonomous_bus",
  "workflow": "enterprise_triage",
  "manual_steps": 0,
  "human_hours_required": 0.0,
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
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  fontSize: '11px',
                }}
              >
                <span style={{ color: BRAND_TOKENS.colors.textSecondary }}>Old Human Turnaround:</span>
                <strong style={{ color: '#DC2626' }}>48 Hours</strong>
              </div>
              <div
                style={{
                  marginTop: '6px',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#F0FDF4',
                  border: '1px solid rgba(5, 150, 105, 0.2)',
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
    </AbsoluteFill>
  );
};
