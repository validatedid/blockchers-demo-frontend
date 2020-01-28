import React from "react";
import ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer"; // ES6
import { JWT, JWK } from "jose";
import Auth from "../../components/Auth/Auth";
import Main from "./Main";

const key = JWK.asKey({
  kty: "oct",
  k: "hJtXIZ2uSN5kbQfbtTNWbpdmhkV8FJG-Onbc6mxCcYg"
});

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

beforeEach(() => {
  localStorage.clear();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Auth>
      <Main />
    </Auth>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly without JWT", () => {
  const component = TestRenderer.create(
    <Auth>
      <Main />
    </Auth>
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

it("renders correctly with JWT", () => {
  localStorage.setItem("Jwt", token);
  const component = TestRenderer.create(
    <Auth>
      <Main />
    </Auth>
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

it("renders correctly with JWT and eID VC issued", () => {
  localStorage.setItem("Jwt", token);
  localStorage.setItem("VC-issued", "yes");
  const component = TestRenderer.create(
    <Auth>
      <Main />
    </Auth>
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

it("renders correctly with JWT, eID VC and bachelor VA", () => {
  localStorage.setItem("Jwt", token);
  localStorage.setItem("VC-issued", "yes");
  localStorage.setItem("bachelor-va-issued", "yes");
  const component = TestRenderer.create(
    <Auth>
      <Main />
    </Auth>
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

it("renders correctly with JWT, eID VC, bachelor VA and Master VA", () => {
  localStorage.setItem("Jwt", token);
  localStorage.setItem("VC-issued", "yes");
  localStorage.setItem("bachelor-va-issued", "yes");
  localStorage.setItem("master-va-issued", "yes");
  const component = TestRenderer.create(
    <Auth>
      <Main />
    </Auth>
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
