import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';

const METHOD_STAGES = [
  {
    step: 'STAGE 01',
    metric: '100% VISIBILITY',
    title: 'Operational Deep-Dive & Friction Mapping',
    details: 'We embed into your workflows to expose hidden data choke points, redundant human handoffs, and mechanical tasks burning high payroll.',
  },
  {
    step: 'STAGE 02',
    metric: 'AI-DIRECTED',
    title: 'Autonomous Software & AI Synthesis',
    details: 'We architect and deploy custom automations, intelligent AI workers, and webhook engines that execute repetitive decisions instantly.',
  },
  {
    step: 'STAGE 03',
    metric: '10X SCALE',
    title: 'Humanless Execution & Sovereignty',
    details: 'Your enterprise runs faster, smoother, and virtually humanless with 100% private codebase ownership and zero recurring retainer locks.',
  },
];

export const SceneAssemblyLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = frame; // 0 to 240

  // Entrance
  const entrance = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  // Animated progress bar: 0% to 100%
  const progress = interpolate(relFrame, [10, 160], [0, 100], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Exit towards Scene 5
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

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '44px', zIndex: 20 }}>
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
          THE VISTAR METHOD // ARCHITECTURAL BLUEPRINT
        </div>

        <h2
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '56px',
            fontWeight: 900,
            margin: 0,
            color: '#ECEEF5',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}
        >
          RE-ENGINEERING ENTERPRISES
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 50px rgba(16, 185, 129, 0.5)',
            }}
          >
            FOR HUMANLESS SCALE.
          </span>
        </h2>

        <p
          style={{
            marginTop: '16px',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.65)',
            letterSpacing: '0.04em',
          }}
        >
          We audit your operations. We engineer the automations. Software does the work.
        </p>
      </div>

      {/* 3 High-Density Chronological Glass Cyber-Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '28px',
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 20,
        }}
      >
        {METHOD_STAGES.map((stage, idx) => {
          const cardSpring = spring({
            frame: relFrame - idx * 16,
            fps,
            config: { damping: 14, stiffness: 120 },
          });

          const isActive = relFrame >= idx * 40;

          return (
            <div
              key={stage.step}
              style={{
                background: 'rgba(13, 14, 21, 0.9)',
                border: `1.5px solid ${
                  isActive ? 'rgba(16, 185, 129, 0.5)' : 'rgba(255, 255, 255, 0.08)'
                }`,
                borderRadius: '20px',
                padding: '36px',
                transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px)`,
                opacity: cardSpring,
                boxShadow: isActive
                  ? '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(16, 185, 129, 0.15)'
                  : '0 10px 40px rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(24px)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#10b981',
                    letterSpacing: '0.15em',
                  }}
                >
                  {stage.step}
                </span>
                <span
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#06b6d4',
                    background: 'rgba(6, 182, 212, 0.12)',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    border: '1px solid rgba(6, 182, 212, 0.25)',
                  }}
                >
                  {stage.metric}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '22px',
                  fontWeight: 800,
                  color: '#ECEEF5',
                  margin: '0 0 14px 0',
                  lineHeight: 1.2,
                }}
              >
                {stage.title}
              </h3>

              <p
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '13px',
                  lineHeight: '1.7',
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0,
                }}
              >
                {stage.details}
              </p>
            </div>
          );
        })}
      </div>

      {/* Global Laser Progress Track */}
      <div
        style={{
          maxWidth: '1400px',
          width: '100%',
          margin: '40px auto 0 auto',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '999px',
          height: '6px',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 20,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
