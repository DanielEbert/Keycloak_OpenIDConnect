import * as React from "react";
import { useCallback } from "react";

import { useKeycloak } from "@react-keycloak/web";

/**
 * Register component explained in ./nav.js.
 */
const Register = () => {
  /**
   * Component requires access to Keycloak.
   */
  const { keycloak } = useKeycloak();

  /**
   * keycloak.register() is invoked when the anchor element is clicked.
   */
  const register = useCallback(() => {
    keycloak.register();
  }, [keycloak]);

  /**
   * Returns a button with the register event handler.
   */
  return (
    <li>
      <a className="black-text" onClick={register} href="#top">
        Register
      </a>
    </li>
  );
};

export default Register;
