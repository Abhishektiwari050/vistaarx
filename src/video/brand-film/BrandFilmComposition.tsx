import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { BRAND_TOKENS, SCENE_RANGES } from './constants';
import { SceneHook } from './scenes/SceneHook';
import { SceneSystemCore } from './scenes/SceneSystemCore';
import { SceneTransformation } from './scenes/SceneTransformation';
import { SceneAssemblyLine } from './scenes/SceneAssemblyLine';
import { SceneSovereignHandover } from './scenes/SceneSovereignHandover';

export const BrandFilmComposition: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_TOKENS.colors.bgVoid,
        color: BRAND_TOKENS.colors.platinumPure,
        overflow: 'hidden',
        fontFamily: BRAND_TOKENS.typography.fontDisplay,
      }}
    >
      {/* Act 01: Entropy & The Sonic Fracture (0 - 5.3s / 0 - 160 frames) */}
      <Sequence from={SCENE_RANGES.entropy.start} durationInFrames={SCENE_RANGES.entropy.duration}>
        <SceneHook />
      </Sequence>

      {/* Act 02: The Caliper Dissection & Kinetic Audit (5.3 - 11.3s / 160 - 340 frames) */}
      <Sequence
        from={SCENE_RANGES.auditConvergence.start}
        durationInFrames={SCENE_RANGES.auditConvergence.duration}
      >
        <SceneSystemCore />
      </Sequence>

      {/* Act 03: Pure Kinetic Typographic Slam (11.3 - 17.3s / 340 - 520 frames) */}
      <Sequence
        from={SCENE_RANGES.typographicSlam.start}
        durationInFrames={SCENE_RANGES.typographicSlam.duration}
      >
        <SceneTransformation />
      </Sequence>

      {/* Act 04: Hyper-Velocity Operational Warp & Latency Crash (17.3 - 24s / 520 - 720 frames) */}
      <Sequence
        from={SCENE_RANGES.operationalVelocity.start}
        durationInFrames={SCENE_RANGES.operationalVelocity.duration}
      >
        <SceneAssemblyLine />
      </Sequence>

      {/* Act 05: Mathematical Vector Collision & Grand Sovereign Lockup (24 - 30s / 720 - 900 frames) */}
      <Sequence
        from={SCENE_RANGES.grandMonogram.start}
        durationInFrames={SCENE_RANGES.grandMonogram.duration}
      >
        <SceneSovereignHandover />
      </Sequence>
    </AbsoluteFill>
  );
};
