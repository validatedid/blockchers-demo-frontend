import React from "react";
import ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer"; // ES6
import App from "./App";

beforeEach(() => {
  localStorage.clear();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly without JWT", () => {
  const component = TestRenderer.create(<App />);
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

it("renders correctly with JWT", () => {
  localStorage.setItem("Jwt", "123");
  const component = TestRenderer.create(<App />);
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

it("renders correctly with JWT and eID VC issued", () => {
  localStorage.setItem("Jwt", "123");
  localStorage.setItem("VC-issued", "yes");
  const component = TestRenderer.create(<App />);
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

it("renders correctly with JWT, eID VC and bachelor VA", () => {
  localStorage.setItem("Jwt", "123");
  localStorage.setItem("VC-issued", "yes");
  localStorage.setItem("bachelor-va-issued", "yes");
  const component = TestRenderer.create(<App />);
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

it("renders correctly with JWT, eID VC, bachelor VA and Master VA", () => {
  localStorage.setItem("Jwt", "123");
  localStorage.setItem("VC-issued", "yes");
  localStorage.setItem("bachelor-va-issued", "yes");
  localStorage.setItem("master-va-issued", "yes");
  const component = TestRenderer.create(<App />);
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
