import styles from "./IntroTodo.module.css";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
export function IntroTodo() {
  return (
    <div className={styles.mainContainer}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1>WelCome to My TodoApp</h1>
          <p>This app help organize your work and keep of track of tasks</p>
          <div className={styles.Btn}>
            <Link to="/todos">
              {" "}
              <button>click visit to App</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
