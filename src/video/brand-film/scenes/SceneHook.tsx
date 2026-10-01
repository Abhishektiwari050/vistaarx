import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_TOKENS } from '../constants';

const MANUAL_BOTTLENECKS = [
  { process: 'Lead Triage & Qualification', cost: '4.8h Latency', impact: '38% Drop-off Rate', top: '24%', left: '20%' },
  { process: 'Cross-Tool Copy-Pasting', cost: '120h / Month', impact: 'Manual Human Errors', top: '34%', left: '74%' },
  { process: 'Customer Support Escalations', cost: '14m Wait Time', impact: 'High Headcount Cost', top: '65%', left: '23%' },
  { process: 'Invoice & Data Reconciliation', cost: '3 Days Delay', impact: 'Operational Choke Point', top: '70%', left: '70%' },
  { process: 'Routine Approval Telephones', cost: 'Stalled Growth', impact: 'Human Dependency Trap', top: '18%', left: '50%' },
];

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrances
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 25], [30, 0], { extrapolateRight: 'clamp' });

  // Floating turbulence
  const driftAmount = Math.sin(frame / 10) * 8;
  const alertPulse = (Math.sin(frame / 6) + 1) / 2;

  // Exit transition towards Scene 2
  const exitScale = interpolate(frame, [75, 90], [1, 0.92], { extrapolateLeft: 'clamp' });
  const exitOpacity = interpolate(frame, [80, 90], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Background subtle technical grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.6,
        }}
      />

      {/* Floating Manual Bottleneck Nodes */}
      {MANUAL_BOTTLENECKS.map((item, index) => {
        const nodeEntrance = spring({
          frame: frame - index * 6,
          fps,
          config: { damping: 14, stiffness: 90 },
        });

        const jitter = Math.sin(frame * 0.3 + index) * 3;

        return (
          <div
            key={item.process}
            style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
              transform: `translate(-50%, -50%) translateY(${driftAmount + jitter}px) scale(${nodeEntrance})`,
              opacity: nodeEntrance,
              background: 'rgba(20, 22, 34, 0.8)',
              border: `1px solid rgba(239, 68, 68, ${0.25 + alertPulse * 0.3})`,
              boxShadow: `0 8px 32px rgba(239, 68, 68, ${0.05 + alertPulse * 0.1})`,
              borderRadius: '12px',
              padding: '16px 20px',
              minWidth: '240px',
              backdropFilter: 'blur(12px)',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}
            >
              <span
                style={{
                  fontFamily: BRAND_TOKENS.typography.fontSans,
                  fontWeight: 600,
                  fontSize: '13px',
                  color: BRAND_TOKENS.colors.textPrimary,
                }}
              >
                {item.process}
              </span>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: BRAND_TOKENS.colors.accentCrimson,
                  boxShadow: `0 0 8px ${BRAND_TOKENS.colors.accentCrimson}`,
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: BRAND_TOKENS.typography.fontMono,
                fontSize: '11px',
                color: BRAND_TOKENS.colors.textTertiary,
              }}
            >
              <span style={{ color: BRAND_TOKENS.colors.accentCrimson, fontWeight: 600 }}>{item.cost}</span>
              <span>{item.impact}</span>
            </div>
          </div>
        );
      })}

      {/* Hero Headline Centerpiece */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '1100px',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '999px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: BRAND_TOKENS.colors.accentCrimson,
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '12px',
            letterSpacing: '0.15em',
            marginBottom: '28px',
          }}
        >
          <span>OPERATIONAL DIAGNOSTIC // THE HUMAN BOTTLENECK</span>
        </div>

        <h1
          style={{
            fontFamily: BRAND_TOKENS.typography.fontSans,
            fontSize: '56px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: BRAND_TOKENS.colors.textPrimary,
            margin: 0,
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.8)',
          }}
        >
          MOST ENTERPRISES EMPLOY HUMANS AS
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            GLUE BETWEEN DISJOINTED SOFTWARE.
          </span>
        </h1>

        <p
          style={{
            marginTop: '22px',
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '16px',
            color: BRAND_TOKENS.colors.textSecondary,
            letterSpacing: '0.04em',
          }}
        >
          Manual triage. Mechanical copy-pasting. Constant human toil slowing your revenue.
        </p>
      </div>
    </AbsoluteFill>
  );
};
