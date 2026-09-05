const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(__dirname, '..', 'public');
const appDir = path.join(__dirname, '..', 'src', 'app');

async function generate() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 1. GENERATE FAVICONS & ICONS (512x512, 180x180, 32x32, 16x16)
  const iconHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 512px;
            height: 512px;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .icon-badge {
            width: 480px;
            height: 480px;
            background: #0a0a0a;
            border-radius: 110px;
            border: 12px solid #1c1e22;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 16px 36px rgba(0,0,0,0.35);
          }
          svg {
            width: 320px;
            height: 320px;
          }
        </style>
      </head>
      <body>
        <div class="icon-badge">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2L16 8H8L12 2Z" fill="#faf9f5" />
            <path d="M2 12L8 8V16L2 12Z" fill="#faf9f5" />
            <path d="M22 12L16 16V8L22 12Z" fill="#faf9f5" />
            <path d="M12 22L8 16H16L12 22Z" fill="#faf9f5" />
            <circle cx="12" cy="12" r="2.2" fill="#d8ff42" />
          </svg>
        </div>
      </body>
    </html>
  `;

  await page.setViewportSize({ width: 512, height: 512 });
  await page.setContent(iconHtml);
  
  const icon512Path = path.join(publicDir, 'icon-512.png');
  await page.screenshot({ path: icon512Path, omitBackground: true });

  // Resize using ffmpeg for crisp multi-resolution favicons
  const icon180Path = path.join(publicDir, 'apple-touch-icon.png');
  const icon32Path = path.join(publicDir, 'favicon-32x32.png');
  const icon16Path = path.join(publicDir, 'favicon-16x16.png');
  const icoPathPublic = path.join(publicDir, 'favicon.ico');
  const icoPathApp = path.join(appDir, 'favicon.ico');

  execSync(`ffmpeg -y -i "${icon512Path}" -vf scale=180:180 "${icon180Path}"`);
  execSync(`ffmpeg -y -i "${icon512Path}" -vf scale=32:32 "${icon32Path}"`);
  execSync(`ffmpeg -y -i "${icon512Path}" -vf scale=16:16 "${icon16Path}"`);
  // Generate multi-size ICO
  execSync(`ffmpeg -y -i "${icon32Path}" "${icoPathPublic}"`);
  fs.copyFileSync(icoPathPublic, icoPathApp);

  console.log('Favicons and touch icons generated successfully.');

  // 2. GENERATE 1200x630 OPEN GRAPH SHARE CARD
  // Reads instrument frame 90 as base64 to embed in the card
  const instrumentFramePath = path.join(publicDir, 'act1-frames', 'frame_090.webp');
  const instrumentBase64 = fs.readFileSync(instrumentFramePath).toString('base64');

  const ogHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 1200px;
            height: 630px;
            background: #faf9f5;
            font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
            color: #0a0a0a;
            position: relative;
            overflow: hidden;
            border: 12px solid #0a0a0a;
          }
          .container {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 56px 64px;
            position: relative;
            z-index: 10;
          }
          .left-content {
            max-width: 660px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: #ffffff;
            border: 2px solid #0a0a0a;
            padding: 8px 16px;
            border-radius: 6px;
            font-family: 'Space Grotesk', monospace;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 2px;
            box-shadow: 3px 3px 0px #d8ff42;
            width: fit-content;
          }
          .badge-dot {
            width: 10px;
            height: 10px;
            background: #d8ff42;
            border-radius: 50%;
            border: 1.5px solid #0a0a0a;
          }
          h1 {
            font-size: 52px;
            font-weight: 900;
            line-height: 1.02;
            letter-spacing: -1.5px;
            text-transform: uppercase;
          }
          .highlight {
            background: #d8ff42;
            border: 2px solid #0a0a0a;
            padding: 0 10px;
            display: inline-block;
            box-shadow: 3px 3px 0px #0a0a0a;
            margin: 2px 0;
          }
          p {
            font-size: 18px;
            line-height: 1.45;
            color: #404040;
            font-weight: 500;
            max-width: 580px;
          }
          .metrics-row {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-top: 10px;
            font-family: 'Space Grotesk', monospace;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1px;
          }
          .metric-pill {
            background: #ffffff;
            border: 1.5px solid #0a0a0a;
            padding: 6px 14px;
            border-radius: 4px;
            box-shadow: 2px 2px 0px #0a0a0a;
          }
          .metric-pill.lime {
            background: #d8ff42;
          }
          .right-visual {
            position: absolute;
            right: -60px;
            bottom: -30px;
            width: 580px;
            height: 620px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .right-visual img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 20px 30px rgba(0,0,0,0.12));
          }
          .ambient-glow {
            position: absolute;
            right: 80px;
            bottom: 60px;
            width: 320px;
            height: 320px;
            background: rgba(216, 255, 66, 0.45);
            border-radius: 50%;
            filter: blur(80px);
            z-index: 1;
            pointer-events: none;
          }
        </style>
      </head>
      <body>
        <div class="ambient-glow"></div>
        <div class="container">
          <div class="left-content">
            <div class="badge">
              <span class="badge-dot"></span>
              VISTAR // SYSTEMS ARCHITECTURE
            </div>
            <h1>
              WE BUILD THE <br />
              <span class="highlight">SYSTEMS</span> <br />
              YOUR BUSINESS <br />
              RUNS ON.
            </h1>
            <p>
              Websites. Web applications. Workflow automations. AI systems. Engineered as one unified technological engine. Zero templates. 100% codebase ownership.
            </p>
            <div class="metrics-row">
              <div class="metric-pill lime">100% CODE OWNERSHIP</div>
              <div class="metric-pill">SUB-SECOND TTFB</div>
              <div class="metric-pill">ZERO TEMPLATES</div>
            </div>
          </div>
          <div class="right-visual">
            <img src="data:image/webp;base64,${instrumentBase64}" alt="Vistar Precision Hardware Core" />
          </div>
        </div>
      </body>
    </html>
  `;

  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(ogHtml);
  // Wait for fonts to load
  await page.waitForTimeout(800);

  const ogCardPath = path.join(publicDir, 'og-image.jpg');
  await page.screenshot({ path: ogCardPath, quality: 90, type: 'jpeg' });
  console.log('Open Graph image generated at public/og-image.jpg');

  // Also write SVG icon with universal contrast for src/app/icon.svg and public/icon.svg
  const universalSvgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="7" fill="#0a0a0a"/>
  <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#27272a" stroke-width="1"/>
  <path d="M16 4L21 11H11L16 4Z" fill="#faf9f5"/>
  <path d="M4 16L11 11V21L4 16Z" fill="#faf9f5"/>
  <path d="M28 16L21 21V11L28 16Z" fill="#faf9f5"/>
  <path d="M16 28L11 21H21L16 28Z" fill="#faf9f5"/>
  <circle cx="16" cy="16" r="2.8" fill="#d8ff42"/>
</svg>`;

  fs.writeFileSync(path.join(publicDir, 'icon.svg'), universalSvgIcon);
  fs.writeFileSync(path.join(appDir, 'icon.svg'), universalSvgIcon);
  console.log('Universal high-contrast icon.svg updated in public/ and src/app/.');

  await browser.close();
}

generate().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
