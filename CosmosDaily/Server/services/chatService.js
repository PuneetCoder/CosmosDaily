const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

function ruleBasedQuery(userInput) {
  const text = userInput.toLowerCase();

  if (text.includes("space") || text.includes("nasa")) {
    return "space NASA astronomy";
  }

  if (text.includes("black hole")) {
    return "black hole discovery";
  }

  if (text.includes("ai") || text.includes("artificial intelligence")) {
    return "AI research";
  }

  if (text.includes("quantum")) {
    return "quantum computing breakthrough";
  }

  if (text.includes("climate")) {
    return "climate change science";
  }

  if (text.includes("medicine") || text.includes("health")) {
    return "medical research breakthrough";
  }

  // fallback → use user input directly
  return userInput;
}

async function fetchNews(query) {
  try {
    const res = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: query,
        apiKey: process.env.NEWS_API_KEY,
        sortBy: "publishedAt",
        language: "en",
        pageSize: 5,
      },
    });

    return res.data.articles || [];
  } catch (err) {
    console.log("News fetch failed");
    return [];
  }
}

exports.chat = async (messages) => {
  const userMessage = messages[messages.length - 1]?.content || "";

  let query = null;
  let usedAI = false;

  // 🔥 STEP 1 — TRY GEMINI
  try {
    const prompt = `
Extract a science news search query from:
"${userMessage}"

Return JSON ONLY:
{"query":"..."} OR {"query":null}
`;

    const res = await model.generateContent(prompt);
    const text = res.response.text();

    const parsed = JSON.parse(text);
    query = parsed.query;

    usedAI = true;
  } catch (err) {
    console.log("⚠️ Gemini failed → switching to rule-based");
  }

  // 🔥 STEP 2 — RULE-BASED FALLBACK
  if (!query) {
    query = ruleBasedQuery(userMessage);
  }

  // 🔥 STEP 3 — FETCH NEWS
  const articles = await fetchNews(query);

  // 🔥 STEP 4 — GENERATE RESPONSE
  let reply = "";

  if (articles.length) {
    reply = `📰 Here are latest updates about "${query}"`;
  } else {
    reply = `🤔 Couldn't find much on "${query}", try another topic!`;
  }

  // Add small intelligence hint
  if (!usedAI) {
    reply += " (fallback mode)";
  }

  return {
    reply,
    newsResults: articles,
  };
};