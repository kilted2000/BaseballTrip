
const API_URL = import.meta.env.VITE_BACKEND_URL;


export const getGames = async () => {
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

export async function queryAI(prompt) {
  const response = await fetch('http://localhost:8080/api/ai/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  if (!response.ok) {
    throw new Error('AI API error');
  }
  return response.text(); // or response.json() if you return JSON
}
