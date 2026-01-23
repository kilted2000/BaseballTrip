
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  SignedIn,
  SignedOut, useUser,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import GameFinder from "./components/GameFinder";
import Spinner from "./components/Spinner";
import Results from "./components/Results";



import SavedSearchDetail from "./components/SavedSearchDetail";

import ChatBot from "./components/ChatBot";
import Userprofile from "./components/UserProfilePage";
function App() {
  const [aiContext, setAiContext] = useState({
    search: null,
    games: [],
  });
  const { user } = useUser();
  
  

  
useEffect(() => {
  const ensureCrewExists = async () => {
    if (!user?.id) return;
    
    try {
      const payload = {
        clerkUserId: user.id,
        email: user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress,
        username: user.username || user.firstName || user.primaryEmailAddress?.emailAddress.split('@')[0]
      };
      
      console.log("Initializing crew with:", payload);
      
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/crews/clerk`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );
      
      if (response.ok) {
        console.log("Crew initialized successfully");
      } else {
        console.log("Crew initialization failed, but may already exist");
      }
    } catch (error) {
      console.log("Failed to ensure crew exists (may already exist):", error);
      // Don't worry - crew likely already exists and chatbot will work
    }
  };

  ensureCrewExists();
}, [user]);

 


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
