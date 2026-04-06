import { useState } from "react";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import useNews from "../hooks/useNews";
import ChatWidget from "../components/ChatWidget";

export default function HomePage() {
  const { articles, loading } = useNews();
  const [selected, setSelected] = useState(null);

  console.log("ARTICLES:", articles);

  return (
    <div>
      <Navbar />

      <h1 className="text-3xl font-bold px-6 mt-6">
        🌌 Today's Discoveries
      </h1>

      {/* GRID */}
      <div style={{
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  padding: "20px"
}}>
        {loading ? (
          <p>Loading...</p>
        ) : articles?.length ? (
          articles.map((a, i) => (
            <NewsCard
              key={a.id}
              article={a}
              index={i}
              onClick={setSelected}
            />
          ))
        ) : (
          <p>No articles found</p>
        )}
      </div>
      <ChatWidget />
    </div>
  );

}