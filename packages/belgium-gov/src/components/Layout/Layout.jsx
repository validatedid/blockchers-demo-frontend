import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Layout.module.css";

export function Layout({ children }) {
  return (
    <>
      <Container>
        <Row>
          <Col className={styles.col}>{children}</Col>
        </Row>
      </Container>
      <div className={styles.ribbon}>
        <span>EBSI DEMO</span>
      </div>
    </>
  );
}
