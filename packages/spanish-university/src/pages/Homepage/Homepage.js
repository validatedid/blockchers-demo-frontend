import React, { useContext } from "react";
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
        {!isAuthenticated ? (
          <>
            <H2>Step 1: log in</H2>
            <P>
              To get started, please{" "}
              <Link to="/login" className={typographyStyles.a}>
                log in
              </Link>
              .
            </P>
          </>
        ) : (
          <>
            <H2>Step 2: Apply to Master</H2>
            <P>You are now logged in.</P>
            <P>
              Now go to the{" "}
              <Link to="/master" className={typographyStyles.a}>
                Master's Degree page
              </Link>{" "}
              or{" "}
              <Link to="/logout" className={typographyStyles.a}>
                log out
              </Link>
              .
            </P>
          </>
        )}
      </Container>
    </>
  );
}

export default Homepage;
