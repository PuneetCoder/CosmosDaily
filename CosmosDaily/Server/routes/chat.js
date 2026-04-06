const express = require('express');
const router = express.Router();

const chatService = require('../services/chatService');

router.post('/', async (req, res) => {
  const { messages } = req.body;

  const result = await chatService.chat(messages);

  res.json(result);
});

module.exports = router;