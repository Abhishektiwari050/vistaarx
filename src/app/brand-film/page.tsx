'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { VIDEO_CONFIG, SCENE_RANGES } from '@/video/brand-film/constants';
import { BrandFilmComposition } from '@/video/brand-film/BrandFilmComposition';
import type { PlayerRef } from '@remotion/player';
import Link from 'next/link';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Monitor,
  Smartphone,
  CheckCircle,
  ShieldCheck,
  Zap,
  Code2,
  Film,
  Download,
} from 'lucide-react';

// Dynamically import Player to avoid SSR hydration mismatches
const Player = dynamic(() => import('@remotion/player').then((mod) => mod.Player), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video bg-[#060709] border border-white/10 rounded-xl flex items-center justify-center text-white/40 font-mono text-sm">
      Initializing Remotion Motion Graphics Engine...
    </div>
  ),
});

export default function BrandFilmPage() {
  const playerRef = useRef<PlayerRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [aspectMode, setAspectMode] = useState<'16:9' | '9:16'>('16:9');

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const onFrameUpdate = () => {
      setCurrentFrame(player.getCurrentFrame());
    };

    const onPlayStateChange = () => {
      setIsPlaying(player.isPlaying());
    };

    player.addEventListener('frameupdate', onFrameUpdate);
    player.addEventListener('play', onPlayStateChange);
    player.addEventListener('pause', onPlayStateChange);

    return () => {
      player.removeEventListener('frameupdate', onFrameUpdate);
      player.removeEventListener('play', onPlayStateChange);
      player.removeEventListener('pause', onPlayStateChange);
    };
  }, []);

  const jumpToScene = (startFrame: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(startFrame);
      setCurrentFrame(startFrame);
    }
  };

  const togglePlay = () => {
    if (playerRef.current) {
      if (playerRef.current.isPlaying()) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
    }
  };

  const restartVideo = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      playerRef.current.play();
    }
  };

  const currentSeconds = (currentFrame / VIDEO_CONFIG.fps).toFixed(2);

  const sceneBookmarks = [
    { label: '01: Entropy & Friction', sub: '0.0s - 5.3s', frame: SCENE_RANGES.entropy.start },
    { label: '02: Caliper Audit', sub: '5.3s - 11.3s', frame: SCENE_RANGES.auditConvergence.start },
    { label: '03: Typographic Slam', sub: '11.3s - 17.3s', frame: SCENE_RANGES.typographicSlam.start },
    { label: '04: Operational Velocity', sub: '17.3s - 24.0s', frame: SCENE_RANGES.operationalVelocity.start },
    { label: '05: Sovereign Lockup', sub: '24.0s - 30.0s', frame: SCENE_RANGES.grandMonogram.start },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#ECEEF5] font-sans selection:bg-white/20 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#060709]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded bg-white/5 border border-white/10 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">VISTAR</span>
                <span className="text-white/30">/</span>
                <span className="font-mono text-xs text-white/80 bg-white/5 px-2 py-0.5 rounded border border-white/15">
                  MOTION GRAPHICS FILM
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded p-1 text-xs font-mono">
              <button
                onClick={() => setAspectMode('16:9')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                  aspectMode === '16:9' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> 16:9 Master
              </button>
              <button
                onClick={() => setAspectMode('9:16')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                  aspectMode === '9:16' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> 9:16 Vertical
              </button>
            </div>
            <a
              href="/vistar-brand-film.mp4"
              download="vistar-brand-film.mp4"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 border border-white/25 text-white hover:bg-white/20 text-xs font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Master MP4</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Studio Viewport */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Title & Controls */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded mb-3">
              <Film className="w-3.5 h-3.5 text-white" />
              <span>BESPOKE LUXURY MONOCHROME // 30-SECOND MOTION GRAPHICS</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Enterprise Operational Intelligence & Autonomous Systems
            </h1>
            <p className="text-white/60 font-mono text-sm mt-1">
              We audit how companies function and engineer autonomous software to make work easier, faster, and humanless.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="flex items-center gap-1.5 px-4 py-2 rounded bg-white text-black font-mono text-xs font-semibold hover:bg-white/90 transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>
            <button
              onClick={restartVideo}
              title="Restart Video"
              className="p-2 rounded bg-white/5 border border-white/10 text-white/70 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-2 font-mono text-xs text-white/50 bg-white/5 border border-white/10 px-3 py-2 rounded">
              <span>FRAME:</span>
              <span className="text-white font-semibold">{currentFrame}</span>
              <span className="text-white/20">|</span>
              <span>TIME:</span>
              <span className="text-white font-semibold">{currentSeconds}s / 30.00s</span>
            </div>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="relative rounded-xl overflow-hidden border border-white/15 bg-black shadow-2xl mb-6 flex justify-center">
          <div
            className="w-full flex items-center justify-center transition-all duration-300"
            style={{
              maxWidth: aspectMode === '16:9' ? '100%' : '420px',
              aspectRatio: aspectMode === '16:9' ? '16/9' : '9/16',
            }}
          >
            <Player
              ref={playerRef}
              component={BrandFilmComposition}
              durationInFrames={VIDEO_CONFIG.totalFrames}
              compositionWidth={aspectMode === '16:9' ? VIDEO_CONFIG.width : 1080}
              compositionHeight={aspectMode === '16:9' ? VIDEO_CONFIG.height : 1920}
              fps={VIDEO_CONFIG.fps}
              style={{
                width: '100%',
                height: '100%',
              }}
              controls
              autoPlay={false}
              loop
            />
          </div>
        </div>

        {/* Scene Navigation Bar */}
        <div className="bg-[#060709] border border-white/10 rounded-xl p-4 mb-10">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-white/60">
            <span className="flex items-center gap-1.5 text-white/80">
              <Code2 className="w-3.5 h-3.5 text-white" /> TIMELINE SCENE BOOKMARKS
            </span>
            <span>Jump directly to any motion graphics act</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {sceneBookmarks.map((scene, idx) => (
              <button
                key={scene.label}
                onClick={() => jumpToScene(scene.frame)}
                className={`text-left p-2.5 rounded border transition-all ${
                  currentFrame >= scene.frame &&
                  (idx === 4 || currentFrame < [SCENE_RANGES.auditConvergence.start, SCENE_RANGES.typographicSlam.start, SCENE_RANGES.operationalVelocity.start, SCENE_RANGES.grandMonogram.start, 900][idx])
                    ? 'bg-white/15 border-white/50 text-white'
                    : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                <div className="font-semibold text-xs text-white">{scene.label}</div>
                <div className="font-mono text-[10px] text-white/40">{scene.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Motion Graphics Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Vector Choreography */}
          <div className="bg-[#060709] border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-white/5 border border-white/15 flex items-center justify-center text-white">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Pure Motion Graphics</h3>
                <p className="text-white/50 text-xs font-mono">Vector Math & Kinetic Type</p>
              </div>
            </div>
            <p className="text-white/70 text-xs leading-relaxed mb-4">
              Zero web cards or slide templates. Dynamic SVG oscilloscope waveforms, parametric 4-vector cardinal convergence, laser caliper reticles, and high-frequency code velocities.
            </p>
            <ul className="text-xs space-y-2 text-white/60 font-mono">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-white mt-0.5 shrink-0" />
                <span>Strict monochrome (Obsidian, Liquid Platinum, Aerospace Titanium)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-white mt-0.5 shrink-0" />
                <span>Parametric SVG VistarLogoMark with dynamic docking physics</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-white mt-0.5 shrink-0" />
                <span>Typographic slam: INSTANT / AUTONOMOUS / HUMANLESS</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Strategic Positioning */}
          <div className="bg-[#060709] border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-white/5 border border-white/15 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Core Value Proposition</h3>
                <p className="text-white/50 text-xs font-mono">Enterprise Autonomous Systems</p>
              </div>
            </div>
            <p className="text-white/70 text-xs leading-relaxed mb-4">
              VISTAR audits enterprise operational topology, identifies high-friction manual bottlenecks, and engineers autonomous software & AI to eliminate human toil entirely.
            </p>
            <div className="p-3 rounded bg-white/5 border border-white/10 font-mono text-[11px] text-white/80 space-y-1">
              <div>TARGET: Enterprise Scale</div>
              <div>TOIL ELIMINATION: 100% Zero-Touch</div>
              <div>LATENCY CRASH: 48.0h &rarr; 144ms</div>
            </div>
          </div>

          {/* Card 3: CLI Production Rendering */}
          <div className="bg-[#060709] border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-white/5 border border-white/15 flex items-center justify-center text-white">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Production Export</h3>
                <p className="text-white/50 text-xs font-mono">Remotion CLI Commands</p>
              </div>
            </div>
            <p className="text-white/70 text-xs leading-relaxed mb-3">
              Render master video or individual frames via headless terminal:
            </p>
            <div className="bg-black border border-white/10 rounded p-3 font-mono text-[11px] text-white/90 leading-relaxed overflow-x-auto">
              <code>npx remotion render src/video/brand-film/index.ts VistarBrandFilm public/vistar-brand-film.mp4 --crf=18</code>
            </div>
            <div className="mt-2 bg-black border border-white/10 rounded p-3 font-mono text-[11px] text-white/60 leading-relaxed overflow-x-auto">
              <code>npx remotion still src/video/brand-film/index.ts VistarBrandFilm public/poster.png --frame=750</code>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
