// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { getGames } from "../api/apiService";
// import teams from "../TeamList.json";
// import { DatePicker } from "./DatePicker";
// import { UserButton } from "@clerk/clerk-react";
// const GameFinder = ({ setIsLoading, setResults, setShowForm }) => {
//   const [dateRange, setDateRange] = useState({
//     startDate: new Date(),
//     endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
//   });
//   const [homeTeams, setHomeTeams] = useState([]);

//   const { register, handleSubmit } = useForm();

//   // const getTeamAbbreviation = (teamInput) => {
//   //   if (!teamInput || typeof teamInput !== "string") {
//   //     console.error("Invalid team input:", teamInput);
//   //     return null;
//   //   }
//   //   const lowerInput = teamInput.toLowerCase();
//   //   //const flatTeams = teams[0];
//   //   const flatTeams = Array.isArray(teams) ? teams.flat() : [];

//   //   const team = flatTeams.find(
//   //     (t) =>
//   //       t.name.toLowerCase().includes(lowerInput) ||
//   //       t.city.toLowerCase().includes(lowerInput) ||
//   //       t.nickname.toLowerCase().includes(lowerInput)
//   //   );
//   //   return team ? team.abbreviation : null;


//   // };
  
  
//   // const isWithinDateRange = (date, startDate, endDate) => {
//   //   const gameDate = new Date(date);
//   //   return gameDate >= startDate && gameDate <= endDate;
//   // };
// //   const isWithinDateRange = (dateString, startDate, endDate) => {
// //     if (!dateString) return false;
// //     const gameDate = new Date(dateString); 
// //     console.log(`Game date: ${game.Day}, Start: ${dateRange.startDate}, End: ${dateRange.endDate}`);
 
// //     return gameDate >= startDate && gameDate <= endDate;
// // };


//   const onSubmit = async ({ teamOne, teamTwo, teamThree, teamFour }) => {
//     setIsLoading(true);
//     setShowForm(false);

//     const enteredTeams = [teamOne, teamTwo, teamThree, teamFour]
//       .filter(Boolean)
//       .map((team) => team.trim().toLowerCase());
//       console.log("Entered teams:", enteredTeams); // ✅ Moved inside onSubmit
//       enteredTeams.forEach(team => {
//         const abbreviation = getTeamAbbreviation(team);
//           console.log(`Abbreviation for ${team}:`, abbreviation);
//       });
   
//     setHomeTeams(enteredTeams);

//     await fetchGames(enteredTeams);
//   };

//   // const fetchGames = async (enteredTeams) => {
//   //   try {
//   //     console.log("Fetching games...");
//   //     const data = await getGames();
//   //     console.log("Fetched data:", JSON.stringify(data, null, 2));
//   //     const filteredResults = data.filter((game) => {
//   //       console.log("Raw data from API:", data); 
        
//   //       if (!Array.isArray(data) || data.length === 0) {
//   //           console.warn("No games returned from API.");
//   //           setResults([]);
//   //           return;
//        // }
        
//     //     const homeTeam = game.HomeTeam ? game.HomeTeam.toLowerCase() : "";
//     //     const isTeamMatch = enteredTeams.some((teamInput) => {
//     //         const teamAbbreviation = getTeamAbbreviation(teamInput);
//     //         console.log(`Checking if ${homeTeam} includes ${teamAbbreviation}`);
//     //         return teamAbbreviation && homeTeam.includes(teamAbbreviation);
            

//     //     });
    
//     //     const isDateMatch = isWithinDateRange(game.Day, dateRange.startDate, dateRange.endDate);
//     //     console.log(`Date match? ${isDateMatch}`);
    
//     //     return isTeamMatch && isDateMatch;
//     // });
    
