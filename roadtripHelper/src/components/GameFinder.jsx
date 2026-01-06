import { useState } from "react";
import { useForm } from "react-hook-form";
import { getGames } from "../api/apiService";
import NavBar from "./NavBar";
import teams from "../TeamList.json";
import { DatePicker } from "./DatePicker";
import { UserButton } from "@clerk/clerk-react";

import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
const GameFinder = ({ setAiContext }) => {


const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(false);

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
  });
  // const [homeTeams, setHomeTeams] = useState([]);
  const [showChat, setShowChat] = useState(false);

  const { register, handleSubmit } = useForm();

  const formatTeamName = (input) => {
    const formattedInput = input.trim().toLowerCase();
    const team = teams.find(({ name, city, nickname }) =>
      [name.toLowerCase(), city.toLowerCase(), nickname.toLowerCase()].includes(
        formattedInput
      )
    );
    return team ? team.abbreviation : null;
  };

  const isWithinDateRange = (dateTime, startDate, endDate) => {
    const gameDate = new Date(dateTime);
    return gameDate >= startDate && gameDate <= endDate;
  };

const onSubmit = async ({ teamOne, teamTwo, teamThree, teamFour }) => {
  setIsLoading(true);

  const enteredTeams = [teamOne, teamTwo, teamThree, teamFour]
    .map((team) => team?.trim().toLowerCase())
    .filter((team) => team.length > 0);

  if (enteredTeams.length === 0) {
    console.error("No valid teams entered.");
    setIsLoading(false);
    return;
  }

  const teamAbbreviations = enteredTeams.map(formatTeamName).filter(Boolean);
  // setHomeTeams(teamAbbreviations);

  await fetchGames(teamAbbreviations);
};

  // const fetchGames = async (teams) => {
  //   try {
  //     const data = await getGames();
  //     const filteredGames = data.filter((game) => {
  //       const gameDate = new Date(game.DateTime);
  //       return (
  //         teams.includes(game.HomeTeam) &&
  //         isWithinDateRange(gameDate, dateRange.startDate, dateRange.endDate)
  //       );
  //     });
  //     setResults(filteredGames);
  //   } catch (error) {
  //     console.error("Failed to fetch games:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
const fetchGames = async (teams) => {
  try {
    const data = await getGames();
console.log("Raw API data:", data); 
    console.log("Teams to filter:", teams);
    const filteredGames = data.filter((game) => {
      const gameDate = new Date(game.DateTime);
      return (
        teams.includes(game.HomeTeam) &&
        isWithinDateRange(gameDate, dateRange.startDate, dateRange.endDate)
      );
    });
setAiContext({
  search: null,
  games: filteredGames,
});

    navigate("/results", {
      state: { results: filteredGames }
    });

  } catch (error) {
    console.error("Failed to fetch games:", error);
  } finally {
    setIsLoading(false);
  }
};


if (isLoading) {
  return <Spinner />;
}

  return (
    <div>
      <div className="bg-[url('/stadium.jpg')] bg-cover bg-repeat-y object-cover justify-center items-center flex flex-col h-dvh">
     
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-600 bg-no-repeat shadow-2xl shadow-green-900 place-items-center card-body"
          >
            <div className="grid gap-3 md:grid-cols-2 md:gap-4">
              <input
                {...register("teamOne")}
                type="text"
                placeholder="Team One"
                className="rounded-lg pl-2 input"
                list="teams"
              />
              <input
                {...register("teamTwo")}
                type="text"
                placeholder="Team Two"
                className="rounded-lg pl-2 input"
                list="teams"
              />
              <input
                {...register("teamThree")}
                type="text"
                placeholder="Team Three"
                className="rounded-lg pl-2 input"
                list="teams"
              />
              <input
                {...register("teamFour")}
                type="text"
                placeholder="Team Four"
                className="rounded-lg pl-2 input"
                list="teams"
              />
              <datalist id="teams">
                <option value="St. Louis Cardinals"></option>
                <option value="Atlanta Braves"></option>
                <option value="Chicago Cubs"></option>
                <option value="Seattle Mariners"></option>
                <option value="New York Yankees"></option>
                <option value="New York Mets"></option>
                <option value="Chicago White Sox"></option>
                <option value="Houston Astros"></option>
                <option value="Boston Red Sox"></option>
                <option value="Toronto Blue Jays"></option>
                <option value="Baltimore Orioles"></option>
                <option value="Cleveland Guardians"></option>
                <option value="Detroit Tigers"></option>
                <option value="Kansas City Royals"></option>
                <option value="Minnesota Twins"></option>
                <option value="Los Angeles Angels"></option>
                <option value="Texas Rangers"></option>
                <option value="Miami Marlins"></option>
                <option value="Philadelphia Phillies"></option>
                <option value="Washington Nationals"></option>
                <option value="Cincinnati Reds"></option>
                <option value="Milwaukee Brewers"></option>
                <option value="Pittsburgh Pirates"></option>
                <option value="Los Angeles Dodgers"></option>
                <option value="Arizona Diamondbacks"></option>
                <option value="Colorado Rockies"></option>
                <option value="San Diego Padres"></option>
                <option value="San Francisco Giants"></option>
                <option value="Las Vegas Athletics"></option>
              </datalist>
            </div>
            <label className="w-full mr-5">Dates:</label>
            <DatePicker
              onChange={(ranges) =>
                setDateRange({
                  startDate: ranges.selection.startDate,
                  endDate: ranges.selection.endDate,
                })
              }
            />
            <div className="card-actions">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-900 self-center cursor-pointer rounded-full text-stone-100 px-3 pb-2"
              >
                Press If You Dare!
              </button>
            </div>
          </form>
     
      </div>
  
    </div>
  );
};

export default GameFinder;
