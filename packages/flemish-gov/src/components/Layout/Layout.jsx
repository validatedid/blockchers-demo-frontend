import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Layout.module.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

const DEMONSTRATOR_URL = "http://localhost:3003/";

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
        <a className={styles.ribbonText} href={DEMONSTRATOR_URL}>
          EBSI DEMO
        </a>
      </div>
      <Footer />
    </div>
  );
}
