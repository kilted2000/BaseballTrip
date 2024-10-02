import { SignedOut, SignInButton } from "@clerk/clerk-react";

const LandingPage = () => {
  return (
    <div className="bg-emerald-900 bg-gradient-to-r from-cyan-500 to-blue-500
    bg-contain h-dvh bg-center">
      <h1 className="text-2xl text-gray-300 text-center ">Welcome to the Baseball Jungle!</h1>
      <img src="toronto.jpeg" className="m-auto rounded-lg"></img>
    </div>
  );
};

export default LandingPage;
