import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../components/Auth/Auth";

function Login() {
  const { isAuthenticated, login } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Button className="view-button" variant="info" onClick={login}>
      Login (fake)
    </Button>
  );
}

export default Login;
