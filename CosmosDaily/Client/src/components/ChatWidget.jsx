import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "👋 Hi! Ask me about space or science!" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
  
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: newMessages })
      });
  
      const data = await res.json();
  
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.reply }
      ]);
  
      // 🔥 Show news results (simple)
      if (data.newsResults?.length) {
        console.log("NEWS:", data.newsResults);
      }
  
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "⚠️ Error connecting to AI" }
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-cyan-400 text-black p-4 rounded-full shadow-lg"
        >
          💬
        </button>
      )}

      {/* CHAT PANEL */}
      {open && (
        <div className="w-80 h-[500px] bg-[#0f1729] rounded-xl shadow-xl flex flex-col">
          
          {/* HEADER */}
          <div className="p-3 border-b border-white/10 flex justify-between">
            <span>🔭 CosmosAI</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-cyan-400 text-black ml-auto"
                    : "bg-white/10"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border border-white/10 rounded px-2 py-1 text-sm"
              placeholder="Ask something..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-cyan-400 text-black px-3 rounded"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}