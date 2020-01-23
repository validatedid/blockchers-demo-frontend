import React, { useState, useContext, Fragment } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { AuthContext } from "../../components/Auth/Auth";
import { Button } from "../../components/Button/Button";
import {
  H2,
  P,
  styles as typographyStyles
} from "../../components/Typography/Typography";
import styles from "./ApplyMaster.module.css";
import mastersIllustration from "../../assets/images/masters.jpg";
import {
  REACT_APP_WALLET_URL,
  REACT_APP_DIPLOMA_API_URL,
  REACT_APP_BACKEND_INTERNAL_URL,
  REACT_APP_URL
} from "../../env";

const REQUEST_STATUS = {
  NOT_SENT: "",
  PENDING: "pending",
  OK: "ok",
  FAILED: "failed"
};

function ApplyMaster() {
  const [requestStatus, setRequestStatus] = useState(
    localStorage.getItem("master-application-issued") === "yes"
      ? REQUEST_STATUS.OK
      : REQUEST_STATUS.NOT_SENT
  );

  const { rawJWT } = useContext(AuthContext);

  const onApplyToMaster = () => {
    const requestBody = {
      requester: "did:ebsi:0x6BdE41E0608E32503C9D68E143e079208767bAc3",
      type: [
        ["VerifiableCredential", "EssifVerifiableID"],
        ["VerifiableCredential", "EuropassCredential"]
      ],
      subscriberURL: `${REACT_APP_BACKEND_INTERNAL_URL}/universities/master-vp`,
      redirectURL: `${REACT_APP_URL}/get-master`
    };

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    requestHeaders.append("Authorization", `Bearer ${rawJWT}`);

    const requestOptions = {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(requestBody)
    };

    setRequestStatus(REQUEST_STATUS.PENDING);

    fetch(
      `${REACT_APP_DIPLOMA_API_URL}/presentation/notification`,
      requestOptions
    )
      .then(function(response) {
        if (response.status !== 200) {
          return Promise.reject(
            "Looks like there was a problem. Status Code: " + response.status
          );
        }

        return response.json();
      })
      .then(function(response) {
        // TODO: Actually do something with the response, e.g. extract "callback_url" (response.callback_url)
        console.log("Response from Diploma API", response);
        localStorage.setItem("master-application-issued", "yes");
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
            {(() => {
              if (requestStatus === REQUEST_STATUS.OK) {
                return (
                  <Fragment>
                    <P>
                      Your application has been sent. Please check your{" "}
                      <a
                        href={`${REACT_APP_WALLET_URL}/notifications`}
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
                  <P className={styles.intro}>
                    This master's degree prepares students to undertake tasks of
                    responsibility in industries, the administration, or the
                    national and international academic world. The programme
                    covers many research issues regarding the design, analysis
                    and use of artificial intelligence systems. The main aim is
                    to train computer specialists in the field of intelligent
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
                  <Button
                    variant="primary"
                    onClick={onApplyToMaster}
                    disabled={requestStatus === REQUEST_STATUS.PENDING}
                  >
                    {requestStatus === REQUEST_STATUS.PENDING ? (
                      <>Sending request...</>
                    ) : (
                      <>Apply to Master's Degree</>
                    )}
                  </Button>
                  {requestStatus === REQUEST_STATUS.FAILED && (
                    <Alert variant="danger" className="mt-3">
                      Ouch! Something went wrong... Check the console to know
                      more about what happened.
                    </Alert>
                  )}
                </Fragment>
              );
            })()}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default ApplyMaster;
