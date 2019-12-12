import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import { Header } from "../components/Header/Header";
import { Page } from "../components/Page/Page";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Auth from "../components/Auth/Auth";
import RequestVC from "./RequestVC/RequestVC";
import Homepage from "./Homepage/Homepage";
import NoMatch from "./NoMatch/NoMatch";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";

const publicUrl = process.env.PUBLIC_URL;
const basename = publicUrl ? new URL(publicUrl).pathname : "";

function App() {
  return (
    <Layout>
      <Auth>
        <BrowserRouter basename={basename}>
          <Header />
          <Page>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <PrivateRoute exact path="/request-vc" component={RequestVC} />
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
