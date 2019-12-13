import React from "react";
import styles from "./Layout.module.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

const DEMONSTRATOR_URL = "http://localhost:3008/";

export function Layout({ children }) {
  return (
    <div className={styles.root}>
      <Header />
      {children}
      <div className={styles.ribbon}>
        <a className={styles.ribbonText} href={DEMONSTRATOR_URL}>
          EBSI DEMO
        </a>
      </div>
      <Footer />
    </div>
  );
}
