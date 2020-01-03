import React, { useContext, useState } from "react";
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
    <>
      <H1>Log in</H1>
      <P>
        During the login, we will check that you have correctly followed the
        EBSI onboarding process. If the verification fails, you will be
        redirected to the onboarding page.
      </P>
      <Button variant="primary" onClick={handleLogin}>
        Log in
      </Button>
      {errorDuringLogin === LOGIN_CODES.MALFORMED_JWT && (
        <div className="invalid-feedback" style={{ display: "block" }}>
          Error during login: JWT is malformed, parsing failed.
        </div>
      )}
      {errorDuringLogin === LOGIN_CODES.MISSING_JWT && (
        <div className="invalid-feedback" style={{ display: "block" }}>
          Error during login: JWT not available or empty. Please make sure you
          are authenticated with the wallet.
        </div>
      )}
    </>
  );
}

export default Login;
