import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { SCENE_RANGES } from './constants';
import { TelemetryHud } from './components/TelemetryHud';
import { SceneHook } from './scenes/SceneHook';
import { SceneSystemCore } from './scenes/SceneSystemCore';
import { SceneTransformation } from './scenes/SceneTransformation';
import { SceneAssemblyLine } from './scenes/SceneAssemblyLine';
import { SceneSovereignHandover } from './scenes/SceneSovereignHandover';

export const BrandFilmComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#060709', color: '#ECEEF5', overflow: 'hidden' }}>
      {/* Scene 01: Operational Friction & Human Bottleneck (0 - 3s / 0 - 90 frames) */}
      <Sequence from={SCENE_RANGES.diagnostic.start} durationInFrames={SCENE_RANGES.diagnostic.duration}>
        <SceneHook />
      </Sequence>

      {/* Scene 02: Workflow Deconstruction & The VISTAR Eye (3 - 8s / 90 - 240 frames) */}
      <Sequence from={SCENE_RANGES.audit.start} durationInFrames={SCENE_RANGES.audit.duration}>
        <SceneSystemCore />
      </Sequence>

      {/* Scene 03: The Autonomous Transformation (8 - 16s / 240 - 480 frames) */}
      <Sequence
        from={SCENE_RANGES.synthesis.start}
        durationInFrames={SCENE_RANGES.synthesis.duration}
      >
        <SceneTransformation />
      </Sequence>

      {/* Scene 04: The VISTAR 3-Stage Method (16 - 24s / 480 - 720 frames) */}
      <Sequence
        from={SCENE_RANGES.impact.start}
        durationInFrames={SCENE_RANGES.impact.duration}
      >
        <SceneAssemblyLine />
      </Sequence>

      {/* Scene 05: The Humanless Autonomous Enterprise Climax (24 - 30s / 720 - 900 frames) */}
      <Sequence
        from={SCENE_RANGES.climax.start}
        durationInFrames={SCENE_RANGES.climax.duration}
      >
        <SceneSovereignHandover />
      </Sequence>

      {/* Global Telemetry HUD Overlay */}
      <TelemetryHud />
    </AbsoluteFill>
  );
};
