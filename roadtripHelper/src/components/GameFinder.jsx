import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getGames } from "../api/apiService";
import teams from "../TeamList.json";
import { DatePicker } from "./DatePicker";
import { UserButton } from "@clerk/clerk-react";


//what GameFinder is supposed to be doing
//1.I want to take user entered team names and assign them to teamOne,teamTwo,etc…
//2.assigns user chosen date range to startDate,endDate
//3.take data from external api and filter out games where the home team isn’t one of the user entered ones within the user entered date range
//4.display games of entered teams within date range to user using Results component 

//ex. A.User enters [“cardinals”,”Braves”,”white Sox”], June 2nd-14th

//B.user clicks submit button 
const GameFinder = ({ setIsLoading, setResults, setShowForm }) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
  });
  const [HomeTeam, setHomeTeam] = useState([]);



  const { register, handleSubmit } = useForm();

  const formatTeamName = (input) => {
    const formattedInput = input.trim().toLowerCase();
  
    const team = teams.find(({ name, city, nickname }) => 
      [name.toLowerCase(), city.toLowerCase(), nickname.toLowerCase()].includes(formattedInput)
    );
  
    return team ? team.abbreviation : null;
  };
  


  const isWithinDateRange = (DateTime, startDate, endDate) => {
    const gameDate = new Date(DateTime);
    return gameDate >= startDate && gameDate <= endDate;
  };

  const onSubmit = async ({ teamOne, teamTwo, teamThree, teamFour }) => {
    setIsLoading(true);
    setShowForm(false);
  
    const enteredTeams = [teamOne, teamTwo, teamThree, teamFour]
      .map((team) => team?.trim().toLowerCase())
      .filter((team) => team.length > 0);
  
    console.log("Entered Teams:", enteredTeams);
  
    if (enteredTeams.length === 0) {
      console.error("No valid teams entered.");
      setIsLoading(false);
      setShowForm(true);
      return;
    }
  
    // Convert user-entered names to abbreviations
    const teamAbbreviations = enteredTeams.map(formatTeamName).filter(Boolean);

    
    console.log("Mapped Team Abbreviations:", teamAbbreviations);
  
    if (teamAbbreviations.length === 0) {
      console.error("No valid team abbreviations found.");
      setIsLoading(false);
      setShowForm(true);
      return;
    }
  
    setHomeTeam(teamAbbreviations);
    await fetchGames(teamAbbreviations);
  };
  

  const fetchGames = async (teams) => {
    if (!teams || teams.length === 0) {
      console.error("No teams provided.");
      return;
    }
  
    console.log("Fetching games for teams:", teams);
  
    try {
      const data = await getGames();
      console.log("Raw Games Data:", data);
  
      if (!Array.isArray(data)) {
        console.error("Error: Expected an array but got:", data);
        return;
      }
  
      // Convert user input to abbreviations before filtering
      const teamAbbreviations = teams.map(formatTeamName).filter(Boolean);

      console.log("Team Abbreviations:", teamAbbreviations);
  
      const filteredGames = data.filter((game) => {
        const homeTeam = game.HomeTeam; 
        const gameDate = new Date(game.DateTime);
        console.log("Game Data:", game);

        return (
          teamAbbreviations.includes(homeTeam) &&
          isWithinDateRange(gameDate, dateRange.startDate, dateRange.endDate)
        );
      });
  
      console.log("Filtered Games:", filteredGames);
      setResults(filteredGames);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  
  //bg-[url('/stadium.jpg')] bg-no-repeat bg-cover bg-center bg-fixed min-h-screen flex flex-col justify-center items-center  md:rounded-lg card lg:card-side
  
  return (
    <div>
      <div className="bg-[url('/stadium.jpg')] bg-cover bg-repeat-y object-cover justify-center items-center flex flex-col h-dvh">
        <div className="navbar navbar-center bg-base-300 mt-12 md:mt-0">
          <a className="btn btn-ghost text-xl">Baseball Bucketlist</a>
          <div className="ml-auto">
            <UserButton className="absolute top-0 right-0 mt-4 mx-4 text-sky-500" />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            // B. onSubmit code block called after user clicks submit button
            handleSubmit(onSubmit)(e);
          }}
          className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-600 bg-no-repeat shadow-2xl shadow-green-900 place-items-center card-body"
        >
          <div className="grid md:grid-cols-2 md:gap-4">
            <div>
              <label className="w-full mr-1 flex">Team:</label>
              {/* A. user enters team name and it is assigned to variable teamOne */}
              <input
                {...register("teamOne", { pattern: /^[a-z|\s]+$/i })}
                type="text"
                placeholder="Enter Team Name"
                className="rounded-lg pl-2"
              />
              <label className="w-full ml-1 flex">Team:</label>
               {/* user inputs another team name, is assigned to variable teamTwo */}
              <input
                {...register("teamTwo", { pattern: /^[a-z\s]+$/i })}
                type="text"
                placeholder="Enter Team Name"
                className="rounded-lg pl-2"
              />
            </div>
            <div>
              <label className="w-1/2 mr-1 flex">Team:</label>
               {/* user inputs another team name, is assigned to variable teamThree */}
              <input
                {...register("teamThree", { pattern: /^[a-z\s]+$/i })}
                type="text"
                placeholder="Enter Team Name"
                className="rounded-lg pl-2"
              />
              <label className="w-1/2 ml-1 flex">Team:</label>
               {/* user inputs another team name, is assigned to variable teamFour */}
              <input
                {...register("teamFour", { pattern: /^[a-z\s]+$/i })}
                type="text"
                placeholder="Enter Team Name"
                className="rounded-lg pl-2"
              />
            </div>
          </div>
          {/* A. user selects date range of startDate=June 2nd - endDate=June 14th */}
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
           
   {/* B. user clicks submit button calling api and filtering results. handleSubmit function called */}
   <button
              // onClick={() => {
              //   setIsLoading(true);
              //   setShowForm(false);
              // }}
              type="submit"
              className="bg-blue-700 hover:bg-blue-900 self-center cursor-pointer rounded-full text-stone-100 px-3 pb-2"
            >
              Press If You Dare!
            </button>
          </div>
        </form>
      <