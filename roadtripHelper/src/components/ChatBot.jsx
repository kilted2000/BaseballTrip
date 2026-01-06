import { useState } from "react";
import { useUser } from "@clerk/clerk-react"; 

export default function ChatBot({ search = null, games = [] }) {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useUser(); 
  const clerkUserId = user?.id;

  const handleSend = async () => {
    if (!input.trim() || !clerkUserId) return;

    setLoading(true);
    setError("");
    setReply("");

    try {
      const payload = {
        clerkUserId,       
        userQuestion: input
      };

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("AI request failed");

      const aiReply = await res.text(); 
      setReply(aiReply);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setInput(""); 
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Ask Tubey</h2>

      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 input input-bordered p-2 rounded"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className="btn btn-primary"
          disabled={loading}
        >
          🌭 Ask
        </button>
      </div>

      {loading && <p className="text-gray-500 mb-2">Tubey is thinking...</p>}
      {error && <p className="text-red-500 mb-2">Error: {error}</p>}

      <div className="reply-box p-2 border rounded h-40 overflow-y-auto whitespace-pre-wrap">
        {reply || (!loading && "Tubey's response will appear here.")}
      </div>
    </div>
  );
}

