import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = React.createContext({});

export default function Auth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("Ticket-BE") !== null
  );

  useEffect(() => {
    checkAuth();
  }, []);

  // Currently, only check if "Ticket-BE" is present in session
  const checkAuth = () =>
    setIsAuthenticated(sessionStorage.getItem("Ticket-BE") !== null);

  const login = () => {
    sessionStorage.setItem("Ticket-BE", "fake-ticket");
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("Ticket-BE");
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
