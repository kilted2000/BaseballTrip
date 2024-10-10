import { useState } from "react";
import "./App.css";
import GameFinder from "./components/GameFinder";
import LandingPage from "./components/LandingPage";
import Spinner from "./components/Spinner";
import { Results } from "./components/Results";
import {
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [showForm, setShowForm] = useState(true);

  console.log("Results updated:", results);
  return (
    <>
      <SignedOut>
        <LandingPage />
      