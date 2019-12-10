import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import { Header } from "../components/Header/Header";
import { Page } from "../components/Page/Page";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Auth from "../components/Auth/Auth";
import Main from "./Main/Main";
import Homepage from "./Homepage/Homepage";
import NoMatch from "./NoMatch/NoMatch";
import Connect from "./Connect/Connect";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";

function App() {
  return (
    <Layout>
      <Auth>
        <BrowserRouter>
          <Header />
          <Page>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <PrivateRoute exact path="/connect" component={Connect} />
              <PrivateRoute exact path="/profile" component={Main} />
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </Page>
        </BrowserRouter>
      </Auth>
    </Layout>
  );
}

export default App;
