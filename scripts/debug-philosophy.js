const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on("console", msg => console.log("PAGE LOG:", msg.text()));
  page.on("pageerror", err => console.log("PAGE ERROR:", err.message));
  
  console.log("Navigating to http://localhost:3000/philosophy...");
  try {
    await page.goto("http://localhost:3000/philosophy", { timeout: 15000 });
    console.log("Navigation successful!");
  } catch (err) {
    console.error("Navigation failed:", err.message);
  }
  
  await browser.close();
}

run();
