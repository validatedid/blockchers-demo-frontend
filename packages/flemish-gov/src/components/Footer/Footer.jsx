import React from "react";
import styles from "./Footer.module.css";

export function Footer({ children }) {
  return (
    <footer className={styles.footer}>
      This is not a real website of the Flemish government.
    </footer>
  );
}
