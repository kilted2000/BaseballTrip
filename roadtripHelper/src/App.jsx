import React from "react";
import "./App.css";
import GameFinder from "./components/GameFinder";
import LandingPage from "./components/LandingPage";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
function App() {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>

      <SignedIn>
        {/* <UserButton /> */}
        <div className="App">
          <header className="App-header">
            <GameFinder />
           
          </header>
        </div>
      </SignedIn>
    </>
  );
}

export default App;
