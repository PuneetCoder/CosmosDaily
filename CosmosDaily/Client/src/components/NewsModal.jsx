import { motion } from "framer-motion";

export default function NewsModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#0f1729] max-w-2xl w-full rounded-xl overflow-hidden"
      >
        <img
          src={article.imageUrl}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h2 className="text-2xl font-bold">{article.title}</h2>

          <p className="text-gray-400 mt-4">
            {article.summary}
          </p>

          <div className="mt-6 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {article.source}
            </span>

            <a
              href={article.url}
              target="_blank"
              className="bg-cyan-400 text-black px-4 py-2 rounded"
            >
              Read Full →
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}