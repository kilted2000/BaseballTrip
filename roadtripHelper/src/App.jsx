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
    <div className="bg-[url('./assets/stadium.jpg')] bg-cover bg-no-repeat h-dvh flex justify-center justify-items-center items-center">
      <form onSubmit={handleSubmit} className="rounded-lg bg-green-700 w-96 bg-no-repeat ">
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
        <button type="submit" className="border-neutral-50">Press If You Dare!</button>
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

