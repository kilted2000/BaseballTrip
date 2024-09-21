import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getGames } from "../api/apiService";
import teams from "../TeamList.json";
import { DatePicker } from "./DatePicker";

const GameFinder = () => {
  const [results, setResults] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
  });
  const [HomeTeams, setHomeTeams] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getTeamAbbreviation = (teamInput) => {
    if (!teamInput || typeof teamInput !== "string") {
      console.error("Invalid team input:", teamInput);
      return null;
    }
    const lowerInput = teamInput;
    const team = teams.find(
      (t) =>
        t.name.includes(lowerInput) ||
        t.city.includes(lowerInput) ||
        t.nickname.includes(lowerInput)
    );
    if (team) {
      return team.abbreviation;
    } else {
      console.error(`Team abbreviation not found for input: ${teamInput}`);
      return null;
    }
  };

  const isWithinDateRange = (date, startDate, endDate) => {
    const gameDate = new Date(date);
    return gameDate >= startDate && gameDate <= endDate;
  };

  // const getTeamAbbreviation = (teamInput) => {
  //   if (!teamInput || typeof teamInput !== 'string') {
  //     console.error("Invalid team input:", teamInput);
  //     return null;
  //   }
  //   const team = teams.find(t =>
  //     t.name.includes(teamInput) ||
  //     t.city.includes(teamInput) ||
  //     t.nickname.includes(teamInput)
  //   );
  //   if (team) {
  //     return team.abbreviation;
  //   } else {
  //     console.error(`Team abbreviation not found for input: ${teamInput}`);
  //     return null;
  //   }
  // };

  useEffect(() => {
    const fetchGames = async () => {
      if (HomeTeams.length === 0) {
        console.warn("No teams entered.");
        return;
      }
      if (HomeTeams.length > 0 && dateRange.startDate && dateRange.endDate) {
        try {
          const data = await getGames();
          const filteredResults = data.filter((game) => {
            const homeTeam = game.HomeTeam || null;
            return (
              HomeTeams.some((teamInput) => {
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
  }, [HomeTeams, dateRange]);

  const onSubmit = ({ teamOne, teamTwo, teamThree, teamFour }) => {
    const enteredTeams = [teamOne, teamTwo, teamThree, teamFour]
      .filter(Boolean)
      .map((team) => team.toLowerCase());
    setHomeTeams(enteredTeams);
  };

  return (
    <div className="bg-[url('./assets/stadium.jpg')] bg-cover bg-no-repeat h-dvh justify-center justify-items-center items-center flex flex-col">
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
      <div
        id="result"
        className="bg-emerald-900 text-slate-200 p-3 rounded-lg table-auto"
      >
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <h3>{result.HomeTeam}</h3>
              <p>{formatDate(result.Day)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameFinder;
