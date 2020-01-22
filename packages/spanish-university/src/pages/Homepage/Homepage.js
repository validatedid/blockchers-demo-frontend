import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
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
    <>
      <H1>Spanish University</H1>
      <Container fluid>
        <P>
          Disclaimer: this is a demo website to show the technical capabilities
          of the EBSI project.
        </P>
        <H2>Flow: Apply to a Master's Programme at the Spanish University</H2>
        <P>Prerequisites:</P>
        <UL>
          <LI>The user must have created a wallet.</LI>
          <LI>The user must be logged in using EU Login.</LI>
          <LI>
            The user must have requested her eID VC from the Belgian Federal
            Government.
          </LI>
          <LI>
            The user must have request a Verifiable Attestation of her Bachelor
            Diploma from the Flemish Government
          </LI>
        </UL>
        {(() => {
          if (localStorage.getItem("master-va-issued") === "yes") {
            return (
              <Fragment>
                <H2>Well done!</H2>
                <P>
                  Your Master VA is on the way. Please check your{" "}
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

          if (localStorage.getItem("master-application-issued") === "yes") {
            return (
              <Fragment>
                <H2>Step 3: Get your Master</H2>
                <P>
                  If you have shared your eID VC and bachelor diploma, go to{" "}
                  <Link to="/get-master" className={typographyStyles.a}>
                    Master's Degree page
                  </Link>{" "}
                  to claim your Master or{" "}
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
                <H2>Step 2: Apply to Master</H2>
                <P>You are now logged in.</P>
                <P>
                  Now go to the{" "}
                  <Link to="/apply-master" className={typographyStyles.a}>
                    Master's Degree page
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
      </Container>
    </>
  );
}

export default Homepage;
