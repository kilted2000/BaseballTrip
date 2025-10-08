import { SignInButton } from "@clerk/clerk-react";

const LandingPage = () => {
  return (
    <div
      className="bg-emerald-900 bg-gradient-to-r from-indigo-800 to-emerald-900
      bg-center h-full m-auto overflow-x-hidden"
    >
      <div className="navbar bg-base-300">
        <a className="btn btn-ghost font-bold ">Baseball Bucketlist</a>
        <SignInButton className="absolute top-0 right-0 mt-4 mr-4 text-sky-500" />
      </div>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: "url(chasefield.jpg)" }}
      >
        <div className="hero-content text-neutral-content text-center text-6xl text-white">
          <h2 className="text-white font-medium md:text-9xl md:font-bold">
            Simplify your road-trip planning!
          </h2>
        </div>
      </div>
      <div>
  <div className="hero flex flex-row flex-wrap justify-center gap-4 w-screen items-center">
    <h4 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">As Seen On:</h4>
    <img
      src="bbc.jpeg"
      alt="bbc logo"
      className="bg-base-100 size-12 sm:size-16 md:size-24 lg:size-36 xl:size-48"
    />
    <img
      src="cnn.jpeg"
      alt="cnn logo"
      className="bg-base-100 size-12 sm:size-16 md:size-24 lg:size-36 xl:size-48"
    />
    <img
      src="mlb.png"
      alt="mlb logo"
      className="bg-base-100 size-12 sm:size-16 md:size-24 lg:size-36 xl:size-48"
    />
    <img
      src="nytimes.png"
      alt="new york times logo"
      className="bg-base-100 size-12 sm:size-16 md:size-24 lg:size-36 xl:size-48"
    />
    <img
      src="rte.jpeg"
      alt="rte logo"
      className="bg-base-100 size-12 sm:size-16 md:size-24 lg:size-36 xl:size-48"
    />
  </div>
</div>

      {/* <div>
        <div className="hero flex flex-row place-content-evenly w-screen">
          <h4>As Seen On:</h4>
          <img
            src="bbc.jpeg"
            alt="bbc logo"
            className=" bg-base-100 size-20 lg:size-48 xl:size-54"
          />
          <img
            src="cnn.jpeg"
            alt="cnn logo"
            className=" bg-base-100 size-20 lg:size-48 xl:size-54"
          />
          <img
            src="mlb.png"
            alt="mlb logo"
            className="bg-base-100 size-20 lg:size-48 xl:size-54"
          />
          <img
            src="nytimes.png"
            alt="new york times logo"
            className="bg-base-100 size-20 lg:size-48 xl:size-54"
          />
          <img
            src="rte.jpeg"
            alt="rte logo"
            className=" bg-base-100 size-20 lg:size-48 xl:size-54"
          />
        </div>
      </div> */}
      <div className="bg-blue-900 h-72 text-left p-8 text-white">
        <h3 className="text-sm md:text-2xl px-8 pt-8">
          How Baseball Bucketlist will simplify your life:
        </h3> 
        <p className="text-sm md:text-2xl p-8 leading-8">
          Stop having to check each team’s schedule individually, just type in
          the cities or teams you are interested in and voila! Spend less time planning and more time enjoying the game!
        </p>
      </div>
      <div className="hero bg-slate-200 h-72">
        <div className="hero-content">
          <img
            src="cards.svg"
            alt="Cardinals Logo"
            className="size-12 md:size-20 lg:size-28"
          />
          <img
            src="phillies.svg"
            alt="Phillies Logo"
            className="size-12 md:size-20 lg:size-28"
          />
          <img
            src="cubs.svg"
            alt="Cubs Logo"
            className="size-12 md:size-20 lg:size-28"
          />
          <img
            src="braves.svg"
            alt="Braves Logo"
            className="size-12 md:size-20 lg:size-28"
          />
          <img
            src="mariners.svg"
            alt="Mariners Logo"
            className=" size-12 md:size-20 lg:size-28"
          />
        </div>
      </div>

      <div className="hero bg-slate-700 h-48 w-screen">
        <div className="hero-content text-center">
          <h3 className="card-title text-white">Sign Up or Sign In Now!</h3>
          <div className="card-actions">
            <SignInButton className="btn btn-primary" />
          </div>
        </div>
      </div>
      <div className="menu menu-lg bg-base-200 w-screen mb-0">
        <div className="flex flex-col md:flex-row justify-around text-lg mb-0">
          <a>Facebook</a>
          <a>Twitter</a>
          <a>Instagram</a>
          <a>GitHub</a>
        </div>
        <p className="mt-2 text-center">
          &copy; 2025 Whittington Not At All Evil Industries
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
