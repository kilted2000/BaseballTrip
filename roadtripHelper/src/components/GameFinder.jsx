import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getGames } from "../api/apiService";
import teams from "../TeamList.json";
import { DatePicker } from "./DatePicker";
import { Results } from "./Results";
const GameFinder = () => {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
  });
  const [homeTeams, setHomeTeams] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getTeamAbbreviation = (teamInput) => {
    if (!teamInput || typeof teamInput !== "string") {
      console.error("Invalid team input:", teamInput);
      return null;
    }
    const lowerInput = teamInput.toLowerCase();

    const flatTeams = teams[0];

    const team = flatTeams.find(
      (t) =>
        t.name.toLowerCase().includes(lowerInput) ||
        t.city.toLowerCase().includes(lowerInput) ||
        t.nickname.toLowerCase().includes(lowerInput)
    );

    return team ? team.abbreviation : null;
  };

  const isWithinDateRange = (date, startDate, endDate) => {
    const gameDate = new Date(date);
    return gameDate >= startDate && gameDate <= endDate;
  };

  useEffect(() => {
    const fetchGames = async () => {
      if (homeTeams.length === 0) {
        console.warn("No teams entered.");
        return;
      }
      if (homeTeams.length > 0 && dateRange.startDate && dateRange.endDate) {
        try {
          const data = await getGames();
          const filteredResults = data.filter((game) => {
            const homeTeam = game.HomeTeam || null;
            return (
              homeTeams.some((teamInput) => {
                const teamAbbreviation = getTeamAbbreviation(teamInput);
                return teamAbbreviation && homeTeam.includes(teamAbbreviation);
              }) &&
              isWithinDateRange(
                game.Day,
                dateRange.startDate,
                dateRange.endDate
              )
            );
          });

          console.log(filteredResults);
          setResults(filteredResults);
        } catch (error) {
          console.error("Failed to fetch games.", error);
        }
      }
    };

    fetchGames();
  }, [homeTeams, dateRange]);

  const onSubmit = ({ teamOne, teamTwo, teamThree, teamFour }) => {
    const enteredTeams = [teamOne, teamTwo, teamThree, teamFour]
      .filter(Boolean)
      .map((team) => team.trim().toLowerCase());

    setHomeTeams(enteredTeams);
    setShowResults(true);
  };

  return (
    <div className="bg-[url('./assets/stadium.jpg')] bg-cover bg-repeat-y h-full object-cover justify-center items-center flex flex-col h-dvh">
      {!showResults ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-600 bg-no-repeat p-9 shadow-2xl shadow-green-900 space-y-4 flex flex-col gap-4"
        >
          <div>
            <label className="w-1/2">
              Team:
              <input
                {...register("teamOne", { pattern: /^[a-z|\s]+$/i })}
                type="text"
                placeholder="Enter Team Name"
              />
            </label>
            <label className="w-1/2">
              Team:
              <input
                {...register("teamTwo", { pattern: /^[a-z\s]+$/i })}
                type="text"
                placeholder="Enter Team Name"
              />
            </label>
          </div>
          <div>
            <label className="w-1/2">
              Team:
              <input
                {...register("teamThree", { pattern: /^[a-z\s]+$/i })}
                type="text"
                placeholder="Enter Team Name"
              />
            </label>
            <label className="w-1/2">
              Team:
              <input
                {...register("teamFour", { pattern: /^[a-z\s]+$/i })}
                type="text"
                placeholder="Enter Team Name"
              />
            </label>
          </div>
          <label className="w-full mx-0.5">
            Dates:
            <DatePicker
              onChange={(ranges) =>
                setDateRange({
                  startDate: ranges.selection.startDate,
                  endDate: ranges.selection.endDate,
                })
              }
            />
          </label>
          <button
            type="submit"
            className="bg-blue-700 w-1/3 self-center cursor-crosshair rounded-full p-1 pt-1 text-stone-100"
          >
            Press If You Dare!
          </button>
        </form>
      ) : (
        <Results results={results} />
      )}
    </div>
  );
};

export default GameFinder;
