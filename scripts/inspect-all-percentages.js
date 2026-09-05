/* eslint-disable */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const ARTIFACTS_DIR = "C:\\Users\\abhis\\.gemini\\antigravity\\brain\\81a6510f-7e3b-4a31-b56d-87868f97c4ac";
const OUTPUT_DIR = path.join(ARTIFACTS_DIR, "detailed_audit");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const PERCENTAGES = [0, 10, 25, 40, 50, 65, 75, 90, 100];

async function runDetailedInspection() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop (1440x900)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto("http://localhost:3001", { waitUntil: "networkidle", timeout: 45000 });
  await desktopPage.waitForTimeout(2000);

  const desktopScrollDistance = 900 * 2;

  for (const pct of PERCENTAGES) {
    const scrollY = Math.round((pct / 100) * desktopScrollDistance);
    await desktopPage.evaluate((y) => {
      window.scrollTo(0, y);
      window.dispatchEvent(new Event("scroll"));
    }, scrollY);
    await desktopPage.waitForTimeout(700);

    await desktopPage.screenshot({
      path: path.join(OUTPUT_DIR, `desktop_${pct.toString().padStart(3, "0")}.png`),
      fullPage: false,
    });
  }
  await desktopContext.close();

  // 2. Mobile (390x844)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:3001", { waitUntil: "networkidle", timeout: 45000 });
  await mobilePage.waitForTimeout(2000);

  const mobileScrollDistance = 844 * 2;

  for (const pct of PERCENTAGES) {
    const scrollY = Math.round((pct / 100) * mobileScrollDistance);
    await mobilePage.evaluate((y) => {
      window.scrollTo(0, y);
      window.dispatchEvent(new Event("scroll"));
    }, scrollY);
    await mobilePage.waitForTimeout(700);

    await mobilePage.screenshot({
      path: path.join(OUTPUT_DIR, `mobile_${pct.toString().padStart(3, "0")}.png`),
      fullPage: false,
    });
  }
  await mobileContext.close();

  await browser.close();
  console.log("✅ Detailed 9-point visual captures completed.");
}

runDetailedInspection().catch((err) => {
  console.error(err);
  process.exit(1);
});
