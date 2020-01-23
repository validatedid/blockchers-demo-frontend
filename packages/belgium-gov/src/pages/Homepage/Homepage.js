import React, { Fragment, useContext } from "react";
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
      <H1>Belgian Federal Government</H1>
      <P>
        Disclaimer: this is a demo website to show the technical capabilities of
        the EBSI project.
      </P>
      <H2>Flow: Request eID VC</H2>
      <P>Prerequisites:</P>
      <UL>
        <LI>The user must have created a wallet.</LI>
        <LI>The user must be logged in the EBSI Wallet using EU Login.</LI>
      </UL>
      {!isAuthenticated ? (
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
      ) : (
        <Fragment>
          {localStorage.getItem("VC-issued") !== "yes" ? (
            <Fragment>
              <H2>Step 2: collect eID VC</H2>
              <P>
                You are now logged in. The Belgian Federal Government can now
                create your eID VC and use eIDAS Bridge to eSeal it.
              </P>
              <P>
                Now go to the{" "}
                <Link to="/request-vc" className={typographyStyles.a}>
                  eID VC request page
                </Link>{" "}
                or{" "}
                <Link to="/logout" className={typographyStyles.a}>
                  log out
                </Link>
                .
              </P>
            </Fragment>
          ) : (
            <Fragment>
              <H2>Step 3: check your notifications in your wallet</H2>
              <P>
                Your request has been issued. Please check your{" "}
                <a
                  href={`${REACT_APP_WALLET_URL}/notifications`}
                  className={typographyStyles.a}
                >
                  wallet's notifications
                </a>
                . You can also{" "}
                <Link to="/logout" className={typographyStyles.a}>
                  log out
                </Link>{" "}
                to start again.
              </P>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Homepage;
