import React from "react";
import styles from "./Typography.module.css";

export function H1({ children, ...props }) {
  return (
    <h1 className={styles.h1} {...props}>
      {children}
    </h1>
  );
}

export function P({ children, ...props }) {
  return (
    <p className={styles.p} {...props}>
      {children}
    </p>
  );
}
