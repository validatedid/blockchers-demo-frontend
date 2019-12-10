import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../components/Auth/Auth";

function Logout() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  if (isAuthenticated) {
    logout();
  }

  return <Redirect to="/" />;
}

export default Logout;
