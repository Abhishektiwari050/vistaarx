import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBackground } from '../components/CinematicBackground';

export const SceneSovereignHandover: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = frame; // 0 to 180

  // Terminal entrance
  const terminalEntrance = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Endcard entrance at relFrame 75
  const endcardEntrance = spring({
    frame: relFrame - 70,
    fps,
    config: { damping: 12, stiffness: 90 },
  });

  const endcardOpacity = interpolate(relFrame, [65, 85], [0, 1], { extrapolateRight: 'clamp' });
  const terminalOpacity = interpolate(relFrame, [65, 85], [1, 0.08], { extrapolateRight: 'clamp' });

  // Light pulse on emblem
  const emblemGlow = Math.sin(relFrame * 0.1) * 0.2 + 0.8;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#040507',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <CinematicBackground accentColor="#10b981" />

      {/* Terminal View (Frames 0 - 75) */}
      <div
        style={{
          position: 'absolute',
          width: '920px',
          background: 'rgba(10, 12, 18, 0.95)',
          border: '1.5px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '18px',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(16, 185, 129, 0.15)',
          backdropFilter: 'blur(24px)',
          overflow: 'hidden',
          transform: `scale(${terminalEntrance})`,
          opacity: terminalOpacity,
          zIndex: 10,
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            padding: '14px 22px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#10b981' }} />
          </div>
          <div
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '0.1em',
            }}
          >
            vistar-terminal // autonomous-deployment.sh
          </div>
          <div style={{ width: 40 }} />
        </div>

        {/* Terminal Body */}
        <div
          style={{
            padding: '28px 32px',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '14px',
            lineHeight: 1.85,
            color: '#ECEEF5',
          }}
        >
          <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            $ vistar audit --analyze enterprise/workflows
          </div>
          <div style={{ color: '#06b6d4' }}>
            [scan] 38 manual friction points isolated • 420 human hours/month burned
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px' }}>
            $ vistar deploy --automations --ai-orchestrator
          </div>
          <div style={{ color: '#10b981', marginTop: '4px' }}>
            ✓ Autonomous AI pipelines deployed across communications & data.
          </div>
          <div style={{ color: '#10b981' }}>
            ✓ 94% Human Toil Eliminated • Real-time Zero-Latency Execution.
          </div>
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '12px',
              marginTop: '10px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '10px',
            }}
          >
            OPERATIONS RUNNING EASIER, FASTER, AND HUMANLESS. 100% SOVEREIGN OWNERSHIP.
          </div>
        </div>
      </div>

      {/* Final Endcard / Grand Brand Climax (relFrame >= 70) */}
      <div
        style={{
          position: 'relative',
          zIndex: 30,
          textAlign: 'center',
          maxWidth: '1200px',
          opacity: endcardOpacity,
          transform: `scale(${endcardEntrance})`,
        }}
      >
        {/* Glowing Geometric Emblem */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '84px',
            height: '84px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%)',
            border: '2px solid #10b981',
            boxShadow: `0 0 50px rgba(16, 185, 129, ${0.4 * emblemGlow}), inset 0 0 30px rgba(16, 185, 129, 0.3)`,
            marginBottom: '28px',
          }}
        >
          <span
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 900,
              fontSize: '36px',
              color: '#ECEEF5',
            }}
          >
            V
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '84px',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            color: '#ECEEF5',
            margin: '0 0 18px 0',
            textShadow: '0 10px 60px rgba(0, 0, 0, 0.9)',
          }}
        >
          VISTAR.TECH
        </h1>

        <p
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '22px',
            fontWeight: 700,
            color: '#10b981',
            letterSpacing: '0.1em',
            margin: '0 0 14px 0',
            textShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
          }}
        >
          MAKING ENTERPRISE OPERATIONS EASIER, FASTER, AND HUMANLESS.
        </p>

        <p
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '15px',
            color: 'rgba(255, 255, 255, 0.6)',
            letterSpacing: '0.06em',
            margin: '0 0 40px 0',
          }}
        >
          ENTERPRISE AUTOMATION INTELLIGENCE • SOVEREIGN SOFTWARE • AI WORKFLOWS
        </p>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px 40px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#040507',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '15px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            boxShadow: '0 12px 40px rgba(16, 185, 129, 0.5)',
          }}
        >
          BOOK AN OPERATIONAL AUDIT // CONTACT@VISTAR.TECH
        </div>
      </div>
    </AbsoluteFill>
  );
};
