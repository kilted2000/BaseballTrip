import { useState, useEffect } from "react";
import "./App.css";
import { useForm } from "react-hook-form"
import { getGames } from "./api/apiService";
import { DatePicker } from "./components/DatePicker";
function App() {
  const [teamOne, setTeamOne] = useState("");
  const [teamTwo, setTeamTwo] = useState("");
  const [teamThree, setTeamThree] = useState("");
  const [teamFour, setTeamFour] = useState("");
  // const [dateOne, setDateOne] = useState("");
  // const [dateTwo, setDateTwo] = useState("");
  const [results, setResults] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  
//   useEffect(() => {
//     fetchGames();
// }, []);
  // const stadiums = [
  //   {
  //     name: "Busch",
  //     team: "Cardinals",
  //     schedule: ["june 15", "june 16", "july 16", "july 17", "july 18"],
  //   },
  //   {
  //     name: "Truist",
  //     team: "Braves",
  //     schedule: ["june 15", "june 16", "july 16", "july 7", "july 8"],
  //   },
  //   {
  //     name: "Wrigley",
  //     team: "Cubs",
  //     schedule: ["june 15", "june 16", "july 16", "july 1", "july 2"],
  //   },
  //   {
  //     name: "GR",
  //     team: "White Sox",
  //     schedule: ["june 15", "june 16", "july 17", "july 18", "july 19"],
  //   },
  // ];
  const fetchGames = async (teams) => {
    try {
      const data = await getGames();
      const filteredResults = data.filter(game => 
        teams.includes(game.HomeTeam)
      );
      setResults(filteredResults);
    } catch (error) {
      console.error('Failed to fetch games.', error);
    }
  };

  const onSubmit = () => {
    const teams = [teamOne, teamTwo, teamThree, teamFour].filter(Boolean);
    fetchGames(teams);
    console.log("Selected Teams:", teams);
  };
//     try {
//         const data = await getGames();
//         setResults(data);
//         console.log(data);
//     } catch (error) {
//         console.error('Failed to fetch games.Tha mi Dulich', error);
//     }
// };
//   const onSubmit = (event) => {
//     event.preventDefault();
//     const teams = [teamOne, teamTwo, teamThree, teamFour].filter(Boolean);
//     console.log("Selected Teams:", teams);

 // };

  return (
    <div className="bg-[url('./assets/stadium.jpg')] bg-cover bg-no-repeat h-dvh justify-center justify-items-center items-center flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-600 bg-no-repeat p-9 shadow-2xl shadow-green-900 space-y-4 flex flex-col gap-4">
        <div>
        <label className="w-1/2">
          Team:
          <input
          {...register("teamOne", { pattern: /^[a-z]+$/i })}
            type="text"
            value={teamOne}
            onChange={(e) => setTeamOne(e.target.value)}
          />
        </label>
        <label className="w-1/2">
          Team:
          <input
          {...register("teamTwo", {pattern: /^[a-z]+$/i })}
            type="text"
            value={teamTwo}
            onChange={(e) => setTeamTwo(e.target.value)}
          />
        </label>
        </div>
        <div>
        <label className="w-1/2">
          Team:
          <input
          {...register("teamThree", {pattern: /^[a-z]+$/i })}
            type="text"
            value={teamThree}
            onChange={(e) => setTeamThree(e.target.value)}
          />
        </label>
        <label className="w-1/2">
          Team:
          <input
          {...register("teamFour", {pattern: /^[a-z]+$/i })}
            type="text"
            value={teamFour}
            onChange={(e) => setTeamFour(e.target.value)}
          />
        </label>
        </div>
         <label className="w-full mx-0.5">
          Dates:
          < DatePicker />
          {/* /* <input
            type="text"
            value={dateOne}
            onChange={(e) => setDateOne(e.target.value)}
          />
          -
          <input
            type="text"
            value={dateTwo}
            onChange={(e) => setDateTwo(e.target.value)}
          /> *