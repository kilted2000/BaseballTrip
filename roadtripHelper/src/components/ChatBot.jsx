import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react"; 

export default function ChatBot({ search = null, games = [] }) {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, isLoaded } = useUser(); 
  const clerkUserId = user?.id;

  // Debug: Log user info on mount
  useEffect(() => {
    console.log("ChatBot mounted");
    console.log("Clerk isLoaded:", isLoaded);
    console.log("User object:", user);
    console.log("ClerkUserId:", clerkUserId);
    console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
  }, [user, isLoaded, clerkUserId]);

  const handleSend = async () => {
    if (!input.trim()) {
      setError("Please enter a question");
      return;
    }
    
    if (!clerkUserId) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError("");
    setReply("");

    try {
      const payload = {
        clerkUserId,       
        userQuestion: input
      };

      console.log("=== SENDING REQUEST ===");
      console.log("Payload:", payload);
      console.log("URL:", `${import.meta.env.VITE_BACKEND_URL}/api/ai/query`);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", res.status);
      console.log("Response ok:", res.ok);

      const aiReply = await res.text();
      console.log("Response body:", aiReply);
      
      if (!res.ok) {
        throw new Error(aiReply || `Request failed with status ${res.status}`);
      }

      setReply(aiReply);
    } catch (err) {
      console.error("ChatBot error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      setInput(""); 
    }
  };

  // Wait for Clerk to load
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 max-w-xl mx-auto bg-emerald-900 text-white rounded-lg shadow-lg">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!clerkUserId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 max-w-xl mx-auto bg-emerald-900 text-white rounded-lg shadow-lg">
          <p className="text-xl">Please sign in to use Tubey.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="p-6 max-w-2xl w-full mx-auto bg-emerald-900 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Ask Tubey 🌭</h2>
        
      

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
            placeholder="Type your question..."
            className="flex-1 input input-bordered p-3 rounded text-white"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            className="btn btn-primary px-6 bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "..." : "Ask"}
          </button>
        </div>

        {loading && <p className="text-gray-300 mb-4">Tubey is thinking...</p>}
        {error && (
          <p className="text-red-400 mb-4 p-3 bg-red-900/50 rounded">
            Error: {error}
          </p>
        )}

        <div className="reply-box p-4 border border-emerald-700 rounded min-h-[15rem] bg-emerald-800 overflow-y-auto whitespace-pre-wrap">
          {reply || (!loading && "Tubey's response will appear here.")}
        </div>
      </div>
    </div>
  );
}

