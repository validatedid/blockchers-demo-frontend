import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../components/Auth/Auth";
import { H1, P } from "../../components/Typography/Typography";

function Login(props) {
  const { isAuthenticated, login } = useContext(AuthContext);

  const [errorDuringLogin, setErrorDuringLogin] = useState(false);

  if (isAuthenticated) {
    if (props.location && props.location.state && props.location.state.from) {
      return <Redirect to={props.location.state.from} />;
    }

    return <Redirect to="/" />;
  }

  function handleLogin() {
    if (!login()) {
      setErrorDuringLogin(true);
    }
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
      <Button variant="primary" onClick={handleLogin}>
        Log in
      </Button>
      {errorDuringLogin && (
        <div className="invalid-feedback" style={{ display: "block" }}>
          Error during login:{" "}
          {!localStorage.getItem("Jwt") &&
            "JWT not available. Please make sure you are authenticated with the wallet."}
          {!!localStorage.getItem("Jwt") && "JWT is malformed, parsing failed."}
        </div>
      )}
    </>
  );
}

export default Login;
