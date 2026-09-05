const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "../public");
const videosDir = path.join(publicDir, "videos");
const sequenceDir = path.join(publicDir, "sequence");

if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir, { recursive: true });
if (!fs.existsSync(sequenceDir)) fs.mkdirSync(sequenceDir, { recursive: true });

const images = [
  path.join(publicDir, "museum/exhibit-1-monolith.jpg"),
  path.join(publicDir, "museum/exhibit-2-kinetic-rings.jpg"),
  path.join(publicDir, "museum/exhibit-3-neoclassical-bust.jpg"),
  path.join(publicDir, "museum/exhibit-4-basalt-stele.jpg"),
  path.join(publicDir, "museum/exhibit-5-fluid-ribbon.jpg"),
  path.join(publicDir, "museum/exhibit-6-quantum-crystal.jpg")
];

console.log("🎬 1. Creating smooth cinematic video with ffmpeg...");
const videoPath = path.join(videosDir, "museum-tour.mp4");

// Create high quality video with subtle zoompan and crossfades
// Each scene 2.5 seconds, 0.5s crossfade
// For robustness, create a filtered video with scale and crossfade
const filterComplex = [
  "[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0015,1.2)':d=120:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30[v0]",
  "[1:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0015,1.2)':d=120:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30[v1]",
  "[2:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0015,1.2)':d=120:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30[v2]",
  "[3:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0015,1.2)':d=120:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30[v3]",
  "[4:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0015,1.2)':d=120:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30[v4]",
  "[5:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0015,1.2)':d=120:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30[v5]",
  "[v0][v1]xfade=transition=fade:duration=0.5:offset=3.5[x1]",
  "[x1][v2]xfade=transition=fade:duration=0.5:offset=7.0[x2]",
  "[x2][v3]xfade=transition=fade:duration=0.5:offset=10.5[x3]",
  "[x3][v4]xfade=transition=fade:duration=0.5:offset=14.0[x4]",
  "[x4][v5]xfade=transition=fade:duration=0.5:offset=17.5[outv]"
].join(";");

const inputs = images.map(img => `-loop 1 -t 4 -i "${img}"`).join(" ");
const cmd = `ffmpeg -y ${inputs} -filter_complex "${filterComplex}" -map "[outv]" -c:v libx264 -pix_fmt yuv420p -r 30 "${videoPath}"`;

console.log("Executing ffmpeg video generation...");
execSync(cmd, { stdio: "inherit" });
console.log(`✓ Video generated successfully at: ${videoPath}`);

// 2. Extract WebP frames for the scroll canvas scrubber
console.log("🎞️ 2. Extracting optimized WebP frames for scroll-scrubbing...");
const extractCmd = `ffmpeg -y -i "${videoPath}" -vf "fps=12,scale=1280:-1" -q:v 75 "${path.join(sequenceDir, "frame_%03d.webp")}"`;
execSync(extractCmd, { stdio: "inherit" });

const frameCount = fs.readdirSync(sequenceDir).filter(f => f.endsWith(".webp")).length;
console.log(`✓ Extracted ${frameCount} WebP frames into public/sequence/!`);
