export async function fetchTweets(page, target) {
  const url = `https://x.com/${target.username}`;
  console.log('Opening:', url);

  // Navigate without waiting for networkidle (X never fully "stops" loading)
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Wait for at least one tweet article to appear
  await page.waitForSelector('article');

  // Scroll a few times to load images
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    await page.waitForTimeout(1000); // wait 1 second for tweets to load
  }

  // Grab tweets with images
  const tweets = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('article').forEach(article => {
      const img = article.querySelector('img[src*="media"]');
      if (!img) return;

      results.push({
        text: article.innerText,
        imageUrl: img.src
      });
    });
    return results;
  });

  console.log(`Found ${tweets.length} tweets with images`);
  return tweets;
}