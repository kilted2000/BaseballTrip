import { SignedOut, SignInButton } from "@clerk/clerk-react";

const LandingPage = () => {
  return (
    <div className="bg-emerald-900">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <h1 className="bg-gray-300">Welcome to the Baseball Jungle!</h1>
    </div>
  );
};

export default LandingPage;
