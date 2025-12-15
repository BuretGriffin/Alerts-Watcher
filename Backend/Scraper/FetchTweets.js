export async function fetchTweets(page, target) {
  await page.goto(`https://x.com/${target.username}`);
  // simplified example: scrape tweet text & image URLs
  const tweets = await page.evaluate(() => {
    const data = [];
    document.querySelectorAll('article').forEach(a => {
      const text = a.innerText;
      const img = a.querySelector('img')?.src;
      data.push({ text, imageUrl: img, scrapedAt: new Date().toISOString(), username: 'KPLC_Official' });
    });
    return data;
  });
  return tweets;
}