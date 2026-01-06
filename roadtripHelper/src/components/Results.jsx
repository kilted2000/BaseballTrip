import { UserButton } from "@clerk/clerk-react";
import { saveSearch, getSearchesByCrew } from "../api/searchService";
import { useUser } from "@clerk/clerk-react";
import { getOrCreateCrewId } from "../api/crewService";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Results = ({ setAiContext }) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const results = state?.results || state?.games || [];
  const [title, setTitle] = useState("");
  const { user } = useUser();
  const [crewId, setCrewId] = useState(null);

  if (!results.length) return <p className="p-4">No results to display.</p>;

  const teams = [...new Set(results.map(r => r.HomeTeam))];

  const startDate = results.reduce(
    (min, r) => new Date(r.DateTime) < min ? new Date(r.DateTime) : min,
    new Date(results[0].DateTime)
  );

  const endDate = results.reduce(
    (max, r) => new Date(r.DateTime) > max ? new Date(r.DateTime) : max,
    new Date(results[0].DateTime)
  );

  const formatDate = (dateString) => {
    const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const uniqueDates = [...new Set(results.map(r => r.DateTime))]
    .sort((a, b) => new Date(a) - new Date(b))
    .map(formatDate);

  useEffect(() => {
    const loadCrew = async () => {
      if (!user) return;
      const id = await getOrCreateCrewId(user);
      setCrewId(id);
    };
    loadCrew();
  }, [user]);

const handleSaveSearch = async () => {
  if (!title.trim()) {
    document.getElementById("errorSave").showModal();
    return;
  }

  const searchData = {
    title,
    teams: teams.join(","),
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
    crew: { id: crewId }
  };

  await saveSearch(searchData);
  document.getElementById("saveSearch").showModal();
};


  return (
    
    <div className="bg-emerald-900 text-slate-200 rounded-lg overflow-x-auto w-full">
      <div className="p-4 space-y-6 ">
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
              {teams.map((team, i) => <th key={i} className="text-center">{team}</th>)}
            </tr>
          </thead>
          <tbody>
            {uniqueDates.map((date, i) => (
              <tr key={i} className="hover">
                <td className="font-bold">{date}</td>
                {teams.map((team, j) => {
                  const hasGame = results.some(
                    r => r.HomeTeam === team && formatDate(r.DateTime) === date
                  );
                  return <td key={j} className="text-center">{hasGame ? "🌭" : ""}</td>;
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
    
  );
};

export default Results;

