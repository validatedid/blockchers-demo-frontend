import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import { Page } from "../components/Page/Page";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Auth from "../components/Auth/Auth";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Homepage from "./Homepage/Homepage";
import NoMatch from "./NoMatch/NoMatch";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";
import RequestVA from "./RequestVA/RequestVA";

const publicUrl = process.env.PUBLIC_URL;
const basename = publicUrl ? new URL(publicUrl).pathname : "";

function App() {
  return (
    <Auth>
      <BrowserRouter basename={basename}>
        <ScrollToTop />
        <Layout>
          <Page>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <PrivateRoute exact path="/request-va" component={RequestVA} />
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </Page>
        </Layout>
      </BrowserRouter>
    </Auth>
  );
}

/*
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

*/
export default App;
