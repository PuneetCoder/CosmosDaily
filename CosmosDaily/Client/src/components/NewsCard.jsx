import { motion } from "framer-motion";

export default function NewsCard({ article, onClick, index }) {
  return (
    <motion.div
    onClick={() => window.open(article.url, "_blank")}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.03 }}
      className="bg-[#0f1729] rounded-xl overflow-hidden shadow-md cursor-pointer"
    >
      <img
  src={
    article?.imageUrl?.startsWith("http")
      ? article.imageUrl
      : `https://source.unsplash.com/800x450/?space,science`
  }
  alt="news"
  className="w-full h-48 object-cover"
  onError={(e) => {
    e.target.src = `https://picsum.photos/seed/${article?.id}/800/450`;
  }}
/>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-white mb-2">
          {article?.title || "No title"}
        </h2>

        <p className="text-sm text-gray-400">
          {(article?.summary || "No description").slice(0, 100)}...
        </p>

        <div className="text-xs text-gray-500 mt-3">
          {article?.source || "Unknown"}
        </div>
      </div>
    </motion.div>
  );
}