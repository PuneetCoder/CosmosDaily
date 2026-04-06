require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');

const newsRoutes = require('./routes/news');
const chatRoutes = require('./routes/chat');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use('/api/news', newsRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  const { refreshNewsCache } = require('./routes/news');
  await refreshNewsCache();
});

// Cron (3x/day)
cron.schedule('0 6,12,18 * * *', async () => {
  console.log('⏰ Cron refreshing news...');
  const { refreshNewsCache } = require('./routes/news');
  await refreshNewsCache();
});