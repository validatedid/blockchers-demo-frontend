import React, { useState, useContext, Fragment } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { AuthContext } from "../../components/Auth/Auth";
import { Button } from "../../components/Button/Button";
import {
  P,
  styles as typographyStyles
} from "../../components/Typography/Typography";
import styles from "./GetMaster.module.css";
import mastersIllustration from "../../assets/images/masters.jpg";

const REQUEST_STATUS = {
  NOT_SENT: "",
  PENDING: "pending",
  OK: "ok",
  FAILED: "failed"
};

const WALLET_URL = process.env.REACT_APP_WALLET_URL || "http://localhost:3000";
const BACKEND_EXTERNAL_URL =
  process.env.REACT_APP_BACKEND_EXTERNAL_URL || "http://localhost:3222";

function GetMaster() {
  const [requestStatus, setRequestStatus] = useState(
    localStorage.getItem("master-va-issued") === "yes"
      ? REQUEST_STATUS.OK
      : REQUEST_STATUS.NOT_SENT
  );

  const { rawJWT, JWT } = useContext(AuthContext);

  const onRequestMaster = () => {
    const requestBody = { did: JWT.did };

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    requestHeaders.append("Authorization", `Bearer ${rawJWT}`);

    const requestOptions = {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(requestBody)
    };

    setRequestStatus(REQUEST_STATUS.PENDING);

    fetch(`${BACKEND_EXTERNAL_URL}/universities/masters`, requestOptions)
      .then(function(response) {
        if (response.status !== 201) {
          return Promise.reject(
            "Looks like there was a problem. Status Code: " + response.status
          );
        }

        return response.json();
      })
      .then(function(response) {
        // TODO: Actually do something with the response, e.g. extract "callback_url" (response.callback_url)
        console.log("Response from Diploma API", response);
        localStorage.setItem("master-va-issued", "yes");
        setRequestStatus(REQUEST_STATUS.OK);
      })
      .catch(function(error) {
        console.error("Error from Diploma API", error);
        setRequestStatus(REQUEST_STATUS.FAILED);
      });
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
      <Container fluid className="py-3 py-sm-5">
        {(() => {
          if (requestStatus === REQUEST_STATUS.OK) {
            return (
              <Fragment>
                <P>
                  Your Master has been sent. Please check your{" "}
                  <a
                    href={`${WALLET_URL}/notifications`}
                    className={typographyStyles.a}
                  >
                    wallet's notifications
                  </a>
                  .
                </P>
              </Fragment>
            );
          }

          return (
            <Fragment>
              <P className={styles.intro}>Your Master is available.</P>
              <Button
                variant="primary"
                onClick={onRequestMaster}
                disabled={requestStatus === REQUEST_STATUS.PENDING}
              >
                {requestStatus === REQUEST_STATUS.PENDING ? (
                  <>Sending request...</>
                ) : (
                  <>Get your Master's Degree</>
                )}
              </Button>
              {requestStatus === REQUEST_STATUS.FAILED && (
                <Alert variant="danger" className="mt-3">
                  Ouch! Something went wrong... Check the console to know more
                  about what happened.
                </Alert>
              )}
            </Fragment>
          );
        })()}
      </Container>
    </Fragment>
  );
}

export default GetMaster;
