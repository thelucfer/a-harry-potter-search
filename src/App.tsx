import { Link, Outlet } from "react-router-dom";
import styles from "./App.module.css";

export const App = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>
          <Link to="/" className={styles.link}>
            A Harry Potter Character Search
          </Link>
        </h1>

        <Link to="/user" className={styles.userLink}>
          User page
        </Link>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>made by @thelucfer</footer>
    </>
  );
};
