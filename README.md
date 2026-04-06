# 🌌 CosmosDaily

CosmosDaily is a modern AI-powered science news platform that aggregates, filters, and presents the latest discoveries in space, technology, and research — with an interactive chat assistant.

---

## 🚀 Features

### 📰 News Aggregation

* Fetches latest news from:

  * NewsAPI
  * RSS feeds
* Deduplicates and enriches articles
* Displays clean, card-based UI

### 🎨 Frontend UI

* Responsive design (1–3 cards per row)
* Image + title + short description
* Smooth animations using Framer Motion
* Modal view for detailed reading
* Direct link to original source

### 💬 AI Chat (CosmosAI)

* Chat-based interface for querying news
* Understands user intent (AI / Space / Quantum, etc.)
* Fetches relevant news dynamically

### ⚙️ Smart Fallback System

* Uses Gemini AI when available
* Falls back to rule-based logic if quota is exceeded
* Ensures app never breaks

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion
* Axios

### Backend

* Node.js
* Express.js
* Axios
* RSS Parser
* Gemini API (optional)

---

## 📁 Project Structure

```
CosmosAI_Project/
│
├── client/                # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── services/
│
├── server/                # Backend (Node.js)
│   ├── routes/
│   ├── services/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone <your-repo-url>
cd CosmosAI_Project
```

---

### 2️⃣ Backend Setup

```
cd server
npm install
```

#### Create `.env` file

```
PORT=5000
NEWS_API_KEY=your_newsapi_key
GEMINI_API_KEY=your_gemini_key   # optional
```

#### Run backend

```
node server.js
```

---

### 3️⃣ Frontend Setup

```
cd ../client
npm install
npm run dev
```

---

## 🌐 Access the App

* Frontend: http://localhost:5173
* Backend API: http://localhost:5000/api/news

---

## 🧪 Example Queries (Chat)

Try asking:

* "latest AI news"
* "black hole discoveries"
* "NASA missions"
* "quantum computing breakthroughs"

---

## 🛡️ Fallback Logic

If Gemini API fails:

* System switches to rule-based query extraction
* Still fetches and returns relevant news
* No user-facing errors

---

## 💎 Future Improvements

* Show news cards inside chat
* User personalization (interests)
* Bookmark / save articles
* Dark/light theme toggle
* Deployment (Vercel + Render)

---

## 🤝 Contribution

Feel free to fork and improve the project!

---

## 📌 Note

This project is designed as a **production-ready application**, not just a portfolio demo.

---

## 👨‍💻 Author

Puneet Sharma

---
