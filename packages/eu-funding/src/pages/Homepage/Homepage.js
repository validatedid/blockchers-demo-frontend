import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { H2, P, UL, LI } from "../../components/Typography/Typography";
import { AuthContext } from "../../components/Auth/Auth";

function Homepage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <PageHeader>EU Funding</PageHeader>
      <div className="ecl-container ecl-u-mt-xl">
        <P>
          Disclaimer: this is a demo website to show the technical capabilities
          of the EBSI project.
        </P>
        <H2>Flow: Request Diploma VA from the Flemish Gov</H2>
        <P>Prerequisites:</P>
        <UL>
          <LI>The user must have created a wallet.</LI>
          <LI>The user must be logged in using EU Login.</LI>
          <LI>
            The user must have requested her eID VC from the Belgian Federal
            Government.
          </LI>
        </UL>
        {!isAuthenticated ? (
          <>
            <H2>Step 1: log in</H2>
            <P>
              To get started, please{" "}
              <Link to="/login" className="ecl-link">
                log in
              </Link>
              .
            </P>
          </>
        ) : (
          <>
            <H2>Step 2: issue Bachelor Diploma Verifiable Attestation</H2>
            <P>
              You are now logged in. The Flemish Government can now issue your
              Bachelor Diploma Verifiable Attestation.
            </P>
            <P>
              Now you can{" "}
              <Link to="/apply-funding" className="ecl-link">
                apply for funding
              </Link>{" "}
              or{" "}
              <Link to="/logout" className="ecl-link">
                log out
              </Link>
              .
            </P>
          </>
        )}
      </div>
    </>
  );
}

export default Homepage;
