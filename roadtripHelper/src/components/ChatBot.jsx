import { useState } from "react";

export default function ChatBot({ search = null, games = [] }) {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setReply("");

    try {
      const fullPrompt = `
You are Tubey, a friendly, knowledgeable MLB road-trip assistant.
You sound like a helpful baseball fan who plans trips for friends.

STYLE GUIDELINES:
- Be conversational and natural, not formal
- Keep answers concise but specific
- Use team names, stadium names, and dates when available
- Make clear recommendations instead of listing options
- Use bullet points only when helpful

HOW TO USE CONTEXT:
- If game data is provided, base your answer on those games first
- If multiple games fit, compare them briefly
- If no context is provided, answer generally about MLB travel

STYLE:
- Conversational and natural
- Specific, not generic
- Confident but friendly

BEHAVIOR RULES:
- Use provided game and search data whenever available
- If important information is missing, ask one or two short clarifying questions
- When asking questions, briefly explain why
- If possible, still give a partial recommendation

USER QUESTION:
${input}

${search ? `
SAVED SEARCH CONTEXT:
Teams: ${search.teams}
Date Range: ${search.startDate} → ${search.endDate}
` : ""}

${games?.length ? `
GAMES CONTEXT:
${games.map(g =>
  `- ${g.AwayTeam} at ${g.HomeTeam} (${g.Stadium}) on ${g.DateTime}`
).join("\n")}
` : ""}

If no search or game context is provided, answer generally.
`;


      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/ai/query`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: fullPrompt }),
        }
      );

      if (!res.ok) throw new Error("AI request failed");

      const aiReply = await res.text(); 
      setReply(aiReply);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-2 text-black">Ask Tubey</h2>

      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What Now?"
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

      <div className="reply-box p-2 border rounded h-dvh overflow-y-auto whitespace-pre-wrap text-black">
        {reply || (!loading && "Tubey's response will appear here.")}
      </div>
    </div>
  );
}
