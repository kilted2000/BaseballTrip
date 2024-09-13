import { useState } from "react";
import "./App.css";
//import { useForm } from "react-hook-form"
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

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm()
  
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
  //should I pass day as well as teams?
  const fetchGames = async (teams) => {
    console.log("Fetching games for teams:1", teams);
    try {
      const data = await getGames();
      console.log("Fetched games data:2", data);
      const filteredResults = data.filter(game => 
        teams.includes(game.HomeTeam),
        setResults(filteredResults)
      );
      console.log("Filtered Results:3", filteredResults);
      //setResults(filteredResults);
    } catch (error) {
      console.error('Failed to fetch games.', error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted4');
    const teams = [teamOne, teamTwo, teamThree, teamFour].filter(Boolean);
    //fetchGames(teams);
    console.log("Selected Teams:5", teams);
    fetchGames(teams);
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
      <form onSubmit={onSubmit} className="rounded-lg bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-600 bg-no-repeat p-9 shadow-2xl shadow-green-900 space-y-4 flex flex-col gap-4">
    <div>
      <label>
        Team One:
        <input
          type="text"
          value={teamOne}
          onChange={(e) => setTeamOne(e.target.value)}
        />
      </label>
      <label>
        Team Two:
        <input
          type="text"
          value={teamTwo}
          onChange={(e) => setTeamTwo(e.target.value)}
        />
      </label>
    </div>
    <div>
      <label>
        Team Three:
        <input
          type="text"
          value={teamThree}
          onChange={(e) => setTeamThree(e.target.value)}
        />
      </label>
      <label>
        Team Four:
        <input
          type="text"
          value={teamFour}
          onChange={(e) => setTeamFour(e.target.value)}
        />
      </label>
      <label>
      Dates:
      < DatePicker />
      </label>
    </div>
    <button type="submit" className="bg-blue-700 w-1/3 self-center cursor-crosshair rounded-full p-1 pt-1 text-stone-100">Press If You Dare!</button>
  </form>
  <div id='result' className="bg-emerald-900 text-slate-200 p-3 rounded-lg table-auto">
      {results.length > 0 && results.map((result, index) => ( 
   <div key={index} >
    <h3>{result.HomeTeam}</h3>
    <p>{result.dayInCustomFormat || result.Day}</p> 
    </div>
    ))}
</div>
      {/* <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-600 bg-no-repeat p-9 shadow-2xl shadow-green-900 space-y-4 flex flex-col gap-4">
        <div>
        <label className="w-1/2">
          Team:
          <input
          {...register("teamOne", { pattern: /^[a-z]+$/i })}
            type="text"
            value={teamOne}
            onChange={(e) =>{ console.log("Team One:", e.target.value);setTeamOne(e.target.value)}}
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
          /> */}
        {/* </label> 
        <button type="submit" className="bg-blue-700 w-1/3 self-center cursor-crosshair rounded-full p-1 pt-1 text-stone-100">Press If You Dare!</button>
      </form>  */}
{/* //       <div id='result' className="bg-emerald-900 text-slate-200 p-3 rounded-lg table-auto">
//       {results.length > 0 && results.map((result, index) => ( */}
{/* //   <div key={index} >
//     <h3>{result.HomeTeam}</h3>
//     <p>{result.dayInCustomFormat || result.Day}</p> 
//   </div> */}
{/* // ))} */}
      {/* </div> */}
   // </div>
  );
}

export default App;

