import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_TOKENS } from '../constants';

export const SceneTransformation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Relative frame (0 to 240)
  const relFrame = Math.max(0, frame - 240);

  // Entrance spring
  const entrance = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Slider animation: starts at 50%, sweeps to 85% at frame 100, then full resolution
  const wipeX = interpolate(
    relFrame,
    [20, 110, 180],
    [50, 20, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Exit towards Scene 4
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
        padding: '0 80px',
        overflow: 'hidden',
      }}
    >
      {/* Scene Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 16px',
            borderRadius: '999px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${BRAND_TOKENS.colors.border}`,
            color: BRAND_TOKENS.colors.textPrimary,
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '11px',
            letterSpacing: '0.15em',
            marginBottom: '12px',
          }}
        >
          THE TRANSFORMATION // MANUAL TO HUMANLESS
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
          MAKING ENTERPRISE OPERATIONS RUN WITHOUT HUMAN DRAG
        </h2>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Left: The Human-Choked Workflow */}
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.04)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '16px',
            padding: '36px',
            backdropFilter: 'blur(16px)',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                fontFamily: BRAND_TOKENS.typography.fontMono,
                fontSize: '12px',
                color: BRAND_TOKENS.colors.accentCrimson,
                fontWeight: 700,
                letterSpacing: '0.1em',
              }}
            >
              HUMAN-CHOKED WORKFLOW
            </span>
            <span
              style={{
                fontSize: '11px',
                fontFamily: BRAND_TOKENS.typography.fontMono,
                color: BRAND_TOKENS.colors.accentCrimson,
                background: 'rgba(239, 68, 68, 0.1)',
                padding: '4px 10px',
                borderRadius: '999px',
              }}
            >
              HIGH TOIL • 84% MANUAL
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                padding: '16px',
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '8px',
                borderLeft: '3px solid #ef4444',
              }}
            >
              <div style={{ fontWeight: 600, color: '#ECEEF5', fontSize: '15px' }}>
                Manual Customer Qualification
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#959CB3',
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  marginTop: '4px',
                }}
              >
                Human reps typing replies all day • 4-hour delay • 42% lost leads
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '8px',
                borderLeft: '3px solid #ef4444',
              }}
            >
              <div style={{ fontWeight: 600, color: '#ECEEF5', fontSize: '15px' }}>
                Mechanical Data Entry & Triage
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#959CB3',
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  marginTop: '4px',
                }}
              >
                Copy-pasting between CRMs, ERPs, and Sheets • Constant human errors
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '8px',
                borderLeft: '3px solid #ef4444',
              }}
            >
              <div style={{ fontWeight: 600, color: '#ECEEF5', fontSize: '15px' }}>
                Growth Requires Adding Headcount
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#959CB3',
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  marginTop: '4px',
                }}
              >
                Scaling volume breaks staff • Massive payroll overhead • Operational exhaustion
              </div>
            </div>
          </div>
        </div>

        {/* Right: The VISTAR Autonomous Architecture */}
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.04)',
            border: `1px solid ${BRAND_TOKENS.colors.borderActive}`,
            borderRadius: '16px',
            padding: '36px',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 40px rgba(16, 185, 129, 0.08)',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                fontFamily: BRAND_TOKENS.typography.fontMono,
                fontSize: '12px',
                color: BRAND_TOKENS.colors.accentEmerald,
                fontWeight: 700,
                letterSpacing: '0.1em',
              }}
            >
              VISTAR AUTONOMOUS SYSTEM
            </span>
            <span
              style={{
                fontSize: '11px',
                fontFamily: BRAND_TOKENS.typography.fontMono,
                color: BRAND_TOKENS.colors.accentEmerald,
                background: 'rgba(16, 185, 129, 0.12)',
                padding: '4px 10px',
                borderRadius: '999px',
                fontWeight: 600,
              }}
            >
              94% HUMANLESS • INSTANT
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                padding: '16px',
                background: 'rgba(13, 14, 21, 0.7)',
                borderRadius: '8px',
                borderLeft: `3px solid ${BRAND_TOKENS.colors.accentEmerald}`,
              }}
            >
              <div style={{ fontWeight: 600, color: '#ECEEF5', fontSize: '15px' }}>
                Autonomous AI Lead Execution
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#959CB3',
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  marginTop: '4px',
                }}
              >
                Instant 24/7 AI qualification • Automated WhatsApp closing • Zero delay
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                background: 'rgba(13, 14, 21, 0.7)',
                borderRadius: '8px',
                borderLeft: `3px solid ${BRAND_TOKENS.colors.accentEmerald}`,
              }}
            >
              <div style={{ fontWeight: 600, color: '#ECEEF5', fontSize: '15px' }}>
                Self-Operating Data Pipelines
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#959CB3',
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  marginTop: '4px',
                }}
              >
                Event-driven synchronization across tools • Zero manual entry • 100% data fidelity
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                background: 'rgba(13, 14, 21, 0.7)',
                borderRadius: '8px',
                borderLeft: `3px solid ${BRAND_TOKENS.colors.accentEmerald}`,
              }}
            >
              <div style={{ fontWeight: 600, color: '#ECEEF5', fontSize: '15px' }}>
                10x Scale Without Headcount
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#959CB3',
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  marginTop: '4px',
                }}
              >
                Software absorbs 100x transaction volume • Humans only supervise strategic growth
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Transformation Wipe Divider Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${wipeX}%`,
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, #10b981, transparent)',
          boxShadow: '0 0 16px #10b981',
          zIndex: 40,
          opacity: relFrame > 15 && relFrame < 200 ? 0.8 : 0,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
