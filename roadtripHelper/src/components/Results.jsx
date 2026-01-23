import { useUser } from "@clerk/clerk-react";
import { getOrCreateCrewId } from "../api/crewService";
import { saveSearch } from "../api/searchService";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const results = location.state?.results || location.state?.games || [];
  const [title, setTitle] = useState("");
  const { user } = useUser();
  const [crewId, setCrewId] = useState(null);

  // Debug logs
  console.log("Results component - location.state:", location.state);
  console.log("Results component - results array:", results);
  console.log("Results component - results length:", results.length);

  useEffect(() => {
    const loadCrew = async () => {
      if (!user) return;
      const id = await getOrCreateCrewId(user);
      setCrewId(id);
    };
    loadCrew();
  }, [user]);

  if (!results.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="p-4 text-white text-xl bg-emerald-900 rounded-lg">
          No results to display.
        </p>
      </div>
    );
  }

  const teams = [...new Set(results.map((r) => r.HomeTeam))];

  const startDate = results.reduce(
    (min, r) => (new Date(r.DateTime) < min ? new Date(r.DateTime) : min),
    new Date(results[0].DateTime)
  );

  const endDate = results.reduce(
    (max, r) => (new Date(r.DateTime) > max ? new Date(r.DateTime) : max),
    new Date(results[0].DateTime)
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const uniqueDates = [...new Set(results.map(r => formatDate(r.DateTime)))];

  const handleSaveSearch = async () => {
    if (!title.trim()) {
      document.getElementById("errorSave").showModal();
      return;
    }

    const searchPayload = {
      title,
      teams,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    await saveSearch({
      crewId,
      searchTerm: JSON.stringify(searchPayload),
    });

    document.getElementById("saveSearch").showModal();
  };

  return (
    <div className="min-h-screen p-8">
      <div className="bg-emerald-900 text-slate-200 rounded-lg overflow-x-auto w-full">
        <div className="p-4 space-y-6">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Title for this search"
              className="input input-bordered w-full max-w-xs"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              onClick={handleSaveSearch}
              className="btn btn-primary"
              disabled={!crewId}
            >
              Save Search
            </button>
          </div>
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                {teams.map((team, i) => (
                  <th key={i} className="text-center">
                    {team}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uniqueDates.map((date, i) => (
                <tr key={i} className="hover">
                  <td className="font-bold">{date}</td>
                  {teams.map((team, j) => {
                    const hasGame = results.some(
                      (r) =>
                        r.HomeTeam === team && formatDate(r.DateTime) === date
                    );
                    return (
                      <td key={j} className="text-center">
                        {hasGame ? "🌭" : ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <dialog id="errorSave" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Please enter a title before saving.
            </h3>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        <dialog id="saveSearch" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Search Saved!</h3>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}





