import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';

const AUDIT_TARGETS = [
  { id: 'TGT_01', label: 'Manual WhatsApp Lead Triage', fix: 'Autonomous AI Qualification Engine', status: 'AUDITED' },
  { id: 'TGT_02', label: 'Cross-System Copy-Pasting', fix: 'Real-time Webhook Event Pipeline', status: 'AUTOMATED' },
  { id: 'TGT_03', label: 'Multi-Day Approval Delays', fix: 'Self-Executing Business Logic Rules', status: 'OPTIMIZED' },
];

export const SceneSystemCore: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = frame; // In Remotion Sequence, 0 to 150

  // Rotation math for scanner reticles
  const rot1 = relFrame * 1.2;
  const rot2 = -relFrame * 0.8;
  const rot3 = relFrame * 2.2;

  // Scanner sweep laser
  const laserAngle = (relFrame * 4) % 360;

  // Headline entrance
  const headlineSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Exit towards Scene 3
  const exitZoom = interpolate(relFrame, [130, 150], [1, 1.2], { extrapolateLeft: 'clamp' });
  const exitOpacity = interpolate(relFrame, [135, 150], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#040507',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exitOpacity,
        transform: `scale(${exitZoom})`,
        overflow: 'hidden',
      }}
    >
      <CinematicBackground accentColor="#06b6d4" />

      {/* Centerpiece Cybernetic Radar & Scanner */}
      <div
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.65,
        }}
      >
        {/* Outer Ring with Compass Ticks */}
        <div
          style={{
            position: 'absolute',
            width: '640px',
            height: '640px',
            borderRadius: '50%',
            border: '1px dashed rgba(6, 182, 212, 0.4)',
            transform: `rotate(${rot1}deg)`,
          }}
        />

        {/* Counter Ring */}
        <div
          style={{
            position: 'absolute',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.08)',
            transform: `rotate(${rot2}deg)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-8px',
              left: '50%',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: '#06b6d4',
              boxShadow: '0 0 20px #06b6d4',
            }}
          />
        </div>

        {/* Inner High Speed Ring */}
        <div
          style={{
            position: 'absolute',
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            border: '1.5px solid rgba(16, 185, 129, 0.4)',
            transform: `rotate(${rot3}deg)`,
          }}
        />

        {/* Radar Scanner Beam (Conic Gradient) */}
        <div
          style={{
            position: 'absolute',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            background: `conic-gradient(from ${laserAngle}deg, rgba(6, 182, 212, 0.3) 0deg, transparent 60deg, transparent 360deg)`,
            pointerEvents: 'none',
          }}
        />

        {/* Center Target Core */}
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(4, 5, 7, 0.95) 70%)',
            border: '2px solid #06b6d4',
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '11px',
              fontWeight: 800,
              color: '#06b6d4',
              letterSpacing: '0.15em',
            }}
          >
            VISTAR
          </div>
          <div
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '9px',
              color: 'rgba(255, 255, 255, 0.6)',
              marginTop: '4px',
            }}
          >
            OPTICAL AUDIT
          </div>
        </div>
      </div>

      {/* Kinetic Headline */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          textAlign: 'center',
          maxWidth: '1200px',
          padding: '0 40px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 18px',
            borderRadius: '999px',
            background: 'rgba(6, 182, 212, 0.1)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            color: '#06b6d4',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '12px',
            letterSpacing: '0.15em',
            marginBottom: '24px',
          }}
        >
          <span>STAGE 01 // OPERATIONAL DECONSTRUCTION</span>
        </div>

        <h2
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '68px',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#ECEEF5',
            margin: 0,
            transform: `scale(${headlineSpring})`,
            textShadow: '0 10px 40px rgba(0, 0, 0, 0.9)',
          }}
        >
          WE EXAMINE HOW YOUR COMPANY
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ACTUALLY FUNCTIONS.
          </span>
        </h2>

        <p
          style={{
            marginTop: '20px',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '17px',
            color: 'rgba(255, 255, 255, 0.7)',
            letterSpacing: '0.05em',
          }}
        >
          Tracing every information pathway. Isolating every human drag point.
        </p>

        {/* 3 Staggered Audit Target Pills */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginTop: '44px',
            textAlign: 'left',
          }}
        >
          {AUDIT_TARGETS.map((target, idx) => {
            const pillSpring = spring({
              frame: relFrame - 25 - idx * 12,
              fps,
              config: { damping: 14, stiffness: 120 },
            });

            return (
              <div
                key={target.id}
                style={{
                  background: 'rgba(13, 14, 21, 0.85)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '14px',
                  padding: '16px 20px',
                  backdropFilter: 'blur(16px)',
                  transform: `translateY(${interpolate(pillSpring, [0, 1], [30, 0])}px)`,
                  opacity: pillSpring,
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '11px',
                    color: '#06b6d4',
                    marginBottom: '8px',
                    fontWeight: 700,
                  }}
                >
                  <span>{target.id}</span>
                  <span style={{ color: '#10b981' }}>{target.status}</span>
                </div>
                <div
                  style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#ECEEF5',
                  }}
                >
                  {target.label}
                </div>
                <div
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginTop: '4px',
                  }}
                >
                  → {target.fix}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
