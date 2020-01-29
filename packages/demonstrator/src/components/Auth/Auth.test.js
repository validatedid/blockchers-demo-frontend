import React from "react";
import ReactDOM from "react-dom";
import Auth, { AuthContext, LOGIN_CODES } from "./Auth";
import { JWT, JWK } from "jose";

const key = JWK.asKey({
  kty: "oct",
  k: "hJtXIZ2uSN5kbQfbtTNWbpdmhkV8FJG-Onbc6mxCcYg"
});

beforeEach(() => {
  localStorage.clear();
});

// Dummy test component
function AuthTest() {
  const { isAuthenticated, checkAuth } = React.useContext(AuthContext);

  if (isAuthenticated) {
    return "Already authenticated";
  }

  const loginCode = checkAuth();
  return `Trying to log in. isAuthenticated: ${isAuthenticated} (code: ${loginCode})!`;
}

const createTestElement = () => {
  const el = document.createElement("div");
  ReactDOM.render(
    <Auth>
      <AuthTest />
    </Auth>,
    el
  );
  return el;
};

it("is not authenticated by default", () => {
  const el = createTestElement();
  expect(el.innerHTML).toBe(
    `Trying to log in. isAuthenticated: false (code: ${LOGIN_CODES.MISSING_JWT})!`
  );
});

it("is not authenticated with a malformed JWT", () => {
  localStorage.setItem("Jwt", "123");
  const el = createTestElement();
  expect(el.innerHTML).toBe(
    `Trying to log in. isAuthenticated: false (code: ${LOGIN_CODES.MALFORMED_JWT})!`
  );
});

it("is not authenticated when JWT is missing some properties", () => {
  const payload = {
    did: "did:ebsi:0x1234"
    // userName is missing
  };

  const token = JWT.sign(payload, key, {
    audience: "ebsi-wallet",
    expiresIn: "2 hours",
    header: {
      typ: "JWT"
    },
    subject: "test"
  });

  localStorage.setItem("Jwt", token);
  const el = createTestElement();
  expect(el.innerHTML).toBe(
    `Trying to log in. isAuthenticated: false (code: ${LOGIN_CODES.MISSING_PROPS_JWT})!`
  );
});

it("is not authenticated when JWT is expired", () => {
  const payload = {
    did: "did:ebsi:0x1234",
    userName: "test"
  };

  const token = JWT.sign(payload, key, {
    audience: "ebsi-wallet",
    expiresIn: "2 hours",
    header: {
      typ: "JWT"
    },
    subject: "test",
    now: new Date("December 17, 1995 03:24:00")
  });

  localStorage.setItem("Jwt", token);
  const el = createTestElement();
  expect(el.innerHTML).toBe(
    `Trying to log in. isAuthenticated: false (code: ${LOGIN_CODES.EXPIRED_JWT})!`
  );
});

it("is authenticated with a valid JWT", () => {
  const payload = {
    did: "did:ebsi:0x1234",
    userName: "test"
  };

  const token = JWT.sign(payload, key, {
    audience: "ebsi-wallet",
    expiresIn: "2 hours",
    header: {
      typ: "JWT"
    },
    subject: "test"
  });

  localStorage.setItem("Jwt", token);
  const el = createTestElement();
  expect(el.innerHTML).toBe("Already authenticated");
});
