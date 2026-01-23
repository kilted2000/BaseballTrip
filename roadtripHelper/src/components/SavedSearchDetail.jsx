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
        
        // Fetch the saved search
        const search = await getSearchById(id);
        console.log("Fetched search:", search); // Debug log
        
        if (!search) {
          setError("Search not found");
          return;
        }

        // Parse the searchTerm to get all the data
        let parsed;
        try {
          if (typeof search.searchTerm === "string") {
            // Try to parse as JSON
            parsed = JSON.parse(search.searchTerm);
          } else {
            parsed = search.searchTerm;
          }
        } catch (parseErr) {
          // If parsing fails, it's an old-format search (just a plain string)
          console.error("This is an old-format saved search:", search.searchTerm);
          setError("This saved search uses an old format and cannot be loaded. Please delete it and create a new search.");
          return;
        }

        console.log("Parsed search data:", parsed); // Debug log

        // Validate that parsed data has the required structure
        if (!parsed || typeof parsed !== "object" || !parsed.teams || !parsed.startDate || !parsed.endDate) {
          console.error("Invalid search data structure:", parsed);
          setError("This saved search is missing required data. Please delete it and create a new search.");
          return;
        }

        // Extract teams and dates from the parsed data
        const teams = parsed.teams;
        const startDate = new Date(parsed.startDate);
        const endDate = new Date(parsed.endDate);

        console.log("Teams:", teams);
        console.log("Date range:", startDate, "to", endDate);

        // Fetch all games
        const games = await getGames();

        // Filter games based on saved criteria
        const filteredGames = games.filter(game => {
          const gameDate = new Date(game.DateTime);
          return (
            teams.includes(game.HomeTeam) &&
            gameDate >= startDate &&
            gameDate <= endDate
          );
        });

        console.log("Filtered games:", filteredGames.length); // Debug log

        // Navigate to results page with filtered games
        navigate("/results", {
          state: { results: filteredGames }
        });
      } catch (err) {
        console.error("Failed to run saved search:", err);
        setError("Failed to load saved search: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      runSavedSearch();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="p-4 text-white text-xl bg-emerald-900 rounded-lg">
          Loading saved search...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 bg-emerald-900 text-white rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-4">Unable to Load Search</h2>
          <p className="text-red-400 mb-6">{error}</p>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate("/profile")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Back to Profile
            </button>
            <button 
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              New Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="p-4 text-white text-xl bg-emerald-900 rounded-lg">
        Redirecting to results...
      </p>
    </div>
  );
}