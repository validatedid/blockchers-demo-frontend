import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../components/Auth/Auth";
import { Button } from "../../components/Button/Button";
import { H1, P } from "../../components/Typography/Typography";

function Login() {
  const { isAuthenticated, login } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <H1>Log in</H1>
      <Container fluid>
        <P>
          During the login, we will check that you have correctly followed the
          EBSI onboarding process. If the verification fails, you will be
          redirected to the onboarding page.
        </P>
        <Button variant="primary" onClick={login}>
          Log in
        </Button>
      </Container>
    </>
  );
}

export default Login;
