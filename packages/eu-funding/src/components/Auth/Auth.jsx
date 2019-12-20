import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = React.createContext({});

export default function Auth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("Ticket-EU") !== null
  );

  useEffect(() => {
    checkAuth();
  }, []);

  // Currently, only check if "Ticket-EU" is present in session
  const checkAuth = () =>
    setIsAuthenticated(sessionStorage.getItem("Ticket-EU") !== null);

  const login = () => {
    sessionStorage.setItem("Ticket-EU", "fake-ticket");
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("Ticket-EU");
    sessionStorage.removeItem("eu-funding-application-sent");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

Auth.propTypes = {
  children: PropTypes.node
};
