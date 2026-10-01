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
      {/* Scene 01: The Hook (0 - 3s / 0 - 90 frames) */}
      <Sequence from={SCENE_RANGES.hook.start} durationInFrames={SCENE_RANGES.hook.duration}>
        <SceneHook />
      </Sequence>

      {/* Scene 02: System Core Reveal (3 - 8s / 90 - 240 frames) */}
      <Sequence from={SCENE_RANGES.core.start} durationInFrames={SCENE_RANGES.core.duration}>
        <SceneSystemCore />
      </Sequence>

      {/* Scene 03: The Transformation (8 - 16s / 240 - 480 frames) */}
      <Sequence
        from={SCENE_RANGES.transformation.start}
        durationInFrames={SCENE_RANGES.transformation.duration}
      >
        <SceneTransformation />
      </Sequence>

      {/* Scene 04: The 14-Day Assembly Line (16 - 24s / 480 - 720 frames) */}
      <Sequence
        from={SCENE_RANGES.assembly.start}
        durationInFrames={SCENE_RANGES.assembly.duration}
      >
        <SceneAssemblyLine />
      </Sequence>

      {/* Scene 05: Sovereign Handover & Final Endcard (24 - 30s / 720 - 900 frames) */}
      <Sequence
        from={SCENE_RANGES.handover.start}
        durationInFrames={SCENE_RANGES.handover.duration}
      >
        <SceneSovereignHandover />
      </Sequence>

      {/* Global Telemetry HUD Overlay */}
      <TelemetryHud />
    </AbsoluteFill>
  );
};
