const axios = require('axios');

exports.fetchAll = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const queries = [
      'space OR NASA OR astronomy OR SpaceX',
      'physics OR biology OR chemistry discovery',
      'quantum computing OR climate science OR medical breakthrough'
    ];

    const responses = await Promise.all(
      queries.map(q =>
        axios.get('https://newsapi.org/v2/everything', {
          params: {
            q,
            from: today,
            sortBy: 'publishedAt',
            language: 'en',
            apiKey: process.env.NEWS_API_KEY
          }
        })
      )
    );

    const articles = responses.flatMap(r =>
      r.data.articles.map(a => ({
        id: a.url,
        title: a.title,
        rawSummary: a.description,
        url: a.url,
        publishedAt: a.publishedAt,
        source: a.source.name,
        category: 'Science',
        imageUrl: a.urlToImage
      }))
    );

    console.log(`📰 NewsAPI fetched: ${articles.length}`);
    return articles;

  } catch (e) {
    console.log('⚠️ NewsAPI failed');
    return [];
  }
};