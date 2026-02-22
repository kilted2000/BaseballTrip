import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import styles from "./chatbox.module.css";
import hotdog from "../assets/hotscroll.jpeg"; 

export default function ChatBot({ search = null, games = [] }) {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, isLoaded } = useUser();
  const clerkUserId = user?.id;

  const replyBoxRef = useRef(null);
  const hotdogRef = useRef(null);
  const trackRef = useRef(null);

// change the useEffect dependency array from [] to [reply]
useEffect(() => {
    const box = replyBoxRef.current;
    const img = hotdogRef.current;
    const track = trackRef.current;

    if (!box || !img || !track) return;

    
    img.style.top = "0px";

    const handleScroll = () => {
      const scrollRatio = box.scrollTop / (box.scrollHeight - box.clientHeight);
      const maxTop = track.clientHeight - img.clientHeight;
      img.style.top = (scrollRatio * maxTop) + "px";
    };

    box.addEventListener("scroll", handleScroll);
    return () => box.removeEventListener("scroll", handleScroll);
  }, [reply]); 

  const handleSend = async () => {
    if (!input.trim()) { setError("Please enter a question"); return; }
    if (!clerkUserId) { setError("User not authenticated"); return; }

    setLoading(true);
    setError("");
    setReply("");

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkUserId, userQuestion: input }),
      });

      const aiReply = await res.text();
      if (!res.ok) throw new Error(aiReply || `Request failed with status ${res.status}`);
      setReply(aiReply);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  if (!isLoaded) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 max-w-xl mx-auto bg-emerald-900 text-white rounded-lg shadow-lg">
        <p className="text-xl">Loading...</p>
      </div>
    </div>
  );

  if (!clerkUserId) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 max-w-xl mx-auto bg-emerald-900 text-white rounded-lg shadow-lg">
        <p className="text-xl">Please sign in to use Tubey.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="p-6 max-w-2xl w-full mx-auto bg-emerald-900 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Ask Tubey 🌭</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !loading && handleSend()}
            placeholder="Type your question..."
            className="flex-1 input input-bordered p-3 rounded !text-white !bg-gray-800 !caret-white placeholder:!text-gray-400"
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

        <div className={styles.replyWrapper}>
          <div ref={replyBoxRef} className={styles.replyBox}>
            {reply || (!loading && "Tubey's response will appear here.")}
          </div>
          <div ref={trackRef} className={styles.customTrack}>
            <img ref={hotdogRef} src={hotdog} className={styles.hotdog} alt="scroller" />
          </div>
        </div>

      </div>
    </div>
  );
}

