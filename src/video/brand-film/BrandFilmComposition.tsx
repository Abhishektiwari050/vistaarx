import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { BRAND_TOKENS, SCENE_RANGES } from './constants';
import { TelemetryHud } from './components/TelemetryHud';
import { SceneHook } from './scenes/SceneHook';
import { SceneSystemCore } from './scenes/SceneSystemCore';
import { SceneTransformation } from './scenes/SceneTransformation';
import { SceneAssemblyLine } from './scenes/SceneAssemblyLine';
import { SceneSovereignHandover } from './scenes/SceneSovereignHandover';

export const BrandFilmComposition: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bg,
        color: BRAND_TOKENS.colors.textPrimary,
        overflow: 'hidden',
        fontFamily: BRAND_TOKENS.typography.fontBody,
      }}
    >
      {/* Scene 01: The Operational Friction & Human Glue (0 - 5.3s / 0 - 160 frames) */}
      <Sequence from={SCENE_RANGES.friction.start} durationInFrames={SCENE_RANGES.friction.duration}>
        <SceneHook />
      </Sequence>

      {/* Scene 02: Deep Operational Audit & Workflow Diagnostics (5.3 - 11.3s / 160 - 340 frames) */}
      <Sequence from={SCENE_RANGES.audit.start} durationInFrames={SCENE_RANGES.audit.duration}>
        <SceneSystemCore />
      </Sequence>

      {/* Scene 03: The Autonomous Engine in Action (11.3 - 18.3s / 340 - 550 frames) */}
      <Sequence
        from={SCENE_RANGES.autonomousEngine.start}
        durationInFrames={SCENE_RANGES.autonomousEngine.duration}
      >
        <SceneTransformation />
      </Sequence>

      {/* Scene 04: Three Pillars of Autonomous Scale (18.3 - 24.6s / 550 - 740 frames) */}
      <Sequence
        from={SCENE_RANGES.pillars.start}
        durationInFrames={SCENE_RANGES.pillars.duration}
      >
        <SceneAssemblyLine />
      </Sequence>

      {/* Scene 05: The Humanless Enterprise Climax & Brand Lockup (24.6 - 30s / 740 - 900 frames) */}
      <Sequence
        from={SCENE_RANGES.climax.start}
        durationInFrames={SCENE_RANGES.climax.duration}
      >
        <SceneSovereignHandover />
      </Sequence>

      {/* Global Editorial HUD Overlay */}
      <TelemetryHud />
    </AbsoluteFill>
  );
};
