import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button/Button";
import { H2, P } from "../../components/Typography/Typography";
import styles from "./Master.module.css";
import mastersIllustration from "../../assets/images/masters.jpg";

const API_URL = process.env.REACT_APP_WALLET_API || "http://localhost:3002";

class Master extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bondId: sessionStorage.getItem("BondId"),
      did: sessionStorage.getItem("Did"),
      userDid: sessionStorage.getItem("UserDid"),
      connectionId: sessionStorage.getItem("ConnectionId")
    };
  }

  componentDidMount() {
    this.retrieveUserName();
  }

  retrieveUserName() {
    // Generate request (Part hard-coded now)
    var connection_id = sessionStorage.getItem("ConnectionId");
    this.getUserDataFromTheWallet(connection_id).then(res => {
      this.setState({
        username: res.username
      });
    });
  }

  getUserDataFromTheWallet(connection_id) {
    return new Promise(function(resolve, reject) {
      axios
        .get(API_URL + "/enterprise/user-data/" + connection_id)
        .then(res => {
          resolve(res.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }

  requestVerifiableID() {
    // Demo: redirect to wallet
    const redirectUri = window.location.href;
    window.location.href = `${API_URL}/operations?redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;

    /*
    // Generate request (Part hard-coded now)
    var request = {
      "@connection_id": sessionStorage.getItem("ConnectionId"),
      did: sessionStorage.getItem("UserDid"),
      eidasDatasetInput: {
        currentFamilyName: "Franz",
        currentGivenName: "Hinterberger",
        dateOfBirth: "1999-03-22T00:00:00Z",
        placeOfBirth: "Salzburg, Austria"
      }
    };

    this.requestToTheWallet(request).then(res => {
      window.location.href = res.callback_url;
    });
    */
  }

  requestToTheWallet(request) {
    return new Promise(function(resolve, reject) {
      axios
        .post(API_URL + "/issue-verifiable-id/request", {
          data: request
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }

  render() {
    return (
      <>
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
              <P className={styles.intro}>
                This master's degree prepares students to undertake tasks of
                responsibility in industries, the administration, or the
                national and international academic world. The programme covers
                many research issues regarding the design, analysis and use of
                artificial intelligence systems. The main aim is to train
                computer specialists in the field of intelligent systems.
                Students will also be able to provide solutions to highly
                technical problems that require a certain amount of innovation
                or research.
              </P>
              <H2>Admission</H2>
              <P>
                Your application and documentation will be reviewed to determine
                whether you should be admitted to the master's programme.
              </P>
              <Button
                variant="primary"
                onClick={() => this.requestVerifiableID()}
              >
                Apply to Master's Degree
              </Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Master;
