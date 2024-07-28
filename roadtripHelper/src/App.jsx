import { useState } from 'react'
import './App.css'

function App() {
  const [click, setClick] = useState(0)
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
      <button>Press If You Dare!</button>
      </form>
    </>
  )
}

export default App
