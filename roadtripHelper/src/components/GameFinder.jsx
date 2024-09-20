import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getGames } from "../api/apiService";
import teamList from "../TeamList.json"
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

  const isWithinDateRange = (date, startDate, endDate) => {
    const gameDate = new Date(date);
    return gameDate >= startDate && gameDate <= endDate;
  };
 
  const getTeamAbbreviation = (input) => {
    //const lowerInput = input.toLowerCase();
    const matchedTeam = teamList.find(
      (team) =>
        team.name.toLowerCase().includes(input.toLowerCase()) ||
        team.city.toLowerCase().includes(input.toLowerCase()) ||
        team.nickname.toLowerCase().includes(input.toLowerCase())
    );
    return matchedTeam ? matchedTeam.abbreviation : null;
  };
  useEffect(() => {
    const fetchGames = async () => {
      if (HomeTeams.length > 0 && dateRange.startDate && dateRange.endDate) {
        try {
          const data = await getGames(); // Call to your backend
  
          const filteredResults = data
            .filter((game) => {
              // Ensure HomeTeam exists before calling toLowerCase()
              const homeTeam = game.HomeTeam ? game.HomeTeam.toLowerCase() : null;
              return HomeTeams.some((teamInput) => {
                const teamAbbreviation = getTeamAbbreviation(teamInput);
                return teamAbbreviation && homeTeam.includes(teamAbbreviation.toLowerCase());
              });
            })
            .filter((game) =>
              isWithinDateRange(game.Day, dateRange.startDate, dateRange.endDate)
            );
  
          console.log(filteredResults);
          setResults(filteredResults);
        } catch (error) {
          console.error("Failed to fetch games.", error);
        }
      }
    };
  
    fetchGames();
  }, [HomeTeams, dateRange]);
  //useEffect(() => {
    // const fetchGames = async () => {
    //   if (HomeTeams.length > 0 && dateRange.startDate && dateRange.endDate) {
    //     try {
    //       const data = await getGames(); // Fetch games from API
          
    //       const filteredResults = data.filter((game) => {
    //         return HomeTeams.some((teamInput) => {
    //           const abbreviation = getTeamName(teamInput);
    //           return abbreviation && game.HomeTeam === abbreviation;
    //         });
    //       }).filter((game) =>
    //         isWithinDateRange(game.Day, dateRange.startDate, dateRange.endDate)
    //       );
          
    //       setResults(filteredResults);
    //     } catch (error) {
    //       console.error("Failed to fetch games.", error);
    //     }
    //   }
    // };
    
    // const fetchGames = async () => {
    //   if (HomeTeams.length > 0 && dateRange.startDate && dateRange.endDate) {
        
    //     try {
    //       const data = await getGames(); // Call to your backend
    //       const filteredResults = data
    //         .filter((game) => HomeTeams.includes(game.HomeTeam.toLowerCase()))
    //         .filter((game) =>
    //           isWithinDateRange(game.Day, dateRange.startDate, dateRange.endDate)
    //         );
    //         console.log(filteredResults);
    //       setResults(filteredResults);
    //     } catch (error) {
    //       console.error("Failed to fetch games.", error);
    //     }
    //   }
    // };

   // fetchGames();
  //}, [HomeTeams, dateRange]); // Re-fetch games when HomeTeams or dateRange changes

  const onSubmit = ({ teamOne, teamTwo, teamThree, teamFour }) => {
    const enteredTeams = [teamOne, teamTwo, teamThree, teamFour].filter(Boolean)
    .map(team => team.toLowerCase());
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
            <inp