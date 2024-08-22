import { Outlet } from "react-router-dom";
import styles from "./App.module.css";

export const App = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>Prosigliere challenge</h1>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>made by @thelucfer</footer>
    </>
  );
};
