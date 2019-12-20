import React, { useState, Fragment } from "react";
import { Button } from "../../components/Button/Button";
import {
  H1,
  H2,
  P,
  styles as typographyStyles
} from "../../components/Typography/Typography";

const API_URL = process.env.REACT_APP_WALLET_URL || "http://localhost:3002";

function RequestVA() {
  const [requestIssued, setIsRequestIssued] = useState(
    sessionStorage.getItem("bachelor-va-issued") === "yes"
  );

  if (requestIssued) {
    return (
      <Fragment>
        <H1>Bachelor Diploma</H1>
        <P>
          Your attestation has been issued. Please check your{" "}
          <a href={`${API_URL}/notifications`} className={typographyStyles.a}>
            wallet's notifications
          </a>
          .
        </P>
      </Fragment>
    );
  }

  const onRequestVA = () => {
    sessionStorage.setItem("bachelor-va-issued", "yes");
    setIsRequestIssued(true);
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
      <Button variant="primary" onClick={onRequestVA}>
        Issue Bachelor Diploma Verifiable Attestation
      </Button>
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
