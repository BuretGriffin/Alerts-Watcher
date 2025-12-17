import { chromium } from 'playwright';

export async function getBrowser() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  return { browser, page };
}