// import { useState } from "react";
// import "./App.css";
// import GameFinder from "./components/GameFinder";
// import LandingPage from "./components/LandingPage";

// import Spinner from "./components/Spinner";
// import { Results } from "./components/Results";

// import {
//   SignedIn,
//   SignedOut,
// } from "@clerk/clerk-react";

// function App() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [results, setResults] = useState([]);
//   const [showForm, setShowForm] = useState(true);

//   console.log("Results updated:", results);
//   return (
//     <>
//       <SignedOut>
//         <LandingPage />
//       </SignedOut>

//       <SignedIn>
//         <div className="App">
//           <header className="App-header">
          
//           {showForm ? (
//               <GameFinder 
//                 setIsLoading={setIsLoading} 
//                 setResults={setResults} 
//                 setShowForm={setShowForm} 
//               />
//             ) : isLoading ? (
//               <Spinner />
//             ) : (
//               <Results results={results} />
//             )}
           
//           </header>
         
//         </div>
//       </SignedIn>
//     </>
//   );
// }

// export default App;
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

import LandingPage from "./components/LandingPage";
import GameFinder from "./components/GameFinder";
import Spinner from "./components/Spinner";
import { Results } from "./components/Results";
import UserDash  from "./components/UserDash";
import SavedSearchDetail from "./components/SavedSearchDetail";
import { useState } from "react";
import ChatBot from "./components/ChatBot";

function App() {
  const [aiContext, setAiContext] = useState({
    search: null,
    games: [],
  });

  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>

      <SignedIn>
        {/* Navbar should live here */}
        <ChatBot
          search={aiContext.search}
          games={aiContext.games}
        />

        <Routes>
          <Route
            path="/"
            element={<GameFinder setAiContext={setAiContext} />}
          />
          <Route
            path="/results"
            element={<Results setAiContext={setAiContext} />}
          />
          <Route path="/profile" element={<UserDash />} />
          <Route path="/saved-search/:id" element={<SavedSearchDetail />} />
        </Routes>
      </SignedIn>
    </>
  );
}
export default App;
