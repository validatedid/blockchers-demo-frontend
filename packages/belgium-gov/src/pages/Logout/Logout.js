import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../components/Auth/Auth";
import { H1, P } from "../../components/Typography/Typography";

function Logout() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <H1>Log out</H1>
      <P>
        You are about to log out from the *fake* authentication system of the
        Belgian Federal Government.
      </P>
      <Button variant="primary" onClick={logout}>
        Log out
      </Button>
    </>
  );

  return <Redirect to="/" />;
}

export default Logout;
