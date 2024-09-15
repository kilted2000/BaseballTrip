import { useState } from "react";
import { useForm } from "react-hook-form"
import { getGames } from "../api/apiService";
//import { DatePicker } from "DatePicker";
const GameFinder = () =>{
  const [results, setResults] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  
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

  const onSubmit = ({ teamOne, teamTwo, teamThree, teamFour }) => {
    const teams = [teamOne, teamTwo, teamThree, teamFour].filter(Boolean);
    fetchGames(teams);
  };

  return (
    <div className="bg-[url('./assets/stadium.jpg')] bg-cover bg-no-repeat h-dvh justify-center justify-items-center items-center flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-600 bg-no-repeat p-9 shadow-2xl shadow-green-900 space-y-4 flex flex-col gap-4">
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
          {...register("teamTwo", {pattern: /^[a-z]+$/i })}
            type="text"
            placeholder="Enter Team Name"
          />
        </label>
        </div>
        <div>
        <label className="w-1/2">
          Team:
          <input
          {...register("teamThree", {pattern: /^[a-z]+$/i })}
            type="text"
            placeholder="Enter Team Name"
          />
        </label>
        <label className="w-1/2">
          Team:
          <input
          {...register("teamFour", {pattern: /^[a-z]+$/i })}
            type="text"
            placeholder="Enter Team Name"
          />
        </label>
        </div>
         {/* <label className="w-full mx-0.5">
          Dates:
          < DatePicker />
        </label>  */}
        <button type="submit" className="bg-blue-700 w-1/3 self-center cursor-crosshair rounded-full p-1 pt-1 text-stone-100">Press If You Dare!</button>
      </form>  
      <div id='result' className="bg-emerald-900 text-slate-200 p-3 rounded-lg table-auto">
      {results.length > 0 && results.map((result, index) => ( 
  <div key={index} >
   <h3>{result.HomeTeam}</h3>
   <p>{result.dayInCustomFormat || result.Day}</p> 
  </div>))}
  </div>
      
    </div>
  )
}

export default GameFinder;