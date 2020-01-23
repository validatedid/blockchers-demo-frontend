import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  H1,
  H2,
  P,
  UL,
  LI,
  styles as typographyStyles
} from "../../components/Typography/Typography";
import { AuthContext } from "../../components/Auth/Auth";
import { REACT_APP_WALLET_URL } from "../../env";

function Homepage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Fragment>
      <H1>Flemish government</H1>
      <P>
        Disclaimer: this is a demo website to show the technical capabilities of
        the EBSI project.
      </P>
      <H2>Flow: Request Diploma VA from the Flemish Gov</H2>
      <P>Prerequisites:</P>
      <UL>
        <LI>The user must have created a wallet.</LI>
        <LI>The user must be logged in the EBSI Wallet using EU Login.</LI>
        <LI>
          The user must have requested her eID VC from the Belgian Federal
          Government.
        </LI>
      </UL>
      {(() => {
        if (localStorage.getItem("bachelor-va-issued") === "yes") {
          return (
            <Fragment>
              <H2>Well done!</H2>
              <P>
                Your bachelor VA is on the way. Please check your{" "}
                <a
                  href={`${REACT_APP_WALLET_URL}/notifications`}
                  className={typographyStyles.a}
                >
                  wallet's notifications
                </a>{" "}
                or{" "}
                <Link to="/logout" className={typographyStyles.a}>
                  log out
                </Link>
                .
              </P>
            </Fragment>
          );
        }

        if (localStorage.getItem("bachelor-va-requested") === "yes") {
          return (
            <Fragment>
              <H2>Step 3: issue Bachelor Diploma Verifiable Attestation</H2>
              <P>
                The eID VC presentation request has been sent to your wallet.
              </P>
              <P>
                If you have agreed to present it, please continue to the{" "}
                <Link to="/issue-va" className={typographyStyles.a}>
                  Bachelor Diploma Issuance page
                </Link>{" "}
                or{" "}
                <Link to="/logout" className={typographyStyles.a}>
                  log out
                </Link>
                .
              </P>
            </Fragment>
          );
        }

        if (isAuthenticated) {
          return (
            <Fragment>
              <H2>Step 2: present your eID VC</H2>
              <P>
                You are now logged in. The Flemish Government can now issue your
                Bachelor Diploma Verifiable Attestation after verifying your eID
                VC.
              </P>
              <P>
                Now go to the{" "}
                <Link to="/request-va" className={typographyStyles.a}>
                  Bachelor Diploma page
                </Link>{" "}
                or{" "}
                <Link to="/logout" className={typographyStyles.a}>
                  log out
                </Link>
                .
              </P>
            </Fragment>
          );
        }

        return (
          <Fragment>
            <H2>Step 1: log in</H2>
            <P>
              To get started, please{" "}
              <Link to="/login" className={typographyStyles.a}>
                log in
              </Link>
              .
            </P>
          </Fragment>
        );
      })()}
    </Fragment>
  );
}

export default Homepage;
