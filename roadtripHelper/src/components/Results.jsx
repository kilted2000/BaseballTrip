import { UserButton } from "@clerk/clerk-react";
import { saveSearch } from "../api/searchService";
import { useUser } from "@clerk/clerk-react";
import { getOrCreateCrewId } from "../api/crewService";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatBot from "../components/ChatBot";

export const Results = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  // Support both data structures
  const results = state?.results || state?.games || [];
  const search = state?.search;

  const [title, setTitle] = useState("");
  const { user } = useUser();
  const [crewId, setCrewId] = useState(null);

  // Early return if no results
  if (!results.length) {
    return <p className="p-4">No results to display.</p>;
  }

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
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const uniqueDates = [...new Set(results.map(result => result.DateTime))]
    .sort((a, b) => new Date(a) - new Date(b))
    .map(date => formatDate(date));
  
  const uniqueTeams = [...new Set(results.map(result => result.HomeTeam))];

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
      alert("Please enter a title before saving.");
      return;
    }

    const searchData = {
      title,
      teams: teams.join(","),
      startDate,
      endDate,
    };

    await saveSearch(crewId, searchData);
    alert("Search saved!");
  };

  return (
    <div className="bg-emerald-900 text-slate-200 rounded-lg overflow-x-auto w-full">
      <div className="navbar bg-base-300 mt-0">
        <a className="btn btn-ghost text-xl">Baseball Bucketlist</a>
        <div className="ml-auto">
          <UserButton className="absolute top-0 right-0 mt-4 mx-4 text-sky-500" />
          <button onClick={() => navigate("/")}>Back</button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Save Search Section */}
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

        {/* Results Table */}
        <table className="table w-full">
          <thead>
            <tr>
              <th></th> 
              {uniqueTeams.map((team, index) => (
                <th key={index} className="text-center">{team}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uniqueDates.map((date, dateIndex) => (
              <tr key={dateIndex} className="hover">
                <td className="font-bold">{date}</td>
                {uniqueTeams.map((team, teamIndex) => {
                  const hasGame = results.some(
                    result => 
                      result.HomeTeam === team && 
                      formatDate(result.DateTime) === date
                  );
                  return (
                    <td key={teamIndex} className="text-center">
                      {hasGame ? "🌭" : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Game List (from second component) */}
        <div>
          <h2 className="text-xl font-bold mb-4">Game Details</h2>
          <ul className="space-y-2">
            {results.map((g, idx) => (
              <li key={idx} className="border p-2 rounded bg-emerald-800">
                {g.AwayTeam} at {g.HomeTeam} — {g.Stadium}
              </li>
            ))}
          </ul>
        </div>

        {/* ChatBot Section */}
        {search && <ChatBot search={search} games={results} />}
      </div>
    </div>
  );
};

export default Results;
