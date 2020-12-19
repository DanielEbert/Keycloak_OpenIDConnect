import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

import Root from "./components/Root";
import Nav from "./components/Nav";

/**
 * Functional Component App.
 * Contains the router and thus defines the routes of the service.
 */
function App() {
  /**
   * useKeycloak() is from the ReactKeycloakProvider in './index.js'.
   * The 'keycloak' class contains functions to e.g. initiate the
   * Authorization code flow (login()) and variables such as
   * 'keycloak.authenticated'.
   */
  const { keycloak } = useKeycloak();

  return (
    <Router>
      <React.Fragment>
        {/*The Nav component renders the upper Navigation Header.
           Its source code is explained in './components/Nav.js'.
           'authorized' is passed to the Nav component and is True if a user
           has authorized and False otherwise.*/}
        <Nav authorized={keycloak.authenticated} />
        <Switch>
          {/*Renders the Root component, which is explained in the file 
             './components/Root.js'*/}
          <Route path="/" component={() => <Root />} />
          {/*Redirect all requests to the root ('/') Path*/}
          <Route
            component={({ history }) => {
              history.push("/");
              return "";
            }}
          />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
