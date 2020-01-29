import React, { Fragment, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext, LOGIN_CODES } from "../../components/Auth/Auth";
import { Button } from "../../components/Button/Button";
import { H1, P } from "../../components/Typography/Typography";

function Login(props) {
  const { isAuthenticated, login } = useContext(AuthContext);
  const [errorDuringLogin, setErrorDuringLogin] = useState(LOGIN_CODES.SUCCESS);

  if (isAuthenticated) {
    if (props.location && props.location.state && props.location.state.from) {
      return <Redirect to={props.location.state.from} />;
    }

    return <Redirect to="/" />;
  }

  function handleLogin() {
    const loginCode = login();
    if (loginCode !== LOGIN_CODES.SUCCESS) {
      setErrorDuringLogin(loginCode);
    }
  }

  return (
    <Fragment>
      <H1>Log in</H1>
      <P>
        This page acts as a demonstrator to simulate the Belgium Flemish
        Government entity issuing Diploma. During the login simulation, we will
        check that you have correctly followed the EBSI onboarding process. If
        the verification fails, you will be redirected to the onboarding page.
      </P>
      <Button variant="primary" onClick={handleLogin}>
        Log in
      </Button>
      {(() => {
        if (errorDuringLogin === LOGIN_CODES.MALFORMED_JWT) {
          return (
            <div className="invalid-feedback" style={{ display: "block" }}>
              Error during login: JWT is malformed, parsing failed.
            </div>
          );
        } else if (errorDuringLogin === LOGIN_CODES.MISSING_JWT) {
          return (
            <div className="invalid-feedback" style={{ display: "block" }}>
              Error during login: JWT not available or empty. Please make sure
              you are authenticated with the wallet.
            </div>
          );
        } else if (errorDuringLogin === LOGIN_CODES.MISSING_PROPS_JWT) {
          return (
            <div className="invalid-feedback" style={{ display: "block" }}>
              Error during login: your JWT is missing some essential properties.
              Please try to log in again in the wallet.
            </div>
          );
        } else if (errorDuringLogin === LOGIN_CODES.EXPIRED_JWT) {
          return (
            <div className="invalid-feedback" style={{ display: "block" }}>
              Error during login: your JWT has expired. Please log in again in
              the wallet.
            </div>
          );
        }
      })()}
    </Fragment>
  );
}

export default Login;
