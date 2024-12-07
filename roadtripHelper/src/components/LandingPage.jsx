import { SignInButton } from "@clerk/clerk-react";
import styles from "./landingPage.module.css"
const LandingPage = () => {
  //style = {{ backgroundImage: url('../src/assets/stadium.jpg')}}
  return (
    <div
      className="bg-emerald-900 bg-gradient-to-r from-indigo-800 to-emerald-900
    bg-contain h-dvh bg-center h-full"
    >
      <div className="navbar bg-base-300">
        <a className="btn btn-ghost text-xl ">Baseball Bucketlist</a>
        <SignInButton className="absolute top-0 right-0 mt-4 mr-4 text-sky-500" />
      </div>
      <div className={styles.header}>
       <h1>Baseball-Trip Helper</h1>
       <div className={styles.mainTitle}>
        <h2>Simplify your road-trip planning!</h2>
       </div>
       
    </div>
    <div className={styles.media}>
    {/* <h4>As Seen On:</h4> */}
    <div className="flex flex-row justify-between ml-2">
    <h4>As Seen On:</h4>
      <img src="bbc.jpeg" alt="bbc logo" />
      <img src="cnn.jpeg" alt="cnn logo"/>
      <img src="mlb.png" alt="mlb logo" />
      <img src="nytimes.png" alt="new york times logo" />
      <img src="rte.jpeg" alt="rte logo" />
    </div>
    </div>
    <div className="hero bg-slate-200 h-72 w-screen">
      <div className="hero-content">
     <h3>How Baseball-Trip Helper will simplify your life"</h3>
     <p>Enter up to four teams to see their schedules. Baseball Roadtrip Helper brings every teams schedules together in one place?</p>
<img src="cards.svg" alt="Cardinals Logo" className="h-28"/>
<img src="phillies.svg" alt="Phillies Logo" className="h-28" />
<img src="cubs.svg" alt="Cubs Logo" className="h-28"/>
<img src="braves.svg" alt="Braves Logo" className="h-28"/>
<img src="mariners.svg" alt="Mariners Logo" className="h-28"/>

     </div>
     </div>
    <div className={styles.footer}>
        <div className={styles.data}>
          <div className="hero bg-slate-700 h-48 w-screen">
            <div className="hero-content text-center">
        
            <h3 className="card-title">Sign Up or Sign In Now!</h3>
            <div className="card-actions">
            <SignInButton className="btn btn-primary"/>
            </div>
            
        </div>
        </div>
        <div className="menu menu-lg bg-base-200 w-screen">
        <a>Facebook</a>
        <a>Twitter</a>
        <a>Instagram</a>
        <a>GitHub</a>
        <p>&copy; 2024 Whittington Not At All Evil Industries</p>
        </div>
    </div>
    </div>
    </div>
  );
};

export default LandingPage;
