import React, { useState, useContext, Fragment } from "react";
import { Alert } from "react-bootstrap";
import { AuthContext } from "../../components/Auth/Auth";
import { Button } from "../../components/Button/Button";
import {
  H1,
  H2,
  P,
  styles as typographyStyles
} from "../../components/Typography/Typography";
import {
  REACT_APP_WALLET_URL,
  REACT_APP_BACKEND_EXTERNAL_URL
} from "../../env";

const REQUEST_STATUS = {
  NOT_SENT: "",
  PENDING: "pending",
  OK: "ok",
  FAILED: "failed"
};

function IssueVA() {
  const [requestStatus, setRequestStatus] = useState(
    localStorage.getItem("bachelor-va-issued") === "yes"
      ? REQUEST_STATUS.OK
      : REQUEST_STATUS.NOT_SENT
  );

  const { rawJWT, JWT } = useContext(AuthContext);

  if (requestStatus === REQUEST_STATUS.OK) {
    return (
      <Fragment>
        <H1>Bachelor Diploma</H1>
        <P>
          Your bachelor VA is on the way. Please check your{" "}
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

  const onIssueVA = () => {
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

    fetch(
      `${REACT_APP_BACKEND_EXTERNAL_URL}/universities/bachelors`,
      requestOptions
    )
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
        localStorage.setItem("bachelor-va-issued", "yes");
        setRequestStatus(REQUEST_STATUS.OK);
      })
      .catch(function(error) {
        console.error("Error from Diploma API", error);
        setRequestStatus(REQUEST_STATUS.FAILED);
      });
  };

  return (
    <Fragment>
      <H1>Bachelor Diploma</H1>
      <P>Congratulations, your Bachelor Diploma is now available!</P>
      <H2>Issue Bachelor Diploma Verifiable Attestation</H2>
      <P>
        Your eID VC has been verified. Click on the button below to get your
        Bachelor VA.
      </P>
      <Button
        variant="primary"
        onClick={onIssueVA}
        disabled={requestStatus === REQUEST_STATUS.PENDING}
      >
        {requestStatus === REQUEST_STATUS.PENDING ? (
          <>Sending request...</>
        ) : (
          <>Issue Bachelor Diploma Verifiable Attestation</>
        )}
      </Button>
      {requestStatus === REQUEST_STATUS.FAILED && (
        <Alert variant="danger" className="mt-3">
          Ouch! Something went wrong... Check the console to know more about
          what happened.
        </Alert>
      )}
    </Fragment>
  );
}

export default IssueVA;
