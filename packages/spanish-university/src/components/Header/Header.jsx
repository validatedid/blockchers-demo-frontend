import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Header.module.css";
import Logo from "../../assets/images/logo-urv.png";
import LogoMobile from "../../assets/images/logo-urv-mobil.png";
import LogoNav from "../../assets/images/logo-urv-nav.png";

export function Header() {
  return (
    <header>
      <Container fluid>
        <Row>
          <Col>
            <div className={styles.logo}>
              <Link to="/" className={styles.logoContainer}>
                <img
                  src={Logo}
                  alt="Universitat Rovira i Virgili"
                  width="357"
                  className={styles.logoDesktop}
                />
                <img
                  src={LogoMobile}
                  alt="Universitat Rovira i Virgili"
                  width="191"
                  className={styles.logoMobil}
                />
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
      <div className={styles.barraTauleta}>
        <Link to="/" className={styles.anagrama}>
          <img src={LogoNav} alt="URV" />
        </Link>
      </div>
    </header>
  );
}
