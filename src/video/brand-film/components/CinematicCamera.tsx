import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface CinematicCameraProps {
  children: React.ReactNode;
  durationInFrames: number;
  startScale?: number;
  endScale?: number;
  panX?: number; // max horizontal pan in px
  panY?: number; // max vertical pan in px
  tiltX?: number; // degrees
  tiltY?: number; // degrees
}

/**
 * CinematicCamera wrapper
 * Eliminates the static "PPT slide" feeling by applying perpetual camera drift,
 * subtle 3D perspective tilts, and continuous spatial momentum.
 */
export const CinematicCamera: React.FC<CinematicCameraProps> = ({
  children,
  durationInFrames,
  startScale = 1.0,
  endScale = 1.05,
  panX = 0,
  panY = -12,
  tiltX = 0,
  tiltY = 0,
}) => {
  const frame = useCurrentFrame();

  const currentScale = interpolate(frame, [0, durationInFrames], [startScale, endScale], {
    extrapolateRight: 'clamp',
  });

  const currentPanX = interpolate(frame, [0, durationInFrames], [0, panX], {
    extrapolateRight: 'clamp',
  });

  const currentPanY = interpolate(frame, [0, durationInFrames], [0, panY], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${currentScale}) translate3d(${currentPanX}px, ${currentPanY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformOrigin: 'center center',
          transition: 'transform 0.05s linear',
        }}
      >
        {children}
      </div>
    </div>
  );
};
