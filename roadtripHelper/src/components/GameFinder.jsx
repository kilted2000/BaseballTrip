
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm, Controller } from "react-hook-form";
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

  const { control, handleSubmit } = useForm({
    defaultValues: {
      teamOne: "",
      teamTwo: "",
      teamThree: "",
      teamFour: ""
    },
  });

  const formatTeamName = (input) => {
    const formattedInput = input.trim().toLowerCase();
    const team = teams.find(({ name, city, nickname }) => 
      [name.toLowerCase(), city.toLowerCase(), nickname.toLowerCase()].includes(formattedInput)
    );
    return team ? team.abbreviation : null;
  };

  const isWithinDateRange = (dateTime, startDate, endDate) => {
    const gameDate = new Date(dateTime);
    return gameDate >= startDate && gameDate <= endDate;
  };

  const onSubmit = async ({ teamOne, teamTwo, teamThree, teamFour }) => {
    setIsLoading(true);
    setShowForm(false);

    const enteredTeams = [teamOne, teamTwo, teamThree, teamFour]
      .map((team) => team?.trim().toLowerCase())
      .filter((team) => team.length > 0);

    if (enteredTeams.length === 0) {
      console.error("No valid teams entered.");
      setIsLoading(false);
      setShowForm(true);
      return;
    }

    const teamAbbreviations = enteredTeams.map(formatTeamName).filter(Boolean);
    setHomeTeams(teamAbbreviations);
    await fetchGames(teamAbbreviations);
  };

  const fetchGames = async (teams) => {
    try {
      const data = await getGames();
      const filteredGames = data.filter((game) => {
        const gameDate = new Date(game.DateTime);
        return (
          teams.includes(game.HomeTeam) &&
          isWithinDateRange(gameDate, dateRange.startDate, dateRange.endDate)
        );
      });
      setResults(filteredGames);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    } finally {
      setIsLoading(false);
    }
  };
//className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-600 bg-no-repeat shadow-2xl shadow-green-900 place-items-center card-body"

//className="grid gap-3 md:grid-cols-2 md:gap-4"
  return (
    <div>
      <div className="bg-[url('/stadium.jpg')] bg-cover bg-repeat-y object-cover justify-center items-center flex flex-col h-dvh">
        <div className="navbar navbar-center bg-base-300 mt-12 md:mt-0">
          <a className="btn btn-ghost text-xl">Baseball Bucketlist</a>
          <div className="ml-auto">
            <UserButton className="absolute top-0 right-0 mt-4 mx-4 text-sky-500" />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{
        background: "linear-gradient(to right, #047857, #0d9488, #0e7490)",
        backgroundRepeat: "no-repeat",
        boxShadow: "0 25px 50px -12px rgba(22, 163, 74, 0.5)", 
        display: "grid",
        placeItems: "center",
        padding: "1.5rem" 
      }}>
          <div sx={{
          display: "grid",
          gap: 3,
          "@media (min-width: 768px)": {
            gridTemplateColumns: "1fr 1fr",
            gap: 4
          }
        }}>
     
          
        <Controller
          name="teamOne"
          control={control}
          render={({ field }) => (
            <Autocomplete
              
              GameFinder
              options={teams.map((option) => option.name)}
              onChange={(_, value) => field.onChange(value)}
              value={field.value || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Team One"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.5rem", // rounded-lg
                      paddingLeft: "0.5rem", // pl-2
                      backgroundColor: "white" // To ensure visibility on gradient bg
                    }
                  }}
                />
              )}
            />
          )}
        />
        <Controller
          name="teamTwo"
          control={control}
          render={({ field }) => (
            <Autocomplete
              
              GameFinder
              options={teams.map((option) => option.name)}
              onChange={(_, value) => field.onChange(value)}
              value={field.value || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Team Two"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.5rem", // rounded-lg
                      paddingLeft: "0.5rem", // pl-2
                      backgroundColor: "white" // To ensure visibility on gradient bg
                    }
                  }}
                />
              )}
            />
          )}
        />
        <Controller
          name="teamThree"
          control={control}
          render={({ field }) => (
            <Autocomplete
              
              GameFinder
              options={teams.map((option) => option.name)}
              onChange={(_, value) => field.onChange(value)}
              value={field.value || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Team Three"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.5rem", // rounded-lg
                      paddingLeft: "0.5rem", // pl-2
                      backgroundColor: "white" // To ensure visibility on gradient bg
                    }
                  }}
                />
              )}
            />
          )}
        />
        <Controller
          name="teamFour"
          control={control}
          render={({ field }) => (
            <Autocomplete
              
              GameFinder
              options={teams.map((option) => option.name)}
              onChange={(_, value) => field.onChange(value)}
              value={field.value || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Team Four"
                  variant="outlined"

                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.5rem", // rounded-lg
                      paddingLeft: "0.5rem", // pl-2
                      backgroundColor: "white" // To ensure visibility on gradient bg
                    }
                  }}
                />
              )}
            />
          )}
        />
      
      </div>
          <label className="w-full mr-5">Dates:</label>
          <DatePicker
            onChange={(ranges) => setDateRange({
              startDate: ranges.selection.startDate,
              endDate: ranges.selection.endDate,
            })}
          />
 <div className="card-actions">
          <button type="submit" className="bg-blue-700 hover:bg-blue-900 self-center cursor-pointer rounded-full text-stone-100 px-3 pb-2">
            Press If You Dare!
          </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default GameFinder;
