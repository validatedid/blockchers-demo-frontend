import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
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
    <div className={styles.App}>
      <H1>Belgian Federal Government</H1>
      <P>
        Disclaimer: this is a demo website to show the technical capabilities of
        the EBSI project.
      </P>
      <H2>Flow: Request eID VC</H2>
      <P>Prerequisites:</P>
      <UL>
        <LI>The user must have created a wallet</LI>
        <LI>The user must be logged in using EU Login</LI>
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
          <H2>Step 2: collect eID VC</H2>
          <P>
            You are now logged in. The Belgian Federal Government can now create
            your eID VC and use eIDAS Bridge to eSeal it.
          </P>
          <P>
            Now go to the{" "}
            <Link to="/request-vc" className={typographyStyles.a}>
              eID VC request page
            </Link>
            .
          </P>
        </>
      )}
    </div>
  );
}

export default Homepage;
