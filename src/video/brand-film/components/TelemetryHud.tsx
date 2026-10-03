import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BRAND_TOKENS, SCENE_RANGES } from '../constants';
import { VistarLogoMark } from './VistarLogoMark';

export const TelemetryHud: React.FC = () => {
  const frame = useCurrentFrame();

  let phaseLabel = '01 // GENESIS & FRICTION';
  if (frame >= SCENE_RANGES.auditEngine.start && frame < SCENE_RANGES.auditEngine.end) {
    phaseLabel = '02 // OPERATIONAL AUDIT COCKPIT';
  } else if (frame >= SCENE_RANGES.patternInterrupt.start && frame < SCENE_RANGES.patternInterrupt.end) {
    phaseLabel = '03 // ARCHITECTURAL CONVICTION';
  } else if (frame >= SCENE_RANGES.autonomousRuntime.start && frame < SCENE_RANGES.autonomousRuntime.end) {
    phaseLabel = '04 // AUTONOMOUS KERNEL IN PRODUCTION';
  } else if (frame >= SCENE_RANGES.climax.start) {
    phaseLabel = '05 // THE HUMANLESS HORIZON';
  }

  const seconds = Math.floor(frame / 30);
  const subFrames = frame % 30;
  const timecode = `00:${String(seconds).padStart(2, '0')}:${String(subFrames).padStart(2, '0')}`;
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
          borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
          paddingBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <VistarLogoMark
            size={18}
            color="#FFFFFF"
            centerColor="#FF3823"
            pulse={Math.sin(frame * 0.08) * 0.05 + 1}
          />
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
              padding: '4px 14px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '999px',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: BRAND_TOKENS.colors.accentCoral,
                boxShadow: '0 0 8px rgba(255, 56, 35, 0.6)',
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
          borderTop: '1px solid rgba(255, 255, 255, 0.07)',
          paddingTop: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span>
            TARGET: <strong style={{ color: BRAND_TOKENS.colors.textPrimary }}>ENTERPRISE SCALE</strong>
          </span>
          <span style={{ color: BRAND_TOKENS.colors.textTertiary }}>•</span>
          <span>
            EXECUTION: <strong style={{ color: BRAND_TOKENS.colors.accentEmerald }}>AUTONOMOUS ZERO-TOIL</strong>
          </span>
        </div>

        {/* Global Progress Track */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '180px',
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                backgroundColor: BRAND_TOKENS.colors.accentCoral,
                boxShadow: '0 0 10px rgba(255, 56, 35, 0.7)',
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
