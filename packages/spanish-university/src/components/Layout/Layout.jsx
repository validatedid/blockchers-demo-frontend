import React from "react";
import styles from "./Layout.module.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { REACT_APP_DEMONSTRATOR_URL } from "../../env";

export function Layout({ children }) {
  return (
    <div className={styles.root}>
      <Header />
      {children}
      <div className={styles.ribbon}>
        <a className={styles.ribbonText} href={REACT_APP_DEMONSTRATOR_URL}>
          EBSI DEMO
        </a>
      </div>
      <Footer />
    </div>
  );
}
