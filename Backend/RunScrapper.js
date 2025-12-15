import fs from 'fs';
import path from 'path';
import { getBrowser } from './config/browser.js';
import { TARGETS } from './config/targets.js';
import { fetchTweets } from './scraper/fetchTweets.js';
import { downloadImage } from './scraper/fetchImages.js';
import { ocrImage } from './scraper/ocr.js';

const OUTPUT_FILE = path.join('../frontend/public', 'alerts.json');

(async () => {
  const { browser, page } = await getBrowser();
  const allAlerts = [];

  for (const target of TARGETS) {
    const tweets = await fetchTweets(page, target);

    for (const t of tweets) {
      if (t.imageUrl) {
        const imagePath = await downloadImage(t.imageUrl);
        const text = await ocrImage(imagePath);

        const lines = text.split('\n').filter(l => l.trim() !== '');
        lines.forEach(line =>
          allAlerts.push({ text: line, scrapedAt: new Date().toISOString(), source: t.username })
        );
      } else {
        allAlerts.push({ text: t.text, scrapedAt: t.scrapedAt, source: t.username });
      }
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allAlerts, null, 2));
  console.log(`Saved ${allAlerts.length} alerts to ${OUTPUT_FILE}`);

  await browser.close();
})();