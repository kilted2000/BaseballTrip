import React from "react";
import "./App.css";
import GameFinder from "./components/GameFinder";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
function App() {
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <div className="App">
          <header className="App-header">
              <GameFinder />
          </header>
      </div> 
    </>
  );
}

export default App;
