const API_URL = import.meta.env.VITE_BACKEND_URL;


export const saveSearch = async (crewId, searchData) => {
    try {
        const response = await fetch(`${API_URL}/searches/${crewId}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(searchData),
            mode: 'cors',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Error saving search: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Error saving search:", err);
        throw err;
    }
};


export const getSearchesByCrew = async (crewId) => {
    try {
        const response = await fetch(`${API_URL}/searches/by-crew/${crewId}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
            mode: 'cors',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Error fetching searches: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Error fetching searches:", err);
        throw err;
    }
};


export const getSearchById = async (searchId) => {
    try {
        const response = await fetch(`${API_URL}/searches/${searchId}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
            mode: 'cors',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Error fetching search: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Error fetching search:", err);
        throw err;
    }
};


