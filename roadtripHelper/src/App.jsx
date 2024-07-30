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

  const handleSubmit = event => {
    event.preventDefault();
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
            type="date"
            value={dateOne}
            onChange={(e) => setDateOne(e.target.value)}
          ></input>
          -
          <input
            type="date"
            value={dateTwo}
            onChange={(e) => setDateTwo(e.target.value)}
          ></input>
        </label>
        <button type="submit">Press If You Dare!</button>
      </form>
    </>
  );
}

export default App;
// const ProfileForm = () => {
//   const { isAuthenticated } = useAuth0();
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [dogName, setDogName] = useState('');
//   const [breed, setBreed] = useState('');
//   const [personality, setPersonality] = useState('');

// //   function handlePhotoUpload(result) {
// //     console.log(result);
// //   }
//   const handleSubmit = event => {
//     event.preventDefault();
//     const newUser = { firstName, lastName, email, dogName, breed, personality };
//     console.log(newUser)
//     fetch("http://localhost:8080/api/users/", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newUser)

//     })

//       .then(response => response.json())
//       .then(data => console.log(data))
//       .catch(error => console.error(error));
//   };

//   return (
//     isAuthenticated && (
//      (
//         <input type="text" value={firstName}  />
//     <form onSubmit={handleSubmit}>
//       <label>
//         First Name:
//         <input type="text" value={firstName}  />
//         <input type="text" value={firstName}  />
//       </label>
//       <label>
//         Last Name:
//         <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
//       </label>
//       <label>
//         Email:
//         <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
//       </label>
