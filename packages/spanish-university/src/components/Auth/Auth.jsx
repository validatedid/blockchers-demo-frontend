import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = React.createContext({});

export default function Auth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("Ticket-SU") !== null
  );

  useEffect(() => {
    checkAuth();
  }, []);

  // Currently, only check if "Ticket-SU" is present in session
  const checkAuth = () =>
    setIsAuthenticated(sessionStorage.getItem("Ticket-SU") !== null);

  const login = () => {
    sessionStorage.setItem("Ticket-SU", "fake-ticket");
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("Ticket-SU");
    sessionStorage.removeItem("master-application-issued");
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
