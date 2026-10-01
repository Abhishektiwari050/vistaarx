import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_TOKENS } from '../constants';

export const SceneSovereignHandover: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Relative frame (0 to 180)
  const relFrame = Math.max(0, frame - 720);

  // Terminal entrance
  const terminalEntrance = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Endcard entrance at relFrame 90 (27s)
  const endcardEntrance = spring({
    frame: relFrame - 80,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const endcardOpacity = interpolate(relFrame, [75, 95], [0, 1], { extrapolateRight: 'clamp' });
  const terminalOpacity = interpolate(relFrame, [75, 95], [1, 0.15], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Subtle Radial Pulse */}
      <div
        style={{
          position: 'absolute',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Terminal View (Frames 720 - 810) */}
      <div
        style={{
          position: 'absolute',
          width: '860px',
          background: 'rgba(13, 14, 21, 0.95)',
          border: `1px solid ${BRAND_TOKENS.colors.borderActive}`,
          borderRadius: '14px',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 30px rgba(16, 185, 129, 0.1)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          transform: `scale(${terminalEntrance})`,
          opacity: terminalOpacity,
          zIndex: 10,
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            padding: '12px 18px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderBottom: `1px solid ${BRAND_TOKENS.colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
          </div>
          <div
            style={{
              fontFamily: BRAND_TOKENS.typography.fontMono,
              fontSize: '11px',
              color: BRAND_TOKENS.colors.textTertiary,
            }}
          >
            vistar-operational-terminal // execute-autonomy.sh
          </div>
          <div style={{ width: 40 }} />
        </div>

        {/* Terminal Body */}
        <div
          style={{
            padding: '24px 28px',
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '13px',
            lineHeight: 1.8,
            color: BRAND_TOKENS.colors.textPrimary,
          }}
        >
          <div style={{ color: BRAND_TOKENS.colors.textSecondary }}>
            $ vistar audit --analyze enterprise/workflows
          </div>
          <div style={{ color: BRAND_TOKENS.colors.textTertiary }}>
            [scan] 38 manual bottlenecks isolated • 420 human hours/month burned
          </div>
          <div style={{ color: BRAND_TOKENS.colors.textSecondary, marginTop: '4px' }}>
            $ vistar deploy --automations --ai-orchestrator
          </div>
          <div style={{ color: BRAND_TOKENS.colors.accentEmerald, marginTop: '4px' }}>
            ✓ Autonomous AI pipelines deployed across communications & data.
          </div>
          <div style={{ color: BRAND_TOKENS.colors.accentEmerald }}>
            ✓ 94% Human Toil Eliminated • Real-time Zero-Latency Execution.
          </div>
          <div style={{ color: BRAND_TOKENS.colors.textTertiary, fontSize: '11px', marginTop: '6px' }}>
            Operations running easier, faster, and humanless. 100% Client Code Sovereignty.
          </div>
        </div>
      </div>

      {/* Final Endcard / Brand Climax (relFrame >= 80) */}
      <div
        style={{
          position: 'relative',
          zIndex: 30,
          textAlign: 'center',
          maxWidth: '960px',
          opacity: endcardOpacity,
          transform: `scale(${endcardEntrance})`,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
            border: `1.5px solid ${BRAND_TOKENS.colors.accentEmerald}`,
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.35)',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              fontFamily: BRAND_TOKENS.typography.fontSans,
              fontWeight: 900,
              fontSize: '28px',
              color: BRAND_TOKENS.colors.textPrimary,
            }}
          >
            V
          </span>
        </div>

        <h1
          style={{
            fontFamily: BRAND_TOKENS.typography.fontSans,
            fontSize: '64px',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: BRAND_TOKENS.colors.textPrimary,
            margin: '0 0 16px 0',
          }}
        >
          VISTAR.TECH
        </h1>

        <p
          style={{
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '18px',
            color: BRAND_TOKENS.colors.textSecondary,
            letterSpacing: '0.08em',
            margin: '0 0 36px 0',
          }}
        >
          MAKING ENTERPRISE OPERATIONS EASIER, FASTER, AND HUMANLESS.
        </p>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            padding: '12px 32px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#060709',
            fontFamily: BRAND_TOKENS.typography.fontMono,
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
          }}
        >
          BOOK AN OPERATIONAL AUDIT // CONTACT@VISTAR.TECH
        </div>
      </div>
    </AbsoluteFill>
  );
};
