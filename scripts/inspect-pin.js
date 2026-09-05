/* eslint-disable */
const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();
  console.log("Navigating to pin...");
  await page.goto("https://www.pinterest.com/pin/959477895685222422/", { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(5000);

  const savePath = "C:/Users/abhis/.gemini/antigravity/brain/81a6510f-7e3b-4a31-b56d-87868f97c4ac/pinterest_pin_loaded.png";
  await page.screenshot({ path: savePath, fullPage: false });
  console.log("Screenshot saved to:", savePath);

  const details = await page.evaluate(() => {
    const video = document.querySelector("video");
    const imgs = Array.from(document.querySelectorAll("img[src*='pinimg.com']")).map((i) => i.src);
    const title = document.querySelector("h1")?.innerText;
    const ogVideo = document.querySelector("meta[property='og:video']")?.content;
    const ogImage = document.querySelector("meta[property='og:image']")?.content;
    return {
      title,
      videoSrc: video ? (video.src || video.querySelector("source")?.src) : null,
      imgs,
      ogVideo,
      ogImage,
    };
  });

  console.log("Pin Details:", JSON.stringify(details, null, 2));
  await browser.close();
})();
