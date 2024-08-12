import { useState } from "react";
import "./App.css";

function App() {
  const [teamOne, setTeamOne] = useState("");
  const [teamTwo, setTeamTwo] = useState("");
  const [teamThree, setTeamThree] = useState("");
  const [teamFour, setTeamFour] = useState("");
  // const [dateOne, setDateOne] = useState("");
  // const [dateTwo, setDateTwo] = useState("");
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
    event.preventDefault();
    const teams = [teamOne, teamTwo, teamThree, teamFour].filter(Boolean);

    const matchingDates = stadiums
      .filter((stadium) => teams.includes(stadium.team))
      .map((stadium) => ({
        team: stadium.team,
        dates: stadium.schedule,
      }));
    console.log("Matching Dates:", matchingDates);
    setResults(matchingDates);
  };

  return (
    <div className="bg-[url('./assets/stadium.jpg')] bg-cover bg-no-repeat h-dvh justify-center justify-items-center items-center flex ">
      <form onSubmit={handleSubmit} className="rounded-lg bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-600 bg-no-repeat p-9 shadow-2xl shadow-green-900 space-y-4 flex flex-col">
        <div>
        <label className="w-1/2">
          Team One:
          <input
            type="text"
            value={teamOne}
            onChange={(e) => setTeamOne(e.target.value)}
          />
        </label>
        <label className="w-1/2">
          Team Two:
          <input
            type="text"
            value={teamTwo}
            onChange={(e) => setTeamTwo(e.target.value)}
          />
        </label>
        </div>
        <div>
        <label className="w-1/2">
          Team Three:
          <input
            type="text"
            value={teamThree}
            onChange={(e) => setTeamThree(e.target.value)}
          />
        </label>
        <label className="w-1/2">
          Team Four:
          <input
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
        <button type="submit" className="bg-blue-700 w-1/4 self-center">Press If You Dare!</button>
      </form>
      <div id='result'>
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

