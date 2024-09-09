
const API_URL = 'http://localhost:8080';

export const getGames = async () => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", 
            },
            mode: 'cors', 
        });

        if (!response.ok) {
            throw new Error(`Error fetching messages: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
};
