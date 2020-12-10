import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ReactKeycloakProvider } from "@react-keycloak/web";
import Keycloak from "keycloak-js";

/**
 * Defines Keycloak Server and Client Configuration via the Keycloak instance
 */
const keycloak = Keycloak({
  url: "http://localhost:8080/auth",
  realm: "Test",
  clientId: "frontend1",
});

/**
 * Render a React element into the DOM.
 */
ReactDOM.render(
  <React.StrictMode>
    {/*ReactKeycloakProvider is from the Keycloak Adapter.
       ReactKeycloakProvider enables the use of the useKeycloak() function
       in the App component and components used in App. 
       useKeycloak() is used in multiple locations such as in the './App.js' file.
       useKeycloak is also explained in './App.js'.*/}
    <ReactKeycloakProvider authClient={keycloak}>
      {/*Renders the App component, located in './App.js'*/}
      <App />
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
