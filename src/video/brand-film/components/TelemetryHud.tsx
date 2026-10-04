import React from 'react';
import { useCurrentFrame } from 'remotion';
import { BRAND_TOKENS, SCENE_RANGES } from '../constants';
import { VistarLogoMark } from './VistarLogoMark';

export const TelemetryHud: React.FC = () => {
  const frame = useCurrentFrame();

  let phaseLabel = '01 // ENTROPY & FRICTION';
  if (frame >= SCENE_RANGES.auditConvergence.start && frame < SCENE_RANGES.auditConvergence.end) {
    phaseLabel = '02 // CALIPER AUDIT & CONVERGENCE';
  } else if (frame >= SCENE_RANGES.typographicSlam.start && frame < SCENE_RANGES.typographicSlam.end) {
    phaseLabel = '03 // ARCHITECTURAL CONVICTION';
  } else if (frame >= SCENE_RANGES.operationalVelocity.start && frame < SCENE_RANGES.operationalVelocity.end) {
    phaseLabel = '04 // OPERATIONAL VELOCITY';
  } else if (frame >= SCENE_RANGES.grandMonogram.start) {
    phaseLabel = '05 // SOVEREIGN LOCKUP';
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
        padding: '32px 48px',
        fontFamily: BRAND_TOKENS.typography.fontMono,
        fontSize: '11px',
        letterSpacing: '0.14em',
        color: BRAND_TOKENS.colors.titaniumMid,
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <VistarLogoMark
            size={18}
            convergence={1}
            wireframe={false}
          />
          <span
            style={{
              fontFamily: BRAND_TOKENS.typography.fontDisplay,
              fontWeight: 800,
              fontSize: '14px',
              letterSpacing: '0.08em',
              color: BRAND_TOKENS.colors.platinumPure,
            }}
          >
            VISTAR
          </span>
          <span style={{ color: BRAND_TOKENS.colors.titaniumDark }}>/</span>
          <span style={{ color: BRAND_TOKENS.colors.titaniumLight, fontSize: '10px' }}>
            ENTERPRISE OPERATIONAL INTELLIGENCE
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              backdropFilter: 'blur(16px)',
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                backgroundColor: BRAND_TOKENS.colors.platinumPure,
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
              }}
            />
            <span style={{ fontWeight: 600, color: BRAND_TOKENS.colors.platinumPure, fontSize: '10px' }}>
              {phaseLabel}
            </span>
          </div>

          <span
            style={{
              fontVariantNumeric: 'tabular-nums',
              color: BRAND_TOKENS.colors.platinumLiquid,
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
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
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '10px' }}>
          <span>
            SCOPE: <strong style={{ color: BRAND_TOKENS.colors.platinumPure }}>ENTERPRISE TOPOLOGY</strong>
          </span>
          <span style={{ color: BRAND_TOKENS.colors.titaniumDark }}>|</span>
          <span>
            STATUS: <strong style={{ color: BRAND_TOKENS.colors.titaniumLight }}>AUTONOMOUS EXECUTION</strong>
          </span>
          <span style={{ color: BRAND_TOKENS.colors.titaniumDark }}>|</span>
          <span>
            HUMAN FRICTION: <strong style={{ color: BRAND_TOKENS.colors.platinumPure }}>ZERO</strong>
          </span>
        </div>

        {/* Global Progress Track */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '160px',
              height: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #6E768E, #FFFFFF)',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
              }}
            />
            {/* Diamond Head */}
            <div
              style={{
                position: 'absolute',
                left: `${progressPercent}%`,
                top: '-3px',
                width: '8px',
                height: '8px',
                backgroundColor: BRAND_TOKENS.colors.platinumPure,
                transform: 'translateX(-50%) rotate(45deg)',
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)',
              }}
            />
          </div>
          <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: '38px', color: BRAND_TOKENS.colors.platinumPure }}>
            {Math.floor(progressPercent)}%
          </span>
        </div>
      </div>
    </div>
  );
};
