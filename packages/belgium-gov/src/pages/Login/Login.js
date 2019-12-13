import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../components/Auth/Auth";
import { H1, P } from "../../components/Typography/Typography";

function Login() {
  const { isAuthenticated, login } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <H1>Log in</H1>
      <P>
        This pages acts as a demonstrator to simulate the Trusted Identity
        Provider. During the login, we will check that you have correctly
        followed the EBSI onboarding process. If the verification fails, you
        will be redirected to the onboarding page.
      </P>
      <Button variant="primary" onClick={login}>
        Log in
      </Button>
    </>
  );
}

export default Login;
