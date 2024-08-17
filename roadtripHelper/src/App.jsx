import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form"
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
    watch,
    formState: { errors },
  } = useForm()
  
  const stadiums = [
    {
      name: "Busch",
      team: "Cardinals",
      schedule: ["june 15", "june 16", "july 16", "july 17", "july 18"],
    },
    {
      name: "Truist",
      team: "Braves",
      schedule: ["june 15", "june 16", "july 16", "july 7", "july 8"],
    },
    {
      name: "Wrigley",
      team: "Cubs",
      schedule: ["june 15", "june 16", "july 16", "july 1", "july 2"],
    },
    {
      name: "GR",
      team: "White Sox",
      schedule: ["june 15", "june 16", "july 17", "july 18", "july 19"],
    },
  ];

  const onSubmit = (event) => {
    //event.preventDefault();
    const teams = [teamOne, teamTwo, teamThree, teamFour].filter(Boolean);

    const matchingDates = stadiums
      .filter((stadium) => teams.map(team => team.toLowerCase()).includes(stadium.team.toLowerCase()))
      .map((stadium) => ({
        team: stadium.team,
        dates: stadium.schedule,
      }));
    console.log("Matching Dates:", matchingDates);
    setResults(matchingDates);
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
        {/* <label>
          Dates:
          <input
            type="text"
            value={dateOne}
            onChange={(e) => setDateOne(e.target.value)}
          />
          -
          <input
            type="text"
            value={dateTwo}
            onChange={(e) => setDateTwo(e.target.value)}
          />
        </label> */}
        <button type="submit" className="bg-blue-700 w-1/3 self-center cursor-crosshair rounded-full p-1 pt-1 text-stone-100">Press If You Dare!</button>
      </form>
      <div id='result' className="bg-emerald-900 text-slate-200 p-3 rounded-lg">
        {results.length > 0 && results.map(result => (
          <div key={result.team}>
            <h3>{result.team}</h3>
            <p>{result.dates.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

// import { useState, useEffect } from 'react';
// import './App.css';
// import styles from './Card.module.css';

// const Card = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=chicken≈';
//       const options = {
//         method: 'GET',
//         headers: {
//           'X-RapidAPI-Key': import.meta.env.VITE_REACT_API_KEY,
//           'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
//         },
//       };

//       try {
//         const response = await fetch(url, options);
//         if (!response.ok) {
//           throw new Error('API request failed');
//         }
//         const data = await response.json();
//         console.log(data);
//         setData(data.results);
//         setIsLoading(false);
//       } catch (error) {
//         setError(error);
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);
  

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   if (data.length === 0) return <div>No data available</div>;
//   return (
   
//         <div className={styles.cardGrid}>
//     <div className={styles.cardsContainer}>
//    {data.map((recipe) => {
//       if (!recipe.name || !recipe.description) {
//         console.warn(`Recipe is missing name or description: ${recipe}`);
//         return null;
//       }
//       return (
      
//         <div
//           className={styles.card}
//           style={{
//             backgroundImage: `url(${recipe.thumbnail_url})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//           key={recipe.id}
//         >
//           <h2 className={styles.cardName}>{recipe.name}</h2>
//         </div>
       
 
//         // <div className={styles.cardGrid}>
//         // <div className={styles.cards}  style={{
//         //   backgroundImage: `url(${recipe.thumbnail_url})`,
//         //   height: '334px',
//         //   width: '242px',
//         //   backgroundSize: 'cover',
//         //   backgroundPosition: 'center',
//         // }} key={recipe.id}>
//         //   <h2 className={styles.cardName}>{recipe.name}</h2>
//         // </div>
//         // </div>
//       );
//     })}
//     </div>
//   </div>
// )

// }
// export default Card;