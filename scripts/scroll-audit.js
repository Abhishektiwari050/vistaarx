/* eslint-disable */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

// The artifact directory where we must store the screenshots
const ARTIFACTS_DIR = "C:\\Users\\abhis\\.gemini\\antigravity\\brain\\81a6510f-7e3b-4a31-b56d-87868f97c4ac";
const OUTPUT_DIR = path.join(ARTIFACTS_DIR, "scroll_audit");

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const PAGES = [
  { name: "home", path: "/" },
  { name: "work", path: "/work" },
  { name: "philosophy", path: "/philosophy" },
  { name: "contact", path: "/contact" },
  { name: "vectors", path: "/vectors" }
];

async function runAudit() {
  console.log("🚀 Starting incremental scroll visual audit using Playwright...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  for (const route of PAGES) {
    const url = `http://localhost:3000${route.path}`;
    console.log(`\n🌐 Navigating to ${url}...`);
    
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      
      // Wait for the custom 3D shader and animations to settle
      console.log("⏳ Waiting 12 seconds for 3D shaders and layout hydration to settle...");
      await page.waitForTimeout(12000);
      
      // Get the page height and viewport height
      const pageHeight = await page.evaluate(() => document.body.scrollHeight);
      const viewportHeight = 900;
      
      console.log(`📏 Page scroll height: ${pageHeight}px (Viewport: ${viewportHeight}px)`);
      
      // We will scroll down in steps of 900px (one viewport height)
      let scrollY = 0;
      let stepIndex = 0;
      
      while (scrollY < pageHeight) {
        console.log(`📸 Taking screenshot at scroll y = ${scrollY}px (Step ${stepIndex + 1})`);
        
        // Scroll to the target position
        await page.evaluate((y) => window.scrollTo(0, y), scrollY);
        
        // Wait for animations/framer-motion to trigger and settle
        await page.waitForTimeout(1500);
        
        const screenshotPath = path.join(OUTPUT_DIR, `${route.name}_scroll_step_${stepIndex + 1}_y${scrollY}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`💾 Saved to ${screenshotPath}`);
        
        scrollY += viewportHeight;
        stepIndex++;
        
        // Safety exit for extremely long pages (max 15 scroll steps per page)
        if (stepIndex >= 15) {
          console.log("⚠️ Reached max scroll step limit (15) for this page. Moving to next route.");
          break;
        }
        
        // Re-evaluate page height in case dynamic content/renders increased page height during scrolling
        const currentHeight = await page.evaluate(() => document.body.scrollHeight);
        if (currentHeight > pageHeight) {
          console.log(`📏 Page height grew to ${currentHeight}px during scroll.`);
        }
      }
      
    } catch (err) {
      console.error(`❌ Error auditing route ${route.path}:`, err);
    }
  }

  await browser.close();
  console.log("\n🎉 Scroll visual audit completed successfully!");
}

runAudit().catch(console.error);
