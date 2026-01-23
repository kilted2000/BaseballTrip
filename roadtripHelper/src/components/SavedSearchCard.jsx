import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchesByCrew, deleteSearch } from "../api/searchService";

export default function SavedSearchCard({ crewId }) {
  const [searches, setSearches] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!crewId) return;

    const loadSearches = async () => {
      try {
        const savedSearches = await getSearchesByCrew(crewId);
        setSearches(savedSearches ?? []);
      } catch (err) {
        console.error("Failed to load searches:", err);
      }
    };

    loadSearches();
  }, [crewId]);

  const handleDelete = (e, searchId) => {
    e.stopPropagation();
    setConfirmDeleteId(searchId);
    document.getElementById("confirmDelete")?.showModal();
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;

    setDeletingId(confirmDeleteId);
    try {
      await deleteSearch(confirmDeleteId);
      setSearches((prev) => prev.filter((s) => s.id !== confirmDeleteId));
    } catch (err) {
      console.error(err);
      document.getElementById("deleteError")?.showModal();
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
      document.getElementById("confirmDelete")?.close();
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
          {searches.map((search) => {
            // --- SAFE parsing ---
            let parsed = null;

            if (typeof search.searchTerm === "string") {
              try {
                parsed = JSON.parse(search.searchTerm);
              } catch {
                parsed = null;
              }
            }

            const title =
              parsed && typeof parsed === "object" && parsed.title
                ? parsed.title
                : search.searchTerm ?? "Saved Search";

            return (
              <div
                key={search.id}
                className="p-4 border rounded-lg shadow hover:bg-gray-50 transition relative group"
              >
                <div
                  onClick={() => navigate(`/saved-search/${search.id}`)}
                  className="cursor-pointer pr-10"
                >
                  <h3 className="font-semibold">{title}</h3>

                  <p className="text-sm text-gray-600">
                    {search.savedAt
                      ? new Date(search.savedAt).toLocaleDateString()
                      : ""}
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
            );
          })}
        </div>
      )}

      {/* Delete error modal */}
      <dialog id="deleteError" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Search not deleted.</h3>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Confirm delete modal */}
      <dialog id="confirmDelete" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete this saved search?</h3>
          <p className="py-2 text-sm text-gray-600">
            This action cannot be undone.
          </p>

          <div className="modal-action">
            <button className="btn btn-error" onClick={confirmDelete}>
              Yes, delete
            </button>

            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

