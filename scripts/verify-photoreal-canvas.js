const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const outputDir = 'C:\\Users\\abhis\\.gemini\\antigravity\\brain\\81a6510f-7e3b-4a31-b56d-87868f97c4ac\\photoreal_audit';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  
  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 }
  ];

  const percentages = [0, 25, 50, 75, 100];
  const consoleLogs = [];

  for (const vp of viewports) {
    console.log(`Auditing viewport ${vp.name} (${vp.width}x${vp.height})...`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    page.on('console', msg => {
      consoleLogs.push(`[${vp.name}][${msg.type()}] ${msg.text()}`);
    });
    page.on('pageerror', err => {
      consoleLogs.push(`[${vp.name}][error] ${err.message}`);
    });

    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Get track dimensions
    const trackInfo = await page.evaluate(() => {
      const track = document.querySelector('div[class*="h-[300vh]"]');
      if (!track) return null;
      const rect = track.getBoundingClientRect();
      const maxScroll = track.offsetHeight - window.innerHeight;
      return { top: window.scrollY + rect.top, height: track.offsetHeight, maxScroll };
    });

    console.log('Track info:', trackInfo);

    for (const pct of percentages) {
      const scrollY = trackInfo ? trackInfo.top + (trackInfo.maxScroll * (pct / 100)) : 0;
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      // Wait for RAF lerp to settle
      await page.waitForTimeout(600);

      const shotPath = path.join(outputDir, `${vp.name}_pct_${String(pct).padStart(3, '0')}.png`);
      await page.screenshot({ path: shotPath });
      console.log(`Saved screenshot: ${shotPath}`);
    }

    await page.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(outputDir, 'console_logs.txt'),
    consoleLogs.join('\n')
  );

  console.log('Audit completed successfully. Total console logs:', consoleLogs.length);
}

run().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
