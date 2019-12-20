import React, { useState, Fragment } from "react";
import { Button } from "react-bootstrap";
import {
  H1,
  P,
  styles as typographyStyles
} from "../../components/Typography/Typography";

const API_URL = process.env.REACT_APP_WALLET_URL || "http://localhost:3002";

function RequestVC() {
  const [requestIssued, setIsRequestIssued] = useState(
    sessionStorage.getItem("VC-issued") === "yes"
  );

  if (requestIssued) {
    return (
      <Fragment>
        <H1>Request eID VC</H1>
        <P>
          Your request has been issued. Please check your{" "}
          <a href={`${API_URL}/notifications`} className={typographyStyles.a}>
            wallet's notifications
          </a>
          .
        </P>
      </Fragment>
    );
  }

  const onRequestVC = () => {
    sessionStorage.setItem("VC-issued", "yes");
    setIsRequestIssued(true);
  };

  return (
    <Fragment>
      <H1>Request eID VC</H1>
      <P>TODO: add form requesting personal information</P>
      <Button variant="primary" onClick={onRequestVC}>
        Collect the eID VC with your SSI App
      </Button>
    </Fragment>
  );
}

export default RequestVC;
