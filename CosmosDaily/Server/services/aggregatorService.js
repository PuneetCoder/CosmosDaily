const rss = require('./rssService');
const news = require('./newsApiService');

function similarity(a, b) {
  const wordsA = new Set(a.toLowerCase().split(' '));
  const wordsB = new Set(b.toLowerCase().split(' '));
  const intersection = [...wordsA].filter(w => wordsB.has(w));
  return intersection.length / Math.max(wordsA.size, wordsB.size);
}

exports.aggregate = async () => {
  const [rssData, newsData] = await Promise.all([
    rss.fetchAll(),
    news.fetchAll()
  ]);

  const combined = [...rssData, ...newsData];
  const unique = [];

  combined.forEach(article => {
    const exists = unique.find(u =>
      u.url === article.url ||
      similarity(u.title, article.title) > 0.7
    );

    if (!exists) unique.push(article);
  });

  console.log(`🧠 After dedup: ${unique.length}`);
  return unique;
};