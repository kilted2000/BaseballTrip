import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getSearchById } from "../api/searchService";
import { getGames } from "../api/apiService";

export default function SavedSearchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const runSavedSearch = async () => {
      const search = await getSearchById(id);
      const games = await getGames();

      const teams = search.teams.split(",");
      const startDate = new Date(search.startDate);
      const endDate = new Date(search.endDate);

      const filteredGames = games.filter(game => {
        const gameDate = new Date(game.DateTime);
        return (
          teams.includes(game.HomeTeam) &&
          gameDate >= startDate &&
          gameDate <= endDate
        );
      });

      navigate("/results", {
        state: { results: filteredGames }
      });
    };

    runSavedSearch();
  }, [id, navigate]);

  return <p className="p-4">Loading saved search...</p>;
}
