const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const URLS = [
  { name: "home", url: "http://localhost:3001/" },
  { name: "work", url: "http://localhost:3001/work" },
  { name: "vectors", url: "http://localhost:3001/vectors" },
  { name: "philosophy", url: "http://localhost:3001/philosophy" },
  { name: "contact", url: "http://localhost:3001/contact" },
];

async function audit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  const outDir = path.join(__dirname, "../audit_screens_wow");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const results = [];

  for (const item of URLS) {
    console.log(`Auditing ${item.name} (${item.url})...`);
    const page = await context.newPage();
    const errors = [];
    const logs = [];

    page.on("console", (msg) => {
      const type = msg.type();
      const text = msg.text();
      logs.push({ type, text });
      if (type === "error" && !text.includes("favicon")) {
        errors.push(text);
      }
    });

    page.on("pageerror", (err) => {
      errors.push(err.toString());
    });

    try {
      await page.goto(item.url, { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(2000);

      // Top screenshot
      await page.screenshot({ path: path.join(outDir, `${item.name}_top.png`) });

      // Scroll mid
      await page.evaluate(() => window.scrollBy(0, 1200));
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(outDir, `${item.name}_mid.png`) });

      // Special interaction testing
      if (item.name === "work") {
        // Test 3D museum next exhibit button
        const nextBtn = page.locator("button:has-text('NEXT →')");
        if (await nextBtn.isVisible()) {
          console.log("Found NEXT button on 3D museum, clicking...");
          await nextBtn.click();
          await page.waitForTimeout(800);
        }
        await page.screenshot({ path: path.join(outDir, "work_museum_next.png") });
      }

      if (item.name === "vectors") {
        // Test DNA frame scrubber
        await page.evaluate(() => window.scrollBy(0, 1600));
        await page.waitForTimeout(1000);
        await page.screenshot({ path: path.join(outDir, "vectors_dna_scrubbed.png") });
      }

      results.push({
        name: item.name,
        url: item.url,
        errors,
        status: errors.length === 0 ? "PASSED" : "ERRORS",
      });
      console.log(`✓ ${item.name}: ${errors.length} errors.`);
    } catch (err) {
      console.error(`✕ ${item.name} failed:`, err);
      results.push({ name: item.name, error: err.toString(), status: "FAILED" });
    } finally {
      await page.close();
    }
  }

  await browser.close();
  fs.writeFileSync(path.join(outDir, "audit_summary.json"), JSON.stringify(results, null, 2));
  console.log("=== AUDIT COMPLETE ===");
  console.log(JSON.stringify(results, null, 2));
}

audit().catch(console.error);
