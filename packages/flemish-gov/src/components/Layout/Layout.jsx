import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Layout.module.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export function Layout({ children }) {
  return (
    <div className={styles.root}>
      <Header />
      <Container className={styles.main}>
        <Row>
          <Col className={styles.col}>{children}</Col>
        </Row>
      </Container>
      <div className={styles.ribbon}>
        <div>EBSI DEMO</div>
      </div>
      <Footer />
    </div>
  );
}
