/**
 * VISTAR TACTILE SOUND ENGINE — Web Audio API Synthesizer
 * 
 * Zero external audio files (0 KB network overhead).
 * Generates ultra-crisp, high-frequency physical micro-haptics in real time.
 * Includes user audio preferences and global mute toggle.
 */

let audioCtx: AudioContext | null = null;
let isMuted = false;

// Initialize on first user interaction to comply with browser autoplay policies
function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundMuted(): boolean {
  if (typeof window === "undefined") return true;
  return isMuted || localStorage.getItem("vistar_sound_muted") === "true";
}

export function toggleSound(): boolean {
  if (typeof window === "undefined") return true;
  isMuted = !isSoundMuted();
  localStorage.setItem("vistar_sound_muted", isMuted ? "true" : "false");
  if (!isMuted) {
    playClick(1200, 0.03); // Confirmation blip
  }
  return isMuted;
}

/**
 * High-frequency mechanical micro-click (like a Leica shutter or tactile switch)
 */
export function playClick(freq = 4800, volume: number = 0.025, type: OscillatorType = "sine") {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.012);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.012);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.015);
  } catch {
    // Graceful fallback if audio context fails
  }
}

/**
 * Short digital blip for token streaming or computational steps
 */
export function playBlip(freq = 1800, volume = 0.02) {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.3, ctx.currentTime + 0.008);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.008);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.01);
  } catch {
    // Graceful fallback
  }
}

/**
 * Mechanical toggle switch blip (dual frequency)
 */
export function playToggle(up = true) {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const startFreq = up ? 1400 : 2200;
    const endFreq = up ? 2600 : 1200;

    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.018);

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.018);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.02);
  } catch {
    // Graceful fallback
  }
}

/**
 * Subtle atmospheric whoosh for major state changes (Act transitions, modal opens)
 */
export function playSwoosh() {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.045);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Graceful fallback
  }
}

/**
 * Electric hypercar inverter spool / turbine acceleration whine
 */
export function playTurbineSpool(duration = 0.35) {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + duration);

    // Filter to give that smooth carbon-inverter whine rather than harsh buzz
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration + 0.02);
  } catch {
    // Graceful fallback
  }
}

/**
 * Aerospace mechanical relay / solenoid switch latch
 */
export function playRelayLatch() {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    // Primary contact impact
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(880, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.015);
    gain1.gain.setValueAtTime(0.04, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.02);

    // Secondary latch lock
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(2400, ctx.currentTime + 0.012);
    osc2.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.025);
    gain2.gain.setValueAtTime(0.03, ctx.currentTime + 0.012);
    gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.012);
    osc2.stop(ctx.currentTime + 0.03);
  } catch {
    // Graceful fallback
  }
}

/**
 * Retro-futuristic radar / harmonic cathode ping (Baxter Building signal)
 */
export function playRadarPing(freq = 1760) {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.13);
  } catch {
    // Graceful fallback
  }
}
