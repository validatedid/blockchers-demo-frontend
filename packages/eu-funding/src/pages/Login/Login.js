import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext, LOGIN_CODES } from "../../components/Auth/Auth";
import { Button } from "../../components/Button/Button";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { P } from "../../components/Typography/Typography";
import icons from "../../assets/icons.svg";

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
      <PageHeader>Log in</PageHeader>
      <div className="ecl-container ecl-u-mt-xl">
        <P>
          During the login, we will check that you have correctly followed the
          EBSI onboarding process. If the verification fails, you will be
          redirected to the onboarding page.
        </P>
        <Button variant="primary" onClick={handleLogin}>
          Log in
        </Button>
        {errorDuringLogin === LOGIN_CODES.MALFORMED_JWT && (
          <div role="alert" className="ecl-message ecl-message--error">
            <svg
              focusable="false"
              aria-hidden="true"
              className="ecl-message__icon ecl-icon ecl-icon--l"
            >
              <use xlinkHref={`${icons}#notifications--error`}></use>
            </svg>
            <div className="ecl-message__content">
              <div className="ecl-message__title">Error during login</div>
              <p className="ecl-message__description">
                JWT is malformed, parsing failed.
              </p>
            </div>
          </div>
        )}
        {errorDuringLogin === LOGIN_CODES.MISSING_JWT && (
          <div role="alert" className="ecl-message ecl-message--error">
            <svg
              focusable="false"
              aria-hidden="true"
              className="ecl-message__icon ecl-icon ecl-icon--l"
            >
              <use xlinkHref={`${icons}#notifications--error`}></use>
            </svg>
            <div className="ecl-message__content">
              <div className="ecl-message__title">Error during login</div>
              <p className="ecl-message__description">
                JWT not available or empty. Please make sure you are
                authenticated with the wallet.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
