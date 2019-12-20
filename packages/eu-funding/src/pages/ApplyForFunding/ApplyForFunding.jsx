import React, { useState, Fragment } from "react";
import { Button } from "../../components/Button/Button";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { P } from "../../components/Typography/Typography";

const API_URL = process.env.REACT_APP_WALLET_URL || "http://localhost:3002";

function ApplyForFunding() {
  const [applicationSent, setIsApplicationSent] = useState(
    sessionStorage.getItem("eu-funding-application-sent") === "yes"
  );

  if (applicationSent) {
    return (
      <Fragment>
        <PageHeader>Apply for funding</PageHeader>
        <div className="ecl-container ecl-u-mt-xl">
          <P>
            Your application has been sent. Please check your{" "}
            <a href={`${API_URL}/notifications`} className="ecl-link">
              wallet's notifications
            </a>
            .
          </P>
        </div>
      </Fragment>
    );
  }

  const onSendApplication = () => {
    sessionStorage.setItem("eu-funding-application-sent", "yes");
    setIsApplicationSent(true);
  };

  return (
    <Fragment>
      <PageHeader>Apply for funding</PageHeader>
      <div className="ecl-container ecl-u-mt-xl">
        <P>TODO: ask to notarize some documents before applying</P>
        <Button variant="primary" onClick={onSendApplication}>
          Apply
        </Button>
      </div>
    </Fragment>
  );
}

export default ApplyForFunding;
