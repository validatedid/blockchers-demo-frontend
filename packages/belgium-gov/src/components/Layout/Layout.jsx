import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Layout.module.css";
import { REACT_APP_DEMONSTRATOR_URL } from "../../env";

export function Layout({ children }) {
  return (
    <>
      <Container>
        <Row>
          <Col className={styles.col}>{children}</Col>
        </Row>
      </Container>
      <div className={styles.ribbon}>
        <a className={styles.ribbonText} href={REACT_APP_DEMONSTRATOR_URL}>
          EBSI DEMO
        </a>
      </div>
    </>
  );
}
