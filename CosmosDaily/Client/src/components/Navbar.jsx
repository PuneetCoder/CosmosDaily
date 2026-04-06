import { useEffect, useState } from "react";

export default function Navbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/10 px-6 py-4 flex justify-between">
      <h1 className="text-cyan-400 font-bold text-xl">🔭 CosmosDaily</h1>
      <p className="text-sm text-gray-400">{time}</p>
    </div>
  );
}