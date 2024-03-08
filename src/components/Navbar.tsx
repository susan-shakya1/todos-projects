import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
export function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link
        to="/"
        style={{
          textDecoration: "none",
        }}
      >
        <div className={styles.navContainer}>
          {" "}
          <img
            src="/image/logo.png"
            alt=""
            style={{
              width: "4%",
            }}
          />
          <h1 className={styles.heading}>Todo App</h1>
        </div>
      </Link>
    </div>
  );
}
