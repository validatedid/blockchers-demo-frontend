import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img
          src="https://www.belgium.be/sites/all/themes/custom/belgium_theme/logo.png"
          alt="Return to the Belgium.be homepage"
          id="logo"
        />
      </Link>
    </header>
  );
}
