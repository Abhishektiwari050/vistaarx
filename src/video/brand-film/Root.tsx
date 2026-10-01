import React from 'react';
import { Composition } from 'remotion';
import { BrandFilmComposition } from './BrandFilmComposition';
import { VIDEO_CONFIG } from './constants';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VistarBrandFilm"
        component={BrandFilmComposition}
        durationInFrames={VIDEO_CONFIG.totalFrames}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
      <Composition
        id="VistarBrandFilmVertical"
        component={BrandFilmComposition}
        durationInFrames={VIDEO_CONFIG.totalFrames}
        fps={VIDEO_CONFIG.fps}
        width={1080}
        height={1920}
      />
    </>
  );
};
