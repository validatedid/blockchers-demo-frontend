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

const REQUEST_STATUS = {
  NOT_SENT: "",
  PENDING: "pending",
  OK: "ok",
  FAILED: "failed"
};

const API_URL = process.env.REACT_APP_WALLET_URL || "http://localhost:3002";
const DIPLOMA_API_URL =
  process.env.REACT_APP_DIPLOMA_API_URL || "http://localhost:3007";

function RequestVA() {
  const [requestStatus, setRequestStatus] = useState(
    localStorage.getItem("bachelor-va-issued") === "yes"
      ? REQUEST_STATUS.OK
      : REQUEST_STATUS.NOT_SENT
  );

  const { rawJWT } = useContext(AuthContext);

  if (requestStatus === REQUEST_STATUS.OK) {
    return (
      <Fragment>
        <H1>Bachelor Diploma</H1>
        <P>
          A request to present your eID VC has been sent. Please check your{" "}
          <a href={`${API_URL}/notifications`} className={typographyStyles.a}>
            wallet's notifications
          </a>{" "}
          and approve the request, so that the Flemish Government can verify
          your identity and send you your Diploma VA.
        </P>
      </Fragment>
    );
  }

  const onRequestVA = () => {
    const requestBody = {
      requester: "did:ebsi:0xc9A8940Ab318d4d4631a86DcF9E0b9A3594214E5",
      type: [["VerifiableCredential", "EssifVerifiableID"]],
      subscriberURL: "https://app.ebsi.xyz/university/receive-presentation"
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

    fetch(`${DIPLOMA_API_URL}/presentation/notification`, requestOptions)
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
        When you click on the button below, the Flemish Government generates a
        request for your eID VC. You will be redirected to your wallet where you
        will be asked to share your eID VC with the Flemish Government.
      </P>
      <Button
        variant="primary"
        onClick={onRequestVA}
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
      <P>
        If you agree to share your eID VC and if it passes the validation
        process, the Flemish Government will create your Bachelor Diploma VA. It
        uses the eIDAS Bridge to eSeal it. When it's ready, you will receive a
        notification in your wallet.
      </P>
    </Fragment>
  );
}

export default RequestVA;
