import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/Auth";
import styles from "./Header.module.css";

export function Header() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img
          src="https://www.belgium.be/sites/all/themes/custom/belgium_theme/logo.png"
          alt="Return to the Belgium.be homepage"
          id="logo"
        />
      </Link>
      {isAuthenticated ? (
        <Link to="/logout" className={styles.link}>
          Log out
        </Link>
      ) : (
        <Link to="/login" className={styles.link}>
          Log in
        </Link>
      )}
    </header>
  );
}
