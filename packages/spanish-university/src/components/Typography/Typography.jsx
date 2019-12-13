import React from "react";
import { Container } from "react-bootstrap";
import styles from "./Typography.module.css";

export { styles };

export function H1({ children, ...props }) {
  return (
    <div className={styles.h1Wrapper}>
      <Container fluid>
        <h1 className={styles.h1} {...props}>
          {children}
        </h1>
      </Container>
    </div>
  );
}

export function H2({ children, ...props }) {
  return (
    <h2 className={styles.h2} {...props}>
      {children}
    </h2>
  );
}

export function P({ children, ...props }) {
  return (
    <p className={styles.p} {...props}>
      {children}
    </p>
  );
}

export function UL({ children, ...props }) {
  return (
    <ul className={styles.ul} {...props}>
      {children}
    </ul>
  );
}

export function LI({ children, ...props }) {
  return (
    <li className={styles.li} {...props}>
      {children}
    </li>
  );
}

export function A({ children, ...props }) {
  return (
    <a className={styles.a} {...props}>
      {children}
    </a>
  );
}
