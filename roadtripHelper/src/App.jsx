
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import GameFinder from "./components/GameFinder";
import Spinner from "./components/Spinner";
import { Results } from "./components/Results";

import SavedSearchDetail from "./components/SavedSearchDetail";
import { useState } from "react";
import ChatBot from "./components/ChatBot";
import Userprofile from "./components/UserProfilePage";
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
         <div className="app-container min-h-screen bg-[url('/stadium.jpg')] bg-cover bg-center bg-no-repeat">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<GameFinder setAiContext={setAiContext} />}
          /> 
          <Route
            path="/results"
            element={<Results setAiContext={setAiContext} />}
          />
          <Route
            path="/tubey"
            element={
              <ChatBot
                search={aiContext.search}
                games={aiContext.games}
              />
            }
          />
          <Route path="/profile" element={<Userprofile/>} />
          <Route path="/saved-search/:id" element={<SavedSearchDetail />} />
        </Routes>
        </div>
      </SignedIn>
    </>
  );
}

export default App;
