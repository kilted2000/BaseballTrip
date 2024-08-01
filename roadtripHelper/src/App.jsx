import { useState } from "react";
import "./App.css";

function App() {
  const [teamOne, setTeamOne] = useState("");
  const [teamTwo, setTeamTwo] = useState("");
  const [teamThree, setTeamThree] = useState("");
  const [teamFour, setTeamFour] = useState("");
  const [dateOne, setDateOne] = useState("");
  const [dateTwo, setDateTwo] = useState("");

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
      name: "Wringley",
      team: "Cubs",
      schedule: ["june 15", "june 16", "july 16", "july 1", "july 2"],
    },
    {
      name: "GR",
      team: "White Soxs",
      schedule: ["june 15", "june 16", "july 17", "july 18", "july 19"],
    },
  ];
//user enters team names and dates
//user clicks submit
//stadium array of obj is checked
//schedule key is checked by team name
//matching dates are returned under team names

  const handleSubmit = event => {
    event.preventDefault();
    let matched = [];
    for(let i = 0;i < stadiums.schedule.length; i++){
      
    }
    // let results = '';
    // stadiums.forEach(stadium => {
    //   results += `${stadium.name} , ${stadium.team} , ${stadium.schedule.join(', ')}\n`;
    // });
    
    // document.getElementById('result').innerText = results;
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
          ></input>
        </label>
        <label>
          Team Two:
          <input
            type="text"
            value={teamTwo}
            onChange={(e) => setTeamTwo(e.target.value)}
          ></input>
        </label>
        <label>
          Team Three:
          <input
            type="text"
            value={teamThree}
            onChange={(e) => setTeamThree(e.target.value)}
          ></input>
        </label>
        <label>
          Team Four:
          <input
            type="text"
            value={teamFour}
            onChange={(e) => setTeamFour(e.target.value)}
          ></input>
        </label>
        <label>
          Dates:
          <input
            type="text"
            value={dateOne}
            onChange={(e) => setDateOne(e.target.value)}
          ></input>
          -
          <input
            type="text"
            value={dateTwo}
            onChange={(e) => setDateTwo(e.target.value)}
          ></input>
        </label>
        <button type="submit">Press If You Dare!</button>
      </form>
      <div id='result'></div>
    </>
  );
}

export default App;


