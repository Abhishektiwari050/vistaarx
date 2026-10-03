import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';

export const SceneTransformation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = frame; // 0 to 240

  // Entrance spring
  const entrance = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Dynamic sweep of the laser divider (starts at 50%, sweeps to reveal the emerald engine)
  const laserX = interpolate(relFrame, [10, 80, 160], [50, 25, 10], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Ticking metrics
  const humanToil = Math.floor(interpolate(relFrame, [20, 120], [84, 6], { extrapolateRight: 'clamp' }));
  const speedup = Math.floor(interpolate(relFrame, [20, 140], [1, 180], { extrapolateRight: 'clamp' }));

  // Exit towards Scene 4
  const exitOpacity = interpolate(relFrame, [225, 240], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#040507',
        opacity: exitOpacity,
        transform: `scale(${entrance})`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 80px',
        overflow: 'hidden',
      }}
    >
      <CinematicBackground accentColor="#10b981" />

      {/* Scene Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px', zIndex: 20 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '999px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            color: '#10b981',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '12px',
            letterSpacing: '0.15em',
            marginBottom: '14px',
          }}
        >
          THE TRANSFORMATION // THE MONEY SHOT
        </div>

        <h2
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '56px',
            fontWeight: 900,
            margin: 0,
            color: '#ECEEF5',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          SOFTWARE DOES THE WORK.
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 50px rgba(16, 185, 129, 0.5)',
            }}
          >
            FASTER. EASIER. HUMANLESS.
          </span>
        </h2>
      </div>

      {/* Side-by-Side High-Voltage Comparison */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '36px',
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 20,
        }}
      >
        {/* Left: The Human-Choked Workflow */}
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.03)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '20px',
            padding: '36px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(239, 68, 68, 0.05)',
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
                fontFamily: 'ui-monospace, monospace',
                fontSize: '12px',
                color: '#ef4444',
                fontWeight: 800,
                letterSpacing: '0.15em',
              }}
            >
              HUMAN-CHOKED WORKFLOW
            </span>
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '13px',
                fontWeight: 700,
                color: '#ef4444',
                background: 'rgba(239, 68, 68, 0.12)',
                padding: '4px 12px',
                borderRadius: '999px',
              }}
            >
              {humanToil}% MANUAL TOIL
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                padding: '18px',
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '12px',
                borderLeft: '4px solid #ef4444',
              }}
            >
              <div style={{ fontWeight: 700, color: '#ECEEF5', fontSize: '16px' }}>
                Manual Customer Inbound & Qualification
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontFamily: 'ui-monospace, monospace',
                  marginTop: '6px',
                }}
              >
                Human reps typing replies all day • 4.8h response delay • 42% lost leads
              </div>
            </div>

            <div
              style={{
                padding: '18px',
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '12px',
                borderLeft: '4px solid #ef4444',
              }}
            >
              <div style={{ fontWeight: 700, color: '#ECEEF5', fontSize: '16px' }}>
                Mechanical Data Entry & Reconciliation
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontFamily: 'ui-monospace, monospace',
                  marginTop: '6px',
                }}
              >
                Copy-pasting between CRMs, ERPs, and Sheets • Frequent human errors
              </div>
            </div>

            <div
              style={{
                padding: '18px',
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '12px',
                borderLeft: '4px solid #ef4444',
              }}
            >
              <div style={{ fontWeight: 700, color: '#ECEEF5', fontSize: '16px' }}>
                Growth Requires Adding Headcount
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontFamily: 'ui-monospace, monospace',
                  marginTop: '6px',
                }}
              >
                Scaling volume breaks staff • Massive payroll overhead • Operational gridlock
              </div>
            </div>
          </div>
        </div>

        {/* Right: The VISTAR Autonomous Architecture */}
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.04)',
            border: '1.5px solid rgba(16, 185, 129, 0.5)',
            borderRadius: '20px',
            padding: '36px',
            backdropFilter: 'blur(20px)',
            boxShadow:
              '0 24px 80px rgba(0, 0, 0, 0.8), 0 0 60px rgba(16, 185, 129, 0.15), inset 0 0 40px rgba(16, 185, 129, 0.08)',
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
                fontFamily: 'ui-monospace, monospace',
                fontSize: '12px',
                color: '#10b981',
                fontWeight: 800,
                letterSpacing: '0.15em',
              }}
            >
              VISTAR AUTONOMOUS SYSTEM
            </span>
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '13px',
                fontWeight: 800,
                color: '#10b981',
                background: 'rgba(16, 185, 129, 0.15)',
                padding: '4px 12px',
                borderRadius: '999px',
                boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)',
              }}
            >
              {speedup}X EXECUTION VELOCITY
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                padding: '18px',
                background: 'rgba(13, 14, 21, 0.85)',
                borderRadius: '12px',
                borderLeft: '4px solid #10b981',
              }}
            >
              <div style={{ fontWeight: 700, color: '#ECEEF5', fontSize: '16px' }}>
                Autonomous AI Lead Execution
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: 'ui-monospace, monospace',
                  marginTop: '6px',
                }}
              >
                Instant 24/7 AI qualification • Automated WhatsApp closing in 12s • Zero delay
              </div>
            </div>

            <div
              style={{
                padding: '18px',
                background: 'rgba(13, 14, 21, 0.85)',
                borderRadius: '12px',
                borderLeft: '4px solid #10b981',
              }}
            >
              <div style={{ fontWeight: 700, color: '#ECEEF5', fontSize: '16px' }}>
                Self-Operating Data Pipelines
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: 'ui-monospace, monospace',
                  marginTop: '6px',
                }}
              >
                Event-driven synchronization across tools • Zero manual entry • 100% data fidelity
              </div>
            </div>

            <div
              style={{
                padding: '18px',
                background: 'rgba(13, 14, 21, 0.85)',
                borderRadius: '12px',
                borderLeft: '4px solid #10b981',
              }}
            >
              <div style={{ fontWeight: 700, color: '#ECEEF5', fontSize: '16px' }}>
                10x Scale Without Headcount
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: 'ui-monospace, monospace',
                  marginTop: '6px',
                }}
              >
                Software absorbs 100x transaction volume • Humans only supervise strategic growth
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Laser Wipe Blade */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${laserX}%`,
          width: '3px',
          background: 'linear-gradient(to bottom, transparent, #10b981, #06b6d4, transparent)',
          boxShadow: '0 0 30px #10b981, 0 0 10px #fff',
          zIndex: 40,
          opacity: 0.9,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
