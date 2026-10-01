import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_TOKENS, SCENE_RANGES } from '../constants';

export const TelemetryHud: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Derive current scene tag
  let activeScene = '01 // HOOK';
  if (frame >= SCENE_RANGES.core.start && frame < SCENE_RANGES.core.end) {
    activeScene = '02 // SYSTEM CORE';
  } else if (frame >= SCENE_RANGES.transformation.start && frame < SCENE_RANGES.transformation.end) {
    activeScene = '03 // THE TRANSFORMATION';
  } else if (frame >= SCENE_RANGES.assembly.start && frame < SCENE_RANGES.assembly.end) {
    activeScene = '04 // 14-DAY ASSEMBLY';
  } else if (frame >= SCENE_RANGES.handover.start) {
    activeScene = '05 // SOVEREIGN HANDOVER';
  }

  const seconds = (frame / fps).toFixed(2);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        padding: '36px 48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: BRAND_TOKENS.typography.fontMono,
        fontSize: '12px',
        letterSpacing: '0.12em',
        color: BRAND_TOKENS.colors.textSecondary,
        zIndex: 50,
      }}
    >
      {/* Top Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: `1px solid ${BRAND_TOKENS.colors.border}`,
              padding: '6px 14px',
              borderRadius: '999px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: BRAND_TOKENS.colors.accentEmerald,
                boxShadow: `0 0 10px ${BRAND_TOKENS.colors.accentEmerald}`,
              }}
            />
            <span style={{ fontWeight: 600, color: BRAND_TOKENS.colors.textPrimary }}>
              VISTAR.TECH
            </span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span style={{ color: BRAND_TOKENS.colors.accentEmerald }}>{activeScene}</span>
          </div>

          <div
            style={{
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: `1px solid ${BRAND_TOKENS.colors.border}`,
              borderRadius: '999px',
              fontSize: '11px',
              color: BRAND_TOKENS.colors.textTertiary,
            }}
          >
            ARCH_V4 // PRODUCTION SPEC
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ color: BRAND_TOKENS.colors.textTertiary }}>
            {width}x{height} @ {fps}FPS
          </span>
          <div
            style={{
              fontVariantNumeric: 'tabular-nums',
              background: 'rgba(255, 255, 255, 0.04)',
              border: `1px solid ${BRAND_TOKENS.colors.border}`,
              padding: '6px 14px',
              borderRadius: '999px',
              color: BRAND_TOKENS.colors.textPrimary,
              fontWeight: 600,
            }}
          >
            FRM_{String(frame).padStart(4, '0')} {' // '} {seconds}s
          </div>
        </div>
      </div>

      {/* Crosshair accents in corners */}
      <div
        style={{
          position: 'absolute',
          top: '36px',
          right: '48px',
          width: '12px',
          height: '12px',
          borderRight: `1px solid ${BRAND_TOKENS.colors.borderActive}`,
          borderTop: `1px solid ${BRAND_TOKENS.colors.borderActive}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '48px',
          width: '12px',
          height: '12px',
          borderLeft: `1px solid ${BRAND_TOKENS.colors.borderActive}`,
          borderBottom: `1px solid ${BRAND_TOKENS.colors.borderActive}`,
        }}
      />

      {/* Bottom Footer Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '10px', color: BRAND_TOKENS.colors.textTertiary }}>
            SYSTEM LATENCY
          </div>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color:
                frame < SCENE_RANGES.transformation.start + 60
                  ? BRAND_TOKENS.colors.accentCrimson
                  : BRAND_TOKENS.colors.accentEmerald,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>
              {frame < SCENE_RANGES.transformation.start + 60
                ? '+4,200ms (FRAGMENTED)'
                : '18ms (OPTIMIZED)'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '10px', color: BRAND_TOKENS.colors.textTertiary }}>
            SPRINT CYCLE:
          </span>
          <span
            style={{
              padding: '3px 8px',
              borderRadius: '4px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: BRAND_TOKENS.colors.accentEmerald,
              fontSize: '10px',
              fontWeight: 600,
            }}
          >
            14 DAYS STRICT
          </span>
        </div>
      </div>
    </div>
  );
};
