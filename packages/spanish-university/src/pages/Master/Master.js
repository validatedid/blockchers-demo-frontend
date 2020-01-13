import React, { useState, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button/Button";
import {
  H2,
  P,
  styles as typographyStyles
} from "../../components/Typography/Typography";
import styles from "./Master.module.css";
import mastersIllustration from "../../assets/images/masters.jpg";

const API_URL = process.env.REACT_APP_WALLET_URL || "http://localhost:3002";

function Master() {
  const [requestIssued, setIsRequestIssued] = useState(
    localStorage.getItem("master-application-issued") === "yes"
  );

  const onApplyToMaster = () => {
    localStorage.setItem("master-application-issued", "yes");
    setIsRequestIssued(true);
  };

  return (
    <Fragment>
      <div className={styles.mainTitle}>
        <Container fluid>
          <Row>
            <Col sm={6}>
              <h1 className={styles.mainHeading}>
                Master's degree in Computer Security Engineering and AI
              </h1>
            </Col>
            <Col sm={6} className="d-none d-sm-block">
              <img
                src={mastersIllustration}
                role="presentation"
                alt=""
                className={styles.illustration}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Container fluid>
        <Row>
          <Col sm={{ span: 5, order: 2 }}>
            <dl className={styles.dl}>
              <dt>Duration</dt>
              <dd>90 ECTS</dd>
              <dt>Places available</dt>
              <dd>50</dd>
              <dt>Type</dt>
              <dd>Face-to-face </dd>
              <dt>Language of instruction</dt>
              <dd>English </dd>
              <dt>Course date</dt>
              <dd>
                <p>
                  First semester: September-January
                  <br /> Second semester: February-June
                </p>
              </dd>
            </dl>
          </Col>
          <Col sm={{ span: 7, order: 1 }} className="py-3 py-sm-5">
            {requestIssued ? (
              <Fragment>
                <P>
                  Your application has been sent. Please check your{" "}
                  <a
                    href={`${API_URL}/notifications`}
                    className={typographyStyles.a}
                  >
                    wallet's notifications
                  </a>
                  .
                </P>
              </Fragment>
            ) : (
              <Fragment>
                <P className={styles.intro}>
                  This master's degree prepares students to undertake tasks of
                  responsibility in industries, the administration, or the
                  national and international academic world. The programme
                  covers many research issues regarding the design, analysis and
                  use of artificial intelligence systems. The main aim is to
                  train computer specialists in the field of intelligent
                  systems. Students will also be able to provide solutions to
                  highly technical problems that require a certain amount of
                  innovation or research.
                </P>
                <H2>Admission</H2>
                <P>
                  Your application and documentation will be reviewed to
                  determine whether you should be admitted to the master's
                  programme.
                </P>
                <Button variant="primary" onClick={onApplyToMaster}>
                  Apply to Master's Degree
                </Button>
              </Fragment>
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Master;
