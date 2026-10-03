import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BRAND_TOKENS, SCENE_RANGES } from '../constants';

export const TelemetryHud: React.FC = () => {
  const frame = useCurrentFrame();

  // Determine current active phase name
  let phaseLabel = '01 // OPERATIONAL FRICTION';
  if (frame >= SCENE_RANGES.audit.start && frame < SCENE_RANGES.audit.end) {
    phaseLabel = '02 // OPERATIONAL AUDIT';
  } else if (frame >= SCENE_RANGES.autonomousEngine.start && frame < SCENE_RANGES.autonomousEngine.end) {
    phaseLabel = '03 // AUTONOMOUS ENGINE';
  } else if (frame >= SCENE_RANGES.pillars.start && frame < SCENE_RANGES.pillars.end) {
    phaseLabel = '04 // ARCHITECTURAL PILLARS';
  } else if (frame >= SCENE_RANGES.climax.start) {
    phaseLabel = '05 // THE HUMANLESS ENTERPRISE';
  }

  // Format timecode (00:SS:FF)
  const seconds = Math.floor(frame / 30);
  const subFrames = frame % 30;
  const timecode = `00:${String(seconds).padStart(2, '0')}:${String(subFrames).padStart(2, '0')}`;

  // Progress bar
  const progressPercent = (frame / 900) * 100;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '36px 48px',
        fontFamily: BRAND_TOKENS.typography.fontMono,
        fontSize: '11px',
        letterSpacing: '0.12em',
        color: BRAND_TOKENS.colors.textSecondary,
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          paddingBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            style={{
              fontFamily: BRAND_TOKENS.typography.fontDisplay,
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '-0.02em',
              color: BRAND_TOKENS.colors.textPrimary,
            }}
          >
            VISTAR
          </span>
          <span style={{ color: BRAND_TOKENS.colors.textTertiary }}>/</span>
          <span style={{ color: BRAND_TOKENS.colors.textSecondary }}>
            ENTERPRISE OPERATIONAL INTELLIGENCE
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '999px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: BRAND_TOKENS.colors.accentCoral,
                display: 'inline-block',
              }}
            />
            <span style={{ fontWeight: 600, color: BRAND_TOKENS.colors.textPrimary }}>
              {phaseLabel}
            </span>
          </div>

          <span style={{ fontVariantNumeric: 'tabular-nums', color: BRAND_TOKENS.colors.textTertiary }}>
            {timecode}
          </span>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          paddingTop: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span>
            TARGET: <strong style={{ color: BRAND_TOKENS.colors.textPrimary }}>ENTERPRISE SCALE</strong>
          </span>
          <span style={{ color: BRAND_TOKENS.colors.textTertiary }}>•</span>
          <span>
            EXECUTION: <strong style={{ color: BRAND_TOKENS.colors.accentEmerald }}>AUTONOMOUS</strong>
          </span>
        </div>

        {/* Global Progress Track */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '180px',
              height: '3px',
              backgroundColor: 'rgba(0, 0, 0, 0.06)',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                backgroundColor: BRAND_TOKENS.colors.accentCoral,
                borderRadius: '999px',
              }}
            />
          </div>
          <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: '40px' }}>
            {Math.floor(progressPercent)}%
          </span>
        </div>
      </div>
    </div>
  );
};
