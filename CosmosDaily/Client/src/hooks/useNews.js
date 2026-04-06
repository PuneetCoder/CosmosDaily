import { useEffect, useState } from "react";
import { fetchNews } from "../services/api";

export default function useNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNews = async () => {
    try {
      const res = await fetchNews();
      setArticles(res.data?.articles || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  return { articles, loading };
}