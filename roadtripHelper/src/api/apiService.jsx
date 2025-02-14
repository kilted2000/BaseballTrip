
const API_URL = import.meta.env.VITE_BACKEND_URL;
console.log(API_URL);
export const getGames = async () => {
    try {
        console.log("Fetching games...");
        const response = await fetch(`${API_URL}/games`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                // "Access-Control-Allow-Origin": "*", 
            },
            mode: 'cors', 
            credentials: 'include',
            // body: JSON.stringify({ content }),
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
