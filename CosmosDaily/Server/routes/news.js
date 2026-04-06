const express = require('express');
const router = express.Router();

const agg = require('../services/aggregatorService');
const gemini = require('../services/geminiService');

let cache = { data: null, timestamp: null };

async function refreshNewsCache() {
  console.log('🔄 Refreshing news...');
  const raw = await agg.aggregate();
  const enriched = await gemini.filterAndEnrich(raw);

  cache = {
    data: enriched,
    timestamp: new Date()
  };
}

router.get('/', async (req, res) => {
  const now = Date.now();

  if (
    cache.data &&
    now - new Date(cache.timestamp).getTime() < 30 * 60 * 1000
  ) {
    console.log('⚡ Cache hit');
    return res.json({ articles: cache.data });
  }

  if (!cache.data) {
    await refreshNewsCache();
  }
  res.json({ articles: cache.data });
});

router.get('/refresh', async (req, res) => {
  await refreshNewsCache();
  res.json({ success: true });
});

module.exports = router;
module.exports.refreshNewsCache = refreshNewsCache;