//       // const filteredResults = data.filter((game) => {
//       //   //const homeTeam = game.HomeTeam || null;
//       //   const homeTeam = game.HomeTeam ? game.HomeTeam.toLowerCase() : "";
//       //   return (
//       //     enteredTeams.some((teamInput) => {
//       //       const teamAbbreviation = getTeamAbbreviation(teamInput);
//       //       return teamAbbreviation && homeTeam.includes(teamAbbreviation);
//       //     }) &&
//       //     isWithinDateRange(game.Date, dateRange.startDate, dateRange.endDate)
         
//       //   );
//       // });
    
//   //     setResults(filteredResults);
//   //   } catch (error) {
//   //     console.error("Failed to fetch games.", error);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
//   const fetchGames = async (enteredTeams) => {
//     try {
//       console.log("Fetching filtered games...");
//       const teamParams = enteredTeams.map(team => `teams[]=${encodeURIComponent(team)}`).join("&");
//       const response = await fetch(`/api/games?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}&${teamParams}`);
//       const data = await response.json();
//       setResults(data);
//     } catch (error) {
//       console.error("Failed to fetch games.", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   //bg-[url('/stadium.jpg')] bg-no-repeat bg-cover bg-center bg-fixed min-h-screen flex flex-col justify-center items-center  md:rounded-lg card lg:card-side
  
//   return (
//     <div>
//     <div className="bg-[url('/stadium.jpg')] bg-cover bg-repeat-y  object-cover justify-center items-center flex flex-col h-dvh">
//     <div className="navbar navbar-center bg-base-300 mt-12 md:mt-0">
//         <a className="btn btn-ghost text-xl">Baseball Bucketlist</a>
//         <div className="ml-auto">
//         <UserButton className="absolute top-0 right-0 mt-4 mx-4 text-sky-500" />
//       </div>
//       </div>

//       <form
//         onSubmit={(e) => {
//           handleSubmit(onSubmit)(e);
//         }}
//     //bg-no-repeat p-4 shadow-2xl shadow-green-900 w-full space-y-4 flex flex-col gap-4 m-4 w-2/5 mx-auto md:p-9 md:rounded-lg space-y-4 flex flex-col grid grid-cols-1 md:gap-4 md:w-2/5 md:mx-auto 
//         className=" bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-600 bg-no-repeat shadow-2xl shadow-green-900  place-items-center card-body"
//       >
  
//     {/* <div className="mx-auto"> */}
//        <div className="grid md:grid-cols-2 md:gap-4"> 
//         {/* mr-1 */}
//         <div>
//           <label className="w-full mr-1 flex">
//             Team:
//             </label>
//             <input
//               {...register("teamOne", { pattern: /^[a-z|\s]+$/i })}
//               type="text"
//               placeholder="Enter Team Name"
//               // pl-2
//               className="rounded-lg pl-2"
//             />
//            {/* mx-1 */}
//           <label className="w-full ml-1 flex">
//             Team:
//             </label>
//             <input
//               {...register("teamTwo", { pattern: /^[a-z\s]+$/i })}
//               type="text"
//               placeholder="Enter Team Name"
//               // pl-2
//               className="rounded-lg pl-2"
//             />
//           </div>
//           <div>
       
//           {/* mr-1 */}
//           <label className="w-1/2 mr-1 flex">
//             Team:
//             </label>
//             <input
//               {...register("teamThree", { pattern: /^[a-z\s]+$/i })}
//               type="text"
//               placeholder="Enter Team Name"
//               //pl-2
//               className="rounded-lg pl-2"
//             />
//          {/* mx-1 */}
//           <label className="w-1/2 ml-1 flex">
//             Team:
//             </label>
//             <input
//               {...register("teamFour", { pattern: /^[a-z\s]+$/i })}
//               type="text"
//               placeholder="Enter Team Name"
//               //pl-2
//               className="rounded-lg pl-2"
//             />
//             </div>
//             {/* </div> */}
//             {/* </div> */}
//           {/* pl-2 */}
//         </div> 
        
//         {/* <div className="w-full mr-2 mx-0.5"> */}
//         {/* mr-5 */}
//         <label className="w-full mr-5">
//           Dates:
//           </label>
//           <DatePicker
//             onChange={(ranges) =>
//               setDateRange({
//                 startDate: ranges.selection.startDate,
//                 endDate: ranges.selection.endDate,
                
