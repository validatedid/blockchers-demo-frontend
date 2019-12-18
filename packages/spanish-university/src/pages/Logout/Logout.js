import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../components/Auth/Auth";
import { Button } from "../../components/Button/Button";
import { H1, P } from "../../components/Typography/Typography";

function Logout() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <H1>Log out</H1>
      <Container fluid>
        <P>
          You are about to log out from the *fake* authentication system of the
          Belgian Federal Government.
        </P>
        <Button variant="primary" onClick={logout}>
          Log out
        </Button>
      </Container>
    </>
  );
}

export default Logout;
