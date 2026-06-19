/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const { Stagehand } = require("@browserbasehq/stagehand");
async function run() {
  console.log("🚀 Initializing Stagehand agentic browser...");
  
  // Set fallback model variables if needed, using standard local environments
  const stagehand = new Stagehand({
    env: "LOCAL",
    headless: true,
    modelName: "gpt-4o",
    domSettleTimeoutMs: 3000
  });
  
  try {
    await stagehand.init();
    const page = stagehand.page;
    
    console.log("🌐 Navigating to Vistar Studio at http://localhost:3000...");
    await page.goto("http://localhost:3000");
    
    // Wait for the custom 3D shaders and preloader to settle
    console.log("⏳ Waiting for preloader and 3D watercolor canvas to compile...");
    await new Promise(resolve => setTimeout(resolve, 12000));
    
    console.log("📸 Capturing Stagehand design studio audit screenshot...");
    await page.screenshot({ 
      path: "stagehand-audit-report.png",
      fullPage: false,
      timeout: 8000
    });
    
    console.log("✨ SUCCESS! Visual report saved in your workspace root as: stagehand-audit-report.png");
  } catch (error) {
    console.warn("⚠️ Stagehand environment check encountered an LLM provider coordinate block.");
    console.log("Stagehand relies on LLM API keys (e.g. OPENAI_API_KEY) to initialize its AI driver. If keys are missing, we will fallback to standard Playwright browser automation threads to complete the visual audit.");
    
    // Fallback to standard playwright execution
    console.log("🔄 Initializing standard Playwright fallback browser...");
    const { chromium } = require("playwright");
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("http://localhost:3000");
    await new Promise(resolve => setTimeout(resolve, 12000));
    await page.screenshot({ path: "stagehand-audit-report.png", timeout: 8000 });
    
    console.log("✨ SUCCESS! Fallback visual report saved as: stagehand-audit-report.png");
    await browser.close();
  } finally {
    try {
      await stagehand.close();
    } catch {}
  }
}

run().catch(console.error);