//               })
              
//             }
//           />
//         <div className="card-actions">
//         {/* w-1/5 md:w-1/3  */}
//         <button
//           type="submit"
//           className=" bg-blue-700 hover:bg-blue-900 self-center cursor-pointer rounded-full text-stone-100 px-3 pb-2"
//         >
//           Press If You Dare!
//         </button>
//         </div>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default GameFinder;

import { useState } from "react";
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

  const { register, handleSubmit } = useForm();

  // Function to get the team abbreviation from user input
  const getTeamAbbreviation = (teamInput) => {
    if (!teamInput || typeof teamInput !== "string") return null;
    const lowerInput = teamInput.toLowerCase();

    const flatTeams = Array.isArray(teams) ? teams.flat() : [];
    const team = flatTeams.find(
      (t) =>
        t.name.toLowerCase().includes(lowerInput) ||
        t.city.toLowerCase().includes(lowerInput) ||
        t.nickname.toLowerCase().includes(lowerInput)
    );

    return team ? team.abbreviation : null;
  };

  const onSubmit = async ({ teamOne, teamTwo, teamThree, teamFour }) => {
    setIsLoading(true);
    setShowForm(false);

    // Convert user input into an array of team abbreviations
    const enteredTeams = [teamOne, teamTwo, teamThree, teamFour]
      .filter(Boolean) // Removes empty values
      .map((team) => getTeamAbbreviation(team.trim()));

    console.log("Filtered Team Abbreviations:", enteredTeams);

    await fetchGames(enteredTeams);
  };

  const fetchGames = async (enteredTeams) => {
    try {
      console.log("Fetching games...");
      const startDate = dateRange.startDate.toISOString().split("T")[0];
      const endDate = dateRange.endDate.toISOString().split("T")[0];

      const queryParams = new URLSearchParams({
        teams: enteredTeams.join(","),
        startDate,
        endDate,
      });

      const data = await getGames(queryParams.toString());
      console.log("Filtered results received:", data);

      setResults(data);
    } catch (error) {
      console.error("Failed to fetch games.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[url('/stadium.jpg')] bg-cover bg-repeat-y flex flex-col h-dvh">
      <div className="navbar navbar-center bg-base-300 mt-12 md:mt-0">
        <a className="btn btn-ghost text-xl">Baseball Bucketlist</a>
        <div className="ml-auto">
          <UserButton className="absolute top-0 right-0 mt-4 mx-4 text-sky-500" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-600 shadow-2xl place-items-center card-body">
        <div className="grid md:grid-cols-2 md:gap-4">
          <div>
            <label className="w-full flex">Team:</label>
            <input {...register("teamOne", { pattern: /^[a-z\s]+$/i })} type="text" placeholder="Enter Team Name" className="rounded-lg pl-2" />
            <label className="w-full flex">Team:</label>
            <input {...register("teamTwo", { pattern: /^[a-z\s]+$/i })} type="text" placeholder="Enter Team Name" className="rounded-lg pl-2" />
          </div>
          <div>
            <label className="w-full flex">Team:</label>
            <input {...register("teamThree", { pattern: /^[a-z\s]+$/i })} type="text" placeholder="Enter Team Name" className="rounded-lg pl-2" />
            <label className="w-full flex">Team:</label>
            <input {...register("teamFour", { pattern: /^[a-z\s]+$/i })} type="text" placeholder="Enter Team Name" className="rounded-lg pl-2" />
          </div>
        </div>

        <label className="w-full">Dates:</label>
        <DatePicker onChange={(ranges) => setDateRange({ startDate: ranges.selection.startDate, endDate: ranges.selection.endDate })} />

        <div className="card-actions">
          <button type="submit" className="bg-blue-700 hover:bg-blue-900 self-center cursor-pointer rounded-full text-stone-100 px-3 pb-2">
            Find Games
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameFinder;
