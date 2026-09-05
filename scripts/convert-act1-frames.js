const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const inputDir = 'C:\\Users\\abhis\\Downloads\\PROMPT_Camera_Static_mm_M_frames\\PROMPT_Camera_Static_mm_M_frames';
const outputDir = path.join(__dirname, '..', 'public', 'act1-frames');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir)
  .filter(f => f.endsWith('.png'))
  .sort();

console.log(`Found ${files.length} frames to convert in ${inputDir}`);

// Concurrency limit for FFmpeg jobs
const CONCURRENCY = 8;
let currentIndex = 0;
let completedCount = 0;
const startTime = Date.now();

function pad(num, size = 3) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function processNext(resolve) {
  if (currentIndex >= files.length) {
    if (completedCount === files.length) {
      resolve();
    }
    return;
  }

  const idx = currentIndex++;
  const file = files[idx];
  const inputPath = path.join(inputDir, file);
  // Output name: frame_000.webp ... frame_239.webp
  const outName = `frame_${pad(idx)}.webp`;
  const outputPath = path.join(outputDir, outName);

  // FFmpeg command with delogo for the bottom-right watermark
  // Generator watermark location: x=1125, y=560, w=70, h=70
  const args = [
    '-y',
    '-i', inputPath,
    '-vf', 'delogo=x=1125:y=560:w=70:h=70',
    '-c:v', 'libwebp',
    '-quality', '82',
    outputPath
  ];

  const proc = spawn('ffmpeg', args, { stdio: 'ignore' });

  proc.on('close', (code) => {
    if (code !== 0) {
      console.error(`Error processing ${file} -> code ${code}`);
    }
    completedCount++;
    if (completedCount % 30 === 0 || completedCount === files.length) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`Converted ${completedCount}/${files.length} frames (${elapsed}s)...`);
    }
    processNext(resolve);
  });
}

new Promise((resolve) => {
  for (let i = 0; i < Math.min(CONCURRENCY, files.length); i++) {
    processNext(resolve);
  }
}).then(() => {
  const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`All ${files.length} frames converted successfully in ${totalElapsed}s!`);

  // Write manifest
  const manifest = {
    totalFrames: files.length,
    framePrefix: '/act1-frames/frame_',
    frameExt: '.webp',
    width: 1280,
    height: 720,
    aspectRatio: 1280 / 720,
    generatedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    path.join(outputDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('Saved manifest.json');
});
