const Parser = require('rss-parser');
const parser = new Parser();
const crypto = require('crypto');

const RSS_FEEDS = [
  { url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss', category: 'Space', source: 'NASA' },
  { url: 'https://spacenews.com/feed/', category: 'Space', source: 'SpaceNews' },
  { url: 'https://www.esa.int/rssfeed/Our_Activities/Space_Science', category: 'Astronomy', source: 'ESA' },
  { url: 'https://www.sciencedaily.com/rss/space_time.xml', category: 'Space', source: 'ScienceDaily' },
  { url: 'https://www.sciencedaily.com/rss/computers_math.xml', category: 'Technology', source: 'ScienceDaily' },
  { url: 'https://phys.org/rss-feed/', category: 'Physics', source: 'Phys.org' }
];

const stripHTML = (html) => html?.replace(/<[^>]*>/g, '') || '';

exports.fetchAll = async () => {
  const results = await Promise.allSettled(
    RSS_FEEDS.map(feed => parser.parseURL(feed.url))
  );

  const today = new Date().toISOString().split('T')[0];
  const articles = [];

  results.forEach((res, idx) => {
    if (res.status === 'fulfilled') {
      res.value.items.forEach(item => {
        const date = new Date(item.pubDate || item.isoDate)
          .toISOString()
          .split('T')[0];

        if (date === today) {
          articles.push({
            id: crypto.createHash('md5').update(item.link).digest('hex'),
            title: item.title,
            rawSummary: stripHTML(item.contentSnippet || item.content),
            url: item.link,
            publishedAt: item.pubDate,
            source: RSS_FEEDS[idx].source,
            category: RSS_FEEDS[idx].category,
            imageUrl: item.enclosure?.url || null
          });
        }
      });
    }
  });

  console.log(`🛰️ RSS fetched: ${articles.length}`);
  return articles;
};