import { useUser } from "@clerk/clerk-react";
import { getOrCreateCrewId } from "../api/crewService";
import { getSearchesByCrew } from "../api/searchService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SavedSearchCard() {
  const { user } = useUser();
  const [crewId, setCrewId] = useState(null);
  const [searches, setSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const setupCrew = async () => {
      const id = await getOrCreateCrewId(user);
      if (!id) return;

      setCrewId(id);

      const savedSearches = await getSearchesByCrew(id);
      setSearches(savedSearches);
    };

    setupCrew();
  }, [user]);
console.log("Searches from API:", searches);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Saved Searches</h2>

      {!crewId && <p>Loading...</p>}

      {crewId && searches.length === 0 && (
        <p>No saved searches yet.</p>
      )}

      {crewId && searches.length > 0 && (
        <div className="space-y-3 max-h-[70vh] overflow-y-auto">
          {searches.map((search) => (
            <div
              key={search.id}
              onClick={() => navigate(`/saved-search/${search.id}`)}
              className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100 transition"
            >
              <h3 className="font-semibold">
                {search.title ?? "Saved Search"}
              </h3>
              <p className="text-sm text-gray-600">
                {search.savedAt?.split("T")[0]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
