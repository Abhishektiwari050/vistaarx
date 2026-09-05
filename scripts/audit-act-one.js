/* eslint-disable */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const ARTIFACTS_DIR = "C:\\Users\\abhis\\.gemini\\antigravity\\brain\\81a6510f-7e3b-4a31-b56d-87868f97c4ac";
const OUTPUT_DIR = path.join(ARTIFACTS_DIR, "act_one_audit");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const PERCENTAGES = [0, 25, 50, 75, 100];

async function runAudit() {
  console.log("🎬 Initiating Art-Directed Act I Film Progression Audit with Video...");
  const browser = await chromium.launch({ headless: true });

  const consoleErrors = [];
  const webGLErrors = [];

  // 1. DESKTOP WITH CONTINUOUS VIDEO RECORDING
  console.log("\n📐 Capturing Desktop (1440x900) with Continuous Video Recording...");
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: OUTPUT_DIR,
      size: { width: 1440, height: 900 },
    },
  });
  const desktopPage = await desktopContext.newPage();

  desktopPage.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(`[Console Error]: ${msg.text()}`);
    }
  });
  desktopPage.on("pageerror", (err) => {
    consoleErrors.push(`[Unhandled Error]: ${err.message}`);
  });

  await desktopPage.goto("http://localhost:3001", { waitUntil: "networkidle", timeout: 45000 });
  await desktopPage.waitForTimeout(2500);

  // Check WebGL Context
  const webglStatus = await desktopPage.evaluate(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return "No canvas found";
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return "No WebGL context";
    const err = gl.getError();
    return err === 0 ? "OK" : `GL_ERROR_${err}`;
  });
  console.log(`  🔍 WebGL Context Status: ${webglStatus}`);

  const desktopScrollDistance = 900 * 2; // 2 * viewport height

  // Capture standard frames
  for (const pct of PERCENTAGES) {
    const scrollY = Math.round((pct / 100) * desktopScrollDistance);
    console.log(`  📸 Capturing desktop at ${pct}% (scrollY: ${scrollY}px)...`);

    await desktopPage.evaluate((y) => {
      window.scrollTo(0, y);
      window.dispatchEvent(new Event("scroll"));
    }, scrollY);
    await desktopPage.waitForTimeout(800);

    const filename = `act1_desktop_pct_${pct.toString().padStart(3, "0")}.png`;
    await desktopPage.screenshot({
      path: path.join(OUTPUT_DIR, filename),
      fullPage: false,
    });
    console.log(`     Saved -> ${filename}`);
  }

  // Continuous smooth scroll for the video recording
  console.log("  🎥 Performing continuous smooth scroll pass for film recording...");
  for (let y = 0; y <= desktopScrollDistance; y += 30) {
    await desktopPage.evaluate((scrollY) => {
      window.scrollTo(0, scrollY);
      window.dispatchEvent(new Event("scroll"));
    }, y);
    await desktopPage.waitForTimeout(35);
  }
  await desktopPage.waitForTimeout(1000);

  // 2. STRIP THE LABELS TEST (All typography and UI overlays hidden to inspect pure silhouette)
  console.log("\n🧪 Executing 'Strip the Labels' Test on Desktop...");
  await desktopPage.evaluate(() => {
    const style = document.createElement("style");
    style.id = "strip-labels-override";
    style.innerHTML = `
      header, footer, .pointer-events-none, .pointer-events-auto, h1, h2, h3, p, a, button, span {
        opacity: 0 !important;
        visibility: hidden !important;
      }
      canvas {
        opacity: 1 !important;
        visibility: visible !important;
      }
    `;
    document.head.appendChild(style);
  });

  for (const pct of [0, 50, 100]) {
    const scrollY = Math.round((pct / 100) * desktopScrollDistance);
    await desktopPage.evaluate((y) => {
      window.scrollTo(0, y);
      window.dispatchEvent(new Event("scroll"));
    }, scrollY);
    await desktopPage.waitForTimeout(600);

    const filename = `act1_silhouette_only_pct_${pct.toString().padStart(3, "0")}.png`;
    await desktopPage.screenshot({
      path: path.join(OUTPUT_DIR, filename),
      fullPage: false,
    });
    console.log(`     Saved -> ${filename} (Pure Silhouette & Materiality)`);
  }

  // Retrieve raw video path and close desktop context
  const video = desktopPage.video();
  await desktopContext.close();
  console.log("  ✅ Desktop context closed.");

  if (video) {
    const videoPath = await video.path();
    const finalVideoPath = path.join(OUTPUT_DIR, "act1_continuous_film_scroll.webm");
    try {
      if (fs.existsSync(videoPath)) {
        fs.copyFileSync(videoPath, finalVideoPath);
        console.log(`  🎥 Video saved as: act1_continuous_film_scroll.webm`);
      }
    } catch (e) {
      console.warn("  Video rename error:", e.message);
    }
  }

  // 3. MOBILE VIEWPORT (390x844)
  console.log("\n📐 Capturing Mobile (390x844)...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:3001", { waitUntil: "networkidle", timeout: 45000 });
  await mobilePage.waitForTimeout(2500);

  const mobileScrollDistance = 844 * 2;

  for (const pct of PERCENTAGES) {
    const scrollY = Math.round((pct / 100) * mobileScrollDistance);
    console.log(`  📸 Capturing mobile at ${pct}% (scrollY: ${scrollY}px)...`);

    await mobilePage.evaluate((y) => {
      window.scrollTo(0, y);
      window.dispatchEvent(new Event("scroll"));
    }, scrollY);
    await mobilePage.waitForTimeout(800);

    const filename = `act1_mobile_pct_${pct.toString().padStart(3, "0")}.png`;
    await mobilePage.screenshot({
      path: path.join(OUTPUT_DIR, filename),
      fullPage: false,
    });
    console.log(`     Saved -> ${filename}`);
  }

  await mobileContext.close();

  // 4. REDUCED-MOTION VERIFICATION
  console.log("\n♿ Testing Reduced-Motion Mode...");
  const motionContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const motionPage = await motionContext.newPage();
  await motionPage.goto("http://localhost:3001", { waitUntil: "networkidle", timeout: 45000 });
  await motionPage.waitForTimeout(1500);

  const reducedMotionActive = await motionPage.evaluate(() => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  console.log(`  ♿ Reduced Motion Media Query Active: ${reducedMotionActive}`);

  await motionPage.screenshot({
    path: path.join(OUTPUT_DIR, "act1_reduced_motion_000.png"),
    fullPage: false,
  });
  await motionContext.close();

  await browser.close();

  console.log("\n=================================");
  console.log(`Console Errors count: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log("Errors:", consoleErrors);
  } else {
    console.log("✅ Zero console errors detected.");
  }
  console.log("🏁 All visual audit captures and continuous video passes completed successfully!");
}

runAudit().catch((err) => {
  console.error("❌ Audit failed:", err);
  process.exit(1);
});
