import React, { useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = React.createContext({});

export const LOGIN_CODES = {
  SUCCESS: 0,
  MISSING_JWT: 1,
  MALFORMED_JWT: 2,
  MISSING_PROPS_JWT: 3,
  EXPIRED_JWT: 4,
  MISSING_BE_TICKET: 5
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

function isTokenExpired(payload) {
  if (!payload || !payload.exp) return true;
  return +payload.exp * 1000 < Date.now();
}

function isTokenMissingProperties(payload) {
  if (!payload) return true;

  const properties = ["sub", "iat", "exp", "aud", "did", "userName"];
  const isMissing = prop => !payload[prop];
  return properties.some(isMissing);
}

export default function Auth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [JWT, setJWT] = useState({});
  const [rawJWT, setRawJWT] = useState("");

  // Check if "Ticket-FL" and JWT are present in session
  const checkAuth = () => {
    const hasJwt = !!localStorage.getItem("Jwt");
    if (!hasJwt) {
      setIsAuthenticated(false);
      return LOGIN_CODES.MISSING_JWT;
    }

    const hasFLTicket = localStorage.getItem("Ticket-FL") === "fake-ticket";
    if (!hasFLTicket) {
      setIsAuthenticated(false);
      return LOGIN_CODES.MISSING_FL_TICKET;
    }

    try {
      const payload = parseJwt(localStorage.getItem("Jwt"));
      if (isTokenMissingProperties(payload)) {
        setIsAuthenticated(false);
        return LOGIN_CODES.MISSING_PROPS_JWT;
      }

      if (isTokenExpired(payload)) {
        setIsAuthenticated(false);
        return LOGIN_CODES.EXPIRED_JWT;
      }

      setJWT(payload);
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
    localStorage.setItem("Ticket-FL", "fake-ticket");
    return checkAuth();
  };

  const logout = () => {
    // Remove only FL Gov related items
    localStorage.removeItem("Ticket-FL");
    localStorage.removeItem("bachelor-va-requested");
    localStorage.removeItem("bachelor-va-issued");
    setIsAuthenticated(false);
  };

  useLayoutEffect(() => {
    checkAuth();
  }, []);

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
