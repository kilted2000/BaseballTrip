import { useState } from "react";
import { useForm } from "react-hook-form";
import { getGames } from "../api/apiService";
import { DatePicker } from "./DatePicker";
const GameFinder = () => {
  const [results, setResults] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
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

  const fetchGames = async (teams) => {
    try {
      const data = await getGames();
      const filteredResults = data
        .filter((game) => teams.includes(game.team))
        .filter((game) =>
          isWithinDateRange(game.Day, dateRange.startDate, dateRange.endDate)
        );
      setResults(filteredResults);
    } catch (error) {
      console.error("Failed to fetch games.", error);
    }
  };

  const onSubmit = ({ teamOne, teamTwo, teamThree, teamFour }) => {
    const teams = [teamOne, teamTwo, teamThree, teamFour].filter(Boolean);
    fetchGames(teams);
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
              {...register("teamOne", { pattern: /^[a-z]+$/i })}
              type="text"
              placeholder="Enter Team Name"
            />
          </label>
          <label className="w-1/2">
            Team:
            <input
              {...register("teamTwo", { pattern: /^[a-z]+$/i })}
              type="text"
              placeholder="Enter Team Name"
            />
          </label>
        </div>
        <div>
          <label className="w-1/2">
            Team:
            <input
              {...register("teamThree", { pattern: /^[a-z]+$/i })}
              type="text"
              placeholder="Enter Team Name"
            />
          </label>
          <label className="w-1/2">
            Team:
            <input
              {...register("teamFour", { pattern: /^[a-z]+$/i })}
              type="text"
              placeholder="Enter Team Name"
            />
          </label>
        </div>
        <label className="w-full mx-0.5">
          Dates:
          <DatePic