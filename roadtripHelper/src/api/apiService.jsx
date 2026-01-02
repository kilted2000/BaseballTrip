import { mockGames } from "../mock/mockGames";

const USE_MOCK_DATA = true; 

const API_URL = import.meta.env.VITE_BACKEND_URL;


export const getGames = async () => {
  if (USE_MOCK_DATA) {
     console.log("Using mock games");
    return mockGames;
  }

  const res = await fetch("/api/games");
  return res.json();
    try {
        console.log("Fetching games...");
        const response = await fetch(`${API_URL}/games`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            mode: 'cors', 
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Error fetching messages: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data fetched: ", data);
        return data;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
};

export async function queryAI({ userPrompt, searchContext, games }) {
  const response = await fetch(`${API_URL}/ai/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userPrompt,
      searchContext,
      games
    }),
  });

  if (!response.ok) {
    throw new Error("AI API error");
  }

 const res = await fetch(url);

if (res.status === 404 || res.status === 204) {
  return null;
}

const text = await res.text();
if (!text) return null;

return JSON.parse(text);

}


  

