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
          THE TRANSFORMATION
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
          FROM FRAGMENTED CHAOS TO UNIFIED VELOCITY
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
        {/* Left: The Old Agency / Fragmented Stack */}
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
              TRADITIONAL / DISJOINTED
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
              HIGH FRICTION
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
                Lost Inbound Leads
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#959CB3',
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  marginTop: '4px',
                }}
              >
                Manual WhatsApp replies • 40% bounce rate before response
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
                Agency Retainer Lock-in
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#959CB3',
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  marginTop: '4px',
                }}
              >
                3-6 month delays • Junior developer games • Code withheld
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
                Fragile Webhooks
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#959CB3',
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  marginTop: '4px',
                }}
              >
                Broken automations • Stale Google Sheets • 3,400ms latency
              </div>
            </div>
          </div>
        </div>

        {/* Right: The VISTAR Unified Engine */}
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
              VISTAR ARCHITECTURE
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
              100% SOVEREIGN
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
                AutoLead WhatsApp Engine
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#959CB3',
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  marginTop: '4px',
                }}
              >
                Instant 24/7 AI qualification • Zero lead leakage • CRM auto-sync
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
                14-Day Production Sprints
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#959CB3',
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  marginTop: '4px',
                }}
              >
                Direct founder engineering • Fixed milestones • No account managers
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
                Complete Code Sovereignty
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#959CB3',
                  fontFamily: BRAND_TOKENS.typography.fontMono,
                  marginTop: '4px',
                }}
              >
                100% GitHub repository transfer • Zero ongoing license traps • 18ms latency
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
