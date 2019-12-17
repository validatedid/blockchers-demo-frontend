import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../components/Auth/Auth";
import { Button } from "../../components/Button/Button";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { P } from "../../components/Typography/Typography";

function Logout() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <PageHeader>Log out</PageHeader>
      <div className="ecl-container ecl-u-mt-xl">
        <P>
          You are about to log out from the *fake* authentication system of the
          Belgian Federal Government.
        </P>
        <Button variant="primary" onClick={logout}>
          Log out
        </Button>
      </div>
    </>
  );
}

export default Logout;
