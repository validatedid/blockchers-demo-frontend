import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = React.createContext({});

export const LOGIN_CODES = {
  SUCCESS: 0,
  MISSING_JWT: 1,
  MALFORMED_JWT: 2,
  MISSING_SU_TICKET: 3
};

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
    localStorage.getItem("Ticket-SU") !== null
  );
  const [JWT, setJWT] = useState({});
  const [rawJWT, setRawJWT] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  // Check if "Ticket-SU" and JWT are present in session
  const checkAuth = () => {
    const hasJwt = !!localStorage.getItem("Jwt");
    if (!hasJwt) {
      setIsAuthenticated(false);
      return LOGIN_CODES.MISSING_JWT;
    }

    const hasFLTicket = localStorage.getItem("Ticket-SU") === "fake-ticket";
    if (!hasFLTicket) {
      setIsAuthenticated(false);
      return LOGIN_CODES.MISSING_SU_TICKET;
    }

    try {
      setJWT(parseJwt(localStorage.getItem("Jwt")));
      setRawJWT(localStorage.getItem("Jwt"));
    } catch (e) {
      // Unable to parse JWT (malformed)
      setIsAuthenticated(false);
      return LOGIN_CODES.MALFORMED_JWT;
    }

    setIsAuthenticated(true);
    return LOGIN_CODES.SUCCESS;
  };

  const login = () => {
    localStorage.setItem("Ticket-SU", "fake-ticket");
    return checkAuth();
  };

  const logout = () => {
    // Remove only SU related items
    localStorage.removeItem("Ticket-SU");
    localStorage.removeItem("master-application-issued");
    localStorage.removeItem("master-va-issued");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, JWT, rawJWT, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

Auth.propTypes = {
  children: PropTypes.node
};
