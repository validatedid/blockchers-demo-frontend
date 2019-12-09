import React, { Component } from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Main from "../components/Main/Main";
import Login from "../components/Login/Login";
import { Col, Container, Row } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/" component={Login} />
                </Switch>
                <Switch>
                  <Route exact path="/profile" component={Main} />
                </Switch>
              </BrowserRouter>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
