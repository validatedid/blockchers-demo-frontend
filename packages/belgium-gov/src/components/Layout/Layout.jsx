import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Layout.module.css";

const DEMONSTRATOR_URL = "http://localhost:3004/";

export function Layout({ children }) {
  return (
    <>
      <Container>
        <Row>
          <Col className={styles.col}>{children}</Col>
        </Row>
      </Container>
      <div className={styles.ribbon}>
        <a className={styles.ribbonText} href={DEMONSTRATOR_URL}>
          EBSI DEMO
        </a>
      </div>
    </>
  );
}
