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
      {/* Scene 01: Genesis & The Human Friction Reality (0 - 4.6s / 0 - 140 frames) */}
      <Sequence from={SCENE_RANGES.genesis.start} durationInFrames={SCENE_RANGES.genesis.duration}>
        <SceneHook />
      </Sequence>

      {/* Scene 02: Full-Bleed Edge-to-Edge Diagnostic Cockpit (4.6 - 10.6s / 140 - 320 frames) */}
      <Sequence from={SCENE_RANGES.auditEngine.start} durationInFrames={SCENE_RANGES.auditEngine.duration}>
        <SceneSystemCore />
      </Sequence>

      {/* Scene 03: Apple-Style Pattern Interrupt Typography Slam (10.6 - 15.3s / 320 - 460 frames) */}
      <Sequence
        from={SCENE_RANGES.patternInterrupt.start}
        durationInFrames={SCENE_RANGES.patternInterrupt.duration}
      >
        <SceneTransformation />
      </Sequence>

      {/* Scene 04: The Autonomous Kernel in Production (15.3 - 22.6s / 460 - 680 frames) */}
      <Sequence
        from={SCENE_RANGES.autonomousRuntime.start}
        durationInFrames={SCENE_RANGES.autonomousRuntime.duration}
      >
        <SceneAssemblyLine />
      </Sequence>

      {/* Scene 05: Mathematical Logo Lockup & Grand Finale (22.6 - 30s / 680 - 900 frames) */}
      <Sequence
        from={SCENE_RANGES.climax.start}
        durationInFrames={SCENE_RANGES.climax.duration}
      >
        <SceneSovereignHandover />
      </Sequence>

      {/* Global Dark Glass Telemetry HUD */}
      <TelemetryHud />
    </AbsoluteFill>
  );
};
