// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [teamOne, setTeamOne] = useState("");
//   const [teamTwo, setTeamTwo] = useState("");
//   const [teamThree, setTeamThree] = useState("");
//   const [teamFour, setTeamFour] = useState("");
//   const [dateOne, setDateOne] = useState("");
//   const [dateTwo, setDateTwo] = useState("");
//   const [results, setResults] = useState([]);

//   const stadiums = [
//     {
//       name: "Busch",
//       team: "Cardinals",
//       schedule: ["june 15", "june 16", "july 16", "july 17", "july 18"],
//     },
//     {
//       name: "Truist",
//       team: "Braves",
//       schedule: ["june 15", "june 16", "july 16", "july 7", "july 8"],
//     },
//     {
//       name: "Wringley",
//       team: "Cubs",
//       schedule: ["june 15", "june 16", "july 16", "july 1", "july 2"],
//     },
//     {
//       name: "GR",
//       team: "White Soxs",
//       schedule: ["june 15", "june 16", "july 17", "july 18", "july 19"],
//     },
//   ];
// //user enters team names and dates
// //user clicks submit
// //stadium array of obj is checked
// //schedule key is checked by team name
// //matching dates are returned under team names

// //iterate through each schedule array
// //check for matching dates between two or more arrays
// //display all matching dates under respective team names

//   const handleSubmit = event => {
//     event.preventDefault();
//     const teams = [teamOne, teamTwo, teamThree, teamFour].filter(Boolean);
//     const dateRange = [dateOne, dateTwo];

//     const matchingDates = stadiums
//       .filter((stadium) => teams.includes(stadium.team))
//       .reduce((acc, stadium) => {
//         const matchedDates = stadium.schedule.filter((date) =>
//           dateRange.includes(date)
//         );
//         if (matchedDates.length > 0) {
//           acc.push({
//             team: stadium.team,
//             dates: matchedDates,
//           });
//         }
//         return acc;
//       }, []);

//     setResults(matchingDates);
//     // let results = '';
//     // stadiums.forEach(stadium => {
//     //   results += `${stadium.name} , ${stadium.team} , ${stadium.schedule.join(', ')}\n`;
//     // });
    
//     // document.getElementById('result').innerText = matchingDates;
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Team One:
//           <input
//             type="text"
//             value={teamOne}
//             onChange={(e) => setTeamOne(e.target.value)}
//           ></input>
//         </label>
//         <label>
//           Team Two:
//           <input
//             type="text"
//             value={teamTwo}
//             onChange={(e) => setTeamTwo(e.target.value)}
//           ></input>
//         </label>
//         <label>
//           Team Three:
//           <input
//             type="text"
//             value={teamThree}
//             onChange={(e) => setTeamThree(e.target.value)}
//           ></input>
//         </label>
//         <label>
//           Team Four:
//           <input
//             type="text"
//             value={teamFour}
//             onChange={(e) => setTeamFour(e.target.value)}
//           ></input>
//         </label>
//         <label>
//           Dates:
//           <input
//             type="text"
//             value={dateOne}
//             onChange={(e) => setDateOne(e.target.value)}
//           ></input>
//           -
//           <input
//             type="text"
//             value={dateTwo}
//             onChange={(e) => setDateTwo(e.target.value)}
//           ></input>
//         </label>
//         <button type="submit">Press If You Dare!</button>
//       </form>
//       <div id='result'></div>
//     </>
//   );
// }

// export default App;

import { useState } from "react";
import "./App.css";

function App() {
  const [teamOne, setTeamOne] = useState("");
  const [teamTwo, setTeamTwo] = useState("");
  const [teamThree, setTeamThree] = useState("");
  const [teamFour, setTeamFour] = useState("");
  const [dateOne, setDateOne] = useState("");
  const [dateTwo, setDateTwo] = useState("");
  const [results, setResults] = useState([]);
  
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

  const handleSubmit = (event) => {
    //prevents default behavior of page refreshing
    event.preventDefault();
    //create array with teams and filter to remove falsy values
    const teams = [teamOne, teamTwo, teamThree, teamFour].filter(Boolean);
    //const dateRange = [dateOne, dateTwo];
//initialize matchingDates variable
    const matchingDates = stadiums
      .filter((stadium) => teams.includes(stadium.team))
      .reduce((acc, stadium) => {
        const matchedDates = stadium.schedule.filter((date) =>
          dateRange.includes(date)
        );
        if (matchedDates.length > 0) {
          acc.push({
            team: stadium.team,
            dates: matchedDates,
          });
        }
        return acc;
      }, []);

    setResults(matchingDates);
    console.log(results);
    //document.getElementById('result').innerText = matchingDates;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Press If You Dare!</button>
      </form>
      <div id='result'>
        {results.length > 0 && results.map(result => (
          <div key={result.team}>
            <h3>{result.team}</h3>
            <p>{result.dates.join(', ')}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

