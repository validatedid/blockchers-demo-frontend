import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = React.createContext({});

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
    sessionStorage.getItem("Ticket-BE") !== null
  );
  const [JWT, setJWT] = useState({});

  useEffect(() => {
    checkAuth();
  }, []);

  // Check if "Ticket-BE" and JWT are present in session
  const checkAuth = () => {
    const hasJwt = !!localStorage.getItem("Jwt");
    const hasBETicket = sessionStorage.getItem("Ticket-BE") === "fake-ticket";
    let canAuthenticate = hasBETicket && hasJwt;

    if (hasJwt) {
      try {
        setJWT(parseJwt(localStorage.getItem("Jwt")));
      } catch (e) {
        // Unable to parse JWT (malformed)
        canAuthenticate = false;
      }
    }

    setIsAuthenticated(canAuthenticate);

    return canAuthenticate;
  };

  const login = () => {
    sessionStorage.setItem("Ticket-BE", "fake-ticket");
    return checkAuth();
  };

  const logout = () => {
    // Remove only BE Gov related items
    sessionStorage.removeItem("Ticket-BE");
    sessionStorage.removeItem("VC-issued");
    checkAuth();
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
