import React, { Component } from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Main from "../components/Main/Main";
import Login from "../components/Login/Login";
import { Col, Container, Row } from "react-bootstrap";

const basename = new URL(process.env.PUBLIC_URL).pathname;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <BrowserRouter basename={basename}>
                <Switch>
                  <Route exact path="/" component={Login} />
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
