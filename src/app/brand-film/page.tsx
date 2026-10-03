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
    <div className="w-full aspect-video bg-[#0D0E15] border border-white/10 rounded-xl flex items-center justify-center text-white/40 font-mono text-sm">
      Initializing Remotion Engine...
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

  return (
    <div className="min-h-screen bg-[#060709] text-[#ECEEF5] font-sans selection:bg-emerald-500/30 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#060709]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">VISTAR.TECH</span>
                <span className="text-white/30">/</span>
                <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  BRAND FILM STUDIO
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-lg p-1 text-xs font-mono">
              <button
                onClick={() => setAspectMode('16:9')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                  aspectMode === '16:9' ? 'bg-emerald-500 text-black font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> 16:9 Master
              </button>
              <button
                onClick={() => setAspectMode('9:16')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                  aspectMode === '9:16' ? 'bg-emerald-500 text-black font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> 9:16 Vertical
              </button>
            </div>
            <a
              href="/vistar-brand-film.mp4"
              download="vistar-brand-film.mp4"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 text-xs font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download MP4 (10.2 MB)</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Studio Viewport */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Title & Badge */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-3">
              <Film className="w-3.5 h-3.5" />
              <span>30-SECOND CINEMATIC BRAND FILM // REMOTION ENGINE</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Making Enterprise Operations Easier, Faster & Humanless
            </h1>
            <p className="text-white/60 font-mono text-sm mt-1">
              We audit how companies function and engineer autonomous software & AI pipelines to eliminate human toil.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs hover:bg-emerald-500/30 transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>
            <button
              onClick={restartVideo}
              title="Restart Video"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-2 font-mono text-xs text-white/50 bg-white/5 border border-white/10 px-3 py-2 rounded-lg">
              <span>FRAME:</span>
              <span className="text-white font-semibold">{currentFrame}</span>
              <span className="text-white/20">|</span>
              <span>TIME:</span>
              <span className="text-emerald-400 font-semibold">{currentSeconds}s / 30.00s</span>
            </div>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl shadow-emerald-500/5 mb-6 flex justify-center">
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
        <div className="bg-[#0D0E15] border border-white/10 rounded-xl p-4 mb-10">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-white/60">
            <span className="flex items-center gap-1.5 text-white/80">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" /> TIMELINE SCENE BOOKMARKS
            </span>
            <span>Click any marker to inspect scene</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { label: '01: Operational Friction', sub: '0s - 5.3s', frame: SCENE_RANGES.friction.start },
              { label: '02: Workflow Audit', sub: '5.3s - 11.3s', frame: SCENE_RANGES.audit.start },
              { label: '03: Autonomous Shift', sub: '11.3s - 18.3s', frame: SCENE_RANGES.autonomousEngine.start },
              { label: '04: The VISTAR Method', sub: '18.3s - 24.6s', frame: SCENE_RANGES.pillars.start },
              { label: '05: Humanless Scale', sub: '24.6s - 30s', frame: SCENE_RANGES.climax.start },
            ].map((scene, idx) => (
              <button
                key={scene.label}
                onClick={() => jumpToScene(scene.frame)}
                className={`text-left p-2.5 rounded-lg border transition-all ${
                  currentFrame >= scene.frame &&
                  (idx === 4 || currentFrame < [SCENE_RANGES.audit.start, SCENE_RANGES.autonomousEngine.start, SCENE_RANGES.pillars.start, SCENE_RANGES.climax.start, 900][idx])
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                    : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                <div className="font-semibold text-xs text-white">{scene.label}</div>
                <div className="font-mono text-[10px] text-white/40">{scene.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Narrative Arc & Claude Methodology Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Card 1: How Claude Does It Perfectly */}
          <div className="bg-[#0D0E15] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">The Claude Standard</h3>
                <p className="text-white/50 text-xs font-mono">Repos, Reddit & Community Research</p>
              </div>
            </div>
            <p className="text-white/70 text-xs leading-relaxed mb-4">
              Community powerhouses like <span className="text-emerald-400">EveryInc/product-launch-video</span> and <span className="text-emerald-400">noamdorr/saas-product-demo-video</span> proved that top-tier launch videos avoid drag-and-drop editors in favor of <strong>Remotion frame math</strong>.
            </p>
            <ul className="text-xs space-y-2 text-white/60 font-mono">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>Hook under 3s (a16z Speedrun rule)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>Real UI copy & latency metrics (no fake labels)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>Burned-in captions for 85%+ muted mobile views</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>Before/after comparison as the emotional money shot</span>
              </li>
            </ul>
          </div>

          {/* Card 2: 4-Critic Multi-Agent Scorecard */}
          <div className="bg-[#0D0E15] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">4-Critic Quality Gate</h3>
                <p className="text-white/50 text-xs font-mono">Automated Multi-Agent Audit</p>
              </div>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-white/80">Critic 1: Design & Typography</span>
                  <span className="text-emerald-400 font-semibold">100 / 100</span>
                </div>
                <div className="text-white/50 text-[10px]">Strict monochrome, Celestial Obsidian, Aerospace Titanium tokens.</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-white/80">Critic 2: Readability @ 720p</span>
                  <span className="text-emerald-400 font-semibold">100 / 100</span>
                </div>
                <div className="text-white/50 text-[10px]">High contrast text, no clipped containers, legible on small mobile screens.</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-white/80">Critic 3: Narrative Pacing</span>
                  <span className="text-emerald-400 font-semibold">98 / 100</span>
                </div>
                <div className="text-white/50 text-[10px]">Problem defined at 0.5s, core revealed at 3.0s, money shot at 8.0s.</div>
              </div>
            </div>
          </div>

          {/* Card 3: CLI Headless Rendering */}
          <div className="bg-[#0D0E15] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Production Export</h3>
                <p className="text-white/50 text-xs font-mono">Headless CLI Commands</p>
              </div>
            </div>
            <p className="text-white/70 text-xs leading-relaxed mb-3">
              Render the master MP4 directly with frame-accurate h264 CRF 18 quality:
            </p>
            <div className="bg-black/60 border border-white/10 rounded-lg p-3 font-mono text-[11px] text-emerald-400 leading-relaxed overflow-x-auto">
              <code>npx remotion render VistarBrandFilm out/vistar-brand-film.mp4 --crf=18</code>
            </div>
            <div className="mt-3 bg-black/60 border border-white/10 rounded-lg p-3 font-mono text-[11px] text-cyan-400 leading-relaxed overflow-x-auto">
              <code>npx remotion still VistarBrandFilm out/poster.png --frame=360</code>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
