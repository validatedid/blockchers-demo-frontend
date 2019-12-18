import React from "react";
import styles from "./Page.module.css";

export function Page({ children }) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        This is not a real website of the Belgian Federal Government.
      </footer>
    </div>
  );
}
