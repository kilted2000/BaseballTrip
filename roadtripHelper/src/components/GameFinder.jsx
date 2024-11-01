import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getGames } from "../api/apiService";
import teams from "../TeamList.json";
import { DatePicker } from "./DatePicker";
import { UserButton } from "@clerk/clerk-react";
const GameFinder = ({ setIsLoading, setResults, setShowForm }) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
  });
  const [homeTeams, setHomeTeams] = useState([]);

  const { register, handleSubmit } = useForm();

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

  const onSubmit = async ({ teamOne, teamTwo, teamThree, teamFour }) => {
    setIsLoading(true);
    setShowForm(false);

    const enteredTeams = [teamOne, teamTwo, teamThree, teamFour]
      .filter(Boolean)
      .map((team) => team.trim().toLowerCase());

    console.log("Entered Teams:", enteredTeams);
    setHomeTeams(enteredTeams);

    await fetchGames(enteredTeams);
  };

  const fetchGames = async (enteredTeams) => {
    try {
      const data = await getGames();
      const filteredResults = data.filter((game) => {
        const homeTeam = game.HomeTeam || null;
        return (
          enteredTeams.some((teamInput) => {
            const teamAbbreviation = getTeamAbbreviation(teamInput);
            return teamAbbreviation && homeTeam.includes(teamAbbreviation);
          }) &&
          isWithinDateRange(game.Day, dateRange.startDate, dateRange.endDate)
        );
      });
      console.log("Filtered Results:", filteredResults);
      setResults(filteredResults);
    } catch (error) {
      console.error("Failed to fetch games.", error);
    } finally {
      setIsLoading(false);
    }
  };
  //"rounded-1g bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-600 bg-no-repeat p-9 shadow-2xl shadow-green-900 space-y-4 flex flex-col gap-4"

  //" bg-no-repeat bg-cover bg-center bg-fixed h-screen content-center"
  return (
    <div>
    <div style = {{ backgroundImage: "url('../stadium.jpg')"}} className="bg-no-repeat bg-cover bg-center bg-fixed min-h-screen flex flex-col justify-center items-center">
    <div className="navbar bg-base-300 mt-0 rounded-lg ">
        <a className="btn btn-ghost text-xl">Baseball Bucketlist</a>
        <div className="ml-auto">
        <UserButton className="absolute top-0 right-0 mt-4 mx-4 text-sky-500" />
      </div>
      </div>

      <form
        onSubmit={(e) => {
          console.log("Form submission triggered.");
          handleSubmit(onSubmit)(e);
        }}
        className="rounded-lg bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-600 bg-no-repeat p-4 shadow-2xl shadow-green-900 space-y-4 flex flex-col gap-4 m-4 w-2/5 mx-auto"
      >
  <div>
          <label className="w-1/2 mr-1">
            Team:
            </label>
            <input
              {...register("teamOne", { pattern: /^[a-z|\s]+$/i })}
              type="text"
              placeholder="Enter Team Name"
              className="pl-2"
            />
          <label className="w-1/2 mx-1">
            Team:
            </label>
            <input
              {...register("teamTwo", { pattern: /^[a-z\s]+$/i })}
              type="text"
              placeholder="Enter Team Name"
              className="pl-2"
            />
          
        </div>
        <div>
          <label className="w-1/2 mr-1">
            Team:
            </label>
            <input
              {...register("teamThree", { pattern: /^[a-z\s]+$/i })}
              type="text"
              placeholder="Enter Team Name"
              className="pl-2"
            />
          
          <label className="w-1/2 mx-1">
            Team:
            </label>
            <input
              {...register("teamFour", { pattern: /^[a-z\s]+$/i })}
              type="text"
              placeholder="Enter Team Name"
              className="pl-2"
            />
          
        </div>
        <div className="w-full mr-2">
        <label className="mr-5">
          Dates:
          </label>
          <DatePicker
            onChange={(ranges) =>
              setDateRange({
                startDate: ranges.selection.startDate,
                endDate: ranges.selection.endDate,
              })
            }
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 w-1/3 self-center cursor-crosshair rounded-full p-1 pt-1 text-stone-100"
        >
          Press If You Dare!
        </button>
      </form>
    </div>
    </div>
  );
};

export default GameFinder;