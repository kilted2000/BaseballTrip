// Add this function to your searchService.jsx file

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getSearchById = async (searchId) => {
  const response = await fetch(`${API_URL}/api/searches/${searchId}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch search: ${response.statusText}`);
  }
  
  return await response.json();
};

export const getSearchesByCrew = async (crewId) => {
  const response = await fetch(`${API_URL}/api/searches/crew/${crewId}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch searches: ${response.statusText}`);
  }
  
  return await response.json();
};

export const saveSearch = async (searchData) => {
  const response = await fetch(`${API_URL}/api/searches`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(searchData),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to save search: ${response.statusText}`);
  }
  
  return await response.json();
};

export const deleteSearch = async (searchId) => {
  const response = await fetch(`${API_URL}/api/searches/${searchId}`, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete search: ${response.statusText}`);
  }
  
  // Check if response has content before parsing JSON
  const text = await response.text();
  return text ? JSON.parse(text) : { success: true };
};


