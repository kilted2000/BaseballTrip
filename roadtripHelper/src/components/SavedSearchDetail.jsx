import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGames } from "../api/apiService";
import { getSearchById } from "../api/searchService";

export default function SavedSearchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const runSavedSearch = async () => {
      try {
        setLoading(true);
        
        // Fetch the saved search data
        const search = await getSearchById(id);
        
        if (!search) {
          setError("Search not found");
          return;
        }

        // Fetch all games
        const games = await getGames();

        // Parse the saved search parameters
        const teams = search.teams.split(",").map(t => t.trim());
        const startDate = new Date(search.startDate);
        const endDate = new Date(search.endDate);

        // Filter games based on saved criteria
        const filteredGames = games.filter(game => {
          const gameDate = new Date(game.DateTime);
          return (
            teams.includes(game.HomeTeam) &&
            gameDate >= startDate &&
            gameDate <= endDate
          );
        });

        // Navigate to results page with filtered games
        navigate("/results", {
          state: { results: filteredGames }
        });
      } catch (err) {
        console.error("Failed to run saved search:", err);
        setError("Failed to load saved search");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      runSavedSearch();
    }
  }, [id, navigate]);

  if (loading) {
    return <p className="p-4">Loading saved search...</p>;
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => navigate("/profile")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Profile
        </button>
      </div>
    );
  }

  return <p className="p-4">Redirecting to results...</p>;
}
