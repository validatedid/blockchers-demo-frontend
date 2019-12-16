import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = React.createContext({});

export default function Auth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("Ticket-FL") !== null
  );

  useEffect(() => {
    checkAuth();
  }, []);

  // Currently, only check if "Ticket-FL" is present in session
  const checkAuth = () =>
    setIsAuthenticated(sessionStorage.getItem("Ticket-FL") !== null);

  const login = () => {
    sessionStorage.setItem("Ticket-FL", "fake-ticket");
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("Ticket-FL");
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
