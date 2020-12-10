import * as React from "react";
import { useCallback } from "react";

import { useKeycloak } from "@react-keycloak/web";

/**
 * Login component explained in ./nav.js.
 */
const Login = () => {
  /**
   * Component requires access to Keycloak.
   */
  const { keycloak } = useKeycloak();

  /**
   * keycloak.login() is invoked when the anchor element is clicked.
   */
  const login = useCallback(() => {
    keycloak.login();
  }, [keycloak]);

  /**
   * Returns a button with the login event handler.
   */
  return (
    <li>
      <a className="black-text" onClick={login} href="#top">
        Login
      </a>
    </li>
  );
};

export default Login;
