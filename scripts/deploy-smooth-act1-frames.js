const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const videoPath = 'C:\\Users\\abhis\\Downloads\\PROMPT_Camera_Static_mm_M.mp4';
const outputDir = path.join(__dirname, '..', 'public', 'act1-frames');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Clean out existing frames
const existing = fs.readdirSync(outputDir).filter(f => f.endsWith('.webp'));
existing.forEach(f => fs.unlinkSync(path.join(outputDir, f)));

console.log('Extracting 120 smoothly paced kinetic frames from 0.8s to 7.8s...');

// 7.0 seconds of kinetic motion sampled at 17 fps = exactly 120 frames
// Filter: delogo removes the generator watermark cleanly
const ffmpegCmd = [
  'ffmpeg -y',
  '-ss 00:00:00.800',
  '-to 00:00:07.850',
  `-i "${videoPath}"`,
  '-vf "delogo=x=1125:y=560:w=70:h=70,fps=120/7.05"',
  '-c:v libwebp',
  '-quality 82',
  `"${path.join(outputDir, 'frame_%03d.webp')}"`
].join(' ');

execSync(ffmpegCmd, { stdio: 'inherit' });

// Renumber frames to 0-indexed: frame_000.webp ... frame_119.webp
const extracted = fs.readdirSync(outputDir).filter(f => f.endsWith('.webp')).sort();
console.log(`Extracted ${extracted.length} frames.`);

// Ensure exact 120 frames
const targetCount = Math.min(extracted.length, 120);
for (let i = 0; i < targetCount; i++) {
  const oldPath = path.join(outputDir, extracted[i]);
  const newName = `frame_${String(i).padStart(3, '0')}.webp`;
  const newPath = path.join(outputDir, newName);
  if (oldPath !== newPath) {
    fs.renameSync(oldPath, newPath);
  }
}

// Remove any excess frames beyond 120
for (let i = 120; i < extracted.length; i++) {
  const excess = path.join(outputDir, extracted[i]);
  if (fs.existsSync(excess)) fs.unlinkSync(excess);
}

const finalFrames = fs.readdirSync(outputDir).filter(f => f.endsWith('.webp')).sort();
let totalBytes = 0;
finalFrames.forEach(f => totalBytes += fs.statSync(path.join(outputDir, f)).size);

console.log(`Final curated frame count: ${finalFrames.length}`);
console.log(`Total footprint: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);

// Update manifest
const manifest = {
  totalFrames: finalFrames.length,
  framePrefix: '/act1-frames/frame_',
  frameExt: '.webp',
  width: 1280,
  height: 720,
  aspectRatio: 1280 / 720,
  curated: true,
  updatedAt: new Date().toISOString()
};

fs.writeFileSync(
  path.join(outputDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log('Manifest updated successfully.');
