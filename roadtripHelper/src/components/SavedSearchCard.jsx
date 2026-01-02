import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchesByCrew, deleteSearch } from "../api/searchService";

export default function SavedSearchCard({ crewId }) {
  const [searches, setSearches] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!crewId) return;

    const loadSearches = async () => {
      try {
        const savedSearches = await getSearchesByCrew(crewId);
        setSearches(savedSearches);
      } catch (err) {
        console.error("Failed to load searches:", err);
      }
    };

    loadSearches();
  }, [crewId]);

  const handleDelete = async (e, searchId) => {
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this saved search?")) return;

    setDeletingId(searchId);
    try {
      await deleteSearch(searchId);
      setSearches(prev => prev.filter(s => s.id !== searchId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete search.");
    } finally {
      setDeletingId(null);
    }
  };

  if (!crewId) {
    return <p>Loading profile…</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Saved Searches</h2>

      {searches.length === 0 && (
        <p className="text-gray-500">No saved searches yet.</p>
      )}

      {searches.length > 0 && (
        <div className="space-y-3 max-h-[70vh] overflow-y-auto">
          {searches.map((search) => (
            <div
              key={search.id}
              className="p-4 border rounded-lg shadow hover:bg-gray-50 transition relative group"
            >
              <div
                onClick={() => navigate(`/saved-search/${search.id}`)}
                className="cursor-pointer pr-10"
              >
                <h3 className="font-semibold">
                  {search.title ?? "Saved Search"}
                </h3>
                <p className="text-sm text-gray-600">
                  {search.savedAt?.split("T")[0]}
                </p>
              </div>

              <button
                onClick={(e) => handleDelete(e, search.id)}
                disabled={deletingId === search.id}
                className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded transition opacity-0 group-hover:opacity-100 disabled:opacity-50"
              >
                {deletingId === search.id ? "…" : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

