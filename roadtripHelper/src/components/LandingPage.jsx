import { SignedOut, SignInButton } from "@clerk/clerk-react";

const LandingPage = () => {
  return (
    <div className="bg-emerald-900 bg-gradient-to-r from-indigo-800 to-emerald-900
    bg-contain h-dvh bg-center">
      <div class="navbar bg-base-300">
  <a class="btn btn-ghost text-xl ">Road Trip Helper</a>
  <SignInButton className='absolute top-0 right-0 mt-4 mr-4 text-sky-500'/>
</div>
      <h1 className="text-