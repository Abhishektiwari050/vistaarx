import { create } from "zustand";

export type SceneId =
  | "scene-01-arrival"
  | "scene-02-problem"
  | "scene-03-transformation"
  | "scene-04-enter-system"
  | "scene-05-event-flow"
  | "scene-06-architecture"
  | "scene-07-capabilities"
  | "scene-08-wall-of-fame"
  | "scene-09-case-study"
  | "scene-10-before-after"
  | "scene-11-assembly-line"
  | "scene-12-ownership"
  | "scene-13-return-system"
  | "scene-14-start-build";

export type CadCameraPreset = "exploded" | "isometric" | "elevation" | "plan";

interface CameraCoords {
  x: number;
  y: number;
  z: number;
  fov: number;
}

interface CinematicState {
  // Active Scene
  activeScene: SceneId;
  sceneIndex: number; // 1 - 14
  setActiveScene: (scene: SceneId, index: number) => void;

  // Global Scroll Scrubbing Progress
  globalScrollProgress: number; // 0.0 - 1.0
  setGlobalScrollProgress: (progress: number) => void;

  // Scene-specific scroll progression
  sceneProgress: Record<string, number>;
  setSceneProgress: (scene: string, progress: number) => void;

  // Camera State
  camera: CameraCoords;
  targetCamera: CameraCoords;
  setCameraTarget: (coords: Partial<CameraCoords>) => void;

  // 3D CAD Architecture Mode
  cadPreset: CadCameraPreset;
  setCadPreset: (preset: CadCameraPreset) => void;
  isLayersCollapsed: boolean;
  setIsLayersCollapsed: (collapsed: boolean) => void;

  // Accessibility & Preferences
  isReducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;

  // Audio / Telemetry Haptics
  isMuted: boolean;
  toggleMute: () => void;
}

export const useCinematicStore = create<CinematicState>((set) => ({
  activeScene: "scene-01-arrival",
  sceneIndex: 1,
  setActiveScene: (scene, index) => set({ activeScene: scene, sceneIndex: index }),

  globalScrollProgress: 0,
  setGlobalScrollProgress: (progress) => set({ globalScrollProgress: progress }),

  sceneProgress: {},
  setSceneProgress: (scene, progress) =>
    set((state) => ({
      sceneProgress: { ...state.sceneProgress, [scene]: progress },
    })),

  camera: { x: 0, y: 0, z: 18, fov: 45 },
  targetCamera: { x: 0, y: 0, z: 18, fov: 45 },
  setCameraTarget: (coords) =>
    set((state) => ({
      targetCamera: { ...state.targetCamera, ...coords },
    })),

  cadPreset: "exploded",
  setCadPreset: (preset) => set({ cadPreset: preset }),
  isLayersCollapsed: false,
  setIsLayersCollapsed: (collapsed) => set({ isLayersCollapsed: collapsed }),

  isReducedMotion: false,
  setReducedMotion: (reduced) => set({ isReducedMotion: reduced }),

  isMuted: true,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
}));
