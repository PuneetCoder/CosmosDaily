const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash'
});

exports.filterAndEnrich = async (articles) => {
  if (!articles.length) return [];

  const batches = [];
  for (let i = 0; i < articles.length; i += 10) {
    batches.push(articles.slice(i, i + 10));
  }

  const results = [];

  for (const batch of batches) {
    try {
      const prompt = `
You are a science news editor.
Return JSON only.

${JSON.stringify(batch)}
`;

      const res = await model.generateContent(prompt);
      const text = res.response.text();

      const parsed = JSON.parse(text);
      results.push(...parsed);

    } catch (err) {
      console.log("⚠️ Gemini failed:", err.message);

      // ✅ FALLBACK (IMPORTANT)
      const fallback = batch.map(a => ({
        id: a.id,
        title: a.title,
        summary: (a.rawSummary || '').slice(0, 150),
        url: a.url,
        publishedAt: a.publishedAt,
        source: a.source,
        category: a.category || 'Science',
        imageQuery: 'space science',
        readTime: 3,
        region: 'Global',
        originalImageUrl: a.imageUrl
      }));

      results.push(...fallback);
    }
  }

  return results.map(a => ({
    ...a,
    imageUrl:
      a.originalImageUrl ||
      `https://source.unsplash.com/800x450/?${a.imageQuery}`
  }));
};