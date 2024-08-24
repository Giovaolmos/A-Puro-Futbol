import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className={styles.landing}>
      <h1 className={styles.title}>WELCOME TO GOAL TIME</h1>
      <div className={styles.h2}>
        <h2>First time here?</h2>
        <Link to="/register">
          <button className={styles.buttons}>Sign Up</button>
        </Link>
      </div>
      <div className={styles.h2}>
        <h2>Do you have an account?</h2>
        <Link to="/login">
          <button className={styles.buttons}>Log In</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
