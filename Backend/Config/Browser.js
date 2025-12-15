import { chromium } from 'playwright';

export async function getBrowser() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  return { browser, page };
}