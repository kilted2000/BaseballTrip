import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [team, setTeam] = useState('')
  const [schedule, setSchedule] = useState('')

  const stadiums = 
    [
      {
          name: 'Busch',
          team: 'Cardinals',
          schedule: ['june 15', 'june 16', 'july 16', 'july 17', 'july 18']
      },
      {
          name: 'Truist',
          team: 'Braves',
          schedule: ['june 15', 'june 16', 'july 16', 'july 7', 'july 8']
      },
      {
          name: 'Wringley',
          team: 'Cubs',
          schedule: ['june 15', 'june 16', 'july 16', 'july 1', 'july 2']
      },
      {
          name: 'GR',
          team: 'White Soxs',
          schedule: ['june 15', 'june 16', 'july 17', 'july 18', 'july 19']
      },]
  

  return (
    <>
    <form>
      <input></input>
      <input></input>
      <input></input>
      <input></input>
      <input></input>
      <button type='submit'>Press If You Dare!</button>
      </form>
    </>
  )
}

export default App
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
//     <form onSubmit={handleSubmit}>
//       <label>
//         First Name:
//         <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
//       </label>
//       <label>
//         Last Name:
//         <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
//       </label>
//       <label>
//         Email:
//         <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
//       </label>