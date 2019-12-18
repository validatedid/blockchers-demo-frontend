import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../components/Auth/Auth";
import { Button } from "../../components/Button/Button";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { P } from "../../components/Typography/Typography";

function Login(props) {
  const { isAuthenticated, login } = useContext(AuthContext);

  if (isAuthenticated) {
    if (props.location && props.location.state && props.location.state.from) {
      return <Redirect to={props.location.state.from} />;
    }

    return <Redirect to="/" />;
  }

  return (
    <>
      <PageHeader>Log in</PageHeader>
      <div className="ecl-container ecl-u-mt-xl">
        <P>
          During the login, we will check that you have correctly followed the
          EBSI onboarding process. If the verification fails, you will be
          redirected to the onboarding page.
        </P>
        <Button variant="primary" onClick={login}>
          Log in
        </Button>
      </div>
    </>
  );
}

export default Login;
