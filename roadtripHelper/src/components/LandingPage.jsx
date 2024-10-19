import { SignInButton } from "@clerk/clerk-react";
import styles from "./landingPage.module.css"
const LandingPage = () => {
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
    <h4>As Seen On:</h4>
    <p>CNN</p>
    </div>
    <div className={styles.middle}>
     <h3>How Baseball-Trip Helper works"</h3>
     <p>Lorem Ipsom I love a parade. tihjchshfjhfkfsfsfbjkjhkjhklblbclbblkjbcbjbhbjbkjbbjbjbbjbljbj</p>
    </div>
    <div className={styles.footer}>
        <div className={styles.data}>
        <div className={styles.cta}>
            <p>Sign Up or Sign In Now!</p>
        </div>
        <a>Facebook</a>
        <