const categories = [
    "All",
    "Space",
    "Astronomy",
    "Physics",
    "Biology",
    "Technology",
    "Medicine"
  ];
  
  export default function FilterBar({ active, setActive }) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-4 px-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full border text-sm transition
              ${
                active === cat
                  ? "bg-cyan-400 text-black border-cyan-400"
                  : "text-gray-400 border-white/10 hover:border-cyan-400 hover:text-cyan-400"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    );
  }