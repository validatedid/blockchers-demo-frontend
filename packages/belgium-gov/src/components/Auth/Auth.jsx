import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = React.createContext({});

export const LOGIN_CODES = {
  SUCCESS: 0,
  MISSING_JWT: 1,
  MALFORMED_JWT: 2,
  MISSING_BE_TICKET: 3
};
//
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

export default function Auth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("Ticket-BE") !== null
  );
  const [JWT, setJWT] = useState({});

  useEffect(() => {
    checkAuth();
  }, []);

  // Check if "Ticket-BE" and JWT are present in session
  const checkAuth = () => {
    const hasJwt = !!localStorage.getItem("Jwt");
    if (!hasJwt) {
      setIsAuthenticated(false);
      return LOGIN_CODES.MISSING_JWT;
    }

    const hasBETicket = localStorage.getItem("Ticket-BE") === "fake-ticket";
    if (!hasBETicket) {
      setIsAuthenticated(false);
      return LOGIN_CODES.MISSING_BE_TICKET;
    }

    try {
      setJWT(parseJwt(localStorage.getItem("Jwt")));
    } catch (e) {
      // Unable to parse JWT (malformed)
      setIsAuthenticated(false);
      return LOGIN_CODES.MALFORMED_JWT;
    }

    setIsAuthenticated(true);
    return LOGIN_CODES.SUCCESS;
  };

  const login = () => {
    localStorage.setItem("Ticket-BE", "fake-ticket");
    return checkAuth();
  };

  const logout = () => {
    // Remove only BE Gov related items
    localStorage.removeItem("Ticket-BE");
    localStorage.removeItem("VC-issued");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, JWT, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

Auth.propTypes = {
  children: PropTypes.node
};
